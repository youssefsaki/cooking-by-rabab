'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * SUPPORTING LOCAL CHILDREN SECTION - Design 4
 * 
 * Design 4: Split Screen Editorial
 * 
 * Aesthetic: Magazine-style, emotional, visual
 * - 50/50 split layout
 * - Large image on one side
 * - Content on the other
 * - Alternating colors
 */

const SupportingChildrenV4: React.FC = memo(() => {
  const { t } = useLanguage();
  return (
    <section className="py-0 overflow-hidden">
      {/* Main Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Left - Image */}
        <div className="relative h-[400px] lg:h-auto">
          <Image
            src="/community/children-school.jpg"
            alt="Taghazout cooking class supports local children — community impact from Berber village cooking experience Tamsoult Morocco"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          
          {/* Floating Stats */}
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl lg:text-3xl font-black text-amber-600">10+</div>
                <p className="text-xs text-gray-600">{t.community.children}</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl lg:text-3xl font-black text-amber-600">100%</div>
                <p className="text-xs text-gray-600">{t.community.tipsDonated}</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl lg:text-3xl font-black text-amber-600">4</div>
                <p className="text-xs text-gray-600">{t.community.schools}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-10 lg:p-16 flex flex-col justify-center">
          <div className="max-w-lg">
            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-white text-sm font-bold uppercase tracking-wider mb-6">
              ❤️ {t.community.badge}
            </span>
            
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              {t.community.title}
            </h2>
            
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              {t.community.description}
            </p>

            <div className="space-y-4 mb-8">
              {t.community.impactItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-white">
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-amber-600 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <FiHeart className="w-5 h-5" />
              <span>{t.community.bookGiveBack}</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quote Bar */}
      <div className="bg-gray-900 py-10 lg:py-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <div className="text-4xl text-amber-500 font-serif mb-4">&ldquo;</div>
          <blockquote className="text-xl lg:text-2xl text-white font-medium italic mb-4 leading-relaxed">
            {t.community.quote}
          </blockquote>
          <cite className="text-amber-400 font-bold not-italic">— Rabab</cite>
        </div>
      </div>
    </section>
  );
});

SupportingChildrenV4.displayName = 'SupportingChildrenV4';

export default SupportingChildrenV4;
