'use client';

import { useEffect, useState } from 'react';
import type { BookingRow } from '@/lib/types/cms';
import { formatLeadSourceLabel } from '@/lib/lead-source';

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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-[#202223]">Orders</h1>
        <p className="text-sm text-[#6D7175]">Booking requests from your storefront.</p>
      </div>
      {error && (
        <div className="rounded-lg border border-[#FED3D1] bg-[#FFF4F4] px-4 py-3 text-sm text-[#D72C0D]">
          {error}
        </div>
      )}
      {loading ? (
        <p className="text-sm text-[#6D7175]">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#E1E3E5] bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F6F6F7] text-left text-[#6D7175]">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Package / slot</th>
                <th className="px-4 py-3 font-semibold">Guests / dish</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t border-[#E1E3E5] align-top hover:bg-[#FAFBFB]">
                  <td className="px-4 py-3 whitespace-nowrap text-[#6D7175]">
                    {new Date(b.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#202223]">{b.full_name}</td>
                  <td className="px-4 py-3">
                    <div>{b.email}</div>
                    <div className="text-[#6D7175]">{b.phone}</div>
                    <div className="text-[#6D7175]">{b.country}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="capitalize font-medium">{b.package_type}</div>
                    {b.slot_date ? (
                      <div className="text-[#6D7175]">
                        {b.slot_date} · {b.slot_period}
                      </div>
                    ) : null}
                    {b.location ? <div className="text-[#6D7175] text-xs mt-1">{b.location}</div> : null}
                    {b.total_price_eur != null ? (
                      <div className="text-[#6D7175] text-xs">€{b.total_price_eur}</div>
                    ) : null}
                    {b.promo_code ? (
                      <div className="text-[#6D7175] text-xs mt-1">
                        Promo {b.promo_code}
                        {b.discount_eur != null ? ` (−€${b.discount_eur})` : ''}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      {b.adults ?? 1} adult{(b.adults ?? 1) === 1 ? '' : 's'}
                      {Array.isArray(b.children) && b.children.length > 0
                        ? ` · ${b.children.length} child${b.children.length === 1 ? '' : 'ren'}`
                        : ''}
                    </div>
                    {b.dish_name ? <div className="text-[#6D7175]">{b.dish_name}</div> : null}
                    {b.allergies ? <div className="text-[#6D7175] text-xs mt-1">{b.allergies}</div> : null}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-[#6D7175]">
                    {formatLeadSourceLabel(b.source)}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={b.status}
                      onChange={(e) => updateStatus(b.id, e.target.value)}
                      className="rounded-lg border border-[#C9CCCF] px-2 py-1.5 bg-white"
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
                  <td colSpan={7} className="px-4 py-10 text-center text-[#6D7175]">
                    No orders yet.
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
