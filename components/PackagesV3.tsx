'use client';

import React, { memo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiCheck, FiClock, FiUsers, FiArrowRight, FiX } from 'react-icons/fi';

/**
 * PACKAGES SECTION - Design 3 of 3
 * 
 * Design 3: Interactive Tabs/Cards with Comparison
 * 
 * Aesthetic: Modern, interactive, detailed
 * - Tab selection
 * - Large featured card
 * - Full feature comparison
 * - Light theme with amber accents
 */

const packagesData = [
  {
    id: "basic",
    name: "Basic",
    tagline: "2-Hour Introduction",
    price: "300",
    currency: "MAD",
    duration: "2 hours",
    groupSize: "2-8 guests",
    image: "/packages/basic.jpg",
    description: "A quick taste of Moroccan cooking. Perfect for beginners or those short on time.",
    highlights: [
      "Great for beginners",
      "Short & sweet",
      "Quick introduction"
    ],
    features: {
      "Market Visit": false,
      "Bread Making": true,
      "Tagine Cooking": false,
      "Spice Workshop": false,
      "Mint Tea Ceremony": true,
      "Lunch Included": false,
      "Recipe Booklet": true,
      "Certificate": true,
      "Photos Included": false,
      "Private Class": false
    }
  },
  {
    id: "medium",
    name: "Medium",
    tagline: "4-Hour Experience",
    price: "500",
    currency: "MAD",
    duration: "4 hours",
    groupSize: "2-8 guests",
    image: "/packages/medium.jpg",
    popular: true,
    description: "The complete experience! Market visit, spice workshop, and master the iconic Moroccan tagine.",
    highlights: [
      "Best value",
      "Full tagine experience",
      "Market & spices"
    ],
    features: {
      "Market Visit": true,
      "Bread Making": true,
      "Tagine Cooking": true,
      "Spice Workshop": true,
      "Mint Tea Ceremony": true,
      "Lunch Included": true,
      "Recipe Booklet": true,
      "Certificate": true,
      "Photos Included": false,
      "Private Class": false
    }
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Full Day Journey",
    price: "800",
    currency: "MAD",
    duration: "8 hours",
    groupSize: "2-6 guests",
    image: "/packages/premium.jpg",
    description: "The ultimate culinary journey from sunrise market to sunset feast. Multiple dishes and culture.",
    highlights: [
      "Complete experience",
      "Multiple dishes",
      "All meals included"
    ],
    features: {
      "Market Visit": true,
      "Bread Making": true,
      "Tagine Cooking": true,
      "Spice Workshop": true,
      "Mint Tea Ceremony": true,
      "Lunch Included": true,
      "Recipe Booklet": true,
      "Certificate": true,
      "Photos Included": true,
      "Private Class": false
    }
  },
  {
    id: "private-chef",
    name: "Private Chef",
    tagline: "Exclusive Experience",
    price: "1500",
    currency: "MAD",
    duration: "6 hours",
    groupSize: "1-4 guests",
    image: "/packages/private-chef.jpg",
    description: "An exclusive private cooking experience with Rabab. Customize your menu and enjoy personalized attention.",
    highlights: [
      "Private with Rabab",
      "Customized menu",
      "Flexible scheduling"
    ],
    features: {
      "Market Visit": true,
      "Bread Making": true,
      "Tagine Cooking": true,
      "Spice Workshop": true,
      "Mint Tea Ceremony": true,
      "Lunch Included": true,
      "Recipe Booklet": true,
      "Certificate": true,
      "Photos Included": true,
      "Private Class": true
    }
  }
];

const PackagesV3: React.FC = memo(() => {
  const [selectedPackage, setSelectedPackage] = useState(packagesData[1]); // Default to Signature

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 mb-6">
            <span className="text-xl">🍲</span>
            <span className="text-sm font-bold text-amber-900 tracking-wider uppercase">
              Cooking Packages
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Select Your{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Package
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare our packages and find the perfect fit for your culinary adventure.
          </p>
        </div>

        {/* Package Selector Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {packagesData.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className={`relative px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                selectedPackage.id === pkg.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  POPULAR
                </span>
              )}
              <span className="block text-lg">{pkg.name}</span>
              <span className={`text-sm ${selectedPackage.id === pkg.id ? 'text-white/80' : 'text-gray-500'}`}>
                {pkg.tagline}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Package Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={selectedPackage.image}
              alt={selectedPackage.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            
            {/* Price Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-white/60 text-sm block">Starting from</span>
                  <span className="text-white text-5xl font-black">{selectedPackage.price}</span>
                  <span className="text-white/60 text-lg ml-2">{selectedPackage.currency}</span>
                </div>
                <div className="text-right text-white/80 text-sm">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <FiClock className="w-4 h-4" />
                    {selectedPackage.duration}
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <FiUsers className="w-4 h-4" />
                    {selectedPackage.groupSize}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <h3 className="text-4xl font-black text-gray-900 mb-4">
              {selectedPackage.name} Package
            </h3>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {selectedPackage.description}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-3 mb-8">
              {selectedPackage.highlights.map((highlight, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold"
                >
                  ✓ {highlight}
                </span>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={`/book?package=${selectedPackage.id}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-fit"
            >
              <span>Book {selectedPackage.name} Package</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
          <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Compare All Packages
          </h4>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Features</th>
                  {packagesData.map((pkg) => (
                    <th 
                      key={pkg.id} 
                      className="text-center py-4 px-4 cursor-pointer transition-all duration-300 hover:bg-amber-50 rounded-t-xl"
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      <div className={`inline-block px-4 py-2 rounded-xl transition-all duration-300 ${
                        selectedPackage.id === pkg.id 
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md' 
                          : ''
                      }`}>
                        <span className={`font-bold block ${
                          selectedPackage.id === pkg.id 
                            ? 'text-white' 
                            : pkg.popular ? 'text-amber-600' : 'text-gray-900'
                        }`}>
                          {pkg.name}
                        </span>
                        <span className={`block text-sm ${
                          selectedPackage.id === pkg.id ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {pkg.price} {pkg.currency}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(packagesData[0].features).map((feature) => (
                  <tr key={feature} className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-700">{feature}</td>
                    {packagesData.map((pkg) => (
                      <td 
                        key={pkg.id} 
                        className={`text-center py-4 px-4 cursor-pointer transition-all duration-300 ${
                          selectedPackage.id === pkg.id 
                            ? 'bg-amber-50' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedPackage(pkg)}
                      >
                        {pkg.features[feature as keyof typeof pkg.features] ? (
                          <FiCheck className={`w-5 h-5 mx-auto ${
                            selectedPackage.id === pkg.id ? 'text-amber-500' : 'text-green-500'
                          }`} />
                        ) : (
                          <FiX className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            All packages include free airport pickup • Private classes available • 
            <Link href="/faq-contact" className="text-amber-600 font-semibold hover:underline ml-1">
              Contact us for custom packages
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
});

PackagesV3.displayName = 'PackagesV3';

export default PackagesV3;
