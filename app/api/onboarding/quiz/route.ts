import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { getNrpgQuizModule, parseNrpgModuleNumber } from '@/lib/training/nrp-training';

export const dynamic = 'force-dynamic';

const quizRequestSchema = z.object({
  moduleId: z.string().min(1),
  contractorId: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN']);
    }

    const body = await request.json();
    const validation = quizRequestSchema.safeParse(body);
    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const { moduleId, contractorId } = validation.data;

    const effectiveContractorId = user.userType === 'CONTRACTOR' ? user.id : contractorId;

    if (user.userType === 'CONTRACTOR' && contractorId !== user.id) {
      return createErrorResponse(ErrorCode.FORBIDDEN, 'Unauthorized quiz access', 403);
    }

    const moduleNumber = parseNrpgModuleNumber(moduleId);
    if (!moduleNumber) {
      return createErrorResponse(ErrorCode.INVALID_INPUT, 'Unsupported moduleId for quiz', 400, { moduleId });
    }

    const quizModule = await getNrpgQuizModule(moduleNumber);
    if (!quizModule) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, 'Quiz module not found', 404, { moduleId });
    }

    const onboarding = await prisma.contractorOnboarding.findUnique({
      where: { contractorId: effectiveContractorId },
      include: { moduleProgress: true },
    });

    if (onboarding) {
      const moduleProgress = onboarding.moduleProgress.find((m) => m.moduleId === moduleId);
      if (moduleProgress && moduleProgress.status === 'NOT_STARTED') {
        await prisma.contractorModuleProgress.update({
          where: { id: moduleProgress.id },
          data: {
            status: 'IN_PROGRESS',
            startedAt: moduleProgress.startedAt ?? new Date(),
            progress: Math.max(moduleProgress.progress, 1),
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      quiz: {
        moduleId,
        timeLimit: 30,
        passingScore: 70,
        questions: quizModule.questions,
      },
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
