import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { getTrainingModuleHtmlById, verifyTrainingSourcesPresent } from '@/lib/training/nrp-training';

export const dynamic = 'force-dynamic';

const paramsSchema = z.object({
  moduleId: z.string().regex(/^NRP-\d{3}$/i),
});

export async function GET(_request: NextRequest, context: { params: { moduleId: string } }) {
  try {
    await verifyTrainingSourcesPresent();

    const validation = paramsSchema.safeParse(context.params);
    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const moduleId = validation.data.moduleId.toUpperCase();
    const module = await getTrainingModuleHtmlById(moduleId);

    return NextResponse.json({
      success: true,
      module: {
        moduleId,
        sourcePath: module.sourcePath,
        sha256: module.sha256,
        html: module.html,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load training module';
    if (message.includes('not found')) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, message, 404);
    }
    return handleUnexpectedError(error);
  }
}

