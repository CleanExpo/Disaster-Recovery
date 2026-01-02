import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError } from '@/lib/api-errors';
import { getTierConfig, calculateProration, canDowngrade } from '@/lib/services/subscription-tier.service';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import { z, ZodError } from 'zod';

export const dynamic = 'force-dynamic';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' })
  : null;

const upgradeTierSchema = z.object({
  workspaceId: z.string().cuid(),
  newTier: z.enum(['BASIC', 'PRO', 'ENTERPRISE']),
});

/**
 * POST /api/subscription/upgrade
 *
 * Upgrade or downgrade subscription tier
 * - Validates downgrade (team size, job count)
 * - Calculates proration
 * - Updates Stripe subscription
 * - Updates workspace tier and limits
 *
 * Strategic decisions:
 * - Prorated on upgrades (pay difference)
 * - Immediate on downgrades (credit to next month)
 * - Prevent downgrade if team too large
 */
export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    }

    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN']);
    }

    const body = await request.json();
    const validated = upgradeTierSchema.parse(body);

    // Get workspace with members
    const workspace = await prisma.workspace.findUnique({
      where: { id: validated.workspaceId },
      include: {
        members: true,
      },
    });

    if (!workspace) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    if (workspace.ownerId !== user.id) {
      return NextResponse.json({ error: 'Only owner can change subscription' }, { status: 403 });
    }

    // Check if downgrade is allowed
    if (validated.newTier !== workspace.subscriptionTier) {
      const downgradeCheck = canDowngrade(
        validated.newTier,
        workspace.members.length,
        workspace.currentMonthJobs
      );

      if (!downgradeCheck.allowed) {
        return NextResponse.json({
          success: false,
          error: downgradeCheck.reason,
        }, { status: 400 });
      }
    }

    const newConfig = getTierConfig(validated.newTier);

    // Update Stripe subscription
    if (workspace.stripeSubscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(workspace.stripeSubscriptionId);

      await stripe.subscriptions.update(workspace.stripeSubscriptionId, {
        items: [
          {
            id: subscription.items.data[0].id,
            price_data: {
              currency: 'aud',
              product_data: {
                name: `NRPG ${newConfig.name} Tier`,
              },
              recurring: {
                interval: 'month',
              },
              unit_amount: newConfig.monthlyPrice * 100,
            },
          },
        ],
        proration_behavior: 'always_invoice', // Charge/credit proration
      });
    }

    // Update workspace
    await prisma.workspace.update({
      where: { id: workspace.id },
      data: {
        subscriptionTier: validated.newTier,
        seatLimit: newConfig.seatLimit,
        monthlyJobLimit: newConfig.monthlyJobLimit,
        serviceRadiusKm: newConfig.serviceRadiusKm,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        workspaceId: workspace.id,
        userId: user.id,
        action: 'subscription_tier_changed',
        entityType: 'subscription',
        entityId: workspace.stripeSubscriptionId || '',
        metadata: {
          oldTier: workspace.subscriptionTier,
          newTier: validated.newTier,
          memberCount: workspace.members.length,
        },
      },
    });

    return NextResponse.json({
      success: true,
      newTier: validated.newTier,
      seatLimit: newConfig.seatLimit,
      monthlyJobLimit: newConfig.monthlyJobLimit,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
