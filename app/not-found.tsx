'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiHome, FiBook, FiCalendar, FiArrowRight } from 'react-icons/fi';

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-16">
      <div className="max-w-4xl w-full text-center">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative">
          {/* Icon/Illustration */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-block">
              <div className="relative">
                <span className="text-8xl sm:text-9xl lg:text-[12rem] font-black text-gray-200 select-none">
                  404
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl sm:text-7xl animate-bounce">🍽️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
            {t.notFound.title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.notFound.description}
          </p>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12 max-w-3xl mx-auto">
            <Link
              href="/"
              className="group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-amber-500"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiHome className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{t.notFound.home}</h3>
                <p className="text-sm text-gray-600">{t.notFound.homeDescription}</p>
              </div>
            </Link>

            <Link
              href="/packages"
              className="group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-amber-500"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiBook className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{t.notFound.packages}</h3>
                <p className="text-sm text-gray-600">{t.notFound.packagesDescription}</p>
              </div>
            </Link>

            <Link
              href="/book"
              className="group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-amber-500"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiCalendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{t.notFound.bookNow}</h3>
                <p className="text-sm text-gray-600">{t.notFound.bookNowDescription}</p>
              </div>
            </Link>
          </div>

          {/* Primary CTA */}
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>{t.notFound.returnHome}</span>
            <FiArrowRight className="w-5 h-5" />
          </Link>

          {/* Additional Help Text */}
          <p className="mt-8 sm:mt-10 text-sm text-gray-500">
            {t.notFound.needHelp}{' '}
            <a 
              href="mailto:rababouhadda5@gmail.com" 
              className="text-amber-600 hover:text-amber-700 font-semibold underline"
            >
              rababouhadda5@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
