import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';
import { getEducationModules } from '@/lib/services/client-onboarding.service';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/client/onboarding/education/modules
 *
 * Get list of all client education modules with progress
 * Returns 7 disaster recovery education modules
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role
    if (!requireRole(user, ['CLIENT', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN', 'SUPER_ADMIN']);
    }

    // Get all education modules
    const modules = await getEducationModules();

    // Get client's progress on these modules
    const onboarding = await prisma.clientOnboarding.findUnique({
      where: { clientId: user.id },
      include: {
        moduleProgress: true,
      },
    });

    // Merge module definitions with progress
    const modulesWithProgress = modules.map((module) => {
      const progress = onboarding?.moduleProgress.find((p) => p.moduleId === module.id);

      return {
        ...module,
        status: progress?.status || 'NOT_STARTED',
        progress: progress?.progress || 0,
        completed: progress?.completed || false,
        quizScore: progress?.quizScore,
        startedAt: progress?.startedAt?.toISOString(),
        completedAt: progress?.completedAt?.toISOString(),
      };
    });

    return NextResponse.json({
      success: true,
      modules: modulesWithProgress,
      totalModules: modules.length,
      completedModules: modulesWithProgress.filter((m) => m.completed).length,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
