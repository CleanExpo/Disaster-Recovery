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
    const quizModule = await getNrpgQuizModule(moduleNumber);

    if (!quizModule) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, 'Quiz module not found', 404);
    }

    return NextResponse.json({
      success: true,
      quiz: {
        moduleNumber,
        name: quizModule.name,
        description: quizModule.description,
        timeLimitMinutes: 30,
        passingScore: 70,
        questions: quizModule.questions,
      },
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
