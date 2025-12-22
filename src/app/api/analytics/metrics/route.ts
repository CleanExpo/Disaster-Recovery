import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';
import { RealtimeAnalyticsService } from '@/lib/analytics/realtime-analytics';

/**
 * GET /api/analytics/metrics
 *
 * Get real-time system metrics
 * Query params:
 * - timeRange: 'realtime' | '1h' | '24h'
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Allow public access to metrics endpoint (can be restricted)
    // For now, we'll allow all authenticated users
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const timeRange = (searchParams.get('timeRange') || 'realtime') as
      | 'realtime'
      | '1h'
      | '24h';

    // Get system metrics
    const metrics = await RealtimeAnalyticsService.getSystemMetrics();

    // Add time range info
    const response = {
      ...metrics,
      timeRange,
      _links: {
        self: '/api/analytics/metrics',
        topUsers: '/api/analytics/top-users',
        topBookings: '/api/analytics/top-bookings',
        roomStats: '/api/analytics/room-stats',
        health: '/api/health',
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to get metrics:', error);
    return NextResponse.json(
      { error: 'Failed to get metrics' },
      { status: 500 }
    );
  }
}
