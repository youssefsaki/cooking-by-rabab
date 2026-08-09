'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  buildCmsFields,
  defaultSiteCopy,
  faqsFromCopy,
  packagesFromCopy,
  type SiteCopyBag,
} from '@/lib/cms-fields';
import { DEFAULT_PACKAGES } from '@/lib/content-defaults';
import type { Locale } from '@/lib/types/cms';
import faqsFallback from '@/data/faqs.json';
import LiveCanvasPreview from '@/components/admin/LiveCanvasPreview';

const LOCALES: Locale[] = ['en', 'fr', 'de'];

export default function AdminContentPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [savedBag, setSavedBag] = useState<SiteCopyBag>(() => defaultSiteCopy('en'));
  const [draftBag, setDraftBag] = useState<SiteCopyBag>(() => defaultSiteCopy('en'));
  const draftRef = useRef(draftBag);
  const [selectedId, setSelectedId] = useState('hero.title');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [previewMode, setPreviewMode] = useState<'home' | 'packages'>('home');
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    draftRef.current = draftBag;
  }, [draftBag]);

  const dirty = useMemo(() => {
    const keys = Array.from(new Set([...Object.keys(savedBag), ...Object.keys(draftBag)]));
    return keys.some((k) => (savedBag[k] || '') !== (draftBag[k] || ''));
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

  const grouped = useMemo(() => {
    const map = new Map<string, typeof fields>();
    for (const f of filtered) {
      const list = map.get(f.group) || [];
      list.push(f);
      map.set(f.group, list);
    }
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
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

  useEffect(() => {
    if (!selected) return;
    if (selected.group.startsWith('Package:') || selected.group === 'Packages section') {
      setPreviewMode('packages');
    } else {
      setPreviewMode('home');
    }
  }, [selected?.group]);

  function setFieldValue(id: string, value: string) {
    setDraftBag((prev) => {
      const next = { ...prev, [id]: value };
      draftRef.current = next;
      return next;
    });
    setStatus('');
    setError('');
  }

  async function saveBag(bag: SiteCopyBag, successMessage = 'Saved. Your website is updated.') {
    setSaving(true);
    setStatus('');
    setError('');
    try {
      const res = await fetch('/api/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'site_copy', locale, data: bag }),
      });
      const payload = await res.json();
      if (!res.ok || !payload.ok) {
        setError(payload.error || `Save failed (${res.status}). Try signing in again.`);
        return false;
      }
      setSavedBag(bag);
      setDraftBag(bag);
      draftRef.current = bag;
      setStatus(successMessage);
      return true;
    } catch {
      setError('Network error while saving.');
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function saveAllEdits() {
    await saveBag(draftRef.current);
  }

  async function uploadImage(file: File) {
    if (!selected || selected.type !== 'image') {
      setError('Select a package photo field first (click a photo in the preview).');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Please use a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB.');
      return;
    }

    setUploading(true);
    setError('');
    setStatus('Uploading photo…');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('altText', selected.label);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const payload = await res.json();
      if (!res.ok || !payload.ok) {
        setError(payload.error || `Upload failed (${res.status})`);
        setStatus('');
        return;
      }

      const url = String(payload.media.public_url);
      const nextBag = { ...draftRef.current, [selected.id]: url };
      draftRef.current = nextBag;
      setDraftBag(nextBag);
      setStatus('Photo uploaded. Saving…');

      const ok = await saveBag(nextBag, 'Photo saved to your website.');
      if (!ok) {
        setStatus('Photo uploaded but not saved yet — click Save.');
      }
    } catch {
      setError('Upload network error.');
      setStatus('');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#F1F1F1] overflow-hidden">
      {/* Always-visible action bar */}
      <div className="shrink-0 sticky top-0 z-50 bg-white border-b border-[#E1E3E5] px-3 sm:px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-semibold text-[#202223] truncate">
              Online store · Customize
            </h1>
            <p className="text-xs text-[#6D7175] hidden sm:block">
              Change text or photos, then click Save. Photos also save automatically after upload.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex gap-1">
              {LOCALES.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => {
                    if (dirty && !confirm('Discard unsaved edits and switch language?')) return;
                    setLocale(l);
                  }}
                  className={`px-2 py-1 rounded text-xs font-semibold uppercase ${
                    locale === l ? 'bg-[#1A1A1A] text-white' : 'bg-[#E4E5E7] text-[#202223]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={!dirty || saving}
              onClick={() => {
                setDraftBag(savedBag);
                draftRef.current = savedBag;
                setStatus('Draft discarded.');
              }}
              className="rounded-lg border border-[#C9CCCF] bg-white px-3 py-2.5 text-sm font-semibold disabled:opacity-40"
            >
              Discard
            </button>
            <button
              type="button"
              data-testid="save-content"
              disabled={saving || loading || (!dirty && !uploading)}
              onClick={saveAllEdits}
              className={`rounded-lg px-5 py-2.5 text-sm font-bold shadow-sm min-w-[96px] ${
                dirty
                  ? 'bg-[#008060] hover:bg-[#006e52] text-white'
                  : 'bg-[#008060]/70 text-white'
              } disabled:opacity-50`}
            >
              {saving ? 'Saving…' : dirty ? 'Save' : 'Saved'}
            </button>
          </div>
        </div>
      </div>

      {(status || error) && (
        <div
          className={`shrink-0 px-4 py-2 text-sm border-b ${
            error ? 'bg-[#FFF4F4] text-[#D72C0D] border-[#FED3D1]' : 'bg-[#F1F8F5] text-[#0D8050] border-[#AEE9D1]'
          }`}
        >
          {error || status}
        </div>
      )}

      <div className="flex-1 min-h-0 grid lg:grid-cols-[400px_1fr]">
        <aside className="min-h-0 bg-white border-r border-[#E1E3E5] flex flex-col order-2 lg:order-1">
          <div className="p-3 border-b border-[#E1E3E5] flex gap-2 sm:hidden">
            {LOCALES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  if (dirty && !confirm('Discard unsaved edits and switch language?')) return;
                  setLocale(l);
                }}
                className={`px-2.5 py-1 rounded text-xs font-semibold uppercase ${
                  locale === l ? 'bg-[#1A1A1A] text-white' : 'bg-[#E4E5E7] text-[#202223]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="p-3 border-b border-[#E1E3E5]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search content…"
              className="w-full rounded-lg border border-[#C9CCCF] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#008060]/40"
            />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-2">
            {loading ? (
              <p className="p-4 text-sm text-[#6D7175]">Loading…</p>
            ) : (
              grouped.map(([group, list]) => (
                <div key={group} className="mb-3">
                  <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#6D7175]">
                    {group}
                  </p>
                  {list.map((f) => {
                    const active = f.id === selected?.id;
                    const changed = (draftBag[f.id] || '') !== (savedBag[f.id] || '');
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedId(f.id)}
                        className={`w-full text-left rounded-lg px-3 py-2 mb-0.5 text-sm ${
                          active ? 'bg-[#F2F7F4] ring-1 ring-[#008060]/40' : 'hover:bg-[#F6F6F7]'
                        }`}
                      >
                        <span className="font-medium flex items-center gap-2">
                          {f.type === 'image' ? '🖼 ' : ''}
                          {f.label}
                          {changed && <span className="text-[10px] text-[#B98900] font-bold">EDITED</span>}
                        </span>
                        <span className="block truncate text-xs text-[#6D7175] mt-0.5">
                          {f.type === 'image' ? 'Photo — click to change' : draftBag[f.id] || '—'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {selected && !loading && (
            <div className="shrink-0 border-t-2 border-[#008060]/30 p-4 bg-[#FAFBFB] space-y-3 max-h-[55%] overflow-y-auto">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase text-[#6D7175]">{selected.group}</p>
                  <h2 className="font-semibold text-[#202223]">{selected.label}</h2>
                </div>
                <button
                  type="button"
                  data-testid="save-content-panel"
                  disabled={saving || loading || !dirty}
                  onClick={saveAllEdits}
                  className="rounded-lg bg-[#008060] text-white text-sm font-bold px-4 py-2 disabled:opacity-40 shrink-0"
                >
                  {saving ? 'Saving…' : 'Save'}
                </button>
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
                  className={`rounded-xl border-2 border-dashed p-4 text-center bg-white transition ${
                    dragOver ? 'border-[#008060] bg-[#F1F8F5]' : 'border-[#C9CCCF]'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={draftBag[selected.id]}
                    src={draftBag[selected.id] || '/packages/basic.jpg'}
                    alt={selected.label}
                    className="mx-auto mb-3 max-h-44 w-full rounded-lg object-cover shadow-sm bg-stone-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/packages/basic.jpg';
                    }}
                  />
                  <p className="text-sm font-semibold text-[#202223]">
                    {uploading ? 'Uploading & saving…' : 'Drag a photo here'}
                  </p>
                  <p className="text-xs text-[#6D7175] mt-1 mb-3">JPG, PNG or WebP · max 5MB</p>
                  <button
                    type="button"
                    data-testid="upload-image"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-block cursor-pointer rounded-lg bg-[#008060] text-white text-sm font-bold px-4 py-2.5 disabled:opacity-50"
                  >
                    {uploading ? 'Working…' : 'Choose photo'}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void uploadImage(file);
                      e.target.value = '';
                    }}
                  />
                </div>
              ) : selected.type === 'textarea' ? (
                <textarea
                  value={draftBag[selected.id] || ''}
                  onChange={(e) => setFieldValue(selected.id, e.target.value)}
                  rows={5}
                  className="w-full rounded-lg border border-[#C9CCCF] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#008060]/30"
                />
              ) : (
                <input
                  value={draftBag[selected.id] || ''}
                  onChange={(e) => setFieldValue(selected.id, e.target.value)}
                  className="w-full rounded-lg border border-[#C9CCCF] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#008060]/30"
                />
              )}
            </div>
          )}
        </aside>

        <section className="min-h-0 flex flex-col order-1 lg:order-2 max-h-[40vh] lg:max-h-none">
          <div className="shrink-0 px-4 py-2 bg-white border-b border-[#E1E3E5] flex items-center gap-2">
            <span className="text-xs font-semibold text-[#6D7175] mr-1">Preview</span>
            {(['home', 'packages'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setPreviewMode(m)}
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                  previewMode === m ? 'bg-[#1A1A1A] text-white' : 'bg-[#E4E5E7] text-[#202223]'
                }`}
              >
                {m === 'home' ? 'Homepage' : 'Packages'}
              </button>
            ))}
            <span className="ml-auto text-[11px] text-[#6D7175] hidden sm:inline">
              {dirty ? 'Unsaved changes' : 'All changes saved'}
            </span>
          </div>
          <div className="flex-1 min-h-0 p-2 sm:p-3">
            <div className="h-full rounded-xl overflow-hidden border border-[#C9CCCF] shadow-sm bg-white">
              <LiveCanvasPreview
                bag={draftBag}
                mode={previewMode}
                selectedId={selected?.id}
                onSelect={setSelectedId}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Mobile floating Save — always visible */}
      <div className="lg:hidden shrink-0 border-t border-[#E1E3E5] bg-white p-3 safe-area-pb">
        <button
          type="button"
          data-testid="save-content-mobile"
          disabled={saving || loading || !dirty}
          onClick={saveAllEdits}
          className="w-full rounded-xl bg-[#008060] text-white font-bold py-3.5 text-base disabled:opacity-40 shadow-md"
        >
          {saving ? 'Saving…' : dirty ? 'Save changes' : 'All saved'}
        </button>
      </div>
    </div>
  );
}
