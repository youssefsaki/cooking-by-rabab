import { NextResponse } from 'next/server';
import { createSessionClient, createServiceClient } from '@/lib/supabase/server';
import { isIsoDate, type BlockedDateRow, type PackageCapacityRow } from '@/lib/availability';
import { listBlockedDates, listPackageCapacities } from '@/lib/availability-server';
import { invalidateOccupancyResponseCache } from '@/lib/booking/occupancy-response-cache';
import type { PackageType } from '@/lib/booking/schedule';

async function requireAdmin() {
  const supabase = await createSessionClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return user;
}

const PACKAGE_TYPES: PackageType[] = [
  'basic',
  'weekly-event',
  'private',
  'private-at-location',
];

function parsePackageType(value: unknown): PackageType | null {
  return PACKAGE_TYPES.includes(value as PackageType) ? (value as PackageType) : null;
}

/** GET /api/admin/availability — blocked dates + package capacities */
export async function GET() {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createServiceClient();
    const [blockedDates, capacities, bookingsResult] = await Promise.all([
      listBlockedDates(),
      listPackageCapacities(),
      supabase
        .from('bookings')
        .select('slot_date')
        .not('status', 'eq', 'cancelled')
        .not('slot_date', 'is', null),
    ]);

    const bookedDates = Array.from(
      new Set(
        ((bookingsResult.data || []) as { slot_date: string | null }[])
          .map((row) => row.slot_date)
          .filter((value): value is string => Boolean(value))
      )
    ).sort();

    return NextResponse.json({
      ok: true,
      blockedDates: blockedDates as BlockedDateRow[],
      capacities: capacities as PackageCapacityRow[],
      bookedDates,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Failed to load' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/availability
 * Body: { date, reason? } or { dates: string[], reason? } — block one or many dates
 */
export async function POST(request: Request) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const reasonRaw = body.reason;
  const reason =
    reasonRaw == null || String(reasonRaw).trim() === ''
      ? null
      : String(reasonRaw).trim().slice(0, 240);

  const datesRaw = Array.isArray(body.dates)
    ? body.dates.map((value) => String(value || '').trim())
    : body.date
      ? [String(body.date).trim()]
      : [];

  const dates = Array.from(new Set(datesRaw.filter((value) => isIsoDate(value)))).sort();

  if (dates.length === 0) {
    return NextResponse.json(
      { ok: false, error: 'Provide date or dates as YYYY-MM-DD' },
      { status: 400 }
    );
  }
  if (dates.length > 62) {
    return NextResponse.json({ ok: false, error: 'You can block at most 62 dates at once' }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('blocked_dates')
    .upsert(
      dates.map((date) => ({ date, reason })),
      { onConflict: 'date', ignoreDuplicates: true }
    )
    .select('id, created_at, date, reason');

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  invalidateOccupancyResponseCache();
  return NextResponse.json({
    ok: true,
    blockedDates: (data || []) as BlockedDateRow[],
    count: (data || []).length,
  });
}

/**
 * PATCH /api/admin/availability
 * Body: { package_type, max_guests } — update one package capacity
 */
export async function PATCH(request: Request) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const packageType = parsePackageType(body.package_type ?? body.packageType);
  const maxGuests = Number(body.max_guests ?? body.maxGuests);

  if (!packageType) {
    return NextResponse.json({ ok: false, error: 'Invalid package_type' }, { status: 400 });
  }
  if (!Number.isFinite(maxGuests) || !Number.isInteger(maxGuests) || maxGuests < 1) {
    return NextResponse.json(
      { ok: false, error: 'max_guests must be a positive integer' },
      { status: 400 }
    );
  }
  if (maxGuests > 100) {
    return NextResponse.json({ ok: false, error: 'max_guests cannot exceed 100' }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('package_capacity')
    .upsert(
      {
        package_type: packageType,
        max_guests: maxGuests,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'package_type' }
    )
    .select('package_type, max_guests, updated_at')
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  invalidateOccupancyResponseCache();
  return NextResponse.json({ ok: true, capacity: data as PackageCapacityRow });
}
