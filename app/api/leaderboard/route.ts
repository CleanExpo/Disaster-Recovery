import { NextRequest, NextResponse } from 'next/server';
import { getGlobalLeaderboard, getRegionalLeaderboard, type Region } from '@/lib/services/leaderboard.service';

export const dynamic = 'force-dynamic';

/**
 * GET /api/leaderboard
 *
 * Get contractor performance leaderboard
 * Query params:
 * - type: 'global' | 'regional'
 * - region: 'sydney-metro', 'melbourne-metro', etc. (required if type=regional)
 * - limit: number (default 100 for global, 10 for regional)
 *
 * Strategic decision: Dual leaderboards (global + regional)
 * Public visibility for top performers
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'global';
    const region = searchParams.get('region') as Region | null;
    const limit = parseInt(searchParams.get('limit') || (type === 'global' ? '100' : '10'));

    if (type === 'regional' && !region) {
      return NextResponse.json(
        { error: 'Region parameter required for regional leaderboard' },
        { status: 400 }
      );
    }

    const leaderboard =
      type === 'regional' && region
        ? await getRegionalLeaderboard(region, limit)
        : await getGlobalLeaderboard(limit);

    return NextResponse.json({
      success: true,
      type,
      region: region || null,
      leaderboard,
      count: leaderboard.length,
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
