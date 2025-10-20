'use client';

import React from 'react';
import Image from 'next/image';
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
      <section className="pt-32 pb-16 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          {/* Modern Title Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 mb-8">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight uppercase text-dark-blue mb-4">
              OUR HOUSE & ROOMS
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Discover our carefully designed spaces where comfort meets adventure. Experience the warmth of our community and create unforgettable moments in Morocco&apos;s most welcoming surf house.
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      {houseAndRoomsData.map((section, index) => (
        <section key={section.id} className="py-16 px-6 lg:px-24 relative">
          {/* Section Background */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
              section.layout === 'text-left-image-right' ? 'lg:grid-cols-2' : 'lg:grid-cols-2'
            }`}>
              
              {/* Text Content */}
              <div className={`${
                section.layout === 'image-left-text-right' ? 'lg:order-2' : 'lg:order-1'
              }`}>
                {/* Modern Text Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                {/* Main Title */}
                <h2 
                  className="text-3xl lg:text-4xl font-extrabold uppercase tracking-tight mb-6"
                  style={{ color: section.titleColor }}
                >
                  {section.title}
                </h2>

                {/* Subtitle for Our House section */}
                {section.subtitle && (
                  <h3 className="text-xl lg:text-2xl font-bold uppercase text-dark-blue mb-4">
                    {section.subtitle}
                  </h3>
                )}

                {/* Description */}
                <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8">
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
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold uppercase text-dark-blue mb-4">
                      INCLUDED:
                    </h4>
                    <ul className="space-y-3">
                      {section.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="w-5 h-5 flex-shrink-0 mt-0.5">
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
                          <span className="text-dark-blue font-bold text-sm lg:text-base">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Included List */}
                {section.included && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold uppercase text-dark-blue mb-4">
                      INCLUDED:
                    </h4>
                    <ul className="space-y-3">
                      {section.included.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-5 h-5 flex-shrink-0 mt-0.5">
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
                          <span className="text-dark-blue font-bold text-sm lg:text-base">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                </div>
              </div>

              {/* Image Content */}
              <div className={`${
                section.layout === 'image-left-text-right' ? 'lg:order-1' : 'lg:order-2'
              }`}>
                {section.images.length === 1 ? (
                  // Single image display
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={section.images[0]}
                      alt={section.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
      </div>
    </div>
  );
};

export default HouseAndRoomsPage;
