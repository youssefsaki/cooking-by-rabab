'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiClock, FiUsers, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import InternalLinkRow from '@/components/InternalLinkRow';

const packagesData = [
  {
    id: "basic",
    name: "The Authentic Mountain & Culinary Escape",
    tagline: "Your Journey into the Mountains",
    subtitle: "Escape the coast for a half-day in the Atlas Mountains. Tour a historic 300-year-old village home, grind fresh Amlou, and cook the traditional dish of your choice.",
    price: "65",
    pricePrefix: "From",
    currency: "EUR",
    priceLocal: "700 MAD",
    duration: "4 hours",
    groupSize: "3-13 guests",
    startTime: "13:30",
    image: "/packages/basic.webp",
    imageAlt: "Taghazout cooking class — half-day Berber village experience with traditional Moroccan dishes and clay oven bread in Atlas Mountains",
    popular: true,
    highlights: [
      "Pick up from Taghazout Mosque",
      "Minimum 3 guests required",
      "300-year-old Amazigh house tour",
      "Your Choice of Dish (see full menu when booking)",
      "Vegetarian & Vegan options available",
      "Make Moroccan spread (Amlou)"
    ]
  },
  {
    id: "weekly-event",
    name: "Weekly Event",
    tagline: "The Amazigh Village Music Gala",
    subtitle: "Join us for our Weekly Berber Music Event At Sunset in a traditional village",
    price: "80",
    pricePrefix: "",
    currency: "EUR",
    priceLocal: "",
    duration: "4 hours",
    groupSize: "6-13 guests",
    startTime: "15:00",
    image: "/packages/weekly.jpeg",
    imageAlt: "Weekly Amazigh music event Taghazout — Berber village sunset celebration and cooking experience Morocco",
    highlights: [
      "Every Thursday at 15:00",
      "Minimum 6 guests required",
      "Pickup from Taghazout Mosque",
      "Mint tea ceremony",
      "Make your barbecue",
      "Traditional Amazigh music & celebration"
    ]
  },
  {
    id: "private",
    name: "Private Package",
    tagline: "Exclusive Mountain Experience",
    subtitle: "Personalized culinary journey designed exclusively for your group",
    price: "100",
    pricePrefix: "",
    currency: "EUR",
    priceLocal: "",
    duration: "5 hours",
    groupSize: "Private group",
    startTime: "Flexible",
    image: "/packages/private-chef.jpg",
    imageAlt: "Private Moroccan cooking class Taghazout — exclusive Berber village culinary experience in Atlas Mountains",
    highlights: [
      "Completely private experience",
      "Flexible scheduling & timing",
      "Customizable menu options",
      "Your choice of location",
      "Personalized cooking instruction",
      "Private family-style feast"
    ]
  }
];

function PriceRow({
  pricePrefix,
  price,
  priceLocal,
}: {
  pricePrefix?: string;
  price: string;
  priceLocal?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
      {pricePrefix ? (
        <span className="text-xs sm:text-sm text-white/85 font-medium">{pricePrefix}</span>
      ) : null}
      <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg">{price}</span>
      <span className="text-sm sm:text-lg text-white/90 font-semibold">€</span>
      <span className="text-[11px] sm:text-sm text-white/80">/ person</span>
      {priceLocal ? (
        <span className="text-[11px] sm:text-sm text-white/75">· {priceLocal}</span>
      ) : null}
    </div>
  );
}

const PackagesV3: React.FC = memo(() => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  const closeActive = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    if (!activeId) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeActive();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeId, closeActive]);

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-[#F5EFE7] overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-xl mb-4 border border-amber-100">
            <span className="text-lg">🍽️</span>
            <span className="text-xs font-bold text-amber-900 tracking-wider uppercase">
              {t.packages.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
            {t.packages.title.split(' ')[0]}{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              {t.packages.title.split(' ').slice(1).join(' ')}
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t.packages.description}
          </p>
          <InternalLinkRow variant="packages" className="text-gray-600 max-w-3xl mx-auto mt-4 [&_a]:text-amber-700 [&_a:hover]:text-amber-800" />
        </div>

        <div className="flex flex-wrap justify-center gap-5 lg:gap-6 max-w-6xl mx-auto">
          {packagesData.map((pkg) => {
            const isActive = activeId === pkg.id;

            return (
              <div
                key={pkg.id}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onClick={() => {
                  // Desktop hover works via CSS; tap-toggle is for touch devices
                  if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                    return;
                  }
                  setActiveId((current) => (current === pkg.id ? null : pkg.id));
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveId((current) => (current === pkg.id ? null : pkg.id));
                  }
                }}
                className={`group relative h-[520px] sm:h-[560px] lg:h-[580px] w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(50%-0.75rem)] rounded-3xl overflow-hidden cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-300 will-change-transform outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isActive ? 'is-active ring-2 ring-amber-400/70' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 pointer-events-none">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-xl">
                      ⭐ {t.packages.mostPopular}
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 will-change-transform">
                  <Image
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    fill
                    className={`object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                      isActive ? 'scale-105' : ''
                    }`}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                    quality={75}
                  />
                </div>

                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-300 ease-out group-hover:from-black/90 group-hover:via-black/70 group-hover:to-black/50 ${
                    isActive ? 'from-black/90 via-black/70 to-black/50' : ''
                  }`}
                />

                {/* Default Content */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-5 sm:p-6 lg:p-8 transition-all duration-300 ease-out group-hover:opacity-0 group-hover:translate-y-2 will-change-transform ${
                    isActive ? 'opacity-0 translate-y-2 pointer-events-none' : ''
                  }`}
                >
                  <div className="space-y-2 mb-2 sm:mb-3">
                    <div className="inline-block px-2.5 sm:px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                      <span className="text-white text-[11px] sm:text-xs font-semibold">
                        {pkg.duration} • {pkg.groupSize}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-1.5 sm:mb-2 leading-snug drop-shadow-lg">
                    {pkg.name}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-white/95 font-light leading-relaxed drop-shadow-md line-clamp-2 sm:line-clamp-3">
                    {pkg.subtitle}
                  </p>
                  <div className="mt-2.5 sm:mt-3">
                    <PriceRow
                      pricePrefix={pkg.pricePrefix}
                      price={pkg.price}
                      priceLocal={pkg.priceLocal}
                    />
                  </div>
                  <p className="mt-3 text-[11px] sm:text-xs text-white/70 uppercase tracking-wider lg:hidden">
                    Tap for details
                  </p>
                </div>

                {/* Hover / Active Content */}
                <div
                  className={`absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 will-change-transform ${
                    isActive ? 'opacity-100' : 'pointer-events-none group-hover:pointer-events-auto'
                  }`}
                >
                  <div className="space-y-3 sm:space-y-4 overflow-y-auto min-h-0 pr-1">
                    <div>
                      <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1.5 sm:mb-2 leading-snug drop-shadow-lg">
                        {pkg.name}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-white/95 leading-relaxed drop-shadow-md mb-2 sm:mb-3 line-clamp-3 sm:line-clamp-4">
                        {pkg.subtitle}
                      </p>
                      <div className="mb-2 sm:mb-3">
                        <PriceRow
                          pricePrefix={pkg.pricePrefix}
                          price={pkg.price}
                          priceLocal={pkg.priceLocal}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
                        <FiClock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
                        <span className="text-white text-[11px] sm:text-sm font-medium">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
                        <FiUsers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
                        <span className="text-white text-[11px] sm:text-sm font-medium">{pkg.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
                        <FiMapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
                        <span className="text-white text-[11px] sm:text-sm font-medium">
                          {pkg.id === 'private' ? 'Your Location' : 'Amazigh Village'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                      {pkg.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-start gap-2 text-white/95">
                          <span className="text-amber-300 text-sm flex-shrink-0 leading-none mt-0.5">✦</span>
                          <span className="text-[11px] sm:text-sm leading-snug">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4 shrink-0">
                    <Link
                      href={`/packages#${pkg.id}`}
                      className="flex-1 inline-flex items-center justify-center border-2 border-white text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full hover:bg-white hover:text-black transition-all duration-200 text-xs sm:text-sm"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {t.packages.viewDetails}
                    </Link>
                    <Link
                      href={`/book?package=${pkg.id}`}
                      className="flex-1 inline-flex items-center justify-center bg-white text-black font-bold px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all duration-200 shadow-xl text-xs sm:text-sm"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {t.packages.bookNow}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

PackagesV3.displayName = 'PackagesV3';

export default PackagesV3;
