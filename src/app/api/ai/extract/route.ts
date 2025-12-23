import { NextRequest, NextResponse } from 'next/server';
import { extractInformation } from '@/lib/ai/ai.service';
import { addAIJob } from '@/lib/config/queue.config';
import { logger } from '@/lib/logger';

/**
 * POST /api/ai/extract
 * Extract entities and information from text
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
        type: 'extract',
        input,
        options,
      });

      return NextResponse.json({
        success: true,
        jobId: job.id.toString(),
        message: 'Extraction job queued for processing',
      });
    }

    // Handle synchronous processing
    const result = await extractInformation(input, options);

    return NextResponse.json({
      success: true,
      extracted: result,
      entityCount: result.entities?.length || 0,
    });
  } catch (error) {
    logger.error('Error in AI extract endpoint:', error);
    return NextResponse.json(
      {
        error: 'Failed to extract information',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai/extract
 * Get API documentation
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/ai/extract',
    method: 'POST',
    description: 'Extract entities and key information from text',
    parameters: {
      input: 'string (required) - Text to analyze',
      options: 'object (optional) - Extraction options',
      async: 'boolean (optional) - Process asynchronously (default: false)',
    },
    example: {
      input: 'Apple Inc. is located in Cupertino, California. Tim Cook is the CEO.',
      options: {
        confidence: 0.9,
      },
      async: false,
    },
  });
}
