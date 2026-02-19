'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * GOOGLE REVIEWS SECTION - Elfsight Widget
 * 
 * Displays real Google Reviews using Elfsight embedded widget
 */

const GoogleReviewsSectionV2: React.FC = () => {
  const { t } = useLanguage();
  useEffect(() => {
    // Load Elfsight script
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-16 overflow-hidden bg-white">
      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            {t.reviews.titlePart1}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              {t.reviews.titlePart2}
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto">
            {t.reviews.description}
          </p>
        </div>
      </div>

      {/* Elfsight Widget Container */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div 
          className="elfsight-app-a3d605ad-6647-4f58-98e8-d52fb2c285b9" 
          data-elfsight-app-lazy
        ></div>
      </div>
    </section>
  );
};

export default GoogleReviewsSectionV2;
