'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FiWifi, 
  FiArrowRight,
  MdRestaurant,
  MdSupportAgent,
  GiLotusFlower,
  GiWaveSurfer,
  FaCrown,
  FaGift,
  FaStar,
  FaFire
} from 'react-icons/fi';
import { 
  MdRestaurant as MdBreakfast,
  MdSupportAgent as MdService
} from 'react-icons/md';
import { 
  GiLotusFlower as GiMeditation,
  GiWaveSurfer as GiWaves
} from 'react-icons/gi';
import { 
  FaCrown as FaCrownIcon,
  FaGift as FaGiftIcon,
  FaStar as FaStarIcon,
  FaFire as FaFireIcon
} from 'react-icons/fa';
import bookingData from '@/data/booking.json';

const BookPage: React.FC = () => {
  const handlePartnerClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePackageClick = (link: string) => {
    window.location.href = link;
  };

  const getIconComponent = (iconName: string, className: string = "w-6 h-6") => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      wifi: FiWifi,
      breakfast: MdBreakfast,
      parking: () => <div className={`${className} bg-primary rounded flex items-center justify-center font-bold`} style={{ color: '#084869' }}>P</div>,
      service: MdService,
      meditation: GiMeditation,
      waves: GiWaves,
      crown: FaCrownIcon,
      gift: FaGiftIcon,
      star: FaStarIcon,
      flame: FaFireIcon,
      booking: () => <div className={`${className} bg-blue-600 text-white rounded flex items-center justify-center font-bold text-xs`}>B</div>,
      hostelworld: () => <div className={`${className} bg-primary rounded-full flex items-center justify-center font-bold text-xs`} style={{ color: '#084869' }}>H</div>
    };
    
    const IconComponent = iconMap[iconName] || FaStarIcon;
    return <IconComponent className={className} />;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Badge */}
      <section className="pt-32 pb-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-24 text-center">
          <div className="inline-flex items-center px-6 py-2 bg-primary-pale border border-primary-border rounded-full">
            <span className="text-primary text-sm font-semibold tracking-wide">
              {bookingData.premium.badge}
            </span>
          </div>
        </div>
      </section>

      {/* Hero Title Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 text-center">
          {/* Main Title with Decorative Elements */}
          <div className="relative mb-8">
            {/* Decorative Sparkles */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-8">
              <span className="text-primary text-3xl lg:text-4xl">✦</span>
              <span className="text-primary text-3xl lg:text-4xl">✦</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              <span className="text-primary">{bookingData.premium.title.primary}</span>{' '}
              <span className="text-slate-900">{bookingData.premium.title.secondary}</span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Choose between hostel or package below for an{' '}
            <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>extraordinary adventure</span>
          </p>
        </div>
      </section>

      {/* Trust Badges Row */}
      <section className="pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {bookingData.premium.trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-600">
                <div className="text-primary">
                  {getIconComponent(badge.icon, "w-5 h-5")}
                </div>
                <span className="text-sm md:text-base font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Booking Cards */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Card - Book Hostel */}
            <div className="relative rounded-2xl shadow-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300">
              {/* Image Section */}
              <div className="relative h-80 lg:h-96">
                <Image
                  src={bookingData.hostel.image}
                  alt="Beautiful hostel with pool"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                
                {/* Most Popular Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white px-4 py-1.5 rounded-full shadow-md">
                    <span className="text-dark-blue text-xs font-semibold">{bookingData.hostel.badge}</span>
                  </div>
                </div>
                
                {/* Content on Image */}
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-2">
                    {bookingData.hostel.title}
                  </h2>
                  <p className="text-lg lg:text-xl mb-4 opacity-90">
                    {bookingData.hostel.subtitle}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-primary">
                      {bookingData.hostel.currency}{bookingData.hostel.price}
                    </span>
                    <span className="text-sm opacity-80">{bookingData.hostel.priceLabel}</span>
                  </div>
                </div>
              </div>
              
              {/* White Card Section */}
              <div className="bg-white p-6 lg:p-8">
                <h3 className="text-lg font-semibold text-dark-blue mb-6">
                  {bookingData.hostel.description}
                </h3>
                
                {/* Amenities Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {bookingData.hostel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="text-primary">
                        {getIconComponent(amenity.icon, "w-5 h-5")}
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{amenity.label}</span>
                    </div>
                  ))}
                </div>
                
                {/* Partner Buttons */}
                <div className="space-y-4">
                  {bookingData.hostel.partners.map((partner, index) => (
                    <button
                      key={index}
                      onClick={() => handlePartnerClick(partner.url)}
                      className={`w-full rounded-xl p-6 text-white hover:brightness-110 hover:scale-[1.02] transition-all duration-300 flex items-center justify-between cursor-pointer focus:ring-2 focus:ring-yellow-500 ${
                        partner.name === 'Booking.com' 
                          ? 'bg-gradient-to-r from-blue-900 to-blue-700' 
                          : 'bg-gradient-to-r from-yellow-500 to-pink-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-white">
                          {getIconComponent(partner.icon, "w-6 h-6")}
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-lg">{partner.name}</div>
                          <div className="text-sm opacity-90">{partner.subtitle}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-white px-2 py-1 rounded text-xs font-semibold text-dark-blue">
                          {partner.badge}
                        </div>
                        <FiArrowRight className="w-5 h-5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card - Book Package */}
            <div className="relative rounded-2xl shadow-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300">
              {/* Image Section */}
              <div className="relative h-80 lg:h-96">
                <Image
                  src={bookingData.packages.image}
                  alt="Surfer in wave action shot"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                
                {/* Adventure Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                    <FaFireIcon className="w-3 h-3 text-primary" />
                    <span className="text-dark-blue text-xs font-semibold">{bookingData.packages.badge}</span>
                  </div>
                </div>
                
                {/* Content on Image */}
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-2">
                    {bookingData.packages.title}
                  </h2>
                  <p className="text-lg lg:text-xl mb-4 opacity-90">
                    {bookingData.packages.subtitle}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-primary">
                      {bookingData.packages.currency}{bookingData.packages.price}
                    </span>
                    <span className="text-sm opacity-80">{bookingData.packages.priceLabel}</span>
                  </div>
                </div>
              </div>
              
              {/* White Card Section */}
              <div className="bg-white p-6 lg:p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {bookingData.packages.description}
                </p>
                
                {/* Package Options */}
                <div className="space-y-4 mb-6">
                  {bookingData.packages.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handlePackageClick(option.link)}
                      className={`w-full rounded-xl p-6 text-white hover:brightness-110 hover:scale-[1.02] transition-all duration-300 flex items-center justify-between cursor-pointer focus:ring-2 focus:ring-yellow-500 ${
                        option.id === 'yoga' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                          : option.id === 'surf-skate'
                          ? 'bg-gradient-to-r from-cyan-500 to-teal-500'
                          : 'bg-gradient-to-r from-green-500 to-emerald-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-white">
                          {getIconComponent(option.icon, "w-6 h-6")}
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-lg flex items-center gap-2">
                            {option.title}
                            {option.badge && (
                              <span className="bg-yellow-400 text-dark-blue px-2 py-1 rounded text-xs font-semibold">
                                {option.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-sm opacity-90">{option.subtitle}</div>
                          {option.discount && (
                            <div className="text-xs font-semibold text-yellow-200">{option.discount}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">MORE DETAILS</span>
                        <FiArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Limited Time Offer Banner */}
                <div className="rounded-xl p-6 flex items-center justify-between border" style={{ backgroundColor: 'var(--color-primary-pale)', borderColor: 'var(--color-primary-border)' }}>
                  <div className="flex items-center gap-3">
                    <FaGiftIcon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                    <div>
                      <div className="font-bold text-dark-blue">{bookingData.packages.limitedOffer.title}</div>
                      <div className="text-sm text-gray-600">{bookingData.packages.limitedOffer.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>
                      {bookingData.packages.limitedOffer.discount}% {bookingData.packages.limitedOffer.discountLabel}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookPage;
