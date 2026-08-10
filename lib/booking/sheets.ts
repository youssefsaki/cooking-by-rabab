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
import { parsePackageType } from './schedule';
import type { ChildGuest } from './pricing';
import { SLOT_CONFLICT_MESSAGE, evaluateSlotBooking } from './conflicts';

const BOOKINGS_CACHE_TTL_MS = 15_000;

type BookingsCacheEntry = {
  at: number;
  data: StoredBooking[];
};

let bookingsCache: BookingsCacheEntry | null = null;
let bookingsInflight: Promise<StoredBooking[]> | null = null;

export function invalidateBookingsCache(): void {
  bookingsCache = null;
  bookingsInflight = null;
}

type BookingRow = {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  country: string;
  email: string;
  package_type: string;
  slot_date: string | null;
  slot_period: string | null;
  dish_id: string | null;
  dish_name: string | null;
  adults: number | null;
  children: unknown;
  location: string | null;
  allergies: string | null;
  dietary_notes: string | null;
  total_price_eur: number | string | null;
  status: string;
};

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
    fullName: row.full_name,
    phone: row.phone,
    country: row.country,
    email: row.email,
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

async function fetchAllBookingsUncached(): Promise<StoredBooking[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id, created_at, full_name, phone, country, email, package_type, slot_date, slot_period, dish_id, dish_name, adults, children, location, allergies, dietary_notes, total_price_eur, status'
    )
    .neq('status', 'cancelled')
    .not('slot_date', 'is', null)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[booking/store] list error:', error);
    throw new Error('Failed to list bookings from Supabase');
  }

  return (data as BookingRow[])
    .map(rowToStored)
    .filter((b): b is StoredBooking => !!b);
}

async function getCachedBookings(): Promise<StoredBooking[]> {
  const now = Date.now();
  if (bookingsCache && now - bookingsCache.at < BOOKINGS_CACHE_TTL_MS) {
    return bookingsCache.data;
  }

  if (bookingsInflight) {
    return bookingsInflight;
  }

  bookingsInflight = fetchAllBookingsUncached()
    .then((data) => {
      bookingsCache = { at: Date.now(), data };
      return data;
    })
    .finally(() => {
      bookingsInflight = null;
    });

  return bookingsInflight;
}

export async function listBookings(from?: string, to?: string): Promise<StoredBooking[]> {
  const all = await getCachedBookings();
  if (!from && !to) return all;

  return all.filter((b) => {
    if (from && b.slotDate < from) return false;
    if (to && b.slotDate > to) return false;
    return true;
  });
}

export async function appendBooking(
  booking: StoredBooking,
  options?: { dishId?: string }
): Promise<StoredBooking> {
  const supabase = createServiceClient();

  // Fresh read for conflict check (ignore cache)
  const fresh = await fetchAllBookingsUncached();
  const existing = fresh.filter(
    (b) => b.slotDate === booking.slotDate && b.slotPeriod === booking.slotPeriod && b.id !== booking.id
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
  });

  if (error) {
    console.error('[booking/store] insert error:', error);
    throw new Error(error.message || 'Failed to save booking');
  }

  invalidateBookingsCache();
  return booking;
}
