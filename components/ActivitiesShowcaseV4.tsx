'use client';

import React, { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiClock, FiUsers, FiStar } from 'react-icons/fi';

/**
 * ACTIVITIES SHOWCASE SECTION - Design 4 of 4
 * 
 * Design 4: Alternating Split Layout (Magazine Editorial)
 * 
 * Aesthetic: Editorial magazine style
 * - Alternating left/right image-text splits
 * - Large immersive images
 * - Zig-zag reading pattern
 * - Bold typography
 * - Premium storytelling feel
 * - Each experience gets full spotlight
 */

interface Experience {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  duration: string;
  groupSize: string;
  highlights: string[];
  featured?: boolean;
  color: string;
}

const experiences: Experience[] = [
  {
    id: 'amazigh-heritage',
    number: '01',
    title: 'Amazigh Heritage',
    subtitle: 'Ancient Amazigh Traditions',
    description: 'Journey into the heart of Amazigh culture',
    longDescription: 'Immerse yourself in authentic Amazigh culture and culinary traditions. Learn ancient cooking methods, traditional recipes, and the rich cultural stories behind Amazigh cuisine passed down through generations.',
    image: '/experiences/amazigh-heritage.jpg',
    imageAlt: 'Berber village cooking experience Taghazout — authentic Amazigh heritage and traditional recipes Atlas Mountains',
    duration: '4 hours',
    groupSize: '4-8 guests',
    highlights: ['Traditional cooking methods', 'Cultural storytelling', 'Authentic recipes', 'Amazigh history'],
    featured: true,
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'tea-ceremony',
    number: '02',
    title: 'Tea Ceremony',
    subtitle: 'The Art of Moroccan Hospitality',
    description: 'Master the iconic mint tea ritual',
    longDescription: 'Discover the ceremonial art of preparing and pouring traditional Moroccan mint tea. Learn the perfect balance of green tea, fresh mint, and sugar, and master the iconic high-pour technique that defines Moroccan hospitality.',
    image: '/experiences/tea-ceremony.jpg',
    imageAlt: 'Moroccan mint tea ceremony Taghazout — traditional Amazigh hospitality at cooking class',
    duration: '1.5 hours',
    groupSize: '2-10 guests',
    highlights: ['Tea selection & brewing', 'High-pour technique', 'Fresh mint preparation', 'Cultural significance'],
    featured: true,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'tajine-masterclass',
    number: '03',
    title: 'Tajine Masterclass',
    subtitle: 'Morocco\'s Iconic Dish',
    description: 'The secret to perfect slow-cooked tagines',
    longDescription: 'Master the art of Morocco\'s most iconic dish in this comprehensive class. Learn to prepare slow-cooked tagines with aromatic spices, tender meats, and vegetables in traditional clay pots, achieving the perfect balance of flavors.',
    image: '/experiences/tajine-masterclass.jpg',
    imageAlt: 'Tajine masterclass Taghazout — traditional Moroccan tagine cooking class in clay pot',
    duration: '3-4 hours',
    groupSize: '4-8 guests',
    highlights: ['Clay pot cooking', 'Spice layering', 'Meat & vegetable tagines', 'Preserved lemons'],
    featured: true,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'amlou-workshop',
    number: '04',
    title: 'Amlou Workshop',
    subtitle: 'Liquid Gold of Morocco',
    description: 'Argan oil, almonds, and honey perfection',
    longDescription: 'Discover the secrets of making traditional Moroccan amlou - a delicious blend of argan oil, roasted almonds, and honey. Learn traditional grinding techniques and perfect consistency for this beloved Berber spread.',
    image: '/experiences/amlou-workshop.webp',
    imageAlt: 'Amlou workshop Morocco Taghazout — argan oil almond spread making in Berber village',
    duration: '2 hours',
    groupSize: '4-10 guests',
    highlights: ['Argan oil knowledge', 'Almond roasting', 'Traditional grinding', 'Perfect consistency'],
    color: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'clay-oven-bread',
    number: '05',
    title: 'Clay Oven Bread',
    subtitle: 'Wood-Fired Tradition',
    description: 'Ancient bread-making in clay ovens',
    longDescription: 'Experience the ancient art of baking traditional Moroccan bread in a wood-fired clay oven. From kneading dough by hand to achieving the perfect golden crust, learn authentic Amazigh bread-making techniques.',
    image: '/experiences/clay-oven-bread.jpg',
    imageAlt: 'Clay oven bread making Taghazout — wood-fired Berber bread baking in traditional village kitchen',
    duration: '2-3 hours',
    groupSize: '4-6 guests',
    highlights: ['Dough preparation', 'Hand kneading', 'Clay oven baking', 'Multiple varieties'],
    color: 'from-amber-500 to-yellow-600'
  }
];

const ActivitiesShowcaseV4: React.FC = memo(() => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 mb-6">
            <span className="text-2xl">🔥</span>
            <span className="text-sm font-bold text-orange-900 tracking-wider uppercase">
              Culinary Experiences
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6">
            Discover{' '}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
              Authentic Morocco
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Five unique culinary experiences, each telling a story of Moroccan culture, 
            tradition, and the warmth of Berber hospitality.
          </p>
        </div>
      </div>

      {/* Experiences - Alternating Layout */}
      <div className="space-y-32">
        {experiences.map((experience, index) => {
          const isEven = index % 2 === 0;
          const isHovered = hoveredId === experience.id;

          return (
            <div 
              key={experience.id}
              className="relative"
              onMouseEnter={() => setHoveredId(experience.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}>
                  {/* Image Side */}
                  <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                      <Image
                        src={experience.image}
                        alt={experience.imageAlt}
                        fill
                        loading="lazy"
                        className={`object-cover transition-transform duration-700 ${
                          isHovered ? 'scale-110' : 'scale-100'
                        }`}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${experience.color} opacity-20`}></div>

                      {/* Featured Badge */}
                      {experience.featured && (
                        <div className="absolute top-6 right-6 z-10">
                          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                            <FiStar className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                              Most Popular
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Number Badge */}
                      <div className="absolute bottom-6 left-6">
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${experience.color} flex items-center justify-center shadow-2xl`}>
                          <span className="text-3xl font-black text-white">{experience.number}</span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Element */}
                    <div className={`absolute -z-10 ${
                      isEven ? '-right-8 -top-8' : '-left-8 -top-8'
                    } w-72 h-72 bg-gradient-to-br ${experience.color} opacity-10 rounded-full blur-3xl`}></div>
                  </div>

                  {/* Content Side */}
                  <div className={`space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    {/* Subtitle */}
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">
                        {experience.subtitle}
                      </p>
                      <h3 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-4">
                        {experience.title}
                      </h3>
                      <p className="text-xl text-gray-600 font-medium">
                        {experience.description}
                      </p>
                    </div>

                    {/* Long Description */}
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {experience.longDescription}
                    </p>

                    {/* Info Pills */}
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2.5 rounded-full">
                        <FiClock className="w-5 h-5 text-gray-700" />
                        <span className="text-sm font-semibold text-gray-900">{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2.5 rounded-full">
                        <FiUsers className="w-5 h-5 text-gray-700" />
                        <span className="text-sm font-semibold text-gray-900">{experience.groupSize}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-gray-900">What You&apos;ll Experience:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {experience.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${experience.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-sm font-medium">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <Link
                        href={`/experiences/${experience.id}`}
                        className={`inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r ${experience.color} text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group`}
                      >
                        <span>Learn More</span>
                        <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-32">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 lg:p-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative text-center">
            <div className="mb-6">
              <span className="text-6xl">✨</span>
            </div>
            
            <h3 className="text-3xl lg:text-5xl font-extrabold text-white mb-6">
              Ready for Your Culinary Journey?
            </h3>
            
            <p className="text-lg lg:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book your experience today or contact us to create a custom package 
              combining multiple experiences for the ultimate Moroccan culinary adventure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <span>Book Now</span>
                <FiArrowRight className="w-5 h-5" />
              </Link>
              
              <Link 
                href="/faq-contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ActivitiesShowcaseV4.displayName = 'ActivitiesShowcaseV4';

export default ActivitiesShowcaseV4;
