'use client';

import React, { memo } from 'react';
import { FiMapPin, FiNavigation, FiClock, FiPhone, FiMail, FiSend, FiCompass } from 'react-icons/fi';

/**
 * LOCATION & MAP SECTION - Design 2 of 3
 * 
 * Design 2: Fullwidth Map with Floating Info Cards
 * 
 * Aesthetic: Immersive, modern
 * - Large fullwidth map background
 * - Floating cards overlay
 * - Amber/orange cooking theme
 * - WhatsApp integration
 * - Prominent CTA
 */

const locationData = {
  name: "Rabab's Traditional Cooking Class",
  address: "Tamraght Village",
  city: "Tamraght",
  region: "Agadir-Ida-Ou-Tanane",
  country: "Morocco",
  coordinates: {
    lat: 30.5236,
    lng: -9.7366
  },
  phone: "+212 600 000 000",
  whatsapp: "+212600000000",
  email: "rabab@cookingclass.ma",
  hours: "Classes: 9:00 AM - 6:00 PM"
};

const highlights = [
  { icon: "🏔️", text: "Atlas Mountain Views" },
  { icon: "🌊", text: "Near Atlantic Ocean" },
  { icon: "🚗", text: "Free Airport Pickup" },
  { icon: "🏠", text: "Traditional Amazigh Home" }
];

const LocationMapV2: React.FC = memo(() => {
  return (
    <section className="relative py-0 overflow-hidden">
      {/* Fullwidth Map Background */}
      <div className="relative h-[700px] lg:h-[800px]">
        {/* Google Maps Embed */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54451.77554183893!2d-9.761569!3d30.523589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3c8b8e9b8e8e8%3A0x8e8e8e8e8e8e8e8!2sTamraght%2C%20Morocco!5e0!3m2!1sen!2s!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
          className="absolute inset-0"
        ></iframe>

        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-gray-900/30"></div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Info */}
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 mb-6">
                    <FiMapPin className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-bold text-amber-300 tracking-wider uppercase">
                      Find Us
                    </span>
                  </div>
                  
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
                    Visit Rabab's{' '}
                    <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                      Kitchen
                    </span>
                  </h2>
                  
                  <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                    Nestled in the beautiful village of Tamraght, between mountains and sea.
                  </p>
                </div>

                {/* Location Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <FiMapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{locationData.name}</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {locationData.address}<br />
                        {locationData.region}<br />
                        {locationData.country}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${locationData.coordinates.lat},${locationData.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-amber-400 transition-all duration-300"
                    >
                      <FiNavigation className="w-4 h-4" />
                      <span>Get Directions</span>
                    </a>
                    
                    <a 
                      href={`https://wa.me/${locationData.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all duration-300"
                    >
                      <FiSend className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-3">
                  {highlights.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex items-center gap-3"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-white font-medium text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Contact Card (Desktop) */}
              <div className="hidden lg:flex items-center justify-end">
                <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full">
                  <div className="text-center mb-6">
                    <span className="text-5xl mb-4 block">👩‍🍳</span>
                    <h3 className="text-2xl font-bold text-gray-900">Contact Rabab</h3>
                    <p className="text-gray-600 mt-2">Book your cooking experience today!</p>
                  </div>

                  <div className="space-y-4">
                    <a 
                      href={`tel:${locationData.phone}`}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                        <FiPhone className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Call Us</p>
                        <p className="text-gray-900 font-bold">{locationData.phone}</p>
                      </div>
                    </a>

                    <a 
                      href={`mailto:${locationData.email}`}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <FiMail className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-900 font-bold">{locationData.email}</p>
                      </div>
                    </a>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <FiClock className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Hours</p>
                        <p className="text-gray-900 font-bold">{locationData.hours}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a 
                      href="/book"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <span>Book a Class</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Contact Card */}
      <div className="lg:hidden bg-white px-6 py-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Contact Rabab</h3>
            <p className="text-gray-600 mt-2">Book your cooking experience!</p>
          </div>

          <div className="space-y-3">
            <a 
              href={`tel:${locationData.phone}`}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
            >
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <FiPhone className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Call</p>
                <p className="text-gray-900 font-semibold">{locationData.phone}</p>
              </div>
            </a>

            <a 
              href={`mailto:${locationData.email}`}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
            >
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <FiMail className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900 font-semibold">{locationData.email}</p>
              </div>
            </a>
          </div>

          <a 
            href="/book"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg"
          >
            <span>Book a Class</span>
          </a>
        </div>
      </div>

      {/* Bottom Directions Bar */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                <FiCompass className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Getting Here is Easy</h4>
                <p className="text-gray-400">30 min from Agadir Airport • Free pickup available</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="text-center px-6 py-3 bg-white/10 rounded-xl">
                <p className="text-2xl font-bold text-amber-400">30</p>
                <p className="text-xs text-gray-400 uppercase">Min from Airport</p>
              </div>
              <div className="text-center px-6 py-3 bg-white/10 rounded-xl">
                <p className="text-2xl font-bold text-amber-400">5</p>
                <p className="text-xs text-gray-400 uppercase">Min from Beach</p>
              </div>
              <div className="text-center px-6 py-3 bg-white/10 rounded-xl">
                <p className="text-2xl font-bold text-amber-400">Free</p>
                <p className="text-xs text-gray-400 uppercase">Airport Pickup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

LocationMapV2.displayName = 'LocationMapV2';

export default LocationMapV2;
