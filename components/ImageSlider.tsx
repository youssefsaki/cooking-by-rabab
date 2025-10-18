'use client';

import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: string[];
  alt: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, alt }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
    mode: 'free-snap',
    slides: {
      perView: 1,
      spacing: 16,
    },
    animationEnded() {
      // Smooth transition effect
    },
  });

  // Intersection Observer to detect when slider is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Trigger when 50% of the slider is visible
        rootMargin: '0px 0px -10% 0px' // Start auto-slide when slider is well in view
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-slide every 3 seconds ONLY when in view and not hovered
  useEffect(() => {
    if (!loaded || !instanceRef.current || !isInView || isHovered) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);

    return () => clearInterval(interval);
  }, [loaded, instanceRef, isInView, isHovered]);

  const nextSlide = () => {
    instanceRef.current?.next();
  };

  const prevSlide = () => {
    instanceRef.current?.prev();
  };

  const goToSlide = (index: number) => {
    instanceRef.current?.moveToIdx(index);
  };

  return (
    <div 
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider Container */}
      <div className="overflow-hidden rounded-xl shadow-lg">
        <div ref={sliderRef} className="keen-slider" style={{ transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
          {images.map((image, index) => (
            <div key={index} className="keen-slider__slide">
              <div className="relative aspect-[4/5] lg:aspect-[4/5] overflow-hidden">
                {imageErrors.has(index) ? (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">📷</div>
                      <div className="text-sm">Image not available</div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={image}
                    alt={`${alt} ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index === 0}
                    onError={() => {
                      setImageErrors(prev => new Set(prev).add(index));
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {loaded && instanceRef.current && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-60 hover:bg-opacity-90 text-white rounded-full flex items-center justify-center transition-all duration-300 z-10 shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-60 hover:bg-opacity-90 text-white rounded-full flex items-center justify-center transition-all duration-300 z-10 shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          {/* Auto-slide indicator */}
          {isInView && !isHovered && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span>Auto-sliding</span>
            </div>
          )}
          
          {/* Dots */}
          <div className="flex gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ease-in-out ${
                  index === currentSlide 
                    ? 'bg-orange-500 scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
