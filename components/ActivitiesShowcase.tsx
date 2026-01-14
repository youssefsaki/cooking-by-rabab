'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiWind, FiActivity, FiCoffee, FiMusic, FiMapPin, FiSun, FiCamera, FiHeart } from 'react-icons/fi';

/**
 * ACTIVITIES SHOWCASE SECTION - Design 1 of 3
 * 
 * Design 1: Icon Grid Cards
 * 
 * Aesthetic: Clean grid with icon-based cards
 * - 3-column grid (desktop) / 1-column (mobile)
 * - Image backgrounds with gradient overlays
 * - Icon + title + description
 * - Hover effects with scale
 * - CTA buttons
 */

interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: any;
  color: string;
  featured?: boolean;
}

const activities: Activity[] = [
  {
    id: 'amazigh-heritage',
    title: 'Amazigh Heritage',
    description: 'Immerse yourself in authentic Amazigh culture and culinary traditions. Learn ancient cooking methods, traditional recipes, and the rich cultural stories behind Amazigh cuisine.',
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=800&q=80',
    icon: FiHeart,
    color: 'from-amber-500 to-orange-500',
    featured: true
  },
  {
    id: 'tea-ceremony',
    title: 'Tea Ceremony',
    description: 'Master the art of Moroccan hospitality through the traditional mint tea ceremony. Learn the perfect balance of green tea, fresh mint, and sugar with the iconic high-pour technique.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80',
    icon: FiCoffee,
    color: 'from-green-500 to-emerald-500',
    featured: true
  },
  {
    id: 'tajine-masterclass',
    title: 'Tajine Masterclass',
    description: 'Master Morocco\'s most iconic dish in this comprehensive class. Learn to prepare slow-cooked tagines with aromatic spices, tender meats, and vegetables in traditional clay pots.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    icon: FiCoffee,
    color: 'from-orange-600 to-red-600',
    featured: true
  },
  {
    id: 'amlou-workshop',
    title: 'Amlou Workshop',
    description: 'Discover the secrets of making traditional Moroccan amlou - a delicious blend of argan oil, almonds, and honey. Learn grinding techniques and perfect consistency.',
    image: 'https://images.unsplash.com/photo-1587241321921-91a834d82253?w=800&q=80',
    icon: FiActivity,
    color: 'from-yellow-500 to-amber-500'
  },
  {
    id: 'clay-oven-bread',
    title: 'Clay Oven Bread',
    description: 'Experience the ancient art of baking traditional Moroccan bread in a wood-fired clay oven. From kneading dough to achieving the perfect golden crust.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    icon: FiMapPin,
    color: 'from-amber-600 to-yellow-600'
  }
];

const ActivitiesShowcase: React.FC = memo(() => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-orange-200/40 to-pink-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 mb-6">
            <FiCoffee className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-bold text-orange-900 tracking-wider uppercase">
              Our Cooking Classes
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Traditional{' '}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
              Cooking Classes
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the authentic flavors of Morocco. From tagine mastery to bread baking in traditional ovens, 
            each class offers hands-on experience with recipes passed down through generations.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div 
                key={activity.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.03]"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${activity.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>

                  {/* Featured Badge */}
                  {activity.featured && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                        <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                          ⭐ Popular
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl">
                      <Icon className="w-7 h-7 text-gray-900" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 lg:p-8">
                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                    {activity.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {activity.description}
                  </p>

                  {/* Learn More Button */}
                  <Link 
                    href={`/experiences/${activity.id}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <span>Learn More</span>
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-opacity-100 bg-gradient-to-r ${activity.color} opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-10 lg:p-16 shadow-xl border border-orange-100">
            <div className="mb-6">
              <span className="text-5xl">👨‍🍳</span>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Culinary Journey
            </h3>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Select from individual cooking classes or full-day experiences. 
              Each class includes hands-on cooking, recipes to take home, and a delicious feast you prepared yourself.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span>Book a Class</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              <Link 
                href="/faq-contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-orange-600 hover:shadow-lg transition-all duration-300"
              >
                <span>Ask a Question</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ActivitiesShowcase.displayName = 'ActivitiesShowcase';

export default ActivitiesShowcase;
