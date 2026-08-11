'use client';

import { useEffect, useState } from 'react';
import type { PromoCodeRow, PromoDiscountType } from '@/lib/promo-codes';

const emptyForm = {
  code: '',
  discount_type: 'percent' as PromoDiscountType,
  discount_value: '',
  max_uses: '',
  expires_at: '',
  active: true,
};

export default function AdminPromotionsPage() {
  const [codes, setCodes] = useState<PromoCodeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin/promo-codes');
    const data = await res.json();
    if (!data.ok) {
      setError(data.error || 'Failed to load');
    } else {
      setCodes(data.promoCodes || []);
      setError('');
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(row: PromoCodeRow) {
    setEditingId(row.id);
    setForm({
      code: row.code,
      discount_type: row.discount_type,
      discount_value: String(row.discount_value),
      max_uses: row.max_uses == null ? '' : String(row.max_uses),
      expires_at: row.expires_at ? row.expires_at.slice(0, 10) : '',
      active: row.active,
    });
    setStatus('');
    setError('');
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus('');
    setError('');

    const payload = {
      code: form.code,
      discount_type: form.discount_type,
      discount_value: Number(form.discount_value),
      max_uses: form.max_uses === '' ? null : Number(form.max_uses),
      expires_at: form.expires_at ? `${form.expires_at}T23:59:59.000Z` : null,
      active: form.active,
    };

    const res = await fetch(
      editingId ? `/api/admin/promo-codes/${editingId}` : '/api/admin/promo-codes',
      {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    setSaving(false);
    if (!data.ok) {
      setError(data.error || 'Save failed');
      return;
    }
    setStatus(editingId ? 'Promo code updated.' : 'Promo code created.');
    resetForm();
    await load();
  }

  async function toggleActive(row: PromoCodeRow) {
    await fetch(`/api/admin/promo-codes/${row.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !row.active }),
    });
    await load();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#202223]">Promotions</h1>
        <p className="text-sm text-[#6D7175]">
          Create discount codes. Usage counts when a booking is marked confirmed.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-[#FED3D1] bg-[#FFF4F4] px-4 py-3 text-sm text-[#D72C0D]">
          {error}
        </div>
      )}
      {status && (
        <div className="rounded-lg border border-[#AEE9D1] bg-[#F1F8F5] px-4 py-3 text-sm text-[#0D8050]">
          {status}
        </div>
      )}

      <form
        onSubmit={save}
        className="space-y-3 rounded-xl border border-[#E1E3E5] bg-white p-5 shadow-sm"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-[#202223]">
            {editingId ? 'Edit promo code' : 'New promo code'}
          </h2>
          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs font-semibold text-[#6D7175] hover:text-[#202223]"
            >
              Cancel edit
            </button>
          ) : null}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block text-sm font-semibold text-[#202223]">
            Code
            <input
              required
              value={form.code}
              onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
              className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal uppercase tracking-wide"
              placeholder="SUMMER10"
            />
          </label>
          <label className="block text-sm font-semibold text-[#202223]">
            Type
            <select
              value={form.discount_type}
              onChange={(e) =>
                setForm((f) => ({ ...f, discount_type: e.target.value as PromoDiscountType }))
              }
              className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
            >
              <option value="percent">Percent (%)</option>
              <option value="fixed">Fixed (€)</option>
            </select>
          </label>
          <label className="block text-sm font-semibold text-[#202223]">
            Value
            <input
              required
              type="number"
              min="0.01"
              step="0.01"
              value={form.discount_value}
              onChange={(e) => setForm((f) => ({ ...f, discount_value: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
              placeholder={form.discount_type === 'percent' ? '10' : '20'}
            />
          </label>
          <label className="block text-sm font-semibold text-[#202223]">
            Max uses (blank = unlimited)
            <input
              type="number"
              min="1"
              value={form.max_uses}
              onChange={(e) => setForm((f) => ({ ...f, max_uses: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
            />
          </label>
          <label className="block text-sm font-semibold text-[#202223]">
            Expires (optional)
            <input
              type="date"
              value={form.expires_at}
              onChange={(e) => setForm((f) => ({ ...f, expires_at: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
            />
          </label>
          <label className="flex items-end gap-2 pb-2 text-sm font-semibold text-[#202223]">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
              className="size-4"
            />
            Active
          </label>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[#008060] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#006e52] disabled:opacity-50"
        >
          {saving ? 'Saving…' : editingId ? 'Update code' : 'Create code'}
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-[#6D7175]">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#E1E3E5] bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F6F6F7] text-left text-[#6D7175]">
              <tr>
                <th className="px-4 py-3 font-semibold">Code</th>
                <th className="px-4 py-3 font-semibold">Discount</th>
                <th className="px-4 py-3 font-semibold">Uses</th>
                <th className="px-4 py-3 font-semibold">Expires</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((row) => (
                <tr key={row.id} className="border-t border-[#E1E3E5] hover:bg-[#FAFBFB]">
                  <td className="px-4 py-3 font-semibold tracking-wide text-[#202223]">{row.code}</td>
                  <td className="px-4 py-3 text-[#6D7175]">
                    {row.discount_type === 'percent'
                      ? `${row.discount_value}%`
                      : `€${row.discount_value}`}
                  </td>
                  <td className="px-4 py-3 text-[#6D7175]">
                    {row.uses_count}
                    {row.max_uses != null ? ` / ${row.max_uses}` : ' / ∞'}
                  </td>
                  <td className="px-4 py-3 text-[#6D7175]">
                    {row.expires_at ? new Date(row.expires_at).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${
                        row.active
                          ? 'bg-[#F1F8F5] text-[#0D8050]'
                          : 'bg-[#F6F6F7] text-[#6D7175]'
                      }`}
                    >
                      {row.active ? 'active' : 'off'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(row)}
                        className="rounded-lg border border-[#C9CCCF] px-2.5 py-1.5 text-xs font-semibold hover:bg-[#F6F6F7]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void toggleActive(row)}
                        className="rounded-lg border border-[#C9CCCF] px-2.5 py-1.5 text-xs font-semibold hover:bg-[#F6F6F7]"
                      >
                        {row.active ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {codes.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-[#6D7175]">
                    No promo codes yet.
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
