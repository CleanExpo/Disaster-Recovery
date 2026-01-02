/**
 * Search Analytics API
 *
 * Stores and retrieves search analytics data
 * Used for tracking search behavior and optimization
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { SearchAnalyticsEvent } from '@/lib/algolia/types';

/**
 * POST /api/analytics/search
 * Track a search analytics event
 */
export async function POST(request: NextRequest) {
  try {
    const event: SearchAnalyticsEvent = await request.json();

    // Validate required fields
    if (!event.query || !event.index) {
      return NextResponse.json(
        { error: 'Missing required fields: query, index' },
        { status: 400 }
      );
    }

    // Store in database (optional - you may want to use a time-series DB or analytics service)
    // For now, we'll just log it
    console.log('[Analytics] Search event:', event);

    // In production, you might want to:
    // 1. Store in a time-series database (InfluxDB, TimescaleDB)
    // 2. Send to analytics service (Google Analytics, Mixpanel)
    // 3. Store in Algolia Analytics (already done via Insights API)
    // 4. Store aggregated metrics in PostgreSQL

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Analytics] Error storing search event:', error);
    return NextResponse.json(
      { error: 'Failed to store analytics event' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analytics/search
 * Retrieve search analytics data
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const index = searchParams.get('index');

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required parameters: startDate, endDate' },
        { status: 400 }
      );
    }

    // In production, fetch from your analytics storage
    // For now, return mock data
    const analytics = {
      totalSearches: 12450,
      uniqueQueries: 3820,
      avgResultsPerSearch: 15.3,
      clickThroughRate: 0.42,
      conversionRate: 0.08,
      topQueries: [
        { query: 'water damage', count: 450, ctr: 0.52 },
        { query: 'fire restoration', count: 380, ctr: 0.48 },
        { query: 'mould removal', count: 320, ctr: 0.45 },
        { query: 'emergency restoration', count: 290, ctr: 0.51 },
        { query: 'flood cleanup', count: 250, ctr: 0.43 },
      ],
      topLocations: [
        { location: 'Sydney, NSW', searches: 3200 },
        { location: 'Melbourne, VIC', searches: 2800 },
        { location: 'Brisbane, QLD', searches: 2100 },
        { location: 'Perth, WA', searches: 1500 },
        { location: 'Adelaide, SA', searches: 1200 },
      ],
      searchesByDay: [
        { date: '2024-01-01', searches: 420 },
        { date: '2024-01-02', searches: 450 },
        { date: '2024-01-03', searches: 380 },
        { date: '2024-01-04', searches: 510 },
        { date: '2024-01-05', searches: 490 },
        { date: '2024-01-06', searches: 320 },
        { date: '2024-01-07', searches: 280 },
      ],
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('[Analytics] Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
