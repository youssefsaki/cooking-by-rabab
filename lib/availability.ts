import type { PackageType } from '@/lib/booking/schedule';

export const BLOCKED_DATE_MESSAGE =
  'This date is unavailable. Please choose another date.';

export type BlockedDateRow = {
  id: string;
  created_at: string;
  date: string;
  reason: string | null;
};

export type PackageCapacityRow = {
  package_type: PackageType;
  max_guests: number;
  updated_at: string;
};

export const PACKAGE_CAPACITY_LABELS: Record<PackageType, string> = {
  basic: 'Amazigh cooking',
  'weekly-event': 'Sunset music event',
  private: 'Private experience',
  'private-at-location': 'At your location',
};

export function isIsoDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function blockedDateSet(rows: BlockedDateRow[]): Set<string> {
  return new Set(rows.map((row) => row.date));
}
