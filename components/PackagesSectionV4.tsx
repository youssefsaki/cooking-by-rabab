'use client';

import React, { memo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiArrowLeft, FiClock, FiUsers } from 'react-icons/fi';

/**
 * Design 4: Horizontal Scroll Gallery
 * 
 * Aesthetic: Netflix/Spotify style horizontal scroll
 * - Large immersive cards
 * - Horizontal scroll with snap
 * - Gradient overlays
 * - Interactive navigation arrows
 * - Modern, app-like feel
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
    <section className="py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
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
    </section>
  );
});

PackagesSectionV4.displayName = 'PackagesSectionV4';

export default PackagesSectionV4;
