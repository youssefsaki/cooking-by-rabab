'use client';

import React, { memo, useRef } from 'react';
import Image from 'next/image';
import { FiArrowLeft, FiArrowRight, FiMapPin, FiHome, FiActivity, FiHeart, FiClock } from 'react-icons/fi';

/**
 * THE COOKING CLASS EXPERIENCE SECTION - Design 3 of 3
 * 
 * Design 3: Horizontal Scroll Slider (Netflix/Spotify Style)
 * 
 * Aesthetic: Modern interactive slider with scroll
 * - Horizontal scrolling cards
 * - Navigation arrows
 * - Snap-to-center on mobile
 * - Featured card styling
 * - Playful, modern, interactive
 * - Progress dots
 */

interface ExperienceStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  image: string;
  duration: string;
  icon: any;
  gradient: string;
}

const experienceSteps: ExperienceStep[] = [
  {
    step: 1,
    title: "Pickup & Journey",
    subtitle: "Your Adventure Begins",
    description: "We pick you up from Taghazout and take you on a scenic drive through stunning Moroccan countryside.",
    details: [
      "Comfortable pickup from your location",
      "15-20 minute scenic drive",
      "Learn local stories along the way",
      "Arrive at traditional home"
    ],
    image: "/activities/paradise-valley.jpg",
    duration: "20 min",
    icon: FiMapPin,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    step: 2,
    title: "Traditional Kitchen Tour",
    subtitle: "Where Magic Happens",
    description: "Step into an authentic Moroccan kitchen and explore the traditional tools used for generations.",
    details: [
      "Welcome with fresh mint tea",
      "Tour authentic kitchen setup",
      "Wood-fired oven demonstration",
      "Traditional cooking tools"
    ],
    image: "/hero2.jpg",
    duration: "20 min",
    icon: FiHome,
    gradient: "from-orange-500 to-amber-500"
  },
  {
    step: 3,
    title: "Hands-On Cooking",
    subtitle: "Recipes From Generations",
    description: "Cook authentic dishes from scratch in a real Moroccan kitchen with traditional techniques.",
    details: [
      "Traditional spice blending",
      "Authentic tagine preparation",
      "Bread baking in wood oven",
      "Family recipes & cooking secrets"
    ],
    image: "/hero3.jpg",
    duration: "90 min",
    icon: FiActivity,
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    step: 4,
    title: "Feast & Return",
    subtitle: "The Heart of Hospitality",
    description: "Enjoy the meal you've created together, then relax as we drive you back to Taghazout.",
    details: [
      "Feast in authentic traditional home",
      "Mint tea ceremony with sweets",
      "Recipe booklet & certificate",
      "Comfortable return to Taghazout"
    ],
    image: "/hero4.jpg",
    duration: "60 min",
    icon: FiHeart,
    gradient: "from-rose-500 to-pink-500"
  }
];

const TheExperienceV3: React.FC = memo(() => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="px-6 lg:px-12 mb-12 lg:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
            <div className="mb-8 lg:mb-0">
              <span className="inline-block text-sm font-bold text-amber-600 tracking-[0.3em] uppercase mb-4">
                The Full Experience
              </span>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
                Your Authentic
                <br />
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                  Cooking Journey
                </span>
              </h2>
              
              <p className="text-lg text-gray-600 max-w-xl">
                From pickup to feast, every step is designed for authenticity, 
                connection, and unforgettable memories.
              </p>
            </div>

            {/* Navigation Arrows - Desktop */}
            <div className="hidden lg:flex gap-3">
              <button 
                onClick={() => scroll('left')}
                className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-amber-500 hover:text-amber-600 hover:shadow-lg transition-all duration-300"
                aria-label="Scroll left"
              >
                <FiArrowLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white hover:shadow-xl hover:scale-105 transition-all duration-300"
                aria-label="Scroll right"
              >
                <FiArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 lg:px-12 pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {experienceSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div 
                  key={step.step}
                  className="flex-shrink-0 snap-center w-[340px] sm:w-[380px] group"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] h-full">
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="380px"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${step.gradient} opacity-40`}></div>

                      {/* Step Number Badge */}
                      <div className="absolute top-6 left-6">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl ring-4 ring-white`}>
                          <span className="text-2xl font-black text-white">
                            {step.step}
                          </span>
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute top-6 right-6">
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                          <FiClock className="w-4 h-4 text-gray-700" />
                          <span className="text-sm font-bold text-gray-900">{step.duration}</span>
                        </div>
                      </div>

                      {/* Icon Badge - Bottom */}
                      <div className="absolute bottom-6 left-6">
                        <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <Icon className="w-6 h-6 text-gray-900" />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      {/* Subtitle */}
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-2">
                        {step.subtitle}
                      </span>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {step.description}
                      </p>

                      {/* Details List */}
                      <div className="space-y-3">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-600 leading-relaxed">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CTA Card */}
            <div className="flex-shrink-0 snap-center w-[340px] sm:w-[380px]">
              <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-10 h-full flex flex-col items-center justify-center text-center shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                  <FiHeart className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">
                  Ready to Cook?
                </h3>
                
                <p className="text-white/90 mb-8 leading-relaxed">
                  Book your authentic Moroccan cooking experience today.
                </p>

                <a 
                  href="/activities"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <span>Book Now</span>
                  <FiArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator Dots */}
          <div className="flex justify-center gap-2 mt-8 px-6 lg:px-12">
            {experienceSteps.map((step) => (
              <div 
                key={step.step}
                className="w-2 h-2 rounded-full bg-gray-300 hover:bg-amber-500 transition-colors cursor-pointer"
              ></div>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-16 px-6 lg:px-12 text-center">
          <p className="text-gray-500 text-sm">
            👉 Scroll or swipe to explore each step of your journey
          </p>
        </div>
      </div>

      {/* Hide scrollbar globally for this section */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
});

TheExperienceV3.displayName = 'TheExperienceV3';

export default TheExperienceV3;
