'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ImageSEOAgent } from '@/lib/seo/image-seo-agent';
import type { ImageAsset } from '@/config/image-library';

interface SEOImageProps {
  image: ImageAsset;
  priority?: boolean;
  className?: string;
  sizes?: string;
  location?: string;
  serviceType?: string;
  onClick?: () => void;
  showCaption?: boolean;
  useStructuredData?: boolean;
}

/**
 * SEO-Optimised Image Component
 * Renders images with comprehensive SEO metadata and performance optimizations
 */
export const SEOImage: React.FC<SEOImageProps> = ({
  image,
  priority = false,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  location,
  serviceType,
  onClick,
  showCaption = true,
  useStructuredData = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [optimizedData, setOptimizedData] = useState<any>(null);

  useEffect(() => {
    // Generate SEO-optimised metadata
    const seoData = ImageSEOAgent.optimizeImage(image, {
      location,
      serviceType,
      pageTopic: serviceType
    });
    setOptimizedData(seoData);

    // Add structured data to page if enabled
    if (useStructuredData && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(seoData.schemaData);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [image, location, serviceType, useStructuredData]);

  if (!optimizedData) {
    return <div className="animate-pulse bg-neutral-200 rounded-lg" style={{ paddingBottom: '56.25%' }} />;
  }

  // Determine which image source to use based on browser support
  const imageSrc = optimizedData.formats.webp || optimizedData.formats.jpg || image.formats.jpg;
  
  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    const srcSetEntries = [];
    
    if (optimizedData.responsiveSizes.mobile) {
      srcSetEntries.push(`${optimizedData.responsiveSizes.mobile} 640w`);
    }
    if (optimizedData.responsiveSizes.tablet) {
      srcSetEntries.push(`${optimizedData.responsiveSizes.tablet} 1024w`);
    }
    if (optimizedData.responsiveSizes.desktop) {
      srcSetEntries.push(`${optimizedData.responsiveSizes.desktop} 1920w`);
    }
    
    return srcSetEntries.join(', ');
  };

  return (
    <figure 
      className={`seo-image-container relative ${className}`}
      itemScope 
      itemType="https://schema.org/ImageObject"
    >
      {/* Hidden metadata for SEO */}
      <meta itemProp="name" content={optimizedData.title} />
      <meta itemProp="caption" content={optimizedData.caption} />
      <meta itemProp="description" content={optimizedData.description} />
      <meta itemProp="keywords" content={optimizedData.primaryKeyword} />
      
      {/* Main image using Next.js Image for optimisation */}
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={imageSrc}
          alt={optimizedData.altText}
          title={optimizedData.title}
          width={optimizedData.dimensions.width}
          height={optimizedData.dimensions.height}
          sizes={sizes}
          priority={priority || optimizedData.priority === 'high'}
          loading={optimizedData.loadingStrategy}
          quality={85}
          className={`
            transition-all duration-300
            ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            ${onClick ? 'cursor-pointer hover:scale-105' : ''}
          `}
          onLoad={() => setIsLoaded(true)}
          onClick={onClick}
          placeholder="blur"
          blurDataURL={generateBlurDataURL()}
        />
        
        {/* Loading overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 animate-pulse" />
        )}
        
        {/* Category badge */}
        {optimizedData.priority === 'high' && (
          <div className="absolute top-2 left-2 z-10">
            <span className="badge badge-emergency">
              Emergency Response
            </span>
          </div>
        )}
        
        {/* Location badge if provided */}
        {location && (
          <div className="absolute top-2 right-2 z-10">
            <span className="badge badge-primary">
              {location}
            </span>
          </div>
        )}
      </div>
      
      {/* SEO-optimised caption */}
      {showCaption && (
        <figcaption 
          className="mt-3 text-sm text-neutral-600 leading-relaxed"
          itemProp="caption"
        >
          {optimizedData.caption}
          {location && (
            <span className="block mt-1 text-xs text-neutral-500">
              Servicing {location} and surrounding areas
            </span>
          )}
        </figcaption>
      )}
      
      {/* Keywords for SEO (hidden visually but readable by crawlers) */}
      <div className="sr-only">
        <h3>Keywords:</h3>
        <ul>
          <li>{optimizedData.primaryKeyword}</li>
          {optimizedData.secondaryKeywords.map((keyword: string, idx: number) => (
            <li key={idx}>{keyword}</li>
          ))}
        </ul>
        <p>Related services: {optimizedData.relatedContent.join(', ')}</p>
      </div>
    </figure>
  );
};

/**
 * Generate blur data URL for placeholder
 */
function generateBlurDataURL(): string {
  // Simple coloured blur based on category
  const canvas = document.createElement('canvas');
  canvas.width = 10;
  canvas.height = 10;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create gradient based on damage type
    const gradient = ctx.createLinearGradient(0, 0, 10, 10);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 10, 10);
  }
  
  return canvas.toDataURL();
}

/**
 * SEO Image Gallery Component
 */
interface SEOImageGalleryProps {
  images: ImageAsset[];
  location?: string;
  serviceType?: string;
  columns?: number;
  showCaptions?: boolean;
}

export const SEOImageGallery: React.FC<SEOImageGalleryProps> = ({
  images,
  location,
  serviceType,
  columns = 3,
  showCaptions = true
}) => {
  const [selectedImage, setSelectedImage] = useState<ImageAsset | null>(null);

  return (
    <>
      <div 
        className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`}
        itemScope
        itemType="https://schema.org/ImageGallery"
      >
        {images.map((image, index) => (
          <SEOImage
            key={image.id}
            image={image}
            priority={index < 3} // Prioritize first 3 images
            location={location}
            serviceType={serviceType}
            showCaption={showCaptions}
            onClick={() => setSelectedImage(image)}
            className="hover:shadow-xl transition-shadow duration-300"
          />
        ))}
      </div>
      
      {/* Lightbox modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <SEOImage
              image={selectedImage}
              priority={true}
              location={location}
              serviceType={serviceType}
              showCaption={true}
              useStructuredData={false}
              className="w-full"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

/**
 * Hero Image with SEO Optimisation
 */
interface SEOHeroImageProps {
  image: ImageAsset;
  title: string;
  subtitle?: string;
  location?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const SEOHeroImage: React.FC<SEOHeroImageProps> = ({
  image,
  title,
  subtitle,
  location,
  ctaText,
  ctaLink
}) => {
  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <SEOImage
        image={image}
        priority={true}
        location={location}
        showCaption={false}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
      
      {/* Hero content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
              {subtitle}
            </p>
          )}
          {location && (
            <p className="text-lg text-white/80 mb-8">
              Servicing {location} and surrounding areas
            </p>
          )}
          {ctaText && ctaLink && (
            <a
              href={ctaLink}
              className="btn btn-emergency btn-lg inline-block animate-pulse-emergency"
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};