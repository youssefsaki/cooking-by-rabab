'use client';

import React, { memo, useState } from 'react';
import { FiChevronRight, FiMessageCircle, FiPhone, FiMail } from 'react-icons/fi';
import faqsData from '@/data/faqs.json';

/**
 * FAQ SECTION - Design 2 of 3
 * 
 * Design 2: Two-Column Card Layout with Side Navigation
 * 
 * Aesthetic: Modern, warm cooking theme
 * - Left sidebar with categories
 * - Right side with FAQ cards
 * - Amber/orange cooking theme colors
 * - Click-to-expand cards
 * - Contact sidebar
 */

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const categoryIcons: { [key: string]: string } = {
  'All': '📋',
  'Booking': '📅',
  'Classes': '👩‍🍳',
  'Location': '📍',
  'Food': '🍲',
  'General': '❓'
};

const FAQSectionV2: React.FC = memo(() => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = faqsData.categories;
  const faqs = faqsData.faqs as FAQ[];

  // Filter FAQs by category
  const filteredFAQs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 mb-6">
            <span className="text-2xl">❓</span>
            <span className="text-sm font-bold text-amber-900 tracking-wider uppercase">
              Frequently Asked Questions
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Everything You{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Need to Know
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Questions about our cooking classes? We've got the answers!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <FiMessageCircle className="w-4 h-4 text-white" />
                </span>
                Categories
              </h3>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-amber-50 hover:text-amber-700'
                    }`}
                  >
                    <span className="text-xl">{categoryIcons[category] || '📋'}</span>
                    <span className="font-semibold">{category}</span>
                    <FiChevronRight className={`ml-auto w-4 h-4 transition-transform ${
                      activeCategory === category ? 'translate-x-1' : ''
                    }`} />
                  </button>
                ))}
              </div>

              {/* Contact Quick Links */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                  Need More Help?
                </h4>
                
                <div className="space-y-3">
                  <a 
                    href="tel:+212600000000"
                    className="flex items-center gap-3 text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    <FiPhone className="w-4 h-4" />
                    <span className="text-sm">Call Us</span>
                  </a>
                  
                  <a 
                    href="mailto:rabab@example.com"
                    className="flex items-center gap-3 text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    <FiMail className="w-4 h-4" />
                    <span className="text-sm">Email Rabab</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - FAQ Cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <div 
                    key={faq.id}
                    className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
                      expandedFAQ === faq.id 
                        ? 'border-amber-500 md:col-span-2' 
                        : 'border-transparent hover:border-amber-200'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full p-6 text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl font-bold text-amber-600">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                              {faq.category}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-bold text-gray-900 leading-snug">
                            {faq.question}
                          </h3>
                        </div>

                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          expandedFAQ === faq.id 
                            ? 'bg-amber-500 text-white rotate-90' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <FiChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </button>

                    {/* Expanded Answer */}
                    <div className={`transition-all duration-500 ${
                      expandedFAQ === faq.id 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                      <div className="px-6 pb-6">
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border-l-4 border-amber-500">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 text-center py-16 bg-white rounded-2xl shadow-lg">
                  <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🤔</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No FAQs in this category</h3>
                  <p className="text-gray-600">
                    Try selecting a different category.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <span className="text-5xl mb-6 block">💬</span>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Can't Find Your Answer?
                </h3>
                
                <p className="text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed">
                  Rabab is always happy to help! Send us a message and we'll get back to you personally.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/faq-contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <span>Ask Rabab Directly</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

FAQSectionV2.displayName = 'FAQSectionV2';

export default FAQSectionV2;
