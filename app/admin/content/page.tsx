'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCmsFields,
  defaultSiteCopy,
  faqsFromCopy,
  packagesFromCopy,
  type CmsField,
  type SiteCopyBag,
} from '@/lib/cms-fields';
import { DEFAULT_PACKAGES } from '@/lib/content-defaults';
import type { Locale } from '@/lib/types/cms';
import faqsFallback from '@/data/faqs.json';

const LOCALES: Locale[] = ['en', 'fr', 'de'];

export default function AdminContentPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [bag, setBag] = useState<SiteCopyBag>(() => defaultSiteCopy('en'));
  const [selectedId, setSelectedId] = useState<string>('hero.title');
  const [draft, setDraft] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fields = useMemo(() => {
    const packages = packagesFromCopy(bag, DEFAULT_PACKAGES);
    const faqs = faqsFromCopy(bag, faqsFallback as never);
    return buildCmsFields(packages, faqs);
  }, [bag]);

  const selected: CmsField | undefined = fields.find((f) => f.id === selectedId) || fields[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return fields;
    return fields.filter(
      (f) =>
        f.label.toLowerCase().includes(q) ||
        f.group.toLowerCase().includes(q) ||
        (bag[f.id] || '').toLowerCase().includes(q)
    );
  }, [fields, query, bag]);

  const grouped = useMemo(() => {
    const map = new Map<string, CmsField[]>();
    for (const f of filtered) {
      const list = map.get(f.group) || [];
      list.push(f);
      map.set(f.group, list);
    }
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/content?section=site_copy&locale=${locale}`)
      .then((r) => r.json())
      .then((payload) => {
        if (cancelled) return;
        const next = payload.ok && payload.data ? (payload.data as SiteCopyBag) : defaultSiteCopy(locale);
        setBag(next);
        setSelectedId((prev) => prev || 'hero.title');
      })
      .catch(() => {
        if (!cancelled) setBag(defaultSiteCopy(locale));
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  useEffect(() => {
    if (!selected) return;
    setDraft(bag[selected.id] ?? '');
  }, [selected?.id, bag, selected]);

  async function saveField(nextValue?: string) {
    if (!selected) return;
    const value = nextValue ?? draft;
    setSaving(true);
    setStatus('');
    const nextBag = { ...bag, [selected.id]: value };
    const res = await fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'site_copy', locale, data: nextBag }),
    });
    const payload = await res.json();
    setSaving(false);
    if (!payload.ok) {
      setStatus(payload.error || 'Save failed');
      return;
    }
    setBag(nextBag);
    setDraft(value);
    setStatus(`Saved “${selected.label}”. Guests will see it within about 30 seconds.`);
  }

  const uploadImage = useCallback(
    async (file: File) => {
      if (!selected || selected.type !== 'image') return;
      if (!file.type.startsWith('image/')) {
        setStatus('Please drop an image file (JPG, PNG, WebP).');
        return;
      }
      setUploading(true);
      setStatus('');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('altText', selected.label);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const payload = await res.json();
      if (!payload.ok) {
        setUploading(false);
        setStatus(payload.error || 'Upload failed');
        return;
      }
      const url = payload.media.public_url as string;
      const nextBag = { ...bag, [selected.id]: url };
      const saveRes = await fetch('/api/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'site_copy', locale, data: nextBag }),
      });
      const savePayload = await saveRes.json();
      setUploading(false);
      if (!savePayload.ok) {
        setStatus(savePayload.error || 'Upload OK but save failed');
        return;
      }
      setBag(nextBag);
      setDraft(url);
      setStatus(`Photo updated for “${selected.label}”.`);
    },
    [selected, bag, locale]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-amber-950">Edit website text & photos</h1>
          <p className="text-gray-600 text-sm mt-1 max-w-2xl">
            1) Choose a language · 2) Select the text you want to change · 3) Type the new value and save.
            For photos, drag and drop a new image onto the box.
          </p>
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
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          {status}
        </div>
      )}

      <div className="grid lg:grid-cols-[340px_1fr] gap-4 min-h-[70vh]">
        {/* Left: select which text */}
        <aside className="rounded-2xl border border-amber-100 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-3 border-b border-amber-50">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search texts… e.g. price, hero, FAQ"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-3 max-h-[70vh]">
            {grouped.map(([group, list]) => (
              <div key={group}>
                <p className="px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-800/80">
                  {group}
                </p>
                <div className="space-y-1">
                  {list.map((f) => {
                    const active = f.id === selected?.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedId(f.id)}
                        className={`w-full text-left rounded-lg px-3 py-2 text-sm transition ${
                          active
                            ? 'bg-amber-600 text-white'
                            : 'hover:bg-amber-50 text-gray-800'
                        }`}
                      >
                        <span className="font-semibold block">{f.label}</span>
                        <span className={`block truncate text-xs mt-0.5 ${active ? 'text-amber-100' : 'text-gray-500'}`}>
                          {bag[f.id] || '— empty —'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {grouped.length === 0 && (
              <p className="text-sm text-gray-500 p-3">No texts match your search.</p>
            )}
          </div>
        </aside>

        {/* Right: edit selected */}
        <section className="rounded-2xl border border-amber-100 bg-white shadow-sm p-5 sm:p-6 space-y-4">
          {!selected ? (
            <p className="text-gray-500">Select a text on the left to edit it.</p>
          ) : (
            <>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700">{selected.group}</p>
                <h2 className="text-2xl font-black text-amber-950 mt-1">{selected.label}</h2>
                {selected.hint && <p className="text-sm text-gray-500 mt-1">{selected.hint}</p>}
              </div>

              <div className="rounded-xl bg-stone-50 border border-stone-100 px-4 py-3">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Current value on the website</p>
                <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">{bag[selected.id] || '—'}</p>
              </div>

              {selected.type === 'image' ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) void uploadImage(file);
                  }}
                  className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition ${
                    dragOver ? 'border-amber-500 bg-amber-50' : 'border-amber-200 bg-amber-50/40'
                  }`}
                >
                  {draft && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={draft}
                      alt={selected.label}
                      className="mx-auto mb-4 max-h-48 rounded-xl object-cover shadow"
                    />
                  )}
                  <p className="font-bold text-amber-950">
                    {uploading ? 'Uploading…' : 'Drag & drop a new photo here'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">or</p>
                  <label className="inline-block mt-3 cursor-pointer rounded-lg bg-amber-600 text-white font-bold px-4 py-2">
                    Choose file
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void uploadImage(file);
                      }}
                    />
                  </label>
                </div>
              ) : selected.type === 'textarea' ? (
                <label className="block text-sm font-semibold text-gray-800">
                  New value
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    rows={6}
                    className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-base"
                  />
                </label>
              ) : (
                <label className="block text-sm font-semibold text-gray-800">
                  New value
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-base"
                  />
                </label>
              )}

              {selected.type !== 'image' && (
                <button
                  type="button"
                  onClick={() => saveField()}
                  disabled={saving || draft === (bag[selected.id] ?? '')}
                  className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 disabled:opacity-50"
                >
                  {saving ? 'Saving…' : 'Save this change'}
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
