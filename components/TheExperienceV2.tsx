'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { FiArrowRight, FiMapPin, FiHome, FiActivity, FiHeart } from 'react-icons/fi';

/**
 * THE COOKING CLASS EXPERIENCE SECTION - Design 2 of 3
 * 
 * Design 2: Split-Screen Editorial Magazine Style
 * 
 * Aesthetic: High-fashion editorial with alternating image/content layout
 * - Large immersive images (50% screen)
 * - Content panels alternate left/right
 * - Minimal, elegant typography
 * - Step numbers as large decorative elements
 * - Smooth transitions
 * - Vertical storytelling flow
 */

interface ExperienceStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  duration: string;
  icon: any;
}

const experienceSteps: ExperienceStep[] = [
  {
    step: 1,
    title: "Pickup & Journey",
    subtitle: "Your Adventure Begins",
    description: "We pick you up from Taghazout and take you on a scenic 15-20 minute drive through the stunning Moroccan countryside to an authentic traditional home. Watch the landscape transform as we leave the coast behind.",
    highlights: [
      "Comfortable pickup from Taghazout",
      "Scenic countryside drive",
      "Learn about local culture",
      "Arrive at traditional home"
    ],
    image: "/activities/paradise-valley.jpg",
    duration: "20 min",
    icon: FiMapPin
  },
  {
    step: 2,
    title: "Traditional Kitchen Tour",
    subtitle: "Where Magic Happens",
    description: "Step into an authentic Moroccan kitchen and discover the traditional tools and techniques that have been used for generations. See the wood-fired oven, traditional tagines, and the workspace where you'll create your feast.",
    highlights: [
      "Welcome with fresh mint tea",
      "Explore authentic kitchen",
      "Wood-fired oven demonstration",
      "Traditional cooking tools"
    ],
    image: "/hero2.jpg",
    duration: "20 min",
    icon: FiHome
  },
  {
    step: 3,
    title: "Hands-On Cooking",
    subtitle: "Recipes From Generations",
    description: "In a real Moroccan kitchen, learn authentic cooking techniques passed down through generations. From preparing tagine to baking fresh bread in a traditional wood-fired oven—this is cooking as it's meant to be.",
    highlights: [
      "Traditional spice blending",
      "Authentic tagine preparation",
      "Bread making in wood oven",
      "Family recipes & secrets"
    ],
    image: "/hero3.jpg",
    duration: "90 min",
    icon: FiActivity
  },
  {
    step: 4,
    title: "Feast & Return",
    subtitle: "The Heart of Hospitality",
    description: "Gather around the table in a traditional Moroccan home to enjoy the incredible meal you've created. Share stories, laughter, and experience true Moroccan hospitality before we drive you back to Taghazout.",
    highlights: [
      "Feast in authentic setting",
      "Mint tea ceremony",
      "Recipe booklet & certificate",
      "Return to Taghazout"
    ],
    image: "/hero4.jpg",
    duration: "60 min",
    icon: FiHeart
  }
];

const TheExperienceV2: React.FC = memo(() => {
  return (
    <section className="relative bg-white">
      {/* Header Section - Mobile Optimized */}
      <div className="relative py-16 sm:py-20 lg:py-28 px-6 lg:px-12 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-[0.25em] sm:tracking-[0.3em] uppercase">
              The Journey
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 sm:mb-8 leading-tight px-4">
            An Authentic
            <br />
            <span className="italic font-light">Moroccan</span>
            <br />
            Experience
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            From your doorstep to a traditional home, every moment is crafted for authenticity and connection.
          </p>
        </div>
      </div>

      {/* Steps - Alternating Split Layout */}
      {experienceSteps.map((step, index) => {
        const isEven = index % 2 === 0;
        const Icon = step.icon;

        return (
          <div 
            key={step.step}
            className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-auto lg:min-h-[700px]`}
          >
            {/* Image Side - Mobile Optimized */}
            <div className="relative w-full lg:w-1/2 h-[50vh] min-h-[400px] sm:h-[55vh] lg:h-auto">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={index === 0}
              />
              
              {/* Image Overlay - Enhanced for Mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:via-black/10 lg:to-black/40"></div>
              
              {/* Large Step Number - Desktop Only */}
              <div className="hidden lg:block absolute bottom-12 right-12 text-white/20">
                <span className="text-[200px] font-black leading-none">
                  {String(step.step).padStart(2, '0')}
                </span>
              </div>

              {/* Mobile: Step Number Badge (Bottom Left) */}
              <div className="lg:hidden absolute bottom-6 left-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl ring-4 ring-white/30">
                  <span className="text-2xl font-black text-white">
                    {step.step}
                  </span>
                </div>
              </div>

              {/* Duration Badge - Mobile Optimized */}
              <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
                <div className="bg-white/95 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-lg">
                  <span className="text-xs sm:text-sm font-bold text-gray-900">{step.duration}</span>
                </div>
              </div>

              {/* Mobile: Icon Badge (Top Right) */}
              <div className="lg:hidden absolute top-6 right-6">
                <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <Icon className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>

            {/* Content Side - Mobile Optimized */}
            <div className="relative w-full lg:w-1/2 flex items-center bg-white">
              <div className="w-full px-6 py-10 sm:px-8 sm:py-12 lg:px-16 lg:py-20">
                {/* Step Badge - Desktop Only */}
                <div className="hidden lg:flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-amber-600 tracking-wider uppercase">
                      Step {step.step}
                    </span>
                  </div>
                </div>

                {/* Mobile: Step Label */}
                <div className="lg:hidden mb-4">
                  <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
                    Step {step.step} of {experienceSteps.length}
                  </span>
                </div>

                {/* Title - Mobile Optimized */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                  {step.title}
                </h3>

                {/* Subtitle - Mobile Optimized */}
                <p className="text-lg sm:text-xl text-amber-600 font-medium mb-5 sm:mb-6 italic">
                  {step.subtitle}
                </p>

                {/* Description - Mobile Optimized */}
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
                  {step.description}
                </p>

                {/* Highlights - Mobile Optimized */}
                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                  {step.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                      <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Step Counter */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-200"></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-400">
                    {step.step} / {experienceSteps.length}
                  </span>
                  <div className="h-px flex-1 bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom CTA Section - Mobile Optimized */}
      <div className="relative py-16 sm:py-20 lg:py-28 px-6 lg:px-12 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <span className="text-5xl sm:text-6xl">✨</span>
          </div>
          
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
            Experience Authentic Morocco
          </h3>
          
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            Join us for a journey that goes beyond cooking. This is connection, culture, and community—
            all wrapped in the warmth of Moroccan hospitality.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <a 
              href="/activities"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-base sm:text-lg rounded-full shadow-xl hover:shadow-2xl active:scale-95 sm:hover:scale-105 transition-all duration-300"
            >
              <span>Book Your Experience</span>
              <FiArrowRight className="w-5 h-5" />
            </a>
            
            <a 
              href="/faq-contact"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 font-bold text-base sm:text-lg rounded-full border-2 border-gray-200 hover:border-amber-500 active:scale-95 sm:hover:shadow-lg transition-all duration-300"
            >
              <span>Learn More</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

TheExperienceV2.displayName = 'TheExperienceV2';

export default TheExperienceV2;
