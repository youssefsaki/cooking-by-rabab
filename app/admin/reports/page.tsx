'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Banknote,
  CalendarDays,
  Package,
  Receipt,
  TrendingUp,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ReportPayload = {
  ok: boolean;
  error?: string;
  currency?: string;
  from?: string;
  to?: string;
  byDay?: { date: string; revenue: number; bookings: number }[];
  byPackage?: { packageType: string; revenue: number; bookings: number }[];
  totals?: { revenue: number; bookings: number; averageBookingValue: number };
};

const PACKAGE_LABELS: Record<string, string> = {
  basic: 'Amazigh cooking',
  'weekly-event': 'Sunset music event',
  private: 'Private experience',
  'private-at-location': 'At your location',
};

function euro(value: number) {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

function euroExact(value: number) {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function defaultRange() {
  const to = new Date();
  const from = new Date();
  from.setUTCDate(from.getUTCDate() - 29);
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
}

export default function AdminReportsPage() {
  const defaults = useMemo(() => defaultRange(), []);
  const [from, setFrom] = useState(defaults.from);
  const [to, setTo] = useState(defaults.to);
  const [applied, setApplied] = useState(defaults);
  const [data, setData] = useState<ReportPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    const qs = new URLSearchParams({ from: applied.from, to: applied.to });
    fetch(`/api/admin/reports?${qs}`)
      .then((res) => res.json())
      .then((payload: ReportPayload) => {
        if (cancelled) return;
        if (!payload.ok) {
          setError(payload.error || 'Failed to load reports');
          setData(null);
          return;
        }
        setData(payload);
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load reports');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [applied]);

  const maxPackageRevenue = Math.max(1, ...(data?.byPackage || []).map((p) => p.revenue));
  const chartData = (data?.byDay || []).map((d) => ({
    ...d,
    label: d.date.slice(5),
  }));

  return (
    <main className="mx-auto max-w-[1280px] space-y-6 p-4 pb-16 sm:p-7 lg:p-9">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--admin-muted)]">
            Revenue
          </p>
          <h1 className="admin-display mt-2 text-3xl text-[var(--admin-ink)] sm:text-4xl">
            Booking reports
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[var(--admin-muted)]">
            Totals use <span className="font-semibold text-[var(--admin-copy)]">total_price_eur</span>.
            Cancelled bookings are excluded.
          </p>
        </div>
        <form
          className="flex flex-wrap items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setApplied({ from, to });
          }}
        >
          <label className="text-xs font-semibold text-[var(--admin-copy)]">
            From
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="admin-focus mt-1 block rounded-xl border border-[var(--admin-line-strong)] bg-white px-3 py-2 text-sm"
            />
          </label>
          <label className="text-xs font-semibold text-[var(--admin-copy)]">
            To
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="admin-focus mt-1 block rounded-xl border border-[var(--admin-line-strong)] bg-white px-3 py-2 text-sm"
            />
          </label>
          <button
            type="submit"
            className="admin-focus rounded-xl bg-[var(--admin-ink)] px-4 py-2.5 text-sm font-bold text-white hover:bg-[var(--admin-ink-soft)]"
          >
            Apply
          </button>
        </form>
      </section>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: 'Total revenue',
            value: data?.totals ? euro(data.totals.revenue) : '—',
            note: `${applied.from} → ${applied.to}`,
            icon: Banknote,
          },
          {
            label: 'Bookings',
            value: data?.totals?.bookings ?? '—',
            note: 'Excluding cancelled',
            icon: Receipt,
          },
          {
            label: 'Average value',
            value: data?.totals ? euroExact(data.totals.averageBookingValue) : '—',
            note: 'Per booking',
            icon: TrendingUp,
          },
          {
            label: 'Top package',
            value: data?.byPackage?.[0]
              ? PACKAGE_LABELS[data.byPackage[0].packageType] || data.byPackage[0].packageType
              : '—',
            note: data?.byPackage?.[0] ? euro(data.byPackage[0].revenue) : 'No data yet',
            icon: Package,
          },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <article
              key={metric.label}
              className="admin-card p-5 transition duration-300 hover:border-[var(--admin-accent-strong)] hover:shadow-[var(--admin-shadow-lg)]"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-9 place-items-center rounded-xl bg-[var(--admin-accent-soft)] text-[var(--admin-ink)]">
                  <Icon className="size-[18px]" />
                </span>
                <CalendarDays className="size-4 text-[var(--admin-muted)]" />
              </div>
              <p className="admin-display mt-7 text-3xl text-[var(--admin-ink)] sm:text-4xl">
                {loading ? '…' : metric.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--admin-copy)]">{metric.label}</p>
              <p className="mt-1 text-xs text-[var(--admin-muted)]">{metric.note}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_.65fr]">
        <article className="admin-card overflow-hidden">
          <div className="flex items-start justify-between border-b border-[var(--admin-line)] p-5 sm:p-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--admin-muted)]">
                Daily revenue
              </p>
              <h2 className="admin-display mt-2 text-2xl text-[var(--admin-ink)]">Last selected range</h2>
            </div>
            <Link
              href="/admin/bookings"
              className="admin-focus inline-flex items-center gap-1 text-xs font-bold text-[var(--admin-ink)]"
            >
              Bookings <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <div className="h-72 p-4 sm:p-6">
            {loading ? (
              <p className="text-sm text-[var(--admin-muted)]">Loading chart…</p>
            ) : chartData.every((d) => d.revenue === 0) ? (
              <div className="grid h-full place-items-center rounded-2xl bg-[var(--admin-surface-soft)] text-sm text-[var(--admin-muted)]">
                No revenue in this range yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ed843e" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#ed843e" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e8ebe6" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: '#687473', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    minTickGap={24}
                  />
                  <YAxis
                    tick={{ fill: '#687473', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={48}
                    tickFormatter={(v) => `€${v}`}
                  />
                  <Tooltip
                    formatter={(value: number) => [euroExact(value), 'Revenue']}
                    labelFormatter={(label) => `Day ${label}`}
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid #dfe3dd',
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ed843e"
                    strokeWidth={2}
                    fill="url(#revenueFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </article>

        <article className="admin-card overflow-hidden">
          <div className="border-b border-[var(--admin-line)] p-5 sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--admin-muted)]">
              By package
            </p>
            <h2 className="admin-display mt-2 text-2xl text-[var(--admin-ink)]">Mix</h2>
          </div>
          <div className="space-y-5 p-5 sm:p-6">
            {(data?.byPackage || []).length === 0 && !loading && (
              <div className="rounded-2xl bg-[var(--admin-surface-soft)] p-4 text-sm text-[var(--admin-muted)]">
                Package revenue will appear once bookings land in this range.
              </div>
            )}
            {(data?.byPackage || []).map((pkg, index) => {
              const percentage = Math.round((pkg.revenue / maxPackageRevenue) * 100);
              return (
                <div key={pkg.packageType}>
                  <div className="mb-2.5 flex items-end justify-between gap-4">
                    <div>
                      <span className="mr-2 text-xs font-bold text-[var(--admin-accent-strong)]">
                        0{index + 1}
                      </span>
                      <span className="text-sm font-semibold text-[var(--admin-copy)]">
                        {PACKAGE_LABELS[pkg.packageType] || pkg.packageType}
                      </span>
                    </div>
                    <span className="text-xs text-[var(--admin-muted)]">
                      {euro(pkg.revenue)} · {pkg.bookings}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[var(--admin-surface-soft)]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--admin-ink),var(--admin-accent-strong))] transition-[width] duration-1000"
                      style={{ width: `${pkg.revenue ? Math.max(12, percentage) : 0}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="admin-card overflow-hidden">
        <div className="border-b border-[var(--admin-line)] p-5">
          <h2 className="text-base font-semibold text-[var(--admin-ink)]">Package breakdown</h2>
          <p className="mt-1 text-xs text-[var(--admin-muted)]">Same range, bar comparison</p>
        </div>
        <div className="h-64 p-4 sm:p-6">
          {loading ? (
            <p className="text-sm text-[var(--admin-muted)]">Loading…</p>
          ) : (data?.byPackage || []).length === 0 ? (
            <div className="grid h-full place-items-center text-sm text-[var(--admin-muted)]">No data</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={(data?.byPackage || []).map((p) => ({
                  name: PACKAGE_LABELS[p.packageType] || p.packageType,
                  revenue: p.revenue,
                }))}
                margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
              >
                <CartesianGrid stroke="#e8ebe6" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#687473', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: '#687473', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={48}
                  tickFormatter={(v) => `€${v}`}
                />
                <Tooltip
                  formatter={(value: number) => [euroExact(value), 'Revenue']}
                  contentStyle={{ borderRadius: 12, border: '1px solid #dfe3dd', fontSize: 12 }}
                />
                <Bar dataKey="revenue" fill="#061a1c" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>
    </main>
  );
}
