import { NextRequest, NextResponse } from 'next/server';
import { summarizeText } from '@/lib/ai/ai.service';
import { addAIJob } from '@/lib/config/queue.config';
import { logger } from '@/lib/logger';

/**
 * POST /api/ai/summarize
 * Summarize text
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input, options, async = false } = body;

    // Validate input
    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input. Expected a string.' },
        { status: 400 }
      );
    }

    if (input.length < 100) {
      return NextResponse.json(
        { error: 'Input text too short. Minimum 100 characters required for summarization.' },
        { status: 400 }
      );
    }

    // Handle async processing
    if (async) {
      const job = await addAIJob({
        type: 'summarize',
        input,
        options,
      });

      return NextResponse.json({
        success: true,
        jobId: job.id.toString(),
        message: 'Summarization job queued for processing',
      });
    }

    // Handle synchronous processing
    const result = await summarizeText(input, options);

    return NextResponse.json({
      success: true,
      summary: result,
      originalLength: input.length,
      summaryLength: result.length,
      compressionRatio: ((1 - result.length / input.length) * 100).toFixed(2) + '%',
    });
  } catch (error) {
    logger.error('Error in AI summarize endpoint:', error);
    return NextResponse.json(
      {
        error: 'Failed to summarize text',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai/summarize
 * Get API documentation
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/ai/summarize',
    method: 'POST',
    description: 'Summarize long text into concise summary',
    parameters: {
      input: 'string (required) - Text to summarize (min 100 characters)',
      options: 'object (optional) - Summarization options',
      async: 'boolean (optional) - Process asynchronously (default: false)',
    },
    example: {
      input: 'Long text content here... (minimum 100 characters)',
      options: {
        minLength: 30,
        maxLength: 130,
      },
      async: false,
    },
  });
}
