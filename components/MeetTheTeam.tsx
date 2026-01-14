'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { FiHeart, FiStar, FiAward } from 'react-icons/fi';

/**
 * MEET THE TEAM SECTION - Design 1 of 3
 * 
 * Design 1: Card Grid with Photos
 * 
 * Aesthetic: Warm, personal, trust-building
 * - Team member cards with photos
 * - Roles and expertise
 * - Personal stories/quotes
 * - Social proof (years of experience)
 */

interface TeamMember {
  name: string;
  role: string;
  expertise: string;
  description: string;
  image: string;
  experience: string;
  quote?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Rabab",
    role: "Founder & Head Chef",
    expertise: "Traditional Moroccan Cuisine",
    description: "Born and raised in Morocco, Rabab learned traditional cooking from her grandmother. With over 15 years of experience, she's passionate about sharing authentic Amazigh recipes and cultural stories.",
    image: "/hero1.jpg",
    experience: "15+ years",
    quote: "Food is love, culture, and connection. Every dish tells a story."
  },
  {
    name: "Hassan",
    role: "Surf Instructor",
    expertise: "Professional Surfer",
    description: "Local surf champion with 10+ years teaching all levels. Hassan knows every wave break on Morocco's coast and ensures safe, fun surfing experiences for everyone.",
    image: "/activities/surf.jpg",
    experience: "10+ years",
    quote: "The ocean teaches patience, respect, and joy."
  },
  {
    name: "Amina",
    role: "Yoga & Healing Guide",
    expertise: "Certified Yoga Instructor & Reiki Master",
    description: "Trained in India and certified in multiple healing modalities. Amina creates transformative experiences through yoga, meditation, and energy healing.",
    image: "/activities/yoga.jpg",
    experience: "8+ years",
    quote: "Healing happens when we reconnect with ourselves."
  },
  {
    name: "Youssef",
    role: "Adventure Coordinator",
    expertise: "Local Guide & Cultural Expert",
    description: "Born in Tamraght, Youssef knows every hidden gem from Paradise Valley to the Medina. He ensures every excursion is safe, fun, and culturally enriching.",
    image: "/activities/paradise-valley.jpg",
    experience: "12+ years",
    quote: "Morocco's beauty is best shared with open hearts."
  }
];

const MeetTheTeam: React.FC = memo(() => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-amber-50/30 to-white">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-orange-200/40 to-amber-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-yellow-200/40 to-orange-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 mb-6">
            <FiHeart className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-amber-900 tracking-wider uppercase">
              Our Team
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Meet Your{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Hosts
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Passionate locals who love sharing Moroccan culture, cuisine, and adventures. 
            We're not just guides—we're your friends and family away from home.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Image Section */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Experience Badge */}
                <div className="absolute top-6 right-6">
                  <div className="bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <FiStar className="w-4 h-4" />
                    <span className="text-sm font-bold">{member.experience}</span>
                  </div>
                </div>

                {/* Name & Role Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-amber-400 font-semibold text-lg">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                {/* Expertise Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 mb-4">
                  <FiAward className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-900">
                    {member.expertise}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {member.description}
                </p>

                {/* Quote */}
                {member.quote && (
                  <div className="relative pl-6 border-l-4 border-amber-500">
                    <p className="text-gray-700 italic leading-relaxed">
                      "{member.quote}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 lg:p-16 shadow-xl border border-amber-100">
            <div className="mb-6">
              <span className="text-5xl">🤝</span>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Join Our Family
            </h3>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              We treat every guest like family. From the moment you arrive to the day you leave, 
              we're here to make your Moroccan experience unforgettable.
            </p>

            <a 
              href="/packages"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>Book Your Experience</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

MeetTheTeam.displayName = 'MeetTheTeam';

export default MeetTheTeam;
