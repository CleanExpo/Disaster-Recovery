/**
 * Web Vitals Monitoring
 *
 * Tracks Core Web Vitals metrics and sends to analytics
 * - LCP (Largest Contentful Paint) - Target: < 1.5s
 * - FID (First Input Delay) - Target: < 50ms
 * - CLS (Cumulative Layout Shift) - Target: < 0.05
 * - FCP (First Contentful Paint) - Target: < 1.8s
 * - TTFB (Time to First Byte) - Target: < 600ms
 */

import { getCLS, getFCP, getFID, getLCP, getTTFB, Metric } from 'web-vitals'

type AnalyticsEvent = {
  name: string
  value: number
  id: string
  delta: number
  rating: 'good' | 'needs-improvement' | 'poor'
  navigationType: string
}

/**
 * Send metric to analytics endpoint
 */
function sendToAnalytics(metric: Metric) {
  const body: AnalyticsEvent = {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    delta: metric.delta,
    rating: metric.rating,
    navigationType: metric.navigationType,
  }

  // Send to Vercel Analytics
  if (typeof window !== 'undefined' && (window as any).va) {
    ;(window as any).va('event', {
      name: 'Web Vitals',
      data: body,
    })
  }

  // Send to custom analytics endpoint
  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(body)], { type: 'application/json' })
    navigator.sendBeacon('/api/analytics/web-vitals', blob)
  } else {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch((error) => {
      console.error('Failed to send web vitals:', error)
    })
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    })
  }
}

/**
 * Initialize Web Vitals monitoring
 * Call this in _app.tsx or layout.tsx
 */
export function initWebVitals() {
  if (typeof window === 'undefined') return

  try {
    getCLS(sendToAnalytics)
    getFCP(sendToAnalytics)
    getFID(sendToAnalytics)
    getLCP(sendToAnalytics)
    getTTFB(sendToAnalytics)
  } catch (error) {
    console.error('Failed to initialize web vitals:', error)
  }
}

/**
 * Get thresholds for each metric
 */
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 1500, poor: 2500 }, // ms
  FID: { good: 50, poor: 100 }, // ms
  CLS: { good: 0.05, poor: 0.1 }, // score
  FCP: { good: 1800, poor: 3000 }, // ms
  TTFB: { good: 600, poor: 1000 }, // ms
} as const

/**
 * Check if a metric value is good, needs improvement, or poor
 */
export function getRating(
  metricName: keyof typeof WEB_VITALS_THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = WEB_VITALS_THRESHOLDS[metricName]
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

/**
 * Performance observer for custom metrics
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private observers: PerformanceObserver[] = []

  private constructor() {
    this.initObservers()
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  private initObservers() {
    if (typeof window === 'undefined') return

    try {
      // Observe long tasks (> 50ms)
      if ('PerformanceObserver' in window) {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn('[Performance] Long task detected:', {
                duration: entry.duration,
                startTime: entry.startTime,
                name: entry.name,
              })

              // Send to analytics
              if (typeof window !== 'undefined' && (window as any).va) {
                ;(window as any).va('event', {
                  name: 'Long Task',
                  data: {
                    duration: entry.duration,
                    startTime: entry.startTime,
                  },
                })
              }
            }
          }
        })

        try {
          longTaskObserver.observe({ entryTypes: ['longtask'] })
          this.observers.push(longTaskObserver)
        } catch (e) {
          // longtask not supported
        }

        // Observe layout shifts
        const layoutShiftObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if ((entry as any).hadRecentInput) continue

            const value = (entry as any).value
            if (value > 0.01) {
              console.warn('[Performance] Layout shift detected:', {
                value,
                startTime: entry.startTime,
              })
            }
          }
        })

        try {
          layoutShiftObserver.observe({ entryTypes: ['layout-shift'] })
          this.observers.push(layoutShiftObserver)
        } catch (e) {
          // layout-shift not supported
        }
      }
    } catch (error) {
      console.error('Failed to initialize performance observers:', error)
    }
  }

  /**
   * Measure custom performance metric
   */
  measure(name: string, startMark?: string, endMark?: string) {
    if (typeof window === 'undefined') return

    try {
      if (startMark && endMark) {
        performance.measure(name, startMark, endMark)
      } else if (startMark) {
        performance.measure(name, startMark)
      } else {
        performance.measure(name)
      }

      const measure = performance.getEntriesByName(name, 'measure')[0]
      if (measure) {
        console.log(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`)

        // Send to analytics
        if (typeof window !== 'undefined' && (window as any).va) {
          ;(window as any).va('event', {
            name: 'Custom Metric',
            data: {
              metric: name,
              duration: measure.duration,
            },
          })
        }
      }
    } catch (error) {
      console.error(`Failed to measure ${name}:`, error)
    }
  }

  /**
   * Mark a performance point
   */
  mark(name: string) {
    if (typeof window === 'undefined') return

    try {
      performance.mark(name)
    } catch (error) {
      console.error(`Failed to mark ${name}:`, error)
    }
  }

  /**
   * Clear all performance marks and measures
   */
  clear() {
    if (typeof window === 'undefined') return

    try {
      performance.clearMarks()
      performance.clearMeasures()
    } catch (error) {
      console.error('Failed to clear performance data:', error)
    }
  }

  /**
   * Disconnect all observers
   */
  disconnect() {
    this.observers.forEach((observer) => observer.disconnect())
    this.observers = []
  }
}

/**
 * Hook for measuring component render time
 */
export function useMeasureRender(componentName: string) {
  if (typeof window === 'undefined') return

  const monitor = PerformanceMonitor.getInstance()

  React.useEffect(() => {
    monitor.mark(`${componentName}-render-start`)

    return () => {
      monitor.mark(`${componentName}-render-end`)
      monitor.measure(
        `${componentName}-render`,
        `${componentName}-render-start`,
        `${componentName}-render-end`
      )
    }
  }, [componentName, monitor])
}

/**
 * Measure async operation performance
 */
export async function measureAsync<T>(
  name: string,
  operation: () => Promise<T>
): Promise<T> {
  const monitor = PerformanceMonitor.getInstance()
  const startMark = `${name}-start`
  const endMark = `${name}-end`

  monitor.mark(startMark)

  try {
    const result = await operation()
    monitor.mark(endMark)
    monitor.measure(name, startMark, endMark)
    return result
  } catch (error) {
    monitor.mark(endMark)
    monitor.measure(name, startMark, endMark)
    throw error
  }
}

// Import React for hooks
import React from 'react'
