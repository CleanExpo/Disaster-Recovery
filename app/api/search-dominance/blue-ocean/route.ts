/**
 * Search Dominance Blue Ocean API
 *
 * GET /api/search-dominance/blue-ocean
 * Returns Blue Ocean opportunities
 *
 * POST /api/search-dominance/blue-ocean
 * Triggers manual Blue Ocean scan
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Query parameters
    const status = searchParams.get('status') || undefined; // new, in_progress, completed, dismissed
    const category = searchParams.get('category') || undefined;
    const minScore = parseInt(searchParams.get('minScore') || '0');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {
      opportunityScore: {
        gte: minScore,
      },
    };

    if (status) where.status = status.toUpperCase();
    if (category) where.category = category;

    // Get opportunities with pagination
    const [opportunities, total] = await Promise.all([
      prisma.blueOceanOpportunity.findMany({
        where,
        orderBy: [
          { opportunityScore: 'desc' },
          { detectedAt: 'desc' },
        ],
        take: limit,
        skip: offset,
      }),
      prisma.blueOceanOpportunity.count({ where }),
    ]);

    // Calculate statistics
    const stats = {
      total,
      byStatus: {
        new: await prisma.blueOceanOpportunity.count({ where: { status: 'NEW' } }),
        inProgress: await prisma.blueOceanOpportunity.count({ where: { status: 'IN_PROGRESS' } }),
        completed: await prisma.blueOceanOpportunity.count({ where: { status: 'COMPLETED' } }),
        dismissed: await prisma.blueOceanOpportunity.count({ where: { status: 'DISMISSED' } }),
      },
      byCategory: await prisma.blueOceanOpportunity.groupBy({
        by: ['category'],
        _count: true,
        orderBy: {
          _count: {
            category: 'desc',
          },
        },
        take: 10,
      }),
      avgScore: opportunities.length > 0
        ? opportunities.reduce((sum, o) => sum + o.opportunityScore, 0) / opportunities.length
        : 0,
      highPriority: opportunities.filter((o) => o.opportunityScore >= 80).length,
    };

    return NextResponse.json({
      opportunities: opportunities.map((o) => ({
        id: o.id,
        keyword: o.keyword,
        topic: o.topic,
        category: o.category,
        opportunityScore: o.opportunityScore,
        searchVolume: o.searchVolume,
        difficulty: o.difficulty,
        competitionGap: o.competitionGap,
        growthRate: o.growthRate,
        userIntent: o.userIntent,
        suggestedContent: o.suggestedContent,
        detectionSource: o.detectionSource,
        status: o.status,
        detectedAt: o.detectedAt,
        actionedAt: o.actionedAt,
      })),
      stats,
      pagination: {
        limit,
        offset,
        hasMore: offset + opportunities.length < total,
      },
    });
  } catch (error) {
    console.error('[API] Error fetching Blue Ocean opportunities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Trigger manual Blue Ocean scan
    // This would integrate with the job scheduler
    // For now, return a placeholder response

    // TODO: Import and trigger the Blue Ocean scan job
    // import { triggerBlueOceanScan } from '@/lib/search-dominance/jobs/search-dominance-scheduler';
    // const jobId = await triggerBlueOceanScan();

    return NextResponse.json({
      success: true,
      message: 'Blue Ocean scan triggered',
      jobId: 'placeholder-job-id',
      estimatedDuration: '5-10 minutes',
    });
  } catch (error) {
    console.error('[API] Error triggering Blue Ocean scan:', error);
    return NextResponse.json(
      { error: 'Failed to trigger scan' },
      { status: 500 }
    );
  }
}
