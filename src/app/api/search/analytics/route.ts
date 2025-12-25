import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { fullTextSearch } from '@/lib/search/full-text-search';
import { searchIndexing } from '@/lib/search/search-indexing';

/**
 * GET /api/search/analytics
 * Get search analytics and statistics
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    // In production, verify user role

    const searchStats = fullTextSearch.getSearchStats();
    const indexStats = searchIndexing.getIndexStats();
    const indexHealth = searchIndexing.getIndexHealth();

    return NextResponse.json(
      {
        searchMetrics: {
          totalSearches: searchStats.totalSearches,
          popularQueries: searchStats.popularQueries,
          averageResponseTime: searchStats.averageResponseTime,
          lastSearch: searchStats.lastSearch,
        },
        indexing: {
          stats: indexStats,
          health: indexHealth,
        },
        timestamp: new Date(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to get analytics' },
      { status: 500 }
    );
  }
}
