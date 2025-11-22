'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  loading?: 'lazy' | 'eager';
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  quality = 85,
  loading,
  onError,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Determine if image is local or external
  const isLocal = src.startsWith('/');
  
  // Handle image errors
  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
    onError?.();
  };

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`} style={fill ? {} : { width, height }}>
        <div className="text-center text-gray-500 p-4">
          <div className="text-4xl mb-2">📷</div>
          <div className="text-sm">Image not available</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={fill ? {} : { width, height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        priority={priority}
        loading={loading || (priority ? 'eager' : 'lazy')}
        quality={quality}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        onError={handleError}
        onLoad={handleLoad}
        unoptimized={isLocal ? false : false} // Let Next.js optimize all images
      />
    </div>
  );
};

export default OptimizedImage;







