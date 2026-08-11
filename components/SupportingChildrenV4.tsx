'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import en from '@/lib/translations/en.json';
import { useSiteCopy } from '@/hooks/useSiteCopy';

const SupportingChildrenV4: React.FC = memo(() => {
  const { t } = useLanguage();
  const community = t.community ?? en.community;
  const { copy, img } = useSiteCopy();
  const impactItems = [0, 1, 2].map((i) =>
    copy(`community.impact.${i}`, community.impactItems?.[i] || '')
  );

  return (
    <section className="overflow-hidden py-0">
      <div className="grid min-h-[600px] grid-cols-1 lg:grid-cols-2">
        <div className="relative h-[400px] lg:h-auto">
          <Image
            src={img('community.hero.image')}
            alt="Taghazout cooking class supports village animals — dog, cats, and chickens cared for in Tamsoult Berber village Morocco"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10">
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '35+', label: community.statAnimals },
                { value: '100%', label: community.tipsDonated },
                { value: '1·4·30', label: community.statMix },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/95 p-4 text-center">
                  <div className="font-display text-2xl text-ink lg:text-3xl">{stat.value}</div>
                  <p className="mt-1 text-[11px] text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-ink p-10 lg:p-16">
          <div className="max-w-lg">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-sand">
              {copy('community.badge', community.badge)}
            </p>

            <h2 className="mb-6 font-display text-3xl font-normal leading-tight text-white lg:text-5xl">
              {copy('community.title', community.title)}
            </h2>

            <p className="mb-8 text-base leading-relaxed text-white/65 lg:text-lg">
              {copy('community.description', community.description)}
            </p>

            <ul className="mb-8 space-y-3">
              {impactItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#village-cats"
                className="inline-flex items-center justify-center border border-white/25 px-5 py-3 text-sm font-medium text-white transition hover:border-white/50"
              >
                {copy('community.meetCats', community.meetCats)}
              </a>
              <a
                href="#village-chickens"
                className="inline-flex items-center justify-center border border-white/25 px-5 py-3 text-sm font-medium text-white transition hover:border-white/50"
              >
                {copy('community.meetChickens', community.meetChickens)}
              </a>
            </div>

            <Link
              href="/book"
              className="btn-primary"
            >
              {copy('community.bookGiveBack', community.bookGiveBack)}
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-paper py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                id: 'village-cats',
                // Always use the local cats photo — CMS once pointed this at the wrong upload
                image: '/community/cat.webp',
                alt: community.cats.imageAlt,
                badge: copy('community.cats.badge', community.cats.badge),
                title: copy('community.cats.title', community.cats.title),
                description: copy('community.cats.description', community.cats.description),
              },
              {
                id: 'village-chickens',
                image: img('community.chickens.image'),
                alt: community.chickens.imageAlt,
                badge: copy('community.chickens.badge', community.chickens.badge),
                title: copy('community.chickens.title', community.chickens.title),
                description: copy('community.chickens.description', community.chickens.description),
              },
            ].map((card) => (
              <article key={card.id} id={card.id} className="scroll-mt-28 overflow-hidden bg-surface">
                <div className="relative w-full bg-line">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={1200}
                    height={900}
                    className="h-auto w-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    quality={70}
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-clay">{card.badge}</p>
                  <h3 className="mb-3 font-display text-2xl text-ink">{card.title}</h3>
                  <p className="leading-relaxed text-muted">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-ink py-12 lg:py-14">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
          <blockquote className="font-display text-xl italic leading-relaxed text-white sm:text-2xl">
            {copy('community.quote', community.quote)}
          </blockquote>
          <cite className="mt-5 block text-sm not-italic text-sand">— Rabab</cite>
        </div>
      </div>
    </section>
  );
});

SupportingChildrenV4.displayName = 'SupportingChildrenV4';

export default SupportingChildrenV4;
