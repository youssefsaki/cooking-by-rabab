/**
 * In-memory occupancy API payload cache (shared across route + write path).
 * Cleared whenever a booking is written so spot counts stay correct.
 */
type OccupancyPayload = {
  occupancy: unknown[];
  from: string | undefined;
  to: string | undefined;
};

type Entry = { at: number; body: OccupancyPayload };

export const OCCUPANCY_RESPONSE_TTL_MS = 30_000;

const cache = new Map<string, Entry>();
const inflight = new Map<string, Promise<OccupancyPayload>>();

export function occupancyCacheKey(from?: string, to?: string): string {
  return `${from || '*'}::${to || '*'}`;
}

export function getCachedOccupancyPayload(key: string): OccupancyPayload | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at >= OCCUPANCY_RESPONSE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return hit.body;
}

export function setCachedOccupancyPayload(key: string, body: OccupancyPayload): void {
  cache.set(key, { at: Date.now(), body });
}

export function getOccupancyInflight(key: string): Promise<OccupancyPayload> | undefined {
  return inflight.get(key);
}

export function setOccupancyInflight(key: string, promise: Promise<OccupancyPayload>): void {
  inflight.set(key, promise);
}

export function clearOccupancyInflight(key: string): void {
  inflight.delete(key);
}

export function invalidateOccupancyResponseCache(): void {
  cache.clear();
  inflight.clear();
}
