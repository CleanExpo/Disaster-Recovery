/**
 * Keyword Gap Analysis API
 *
 * POST /api/competitor-analysis/keywords/gaps - Generate keyword gap analysis
 * GET /api/competitor-analysis/keywords/gaps - Get existing opportunities
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { triggerKeywordGapAnalysis, getJobStatus } from '@/lib/competitor-analysis/jobs/analysis-scheduler';
import { keywordGapService } from '@/lib/competitor-analysis/services/keyword-gap-service';

// Validation schema
const gapAnalysisSchema = z.object({
  targetDomain: z.string().min(1),
  competitorCategory: z.enum(['RESTORATION_COMPANY', 'INSURANCE_NETWORK', 'CONTRACTOR_MARKETPLACE', 'INDUSTRY_ASSOCIATION']).optional(),
  priority: z.number().min(1).max(10).default(5),
});

/**
 * POST - Generate keyword gap analysis
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = gapAnalysisSchema.parse(body);

    // Trigger keyword gap analysis job
    const jobId = await triggerKeywordGapAnalysis(
      validatedData.targetDomain,
      validatedData.competitorCategory,
      validatedData.priority
    );

    return NextResponse.json({
      success: true,
      data: {
        jobId,
        targetDomain: validatedData.targetDomain,
        competitorCategory: validatedData.competitorCategory,
        message: 'Keyword gap analysis job triggered successfully',
      },
    }, { status: 202 }); // 202 Accepted
  } catch (error: any) {
    console.error('[API] Error triggering keyword gap analysis:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input data',
            details: error.errors,
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'TRIGGER_ERROR',
          message: error.message,
        },
      },
      { status: 500 }
    );
  }
}

/**
 * GET - Get existing keyword opportunities
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const tier = searchParams.get('tier') as 'easy' | 'medium' | 'hard' | null;
    const limit = parseInt(searchParams.get('limit') || '50');
    const jobId = searchParams.get('jobId');

    // If jobId provided, get job status
    if (jobId) {
      const status = await getJobStatus(jobId);

      if (!status) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'JOB_NOT_FOUND',
              message: 'Job not found',
            },
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: status,
      });
    }

    // Get opportunities from database
    const opportunities = await keywordGapService.getTopOpportunities(
      tier || undefined,
      limit
    );

    // Classify opportunities
    const classified = keywordGapService.classifyOpportunities(opportunities);

    return NextResponse.json({
      success: true,
      data: {
        opportunities,
        classified: {
          easy: classified.easy.length,
          medium: classified.medium.length,
          hard: classified.hard.length,
          total: opportunities.length,
        },
        summary: {
          totalSearchVolume: opportunities.reduce((sum, o) => sum + o.searchVolume, 0),
          averageDifficulty: opportunities.reduce((sum, o) => sum + o.difficulty, 0) / opportunities.length,
          averageGapScore: opportunities.reduce((sum, o) => sum + o.gapScore, 0) / opportunities.length,
        },
      },
      meta: {
        limit,
        tier: tier || 'all',
      },
    });
  } catch (error: any) {
    console.error('[API] Error fetching keyword opportunities:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: error.message,
        },
      },
      { status: 500 }
    );
  }
}
