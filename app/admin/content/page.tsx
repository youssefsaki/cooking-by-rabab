'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_PACKAGES } from '@/lib/content-defaults';
import type { Locale, PackageCmsItem, PackagesContent } from '@/lib/types/cms';

const LOCALES: Locale[] = ['en', 'fr', 'de'];

export default function AdminContentPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [items, setItems] = useState<PackageCmsItem[]>(DEFAULT_PACKAGES.items);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/content?section=packages&locale=${locale}`)
      .then((r) => r.json())
      .then((payload) => {
        if (payload.ok && payload.data?.items?.length) {
          setItems(payload.data.items);
        } else {
          setItems(DEFAULT_PACKAGES.items);
        }
      })
      .catch(() => setItems(DEFAULT_PACKAGES.items));
  }, [locale]);

  function updateItem(index: number, patch: Partial<PackageCmsItem>) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function updateHighlight(index: number, highlightIndex: number, value: string) {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const highlights = [...item.highlights];
        highlights[highlightIndex] = value;
        return { ...item, highlights };
      })
    );
  }

  async function save() {
    setSaving(true);
    setStatus('');
    const data: PackagesContent = { items };
    const res = await fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'packages', locale, data }),
    });
    const payload = await res.json();
    setSaving(false);
    setStatus(payload.ok ? 'Saved. Site will refresh within ~60s.' : payload.error || 'Save failed');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-amber-950">Content</h1>
          <p className="text-gray-600 text-sm mt-1">Edit packages (EN / FR / DE). Prices and images update on the site.</p>
        </div>
        <div className="flex gap-2">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              className={`px-3 py-1.5 rounded-full text-sm font-bold uppercase ${
                locale === l ? 'bg-amber-600 text-white' : 'bg-white border border-amber-200 text-amber-900'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {status && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {status}
        </div>
      )}

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id} className="rounded-2xl bg-white border border-amber-100 p-5 shadow-sm space-y-3">
            <h2 className="font-black text-xl text-amber-950">{item.id}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="text-sm font-semibold">
                Name
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                  value={item.name}
                  onChange={(e) => updateItem(index, { name: e.target.value })}
                />
              </label>
              <label className="text-sm font-semibold">
                Price
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                  value={item.price}
                  onChange={(e) => updateItem(index, { price: e.target.value })}
                />
              </label>
              <label className="text-sm font-semibold">
                Currency
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                  value={item.currency}
                  onChange={(e) => updateItem(index, { currency: e.target.value })}
                />
              </label>
              <label className="text-sm font-semibold">
                Image URL / path
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                  value={item.image}
                  onChange={(e) => updateItem(index, { image: e.target.value })}
                />
              </label>
              <label className="text-sm font-semibold sm:col-span-2">
                Subtitle
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                  value={item.subtitle}
                  onChange={(e) => updateItem(index, { subtitle: e.target.value })}
                />
              </label>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold">Highlights</p>
              {item.highlights.map((h, hi) => (
                <input
                  key={hi}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  value={h}
                  onChange={(e) => updateHighlight(index, hi, e.target.value)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 disabled:opacity-50"
      >
        {saving ? 'Saving…' : `Publish packages (${locale.toUpperCase()})`}
      </button>
    </div>
  );
}
