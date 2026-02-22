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
  const [scriptFailed, setScriptFailed] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    let mounted = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const loadScript = () => {
      try {
        const existingScript = document.querySelector('script[src*="elfsight"]');
        if (existingScript) {
          if (mounted) setScriptLoaded(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://static.elfsight.com/platform/platform.js';
        script.async = true;
        script.defer = true;

        timeoutId = setTimeout(() => {
          if (mounted && !scriptLoaded) {
            setScriptFailed(true);
          }
        }, 15000);

        script.onload = () => {
          clearTimeout(timeoutId);
          if (mounted) setScriptLoaded(true);
        };

        script.onerror = () => {
          clearTimeout(timeoutId);
          if (mounted) setScriptFailed(true);
        };

        document.head.appendChild(script);
      } catch {
        if (mounted) setScriptFailed(true);
      }
    };

    loadScript();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div className="elfsight-app-a3d605ad-6647-4f58-98e8-d52fb2c285b9"></div>
        ) : scriptFailed ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <p className="text-gray-500 text-sm">{t.googleReviews.unavailable}</p>
              <a
                href="https://www.google.com/search?q=taghazout+cooking+class+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 text-sm font-semibold hover:underline mt-2 inline-block"
              >
                {t.googleReviews.seeOnGoogle}
              </a>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500 mx-auto mb-3"></div>
              <p className="text-gray-600 text-sm">{t.googleReviews.loading}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GoogleReviewsSectionV2;
