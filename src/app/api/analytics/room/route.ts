/**
 * Room Analytics API
 *
 * Get room-specific analytics
 */

import { NextRequest, NextResponse } from 'next/server';
import { analyticsEngine } from '@/lib/analytics/analytics-engine';

/**
 * GET /api/analytics/room
 *
 * Get analytics for a specific room
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const roomId = searchParams.get('roomId');

    if (!roomId) {
      return NextResponse.json(
        { error: 'Missing required parameter: roomId' },
        { status: 400 }
      );
    }

    const analytics = analyticsEngine.getRoomAnalytics(roomId);

    return NextResponse.json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.error('Room analytics error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get room analytics',
      },
      { status: 500 }
    );
  }
}
