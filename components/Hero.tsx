'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroProps } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import InternalLinkRow from '@/components/InternalLinkRow';

const Hero: React.FC<HeroProps> = ({ heroData, initialCms = null }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const heroImageAlt = heroData.backgroundImage.alt;
  const [cms, setCms] = useState(initialCms);
  const locale = language.toLowerCase();

  useEffect(() => {
    // English is already server-rendered via initialCms — skip refetch flash
    if (locale === 'en' && initialCms?.description) {
      setCms(initialCms);
      return;
    }

    let cancelled = false;
    fetch(`/api/content?section=hero&locale=${locale}`)
      .then((r) => r.json())
      .then((payload) => {
        if (!cancelled && payload.ok && payload.data) setCms(payload.data);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [locale, initialCms]);

  const badge = cms?.badge || t.hero.badge;
  const title = cms?.title || t.hero.title;
  const titleHighlight = cms?.titleHighlight || t.hero.titleHighlight;
  const description = cms?.description || t.hero.description || '';
  const bookButton = cms?.bookButton || t.hero.bookButton;
  const bgDesktop = cms?.bgDesktop || '/hero/desktop/bg.webp';
  const bgMobile = cms?.bgMobile || '/hero/mobile/bg.webp';

  useEffect(() => {
    let active = true;
    const setVH = () => {
      if (!active) return;
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      if (containerRef.current) {
        containerRef.current.style.height = `${window.innerHeight}px`;
      }
    };
    setVH();
    const onOrient = () => setTimeout(setVH, 150);
    window.addEventListener('orientationchange', onOrient, { passive: true });
    return () => {
      active = false;
      window.removeEventListener('orientationchange', onOrient);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-fullscreen relative w-full overflow-hidden"
      style={{
        height: 'calc(var(--vh, 1vh) * 100)',
        minHeight: 'calc(var(--vh, 1vh) * 100)',
      }}
    >
      <Image
        src={bgDesktop}
        alt={heroImageAlt}
        fill
        priority
        quality={80}
        sizes="(max-width: 767px) 0px, 100vw"
        className="hidden object-cover object-center md:block"
      />
      <Image
        src={bgMobile}
        alt={heroImageAlt}
        fill
        priority
        quality={70}
        sizes="(max-width: 767px) 100vw, 0px"
        className="block object-cover object-center md:hidden"
      />

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/35 to-black/65" />

      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-5 pb-16 pt-28 text-center sm:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.24em] text-primary-light sm:mb-6">
            {badge}
          </p>

          <h1 className="mb-5 text-white sm:mb-6">
            <span className="font-display block text-[2.4rem] font-normal leading-[1.06] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.15rem]">
              {title}
            </span>
            <span className="mt-4 block font-sans text-sm font-medium uppercase tracking-[0.14em] text-white/85 sm:mt-5 sm:text-base md:text-lg">
              {titleHighlight}
            </span>
          </h1>

          <div className="mx-auto mb-7 h-px w-12 bg-primary sm:mb-8" />

          <p className="mx-auto mb-10 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
            {description}
          </p>

          {/* SEO-only links: inline clip so they never flash before CSS loads */}
          <div
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              borderWidth: 0,
            }}
          >
            <InternalLinkRow variant="hero" />
          </div>

          <Link
            href="/book"
            className="btn-primary px-9 py-4 text-[13px] sm:text-sm"
            style={{ touchAction: 'manipulation' }}
          >
            {bookButton}
          </Link>
        </div>
      </div>

      {heroData.scrollIndicator.enabled && (
        <div className="absolute bottom-7 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="h-8 w-px bg-gradient-to-b from-primary/80 to-transparent" />
        </div>
      )}
    </div>
  );
};

export default Hero;
