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
    const effectiveContractorId = user.userType === 'CONTRACTOR' ? user.id : contractorId;

    if (user.userType === 'CONTRACTOR' && contractorId !== user.id) {
      return createErrorResponse(ErrorCode.FORBIDDEN, 'Unauthorized assessment submission', 403);
    }

    const onboarding = await prisma.contractorOnboarding.findUnique({
      where: { contractorId: effectiveContractorId },
      include: { moduleProgress: true },
    });

    if (!onboarding) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, 'Onboarding not found', 404);
    }

    const moduleProgress = onboarding.moduleProgress.find(m => m.moduleId === moduleId);
    if (!moduleProgress) {
      return createErrorResponse(ErrorCode.INVALID_INPUT, 'Module not found for contractor onboarding', 400);
    }

    const ordered = [...onboarding.moduleProgress].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    const current = ordered.find((m) => m.status !== 'COMPLETED') ?? null;
    const isAllowed =
      (current && current.moduleId === moduleId) ||
      moduleProgress.status === 'IN_PROGRESS' ||
      moduleProgress.status === 'FAILED';

    if (!isAllowed) {
      return createErrorResponse(
        ErrorCode.INVALID_INPUT,
        'Module assessment is locked until previous modules are completed',
        400,
        { currentModuleId: current?.moduleId ?? null }
      );
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

      if (allComplete) {
        const existingCert = await tx.contractorCertification.findFirst({
          where: {
            contractorId: effectiveContractorId,
            certificationName: 'NRP Contractor Certification',
          },
          select: { id: true },
        });

        if (!existingCert) {
          const issueDate = new Date();
          const expiryDate = new Date(issueDate.getTime());
          expiryDate.setFullYear(expiryDate.getFullYear() + 1);

          await tx.contractorCertification.create({
            data: {
              contractorId: effectiveContractorId,
              certificationName: 'NRP Contractor Certification',
              certificationLevel: 1,
              issueDate,
              expiryDate,
              specializations: onboarding.specialization ? [onboarding.specialization] : [],
              verified: false,
            },
          });
        }
      }
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
