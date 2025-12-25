import { NextRequest, NextResponse } from 'next/server';
import { processText } from '@/lib/ai/ai.service';
import { addAIJob } from '@/lib/config/queue.config';
import { logger } from '@/lib/logger';

/**
 * POST /api/ai/process
 * Process text with AI model
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

    // Handle async processing
    if (async) {
      const job = await addAIJob({
        type: 'process',
        input,
        options,
      });

      return NextResponse.json({
        success: true,
        jobId: job.id.toString(),
        message: 'Job queued for processing',
      });
    }

    // Handle synchronous processing
    const result = await processText(input, options);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    logger.error('Error in AI process endpoint:', error);
    return NextResponse.json(
      {
        error: 'Failed to process text',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai/process
 * Get API documentation
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/ai/process',
    method: 'POST',
    description: 'Process text with AI model',
    parameters: {
      input: 'string (required) - Text to process',
      options: 'object (optional) - Processing options',
      async: 'boolean (optional) - Process asynchronously (default: false)',
    },
    example: {
      input: 'Your text here',
      options: {
        maxLength: 150,
        temperature: 0.7,
      },
      async: false,
    },
  });
}
