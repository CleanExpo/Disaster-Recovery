/**
 * User Analytics API
 *
 * Get user-specific analytics
 */

import { NextRequest, NextResponse } from 'next/server';
import { analyticsEngine } from '@/lib/analytics/analytics-engine';

/**
 * GET /api/analytics/user
 *
 * Get analytics for a specific user
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required parameter: userId' },
        { status: 400 }
      );
    }

    const analytics = analyticsEngine.getUserAnalytics(userId);

    return NextResponse.json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.error('User analytics error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get user analytics',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/analytics/user
 *
 * Track user session
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, action } = body; // action: 'login' | 'logout'

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, action' },
        { status: 400 }
      );
    }

    analyticsEngine.trackSession(userId, action);

    return NextResponse.json({
      success: true,
      message: `User session ${action} tracked`,
    });
  } catch (error) {
    console.error('Track session error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to track session',
      },
      { status: 500 }
    );
  }
}
