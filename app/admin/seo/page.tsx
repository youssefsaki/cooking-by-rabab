'use client';

import { useEffect, useMemo, useState } from 'react';
import { SEO_PAGES } from '@/lib/seo-pages';
import { invalidateSiteCopyCache } from '@/hooks/useSiteCopy';

const LOCALES = ['en', 'fr', 'de'] as const;

export default function AdminSeoPage() {
  const [locale, setLocale] = useState<(typeof LOCALES)[number]>('en');
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/content?section=site_copy&locale=${locale}`)
      .then((r) => r.json())
      .then((payload) => {
        if (cancelled) return;
        const next = (payload.ok && payload.data) || {};
        const seed: Record<string, string> = {};
        for (const page of SEO_PAGES) {
          seed[page.titleKey] = next[page.titleKey] || '';
          seed[page.descriptionKey] = next[page.descriptionKey] || '';
        }
        setDraft(seed);
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load SEO fields');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const rows = useMemo(
    () =>
      SEO_PAGES.map((page) => {
        const title = (draft[page.titleKey] || '').trim();
        const description = (draft[page.descriptionKey] || '').trim();
        return {
          ...page,
          titleSet: Boolean(title),
          descriptionSet: Boolean(description),
        };
      }),
    [draft]
  );

  async function save() {
    setSaving(true);
    setError('');
    setStatus('');
    const res = await fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'site_copy', locale, data: draft }),
    });
    const payload = await res.json();
    setSaving(false);
    if (!payload.ok) {
      setError(payload.error || 'Save failed');
      return;
    }
    invalidateSiteCopyCache();
    setStatus('SEO fields saved.');
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[#202223]">SEO</h1>
          <p className="text-sm text-[#6D7175]">
            Per-page meta title and description. Empty fields keep the current hardcoded defaults.
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

      <button
        type="button"
        onClick={() => void save()}
        disabled={saving || loading}
        className="rounded-lg bg-[#008060] px-4 py-2 text-sm font-semibold text-white hover:bg-[#006e52] disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save SEO fields'}
      </button>

      {loading ? (
        <p className="text-sm text-[#6D7175]">Loading…</p>
      ) : (
        <div className="space-y-4">
          {rows.map((page) => (
            <article key={page.id} className="rounded-xl border border-[#E1E3E5] bg-white p-5 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-semibold text-[#202223]">{page.label}</h2>
                  <p className="text-xs text-[#6D7175]">{page.path}</p>
                </div>
                <div className="flex gap-2 text-[10px] font-bold uppercase">
                  <span
                    className={`rounded-full px-2 py-1 ${
                      page.titleSet ? 'bg-[#F1F8F5] text-[#0D8050]' : 'bg-[#FFF4F4] text-[#D72C0D]'
                    }`}
                  >
                    title {page.titleSet ? 'set' : 'missing'}
                  </span>
                  <span
                    className={`rounded-full px-2 py-1 ${
                      page.descriptionSet
                        ? 'bg-[#F1F8F5] text-[#0D8050]'
                        : 'bg-[#FFF4F4] text-[#D72C0D]'
                    }`}
                  >
                    description {page.descriptionSet ? 'set' : 'missing'}
                  </span>
                </div>
              </div>
              <label className="mb-3 block text-sm font-semibold">
                Meta title
                <input
                  value={draft[page.titleKey] || ''}
                  onChange={(e) => setDraft((d) => ({ ...d, [page.titleKey]: e.target.value }))}
                  placeholder={page.fallbackTitle}
                  className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
                />
              </label>
              <label className="block text-sm font-semibold">
                Meta description
                <textarea
                  rows={3}
                  value={draft[page.descriptionKey] || ''}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, [page.descriptionKey]: e.target.value }))
                  }
                  placeholder={page.fallbackDescription}
                  className="mt-1 w-full rounded-lg border border-[#C9CCCF] px-3 py-2 font-normal"
                />
              </label>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
