'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GoogleReviewsSectionData } from '@/types';
import { FiStar, FiThumbsUp, FiMessageCircle } from 'react-icons/fi';

/**
 * GOOGLE REVIEWS SECTION - Design 3 of 3
 * 
 * Design 3: Horizontal Scroll Cards with Stats
 * 
 * Aesthetic: Modern, interactive, stats-focused
 * - Horizontal scrolling review cards
 * - Large stats section at top
 * - Rating breakdown bars
 * - Hover effects on cards
 * - Mobile-friendly swipe
 * - Clean white design with accents
 */

interface GoogleReviewsSectionProps {
  data: GoogleReviewsSectionData;
}

const GoogleReviewsSectionV3: React.FC<GoogleReviewsSectionProps> = ({ data }) => {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  const renderStars = (rating: number, size: string = 'w-5 h-5') => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`${size} ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Calculate rating distribution (mock data based on overall rating)
  const ratingDistribution = [
    { stars: 5, percentage: 78 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-orange-50/30 to-white">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 mb-6">
            <FiStar className="w-5 h-5 text-yellow-600 fill-yellow-600" />
            <span className="text-sm font-bold text-yellow-900 tracking-wider uppercase">
              Customer Reviews
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            Loved by{' '}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Our Guests
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 mb-16 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Overall Rating */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                {/* Google Logo */}
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-gray-500 font-medium">Google Reviews</span>
              </div>

              <div className="flex items-end justify-center lg:justify-start gap-4 mb-4">
                <span className="text-7xl lg:text-8xl font-black text-gray-900">{data.overallRating}</span>
                <div className="pb-3">
                  <div className="flex gap-1 mb-2">
                    {renderStars(Math.floor(data.overallRating), 'w-7 h-7')}
                  </div>
                  <p className="text-gray-500 font-medium">{data.totalReviews} reviews</p>
                </div>
              </div>

              <p className="text-gray-600 text-lg">
                Based on {data.totalReviews} verified Google reviews
              </p>
            </div>

            {/* Right - Rating Breakdown */}
            <div className="space-y-4">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-16">
                    <span className="font-bold text-gray-900">{item.stars}</span>
                    <FiStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-sm font-semibold text-gray-600">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Reviews */}
        <div className="relative -mx-6 lg:-mx-12 px-6 lg:px-12">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {data.reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-[350px] lg:w-[400px] snap-center"
              >
                <div 
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full cursor-pointer ${
                    expandedReview === review.id ? 'ring-2 ring-orange-500' : ''
                  }`}
                  onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
                      {review.author.avatar ? (
                        <Image
                          src={review.author.avatar}
                          alt={review.author.name}
                          width={56}
                          height={56}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                          <span className="text-white font-bold text-xl">
                            {review.author.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900 truncate">
                          {review.author.name}
                        </h4>
                        {review.verified && (
                          <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(review.rating, 'w-4 h-4')}</div>
                        <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className={`text-gray-700 leading-relaxed ${
                    expandedReview === review.id ? '' : 'line-clamp-4'
                  }`}>
                    {review.text}
                  </p>

                  {/* Expand Hint */}
                  {review.text.length > 200 && expandedReview !== review.id && (
                    <button className="text-orange-600 font-semibold text-sm mt-3 hover:text-orange-700">
                      Read more...
                    </button>
                  )}

                  {/* Footer Actions */}
                  <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors">
                      <FiThumbsUp className="w-4 h-4" />
                      <span className="text-sm font-medium">Helpful</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors">
                      <FiMessageCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Hint */}
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-sm lg:hidden">
            <span>Swipe to see more reviews</span>
            <svg className="w-5 h-5 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl p-10 lg:p-12 shadow-xl border border-orange-200">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Join {data.totalReviews}+ Happy Guests
            </h3>
            
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Book your cooking class today and create your own memorable experience!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span>Book Your Class</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              
              <a 
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-orange-600 hover:shadow-lg transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>See All Google Reviews</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(25%); }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 1s infinite;
        }
      `}</style>
    </section>
  );
};

export default GoogleReviewsSectionV3;
