'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Types
interface ActivityInfo {
  icon: string;
  text: string;
}

interface Activity {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: {
    emoji: string;
    text: string;
    color: string;
  };
  image: string;
  fallbackImage: string;
  info: ActivityInfo[];
  price: string;
  primaryButton: {
    text: string;
    action: string;
  };
  secondaryButton?: {
    text: string;
    action: string;
  };
  rating?: {
    stars: string;
    score: string;
    reviews: string;
  };
  gradientFrom?: string;
  gradientTo?: string;
}

interface Package {
  id: string;
  title: string;
  description: string;
  icon: string;
  originalPrice: string;
  discountedPrice: string;
  buttonText: string;
}

// Activities Data - JSON Format
const activitiesData: Activity[] = [
  {
    id: 'surf',
    title: 'SURF',
    subtitle: 'Ride the Atlantic Waves',
    description: 'Experience the thrill of riding world-class waves in Taghazout, Morocco\'s premier surf destination. Our certified instructors will guide you through the fundamentals or help you perfect your technique on the legendary breaks.',
    badge: {
      emoji: '🌊',
      text: 'Most Popular',
      color: '#ffc414'
    },
    image: '/activities/surf.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    info: [
      { icon: '⭐', text: 'All Levels - Beginner to Advanced' },
      { icon: '⏱️', text: '2-3 Hours - Full session' },
      { icon: '📍', text: 'Taghazout Beach & nearby spots' },
      { icon: '👥', text: 'Small Groups - Max 6-8 people' }
    ],
    price: 'From €35 per session',
    primaryButton: {
      text: 'BOOK SURF SESSION',
      action: '/book?activity=surf'
    },
    secondaryButton: {
      text: 'VIEW SCHEDULE',
      action: '/schedule?activity=surf'
    },
    rating: {
      stars: '⭐⭐⭐⭐⭐',
      score: '4.9/5',
      reviews: '(127 reviews)'
    }
  },
  {
    id: 'sandboarding',
    title: 'SANDBOARDING',
    subtitle: 'Timlalin Desert Adventure',
    description: 'Swap ocean waves for desert dunes! Experience the thrill of sandboarding down majestic golden dunes with the Atlas Mountains as your backdrop.',
    badge: {
      emoji: '☀️',
      text: 'Sunset Sessions',
      color: '#ffc414'
    },
    image: '/activities/sandboarding.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    info: [
      { icon: '⭐', text: 'All levels' },
      { icon: '⏱️', text: '3-4 hours' },
      { icon: '📍', text: 'Timlalin Sand Dunes' }
    ],
    price: 'From €45 per person',
    primaryButton: {
      text: '▲ BOOK DESERT ADVENTURE',
      action: '/book?activity=sandboarding'
    },
    secondaryButton: {
      text: '📷 SEE PHOTOS',
      action: '/gallery?activity=sandboarding'
    },
    gradientFrom: '#d97706',
    gradientTo: '#fbbf24'
  },
  {
    id: 'paradise-valley',
    title: 'PARADISE VALLEY',
    subtitle: 'Natural Oasis Escape',
    description: 'Discover a hidden gem in the Atlas Mountains. Crystal-clear pools, dramatic rock formations, and cascading waterfalls await your exploration.',
    badge: {
      emoji: '☀️',
      text: 'Full Day',
      color: '#ffc414'
    },
    image: '/activities/paradise-valley.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    info: [
      { icon: '🏔️', text: 'Nature & Adventure' },
      { icon: '⏱️', text: 'Full day (6-8 hours)' },
      { icon: '🏊‍♂️', text: 'Swimming & cliff jumping' },
      { icon: '🍽️', text: 'Traditional lunch included' }
    ],
    price: 'From €55 per person',
    primaryButton: {
      text: '▲ BOOK PARADISE VALLEY TRIP',
      action: '/book?activity=paradise-valley'
    },
    secondaryButton: {
      text: '→ LEARN MORE',
      action: '/activities/paradise-valley'
    },
    gradientFrom: '#0d9488',
    gradientTo: '#34d399'
  },
  {
    id: 'yoga',
    title: 'YOGA',
    subtitle: 'Sunrise & Sunset Sessions',
    description: 'Find your zen in paradise. Start your day with energizing sunrise yoga or wind down with peaceful sunset flows on our rooftop overlooking the bay.',
    badge: {
      emoji: '🧘‍♀️',
      text: 'Wellness',
      color: '#ffc414'
    },
    image: '/activities/yoga.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    info: [
      { icon: '⭐', text: 'All levels welcome' },
      { icon: '⏱️', text: 'Sunrise (7AM) & Sunset (6PM)' },
      { icon: '👤', text: 'Certified instructor' }
    ],
    price: '€15 per class | €60 weekly pass',
    primaryButton: {
      text: 'BOOK YOGA SESSION',
      action: '/book?activity=yoga'
    },
    secondaryButton: {
      text: 'VIEW SCHEDULE',
      action: '/schedule?activity=yoga'
    },
    gradientFrom: '#7c3aed',
    gradientTo: '#c084fc'
  },
  {
    id: 'belly-dancing',
    title: 'BELLY DANCING',
    subtitle: 'Traditional Moroccan Dance Experience',
    description: 'Discover the art of Raqs Sharqi in fun, welcoming classes. Learn traditional movements, hip techniques, and graceful isolations while experiencing Moroccan culture through rhythm and dance.',
    badge: {
      emoji: '💃',
      text: 'Cultural',
      color: '#ffc414'
    },
    image: '/activities/belly-dancing.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    info: [
      { icon: '⭐', text: 'All levels beginners encouraged' },
      { icon: '📅', text: 'Weekly performance nights' },
      { icon: '🎀', text: 'Hip scarf included' }
    ],
    price: '€20 per class | €85 for 5 classes',
    primaryButton: {
      text: '♫ BOOK DANCE CLASS',
      action: '/book?activity=belly-dancing'
    },
    secondaryButton: {
      text: 'PERFORMANCE SCHEDULE',
      action: '/schedule?activity=belly-dancing'
    },
    gradientFrom: '#ec4899',
    gradientTo: '#fb7185'
  },
  {
    id: 'medina-tour',
    title: 'MEDINA TOUR',
    subtitle: 'Traditional Moroccan Experience',
    description: 'Step back in time through maze-like alleys where ancient traditions thrive. Visit bustling souks, meet local artisans, and taste authentic street food.',
    badge: {
      emoji: '⭐',
      text: 'Cultural',
      color: '#ffc414'
    },
    image: '/activities/medina.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    info: [
      { icon: '🏛️', text: 'Culture & Historical' },
      { icon: '👤', text: 'Expert local guide' },
      { icon: '🍵', text: 'Tea ceremony included' }
    ],
    price: 'From €40 per person',
    primaryButton: {
      text: '▲ BOOK MEDINA TOUR',
      action: '/book?activity=medina-tour'
    },
    gradientFrom: '#991b1b',
    gradientTo: '#dc2626'
  }
];

// Packages Data - JSON Format
const packagesData: Package[] = [
  {
    id: 'surf-sand',
    title: 'SURF & SAND',
    description: 'Surf + Sandboarding combo',
    icon: '🏄‍♂️',
    originalPrice: '€80',
    discountedPrice: '€65',
    buttonText: 'BOOK COMBO'
  },
  {
    id: 'wellness-retreat',
    title: 'WELLNESS RETREAT',
    description: 'Yoga + Belly Dancing + Medina',
    icon: '🧘‍♀️',
    originalPrice: '€75',
    discountedPrice: '€55',
    buttonText: 'BOOK COMBO'
  },
  {
    id: 'ultimate-adventure',
    title: 'ULTIMATE ADVENTURE',
    description: 'All 6 activities included',
    icon: '⭐',
    originalPrice: '€240',
    discountedPrice: '€180',
    buttonText: 'BOOK ULTIMATE'
  }
];

// Featured Activity Card Component
const FeaturedActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState(activity.image);

  const handleBooking = () => {
    setIsLoading(true);
    // Always go to booking page
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = activity.primaryButton.action;
    }, 1000);
  };

  const handleViewDetails = () => {
    // Navigate to detail page
    window.location.href = `/activities/${activity.id}`;
  };

  const handleImageError = () => {
    console.error('Image failed to load:', imgSrc);
    setImageError(true);
    setImgSrc(activity.fallbackImage);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mb-12">
      <div className="lg:flex">
        {/* Image Section */}
        <div className="lg:w-1/2 relative">
          <div 
            className={`aspect-[4/3] lg:aspect-square relative overflow-hidden ${activity.id !== 'surf' ? 'cursor-pointer' : ''}`}
            onClick={activity.id !== 'surf' ? handleViewDetails : undefined}
          >
            <Image
              src={imgSrc}
              alt={activity.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              onError={handleImageError}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={true}
            />
            {/* Badge */}
            <div className="absolute top-4 left-4">
              <div 
                className="px-3 py-1.5 rounded-full text-sm font-bold text-white shadow-lg"
                style={{ backgroundColor: activity.badge.color }}
              >
                {activity.badge.emoji} {activity.badge.text}
              </div>
            </div>
            {/* Rating at bottom */}
            {activity.rating && (
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white drop-shadow-lg">
                <span className="text-yellow-400 text-lg">{activity.rating.stars}</span>
                <span className="font-bold">{activity.rating.score}</span>
                <span className="text-sm">{activity.rating.reviews}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2 p-6 lg:p-8">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">
            {activity.title}
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 italic mb-6">
            {activity.subtitle}
          </p>
          
          <p className="text-gray-700 mb-6 leading-relaxed text-sm lg:text-base">
            {activity.description}
          </p>

          {/* Info Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {activity.info.map((item, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-base mt-0.5">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Price Badge */}
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg inline-block mb-6">
            <span className="font-bold text-sm lg:text-base">{activity.price}</span>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBooking}
            disabled={isLoading}
            className="w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#ffc414' }}
          >
            {isLoading ? 'BOOKING...' : activity.primaryButton.text}
          </button>

          {/* View Details Button (only for activities with detail pages) */}
          {activity.id !== 'surf' && (
            <button
              onClick={handleViewDetails}
              className="w-full mt-3 py-3 px-6 rounded-lg font-bold border-2 transition-all duration-300 hover:shadow-lg"
              style={{ 
                borderColor: '#ffc414', 
                color: '#ffc414',
                backgroundColor: 'white'
              }}
            >
              VIEW DETAILS
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Activity Card Component
const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState(activity.image);

  const handleBooking = () => {
    setIsLoading(true);
    // Always go to booking page
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = activity.primaryButton.action;
    }, 1000);
  };

  const handleViewDetails = () => {
    // Navigate to detail page
    window.location.href = `/activities/${activity.id}`;
  };

  const handleImageError = () => {
    console.error('Image failed to load:', imgSrc);
    setImageError(true);
    setImgSrc(activity.fallbackImage);
  };

  const gradientStyle = activity.gradientFrom && activity.gradientTo
    ? { background: `linear-gradient(to bottom, ${activity.gradientFrom}, ${activity.gradientTo})` }
    : {};

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image with Gradient Overlay */}
      <div 
        className={`relative aspect-[4/3] overflow-hidden ${activity.id !== 'surf' ? 'cursor-pointer' : ''}`}
        onClick={activity.id !== 'surf' ? handleViewDetails : undefined}
      >
        <Image
          src={imgSrc}
          alt={activity.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={true}
        />
        {/* Gradient Overlay */}
        {activity.gradientFrom && activity.gradientTo && (
          <div 
            className="absolute inset-0 opacity-70"
            style={gradientStyle}
          />
        )}
        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div 
            className="px-3 py-1.5 rounded-full text-sm font-bold text-white shadow-lg"
            style={{ backgroundColor: activity.badge.color }}
          >
            {activity.badge.emoji} {activity.badge.text}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-black text-gray-900 mb-1">
          {activity.title}
        </h3>
        <p className="text-gray-600 italic mb-3 text-sm">
          {activity.subtitle}
        </p>
        
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
          {activity.description}
        </p>

        {/* Info Icons */}
        <div className="space-y-2 mb-4">
          {activity.info.map((item, index) => (
            <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
              <span className="text-sm mt-0.5">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Price Badge */}
        <div className="bg-gray-900 text-white px-3 py-1.5 rounded-lg inline-block mb-4">
          <span className="font-bold text-sm">{activity.price}</span>
        </div>

        {/* Book Button */}
        <button
          onClick={handleBooking}
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-lg font-bold text-white text-sm transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#ffc414' }}
        >
          {isLoading ? 'BOOKING...' : activity.primaryButton.text}
        </button>

        {/* View Details Button (only for activities with detail pages) */}
        {activity.id !== 'surf' && (
          <button
            onClick={handleViewDetails}
            className="w-full mt-2 py-2.5 px-4 rounded-lg font-bold border-2 text-sm transition-all duration-300 hover:shadow-lg"
            style={{ 
              borderColor: '#ffc414', 
              color: '#ffc414',
              backgroundColor: 'white'
            }}
          >
            VIEW DETAILS
          </button>
        )}
      </div>
    </div>
  );
};

// Package Card Component
const PackageCard: React.FC<{ pkg: Package }> = ({ pkg }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = `/book?package=${pkg.id}`;
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-6 text-center">
        <div className="text-5xl mb-4 text-white">{pkg.icon}</div>
        <h3 className="text-xl font-black text-gray-900 mb-2">
          {pkg.title}
        </h3>
        <p className="text-gray-700 text-sm mb-4">
          {pkg.description}
        </p>
        
        {/* Price */}
        <div className="mb-6">
          <span className="text-gray-700/70 line-through text-base mr-2">
            {pkg.originalPrice}
          </span>
          <span className="text-gray-900 font-black text-2xl">
            {pkg.discountedPrice}
          </span>
        </div>

        <button
          onClick={handleBooking}
          disabled={isLoading}
          className="w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#ffc414' }}
        >
          {isLoading ? 'BOOKING...' : pkg.buttonText}
        </button>
      </div>
    </div>
  );
};

// Main Activities Page Component
const ActivitiesPage: React.FC = () => {
  const featuredActivity = activitiesData[0]; // SURF
  const gridActivities = activitiesData.slice(1, 5); // Sandboarding, Paradise Valley, Yoga, Belly Dancing
  const medinaTour = activitiesData[5]; // Medina Tour

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header Section */}
      <section className="bg-white py-16 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-4">
            Must-Try Experience
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our most popular adventure this week
          </p>
        </div>
      </section>

      {/* Featured Activity */}
      <section className="py-12 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <FeaturedActivityCard activity={featuredActivity} />
        </div>
      </section>

      {/* Activities Grid - 2x2 Layout */}
      <section className="py-12 px-6 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {gridActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
          
          {/* Medina Tour Card - Positioned after the 2x2 grid */}
          <div className="max-w-md mx-auto lg:mx-auto">
            <ActivityCard activity={medinaTour} />
          </div>
        </div>
      </section>

      {/* Adventure Packages */}
      <section className="py-16 px-6 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
              Adventure Packages
            </h2>
            <p className="text-xl text-gray-600">
              Book multiple activities and save up to 25%!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packagesData.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivitiesPage;
