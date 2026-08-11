'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  ChevronLeft,
  Eye,
  Image as ImageIcon,
  Languages,
  LayoutPanelLeft,
  Loader2,
  Monitor,
  Save,
  Search,
  Smartphone,
  UploadCloud,
  X,
} from 'lucide-react';
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
import { PREVIEW_PAGES, previewPageForField, type PreviewPage } from '@/lib/site-images';
import { invalidateSiteCopyCache } from '@/hooks/useSiteCopy';

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
  const [previewMode, setPreviewMode] = useState<PreviewPage>('home');
  const [panelMode, setPanelMode] = useState<'content' | 'images'>('content');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
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
  const imageFields = useMemo(() => fields.filter((field) => field.type === 'image'), [fields]);
  const selectedGroup = selected?.group;

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
    if (!selected?.id) return;
    setPreviewMode(previewPageForField(selected.id, selectedGroup));
  }, [selected?.id, selectedGroup]);

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
      invalidateSiteCopyCache();
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
      setError('Select a photo first (click a photo in the preview or Images tab).');
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
    <div className="flex h-full flex-col overflow-hidden bg-[var(--admin-canvas)]">
      <header className="z-50 flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[var(--admin-ink)] px-3 py-3 text-white sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <a
            href="/admin"
            aria-label="Back to dashboard"
            className="admin-focus grid size-9 shrink-0 place-items-center rounded-xl bg-white/[0.08] text-white/70 hover:bg-white/15 hover:text-white"
          >
            <ChevronLeft className="size-4" />
          </a>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold sm:text-base">Visual storefront editor</h1>
            <p className="hidden text-[11px] text-white/45 sm:block">
              Click anything in the preview to edit it
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center rounded-xl bg-white/[0.07] p-1 sm:flex">
            <Languages className="mx-2 size-3.5 text-white/45" />
            {LOCALES.map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => {
                  if (dirty && !confirm('Discard unsaved edits and switch language?')) return;
                  setLocale(language);
                }}
                className={`admin-focus rounded-lg px-2.5 py-1.5 text-[10px] font-bold uppercase transition ${
                  locale === language
                    ? 'bg-white text-[var(--admin-ink)]'
                    : 'text-white/45 hover:text-white'
                }`}
              >
                {language}
              </button>
            ))}
          </div>
          {dirty && (
            <button
              type="button"
              onClick={() => {
                setDraftBag(savedBag);
                draftRef.current = savedBag;
                setStatus('Draft discarded.');
              }}
              className="admin-focus hidden rounded-xl px-3 py-2 text-xs font-semibold text-white/55 hover:bg-white/[0.08] hover:text-white sm:block"
            >
              Discard
            </button>
          )}
          <button
            type="button"
            data-testid="save-content"
            disabled={saving || loading || (!dirty && !uploading)}
            onClick={saveAllEdits}
            className={`admin-focus inline-flex min-w-[98px] items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              dirty
                ? 'bg-[var(--admin-accent)] text-[var(--admin-on-accent)] hover:bg-[var(--admin-accent-strong)]'
                : 'bg-white/[0.10] text-white/55'
            } disabled:cursor-default`}
          >
            {saving ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : dirty ? (
              <Save className="size-3.5" />
            ) : (
              <Check className="size-3.5" />
            )}
            {saving ? 'Saving' : dirty ? 'Save changes' : 'Saved'}
          </button>
        </div>
      </header>

      {(status || error) && (
        <div
          role="status"
          className={`flex shrink-0 items-center justify-between border-b px-4 py-2 text-xs ${
            error
              ? 'border-red-200 bg-red-50 text-red-700'
              : 'border-emerald-200 bg-[var(--admin-accent-soft)] text-[var(--admin-ink)]'
          }`}
        >
          <span>{error || status}</span>
          <button type="button" onClick={() => (error ? setError('') : setStatus(''))} aria-label="Dismiss">
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <div className="grid min-h-0 flex-1 lg:grid-cols-[420px_1fr]">
        <aside className="order-2 flex min-h-0 flex-col border-r border-[var(--admin-line)] bg-white lg:order-1">
          <div className="shrink-0 border-b border-[var(--admin-line)] p-3">
            <div className="grid grid-cols-2 rounded-xl bg-[var(--admin-surface-soft)] p-1">
              <button
                type="button"
                onClick={() => setPanelMode('content')}
                className={`admin-focus flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  panelMode === 'content'
                    ? 'bg-white text-[var(--admin-ink)] shadow-sm'
                    : 'text-[var(--admin-muted)]'
                }`}
              >
                <LayoutPanelLeft className="size-3.5" />
                Sections
              </button>
              <button
                type="button"
                onClick={() => setPanelMode('images')}
                className={`admin-focus flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  panelMode === 'images'
                    ? 'bg-white text-[var(--admin-ink)] shadow-sm'
                    : 'text-[var(--admin-muted)]'
                }`}
              >
                <ImageIcon className="size-3.5" />
                Images
                <span className="rounded-full bg-[var(--admin-accent-soft)] px-1.5 py-0.5 text-[9px] text-[var(--admin-ink)]">
                  {imageFields.length}
                </span>
              </button>
            </div>

            {panelMode === 'content' && (
              <div className="relative mt-3">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[var(--admin-muted)]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search all content"
                  className="admin-focus w-full rounded-xl border border-[var(--admin-line)] bg-white py-2.5 pl-9 pr-3 text-xs text-[var(--admin-copy)] placeholder:text-[var(--admin-muted)]"
                />
              </div>
            )}
          </div>

          <div className="admin-scrollbar min-h-0 flex-1 overflow-y-auto p-3">
            {loading ? (
              <div className="flex items-center gap-2 p-4 text-xs text-[var(--admin-muted)]">
                <Loader2 className="size-4 animate-spin" /> Loading storefront
              </div>
            ) : panelMode === 'images' ? (
              <div>
                <div className="mb-4 rounded-2xl bg-[var(--admin-ink)] p-4 text-white">
                  <div className="flex items-center gap-2 text-[var(--admin-accent)]">
                    <UploadCloud className="size-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em]">Visual media</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold">Replace any photo on the website.</p>
                  <p className="mt-1 text-xs leading-5 text-white/50">
                    {imageFields.length} photos · uploads save automatically. Use the page tabs in the preview.
                  </p>
                </div>
                {Array.from(
                  imageFields.reduce((map, field) => {
                    const list = map.get(field.group) || [];
                    list.push(field);
                    map.set(field.group, list);
                    return map;
                  }, new Map<string, typeof imageFields>())
                ).map(([group, list]) => (
                  <div key={group} className="mb-5">
                    <p className="mb-2 px-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--admin-muted)]">
                      {group}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {list.map((field) => {
                        const active = field.id === selected.id;
                        return (
                          <button
                            key={field.id}
                            type="button"
                            onClick={() => {
                              setSelectedId(field.id);
                              setPreviewMode(previewPageForField(field.id, field.group));
                            }}
                            className={`admin-focus group overflow-hidden rounded-2xl border bg-white text-left transition ${
                              active
                                ? 'border-[var(--admin-accent-strong)] ring-2 ring-[var(--admin-accent)]/35'
                                : 'border-[var(--admin-line)] hover:border-[var(--admin-line-strong)]'
                            }`}
                          >
                            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--admin-surface-soft)]">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={draftBag[field.id] || '/packages/basic.jpg'}
                                alt={field.label}
                                className="size-full object-cover transition duration-500 group-hover:scale-105"
                              />
                              <span className="absolute inset-x-2 bottom-2 rounded-lg bg-black/70 px-2 py-1 text-center text-[9px] font-bold text-white backdrop-blur-sm">
                                Replace photo
                              </span>
                            </div>
                            <div className="p-2.5">
                              <p className="truncate text-xs font-semibold text-[var(--admin-copy)]">{field.label}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              grouped.map(([group, list]) => (
                <div key={group} className="mb-4">
                  <p className="px-2 pb-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--admin-muted)]">
                    {group}
                  </p>
                  <div className="space-y-1">
                    {list.map((field) => {
                      const active = field.id === selected?.id;
                      const changed = (draftBag[field.id] || '') !== (savedBag[field.id] || '');
                      return (
                        <button
                          key={field.id}
                          type="button"
                          onClick={() => setSelectedId(field.id)}
                          className={`admin-focus w-full rounded-xl border px-3 py-2.5 text-left transition ${
                            active
                              ? 'border-[var(--admin-accent-strong)] bg-[var(--admin-accent-soft)]'
                              : 'border-transparent hover:bg-[var(--admin-surface-soft)]'
                          }`}
                        >
                          <span className="flex items-center gap-2 text-xs font-semibold text-[var(--admin-copy)]">
                            {field.type === 'image' && <ImageIcon className="size-3.5" />}
                            <span className="truncate">{field.label.replace(/^Homepage — |^Packages section — /, '')}</span>
                            {changed && <span className="ml-auto size-1.5 shrink-0 rounded-full bg-[var(--admin-warning)]" />}
                          </span>
                          <span className="mt-1 block truncate text-[10px] text-[var(--admin-muted)]">
                            {field.type === 'image' ? 'Click to replace photo' : draftBag[field.id] || 'Empty'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {selected && !loading && (
            <div className="admin-scrollbar max-h-[52%] shrink-0 overflow-y-auto border-t border-[var(--admin-line)] bg-[var(--admin-surface-soft)] p-4">
              <div className="mb-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--admin-accent-strong)]">
                  Editing now
                </p>
                <h2 className="mt-1 text-sm font-semibold text-[var(--admin-ink)]">{selected.label}</h2>
              </div>

              {selected.type === 'image' ? (
                <div
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(event) => {
                    event.preventDefault();
                    setDragOver(false);
                    const file = event.dataTransfer.files?.[0];
                    if (file) void uploadImage(file);
                  }}
                  className={`overflow-hidden rounded-2xl border-2 border-dashed bg-white transition ${
                    dragOver
                      ? 'border-[var(--admin-accent-strong)] bg-[var(--admin-accent-soft)]'
                      : 'border-[var(--admin-line-strong)]'
                  }`}
                >
                  <div className="relative aspect-[16/8] bg-[var(--admin-ink)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={draftBag[selected.id]}
                      src={draftBag[selected.id] || '/packages/basic.jpg'}
                      alt={selected.label}
                      className="size-full object-cover"
                      onError={(event) => {
                        (event.target as HTMLImageElement).src = '/packages/basic.jpg';
                      }}
                    />
                    {uploading && (
                      <div className="absolute inset-0 grid place-items-center bg-[var(--admin-ink)]/80 text-white backdrop-blur-sm">
                        <div className="text-center">
                          <Loader2 className="mx-auto size-6 animate-spin text-[var(--admin-accent)]" />
                          <p className="mt-2 text-xs font-semibold">Uploading and publishing</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-xs font-semibold text-[var(--admin-copy)]">Drop a new image here</p>
                    <p className="mt-1 text-[10px] text-[var(--admin-muted)]">JPG, PNG, WebP or AVIF · max 5MB</p>
                    <button
                      type="button"
                      data-testid="upload-image"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="admin-focus mt-3 inline-flex items-center gap-2 rounded-xl bg-[var(--admin-ink)] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[var(--admin-ink-soft)] disabled:opacity-50"
                    >
                      <UploadCloud className="size-3.5 text-[var(--admin-accent)]" />
                      {uploading ? 'Publishing…' : 'Choose new image'}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      className="hidden"
                      disabled={uploading}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) void uploadImage(file);
                        event.target.value = '';
                      }}
                    />
                  </div>
                </div>
              ) : selected.type === 'textarea' ? (
                <textarea
                  value={draftBag[selected.id] || ''}
                  onChange={(event) => setFieldValue(selected.id, event.target.value)}
                  rows={5}
                  className="admin-focus w-full resize-none rounded-xl border border-[var(--admin-line-strong)] bg-white px-3 py-2.5 text-xs leading-5 text-[var(--admin-copy)]"
                />
              ) : (
                <input
                  value={draftBag[selected.id] || ''}
                  onChange={(event) => setFieldValue(selected.id, event.target.value)}
                  className="admin-focus w-full rounded-xl border border-[var(--admin-line-strong)] bg-white px-3 py-2.5 text-xs text-[var(--admin-copy)]"
                />
              )}
            </div>
          )}
        </aside>

        <section className="order-1 flex min-h-0 max-h-[42vh] flex-col bg-[#dfe3dd] lg:order-2 lg:max-h-none">
          <div className="flex shrink-0 items-center gap-2 border-b border-[var(--admin-line-strong)] bg-white px-3 py-2.5">
            <div className="admin-scrollbar flex max-w-[min(100%,520px)] items-center gap-1 overflow-x-auto rounded-xl bg-[var(--admin-surface-soft)] p-1">
              {PREVIEW_PAGES.map((page) => (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => setPreviewMode(page.id)}
                  className={`admin-focus shrink-0 rounded-lg px-3 py-1.5 text-[10px] font-bold transition ${
                    previewMode === page.id
                      ? 'bg-[var(--admin-ink)] text-white'
                      : 'text-[var(--admin-muted)]'
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </div>
            <div className="ml-auto hidden items-center gap-1 rounded-xl bg-[var(--admin-surface-soft)] p-1 sm:flex">
              <button
                type="button"
                aria-label="Desktop preview"
                onClick={() => setDeviceMode('desktop')}
                className={`admin-focus grid size-7 place-items-center rounded-lg ${
                  deviceMode === 'desktop' ? 'bg-white shadow-sm' : 'text-[var(--admin-muted)]'
                }`}
              >
                <Monitor className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="Mobile preview"
                onClick={() => setDeviceMode('mobile')}
                className={`admin-focus grid size-7 place-items-center rounded-lg ${
                  deviceMode === 'mobile' ? 'bg-white shadow-sm' : 'text-[var(--admin-muted)]'
                }`}
              >
                <Smartphone className="size-3.5" />
              </button>
            </div>
            <span className="hidden items-center gap-1.5 text-[10px] font-semibold text-[var(--admin-muted)] sm:flex">
              <Eye className="size-3.5" />
              Live preview
            </span>
          </div>

          <div className="admin-scrollbar flex min-h-0 flex-1 justify-center overflow-auto p-3 sm:p-5">
            <div
              className={`h-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[var(--admin-shadow-lg)] transition-[width] duration-500 ${
                deviceMode === 'mobile' ? 'w-[390px] max-w-full' : 'w-full'
              }`}
            >
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

      <div className="shrink-0 border-t border-[var(--admin-line)] bg-white p-3 lg:hidden">
        <button
          type="button"
          data-testid="save-content-mobile"
          disabled={saving || loading || !dirty}
          onClick={saveAllEdits}
          className="admin-focus flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--admin-ink)] py-3 text-sm font-bold text-white disabled:opacity-40"
        >
          <Save className="size-4 text-[var(--admin-accent)]" />
          {saving ? 'Saving…' : dirty ? 'Save changes' : 'All changes saved'}
        </button>
      </div>
    </div>
  );
}
