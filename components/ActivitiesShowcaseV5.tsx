'use client';

import React, { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiClock, FiUsers, FiBookOpen, FiStar } from 'react-icons/fi';

/**
 * ACTIVITIES SHOWCASE SECTION - Design 5 of 5
 * 
 * Design 5: Interactive Tab System with Featured Preview
 * 
 * Aesthetic: Modern app-like interface
 * - Tab navigation on left
 * - Large preview on right
 * - Smooth transitions
 * - Active state highlighting
 * - Desktop: side-by-side, Mobile: stacked
 * - Clean, minimal, modern
 */

interface Experience {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDescription: string;
  image: string;
  duration: string;
  groupSize: string;
  difficulty: string;
  highlights: string[];
  featured?: boolean;
  price: string;
  color: string;
}

const experiences: Experience[] = [
  {
    id: 'amazigh-heritage',
    number: '01',
    title: 'Amazigh Heritage',
    category: 'Cultural Experience',
    shortDesc: 'Amazigh traditions & culture',
    fullDescription: 'Immerse yourself in authentic Amazigh culture and culinary traditions. Learn ancient cooking methods, traditional recipes, and the rich cultural stories behind Amazigh cuisine passed down through generations in the Atlas Mountains.',
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=1200&q=80',
    duration: '4 hours',
    groupSize: '4-8',
    difficulty: 'All levels',
    highlights: [
      'Traditional Amazigh cooking methods',
      'Cultural storytelling sessions',
      'Authentic Berber recipes',
      'Historical context & traditions'
    ],
    featured: true,
    price: '€55',
    color: 'orange'
  },
  {
    id: 'tea-ceremony',
    number: '02',
    title: 'Tea Ceremony',
    category: 'Cultural Ritual',
    shortDesc: 'Master the art of hospitality',
    fullDescription: 'Discover the ceremonial art of preparing and pouring traditional Moroccan mint tea. Learn the perfect balance of green tea, fresh mint, and sugar, and master the iconic high-pour technique that symbolizes Moroccan hospitality.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200&q=80',
    duration: '1.5 hours',
    groupSize: '2-10',
    difficulty: 'Easy',
    highlights: [
      'Tea selection & brewing techniques',
      'High-pour pouring mastery',
      'Fresh mint preparation',
      'Cultural significance & stories'
    ],
    featured: true,
    price: '€30',
    color: 'green'
  },
  {
    id: 'tajine-masterclass',
    number: '03',
    title: 'Tajine Masterclass',
    category: 'Cooking Class',
    shortDesc: 'Morocco\'s signature dish',
    fullDescription: 'Master the art of Morocco\'s most iconic dish in this comprehensive class. Learn to prepare slow-cooked tagines with aromatic spices, tender meats, and seasonal vegetables in traditional clay pots, achieving perfect flavor balance.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80',
    duration: '3-4 hours',
    groupSize: '4-8',
    difficulty: 'Beginner friendly',
    highlights: [
      'Traditional clay pot cooking',
      'Spice layering techniques',
      'Meat & vegetable preparations',
      'Preserved lemons & olives'
    ],
    featured: true,
    price: '€50',
    color: 'red'
  },
  {
    id: 'amlou-workshop',
    number: '04',
    title: 'Amlou Workshop',
    category: 'Specialty Workshop',
    shortDesc: 'Liquid gold spread making',
    fullDescription: 'Discover the secrets of making traditional Moroccan amlou - a delicious blend of pure argan oil, roasted almonds, and local honey. Learn traditional grinding techniques and achieve the perfect consistency for this beloved Berber delicacy.',
    image: 'https://images.unsplash.com/photo-1587241321921-91a834d82253?w=1200&q=80',
    duration: '2 hours',
    groupSize: '4-10',
    difficulty: 'Easy',
    highlights: [
      'Argan oil properties & benefits',
      'Almond roasting process',
      'Traditional grinding methods',
      'Perfect consistency techniques'
    ],
    price: '€40',
    color: 'yellow'
  },
  {
    id: 'clay-oven-bread',
    number: '05',
    title: 'Clay Oven Bread',
    category: 'Baking Experience',
    shortDesc: 'Ancient bread-making art',
    fullDescription: 'Experience the ancient art of baking traditional Moroccan bread in a wood-fired clay oven. From kneading dough by hand to achieving the perfect golden crust, learn authentic Amazigh bread-making techniques used for centuries.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80',
    duration: '2-3 hours',
    groupSize: '4-6',
    difficulty: 'Intermediate',
    highlights: [
      'Traditional dough preparation',
      'Hand-kneading techniques',
      'Wood-fired clay oven baking',
      'Multiple bread varieties'
    ],
    price: '€45',
    color: 'amber'
  }
];

const colorClasses: Record<string, { bg: string; text: string; badge: string }> = {
  orange: { bg: 'bg-orange-500', text: 'text-orange-600', badge: 'bg-orange-100 text-orange-800' },
  green: { bg: 'bg-green-500', text: 'text-green-600', badge: 'bg-green-100 text-green-800' },
  red: { bg: 'bg-red-500', text: 'text-red-600', badge: 'bg-red-100 text-red-800' },
  yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', badge: 'bg-yellow-100 text-yellow-800' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-600', badge: 'bg-amber-100 text-amber-800' }
};

const ActivitiesShowcaseV5: React.FC = memo(() => {
  const [activeExperience, setActiveExperience] = useState<Experience>(experiences[0]);

  const activeColors = colorClasses[activeExperience.color];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 mb-6">
            <FiBookOpen className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-bold text-orange-900 tracking-wider uppercase">
              Explore Our Experiences
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Your{' '}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
              Culinary Journey
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select an experience to discover more. Each one offers a unique window 
            into authentic Moroccan culture and cuisine.
          </p>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Side - Tabs Navigation */}
          <div className="lg:col-span-2 space-y-3">
            {experiences.map((experience) => {
              const isActive = activeExperience.id === experience.id;
              const colors = colorClasses[experience.color];

              return (
                <button
                  key={experience.id}
                  onClick={() => setActiveExperience(experience)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-white shadow-xl scale-[1.02] border-2 border-gray-200'
                      : 'bg-white/50 hover:bg-white hover:shadow-lg border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Number Badge */}
                    <div className={`w-12 h-12 rounded-xl ${
                      isActive ? colors.bg : 'bg-gray-200'
                    } flex items-center justify-center flex-shrink-0 transition-colors duration-300`}>
                      <span className={`text-lg font-black ${
                        isActive ? 'text-white' : 'text-gray-500'
                      }`}>
                        {experience.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`text-lg font-bold transition-colors ${
                          isActive ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {experience.title}
                        </h3>
                        {experience.featured && (
                          <FiStar className={`w-4 h-4 ${
                            isActive ? 'text-amber-500 fill-amber-500' : 'text-gray-400'
                          }`} />
                        )}
                      </div>
                      <p className={`text-xs font-semibold mb-2 transition-colors ${
                        isActive ? colors.text : 'text-gray-500'
                      }`}>
                        {experience.category}
                      </p>
                      <p className={`text-sm transition-colors ${
                        isActive ? 'text-gray-600' : 'text-gray-500'
                      }`}>
                        {experience.shortDesc}
                      </p>

                      {/* Quick Info - Only show on active */}
                      {isActive && (
                        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <FiClock className="w-3.5 h-3.5" />
                            <span>{experience.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiUsers className="w-3.5 h-3.5" />
                            <span>{experience.groupSize} guests</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side - Preview Content */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              {/* Image */}
              <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={activeExperience.image}
                  alt={activeExperience.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Badge Overlays */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                  {activeExperience.featured && (
                    <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <div className="flex items-center gap-2">
                        <FiStar className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-gray-900 uppercase">Popular</span>
                      </div>
                    </div>
                  )}
                  
                  <div className={`${activeColors.badge} px-4 py-2 rounded-full shadow-lg ml-auto`}>
                    <span className="text-xs font-bold uppercase">{activeExperience.difficulty}</span>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/80 text-sm font-semibold mb-2">
                        {activeExperience.category}
                      </p>
                      <h3 className="text-3xl lg:text-4xl font-black text-white mb-2">
                        {activeExperience.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 text-sm mb-1">From</p>
                      <p className="text-3xl font-black text-white">{activeExperience.price}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-4">About This Experience</h4>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {activeExperience.fullDescription}
                </p>

                {/* Info Pills */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                    <FiClock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-900">{activeExperience.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                    <FiUsers className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-900">{activeExperience.groupSize} guests max</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h5 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">What's Included:</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeExperience.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className={`w-5 h-5 rounded-full ${activeColors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/experiences/${activeExperience.id}`}
                  className={`flex items-center justify-center gap-2 w-full py-4 ${activeColors.bg} text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group`}
                >
                  <span>Learn More & Book</span>
                  <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl p-10 lg:p-12 shadow-xl border border-orange-200">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Can't Choose Just One?
            </h3>
            
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Book multiple experiences and save! Contact us for custom packages.
            </p>

            <Link 
              href="/faq-contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>Get Help Choosing</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

ActivitiesShowcaseV5.displayName = 'ActivitiesShowcaseV5';

export default ActivitiesShowcaseV5;
