import { NextRequest, NextResponse } from 'next/server';
import {
  analyzeDisaster,
  generateRecoveryPlan,
  summarizeDisasterReport,
  processDisasterReportAsync,
} from '@/lib/ai/disaster-recovery-agent.service';
import { logger } from '@/lib/logger';

/**
 * POST /api/disasters/analyze
 * Analyze disaster and generate recovery recommendations
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, action = 'analyze', metadata, async = false } = body;

    // Validate input
    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Invalid description. Expected a string.' },
        { status: 400 }
      );
    }

    // Handle different actions
    switch (action) {
      case 'analyze': {
        if (async) {
          const jobId = await processDisasterReportAsync(
            description,
            metadata?.userId,
            metadata?.tenantId
          );
          return NextResponse.json({
            success: true,
            jobId,
            message: 'Disaster analysis queued for processing',
          });
        }

        const analysis = await analyzeDisaster(description, metadata);
        return NextResponse.json({
          success: true,
          analysis,
        });
      }

      case 'plan': {
        // First analyze, then generate plan
        const analysis = await analyzeDisaster(description, metadata);
        const plan = await generateRecoveryPlan(
          metadata?.disasterId || `disaster-${Date.now()}`,
          analysis
        );

        return NextResponse.json({
          success: true,
          analysis,
          plan,
        });
      }

      case 'summarize': {
        const summary = await summarizeDisasterReport(description);
        return NextResponse.json({
          success: true,
          summary,
        });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}. Valid actions are: analyze, plan, summarize` },
          { status: 400 }
        );
    }
  } catch (error) {
    logger.error('Error in disaster analyze endpoint:', error);
    return NextResponse.json(
      {
        error: 'Failed to process disaster analysis',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/disasters/analyze
 * Get API documentation
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/disasters/analyze',
    method: 'POST',
    description: 'Analyze disaster scenarios and generate recovery plans',
    parameters: {
      description: 'string (required) - Disaster description',
      action: 'string (optional) - Action to perform: analyze, plan, summarize (default: analyze)',
      metadata: 'object (optional) - Additional metadata',
      async: 'boolean (optional) - Process asynchronously (default: false)',
    },
    examples: {
      analyze: {
        description: 'Severe flooding in downtown area affecting 50 businesses',
        action: 'analyze',
        metadata: {
          userId: 'user123',
          tenantId: 'tenant456',
        },
      },
      plan: {
        description: 'Fire damage to warehouse facility',
        action: 'plan',
        metadata: {
          disasterId: 'disaster-789',
        },
      },
      summarize: {
        description: 'Long disaster report text here...',
        action: 'summarize',
      },
    },
  });
}
