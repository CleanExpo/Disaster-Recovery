import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

const assessmentSchema = z.object({
  contractorId: z.string().min(1),
  moduleId: z.string().min(1),
  score: z.number().int().min(0).max(100),
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
    const validation = assessmentSchema.safeParse(body);
    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const { contractorId, moduleId, score } = validation.data;

    if (user.userType === 'CONTRACTOR' && contractorId !== user.id) {
      return createErrorResponse(ErrorCode.FORBIDDEN, 'Unauthorized assessment submission', 403);
    }

    const onboarding = await prisma.contractorOnboarding.findUnique({
      where: { contractorId },
      include: { moduleProgress: true },
    });

    if (!onboarding) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, 'Onboarding not found', 404);
    }

    const moduleProgress = onboarding.moduleProgress.find(m => m.moduleId === moduleId);
    if (!moduleProgress) {
      return createErrorResponse(ErrorCode.INVALID_INPUT, 'Module not found for contractor onboarding', 400);
    }

    const passingScore = 70;
    const passed = score >= passingScore;

    await prisma.$transaction(async (tx) => {
      await tx.contractorAssessment.create({
        data: {
          onboardingId: onboarding.id,
          moduleId,
          assessmentType: 'QUIZ',
          score,
          maxScore: 100,
          completedAt: new Date(),
          feedback: passed ? 'Passed' : 'Needs review',
        },
      });

      await tx.contractorModuleProgress.update({
        where: { id: moduleProgress.id },
        data: {
          startedAt: moduleProgress.startedAt ?? new Date(),
          completedAt: passed ? new Date() : null,
          completed: passed,
          status: passed ? 'COMPLETED' : 'FAILED',
          progress: passed ? 100 : Math.max(moduleProgress.progress, 25),
        },
      });

      const refreshed = await tx.contractorModuleProgress.findMany({
        where: { onboardingId: onboarding.id },
        select: { status: true },
      });

      const allComplete = refreshed.length > 0 && refreshed.every(m => m.status === 'COMPLETED');

      await tx.contractorOnboarding.update({
        where: { id: onboarding.id },
        data: allComplete
          ? { status: 'COMPLETED', actualCompletionDate: new Date() }
          : { status: 'IN_PROGRESS' },
      });
    });

    return NextResponse.json({
      success: true,
      passed,
      passingScore,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

