'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { HeroProps } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero: React.FC<HeroProps> = ({ heroData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    let active = true;

    const setVH = () => {
      if (!active) return;
      try {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        if (containerRef.current) {
          containerRef.current.style.height = `${window.innerHeight}px`;
        }
      } catch (error) {
        console.error('Error setting viewport height:', error);
      }
    };

    setVH();

    const handleOrientationChange = () => {
      if (active) setTimeout(setVH, 150);
    };

    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });

    return () => {
      active = false;
      window.removeEventListener('orientationchange', handleOrientationChange);
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
        quality={75}
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
        quality={60}
        sizes="(max-width: 768px) 100vw, 50vw"
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
        <div className="text-center max-w-4xl mx-auto px-6 sm:px-6">
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-3 sm:gap-3 mb-5 sm:mb-5 lg:mb-6">
            <div className="w-10 sm:w-10 lg:w-12 h-[1px] bg-amber-500"></div>
            <span className="text-amber-500 text-[11px] sm:text-xs lg:text-sm font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase whitespace-nowrap px-2">
              {t.hero.badge}
            </span>
            <div className="w-10 sm:w-10 lg:w-12 h-[1px] bg-amber-500"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-white text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight mb-5 sm:mb-5 lg:mb-7 leading-tight">
            <span className="block font-extralight italic">{t.hero.title}</span>
            <span className="block font-bold uppercase tracking-wider mt-3 sm:mt-3">{t.hero.titleHighlight}</span>
          </h1>

          {/* Thin Separator */}
          <div className="w-20 sm:w-20 lg:w-24 h-[2px] bg-amber-500 mx-auto mb-5 sm:mb-5 lg:mb-7"></div>

          {/* Description */}
          <p className="text-white/90 text-base sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-7 sm:mb-7 lg:mb-9 font-normal px-2 sm:px-6">
            {t.hero.description}
          </p>

          {/* CTA Button */}
          <div>
            <a
              href="/book"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-10 sm:px-10 lg:px-12 py-5 sm:py-4.5 lg:py-5 text-base sm:text-base lg:text-lg font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-lg"
              style={{ touchAction: 'manipulation' }}
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
