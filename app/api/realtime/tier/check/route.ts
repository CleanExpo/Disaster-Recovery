import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { TierAccess, RealtimeTier } from '@/lib/supabase/types'

// GET - Check tier access for a job
// Client inherits the assigned contractor's tier
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get('jobId')

    if (!jobId) {
      return NextResponse.json({ error: 'jobId is required' }, { status: 400 })
    }

    // Check if user is a contractor (has their own subscription)
    const contractor = await prisma.contractor.findFirst({
      where: { userId: session.user.id },
      select: { id: true },
    })

    let tier: RealtimeTier | null = null
    let isBetaAccess = false

    if (contractor) {
      // User is a contractor - check their own subscription
      const subscription = await prisma.realtimeSubscription.findUnique({
        where: { contractorId: contractor.id },
        select: {
          tier: true,
          status: true,
          trialEndsAt: true,
        },
      })

      if (subscription) {
        const isActive =
          subscription.status === 'ACTIVE' ||
          (subscription.status === 'TRIAL' &&
            subscription.trialEndsAt &&
            subscription.trialEndsAt > new Date())

        if (isActive) {
          tier = subscription.tier as RealtimeTier
        }
      }

      // Check for beta tier override (grants access even without subscription)
      if (!tier) {
        const betaEnrollment = await prisma.betaEnrollment.findFirst({
          where: {
            contractorId: contractor.id,
            status: 'ACTIVE',
            tierOverride: { not: null },
            program: {
              isActive: true,
              startDate: { lte: new Date() },
              endDate: { gte: new Date() },
            },
          },
          select: {
            tierOverride: true,
          },
        })

        if (betaEnrollment?.tierOverride) {
          tier = betaEnrollment.tierOverride as RealtimeTier
          isBetaAccess = true
        }
      }
    } else {
      // User is a client - check the assigned contractor's subscription
      const job = await prisma.serviceRequest.findFirst({
        where: {
          id: jobId,
          clientId: session.user.id,
        },
        select: {
          id: true,
          // When contractor assignment is implemented:
          // assignedContractorId: true,
        },
      })

      if (!job) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 })
      }

      // TODO: When contractor assignment is implemented, look up their subscription
      // For now, check if there's any contractor working on this job via bookings
      const booking = await prisma.booking.findFirst({
        where: {
          serviceRequestId: jobId,
          status: { in: ['CONFIRMED', 'IN_PROGRESS'] },
        },
        select: {
          contractorId: true,
        },
      })

      if (booking) {
        const subscription = await prisma.realtimeSubscription.findUnique({
          where: { contractorId: booking.contractorId },
          select: {
            tier: true,
            status: true,
            trialEndsAt: true,
          },
        })

        if (subscription) {
          const isActive =
            subscription.status === 'ACTIVE' ||
            (subscription.status === 'TRIAL' &&
              subscription.trialEndsAt &&
              subscription.trialEndsAt > new Date())

          if (isActive) {
            tier = subscription.tier as RealtimeTier
          }
        }
      }
    }

    // Calculate feature access based on tier
    const tierOrder: Record<RealtimeTier, number> = {
      BASIC: 1,
      PRO: 2,
      ENTERPRISE: 3,
    }

    const tierLevel = tier ? tierOrder[tier] : 0

    const access: TierAccess = {
      tier,
      hasLiveEta: tierLevel >= 2, // PRO+
      hasMessaging: tierLevel >= 2, // PRO+
      hasGpsTracking: tierLevel >= 3, // ENTERPRISE only
      isBetaAccess,
    }

    return NextResponse.json(access)
  } catch (error) {
    console.error('Error checking tier:', error)
    return NextResponse.json({ error: 'Failed to check tier access' }, { status: 500 })
  }
}
