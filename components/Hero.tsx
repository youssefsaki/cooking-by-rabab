'use client';

import Link from 'next/link';
import React from 'react';
import { HeroProps } from '@/types';

const Hero: React.FC<HeroProps> = ({ heroData }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background - Full Cover */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero1.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark elegant overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content - Design 1: Elegant Centered */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
            <div className="w-16 h-[1px] bg-primary"></div>
            <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">
              {heroData.subheading}
            </span>
            <div className="w-16 h-[1px] bg-primary"></div>
          </div>

          {/* Main Heading - Elegant Typography */}
          <h1 className="text-white text-5xl sm:text-6xl lg:text-8xl font-light tracking-tight mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <span className="block font-extralight italic">Cook</span>
            <span className="block font-bold uppercase tracking-wider mt-2">Like a Local</span>
          </h1>

          {/* Thin Separator */}
          <div className="w-24 h-[2px] bg-primary mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}></div>

          {/* Description */}
          <p className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12 font-light animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {heroData.description}
          </p>

          {/* Single Prominent CTA */}
          <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Link
              href="/book"
              className="inline-block bg-primary hover:bg-primary-dark text-dark-blue px-12 py-5 text-lg font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Book Your Experience
            </Link>
            <p className="text-white/50 text-sm mt-6 tracking-wide">
              or <Link href="/experiences" className="text-primary hover:text-primary-light underline underline-offset-4 transition-colors">explore our classes</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Minimal */}
      {heroData.scrollIndicator.enabled && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-[1px] h-8 bg-white/40"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
