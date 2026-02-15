'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiClock, FiUsers, FiMapPin } from 'react-icons/fi';

const packagesData = [
  {
    id: "basic",
    name: "Basic Package",
    tagline: "Your Journey into the Mountains",
    subtitle: "A half-day immersive cultural experience in the Atlas Mountains",
    price: "500",
    currency: "MAD",
    duration: "6 hours",
    groupSize: "Up to 8 guests",
    startTime: "13:30",
    image: "/packages/basic.jpg",
    popular: true,
    highlights: [
      "300-year-old Amazigh house tour",
      "Moroccan mint tea ceremony",
      "Traditional village bread baking",
      "Authentic tagine cooking workshop",
      "Amlou making with ancient millstone",
      "Family feast with Atlas sunset views"
    ]
  },
  {
    id: "private",
    name: "Private Package",
    tagline: "Exclusive Mountain Experience",
    subtitle: "Personalized culinary journey designed exclusively for your group",
    price: "800",
    currency: "MAD",
    duration: "6 hours",
    groupSize: "Private group",
    startTime: "Flexible",
    image: "/packages/private-chef.jpg",
    highlights: [
      "Completely private experience",
      "Flexible scheduling & timing",
      "Customizable menu options",
      "Exclusive Amazigh house access",
      "Personalized cooking instruction",
      "Private family-style feast"
    ]
  }
];

const PackagesV3: React.FC = memo(() => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-[#F5EFE7] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-xl mb-6 border border-amber-100">
            <span className="text-xl">🍽️</span>
            <span className="text-sm font-bold text-amber-900 tracking-wider uppercase">
              Choose Your Experience
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight">
            Cooking Class{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Packages
            </span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in authentic Amazigh culture with our mountain cooking experiences
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {packagesData.map((pkg) => (
            <div
              key={pkg.id}
              className="group relative h-[550px] sm:h-[650px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-300 will-change-transform"
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-6 right-6 z-30 pointer-events-none">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl">
                    ⭐ Most Popular
                  </div>
                </div>
              )}

              {/* Background Image - Optimized */}
              <div className="absolute inset-0 will-change-transform">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  quality={85}
                />
              </div>

              {/* Overlay - Faster transition */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-300 ease-out group-hover:from-black/90 group-hover:via-black/70 group-hover:to-black/50" />

              {/* Default Content - Faster fade out */}
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
                  <span className="text-sm text-white/80">per person</span>
                </div>
              </div>

              {/* Hover Content - Faster fade in, optimized rendering */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 will-change-transform">
                {/* Top Content */}
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight drop-shadow-lg">
                      {pkg.name}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed drop-shadow-md mb-4">
                      {pkg.subtitle}
                    </p>
                    
                    {/* Price Display */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl sm:text-4xl font-black text-white">{pkg.price}</span>
                      <span className="text-lg text-white/90 font-semibold">{pkg.currency}</span>
                      <span className="text-sm text-white/80">per person</span>
                    </div>
                  </div>

                  {/* Quick Info Icons - Compact */}
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
                      <span className="text-white text-xs sm:text-sm font-medium">Atlas Mountains</span>
                    </div>
                  </div>
                  
                  {/* Highlights List - No scroll, limited items */}
                  <div className="grid grid-cols-1 gap-2">
                    {pkg.highlights.slice(0, 4).map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2.5 text-white/95">
                        <span className="text-amber-300 text-sm flex-shrink-0">✦</span>
                        <span className="text-xs sm:text-sm leading-snug">{highlight}</span>
                      </div>
                    ))}
                    {pkg.highlights.length > 4 && (
                      <div className="flex items-center gap-2.5 text-white/80 italic">
                        <span className="text-amber-300/60 text-sm">+</span>
                        <span className="text-xs sm:text-sm">and {pkg.highlights.length - 4} more experiences...</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Buttons - Optimized */}
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-4">
                  <Link
                    href="/packages"
                    className="flex-1 inline-flex items-center justify-center border-2 border-white text-white font-bold px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-full hover:bg-white hover:text-black transition-all duration-200 text-xs sm:text-sm md:text-base"
                  >
                    Full Details
                  </Link>
                  <Link
                    href="/book"
                    className="flex-1 inline-flex items-center justify-center bg-white text-black font-bold px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-full hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all duration-200 shadow-xl text-xs sm:text-sm md:text-base"
                  >
                    Book Now
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
