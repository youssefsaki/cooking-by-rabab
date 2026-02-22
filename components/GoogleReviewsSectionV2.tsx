'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * GOOGLE REVIEWS SECTION - Elfsight Widget
 * 
 * Displays real Google Reviews using Elfsight embedded widget
 */

const GoogleReviewsSectionV2: React.FC = () => {
  const { t } = useLanguage();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    let mounted = true;

    const loadScript = async () => {
      try {
        // Check if script already exists
        const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
        
        if (existingScript) {
          if (mounted) setScriptLoaded(true);
          return;
        }

        // TEMPORARILY DISABLED - Testing if this causes iOS Safari crash
        console.log('Elfsight script loading disabled for debugging');
        if (mounted) setScriptLoaded(true); // Pretend it loaded
        return;

        // Load Elfsight script
        script = document.createElement('script');
        script.src = 'https://elfsightcdn.com/platform.js';
        script.async = true;
        
        script.onload = () => {
          if (mounted) setScriptLoaded(true);
        };
        
        script.onerror = (error) => {
          console.error('Failed to load Elfsight script:', error);
          if (mounted) setScriptLoaded(false);
        };
        
        document.body.appendChild(script);
      } catch (error) {
        console.error('Error loading script:', error);
      }
    };

    loadScript();

    return () => {
      mounted = false;
      // Cleanup script on unmount
      if (script && document.body.contains(script)) {
        try {
          document.body.removeChild(script);
        } catch (error) {
          console.error('Error removing script:', error);
        }
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
        {scriptLoaded ? (
          <div 
            className="elfsight-app-a3d605ad-6647-4f58-98e8-d52fb2c285b9" 
            data-elfsight-app-lazy
          ></div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading reviews...</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GoogleReviewsSectionV2;
