import 'server-only';

import { promises as fs } from 'fs';
import path from 'path';
import type { StoredBooking } from './conflicts';
import { packageTypeSheetLabel, parsePackageType } from './schedule';

const LOCAL_STORE_PATH = path.join(process.cwd(), 'data', 'bookings-store.json');

function normalizeBooking(booking: StoredBooking): StoredBooking {
  let packageType = parsePackageType(String(booking.packageType || ''));
  // Legacy rows stored only "private" — infer at-location from the Location column
  if (
    packageType === 'private' &&
    /villa|riad|comes to you|at your/i.test(String(booking.location || ''))
  ) {
    packageType = 'private-at-location';
  }
  return {
    ...booking,
    packageType,
  };
}

function getScriptUrl(): string | undefined {
  const url = process.env.BOOKING_SCRIPT_URL?.trim();
  return url || undefined;
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
  await fs.writeFile(LOCAL_STORE_PATH, JSON.stringify({ bookings }, null, 2), 'utf8');
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
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`Booking script error: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function listBookings(from?: string, to?: string): Promise<StoredBooking[]> {
  const scriptUrl = getScriptUrl();

  if (scriptUrl) {
    // When Sheets is configured, never fall back to an empty local store —
    // that would show slots as free while Private bookings exist in the sheet.
    const data = await fetchFromScript<{ success: boolean; bookings: StoredBooking[]; error?: string }>(
      'GET',
      undefined,
      {
        action: 'list',
        ...(from ? { from } : {}),
        ...(to ? { to } : {}),
      }
    );

    if (!data.success || !Array.isArray(data.bookings)) {
      throw new Error(data.error || 'Failed to list bookings from Google Sheets');
    }

    return data.bookings
      .map(normalizeBooking)
      .filter((b) => {
        if (from && b.slotDate < from) return false;
        if (to && b.slotDate > to) return false;
        return true;
      });
  }

  const local = await readLocalStore();
  return local.map(normalizeBooking).filter((b) => {
    if (from && b.slotDate < from) return false;
    if (to && b.slotDate > to) return false;
    return true;
  });
}

export async function appendBooking(booking: StoredBooking): Promise<StoredBooking> {
  const scriptUrl = getScriptUrl();

  if (scriptUrl) {
    // Send both code (for conflict logic) and a clear sheet label
    const data = await fetchFromScript<{
      success: boolean;
      booking?: StoredBooking;
      error?: string;
      message?: string;
    }>('POST', {
      action: 'create',
      booking: {
        ...booking,
        // Apps Script writes this into the Package column (clear Private variants)
        packageLabel: packageTypeSheetLabel(booking.packageType),
      },
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
  }

  // Local-only mode (dev without BOOKING_SCRIPT_URL)
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
