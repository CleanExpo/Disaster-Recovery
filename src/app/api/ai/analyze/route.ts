import { NextRequest, NextResponse } from 'next/server';
import { analyzeText } from '@/lib/ai/ai.service';
import { addAIJob } from '@/lib/config/queue.config';
import { logger } from '@/lib/logger';

/**
 * POST /api/ai/analyze
 * Comprehensive text analysis (sentiment, entities, topics)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input, async = false } = body;

    // Validate input
    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input. Expected a string.' },
        { status: 400 }
      );
    }

    // Handle async processing
    if (async) {
      const job = await addAIJob({
        type: 'analyze',
        input,
      });

      return NextResponse.json({
        success: true,
        jobId: job.id.toString(),
        message: 'Analysis job queued for processing',
      });
    }

    // Handle synchronous processing
    const result = await analyzeText(input);

    return NextResponse.json({
      success: true,
      analysis: result,
    });
  } catch (error) {
    logger.error('Error in AI analyze endpoint:', error);
    return NextResponse.json(
      {
        error: 'Failed to analyze text',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai/analyze
 * Get API documentation
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/ai/analyze',
    method: 'POST',
    description: 'Perform comprehensive text analysis including sentiment and entity extraction',
    parameters: {
      input: 'string (required) - Text to analyze',
      async: 'boolean (optional) - Process asynchronously (default: false)',
    },
    example: {
      input: 'This is a great product! I am very satisfied with the purchase.',
      async: false,
    },
  });
}
