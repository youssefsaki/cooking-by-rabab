'use client';

import React, { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiClock, FiUsers, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import InternalLinkRow from '@/components/InternalLinkRow';
import { DEFAULT_PACKAGES } from '@/lib/content-defaults';
import type { PackageCmsItem } from '@/lib/types/cms';

type PackagesV3Props = {
  initialItems?: PackageCmsItem[];
};

const PackagesV3: React.FC<PackagesV3Props> = memo(({ initialItems }) => {
  const { t, language } = useLanguage();
  const [items, setItems] = useState<PackageCmsItem[]>(initialItems || DEFAULT_PACKAGES.items);
  const [sectionCopy, setSectionCopy] = useState({ badge: '', title: '', description: '' });

  useEffect(() => {
    let cancelled = false;
    const locale = language.toLowerCase();
    fetch(`/api/content?section=packages&locale=${locale}`)
      .then((r) => r.json())
      .then((payload) => {
        if (cancelled || !payload.ok || !payload.data) return;
        if (payload.data.items?.length) setItems(payload.data.items);
        setSectionCopy({
          badge: payload.data.badge || '',
          title: payload.data.title || '',
          description: payload.data.description || '',
        });
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => {
      cancelled = true;
    };
  }, [language]);

  const badge = sectionCopy.badge || t.packages.badge;
  const title = sectionCopy.title || t.packages.title;
  const description = sectionCopy.description || t.packages.description;

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-[#F5EFE7] overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-xl mb-4 border border-amber-100">
            <span className="text-lg">🍽️</span>
            <span className="text-xs font-bold text-amber-900 tracking-wider uppercase">
              {badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
            {title.split(' ')[0]}{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              {title.split(' ').slice(1).join(' ')}
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
          <InternalLinkRow
            variant="packages"
            className="text-gray-600 max-w-3xl mx-auto mt-4 [&_a]:text-amber-700 [&_a:hover]:text-amber-800"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-5 lg:gap-6 max-w-6xl mx-auto">
          {items.map((pkg) => (
            <div
              key={pkg.id}
              className="group relative h-[550px] sm:h-[600px] lg:h-[580px] w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(50%-0.75rem)] rounded-3xl overflow-hidden cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-300 will-change-transform"
            >
              {pkg.popular && (
                <div className="absolute top-4 right-4 z-30 pointer-events-none">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-xl">
                    ⭐ {t.packages.mostPopular}
                  </div>
                </div>
              )}

              <div className="absolute inset-0 will-change-transform">
                <Image
                  src={pkg.image}
                  alt={pkg.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                  quality={75}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-300 ease-out group-hover:from-black/90 group-hover:via-black/70 group-hover:to-black/50" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 transition-all duration-300 ease-out group-hover:opacity-0 group-hover:translate-y-2 will-change-transform">
                <div className="space-y-2 mb-3">
                  <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                    <span className="text-white text-xs font-semibold">
                      {pkg.duration} • {pkg.groupSize}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                  {pkg.name}
                </h3>
                <p className="text-base sm:text-lg text-white/95 font-light leading-relaxed drop-shadow-md">
                  {pkg.subtitle}
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg">
                    {pkg.price}
                  </span>
                  <span className="text-lg text-white/90 font-semibold">{pkg.currency}</span>
                  <span className="text-xs text-white/80">per person</span>
                </div>
              </div>

              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 will-change-transform">
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight drop-shadow-lg">
                      {pkg.name}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed drop-shadow-md mb-4">
                      {pkg.subtitle}
                    </p>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl sm:text-4xl font-black text-white">{pkg.price}</span>
                      <span className="text-lg text-white/90 font-semibold">{pkg.currency}</span>
                      <span className="text-sm text-white/80">per person</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
                      <FiClock className="w-3.5 h-3.5 text-amber-300" />
                      <span className="text-white text-xs sm:text-sm font-medium">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
                      <FiUsers className="w-3.5 h-3.5 text-amber-300" />
                      <span className="text-white text-xs sm:text-sm font-medium">{pkg.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
                      <FiMapPin className="w-3.5 h-3.5 text-amber-300" />
                      <span className="text-white text-xs sm:text-sm font-medium">
                        {pkg.id === 'private' ? 'Your Location' : 'Amazigh Village'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {pkg.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2.5 text-white/95">
                        <span className="text-amber-300 text-sm flex-shrink-0">✦</span>
                        <span className="text-xs sm:text-sm leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-4">
                  <Link
                    href={`/packages#${pkg.id}`}
                    className="flex-1 inline-flex items-center justify-center border-2 border-white text-white font-bold px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-full hover:bg-white hover:text-black transition-all duration-200 text-xs sm:text-sm md:text-base"
                  >
                    {t.packages.viewDetails}
                  </Link>
                  <Link
                    href={`/book?package=${pkg.id}`}
                    className="flex-1 inline-flex items-center justify-center bg-white text-black font-bold px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-full hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all duration-200 shadow-xl text-xs sm:text-sm md:text-base"
                  >
                    {t.packages.bookNow}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

PackagesV3.displayName = 'PackagesV3';

export default PackagesV3;
