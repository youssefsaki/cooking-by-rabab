'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiClock, FiUsers, FiMapPin, FiCheck, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const { t } = useLanguage();

  const packagesData = [
    {
      id: "basic",
      name: t.packagesPage.basic.name,
      tagline: t.packagesPage.basic.tagline,
      subtitle: t.packagesPage.basic.subtitle,
      price: "60",
      currency: "EUR",
      duration: t.packagesPage.basic.duration,
      groupSize: t.packagesPage.basic.groupSize,
      startTime: "13:30",
      endTime: "19:30-20:00",
      pickup: "Taghazout Mosque",
      dropoff: "Taghazout or Tamraght",
      image: "/packages/basic.jpg",
      alt: "Moroccan cooking class in Atlas Mountains - Traditional tagine and bread baking experience in authentic Amazigh village near Taghazout",
      popular: true,
      itinerary: t.packagesPage.basic.itinerary,
      includes: t.packagesPage.basic.includes,
    },
    {
      id: "weekly-event",
      name: t.packagesPage.weeklyEvent.name,
      tagline: t.packagesPage.weeklyEvent.tagline,
      subtitle: t.packagesPage.weeklyEvent.subtitle,
      price: "80",
      currency: "EUR",
      duration: t.packagesPage.weeklyEvent.duration,
      groupSize: t.packagesPage.weeklyEvent.groupSize,
      startTime: "15:00",
      endTime: "TBD",
      pickup: "Taghazout Mosque",
      dropoff: "Taghazout or Tamraght",
      image: "/packages/basic.jpg",
      alt: "Weekly cooking event in Morocco - Community cooking class experience in Atlas Mountains",
      itinerary: t.packagesPage.weeklyEvent.itinerary,
      includes: t.packagesPage.weeklyEvent.includes,
    },
    {
      id: "private",
      name: t.packagesPage.private.name,
      tagline: t.packagesPage.private.tagline,
      subtitle: t.packagesPage.private.subtitle,
      price: "100",
      currency: "EUR",
      duration: t.packagesPage.private.duration,
      groupSize: t.packagesPage.private.groupSize,
      startTime: "Flexible",
      endTime: "Flexible",
      pickup: "Custom pickup available",
      dropoff: "Your accommodation",
      image: "/packages/private-chef.jpg",
      alt: "Private Moroccan cooking class with personal chef - Exclusive authentic cooking experience in traditional Atlas Mountains Amazigh home",
      itinerary: t.packagesPage.private.itinerary,
      includes: t.packagesPage.private.includes,
    }
  ];

  const displayPackage = selectedPackage ? packagesData.find(pkg => pkg.id === selectedPackage) : null;

  return (
    <main className="min-h-screen bg-[#F5EFE7]">
      {/* Packages Cards Section - Optimized for 13" */}
      <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-300/30 to-amber-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Enhanced Header */}
          <div className="text-center mb-10 lg:mb-14">
            <div className="inline-block mb-5">
              <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-2xl border-2 border-amber-100">
                <span className="text-xl">🍽️</span>
                <span className="text-xs font-black text-amber-900 tracking-wider uppercase">
                  {t.packagesPage.badge}
                </span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
              {t.packagesPage.title}{' '}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                {t.packagesPage.titleHighlight}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
              {t.packagesPage.description}
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 max-w-6xl mx-auto mb-16">
            {packagesData.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)}
                className="group relative h-[520px] sm:h-[580px] lg:h-[560px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-300 will-change-transform"
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute top-6 right-6 z-30 pointer-events-none">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl">
                      ⭐ {t.packagesPage.mostPopular}
                    </div>
                  </div>
                )}

                {/* Background Image */}
                <div className="absolute inset-0 will-change-transform">
                  <Image
                    src={pkg.image}
                    alt={pkg.alt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    quality={85}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-300 ease-out group-hover:from-black/90 group-hover:via-black/70 group-hover:to-black/50" />

                {/* Default Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 transition-all duration-300 ease-out group-hover:opacity-0 group-hover:translate-y-2 will-change-transform">
                  <div className="space-y-3 mb-4">
                    <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                      <span className="text-white text-sm font-semibold">{pkg.duration} • {pkg.groupSize}</span>
                    </div>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
                    {pkg.name}
                  </h3>
                  <p className="text-lg sm:text-xl text-white/95 font-light leading-relaxed drop-shadow-md">
                    {pkg.tagline}
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white drop-shadow-lg">{pkg.price}</span>
                    <span className="text-xl text-white/90 font-semibold">{pkg.currency}</span>
                    <span className="text-sm text-white/80">{t.packagesPage.perPerson}</span>
                  </div>
                </div>

                {/* Hover Content */}
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
                        <span className="text-sm text-white/80">{t.packagesPage.perPerson}</span>
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
                        <span className="text-white text-xs sm:text-sm font-medium">{t.packagesPage.atlasLocation}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {pkg.includes.slice(0, 4).map((item, index) => (
                        <div key={index} className="flex items-center gap-2.5 text-white/95">
                          <span className="text-amber-300 text-sm flex-shrink-0">✦</span>
                          <span className="text-xs sm:text-sm leading-snug">{item}</span>
                        </div>
                      ))}
                      {pkg.includes.length > 4 && (
                        <div className="flex items-center gap-2.5 text-white/80 italic">
                          <span className="text-amber-300/60 text-sm">+</span>
                          <span className="text-xs sm:text-sm">{t.packagesPage.andMoreIncluded.replace('{n}', String(pkg.includes.length - 4))}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPackage(pkg.id);
                        // Wait for React to render the dynamic details section, then scroll
                        setTimeout(() => {
                          const detailsSection = document.getElementById('selected-package-details');
                          if (detailsSection) {
                            detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 300);
                      }}
                      className="flex-1 inline-flex items-center justify-center border-2 border-white text-white font-bold px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-full hover:bg-white hover:text-black transition-all duration-200 text-xs sm:text-sm md:text-base"
                    >
                      {t.packagesPage.viewFullDetails}
                    </button>
                    <Link
                      href={`/book?package=${pkg.id}`}
                      className="flex-1 inline-flex items-center justify-center bg-white text-black font-bold px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-full hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all duration-200 shadow-xl text-xs sm:text-sm md:text-base"
                    >
                      {t.packagesPage.bookNow}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Itinerary Section - Optimized for 13" */}
      <section id="package-details" className="relative py-12 sm:py-16 lg:py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-5">
              <div className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-200">
                <span className="text-amber-900 font-black text-xs uppercase tracking-wider">{t.packagesPage.completeJourney}</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
              {t.packagesPage.journeyTitle}{' '}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                {t.packagesPage.journeyTitleHighlight}
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t.packagesPage.journeyDescription}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-8 sm:left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-orange-500 to-amber-400 hidden sm:block" />

            <div className="space-y-8 sm:space-y-10">
              {t.packagesPage.basic.itinerary.map((item: { time: string; title: string; description: string }, index: number) => (
                <div key={index} className="relative flex gap-6 sm:gap-8">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white">
                      <span className="text-sm sm:text-base font-black text-white">{item.time}</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-amber-100 hover:shadow-2xl hover:border-amber-300 transition-all duration-300">
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-5 px-12 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-2xl text-lg"
            >
              <span>{t.packagesPage.bookThisExperience}</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Detailed Itinerary - Optimized for 13" */}
      {displayPackage && (
        <section id="selected-package-details" className="relative py-12 sm:py-16 lg:py-20 bg-white scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            {/* Close Button - Enhanced */}
            <div className="flex justify-between items-center mb-10">
              <button
                onClick={() => setSelectedPackage(null)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full transition-all duration-200"
              >
                <span>✕</span>
                <span>{t.packagesPage.closeDetails}</span>
              </button>
              
              <Link
                href={`/book?package=${displayPackage.id}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-6 py-3 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-xl"
              >
                <span>{t.packagesPage.bookNow}</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Package Info Header - Optimized for 13" */}
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 rounded-3xl p-6 sm:p-10 lg:p-12 mb-12 border-2 border-amber-200 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3">
                  {displayPackage.name}
                </h2>
                <p className="text-xl sm:text-2xl text-amber-600 font-bold mb-3">
                  {displayPackage.tagline}
                </p>
                <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
                  {displayPackage.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-amber-100">
                  <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">{displayPackage.price}</div>
                  <div className="text-sm text-gray-600 font-semibold">{displayPackage.currency}/person</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-amber-100">
                  <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">{displayPackage.duration}</div>
                  <div className="text-sm text-gray-600 font-semibold">{t.packagesPage.duration}</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-amber-100">
                  <div className="text-xl sm:text-2xl font-black text-gray-900 mb-1">{displayPackage.startTime}</div>
                  <div className="text-sm text-gray-600 font-semibold">{t.packagesPage.startTime}</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-amber-100">
                  <div className="text-base sm:text-lg font-black text-gray-900 mb-1">{displayPackage.pickup}</div>
                  <div className="text-sm text-gray-600 font-semibold">{t.packagesPage.pickup}</div>
                </div>
              </div>
            </div>

            {/* Itinerary Timeline - Enhanced */}
            <div className="mb-16">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-12 text-center">
                {t.packagesPage.completeItinerary}{' '}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  {t.packagesPage.itineraryHighlight}
                </span>
              </h3>

              <div className="relative max-w-5xl mx-auto">
                <div className="absolute left-6 sm:left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-orange-500 to-amber-400 hidden sm:block" />

                <div className="space-y-8 sm:space-y-10">
                  {displayPackage.itinerary.map((item, index) => (
                    <div key={index} className="relative flex gap-6 sm:gap-8">
                      <div className="flex-shrink-0 relative z-10">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white">
                          <span className="text-sm sm:text-base font-black text-white">{item.time}</span>
                        </div>
                      </div>

                      <div className="flex-1 bg-gradient-to-br from-white to-amber-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border-2 border-amber-100 hover:shadow-2xl hover:border-amber-300 transition-all duration-300">
                        <h4 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
                          {item.title}
                        </h4>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* What's Included - Enhanced */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-amber-500 shadow-2xl mb-16">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-10 text-center">
                {t.packagesPage.whatsIncluded}{' '}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  {t.packagesPage.includedHighlight}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto">
                {displayPackage.includes.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-200">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-base text-white leading-relaxed font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Book CTA - Enhanced */}
            <div className="text-center">
              <div className="inline-block bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 sm:p-12 shadow-2xl border-2 border-amber-200 max-w-3xl">
                <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                  {t.packagesPage.readyTitle}{' '}
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    {t.packagesPage.readyTitleHighlight}
                  </span>
                </h3>
                <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
                  {t.packagesPage.readyDescription.replace('{name}', displayPackage.name)}
                </p>
                <Link
                  href={`/book?package=${displayPackage.id}`}
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-5 px-12 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-2xl text-lg sm:text-xl"
                >
                  <span>{t.packagesPage.bookPackage.replace('{name}', displayPackage.name)}</span>
                  <FiArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
