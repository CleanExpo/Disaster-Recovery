'use client';

import { useEffect } from 'react';
import { clientLogger } from '@/lib/observability/client-logger';

// Layout-shift entries are not in lib.dom yet; narrow shape per spec.
interface LayoutShiftEntry extends PerformanceEntry {
  readonly hadRecentInput: boolean;
  readonly value: number;
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        // First Contentful Paint
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find((entry) => entry.name === 'first-contentful-paint');

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
              event_label: 'LCP',
            });
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
                event_label: 'FID',
              });
            }
          });
        });

        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        let clsEntries: LayoutShiftEntry[] = [];

        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as LayoutShiftEntry[]) {
            if (!entry.hadRecentInput) {
              const firstSessionEntry = clsEntries[0];
              const lastSessionEntry = clsEntries[clsEntries.length - 1];

              if (
                entry.startTime - (lastSessionEntry?.startTime || 0) < 1000 &&
                entry.startTime - (firstSessionEntry?.startTime || 0) < 5000
              ) {
                clsEntries.push(entry);
                clsValue += entry.value;
              } else {
                clsEntries = [entry];
                clsValue = entry.value;
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
        clientLogger.error(
          'Performance monitoring error:',
          { source: 'components/performance-monitor' },
          e,
        );
      }
    }
    return undefined;
  }, []);

  return null;
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
