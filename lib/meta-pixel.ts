/** Meta Pixel / dataset ID for taghazout-cooking-class.com */
export const META_PIXEL_ID = '4061307014164218';

type FbqFn = (...args: unknown[]) => void;

function fbq(): FbqFn | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as unknown as { fbq?: FbqFn }).fbq;
}

/** Standard Meta Pixel events used on this site. */
export type MetaPixelEvent = 'PageView' | 'Lead' | 'Schedule';

export type MetaPixelParams = Record<
  string,
  string | number | boolean | string[]
>;

/** Fire a standard Meta Pixel event (no-op until the base snippet loads). */
export function trackPixelEvent(name: MetaPixelEvent, params?: MetaPixelParams) {
  const send = fbq();
  if (!send) return;
  if (params && Object.keys(params).length > 0) {
    send('track', name, params);
  } else {
    send('track', name);
  }
}

/**
 * Fire a Meta event, then wait briefly so navigation (e.g. WhatsApp open)
 * does not cancel the hit — same idea as trackEventAndWait in gtag.ts.
 */
export function trackPixelEventAndWait(
  name: MetaPixelEvent,
  params?: MetaPixelParams,
  timeoutMs = 400
): Promise<void> {
  return new Promise((resolve) => {
    trackPixelEvent(name, params);
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    window.setTimeout(resolve, timeoutMs);
  });
}
