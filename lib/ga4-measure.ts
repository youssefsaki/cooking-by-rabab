import 'server-only';
import { GA_MEASUREMENT_ID } from '@/lib/gtag';

/**
 * Server-side GA4 event after a booking is saved.
 * Needs GA4_API_SECRET (Admin → Data streams → Measurement Protocol API secrets).
 * Do not send names, emails, or phone numbers.
 */

function getApiSecret(): string | undefined {
  return process.env.GA4_API_SECRET?.trim() || undefined;
}

export function isGa4MeasureConfigured(): boolean {
  return Boolean(getApiSecret());
}

function sanitizeClientId(raw: string | null | undefined): string {
  const trimmed = String(raw || '').trim();
  if (/^\d+\.\d+$/.test(trimmed)) return trimmed;
  return `${Date.now()}.${Math.floor(Math.random() * 1e9)}`;
}

export async function trackBookingCompleteServer(params: {
  clientId?: string | null;
  transactionId: string;
  value?: number;
  packageType?: string;
  country?: string;
  source?: string;
}): Promise<boolean> {
  const secret = getApiSecret();
  if (!secret) {
    console.warn('[ga4-measure] GA4_API_SECRET is not set — booking not sent to Analytics from the server');
    return false;
  }

  const body = {
    client_id: sanitizeClientId(params.clientId),
    events: [
      {
        name: 'booking_complete',
        params: {
          engagement_time_msec: 1,
          session_id: Date.now().toString(),
          currency: 'EUR',
          value: typeof params.value === 'number' ? params.value : 0,
          transaction_id: params.transactionId,
          package_type: (params.packageType || '').slice(0, 100),
          booking_country: (params.country || '').slice(0, 100),
          booking_source: (params.source || '').slice(0, 64),
        },
      },
    ],
  };

  try {
    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
      GA_MEASUREMENT_ID
    )}&api_secret=${encodeURIComponent(secret)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error('[ga4-measure] HTTP', res.status, await res.text().catch(() => ''));
      return false;
    }
    return true;
  } catch (error) {
    console.error('[ga4-measure] failed', error);
    return false;
  }
}
