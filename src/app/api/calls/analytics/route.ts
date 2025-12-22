/**
 * Call Analytics API
 *
 * Retrieve call statistics, metrics, and historical data
 */

import { NextRequest, NextResponse } from 'next/server';
import { callAnalytics } from '@/lib/calling/call-analytics';

/**
 * GET /api/calls/analytics
 *
 * Get call analytics for user
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const type = searchParams.get('type') || 'summary'; // summary | daily | quality | export
    const days = parseInt(searchParams.get('days') || '30', 10);
    const format = (searchParams.get('format') as 'json' | 'csv') || 'json';

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case 'summary': {
        // Get overall analytics summary
        result = callAnalytics.getAnalyticsSummary(userId, days);
        return NextResponse.json({
          success: true,
          type: 'summary',
          data: result,
        });
      }

      case 'daily': {
        // Get daily statistics for date range
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const dailyStats = callAnalytics.getDailyStatsRange(startDate, endDate);

        return NextResponse.json({
          success: true,
          type: 'daily',
          data: dailyStats,
          dateRange: {
            start: startDate.toISOString().split('T')[0],
            end: endDate.toISOString().split('T')[0],
          },
        });
      }

      case 'quality': {
        // Get call quality metrics for all user calls
        const userStats = callAnalytics.getUserStats(userId);
        const summary = callAnalytics.getAnalyticsSummary(userId, days);

        return NextResponse.json({
          success: true,
          type: 'quality',
          data: {
            overallScore: summary.qualityScore,
            userStats,
            averageMetrics: {
              audioQuality: userStats?.callQualityAverage || 'medium',
              totalCalls: userStats?.totalCalls || 0,
              videoCallCount: userStats?.videoCallCount || 0,
              voiceCallCount: userStats?.voiceCallCount || 0,
            },
          },
        });
      }

      case 'export': {
        // Export metrics in specified format
        const exported = callAnalytics.exportMetrics(userId, format);

        const headers = {
          'Content-Type': format === 'csv' ? 'text/csv' : 'application/json',
          'Content-Disposition': `attachment; filename="call-analytics-${userId}.${format === 'csv' ? 'csv' : 'json'}"`,
        };

        return new NextResponse(exported, { headers, status: 200 });
      }

      default: {
        return NextResponse.json(
          { error: `Unknown analytics type: ${type}` },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error('Analytics error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get analytics',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/calls/analytics
 *
 * Record call metrics
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { callId, userId, participantId, callType, direction, status, metrics } = body;

    if (!callId || !userId || !participantId) {
      return NextResponse.json(
        { error: 'callId, userId, and participantId are required' },
        { status: 400 }
      );
    }

    // Record metrics
    callAnalytics.recordCallMetrics({
      callId,
      userId,
      participantId,
      callType: callType || 'voice',
      direction: direction || 'outgoing',
      startTime: new Date(body.startTime || Date.now()),
      endTime: new Date(body.endTime || Date.now()),
      duration: body.duration || 0,
      status: status || 'completed',
      audioQuality: metrics?.audioQuality || 'medium',
      videoQuality: metrics?.videoQuality,
      averageBitrate: metrics?.averageBitrate || 0,
      packetLoss: metrics?.packetLoss || 0,
      latency: metrics?.latency || 0,
      jitter: metrics?.jitter || 0,
      bandwidth: {
        incoming: metrics?.bandwidth?.incoming || 0,
        outgoing: metrics?.bandwidth?.outgoing || 0,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Metrics recorded successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Analytics recording error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to record metrics',
      },
      { status: 500 }
    );
  }
}
