'use client';

import React, { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiCheck, FiArrowRight, FiStar } from 'react-icons/fi';

/**
 * Design 3: Clean Comparison Table
 * 
 * Aesthetic: Modern, trust-building, easy to compare
 * - Bright, airy white background
 * - Side-by-side cards for easy comparison
 * - "Most Popular" highlight
 * - Feature checkmarks
 * - Clear pricing hierarchy
 */

// Placeholder data - will be replaced with actual client data
const packagesData = {
  smallHeading: "Choose Your Experience",
  mainHeading: "Cooking Packages",
  subtitle: "From quick workshops to full-day cultural immersions",
  packages: [
    {
      id: "bread-making",
      title: "Bread Making",
      subtitle: "Quick Workshop",
      description: "Perfect introduction to Moroccan baking traditions",
      duration: "2 hours",
      groupSize: "2-6",
      price: "350",
      currency: "MAD",
      image: "/hero1.jpg",
      features: [
        { name: "Traditional bread techniques", included: true },
        { name: "Wood-fired oven experience", included: true },
        { name: "Fresh mint tea", included: true },
        { name: "Recipe card to take home", included: true },
        { name: "Market visit", included: false },
        { name: "Multiple dishes", included: false },
        { name: "Certificate", included: false },
      ],
      popular: false,
    },
    {
      id: "tagine-masterclass",
      title: "Tagine Masterclass",
      subtitle: "Half-Day Experience",
      description: "Our most popular package - the complete tagine journey",
      duration: "4 hours",
      groupSize: "2-8",
      price: "550",
      currency: "MAD",
      image: "/hero2.jpg",
      features: [
        { name: "Traditional bread techniques", included: true },
        { name: "Wood-fired oven experience", included: true },
        { name: "Fresh mint tea", included: true },
        { name: "Recipe card to take home", included: true },
        { name: "Market visit", included: true },
        { name: "Multiple dishes", included: true },
        { name: "Certificate", included: false },
      ],
      popular: true,
    },
    {
      id: "full-day-immersion",
      title: "Full Immersion",
      subtitle: "Complete Journey",
      description: "The ultimate Amazigh culinary and cultural experience",
      duration: "8 hours",
      groupSize: "2-6",
      price: "850",
      currency: "MAD",
      image: "/hero3.jpg",
      features: [
        { name: "Traditional bread techniques", included: true },
        { name: "Wood-fired oven experience", included: true },
        { name: "Fresh mint tea", included: true },
        { name: "Recipe card to take home", included: true },
        { name: "Market visit", included: true },
        { name: "Multiple dishes", included: true },
        { name: "Certificate", included: true },
      ],
      popular: false,
    }
  ]
};

const PackagesSectionV3: React.FC = memo(() => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#C75B39] text-sm font-semibold tracking-wider uppercase mb-4">
            {packagesData.smallHeading}
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-6">
            {packagesData.mainHeading}
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {packagesData.subtitle}
          </p>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {packagesData.packages.map((pkg) => (
            <div
              key={pkg.id}
              onMouseEnter={() => setHoveredCard(pkg.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-300 ${
                pkg.popular 
                  ? 'ring-2 ring-[#C75B39] shadow-xl scale-[1.02]' 
                  : 'shadow-lg hover:shadow-xl'
              } ${hoveredCard === pkg.id ? 'transform -translate-y-2' : ''}`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-[#C75B39] text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  <FiStar className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                  {pkg.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                {/* Title & Subtitle */}
                <div className="mb-4">
                  <span className="text-[#C75B39] text-xs font-semibold uppercase tracking-wider">
                    {pkg.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mt-1">
                    {pkg.title}
                  </h3>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-[#1A1A1A]">{pkg.price}</span>
                  <span className="text-gray-500 text-lg">{pkg.currency}</span>
                  <span className="text-gray-400 text-sm ml-2">/ person</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6">
                  {pkg.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <div 
                      key={i} 
                      className={`flex items-center gap-3 text-sm ${
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        feature.included 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {feature.included ? (
                          <FiCheck className="w-3 h-3" />
                        ) : (
                          <span className="w-2 h-[2px] bg-current"></span>
                        )}
                      </div>
                      <span className={feature.included ? '' : 'line-through'}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Group Size */}
                <div className="text-sm text-gray-500 mb-6">
                  👥 {pkg.groupSize} people per session
                </div>

                {/* CTA Button */}
                <Link
                  href={`/packages/${pkg.id}`}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-[#C75B39] text-white hover:bg-[#A84832]'
                      : 'bg-[#1A1A1A] text-white hover:bg-[#333]'
                  }`}
                >
                  Book Now
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free cancellation up to 24h
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Small groups guaranteed
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            All ingredients included
          </div>
        </div>

        {/* Private Groups CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-[#FDF8F3] to-[#F5E6D3] rounded-2xl p-8 lg:p-10">
            <h3 className="text-xl lg:text-2xl font-bold text-[#2D1810] mb-3">
              Planning a private event?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We offer custom packages for team buildings, celebrations, and special occasions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[#C75B39] font-semibold hover:underline"
            >
              Contact us for custom packages
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

PackagesSectionV3.displayName = 'PackagesSectionV3';

export default PackagesSectionV3;
