import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { SDPOfferEvent, SDPAnswerEvent, ICECandidateEvent, CallType } from '@/lib/supabase/types'

// Lazy initialization to avoid build-time errors
let supabase: SupabaseClient | null = null

function getSupabase(): SupabaseClient {
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      throw new Error('Supabase configuration missing')
    }
    supabase = createClient(url, key)
  }
  return supabase
}

interface RouteParams {
  params: Promise<{ id: string }>
}

type SignalType = 'offer' | 'answer' | 'ice-candidate'

interface SignalPayload {
  callId: string
  type: SignalType
  sdp?: RTCSessionDescriptionInit
  candidate?: RTCIceCandidateInit
}

// Helper function to check tier access
async function checkTierAccess(userId: string, jobId: string) {
  const contractor = await prisma.contractor.findFirst({
    where: { userId },
    select: { id: true },
  })

  let tier: string | null = null

  if (contractor) {
    const subscription = await prisma.realtimeSubscription.findUnique({
      where: { contractorId: contractor.id },
      select: { tier: true, status: true, trialEndsAt: true },
    })

    if (
      subscription &&
      (subscription.status === 'ACTIVE' ||
        (subscription.status === 'TRIAL' &&
          subscription.trialEndsAt &&
          subscription.trialEndsAt > new Date()))
    ) {
      tier = subscription.tier
    }
  } else {
    // Client - check contractor's tier via booking
    const booking = await prisma.booking.findFirst({
      where: {
        serviceRequestId: jobId,
        status: { in: ['CONFIRMED', 'IN_PROGRESS'] },
      },
      select: { contractorId: true },
    })

    if (booking) {
      const subscription = await prisma.realtimeSubscription.findUnique({
        where: { contractorId: booking.contractorId },
        select: { tier: true, status: true, trialEndsAt: true },
      })

      if (
        subscription &&
        (subscription.status === 'ACTIVE' ||
          (subscription.status === 'TRIAL' &&
            subscription.trialEndsAt &&
            subscription.trialEndsAt > new Date()))
      ) {
        tier = subscription.tier
      }
    }
  }

  const tierOrder: Record<string, number> = { BASIC: 1, PRO: 2, ENTERPRISE: 3 }
  const tierLevel = tier ? tierOrder[tier] || 0 : 0

  return {
    tier,
    hasVideoCalls: tierLevel >= 3, // ENTERPRISE only
  }
}

// POST - Relay SDP offer/answer or ICE candidate
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const { id: jobId } = await params
    const body = await request.json()
    const { callId, type, sdp, candidate } = body as SignalPayload

    if (!callId || !type) {
      return NextResponse.json({ error: 'callId and type are required' }, { status: 400 })
    }

    if (!['offer', 'answer', 'ice-candidate'].includes(type)) {
      return NextResponse.json({ error: 'Invalid signal type' }, { status: 400 })
    }

    // Check tier access (ENTERPRISE only)
    const tierAccess = await checkTierAccess(session.user.id, jobId)
    if (!tierAccess.hasVideoCalls) {
      return NextResponse.json(
        {
          error: 'Video/voice calls require ENTERPRISE tier',
          upgradeRequired: true,
        },
        { status: 403 }
      )
    }

    // Find the call and verify user is part of it
    const call = await prisma.jobCall.findFirst({
      where: {
        id: callId,
        jobId,
      },
    })

    if (!call) {
      return NextResponse.json({ error: 'Call not found' }, { status: 404 })
    }

    if (call.initiatorId !== session.user.id && call.receiverId !== session.user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Determine who to send the signal to
    const isInitiator = call.initiatorId === session.user.id
    const targetId = isInitiator ? call.receiverId : call.initiatorId
    const targetType = isInitiator ? call.receiverType : call.initiatorType
    const senderType = isInitiator ? call.initiatorType : call.receiverType

    // Build the appropriate event
    const baseEvent = {
      jobId,
      callId: call.id,
      callType: call.callType as CallType,
      senderId: session.user.id,
      senderType: senderType as 'client' | 'contractor',
      timestamp: new Date().toISOString(),
    }

    let signalEvent: SDPOfferEvent | SDPAnswerEvent | ICECandidateEvent

    switch (type) {
      case 'offer':
        if (!sdp) {
          return NextResponse.json({ error: 'SDP is required for offer' }, { status: 400 })
        }
        signalEvent = {
          ...baseEvent,
          type: 'SDP_OFFER',
          sdp,
        }
        break

      case 'answer':
        if (!sdp) {
          return NextResponse.json({ error: 'SDP is required for answer' }, { status: 400 })
        }
        signalEvent = {
          ...baseEvent,
          type: 'SDP_ANSWER',
          sdp,
        }
        break

      case 'ice-candidate':
        if (!candidate) {
          return NextResponse.json({ error: 'Candidate is required for ICE' }, { status: 400 })
        }
        signalEvent = {
          ...baseEvent,
          type: 'ICE_CANDIDATE',
          candidate,
        }
        break

      default:
        return NextResponse.json({ error: 'Invalid signal type' }, { status: 400 })
    }

    // Send via Supabase Realtime to the target user
    const channelName = targetType === 'client' ? 'jobs:client' : 'jobs:contractor'
    await getSupabase().channel(channelName).send({
      type: 'broadcast',
      event: `${targetType}:${targetId}`,
      payload: signalEvent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error relaying signal:', error)
    return NextResponse.json({ error: 'Failed to relay signal' }, { status: 500 })
  }
}
