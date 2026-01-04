/**
 * Stripe Realtime Add-On Webhook Handler
 *
 * Handles subscription lifecycle events for real-time job coordination add-on:
 * - checkout.session.completed → Activate subscription
 * - customer.subscription.created → Confirm subscription
 * - customer.subscription.updated → Update tier/status
 * - customer.subscription.deleted → Cancel subscription
 * - invoice.payment_succeeded → Confirm payment
 * - invoice.payment_failed → Handle failed payment
 */

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-11-20.acacia' })
  : null

const webhookSecret = process.env.STRIPE_REALTIME_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Only process realtime addon subscriptions
  const metadata = getEventMetadata(event)
  if (metadata?.subscriptionType !== 'realtime_addon') {
    // Not a realtime subscription, ignore
    return NextResponse.json({ received: true, skipped: 'not_realtime_addon' })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCreated(subscription)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentSucceeded(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }

      default:
        console.log(`Unhandled realtime webhook event: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Realtime webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getEventMetadata(event: Stripe.Event): Record<string, string> | null {
  const obj = event.data.object as Record<string, unknown>

  // Check session metadata
  if (obj.metadata && typeof obj.metadata === 'object') {
    return obj.metadata as Record<string, string>
  }

  // Check subscription metadata
  if (obj.subscription && typeof obj.subscription === 'object') {
    const sub = obj.subscription as { metadata?: Record<string, string> }
    if (sub.metadata) return sub.metadata
  }

  return null
}

// ============================================================================
// WEBHOOK HANDLERS
// ============================================================================

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const contractorId = session.metadata?.contractorId
  const tier = session.metadata?.tier as 'BASIC' | 'PRO' | 'ENTERPRISE'

  if (!contractorId || !tier) {
    console.error('Missing metadata in checkout session:', session.id)
    return
  }

  // Get subscription ID from session
  const subscriptionId = session.subscription as string

  // Update realtime subscription with Stripe subscription ID
  await prisma.realtimeSubscription.upsert({
    where: { contractorId },
    update: {
      stripeSubscriptionId: subscriptionId,
      tier,
      status: session.payment_status === 'paid' ? 'ACTIVE' : 'TRIAL',
    },
    create: {
      contractorId,
      stripeSubscriptionId: subscriptionId,
      tier,
      pricePerMonth: { BASIC: 49, PRO: 99, ENTERPRISE: 199 }[tier],
      status: 'TRIAL',
      trialEndsAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    },
  })

  // Get contractor for audit log
  const contractor = await prisma.contractor.findUnique({
    where: { id: contractorId },
    select: { userId: true },
  })

  if (contractor) {
    await prisma.auditLog.create({
      data: {
        action: 'REALTIME_SUBSCRIPTION_CREATED',
        entityType: 'RealtimeSubscription',
        entityId: contractorId,
        userId: contractor.userId,
        newValues: {
          tier,
          subscriptionId,
          sessionId: session.id,
        },
      },
    })
  }

  console.log(`Realtime subscription activated for contractor ${contractorId}: ${tier}`)
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const contractorId = subscription.metadata?.contractorId
  const tier = subscription.metadata?.tier as 'BASIC' | 'PRO' | 'ENTERPRISE'

  if (!contractorId) return

  const isTrialing = subscription.status === 'trialing'
  const trialEnd = subscription.trial_end
    ? new Date(subscription.trial_end * 1000)
    : null

  await prisma.realtimeSubscription.upsert({
    where: { contractorId },
    update: {
      stripeSubscriptionId: subscription.id,
      tier: tier || undefined,
      status: isTrialing ? 'TRIAL' : 'ACTIVE',
      trialEndsAt: trialEnd,
      startDate: new Date(subscription.current_period_start * 1000),
    },
    create: {
      contractorId,
      stripeSubscriptionId: subscription.id,
      tier: tier || 'BASIC',
      pricePerMonth: { BASIC: 49, PRO: 99, ENTERPRISE: 199 }[tier || 'BASIC'],
      status: isTrialing ? 'TRIAL' : 'ACTIVE',
      trialEndsAt: trialEnd,
    },
  })
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const realtimeSub = await prisma.realtimeSubscription.findFirst({
    where: { stripeSubscriptionId: subscription.id },
  })

  if (!realtimeSub) return

  // Map Stripe status to our status
  let status: 'ACTIVE' | 'TRIAL' | 'CANCELLED' | 'EXPIRED' = 'ACTIVE'
  if (subscription.status === 'trialing') {
    status = 'TRIAL'
  } else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
    status = 'CANCELLED'
  } else if (subscription.status === 'past_due') {
    status = 'ACTIVE' // Keep active during grace period
  }

  // Check for tier change from price
  const newTier = subscription.metadata?.tier as 'BASIC' | 'PRO' | 'ENTERPRISE' | undefined

  await prisma.realtimeSubscription.update({
    where: { id: realtimeSub.id },
    data: {
      status,
      tier: newTier || realtimeSub.tier,
      trialEndsAt: subscription.trial_end
        ? new Date(subscription.trial_end * 1000)
        : realtimeSub.trialEndsAt,
    },
  })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const realtimeSub = await prisma.realtimeSubscription.findFirst({
    where: { stripeSubscriptionId: subscription.id },
  })

  if (!realtimeSub) return

  await prisma.realtimeSubscription.update({
    where: { id: realtimeSub.id },
    data: {
      status: 'CANCELLED',
      endDate: new Date(),
    },
  })

  // Get contractor for audit log
  const contractor = await prisma.contractor.findUnique({
    where: { id: realtimeSub.contractorId },
    select: { userId: true },
  })

  if (contractor) {
    await prisma.auditLog.create({
      data: {
        action: 'REALTIME_SUBSCRIPTION_CANCELLED',
        entityType: 'RealtimeSubscription',
        entityId: realtimeSub.contractorId,
        userId: contractor.userId,
        oldValues: {
          tier: realtimeSub.tier,
          status: realtimeSub.status,
        },
        newValues: {
          status: 'CANCELLED',
        },
      },
    })
  }

  // TODO: Send cancellation email
  console.log(`Realtime subscription cancelled for contractor ${realtimeSub.contractorId}`)
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  if (!invoice.subscription) return

  const realtimeSub = await prisma.realtimeSubscription.findFirst({
    where: { stripeSubscriptionId: invoice.subscription as string },
  })

  if (!realtimeSub) return

  // Confirm subscription is active
  await prisma.realtimeSubscription.update({
    where: { id: realtimeSub.id },
    data: {
      status: 'ACTIVE',
    },
  })

  // TODO: Send payment confirmation email
  console.log(`Realtime payment succeeded for contractor ${realtimeSub.contractorId}`)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  if (!invoice.subscription) return

  const realtimeSub = await prisma.realtimeSubscription.findFirst({
    where: { stripeSubscriptionId: invoice.subscription as string },
  })

  if (!realtimeSub) return

  // Get contractor for audit log and email
  const contractor = await prisma.contractor.findUnique({
    where: { id: realtimeSub.contractorId },
    select: { userId: true, user: { select: { email: true, name: true } } },
  })

  if (contractor) {
    await prisma.auditLog.create({
      data: {
        action: 'REALTIME_PAYMENT_FAILED',
        entityType: 'RealtimeSubscription',
        entityId: realtimeSub.contractorId,
        userId: contractor.userId,
        metadata: {
          attemptCount: invoice.attempt_count,
          amountDue: invoice.amount_due,
          invoiceId: invoice.id,
        },
      },
    })

    // TODO: Send payment failed email
  }

  console.log(`Realtime payment failed for contractor ${realtimeSub.contractorId}, attempt ${invoice.attempt_count}`)
}
