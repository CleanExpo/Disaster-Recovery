'use client';

/**
 * RESPONSIVE IMAGE COMPONENT
 * ==========================
 * 
 * Optimised image component that automatically handles:
 * - Multiple device sizes (mobile, tablet, desktop)
 * - Lazy loading for performance
 * - WebP with fallbacks
 * - Proper compression
 * - NRP watermark display
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  watermarked?: boolean;
  category?: 'hero' | 'training' | 'icons' | 'thumbnails' | 'documentation';
  sizes?: string;
  quality?: number;
  fill?: boolean;
  aspectRatio?: number;
  onLoad?: () => void;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * Device detection hook
 */
function useDeviceType() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  return deviceType;
}

/**
 * Responsive Image Component
 */
export function ResponsiveImage({
  src,
  alt,
  priority = false,
  className,
  watermarked = true,
  category = 'hero',
  sizes,
  quality,
  fill = false,
  aspectRatio = 16/9,
  onLoad,
  placeholder = 'blur',
  blurDataURL
}: ResponsiveImageProps) {
  const deviceType = useDeviceType();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Quality settings per device
  const qualitySettings = {
    mobile: 75,
    tablet: 80,
    desktop: 85
  };
  
  // Size configurations
  const sizeConfigs = {
    hero: {
      mobile: '100vw',
      tablet: '100vw',
      desktop: '100vw'
    },
    training: {
      mobile: '100vw',
      tablet: '(min-width: 768px) 50vw, 100vw',
      desktop: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
    },
    icons: {
      mobile: '64px',
      tablet: '96px',
      desktop: '128px'
    },
    thumbnails: {
      mobile: '150px',
      tablet: '200px',
      desktop: '250px'
    },
    documentation: {
      mobile: '100vw',
      tablet: '(min-width: 768px) 75vw, 100vw',
      desktop: '(min-width: 1024px) 66vw, 100vw'
    }
  };
  
  const imageQuality = quality || qualitySettings[deviceType];
  const imageSizes = sizes || sizeConfigs[category][deviceType];
  
  // Generate blur placeholder for performance
  const defaultBlurDataURL = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="100%25" height="100%25" fill="%23f3f4f6"/%3E%3C/svg%3E';
  
  if (error) {
    return (
      <div 
        className={cn(
          "bg-gray-100 flex items-centre justify-centre",
          fill ? "absolute inset-0" : "w-full",
          className
        )}
        style={!fill ? { aspectRatio: aspectRatio.toString() } : undefined}
      >
        <div className="text-centre p-4">
          <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-gray-500">Image unavailable</p>
        </div>
      </div>
    );
  }
  
  const imageComponent = (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : 1920}
      height={fill ? undefined : Math.round(1920 / aspectRatio)}
      priority={priority}
      quality={imageQuality}
      sizes={imageSizes}
      className={cn(
        "transition-opacity duration-300",
        isLoading ? "opacity-0" : "opacity-100",
        fill ? "object-cover" : "w-full h-auto",
        className
      )}
      onLoad={() => {
        setIsLoading(false);
        onLoad?.();
      }}
      onError={() => setError(true)}
      placeholder={placeholder}
      blurDataURL={blurDataURL || defaultBlurDataURL}
    />
  );
  
  // Add watermark overlay if needed
  if (watermarked) {
    return (
      <div className={cn("relative", fill ? "w-full h-full" : "w-full")}>
        {imageComponent}
        {/* Watermark overlay */}
        <div className="absolute bottom-4 right-4 opacity-90 pointer-events-none z-10">
          <Image
            src="/images/optimised/branding/Disaster Recovery Logo.png"
            alt="NRP Logo"
            width={deviceType === 'mobile' ? 60 : deviceType === 'tablet' ? 80 : 100}
            height={deviceType === 'mobile' ? 20 : deviceType === 'tablet' ? 27 : 33}
            className="drop-shadow-lg"
            priority
          />
        </div>
        {/* Loading skeleton */}
        {isLoading && (
          <div 
            className={cn(
              "absolute inset-0 bg-gray-200 animate-pulse",
              fill ? "" : "w-full"
            )}
            style={!fill ? { aspectRatio: aspectRatio.toString() } : undefined}
          />
        )}
      </div>
    );
  }
  
  return (
    <div className={cn("relative", fill ? "w-full h-full" : "w-full")}>
      {imageComponent}
      {/* Loading skeleton */}
      {isLoading && (
        <div 
          className={cn(
            "absolute inset-0 bg-gray-200 animate-pulse",
            fill ? "" : "w-full"
          )}
          style={!fill ? { aspectRatio: aspectRatio.toString() } : undefined}
        />
      )}
    </div>
  );
}

/**
 * Picture element for maximum compatibility
 */
export function ResponsivePicture({
  src,
  alt,
  className,
  watermarked = true,
  loading = 'lazy'
}: {
  src: string;
  alt: string;
  className?: string;
  watermarked?: boolean;
  loading?: 'lazy' | 'eager';
}) {
  const basePath = src.replace(/\.[^.]+$/, '');
  const extension = src.split('.').pop();
  
  return (
    <picture className={cn("relative block", className)}>
      {/* WebP sources for modern browsers */}
      <source
        type="image/webp"
        media="(max-width: 639px)"
        srcSet={`${basePath}-640w.webp 1x, ${basePath}-1280w.webp 2x`}
      />
      <source
        type="image/webp"
        media="(max-width: 1023px)"
        srcSet={`${basePath}-1024w.webp 1x, ${basePath}-2048w.webp 2x`}
      />
      <source
        type="image/webp"
        srcSet={`${basePath}-1920w.webp 1x, ${basePath}-3840w.webp 2x`}
      />
      
      {/* Fallback sources */}
      <source
        media="(max-width: 639px)"
        srcSet={`${basePath}-640w.${extension} 1x, ${basePath}-1280w.${extension} 2x`}
      />
      <source
        media="(max-width: 1023px)"
        srcSet={`${basePath}-1024w.${extension} 1x, ${basePath}-2048w.${extension} 2x`}
      />
      
      {/* Default image */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className="w-full h-auto"
      />
      
      {/* Watermark overlay */}
      {watermarked && (
        <div className="absolute bottom-4 right-4 opacity-90 pointer-events-none">
          <img
            src="/images/optimised/branding/Disaster Recovery Logo.png"
            alt="NRP Logo"
            className="w-20 md:w-24 lg:w-28 h-auto drop-shadow-lg"
            loading="eager"
          />
        </div>
      )}
    </picture>
  );
}

/**
 * Training-specific image component
 */
export function TrainingImage({
  src,
  alt,
  caption,
  className
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  const deviceType = useDeviceType();
  
  return (
    <figure className={cn("my-4 md:my-6", className)}>
      <ResponsiveImage
        src={src}
        alt={alt}
        category="training"
        watermarked={true}
        quality={deviceType === 'mobile' ? 70 : 80}
        className="rounded-lg shadow-lg"
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600 text-centre italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Hero image component with text overlay
 */
export function HeroImage({
  src,
  alt,
  title,
  subtitle,
  className,
  overlay = true
}: {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  className?: string;
  overlay?: boolean;
}) {
  return (
    <div className={cn("relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]", className)}>
      <ResponsiveImage
        src={src}
        alt={alt}
        fill
        priority
        category="hero"
        watermarked={true}
        className="object-cover"
      />
      
      {/* Dark overlay for text readability */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      )}
      
      {/* Text content */}
      {(title || subtitle) && (
        <div className="absolute inset-0 flex flex-col justify-centre items-centre text-white px-4">
          {title && (
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-centre mb-4 drop-shadow-2xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl text-centre max-w-3xl drop-shadow-xl">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Gallery component for multiple images
 */
export function ImageGallery({
  images,
  className,
  columns = { mobile: 1, tablet: 2, desktop: 3 }
}: {
  images: Array<{ src: string; alt: string; caption?: string }>;
  className?: string;
  columns?: { mobile: number; tablet: number; desktop: number };
}) {
  return (
    <div className={cn(
      "grid gap-4",
      `grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`,
      className
    )}>
      {images.map((image, index) => (
        <div key={index} className="relative group overflow-hidden rounded-lg">
          <ResponsiveImage
            src={image.src}
            alt={image.alt}
            category="thumbnails"
            watermarked={true}
            className="transition-transform duration-300 group-hover:scale-105"
          />
          {image.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white text-sm">{image.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}