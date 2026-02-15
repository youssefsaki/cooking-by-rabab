'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiClock, FiUsers, FiCheck } from 'react-icons/fi';

interface Experience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  duration: string;
  groupSize: string;
  highlights: string[];
  color: string;
}

const experiences: Experience[] = [
  {
    id: 'tajine-masterclass',
    title: 'Tajine Masterclass',
    subtitle: 'Morocco\'s Iconic Dish',
    description: 'The secret to perfect slow-cooked tagines',
    longDescription: 'Master the art of Morocco\'s most iconic dish in this comprehensive class. Learn to prepare slow-cooked tagines with aromatic spices, tender meats, and vegetables in traditional clay pots, achieving the perfect balance of flavors that makes Moroccan tagine world-renowned.',
    image: '/experiences/tajine-masterclass.jpg',
    duration: '3-4 hours',
    groupSize: '4-8 guests',
    highlights: ['Clay pot cooking techniques', 'Spice layering & blending', 'Meat & vegetable tagines', 'Preserved lemons preparation', 'Traditional serving methods'],
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'amazigh-heritage',
    title: 'Amazigh Heritage',
    subtitle: 'Ancient Berber Traditions',
    description: 'Journey into the heart of Amazigh culture',
    longDescription: 'Immerse yourself in authentic Amazigh culture and culinary traditions. Learn ancient cooking methods, traditional recipes, and the rich cultural stories behind Amazigh cuisine passed down through generations in the Atlas Mountains.',
    image: '/experiences/amazigh-heritage.jpg',
    duration: '4 hours',
    groupSize: '4-8 guests',
    highlights: ['Traditional cooking methods', 'Cultural storytelling', 'Authentic Berber recipes', 'Amazigh history & customs', 'Family-style dining'],
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'tea-ceremony',
    title: 'Tea Ceremony',
    subtitle: 'The Art of Moroccan Mint Tea',
    description: 'Traditional Moroccan hospitality ritual',
    longDescription: 'Experience the elegance of traditional Moroccan tea ceremony. Learn the proper techniques for brewing perfect mint tea, master the iconic high-pour method, and understand the cultural significance of tea in Moroccan hospitality.',
    image: '/experiences/tea-ceremony.jpg',
    duration: '1.5 hours',
    groupSize: '2-10 guests',
    highlights: ['Tea selection & quality', 'High-pour technique mastery', 'Fresh mint preparation', 'Cultural significance', 'Traditional glassware'],
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'clay-oven-bread',
    title: 'Clay Oven Bread',
    subtitle: 'Wood-Fired Tradition',
    description: 'Ancient bread-making in clay ovens',
    longDescription: 'Experience the ancient art of baking traditional Moroccan bread in a wood-fired clay oven. From kneading dough by hand to achieving the perfect golden crust, learn authentic Amazigh bread-making techniques that have remained unchanged for centuries.',
    image: '/experiences/clay-oven-bread.jpg',
    duration: '2-3 hours',
    groupSize: '4-6 guests',
    highlights: ['Dough preparation from scratch', 'Hand kneading techniques', 'Clay oven baking', 'Multiple bread varieties', 'Wood fire management'],
    color: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'amlou-workshop',
    title: 'Amlou Workshop',
    subtitle: 'Liquid Gold of Morocco',
    description: 'Argan oil, almonds, and honey perfection',
    longDescription: 'Discover the secrets of making traditional Moroccan amlou - a delicious blend of argan oil, roasted almonds, and honey. Learn traditional grinding techniques using ancient millstones and achieve the perfect consistency for this beloved Berber spread.',
    image: '/experiences/amlou-workshop.webp',
    duration: '2 hours',
    groupSize: '4-10 guests',
    highlights: ['Argan oil knowledge', 'Almond roasting & grinding', 'Traditional millstone use', 'Perfect consistency', 'Honey blending techniques'],
    color: 'from-yellow-500 to-amber-600'
  }
];

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-lg border border-amber-200 mb-8">
              <span className="text-2xl">🔥</span>
              <span className="text-sm font-bold text-amber-900 tracking-wider uppercase">
                Culinary Experiences
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Discover{' '}
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                Authentic Morocco
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-10">
              Five unique culinary experiences, each telling a story of Moroccan culture, tradition, and the warmth of Berber hospitality.
            </p>

            <Link
              href="/book"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-10 py-5 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-xl hover:scale-105"
            >
              <span>Book an Experience</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="space-y-24">
            {experiences.map((experience, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={experience.id}
                  id={experience.id}
                  className="scroll-mt-24"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image */}
                    <div className={`relative ${!isEven ? 'lg:order-2' : ''}`}>
                      <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                          src={experience.image}
                          alt={`${experience.title} - ${experience.subtitle}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-20`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${!isEven ? 'lg:order-1' : ''}`}>
                      <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">
                        {experience.title}
                      </h2>
                      <p className="text-xl text-amber-600 font-semibold mb-4 italic">
                        {experience.subtitle}
                      </p>
                      
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        {experience.longDescription}
                      </p>

                      {/* Duration & Group Size */}
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-200">
                          <FiClock className="w-5 h-5 text-amber-600" />
                          <span className="text-sm font-semibold text-gray-700">{experience.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-200">
                          <FiUsers className="w-5 h-5 text-amber-600" />
                          <span className="text-sm font-semibold text-gray-700">{experience.groupSize}</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2.5 mb-8">
                        {experience.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <FiCheck className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Link
                        href="/book"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:scale-105"
                      >
                        <span>Book This Experience</span>
                        <FiArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            Ready to Start Your{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Culinary Journey?
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Book your authentic Moroccan cooking experience today and create unforgettable memories in the Atlas Mountains.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-10 py-5 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-xl hover:scale-105"
            >
              <span>Book Now</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 font-bold px-10 py-5 rounded-full border-2 border-gray-200 hover:border-amber-500 transition-all duration-300 shadow-lg hover:scale-105"
            >
              <span>View Packages</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
