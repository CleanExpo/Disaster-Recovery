'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  service: string;
  location: string;
  imageType: 'hero' | 'equipment' | 'process' | 'team';
  alt?: string;
  title?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Optimized Image Component with SEO metadata and responsive loading
 * Automatically selects the best format and size based on context
 */
export default function OptimizedImage({
  service,
  location,
  imageType,
  alt,
  title,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate image paths based on naming convention
  const baseFilename = `${service}-${location.toLowerCase()}-${imageType}`;
  
  // Image paths for different formats and sizes
  const imagePaths = {
    // Primary optimized path
    primary: `/images/optimized/${imageType}/${location.toLowerCase()}/${service}/desktop/${baseFilename}.webp`,
    
    // Fallback paths
    fallbackJpg: `/images/optimized/${imageType}/${location.toLowerCase()}/${service}/desktop/${baseFilename}.jpg`,
    fallbackGenerated: `/images/generated/${baseFilename}.webp`,
    
    // Responsive sources
    sources: {
      mobile: `/images/optimized/${imageType}/${location.toLowerCase()}/${service}/mobile/${baseFilename}.webp`,
      tablet: `/images/optimized/${imageType}/${location.toLowerCase()}/${service}/tablet/${baseFilename}.webp`,
      desktop: `/images/optimized/${imageType}/${location.toLowerCase()}/${service}/desktop/${baseFilename}.webp`,
      hero: `/images/optimized/${imageType}/${location.toLowerCase()}/${service}/hero/${baseFilename}.webp`
    },
    
    // Thumbnail for lazy loading
    thumbnail: `/images/thumbnails/${imageType}/${location.toLowerCase()}/${baseFilename}-thumb.webp`,
    
    // Social media optimized
    social: `/images/social/${service}/${location.toLowerCase()}/${baseFilename}-og.jpg`
  };

  // Generate SEO-optimized alt text if not provided
  const seoAlt = alt || `${service.replace(/-/g, ' ')} in ${location} - Professional ${imageType} image showing Disaster Recovery Australia's 24/7 emergency services`;
  
  // Generate title if not provided
  const seoTitle = title || `${location} ${service.replace(/-/g, ' ')} | ${imageType.charAt(0).toUpperCase() + imageType.slice(1)} | Disaster Recovery Australia`;

  useEffect(() => {
    // Check which image path exists and use it
    const checkImagePath = async (path: string): Promise<boolean> => {
      try {
        const response = await fetch(path, { method: 'HEAD' });
        return response.ok;
      } catch {
        return false;
      }
    };

    const loadImage = async () => {
      // Try primary path first
      if (await checkImagePath(imagePaths.primary)) {
        setImageSrc(imagePaths.primary);
      } 
      // Try fallback JPG
      else if (await checkImagePath(imagePaths.fallbackJpg)) {
        setImageSrc(imagePaths.fallbackJpg);
      }
      // Try generated folder
      else if (await checkImagePath(imagePaths.fallbackGenerated)) {
        setImageSrc(imagePaths.fallbackGenerated);
      }
      // Use placeholder if no image found
      else {
        setImageSrc('/images/placeholder-3d.webp');
        setHasError(true);
      }
      setIsLoading(false);
    };

    loadImage();
  }, [service, location, imageType]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    setImageSrc('/images/placeholder-3d.webp');
    onError?.();
  };

  // Determine dimensions based on image type
  const getDimensions = () => {
    switch (imageType) {
      case 'hero':
        return { width: 1920, height: 1080 };
      case 'equipment':
      case 'process':
        return { width: 1200, height: 800 };
      case 'team':
        return { width: 1024, height: 768 };
      default:
        return { width: 1920, height: 1080 };
    }
  };

  const { width, height } = getDimensions();

  // Loading skeleton
  if (isLoading) {
    return (
      <div 
        className={`animate-pulse bg-gradient-to-br from-gray-200 to-gray-300 ${className}`}
        style={{ aspectRatio: `${width}/${height}` }}
        aria-label="Loading image..."
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Picture element for responsive images with multiple formats */}
      <picture>
        {/* AVIF format for modern browsers */}
        <source
          srcSet={`
            ${imagePaths.sources.mobile.replace('.webp', '.avif')} 768w,
            ${imagePaths.sources.tablet.replace('.webp', '.avif')} 1024w,
            ${imagePaths.sources.desktop.replace('.webp', '.avif')} 1920w,
            ${imagePaths.sources.hero.replace('.webp', '.avif')} 2560w
          `}
          type="image/avif"
          sizes={sizes}
        />
        
        {/* WebP format for good browser support */}
        <source
          srcSet={`
            ${imagePaths.sources.mobile} 768w,
            ${imagePaths.sources.tablet} 1024w,
            ${imagePaths.sources.desktop} 1920w,
            ${imagePaths.sources.hero} 2560w
          `}
          type="image/webp"
          sizes={sizes}
        />
        
        {/* JPEG fallback for older browsers */}
        <source
          srcSet={`
            ${imagePaths.sources.mobile.replace('.webp', '.jpg')} 768w,
            ${imagePaths.sources.tablet.replace('.webp', '.jpg')} 1024w,
            ${imagePaths.sources.desktop.replace('.webp', '.jpg')} 1920w,
            ${imagePaths.sources.hero.replace('.webp', '.jpg')} 2560w
          `}
          type="image/jpeg"
          sizes={sizes}
        />
        
        {/* Next.js Image component with optimization */}
        <Image
          src={imageSrc}
          alt={seoAlt}
          title={seoTitle}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
          className={`${hasError ? 'opacity-50' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          placeholder="blur"
          blurDataURL={imagePaths.thumbnail}
          sizes={sizes}
        />
      </picture>

      {/* Error overlay */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="text-white text-center p-4">
            <p className="text-sm">Image temporarily unavailable</p>
            <p className="text-xs mt-1">Showing placeholder</p>
          </div>
        </div>
      )}

      {/* SEO Schema.org metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            name: seoTitle,
            description: seoAlt,
            contentUrl: imageSrc,
            thumbnailUrl: imagePaths.thumbnail,
            creator: {
              '@type': 'Organization',
              name: 'Disaster Recovery Australia'
            },
            copyrightHolder: {
              '@type': 'Organization',
              name: 'National Recovery Partners'
            },
            license: 'https://disaster-recovery.vercel.app/terms',
            keywords: `${service.replace(/-/g, ' ')}, ${location}, disaster recovery, emergency services, Australia`
          })
        }}
      />
    </div>
  );
}

/**
 * Image Gallery Component for displaying multiple optimized images
 */
export function OptimizedImageGallery({
  images,
  className = ''
}: {
  images: Array<{
    service: string;
    location: string;
    imageType: 'hero' | 'equipment' | 'process' | 'team';
  }>;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {images.map((image, index) => (
        <OptimizedImage
          key={`${image.service}-${image.location}-${image.imageType}`}
          service={image.service}
          location={image.location}
          imageType={image.imageType}
          priority={index < 3} // Prioritize first 3 images
          className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ))}
    </div>
  );
}