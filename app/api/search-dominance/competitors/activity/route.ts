/**
 * Search Dominance Competitor Activity API
 *
 * GET /api/search-dominance/competitors/activity
 * Returns recent competitor movements and activities
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Query parameters
    const days = parseInt(searchParams.get('days') || '7');
    const threatLevel = searchParams.get('threatLevel') || undefined; // LOW, MEDIUM, HIGH
    const limit = parseInt(searchParams.get('limit') || '50');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get recent competitor snapshots with major updates or new content
    const snapshots = await prisma.competitorSnapshot.findMany({
      where: {
        timestamp: {
          gte: startDate,
        },
        OR: [
          { majorUpdate: true },
          { newContent: { isEmpty: false } },
        ],
      },
      orderBy: {
        timestamp: 'desc',
      },
      take: limit,
      include: {
        competitor: {
          select: {
            name: true,
            domain: true,
            threatLevel: true,
          },
        },
      },
    });

    // Get current threat distribution
    const competitors = await prisma.competitor.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        domain: true,
        threatLevel: true,
        lastSnapshotAt: true,
        contentVelocity: true,
      },
    });

    // Filter by threat level if specified
    const filteredCompetitors = threatLevel
      ? competitors.filter((c) => c.threatLevel === threatLevel)
      : competitors;

    // Format activities
    const activities = snapshots.map((snapshot) => ({
      competitorId: snapshot.competitorId,
      competitorName: snapshot.competitor.name,
      competitorDomain: snapshot.competitor.domain,
      threatLevel: snapshot.competitor.threatLevel,
      activityType: snapshot.majorUpdate ? 'major_update' : 'new_content',
      details: snapshot.majorUpdate
        ? `Significant changes in search presence (${snapshot.organicKeywords} organic keywords, ${snapshot.rankingKeywords} ranking keywords)`
        : `Published ${snapshot.newContent?.length || 0} new pieces of content`,
      metrics: {
        organicKeywords: snapshot.organicKeywords,
        organicTraffic: snapshot.organicTraffic,
        domainAuthority: snapshot.domainAuthority,
        topTenKeywords: snapshot.topTenKeywords,
        contentVelocity: snapshot.contentVelocity,
      },
      timestamp: snapshot.timestamp,
    }));

    // Calculate statistics
    const stats = {
      totalCompetitors: competitors.length,
      byThreatLevel: {
        HIGH: competitors.filter((c) => c.threatLevel === 'HIGH').length,
        MEDIUM: competitors.filter((c) => c.threatLevel === 'MEDIUM').length,
        LOW: competitors.filter((c) => c.threatLevel === 'LOW').length,
      },
      recentActivity: {
        majorUpdates: snapshots.filter((s) => s.majorUpdate).length,
        newContent: snapshots.filter((s) => s.newContent && s.newContent.length > 0).length,
      },
      avgContentVelocity: competitors.length > 0
        ? competitors.reduce((sum, c) => sum + c.contentVelocity, 0) / competitors.length
        : 0,
    };

    return NextResponse.json({
      activities,
      competitors: filteredCompetitors.map((c) => ({
        id: c.id,
        name: c.name,
        domain: c.domain,
        threatLevel: c.threatLevel,
        lastSnapshotAt: c.lastSnapshotAt,
        contentVelocity: c.contentVelocity,
      })),
      stats,
    });
  } catch (error) {
    console.error('[API] Error fetching competitor activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch competitor activity' },
      { status: 500 }
    );
  }
}
