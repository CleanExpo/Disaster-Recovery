import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Realtime tier pricing
const TIER_PRICING = {
  BASIC: 49,      // +$49/month - Status updates, notifications
  PRO: 99,        // +$99/month - + Live ETA, in-app messaging
  ENTERPRISE: 199 // +$199/month - + GPS tracking, video/voice
}

// Get current subscription
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { contractor: true },
    })

    if (!user?.contractor) {
      return NextResponse.json(
        { error: 'Contractor not found' },
        { status: 403 }
      )
    }

    const subscription = await prisma.realtimeSubscription.findUnique({
      where: { contractorId: user.contractor.id },
    })

    return NextResponse.json({
      subscription,
      pricing: TIER_PRICING,
      hasActiveSubscription: subscription?.status === 'ACTIVE' || subscription?.status === 'TRIAL',
    })
  } catch (error) {
    console.error('Error fetching realtime subscription:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    )
  }
}

// Subscribe to realtime tier
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { tier } = body as { tier: 'BASIC' | 'PRO' | 'ENTERPRISE' }

    if (!tier || !TIER_PRICING[tier]) {
      return NextResponse.json(
        { error: 'Invalid tier' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { contractor: true },
    })

    if (!user?.contractor) {
      return NextResponse.json(
        { error: 'Contractor not found' },
        { status: 403 }
      )
    }

    // Check for existing subscription
    const existing = await prisma.realtimeSubscription.findUnique({
      where: { contractorId: user.contractor.id },
    })

    // 3-month free trial for new subscribers
    const trialDuration = 90 * 24 * 60 * 60 * 1000 // 90 days in ms
    const trialEndsAt = new Date(Date.now() + trialDuration)

    let subscription

    if (existing) {
      // Upgrade/downgrade existing subscription
      subscription = await prisma.realtimeSubscription.update({
        where: { contractorId: user.contractor.id },
        data: {
          tier,
          pricePerMonth: TIER_PRICING[tier],
          status: existing.status === 'TRIAL' ? 'TRIAL' : 'ACTIVE',
        },
      })
    } else {
      // Create new subscription with trial
      subscription = await prisma.realtimeSubscription.create({
        data: {
          contractorId: user.contractor.id,
          tier,
          pricePerMonth: TIER_PRICING[tier],
          status: 'TRIAL',
          trialEndsAt,
        },
      })
    }

    // TODO: Create Stripe subscription for billing after trial
    // This would integrate with existing Stripe infrastructure

    return NextResponse.json({
      subscription,
      message: existing
        ? `Subscription updated to ${tier}`
        : `Started 3-month free trial of ${tier} tier`,
    })
  } catch (error) {
    console.error('Error creating realtime subscription:', error)
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    )
  }
}

// Cancel subscription
export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { contractor: true },
    })

    if (!user?.contractor) {
      return NextResponse.json(
        { error: 'Contractor not found' },
        { status: 403 }
      )
    }

    const subscription = await prisma.realtimeSubscription.update({
      where: { contractorId: user.contractor.id },
      data: {
        status: 'CANCELLED',
        endDate: new Date(),
      },
    })

    // TODO: Cancel Stripe subscription

    return NextResponse.json({
      subscription,
      message: 'Subscription cancelled',
    })
  } catch (error) {
    console.error('Error cancelling realtime subscription:', error)
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    )
  }
}
