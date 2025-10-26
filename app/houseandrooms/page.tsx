'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImageSlider from '@/components/ImageSlider';
import houseAndRoomsData from '@/data/houseandrooms.json';

const HouseAndRoomsPage: React.FC = () => {
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
      {/* Page Title */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          {/* Modern Title Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-white/50 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase text-dark-blue mb-3 sm:mb-4">
              OUR HOUSE & ROOMS
            </h1>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full mb-4 sm:mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Discover our carefully designed spaces where comfort meets adventure. We offer <strong>4 private rooms</strong> and <strong>2 shared dorms</strong> (4-bed & 6-bed) to suit every traveler&apos;s needs. Experience the warmth of our community and create unforgettable moments in Morocco&apos;s most welcoming surf house.
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      {houseAndRoomsData.map((section, index) => (
        <section key={section.id} className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-24 relative">
          {/* Section Background */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center ${
              section.layout === 'text-left-image-right' ? 'lg:grid-cols-2' : 'lg:grid-cols-2'
            }`}>
              
              {/* Text Content */}
              <div className={`${
                section.layout === 'image-left-text-right' ? 'lg:order-2' : 'lg:order-1'
              }`}>
                {/* Modern Text Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-white/50">
                {/* Main Title */}
                <h2 
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight mb-3 sm:mb-4 md:mb-6"
                  style={{ color: section.titleColor }}
                >
                  {section.title}
                </h2>

                {/* Subtitle for Our House section */}
                {section.subtitle && (
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold uppercase text-dark-blue mb-3 sm:mb-4">
                    {section.subtitle}
                  </h3>
                )}

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8">
                  {section.description.split('\n').map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {line.includes('**') ? (
                        line.split('**').map((part, partIndex) => 
                          partIndex % 2 === 1 ? (
                            <strong key={partIndex} className="font-bold">{part}</strong>
                          ) : (
                            part
                          )
                        )
                      ) : (
                        line
                      )}
                      {lineIndex < section.description.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>

                {/* Features List */}
                {section.features && (
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg font-bold uppercase text-dark-blue mb-3 sm:mb-4">
                      INCLUDED:
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {section.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5">
                            <svg
                              className="w-full h-full text-dark-blue"
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
                          <span className="text-dark-blue font-bold text-xs sm:text-sm lg:text-base">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Included List */}
                {section.included && (
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg font-bold uppercase text-dark-blue mb-3 sm:mb-4">
                      INCLUDED:
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {section.included.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 sm:gap-3">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5">
                            <svg
                              className="w-full h-full text-dark-blue"
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
                          <span className="text-dark-blue font-bold text-xs sm:text-sm lg:text-base">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Book Now Button - For all sections */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <Link 
                    href="/book"
                    className="group relative inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 text-dark-blue font-semibold text-xs sm:text-sm uppercase tracking-wide rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50 cursor-pointer"
                    style={{ backgroundColor: '#ffc414' }}
                  >
                    {/* Button Background Effect */}
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundColor: '#e6b012' }}></div>
                    
                    {/* Button Content */}
                    <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                      <svg 
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                      </svg>
                      <span className="hidden xs:inline">BOOK NOW</span>
                      <span className="xs:hidden">BOOK</span>
                      <svg 
                        className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M13 7l5 5m0 0l-5 5m5-5H6" 
                        />
                      </svg>
                    </span>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </Link>
                </div>
                </div>
              </div>

              {/* Image Content */}
              <div className={`${
                section.layout === 'image-left-text-right' ? 'lg:order-1' : 'lg:order-2'
              }`}>
                {section.images.length === 1 ? (
                  // Single image display
                  <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={section.images[0]}
                      alt={section.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index === 0}
                    />
                  </div>
                ) : (
                  // Image slider
                  <ImageSlider 
                    images={section.images} 
                    alt={section.title}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Call-to-Action Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl border border-white/50 text-center">
            
            {/* House Icon */}
            <div className="mb-8 sm:mb-10">
              <div className="relative inline-block">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl sm:rounded-2xl blur-lg opacity-30 -z-10"></div>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Ready to Make Yourself at Home?
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Join our community of travelers and surfers in the heart of Morocco. Choose from our <strong>4 private rooms</strong> or <strong>2 shared dorms</strong> (4-bed & 6-bed) for your perfect stay.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-10 sm:mb-12">
              {/* Check Availability Button */}
              <Link 
                href="/book"
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50 cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Check Availability
                </span>
              </Link>

              {/* Contact Us Button */}
              <Link 
                href="/faq-contact"
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-yellow-400 hover:bg-gray-50 text-yellow-400 font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50 cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  Contact Us
                </span>
              </Link>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Safe & Secure */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-md">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-medium text-gray-700">Safe & Secure</span>
              </div>

              {/* Free WiFi */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-md">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1,9L2.4,10.4C5.4,7.4 9,7.4 12,10.4C15,7.4 18.6,7.4 21.6,10.4L23,9C19.1,5.1 13.5,5.1 9.5,9C5.5,5.1 0,5.1 1,9M1,13L2.4,14.4C4.2,12.6 6.4,12.6 8.2,14.4C10,12.6 12.2,12.6 14,14.4C15.8,12.6 18,12.6 19.8,14.4L21.2,13C18.3,10.1 13.7,10.1 10.8,13C7.9,10.1 3.3,10.1 1,13M9.5,17C7.6,15.1 4.4,15.1 2.5,17L3.9,18.4C5.1,17.2 6.9,17.2 8.1,18.4C9.3,17.2 11.1,17.2 12.3,18.4C13.5,17.2 15.3,17.2 16.5,18.4L17.9,17C16,15.1 12.8,15.1 10.9,17C9,15.1 5.8,15.1 3.9,17L9.5,17Z"/>
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-medium text-gray-700">Free WiFi</span>
              </div>

              {/* Daily Breakfast */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-600 rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-md">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"/>
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-medium text-gray-700">Daily Breakfast</span>
              </div>

              {/* 24/7 Check-in */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-md">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-medium text-gray-700">24/7 Check-in</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default HouseAndRoomsPage;
