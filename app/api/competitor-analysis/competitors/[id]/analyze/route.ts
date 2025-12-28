/**
 * Trigger Competitor Analysis API
 *
 * POST /api/competitor-analysis/competitors/[id]/analyze - Trigger analysis for specific competitor
 * GET /api/competitor-analysis/competitors/[id]/analyze - Get analysis status
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { triggerAnalysis, getJobStatus } from '@/lib/competitor-analysis/jobs/analysis-scheduler';

const prisma = new PrismaClient();

/**
 * POST - Trigger analysis for specific competitor
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const competitorId = params.id;

    // Verify competitor exists
    const competitor = await prisma.competitor.findUnique({
      where: { id: competitorId },
    });

    if (!competitor) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Competitor not found',
          },
        },
        { status: 404 }
      );
    }

    // Trigger analysis job
    const jobId = await triggerAnalysis(competitorId, 7);

    return NextResponse.json({
      success: true,
      data: {
        jobId,
        competitorId,
        domain: competitor.domain,
        message: 'Analysis job triggered successfully',
      },
    }, { status: 202 }); // 202 Accepted
  } catch (error: any) {
    console.error('[API] Error triggering analysis:', error);

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
 * GET - Get analysis status for competitor
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const competitorId = params.id;
    const { searchParams } = new URL(request.url);
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

    // Otherwise, get latest analysis for competitor
    const analysis = await prisma.competitorAnalysis.findFirst({
      where: { competitorId },
      orderBy: { analysisDate: 'desc' },
      include: {
        competitor: {
          select: {
            id: true,
            domain: true,
            name: true,
            category: true,
          },
        },
      },
    });

    if (!analysis) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NO_ANALYSIS',
            message: 'No analysis found for this competitor',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error: any) {
    console.error('[API] Error fetching analysis status:', error);

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
