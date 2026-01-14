'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { FiUsers, FiBriefcase, FiHeart, FiGift, FiCheck, FiArrowRight } from 'react-icons/fi';

/**
 * PRIVATE GROUPS CTA SECTION - Design 1 of 3
 * 
 * Design 1: Feature Cards with CTA
 * 
 * Aesthetic: Professional, premium, conversion-focused
 * - Highlight private group benefits
 * - Corporate/team building focus
 * - Special occasions (birthdays, celebrations)
 * - Clear CTA
 * - Social proof
 */

interface GroupType {
  icon: any;
  title: string;
  description: string;
  features: string[];
  color: string;
}

const groupTypes: GroupType[] = [
  {
    icon: FiBriefcase,
    title: "Corporate & Team Building",
    description: "Strengthen your team with unique Moroccan experiences. Perfect for corporate retreats and team bonding.",
    features: [
      "Customized team activities",
      "Professional facilitators",
      "Meeting spaces available",
      "Flexible scheduling"
    ],
    color: "from-blue-600 to-indigo-600"
  },
  {
    icon: FiHeart,
    title: "Special Celebrations",
    description: "Birthdays, anniversaries, or any special occasion. Create unforgettable memories with your loved ones.",
    features: [
      "Personalized experiences",
      "Decoration & setup included",
      "Special menu options",
      "Photography available"
    ],
    color: "from-pink-600 to-rose-600"
  },
  {
    icon: FiGift,
    title: "Private Family Groups",
    description: "Bring your family together for an authentic Moroccan adventure. Private experiences just for your group.",
    features: [
      "Exclusive access",
      "All ages welcome",
      "Flexible activities",
      "Private accommodation options"
    ],
    color: "from-orange-600 to-amber-600"
  }
];

const benefits = [
  "Fully customizable itineraries",
  "Dedicated coordinator",
  "Flexible dates and duration",
  "Special group rates",
  "Private transportation",
  "Exclusive experiences"
];

const PrivateGroupsCTA: React.FC = memo(() => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <FiUsers className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white tracking-wider uppercase">
              Private Groups
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Exclusive{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Group Experiences
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Perfect for corporate teams, families, or special celebrations. 
            We create customized experiences that bring people together.
          </p>
        </div>

        {/* Group Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {groupTypes.map((group, index) => {
            const Icon = group.icon;
            
            return (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center mb-6 shadow-xl`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {group.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6">
                  {group.description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {group.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <FiCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 lg:p-16 border border-white/10 mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose a Private Group Experience?
            </h3>
            <p className="text-gray-300 text-lg">
              Everything is tailored to your group's needs and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <FiCheck className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-10 lg:p-16 shadow-2xl">
            <div className="mb-6">
              <span className="text-6xl">🎉</span>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Plan Your Group Experience?
            </h3>
            
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's create something special for your group. Contact us today for a custom quote 
              and start planning your unforgettable Moroccan adventure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/faq-contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-gray-900 font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <span>Get Custom Quote</span>
                <FiArrowRight className="w-5 h-5" />
              </Link>
              
              <a 
                href="tel:+212123456789"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                <span>Call Us Now</span>
              </a>
            </div>

            {/* Trust Badge */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <FiCheck className="w-5 h-5" />
                <span>Free consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheck className="w-5 h-5" />
                <span>No obligation quote</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheck className="w-5 h-5" />
                <span>24h response time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

PrivateGroupsCTA.displayName = 'PrivateGroupsCTA';

export default PrivateGroupsCTA;
