'use client';

import React, { memo, useState } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiX, FiZoomIn } from 'react-icons/fi';

/**
 * PHOTO GALLERY SECTION - Design 2 of 3
 * 
 * Design 2: Featured Image Slider with Thumbnails
 * 
 * Aesthetic: Premium full-width slider
 * - Large featured image display
 * - Thumbnail strip at bottom
 * - Category tabs above
 * - Smooth transitions
 * - Auto-advance option
 * - Full-screen lightbox
 */

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const categories = ['All', 'Cooking Process', 'Ingredients', 'Finished Dishes'];

const galleryImages: GalleryImage[] = [
  { id: 1, src: '/gallery/tagine-cooking.jpg', alt: 'Traditional tagine cooking in clay pot', category: 'Cooking Process' },
  { id: 2, src: '/gallery/spices.jpg', alt: 'Colorful Moroccan spices', category: 'Ingredients' },
  { id: 3, src: '/gallery/tagine-dish.jpg', alt: 'Finished tagine dish', category: 'Finished Dishes' },
  { id: 4, src: '/gallery/bread-baking.jpg', alt: 'Traditional bread baking', category: 'Cooking Process' },
  { id: 5, src: '/gallery/vegetables.jpg', alt: 'Fresh vegetables and herbs', category: 'Ingredients' },
  { id: 6, src: '/gallery/coucous.jpg', alt: 'Couscous with vegetables', category: 'Finished Dishes' },
  { id: 7, src: '/gallery/tea-ceremony.jpg', alt: 'Traditional mint tea ceremony', category: 'Cooking Process' },
  { id: 8, src: '/gallery/traditional-kitchen.jpg', alt: 'Traditional Moroccan kitchen', category: 'Cooking Process' },
  { id: 9, src: '/gallery/cooking-class.jpg', alt: 'Cooking class in session', category: 'Cooking Process' },
  { id: 10, src: '/gallery/pastries.jpg', alt: 'Moroccan pastries and sweets', category: 'Finished Dishes' },
  { id: 11, src: '/gallery/olive-oil.jpg', alt: 'Olive oil and olives', category: 'Ingredients' },
  { id: 12, src: '/gallery/hands-preparing.jpg', alt: 'Hands preparing dough', category: 'Cooking Process' }
];

const PhotoGalleryV2: React.FC = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const currentImage = filteredImages[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const openLightbox = () => {
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-orange-50/30 to-white">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 mb-6">
            <span className="text-2xl">📸</span>
            <span className="text-sm font-bold text-orange-900 tracking-wider uppercase">
              Gallery
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
              Culinary Journey
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real moments from our traditional Moroccan cooking classes. 
            From fresh ingredients to finished dishes, see the authentic culinary journey!
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentIndex(0);
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-300 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Main Featured Image */}
        <div className="relative mb-8">
          <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl z-10"
            >
              <FiChevronLeft className="w-7 h-7" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl z-10"
            >
              <FiChevronRight className="w-7 h-7" />
            </button>

            {/* Zoom Button */}
            <button
              onClick={openLightbox}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl z-10"
            >
              <FiZoomIn className="w-6 h-6" />
            </button>

            {/* Image Info */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-2">
                      {currentImage.category}
                    </p>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                      {currentImage.alt}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-gray-900">
                      {currentIndex + 1}
                    </p>
                    <p className="text-sm text-gray-500">
                      / {filteredImages.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4">
              {filteredImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => goToImage(index)}
                  className={`relative flex-shrink-0 w-32 h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                    currentIndex === index
                      ? 'ring-4 ring-orange-500 scale-105 shadow-xl'
                      : 'opacity-60 hover:opacity-100 hover:scale-105 shadow-lg'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                  {currentIndex === index && (
                    <div className="absolute inset-0 bg-orange-500/20"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl p-10 lg:p-12 shadow-xl border border-orange-200">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Ready to Create Your Own Culinary Masterpiece?
            </h3>
            
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Join us for an authentic Moroccan cooking experience!
            </p>

            <a 
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>Book Your Class</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Full-Screen Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <FiX className="w-7 h-7" />
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <FiChevronLeft className="w-7 h-7" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <FiChevronRight className="w-7 h-7" />
          </button>

          {/* Image */}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto px-20 py-10">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Image Info */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
            <p className="text-white font-semibold text-lg mb-1">
              {currentImage.alt}
            </p>
            <p className="text-white/80 text-sm">
              {currentIndex + 1} of {filteredImages.length}
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
});

PhotoGalleryV2.displayName = 'PhotoGalleryV2';

export default PhotoGalleryV2;
