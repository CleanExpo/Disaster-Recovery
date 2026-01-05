/**
 * Search Dominance Algorithm Updates API
 *
 * GET /api/search-dominance/algorithm
 * Returns algorithm update timeline and impact analysis
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Query parameters
    const days = parseInt(searchParams.get('days') || '90');
    const status = searchParams.get('status') || undefined; // DETECTED, CONFIRMED, RESOLVED
    const minImpact = parseInt(searchParams.get('minImpact') || '0');
    const limit = parseInt(searchParams.get('limit') || '50');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const where: any = {
      detectedAt: {
        gte: startDate,
      },
      impactScore: {
        gte: minImpact,
      },
    };

    if (status) where.status = status;

    // Get algorithm updates
    const updates = await prisma.algorithmUpdate.findMany({
      where,
      orderBy: {
        detectedAt: 'desc',
      },
      take: limit,
    });

    // Calculate statistics
    const stats = {
      total: updates.length,
      byStatus: {
        DETECTED: updates.filter((u) => u.status === 'DETECTED').length,
        CONFIRMED: updates.filter((u) => u.status === 'CONFIRMED').length,
        RESOLVED: updates.filter((u) => u.status === 'RESOLVED').length,
      },
      byType: await prisma.algorithmUpdate.groupBy({
        by: ['type'],
        where,
        _count: true,
        orderBy: {
          _count: {
            type: 'desc',
          },
        },
      }),
      avgImpact: updates.length > 0
        ? updates.reduce((sum, u) => sum + u.impactScore, 0) / updates.length
        : 0,
      highImpact: updates.filter((u) => u.impactScore >= 70).length,
      avgVolatility: updates.length > 0
        ? updates.reduce((sum, u) => sum + (u.volatility || 0), 0) / updates.length
        : 0,
    };

    // Format timeline
    const timeline = updates.map((update) => ({
      id: update.id,
      name: update.name,
      type: update.type,
      volatility: update.volatility,
      impactScore: update.impactScore,
      rankingChanges: update.rankingChanges,
      trafficImpact: update.trafficImpact,
      affectedKeywords: update.affectedKeywords,
      status: update.status,
      detectedAt: update.detectedAt,
      confirmedAt: update.confirmedAt,
      resolvedAt: update.resolvedAt,
      notes: update.notes,
    }));

    // Get recent ranking volatility for correlation
    const recentRankings = await prisma.rankingRecord.findMany({
      where: {
        timestamp: {
          gte: startDate,
        },
        previousPosition: {
          not: null,
        },
      },
      select: {
        keyword: true,
        position: true,
        previousPosition: true,
        timestamp: true,
      },
    });

    // Calculate daily volatility
    const dailyVolatility = recentRankings.reduce((acc: any, ranking) => {
      const date = ranking.timestamp.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, changes: 0, totalKeywords: 0 };
      }

      if (ranking.previousPosition) {
        const change = Math.abs(ranking.position - ranking.previousPosition);
        if (change >= 3) {
          acc[date].changes += 1;
        }
        acc[date].totalKeywords += 1;
      }

      return acc;
    }, {});

    const volatilityTimeline = Object.values(dailyVolatility).map((day: any) => ({
      date: day.date,
      volatility: day.totalKeywords > 0 ? (day.changes / day.totalKeywords) * 100 : 0,
      affectedKeywords: day.changes,
    }));

    return NextResponse.json({
      timeline,
      stats,
      volatility: {
        current: volatilityTimeline[volatilityTimeline.length - 1] || { volatility: 0 },
        timeline: volatilityTimeline.slice(-30), // Last 30 days
        avgVolatility: volatilityTimeline.length > 0
          ? volatilityTimeline.reduce((sum: number, d: any) => sum + d.volatility, 0) / volatilityTimeline.length
          : 0,
      },
    });
  } catch (error) {
    console.error('[API] Error fetching algorithm updates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch algorithm updates' },
      { status: 500 }
    );
  }
}
