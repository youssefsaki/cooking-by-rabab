'use client';

import React from 'react';
import Link from 'next/link';
import packagesData from '@/data/packages.json';

const PackagesPage: React.FC = () => {
  const handleBookPackage = (packageId: number, packageTitle: string) => {
    // Navigate to booking page with package details
    const packageSlug = packageTitle.toLowerCase().replace(/\s+/g, '-');
    window.location.href = `/book?package=${packageSlug}&id=${packageId}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight uppercase text-gray-900 mb-8">
            OUR PACKAGES
          </h1>
          <p className="text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Looking for a full experience of surf, skate and yoga? Book one of our packages so you can get everything out of your time in Morocco.
          </p>
        </div>
      </section>

      {/* Packages Grid Section */}
      <section className="py-20 px-6 lg:px-24" style={{ backgroundColor: '#6B9174' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packagesData.map((pkg) => (
              <article
                key={pkg.id}
                className={`rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  pkg.featured
                    ? 'bg-white shadow-lg' // Featured card - white background
                    : 'bg-opacity-90 shadow-md' // Regular cards - semi-transparent
                }`}
                style={{
                  backgroundColor: pkg.featured ? '#FFFFFF' : 'rgba(82, 124, 91, 0.9)'
                }}
              >
                {/* Package Title */}
                <h2
                  className={`text-xl lg:text-2xl font-bold uppercase tracking-wide mb-4 ${
                    pkg.featured ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  {pkg.title}
                </h2>

                {/* Price */}
                <div className="mb-8">
                  <span
                    className={`text-5xl lg:text-6xl font-extrabold ${
                      pkg.featured ? 'text-green-600' : 'text-white'
                    }`}
                    style={{ color: pkg.featured ? '#6B9174' : '#FFFFFF' }}
                  >
                    € {pkg.price}
                  </span>
                </div>

                {/* Book Button */}
                <div className="mb-8">
                  <button
                    onClick={() => handleBookPackage(pkg.id, pkg.title)}
                    className={`w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 ${
                      pkg.featured
                        ? 'bg-green-600 text-white hover:bg-green-700' // Featured - green button
                        : 'bg-white text-green-600 hover:bg-gray-100' // Regular - white button
                    }`}
                    style={{
                      backgroundColor: pkg.featured ? '#6B9174' : '#FFFFFF',
                      color: pkg.featured ? '#FFFFFF' : '#6B9174'
                    }}
                  >
                    BOOK THIS PACKAGE
                  </button>
                </div>

                {/* Includes Section */}
                <div className="mb-8">
                  <h3
                    className={`text-lg font-bold uppercase tracking-wide mb-4 ${
                      pkg.featured ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    Includes:
                  </h3>
                  <ul className="space-y-3">
                    {pkg.includes.map((item, index) => (
                      <li
                        key={index}
                        className={`flex items-start gap-3 ${
                          pkg.featured ? 'text-gray-700' : 'text-white'
                        }`}
                      >
                        <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                          <svg
                            className="w-full h-full"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm lg:text-base leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prices Section */}
                <div>
                  <h3
                    className={`text-lg font-bold uppercase tracking-wide mb-4 ${
                      pkg.featured ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    Prices
                  </h3>
                  <div className="space-y-3">
                    {pkg.prices.map((price, index) => (
                      <div
                        key={index}
                        className={`text-sm lg:text-base ${
                          pkg.featured ? 'text-gray-700' : 'text-white'
                        }`}
                      >
                        <div className="font-semibold mb-1">{price.duration}</div>
                        <div className="space-y-1">
                          <div>Dormitory: €{price.dormitory}</div>
                          <div>Private room: €{price.private}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;
