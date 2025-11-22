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
    <section className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">

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
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg ring-1 ring-warm-gray-200/50 hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        quality={85}
                        onError={(e) => {
                          // Silently handle image errors
                          const target = e.target as HTMLImageElement;
                          if (target) {
                            target.style.display = 'none';
                          }
                        }}
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
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ring-1 ring-warm-gray-200/50 hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="100vw"
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        quality={85}
                        onError={(e) => {
                          // Silently handle image errors
                          const target = e.target as HTMLImageElement;
                          if (target) {
                            target.style.display = 'none';
                          }
                        }}
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
          <div className="lg:col-span-1 flex flex-col justify-center space-y-8">
            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight uppercase leading-tight text-text-primary">
              {data.title.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < data.title.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-text-secondary leading-relaxed text-lg max-w-md lg:text-left text-center">
              {data.subtitle}
            </p>

            {/* Features List */}
            <div className="space-y-8">
              {data.features.map((feature, index) => {
                const IconComponent = getIconComponent(feature.icon);
                return (
                  <div key={index} className="flex gap-6 items-start group">
                    {/* Icon Circle */}
                    {feature.link ? (
                      <a
                        href={feature.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 flex-shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300 hover:scale-110 cursor-pointer"
                        aria-label={`Open ${feature.title} location on Google Maps`}
                      >
                        <IconComponent className="w-6 h-6 text-primary" aria-hidden={true} />
                      </a>
                    ) : (
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 flex-shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                        <IconComponent className="w-6 h-6 text-primary" aria-hidden={true} />
                      </div>
                    )}

                    {/* Feature Content */}
                    <div className="flex-1">
                      {feature.link ? (
                        <a
                          href={feature.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold uppercase text-sm text-text-primary mb-2 tracking-wide hover:text-primary transition-colors duration-300 cursor-pointer inline-block"
                        >
                          {feature.title}
                        </a>
                      ) : (
                        <h3 className="font-bold uppercase text-sm text-text-primary mb-2 tracking-wide">
                          {feature.title}
                        </h3>
                      )}
                      <p className="text-text-secondary text-sm leading-relaxed">
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
              className="inline-block rounded-xl bg-primary font-bold uppercase py-4 px-8 text-center transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 lg:w-auto w-full" style={{ color: '#084869' }}
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