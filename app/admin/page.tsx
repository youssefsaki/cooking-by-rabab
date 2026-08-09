'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { BookingRow, ContactMessageRow } from '@/lib/types/cms';

type AdminPayload = {
  ok: boolean;
  error?: string;
  bookings: BookingRow[];
  contactMessages: ContactMessageRow[];
  counts: { newBookings: number; newMessages: number };
};

export default function AdminHomePage() {
  const [data, setData] = useState<AdminPayload | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin')
      .then((r) => r.json())
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
    const last7 = bookings.filter((b) => now - new Date(b.created_at).getTime() < weekMs);
    const byPackage: Record<string, number> = {};
    for (const b of bookings) {
      byPackage[b.package_type] = (byPackage[b.package_type] || 0) + 1;
    }
    const confirmed = bookings.filter((b) => b.status === 'confirmed').length;
    return {
      totalBookings: bookings.length,
      totalMessages: messages.length,
      last7: last7.length,
      confirmed,
      byPackage,
      conversionHint: bookings.length
        ? Math.round((confirmed / bookings.length) * 100)
        : 0,
    };
  }, [data]);

  const maxPkg = Math.max(1, ...Object.values(analytics.byPackage));

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[#202223]">Home</h1>
          <p className="text-sm text-[#6D7175]">Analytics and shortcuts for your cooking class store.</p>
        </div>
        <Link
          href="/admin/content"
          className="rounded-lg bg-[#008060] text-white text-sm font-semibold px-4 py-2.5 shadow-sm hover:bg-[#006e52]"
        >
          Customize storefront
        </Link>
      </div>

      {error && (
        <div className="rounded-lg border border-[#FED3D1] bg-[#FFF4F4] px-4 py-3 text-sm text-[#D72C0D]">
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'New bookings', value: data?.counts.newBookings ?? '—', href: '/admin/bookings' },
          { label: 'Bookings (7 days)', value: analytics.last7, href: '/admin/bookings' },
          { label: 'Total bookings', value: analytics.totalBookings, href: '/admin/bookings' },
          { label: 'New messages', value: data?.counts.newMessages ?? '—', href: '/admin/messages' },
        ].map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl bg-white border border-[#E1E3E5] p-4 shadow-sm hover:shadow transition"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6D7175]">{card.label}</p>
            <p className="text-3xl font-semibold mt-2 text-[#202223]">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl bg-white border border-[#E1E3E5] p-5 shadow-sm">
          <h2 className="font-semibold text-[#202223] mb-1">Bookings by package</h2>
          <p className="text-xs text-[#6D7175] mb-4">All-time distribution</p>
          <div className="space-y-3">
            {['basic', 'weekly-event', 'private'].map((pkg) => {
              const count = analytics.byPackage[pkg] || 0;
              const pct = Math.round((count / maxPkg) * 100);
              return (
                <div key={pkg}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize font-medium">{pkg.replace('-', ' ')}</span>
                    <span className="text-[#6D7175]">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#E4E5E7] overflow-hidden">
                    <div className="h-full rounded-full bg-[#008060]" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
            {analytics.totalBookings === 0 && (
              <p className="text-sm text-[#6D7175]">No bookings yet — they’ll show up here.</p>
            )}
          </div>
        </div>

        <div className="rounded-xl bg-white border border-[#E1E3E5] p-5 shadow-sm space-y-4">
          <div>
            <h2 className="font-semibold text-[#202223]">Performance</h2>
            <p className="text-xs text-[#6D7175]">Quick health checks</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-[#F6F6F7] p-3">
              <p className="text-xs text-[#6D7175]">Confirmed rate</p>
              <p className="text-2xl font-semibold">{analytics.conversionHint}%</p>
            </div>
            <div className="rounded-lg bg-[#F6F6F7] p-3">
              <p className="text-xs text-[#6D7175]">Inbox total</p>
              <p className="text-2xl font-semibold">{analytics.totalMessages}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <Link href="/admin/bookings" className="text-sm font-semibold text-[#008060] underline">
              View orders
            </Link>
            <Link href="/admin/messages" className="text-sm font-semibold text-[#008060] underline">
              Open inbox
            </Link>
            <Link href="/admin/media" className="text-sm font-semibold text-[#008060] underline">
              Manage files
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
