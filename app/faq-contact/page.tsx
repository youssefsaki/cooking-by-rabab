'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Clock, Zap, Heart, HelpCircle } from 'lucide-react';
import TabNavigation from '@/components/faq-contact/TabNavigation';
import FAQAccordion from '@/components/faq-contact/FAQAccordion';
import ContactCard from '@/components/faq-contact/ContactCard';
import ContactForm from '@/components/faq-contact/ContactForm';
import { FAQData, ContactInfo } from '@/types/faq-contact.types';
import faqData from '@/data/faqs.json';
import contactData from '@/data/contact.json';

const FAQContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const faqs: FAQData = faqData;
  const contactInfo: ContactInfo = contactData;

  const filteredFAQs = useMemo(() => {
    if (activeTab === 'All') {
      return faqs.faqs;
    }
    return faqs.faqs.filter(faq => faq.category === activeTab);
  }, [activeTab, faqs.faqs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="bg-white/80 backdrop-blur-sm py-16 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary-pale px-6 py-2 rounded-full">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm">HELP & SUPPORT</span>
              <Star className="w-4 h-4 text-primary" />
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              <span className="text-primary">FAQ &</span>{' '}
              <span className="text-dark-blue">Contact</span>
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Find answers to common questions or get in touch with our friendly support team
            </p>
          </div>

          {/* USP Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-gray-700 text-sm font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-gray-700 text-sm font-medium">Quick Response</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-gray-700 text-sm font-medium">Friendly Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 lg:px-24 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - FAQs */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-dark-blue">Frequently Asked Questions</h2>
              </div>

              <TabNavigation
                categories={faqs.categories}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {filteredFAQs.length > 0 ? (
                <FAQAccordion faqs={filteredFAQs} />
              ) : (
                <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
                  <p className="text-gray-600">No FAQs available for this category.</p>
                </div>
              )}
            </div>

            {/* Right Column - Contact */}
            <div className="space-y-6">
              <ContactCard contactInfo={contactInfo} />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQContactPage;
