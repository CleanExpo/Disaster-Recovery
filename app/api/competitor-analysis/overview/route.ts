/**
 * Competitor Analysis Overview API
 *
 * GET /api/competitor-analysis/overview
 * Returns dashboard overview metrics
 */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get total competitors
    const totalCompetitors = await prisma.competitor.count({
      where: { isActive: true },
    });

    // Get total keywords
    const totalKeywords = await prisma.competitorKeyword.count();

    // Get total opportunities
    const totalOpportunities = await prisma.keywordOpportunity.count();

    // Get last analysis date
    const lastAnalysis = await prisma.competitorAnalysis.findFirst({
      orderBy: { analysisDate: 'desc' },
      select: { analysisDate: true },
    });

    // Get average domain rating
    const avgDomainRating = await prisma.competitorAnalysis.aggregate({
      _avg: { domainRating: true },
    });

    // Get average organic traffic
    const avgOrganicTraffic = await prisma.competitorAnalysis.aggregate({
      _avg: { organicTraffic: true },
    });

    return NextResponse.json({
      totalCompetitors,
      totalKeywords,
      totalOpportunities,
      lastAnalysisDate: lastAnalysis?.analysisDate || null,
      avgDomainRating: avgDomainRating._avg.domainRating || 0,
      avgOrganicTraffic: avgOrganicTraffic._avg.organicTraffic || 0,
    });
  } catch (error) {
    console.error('Error fetching overview:', error);
    return NextResponse.json(
      { error: 'Failed to fetch overview data' },
      { status: 500 }
    );
  }
}
