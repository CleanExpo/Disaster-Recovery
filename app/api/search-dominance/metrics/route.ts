/**
 * Search Dominance Metrics API
 *
 * GET /api/search-dominance/metrics
 * Returns current dominance score and breakdown
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET(request: Request) {
  try {
    // Get query parameters for date filtering
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    // Get latest dominance metrics
    const latest = await prisma.dominanceMetrics.findFirst({
      orderBy: {
        date: 'desc',
      },
    });

    // Get historical data for trend
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const historical = await prisma.dominanceMetrics.findMany({
      where: {
        date: {
          gte: startDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Calculate trend (comparing current to average of last 7 days)
    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (historical.length >= 8 && latest) {
      const last7Days = historical.slice(-8, -1); // Exclude latest
      const avgScore = last7Days.reduce((sum, m) => sum + m.dominanceScore, 0) / 7;
      const diff = latest.dominanceScore - avgScore;

      if (diff > 2) trend = 'up';
      else if (diff < -2) trend = 'down';
    }

    return NextResponse.json({
      current: latest
        ? {
            dominanceScore: latest.dominanceScore,
            position1Count: latest.position1Count,
            position1to3Count: latest.position1to3Count,
            position1to10Count: latest.position1to10Count,
            totalKeywords: latest.totalKeywords,
            aiOverviewCitations: latest.aiOverviewCitations,
            aiOverviewRate: latest.aiOverviewRate,
            dailySessions: latest.dailySessions,
            dailyImpressions: latest.dailyImpressions,
            dailyConversions: latest.dailyConversions,
            activeLocations: latest.activeLocations,
            totalCoverage: latest.totalCoverage,
            competitorsTracked: latest.competitorsTracked,
            competitiveThreat: latest.competitiveThreat,
            date: latest.date,
          }
        : null,
      trend,
      historical: historical.map((m) => ({
        date: m.date,
        dominanceScore: m.dominanceScore,
        position1Count: m.position1Count,
        aiOverviewRate: m.aiOverviewRate,
        dailySessions: m.dailySessions,
      })),
      summary: {
        avgScore: historical.length > 0
          ? historical.reduce((sum, m) => sum + m.dominanceScore, 0) / historical.length
          : 0,
        maxScore: historical.length > 0
          ? Math.max(...historical.map((m) => m.dominanceScore))
          : 0,
        minScore: historical.length > 0
          ? Math.min(...historical.map((m) => m.dominanceScore))
          : 0,
      },
    });
  } catch (error) {
    console.error('[API] Error fetching dominance metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dominance metrics' },
      { status: 500 }
    );
  }
}
