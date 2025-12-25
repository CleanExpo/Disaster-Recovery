import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { searchFilters, type SearchFilters } from '@/lib/search/search-filters';

/**
 * POST /api/search/filters
 * Get available filter options for search results
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { query, currentFilters } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const facets = await searchFilters.getFacets(query, currentFilters);

    return NextResponse.json(
      {
        facets,
        filterStats: await searchFilters.getFilterStats(),
        dateRangeOptions: searchFilters.getDateRangeOptions(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Filter error:', error);
    return NextResponse.json(
      { error: 'Failed to get filters' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/search/filters
 * Get available filter options (users, rooms, etc.)
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type') || 'all';
    const query = searchParams.get('q');

    const result: any = {
      dateRangeOptions: searchFilters.getDateRangeOptions(),
      filterStats: await searchFilters.getFilterStats(),
    };

    if (type === 'all' || type === 'users') {
      result.users = await searchFilters.getFilterUsers(query || undefined);
    }

    if (type === 'all' || type === 'rooms') {
      result.rooms = await searchFilters.getFilterRooms(query || undefined);
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Filter error:', error);
    return NextResponse.json(
      { error: 'Failed to get filters' },
      { status: 500 }
    );
  }
}
