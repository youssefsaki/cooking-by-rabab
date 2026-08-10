'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import en from '@/lib/translations/en.json';

const HeroIntroSection: React.FC = memo(() => {
  const { t } = useLanguage();
  const intro = t.heroIntro ?? en.heroIntro;

  return (
    <section
      id="welcome"
      className="relative py-12 sm:py-16 lg:py-24 overflow-hidden bg-[#F7F2EA]"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 50% at 0% 0%, rgba(245,158,11,0.12), transparent 55%), radial-gradient(ellipse 50% 45% at 100% 100%, rgba(120,53,15,0.06), transparent 50%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Intro copy — desktop only */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[1px] bg-amber-600" />
              <span className="text-amber-800 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
                {intro.badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-light text-[#1a1410] leading-tight mb-5">
              {intro.title}
            </h2>

            <p className="text-base sm:text-lg text-[#3d342c]/90 leading-relaxed mb-8 [&_a]:text-amber-800 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-amber-600/40 [&_a:hover]:text-amber-950">
              {intro.descriptionSegments.map((segment, index) =>
                segment.type === 'link' && segment.href ? (
                  <Link key={index} href={segment.href}>
                    {segment.value}
                  </Link>
                ) : (
                  <React.Fragment key={index}>{segment.value}</React.Fragment>
                )
              )}
            </p>

            <Link
              href="/book"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] rounded-lg"
            >
              {intro.cta}
            </Link>
          </div>

          {/* What's included */}
          <div className="lg:col-span-7">
            <div className="relative border-l-2 border-amber-600/40 pl-5 sm:pl-8">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-amber-900 mb-5 sm:mb-7">
                {intro.includedTitle}
              </h3>

              <ul className="space-y-5 sm:space-y-7">
                {intro.included.map((item) => (
                  <li key={item.title} className="relative">
                    <span
                      className="absolute -left-[1.65rem] sm:-left-[2.4rem] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-600 ring-4 ring-[#F7F2EA]"
                      aria-hidden="true"
                    />
                    <p className="text-[15px] sm:text-lg text-[#1a1410] leading-snug">
                      <span className="font-semibold block sm:inline">{item.title}</span>
                      <span className="text-[#3d342c]/85 sm:ml-1">{item.description}</span>
                    </p>
                  </li>
                ))}
              </ul>

              {/* Mobile CTA — intro column is hidden below lg */}
              <div className="mt-8 lg:hidden">
                <Link
                  href="/book"
                  className="inline-flex w-full sm:w-auto items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-3.5 text-sm font-bold uppercase tracking-widest rounded-lg"
                >
                  {intro.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroIntroSection.displayName = 'HeroIntroSection';

export default HeroIntroSection;
