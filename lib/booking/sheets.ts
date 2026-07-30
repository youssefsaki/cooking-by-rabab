import 'server-only';

import { promises as fs } from 'fs';
import path from 'path';
import type { StoredBooking } from './conflicts';

const LOCAL_STORE_PATH = path.join(process.cwd(), 'data', 'bookings-store.json');

function getScriptUrl(): string | undefined {
  return process.env.BOOKING_SCRIPT_URL;
}

async function readLocalStore(): Promise<StoredBooking[]> {
  try {
    const raw = await fs.readFile(LOCAL_STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as { bookings?: StoredBooking[] };
    return Array.isArray(parsed.bookings) ? parsed.bookings : [];
  } catch {
    return [];
  }
}

async function writeLocalStore(bookings: StoredBooking[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_STORE_PATH), { recursive: true });
  await fs.writeFile(
    LOCAL_STORE_PATH,
    JSON.stringify({ bookings }, null, 2),
    'utf8'
  );
}

async function fetchFromScript<T>(
  method: 'GET' | 'POST',
  body?: Record<string, unknown>,
  query?: Record<string, string>
): Promise<T> {
  const base = getScriptUrl();
  if (!base) {
    throw new Error('BOOKING_SCRIPT_URL is not configured');
  }

  const url = new URL(base);
  if (query) {
    Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, value));
  }

  const response = await fetch(url.toString(), {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: method === 'POST' ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Booking script error: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function listBookings(from?: string, to?: string): Promise<StoredBooking[]> {
  const scriptUrl = getScriptUrl();

  if (scriptUrl) {
    try {
      const data = await fetchFromScript<{ success: boolean; bookings: StoredBooking[] }>(
        'GET',
        undefined,
        {
          action: 'list',
          ...(from ? { from } : {}),
          ...(to ? { to } : {}),
        }
      );
      if (data.success && Array.isArray(data.bookings)) {
        return data.bookings.filter((b) => {
          if (from && b.slotDate < from) return false;
          if (to && b.slotDate > to) return false;
          return true;
        });
      }
    } catch (error) {
      console.error('Failed to list bookings from script, falling back to local store:', error);
    }
  }

  const local = await readLocalStore();
  return local.filter((b) => {
    if (from && b.slotDate < from) return false;
    if (to && b.slotDate > to) return false;
    return true;
  });
}

export async function appendBooking(booking: StoredBooking): Promise<StoredBooking> {
  const scriptUrl = getScriptUrl();

  if (scriptUrl) {
    try {
      const data = await fetchFromScript<{
        success: boolean;
        booking?: StoredBooking;
        error?: string;
        message?: string;
      }>('POST', {
        action: 'create',
        booking,
      });

      if (!data.success) {
        const err = new Error(data.message || data.error || 'Booking failed') as Error & {
          status?: number;
        };
        err.status =
          data.message?.includes('already booked') || data.error === 'conflict' ? 409 : 400;
        throw err;
      }

      return data.booking ?? booking;
    } catch (error) {
      // If script is old/unreachable, fall through to local for resilience in dev
      if ((error as Error & { status?: number }).status === 409) {
        throw error;
      }
      console.error('Script create failed, using local store:', error);
    }
  }

  // Local store path: re-check conflicts under a best-effort atomic rewrite
  const existing = await readLocalStore();
  const { evaluateSlotBooking, SLOT_CONFLICT_MESSAGE } = await import('./conflicts');
  const conflict = evaluateSlotBooking({
    packageType: booking.packageType,
    slotDate: booking.slotDate,
    slotPeriod: booking.slotPeriod,
    adults: booking.adults,
    children: booking.children,
    existingBookings: existing,
  });
  if (!conflict.ok) {
    const err = new Error(SLOT_CONFLICT_MESSAGE) as Error & { status?: number };
    err.status = 409;
    throw err;
  }

  existing.push(booking);
  await writeLocalStore(existing);
  return booking;
}
