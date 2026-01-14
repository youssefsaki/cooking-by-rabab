'use client';

import React, { memo, useState } from 'react';
import { FiChevronDown, FiHelpCircle, FiSearch } from 'react-icons/fi';
import faqsData from '@/data/faqs.json';

/**
 * FAQ SECTION - Design 1 of 3
 * 
 * Design 1: Accordion with Categories & Search
 * 
 * Aesthetic: Clean, accessible accordion
 * - Categorized FAQs
 * - Search functionality
 * - Smooth accordion animations
 * - SEO-optimized (FAQPage schema ready)
 * - Mobile-friendly
 */

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQSection: React.FC = memo(() => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = faqsData.categories;
  const faqs = faqsData.faqs as FAQ[];

  // Filter FAQs by category and search
  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-indigo-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 mb-6">
            <FiHelpCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-900 tracking-wider uppercase">
              FAQ
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Got{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Questions?
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find answers to the most common questions about our retreats, bookings, and experiences.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative max-w-xl mx-auto">
            <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <div 
                key={faq.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 sm:px-8 sm:py-6 flex items-start justify-between gap-4 text-left"
                >
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-relaxed">
                      {faq.question}
                    </h3>
                    {openFAQ !== faq.id && (
                      <span className="inline-block mt-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                        {faq.category}
                      </span>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openFAQ === faq.id 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rotate-180' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <FiChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </button>

                {/* Answer */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ${
                    openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiHelpCircle className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No FAQs Found</h3>
              <p className="text-gray-600">
                Try a different search term or browse all categories.
              </p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 lg:p-12 shadow-xl border border-blue-100">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              Our team is here to help! Reach out and we'll get back to you as soon as possible.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/faq-contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span>Contact Us</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              
              <a 
                href="mailto:info@example.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-300"
              >
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

FAQSection.displayName = 'FAQSection';

export default FAQSection;
