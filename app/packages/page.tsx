'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import womenPackagesData from '@/data/women-packages.json';

// Lazy load booking form for better initial page load
const PackageBookingForm = dynamic(() => import('@/components/booking/PackageBookingForm'), {
  loading: () => null,
  ssr: false,
});

interface SelectedPackage {
  id: number;
  title: string;
  duration: string;
}

const PackagesPage: React.FC = () => {
  const [highlightedPackage, setHighlightedPackage] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null);

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
  const handleBookPackage = (pkg: any) => {
    // Open booking form modal with package details
    setSelectedPackage({
      id: pkg.id,
      title: pkg.title,
      duration: pkg.duration,
    });
  };

  const handleCloseBooking = () => {
    setSelectedPackage(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-amber-50/80 to-orange-50/60"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-white/40 via-transparent to-yellow-100/30"></div>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-gradient-to-br from-yellow-300 to-amber-300 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">

      {/* Packages Section - Single View */}
      <section className="pt-36 pb-8 px-6 lg:px-24 relative">
        {/* Section Background - Smooth Yellow Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-amber-50/80 to-orange-50/60"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-white/40 via-transparent to-yellow-100/30"></div>
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-gradient-to-br from-yellow-300 to-amber-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 mb-8">
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight uppercase text-dark-blue mb-4">
                ADVENTURE PACKAGES
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full mb-6"></div>
              <p className="text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Experience the perfect blend of adventure, relaxation, and cultural immersion in Morocco&apos;s most beautiful coastal region. 
                Choose from our carefully curated packages designed for every type of traveler.
              </p>
            </div>
          </div>

          {/* Packages Grid - Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
            {womenPackagesData.map((pkg: any) => (
              <article
                key={`women-${pkg.id}`}
                className={`rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:scale-102 hover:shadow-xl flex flex-col ${
                  pkg.featured
                    ? 'bg-white/90 backdrop-blur-sm shadow-lg border border-white/50' // Featured card - glass effect
                    : 'bg-gradient-to-br from-pink-50/90 to-purple-50/90 backdrop-blur-sm shadow-md border border-pink-200/30' // Regular cards - pink gradient
                }`}
              >
                {/* Package Title */}
                <h3 className="text-xl lg:text-2xl font-bold uppercase tracking-wide mb-2 text-dark-blue">
                  {pkg.title}
                </h3>
                
                {/* Duration */}
                <p className="text-sm text-gray-600 mb-4 font-medium">{pkg.duration}</p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-4xl lg:text-5xl font-extrabold text-dark-blue">
                    € {pkg.price}
                  </span>
                </div>

                {/* Book Button */}
                <div className="mb-8">
                  <button
                    onClick={() => handleBookPackage(pkg)}
                    className="w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wide transition-all duration-150 hover:scale-102 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 shadow-lg hover:shadow-xl"
                    style={{ color: '#094166' }}
                  >
                    BOOK THIS PACKAGE
                  </button>
                </div>

                {/* Includes Section */}
                <div className="flex-grow">
                  <h4 className="text-lg font-bold uppercase tracking-wide mb-4 text-dark-blue">
                    Includes:
                  </h4>
                  <ul className="space-y-3">
                    {pkg.includes.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                          <svg
                            className="w-full h-full text-yellow-500"
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
                <div className="mt-8">
                  <h4 className="text-lg font-bold uppercase tracking-wide mb-4 text-dark-blue">
                    Prices
                  </h4>
                  <div className="space-y-3">
                    {pkg.prices.map((price: any, index: number) => (
                      <div key={index} className="text-sm lg:text-base text-gray-700">
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

          {/* Compact Features Section */}
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
            <h3 className="text-xl font-bold text-dark-blue mb-6 text-center">
              Why Choose Our Adventure Packages?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-dark-blue mb-2">Community & Connection</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Connect with like-minded travelers in a safe, supportive environment.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-dark-blue mb-2">Healing & Wellness</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Transformative healing through Reiki, sound baths, and meditation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h2zm0 0h8m-8 0H4a1 1 0 00-1 1v14a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1h-2M9 9h6m-6 4h6m-2 4h2" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-dark-blue mb-2">Creative Expression</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Explore creativity through painting, journaling, and workshops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adventure Separator Section */}
      <div className="relative py-12 lg:py-16 overflow-hidden group hover:py-14 lg:hover:py-18 transition-all duration-150">
        {/* Gradient Background - Same as Package Buttons */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:from-yellow-500 group-hover:to-amber-600 transition-all duration-150"></div>
        
        {/* Shadow Effect */}
        <div className="absolute inset-0 shadow-lg group-hover:shadow-xl transition-all duration-150"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-white/50 rounded-full animate-pulse"></div>
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white/45 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-1/2 left-1/3 w-1 h-1 bg-white/55 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-24 text-center">
          {/* Adventure Icon */}
          <div className="mb-6 group-hover:scale-105 transition-transform duration-150">
            <div className="inline-flex items-center justify-center relative">
              {/* Glow Ring */}
              <div className="absolute w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
              
              {/* Adventure Compass Icon */}
              <div className="relative z-10">
                <svg className="w-8 h-8 text-dark-blue drop-shadow-lg animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Decorative Lines */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-6">
              <div className="w-16 h-px bg-dark-blue/60"></div>
              <div className="w-2 h-2 bg-dark-blue/80 rotate-45"></div>
              <div className="w-16 h-px bg-dark-blue/60"></div>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-2 group-hover:space-y-3 transition-all duration-150">
            <h3 className="text-2xl lg:text-3xl font-black text-dark-blue tracking-wide uppercase drop-shadow-lg group-hover:text-3xl lg:group-hover:text-4xl transition-all duration-150">
              ADVENTURE
            </h3>
            <h4 className="text-lg lg:text-xl font-bold text-dark-blue/90 tracking-wide drop-shadow group-hover:text-xl lg:group-hover:text-2xl transition-all duration-150">
              Awaits Your Journey
            </h4>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-1 h-1 bg-dark-blue/60 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-dark-blue/80 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-dark-blue/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="mt-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-dark-blue/40 to-transparent mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Professional Features Section */}
      <section className="py-20 px-6 lg:px-24 relative">
        {/* Section Background */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            {/* Modern Title Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 mb-8">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight uppercase text-dark-blue mb-4">
                WHY CHOOSE OUR PACKAGES?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Experience the perfect blend of adventure, relaxation, and cultural immersion in Morocco&apos;s most beautiful coastal region.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Professional Feature 1 */}
            <div className="text-center group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
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
            <div className="text-center group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
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
            <div className="text-center group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
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
            <div className="text-center group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
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
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-xl border border-white/50 max-w-4xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-dark-blue mb-4">
                Ready to Start Your Moroccan Adventure?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join hundreds of travelers who have experienced the magic of Playa Surf House. 
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

      {/* Booking Form Modal */}
      {selectedPackage && (
        <PackageBookingForm
          packageType={selectedPackage.title}
          packageName={selectedPackage.title}
          packageDuration={selectedPackage.duration}
          onClose={handleCloseBooking}
        />
      )}
    </div>
  );
};

export default PackagesPage;
