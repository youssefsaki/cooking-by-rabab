/**
 * Client-side availability cache helpers (sessionStorage).
 * Keep in sync with WorkshopCalendar / book page cache keys.
 */

export const AVAILABILITY_CACHE_PREFIX = 'cbr-availability-v2:';

export function clearAvailabilityClientCache(): void {
  if (typeof window === 'undefined') return;
  try {
    const keys: string[] = [];
    for (let i = 0; i < sessionStorage.length; i += 1) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith(AVAILABILITY_CACHE_PREFIX)) keys.push(key);
    }
    keys.forEach((key) => sessionStorage.removeItem(key));
  } catch {
    // private mode / quota
  }
}

/** Always bypass browser HTTP cache for occupancy reads. */
export function fetchAvailability(from: string, to: string): Promise<Response> {
  const url = `/api/availability?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&_=${Date.now()}`;
  return fetch(url, { cache: 'no-store' });
}
