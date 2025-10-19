'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import packagesData from '@/data/packages.json';

const PackagesPage: React.FC = () => {
  const [highlightedPackage, setHighlightedPackage] = useState<string | null>(null);

  useEffect(() => {
    // Check URL parameters for package highlighting
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    if (type) {
      setHighlightedPackage(type);
    }
  }, []);

  const getPackageHighlightClass = (packageId: number) => {
    const packageMap: Record<number, string> = {
      1: 'yoga',
      2: 'surf-skate', 
      3: 'complete'
    };
    
    const packageType = packageMap[packageId];
    if (highlightedPackage && packageType === highlightedPackage) {
      return 'ring-4 ring-yellow-400 ring-opacity-50 scale-105';
    }
    return '';
  };
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
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight uppercase text-dark-blue mb-8">
            OUR PACKAGES
          </h1>
          <p className="text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Looking for a full experience of surf, skate and yoga? Book one of our packages so you can get everything out of your time in Morocco.
          </p>
        </div>
      </section>

      {/* Packages Grid Section */}
      <section className="py-20 px-6 lg:px-24" style={{ backgroundColor: '#ffc414' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packagesData.map((pkg) => (
              <article
                key={pkg.id}
                id={`packages-section`}
                className={`rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:scale-102 hover:shadow-xl ${getPackageHighlightClass(pkg.id)} ${
                  pkg.featured
                    ? 'bg-white shadow-lg' // Featured card - white background
                    : 'bg-opacity-90 shadow-md' // Regular cards - semi-transparent
                }`}
                style={{
                  backgroundColor: pkg.featured ? '#FFFFFF' : 'rgba(24, 173, 181, 0.9)'
                }}
              >
                {/* Package Title */}
                <h2
                  className={`text-xl lg:text-2xl font-bold uppercase tracking-wide mb-4 ${
                    pkg.featured ? 'text-dark-blue' : 'text-white'
                  }`}
                >
                  {pkg.title}
                </h2>

                {/* Price */}
                <div className="mb-8">
                  <span
                    className={`text-5xl lg:text-6xl font-extrabold ${
                      pkg.featured ? 'text-primary' : 'text-white'
                    }`}
                    style={{ color: pkg.featured ? '#ffc414' : '#FFFFFF' }}
                  >
                    € {pkg.price}
                  </span>
                </div>

                {/* Book Button */}
                <div className="mb-8">
                  <button
                    onClick={() => handleBookPackage(pkg.id, pkg.title)}
                    className={`w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 hover:scale-102 ${
                      pkg.featured
                        ? 'bg-primary hover:bg-primary-dark' // Featured - golden button
                        : 'bg-white text-primary hover:bg-gray-100' // Regular - white button
                    }`}
                    style={{
                      backgroundColor: pkg.featured ? '#ffc414' : '#FFFFFF',
                      color: pkg.featured ? '#084869' : '#ffc414'
                    }}
                  >
                    BOOK THIS PACKAGE
                  </button>
                </div>

                {/* Includes Section */}
                <div className="mb-8">
                  <h3
                    className={`text-lg font-bold uppercase tracking-wide mb-4 ${
                      pkg.featured ? 'text-dark-blue' : 'text-white'
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
                      pkg.featured ? 'text-dark-blue' : 'text-white'
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

      {/* Professional Features Section */}
      <section className="py-20 px-6 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight uppercase text-dark-blue mb-6">
              WHY CHOOSE OUR PACKAGES?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of adventure, relaxation, and cultural immersion in Morocco&apos;s most beautiful coastal region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Professional Feature 1 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-dark transition-colors duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">Expert Instructors</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from certified surf, skate, and yoga instructors with years of experience in Morocco&apos;s best spots.
              </p>
            </div>

            {/* Professional Feature 2 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-dark transition-colors duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">All-Inclusive Experience</h3>
              <p className="text-gray-600 leading-relaxed">
                Everything you need is included: accommodation, meals, equipment, transport, and unforgettable activities.
              </p>
            </div>

            {/* Professional Feature 3 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-dark transition-colors duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">Prime Location</h3>
              <p className="text-gray-600 leading-relaxed">
                Located in the heart of Tamraght, just minutes from world-class surf breaks and cultural attractions.
              </p>
            </div>

            {/* Professional Feature 4 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-dark transition-colors duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">Memorable Experiences</h3>
              <p className="text-gray-600 leading-relaxed">
                Create lifelong memories with rooftop BBQs, movie nights, cooking classes, and day trips to Paradise Valley.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-dark-blue mb-4">
                Ready to Start Your Moroccan Adventure?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join hundreds of travelers who have experienced the magic of Cactus Surf & Skate House. 
                Book your package today and get ready for an unforgettable journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/houseandrooms'}
                  className="px-8 py-4 bg-primary font-bold uppercase tracking-wide rounded-xl hover:bg-primary-dark transition-colors duration-300" style={{ color: '#084869' }}
                >
                  View Our Rooms
                </button>
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="px-8 py-4 bg-transparent border-2 border-primary font-bold uppercase tracking-wide rounded-xl hover:bg-primary hover:shadow-lg hover:scale-105 transition-all duration-300" style={{ color: '#084869' }}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;
