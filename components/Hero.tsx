'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HeroProps } from '@/types';

const Hero: React.FC<HeroProps> = ({ heroData }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroData.backgroundImage.url}
          alt={heroData.backgroundImage.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* Overlay */}
        <div className="hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            {/* Subheading */}
            <div className="animate-slide-up">
              <h2 className="text-primary-light text-subheading-mobile sm:text-subheading font-normal uppercase tracking-wider">
                {heroData.subheading}
              </h2>
            </div>

            {/* Main Heading */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-white text-hero-mobile sm:text-hero-tablet lg:text-hero font-extrabold uppercase leading-tight">
                {heroData.heading}
              </h1>
            </div>

            {/* Description */}
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-white text-base sm:text-lg leading-relaxed max-w-2xl sm:max-w-3xl mx-auto mt-6">
                {heroData.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                {heroData.ctaButtons.map((button: any) => (
                  <Link
                    key={button.text}
                    href={button.href}
                    className={`text-base px-8 py-3 min-w-[200px] sm:min-w-[220px] ${
                      button.variant === 'primary' 
                        ? 'btn-primary' 
                        : 'btn-secondary'
                    }`}
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {heroData.scrollIndicator.enabled && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
