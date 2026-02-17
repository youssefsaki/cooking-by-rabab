'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { HeroProps } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero: React.FC<HeroProps> = ({ heroData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

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
      {/* Background Image - Desktop */}
      <Image
        src="/hero/desktop/bg.jpg"
        alt="Moroccan Cooking Class"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="hidden md:block"
        style={{
          objectFit: 'cover',
          objectPosition: 'center center',
        }}
      />
      
      {/* Background Image - Mobile */}
      <Image
        src="/hero/mobile/bg.jpg"
        alt="Moroccan Cooking Class"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="block md:hidden"
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
          paddingTop: '5rem',
          zIndex: 2,
        }}
      >
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
            <div className="w-6 sm:w-8 lg:w-12 h-[1px] bg-amber-500"></div>
            <span className="text-amber-500 text-[9px] sm:text-[10px] lg:text-xs font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase whitespace-nowrap">
              {t.hero.badge}
            </span>
            <div className="w-6 sm:w-8 lg:w-12 h-[1px] bg-amber-500"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight mb-3 sm:mb-4 lg:mb-6">
            <span className="block font-extralight italic">{t.hero.title}</span>
            <span className="block font-bold uppercase tracking-wider mt-1 sm:mt-2">{t.hero.titleHighlight}</span>
          </h1>

          {/* Thin Separator */}
          <div className="w-12 sm:w-16 lg:w-20 h-[2px] bg-amber-500 mx-auto mb-3 sm:mb-4 lg:mb-6"></div>

          {/* Description */}
          <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-5 sm:mb-6 lg:mb-8 font-light px-2 sm:px-4">
            {t.hero.description}
          </p>

          {/* CTA Button */}
          <div>
            <a
              href="/book"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-lg"
            >
              {t.hero.bookButton}
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
