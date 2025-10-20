'use client';

import Hero from '@/components/Hero';
import HeroSection from '@/components/HeroSection';
import RoomsSection from '@/components/RoomsSection';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import { getStaticHeroData, getStaticHeroSectionData, getStaticRoomsSectionData, getStaticGoogleReviewsData } from '@/lib/static-data';

export default function HomePage() {
  const heroData = getStaticHeroData();
  const heroSectionData = getStaticHeroSectionData();
  const roomsSectionData = getStaticRoomsSectionData();
  const googleReviewsData = getStaticGoogleReviewsData();

  return (
    <>
      <Hero heroData={heroData} />
      <HeroSection data={heroSectionData} />
      
      {/* Yellow Water Separator */}
      <div className="relative py-12 lg:py-16 overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
        {/* Animated Yellow Water Circles Background */}
        <div className="absolute inset-0">
          {/* Large Yellow Water Bubbles */}
          <div className="absolute top-1/4 left-1/5 w-32 h-32 bg-gradient-to-br from-yellow-200/20 to-yellow-300/15 rounded-full animate-water-float-1 blur-sm"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-yellow-200/25 to-yellow-300/20 rounded-full animate-water-float-2 blur-sm"></div>
          <div className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-gradient-to-br from-yellow-200/20 to-yellow-300/15 rounded-full animate-water-float-3 blur-sm"></div>
          <div className="absolute bottom-1/4 right-1/5 w-20 h-20 bg-gradient-to-br from-yellow-300/25 to-yellow-200/20 rounded-full animate-water-float-4 blur-sm"></div>
          
          {/* Medium Yellow Water Bubbles */}
          <div className="absolute top-1/2 left-1/6 w-16 h-16 bg-gradient-to-br from-yellow-200/30 to-yellow-200/25 rounded-full animate-water-drift-1 blur-sm"></div>
          <div className="absolute top-2/3 right-1/6 w-14 h-14 bg-gradient-to-br from-yellow-200/25 to-yellow-200/20 rounded-full animate-water-drift-2 blur-sm"></div>
          <div className="absolute bottom-1/2 left-2/3 w-18 h-18 bg-gradient-to-br from-yellow-200/20 to-yellow-300/25 rounded-full animate-water-drift-3 blur-sm"></div>
          <div className="absolute bottom-2/3 right-1/3 w-12 h-12 bg-gradient-to-br from-yellow-200/30 to-yellow-200/25 rounded-full animate-water-drift-4 blur-sm"></div>
          
          {/* Small Yellow Water Bubbles */}
          <div className="absolute top-1/6 left-1/4 w-8 h-8 bg-gradient-to-br from-yellow-300/35 to-yellow-200/30 rounded-full animate-water-bubble-1 blur-sm"></div>
          <div className="absolute top-3/4 right-1/5 w-6 h-6 bg-gradient-to-br from-yellow-300/30 to-yellow-200/25 rounded-full animate-water-bubble-2 blur-sm"></div>
          <div className="absolute bottom-1/6 left-1/2 w-10 h-10 bg-gradient-to-br from-yellow-300/25 to-yellow-200/30 rounded-full animate-water-bubble-3 blur-sm"></div>
          <div className="absolute bottom-3/4 right-1/2 w-7 h-7 bg-gradient-to-br from-yellow-300/35 to-yellow-200/30 rounded-full animate-water-bubble-4 blur-sm"></div>
        </div>

        {/* Main Content */}
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12 text-center z-10">
          {/* Yellow Icon */}
          <div className="mb-10">
            <div className="inline-flex items-center justify-center relative">
              {/* Glowing Ring */}
              <div className="absolute w-32 h-32 bg-gradient-to-r from-yellow-400/20 via-yellow-400/30 to-yellow-400/20 rounded-full animate-pulse-glow blur-sm"></div>
              <div className="absolute w-24 h-24 bg-gradient-to-r from-yellow-400/15 to-yellow-400/25 rounded-full animate-pulse-glow blur-sm" style={{ animationDelay: '0.5s' }}></div>
              
              {/* Main Icon */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl border border-white/50">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h3 className="text-2xl lg:text-3xl font-bold text-dark-blue tracking-wide">
              Your Adventure Awaits
            </h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Discover our carefully designed spaces where comfort meets adventure in Morocco's most beautiful coastal region
            </p>
          </div>

          {/* Yellow Decorative Elements */}
          <div className="mt-12 flex items-center justify-center space-x-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"></div>
            <div className="w-3 h-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent via-yellow-400/60 to-transparent"></div>
          </div>
        </div>
      </div>
      
      <RoomsSection data={roomsSectionData} />
      
      {/* Yellow Moving Gradient Separator */}
      <div className="relative py-12 lg:py-16 overflow-hidden">
        {/* Animated Moving Yellow Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100 animate-gradient-flow"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-yellow-50/30 via-yellow-50/20 to-yellow-50/40 animate-gradient-flow-reverse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/20 via-yellow-100/30 to-yellow-50/20 animate-gradient-flow-slow"></div>
        
        {/* Yellow Floating Elements */}
        <div className="absolute inset-0">
          {/* Large Yellow Circles */}
          <div className="absolute top-1/4 left-1/6 w-40 h-40 bg-gradient-to-br from-yellow-200/30 to-yellow-200/20 rounded-full animate-cozy-float-1 blur-md"></div>
          <div className="absolute top-1/3 right-1/5 w-32 h-32 bg-gradient-to-br from-yellow-200/25 to-yellow-200/30 rounded-full animate-cozy-float-2 blur-md"></div>
          <div className="absolute bottom-1/3 left-1/4 w-36 h-36 bg-gradient-to-br from-yellow-200/20 to-yellow-200/25 rounded-full animate-cozy-float-3 blur-md"></div>
          <div className="absolute bottom-1/4 right-1/6 w-28 h-28 bg-gradient-to-br from-yellow-200/35 to-yellow-200/20 rounded-full animate-cozy-float-4 blur-md"></div>
          
          {/* Medium Yellow Elements */}
          <div className="absolute top-1/2 left-1/8 w-24 h-24 bg-gradient-to-br from-yellow-200/40 to-yellow-200/25 rounded-full animate-cozy-drift-1 blur-sm"></div>
          <div className="absolute top-2/3 right-1/8 w-20 h-20 bg-gradient-to-br from-yellow-200/30 to-yellow-200/35 rounded-full animate-cozy-drift-2 blur-sm"></div>
          <div className="absolute bottom-1/2 left-3/4 w-26 h-26 bg-gradient-to-br from-yellow-200/25 to-yellow-200/30 rounded-full animate-cozy-drift-3 blur-sm"></div>
          <div className="absolute bottom-2/3 right-1/4 w-22 h-22 bg-gradient-to-br from-yellow-200/20 to-yellow-200/40 rounded-full animate-cozy-drift-4 blur-sm"></div>
          
          {/* Small Yellow Particles */}
          <div className="absolute top-1/6 left-1/3 w-12 h-12 bg-gradient-to-br from-yellow-300/50 to-yellow-300/40 rounded-full animate-cozy-bubble-1 blur-sm"></div>
          <div className="absolute top-3/4 right-1/3 w-10 h-10 bg-gradient-to-br from-yellow-300/45 to-yellow-300/50 rounded-full animate-cozy-bubble-2 blur-sm"></div>
          <div className="absolute bottom-1/6 left-1/2 w-14 h-14 bg-gradient-to-br from-yellow-300/40 to-yellow-300/45 rounded-full animate-cozy-bubble-3 blur-sm"></div>
          <div className="absolute bottom-3/4 right-1/2 w-8 h-8 bg-gradient-to-br from-yellow-300/55 to-yellow-300/35 rounded-full animate-cozy-bubble-4 blur-sm"></div>
        </div>

        {/* Main Content */}
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12 text-center z-10">
          {/* Yellow Icon with Glow */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center relative">
              {/* Multiple Yellow Glowing Rings */}
              <div className="absolute w-48 h-48 bg-gradient-to-r from-yellow-300/20 via-yellow-300/25 to-yellow-300/20 rounded-full animate-cozy-glow-1 blur-lg"></div>
              <div className="absolute w-36 h-36 bg-gradient-to-r from-yellow-300/25 to-yellow-300/30 rounded-full animate-cozy-glow-2 blur-lg"></div>
              <div className="absolute w-24 h-24 bg-gradient-to-r from-yellow-300/30 to-yellow-300/20 rounded-full animate-cozy-glow-3 blur-lg"></div>
              
              {/* Main Yellow Icon */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-white/95 to-primary-pale/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl border border-primary-border/50">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h3 className="text-2xl lg:text-3xl font-bold text-dark-blue tracking-wide leading-tight">
              Where Memories Are Made
            </h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Experience the warmth of our community and create unforgettable moments in Morocco's most welcoming surf house
            </p>
          </div>

          {/* Yellow Decorative Elements */}
          <div className="mt-16 flex items-center justify-center space-x-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-300/70 to-transparent"></div>
            <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            <div className="w-4 h-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
            <div className="w-24 h-px bg-gradient-to-l from-transparent via-yellow-300/70 to-transparent"></div>
          </div>
        </div>
      </div>
      
      <GoogleReviewsSection data={googleReviewsData} />
      
      {/* Visual Separator - Optimized Performance */}
      <div className="relative py-12 lg:py-16 overflow-hidden group hover:py-14 lg:hover:py-18 transition-all duration-300">
        {/* Simple Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 via-orange-500 to-orange-600"></div>
        
        {/* Minimal Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-white/50 rounded-full animate-pulse"></div>
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-24 text-center">
          {/* Compact Star Design */}
          <div className="mb-6 group-hover:scale-105 transition-transform duration-300">
            <div className="inline-flex items-center justify-center relative">
              {/* Single Glow Ring */}
              <div className="absolute w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
              
              {/* Rotating Star */}
              <div className="relative z-10">
                <svg className="w-8 h-8 text-white drop-shadow-lg animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Simple Lines */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-6">
              <div className="w-16 h-px bg-white/60"></div>
              <div className="w-2 h-2 bg-white/80 rotate-45"></div>
              <div className="w-16 h-px bg-white/60"></div>
            </div>
          </div>

          {/* Compact Typography */}
          <div className="space-y-2 group-hover:space-y-3 transition-all duration-300">
            <h3 className="text-2xl lg:text-3xl font-black text-white tracking-wide uppercase drop-shadow-lg group-hover:text-3xl lg:group-hover:text-4xl transition-all duration-300">
              DISCOVER
            </h3>
            <h4 className="text-lg lg:text-xl font-bold text-white/90 tracking-wide drop-shadow group-hover:text-xl lg:group-hover:text-2xl transition-all duration-300">
              What Makes Us Special
            </h4>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="mt-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto"></div>
          </div>
        </div>
      </div>
      
      {/* Professional Features Section */}
      <section className="py-24 px-6 lg:px-24 bg-soft-beige">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight uppercase text-text-primary mb-8">
              WHY CHOOSE CACTUS SURF & SKATE HOUSE?
            </h2>
            <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              Experience the perfect blend of adventure, relaxation, and cultural immersion in Morocco's most beautiful coastal region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Professional Feature 1 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-dark transition-colors duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">Prime Location</h3>
              <p className="text-gray-600 leading-relaxed">
                Centrally located in Tamraght, just minutes from world-class surf breaks, skate spots, and cultural attractions.
              </p>
            </div>

            {/* Professional Feature 2 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-dark transition-colors duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">Expert Instructors</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from certified surf, skate, and yoga instructors with years of experience in Morocco's best spots.
              </p>
            </div>

            {/* Professional Feature 3 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-dark transition-colors duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">Modern Accommodation</h3>
              <p className="text-gray-600 leading-relaxed">
                Spacious rooms with modern amenities, traditional Moroccan decoration, and stunning rooftop terrace views.
              </p>
            </div>

            {/* Professional Feature 4 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-dark transition-colors duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">Memorable Experiences</h3>
              <p className="text-gray-600 leading-relaxed">
                Create lifelong memories with rooftop BBQs, movie nights, cooking classes, and day trips to Paradise Valley.
              </p>
            </div>

            {/* Professional Feature 5 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-dark transition-colors duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">All-Inclusive Packages</h3>
              <p className="text-gray-600 leading-relaxed">
                Everything you need is included: accommodation, meals, equipment, transport, and unforgettable activities.
              </p>
            </div>

            {/* Professional Feature 6 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-dark transition-colors duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">Community Vibe</h3>
              <p className="text-gray-600 leading-relaxed">
                Join a welcoming community of travelers from around the world and make lifelong friendships.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="bg-warm-white rounded-3xl p-10 lg:p-16 shadow-xl max-w-5xl mx-auto border border-warm-gray-200/50">
              <h3 className="text-3xl lg:text-4xl font-bold text-dark-blue mb-6">
                Ready to Experience Morocco Like Never Before?
              </h3>
              <p className="text-xl text-text-secondary mb-10 max-w-3xl mx-auto leading-relaxed">
                Join hundreds of travelers who have discovered the magic of Cactus Surf & Skate House.
                Book your stay today and get ready for an unforgettable adventure.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => window.location.href = '/packages'}
                  className="px-10 py-5 bg-primary font-bold uppercase tracking-wide rounded-xl hover:bg-primary-dark hover:shadow-lg hover:scale-105 transition-all duration-300" style={{ color: '#084869' }}
                >
                  View Our Packages
                </button>
                <button
                  onClick={() => window.location.href = '/houseandrooms'}
                  className="px-10 py-5 bg-transparent border-2 border-primary font-bold uppercase tracking-wide rounded-xl hover:bg-primary hover:shadow-lg hover:scale-105 transition-all duration-300" style={{ color: '#084869' }}
                >
                  Explore Our Rooms
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
