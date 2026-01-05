/**
 * Search Dominance Traffic API
 *
 * GET /api/search-dominance/traffic
 * Returns time-series organic traffic data
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Query parameters
    const timeframe = searchParams.get('timeframe') || '7d'; // 24h, 7d, 30d, 90d
    const location = searchParams.get('location') || undefined;
    const device = searchParams.get('device') || undefined;
    const landingPage = searchParams.get('landingPage') || undefined;

    // Calculate date range
    let startDate = new Date();
    switch (timeframe) {
      case '24h':
        startDate.setHours(startDate.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    const where: any = {
      timestamp: {
        gte: startDate,
      },
    };

    if (location) where.location = location;
    if (device) where.device = device;
    if (landingPage) where.landingPage = landingPage;

    // Get traffic records
    const records = await prisma.trafficRecord.findMany({
      where,
      orderBy: {
        timestamp: 'asc',
      },
    });

    // Group by day for better visualization
    const dailyData = records.reduce((acc: any, record) => {
      const date = record.timestamp.toISOString().split('T')[0];

      if (!acc[date]) {
        acc[date] = {
          date,
          organicSessions: 0,
          impressions: 0,
          clicks: 0,
          conversions: 0,
          ctr: 0,
          conversionRate: 0,
          count: 0,
        };
      }

      acc[date].organicSessions += record.organicSessions;
      acc[date].impressions += record.impressions;
      acc[date].clicks += record.clicks;
      acc[date].conversions += record.conversions;
      acc[date].ctr += record.ctr;
      acc[date].conversionRate += record.conversionRate;
      acc[date].count += 1;

      return acc;
    }, {});

    // Calculate averages and format data
    const timeseries = Object.values(dailyData).map((day: any) => ({
      date: day.date,
      organicSessions: day.organicSessions,
      impressions: day.impressions,
      clicks: day.clicks,
      conversions: day.conversions,
      ctr: day.count > 0 ? day.ctr / day.count : 0,
      conversionRate: day.count > 0 ? day.conversionRate / day.count : 0,
    }));

    // Calculate totals and growth
    const totals = records.reduce(
      (acc, record) => ({
        organicSessions: acc.organicSessions + record.organicSessions,
        impressions: acc.impressions + record.impressions,
        clicks: acc.clicks + record.clicks,
        conversions: acc.conversions + record.conversions,
      }),
      { organicSessions: 0, impressions: 0, clicks: 0, conversions: 0 }
    );

    // Calculate growth (compare first half vs second half of timeframe)
    const midpoint = Math.floor(timeseries.length / 2);
    const firstHalf = timeseries.slice(0, midpoint);
    const secondHalf = timeseries.slice(midpoint);

    const firstHalfAvg = firstHalf.length > 0
      ? firstHalf.reduce((sum, d) => sum + d.organicSessions, 0) / firstHalf.length
      : 0;

    const secondHalfAvg = secondHalf.length > 0
      ? secondHalf.reduce((sum, d) => sum + d.organicSessions, 0) / secondHalf.length
      : 0;

    const growth = firstHalfAvg > 0
      ? ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100
      : 0;

    return NextResponse.json({
      timeseries,
      totals,
      growth: {
        sessions: growth,
        trend: growth > 5 ? 'up' : growth < -5 ? 'down' : 'stable',
      },
      summary: {
        avgDailySessions: timeseries.length > 0
          ? totals.organicSessions / timeseries.length
          : 0,
        avgDailyImpressions: timeseries.length > 0
          ? totals.impressions / timeseries.length
          : 0,
        avgDailyConversions: timeseries.length > 0
          ? totals.conversions / timeseries.length
          : 0,
        overallCTR: totals.impressions > 0
          ? (totals.clicks / totals.impressions) * 100
          : 0,
        overallConversionRate: totals.organicSessions > 0
          ? (totals.conversions / totals.organicSessions) * 100
          : 0,
      },
    });
  } catch (error) {
    console.error('[API] Error fetching traffic data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch traffic data' },
      { status: 500 }
    );
  }
}
