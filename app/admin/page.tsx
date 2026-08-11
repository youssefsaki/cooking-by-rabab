'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Gauge,
  Clock3,
  Image as ImageIcon,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  Store,
  Users,
} from 'lucide-react';
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
};

function timeAgo(value: string) {
  const diff = Math.max(0, Date.now() - new Date(value).getTime());
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
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
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const last7 = bookings.filter((booking) => now - new Date(booking.created_at).getTime() < weekMs);
    const byPackage: Record<string, number> = {};
    const bySource: Record<string, number> = {};

    for (const booking of bookings) {
      byPackage[booking.package_type] = (byPackage[booking.package_type] || 0) + 1;
      const source = booking.source || 'direct';
      bySource[source] = (bySource[source] || 0) + 1;
    }
    for (const message of messages) {
      const source = message.source || 'direct';
      bySource[source] = (bySource[source] || 0) + 1;
    }

    const confirmed = bookings.filter((booking) => booking.status === 'confirmed').length;
    const countries = new Set(bookings.map((booking) => booking.country).filter(Boolean));
    const sourceTotal = Object.values(bySource).reduce((sum, n) => sum + n, 0);

    return {
      totalBookings: bookings.length,
      totalMessages: messages.length,
      last7: last7.length,
      confirmed,
      countries: countries.size,
      byPackage,
      bySource,
      sourceTotal,
      confirmationRate: bookings.length ? Math.round((confirmed / bookings.length) * 100) : 0,
    };
  }, [data]);

  const maxPackage = Math.max(1, ...Object.values(analytics.byPackage));
  const sourceEntries = Object.entries(analytics.bySource).sort((a, b) => b[1] - a[1]);
  const maxSource = Math.max(1, ...sourceEntries.map(([, count]) => count));
  const recentBookings = (data?.bookings || []).slice(0, 4);

  return (
    <main className="mx-auto max-w-[1280px] space-y-6 p-4 pb-16 sm:p-7 lg:p-9">
      {/* 01 — reveal-up */}
      <section
        data-admin-reveal
        className="relative overflow-hidden rounded-[28px] bg-[var(--admin-ink)] px-6 py-7 text-white shadow-[var(--admin-shadow-lg)] sm:px-9 sm:py-9"
      >
        <div className="pointer-events-none absolute -right-20 -top-32 size-80 rounded-full bg-[var(--admin-accent)]/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-20 h-32 w-72 rounded-t-full border border-[var(--admin-accent)]/20 bg-[linear-gradient(180deg,rgba(54,244,164,.08),transparent)]" />
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--admin-accent)]">
              <span className="size-2 rounded-full bg-[var(--admin-accent)] shadow-[0_0_18px_#36f4a4]" />
              Experience control room
            </div>
            <h1 className="admin-display text-4xl leading-[0.96] sm:text-6xl">
              Your mountain kitchen,
              <span className="block text-white/50">under control.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
              Manage traveler requests, publish your story, and keep every cooking experience ready to book.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/admin/content"
              className="admin-focus inline-flex items-center gap-2 rounded-full bg-[var(--admin-accent)] px-5 py-3 text-sm font-bold text-[var(--admin-ink)] transition hover:scale-[1.02] hover:bg-white"
            >
              <Sparkles className="size-4" />
              Open visual editor
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="admin-focus inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View website
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* 02 — stagger-grid */}
      <section data-admin-reveal className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: 'New requests',
            value: data?.counts.newBookings ?? '—',
            note: 'Need your attention',
            icon: Clock3,
            href: '/admin/bookings',
          },
          {
            label: 'Last 7 days',
            value: analytics.last7,
            note: 'Traveler enquiries',
            icon: CalendarDays,
            href: '/admin/bookings',
          },
          {
            label: 'Confirmed',
            value: analytics.confirmed,
            note: `${analytics.confirmationRate}% confirmation rate`,
            icon: CheckCircle2,
            href: '/admin/bookings',
          },
          {
            label: 'Countries reached',
            value: analytics.countries,
            note: 'International guests',
            icon: MapPin,
            href: '/admin/bookings',
          },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <Link
              key={metric.label}
              href={metric.href}
              className="admin-card admin-focus group p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--admin-accent-strong)] hover:shadow-[var(--admin-shadow-lg)]"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-9 place-items-center rounded-xl bg-[var(--admin-accent-soft)] text-[var(--admin-ink)]">
                  <Icon className="size-[18px]" />
                </span>
                <ArrowUpRight className="size-4 text-[var(--admin-muted)] transition group-hover:text-[var(--admin-ink)]" />
              </div>
              <p className="admin-display mt-7 text-4xl text-[var(--admin-ink)]">{metric.value}</p>
              <p className="mt-2 text-sm font-semibold text-[var(--admin-copy)]">{metric.label}</p>
              <p className="mt-1 text-xs text-[var(--admin-muted)]">{metric.note}</p>
            </Link>
          );
        })}
      </section>

      {/* 03 — sticky-stack */}
      <section data-admin-scroll-reveal className="grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
        <article className="admin-card overflow-hidden">
          <div className="flex items-start justify-between border-b border-[var(--admin-line)] p-5 sm:p-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--admin-muted)]">
                Booking intelligence
              </p>
              <h2 className="admin-display mt-2 text-2xl text-[var(--admin-ink)]">What travelers choose</h2>
            </div>
            <div className="rounded-full bg-[var(--admin-surface-soft)] px-3 py-1.5 text-xs text-[var(--admin-muted)]">
              All time
            </div>
          </div>
          <div className="space-y-6 p-5 sm:p-6">
            {['basic', 'weekly-event', 'private'].map((packageId, index) => {
              const count = analytics.byPackage[packageId] || 0;
              const percentage = Math.round((count / maxPackage) * 100);
              return (
                <div key={packageId}>
                  <div className="mb-2.5 flex items-end justify-between gap-4">
                    <div>
                      <span className="mr-2 text-xs font-bold text-[var(--admin-accent-strong)]">
                        0{index + 1}
                      </span>
                      <span className="text-sm font-semibold text-[var(--admin-copy)]">
                        {PACKAGE_LABELS[packageId]}
                      </span>
                    </div>
                    <span className="text-xs text-[var(--admin-muted)]">{count} bookings</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[var(--admin-surface-soft)]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--admin-ink),var(--admin-accent-strong))] transition-[width] duration-1000"
                      style={{ width: `${count ? Math.max(12, percentage) : 0}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {analytics.totalBookings === 0 && (
              <div className="rounded-2xl bg-[var(--admin-surface-soft)] p-4 text-sm text-[var(--admin-muted)]">
                New booking data will build this view automatically.
              </div>
            )}
          </div>
        </article>

        <article className="relative overflow-hidden rounded-[var(--admin-radius-md)] bg-[var(--admin-ink)] p-6 text-white shadow-[var(--admin-shadow-sm)]">
          <div className="absolute right-0 top-0 size-40 rounded-full bg-[var(--admin-accent)]/10 blur-3xl" />
          <div className="relative flex h-full min-h-72 flex-col">
            <div className="flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-2xl bg-[var(--admin-accent)] text-[var(--admin-ink)]">
                <Gauge className="size-5" />
              </span>
              <span className="rounded-full border border-white/12 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
                Store health
              </span>
            </div>
            <div className="mt-auto pt-12">
              <p className="admin-display text-6xl">{analytics.confirmationRate}%</p>
              <h2 className="mt-3 text-lg font-semibold">Confirmation rate</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/55">
                Keep response times short and move new requests to confirmed as soon as guests approve.
              </p>
              <Link
                href="/admin/bookings"
                className="admin-focus mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--admin-accent)]"
              >
                Review bookings <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>
        </article>
      </section>

      <section data-admin-scroll-reveal className="admin-card overflow-hidden">
        <div className="flex items-start justify-between border-b border-[var(--admin-line)] p-5 sm:p-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--admin-muted)]">
              Attribution
            </p>
            <h2 className="admin-display mt-2 text-2xl text-[var(--admin-ink)]">Where guests find you</h2>
          </div>
          <div className="rounded-full bg-[var(--admin-surface-soft)] px-3 py-1.5 text-xs text-[var(--admin-muted)]">
            Bookings + inbox
          </div>
        </div>
        <div className="space-y-6 p-5 sm:p-6">
          {sourceEntries.map(([source, count], index) => {
            const percentage = analytics.sourceTotal
              ? Math.round((count / analytics.sourceTotal) * 100)
              : 0;
            const bar = Math.round((count / maxSource) * 100);
            return (
              <div key={source}>
                <div className="mb-2.5 flex items-end justify-between gap-4">
                  <div>
                    <span className="mr-2 text-xs font-bold text-[var(--admin-accent-strong)]">
                      0{index + 1}
                    </span>
                    <span className="text-sm font-semibold text-[var(--admin-copy)]">
                      {formatLeadSourceLabel(source)}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--admin-muted)]">
                    {percentage}% · {count}
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[var(--admin-surface-soft)]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--admin-ink),var(--admin-accent-strong))] transition-[width] duration-1000"
                    style={{ width: `${count ? Math.max(12, bar) : 0}%` }}
                  />
                </div>
              </div>
            );
          })}
          {sourceEntries.length === 0 && (
            <div className="rounded-2xl bg-[var(--admin-surface-soft)] p-4 text-sm text-[var(--admin-muted)]">
              Source data appears once guests book or message with attribution.
            </div>
          )}
        </div>
      </section>

      {/* 04 — pinned-preview */}
      <section
        data-admin-scroll-reveal
        className="relative overflow-hidden rounded-[var(--admin-radius-lg)] border border-[var(--admin-line)] bg-[#e9ece6] p-4 shadow-[var(--admin-shadow-sm)] sm:p-6"
      >
        <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div className="p-2 sm:p-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--admin-ink)]">
              <Store className="size-3.5" />
              Visual storefront
            </span>
            <h2 className="admin-display mt-6 text-3xl leading-tight text-[var(--admin-ink)] sm:text-4xl">
              Edit the story your guests see.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[var(--admin-muted)]">
              Select text directly in the preview or click any photograph to replace it. Images upload and publish automatically.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/admin/content"
                className="admin-focus inline-flex items-center gap-2 rounded-full bg-[var(--admin-ink)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--admin-ink-soft)]"
              >
                Customize website
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="/admin/media"
                className="admin-focus inline-flex items-center gap-2 rounded-full border border-[var(--admin-line-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--admin-ink)]"
              >
                <ImageIcon className="size-4" />
                Media library
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/70 bg-white p-2 shadow-[var(--admin-shadow-lg)]">
            <div className="flex items-center gap-1.5 border-b border-[var(--admin-line)] px-2 pb-2">
              <span className="size-2 rounded-full bg-[#ff6b6b]" />
              <span className="size-2 rounded-full bg-[#ffd166]" />
              <span className="size-2 rounded-full bg-[var(--admin-accent)]" />
              <span className="ml-2 text-[9px] text-[var(--admin-muted)]">taghazout-cooking-class.com</span>
            </div>
            <div className="relative mt-2 aspect-[16/8] overflow-hidden rounded-xl bg-[var(--admin-ink)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero/desktop/bg.jpg"
                alt="Cooking by Rabab storefront preview"
                className="absolute inset-0 size-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-y-0 left-0 flex max-w-[60%] flex-col justify-center p-6 text-white sm:p-9">
                <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[var(--admin-accent)]">
                  Authentic Amazigh cuisine
                </span>
                <p className="admin-display mt-2 text-xl leading-none sm:text-3xl">Cook beyond the coast.</p>
                <span className="mt-4 w-fit rounded-full bg-[var(--admin-accent)] px-3 py-1.5 text-[8px] font-bold text-[var(--admin-ink)]">
                  Book your experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — progressive-disclosure */}
      <section data-admin-scroll-reveal className="grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
        <article className="admin-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--admin-line)] p-5">
            <div>
              <h2 className="text-base font-semibold text-[var(--admin-ink)]">Latest traveler requests</h2>
              <p className="mt-1 text-xs text-[var(--admin-muted)]">Recent booking activity</p>
            </div>
            <Link href="/admin/bookings" className="admin-focus text-xs font-bold text-[var(--admin-ink)]">
              View all
            </Link>
          </div>
          <div>
            {recentBookings.map((booking) => (
              <Link
                key={booking.id}
                href="/admin/bookings"
                className="admin-focus group flex items-center gap-3 border-b border-[var(--admin-line)] px-5 py-4 last:border-0 hover:bg-[var(--admin-surface-soft)]"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--admin-accent-soft)] text-sm font-bold text-[var(--admin-ink)]">
                  {booking.full_name.slice(0, 1).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[var(--admin-copy)]">{booking.full_name}</p>
                  <p className="mt-0.5 truncate text-xs text-[var(--admin-muted)]">
                    {PACKAGE_LABELS[booking.package_type]} · {booking.country}
                  </p>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-[var(--admin-surface-soft)] px-2.5 py-1 text-[10px] font-semibold capitalize text-[var(--admin-muted)]">
                    {booking.status}
                  </span>
                  <p className="mt-1.5 text-[10px] text-[var(--admin-muted)]">{timeAgo(booking.created_at)}</p>
                </div>
              </Link>
            ))}
            {!recentBookings.length && (
              <div className="grid min-h-44 place-items-center p-8 text-center">
                <div>
                  <Users className="mx-auto size-8 text-[var(--admin-line-strong)]" />
                  <p className="mt-3 text-sm font-semibold text-[var(--admin-copy)]">No traveler requests yet</p>
                  <p className="mt-1 text-xs text-[var(--admin-muted)]">They will appear here as soon as guests book.</p>
                </div>
              </div>
            )}
          </div>
        </article>

        <article className="admin-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[var(--admin-ink)]">Inbox</h2>
              <p className="mt-1 text-xs text-[var(--admin-muted)]">Guest questions</p>
            </div>
            <span className="grid size-10 place-items-center rounded-xl bg-[var(--admin-accent-soft)]">
              <Mail className="size-4 text-[var(--admin-ink)]" />
            </span>
          </div>
          <p className="admin-display mt-8 text-5xl text-[var(--admin-ink)]">{analytics.totalMessages}</p>
          <p className="mt-2 text-sm text-[var(--admin-muted)]">
            {data?.counts.newMessages || 0} unread messages need a response.
          </p>
          <Link
            href="/admin/messages"
            className="admin-focus mt-6 flex w-full items-center justify-between rounded-xl bg-[var(--admin-ink)] px-4 py-3 text-sm font-semibold text-white"
          >
            Open inbox
            <MessageCircle className="size-4 text-[var(--admin-accent)]" />
          </Link>
        </article>
      </section>

      {/* 06 — snap-row */}
      <section data-admin-scroll-reveal>
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--admin-muted)]">Quick actions</p>
            <h2 className="admin-display mt-1 text-2xl text-[var(--admin-ink)]">Keep moving</h2>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { href: '/admin/content', icon: Store, title: 'Edit storefront', note: 'Text, translations and photos' },
            { href: '/admin/media', icon: ImageIcon, title: 'Organize images', note: 'Upload traveler-ready photography' },
            { href: '/admin/bookings', icon: BookOpen, title: 'Review requests', note: 'Confirm upcoming experiences' },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="admin-card admin-focus group flex items-center gap-4 p-4 transition hover:border-[var(--admin-accent-strong)]"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-[var(--admin-surface-soft)] text-[var(--admin-ink)] transition group-hover:bg-[var(--admin-accent)]">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[var(--admin-copy)]">{action.title}</p>
                  <p className="mt-0.5 truncate text-xs text-[var(--admin-muted)]">{action.note}</p>
                </div>
                <ChevronRight className="size-4 text-[var(--admin-muted)]" />
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
