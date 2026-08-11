/**
 * Booking persistence adapter.
 * Supabase is the source of truth. Google Sheets is mirrored separately
 * via lib/sheets-mirror.ts after a successful insert.
 *
 * Keeps the same listBookings / appendBooking API used by the 2.1.0 calendar flow.
 */
import 'server-only';

import { createServiceClient } from '@/lib/supabase/server';
import type { StoredBooking } from './conflicts';
import { parsePackageType, type SlotPeriod } from './schedule';
import type { ChildGuest } from './pricing';
import { SLOT_CONFLICT_MESSAGE, evaluateSlotBooking } from './conflicts';
import { invalidateOccupancyResponseCache } from './occupancy-response-cache';

/** Occupancy reads can be slightly stale; writes always invalidate. */
const BOOKINGS_CACHE_TTL_MS = 45_000;

type BookingsCacheEntry = {
  at: number;
  data: StoredBooking[];
};

/** Range-keyed cache so calendar windows don't reload the entire table */
const bookingsCacheByKey = new Map<string, BookingsCacheEntry>();
const bookingsInflightByKey = new Map<string, Promise<StoredBooking[]>>();

const LEAN_SELECT =
  'id, created_at, package_type, slot_date, slot_period, adults, children, location, status, full_name, phone, country, email, dish_name, allergies, dietary_notes, total_price_eur';

export function invalidateBookingsCache(): void {
  bookingsCacheByKey.clear();
  bookingsInflightByKey.clear();
  invalidateOccupancyResponseCache();
}

type BookingRow = {
  id: string;
  created_at: string;
  full_name?: string | null;
  phone?: string | null;
  country?: string | null;
  email?: string | null;
  package_type: string;
  slot_date: string | null;
  slot_period: string | null;
  dish_id?: string | null;
  dish_name?: string | null;
  adults: number | null;
  children: unknown;
  location: string | null;
  allergies?: string | null;
  dietary_notes?: string | null;
  total_price_eur?: number | string | null;
  status: string;
};

function cacheKey(from?: string, to?: string): string {
  return `${from || '*'}::${to || '*'}`;
}

function normalizeChildren(value: unknown): ChildGuest[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((child) => {
      if (typeof child === 'number') return { age: child };
      if (child && typeof child === 'object' && 'age' in child) {
        return { age: Number((child as { age: unknown }).age) };
      }
      return null;
    })
    .filter((child): child is ChildGuest => !!child && Number.isFinite(child.age));
}

function rowToStored(row: BookingRow): StoredBooking | null {
  if (!row.slot_date || (row.slot_period !== 'morning' && row.slot_period !== 'afternoon')) {
    return null;
  }
  if (row.status === 'cancelled') return null;

  let packageType = parsePackageType(String(row.package_type || ''));
  if (
    packageType === 'private' &&
    /villa|riad|comes to you|at your/i.test(String(row.location || ''))
  ) {
    packageType = 'private-at-location';
  }

  return {
    id: row.id,
    createdAt: row.created_at,
    fullName: row.full_name || '',
    phone: row.phone || '',
    country: row.country || '',
    email: row.email || '',
    packageType,
    slotDate: row.slot_date,
    slotPeriod: row.slot_period,
    dish: row.dish_name || '',
    adults: row.adults ?? 1,
    children: normalizeChildren(row.children),
    location: row.location || '',
    allergies: row.dietary_notes || row.allergies || '',
    totalPrice: Number(row.total_price_eur || 0),
    status: 'confirmed',
  };
}

async function fetchBookingsUncached(from?: string, to?: string): Promise<StoredBooking[]> {
  const supabase = createServiceClient();
  let query = supabase
    .from('bookings')
    .select(LEAN_SELECT)
    .neq('status', 'cancelled')
    .not('slot_date', 'is', null)
    .order('slot_date', { ascending: true });

  // Push date filters into Postgres so we don't download the whole table
  if (from) query = query.gte('slot_date', from);
  if (to) query = query.lte('slot_date', to);

  const { data, error } = await query;

  if (error) {
    console.error('[booking/store] list error:', error);
    throw new Error('Failed to list bookings from Supabase');
  }

  return (data as BookingRow[])
    .map(rowToStored)
    .filter((b): b is StoredBooking => !!b);
}

async function getCachedBookings(from?: string, to?: string): Promise<StoredBooking[]> {
  const key = cacheKey(from, to);
  const now = Date.now();
  const hit = bookingsCacheByKey.get(key);
  if (hit && now - hit.at < BOOKINGS_CACHE_TTL_MS) {
    return hit.data;
  }

  const inflight = bookingsInflightByKey.get(key);
  if (inflight) return inflight;

  const promise = fetchBookingsUncached(from, to)
    .then((data) => {
      bookingsCacheByKey.set(key, { at: Date.now(), data });
      return data;
    })
    .finally(() => {
      bookingsInflightByKey.delete(key);
    });

  bookingsInflightByKey.set(key, promise);
  return promise;
}

export async function listBookings(from?: string, to?: string): Promise<StoredBooking[]> {
  return getCachedBookings(from, to);
}

/** Fresh read for one slot only — used for conflict checks on submit */
async function fetchBookingsForSlot(slotDate: string, slotPeriod: SlotPeriod): Promise<StoredBooking[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('bookings')
    .select(LEAN_SELECT)
    .neq('status', 'cancelled')
    .eq('slot_date', slotDate)
    .eq('slot_period', slotPeriod);

  if (error) {
    console.error('[booking/store] slot list error:', error);
    throw new Error('Failed to list slot bookings from Supabase');
  }

  return (data as BookingRow[])
    .map(rowToStored)
    .filter((b): b is StoredBooking => !!b);
}

export async function appendBooking(
  booking: StoredBooking,
  options?: { dishId?: string }
): Promise<StoredBooking> {
  const supabase = createServiceClient();

  // Only load this slot — not the entire bookings table
  const existing = (await fetchBookingsForSlot(booking.slotDate, booking.slotPeriod)).filter(
    (b) => b.id !== booking.id
  );

  const conflict = evaluateSlotBooking({
    packageType: booking.packageType,
    slotDate: booking.slotDate,
    slotPeriod: booking.slotPeriod,
    adults: booking.adults,
    children: booking.children,
    existingBookings: existing,
  });

  if (!conflict.ok) {
    const err = new Error(conflict.message || SLOT_CONFLICT_MESSAGE) as Error & { status?: number };
    err.status = 409;
    throw err;
  }

  const { error } = await supabase.from('bookings').insert({
    id: booking.id,
    full_name: booking.fullName,
    phone: booking.phone,
    country: booking.country,
    email: booking.email,
    package_type: booking.packageType,
    dietary_preference: 'none',
    allergies: booking.allergies || '',
    dietary_notes: booking.allergies || '',
    status: 'new',
    slot_date: booking.slotDate,
    slot_period: booking.slotPeriod,
    dish_id: options?.dishId || '',
    dish_name: booking.dish,
    adults: booking.adults,
    children: booking.children,
    location: booking.location,
    total_price_eur: booking.totalPrice,
    promo_code: booking.promoCode || null,
    discount_eur: booking.discountEur ?? null,
  });

  if (error) {
    console.error('[booking/store] insert error:', error);
    throw new Error(error.message || 'Failed to save booking');
  }

  invalidateBookingsCache();
  return booking;
}
