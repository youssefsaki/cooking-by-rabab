'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiClock } from 'react-icons/fi';

/**
 * Design 5: Journey Timeline
 * 
 * Aesthetic: Storytelling, progressive journey
 * - Vertical timeline connecting packages
 * - From shortest to longest experience
 * - Hand-drawn/organic feel
 * - Warm earth tones with pops of color
 * - Emphasis on the experience progression
 */

const packagesData = {
  smallHeading: "YOUR CULINARY JOURNEY",
  mainHeading: "Choose Your Path",
  subtitle: "From a quick introduction to a full cultural immersion",
  packages: [
    {
      id: "bread-making",
      title: "Bread Making",
      subtitle: "Start Here",
      tagline: "Perfect for beginners",
      description: "Your first step into Moroccan cuisine. Learn the art of traditional bread making in just 2 hours.",
      duration: "2 hours",
      price: "350",
      currency: "MAD",
      image: "/hero1.jpg",
      highlights: ["Wood-fired oven", "Fresh mint tea", "Recipe card"],
      level: 1,
    },
    {
      id: "tagine-masterclass",
      title: "Tagine Masterclass", 
      subtitle: "Go Deeper",
      tagline: "Our most popular choice",
      description: "Dive deeper with a half-day experience. Visit the market, learn spice blending, and master the tagine.",
      duration: "4 hours",
      price: "550",
      currency: "MAD",
      image: "/hero2.jpg",
      highlights: ["Market visit", "Spice workshop", "Full lunch", "Recipe booklet"],
      level: 2,
      popular: true,
    },
    {
      id: "full-day",
      title: "Full Immersion",
      subtitle: "The Complete Experience",
      tagline: "For true food lovers",
      description: "The ultimate journey. From sunrise at the souk to preparing a complete feast. An unforgettable day.",
      duration: "8 hours",
      price: "850",
      currency: "MAD",
      image: "/hero3.jpg",
      highlights: ["Sunrise market", "Multiple dishes", "Cultural stories", "Certificate", "Photos"],
      level: 3,
    }
  ]
};

const PackagesSectionV5: React.FC = memo(() => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-[#FDF8F3] to-[#F5E6D3] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-[#C75B39] text-sm font-medium tracking-[0.3em] uppercase mb-4">
            {packagesData.smallHeading}
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2D1810] mb-6">
            {packagesData.mainHeading}
          </h2>
          
          <p className="text-lg text-[#5D4037] max-w-xl mx-auto">
            {packagesData.subtitle}
          </p>
          
          {/* Journey Arrow */}
          <div className="mt-10 flex flex-col items-center">
            <span className="text-[#C75B39] text-sm font-medium mb-2">Begin your journey</span>
            <svg className="w-6 h-12 text-[#C75B39] animate-bounce" fill="none" viewBox="0 0 24 48">
              <path d="M12 0v40M12 40l-8-8M12 40l8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C75B39] via-[#D4A574] to-[#2D5A4A] transform -translate-x-1/2"></div>
          
          {packagesData.packages.map((pkg, index) => (
            <div 
              key={pkg.id}
              className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-24 last:mb-0 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Timeline Node */}
              <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ${
                  pkg.popular ? 'bg-[#C75B39] ring-4 ring-[#C75B39]/30' : 'bg-[#2D1810]'
                }`}>
                  {pkg.level}
                </div>
              </div>
              
              {/* Image Side */}
              <div className={`w-full lg:w-[calc(50%-4rem)] ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                <Link href={`/packages/${pkg.id}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                    
                    {/* Duration Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                      <FiClock className="w-4 h-4 text-[#C75B39]" />
                      <span className="font-semibold text-[#2D1810]">{pkg.duration}</span>
                    </div>
                    
                    {/* Popular Badge */}
                    {pkg.popular && (
                      <div className="absolute top-4 right-4 bg-[#C75B39] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                        ★ Most Popular
                      </div>
                    )}
                    
                    {/* Price Overlay */}
                    <div className="absolute bottom-4 right-4 bg-[#2D1810]/90 backdrop-blur-sm px-5 py-3 rounded-2xl">
                      <span className="text-[#D4A574] text-xs block">From</span>
                      <span className="text-white text-2xl font-bold">{pkg.price}</span>
                      <span className="text-white/70 text-sm ml-1">{pkg.currency}</span>
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* Content Side */}
              <div className={`w-full lg:w-[calc(50%-4rem)] ${index % 2 === 0 ? 'lg:pl-8 lg:text-left' : 'lg:pr-8 lg:text-right'}`}>
                {/* Mobile Level Indicator */}
                <div className="lg:hidden flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    pkg.popular ? 'bg-[#C75B39]' : 'bg-[#2D1810]'
                  }`}>
                    {pkg.level}
                  </div>
                  <span className="text-[#C75B39] font-medium">{pkg.subtitle}</span>
                </div>
                
                {/* Subtitle - Desktop */}
                <span className="hidden lg:block text-[#C75B39] text-sm font-semibold tracking-wider uppercase mb-2">
                  {pkg.subtitle}
                </span>
                
                {/* Title */}
                <h3 className="text-3xl lg:text-4xl font-serif font-bold text-[#2D1810] mb-2">
                  {pkg.title}
                </h3>
                
                {/* Tagline */}
                <span className="text-[#5D4037] italic mb-4 block">
                  {pkg.tagline}
                </span>
                
                {/* Description */}
                <p className="text-[#5D4037] leading-relaxed mb-6">
                  {pkg.description}
                </p>
                
                {/* Highlights */}
                <div className={`flex flex-wrap gap-2 mb-8 ${index % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                  {pkg.highlights.map((highlight, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-white rounded-full text-sm text-[#2D1810] shadow-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                
                {/* CTA */}
                <Link 
                  href={`/packages/${pkg.id}`}
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    pkg.popular 
                      ? 'bg-[#C75B39] text-white hover:bg-[#A84832]' 
                      : 'bg-[#2D1810] text-white hover:bg-[#4A2C20]'
                  }`}
                >
                  Book This Experience
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-24 text-center">
          <div className="inline-block bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
            <h3 className="text-2xl lg:text-3xl font-serif font-bold text-[#2D1810] mb-4">
              Not sure where to start?
            </h3>
            <p className="text-[#5D4037] mb-6 max-w-md mx-auto">
              We recommend the Tagine Masterclass for first-timers — it&apos;s the perfect balance of learning and experience.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 text-[#C75B39] font-semibold hover:underline"
            >
              Or contact us to customize your experience
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

PackagesSectionV5.displayName = 'PackagesSectionV5';

export default PackagesSectionV5;
