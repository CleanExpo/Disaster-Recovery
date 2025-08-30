'use client';

import React, { 
  lazy, 
  Suspense, 
  useMemo, 
  useCallback, 
  useRef, 
  useEffect, 
  useState 
} from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fps: 0,
    frameTime: 0,
    memoryUsage: 0,
    renderCount: 0
  });

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const renderCountRef = useRef(0);

  useEffect(() => {
    let animationId: number;
    
    const measurePerformance = () => {
      const now = performance.now();
      const deltaTime = now - lastTimeRef.current;
      
      frameCountRef.current++;
      renderCountRef.current++;
      
      // Update FPS every second
      if (deltaTime >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / deltaTime);
        const frameTime = deltaTime / frameCountRef.current;
        
        // Get memory usage if available
        const memoryUsage = (performance as any).memory 
          ? Math.round((performance as any).memory.usedJSHeapSize / 1048576)
          : 0;

        setMetrics({
          fps,
          frameTime: Math.round(frameTime * 100) / 100,
          memoryUsage,
          renderCount: renderCountRef.current
        });

        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return metrics;
}

// Lazy loading wrapper with fallback
interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export function LazyLoadComponent({ 
  children, 
  fallback = <div className="animate-pulse bg-gray-200 rounded-lg h-32" />, 
  threshold = 0.1,
  rootMargin = '100px'
}: LazyComponentProps) {
  const [ref, inView] = useInView({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  return (
    <div ref={ref}>
      {inView ? children : fallback}
    </div>
  );
}

// GPU-accelerated animation wrapper
interface GPUAcceleratedProps {
  children: React.ReactNode;
  enabled?: boolean;
  className?: string;
}

export function GPUAccelerated({ 
  children, 
  enabled = true, 
  className = '' 
}: GPUAcceleratedProps) {
  const style = enabled ? {
    transform: 'translateZ(0)',
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden' as const,
    perspective: 1000,
  } : {};

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

// Optimised animation component with reduced motion support
interface OptimizedAnimationProps {
  children: React.ReactNode;
  animate?: any;
  initial?: any;
  transition?: any;
  className?: string;
  respectReducedMotion?: boolean;
}

export function OptimizedAnimation({
  children,
  animate,
  initial,
  transition,
  className = '',
  respectReducedMotion = true
}: OptimizedAnimationProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (respectReducedMotion) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [respectReducedMotion]);

  // Simplified animation for reduced motion preference
  const optimizedAnimate = reducedMotion ? { opacity: 1 } : animate;
  const optimizedInitial = reducedMotion ? { opacity: 0 } : initial;
  const optimizedTransition = reducedMotion 
    ? { duration: 0.2, ease: 'linear' } 
    : { ...transition, ease: 'easeOut' };

  return (
    <GPUAccelerated enabled={!reducedMotion}>
      <motion.div
        className={className}
        initial={optimizedInitial}
        animate={optimizedAnimate}
        transition={optimizedTransition}
      >
        {children}
      </motion.div>
    </GPUAccelerated>
  );
}

// Debounced scroll handler
export function useOptimizedScroll(callback: (scrollY: number) => void, delay = 16) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(window.scrollY);
      }, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);
}

// Memoized component wrapper
export function MemoizedComponent<T extends Record<string, any>>({
  component: Component,
  props,
  deps = []
}: {
  component: React.ComponentType<T>;
  props: T;
  deps?: any[];
}) {
  return useMemo(() => <Component {...props} />, deps);
}

// Virtual list for large datasets
interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className = ''
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {items.slice(visibleStart, visibleEnd).map((item, index) => (
            <div
              key={visibleStart + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, visibleStart + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Image optimisation with lazy loading and WebP support
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75
}: OptimizedImageProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true
  });

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Generate WebP and fallback URLs
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const shouldLoad = priority || inView;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {shouldLoad && !error && (
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <motion.img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            loading={priority ? 'eager' : 'lazy'}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </picture>
      )}
      
      {/* Placeholder while loading */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-centre justify-centre">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
      
      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-centre justify-centre">
          <div className="text-gray-500 text-sm">Failed to load image</div>
        </div>
      )}
    </div>
  );
}

// Resource preloader
export function useResourcePreloader(resources: string[]) {
  const [loadedResources, setLoadedResources] = useState<Set<string>>(new Set());

  useEffect(() => {
    const preloadResource = (url: string) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      
      link.onload = () => {
        setLoadedResources(prev => new Set([...prev, url]));
      };
      
      document.head.appendChild(link);
    };

    resources.forEach(preloadResource);

    return () => {
      // Cleanup prefetch links
      resources.forEach(url => {
        const existingLink = document.querySelector(`link[href="${url}"]`);
        if (existingLink) {
          existingLink.remove();
        }
      });
    };
  }, [resources]);

  return {
    loadedResources,
    allLoaded: loadedResources.size === resources.length
  };
}

// Performance monitoring dashboard (development only)
export function PerformanceDashboard({ enabled = false }: { enabled?: boolean }) {
  const metrics = usePerformanceMonitor();

  if (!enabled || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-4 rounded-lg backdrop-blur-sm font-mono text-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-1">
        <div>FPS: <span className={metrics.fps < 50 ? 'text-red-400' : 'text-green-400'}>{metrics.fps}</span></div>
        <div>Frame Time: {metrics.frameTime}ms</div>
        <div>Memory: {metrics.memoryUsage}MB</div>
        <div>Renders: {metrics.renderCount}</div>
      </div>
    </motion.div>
  );
}

// Main performance optimisation provider
interface PerformanceProviderProps {
  children: React.ReactNode;
  enableGPUAcceleration?: boolean;
  enableLazyLoading?: boolean;
  showDashboard?: boolean;
}

export default function PerformanceOptimizer({
  children,
  enableGPUAcceleration = true,
  enableLazyLoading = true,
  showDashboard = false
}: PerformanceProviderProps) {
  // Global performance optimizations
  useEffect(() => {
    // Enable CSS containment where supported
    document.documentElement.style.contain = 'layout style paint';
    
    // Optimise font loading
    if ('fonts' in document) {
      (document as any).fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    }

    // Preconnect to external domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup
      document.documentElement.style.contain = '';
    };
  }, []);

  return (
    <>
      {enableGPUAcceleration ? (
        <GPUAccelerated>
          {children}
        </GPUAccelerated>
      ) : (
        children
      )}
      
      <PerformanceDashboard enabled={showDashboard} />
    </>
  );
}

// Exports
