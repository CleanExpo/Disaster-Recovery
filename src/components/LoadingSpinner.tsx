'use client';

import { useEffect, useState } from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullScreen?: boolean;
  delay?: number; // Delay before showing spinner (prevents flash for quick operations)
}

export default function LoadingSpinner({ 
  size = 'medium', 
  text = 'Loading...', 
  fullScreen = false,
  delay = 200 
}: LoadingSpinnerProps) {
  const [show, setShow] = useState(delay === 0);
  
  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [delay]);
  
  if (!show) return null;
  
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };
  
  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin`}>
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-pulse"></div>
        </div>
      </div>
      {text && (
        <p className={`mt-4 text-gray-700 ${size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'}`}>
          {text}
        </p>
      )}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }
  
  return spinner;
}

// Loading skeleton for content areas
export function LoadingSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded mb-2"></div>
      ))}
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

// Loading button state
export function LoadingButton({ 
  loading, 
  children, 
  loadingText = 'Processing...',
  ...props 
}: { 
  loading: boolean; 
  children: React.ReactNode; 
  loadingText?: string;
  [key: string]: any;
}) {
  return (
    <button 
      disabled={loading} 
      {...props}
      className={`${props.className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <LoadingSpinner size="small" text="" />
          <span className="ml-2">{loadingText}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}