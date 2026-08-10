'use client';

import { Image as ImageIcon, MousePointer2 } from 'lucide-react';
import type { SiteCopyBag } from '@/lib/cms-fields';
import { faqsFromCopy, packagesFromCopy } from '@/lib/cms-fields';
import { DEFAULT_PACKAGES } from '@/lib/content-defaults';
import { imageFromBag, type PreviewPage } from '@/lib/site-images';
import faqsFallback from '@/data/faqs.json';

function PhotoButton({
  id,
  src,
  alt,
  selectedId,
  onSelect,
  className = '',
  label = 'Replace image',
}: {
  id: string;
  src: string;
  alt?: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
  label?: string;
}) {
  const active = selectedId === id;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(id);
      }}
      className={`group relative block w-full overflow-hidden bg-stone-200 ${
        active
          ? 'ring-2 ring-[var(--admin-accent)] ring-offset-2 ring-offset-transparent'
          : 'hover:ring-2 hover:ring-[var(--admin-accent)]/70'
      } ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt || ''} className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105" />
      <span
        className={`absolute inset-0 flex items-center justify-center bg-black/45 transition ${
          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[10px] font-bold text-black shadow">
          <ImageIcon className="size-3" />
          {label}
        </span>
      </span>
    </button>
  );
}

function TextButton({
  id,
  selectedId,
  onSelect,
  className = '',
  children,
}: {
  id: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const active = selectedId === id;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(id);
      }}
      className={`${className} ${
        active
          ? 'ring-2 ring-[var(--admin-accent)] ring-offset-2 rounded-sm'
          : 'hover:ring-2 hover:ring-[var(--admin-accent)]/70 rounded-sm'
      }`}
    >
      {children}
    </button>
  );
}

function Tip() {
  return (
    <div className="pointer-events-none sticky bottom-4 z-20 mx-auto flex w-fit items-center gap-2 rounded-full bg-[var(--admin-ink)]/90 px-3 py-2 text-[10px] font-semibold text-white shadow-xl backdrop-blur-md">
      <MousePointer2 className="size-3 text-[var(--admin-accent)]" />
      Click text or photos to edit · scroll for full page
    </div>
  );
}

export default function LiveCanvasPreview({
  bag,
  mode,
  selectedId,
  onSelect,
}: {
  bag: SiteCopyBag;
  mode: PreviewPage;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  const packages = packagesFromCopy(bag, DEFAULT_PACKAGES);
  const faqs = faqsFromCopy(bag, faqsFallback as never);
  const img = (key: string) => imageFromBag(bag, key);
  const pick = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(id);
  };

  if (mode === 'packages') {
    return (
      <div className="h-full overflow-y-auto bg-[#F5EFE7]">
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
          <TextButton id="packagesPage.badge" selectedId={selectedId} onSelect={onSelect} className="block mx-auto text-center text-xs font-bold uppercase tracking-wider text-amber-800">
            {bag['packagesPage.badge'] || bag['packages.badge'] || packages.badge}
          </TextButton>
          <TextButton id="packagesPage.title" selectedId={selectedId} onSelect={onSelect} className="block w-full text-center text-2xl font-black text-gray-900">
            {bag['packagesPage.title'] || bag['packages.title'] || packages.title}
          </TextButton>
          <TextButton id="packagesPage.titleHighlight" selectedId={selectedId} onSelect={onSelect} className="block w-full text-center text-lg font-bold text-amber-700">
            {bag['packagesPage.titleHighlight']}
          </TextButton>
          <TextButton id="packagesPage.description" selectedId={selectedId} onSelect={onSelect} className="block w-full text-center text-sm text-gray-600 mb-4">
            {bag['packagesPage.description'] || bag['packages.description'] || packages.description}
          </TextButton>
          {packages.items.map((pkg) => (
            <div key={pkg.id} className="rounded-2xl overflow-hidden bg-white shadow border border-amber-100">
              <PhotoButton id={`pkg.${pkg.id}.image`} src={pkg.image} alt={pkg.imageAlt} selectedId={selectedId} onSelect={onSelect} className="h-44" />
              <div className="p-4 space-y-1">
                <TextButton id={`pkg.${pkg.id}.name`} selectedId={selectedId} onSelect={onSelect} className="block text-left font-bold text-lg">
                  {pkg.name}
                </TextButton>
                <TextButton id={`pkg.${pkg.id}.subtitle`} selectedId={selectedId} onSelect={onSelect} className="block text-left text-sm text-gray-600">
                  {pkg.subtitle}
                </TextButton>
                <TextButton id={`pkg.${pkg.id}.price`} selectedId={selectedId} onSelect={onSelect} className="block text-left text-xl font-black text-amber-800">
                  {pkg.price} {pkg.currency}
                </TextButton>
              </div>
            </div>
          ))}
        </div>
        <Tip />
      </div>
    );
  }

  if (mode === 'experiences') {
    const ids = [
      'cooking-masterclass',
      'amazigh-heritage',
      'tea-ceremony',
      'clay-oven-bread',
      'amlou-workshop',
    ] as const;
    return (
      <div className="h-full overflow-y-auto bg-white">
        <div className="bg-gradient-to-b from-amber-50 to-white px-4 py-10 text-center space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">Navbar · Experiences</p>
          <TextButton id="experiencesPage.title" selectedId={selectedId} onSelect={onSelect} className="block w-full text-2xl font-black text-gray-900">
            {bag['experiencesPage.title']}
          </TextButton>
          <TextButton id="experiencesPage.titleHighlight" selectedId={selectedId} onSelect={onSelect} className="block w-full text-lg font-bold text-amber-700">
            {bag['experiencesPage.titleHighlight']}
          </TextButton>
          <TextButton id="experiencesPage.description" selectedId={selectedId} onSelect={onSelect} className="block w-full text-sm text-gray-600">
            {bag['experiencesPage.description']}
          </TextButton>
        </div>
        <div className="max-w-3xl mx-auto grid gap-4 px-4 pb-10">
          {ids.map((id) => (
            <div key={id} className="rounded-2xl overflow-hidden border border-amber-100 bg-white shadow">
              <PhotoButton id={`experiences.${id}.image`} src={img(`experiences.${id}.image`)} selectedId={selectedId} onSelect={onSelect} className="h-40" />
              <div className="p-3 space-y-1">
                <TextButton id={`expCard.${id}.title`} selectedId={selectedId} onSelect={onSelect} className="block w-full text-left text-sm font-bold">
                  {bag[`expCard.${id}.title`]}
                </TextButton>
                <TextButton id={`expCard.${id}.subtitle`} selectedId={selectedId} onSelect={onSelect} className="block w-full text-left text-xs text-gray-600">
                  {bag[`expCard.${id}.subtitle`]}
                </TextButton>
              </div>
            </div>
          ))}
        </div>
        <Tip />
      </div>
    );
  }

  if (mode === 'events') {
    return (
      <div className="h-full overflow-y-auto bg-white">
        <div className="relative min-h-[280px]">
          <PhotoButton id="events.hero.image" src={img('events.hero.image')} selectedId={selectedId} onSelect={onSelect} className="!absolute inset-0 h-full rounded-none" label="Events hero" />
          <div className="absolute inset-0 bg-black/45 pointer-events-none" />
          <div className="relative z-10 flex min-h-[280px] items-center justify-center px-6 text-center text-white">
            <div className="space-y-2">
              <TextButton id="events.badge" selectedId={selectedId} onSelect={onSelect} className="block mx-auto text-xs font-bold uppercase tracking-wider text-amber-300">
                {bag['events.badge']}
              </TextButton>
              <TextButton id="events.title1" selectedId={selectedId} onSelect={onSelect} className="block w-full text-3xl font-black">
                {bag['events.title1']} {bag['events.title2']}
              </TextButton>
              <TextButton id="events.title3" selectedId={selectedId} onSelect={onSelect} className="block w-full text-2xl font-black">
                {bag['events.title3']}
              </TextButton>
              <TextButton id="events.description" selectedId={selectedId} onSelect={onSelect} className="block w-full text-sm text-white/90">
                {bag['events.description']}
              </TextButton>
              <TextButton id="events.price" selectedId={selectedId} onSelect={onSelect} className="block mx-auto text-xl font-black">
                {bag['events.price']}
              </TextButton>
            </div>
          </div>
        </div>
        <div className="max-w-xl mx-auto px-4 py-8 space-y-2">
          {[0, 1, 2, 3, 4, 5].map((i) =>
            bag[`events.highlight.${i}`] ? (
              <TextButton key={i} id={`events.highlight.${i}`} selectedId={selectedId} onSelect={onSelect} className="block w-full text-left text-sm text-gray-700">
                • {bag[`events.highlight.${i}`]}
              </TextButton>
            ) : null
          )}
        </div>
        <Tip />
      </div>
    );
  }

  if (mode === 'kitchen') {
    return (
      <div className="h-full overflow-y-auto bg-white">
        <div className="bg-gradient-to-br from-amber-600 to-orange-500 px-4 py-12 text-center text-white space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2">Our Story · Kitchen</p>
          <TextButton id="kitchen.heroTitle" selectedId={selectedId} onSelect={onSelect} className="block w-full text-2xl font-bold">
            {bag['kitchen.heroTitle']}
          </TextButton>
          <TextButton id="kitchen.heroSubtitle" selectedId={selectedId} onSelect={onSelect} className="block w-full text-sm text-white/90">
            {bag['kitchen.heroSubtitle']}
          </TextButton>
        </div>
        <div className="max-w-3xl mx-auto space-y-6 px-4 py-8">
          <TextButton id="kitchen.introTitle" selectedId={selectedId} onSelect={onSelect} className="block w-full text-left text-xl font-black">
            {bag['kitchen.introTitle']} {bag['kitchen.introTitleHighlight']}
          </TextButton>
          <TextButton id="kitchen.introP1" selectedId={selectedId} onSelect={onSelect} className="block w-full text-left text-sm text-gray-600">
            {bag['kitchen.introP1']}
          </TextButton>
          <PhotoButton id="kitchen.main" src={img('kitchen.main')} selectedId={selectedId} onSelect={onSelect} className="aspect-[4/3] rounded-2xl" label="Main photo" />
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <PhotoButton key={i} id={`kitchen.gallery.${i}`} src={img(`kitchen.gallery.${i}`)} selectedId={selectedId} onSelect={onSelect} className="aspect-square rounded-xl" label={`Gallery ${i + 1}`} />
            ))}
          </div>
        </div>
        <Tip />
      </div>
    );
  }

  if (mode === 'meet-chef') {
    return (
      <div className="h-full overflow-y-auto bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-3">
          <TextButton id="meetChef.badge" selectedId={selectedId} onSelect={onSelect} className="block mx-auto text-center text-xs font-bold uppercase tracking-wider text-amber-800">
            {bag['meetChef.badge']}
          </TextButton>
          <TextButton id="meetChef.title" selectedId={selectedId} onSelect={onSelect} className="block w-full text-center text-2xl font-black text-gray-900">
            {bag['meetChef.title']} {bag['meetChef.titleHighlight']}
          </TextButton>
          <PhotoButton id="meetChef.image" src={img('meetChef.image')} selectedId={selectedId} onSelect={onSelect} className="mx-auto aspect-[3/4] max-w-md rounded-3xl" label="Chef photo" />
          <TextButton id="meetChef.hello" selectedId={selectedId} onSelect={onSelect} className="block w-full text-left text-lg font-bold">
            {bag['meetChef.hello']}
          </TextButton>
          {[1, 2, 3, 4, 5].map((n) =>
            bag[`meetChef.paragraph.${n}`] ? (
              <TextButton key={n} id={`meetChef.paragraph.${n}`} selectedId={selectedId} onSelect={onSelect} className="block w-full text-left text-sm text-gray-600">
                {bag[`meetChef.paragraph.${n}`]}
              </TextButton>
            ) : null
          )}
        </div>
        <Tip />
      </div>
    );
  }

  if (mode === 'location') {
    return (
      <div className="h-full overflow-y-auto bg-white">
        <div className="bg-gradient-to-br from-amber-600 to-orange-500 px-4 py-14 text-center text-white space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2">Our Story · Location</p>
          <TextButton id="locationPage.heroTitle" selectedId={selectedId} onSelect={onSelect} className="block w-full text-2xl font-bold">
            {bag['locationPage.heroTitle']}
          </TextButton>
          <TextButton id="locationPage.heroSubtitle" selectedId={selectedId} onSelect={onSelect} className="block w-full text-sm text-white/90 max-w-md mx-auto">
            {bag['locationPage.heroSubtitle']}
          </TextButton>
        </div>
        <div className="max-w-xl mx-auto px-4 py-8">
          <div className="aspect-video rounded-2xl bg-stone-200 grid place-items-center text-sm text-stone-500 border border-amber-100">
            Google Map (live on website)
          </div>
        </div>
        <Tip />
      </div>
    );
  }

  if (mode === 'faq') {
    return (
      <div className="h-full overflow-y-auto bg-[#F5EFE7]">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">FAQ & Contact</p>
          <h2 className="text-center text-2xl font-black text-gray-900 mb-6">Questions travelers ask</h2>
          <div className="space-y-3">
            {faqs.faqs.slice(0, 8).map((faq) => (
              <div key={faq.id} className="rounded-xl bg-white border border-amber-100 p-4 space-y-2">
                <TextButton id={`faq.${faq.id}.question`} selectedId={selectedId} onSelect={onSelect} className="block w-full text-left font-semibold text-sm">
                  {faq.question}
                </TextButton>
                <TextButton id={`faq.${faq.id}.answer`} selectedId={selectedId} onSelect={onSelect} className="block w-full text-left text-xs text-gray-600">
                  {faq.answer}
                </TextButton>
              </div>
            ))}
          </div>
        </div>
        <Tip />
      </div>
    );
  }

  if (mode === 'book') {
    return (
      <div className="h-full overflow-y-auto bg-[#F5EFE7]">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">Navbar · Book now</p>
          <h2 className="text-center text-2xl font-black text-gray-900 mb-2">Booking flow</h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Live calendar, capacity locks, and dish selection write to Supabase. Package photos below are editable.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {packages.items.map((pkg) => (
              <div key={pkg.id} className="rounded-xl overflow-hidden bg-white shadow">
                <PhotoButton id={`pkg.${pkg.id}.image`} src={pkg.image} selectedId={selectedId} onSelect={onSelect} className="h-28" />
                <div className="p-3">
                  <p className="font-bold text-sm">{pkg.name}</p>
                  <p className="text-amber-800 font-black text-sm">
                    {pkg.price} {pkg.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Tip />
      </div>
    );
  }

  // Full homepage
  return (
    <div className="h-full overflow-y-auto bg-black">
      <div className="relative min-h-[420px] flex items-center justify-center text-center px-6 py-16">
        <PhotoButton
          id="hero.bg.desktop"
          src={img('hero.bg.desktop')}
          selectedId={selectedId}
          onSelect={onSelect}
          className="!absolute inset-0 h-full rounded-none"
          label="Hero background"
        />
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <button type="button" onClick={pick('hero.badge')} className={`text-amber-400 text-xs tracking-[0.25em] uppercase ${selectedId === 'hero.badge' ? 'ring-2 ring-[var(--admin-accent)]' : ''}`}>
            {bag['hero.badge']}
          </button>
          <h1 className="text-white text-3xl sm:text-4xl font-light">
            <button type="button" onClick={pick('hero.title')} className={`block italic w-full ${selectedId === 'hero.title' ? 'ring-2 ring-[var(--admin-accent)]' : ''}`}>
              {bag['hero.title']}
            </button>
            <button type="button" onClick={pick('hero.titleHighlight')} className={`block font-bold uppercase mt-2 tracking-wide w-full ${selectedId === 'hero.titleHighlight' ? 'ring-2 ring-[var(--admin-accent)]' : ''}`}>
              {bag['hero.titleHighlight']}
            </button>
          </h1>
          <button type="button" onClick={pick('hero.description')} className={`text-white/90 text-sm leading-relaxed ${selectedId === 'hero.description' ? 'ring-2 ring-[var(--admin-accent)]' : ''}`}>
            {bag['hero.description']}
          </button>
          <button type="button" onClick={pick('hero.bookButton')} className={`inline-block bg-amber-500 text-black font-bold text-sm px-5 py-2.5 rounded-full ${selectedId === 'hero.bookButton' ? 'ring-2 ring-[var(--admin-accent)]' : ''}`}>
            {bag['hero.bookButton']}
          </button>
          <button type="button" onClick={pick('hero.bg.mobile')} className="mt-2 block w-full text-[10px] font-semibold uppercase tracking-wider text-white/70 underline">
            Edit mobile hero photo →
          </button>
        </div>
      </div>

      <div className="bg-[#F7F2EA] px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-2 text-center">
          <TextButton id="heroIntro.badge" selectedId={selectedId} onSelect={onSelect} className="block mx-auto text-xs font-bold uppercase tracking-wider text-amber-800">
            {bag['heroIntro.badge']}
          </TextButton>
          <TextButton id="heroIntro.title" selectedId={selectedId} onSelect={onSelect} className="block w-full text-2xl font-black text-gray-900">
            {bag['heroIntro.title']}
          </TextButton>
          <TextButton id="heroIntro.description" selectedId={selectedId} onSelect={onSelect} className="block w-full text-sm text-gray-600">
            {bag['heroIntro.description']}
          </TextButton>
        </div>
      </div>

      <div className="bg-[#F5EFE7] px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <TextButton id="packages.badge" selectedId={selectedId} onSelect={onSelect} className="block mx-auto text-center text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
            {bag['packages.badge']}
          </TextButton>
          <button type="button" onClick={pick('packages.title')} className="block w-full text-center text-2xl font-black mb-2">
            {bag['packages.title']}
          </button>
          <TextButton id="packages.description" selectedId={selectedId} onSelect={onSelect} className="block w-full text-center text-sm text-gray-600 mb-6">
            {bag['packages.description']}
          </TextButton>
          <div className="grid sm:grid-cols-2 gap-3">
            {packages.items.map((pkg) => (
              <div key={pkg.id} className="rounded-xl overflow-hidden bg-white shadow">
                <PhotoButton id={`pkg.${pkg.id}.image`} src={pkg.image} selectedId={selectedId} onSelect={onSelect} className="h-28" />
                <div className="p-3 text-left">
                  <TextButton id={`pkg.${pkg.id}.name`} selectedId={selectedId} onSelect={onSelect} className="block text-left font-bold text-sm">
                    {pkg.name}
                  </TextButton>
                  <TextButton id={`pkg.${pkg.id}.price`} selectedId={selectedId} onSelect={onSelect} className="block text-left text-amber-800 font-black text-sm">
                    {pkg.price} {pkg.currency}
                  </TextButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#1a1510] px-4 py-10">
        <TextButton id="heroSection.learnToCookPart1" selectedId={selectedId} onSelect={onSelect} className="block w-full text-center text-xl font-bold text-white mb-2">
          {bag['heroSection.learnToCookPart1']} {bag['heroSection.learnToCookPart2']}
        </TextButton>
        <TextButton id="heroSection.description" selectedId={selectedId} onSelect={onSelect} className="block w-full text-center text-sm text-white/80 mb-6">
          {bag['heroSection.description']}
        </TextButton>
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <PhotoButton key={i} id={`heroSection.image.${i}`} src={img(`heroSection.image.${i}`)} selectedId={selectedId} onSelect={onSelect} className="aspect-square rounded-xl" label={`Photo ${i + 1}`} />
          ))}
        </div>
      </div>

      <div className="bg-white px-4 py-10">
        <TextButton id="experience.subtitle" selectedId={selectedId} onSelect={onSelect} className="block w-full text-center text-xl font-black text-gray-900 mb-2">
          {bag['experience.subtitle'] || bag['experience.title']}
        </TextButton>
        <TextButton id="experience.description" selectedId={selectedId} onSelect={onSelect} className="block w-full text-center text-sm text-gray-600 mb-6">
          {bag['experience.description']}
        </TextButton>
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <PhotoButton id={`experience.step.${i}.image`} src={img(`experience.step.${i}.image`)} selectedId={selectedId} onSelect={onSelect} className="aspect-[4/3] rounded-2xl" label={`Step ${i}`} />
              <TextButton id={`experience.step.${i}.title`} selectedId={selectedId} onSelect={onSelect} className="block w-full text-left text-sm font-bold">
                {bag[`experience.step.${i}.title`]}
              </TextButton>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 px-4 py-10">
        <TextButton id="community.title" selectedId={selectedId} onSelect={onSelect} className="block w-full text-center text-xl font-black text-gray-900 mb-2">
          {bag['community.title']}
        </TextButton>
        <TextButton id="community.description" selectedId={selectedId} onSelect={onSelect} className="block w-full text-center text-sm text-gray-600 mb-6">
          {bag['community.description']}
        </TextButton>
        <div className="max-w-3xl mx-auto space-y-3">
          <PhotoButton id="community.hero.image" src={img('community.hero.image')} selectedId={selectedId} onSelect={onSelect} className="aspect-[16/9] rounded-2xl" label="Community hero" />
          <div className="grid grid-cols-2 gap-3">
            <PhotoButton id="community.cats.image" src={img('community.cats.image')} selectedId={selectedId} onSelect={onSelect} className="aspect-[4/3] rounded-xl" label="Cats" />
            <PhotoButton id="community.chickens.image" src={img('community.chickens.image')} selectedId={selectedId} onSelect={onSelect} className="aspect-[4/3] rounded-xl" label="Chickens" />
          </div>
        </div>
      </div>

      <div className="bg-white px-4 py-10">
        <TextButton id="thingsToDo.title" selectedId={selectedId} onSelect={onSelect} className="block w-full text-center text-xl font-black text-gray-900 mb-2">
          {bag['thingsToDo.title']}
        </TextButton>
        <TextButton id="thingsToDo.description" selectedId={selectedId} onSelect={onSelect} className="block w-full text-center text-sm text-gray-600 mb-6">
          {bag['thingsToDo.description']}
        </TextButton>
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-1">
              <PhotoButton id={`thingsToDo.activity.${i}.image`} src={img(`thingsToDo.activity.${i}.image`)} selectedId={selectedId} onSelect={onSelect} className="aspect-[4/3] rounded-xl" label={`Card ${i + 1}`} />
              <TextButton id={`thingsToDo.activity.${i}.title`} selectedId={selectedId} onSelect={onSelect} className="block w-full text-left text-xs font-bold">
                {bag[`thingsToDo.activity.${i}.title`]}
              </TextButton>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 px-4 py-10">
        <TextButton id="location.titlePart1" selectedId={selectedId} onSelect={onSelect} className="block w-full text-center text-xl font-black text-gray-900 mb-2">
          {bag['location.titlePart1']} {bag['location.titlePart2']}
        </TextButton>
        <TextButton id="location.description" selectedId={selectedId} onSelect={onSelect} className="block w-full text-center text-sm text-gray-600">
          {bag['location.description']}
        </TextButton>
      </div>

      <div className="bg-[#F5EFE7] px-4 py-8 text-center">
        <div className="mx-auto w-28">
          <PhotoButton id="brand.logo" src={img('brand.logo')} selectedId={selectedId} onSelect={onSelect} className="aspect-square rounded-xl bg-white" label="Logo" />
        </div>
      </div>

      <Tip />
    </div>
  );
}
