import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';
import { getTierConfig, canAcceptJob, getRecommendedTier } from '@/lib/services/subscription-tier.service';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/workspace/usage
 *
 * Get workspace usage statistics and tier limits
 * - Current month job count
 * - Tier limits and remaining capacity
 * - Overage fees accrued
 * - Team member count vs seat limit
 * - Recommended tier based on usage
 *
 * Used for: Dashboard stats, upgrade prompts, job limit warnings
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN']);
    }

    // Get workspace (user's owned workspace or membership)
    const workspace = await prisma.workspace.findFirst({
      where: {
        OR: [
          { ownerId: user.id },
          { members: { some: { userId: user.id } } },
        ],
      },
      include: {
        members: true,
      },
    });

    if (!workspace) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    const tierConfig = getTierConfig(workspace.subscriptionTier);

    // Check if can accept another job
    const jobCheck = canAcceptJob(workspace.subscriptionTier, workspace.currentMonthJobs);

    // Calculate usage percentages
    const jobUsagePercent =
      tierConfig.monthlyJobLimit === 999
        ? 0 // Unlimited
        : (workspace.currentMonthJobs / tierConfig.monthlyJobLimit) * 100;

    const seatUsagePercent =
      tierConfig.seatLimit === 999
        ? 0 // Unlimited
        : (workspace.members.length / tierConfig.seatLimit) * 100;

    // Get recommendation
    const recommendation = getRecommendedTier(
      workspace.currentMonthJobs,
      workspace.members.length
    );

    // Days remaining in current period
    const daysRemaining = workspace.currentPeriodEnd
      ? Math.ceil(
          (workspace.currentPeriodEnd.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

    return NextResponse.json({
      success: true,
      workspace: {
        id: workspace.id,
        businessName: workspace.businessName,
        tier: workspace.subscriptionTier,
        status: workspace.subscriptionStatus,
      },
      usage: {
        jobs: {
          current: workspace.currentMonthJobs,
          limit: tierConfig.monthlyJobLimit === 999 ? 'Unlimited' : tierConfig.monthlyJobLimit,
          remaining:
            tierConfig.monthlyJobLimit === 999
              ? 'Unlimited'
              : tierConfig.monthlyJobLimit - workspace.currentMonthJobs,
          usagePercent: Math.round(jobUsagePercent),
        },
        seats: {
          current: workspace.members.length,
          limit: tierConfig.seatLimit === 999 ? 'Unlimited' : tierConfig.seatLimit,
          remaining:
            tierConfig.seatLimit === 999
              ? 'Unlimited'
              : tierConfig.seatLimit - workspace.members.length,
          usagePercent: Math.round(seatUsagePercent),
        },
        overageFees: {
          currentMonth: Number(workspace.totalOverageFees),
          perJobRate: tierConfig.overagePrice,
        },
      },
      limits: {
        canAcceptJob: jobCheck.allowed,
        requiresOverage: jobCheck.requiresOverage,
        overagePrice: jobCheck.overagePrice,
      },
      billing: {
        daysRemainingInPeriod: daysRemaining,
        nextBillingDate: workspace.currentPeriodEnd?.toISOString(),
      },
      recommendation: recommendation || undefined,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
