/**
 * Competitor Analysis Trigger API
 *
 * POST /api/competitor-analysis/analyze/[id]
 * Triggers analysis for a specific competitor
 */

import { NextRequest, NextResponse } from 'next/server';
import { competitorAnalysisService } from '@/lib/competitor-analysis/services/competitor-analysis-service';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Start analysis in background (don't await)
    competitorAnalysisService.analyzeCompetitor(id).catch((error) => {
      console.error(`Background analysis failed for ${id}:`, error);
    });

    return NextResponse.json({
      success: true,
      message: 'Analysis started',
      competitorId: id,
    });
  } catch (error) {
    console.error('Error starting analysis:', error);
    return NextResponse.json(
      { error: 'Failed to start analysis' },
      { status: 500 }
    );
  }
}
