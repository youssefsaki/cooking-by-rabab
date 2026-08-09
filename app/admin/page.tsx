'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Counts = { newBookings: number; newMessages: number };

export default function AdminHomePage() {
  const [counts, setCounts] = useState<Counts>({ newBookings: 0, newMessages: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin')
      .then((r) => r.json())
      .then((data) => {
        if (!data.ok) {
          setError(data.error || 'Failed to load');
          return;
        }
        setCounts(data.counts);
      })
      .catch(() => setError('Failed to load dashboard'));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-amber-950">Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage bookings, messages, and website content.</p>
      </div>

      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {error}. Configure Supabase env vars and run the SQL migration to activate the CMS.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/admin/bookings"
          className="rounded-2xl bg-white border border-amber-100 p-6 shadow-sm hover:shadow-md transition"
        >
          <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide">New bookings</p>
          <p className="text-4xl font-black text-amber-950 mt-2">{counts.newBookings}</p>
        </Link>
        <Link
          href="/admin/messages"
          className="rounded-2xl bg-white border border-amber-100 p-6 shadow-sm hover:shadow-md transition"
        >
          <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide">New messages</p>
          <p className="text-4xl font-black text-amber-950 mt-2">{counts.newMessages}</p>
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/admin/content" className="rounded-xl bg-amber-600 text-white font-bold text-center py-4">
          Edit content
        </Link>
        <Link href="/admin/media" className="rounded-xl bg-white border border-amber-200 font-bold text-center py-4 text-amber-900">
          Upload media
        </Link>
        <Link href="/admin/settings" className="rounded-xl bg-white border border-amber-200 font-bold text-center py-4 text-amber-900">
          Contact settings
        </Link>
      </div>
    </div>
  );
}
