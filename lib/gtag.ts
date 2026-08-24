export const GA_MEASUREMENT_ID = 'G-02LHBV08VE';

type GtagFn = (...args: unknown[]) => void;

function gtag(): GtagFn | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as unknown as { gtag?: GtagFn }).gtag;
}

/** Custom events for GA4 (mark these as key events in the Analytics UI). */
export function trackEvent(
  name: 'booking_complete' | 'whatsapp_click',
  params?: Record<string, string | number | boolean>
) {
  const send = gtag();
  if (!send) return;
  send('event', name, params);
}
