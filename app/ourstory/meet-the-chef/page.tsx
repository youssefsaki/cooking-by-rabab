'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

// SEO optimized for Moroccan cooking class, Amazigh culture, Taghazout experiences
export default function MeetTheChefPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Optimized for 13" */}
      <section className="pt-28 pb-12 px-6 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-lg border border-amber-200 mb-4">
            <span className="text-xl">👩‍🍳</span>
            <span className="text-xs font-bold text-amber-900 tracking-wider uppercase">
              Meet Rabab
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Your Host &{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Cultural Guide
            </span>
          </h1>
        </div>
      </section>

      {/* Main Content - Optimized for 13" */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image Placeholder */}
            <div className="relative h-[420px] lg:h-[500px] bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-200 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-28 h-28 mx-auto mb-5 bg-white/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-5xl">👩‍🍳</span>
                </div>
                <p className="text-xl font-bold text-amber-900 mb-2">Rabab</p>
                <p className="text-base text-amber-700">Photo Coming Soon</p>
              </div>
            </div>

            {/* Story Content */}
            <div className="space-y-5">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-3">
                  Hello, I'm Rabab
                </h2>
                <div className="w-14 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mb-5"></div>
              </div>

              <div className="prose prose-base max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                  My name is Rabab, and I was born and raised in the Atlas Mountains. With a background 
                  in Business Management, I decided in 2024 to launch my own project: an authentic cooking 
                  class and cultural experience.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                  As an Amazigh woman, my mission is to share my culture with the world and the travelers 
                  who come to the Taghazout area.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                  Located just 15 minutes above Taghazout, I have started a local workshop that is a direct 
                  collaboration with village women. This project is designed to give an authentic and immersive 
                  experience to those who want to discover the real Morocco beyond the surf.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                  In my workshop, I teach you how to prepare Amazigh food using the original tools and 
                  techniques of my roots, which have been passed down for 10,000 years in North Africa.
                </p>

                <p className="text-gray-700 leading-relaxed font-semibold text-amber-700 text-sm sm:text-base">
                  By joining my workshop, you are helping me bring value to these local women, allowing them 
                  to be productive and earn the financial independence they need to support their families.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Optimized for 13" */}
      <section className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Cook With{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Rabab
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Join me in the mountains for an authentic cultural experience and support our local community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-xl hover:scale-105"
            >
              <span>Book Your Class</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 font-bold px-8 py-4 rounded-full border-2 border-gray-200 hover:border-amber-500 transition-all duration-300 shadow-lg"
            >
              <span>View Packages</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
