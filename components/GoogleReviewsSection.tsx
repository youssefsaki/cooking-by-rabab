'use client';

import React from 'react';
import Image from 'next/image';
import { GoogleReviewsSectionData } from '@/types';

interface GoogleReviewsSectionProps {
  data: GoogleReviewsSectionData;
}

const GoogleReviewsSection: React.FC<GoogleReviewsSectionProps> = ({ data }) => {
  // Function to render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-dark-blue mb-4">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          )}
          
          {/* Overall Rating */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(Math.floor(data.overallRating))}
              </div>
              <span className="text-2xl font-bold text-dark-blue">
                {data.overallRating}
              </span>
            </div>
            <div className="text-gray-600">
              <span className="font-semibold">{data.totalReviews}</span> Google Reviews
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Review Header */}
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {review.author.avatar ? (
                    <Image
                      src={review.author.avatar}
                      alt={review.author.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-semibold text-lg">
                        {review.author.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Author Info */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-dark-blue">
                      {review.author.name}
                    </h4>
                    {review.verified && (
                      <span className="text-xs bg-primary-pale text-primary-dark px-2 py-1 rounded-full font-medium">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>

        {/* Google Reviews Link */}
        <div className="text-center mt-12">
          <a
            href="https://www.google.com/search?q=Cactus+Surf+Skate+House+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-dark-blue font-bold px-6 py-3 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Read More Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;


