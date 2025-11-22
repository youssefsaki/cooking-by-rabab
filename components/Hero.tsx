'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HeroProps } from '@/types';

const Hero: React.FC<HeroProps> = ({ heroData }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Cozy Overlay */}
      <div className="absolute inset-0">
        <Image
          src={heroData.backgroundImage.url}
          alt={heroData.backgroundImage.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        {/* Cozy Warm Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 sm:px-8 lg:px-12">
        <div className="container-custom text-center">
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            {/* Subheading */}
            <div className="animate-slide-up">
              <h2 className="text-primary-light text-subheading-mobile sm:text-subheading font-medium uppercase tracking-wider drop-shadow-lg">
                {heroData.subheading}
              </h2>
            </div>

            {/* Main Heading */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-white text-hero-mobile sm:text-hero-tablet lg:text-hero font-extrabold uppercase leading-tight drop-shadow-2xl">
                {heroData.heading}
              </h1>
            </div>

            {/* Description */}
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-white/95 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mt-8 drop-shadow-lg">
                {heroData.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
                {heroData.ctaButtons.map((button: any) => (
                  <Link
                    key={button.text}
                    href={button.href}
                    className={`text-lg px-10 py-4 min-w-[240px] sm:min-w-[260px] rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                      button.variant === 'primary' 
                        ? 'bg-primary hover:bg-primary-dark text-white shadow-lg' 
                        : 'bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50'
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
