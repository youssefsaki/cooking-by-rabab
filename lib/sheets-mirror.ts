/**
 * Non-blocking Google Sheets mirror.
 * Posts to SHEETS_WEBAPP_URL (Apps Script) after Supabase success.
 * Failures are logged only — never fail the guest request.
 */

export type BookingSheetPayload = {
  fullName: string;
  phone: string;
  country: string;
  email: string;
  packageType: string;
  dietaryPreference: string;
  allergies?: string;
};

export type ContactSheetPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

async function postToSheets(body: Record<string, unknown>) {
  const url = process.env.SHEETS_WEBAPP_URL;
  if (!url) {
    console.warn('[sheets-mirror] SHEETS_WEBAPP_URL not set; skipping mirror');
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (error) {
    console.error('[sheets-mirror] failed:', error);
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function mirrorBookingToSheets(payload: BookingSheetPayload) {
  await postToSheets({
    type: 'booking',
    ...payload,
    allergies: payload.allergies || 'None',
  });
}

export async function mirrorContactToSheets(payload: ContactSheetPayload) {
  await postToSheets({
    type: 'contact',
    ...payload,
  });
}
