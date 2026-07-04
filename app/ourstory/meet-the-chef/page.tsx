'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

// SEO optimized for Moroccan cooking class, Amazigh culture, Taghazout experiences
export default function MeetTheChefPage() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Optimized for 13" */}
      <section className="pt-28 pb-12 px-6 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-lg border border-amber-200 mb-4">
            <span className="text-xl">👩‍🍳</span>
            <span className="text-xs font-bold text-amber-900 tracking-wider uppercase">
              {t.ourStory.meetTheChef.badge}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
            {t.ourStory.meetTheChef.title}{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              {t.ourStory.meetTheChef.titleHighlight}
            </span>
          </h1>
        </div>
      </section>

      {/* Main Content - Optimized for 13" */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image Placeholder */}
            <div className="relative h-[932px] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-200">
              <Image
                src="/our-story/meet-the-chef/meet-the-chef.jpg"
                alt="Rabab — Taghazout cooking class host and Berber cultural guide in Atlas Mountains Morocco"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Story Content */}
            <div className="space-y-5">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-3">
                  Hello, I&apos;m Rabab
                </h2>
                <div className="w-14 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mb-5"></div>
              </div>

              <div className="prose prose-base max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                  {t.ourStory.meetTheChef.paragraph1}
                </p>

                <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                  {t.ourStory.meetTheChef.paragraph2}
                </p>

                <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                  {t.ourStory.meetTheChef.paragraph3}
                </p>

                <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                  {t.ourStory.meetTheChef.paragraph4}
                </p>

                <p className="text-gray-700 leading-relaxed font-semibold text-amber-700 text-sm sm:text-base">
                  {t.ourStory.meetTheChef.paragraph5}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Optimized for 13" */}
      <section className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            {t.ourStory.meetTheChef.ctaTitle}{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              {t.ourStory.meetTheChef.ctaTitleHighlight}
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {t.ourStory.meetTheChef.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-xl hover:scale-105"
            >
              <span>{t.ourStory.meetTheChef.bookYourClass}</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 font-bold px-8 py-4 rounded-full border-2 border-gray-200 hover:border-amber-500 transition-all duration-300 shadow-lg"
            >
              <span>{t.ourStory.meetTheChef.viewPackages}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
