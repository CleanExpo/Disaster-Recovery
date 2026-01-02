/**
 * Stripe Subscription Webhook Handler
 *
 * Handles all subscription lifecycle events:
 * - customer.subscription.created → Activate workspace
 * - customer.subscription.updated → Update tier/status
 * - invoice.payment_succeeded → Extend period
 * - invoice.payment_failed → Start dunning cycle (3-day retry)
 * - customer.subscription.deleted → Cancel workspace
 *
 * Strategic decision: Smart retry + 3-day grace period
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' })
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

// ============================================================================
// WEBHOOK HANDLERS
// ============================================================================

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const workspace = await prisma.workspace.findUnique({
    where: { stripeCustomerId: subscription.customer as string },
  });

  if (!workspace) return;

  await prisma.workspace.update({
    where: { id: workspace.id },
    data: {
      stripeSubscriptionId: subscription.id,
      subscriptionStatus: 'ACTIVE',
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });

  // Audit log
  await prisma.auditLog.create({
    data: {
      workspaceId: workspace.id,
      action: 'subscription_created',
      entityType: 'subscription',
      entityId: subscription.id,
      metadata: {
        tier: workspace.subscriptionTier,
        amount: subscription.items.data[0]?.price.unit_amount,
      },
    },
  });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const workspace = await prisma.workspace.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!workspace) return;

  await prisma.workspace.update({
    where: { id: workspace.id },
    data: {
      subscriptionStatus: subscription.status === 'active' ? 'ACTIVE' : 'PAST_DUE',
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const workspace = await prisma.workspace.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!workspace) return;

  await prisma.workspace.update({
    where: { id: workspace.id },
    data: {
      subscriptionStatus: 'CANCELLED',
      cancelledAt: new Date(),
      isActive: false,
    },
  });

  // Audit log
  await prisma.auditLog.create({
    data: {
      workspaceId: workspace.id,
      action: 'subscription_cancelled',
      entityType: 'subscription',
      entityId: subscription.id,
    },
  });
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const workspace = await prisma.workspace.findUnique({
    where: { stripeCustomerId: invoice.customer as string },
  });

  if (!workspace) return;

  // Update subscription status to active
  await prisma.workspace.update({
    where: { id: workspace.id },
    data: {
      subscriptionStatus: 'ACTIVE',
    },
  });

  // Send payment confirmation email (non-blocking)
  // await sendPaymentConfirmationEmail(workspace);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const workspace = await prisma.workspace.findUnique({
    where: { stripeCustomerId: invoice.customer as string },
  });

  if (!workspace) return;

  // Strategic decision: Smart retry + 3-day grace
  // Stripe handles auto-retry (Day 1, 2, 3)
  // We just update status and send warning emails

  await prisma.workspace.update({
    where: { id: workspace.id },
    data: {
      subscriptionStatus: 'PAST_DUE',
    },
  });

  // Send payment failed email (non-blocking)
  // await sendPaymentFailedEmail(workspace, invoice.attempt_count);

  // Audit log
  await prisma.auditLog.create({
    data: {
      workspaceId: workspace.id,
      action: 'payment_failed',
      entityType: 'subscription',
      entityId: invoice.id,
      metadata: {
        attemptCount: invoice.attempt_count,
        amountDue: invoice.amount_due,
      },
    },
  });
}
