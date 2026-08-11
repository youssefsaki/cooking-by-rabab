'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import en from '@/lib/translations/en.json';
import { useSiteCopy } from '@/hooks/useSiteCopy';

const HeroIntroSection: React.FC = memo(() => {
  const { t } = useLanguage();
  const { copy } = useSiteCopy();
  const intro = t.heroIntro ?? en.heroIntro;
  const cmsDescription = copy('heroIntro.description');

  const included = [0, 1, 2, 3].map((i) => ({
    title: copy(`heroIntro.included.${i}.title`, intro.included[i]?.title || ''),
    description: copy(`heroIntro.included.${i}.description`, intro.included[i]?.description || ''),
  }));

  return (
    <section id="welcome" className="relative bg-paper py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5" data-fade>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-primary" />
              <span className="section-eyebrow mb-0">
                {copy('heroIntro.badge', intro.badge)}
              </span>
            </div>

            <h2 className="section-title mb-6">{copy('heroIntro.title', intro.title)}</h2>

            <p className="mb-9 text-base leading-relaxed text-muted sm:text-lg">
              {cmsDescription ||
                intro.descriptionSegments?.map((segment) => segment.value).join('') ||
                ''}
            </p>

            <Link href="/book" className="btn-primary">
              {copy('heroIntro.cta', intro.cta)}
            </Link>
          </div>

          <div className="lg:col-span-7" data-fade>
            <div className="border-l-2 border-primary/30 pl-6 sm:pl-10">
              <h3 className="mb-8 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                {copy('heroIntro.includedTitle', intro.includedTitle)}
              </h3>

              <ul className="space-y-7">
                {included.map((item, index) => (
                  <li key={item.title} className="relative">
                    <span className="mb-2 block font-display text-2xl text-primary/35">{String(index + 1).padStart(2, '0')}</span>
                    <p className="mb-1.5 text-lg font-medium text-ink">{item.title}</p>
                    <p className="text-sm leading-relaxed text-muted sm:text-base">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroIntroSection.displayName = 'HeroIntroSection';
export default HeroIntroSection;
