'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes = '100vw',
  fill = false,
  quality = 85,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          quality={quality}
          sizes={sizes}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          className={cn(
            'duration-700 ease-in-out',
            isLoading ? 'scale-105 blur-lg' : 'scale-100 blur-0'
          )}
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          sizes={sizes}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          className={cn(
            'duration-700 ease-in-out',
            isLoading ? 'scale-105 blur-lg' : 'scale-100 blur-0'
          )}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  );
}