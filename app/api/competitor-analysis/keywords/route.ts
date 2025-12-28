/**
 * Keywords List API
 *
 * GET /api/competitor-analysis/keywords
 * Returns all tracked keywords with ranking data
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const competitorId = searchParams.get('competitorId');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '100');

    const where: any = {};

    if (competitorId) {
      where.competitorId = competitorId;
    }

    if (category) {
      where.category = category;
    }

    const keywords = await prisma.competitorKeyword.findMany({
      where,
      orderBy: { position: 'asc' },
      take: limit,
    });

    // Transform to match dashboard type
    const formattedKeywords = keywords.map((kw) => ({
      id: kw.id,
      competitorId: kw.competitorId,
      keyword: kw.keyword,
      searchVolume: kw.searchVolume,
      difficulty: kw.difficulty,
      cpc: kw.cpc,
      position: kw.position,
      previousPosition: kw.previousPosition,
      url: kw.url,
      intent: kw.intent,
      category: kw.category,
      opportunityScore: kw.opportunityScore,
      difficultyTier: kw.difficultyTier as 'easy' | 'medium' | 'hard' | null,
      lastChecked: kw.lastChecked,
    }));

    return NextResponse.json(formattedKeywords);
  } catch (error) {
    console.error('Error fetching keywords:', error);
    return NextResponse.json(
      { error: 'Failed to fetch keywords' },
      { status: 500 }
    );
  }
}
