'use client';

import React, { useEffect } from 'react';

/**
 * GOOGLE REVIEWS SECTION - Taggbox Widget
 * 
 * Displays real Google Reviews using Taggbox embedded widget
 */

const GoogleReviewsSectionV2: React.FC = () => {
  useEffect(() => {
    // Load Taggbox script
    const script = document.createElement('script');
    script.src = 'https://widget.taggbox.com/embed.min.js';
    script.type = 'text/javascript';
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
    <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-0 overflow-hidden bg-white">
      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            What Our{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Guests Say
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto">
            Real experiences from travelers who joined our cooking classes
          </p>
        </div>
      </div>

      {/* Taggbox Widget Container */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 mb-0 pb-0">
        <div 
          className="taggbox" 
          style={{ width: '100%', height: '600px', overflow: 'auto', marginBottom: 0, paddingBottom: 0 }} 
          data-widget-id="316672" 
          data-website="1"
        ></div>
      </div>
    </section>
  );
};

export default GoogleReviewsSectionV2;
