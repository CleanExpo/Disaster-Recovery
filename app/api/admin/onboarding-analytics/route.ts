import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';
import { getOnboardingFunnelMetrics } from '@/lib/services/onboarding-analytics.service';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/onboarding-analytics
 *
 * Returns onboarding funnel metrics for admin dashboard
 * - Conversion rates per step
 * - Drop-off analysis
 * - Time-to-complete metrics
 * - Bottleneck identification
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate and check admin role
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    // Get funnel metrics
    const metrics = await getOnboardingFunnelMetrics();

    return NextResponse.json({
      success: true,
      metrics,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
