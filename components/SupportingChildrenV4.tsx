'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import en from '@/lib/translations/en.json';
import { useSiteCopy } from '@/hooks/useSiteCopy';

/**
 * SUPPORTING VILLAGE ANIMALS SECTION
 * Split-screen editorial with animal care details
 */

const SupportingChildrenV4: React.FC = memo(() => {
  const { t } = useLanguage();
  const community = t.community ?? en.community;
  const { copy, img } = useSiteCopy();
  const impactItems = [0, 1, 2].map((i) =>
    copy(`community.impact.${i}`, community.impactItems?.[i] || '')
  );

  return (
    <section className="py-0 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
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
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl lg:text-3xl font-black text-amber-600">35+</div>
                <p className="text-xs text-gray-600">{community.statAnimals}</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl lg:text-3xl font-black text-amber-600">100%</div>
                <p className="text-xs text-gray-600">{community.tipsDonated}</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                <div className="text-lg lg:text-xl font-black text-amber-600 leading-tight">1·4·30</div>
                <p className="text-xs text-gray-600">{community.statMix}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-10 lg:p-16 flex flex-col justify-center">
          <div className="max-w-lg">
            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-white text-sm font-bold uppercase tracking-wider mb-6">
              ❤️ {copy('community.badge', community.badge)}
            </span>

            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              {copy('community.title', community.title)}
            </h2>

            <p className="text-white/90 text-lg leading-relaxed mb-8">
              {copy('community.description', community.description)}
            </p>

            <div className="space-y-3 mb-8">
              {impactItems.map((item) => (
                <div key={item} className="flex items-start gap-3 text-white">
                  <span className="text-white/80 mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href="#village-cats"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/15 border border-white/30 text-white font-bold rounded-xl hover:bg-white/25 transition-colors"
              >
                {copy('community.meetCats', community.meetCats)}
              </a>
              <a
                href="#village-chickens"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/15 border border-white/30 text-white font-bold rounded-xl hover:bg-white/25 transition-colors"
              >
                {copy('community.meetChickens', community.meetChickens)}
              </a>
            </div>

            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-amber-600 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <FiHeart className="w-5 h-5" />
              <span>{copy('community.bookGiveBack', community.bookGiveBack)}</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Animal spotlight cards */}
      <div className="bg-[#F7F2EA] py-14 lg:py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <article
              id="village-cats"
              className="scroll-mt-28 overflow-hidden rounded-3xl bg-white shadow-lg border border-amber-100"
            >
              <div className="relative h-56 sm:h-64">
                <Image
                  src={img('community.cats.image')}
                  alt={community.cats.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 mb-2">
                  {copy('community.cats.badge', community.cats.badge)}
                </p>
                <h3 className="text-2xl font-black text-gray-900 mb-3">{copy('community.cats.title', community.cats.title)}</h3>
                <p className="text-gray-600 leading-relaxed">{copy('community.cats.description', community.cats.description)}</p>
              </div>
            </article>

            <article
              id="village-chickens"
              className="scroll-mt-28 overflow-hidden rounded-3xl bg-white shadow-lg border border-amber-100"
            >
              <div className="relative h-56 sm:h-64">
                <Image
                  src={img('community.chickens.image')}
                  alt={community.chickens.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 mb-2">
                  {copy('community.chickens.badge', community.chickens.badge)}
                </p>
                <h3 className="text-2xl font-black text-gray-900 mb-3">{copy('community.chickens.title', community.chickens.title)}</h3>
                <p className="text-gray-600 leading-relaxed">{copy('community.chickens.description', community.chickens.description)}</p>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 py-10 lg:py-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <div className="text-4xl text-amber-500 font-serif mb-4">&ldquo;</div>
          <blockquote className="text-xl lg:text-2xl text-white font-medium italic mb-4 leading-relaxed">
            {copy('community.quote', community.quote)}
          </blockquote>
          <cite className="text-amber-400 font-bold not-italic">— Rabab</cite>
        </div>
      </div>
    </section>
  );
});

SupportingChildrenV4.displayName = 'SupportingChildrenV4';

export default SupportingChildrenV4;
