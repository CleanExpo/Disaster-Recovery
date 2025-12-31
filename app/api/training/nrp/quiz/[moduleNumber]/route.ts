import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { getNrpgQuizModule, verifyTrainingSourcesPresent } from '@/lib/training/nrp-training';

export const dynamic = 'force-dynamic';

const paramsSchema = z.object({
  moduleNumber: z.string().regex(/^\d+$/),
});

export async function GET(_request: NextRequest, context: { params: { moduleNumber: string } }) {
  try {
    await verifyTrainingSourcesPresent();

    const validation = paramsSchema.safeParse(context.params);
    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const moduleNumber = parseInt(validation.data.moduleNumber, 10);
    const module = await getNrpgQuizModule(moduleNumber);

    if (!module) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, 'Quiz module not found', 404);
    }

    return NextResponse.json({
      success: true,
      quiz: {
        moduleNumber,
        name: module.name,
        description: module.description,
        timeLimitMinutes: 30,
        passingScore: 70,
        questions: module.questions,
      },
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

