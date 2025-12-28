/**
 * Keyword Opportunities API
 *
 * GET /api/competitor-analysis/opportunities
 * Returns keyword opportunities for targeting
 */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const opportunities = await prisma.keywordOpportunity.findMany({
      orderBy: { opportunityScore: 'desc' },
      take: 100,
    });

    // Transform to match dashboard type
    const formattedOpportunities = opportunities.map((opp) => ({
      id: opp.id,
      keyword: opp.keyword,
      searchVolume: opp.searchVolume,
      difficulty: opp.difficulty,
      cpc: opp.cpc,
      intent: opp.intent,
      opportunityScore: opp.opportunityScore,
      difficultyTier: opp.difficultyTier as 'easy' | 'medium' | 'hard',
      competitorCount: opp.competitorCount,
      averagePosition: opp.averagePosition,
      topCompetitor: opp.topCompetitor,
    }));

    return NextResponse.json(formattedOpportunities);
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    );
  }
}
