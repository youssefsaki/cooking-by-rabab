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

const categories = ['All', 'Cooking', 'Activities', 'Location', 'People'];

const galleryImages: GalleryImage[] = [
  { id: 1, src: '/hero2.jpg', alt: 'Traditional tagine cooking', category: 'Cooking', size: 'tall' },
  { id: 2, src: '/activities/surf.jpg', alt: 'Surfing lessons', category: 'Activities', size: 'wide' },
  { id: 3, src: '/activities/yoga.jpg', alt: 'Rooftop yoga session', category: 'Activities', size: 'square' },
  { id: 4, src: '/activities/paradise-valley.jpg', alt: 'Paradise Valley oasis', category: 'Location', size: 'tall' },
  { id: 5, src: '/hero3.jpg', alt: 'Moroccan spices', category: 'Cooking', size: 'square' },
  { id: 6, src: '/activities/medina.jpg', alt: 'Medina souk', category: 'Location', size: 'wide' },
  { id: 7, src: '/hero4.jpg', alt: 'Traditional feast', category: 'Cooking', size: 'square' },
  { id: 8, src: '/activities/belly-dancing.jpg', alt: 'Belly dancing class', category: 'Activities', size: 'tall' },
  { id: 9, src: '/hero1.jpg', alt: 'Cooking class group', category: 'People', size: 'wide' },
  { id: 10, src: '/activities/sandboarding.jpg', alt: 'Sand dunes', category: 'Location', size: 'square' }
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 mb-6">
            <FiCamera className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-bold text-pink-900 tracking-wider uppercase">
              Gallery
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            See the{' '}
            <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 bg-clip-text text-transparent">
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
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200 hover:border-pink-300'
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
            📸 Follow us on Instagram for daily updates: <a href="#" className="text-pink-600 font-semibold hover:underline">@cookingclass_morocco</a>
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
