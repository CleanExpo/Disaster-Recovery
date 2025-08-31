'use client';

import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        // First Contentful Paint
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        
        // Largest Contentful Paint
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          // Log to analytics
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              name: 'LCP',
              value: Math.round(lastEntry.startTime),
              event_label: 'LCP' });
          }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                name: 'FID',
                value: Math.round(entry.processingStart - entry.startTime),
                event_label: 'FID' });
            }
          });
        });
        
        fidObserver.observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift
        let clsValue = 0;
        let clsEntries: PerformanceEntry[] = [];
        
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              const firstSessionEntry = clsEntries[0];
              const lastSessionEntry = clsEntries[clsEntries.length - 1];
              
              if ((entry as any).startTime - (lastSessionEntry?.startTime || 0) < 1000 &&
                  (entry as any).startTime - (firstSessionEntry?.startTime || 0) < 5000) {
                clsEntries.push(entry);
                clsValue += (entry as any).value;
              } else {
                clsEntries = [entry];
                clsValue = (entry as any).value;
              }
            }
          }
        });
        
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        
        // Cleanup
        return () => {
          observer.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (e) {
        console.error('Performance monitoring error:', e);
      }
    }
  }, []);
  
  return null;
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}