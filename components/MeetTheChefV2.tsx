'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiStar, FiAward, FiMapPin, FiClock, FiUsers } from 'react-icons/fi';

/**
 * MEET THE CHEF SECTION - Design 2
 * 
 * Design 2: Personal Storytelling Spotlight
 * 
 * Aesthetic: Warm, intimate, editorial
 * - Large hero image of Rabab
 * - Personal story in elegant layout
 * - Split-screen design
 * - Milestone badges
 * - Personal quote highlight
 * - Call to action
 */

const chefData = {
  name: "Rabab",
  title: "Your Host & Chef",
  tagline: "Keeper of Amazigh Culinary Traditions",
  image: "/rabab.png",
  experience: "15+ Years",
  guestsServed: "500+",
  location: "Tamraght, Morocco",
  story: {
    intro: "Growing up in the Atlas Mountains, I learned to cook from my grandmother in her traditional kitchen. Every recipe she shared came with a story—of our ancestors, our land, and our culture.",
    passion: "Cooking is more than preparing food. It's an act of love, a way to connect with others, and a bridge between generations. When I cook, I'm not just making tagine—I'm sharing centuries of Amazigh heritage.",
    mission: "My dream has always been to share these traditions with the world. Every class I teach is an opportunity to pass on what my grandmother taught me, and to show guests the real Morocco—through its flavors, its stories, and its warmth."
  },
  quote: "When you cook with love, you feed more than the body—you nourish the soul.",
  highlights: [
    { icon: FiAward, text: "Traditional Amazigh Recipes" },
    { icon: FiHeart, text: "Family Recipes Passed Down 4 Generations" },
    { icon: FiMapPin, text: "Authentic Local Ingredients" },
    { icon: FiUsers, text: "Personalized Small Group Classes" }
  ],
  milestones: [
    { number: "15+", label: "Years Cooking" },
    { number: "500+", label: "Happy Guests" },
    { number: "50+", label: "Traditional Recipes" },
    { number: "4th", label: "Generation Chef" }
  ]
};

const MeetTheChefV2: React.FC = memo(() => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-amber-50/20 to-white">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-orange-200/40 to-amber-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-yellow-200/40 to-orange-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 mb-6">
            <span className="text-2xl">👩‍🍳</span>
            <span className="text-sm font-bold text-amber-900 tracking-wider uppercase">
              Meet Your Chef
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            The Heart Behind{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Every Dish
            </span>
          </h2>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={chefData.image}
                alt="Rabab — Taghazout cooking class host and Berber cultural guide in Atlas Mountains Morocco"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Name Overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-5xl lg:text-6xl font-black text-white mb-2">
                  {chefData.name}
                </h3>
                <p className="text-amber-400 font-semibold text-xl">
                  {chefData.tagline}
                </p>
              </div>

              {/* Experience Badge */}
              <div className="absolute top-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-2">
                    <FiStar className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="text-lg font-bold text-gray-900">{chefData.experience}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">Experience</p>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20 blur-3xl -z-10"></div>
          </div>

          {/* Right - Story */}
          <div className="space-y-8">
            {/* Title */}
            <div>
              <p className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">
                My Story
              </p>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                A Journey Through Generations
              </h3>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {chefData.story.intro}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {chefData.story.passion}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {chefData.story.mission}
              </p>
            </div>

            {/* Quote */}
            <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-l-4 border-amber-500">
              <div className="absolute -top-4 left-6 text-6xl text-amber-300 font-serif">&ldquo;</div>
              <p className="text-xl lg:text-2xl text-gray-800 italic leading-relaxed relative z-10">
                {chefData.quote}
              </p>
              <p className="mt-4 text-amber-600 font-bold">— {chefData.name}</p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {chefData.highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-md border border-gray-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{highlight.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {chefData.milestones.map((milestone, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-2">
                {milestone.number}
              </div>
              <p className="text-gray-600 font-semibold">{milestone.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-10 lg:p-16 shadow-xl border border-amber-200">
            <div className="mb-6">
              <span className="text-5xl">🍲</span>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ready to Cook with Rabab?
            </h3>
            
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join me in my traditional kitchen and discover the secrets of authentic Moroccan cuisine. 
              Let&apos;s create delicious memories together!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span>Book a Class with Rabab</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              <Link 
                href="/faq-contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-xl border-2 border-gray-200 hover:border-amber-500 hover:shadow-lg transition-all duration-300"
              >
                <span>Ask Rabab a Question</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

MeetTheChefV2.displayName = 'MeetTheChefV2';

export default MeetTheChefV2;
