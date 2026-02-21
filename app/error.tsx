'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiRefreshCw } from 'react-icons/fi';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-16">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <span className="text-6xl">⚠️</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
          Something Went Wrong
        </h1>

        <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          We encountered an unexpected error. Don&apos;t worry, you can try refreshing the page or return to our homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FiRefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-full border-2 border-gray-200 hover:border-amber-500 transition-all duration-300"
          >
            <FiHome className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
