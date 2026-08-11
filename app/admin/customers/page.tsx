'use client';

import { useEffect, useState } from 'react';
import type { CustomerRow } from '@/lib/customers';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [counts, setCounts] = useState({ total: 0, returning: 0, newCustomers: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/customers')
      .then((r) => r.json())
      .then((payload) => {
        if (!payload.ok) {
          setError(payload.error || 'Failed to load');
          return;
        }
        setCustomers(payload.customers || []);
        setCounts(payload.counts || { total: 0, returning: 0, newCustomers: 0 });
      })
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-5 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#202223]">Customers</h1>
        <p className="text-sm text-[#6D7175]">
          Read-only CRM view grouped by email (fallback phone). Cancelled bookings excluded.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Customers', value: counts.total },
          { label: 'New', value: counts.newCustomers },
          { label: 'Returning', value: counts.returning },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-[#E1E3E5] bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6D7175]">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-[#202223]">{loading ? '…' : card.value}</p>
          </div>
        ))}
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
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Bookings</th>
                <th className="px-4 py-3 font-semibold">Spent</th>
                <th className="px-4 py-3 font-semibold">First / last</th>
                <th className="px-4 py-3 font-semibold">Tag</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.key} className="border-t border-[#E1E3E5] align-top hover:bg-[#FAFBFB]">
                  <td className="px-4 py-3 font-semibold text-[#202223]">{c.name}</td>
                  <td className="px-4 py-3">
                    <div>{c.email || '—'}</div>
                    <div className="text-[#6D7175]">{c.phone || '—'}</div>
                    {c.countries.length > 0 && (
                      <div className="text-xs text-[#6D7175]">{c.countries.join(', ')}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div>{c.totalBookings}</div>
                    <div className="text-xs capitalize text-[#6D7175]">{c.packageTypes.join(', ')}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">€{c.totalSpentEur}</td>
                  <td className="px-4 py-3 text-[#6D7175] whitespace-nowrap">
                    <div>{new Date(c.firstBookingAt).toLocaleDateString()}</div>
                    <div>{new Date(c.lastBookingAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${
                        c.tag === 'returning'
                          ? 'bg-[#F1F8F5] text-[#0D8050]'
                          : 'bg-[#F6F6F7] text-[#6D7175]'
                      }`}
                    >
                      {c.tag}
                    </span>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-[#6D7175]">
                    No customers yet.
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
