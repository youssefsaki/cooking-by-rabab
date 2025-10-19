'use client';

import React from 'react';
import Image from 'next/image';
import ImageSlider from '@/components/ImageSlider';
import houseAndRoomsData from '@/data/houseandrooms.json';

const HouseAndRoomsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Title */}
      <section className="pt-32 pb-16 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight uppercase text-dark-blue mb-8">
            OUR HOUSE & ROOMS
          </h1>
        </div>
      </section>

      {/* Sections */}
      {houseAndRoomsData.map((section, index) => (
        <section key={section.id} className="py-16 px-6 lg:px-24 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
              section.layout === 'text-left-image-right' ? 'lg:grid-cols-2' : 'lg:grid-cols-2'
            }`}>
              
              {/* Text Content */}
              <div className={`${
                section.layout === 'image-left-text-right' ? 'lg:order-2' : 'lg:order-1'
              }`}>
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
  );
};

export default HouseAndRoomsPage;
