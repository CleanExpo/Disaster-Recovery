import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';
import { checkContractorEligibility, getEligibilityMessage } from '@/lib/services/contractor-eligibility.service';

export const dynamic = 'force-dynamic';

/**
 * GET /api/contractor/eligibility
 *
 * Single Source of Truth for contractor "Ready for Dispatch" status
 *
 * Returns:
 * - isEligible: All requirements complete
 * - readyForDispatch: Eligible OR pending verification only
 * - completionPercentage: Overall progress (0-100)
 * - checks: Detailed status of each requirement
 * - incompleteRequirements: List of what's missing
 * - nextAction: Where to go next
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN']);
    }

    // Check eligibility
    const eligibility = await checkContractorEligibility(user.id);
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
