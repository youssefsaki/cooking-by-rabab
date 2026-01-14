'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GoogleReviewsSectionData } from '@/types';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

/**
 * GOOGLE REVIEWS SECTION - Design 2 of 3
 * 
 * Design 2: Testimonial Carousel with Featured Quote
 * 
 * Aesthetic: Premium, dark theme, cinematic
 * - Large featured testimonial
 * - Carousel navigation
 * - Big quote styling
 * - Google rating badge
 * - Avatar strip at bottom
 * - Dark gradient background
 */

interface GoogleReviewsSectionProps {
  data: GoogleReviewsSectionData;
}

const GoogleReviewsSectionV2: React.FC<GoogleReviewsSectionProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.reviews.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === data.reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = data.reviews[currentIndex];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`w-6 h-6 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Decorative Quotes */}
      <div className="absolute top-20 left-10 text-[200px] text-white/5 font-serif leading-none pointer-events-none">
        &ldquo;
      </div>
      <div className="absolute bottom-20 right-10 text-[200px] text-white/5 font-serif leading-none rotate-180 pointer-events-none">
        &rdquo;
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header with Google Badge */}
        <div className="text-center mb-16">
          {/* Google Rating Badge */}
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 mb-8">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-white">{data.overallRating}</span>
                <div className="flex">{renderStars(Math.floor(data.overallRating))}</div>
              </div>
              <p className="text-white/70 text-sm font-medium">{data.totalReviews} Google Reviews</p>
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            {data.title}
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10"
          >
            <FiChevronLeft className="w-7 h-7" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10"
          >
            <FiChevronRight className="w-7 h-7" />
          </button>

          {/* Testimonial Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 lg:p-16 border border-white/10">
            {/* Stars */}
            <div className="flex justify-center gap-2 mb-8">
              {renderStars(currentReview.rating)}
            </div>

            {/* Quote */}
            <blockquote className="text-center mb-10">
              <p className="text-2xl lg:text-3xl xl:text-4xl text-white font-medium leading-relaxed italic">
                &ldquo;{currentReview.text}&rdquo;
              </p>
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-white/20">
                {currentReview.author.avatar ? (
                  <Image
                    src={currentReview.author.avatar}
                    alt={currentReview.author.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {currentReview.author.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Name & Date */}
              <h4 className="text-xl font-bold text-white mb-1">
                {currentReview.author.name}
              </h4>
              {currentReview.verified && (
                <span className="inline-flex items-center gap-1 text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-medium mb-2">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified Review
                </span>
              )}
              <p className="text-gray-400 text-sm">
                {formatDate(currentReview.date)}
              </p>
            </div>
          </div>

          {/* Slide Counter */}
          <div className="flex justify-center gap-2 mt-8">
            {data.reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? 'w-10 h-3 bg-gradient-to-r from-orange-500 to-amber-500'
                    : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Avatar Strip */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center -space-x-3">
            {data.reviews.slice(0, 6).map((review, index) => (
              <button
                key={review.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-14 h-14 rounded-full overflow-hidden border-3 transition-all duration-300 ${
                  currentIndex === index
                    ? 'border-orange-500 scale-110 z-10'
                    : 'border-gray-700 hover:scale-105'
                }`}
              >
                {review.author.avatar ? (
                  <Image
                    src={review.author.avatar}
                    alt={review.author.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {review.author.name.charAt(0)}
                    </span>
                  </div>
                )}
              </button>
            ))}
            {data.reviews.length > 6 && (
              <div className="w-14 h-14 rounded-full bg-white/10 border-3 border-gray-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">+{data.reviews.length - 6}</span>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-gray-900 font-bold px-8 py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Read All Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSectionV2;
