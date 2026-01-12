'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { FiShoppingBag, FiAward, FiCoffee, FiHeart, FiCheck, FiArrowRight } from 'react-icons/fi';

/**
 * THE COOKING CLASS EXPERIENCE SECTION - Design 2 of 3
 * 
 * Design 2: Step-by-Step Visual Journey (Cooking Class Focused)
 * 
 * Aesthetic: Magazine-style with large images and step cards
 * - Horizontal step flow showing cooking class journey
 * - Big imagery with overlay cards
 * - Focus on Market → Prep → Cook → Eat journey
 * - Interactive hover effects
 * - Recipe book aesthetic
 */

interface StepItem {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  duration: string;
  icon: any;
  color: string;
}

const cookingSteps: StepItem[] = [
  {
    step: 1,
    title: "Pickup & Journey",
    subtitle: "Your Adventure Begins",
    description: "We pick you up from Taghazout and take you on a scenic 15-20 minute drive through the stunning Moroccan countryside to an authentic traditional home. Watch the landscape transform as we leave the coast behind.",
    highlights: [
      "Comfortable pickup from your location in Taghazout",
      "Scenic drive through Moroccan villages and countryside",
      "Learn about local culture and traditions along the way",
      "Arrival at a genuine traditional Moroccan home"
    ],
    image: "/activities/paradise-valley.jpg",
    duration: "20 min",
    icon: FiShoppingBag,
    color: "from-blue-500 to-cyan-500"
  },
  {
    step: 2,
    title: "Traditional Kitchen Tour",
    subtitle: "Where Magic Happens",
    description: "Step into an authentic Moroccan kitchen and discover the traditional tools and techniques that have been used for generations. See the wood-fired oven, traditional tagines, and the workspace where you'll create your feast.",
    highlights: [
      "Traditional Moroccan welcome with fresh mint tea",
      "Explore the authentic traditional kitchen setup",
      "Learn about the wood-fired oven and how it works",
      "Discover traditional cooking tools and their purposes",
      "Meet your host and hear family cooking stories"
    ],
    image: "/hero2.jpg",
    duration: "20 min",
    icon: FiAward,
    color: "from-orange-500 to-red-500"
  },
  {
    step: 3,
    title: "Hands-On Cooking",
    subtitle: "Recipes From Generations",
    description: "In a real Moroccan kitchen, learn authentic cooking techniques passed down through generations. From preparing tagine to baking fresh bread in a traditional wood-fired oven—this is cooking as it's meant to be.",
    highlights: [
      "Learn traditional spice blending and preparation",
      "Prepare authentic tagine, couscous, or seasonal dishes",
      "Master Moroccan bread making (khobz) in wood-fired oven",
      "Discover family recipes and cooking secrets",
      "Cook in an authentic traditional kitchen setting"
    ],
    image: "/hero2.jpg",
    duration: "90 min",
    icon: FiCoffee,
    color: "from-yellow-500 to-amber-500"
  },
  {
    step: 4,
    title: "Feast & Return",
    subtitle: "The Heart of Hospitality",
    description: "Gather around the table in a traditional Moroccan home to enjoy the incredible meal you've created. Share stories, laughter, and experience true Moroccan hospitality before we drive you back to Taghazout.",
    highlights: [
      "Enjoy your homemade feast in an authentic setting",
      "Traditional mint tea ceremony and Moroccan sweets",
      "Receive your recipe booklet to recreate dishes at home",
      "Certificate of completion",
      "Comfortable return drive to Taghazout"
    ],
    image: "/hero4.jpg",
    duration: "60 min + return",
    icon: FiHeart,
    color: "from-rose-500 to-pink-500"
  }
];

const TheExperience: React.FC = memo(() => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-[#FDF8F3]">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-md mb-6 border border-orange-100">
            <FiCoffee className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-bold text-orange-900 tracking-wider uppercase">
              The Cooking Experience
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2D1810] mb-6">
            An{' '}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
              Authentic
            </span>
            {' '}Journey
          </h2>
          
          <p className="text-lg lg:text-xl text-[#5D4037] max-w-3xl mx-auto leading-relaxed">
            More than just a cooking class—we take you to a real traditional Moroccan home.
            From pickup in Taghazout to feast in an authentic setting, this is an immersive cultural experience.
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {cookingSteps.map((step) => {
            const Icon = step.icon;
            
            return (
              <div 
                key={step.step}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Image Section */}
                <div className="relative h-64 lg:h-72 overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${step.color} opacity-60`}></div>
                  
                  {/* Step Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-black text-[#2D1810]">{step.step}</span>
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-sm font-bold text-[#2D1810]">{step.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-10">
                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#2D1810] mb-2">
                    {step.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-orange-600 font-semibold mb-4 italic">
                    {step.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-[#5D4037] leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-3">
                    {step.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#5D4037] leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5">
                  <Icon className="w-full h-full text-[#2D1810]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Flow Indicator */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {cookingSteps.map((step, index) => (
            <React.Fragment key={step.step}>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                  {step.step}
                </div>
                <span className="text-xs font-medium text-[#5D4037] mt-2 hidden sm:block">
                  {step.title}
                </span>
              </div>
              {index < cookingSteps.length - 1 && (
                <FiArrowRight className="w-6 h-6 text-orange-400 hidden sm:block" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl p-10 lg:p-16 shadow-2xl border border-orange-100">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FiHeart className="w-8 h-8 text-orange-600" />
              <h3 className="text-3xl lg:text-4xl font-bold text-[#2D1810]">
                Ready to Cook Like a Local?
              </h3>
            </div>
            
            <p className="text-lg text-[#5D4037] mb-8 max-w-2xl mx-auto leading-relaxed">
              Join us for an unforgettable journey to an authentic traditional home. We handle everything—pickup from Taghazout, 
              transportation, and a complete cultural cooking experience. Perfect for all skill levels. Your Moroccan story starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/activities"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span>View Cooking Classes</span>
                <FiArrowRight className="w-5 h-5" />
              </a>
              
              <a 
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#2D1810] text-white font-bold rounded-xl hover:bg-[#4A2C20] transition-all duration-300"
              >
                <span>Book Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

TheExperience.displayName = 'TheExperience';

export default TheExperience;
