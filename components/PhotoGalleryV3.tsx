'use client';

import React, { memo, useState } from 'react';
import Image from 'next/image';
import { FiX, FiHeart, FiShare2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/**
 * PHOTO GALLERY SECTION - Design 3 of 3
 * 
 * Design 3: Instagram-Style Grid with Hover Cards
 * 
 * Aesthetic: Social media inspired
 * - Uniform square grid
 * - Beautiful hover effects with info overlay
 * - Category badges on images
 * - Like & share interactions
 * - Clean, modern, mobile-first
 * - Full-screen lightbox
 */

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  likes: number;
}

const categories = ['All', 'Cooking Process', 'Ingredients', 'Finished Dishes'];

const galleryImages: GalleryImage[] = [
  { id: 1, src: '/gallery/tagine-cooking.jpg', alt: 'Traditional tagine cooking in clay pot', category: 'Cooking Process', likes: 128 },
  { id: 2, src: '/gallery/spices.jpg', alt: 'Colorful Moroccan spices', category: 'Ingredients', likes: 95 },
  { id: 3, src: '/gallery/tagine-dish.jpg', alt: 'Finished tagine dish', category: 'Finished Dishes', likes: 156 },
  { id: 4, src: '/gallery/bread-baking.jpg', alt: 'Traditional bread baking', category: 'Cooking Process', likes: 112 },
  { id: 5, src: '/gallery/vegetables.jpg', alt: 'Fresh vegetables and herbs', category: 'Ingredients', likes: 87 },
  { id: 6, src: '/gallery/coucous.jpg', alt: 'Couscous with vegetables', category: 'Finished Dishes', likes: 143 },
  { id: 7, src: '/gallery/tea-ceremony.jpg', alt: 'Traditional mint tea ceremony', category: 'Cooking Process', likes: 134 },
  { id: 8, src: '/gallery/traditional-kitchen.jpg', alt: 'Traditional Moroccan kitchen', category: 'Cooking Process', likes: 98 },
  { id: 9, src: '/gallery/cooking-class.jpg', alt: 'Cooking class in session', category: 'Cooking Process', likes: 167 },
  { id: 10, src: '/gallery/pastries.jpg', alt: 'Moroccan pastries and sweets', category: 'Finished Dishes', likes: 189 },
  { id: 11, src: '/gallery/olive-oil.jpg', alt: 'Olive oil and olives', category: 'Ingredients', likes: 76 },
  { id: 12, src: '/gallery/hands-preparing.jpg', alt: 'Hands preparing dough', category: 'Cooking Process', likes: 145 }
];

const PhotoGalleryV3: React.FC = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const currentImage = filteredImages[currentImageIndex];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 mb-6">
            <span className="text-2xl">✨</span>
            <span className="text-sm font-bold text-pink-900 tracking-wider uppercase">
              Gallery
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Instagram{' '}
            <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 bg-clip-text text-transparent">
              Moments
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Share-worthy moments from our cooking classes. 
            Tag us to be featured! 📸
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Instagram-Style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              onClick={() => openLightbox(index)}
            >
              {/* Image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    {image.category}
                  </span>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                {/* Image Title */}
                <h3 className="text-white font-bold text-lg mb-4">
                  {image.alt}
                </h3>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  {/* Like Button */}
                  <button
                    onClick={(e) => toggleLike(image.id, e)}
                    className="flex items-center gap-2 text-white hover:scale-110 transition-transform"
                  >
                    <FiHeart 
                      className={`w-6 h-6 ${likedImages.has(image.id) ? 'fill-pink-500 text-pink-500' : ''}`}
                    />
                    <span className="text-sm font-semibold">
                      {image.likes + (likedImages.has(image.id) ? 1 : 0)}
                    </span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.share?.({ 
                        title: image.alt,
                        text: 'Check out this amazing cooking class moment!',
                        url: window.location.href 
                      }).catch(() => {});
                    }}
                    className="flex items-center gap-2 text-white hover:scale-110 transition-transform"
                  >
                    <FiShare2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-10 lg:p-12 shadow-xl border border-pink-100">
            <div className="mb-6">
              <span className="text-5xl">📱</span>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Share Your Cooking Experience!
            </h3>
            
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Tag us <span className="font-bold text-pink-600">@cookingclass_morocco</span> for a chance to be featured!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span>Book Your Class</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-pink-600 hover:shadow-lg transition-all duration-300"
              >
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <FiX className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-auto px-20 py-10">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Image Info & Actions */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 flex items-center gap-6">
            <div className="text-center">
              <p className="text-white font-semibold text-lg mb-1">
                {currentImage.alt}
              </p>
              <p className="text-white/60 text-sm">
                {currentImageIndex + 1} / {filteredImages.length}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 border-l border-white/20 pl-6">
              <button
                onClick={(e) => toggleLike(currentImage.id, e)}
                className="flex items-center gap-2 text-white hover:scale-110 transition-transform"
              >
                <FiHeart 
                  className={`w-6 h-6 ${likedImages.has(currentImage.id) ? 'fill-pink-500 text-pink-500' : ''}`}
                />
                <span className="text-sm font-semibold">
                  {currentImage.likes + (likedImages.has(currentImage.id) ? 1 : 0)}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

PhotoGalleryV3.displayName = 'PhotoGalleryV3';

export default PhotoGalleryV3;
