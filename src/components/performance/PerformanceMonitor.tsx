/**
 * Performance Monitor Component
 *
 * Display real-time Core Web Vitals metrics in development
 */

'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Metric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
}

interface MetricDisplayProps {
  metric: Metric | null
  unit: string
  thresholds: { good: number; poor: number }
}

function MetricDisplay({ metric, unit, thresholds }: MetricDisplayProps) {
  if (!metric) {
    return (
      <div className="text-sm text-muted-foreground">
        Waiting for data...
      </div>
    )
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'bg-green-500'
      case 'needs-improvement':
        return 'bg-yellow-500'
      case 'poor':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const formatValue = (value: number) => {
    if (metric.name === 'CLS') {
      return value.toFixed(3)
    }
    return Math.round(value).toString()
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">{formatValue(metric.value)}</span>
        <Badge className={getRatingColor(metric.rating)}>
          {metric.rating}
        </Badge>
      </div>
      <div className="text-xs text-muted-foreground">
        Good: &lt; {thresholds.good}
        {unit} | Poor: &gt; {thresholds.poor}
        {unit}
      </div>
      {metric.delta > 0 && (
        <div className="text-xs text-muted-foreground">
          Delta: +{formatValue(metric.delta)}
          {unit}
        </div>
      )}
    </div>
  )
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<Record<string, Metric>>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
      return
    }

    setIsVisible(true)

    // Listen for web vitals
    const handleWebVitals = (event: CustomEvent<Metric>) => {
      setMetrics((prev) => ({
        ...prev,
        [event.detail.name]: event.detail,
      }))
    }

    window.addEventListener(
      'web-vitals' as any,
      handleWebVitals as EventListener
    )

    return () => {
      window.removeEventListener(
        'web-vitals' as any,
        handleWebVitals as EventListener
      )
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Core Web Vitals
            </CardTitle>
            <button
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* LCP */}
          <div>
            <div className="text-sm font-medium mb-2">
              Largest Contentful Paint (LCP)
            </div>
            <MetricDisplay
              metric={metrics['LCP'] || null}
              unit="ms"
              thresholds={{ good: 1500, poor: 2500 }}
            />
          </div>

          {/* FID */}
          <div>
            <div className="text-sm font-medium mb-2">
              First Input Delay (FID)
            </div>
            <MetricDisplay
              metric={metrics['FID'] || null}
              unit="ms"
              thresholds={{ good: 50, poor: 100 }}
            />
          </div>

          {/* CLS */}
          <div>
            <div className="text-sm font-medium mb-2">
              Cumulative Layout Shift (CLS)
            </div>
            <MetricDisplay
              metric={metrics['CLS'] || null}
              unit=""
              thresholds={{ good: 0.05, poor: 0.1 }}
            />
          </div>

          {/* FCP */}
          <div>
            <div className="text-sm font-medium mb-2">
              First Contentful Paint (FCP)
            </div>
            <MetricDisplay
              metric={metrics['FCP'] || null}
              unit="ms"
              thresholds={{ good: 1800, poor: 3000 }}
            />
          </div>

          {/* TTFB */}
          <div>
            <div className="text-sm font-medium mb-2">
              Time to First Byte (TTFB)
            </div>
            <MetricDisplay
              metric={metrics['TTFB'] || null}
              unit="ms"
              thresholds={{ good: 600, poor: 1000 }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitor() {
  if (typeof window === 'undefined') return

  // Dispatch custom events for web vitals
  const dispatchMetric = (metric: Metric) => {
    window.dispatchEvent(
      new CustomEvent('web-vitals', { detail: metric })
    )
  }

  // Import and initialize web vitals
  import('web-vitals').then(({ getCLS, getFCP, getFID, getLCP, getTTFB }) => {
    getCLS(dispatchMetric as any)
    getFCP(dispatchMetric as any)
    getFID(dispatchMetric as any)
    getLCP(dispatchMetric as any)
    getTTFB(dispatchMetric as any)
  })
}
