'use client';

import React, { memo, useState } from 'react';
import Image from 'next/image';
import { FiX, FiChevronLeft, FiChevronRight, FiCamera } from 'react-icons/fi';

/**
 * PHOTO GALLERY SECTION - Design 1 of 3
 * 
 * Design 1: Masonry Grid with Lightbox
 * 
 * Aesthetic: Pinterest-style masonry grid
 * - Responsive masonry layout
 * - Click to open lightbox
 * - Navigation between photos
 * - Category filtering
 * - Instagram-worthy presentation
 */

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  size: 'tall' | 'wide' | 'square';
}

const categories = ['All', 'Cooking Process', 'Ingredients', 'Finished Dishes'];

const galleryImages: GalleryImage[] = [
  { id: 1, src: '/gallery/tagine-cooking.jpg', alt: 'Traditional tagine cooking in clay pot', category: 'Cooking Process', size: 'tall' },
  { id: 2, src: '/gallery/spices.jpg', alt: 'Colorful Moroccan spices', category: 'Ingredients', size: 'wide' },
  { id: 3, src: '/gallery/tagine-dish.jpg', alt: 'Finished tagine dish', category: 'Finished Dishes', size: 'square' },
  { id: 4, src: '/gallery/bread-baking.jpg', alt: 'Traditional bread baking', category: 'Cooking Process', size: 'tall' },
  { id: 5, src: '/gallery/vegetables.jpg', alt: 'Fresh vegetables and herbs', category: 'Ingredients', size: 'square' },
  { id: 6, src: '/gallery/coucous.jpg', alt: 'Couscous with vegetables', category: 'Finished Dishes', size: 'wide' },
  { id: 7, src: '/gallery/tea-ceremony.jpg', alt: 'Traditional mint tea ceremony', category: 'Cooking Process', size: 'square' },
  { id: 8, src: '/gallery/traditional-kitchen.jpg', alt: 'Traditional Moroccan kitchen', category: 'Cooking Process', size: 'tall' },
  { id: 9, src: '/gallery/cooking-class.jpg', alt: 'Cooking class in session', category: 'Cooking Process', size: 'wide' },
  { id: 10, src: '/gallery/pastries.jpg', alt: 'Moroccan pastries and sweets', category: 'Finished Dishes', size: 'square' },
  { id: 11, src: '/gallery/olive-oil.jpg', alt: 'Olive oil and olives', category: 'Ingredients', size: 'square' },
  { id: 12, src: '/gallery/hands-preparing.jpg', alt: 'Hands preparing dough', category: 'Cooking Process', size: 'tall' }
];

const PhotoGallery: React.FC = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

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

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gray-50">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 mb-6">
            <FiCamera className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-amber-900 tracking-wider uppercase">
              Gallery
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            See the{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real moments from our cooking classes, activities, and adventures. 
            See what awaits you in Morocco!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200 hover:border-amber-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${
                image.size === 'tall' ? 'row-span-2' : 
                image.size === 'wide' ? 'col-span-2' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <div className={`relative ${
                image.size === 'tall' ? 'h-96' : 
                image.size === 'wide' ? 'h-48' : 'h-48'
              }`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-semibold text-sm">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            📸 Want to experience this yourself? <a href="/book" className="text-amber-600 font-semibold hover:underline">Book your cooking class today</a> and create your own delicious memories!
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
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
              src={filteredImages[currentImageIndex].src}
              alt={filteredImages[currentImageIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Image Counter & Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white font-semibold mb-2">
              {filteredImages[currentImageIndex].alt}
            </p>
            <p className="text-white/60 text-sm">
              {currentImageIndex + 1} / {filteredImages.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
});

PhotoGallery.displayName = 'PhotoGallery';

export default PhotoGallery;
