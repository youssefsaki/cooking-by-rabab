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

const PREVIEW_PAGES = [
  { id: 'home', label: 'Homepage', path: '/' },
  { id: 'packages', label: 'Packages', path: '/packages' },
  { id: 'faq', label: 'FAQ & Contact', path: '/faq-contact' },
  { id: 'book', label: 'Book', path: '/book' },
] as const;

type PreviewPageId = (typeof PREVIEW_PAGES)[number]['id'];

function groupFields(fields: CmsField[]) {
  const map = new Map<string, CmsField[]>();
  for (const f of fields) {
    const list = map.get(f.group) || [];
    list.push(f);
    map.set(f.group, list);
  }
  return Array.from(map.entries());
}

export default function AdminContentPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [savedBag, setSavedBag] = useState<SiteCopyBag>(() => defaultSiteCopy('en'));
  const [draftBag, setDraftBag] = useState<SiteCopyBag>(() => defaultSiteCopy('en'));
  const [selectedId, setSelectedId] = useState('hero.title');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [previewPage, setPreviewPage] = useState<PreviewPageId>('home');
  const [previewKey, setPreviewKey] = useState(0);
  const [loading, setLoading] = useState(true);

  const dirty = useMemo(() => {
    const keys = Array.from(new Set([...Object.keys(savedBag), ...Object.keys(draftBag)]));
    for (const k of keys) {
      if ((savedBag[k] || '') !== (draftBag[k] || '')) return true;
    }
    return false;
  }, [savedBag, draftBag]);

  const fields = useMemo(() => {
    const packages = packagesFromCopy(draftBag, DEFAULT_PACKAGES);
    const faqs = faqsFromCopy(draftBag, faqsFallback as never);
    return buildCmsFields(packages, faqs);
  }, [draftBag]);

  const selected = fields.find((f) => f.id === selectedId) || fields[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return fields;
    return fields.filter(
      (f) =>
        f.label.toLowerCase().includes(q) ||
        f.group.toLowerCase().includes(q) ||
        (draftBag[f.id] || '').toLowerCase().includes(q)
    );
  }, [fields, query, draftBag]);

  const grouped = useMemo(() => groupFields(filtered), [filtered]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/content?section=site_copy&locale=${locale}`)
      .then((r) => r.json())
      .then((payload) => {
        if (cancelled) return;
        const next = payload.ok && payload.data ? (payload.data as SiteCopyBag) : defaultSiteCopy(locale);
        setSavedBag(next);
        setDraftBag(next);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        const next = defaultSiteCopy(locale);
        setSavedBag(next);
        setDraftBag(next);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  function setFieldValue(id: string, value: string) {
    setDraftBag((prev) => ({ ...prev, [id]: value }));
  }

  async function saveAllEdits() {
    setSaving(true);
    setStatus('');
    const res = await fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'site_copy', locale, data: draftBag }),
    });
    const payload = await res.json();
    setSaving(false);
    if (!payload.ok) {
      setStatus(payload.error || 'Save failed. Are you still logged in?');
      return;
    }
    setSavedBag(draftBag);
    setPreviewKey((k) => k + 1);
    setStatus('Saved. Preview refreshed — changes are live on this Preview site.');
  }

  function discardEdits() {
    setDraftBag(savedBag);
    setStatus('Unsaved edits discarded.');
  }

  const uploadImage = useCallback(
    async (file: File) => {
      if (!selected || selected.type !== 'image') return;
      if (!file.type.startsWith('image/')) {
        setStatus('Please drop an image file (JPG, PNG, or WebP).');
        return;
      }
      setUploading(true);
      setStatus('');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('altText', selected.label);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const payload = await res.json();
      setUploading(false);
      if (!payload.ok) {
        setStatus(payload.error || 'Upload failed');
        return;
      }
      const url = payload.media.public_url as string;
      setFieldValue(selected.id, url);
      setStatus(`Photo ready for “${selected.label}”. Click Save edits to publish.`);
    },
    [selected]
  );

  const previewPath = PREVIEW_PAGES.find((p) => p.id === previewPage)?.path || '/';
  const previewSrc = `${previewPath}?cms_preview=${previewKey}&lang=${locale}`;

  // Auto-focus preview page based on selected field group
  useEffect(() => {
    if (!selected) return;
    if (selected.group.startsWith('Homepage') || selected.group.startsWith('Packages section')) {
      setPreviewPage('home');
    } else if (selected.group.startsWith('Package:')) {
      setPreviewPage('packages');
    } else if (selected.group.startsWith('FAQ')) {
      setPreviewPage('faq');
    }
  }, [selected?.group]);

  return (
    <div className="fixed inset-0 top-[57px] bg-[#F3EEE6] flex flex-col">
      {/* Top bar */}
      <div className="shrink-0 border-b border-amber-200/80 bg-white px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-amber-950">Website editor</h1>
          <p className="text-xs text-gray-500">
            Edit on the left · live preview on the right · Save edits when ready
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                if (dirty && !confirm('You have unsaved edits. Switch language and discard them?')) return;
                setLocale(l);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase ${
                locale === l ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}
            >
              {l}
            </button>
          ))}
          <button
            type="button"
            onClick={discardEdits}
            disabled={!dirty || saving}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 disabled:opacity-40"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={saveAllEdits}
            disabled={!dirty || saving || loading}
            className="rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 text-sm disabled:opacity-40 shadow-sm"
          >
            {saving ? 'Saving…' : dirty ? 'Save edits' : 'Saved'}
          </button>
        </div>
      </div>

      {status && (
        <div className="shrink-0 px-4 py-2 text-sm bg-amber-50 border-b border-amber-100 text-amber-950">
          {status}
        </div>
      )}

      <div className="flex-1 min-h-0 grid lg:grid-cols-[420px_1fr]">
        {/* LEFT: editor */}
        <aside className="min-h-0 border-r border-amber-200 bg-white flex flex-col">
          <div className="p-3 border-b border-amber-50 space-y-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search text or photo…"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
            {dirty && (
              <p className="text-xs font-semibold text-orange-700">Unsaved changes — click Save edits</p>
            )}
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-2 space-y-3">
            {loading ? (
              <p className="p-4 text-sm text-gray-500">Loading content…</p>
            ) : (
              grouped.map(([group, list]) => (
                <div key={group}>
                  <p className="px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-800/70">
                    {group}
                  </p>
                  <div className="space-y-1">
                    {list.map((f) => {
                      const active = f.id === selected?.id;
                      const changed = (draftBag[f.id] || '') !== (savedBag[f.id] || '');
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setSelectedId(f.id)}
                          className={`w-full text-left rounded-xl px-3 py-2.5 text-sm transition border ${
                            active
                              ? 'bg-amber-600 text-white border-amber-600'
                              : 'bg-white hover:bg-amber-50 text-gray-800 border-transparent'
                          }`}
                        >
                          <span className="font-semibold flex items-center gap-2">
                            {f.label}
                            {changed && (
                              <span
                                className={`text-[10px] font-bold uppercase ${
                                  active ? 'text-amber-100' : 'text-orange-600'
                                }`}
                              >
                                edited
                              </span>
                            )}
                          </span>
                          <span
                            className={`block truncate text-xs mt-0.5 ${
                              active ? 'text-amber-100' : 'text-gray-500'
                            }`}
                          >
                            {f.type === 'image' ? 'Photo' : draftBag[f.id] || '—'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Selected field editor */}
          {selected && !loading && (
            <div className="shrink-0 border-t border-amber-100 bg-[#FCFAF7] p-4 space-y-3 max-h-[45%] overflow-y-auto">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-amber-700">
                  {selected.group}
                </p>
                <h2 className="font-black text-amber-950 text-lg">{selected.label}</h2>
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
                  className={`rounded-2xl border-2 border-dashed p-4 text-center transition ${
                    dragOver ? 'border-amber-500 bg-amber-100' : 'border-amber-300 bg-white'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={draftBag[selected.id] || '/packages/basic.jpg'}
                    alt={selected.label}
                    className="mx-auto mb-3 max-h-36 rounded-xl object-cover shadow"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <p className="font-bold text-sm text-amber-950">
                    {uploading ? 'Uploading…' : 'Drag & drop a new photo'}
                  </p>
                  <label className="inline-block mt-2 cursor-pointer rounded-lg bg-amber-600 text-white text-sm font-bold px-3 py-1.5">
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
                <textarea
                  value={draftBag[selected.id] || ''}
                  onChange={(e) => setFieldValue(selected.id, e.target.value)}
                  rows={5}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white"
                />
              ) : (
                <input
                  value={draftBag[selected.id] || ''}
                  onChange={(e) => setFieldValue(selected.id, e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white"
                />
              )}
            </div>
          )}
        </aside>

        {/* RIGHT: live website preview */}
        <section className="min-h-0 flex flex-col bg-[#E8E0D4]">
          <div className="shrink-0 px-4 py-2 flex flex-wrap items-center gap-2 border-b border-amber-200/60 bg-white/70 backdrop-blur">
            <span className="text-xs font-bold uppercase tracking-wide text-amber-900 mr-1">
              Live preview
            </span>
            {PREVIEW_PAGES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPreviewPage(p.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  previewPage === p.id
                    ? 'bg-amber-900 text-white'
                    : 'bg-white text-amber-900 border border-amber-200'
                }`}
              >
                {p.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPreviewKey((k) => k + 1)}
              className="ml-auto text-xs font-semibold text-amber-800 underline"
            >
              Refresh preview
            </button>
          </div>
          <div className="flex-1 min-h-0 p-3 sm:p-4">
            <div className="h-full rounded-2xl overflow-hidden border border-amber-200 shadow-xl bg-white">
              <iframe
                key={`${previewSrc}-${previewKey}`}
                title="Site preview"
                src={previewSrc}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
