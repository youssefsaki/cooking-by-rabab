'use client';

import React, { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight, FiClock, FiUsers, FiAward } from 'react-icons/fi';

/**
 * ACTIVITIES SHOWCASE SECTION - Design 2 of 3
 * 
 * Design 2: Featured Carousel with Details
 * 
 * Aesthetic: Premium carousel with large images
 * - Large featured image slider
 * - Detailed class information
 * - Duration, group size, difficulty
 * - Navigation dots
 * - Auto-play carousel
 * - More immersive and editorial
 */

interface CookingClass {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  duration: string;
  groupSize: string;
  difficulty: string;
  highlights: string[];
  color: string;
}

const cookingClasses: CookingClass[] = [
  {
    id: 'amazigh-heritage',
    title: 'Amazigh Heritage',
    subtitle: 'Ancient Amazigh Traditions',
    description: 'Journey into the heart of Amazigh culture',
    longDescription: 'Immerse yourself in authentic Amazigh culture and culinary traditions. Learn ancient cooking methods, traditional recipes, and the rich cultural stories behind Amazigh cuisine passed down through generations.',
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=1200&q=80',
    duration: '4 hours',
    groupSize: '4-8 people',
    difficulty: 'All Levels',
    highlights: [
      'Traditional cooking methods',
      'Cultural storytelling',
      'Authentic recipes',
      'Amazigh history'
    ],
    color: 'from-amber-600 to-orange-600'
  },
  {
    id: 'tea-ceremony',
    title: 'Tea Ceremony',
    subtitle: 'The Art of Moroccan Hospitality',
    description: 'Master the iconic mint tea ritual',
    longDescription: 'Discover the ceremonial art of preparing and pouring traditional Moroccan mint tea. Learn the perfect balance of green tea, fresh mint, and sugar, and master the iconic high-pour technique.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200&q=80',
    duration: '1.5 hours',
    groupSize: '2-10 people',
    difficulty: 'Easy',
    highlights: [
      'Tea selection & brewing',
      'Traditional pouring technique',
      'Fresh mint preparation',
      'Cultural significance'
    ],
    color: 'from-green-600 to-emerald-600'
  },
  {
    id: 'tajine-masterclass',
    title: 'Tajine Masterclass',
    subtitle: 'Morocco\'s Signature Dish',
    description: 'The secret to perfect slow-cooked tagines',
    longDescription: 'Master the art of Morocco\'s most iconic dish. Learn to prepare slow-cooked tagines with aromatic spices, tender meats, and vegetables in traditional clay pots, achieving the perfect balance of flavors.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80',
    duration: '3-4 hours',
    groupSize: '4-8 people',
    difficulty: 'Beginner Friendly',
    highlights: [
      'Traditional clay pot cooking',
      'Spice layering techniques',
      'Meat & vegetable preparations',
      'Preserved lemons & olives'
    ],
    color: 'from-orange-600 to-red-600'
  },
  {
    id: 'amlou-workshop',
    title: 'Amlou Workshop',
    subtitle: 'Liquid Gold of Morocco',
    description: 'Argan oil, almonds, and honey perfection',
    longDescription: 'Discover the secrets of making traditional Moroccan amlou - a delicious blend of pure argan oil, roasted almonds, and local honey. Learn traditional grinding techniques and perfect consistency.',
    image: 'https://images.unsplash.com/photo-1587241321921-91a834d82253?w=1200&q=80',
    duration: '2 hours',
    groupSize: '4-10 people',
    difficulty: 'Easy',
    highlights: [
      'Argan oil properties',
      'Almond roasting process',
      'Traditional grinding',
      'Perfect consistency'
    ],
    color: 'from-yellow-600 to-amber-600'
  },
  {
    id: 'clay-oven-bread',
    title: 'Clay Oven Bread',
    subtitle: 'Wood-Fired Tradition',
    description: 'Ancient bread-making in clay ovens',
    longDescription: 'Experience the ancient art of baking traditional Moroccan bread in a wood-fired clay oven. From kneading dough by hand to achieving the perfect golden crust, learn authentic Amazigh bread-making techniques.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80',
    duration: '2-3 hours',
    groupSize: '4-6 people',
    difficulty: 'Intermediate',
    highlights: [
      'Dough preparation',
      'Hand kneading techniques',
      'Clay oven baking',
      'Multiple bread varieties'
    ],
    color: 'from-amber-600 to-yellow-600'
  }
];

const ActivitiesShowcaseV2: React.FC = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? cookingClasses.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === cookingClasses.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentClass = cookingClasses[currentIndex];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <FiAward className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-white tracking-wider uppercase">
              Authentic Cooking Classes
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Master{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Moroccan Cuisine
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From traditional tagines to hand-rolled couscous, each class offers authentic techniques 
            passed down through generations in a real Moroccan kitchen.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Content - Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Image */}
            <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={currentClass.image}
                alt={currentClass.title}
                fill
                className="object-cover transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${currentClass.color} opacity-20`}></div>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:bg-white transition-all duration-300 hover:scale-110 shadow-xl z-10"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:bg-white transition-all duration-300 hover:scale-110 shadow-xl z-10"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>

              {/* Slide Counter */}
              <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white font-bold text-sm">
                  {currentIndex + 1} / {cookingClasses.length}
                </span>
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="space-y-8">
              {/* Subtitle */}
              <div>
                <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-2">
                  {currentClass.subtitle}
                </p>
                <h3 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
                  {currentClass.title}
                </h3>
              </div>

              {/* Info Pills */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FiClock className="w-5 h-5 text-amber-400" />
                  <span className="text-white font-medium text-sm">{currentClass.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FiUsers className="w-5 h-5 text-amber-400" />
                  <span className="text-white font-medium text-sm">{currentClass.groupSize}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FiAward className="w-5 h-5 text-amber-400" />
                  <span className="text-white font-medium text-sm">{currentClass.difficulty}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed">
                {currentClass.description}
              </p>

              {/* Highlights */}
              <div>
                <h4 className="text-white font-bold text-lg mb-4">What You'll Learn:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentClass.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${currentClass.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
                  <Link
                    href={`/experiences/${currentClass.id}`}
                    className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r ${currentClass.color} text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300`}
                  >
                    <span>Learn More</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-12">
            {cookingClasses.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? 'w-12 h-3 bg-gradient-to-r from-amber-400 to-orange-400'
                    : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-3xl p-10 lg:p-16 border border-amber-500/20">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Can't Decide? Try Them All!
            </h3>
            
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Book a multi-day package and experience all our cooking classes. 
              Perfect for food lovers who want the complete Moroccan culinary journey.
            </p>

            <Link 
              href="/faq-contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>Ask About Packages</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

ActivitiesShowcaseV2.displayName = 'ActivitiesShowcaseV2';

export default ActivitiesShowcaseV2;
