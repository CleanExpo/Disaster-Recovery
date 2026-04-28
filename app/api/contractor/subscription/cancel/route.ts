/**
 * POST /api/contractor/subscription/cancel
 *
 * Contractor self-service subscription cancellation. Cancels the active
 * Stripe subscription, marks the local ContractorSubscription row as
 * CANCELLED, and emits a compliance event.
 *
 * Health-check audit B8 (P2, 2026-04-26). Closes the gap where contractors
 * had no proactive way to cancel — operators had to delete subscriptions
 * manually in Stripe Dashboard, which then never synced back to Prisma.
 *
 * Auth: contractor must be authenticated (JWT) and own the subscription.
 * Admins may cancel on behalf of a contractor by passing { contractorId }.
 *
 * Body:
 *   { contractorId?: string, reason?: string, atPeriodEnd?: boolean }
 *
 * Returns:
 *   200 { success, canceledAt, refundedAmount, periodEndAt? }
 *   400 invalid request
 *   401 not authenticated
 *   403 forbidden (cross-contractor without admin)
 *   404 no active subscription
 *   503 stripe not configured
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
  contractorId: z.string().min(1).optional(),
  reason: z.string().max(500).optional(),
  atPeriodEnd: z.boolean().optional(),
});

/**
 * The local Prisma row stores the Stripe subscription id inside the
 * `paymentDetails` JSON column (encrypted at rest). Parse it safely —
 * the column is `String?` so we tolerate both null and malformed JSON.
 */
function extractStripeSubscriptionId(paymentDetails: string | null): string | null {
  if (!paymentDetails) return null;
  try {
    const parsed: unknown = JSON.parse(paymentDetails);
    if (parsed && typeof parsed === 'object' && 'stripeSubscriptionId' in parsed) {
      const value = (parsed as { stripeSubscriptionId?: unknown }).stripeSubscriptionId;
      return typeof value === 'string' && value.length > 0 ? value : null;
    }
  } catch {
    // Field is not JSON — older rows may store the raw id. Treat short
    // values that look like a Stripe id as the id directly.
    if (paymentDetails.startsWith('sub_')) return paymentDetails;
  }
  return null;
}

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

    const rawBody: unknown = await request.json().catch(() => ({}));
    const parsed = BodySchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid request', issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const isAdmin = hasRole(user.role as UserRole, [UserRole.ADMIN]);
    const targetContractorId =
      isAdmin && parsed.data.contractorId ? parsed.data.contractorId : user.userId;

    // Non-admins can only cancel their own subscription.
    if (!isAdmin && parsed.data.contractorId && parsed.data.contractorId !== user.userId) {
      return NextResponse.json(
        { success: false, message: 'Forbidden — cannot cancel another contractor subscription' },
        { status: 403 },
      );
    }

    const sub = await prisma.contractorSubscription.findFirst({
      where: { contractorId: targetContractorId },
    });

    if (!sub) {
      return NextResponse.json(
        { success: false, message: 'No subscription found' },
        { status: 404 },
      );
    }

    // Idempotent: already cancelled. Return existing canceledAt without
    // re-hitting Stripe.
    if (sub.status === 'CANCELLED') {
      return NextResponse.json({
        success: true,
        canceledAt: sub.cancelledAt ? sub.cancelledAt.toISOString() : null,
        refundedAmount: 0,
        alreadyCancelled: true,
      });
    }

    const stripeSubscriptionId = extractStripeSubscriptionId(sub.paymentDetails);
    const dayBucket = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const atPeriodEnd = parsed.data.atPeriodEnd ?? false;

    let periodEnd: Date | null = null;

    if (stripeSubscriptionId) {
      if (atPeriodEnd) {
        // Soft-cancel: keep the subscription active until the end of the
        // current billing period. Stripe will fire customer.subscription
        // .deleted at period end, picked up by the existing webhook.
        const updated = await stripe.subscriptions.update(
          stripeSubscriptionId,
          { cancel_at_period_end: true },
          { idempotencyKey: `cancel-${sub.id}-${dayBucket}` },
        );
        if (updated.current_period_end) {
          periodEnd = new Date(updated.current_period_end * 1000);
        }
      } else {
        // Immediate cancellation. No proration / refund — DR's
        // contractor subs are no-refund mid-cycle (see
        // .claude/rules/business-rules.md §2). Refunds, if owed, are
        // a separate operator workflow via /api/payments/refund.
        const cancelled = await stripe.subscriptions.cancel(stripeSubscriptionId, {
          idempotencyKey: `cancel-${sub.id}-${dayBucket}`,
        });
        if (cancelled.canceled_at) {
          // Stripe returns canceled_at as a unix-second timestamp.
          // We use our own `now` for the DB write below so the value
          // matches what the caller sees.
        }
      }
    }

    const now = new Date();

    await prisma.contractorSubscription.update({
      where: { id: sub.id },
      data: {
        status: 'CANCELLED',
        cancelledAt: now,
        ...(periodEnd ? { endDate: periodEnd } : {}),
      },
    });

    await logComplianceEvent({
      eventType: 'payment_subscription_cancel',
      correlationId: targetContractorId,
      correlationType: 'contractor_membership',
      entityType: 'contractor',
      entityIdentifier: targetContractorId,
      metadata: {
        action: 'subscription_cancel',
        at_period_end: atPeriodEnd,
        stripe_subscription_id: stripeSubscriptionId,
        reason: parsed.data.reason ?? null,
        cancelled_by: user.userId,
        cancelled_by_role: user.role,
        request_id: log.requestId,
      },
    });

    log.info('contractor subscription cancelled', {
      contractorId: targetContractorId,
      stripeSubscriptionId,
      atPeriodEnd,
    });

    return NextResponse.json({
      success: true,
      canceledAt: now.toISOString(),
      refundedAmount: 0,
      ...(periodEnd ? { periodEndAt: periodEnd.toISOString() } : {}),
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
