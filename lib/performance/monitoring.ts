/**
 * Performance Monitoring Utility
 * NRP Disaster Recovery Platform
 */

// Core Web Vitals tracking
export const reportWebVitals = (metric: any) => {
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }

  // Send to monitoring service
  sendToMonitoring(metric);
};

// Send metrics to monitoring service
function sendToMonitoring(metric: any) {
  const endpoint = '/api/monitoring/metrics';
  
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      metric: metric.name,
      value: metric.value,
      id: metric.id,
      timestamp: new Date().toISOString(),
    }),
  }).catch(err => console.error('Failed to send metrics:', err));
}

// Performance Observer for custom metrics
export class PerformanceMonitor {
  private observer: PerformanceObserver | null = null;
  private metrics: Map<string, number[]> = new Map();

  constructor() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.initializeObserver();
    }
  }

  private initializeObserver() {
    this.observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.recordMetric(entry.name, entry.duration);
      }
    });

    this.observer.observe({ entryTypes: ['measure', 'navigation'] });
  }

  // Record custom metric
  recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // Keep only last 100 values
    if (values.length > 100) {
      values.shift();
    }
  }

  // Get metric statistics
  getMetricStats(name: string) {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return null;

    const sorted = [...values].sort((a, b) => a - b);
    
    return {
      min: sorted[0],
      max: sorted[sorted.length - 1],
      mean: values.reduce((a, b) => a + b, 0) / values.length,
      median: sorted[Math.floor(sorted.length / 2)],
      p75: sorted[Math.floor(sorted.length * 0.75)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
    };
  }

  // Mark performance timing
  mark(name: string) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name);
    }
  }

  // Measure between marks
  measure(name: string, startMark: string, endMark: string) {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        window.performance.measure(name, startMark, endMark);
      } catch (e) {
        console.error('Performance measure failed:', e);
      }
    }
  }

  // Clear marks and measures
  clear() {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.clearMarks();
      window.performance.clearMeasures();
    }
    this.metrics.clear();
  }

  // Get all metrics
  getAllMetrics() {
    const result: Record<string, any> = {};
    
    this.metrics.forEach((values, name) => {
      result[name] = this.getMetricStats(name);
    });
    
    return result;
  }
}

// Resource timing analysis
export function analyzeResourceTiming() {
  if (typeof window === 'undefined' || !window.performance) return null;

  const resources = window.performance.getEntriesByType('resource');
  
  const analysis = {
    total: resources.length,
    byType: {} as Record<string, number>,
    slowest: [] as any[],
    totalSize: 0,
    totalDuration: 0,
    cached: 0,
  };

  resources.forEach(resource => {
    const r = resource as PerformanceResourceTiming;
    
    // Count by type
    const type = r.initiatorType || 'unknown';
    analysis.byType[type] = (analysis.byType[type] || 0) + 1;
    
    // Track duration
    analysis.totalDuration += r.duration;
    
    // Check if cached
    if (r.transferSize === 0 && r.decodedBodySize > 0) {
      analysis.cached++;
    }
    
    // Track size
    if (r.transferSize) {
      analysis.totalSize += r.transferSize;
    }
  });

  // Find slowest resources
  analysis.slowest = resources
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 10)
    .map(r => ({
      name: r.name,
      duration: Math.round(r.duration),
      type: (r as PerformanceResourceTiming).initiatorType,
    }));

  return analysis;
}

// Memory usage monitoring
export function getMemoryUsage() {
  if (typeof window === 'undefined') return null;
  
  // @ts-ignore
  if (!window.performance || !window.performance.memory) return null;
  
  // @ts-ignore
  const memory = window.performance.memory;
  
  return {
    usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576), // MB
    totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576), // MB
    limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
    usage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100), // %
  };
}

// Connection monitoring
export function getConnectionInfo() {
  if (typeof window === 'undefined' || !navigator) return null;
  
  // @ts-ignore
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (!connection) return null;
  
  return {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData,
  };
}

// Lazy loading helper
export function lazyLoadImages() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src!;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Request idle callback polyfill
export const requestIdleCallback =
  typeof window !== 'undefined'
    ? window.requestIdleCallback ||
      ((cb: IdleRequestCallback) => {
        const start = Date.now();
        return setTimeout(() => {
          cb({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
          } as IdleDeadline);
        }, 1);
      })
    : (cb: any) => setTimeout(cb, 1);

// Prefetch critical resources
export function prefetchCriticalResources(urls: string[]) {
  if (typeof window === 'undefined') return;

  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
}

// Service Worker registration
export async function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  
  if (process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
}

// Export singleton
let performanceMonitor: PerformanceMonitor | null = null;

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!performanceMonitor && typeof window !== 'undefined') {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor!;
}