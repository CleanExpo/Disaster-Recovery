import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
    })
  : null

// POST - Create Stripe billing portal session
export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      )
    }

    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    // Get user with contractor and subscription
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: {
        contractor: {
          include: {
            realtimeSubscription: true,
          },
        },
      },
    })

    if (!user?.contractor) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 403 }
      )
    }

    // Must have a Stripe customer ID
    if (!user.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No billing account found. Please subscribe first.' },
        { status: 400 }
      )
    }

    // Create billing portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL}/dashboard/contractor/realtime/pricing`,
    })

    // Log portal access for audit
    await prisma.auditLog.create({
      data: {
        action: 'REALTIME_BILLING_PORTAL_ACCESSED',
        entityType: 'RealtimeSubscription',
        entityId: user.contractor.id,
        userId: user.id,
        metadata: {
          subscriptionTier: user.contractor.realtimeSubscription?.tier,
          subscriptionStatus: user.contractor.realtimeSubscription?.status,
        },
      },
    })

    return NextResponse.json({
      portalUrl: portalSession.url,
    })
  } catch (error) {
    console.error('Error creating billing portal session:', error)
    return NextResponse.json(
      { error: 'Failed to create billing portal session' },
      { status: 500 }
    )
  }
}
