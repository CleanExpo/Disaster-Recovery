/**
 * POST /api/contractor/subscription/cancel
 *
 * Contractor self-service subscription cancellation. Cancels the active
 * Stripe subscription, marks the local ContractorSubscription row as
 * CANCELLED, and emits a compliance event.
 *
 * Health-check audit B8 (P2, 2026-04-26). Closes the gap where
 * src/lib/stripe.ts had a TODO for cancellation handling but no actual
 * endpoint existed — operators had to delete subscriptions manually in
 * Stripe Dashboard, which then never synced back to Prisma.
 *
 * Auth: contractor must be authenticated (JWT) and own the subscription.
 * Admins may cancel on behalf of a contractor by passing { contractorId }
 * in the body.
 *
 * Returns:
 *   200 { success: true, cancelledAt: ISO, periodEndAt: ISO }
 *   401 { success: false, message: 'Authentication required' }
 *   403 { success: false, message: 'Forbidden' }
 *   404 { success: false, message: 'No active subscription' }
 *   503 { success: false, message: 'Stripe not configured' }
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const BodySchema = z.object({
  // Optional — admin only. Contractor self-service uses the auth token.
  contractorId: z.string().uuid().optional(),
  // Optional reason — surfaces in the compliance audit trail.
  reason: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractor/subscription/cancel' });

  if (!stripe) {
    return NextResponse.json({ success: false, message: 'Stripe not configured' }, { status: 503 });
  }

  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 },
      );
    }

    const body = await request.json().catch(() => ({}));
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid request', issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const isAdmin = hasRole(user.role as UserRole, [UserRole.ADMIN]);
    const targetContractorId =
      isAdmin && parsed.data.contractorId ? parsed.data.contractorId : user.userId;

    // Non-admins can only cancel their own.
    if (!isAdmin && parsed.data.contractorId && parsed.data.contractorId !== user.userId) {
      return NextResponse.json(
        { success: false, message: 'Forbidden — cannot cancel another contractor’s subscription' },
        { status: 403 },
      );
    }

    // Look up the active subscription record locally. The Prisma row holds
    // the Stripe subscription ID; that's the ID we cancel against.
    const sub = await prisma.contractorSubscription.findFirst({
      where: { contractorId: targetContractorId, status: 'ACTIVE' },
    });
    if (!sub) {
      return NextResponse.json(
        { success: false, message: 'No active subscription found' },
        { status: 404 },
      );
    }

    // The Stripe subscription ID is stored in the `stripeSubscriptionId`
    // column (per the contractorSubscription Prisma model). If absent, the
    // local record is orphaned — treat as already-cancelled.
    const stripeSubscriptionId = (sub as unknown as { stripeSubscriptionId?: string })
      .stripeSubscriptionId;

    let stripeResult: { current_period_end?: number } | null = null;
    if (stripeSubscriptionId) {
      // Cancel at period end (don't refund mid-cycle). Stripe will fire
      // customer.subscription.deleted at period end which the existing
      // webhook handler picks up; we additionally write the local
      // CANCELLED state now so the contractor sees it immediately.
      stripeResult = await stripe.subscriptions.update(stripeSubscriptionId, {
        cancel_at_period_end: true,
      });
    }

    const now = new Date();
    const periodEnd = stripeResult?.current_period_end
      ? new Date(stripeResult.current_period_end * 1000)
      : null;

    await prisma.contractorSubscription.update({
      where: { id: sub.id },
      data: {
        status: 'CANCELLED',
        cancelledAt: now,
        ...(periodEnd ? { endDate: periodEnd } : {}),
      },
    });

    await logComplianceEvent({
      eventType: 'contractor_dispatched', // closest existing type; consider adding 'contractor_subscription_cancelled' in a follow-up
      correlationId: targetContractorId,
      correlationType: 'contractor_membership',
      entityType: 'contractor',
      entityIdentifier: targetContractorId,
      metadata: {
        action: 'subscription_cancelled',
        stripe_subscription_id: stripeSubscriptionId ?? null,
        reason: parsed.data.reason ?? null,
        cancelled_by: user.userId,
        cancelled_by_role: user.role,
        request_id: log.requestId,
      },
    });

    log.info('subscription cancelled', {
      contractorId: targetContractorId,
      stripeSubscriptionId: stripeSubscriptionId ?? null,
    });

    return NextResponse.json({
      success: true,
      cancelledAt: now.toISOString(),
      periodEndAt: periodEnd?.toISOString() ?? null,
    });
  } catch (err) {
    log.error('subscription cancel failed', {
      error: err instanceof Error ? err.message : String(err),
    });
    captureException(err, {
      tags: { route: '/api/contractor/subscription/cancel' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json(
      { success: false, message: 'Cancellation failed. Contact support.' },
      { status: 500 },
    );
  }
}
