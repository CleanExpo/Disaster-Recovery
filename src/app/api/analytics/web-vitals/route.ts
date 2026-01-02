/**
 * Web Vitals Analytics API
 *
 * Receives Core Web Vitals metrics from client and stores them
 * for performance monitoring and analysis
 */

import { NextRequest, NextResponse } from 'next/server'

// In-memory storage (replace with database in production)
const metricsStore: Array<{
  timestamp: Date
  name: string
  value: number
  id: string
  delta: number
  rating: string
  navigationType: string
  userAgent?: string
  url?: string
}> = []

// Maximum stored metrics (prevents memory issues)
const MAX_METRICS = 10000

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate metric data
    if (!body.name || typeof body.value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid metric data' },
        { status: 400 }
      )
    }

    // Store metric
    const metric = {
      timestamp: new Date(),
      name: body.name,
      value: body.value,
      id: body.id || '',
      delta: body.delta || 0,
      rating: body.rating || 'unknown',
      navigationType: body.navigationType || 'unknown',
      userAgent: request.headers.get('user-agent') || undefined,
      url: request.headers.get('referer') || undefined,
    }

    metricsStore.push(metric)

    // Trim old metrics if exceeds max
    if (metricsStore.length > MAX_METRICS) {
      metricsStore.splice(0, metricsStore.length - MAX_METRICS)
    }

    // In production, store in database
    // await prisma.webVitals.create({ data: metric })

    // Log critical performance issues
    if (body.rating === 'poor') {
      console.warn(`[Web Vitals] Poor ${body.name}:`, {
        value: body.value,
        url: metric.url,
      })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[Web Vitals API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to store metric' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const metricName = searchParams.get('metric')
    const limit = parseInt(searchParams.get('limit') || '100')
    const since = searchParams.get('since') // ISO date string

    let filtered = [...metricsStore]

    // Filter by metric name
    if (metricName) {
      filtered = filtered.filter((m) => m.name === metricName)
    }

    // Filter by time
    if (since) {
      const sinceDate = new Date(since)
      filtered = filtered.filter((m) => m.timestamp >= sinceDate)
    }

    // Limit results
    filtered = filtered.slice(-limit)

    // Calculate statistics
    const stats = calculateStats(filtered)

    return NextResponse.json({
      metrics: filtered,
      stats,
      count: filtered.length,
    })
  } catch (error) {
    console.error('[Web Vitals API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve metrics' },
      { status: 500 }
    )
  }
}

/**
 * Calculate statistics for metrics
 */
function calculateStats(
  metrics: Array<{ name: string; value: number; rating: string }>
) {
  if (metrics.length === 0) {
    return null
  }

  const groupedByName: Record<
    string,
    Array<{ value: number; rating: string }>
  > = {}

  metrics.forEach((metric) => {
    if (!groupedByName[metric.name]) {
      groupedByName[metric.name] = []
    }
    groupedByName[metric.name].push({
      value: metric.value,
      rating: metric.rating,
    })
  })

  const stats: Record<
    string,
    {
      avg: number
      min: number
      max: number
      p50: number
      p75: number
      p95: number
      good: number
      needsImprovement: number
      poor: number
    }
  > = {}

  Object.entries(groupedByName).forEach(([name, values]) => {
    const sorted = values.map((v) => v.value).sort((a, b) => a - b)

    stats[name] = {
      avg: sorted.reduce((a, b) => a + b, 0) / sorted.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p75: sorted[Math.floor(sorted.length * 0.75)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      good: values.filter((v) => v.rating === 'good').length,
      needsImprovement: values.filter((v) => v.rating === 'needs-improvement')
        .length,
      poor: values.filter((v) => v.rating === 'poor').length,
    }
  })

  return stats
}

export const runtime = 'edge'
