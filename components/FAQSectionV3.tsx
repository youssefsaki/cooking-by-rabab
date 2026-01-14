'use client';

import React, { memo, useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import faqsData from '@/data/faqs.json';

/**
 * FAQ SECTION - Design 3 of 3
 * 
 * Design 3: Minimalist Fullwidth Accordion
 * 
 * Aesthetic: Clean, editorial, magazine-style
 * - Large numbers for each FAQ
 * - Full-width accordion items
 * - Hover animations
 * - No categories (all shown)
 * - Plus/minus toggle icons
 * - Large typography
 */

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQSectionV3: React.FC = memo(() => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs = faqsData.faqs as FAQ[];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-amber-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 pb-8 border-b-2 border-gray-700">
          <div>
            <p className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">
              Got Questions?
            </p>
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none">
              FAQ
            </h2>
          </div>
          
          <p className="text-lg text-gray-400 max-w-md leading-relaxed lg:text-right">
            Everything you need to know about our traditional Moroccan cooking classes with Rabab.
          </p>
        </div>

        {/* FAQ List */}
        <div className="divide-y divide-gray-700">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id}
              className="group"
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                className="w-full py-8 lg:py-10 flex items-start gap-6 lg:gap-10 text-left transition-all duration-300 hover:bg-white/5 px-4 -mx-4 rounded-lg"
              >
                {/* Number */}
                <div className="flex-shrink-0">
                  <span className={`text-4xl lg:text-5xl font-black transition-colors duration-300 ${
                    expandedFAQ === faq.id 
                      ? 'text-amber-500' 
                      : 'text-gray-600 group-hover:text-amber-400'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Question */}
                <div className="flex-1 pt-2">
                  <h3 className={`text-xl lg:text-2xl font-bold leading-snug transition-colors duration-300 ${
                    expandedFAQ === faq.id 
                      ? 'text-amber-400' 
                      : 'text-white group-hover:text-amber-300'
                  }`}>
                    {faq.question}
                  </h3>
                  
                  {/* Category Tag */}
                  <span className="inline-block mt-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {faq.category}
                  </span>
                </div>

                {/* Toggle Icon */}
                <div className="flex-shrink-0 pt-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    expandedFAQ === faq.id 
                      ? 'bg-amber-500 text-white rotate-0' 
                      : 'bg-gray-700 text-gray-400 group-hover:bg-amber-500/20 group-hover:text-amber-400'
                  }`}>
                    {expandedFAQ === faq.id ? (
                      <FiMinus className="w-6 h-6" />
                    ) : (
                      <FiPlus className="w-6 h-6" />
                    )}
                  </div>
                </div>
              </button>

              {/* Answer */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedFAQ === faq.id 
                  ? 'max-h-96 opacity-100 pb-8' 
                  : 'max-h-0 opacity-0 pb-0'
              }`}>
                <div className="pl-16 lg:pl-24 pr-20">
                  <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 lg:p-8 border-l-4 border-amber-500">
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 pt-12 border-t-2 border-gray-700">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl lg:text-4xl font-black text-white mb-2">
                Still have questions?
              </h3>
              <p className="text-lg text-gray-400">
                Rabab would love to hear from you personally.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/faq-contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 group"
              >
                <span>Contact Rabab</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              
              <a 
                href="/book"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-white font-bold text-lg rounded-full border-2 border-gray-600 hover:border-amber-500 hover:text-amber-400 transition-all duration-300"
              >
                <span>Book a Class</span>
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { number: '15+', label: 'Years Experience' },
            { number: '500+', label: 'Happy Students' },
            { number: '50+', label: 'Traditional Recipes' },
            { number: '5★', label: 'Google Rating' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all duration-300"
            >
              <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

FAQSectionV3.displayName = 'FAQSectionV3';

export default FAQSectionV3;
