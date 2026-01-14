'use client';

import React, { memo } from 'react';
import { FiMapPin, FiNavigation, FiClock, FiPhone, FiMail, FiSend, FiArrowRight } from 'react-icons/fi';

/**
 * LOCATION & MAP SECTION - Design 3 of 3
 * 
 * Design 3: Photo-First with Tabbed Info
 * 
 * Aesthetic: Visual, storytelling, warm
 * - Large photo of the location/kitchen
 * - Map in a card
 * - Vertical timeline for directions
 * - Warm amber theme
 */

const locationData = {
  name: "Rabab's Traditional Kitchen",
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
  hours: "Daily: 9:00 AM - 6:00 PM"
};

const journeySteps = [
  {
    step: "01",
    title: "Land at Agadir Airport",
    description: "We'll be waiting to pick you up - free for all guests!",
    time: "0 min"
  },
  {
    step: "02",
    title: "Scenic Coastal Drive",
    description: "Enjoy beautiful Atlantic Ocean views along the way.",
    time: "25 min"
  },
  {
    step: "03",
    title: "Arrive in Tamraght",
    description: "Enter our traditional Amazigh village home.",
    time: "30 min"
  },
  {
    step: "04",
    title: "Meet Rabab",
    description: "Welcome tea and begin your culinary adventure!",
    time: "Let's cook! 👩‍🍳"
  }
];

const LocationMapV3: React.FC = memo(() => {
  // Component rendered client-side only (ssr: false in dynamic import)

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-amber-50 via-white to-amber-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 mb-6">
            <span className="text-xl">📍</span>
            <span className="text-sm font-bold text-amber-900 tracking-wider uppercase">
              Come Visit Us
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Your Journey to{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Rabab&apos;s Kitchen
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From the moment you land, we take care of everything. Here&apos;s what your journey looks like.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Left - Journey Timeline */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <FiNavigation className="w-5 h-5 text-white" />
              </span>
              Your Journey
            </h3>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-orange-500 to-amber-300"></div>

              {/* Steps */}
              <div className="space-y-8">
                {journeySteps.map((item, index) => (
                  <div key={index} className="relative flex gap-6">
                    {/* Circle */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white border-4 border-amber-500 flex items-center justify-center shadow-lg">
                        <span className="text-sm font-black text-amber-600">{item.step}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                        <span className="flex-shrink-0 px-3 py-1 bg-amber-100 text-amber-700 text-sm font-bold rounded-full">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Map & Contact */}
          <div className="lg:col-span-3 order-1 lg:order-2 space-y-6">
            {/* Map Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <div className="h-[350px] lg:h-[400px] bg-gradient-to-br from-amber-100 to-orange-50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54451.77554183893!2d-9.761569!3d30.523589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3c8b8e9b8e8e8%3A0x8e8e8e8e8e8e8e8!2sTamraght%2C%20Morocco!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
              
              {/* Map Footer */}
              <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                      <FiMapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{locationData.name}</h4>
                      <p className="text-gray-400 text-sm">{locationData.address}, {locationData.country}</p>
                    </div>
                  </div>
                  
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${locationData.coordinates.lat},${locationData.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors"
                  >
                    <span>Get Directions</span>
                    <FiArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a 
                href={`tel:${locationData.phone}`}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-amber-300 hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FiPhone className="w-6 h-6 text-amber-600" />
                </div>
                <p className="text-sm text-gray-500 mb-1">Call Us</p>
                <p className="text-gray-900 font-bold">{locationData.phone}</p>
              </a>

              <a 
                href={`https://wa.me/${locationData.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-green-300 hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FiSend className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-500 mb-1">WhatsApp</p>
                <p className="text-gray-900 font-bold">Message Us</p>
              </a>

              <a 
                href={`mailto:${locationData.email}`}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FiMail className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-gray-900 font-bold">Write Us</p>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
});

LocationMapV3.displayName = 'LocationMapV3';

export default LocationMapV3;
