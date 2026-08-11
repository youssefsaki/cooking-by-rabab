'use client';

import { useEffect, useState } from 'react';
import {
  emptyTestimonial,
  testimonialsFromBag,
  testimonialsToBagPatch,
  type Testimonial,
} from '@/lib/testimonials';
import { invalidateSiteCopyCache } from '@/hooks/useSiteCopy';

const LOCALES = ['en', 'fr', 'de'] as const;

export default function AdminTestimonialsPage() {
  const [locale, setLocale] = useState<(typeof LOCALES)[number]>('en');
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  async function load(nextLocale = locale) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/content?section=site_copy&locale=${nextLocale}`);
      const payload = await res.json();
      const bag = payload.ok && payload.data ? payload.data : {};
      setItems(testimonialsFromBag(bag));
    } catch {
      setError('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load(locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  function updateItem(id: string, patch: Partial<Testimonial>) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function move(id: string, direction: -1 | 1) {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      const next = index + direction;
      if (index < 0 || next < 0 || next >= prev.length) return prev;
      const copy = [...prev];
      const [row] = copy.splice(index, 1);
      copy.splice(next, 0, row);
      return copy.map((item, order) => ({ ...item, order }));
    });
  }

  async function save() {
    setSaving(true);
    setStatus('');
    setError('');
    const res = await fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'site_copy',
        locale,
        data: testimonialsToBagPatch(items),
      }),
    });
    const payload = await res.json();
    setSaving(false);
    if (!payload.ok) {
      setError(payload.error || 'Save failed');
      return;
    }
    invalidateSiteCopyCache();
    setStatus('Testimonials saved.');
    await load();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[#202223]">Testimonials</h1>
          <p className="text-sm text-[#6D7175]">
            Guest quotes stored in CMS (merge-safe). Only <strong>published</strong> show on the site.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase ${
                locale === l ? 'bg-[#202223] text-white' : 'bg-[#F6F6F7] text-[#6D7175]'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
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

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setItems((prev) => [...prev, emptyTestimonial(prev.length)])}
          className="rounded-lg bg-[#008060] px-4 py-2 text-sm font-semibold text-white hover:bg-[#006e52]"
        >
          Add testimonial
        </button>
        <button
          type="button"
          onClick={() => void save()}
          disabled={saving || loading}
          className="rounded-lg border border-[#C9CCCF] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#F6F6F7] disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-[#6D7175]">Loading…</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <article key={item.id} className="rounded-xl border border-[#E1E3E5] bg-white p-5 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wide text-[#6D7175]">
                  #{index + 1} · {item.id}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => move(item.id, -1)}
                    className="rounded-lg border border-[#C9CCCF] px-2 py-1 text-xs font-semibold"
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    onClick={() => move(item.id, 1)}
                    className="rounded-lg border border-[#C9CCCF] px-2 py-1 text-xs font-semibold"
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    onClick={() => setItems((prev) => prev.filter((row) => row.id !== item.id))}
                    className="rounded-lg border border-[#FED3D1] px-2 py-1 text-xs font-semibold text-[#D72C0D]"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-sm font-semibold">
                  Reviewer name
                  <input
                    value={item.name}
                    onChange={(e) => updateItem(item.id, { name: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
                  />
                </label>
                <label className="block text-sm font-semibold">
                  Rating (1–5)
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={item.rating}
                    onChange={(e) => updateItem(item.id, { rating: Number(e.target.value) })}
                    className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
                  />
                </label>
                <label className="block text-sm font-semibold sm:col-span-2">
                  Review text
                  <textarea
                    rows={3}
                    value={item.text}
                    onChange={(e) => updateItem(item.id, { text: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
                  />
                </label>
                <label className="block text-sm font-semibold">
                  Status
                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateItem(item.id, {
                        status: e.target.value === 'published' ? 'published' : 'pending',
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
                  >
                    <option value="pending">pending</option>
                    <option value="published">published</option>
                  </select>
                </label>
              </div>
            </article>
          ))}
          {items.length === 0 && (
            <p className="rounded-xl border border-dashed border-[#C9CCCF] py-10 text-center text-sm text-[#6D7175]">
              No testimonials yet. Add one to get started.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
