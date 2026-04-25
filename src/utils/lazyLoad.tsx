import dynamic from 'next/dynamic';
import { ComponentType, ReactElement } from 'react';
import { Spinner } from '@/components/ui/Spinner';

/** @deprecated Use Spinner from '@/components/ui/Spinner' directly. */
export const LoadingSpinner = Spinner;

// Loading component with skeleton for full sections
export const LoadingSection = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);

// Utility function for lazy loading components with loading state
export function lazyLoadComponent<P = {}>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  loadingComponent: ReactElement = <Spinner />
) {
  return dynamic(importFunc, {
    loading: () => loadingComponent,
    ssr: true, // Enable SSR by default for SEO
  });
}

// Utility for client-only components (no SSR)
export function clientOnly<P = {}>(
  importFunc: () => Promise<{ default: ComponentType<P> }>
) {
  return dynamic(importFunc, {
    loading: () => <Spinner />,
    ssr: false,
  });
}

// Preload component on hover/focus for better UX
export const preloadComponent = (
  importFunc: () => Promise<{ default: ComponentType<any> }>
) => {
  if (typeof window !== 'undefined') {
    importFunc();
  }
};