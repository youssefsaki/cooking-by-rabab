'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroSectionData } from '@/types';

interface HeroSectionProps {
  data: HeroSectionData;
  mobileVariant?: 'A' | 'B' | 'C'; // Three mobile design options
}

/**
 * Design 3: Minimalist Modern Split
 * - Clean white aesthetic with terracotta accent
 * - Bold oversized typography
 * - Horizontal image marquee
 * - Elegant spacing and whitespace
 * - Refined, premium feel
 * 
 * Mobile Variants:
 * A = Card stack with vertical scroll
 * B = Full-bleed hero image with overlay text
 * C = Minimal text-first with bottom image strip
 */
const HeroSectionV3: React.FC<HeroSectionProps> = ({ data, mobileVariant = 'A' }) => {
  const [activeImage, setActiveImage] = useState(0);
  
  const allImages = [
    data.images.main,
    data.images.secondary,
    data.images.tertiary,
    data.images.accent,
  ];

  const experiences = ['Bread Making', 'Tagine Cooking', 'Spice Blending', 'Mint Tea Ceremony'];

  // ============================================
  // MOBILE VARIANT A: Card Stack Design
  // ============================================
  const MobileVariantA = () => (
    <div className="lg:hidden">
      {/* Hero Header */}
      <div className="px-5 pt-8 pb-6 text-center">
        {/* Rating Badge */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-[#C75D3A] flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
          <span className="text-[#C75D3A] text-xs font-medium">4.9 • 500+ guests</span>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold text-[#2D2A26] leading-tight mb-3">
          Learn to cook<br />
          <span className="text-[#C75D3A]">Amazigh</span>
        </h2>

        {/* Description */}
        <p className="text-[#6B6560] text-sm leading-relaxed mb-5 max-w-xs mx-auto">
          {data.subtitle}
        </p>

        {/* CTA */}
        <Link
          href={data.cta.link}
          className="inline-flex items-center justify-center gap-2 bg-[#C75D3A] text-white font-bold uppercase tracking-wider py-3.5 px-8 rounded-full text-sm"
        >
          {data.cta.text}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Main Image Card */}
      <div className="px-5 mb-4">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src={allImages[activeImage].src}
            alt={allImages[activeImage].alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-white/70 text-xs uppercase tracking-wider mb-2">Experience includes</p>
            <div className="flex flex-wrap gap-2">
              {experiences.slice(0, 3).map((item, i) => (
                <span key={i} className="px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="px-5 pb-6">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`relative flex-shrink-0 w-16 h-16 overflow-hidden rounded-xl transition-all ${
                activeImage === index 
                  ? 'ring-2 ring-[#C75D3A] ring-offset-2' 
                  : 'opacity-50'
              }`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 border-t border-[#E5E0DA]">
        {[
          { number: '3h', label: 'Duration' },
          { number: '6', label: 'Group' },
          { number: '4+', label: 'Dishes' },
          { number: '100%', label: 'Hands-on' },
        ].map((stat, i) => (
          <div key={i} className="py-4 text-center border-r last:border-r-0 border-[#E5E0DA]">
            <div className="text-lg font-bold text-[#C75D3A]">{stat.number}</div>
            <div className="text-[#6B6560] text-[10px] uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================
  // MOBILE VARIANT B: Full-Bleed Hero Image
  // ============================================
  const MobileVariantB = () => (
    <div className="lg:hidden relative">
      {/* Full-bleed background image */}
      <div className="relative min-h-[85vh]">
        <Image
          src={allImages[activeImage].src}
          alt={allImages[activeImage].alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 pb-8">
          {/* Rating */}
          <div className="inline-flex items-center gap-2 mb-4 self-start">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-4 h-4 text-[#C75D3A]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white/80 text-xs">500+ reviews</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-4">
            Learn to cook<br />
            <span className="text-[#C75D3A]">Amazigh</span>
          </h2>

          {/* Experience tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {experiences.map((item, i) => (
              <span key={i} className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/90 font-medium border border-white/20">
                {item}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href={data.cta.link}
            className="w-full bg-[#C75D3A] text-white font-bold uppercase tracking-wider py-4 rounded-2xl text-center text-sm flex items-center justify-center gap-2"
          >
            {data.cta.text}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Stats row */}
          <div className="flex justify-between mt-6 pt-4 border-t border-white/20">
            {[
              { number: '3h', label: 'Duration' },
              { number: '6 max', label: 'Group' },
              { number: '4+', label: 'Dishes' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-bold text-white">{stat.number}</div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Image selector dots */}
        <div className="absolute top-6 left-0 right-0 flex justify-center gap-2">
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeImage === index ? 'bg-white w-6' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // MOBILE VARIANT C: Text-First Minimal
  // ============================================
  const MobileVariantC = () => (
    <div className="lg:hidden bg-[#FAF8F5]">
      {/* Text Section */}
      <div className="px-6 pt-10 pb-8">
        {/* Tagline */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-[2px] bg-[#C75D3A]" />
          <span className="text-[#C75D3A] text-xs font-semibold uppercase tracking-[0.2em]">
            Amazigh Experience
          </span>
        </div>

        {/* Title - Extra large */}
        <h2 className="text-5xl font-bold text-[#2D2A26] leading-[0.95] mb-6">
          Cook<br />
          like a<br />
          <span className="text-[#C75D3A] italic font-light">local</span>
        </h2>

        {/* Description */}
        <p className="text-[#6B6560] text-base leading-relaxed mb-8">
          {data.subtitle}
        </p>

        {/* Inline Stats */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#E5E0DA]">
          <div>
            <span className="text-2xl font-bold text-[#C75D3A]">3h</span>
            <span className="text-[#6B6560] text-sm ml-1">class</span>
          </div>
          <div className="w-[1px] h-8 bg-[#E5E0DA]" />
          <div>
            <span className="text-2xl font-bold text-[#C75D3A]">4+</span>
            <span className="text-[#6B6560] text-sm ml-1">dishes</span>
          </div>
          <div className="w-[1px] h-8 bg-[#E5E0DA]" />
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5 text-[#C75D3A]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-lg font-bold text-[#2D2A26]">4.9</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={data.cta.link}
          className="flex items-center justify-between w-full bg-[#2D2A26] text-white py-4 px-6 rounded-2xl group"
        >
          <span className="font-bold uppercase tracking-wider text-sm">{data.cta.text}</span>
          <span className="w-10 h-10 rounded-full bg-[#C75D3A] flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
      </div>

      {/* Image Carousel */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative aspect-square mx-6 rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={allImages[activeImage].src}
            alt={allImages[activeImage].alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Experience Pills - Floating */}
        <div className="absolute -bottom-4 left-6 right-6 flex justify-center">
          <div className="inline-flex gap-2 bg-white shadow-lg rounded-full px-4 py-2">
            {experiences.slice(0, 2).map((item, i) => (
              <span key={i} className="text-[10px] text-[#6B6560] uppercase tracking-wider font-medium">
                {item}{i === 0 && <span className="mx-2 text-[#E5E0DA]">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail dots */}
      <div className="flex justify-center gap-2 pt-10 pb-8">
        {allImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeImage === index 
                ? 'w-8 bg-[#C75D3A]' 
                : 'w-1.5 bg-[#E5E0DA]'
            }`}
          />
        ))}
      </div>
    </div>
  );

  // ============================================
  // DESKTOP VERSION (unchanged)
  // ============================================
  const DesktopVersion = () => (
    <div className="hidden lg:block">
      {/* Top Section */}
      <div className="relative pt-16 lg:pt-24 pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-20">
            {/* Left: Title */}
            <div className="lg:max-w-2xl">
              {/* Tagline */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-[#C75D3A] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
                <span className="text-[#C75D3A] text-sm font-medium tracking-wide">
                  Rated 4.9 by 500+ guests
                </span>
              </div>
              
              {/* Main Title - Oversized */}
              <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#2D2A26] leading-[0.95] tracking-tight">
                Learn to cook
                <br />
                <span className="text-[#C75D3A]">Amazigh</span>
              </h2>
            </div>

            {/* Right: Description */}
            <div className="lg:max-w-sm lg:text-right">
              <p className="text-[#6B6560] text-lg leading-relaxed mb-6">
                {data.subtitle}
              </p>
              <Link
                href={data.cta.link}
                className="inline-flex items-center gap-3 text-[#2D2A26] font-semibold group"
              >
                <span className="uppercase tracking-wider text-sm">{data.cta.text}</span>
                <span className="w-12 h-12 rounded-full border-2 border-[#2D2A26] flex items-center justify-center group-hover:bg-[#2D2A26] group-hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="relative">
        {/* Main Featured Image */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-8">
          <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-3xl">
            <Image
              src={allImages[activeImage].src}
              alt={allImages[activeImage].alt}
              fill
              className="object-cover transition-all duration-700"
              sizes="100vw"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Bottom Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                {/* Left Info */}
                <div className="text-white">
                  <p className="text-white/70 text-sm uppercase tracking-wider mb-2">Experience includes</p>
                  <div className="flex flex-wrap gap-3">
                    {experiences.map((item, i) => (
                      <span key={i} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Right CTA */}
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 bg-white text-[#2D2A26] font-bold uppercase tracking-wider py-4 px-8 rounded-full hover:bg-[#C75D3A] hover:text-white transition-all duration-300 self-start lg:self-auto"
                >
                  Book Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {allImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative flex-shrink-0 w-32 h-24 lg:w-40 lg:h-28 overflow-hidden rounded-xl transition-all duration-300 ${
                  activeImage === index 
                    ? 'ring-2 ring-[#C75D3A] ring-offset-2 ring-offset-[#FAF8F5]' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="border-t border-[#E5E0DA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E5E0DA]">
            {[
              { number: '3h', label: 'Duration' },
              { number: '6', label: 'Max Group Size' },
              { number: '4+', label: 'Dishes You\'ll Make' },
              { number: '100%', label: 'Hands-on' },
            ].map((stat, i) => (
              <div key={i} className="py-8 lg:py-10 px-4 lg:px-8 text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold text-[#C75D3A] mb-1">{stat.number}</div>
                <div className="text-[#6B6560] text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="hidden lg:block absolute top-32 right-12 w-24 h-24">
        <div className="relative w-full h-full animate-spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#C75D3A]/20">
            <path
              id="textPath"
              d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
              fill="none"
            />
            <text className="text-[10px] uppercase tracking-[0.3em] fill-current">
              <textPath href="#textPath">
                AUTHENTIC • AMAZIGH • COOKING • CLASS •
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative bg-[#FAF8F5] overflow-hidden">
      {/* Desktop Version - Always shown on lg+ screens */}
      <DesktopVersion />
      
      {/* Mobile Versions - Conditionally rendered based on variant prop */}
      {mobileVariant === 'A' && <MobileVariantA />}
      {mobileVariant === 'B' && <MobileVariantB />}
      {mobileVariant === 'C' && <MobileVariantC />}
    </section>
  );
};

export default HeroSectionV3;
