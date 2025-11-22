'use client';

import React from 'react';
import { Loader2, Plane, Calendar, CheckCircle, Sparkles } from 'lucide-react';

interface BookingLoaderProps {
  bookingType?: 'package' | 'activity';
}

const BookingLoader: React.FC<BookingLoaderProps> = ({ bookingType = 'package' }) => {
  const messages = [
    'Preparing your perfect stay...',
    'Securing your booking details...',
    'Connecting with our team...',
    'Almost there! 🎉',
    'Finalizing your adventure...',
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);
  const [dots, setDots] = React.useState('');

  React.useEffect(() => {
    // Rotate messages every 2 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
      <div className="relative max-w-md w-full">
        {/* Main Loading Card */}
        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-3xl p-10 shadow-2xl border-4 border-amber-300 relative overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10">
            {/* Spinning Icon Container */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Outer Rotating Ring */}
                <div className="absolute inset-0 border-4 border-amber-400 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
                {/* Inner Rotating Ring */}
                <div className="absolute inset-4 border-4 border-yellow-400 rounded-full animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div>
                
                {/* Central Icon */}
                <div className="relative w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  {bookingType === 'package' ? (
                    <Plane className="w-12 h-12 text-white animate-bounce" />
                  ) : (
                    <Calendar className="w-12 h-12 text-white animate-bounce" />
                  )}
                </div>

                {/* Sparkles */}
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                </div>
                <div className="absolute -bottom-2 -left-2">
                  <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentMessageIndex >= step
                      ? 'bg-amber-500 scale-125'
                      : 'bg-amber-200'
                  }`}
                  style={{
                    animation: currentMessageIndex >= step ? 'pulse 1s infinite' : 'none',
                  }}
                ></div>
              ))}
            </div>

            {/* Message */}
            <div className="text-center mb-4">
              <h3 className="text-2xl font-black text-amber-900 mb-2">
                Processing Your Booking
              </h3>
              <p className="text-lg text-amber-800 font-medium min-h-[30px] flex items-center justify-center">
                {messages[currentMessageIndex]}
                <span className="inline-block w-6 text-left">{dots}</span>
              </p>
            </div>

            {/* Loading Bar */}
            <div className="w-full bg-amber-200 rounded-full h-2.5 mb-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full animate-progress"></div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-amber-700">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">Secured Connection</span>
              </div>
              <span className="text-amber-600">•</span>
              <span className="font-semibold">256-bit SSL</span>
            </div>
          </div>
        </div>

        {/* Floating Checkmarks */}
        <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0.2s' }}>
          <CheckCircle className="w-8 h-8 text-green-500 opacity-60" />
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce" style={{ animationDelay: '0.6s' }}>
          <CheckCircle className="w-8 h-8 text-green-500 opacity-60" />
        </div>
      </div>
    </div>
  );
};

export default BookingLoader;

