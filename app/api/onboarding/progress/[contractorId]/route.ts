import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { contractorId: string } }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN']);
    }

    if (user.userType === 'CONTRACTOR' && params.contractorId !== user.id) {
      return createErrorResponse(ErrorCode.FORBIDDEN, 'Unauthorized onboarding access', 403);
    }

    const onboarding = await prisma.contractorOnboarding.findUnique({
      where: { contractorId: params.contractorId },
      include: {
        moduleProgress: true,
        assessments: true,
      },
    });

    if (!onboarding) {
      return NextResponse.json(
        { success: false, error: 'Onboarding not found' },
        { status: 404 }
      );
    }

    const totalModules = onboarding.moduleProgress.length;
    const completedModules = onboarding.moduleProgress.filter(m => m.status === 'COMPLETED').length;
    const completionPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

    const currentModule = onboarding.moduleProgress.find(m => m.status !== 'COMPLETED') ?? null;

    return NextResponse.json({
      success: true,
      progress: {
        contractorId: onboarding.contractorId,
        specialization: onboarding.specialization,
        completionPercentage,
        currentModule: currentModule ? {
          moduleId: currentModule.moduleId,
          courseName: currentModule.courseName ?? undefined,
          status: currentModule.status,
          progress: currentModule.progress,
          startedAt: currentModule.startedAt?.toISOString(),
          completedAt: currentModule.completedAt?.toISOString(),
        } : null,
        assessmentScores: onboarding.assessments.map(a => ({
          moduleId: a.moduleId,
          score: a.score ?? 0,
          passed: (a.score ?? 0) >= 70,
          completedAt: (a.completedAt ?? a.createdAt).toISOString(),
        })),
        certificationType: completionPercentage >= 100 ? 'CERTIFIED' : 'IN_PROGRESS',
      },
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
