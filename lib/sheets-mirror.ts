import { randomUUID } from 'crypto';

/**
 * Google Sheets mirror after a successful Supabase booking/contact save.
 * Uses SHEETS_WEBAPP_URL, or falls back to BOOKING_SCRIPT_URL (legacy 2.1.0 name).
 * Failures are logged — the guest booking in Supabase still succeeds.
 */

export type BookingSheetPayload = {
  fullName: string;
  phone: string;
  country: string;
  email: string;
  packageType: string;
  dietaryPreference?: string;
  allergies?: string;
  slotDate?: string;
  slotPeriod?: string;
  dish?: string;
  adults?: number;
  children?: string;
  location?: string;
  totalPrice?: number;
  status?: string;
};

export type ContactSheetPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function getSheetsUrl(): string | undefined {
  const url =
    process.env.SHEETS_WEBAPP_URL?.trim() || process.env.BOOKING_SCRIPT_URL?.trim();
  return url || undefined;
}

async function postToSheets(body: Record<string, unknown>): Promise<boolean> {
  const url = getSheetsUrl();
  if (!url) {
    console.warn(
      '[sheets-mirror] SHEETS_WEBAPP_URL (or BOOKING_SCRIPT_URL) is not set — booking saved in database only'
    );
    return false;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
      redirect: 'follow',
    });

    if (!response.ok) {
      console.error('[sheets-mirror] HTTP error:', response.status);
      return false;
    }

    // Apps Script often returns text/html on redirect; try parse JSON when present
    const text = await response.text();
    try {
      const parsed = JSON.parse(text) as { success?: boolean; error?: string };
      if (parsed.success === false) {
        console.error('[sheets-mirror] script error:', parsed.error);
        return false;
      }
    } catch {
      // Non-JSON success responses from Apps Script are still OK if HTTP 200
    }

    return true;
  } catch (error) {
    console.error('[sheets-mirror] failed:', error);
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function mirrorBookingToSheets(payload: BookingSheetPayload): Promise<boolean> {
  const allergies = payload.allergies || 'None';

  // Primary: simple append mirror (supabase/sheets-apps-script.js)
  const mirrored = await postToSheets({
    type: 'booking',
    fullName: payload.fullName,
    phone: payload.phone,
    country: payload.country,
    email: payload.email,
    packageType: payload.packageType,
    packageLabel: payload.packageType,
    dietaryPreference: payload.dietaryPreference || 'none',
    allergies,
    dietaryNotes: allergies,
    slotDate: payload.slotDate,
    slotPeriod: payload.slotPeriod,
    dish: payload.dish,
    adults: payload.adults,
    children: payload.children,
    location: payload.location,
    totalPrice: payload.totalPrice,
    status: payload.status || 'new',
  });

  if (mirrored) return true;

  // Fallback: legacy 2.1.0 Apps Script shape (action: create)
  // Only useful if SHEETS_WEBAPP_URL points at the old locking script
  return postToSheets({
    action: 'create',
    booking: {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      fullName: payload.fullName,
      phone: payload.phone,
      country: payload.country,
      email: payload.email,
      packageType: payload.packageType,
      packageLabel: payload.packageType,
      slotDate: payload.slotDate,
      slotPeriod: payload.slotPeriod,
      dish: payload.dish,
      adults: payload.adults ?? 1,
      children: payload.children ? safeParseChildren(payload.children) : [],
      location: payload.location || '',
      allergies,
      totalPrice: payload.totalPrice ?? 0,
      status: 'confirmed',
    },
  });
}

function safeParseChildren(value: string): { age: number }[] {
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? (parsed as { age: number }[]) : [];
  } catch {
    return [];
  }
}

export async function mirrorContactToSheets(payload: ContactSheetPayload): Promise<boolean> {
  return postToSheets({
    type: 'contact',
    ...payload,
  });
}

export function isSheetsMirrorConfigured(): boolean {
  return Boolean(getSheetsUrl());
}
