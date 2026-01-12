'use client';

import React, { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiUsers, FiCheck, FiArrowRight, FiSun, FiMoon } from 'react-icons/fi';
import womenPackagesData from '@/data/women-packages.json';

/**
 * Design 1: Premium Bento Grid Layout
 * 
 * Aesthetic: Apple-inspired, modern, clean
 * - Asymmetric bento grid layout
 * - Featured package takes larger space
 * - Glassmorphism cards with backdrop blur
 * - Smooth hover interactions
 * - Premium pricing display
 * - Mobile-optimized stacking
 */

interface Package {
  id: number;
  title: string;
  price: number;
  featured: boolean;
  duration: string;
  includes: string[];
  prices: { duration: string; dormitory: number; private: number }[];
}

const PackagesSectionV6: React.FC = memo(() => {
  const [hoveredPackage, setHoveredPackage] = useState<number | null>(null);
  const packages = womenPackagesData as Package[];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-amber-200/60 to-orange-200/60 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-yellow-200/60 to-amber-200/60 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 mb-6">
            <FiSun className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-900 tracking-wider uppercase">
              Retreat Packages
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Your Journey to{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Wellness
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in transformative experiences that blend adventure, healing, and connection
            in Morocco&apos;s most beautiful coastal setting.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {packages.map((pkg, index) => {
            const isFeatured = pkg.featured;
            const isHovered = hoveredPackage === pkg.id;

            return (
              <div
                key={pkg.id}
                className={`
                  ${isFeatured ? 'lg:col-span-7' : 'lg:col-span-5'}
                  ${isFeatured ? 'lg:row-span-2' : 'lg:row-span-1'}
                  group relative
                `}
                onMouseEnter={() => setHoveredPackage(pkg.id)}
                onMouseLeave={() => setHoveredPackage(null)}
              >
                {/* Card Container */}
                <div
                  className={`
                    relative h-full rounded-3xl overflow-hidden
                    bg-white/80 backdrop-blur-xl
                    border border-gray-200/50
                    shadow-xl shadow-black/5
                    transition-all duration-500
                    ${isHovered ? 'scale-[1.02] shadow-2xl shadow-amber-500/20' : ''}
                    ${isFeatured ? 'min-h-[600px] lg:min-h-[700px]' : 'min-h-[400px] lg:min-h-0'}
                  `}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-8 lg:p-10 flex flex-col">
                    {/* Header */}
                    <div className="mb-6">
                      {/* Featured Badge */}
                      {isFeatured && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mb-4 shadow-lg shadow-amber-500/30">
                          <FiMoon className="w-4 h-4 text-white" />
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            Most Popular
                          </span>
                        </div>
                      )}

                      {/* Package Title */}
                      <h3 className={`font-extrabold text-gray-900 mb-3 leading-tight ${
                        isFeatured ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'
                      }`}>
                        {pkg.title}
                      </h3>

                      {/* Duration */}
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiCalendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{pkg.duration}</span>
                      </div>
                    </div>

                    {/* Price Display */}
                    <div className={`mb-8 ${isFeatured ? 'lg:mb-10' : 'mb-6'}`}>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-gray-500 font-medium">From</span>
                        <span className="text-5xl lg:text-6xl font-black text-gray-900">
                          €{pkg.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">per person</p>
                    </div>

                    {/* Includes List - Featured gets more space */}
                    {isFeatured && (
                      <div className="flex-1 mb-8">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-2">
                          <FiCheck className="w-5 h-5 text-amber-500" />
                          What&apos;s Included
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {pkg.includes.map((item, i) => (
                            <div 
                              key={i} 
                              className="flex items-start gap-2 text-gray-600 group-hover:text-gray-900 transition-colors"
                            >
                              <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                                <svg className="w-full h-full text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-sm leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Highlights for Non-Featured */}
                    {!isFeatured && (
                      <div className="flex-1 mb-6">
                        <div className="space-y-2">
                          {pkg.includes.slice(0, 4).map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-gray-600">
                              <FiCheck className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{item}</span>
                            </div>
                          ))}
                          {pkg.includes.length > 4 && (
                            <p className="text-sm text-amber-600 font-medium pl-6">
                              + {pkg.includes.length - 4} more experiences
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Pricing Options */}
                    <div className="mb-6">
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-4 space-y-3">
                        {pkg.prices.map((priceOption, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-gray-700">Dormitory</span>
                              <span className="text-lg font-bold text-gray-900">€{priceOption.dormitory}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-gray-700">Private Room</span>
                              <span className="text-lg font-bold text-gray-900">€{priceOption.private}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link 
                      href={`/packages?type=${pkg.id === 1 ? 'healing' : 'awakening'}`}
                      className={`
                        w-full py-4 px-6 rounded-xl
                        font-bold text-center
                        transition-all duration-300
                        flex items-center justify-center gap-2
                        ${isFeatured 
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-[1.02]'
                          : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl hover:scale-[1.02]'
                        }
                      `}
                    >
                      Book This Retreat
                      <FiArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    </Link>
                  </div>

                  {/* Glow Effect on Hover */}
                  <div className={`
                    absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500
                    ${isHovered ? 'opacity-100' : ''}
                    ${isFeatured ? 'bg-gradient-to-br from-amber-500/5 to-orange-500/5' : 'bg-gradient-to-br from-gray-900/5 to-gray-800/5'}
                  `}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-16 lg:mt-24">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <FiCheck className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Free Cancellation</p>
                <p className="text-xs text-gray-500">Up to 48h before</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Small Groups</p>
                <p className="text-xs text-gray-500">Intimate experience</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <FiSun className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">All-Inclusive</p>
                <p className="text-xs text-gray-500">Everything covered</p>
              </div>
            </div>
          </div>
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link 
            href="/packages"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors group"
          >
            <span>View detailed itinerary</span>
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
});

PackagesSectionV6.displayName = 'PackagesSectionV6';

export default PackagesSectionV6;
