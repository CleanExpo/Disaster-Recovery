import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { getOnboardingProgress } from '@/lib/services/client-onboarding.service';

export const dynamic = 'force-dynamic';

/**
 * GET /api/client/onboarding/progress/:clientId
 *
 * Get client onboarding progress
 * Returns completion percentage, current phase, next steps, and tier info
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { clientId: string } }
) {
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

    // Clients can only view their own progress
    if (user.userType === 'CLIENT' && params.clientId !== user.id) {
      return createErrorResponse(ErrorCode.FORBIDDEN, 'Unauthorized access to onboarding progress', 403);
    }

    // Get progress
    const progress = await getOnboardingProgress(params.clientId);

    return NextResponse.json({
      success: true,
      progress,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
