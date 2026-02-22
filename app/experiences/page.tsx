'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiClock, FiUsers, FiCheck } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

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

// Experiences data - imported from /data/experiences.json
const experiences: Experience[] = [
  {
    "id": "tajine-masterclass",
    "title": "Tajine Masterclass",
    "subtitle": "Morocco's Iconic Dish",
    "description": "The secret to perfect slow-cooked tagines",
    "longDescription": "Master the art of Morocco's most iconic dish in this comprehensive class. Learn to prepare slow-cooked tagines with aromatic spices, tender meats, and vegetables in traditional clay pots, achieving the perfect balance of flavors that makes Moroccan tagine world-renowned.",
    "image": "/experiences/tajine.jpg",
    "duration": "3-4 hours",
    "groupSize": "4-8 guests",
    "highlights": ["Clay pot cooking techniques", "Spice layering & blending", "Meat & vegetable tagines", "Preserved lemons preparation", "Traditional serving methods"],
    "color": "from-orange-500 to-red-600"
  },
  {
    "id": "amazigh-heritage",
    "title": "Amazigh Heritage",
    "subtitle": "Ancient Berber Traditions",
    "description": "Journey into the heart of Amazigh culture",
    "longDescription": "Immerse yourself in authentic Amazigh culture and culinary traditions. Learn ancient cooking methods, traditional recipes, and the rich cultural stories behind Amazigh cuisine passed down through generations in the Atlas Mountains.",
    "image": "/experiences/amazigh.jpg",
    "duration": "4 hours",
    "groupSize": "4-8 guests",
    "highlights": ["Traditional cooking methods", "Cultural storytelling", "Authentic Berber recipes", "Amazigh history & customs", "Family-style dining"],
    "color": "from-amber-500 to-orange-600"
  },
  {
    "id": "tea-ceremony",
    "title": "Tea Ceremony",
    "subtitle": "The Art of Moroccan Mint Tea",
    "description": "Traditional Moroccan hospitality ritual",
    "longDescription": "Experience the elegance of traditional Moroccan tea ceremony. Learn the proper techniques for brewing perfect mint tea, master the iconic high-pour method, and understand the cultural significance of tea in Moroccan hospitality.",
    "image": "/experiences/tea.jpg",
    "duration": "1.5 hours",
    "groupSize": "2-10 guests",
    "highlights": ["Tea selection & quality", "High-pour technique mastery", "Fresh mint preparation", "Cultural significance", "Traditional glassware"],
    "color": "from-green-500 to-emerald-600"
  },
  {
    "id": "clay-oven-bread",
    "title": "Clay Oven Bread",
    "subtitle": "Wood-Fired Tradition",
    "description": "Ancient bread-making in clay ovens",
    "longDescription": "Experience the ancient art of baking traditional Moroccan bread in a wood-fired clay oven. From kneading dough by hand to achieving the perfect golden crust, learn authentic Amazigh bread-making techniques that have remained unchanged for centuries.",
    "image": "/experiences/oven-bread.jpg",
    "duration": "2-3 hours",
    "groupSize": "4-6 guests",
    "highlights": ["Dough preparation from scratch", "Hand kneading techniques", "Clay oven baking", "Multiple bread varieties", "Wood fire management"],
    "color": "from-amber-500 to-yellow-600"
  },
  {
    "id": "amlou-workshop",
    "title": "Amlou Workshop",
    "subtitle": "Liquid Gold of Morocco",
    "description": "Argan oil, almonds, and honey perfection",
    "longDescription": "Discover the secrets of making traditional Moroccan amlou - a delicious blend of argan oil, roasted almonds, and honey. Learn traditional grinding techniques using ancient millstones and achieve the perfect consistency for this beloved Berber spread.",
    "image": "/experiences/amlou-workshop.jpg",
    "duration": "2 hours",
    "groupSize": "4-10 guests",
    "highlights": ["Argan oil knowledge", "Almond roasting & grinding", "Traditional millstone use", "Perfect consistency", "Honey blending techniques"],
    "color": "from-yellow-500 to-amber-600"
  }
];

// SEO optimized for Moroccan cooking experiences, Tajine masterclass, Amazigh heritage, Taghazout culinary tours
export default function ExperiencesPage() {
  const { t } = useLanguage();
  
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Optimized for 13" */}
      <section className="relative pt-36 pb-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
              {t.experiences.title.split(' ').slice(0, 1).join(' ')}{' '}
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                {t.experiences.title.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-8">
              {t.experiences.description}
            </p>

            <Link
              href="/book"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-xl hover:scale-105"
            >
              <span>{t.experiences.bookExperience}</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Experiences Section - Optimized for 13" */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="space-y-20">
            {experiences.map((experience, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={experience.id}
                  id={experience.id}
                  className="scroll-mt-24"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image */}
                    <div className={`relative ${!isEven ? 'lg:order-2' : ''}`}>
                      <div className="relative h-[450px] sm:h-[500px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                          src={experience.image}
                          alt={`${experience.title} - Authentic Moroccan ${experience.subtitle} cooking class in Taghazout Atlas Mountains`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-20`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${!isEven ? 'lg:order-1' : ''}`}>
                      <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
                        {experience.id === 'tajine-masterclass' ? t.experiences.tajine.title :
                         experience.id === 'amazigh-heritage' ? t.experiences.amazigh.title :
                         experience.id === 'tea-ceremony' ? t.experiences.tea.title :
                         experience.id === 'clay-oven-bread' ? t.experiences.bread.title :
                         experience.id === 'amlou-workshop' ? t.experiences.amlou.title :
                         experience.title}
                      </h2>
                      <p className="text-lg text-amber-600 font-semibold mb-4 italic">
                        {experience.id === 'tajine-masterclass' ? t.experiences.tajine.subtitle :
                         experience.id === 'amazigh-heritage' ? t.experiences.amazigh.subtitle :
                         experience.id === 'tea-ceremony' ? t.experiences.tea.subtitle :
                         experience.id === 'clay-oven-bread' ? t.experiences.bread.subtitle :
                         experience.id === 'amlou-workshop' ? t.experiences.amlou.subtitle :
                         experience.subtitle}
                      </p>
                      
                      <p className="text-base text-gray-700 leading-relaxed mb-5">
                        {experience.id === 'tajine-masterclass' ? t.experiences.tajine.longDescription :
                         experience.id === 'amazigh-heritage' ? t.experiences.amazigh.longDescription :
                         experience.id === 'tea-ceremony' ? t.experiences.tea.longDescription :
                         experience.id === 'clay-oven-bread' ? t.experiences.bread.longDescription :
                         experience.id === 'amlou-workshop' ? t.experiences.amlou.longDescription :
                         experience.longDescription}
                      </p>

                      {/* Duration & Group Size */}
                      <div className="flex flex-wrap gap-3 mb-5">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full border border-amber-200">
                          <FiClock className="w-4 h-4 text-amber-600" />
                          <span className="text-sm font-semibold text-gray-700">{experience.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full border border-amber-200">
                          <FiUsers className="w-4 h-4 text-amber-600" />
                          <span className="text-sm font-semibold text-gray-700">{experience.groupSize}</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2 mb-6">
                        {(experience.id === 'tajine-masterclass' ? t.experiences.tajine.highlights :
                          experience.id === 'amazigh-heritage' ? t.experiences.amazigh.highlights :
                          experience.id === 'tea-ceremony' ? t.experiences.tea.highlights :
                          experience.id === 'clay-oven-bread' ? t.experiences.bread.highlights :
                          experience.id === 'amlou-workshop' ? t.experiences.amlou.highlights :
                          experience.highlights).map((highlight, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <FiCheck className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-sm text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Link
                        href="/book"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-7 py-3.5 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:scale-105"
                      >
                        <span>{t.packages.bookNow}</span>
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

      {/* CTA Section - Optimized for 13" */}
      <section className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Ready to Start Your{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Culinary Journey?
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Book your authentic Moroccan cooking experience today and create unforgettable memories in the Atlas Mountains.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-xl hover:scale-105"
            >
              <span>Book Now</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 font-bold px-8 py-4 rounded-full border-2 border-gray-200 hover:border-amber-500 transition-all duration-300 shadow-lg hover:scale-105"
            >
              <span>View Packages</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
