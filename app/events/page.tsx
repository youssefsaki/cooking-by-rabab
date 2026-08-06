'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiClock, FiUsers, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

export default function EventsPage() {
  const { t } = useLanguage();

  const expectItems = [
    { emoji: '🎭', ...t.events.ahwach },
    { emoji: '🔥', ...t.events.bbq },
    { emoji: '🎶', ...t.events.musicians },
    { emoji: '🍵', ...t.events.teaRefreshments },
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Hero — full-bleed image, single composition */}
      <section className="relative min-h-[100svh] flex items-end sm:items-center overflow-hidden">
        <Image
          src="/packages/weekly.webp"
          alt="Weekly Amazigh music and BBQ event in a traditional Berber village near Taghazout"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#C75D3A]/45 via-transparent to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-14 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.28em] uppercase text-amber-200 mb-4 sm:mb-5">
              {t.events.badge}
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[0.95] tracking-tight mb-5 sm:mb-6">
              {t.events.title1}{' '}
              <span className="italic font-light text-amber-100">{t.events.title2}</span>
              <br />
              {t.events.title3}
            </h1>

            <div className="h-[2px] w-14 bg-[#C75D3A] mb-5 sm:mb-6" aria-hidden="true" />

            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-6 sm:mb-8 max-w-xl">
              {t.events.description}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-3.5 py-2 text-sm font-semibold text-white">
                <FiCalendar className="w-4 h-4 text-amber-200 shrink-0" />
                {t.events.everySaturday}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-3.5 py-2 text-sm font-semibold text-white">
                <FiClock className="w-4 h-4 text-amber-200 shrink-0" />
                {t.events.time}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-3.5 py-2 text-sm font-semibold text-white">
                <FiUsers className="w-4 h-4 text-amber-200 shrink-0" />
                {t.events.groupSize}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-3.5 py-2 text-sm font-semibold text-white">
                <FiMapPin className="w-4 h-4 text-amber-200 shrink-0" />
                {t.events.atlasLocation}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {t.events.price}
              </p>
              <Link
                href="/book?package=weekly-event"
                className="inline-flex items-center justify-center gap-2.5 bg-[#C75D3A] hover:bg-[#a84d2f] text-white font-bold px-7 py-3.5 rounded-full transition-colors shadow-lg shadow-black/20 self-start"
              >
                {t.events.bookNow}
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Included — clean list, not a pill pile */}
      <section className="py-14 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16">
            <div className="lg:max-w-xs shrink-0">
              <p className="text-[#C75D3A] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                Weekly Event
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#2D2A26] leading-tight">
                {t.events.seoSubtitle}
              </h2>
            </div>

            <ul className="flex-1 grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {t.events.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#2D2A26]">
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full bg-[#C75D3A] shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-base sm:text-lg font-medium leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-14 sm:py-20 bg-white border-y border-orange-100/80">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2D2A26] mb-4">
              {t.events.whatToExpect}
            </h2>
            <div className="mx-auto h-[2px] w-14 bg-[#C75D3A]" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {expectItems.map((item) => (
              <article key={item.title} className="group">
                <div className="mb-3 text-3xl" aria-hidden="true">
                  {item.emoji}
                </div>
                <h3 className="text-xl font-bold text-[#2D2A26] mb-2">{item.title}</h3>
                <p className="text-[#6B6560] leading-relaxed text-[0.95rem] sm:text-base">
                  {item.description}
                </p>
                <div className="mt-4 h-px w-full bg-orange-100 group-hover:bg-[#C75D3A]/40 transition-colors" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C75D3A] via-orange-500 to-amber-600" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            {t.events.ctaTitle}{' '}
            <span className="italic font-light">{t.events.ctaTitleHighlight}</span>
          </h2>
          <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed max-w-xl mx-auto">
            {t.events.ctaDescription}
          </p>
          <Link
            href="/book?package=weekly-event"
            className="inline-flex items-center justify-center gap-3 bg-white text-[#C75D3A] font-bold px-10 py-4 rounded-full hover:bg-amber-50 transition-colors shadow-xl text-base"
          >
            <span>{t.events.bookNow}</span>
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
