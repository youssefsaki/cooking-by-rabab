import { NextResponse } from 'next/server';
import { createSessionClient, createServiceClient } from '@/lib/supabase/server';

async function requireAdmin() {
  const supabase = await createSessionClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return user;
}

function parseDay(value: string | null, fallback: Date): string {
  if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return fallback.toISOString().slice(0, 10);
}

function eachDayInclusive(from: string, to: string): string[] {
  const days: string[] = [];
  const cursor = new Date(`${from}T00:00:00.000Z`);
  const end = new Date(`${to}T00:00:00.000Z`);
  while (cursor <= end) {
    days.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

type RevenueBooking = {
  created_at: string;
  package_type: string;
  status: string;
  total_price_eur: number | string | null;
};

/**
 * GET /api/admin/reports?from=YYYY-MM-DD&to=YYYY-MM-DD
 * Defaults to last 30 days (inclusive). Revenue uses total_price_eur; cancelled excluded.
 */
export async function GET(request: Request) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const today = new Date();
  const defaultTo = today.toISOString().slice(0, 10);
  const defaultFromDate = new Date(today);
  defaultFromDate.setUTCDate(defaultFromDate.getUTCDate() - 29);

  let from = parseDay(searchParams.get('from'), defaultFromDate);
  let to = parseDay(searchParams.get('to'), new Date(`${defaultTo}T00:00:00.000Z`));
  if (from > to) {
    const swap = from;
    from = to;
    to = swap;
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, package_type, status, total_price_eur')
    .gte('created_at', `${from}T00:00:00.000Z`)
    .lte('created_at', `${to}T23:59:59.999Z`)
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const bookings = ((data || []) as RevenueBooking[]).filter((row) => row.status !== 'cancelled');

  const byDayMap = new Map<string, { revenue: number; bookings: number }>();
  for (const day of eachDayInclusive(from, to)) {
    byDayMap.set(day, { revenue: 0, bookings: 0 });
  }

  const byPackageMap = new Map<string, { revenue: number; bookings: number }>();
  let totalRevenue = 0;

  for (const row of bookings) {
    const amount = Number(row.total_price_eur || 0);
    if (!Number.isFinite(amount) || amount < 0) continue;

    const day = row.created_at.slice(0, 10);
    const dayBucket = byDayMap.get(day);
    if (dayBucket) {
      dayBucket.revenue += amount;
      dayBucket.bookings += 1;
    }

    const pkg = row.package_type || 'unknown';
    const pkgBucket = byPackageMap.get(pkg) || { revenue: 0, bookings: 0 };
    pkgBucket.revenue += amount;
    pkgBucket.bookings += 1;
    byPackageMap.set(pkg, pkgBucket);

    totalRevenue += amount;
  }

  const bookingCount = bookings.length;
  const averageBookingValue = bookingCount ? totalRevenue / bookingCount : 0;

  return NextResponse.json({
    ok: true,
    currency: 'EUR',
    from,
    to,
    byDay: Array.from(byDayMap.entries()).map(([date, stats]) => ({
      date,
      revenue: Math.round(stats.revenue * 100) / 100,
      bookings: stats.bookings,
    })),
    byPackage: Array.from(byPackageMap.entries())
      .map(([packageType, stats]) => ({
        packageType,
        revenue: Math.round(stats.revenue * 100) / 100,
        bookings: stats.bookings,
      }))
      .sort((a, b) => b.revenue - a.revenue),
    totals: {
      revenue: Math.round(totalRevenue * 100) / 100,
      bookings: bookingCount,
      averageBookingValue: Math.round(averageBookingValue * 100) / 100,
    },
  });
}
