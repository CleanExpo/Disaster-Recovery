/**
 * Search Dominance Blue Ocean Individual Opportunity API
 *
 * GET /api/search-dominance/blue-ocean/[id]
 * Returns specific opportunity details
 *
 * PATCH /api/search-dominance/blue-ocean/[id]
 * Updates opportunity status
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const opportunity = await prisma.blueOceanOpportunity.findUnique({
      where: { id: params.id },
    });

    if (!opportunity) {
      return NextResponse.json(
        { error: 'Opportunity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      opportunity: {
        id: opportunity.id,
        keyword: opportunity.keyword,
        topic: opportunity.topic,
        category: opportunity.category,
        opportunityScore: opportunity.opportunityScore,
        searchVolume: opportunity.searchVolume,
        difficulty: opportunity.difficulty,
        competitionGap: opportunity.competitionGap,
        growthRate: opportunity.growthRate,
        userIntent: opportunity.userIntent,
        suggestedContent: opportunity.suggestedContent,
        detectionSource: opportunity.detectionSource,
        status: opportunity.status,
        detectedAt: opportunity.detectedAt,
        actionedAt: opportunity.actionedAt,
      },
    });
  } catch (error) {
    console.error('[API] Error fetching opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunity' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ['NEW', 'IN_PROGRESS', 'COMPLETED', 'DISMISSED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: NEW, IN_PROGRESS, COMPLETED, DISMISSED' },
        { status: 400 }
      );
    }

    // Update opportunity
    const opportunity = await prisma.blueOceanOpportunity.update({
      where: { id: params.id },
      data: {
        status,
        actionedAt: status !== 'NEW' ? new Date() : null,
      },
    });

    return NextResponse.json({
      success: true,
      opportunity: {
        id: opportunity.id,
        status: opportunity.status,
        actionedAt: opportunity.actionedAt,
      },
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Opportunity not found' },
        { status: 404 }
      );
    }

    console.error('[API] Error updating opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to update opportunity' },
      { status: 500 }
    );
  }
}
