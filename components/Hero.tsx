'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { HeroProps } from '@/types';

const Hero: React.FC<HeroProps> = ({ heroData }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fix for mobile browsers - set exact viewport height
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      if (containerRef.current) {
        containerRef.current.style.height = `${window.innerHeight}px`;
      }
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', () => {
      setTimeout(setVH, 100);
    });

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="hero-fullscreen"
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(var(--vh, 1vh) * 100)',
        minHeight: 'calc(var(--vh, 1vh) * 100)',
        maxHeight: 'calc(var(--vh, 1vh) * 100)',
        overflow: 'hidden',
      }}
    >
      {/* Background Image - Full Cover */}
      <Image
        src="/gallery/cooking-class.jpg"
        alt="Moroccan Cooking Class"
        fill
        priority
        quality={90}
        sizes="100vw"
        style={{
          objectFit: 'cover',
          objectPosition: 'center center',
        }}
      />
      
      {/* Dark overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      />

      {/* Content - Centered */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          zIndex: 2,
        }}
      >
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
            <div className="w-8 sm:w-12 lg:w-16 h-[1px] bg-amber-500"></div>
            <span className="text-amber-500 text-[10px] sm:text-xs lg:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.3em] uppercase whitespace-nowrap">
              {heroData.subheading}
            </span>
            <div className="w-8 sm:w-12 lg:w-16 h-[1px] bg-amber-500"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-light tracking-tight mb-4 sm:mb-6 lg:mb-8">
            <span className="block font-extralight italic">Authentic</span>
            <span className="block font-bold uppercase tracking-wider mt-1 sm:mt-2">Moroccan Cooking</span>
          </h1>

          {/* Thin Separator */}
          <div className="w-16 sm:w-20 lg:w-24 h-[2px] bg-amber-500 mx-auto mb-4 sm:mb-6 lg:mb-8"></div>

          {/* Description */}
          <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-12 font-light px-2 sm:px-4">
            {heroData.description}
          </p>

          {/* CTA Button */}
          <div>
            <a
              href="https://wa.me/212661736563?text=Hi%20Rabab!%20I%20would%20like%20to%20book%20a%20cooking%20class."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-lg"
            >
              Book Your Experience
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {heroData.scrollIndicator.enabled && (
        <div 
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/50 text-[10px] sm:text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-[1px] h-5 sm:h-6 lg:h-8 bg-white/50"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
