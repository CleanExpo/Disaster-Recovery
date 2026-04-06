'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  quality?: number;
  fill?: boolean;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
}

// Shimmer effect for loading state
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="20%" />
      <stop stop-color="#edeef1" offset="50%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className,
  containerClassName,
  quality = 85,
  fill = false,
  sizes,
  objectFit = 'cover',
  onLoad,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Fallback for broken images
  const handleError = () => {
    setImgSrc('/images/placeholder.jpg');
    setIsLoading(false);
  };

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // Lazy loading with Intersection Observer
  useEffect(() => {
    if (priority) {
      setIsIntersecting(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
      }
    );

    const element = document.getElementById(`img-container-${src}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, priority]);

  // Generate blur placeholder
  const blurDataURL = `data:image/svg+xml;base64,${toBase64(
    shimmer(width, height)
  )}`;

  // Determine sizes for responsive images
  const imageSizes = sizes || 
    (fill 
      ? '100vw' 
      : `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${width}px`);

  return (
    <div
      id={`img-container-${src}`}
      className={cn(
        'relative overflow-hidden bg-gray-100 rounded-lg',
        fill ? 'w-full h-full' : '',
        containerClassName
      )}
      style={!fill ? { width, height } : undefined}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Image */}
      {isIntersecting && (
        <Image
          src={imgSrc}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          quality={quality}
          priority={priority}
          sizes={imageSizes}
          placeholder="blur"
          blurDataURL={blurDataURL}
          className={cn(
            'transition-opacity duration-500',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          style={{ objectFit }}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}

      {/* Progressive enhancement for WebP */}
      <picture>
        <source
          srcSet={`${src}?fm=webp&q=${quality}`}
          type="image/webp"
        />
        <source
          srcSet={`${src}?fm=jpg&q=${quality}`}
          type="image/jpeg"
        />
      </picture>
    </div>
  );
}

// Gallery component with optimized images
export function OptimizedImageGallery({
  images,
  columns = 3,
}: {
  images: Array<{ src: string; alt: string }>;
  columns?: number;
}) {
  return (
    <div 
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {images.map((image, index) => (
        <OptimizedImage
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={400}
          height={300}
          priority={index < 3} // First 3 images are high priority
          containerClassName="aspect-[4/3]"
        />
      ))}
    </div>
  );
}

// Hero image component
export function HeroImage({
  src,
  alt,
  title,
  subtitle,
}: {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px]">
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority
        quality={90}
        objectFit="cover"
        className="brightness-75"
      />
      
      {(title || subtitle) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            {title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xl md:text-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}