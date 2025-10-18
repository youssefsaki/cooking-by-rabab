'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { HeroSectionData } from '@/types';

interface HeroSectionProps {
  data: HeroSectionData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get icon component with memoization
  const getIconComponent = useCallback((iconName: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
      FaMapMarkerAlt,
      FaCalendarAlt,
      // Add other icons as needed
    };
    return iconMap[iconName] || FaMapMarkerAlt; // Fallback to a default icon
  }, []);

  // Auto-scroll functionality for both desktop and mobile carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.images.length;

        // Scroll to the next image
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const isDesktop = window.innerWidth >= 1024;
          const imageWidth = isDesktop ? container.offsetWidth / 2 : container.offsetWidth;
          container.scrollTo({
            left: nextIndex * imageWidth,
            behavior: 'smooth'
          });
        }

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [data.images.length]);

  // Handle manual scroll with throttling
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isDesktop = window.innerWidth >= 1024;
      const imageWidth = isDesktop ? container.offsetWidth / 2 : container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      const newIndex = Math.round(scrollLeft / imageWidth);
      setCurrentImageIndex(newIndex);
    }
  }, []);

  return (
    <section className="bg-[#F7F7F6] py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">

          {/* Images Section - Left 2 columns on desktop */}
          <div className="lg:col-span-2">
            {/* Desktop: Horizontal scrollable carousel */}
            <div className="hidden lg:block">
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
                onScroll={handleScroll}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {data.images.map((image, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-1/2 snap-center"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden shadow-sm ring-1 ring-white/80">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop carousel indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {data.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === currentImageIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      if (scrollContainerRef.current) {
                        const container = scrollContainerRef.current;
                        const imageWidth = container.offsetWidth / 3; // Since we show 3 images at once
                        container.scrollTo({
                          left: index * imageWidth,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Mobile: Horizontal scrollable carousel */}
            <div className="lg:hidden">
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
                onScroll={handleScroll}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {data.images.map((image, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full snap-center"
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm ring-1 ring-white/80">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile carousel indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {data.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === currentImageIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      if (scrollContainerRef.current) {
                        const container = scrollContainerRef.current;
                        const isDesktop = window.innerWidth >= 1024;
                        const imageWidth = isDesktop ? container.offsetWidth / 2 : container.offsetWidth;
                        container.scrollTo({
                          left: index * imageWidth,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Text Section - Right column on desktop */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight uppercase leading-tight mb-6 text-gray-900">
              {data.title.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < data.title.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 leading-7 max-w-md mb-8 lg:text-left text-center">
              {data.subtitle}
            </p>

            {/* Features List */}
            <div className="space-y-6 mb-8">
              {data.features.map((feature, index) => {
                const IconComponent = getIconComponent(feature.icon);
                return (
                  <div key={index} className="flex gap-4 items-start">
                    {/* Icon Circle */}
                    <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-300 flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-gray-600" aria-hidden={true} />
                    </div>

                    {/* Feature Content */}
                    <div className="flex-1">
                      <h3 className="font-bold uppercase text-sm text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link
              href={data.cta.link}
              className="inline-block rounded-lg bg-orange-500 text-white font-bold uppercase py-3 px-6 text-center transition-all duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 lg:w-auto w-full"
              aria-label={data.cta.text}
            >
              {data.cta.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;