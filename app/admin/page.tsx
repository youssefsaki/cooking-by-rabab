'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import AdminGateLink from '@/components/admin/AdminGateLink';
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  BookOpen,
  CheckCircle2,
  Clock3,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { BookingRow, ContactMessageRow } from '@/lib/types/cms';
import { formatLeadSourceLabel } from '@/lib/lead-source';

type AdminPayload = {
  ok: boolean;
  error?: string;
  bookings: BookingRow[];
  contactMessages: ContactMessageRow[];
  counts: { newBookings: number; newMessages: number };
};

const PACKAGE_LABELS: Record<string, string> = {
  basic: 'Amazigh cooking',
  'weekly-event': 'Sunset music event',
  private: 'Private experience',
  'private-at-location': 'At your location',
};

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function AccentWave() {
  return (
    <svg className="admin-wave mt-2" viewBox="0 0 40 10" fill="none" aria-hidden>
      <path
        d="M1 6.5C4.5 2.5 7.5 2.5 11 6.5C14.5 10.5 17.5 10.5 21 6.5C24.5 2.5 27.5 2.5 31 6.5C34.5 10.5 37 9 39 6.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function greetingFor(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function euro(value: number) {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

function pctDelta(current: number, previous: number) {
  if (!previous && !current) return 0;
  if (!previous) return 100;
  return Math.round(((current - previous) / previous) * 100);
}

function guestCount(booking: BookingRow) {
  const adults = booking.adults ?? 0;
  const children = Array.isArray(booking.children) ? booking.children.length : 0;
  return Math.max(1, adults + children);
}

function formatSessionWhen(booking: BookingRow) {
  if (!booking.slot_date) return timeAgo(booking.created_at);
  const day = new Date(`${booking.slot_date}T12:00:00`);
  const today = new Date();
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startSlot = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  const diffDays = Math.round((startSlot.getTime() - startToday.getTime()) / 86_400_000);
  const period = booking.slot_period ? ` · ${booking.slot_period}` : '';
  if (diffDays === 0) return `Today${period}`;
  if (diffDays === 1) return `Tomorrow${period}`;
  return `${day.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}${period}`;
}

function timeAgo(value: string) {
  const diff = Math.max(0, Date.now() - new Date(value).getTime());
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function TrendPill({ value }: { value: number }) {
  const up = value >= 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
        up ? 'bg-emerald-50 text-[var(--admin-success)]' : 'bg-red-50 text-[var(--admin-danger)]'
      }`}
    >
      <Icon className="size-3" />
      {up ? '+' : ''}
      {value}%
    </span>
  );
}

export default function AdminHomePage() {
  const [data, setData] = useState<AdminPayload | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin')
      .then((response) => response.json())
      .then((payload) => {
        if (!payload.ok) {
          setError(payload.error || 'Failed to load');
          return;
        }
        setData(payload);
      })
      .catch(() => setError('Failed to load dashboard'));
  }, []);

  const analytics = useMemo(() => {
    const bookings = data?.bookings || [];
    const messages = data?.contactMessages || [];
    const now = Date.now();

    const active = bookings.filter((b) => b.status !== 'cancelled');
    const inWindow = (from: number, to: number) =>
      active.filter((b) => {
        const t = new Date(b.created_at).getTime();
        return t >= from && t < to;
      });

    const thisWeek = inWindow(now - WEEK_MS, now);
    const prevWeek = inWindow(now - 2 * WEEK_MS, now - WEEK_MS);

    const sumRevenue = (rows: BookingRow[]) =>
      rows.reduce((sum, row) => sum + (Number(row.total_price_eur) || 0), 0);

    const revenueWeek = sumRevenue(thisWeek);
    const revenuePrev = sumRevenue(prevWeek);
    const bookingsWeek = thisWeek.length;
    const bookingsPrev = prevWeek.length;

    const confirmed = active.filter((b) => b.status === 'confirmed').length;
    const confirmationRate = active.length ? Math.round((confirmed / active.length) * 100) : 0;
    const confirmedPrevPool = prevWeek.filter((b) => b.status === 'confirmed').length;
    const confirmationPrev = prevWeek.length
      ? Math.round((confirmedPrevPool / prevWeek.length) * 100)
      : 0;

    const avgValue = bookingsWeek ? revenueWeek / bookingsWeek : 0;
    const avgPrev = bookingsPrev ? revenuePrev / bookingsPrev : 0;

    const byPackage: Record<string, number> = {};
    const bySource: Record<string, number> = {};
    for (const booking of active) {
      byPackage[booking.package_type] = (byPackage[booking.package_type] || 0) + 1;
      const source = booking.source || 'direct';
      bySource[source] = (bySource[source] || 0) + 1;
    }
    for (const message of messages) {
      const source = message.source || 'direct';
      bySource[source] = (bySource[source] || 0) + 1;
    }

    const dayLabels: { key: string; label: string; revenue: number }[] = [];
    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date();
      d.setHours(12, 0, 0, 0);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      dayLabels.push({
        key,
        label: d.toLocaleDateString('en-GB', { weekday: 'short' }),
        revenue: 0,
      });
    }
    for (const booking of thisWeek) {
      const key = booking.created_at.slice(0, 10);
      const bucket = dayLabels.find((d) => d.key === key);
      if (bucket) bucket.revenue += Number(booking.total_price_eur) || 0;
    }

    const todayKey = new Date().toISOString().slice(0, 10);
    const upcoming = active
      .filter((b) => b.slot_date && b.slot_date >= todayKey)
      .sort((a, b) => String(a.slot_date).localeCompare(String(b.slot_date)))
      .slice(0, 5);

    const fallbackRecent = active.slice(0, 5);

    return {
      revenueWeek,
      bookingsWeek,
      confirmationRate,
      avgValue,
      trends: {
        revenue: pctDelta(revenueWeek, revenuePrev),
        bookings: pctDelta(bookingsWeek, bookingsPrev),
        confirmation: confirmationRate - confirmationPrev,
        avgValue: pctDelta(avgValue, avgPrev),
      },
      byPackage,
      bySource,
      sourceTotal: Object.values(bySource).reduce((sum, n) => sum + n, 0),
      chart: dayLabels,
      upcoming: upcoming.length ? upcoming : fallbackRecent,
      usingFallbackUpcoming: upcoming.length === 0,
      newBookings: data?.counts.newBookings ?? 0,
      newMessages: data?.counts.newMessages ?? 0,
    };
  }, [data]);

  const maxPackage = Math.max(1, ...Object.values(analytics.byPackage));
  const sourceEntries = Object.entries(analytics.bySource).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxSource = Math.max(1, ...sourceEntries.map(([, count]) => count));
  const packageEntries = (['basic', 'weekly-event', 'private', 'private-at-location'] as const)
    .map((id) => ({ id, count: analytics.byPackage[id] || 0 }))
    .filter((row) => row.count > 0 || ['basic', 'weekly-event', 'private'].includes(row.id));

  const firstName = 'Rabab';

  return (
    <main className="mx-auto max-w-[1280px] space-y-6 p-4 pb-16 sm:p-7 lg:p-9">
      <section data-admin-reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
            Overview
          </p>
          <h1 className="admin-display mt-1 text-3xl text-[var(--admin-ink)] sm:text-4xl">
            {greetingFor()}, {firstName}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {analytics.newBookings > 0 && (
            <AdminGateLink
              href="/admin/bookings"
              className="admin-focus inline-flex items-center gap-1 rounded-full bg-[var(--admin-accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--admin-accent-strong)]"
            >
              {analytics.newBookings} new booking{analytics.newBookings === 1 ? '' : 's'}
            </AdminGateLink>
          )}
          {analytics.newMessages > 0 && (
            <Link
              href="/admin/messages"
              className="admin-focus rounded-full bg-[var(--admin-accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--admin-accent-strong)]"
            >
              {analytics.newMessages} unread message{analytics.newMessages === 1 ? '' : 's'}
            </Link>
          )}
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section data-admin-reveal className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: 'Revenue this week',
            value: euro(analytics.revenueWeek),
            trend: analytics.trends.revenue,
            icon: Banknote,
          },
          {
            label: 'Bookings this week',
            value: String(analytics.bookingsWeek),
            trend: analytics.trends.bookings,
            icon: BookOpen,
          },
          {
            label: 'Confirmation rate',
            value: `${analytics.confirmationRate}%`,
            trend: analytics.trends.confirmation,
            icon: CheckCircle2,
          },
          {
            label: 'Avg. booking value',
            value: euro(analytics.avgValue),
            trend: analytics.trends.avgValue,
            icon: TrendingUp,
          },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <article key={metric.label} className="admin-card p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-[var(--admin-accent-soft)] text-[var(--admin-accent-strong)]">
                  <Icon className="size-[18px]" strokeWidth={2} />
                </span>
                <TrendPill value={metric.trend} />
              </div>
              <p className="admin-display mt-5 text-3xl text-[var(--admin-ink)] sm:text-[34px]">
                {data ? metric.value : '—'}
              </p>
              <p className="mt-1.5 text-sm text-[var(--admin-muted)]">{metric.label}</p>
            </article>
          );
        })}
      </section>

      <section data-admin-scroll-reveal className="grid gap-4 xl:grid-cols-[1.35fr_.65fr]">
        <article className="admin-card overflow-hidden p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--admin-muted)]">
                Last 7 days
              </p>
              <h2 className="admin-display mt-1 text-2xl text-[var(--admin-ink)]">Revenue</h2>
              <AccentWave />
            </div>
            <Link
              href="/admin/reports"
              className="admin-focus text-xs font-bold text-[var(--admin-accent-strong)]"
            >
              Full reports
            </Link>
          </div>
          <div className="mt-4 h-56 w-full sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.chart} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="adminRevenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ed843e" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#ed843e" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b645c', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b645c', fontSize: 11 }}
                  tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : String(v))}
                />
                <Tooltip
                  formatter={(value: number | string) => [euro(Number(value)), 'Revenue']}
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #e8e2da',
                    boxShadow: '0 8px 24px rgb(23 20 18 / 8%)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ed843e"
                  strokeWidth={2.5}
                  fill="url(#adminRevenueFill)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#ed843e', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="admin-card p-5 sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--admin-muted)]">
            Attribution
          </p>
          <h2 className="admin-display mt-1 text-2xl text-[var(--admin-ink)]">
            Where bookings come from
          </h2>
          <AccentWave />
          <div className="mt-6 space-y-5">
            {sourceEntries.map(([source, count]) => {
              const percentage = analytics.sourceTotal
                ? Math.round((count / analytics.sourceTotal) * 100)
                : 0;
              const bar = Math.round((count / maxSource) * 100);
              return (
                <div key={source}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-[var(--admin-copy)]">
                      {formatLeadSourceLabel(source)}
                    </span>
                    <span className="tabular-nums text-[var(--admin-muted)]">{percentage}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--admin-surface-soft)]">
                    <div
                      className="h-full rounded-full bg-[var(--admin-accent)] transition-[width] duration-700"
                      style={{ width: `${count ? Math.max(8, bar) : 0}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {sourceEntries.length === 0 && (
              <p className="text-sm text-[var(--admin-muted)]">
                Source data appears once guests book or message with attribution.
              </p>
            )}
          </div>
        </article>
      </section>

      <section data-admin-scroll-reveal className="grid gap-4 xl:grid-cols-[1.35fr_.65fr]">
        <article className="admin-card overflow-hidden">
          <div className="flex items-start justify-between gap-3 border-b border-[var(--admin-line)] p-5 sm:p-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--admin-muted)]">
                {analytics.usingFallbackUpcoming ? 'Recent requests' : 'Next 7 days'}
              </p>
              <h2 className="admin-display mt-1 text-2xl text-[var(--admin-ink)]">
                Upcoming sessions
              </h2>
              <AccentWave />
            </div>
            <AdminGateLink
              href="/admin/bookings"
              className="admin-focus inline-flex items-center gap-1 text-xs font-bold text-[var(--admin-ink)]"
            >
              View all
            </AdminGateLink>
          </div>
          <div>
            {analytics.upcoming.map((booking) => (
              <AdminGateLink
                key={booking.id}
                href="/admin/bookings"
                className="admin-focus flex items-center gap-3 border-b border-[var(--admin-line)] px-5 py-4 last:border-0 hover:bg-[var(--admin-surface-soft)]"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--admin-surface-soft)] text-[var(--admin-muted)]">
                  <Clock3 className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="admin-display truncate text-lg leading-tight text-[var(--admin-ink)]">
                    {PACKAGE_LABELS[booking.package_type] || booking.package_type}
                    {booking.dish_name ? ` · ${booking.dish_name}` : ''}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--admin-muted)]">
                    {formatSessionWhen(booking)} · {booking.full_name}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-medium tabular-nums text-[var(--admin-muted)]">
                  {guestCount(booking)} guest{guestCount(booking) === 1 ? '' : 's'}
                </span>
              </AdminGateLink>
            ))}
            {!analytics.upcoming.length && (
              <div className="grid min-h-44 place-items-center p-8 text-center">
                <div>
                  <Users className="mx-auto size-8 text-[var(--admin-line-strong)]" />
                  <p className="mt-3 text-sm font-semibold text-[var(--admin-copy)]">
                    No sessions scheduled yet
                  </p>
                  <p className="mt-1 text-xs text-[var(--admin-muted)]">
                    Upcoming bookings with dates will show here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </article>

        <article className="admin-card p-5 sm:p-6">
          <h2 className="admin-display text-2xl text-[var(--admin-ink)]">Package popularity</h2>
          <AccentWave />
          <div className="mt-6 space-y-5">
            {packageEntries.map((row) => {
              const bar = Math.round((row.count / maxPackage) * 100);
              return (
                <div key={row.id}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-[var(--admin-copy)]">
                      {PACKAGE_LABELS[row.id]}
                    </span>
                    <span className="tabular-nums text-[var(--admin-muted)]">{row.count}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[var(--admin-surface-soft)]">
                    <div
                      className="h-full rounded-full bg-[var(--admin-ink)] transition-[width] duration-700"
                      style={{ width: `${row.count ? Math.max(8, bar) : 0}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {analytics.bookingsWeek === 0 && Object.keys(analytics.byPackage).length === 0 && (
              <p className="text-sm text-[var(--admin-muted)]">
                Package mix builds automatically from bookings.
              </p>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
