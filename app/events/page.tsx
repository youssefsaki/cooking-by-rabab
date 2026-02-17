'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiClock, FiUsers, FiMapPin, FiArrowRight } from 'react-icons/fi';

// SEO optimized for Amazigh music, Moroccan cultural events, Taghazout traditional music, Ahwach performance
export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section - Optimized for 13" */}
      <section className="relative min-h-[85vh] flex items-center">
        {/* Left Side - Coral/Orange Background with Content */}
        <div className="absolute inset-0 lg:inset-y-0 lg:left-0 lg:w-[45%] bg-gradient-to-br from-orange-400 via-orange-500 to-red-400">
          {/* Large Circle Decoration */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-500/30 -translate-x-1/2" />
        </div>

        {/* Right Side - Teal Background */}
        <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-[45%] bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-500">
          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 text-white/20 text-6xl">✨</div>
          <div className="absolute top-40 right-40 text-white/20 text-4xl">🎵</div>
          <div className="absolute bottom-40 right-60 text-white/20 text-5xl">✨</div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[500px]">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div>
                <div className="inline-block mb-3">
                  <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/90">
                    Weekly Cultural Event
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-5">
                  LIVE THE
                  <br />
                  <span className="italic font-light">Amazigh</span>
                  <br />
                  MUSIC
                </h1>
                <p className="text-base text-white/90 leading-relaxed max-w-lg">
                  Immerse yourself in the rich musical heritage of the Souss-Massa region. 
                  Experience traditional Ahwach performances, cultural storytelling, and authentic 
                  Amazigh music every Thursday night.
                </p>
              </div>

              {/* Event Info Pills */}
              <div className="flex flex-wrap gap-2.5">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                  <FiCalendar className="w-4 h-4" />
                  <span className="text-sm font-bold">Every Thursday</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                  <FiClock className="w-4 h-4" />
                  <span className="text-sm font-bold">17:00 - 18:00</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                  <FiMapPin className="w-4 h-4" />
                  <span className="text-sm font-bold">Atlas Mountains</span>
                </div>
              </div>
            </div>

            {/* Right Side - Musician Image Placeholder */}
            <div className="relative">
              <div className="relative h-[420px] lg:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl flex items-center justify-center">
                {/* Placeholder for musician image */}
                <div className="text-center p-8">
                  <div className="w-28 h-28 mx-auto mb-5 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-5xl">🎸</span>
                  </div>
                  <p className="text-xl font-bold text-white mb-2">Amazigh Musicians</p>
                  <p className="text-base text-white/70">Photo Coming Soon</p>
                </div>

                {/* Decorative Text Overlay */}
                <div className="absolute top-8 left-8">
                  <p className="text-white/30 text-7xl font-black italic leading-none">
                    Live
                    <br />
                    <span className="text-5xl">the Music</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Instruments Section - Optimized for 13" */}
      <section className="relative py-16 bg-gradient-to-r from-orange-400 to-teal-400">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {[
              { name: 'Bendir', icon: '🥁' },
              { name: 'Ribab', icon: '🎻' },
              { name: 'Talount', icon: '🪘' },
              { name: 'Lutar', icon: '🎸' },
              { name: 'Talâouwadt', icon: '🎺' },
              { name: 'Allun', icon: '🥁' }
            ].map((instrument, index) => (
              <div 
                key={index}
                className="flex items-center gap-2.5 bg-white/20 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/30 hover:bg-white/30 transition-all"
              >
                <span className="text-xl">{instrument.icon}</span>
                <span className="text-white font-bold text-base">{instrument.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect Section - Optimized for 13" */}
      <section className="relative py-16 bg-gradient-to-br from-teal-500 via-teal-400 to-emerald-400 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-white/10 text-9xl font-black">✨</div>
        <div className="absolute bottom-10 right-10 text-white/10 text-9xl font-black">🎵</div>
        
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
              WHAT TO EXPECT
            </h2>
            <div className="w-20 h-1 bg-white/50 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-3">🎭</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Ahwach Performance</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Watch authentic Ahwach dance and music performed in traditional circles, combining 
                singing, dancing, and poetry led by local Amazigh artists.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-3">📖</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Cultural Storytelling</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Experience traditional poetry and stories that have been passed down through 
                generations, celebrating Amazigh heritage and connection to the land.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-3">🎶</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Live Musicians</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Enjoy live performances featuring traditional instruments including the Bendir drum, 
                Ribab string instrument, and the Talâouwadt flute.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-3">🍵</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Tea & Refreshments</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Enjoy traditional Moroccan mint tea and local sweets in the authentic 
                atmosphere of an Amazigh cultural gathering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Optimized for 13" */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Join Us This{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Thursday
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Experience the soul of Amazigh culture through music and storytelling. 
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-10 py-5 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-2xl hover:scale-105 text-base"
          >
            <span>BOOK NOW</span>
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
