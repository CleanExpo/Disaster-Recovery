import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { searchIndexing } from '@/lib/search/search-indexing';

/**
 * POST /api/search/manage
 * Manage search indices (rebuild, verify, warmup)
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Verify admin role in production

    const { action, params } = await req.json();

    switch (action) {
      case 'rebuild':
        {
          const result = await searchIndexing.rebuildAllIndices();
          return NextResponse.json(
            {
              action: 'rebuild',
              success: result.success,
              failed: result.failed,
              timestamp: new Date(),
            },
            { status: 200 }
          );
        }

      case 'verify':
        {
          const isIntact = await searchIndexing.verifyIndexIntegrity();
          return NextResponse.json(
            {
              action: 'verify',
              intact: isIntact,
              timestamp: new Date(),
            },
            { status: 200 }
          );
        }

      case 'warmup':
        {
          const limit = params?.limit || 100;
          const indexed = await searchIndexing.warmupIndices(limit);
          return NextResponse.json(
            {
              action: 'warmup',
              indexed,
              timestamp: new Date(),
            },
            { status: 200 }
          );
        }

      case 'clear':
        {
          searchIndexing.clearAllIndices();
          return NextResponse.json(
            {
              action: 'clear',
              message: 'All indices cleared',
              timestamp: new Date(),
            },
            { status: 200 }
          );
        }

      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Management error:', error);
    return NextResponse.json(
      { error: 'Management operation failed' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/search/manage
 * Get search management status
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const indexStats = searchIndexing.getIndexStats();
    const indexHealth = searchIndexing.getIndexHealth();

    return NextResponse.json(
      {
        status: 'ok',
        indices: indexStats,
        health: indexHealth,
        timestamp: new Date(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Management error:', error);
    return NextResponse.json(
      { error: 'Failed to get management status' },
      { status: 500 }
    );
  }
}
