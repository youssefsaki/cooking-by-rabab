'use client';

import React, { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiUsers, FiStar, FiCheck, FiChevronRight } from 'react-icons/fi';

/**
 * ACTIVITIES SHOWCASE SECTION - Design 3 of 3
 * 
 * Design 3: Horizontal Scroll Gallery with Hover Expansion
 * 
 * Aesthetic: Modern, interactive, mobile-first
 * - Horizontal scrolling cards
 * - Hover to expand and see details
 * - Compact view by default
 * - Quick info badges
 * - Smooth animations
 * - Instagram-story style navigation
 */

interface CookingClass {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  duration: string;
  groupSize: string;
  difficulty: string;
  price: string;
  features: string[];
  popular?: boolean;
  color: string;
}

const cookingClasses: CookingClass[] = [
  {
    id: 'amazigh-heritage',
    title: 'Amazigh Heritage',
    tagline: 'Ancient Amazigh traditions',
    description: 'Immerse yourself in authentic Amazigh culture and culinary traditions. Learn ancient cooking methods and traditional recipes.',
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=800&q=80',
    duration: '4 hours',
    groupSize: 'Max 8',
    difficulty: 'All levels',
    price: 'From €55',
    features: ['Traditional cooking', 'Cultural stories', 'Authentic recipes', 'Amazigh history'],
    popular: true,
    color: 'orange'
  },
  {
    id: 'tea-ceremony',
    title: 'Tea Ceremony',
    tagline: 'The art of Moroccan hospitality',
    description: 'Master the traditional tea ceremony with the iconic high-pour technique and perfect mint-sugar balance.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80',
    duration: '1.5 hours',
    groupSize: 'Max 10',
    difficulty: 'Easy',
    price: 'From €30',
    features: ['Tea brewing', 'Pouring technique', 'Fresh mint prep', 'Cultural stories'],
    popular: true,
    color: 'green'
  },
  {
    id: 'tajine-masterclass',
    title: 'Tajine Masterclass',
    tagline: 'Morocco\'s signature dish',
    description: 'Master the art of slow-cooked tagines with aromatic spices, tender meats, and vegetables in traditional clay pots.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    duration: '3-4 hours',
    groupSize: 'Max 8',
    difficulty: 'Beginner',
    price: 'From €50',
    features: ['Clay pot cooking', 'Spice layering', 'Meat & vegetable', 'Preserved lemons'],
    popular: true,
    color: 'red'
  },
  {
    id: 'amlou-workshop',
    title: 'Amlou Workshop',
    tagline: 'Liquid gold spread making',
    description: 'Discover the secrets of making traditional Moroccan amlou - argan oil, roasted almonds, and local honey blend.',
    image: 'https://images.unsplash.com/photo-1587241321921-91a834d82253?w=800&q=80',
    duration: '2 hours',
    groupSize: 'Max 10',
    difficulty: 'Easy',
    price: 'From €40',
    features: ['Argan oil knowledge', 'Almond roasting', 'Traditional grinding', 'Perfect consistency'],
    color: 'yellow'
  },
  {
    id: 'clay-oven-bread',
    title: 'Clay Oven Bread',
    tagline: 'Ancient bread-making art',
    description: 'Bake authentic Moroccan bread in a wood-fired clay oven from kneading dough to achieving perfect golden crust.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    duration: '2-3 hours',
    groupSize: 'Max 6',
    difficulty: 'Intermediate',
    price: 'From €45',
    features: ['Dough preparation', 'Hand kneading', 'Clay oven baking', 'Multiple varieties'],
    color: 'amber'
  }
];

const colorClasses: Record<string, { bg: string; gradient: string; badge: string }> = {
  orange: { 
    bg: 'from-orange-600/90 to-amber-600/90', 
    gradient: 'from-orange-500 to-amber-500',
    badge: 'bg-orange-100 text-orange-800'
  },
  green: { 
    bg: 'from-green-600/90 to-emerald-600/90', 
    gradient: 'from-green-500 to-emerald-500',
    badge: 'bg-green-100 text-green-800'
  },
  amber: { 
    bg: 'from-amber-600/90 to-yellow-600/90', 
    gradient: 'from-amber-500 to-yellow-500',
    badge: 'bg-amber-100 text-amber-800'
  },
  yellow: { 
    bg: 'from-yellow-600/90 to-orange-600/90', 
    gradient: 'from-yellow-500 to-orange-500',
    badge: 'bg-yellow-100 text-yellow-800'
  },
  pink: { 
    bg: 'from-pink-600/90 to-rose-600/90', 
    gradient: 'from-pink-500 to-rose-500',
    badge: 'bg-pink-100 text-pink-800'
  },
  red: { 
    bg: 'from-red-600/90 to-orange-600/90', 
    gradient: 'from-red-500 to-orange-500',
    badge: 'bg-red-100 text-red-800'
  }
};

const ActivitiesShowcaseV3: React.FC = memo(() => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-orange-50/30 to-white">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-200/40 to-amber-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/40 to-yellow-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 mb-6">
            <span className="text-2xl">👨‍🍳</span>
            <span className="text-sm font-bold text-orange-900 tracking-wider uppercase">
              Cooking Classes
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
              Culinary Adventure
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Six unique classes teaching authentic Moroccan cooking techniques. 
            Scroll through and pick your perfect culinary experience.
          </p>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="relative mb-12">
          {/* Scroll Container */}
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible">
            {cookingClasses.map((cookingClass, index) => {
              const colors = colorClasses[cookingClass.color];
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={cookingClass.id}
                  className="group relative flex-shrink-0 w-[340px] lg:w-auto snap-center"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Card */}
                  <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer">
                    {/* Background Image */}
                    <Image
                      src={cookingClass.image}
                      alt={cookingClass.title}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        isHovered ? 'scale-110' : 'scale-100'
                      }`}
                      sizes="(max-width: 1024px) 340px, 33vw"
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${colors.bg} ${
                      isHovered ? 'opacity-95' : 'opacity-60'
                    } transition-opacity duration-500`}></div>

                    {/* Popular Badge */}
                    {cookingClass.popular && (
                      <div className="absolute top-6 right-6 z-10">
                        <div className="bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                          <FiStar className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="text-xs font-bold text-gray-900 uppercase">Popular</span>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                      {/* Top Section */}
                      <div>
                        {/* Info Pills - Always Visible */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <div className="flex items-center gap-1.5">
                              <FiClock className="w-4 h-4 text-white" />
                              <span className="text-xs font-semibold text-white">{cookingClass.duration}</span>
                            </div>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <div className="flex items-center gap-1.5">
                              <FiUsers className="w-4 h-4 text-white" />
                              <span className="text-xs font-semibold text-white">{cookingClass.groupSize}</span>
                            </div>
                          </div>
                          <div className={`${colors.badge} px-3 py-1.5 rounded-full`}>
                            <span className="text-xs font-bold uppercase">{cookingClass.difficulty}</span>
                          </div>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="text-3xl font-extrabold text-white mb-2">
                          {cookingClass.title}
                        </h3>
                        <p className="text-white/90 font-medium text-sm mb-4">
                          {cookingClass.tagline}
                        </p>

                        {/* Expanded Content - On Hover */}
                        <div className={`transition-all duration-500 overflow-hidden ${
                          isHovered ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <p className="text-white/90 text-sm leading-relaxed mb-4">
                            {cookingClass.description}
                          </p>

                          {/* Features */}
                          <div className="space-y-2 mb-6">
                            {cookingClass.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <FiCheck className="w-4 h-4 text-white flex-shrink-0" />
                                <span className="text-white/90 text-xs">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Section */}
                      <div>
                        {/* Price */}
                        <div className="mb-4">
                          <span className="text-3xl font-black text-white">{cookingClass.price}</span>
                          <span className="text-white/80 text-sm ml-2">per person</span>
                        </div>

                        {/* Learn More Button */}
                        <Link
                          href={`/experiences/${cookingClass.id}`}
                          className={`flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-white text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                            isHovered ? 'opacity-100 translate-y-0' : 'opacity-90'
                          }`}
                        >
                          <span>Learn More</span>
                          <FiChevronRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll Hint - Mobile Only */}
          <div className="lg:hidden flex items-center justify-center gap-2 mt-6 text-gray-500 text-sm">
            <span>Swipe to see all classes</span>
            <svg className="w-5 h-5 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl p-10 lg:p-16 shadow-xl border border-orange-200">
            <div className="mb-6">
              <span className="text-5xl">🎁</span>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Not Sure Which Class to Choose?
            </h3>
            
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Book a multi-class package and save! Or contact us for personalized recommendations 
              based on your skill level and interests.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/faq-contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span>Get Help Choosing</span>
              </Link>
              
              <Link 
                href="/packages"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-orange-600 hover:shadow-lg transition-all duration-300"
              >
                <span>View Packages</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes bounce-horizontal {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(25%);
          }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 1s infinite;
        }
      `}</style>
    </section>
  );
});

ActivitiesShowcaseV3.displayName = 'ActivitiesShowcaseV3';

export default ActivitiesShowcaseV3;
