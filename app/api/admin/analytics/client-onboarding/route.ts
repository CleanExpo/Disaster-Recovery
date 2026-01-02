import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';
import { getClientOnboardingFunnelMetrics } from '@/lib/services/client-onboarding-analytics.service';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/analytics/client-onboarding
 *
 * Returns comprehensive client onboarding funnel metrics
 * - Conversion rates per phase
 * - Drop-off analysis
 * - Time-to-complete metrics
 * - Tier distribution
 * - Flow variant performance
 * - Bottleneck identification
 *
 * Admin/Super Admin only
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
    const metrics = await getClientOnboardingFunnelMetrics();

    return NextResponse.json({
      success: true,
      metrics,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
