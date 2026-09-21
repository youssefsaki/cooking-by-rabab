export const GA_MEASUREMENT_ID = 'G-02LHBV08VE';
/** Google Ads tag — config only until a conversion label is added (AW-xxx/label). */
export const AW_CONVERSION_ID = 'AW-18465680551';
/** Set when Google Ads shows the Purchase event snippet, e.g. AbCdeFghIjk. */
export const AW_PURCHASE_LABEL = '';

type GtagFn = (...args: unknown[]) => void;

function gtag(): GtagFn | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as unknown as { gtag?: GtagFn }).gtag;
}

/** GA4 client_id from the `_ga` cookie — used so server events match the same visitor. */
export function getGaClientId(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/_ga=GA\d+\.\d+\.(\d+\.\d+)/);
  return match?.[1] || null;
}

/** Custom events for GA4 (mark these as key events in the Analytics UI). */
export function trackEvent(
  name: 'booking_complete' | 'whatsapp_click',
  params?: Record<string, string | number | boolean>
) {
  const send = gtag();
  if (!send) return;
  send('event', name, params);
  if (name === 'booking_complete' && AW_PURCHASE_LABEL) {
    send('event', 'conversion', {
      send_to: `${AW_CONVERSION_ID}/${AW_PURCHASE_LABEL}`,
      currency: params?.currency || 'EUR',
      value: typeof params?.value === 'number' ? params.value : 0,
    });
  }
}

/** Wait until gtag records the event (or timeout) so WhatsApp does not cancel the hit. */
export function trackEventAndWait(
  name: 'booking_complete' | 'whatsapp_click',
  params?: Record<string, string | number | boolean>,
  timeoutMs = 1500
): Promise<void> {
  return new Promise((resolve) => {
    const send = gtag();
    if (!send) {
      resolve();
      return;
    }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    const timer = window.setTimeout(finish, timeoutMs);
    send('event', name, {
      ...params,
      event_callback: () => {
        if (name === 'booking_complete' && AW_PURCHASE_LABEL) {
          send('event', 'conversion', {
            send_to: `${AW_CONVERSION_ID}/${AW_PURCHASE_LABEL}`,
            currency: params?.currency || 'EUR',
            value: typeof params?.value === 'number' ? params.value : 0,
          });
        }
        window.clearTimeout(timer);
        finish();
      },
    });
  });
}
