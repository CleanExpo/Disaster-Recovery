/**
 * SWOT Analysis API
 *
 * GET /api/competitor-analysis/swot - Get SWOT analysis for competitor
 * POST /api/competitor-analysis/swot - Generate new SWOT analysis
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { triggerSWOTAnalysis, getJobStatus } from '@/lib/competitor-analysis/jobs/analysis-scheduler';
import { swotAnalysisService } from '@/lib/competitor-analysis/services/swot-analysis-service';

// Validation schema
const swotAnalysisSchema = z.object({
  competitorId: z.string(),
  priority: z.number().min(1).max(10).default(5),
});

/**
 * POST - Generate SWOT analysis
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = swotAnalysisSchema.parse(body);

    // Trigger SWOT analysis job
    const jobId = await triggerSWOTAnalysis(
      validatedData.competitorId,
      validatedData.priority
    );

    return NextResponse.json({
      success: true,
      data: {
        jobId,
        competitorId: validatedData.competitorId,
        message: 'SWOT analysis job triggered successfully',
      },
    }, { status: 202 }); // 202 Accepted
  } catch (error: any) {
    console.error('[API] Error triggering SWOT analysis:', error);

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
 * GET - Get SWOT analysis for competitor
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const competitorId = searchParams.get('competitorId');
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

    // Get SWOT analysis from database
    if (!competitorId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_COMPETITOR_ID',
            message: 'Competitor ID is required',
          },
        },
        { status: 400 }
      );
    }

    const swot = await swotAnalysisService.getSWOT(competitorId);

    if (!swot) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'No SWOT analysis found for this competitor',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: swot,
      meta: {
        generatedAt: swot.generatedAt,
        generatedBy: swot.generatedBy,
      },
    });
  } catch (error: any) {
    console.error('[API] Error fetching SWOT analysis:', error);

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
