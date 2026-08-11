import { NextResponse } from 'next/server';
import { createSessionClient, createServiceClient } from '@/lib/supabase/server';
import type { CustomerRow } from '@/lib/customers';

async function requireAdmin() {
  const supabase = await createSessionClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return user;
}

function customerKey(email: string | null, phone: string | null): string | null {
  const e = (email || '').trim().toLowerCase();
  const p = (phone || '').replace(/\D/g, '');
  if (e) return `email:${e}`;
  if (p) return `phone:${p}`;
  return null;
}

/** GET /api/admin/customers — aggregate bookings by email (fallback phone). */
export async function GET() {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('bookings')
    .select('full_name, email, phone, country, package_type, total_price_eur, created_at, status')
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  type Agg = {
    key: string;
    email: string | null;
    phone: string | null;
    name: string;
    totalBookings: number;
    totalSpentEur: number;
    firstBookingAt: string;
    lastBookingAt: string;
    countries: Set<string>;
    packageTypes: Set<string>;
  };

  const map = new Map<string, Agg>();

  for (const row of data || []) {
    if (row.status === 'cancelled') continue;
    const email = (row.email || '').trim().toLowerCase() || null;
    const phone = (row.phone || '').trim() || null;
    const key = customerKey(email, phone);
    if (!key) continue;

    const amount = Number(row.total_price_eur || 0);
    const created = row.created_at as string;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, {
        key,
        email,
        phone,
        name: row.full_name || 'Guest',
        totalBookings: 1,
        totalSpentEur: Number.isFinite(amount) ? amount : 0,
        firstBookingAt: created,
        lastBookingAt: created,
        countries: new Set(row.country ? [row.country] : []),
        packageTypes: new Set(row.package_type ? [row.package_type] : []),
      });
      continue;
    }

    existing.totalBookings += 1;
    existing.totalSpentEur += Number.isFinite(amount) ? amount : 0;
    existing.lastBookingAt = created;
    if (row.full_name) existing.name = row.full_name;
    if (row.country) existing.countries.add(row.country);
    if (row.package_type) existing.packageTypes.add(row.package_type);
    if (!existing.email && email) existing.email = email;
    if (!existing.phone && phone) existing.phone = phone;
  }

  const customers: CustomerRow[] = Array.from(map.values())
    .map((row) => ({
      key: row.key,
      email: row.email,
      phone: row.phone,
      name: row.name,
      totalBookings: row.totalBookings,
      totalSpentEur: Math.round(row.totalSpentEur * 100) / 100,
      firstBookingAt: row.firstBookingAt,
      lastBookingAt: row.lastBookingAt,
      tag: (row.totalBookings >= 2 ? 'returning' : 'new') as CustomerRow['tag'],
      countries: Array.from(row.countries),
      packageTypes: Array.from(row.packageTypes),
    }))
    .sort((a, b) => b.lastBookingAt.localeCompare(a.lastBookingAt));

  return NextResponse.json({
    ok: true,
    customers,
    counts: {
      total: customers.length,
      returning: customers.filter((c) => c.tag === 'returning').length,
      newCustomers: customers.filter((c) => c.tag === 'new').length,
    },
  });
}
