'use client';

import { useEffect, useState } from 'react';
import type { BookingRow } from '@/lib/types/cms';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin');
    const data = await res.json();
    if (!data.ok) {
      setError(data.error || 'Failed to load');
    } else {
      setBookings(data.bookings || []);
      setError('');
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch('/api/admin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'booking', id, status }),
    });
    await load();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-black text-amber-950">Bookings</h1>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-amber-100 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-amber-50 text-left">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Package</th>
                <th className="px-4 py-3">Dietary</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t border-amber-50 align-top">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(b.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-semibold">{b.full_name}</td>
                  <td className="px-4 py-3">
                    <div>{b.email}</div>
                    <div className="text-gray-500">{b.phone}</div>
                    <div className="text-gray-500">{b.country}</div>
                  </td>
                  <td className="px-4 py-3">{b.package_type}</td>
                  <td className="px-4 py-3">
                    {b.dietary_preference}
                    {b.allergies ? <div className="text-gray-500">{b.allergies}</div> : null}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={b.status}
                      onChange={(e) => updateStatus(b.id, e.target.value)}
                      className="rounded border border-gray-300 px-2 py-1"
                    >
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="confirmed">confirmed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No bookings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
