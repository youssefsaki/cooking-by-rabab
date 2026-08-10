'use client';

import { Image as ImageIcon, MousePointer2 } from 'lucide-react';
import type { SiteCopyBag } from '@/lib/cms-fields';
import { packagesFromCopy } from '@/lib/cms-fields';
import { DEFAULT_PACKAGES } from '@/lib/content-defaults';

type PreviewMode = 'home' | 'packages';

export default function LiveCanvasPreview({
  bag,
  mode,
  selectedId,
  onSelect,
}: {
  bag: SiteCopyBag;
  mode: PreviewMode;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  const packages = packagesFromCopy(bag, DEFAULT_PACKAGES);
  const ring = (id: string) =>
    selectedId === id
      ? 'ring-2 ring-[var(--admin-accent)] ring-offset-2 ring-offset-[var(--admin-ink)] rounded-sm'
      : 'hover:ring-2 hover:ring-[var(--admin-accent)]/70 rounded-sm';
  const pick = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(id);
  };

  if (mode === 'packages') {
    return (
      <div className="h-full overflow-y-auto bg-[#F5EFE7]">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <button
            type="button"
            onClick={pick('packages.badge')}
            className={`block mx-auto text-center text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 ${ring('packages.badge')}`}
          >
            {bag['packages.badge'] || packages.badge}
          </button>
          <button
            type="button"
            onClick={pick('packages.title')}
            className={`block w-full text-center text-2xl sm:text-3xl font-black text-gray-900 mb-2 ${ring('packages.title')}`}
          >
            {bag['packages.title'] || packages.title}
          </button>
          <button
            type="button"
            onClick={pick('packages.description')}
            className={`block w-full text-center text-sm text-gray-600 mb-8 ${ring('packages.description')}`}
          >
            {bag['packages.description'] || packages.description}
          </button>
          <div className="grid gap-4">
            {packages.items.map((pkg) => (
              <div key={pkg.id} className="rounded-2xl overflow-hidden bg-white shadow-md border border-amber-100">
                <button
                  type="button"
                  onClick={pick(`pkg.${pkg.id}.image`)}
                  className={`group relative block h-48 w-full overflow-hidden bg-stone-200 ${ring(`pkg.${pkg.id}.image`)}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute inset-0 flex items-center justify-center bg-black/45 transition ${
                      selectedId === `pkg.${pkg.id}.image` ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-black shadow-lg">
                      <ImageIcon className="size-3.5" />
                      Replace image
                    </span>
                  </span>
                </button>
                <div className="p-4 space-y-1">
                  <button
                    type="button"
                    onClick={pick(`pkg.${pkg.id}.name`)}
                    className={`block text-left font-bold text-lg ${ring(`pkg.${pkg.id}.name`)}`}
                  >
                    {pkg.name}
                  </button>
                  <button
                    type="button"
                    onClick={pick(`pkg.${pkg.id}.subtitle`)}
                    className={`block text-left text-sm text-gray-600 ${ring(`pkg.${pkg.id}.subtitle`)}`}
                  >
                    {pkg.subtitle}
                  </button>
                  <button
                    type="button"
                    onClick={pick(`pkg.${pkg.id}.price`)}
                    className={`block text-left text-xl font-black text-amber-800 ${ring(`pkg.${pkg.id}.price`)}`}
                  >
                    {pkg.price} <span className="text-sm font-semibold">{pkg.currency}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-black">
      <div className="relative min-h-[420px] flex items-center justify-center text-center px-6 py-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/desktop/bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <button
            type="button"
            onClick={pick('hero.badge')}
            className={`text-amber-400 text-xs tracking-[0.25em] uppercase ${ring('hero.badge')}`}
          >
            {bag['hero.badge']}
          </button>
          <h1 className="text-white text-3xl sm:text-4xl font-light">
            <button type="button" onClick={pick('hero.title')} className={`block italic w-full ${ring('hero.title')}`}>
              {bag['hero.title']}
            </button>
            <button
              type="button"
              onClick={pick('hero.titleHighlight')}
              className={`block font-bold uppercase mt-2 tracking-wide w-full ${ring('hero.titleHighlight')}`}
            >
              {bag['hero.titleHighlight']}
            </button>
          </h1>
          <button
            type="button"
            onClick={pick('hero.description')}
            className={`text-white/90 text-sm sm:text-base leading-relaxed ${ring('hero.description')}`}
          >
            {bag['hero.description']}
          </button>
          <button
            type="button"
            onClick={pick('hero.bookButton')}
            className={`inline-block bg-amber-500 text-black font-bold text-sm px-5 py-2.5 rounded-full ${ring('hero.bookButton')}`}
          >
            {bag['hero.bookButton']}
          </button>
        </div>
      </div>

      <div className="bg-[#F5EFE7] px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <button
            type="button"
            onClick={pick('packages.badge')}
            className={`block mx-auto text-center text-xs font-bold uppercase text-amber-800 mb-2 ${ring('packages.badge')}`}
          >
            {bag['packages.badge']}
          </button>
          <button
            type="button"
            onClick={pick('packages.title')}
            className={`block w-full text-center text-2xl font-black mb-6 ${ring('packages.title')}`}
          >
            {bag['packages.title']}
          </button>
          <div className="grid sm:grid-cols-3 gap-3">
            {packages.items.map((pkg) => (
              <div key={pkg.id} className="rounded-xl overflow-hidden bg-white shadow">
                <button
                  type="button"
                  onClick={pick(`pkg.${pkg.id}.image`)}
                  className={`group relative block h-32 w-full overflow-hidden bg-stone-200 ${ring(`pkg.${pkg.id}.image`)}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute inset-0 flex items-center justify-center bg-black/50 transition ${
                      selectedId === `pkg.${pkg.id}.image` ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[10px] font-bold text-black">
                      <ImageIcon className="size-3" />
                      Edit photo
                    </span>
                  </span>
                </button>
                <div className="p-3 text-left">
                  <button
                    type="button"
                    onClick={pick(`pkg.${pkg.id}.name`)}
                    className={`font-bold text-sm ${ring(`pkg.${pkg.id}.name`)}`}
                  >
                    {pkg.name}
                  </button>
                  <button
                    type="button"
                    onClick={pick(`pkg.${pkg.id}.price`)}
                    className={`block text-amber-800 font-black ${ring(`pkg.${pkg.id}.price`)}`}
                  >
                    {pkg.price} {pkg.currency}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none sticky bottom-4 z-20 mx-auto -mt-12 flex w-fit items-center gap-2 rounded-full bg-[var(--admin-ink)]/90 px-3 py-2 text-[10px] font-semibold text-white shadow-xl backdrop-blur-md">
        <MousePointer2 className="size-3 text-[var(--admin-accent)]" />
        Click text or photos to edit
      </div>
    </div>
  );
}
