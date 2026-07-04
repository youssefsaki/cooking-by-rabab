'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import en from '@/lib/translations/en.json';

const activityImages = [
  '/packages/basic.jpg',
  '/experiences/tajine.jpg',
  '/experiences/oven-bread.jpg',
  '/packages/weekly.jpeg',
  '/journey/journey-1.jpeg',
  '/our-story/meet-the-chef/meet-the-chef.jpg',
] as const;

const activityLinks = [
  '/book',
  '/experiences#tajine-masterclass',
  '/experiences#clay-oven-bread',
  '/events',
  '/ourstory/location',
  '/ourstory/meet-the-chef',
] as const;

const ThingsToDoSection: React.FC = memo(() => {
  const { t } = useLanguage();
  const thingsToDo = t.thingsToDo ?? en.thingsToDo;

  return (
    <section
      id="things-to-do-taghazout"
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-amber-50/40 to-white overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border border-amber-100 text-xs font-bold text-amber-800 uppercase tracking-wider mb-5">
            {thingsToDo.badge}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-5 leading-tight">
            {thingsToDo.title}
          </h2>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {thingsToDo.description}
          </p>
        </div>

        {/* Activity Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {thingsToDo.activities.map((activity, index) => (
            <Link
              key={activity.id}
              href={activityLinks[index]}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-amber-100 hover:shadow-2xl hover:border-amber-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <Image
                  src={activityImages[index]}
                  alt={activity.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 text-2xl" aria-hidden="true">
                  {activity.emoji}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {activity.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 group-hover:text-amber-700">
                  {thingsToDo.learnMore}
                  <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {thingsToDo.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:scale-105"
            >
              {thingsToDo.bookCookingClass}
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/experiences"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-bold px-8 py-4 rounded-full border-2 border-gray-200 hover:border-amber-500 transition-all duration-300 shadow-lg hover:scale-105"
            >
              {thingsToDo.viewAllExperiences}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

ThingsToDoSection.displayName = 'ThingsToDoSection';

export default ThingsToDoSection;
