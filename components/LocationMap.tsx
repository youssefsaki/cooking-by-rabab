'use client';

import React, { memo } from 'react';
import { FiMapPin, FiNavigation, FiClock, FiPhone, FiMail, FiMap } from 'react-icons/fi';

/**
 * LOCATION & MAP SECTION - Design 1 of 3
 * 
 * Design 1: Split Layout with Info Cards
 * 
 * Aesthetic: Modern split-screen
 * - Map on left (embedded Google Maps)
 * - Info cards on right
 * - Contact details
 * - Directions
 * - Local SEO optimized
 */

const locationData = {
  name: "Cooking Class & Retreat Center",
  address: "Tamraght, Agadir-Ida-Ou-Tanane",
  city: "Tamraght",
  region: "Agadir",
  country: "Morocco",
  coordinates: {
    lat: 30.5236,
    lng: -9.7366
  },
  phone: "+212 123 456 789",
  email: "info@cookingclass.ma",
  hours: "Open Daily: 8:00 AM - 10:00 PM"
};

const directions = [
  {
    from: "Agadir Airport",
    duration: "30 minutes",
    distance: "25 km",
    description: "Take the coastal road N1 towards Tamraght. We offer free airport pickup for all packages."
  },
  {
    from: "Agadir City Center",
    duration: "20 minutes",
    distance: "15 km",
    description: "Head south on the coastal road. Look for signs to Tamraght village."
  },
  {
    from: "Taghazout",
    duration: "5 minutes",
    distance: "3 km",
    description: "North on the main coastal road. We're between Taghazout and Agadir."
  }
];

const LocationMap: React.FC = memo(() => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-green-200/40 to-emerald-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 mb-6">
            <FiMapPin className="w-4 h-4 text-green-600" />
            <span className="text-sm font-bold text-green-900 tracking-wider uppercase">
              Location
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Find{' '}
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Your Way
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're located in beautiful Tamraght, between Taghazout and Agadir. 
            Easy to reach with stunning Atlantic Ocean views.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Map Side */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 h-full min-h-[400px] lg:min-h-[600px]">
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54451.77554183893!2d-9.761569!3d30.523589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3c8b8e9b8e8e8%3A0x8e8e8e8e8e8e8e8!2sTamraght%2C%20Morocco!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </div>

          {/* Info Side */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Address Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg border border-green-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FiMapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our Location</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {locationData.address}<br />
                    {locationData.city}, {locationData.region}<br />
                    {locationData.country}
                  </p>
                </div>
              </div>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${locationData.coordinates.lat},${locationData.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
              >
                <FiNavigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <FiPhone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Phone</p>
                    <a href={`tel:${locationData.phone}`} className="text-gray-900 font-semibold hover:text-blue-600 transition-colors">
                      {locationData.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <FiMail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <a href={`mailto:${locationData.email}`} className="text-gray-900 font-semibold hover:text-purple-600 transition-colors">
                      {locationData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <FiClock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Hours</p>
                    <p className="text-gray-900 font-semibold">{locationData.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Airport Transfer Info */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                  <FiMap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Free Airport Pickup</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We provide complimentary pickup from Agadir Airport for all package bookings. 
                Just let us know your arrival details!
              </p>
            </div>
          </div>
        </div>

        {/* Directions Cards */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How to Get Here
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {directions.map((direction, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">{direction.from}</h4>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiClock className="w-4 h-4" />
                    <span className="text-sm font-medium">{direction.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiNavigation className="w-4 h-4" />
                    <span className="text-sm font-medium">{direction.distance}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {direction.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

LocationMap.displayName = 'LocationMap';

export default LocationMap;
