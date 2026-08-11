import 'server-only';

import { createServiceClient } from '@/lib/supabase/server';
import { BASIC_MAX_GUESTS, type PackageType } from '@/lib/booking/schedule';
import {
  isIsoDate,
  type BlockedDateRow,
  type PackageCapacityRow,
} from '@/lib/availability';

export async function listBlockedDates(from?: string, to?: string): Promise<BlockedDateRow[]> {
  const supabase = createServiceClient();
  let query = supabase
    .from('blocked_dates')
    .select('id, created_at, date, reason')
    .order('date', { ascending: true });

  if (from) query = query.gte('date', from);
  if (to) query = query.lte('date', to);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data || []) as BlockedDateRow[];
}

export async function listPackageCapacities(): Promise<PackageCapacityRow[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('package_capacity')
    .select('package_type, max_guests, updated_at')
    .order('package_type', { ascending: true });

  if (error) throw new Error(error.message);
  return (data || []) as PackageCapacityRow[];
}

/** Shared workshop cap (Basic / joining Private) — falls back to BASIC_MAX_GUESTS. */
export async function getSharedMaxGuests(): Promise<number> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('package_capacity')
    .select('max_guests')
    .eq('package_type', 'basic')
    .maybeSingle();

  if (error || !data) return BASIC_MAX_GUESTS;
  const value = Number(data.max_guests);
  return Number.isFinite(value) && value > 0 ? value : BASIC_MAX_GUESTS;
}

export async function getPackageMaxGuests(packageType: PackageType): Promise<number> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('package_capacity')
    .select('max_guests')
    .eq('package_type', packageType)
    .maybeSingle();

  if (error || !data) {
    return packageType === 'private-at-location' ? 20 : BASIC_MAX_GUESTS;
  }
  const value = Number(data.max_guests);
  if (!Number.isFinite(value) || value <= 0) {
    return packageType === 'private-at-location' ? 20 : BASIC_MAX_GUESTS;
  }
  return value;
}

export async function isDateBlocked(date: string): Promise<boolean> {
  if (!isIsoDate(date)) return false;
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('blocked_dates')
    .select('id')
    .eq('date', date)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return Boolean(data);
}
