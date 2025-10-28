'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, MapPin, Calendar } from 'lucide-react';
import ActivityGallery from '@/components/ActivityGallery';
import activityDetailsData from '@/data/activity-details.json';

const activityDetails = activityDetailsData as Record<string, any>;

const ActivityDetailPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const activity = activityDetails[slug as keyof typeof activityDetails];

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  if (!activity) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Activity Not Found</h1>
          <Link href="/activities" className="text-primary hover:underline">
            Back to Activities
          </Link>
        </div>
      </div>
    );
  }

  const handleChooseDate = () => {
    // For now, redirect to booking page with activity
    window.location.href = `/book?activity=${activity.id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-24 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/activities" className="hover:text-primary transition-colors">
              Activities
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{activity.title}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <ActivityGallery images={activity.galleryImages} alt={activity.title} />

            {/* Activity Title and Price */}
            <div className="mb-6">
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">
                {activity.title}
              </h1>
              <p className="text-2xl font-bold text-gray-900 mb-3">{activity.price}</p>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{activity.location}</span>
              </div>
            </div>

            {/* Description Section */}
            <section className="mb-8 bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {activity.description}
              </p>
            </section>

            {/* Need to Know Section */}
            <section className="mb-8 bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Need to know info:</h2>
              <ul className="space-y-3">
                {activity.needToKnow.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary Section */}
            <section className="mb-8 bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Itinerary:</h2>
              <div className="space-y-2">
                {activity.itinerary.map((item, index) => {
                  if (item.trim() === '') {
                    return <div key={index} className="h-2" />;
                  }
                  if (item.includes(':')) {
                    return (
                      <div key={index} className="text-gray-900 font-semibold mt-4 mb-2">
                        {item}
                      </div>
                    );
                  }
                  return (
                    <div key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="text-primary mt-1.5">•</span>
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Looking for a place to stay Section */}
            <section className="mb-8 bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Looking for a place to stay on your upcoming adventure?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Book your accommodation directly at{' '}
                <Link
                  href="/houseandrooms"
                  className="text-primary hover:underline font-semibold"
                  style={{ color: '#ffc414' }}
                >
                  Playa Surf House
                </Link>{' '}
                and mention you're booking an activity to receive special rates. We offer
                comfortable dormitories and private rooms, all just steps away from the beach and
                all our activity departure points.
              </p>
            </section>
          </div>

          {/* Right Sidebar - Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Availability</h2>

              {/* Date Picker Placeholder */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Dates for Booking
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    readOnly
                    placeholder="Choose Dates for Booking"
                    value={selectedDate || ''}
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white cursor-pointer hover:border-gray-400 transition-colors"
                  />
                </div>
              </div>

              {/* Choose Date Button */}
              <button
                onClick={handleChooseDate}
                className="w-full py-4 px-6 rounded-lg font-bold text-white uppercase tracking-wide transition-all duration-300 hover:shadow-lg hover:opacity-90"
                style={{ backgroundColor: '#20D4BF' }}
              >
                Choose Date
              </button>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Note:</strong> Booking in advance is recommended, especially during peak
                  season.
                </p>
                <Link
                  href="/faq-contact"
                  className="text-sm text-primary hover:underline block"
                  style={{ color: '#20D4BF' }}
                >
                  Need help? Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailPage;
