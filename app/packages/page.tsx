'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiClock, FiUsers, FiMapPin, FiCheck, FiArrowRight } from 'react-icons/fi';

const packagesData = [
  {
    id: "basic",
    name: "Basic Package",
    tagline: "Your Journey into the Mountains",
    subtitle: "A half-day immersive cultural experience",
    price: "500",
    currency: "MAD",
    duration: "6 hours",
    groupSize: "Up to 8 guests",
    startTime: "13:30",
    endTime: "19:30-20:00",
    pickup: "Taghazout Mosque",
    dropoff: "Taghazout or Tamraght",
    image: "/packages/basic.jpg",
    alt: "Moroccan cooking class in Atlas Mountains - Traditional tagine and bread baking experience in authentic Amazigh village near Taghazout",
    popular: true,
    itinerary: [
      {
        time: "13:30",
        title: "The Scenic Ascent",
        description: "Meet us at the Taghazout Mosque for a comfortable 15-minute drive into the Small Atlas Mountains. We'll wind through the Argan forest, where you can breathe the fresh mountain air and enjoy a breathtaking panoramic view of the ocean from above."
      },
      {
        time: "14:00",
        title: "A Warm Village Welcome",
        description: "Arrive at our village and step inside an ancient 300-year-old Amazigh house, one of the oldest in North Africa. Meet the local family and I will be your guided tour to show you how our ancestors lived in the heart of these mountains."
      },
      {
        time: "14:30",
        title: "The Garden Tea Ritual",
        description: "Relax in our authentic workshop and learn the art of Moroccan tea. You'll pick fresh mint and herbs directly from our small garden to brew your own pot. Enjoy your tea with homemade Moroccan sweets I've prepared for you, as we sit together for a warm conversation to get to know one another."
      },
      {
        time: "15:00",
        title: "Prepare The Traditional Bread",
        description: "Master the ancient art of village bread. You will knead your own dough by hand before baking it in our traditional stone oven. We fire the hearth with Argan wood, infusing the bread with a rich, smoky aroma and a golden crust that you can only find in the heart of the mountains."
      },
      {
        time: "15:30",
        title: "The Tagine Workshop",
        description: "Prepare an authentic Tagine by cleaning fresh vegetables, marinating your chicken or fish in special Moroccan spices, and mastering the sweet and salty combination as it slow-cooks over an Argan wood fire for a delicious, smoky aroma."
      },
      {
        time: "16:30",
        title: "The Ancient Millstone",
        description: "Experience the magic of making your own Amlou using a traditional stone millstone—one of our most ancient tools that we still preserve and use today. You will grind toasted almonds by hand, blending them with pure Argan oil and orange honey to create the most delicious spread you can taste in Morocco."
      },
      {
        time: "17:30",
        title: "The Family Feast & Sunset",
        description: "After half day of tradition and cooking, it is time to sit together as one family. Enjoy the delicious meal you created, sharing stories and laughter over the steaming Tagine and fresh bread. It is more than just a dinner; it is a moment of true Moroccan hospitality in the peaceful heart of the mountains, watching the sunset over the Atlas peaks before we begin our journey back to Taghazout."
      },
      {
        time: "19:00",
        title: "Journey Home",
        description: "After the sun sets and we've shared our final goodbyes, we begin the scenic drive back, dropping you directly in Taghazout or Tamraght by 19:30 – 20:00."
      }
    ],
    includes: [
      "Free pickup from Taghazout Mosque",
      "300-year-old Amazigh house tour",
      "Traditional Moroccan tea ceremony",
      "Village bread baking workshop",
      "Authentic tagine cooking",
      "Amlou making with ancient millstone",
      "Family-style feast with sunset views",
      "All ingredients and materials",
      "Return transport to Taghazout/Tamraght"
    ]
  },
  {
    id: "private",
    name: "Private Package",
    tagline: "Exclusive Mountain Experience",
    subtitle: "Personalized journey for you and your group",
    price: "800",
    currency: "MAD",
    duration: "6 hours",
    groupSize: "Private group (2-8 guests)",
    startTime: "Flexible",
    endTime: "Flexible",
    pickup: "Custom pickup available",
    dropoff: "Your accommodation",
    image: "/packages/private-chef.jpg",
    alt: "Private Moroccan cooking class with personal chef - Exclusive authentic cooking experience in traditional Atlas Mountains Amazigh home",
    itinerary: [
      {
        time: "Flexible",
        title: "Private Pickup",
        description: "We'll pick you up from your accommodation at your preferred time. Enjoy a comfortable private drive through the Argan forest with stunning ocean views from the mountains."
      },
      {
        time: "Start",
        title: "Exclusive House Welcome",
        description: "Private tour of our ancient 300-year-old Amazigh house. Take your time exploring and learning about our ancestral way of life with personalized attention."
      },
      {
        time: "+30 min",
        title: "Personalized Tea Ceremony",
        description: "Private tea ceremony in our garden. Pick your own fresh herbs and learn the authentic Moroccan tea ritual at your own pace."
      },
      {
        time: "+1 hour",
        title: "Bread Making Workshop",
        description: "Exclusive bread-making session. Knead your dough and bake it in our traditional stone oven with Argan wood, creating that signature smoky flavor."
      },
      {
        time: "+1.5 hours",
        title: "Custom Tagine Creation",
        description: "Choose your preferred ingredients and create your personalized tagine. We'll accommodate dietary preferences and teach you the authentic techniques with individual attention."
      },
      {
        time: "+2.5 hours",
        title: "Amlou Making Experience",
        description: "Private session using our ancient millstone. Grind toasted almonds by hand and blend with pure Argan oil and honey to create authentic Amlou."
      },
      {
        time: "+3.5 hours",
        title: "Private Family Feast",
        description: "Enjoy your meal in an intimate setting with your group. Share stories and experience genuine Moroccan hospitality while watching the sunset over the Atlas Mountains."
      },
      {
        time: "End",
        title: "Private Return Journey",
        description: "Comfortable private transport back to your accommodation at your preferred time."
      }
    ],
    includes: [
      "Private exclusive experience",
      "Flexible scheduling and timing",
      "Custom pickup and drop-off",
      "Personalized menu options",
      "300-year-old Amazigh house tour",
      "Complete cooking workshop",
      "All ingredients and materials",
      "Private family-style feast",
      "Dietary accommodations available",
      "Photography opportunities"
    ]
  }
];

export default function PackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const displayPackage = selectedPackage ? packagesData.find(pkg => pkg.id === selectedPackage) : null;

  return (
    <main className="min-h-screen bg-[#F5EFE7]">
      {/* Packages Cards Section - Optimized for 13" */}
      <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-300/30 to-amber-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Enhanced Header */}
          <div className="text-center mb-10 lg:mb-14">
            <div className="inline-block mb-5">
              <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-2xl border-2 border-amber-100">
                <span className="text-xl">🍽️</span>
                <span className="text-xs font-black text-amber-900 tracking-wider uppercase">
                  Authentic Experiences
                </span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
              Cooking Class{' '}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Packages
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
              Click on a package to explore the complete journey
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 max-w-6xl mx-auto mb-16">
            {packagesData.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)}
                className="group relative h-[520px] sm:h-[580px] lg:h-[560px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-300 will-change-transform"
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute top-6 right-6 z-30 pointer-events-none">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl">
                      ⭐ Most Popular
                    </div>
                  </div>
                )}

                {/* Background Image */}
                <div className="absolute inset-0 will-change-transform">
                  <Image
                    src={pkg.image}
                    alt={pkg.alt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    quality={85}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-300 ease-out group-hover:from-black/90 group-hover:via-black/70 group-hover:to-black/50" />

                {/* Default Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 transition-all duration-300 ease-out group-hover:opacity-0 group-hover:translate-y-2 will-change-transform">
                  <div className="space-y-3 mb-4">
                    <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                      <span className="text-white text-sm font-semibold">{pkg.duration} • {pkg.groupSize}</span>
                    </div>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
                    {pkg.name}
                  </h3>
                  <p className="text-lg sm:text-xl text-white/95 font-light leading-relaxed drop-shadow-md">
                    {pkg.tagline}
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white drop-shadow-lg">{pkg.price}</span>
                    <span className="text-xl text-white/90 font-semibold">{pkg.currency}</span>
                    <span className="text-sm text-white/80">per person</span>
                  </div>
                </div>

                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 will-change-transform">
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight drop-shadow-lg">
                        {pkg.name}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed drop-shadow-md mb-4">
                        {pkg.subtitle}
                      </p>

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl sm:text-4xl font-black text-white">{pkg.price}</span>
                        <span className="text-lg text-white/90 font-semibold">{pkg.currency}</span>
                        <span className="text-sm text-white/80">per person</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
                        <FiClock className="w-3.5 h-3.5 text-amber-300" />
                        <span className="text-white text-xs sm:text-sm font-medium">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
                        <FiUsers className="w-3.5 h-3.5 text-amber-300" />
                        <span className="text-white text-xs sm:text-sm font-medium">{pkg.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
                        <FiMapPin className="w-3.5 h-3.5 text-amber-300" />
                        <span className="text-white text-xs sm:text-sm font-medium">Atlas Mountains</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {pkg.includes.slice(0, 4).map((item, index) => (
                        <div key={index} className="flex items-center gap-2.5 text-white/95">
                          <span className="text-amber-300 text-sm flex-shrink-0">✦</span>
                          <span className="text-xs sm:text-sm leading-snug">{item}</span>
                        </div>
                      ))}
                      {pkg.includes.length > 4 && (
                        <div className="flex items-center gap-2.5 text-white/80 italic">
                          <span className="text-amber-300/60 text-sm">+</span>
                          <span className="text-xs sm:text-sm">and {pkg.includes.length - 4} more included...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPackage(pkg.id);
                        // Wait for React to render the dynamic details section, then scroll
                        setTimeout(() => {
                          const detailsSection = document.getElementById('selected-package-details');
                          if (detailsSection) {
                            detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 300);
                      }}
                      className="flex-1 inline-flex items-center justify-center border-2 border-white text-white font-bold px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-full hover:bg-white hover:text-black transition-all duration-200 text-xs sm:text-sm md:text-base"
                    >
                      View Full Details
                    </button>
                    <Link
                      href="/book"
                      className="flex-1 inline-flex items-center justify-center bg-white text-black font-bold px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-full hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all duration-200 shadow-xl text-xs sm:text-sm md:text-base"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Itinerary Section - Optimized for 13" */}
      <section id="package-details" className="relative py-12 sm:py-16 lg:py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-5">
              <div className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-200">
                <span className="text-amber-900 font-black text-xs uppercase tracking-wider">Complete Journey</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
              Your Journey into the{' '}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Mountains
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A half-day immersive cultural experience
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-8 sm:left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-orange-500 to-amber-400 hidden sm:block" />

            <div className="space-y-8 sm:space-y-10">
              {/* 13:30 - The Scenic Ascent */}
              <div className="relative flex gap-6 sm:gap-8">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white">
                    <span className="text-sm sm:text-base font-black text-white">13:30</span>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-amber-100 hover:shadow-2xl hover:border-amber-300 transition-all duration-300">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                    The Scenic Ascent
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Meet us at the Taghazout Mosque for a comfortable 15-minute drive into the Small Atlas Mountains. We'll wind through the Argan forest, where you can breathe the fresh mountain air and enjoy a breathtaking panoramic view of the ocean from above.
                  </p>
                </div>
              </div>

              {/* 14:00 - A Warm Village Welcome */}
              <div className="relative flex gap-6 sm:gap-8">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white">
                    <span className="text-sm sm:text-base font-black text-white">14:00</span>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-amber-100 hover:shadow-2xl hover:border-amber-300 transition-all duration-300">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                    A Warm Village Welcome
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Arrive at our village and step inside an ancient 300-year-old Amazigh house, one of the oldest in North Africa. Meet the local family and I will be your guided tour to show you how our ancestors lived in the heart of these mountains.
                  </p>
                </div>
              </div>

              {/* 14:30 - The Garden Tea Ritual */}
              <div className="relative flex gap-6 sm:gap-8">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white">
                    <span className="text-sm sm:text-base font-black text-white">14:30</span>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-amber-100 hover:shadow-2xl hover:border-amber-300 transition-all duration-300">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                    The Garden Tea Ritual
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Relax in our authentic workshop and learn the art of Moroccan tea. You'll pick fresh mint and herbs directly from our small garden to brew your own pot. Enjoy your tea with homemade Moroccan sweets I've prepared for you, as we sit together for a warm conversation to get to know one another.
                  </p>
                </div>
              </div>

              {/* 15:00 - Prepare The Traditional Bread */}
              <div className="relative flex gap-6 sm:gap-8">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white">
                    <span className="text-sm sm:text-base font-black text-white">15:00</span>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-amber-100 hover:shadow-2xl hover:border-amber-300 transition-all duration-300">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                    Prepare The Traditional Bread
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Master the ancient art of village bread. You will knead your own dough by hand before baking it in our traditional stone oven. We fire the hearth with Argan wood, infusing the bread with a rich, smoky aroma and a golden crust that you can only find in the heart of the mountains.
                  </p>
                </div>
              </div>

              {/* 15:30 - The Tagine Workshop */}
              <div className="relative flex gap-6 sm:gap-8">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white">
                    <span className="text-sm sm:text-base font-black text-white">15:30</span>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-amber-100 hover:shadow-2xl hover:border-amber-300 transition-all duration-300">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                    The Tagine Workshop
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Prepare an authentic Tagine by cleaning fresh vegetables, marinating your chicken or fish in special Moroccan spices, and mastering the sweet and salty combination as it slow-cooks over an Argan wood fire for a delicious, smoky aroma.
                  </p>
                </div>
              </div>

              {/* 16:30 - The Ancient Millstone */}
              <div className="relative flex gap-6 sm:gap-8">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white">
                    <span className="text-sm sm:text-base font-black text-white">16:30</span>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-amber-100 hover:shadow-2xl hover:border-amber-300 transition-all duration-300">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                    The Ancient Millstone
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Experience the magic of making your own Amlou using a traditional stone millstone—one of our most ancient tools that we still preserve and use today. You will grind toasted almonds by hand, blending them with pure Argan oil and orange honey to create the most delicious spread you can taste in Morocco.
                  </p>
                </div>
              </div>

              {/* 17:30 - The Family Feast & Sunset */}
              <div className="relative flex gap-6 sm:gap-8">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white">
                    <span className="text-sm sm:text-base font-black text-white">17:30</span>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-amber-100 hover:shadow-2xl hover:border-amber-300 transition-all duration-300">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                    The Family Feast & Sunset
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    After half day of tradition and cooking, it is time to sit together as one family. Enjoy the delicious meal you created, sharing stories and laughter over the steaming Tagine and fresh bread. It is more than just a dinner; it is a moment of true Moroccan hospitality in the peaceful heart of the mountains, watching the sunset over the Atlas peaks before we begin our journey back to Taghazout.
                  </p>
                </div>
              </div>

              {/* 19:00 - Journey Home */}
              <div className="relative flex gap-6 sm:gap-8">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white">
                    <span className="text-sm sm:text-base font-black text-white">19:00</span>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-amber-100 hover:shadow-2xl hover:border-amber-300 transition-all duration-300">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                    Journey Home
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    After the sun sets and we've shared our final goodbyes, we begin the scenic drive back, dropping you directly in Taghazout or Tamraght by 19:30 – 20:00.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-5 px-12 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-2xl text-lg"
            >
              <span>Book This Experience</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Detailed Itinerary - Optimized for 13" */}
      {displayPackage && (
        <section id="selected-package-details" className="relative py-12 sm:py-16 lg:py-20 bg-white scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            {/* Close Button - Enhanced */}
            <div className="flex justify-between items-center mb-10">
              <button
                onClick={() => setSelectedPackage(null)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full transition-all duration-200"
              >
                <span>✕</span>
                <span>Close Details</span>
              </button>
              
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-6 py-3 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-xl"
              >
                <span>Book Now</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Package Info Header - Optimized for 13" */}
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 rounded-3xl p-6 sm:p-10 lg:p-12 mb-12 border-2 border-amber-200 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3">
                  {displayPackage.name}
                </h2>
                <p className="text-xl sm:text-2xl text-amber-600 font-bold mb-3">
                  {displayPackage.tagline}
                </p>
                <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
                  {displayPackage.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-amber-100">
                  <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">{displayPackage.price}</div>
                  <div className="text-sm text-gray-600 font-semibold">{displayPackage.currency}/person</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-amber-100">
                  <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">{displayPackage.duration}</div>
                  <div className="text-sm text-gray-600 font-semibold">Duration</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-amber-100">
                  <div className="text-xl sm:text-2xl font-black text-gray-900 mb-1">{displayPackage.startTime}</div>
                  <div className="text-sm text-gray-600 font-semibold">Start Time</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-amber-100">
                  <div className="text-base sm:text-lg font-black text-gray-900 mb-1">{displayPackage.pickup}</div>
                  <div className="text-sm text-gray-600 font-semibold">Pickup</div>
                </div>
              </div>
            </div>

            {/* Itinerary Timeline - Enhanced */}
            <div className="mb-16">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-12 text-center">
                Complete{' '}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Itinerary
                </span>
              </h3>

              <div className="relative max-w-5xl mx-auto">
                <div className="absolute left-6 sm:left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-orange-500 to-amber-400 hidden sm:block" />

                <div className="space-y-8 sm:space-y-10">
                  {displayPackage.itinerary.map((item, index) => (
                    <div key={index} className="relative flex gap-6 sm:gap-8">
                      <div className="flex-shrink-0 relative z-10">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white">
                          <span className="text-sm sm:text-base font-black text-white">{item.time}</span>
                        </div>
                      </div>

                      <div className="flex-1 bg-gradient-to-br from-white to-amber-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border-2 border-amber-100 hover:shadow-2xl hover:border-amber-300 transition-all duration-300">
                        <h4 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
                          {item.title}
                        </h4>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* What's Included - Enhanced */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-amber-500 shadow-2xl mb-16">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-10 text-center">
                What's{' '}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Included
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto">
                {displayPackage.includes.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-200">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-base text-white leading-relaxed font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Book CTA - Enhanced */}
            <div className="text-center">
              <div className="inline-block bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 sm:p-12 shadow-2xl border-2 border-amber-200 max-w-3xl">
                <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                  Ready for Your{' '}
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    Adventure?
                  </span>
                </h3>
                <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
                  Book your {displayPackage.name} today and create unforgettable memories
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-5 px-12 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-2xl text-lg sm:text-xl"
                >
                  <span>Book {displayPackage.name}</span>
                  <FiArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
