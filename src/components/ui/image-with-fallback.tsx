'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallback?: string;
}

export function ImageWithFallback({
  src,
  fallback = '/images/placeholder.jpg',
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallback);
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      onError={handleError}
    />
  );
}