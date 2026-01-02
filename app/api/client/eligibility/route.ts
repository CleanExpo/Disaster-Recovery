import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';
import { checkClientEligibility, getEligibilityMessage } from '@/lib/services/client-eligibility.service';

export const dynamic = 'force-dynamic';

/**
 * GET /api/client/eligibility
 *
 * Check if client is eligible to create service requests
 * Returns detailed status of all onboarding requirements
 *
 * Minimum requirements for service requests:
 * 1. Profile complete
 * 2. Service preferences set
 * 3. Property added
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

    // Check eligibility
    const eligibility = await checkClientEligibility(user.id);
    const message = getEligibilityMessage(eligibility);

    return NextResponse.json({
      success: true,
      ...eligibility,
      message,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
