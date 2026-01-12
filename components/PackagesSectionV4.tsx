'use client';

import React, { memo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiArrowLeft, FiClock, FiUsers, FiCheck } from 'react-icons/fi';

/**
 * Design 4: Horizontal Scroll Gallery (Desktop) + Stacked Cards (Mobile)
 * 
 * Desktop: Netflix/Spotify style horizontal scroll
 * Mobile: Full-width stacked cards with swipe indicator
 */

const packagesData = {
  smallHeading: "CHOOSE YOUR ADVENTURE",
  mainHeading: "Cooking Experiences",
  packages: [
    {
      id: "bread-making",
      title: "Bread Making",
      subtitle: "The Art of Khobz",
      description: "Learn traditional Moroccan bread from scratch in a wood-fired oven",
      duration: "2 hours",
      groupSize: "2-6",
      price: "350",
      currency: "MAD",
      image: "/hero1.jpg",
      color: "#C75B39",
      highlights: ["Wood-fired oven", "Take-home recipes", "Mint tea"],
    },
    {
      id: "tagine-masterclass", 
      title: "Tagine Masterclass",
      subtitle: "Slow-Cooked Perfection",
      description: "Master the iconic tagine with market visit and spice workshop",
      duration: "4 hours",
      groupSize: "2-8",
      price: "550",
      currency: "MAD",
      image: "/hero2.jpg",
      color: "#D4A574",
      popular: true,
      highlights: ["Market visit", "Spice workshop", "Full lunch", "Recipe booklet"],
    },
    {
      id: "full-day",
      title: "Full Day Immersion",
      subtitle: "Complete Journey",
      description: "The ultimate experience from sunrise souk to sunset feast",
      duration: "8 hours",
      groupSize: "2-6",
      price: "850",
      currency: "MAD",
      image: "/hero3.jpg",
      color: "#2D5A4A",
      highlights: ["Sunrise market", "Multiple dishes", "Cultural stories", "Certificate"],
    },
    {
      id: "pastry-workshop",
      title: "Pastry Workshop",
      subtitle: "Sweet Traditions",
      description: "Create authentic Moroccan pastries and traditional mint tea",
      duration: "3 hours",
      groupSize: "2-6",
      price: "450",
      currency: "MAD",
      image: "/hero4.jpg",
      color: "#8B5A2B",
      highlights: ["Pastry making", "Mint tea ceremony", "Sweet treats"],
    }
  ]
};

const PackagesSectionV4: React.FC = memo(() => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* ==================== MOBILE DESIGN ==================== */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="px-6 mb-8">
          <span className="text-[#C75B39] text-xs font-medium tracking-[0.2em] uppercase mb-3 block">
            {packagesData.smallHeading}
          </span>
          <h2 className="text-3xl font-bold text-white mb-4">
            {packagesData.mainHeading}
          </h2>
          <p className="text-white/60 text-sm">
            Swipe to explore our cooking experiences
          </p>
        </div>

        {/* Mobile Cards - Vertical Stack with Featured Card */}
        <div className="px-4 space-y-4">
          {packagesData.packages.map((pkg, index) => (
            <Link 
              key={pkg.id} 
              href={`/packages/${pkg.id}`}
              className="block group"
            >
              <div 
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  pkg.popular ? 'ring-2 ring-[#C75B39]' : ''
                }`}
                style={{ backgroundColor: pkg.color }}
              >
                {/* Compact Card Layout */}
                <div className="flex">
                  {/* Image Side */}
                  <div className="relative w-32 h-40 flex-shrink-0">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                    {/* Number Badge */}
                    <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      {/* Popular Badge */}
                      {pkg.popular && (
                        <span className="inline-block bg-white text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2">
                          ★ Popular
                        </span>
                      )}
                      
                      {/* Title & Subtitle */}
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {pkg.title}
                      </h3>
                      <span className="text-white/50 text-xs uppercase tracking-wider">
                        {pkg.subtitle}
                      </span>
                      
                      {/* Meta */}
                      <div className="flex items-center gap-3 mt-2 text-white/60 text-xs">
                        <span className="flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          {pkg.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiUsers className="w-3 h-3" />
                          {pkg.groupSize}
                        </span>
                      </div>
                    </div>
                    
                    {/* Price Row */}
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <span className="text-white/40 text-[10px] block">From</span>
                        <span className="text-white text-xl font-bold">{pkg.price}</span>
                        <span className="text-white/60 text-xs ml-1">{pkg.currency}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-active:bg-white/40 transition-colors">
                        <FiArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Expandable Highlights (shown for popular) */}
                {pkg.popular && pkg.highlights && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="flex flex-wrap gap-1">
                      {pkg.highlights.slice(0, 3).map((highlight, i) => (
                        <span key={i} className="flex items-center gap-1 text-[10px] text-white/70 bg-white/10 px-2 py-1 rounded-full">
                          <FiCheck className="w-2.5 h-2.5" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
          
          {/* View All Button - Mobile */}
          <Link 
            href="/packages"
            className="block w-full py-4 border border-dashed border-white/30 rounded-2xl text-center text-white/60 hover:text-white hover:border-white/50 transition-colors"
          >
            View All Packages →
          </Link>
        </div>

        {/* Mobile Trust Badges */}
        <div className="mt-8 px-6 flex flex-wrap justify-center gap-4 text-white/40 text-xs">
          <span>✓ Free cancellation</span>
          <span>✓ Small groups</span>
          <span>✓ All inclusive</span>
        </div>
      </div>

      {/* ==================== DESKTOP DESIGN ==================== */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <span className="text-[#C75B39] text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
                {packagesData.smallHeading}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {packagesData.mainHeading}
              </h2>
            </div>
            
            {/* Navigation Arrows */}
            <div className="flex gap-3 mt-6 lg:mt-0">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <FiArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-6 lg:px-8 pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Left Spacer for centering on large screens */}
          <div className="hidden lg:block flex-shrink-0 w-[calc((100vw-1280px)/2)]"></div>
          
          {packagesData.packages.map((pkg, index) => (
            <Link 
              key={pkg.id} 
              href={`/packages/${pkg.id}`}
              className="group flex-shrink-0 snap-start"
            >
              <div 
                className="relative w-[320px] sm:w-[380px] h-[500px] rounded-3xl overflow-hidden"
                style={{ backgroundColor: pkg.color }}
              >
                {/* Background Image */}
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="380px"
                />
                
                {/* Gradient Overlay */}
                <div 
                  className="absolute inset-0"
                  style={{ 
                    background: `linear-gradient(to top, ${pkg.color} 0%, ${pkg.color}99 30%, transparent 70%)`
                  }}
                ></div>
                
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute top-6 left-6 bg-white text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                
                {/* Card Number */}
                <div className="absolute top-6 right-6 text-white/30 text-6xl font-bold">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-white/70 text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiUsers className="w-4 h-4" />
                      {pkg.groupSize}
                    </span>
                  </div>
                  
                  {/* Subtitle */}
                  <span className="text-white/60 text-xs uppercase tracking-[0.2em] block mb-2">
                    {pkg.subtitle}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    {pkg.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/70 text-sm mb-6 line-clamp-2">
                    {pkg.description}
                  </p>
                  
                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white/50 text-xs block">From</span>
                      <span className="text-white text-2xl font-bold">{pkg.price}</span>
                      <span className="text-white/70 text-sm ml-1">{pkg.currency}</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FiArrowRight className="w-5 h-5 text-black" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          
          {/* View All Card */}
          <div className="flex-shrink-0 snap-start">
            <Link href="/packages" className="group block">
              <div className="w-[320px] sm:w-[380px] h-[500px] rounded-3xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center hover:border-white/40 transition-colors duration-300">
                <div className="w-20 h-20 rounded-full border-2 border-white/30 flex items-center justify-center mb-6 group-hover:border-white/60 transition-colors duration-300">
                  <FiArrowRight className="w-8 h-8 text-white/50 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-white/50 text-lg font-medium group-hover:text-white transition-colors duration-300">
                  View All Packages
                </span>
              </div>
            </Link>
          </div>
          
          {/* Right Spacer */}
          <div className="hidden lg:block flex-shrink-0 w-[calc((100vw-1280px)/2)]"></div>
        </div>

        {/* Scroll Indicator Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {packagesData.packages.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/30'}`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
});

PackagesSectionV4.displayName = 'PackagesSectionV4';

export default PackagesSectionV4;
