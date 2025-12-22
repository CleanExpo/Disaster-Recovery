import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';
import { RealtimeAnalyticsService } from '@/lib/analytics/realtime-analytics';

/**
 * GET /api/analytics/summary
 *
 * Get comprehensive analytics summary including metrics, top users,
 * top bookings, room stats, and health status
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get analytics summary
    const summary = await RealtimeAnalyticsService.getAnalyticsSummary();

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Failed to get analytics summary:', error);
    return NextResponse.json(
      { error: 'Failed to get analytics summary' },
      { status: 500 }
    );
  }
}
