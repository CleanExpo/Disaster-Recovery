'use client';

import React from 'react';

export const ServiceCardSkeleton = () => (
  <div className="bg-white rounded-xl p-6 shadow-lg">
    <div className="skeleton h-8 w-24 rounded-full mb-3" />
    <div className="skeleton h-10 w-10 rounded-full mx-auto mb-4" />
    <div className="skeleton h-6 w-32 mx-auto mb-2" />
    <div className="skeleton h-4 w-full mb-3" />
    <div className="skeleton h-4 w-20" />
  </div>
);

export const HeroSkeleton = () => (
  <div className="py-20">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="skeleton h-16 w-3/4 mx-auto mb-4" />
        <div className="skeleton h-16 w-1/2 mx-auto mb-6" />
        <div className="skeleton h-6 w-2/3 mx-auto mb-8" />
        <div className="flex gap-4 justify-center">
          <div className="skeleton h-14 w-40 rounded-lg" />
          <div className="skeleton h-14 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

export const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className={`spinner ${sizeClasses[size]}`} />
    </div>
  );
};

export const PageLoader = () => (
  <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-[9999] flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-lg font-medium gradient-text">Loading...</p>
      <p className="mt-2 text-sm text-gray-500">Preparing your experience</p>
    </div>
  </div>
);

export const LoadingDots = () => (
  <span className="inline-flex gap-1">
    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
  </span>
);