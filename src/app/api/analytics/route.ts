/**
 * Analytics Metrics API
 *
 * Get real-time metrics and analytics data
 */

import { NextRequest, NextResponse } from 'next/server';
import { analyticsEngine } from '@/lib/analytics/analytics-engine';

/**
 * GET /api/analytics
 *
 * Get current analytics metrics
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'summary'; // summary | detailed

    const metrics = analyticsEngine.getMetrics();

    if (type === 'summary') {
      const peakHour = findPeakHour(metrics.peakHours);
      return NextResponse.json({
        success: true,
        metrics: {
          totalEvents: metrics.totalEvents,
          activeUsers: metrics.activeUsers,
          eventsByType: metrics.eventsByType,
          peakHour: peakHour.hour,
          peakHourTraffic: peakHour.traffic,
        },
      });
    }

    return NextResponse.json({
      success: true,
      metrics,
    });
  } catch (error) {
    console.error('Analytics metrics error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get metrics',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/analytics
 *
 * Track an analytics event
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, userId, roomId, data, metadata } = body;

    if (!type || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: type, userId' },
        { status: 400 }
      );
    }

    const event = analyticsEngine.trackEvent(
      type,
      userId,
      data,
      {
        ...metadata,
        ipAddress: request.ip,
        userAgent: request.headers.get('user-agent') || undefined
      }
    );

    return NextResponse.json({
      success: true,
      event,
    });
  } catch (error) {
    console.error('Track event error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to track event',
      },
      { status: 500 }
    );
  }
}

function findPeakHour(peakHours: Record<number, number>): { hour: number; traffic: number } {
  let peakHour = 0;
  let peakTraffic = 0;

  Object.entries(peakHours).forEach(([hour, traffic]) => {
    if (traffic > peakTraffic) {
      peakHour = parseInt(hour);
      peakTraffic = traffic;
    }
  });

  return { hour: peakHour, traffic: peakTraffic };
}
