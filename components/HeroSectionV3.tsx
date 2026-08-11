'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroSectionData } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import InternalLinkRow from '@/components/InternalLinkRow';
import { useSiteCopy } from '@/hooks/useSiteCopy';

interface HeroSectionProps {
  data: HeroSectionData;
  mobileVariant?: 'A' | 'B' | 'C'; // Three mobile design options
}

/**
 * Design 3: Minimalist Modern Split
 * - Clean white aesthetic with terracotta accent
 * - Bold oversized typography
 * - Horizontal image marquee
 * - Elegant spacing and whitespace
 * - Refined, premium feel
 * 
 * Mobile Variants:
 * A = Card stack with vertical scroll
 * B = Full-bleed hero image with overlay text
 * C = Minimal text-first with bottom image strip
 */
const HeroSectionV3: React.FC<HeroSectionProps> = ({ data, mobileVariant = 'A' }) => {
  const { t } = useLanguage();
  const { copy, img } = useSiteCopy();
  const [activeImage, setActiveImage] = useState(0);
  
  const experiences = [
    copy('heroSection.include.0', t.experiences.bread.title),
    copy('heroSection.include.1', t.experiences.tajine.title),
    copy('heroSection.include.2', t.experiences.amlou.title),
    copy('heroSection.include.3', t.experiences.tea.title),
  ];

  const imageAlts = [
    'Moroccan cooking class Taghazout — hands-on Amazigh cooking in Berber village kitchen',
    'Traditional Moroccan cuisine Taghazout — authentic Berber dishes prepared in Atlas Mountains',
    'Amazigh cooking experience Taghazout — traditional village cooking class near Agadir coast',
    'Moroccan cooking masterclass Taghazout — traditional dishes cooked in Berber village kitchen',
    'Clay oven bread making Taghazout — wood-fired Berber bread baking in Atlas Mountains',
    'Moroccan mint tea ceremony Taghazout — traditional Amazigh hospitality after cooking class',
    'Taghazout cooking class feast — shared Amazigh meal after hands-on Berber cooking experience',
  ] as const;

  const desktopImages = imageAlts.map((alt, i) => ({
    src: img(`heroSection.image.${i}`),
    alt,
  }));

  const mobileImages = imageAlts.map((alt, i) => ({
    src: img(`heroSection.mobile.${i}`),
    alt,
  }));

  const allImages = desktopImages; // desktop gallery (DesktopVersion)
  const mobileGallery = mobileImages;

  // ============================================
  // MOBILE VARIANT A: Card Stack Design
  // ============================================
  const MobileVariantA = () => (
    <div className="lg:hidden">
      {/* Hero Header */}
      <div className="px-5 pt-8 pb-6 text-center">
        {/* Rating Badge */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-6 h-6   bg-[#ed843e] flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
          <span className="text-[#ed843e] text-xs font-medium">5.0 • 500+ {t.heroSection.rating}</span>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold text-ink leading-tight mb-3">
          {copy('heroSection.learnToCookPart1', t.heroSection.learnToCookPart1)}<br />
          <span className="text-[#ed843e]">{copy('heroSection.learnToCookPart2', t.heroSection.learnToCookPart2)}</span>
        </h2>

        {/* Description */}
        <p className="text-muted text-sm leading-relaxed mb-5 max-w-xs mx-auto">
          {copy('heroSection.description', t.heroSection.description)}
        </p>

        {/* CTA */}
        <Link
          href={data.cta.link}
          className="inline-flex items-center justify-center gap-2 bg-[#ed843e] text-white font-medium tracking-[0.02em] py-3.5 px-8   text-sm"
        >
          {copy('heroSection.bookClass', t.heroSection.bookClass)}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Main Image Card */}
      <div className="px-5 mb-4">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src={mobileGallery[activeImage].src}
            alt={mobileGallery[activeImage].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-white/70 text-xs uppercase tracking-wider mb-2">{copy('heroSection.experienceIncludes', t.heroSection.experienceIncludes)}</p>
            <div className="flex flex-wrap gap-2">
              {experiences.slice(0, 3).map((item, i) => (
                <span key={i} className="px-3 py-1.5 bg-black/40 text-xs text-white font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="px-5 pb-6">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
          {mobileGallery.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`relative flex-shrink-0 w-16 h-16 overflow-visible rounded-xl transition-all ${
                activeImage === index 
                  ? 'ring-2 ring-[#ed843e] ring-offset-2' 
                  : 'opacity-50'
              }`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover rounded-xl" sizes="64px" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 border-t border-line">
        {[
          { number: '4h', label: t.heroSection.duration },
          { number: '2 - 13', label: t.heroSection.group },
          { number: '4+', label: t.heroSection.dishes },
          { number: '100%', label: t.heroSection.handsOn },
        ].map((stat, i) => (
          <div key={i} className="py-4 text-center border-r last:border-r-0 border-line">
            <div className="text-lg font-bold text-[#ed843e]">{stat.number}</div>
            <div className="text-muted text-[10px] uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================
  // MOBILE VARIANT B: Full-Bleed Hero Image
  // ============================================
  const MobileVariantB = () => (
    <div className="lg:hidden relative">
      {/* Full-bleed background image */}
      <div className="relative min-h-[85vh]">
        <Image
          src={mobileGallery[activeImage].src}
          alt={mobileGallery[activeImage].alt}
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 pb-8">
          {/* Rating */}
          <div className="inline-flex items-center gap-2 mb-4 self-start">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-4 h-4 text-[#ed843e]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white/80 text-xs">{t.heroSection.reviews}</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-4">
            {copy('heroSection.learnToCookPart1', t.heroSection.learnToCookPart1)}<br />
            <span className="text-[#ed843e]">{copy('heroSection.learnToCookPart2', t.heroSection.learnToCookPart2)}</span>
          </h2>

          {/* Experience tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {experiences.map((item, i) => (
              <span key={i} className="px-3 py-1.5 bg-black/45 text-xs text-white/90 font-medium border border-white/20">
                {item}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href={data.cta.link}
            className="w-full bg-[#ed843e] text-white font-medium tracking-[0.02em] py-4   text-center text-sm flex items-center justify-center gap-2"
          >
            {copy('heroSection.bookClass', t.heroSection.bookClass)}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Stats row */}
          <div className="flex justify-between mt-6 pt-4 border-t border-white/20">
            {[
              { number: '4h', label: t.heroSection.duration },
              { number: '2 - 13', label: t.heroSection.group },
              { number: '4+', label: t.heroSection.dishes },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-bold text-white">{stat.number}</div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Image selector dots */}
        <div className="absolute top-6 left-0 right-0 flex justify-center gap-2">
          {mobileGallery.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-2 h-2   transition-all ${
                activeImage === index ? 'bg-white w-6' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // MOBILE VARIANT C: Text-First Minimal
  // ============================================
  const MobileVariantC = () => (
    <div className="lg:hidden bg-paper">
      {/* Text Section */}
      <div className="px-6 pt-10 pb-8">
        {/* Tagline */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-[2px] bg-[#ed843e]" />
          <span className="text-[#ed843e] text-xs font-semibold uppercase tracking-[0.2em]">
            {t.heroSection.amazighExperience}
          </span>
        </div>

        {/* Title - Extra large */}
        <h2 className="text-5xl font-bold text-ink leading-[0.95] mb-6">
          {t.heroSection.cookLikeLocal}<br />
          {t.heroSection.likeA}<br />
          <span className="text-[#ed843e] italic font-light">{t.heroSection.local}</span>
        </h2>

        {/* Description */}
        <p className="text-muted text-base leading-relaxed mb-8">
          {copy('heroSection.description', t.heroSection.description)}
        </p>

        {/* Inline Stats */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-line">
          <div>
            <span className="text-2xl font-bold text-[#ed843e]">4h</span>
            <span className="text-muted text-sm ml-1">{t.heroSection.class}</span>
          </div>
          <div className="w-[1px] h-8 bg-[#E5E0DA]" />
          <div>
            <span className="text-2xl font-bold text-[#ed843e]">4+</span>
            <span className="text-muted text-sm ml-1">{t.heroSection.dishesLowercase}</span>
          </div>
          <div className="w-[1px] h-8 bg-[#E5E0DA]" />
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5 text-[#ed843e]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-lg font-bold text-ink">5.0</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={data.cta.link}
          className="flex items-center justify-between w-full bg-ink text-white py-4 px-6   group"
        >
          <span className="font-medium tracking-[0.02em] text-sm">{copy('heroSection.bookClass', t.heroSection.bookClass)}</span>
          <span className="w-10 h-10   bg-[#ed843e] flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
      </div>

      {/* Image Carousel */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative aspect-square mx-6 rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={mobileGallery[activeImage].src}
            alt={mobileGallery[activeImage].alt}
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
        </div>

        {/* Experience Pills - Floating */}
        <div className="absolute -bottom-4 left-6 right-6 flex justify-center">
          <div className="inline-flex gap-2 bg-white shadow-lg   px-4 py-2">
            {experiences.slice(0, 2).map((item, i) => (
              <span key={i} className="text-[10px] text-muted uppercase tracking-wider font-medium">
                {item}{i === 0 && <span className="mx-2 text-[#E5E0DA]">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail dots */}
      <div className="flex justify-center gap-2 pt-10 pb-8">
        {mobileGallery.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`h-1.5   transition-all duration-300 ${
              activeImage === index 
                ? 'w-8 bg-[#ed843e]' 
                : 'w-1.5 bg-[#E5E0DA]'
            }`}
          />
        ))}
      </div>
    </div>
  );

  // ============================================
  // DESKTOP VERSION (unchanged)
  // ============================================
  const descriptionFull = t.heroSection.description;
  const descriptionSplitAt = descriptionFull.indexOf('. ');
  const descriptionLead =
    descriptionSplitAt > 0 ? descriptionFull.slice(0, descriptionSplitAt + 1) : descriptionFull;
  const descriptionBody =
    descriptionSplitAt > 0 ? descriptionFull.slice(descriptionSplitAt + 2) : '';

  const DesktopVersion = () => (
    <div className="hidden lg:block">
      <div className="relative pb-12 pt-20 lg:pb-16 lg:pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-16 flex flex-col gap-12 lg:mb-20 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="lg:max-w-2xl lg:flex-1">
              <p className="section-eyebrow">
                {copy('heroSection.ratedBy', t.heroSection.ratedBy)} {t.heroSection.rating}
              </p>
              <h2 className="font-display text-5xl font-normal leading-[1.05] tracking-tight text-ink lg:text-6xl xl:text-7xl">
                {copy('heroSection.learnToCookPart1', t.heroSection.learnToCookPart1)}
                <br />
                <span className="text-clay">
                  {copy('heroSection.learnToCookPart2', t.heroSection.learnToCookPart2)}
                </span>
              </h2>
            </div>

            <div className="flex flex-col lg:w-[22rem] lg:shrink-0">
              <p className="mb-4 text-lg font-medium leading-snug text-ink">{descriptionLead}</p>
              {descriptionBody && (
                <p className="mb-6 text-sm leading-relaxed text-muted">{descriptionBody}</p>
              )}

              <InternalLinkRow
                variant="hero"
                layout="stack"
                className="mb-8 text-muted [&_a]:text-clay [&_a:hover]:text-clay-deep"
              />

              <Link href={data.cta.link} className="btn-primary self-start">
                {copy('heroSection.bookClass', t.heroSection.bookClass)}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="mx-auto mb-6 max-w-7xl px-6 lg:px-12">
          <div className="relative aspect-[16/9] overflow-hidden lg:aspect-[21/9]">
            <Image
              src={allImages[activeImage].src}
              alt={allImages[activeImage].alt}
              fill
              className="object-cover transition-all duration-700"
              sizes="100vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
              <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
                <div className="text-white">
                  <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-white/60">
                    {copy('heroSection.experienceIncludes', t.heroSection.experienceIncludes)}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {experiences.map((item, i) => (
                      <span key={i} className="text-sm text-white/90">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/book"
                  className="inline-flex items-center bg-white px-7 py-3.5 text-sm font-medium tracking-[0.02em] text-ink transition hover:bg-paper"
                >
                  {copy('heroSection.bookNow', t.heroSection.bookNow)}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-12">
          <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide sm:gap-4">
            {allImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative h-20 w-28 flex-shrink-0 overflow-hidden transition sm:h-24 sm:w-32 lg:h-28 lg:w-40 ${
                  activeImage === index ? 'opacity-100 ring-1 ring-ink' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 160px"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 divide-x divide-line lg:grid-cols-4">
            {[
              { number: '4h', label: t.heroSection.duration },
              { number: '2 - 13', label: t.heroSection.group },
              { number: '4+', label: t.heroSection.dishes },
              { number: '100%', label: t.heroSection.handsOn },
            ].map((stat, i) => (
              <div key={i} className="px-4 py-8 text-center lg:px-8 lg:py-10 lg:text-left">
                <div className="mb-1 font-display text-3xl text-ink lg:text-4xl">{stat.number}</div>
                <div className="text-xs uppercase tracking-[0.14em] text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-paper">
      <DesktopVersion />
      {mobileVariant === 'A' && <MobileVariantA />}
      {mobileVariant === 'B' && <MobileVariantB />}
      {mobileVariant === 'C' && <MobileVariantC />}
    </section>
  );
};

export default HeroSectionV3;
