'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import GalleryModal from './GalleryModal';

interface ActivityGalleryProps {
  images: string[];
  alt: string;
}

const ActivityGallery: React.FC<ActivityGalleryProps> = ({ images, alt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
            <Image
              src={mainImage}
              alt={alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized={mainImage?.startsWith('/')}
              priority
            />
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
                <Image
                  src={img}
                  alt={`${alt} ${index + 2}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized={img?.startsWith('/')}
                  loading="lazy"
                />
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

      {/* Gallery Modal */}
      {isModalOpen && (
        <GalleryModal
          images={images}
          currentIndex={currentImageIndex}
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
};

export default ActivityGallery;
