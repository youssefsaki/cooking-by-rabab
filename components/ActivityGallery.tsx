'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import dynamic from 'next/dynamic';

// Lazy load gallery modal - only load when user clicks "Show Gallery"
const GalleryModal = dynamic(() => import('./GalleryModal'), {
  loading: () => (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
      <div className="text-white text-lg">Loading gallery...</div>
    </div>
  ),
  ssr: false,
});

interface ActivityGalleryProps {
  images: string[];
  alt: string;
}

const ActivityGallery: React.FC<ActivityGalleryProps> = ({ images, alt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleShowGallery = () => {
    setIsModalOpen(true);
    setCurrentImageIndex(0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

  if (!images || images.length === 0) return null;

  const mainImage = images[0] || '';
  const gridImages = images.slice(1, 5);

  return (
    <>
      <div className="relative mb-8">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main Large Image */}
          <div className="md:col-span-2 relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
            {imageErrors.has(0) ? (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📷</div>
                  <div className="text-sm">Image not available</div>
                </div>
              </div>
            ) : (
              <Image
                src={mainImage}
                alt={alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, 66vw"
                unoptimized={mainImage.includes('belly-dancing')}
                onError={() => handleImageError(0)}
              />
            )}
          </div>

          {/* 4 Smaller Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            {gridImages.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => {
                  setCurrentImageIndex(index + 1);
                  setIsModalOpen(true);
                }}
              >
                {imageErrors.has(index + 1) ? (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-2xl mb-1">📷</div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={img}
                    alt={`${alt} ${index + 2}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    unoptimized={img.includes('belly-dancing')}
                    onError={() => handleImageError(index + 1)}
                  />
                )}
              </div>
            ))}
            {/* Fill empty slots if less than 4 images */}
            {Array.from({ length: Math.max(0, 4 - gridImages.length) }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="relative aspect-square rounded-xl overflow-hidden bg-gray-200"
              />
            ))}
          </div>
        </div>

        {/* Show Gallery Button */}
        <button
          onClick={handleShowGallery}
          className="absolute bottom-4 right-4 bg-gray-900/80 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-all duration-300 backdrop-blur-sm"
        >
          <Camera className="w-4 h-4" />
          <span className="font-semibold text-sm">Show Gallery</span>
        </button>
      </div>

      {/* Gallery Modal - Only loaded when isModalOpen is true */}
      {isModalOpen && (
        <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
          <GalleryModal
            images={images}
            currentIndex={currentImageIndex}
            onClose={handleCloseModal}
            onNavigate={handleNavigate}
          />
        </Suspense>
      )}
    </>
  );
};

export default ActivityGallery;
