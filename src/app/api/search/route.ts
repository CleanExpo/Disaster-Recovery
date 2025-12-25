import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { fullTextSearch, type SearchOptions } from '@/lib/search/full-text-search';

/**
 * POST /api/search
 * Full-text search across messages, users, and rooms
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { query, type, limit, offset, filters, sortBy } = await req.json();

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    if (query.length > 500) {
      return NextResponse.json(
        { error: 'Query too long (max 500 characters)' },
        { status: 400 }
      );
    }

    const options: SearchOptions = {
      query,
      type: type || 'all',
      limit: Math.min(limit || 20, 100), // Max 100 results
      offset: offset || 0,
      filters,
      sortBy: sortBy || 'relevance',
    };

    const startTime = Date.now();
    const results = await fullTextSearch.search(options);
    const responseTime = Date.now() - startTime;

    // Track search for analytics
    fullTextSearch.trackSearch({
      query,
      results: results.length,
      responseTime,
      timestamp: new Date(),
      userId: session.user.id,
    });

    return NextResponse.json(
      {
        results,
        total: results.length,
        query,
        responseTime,
        timestamp: new Date(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/search
 * Get search suggestions/autocomplete
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter required' },
        { status: 400 }
      );
    }

    const suggestions = await fullTextSearch.getSuggestions(query, limit);

    return NextResponse.json(
      {
        suggestions,
        query,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Suggestions error:', error);
    return NextResponse.json(
      { error: 'Failed to get suggestions' },
      { status: 500 }
    );
  }
}
