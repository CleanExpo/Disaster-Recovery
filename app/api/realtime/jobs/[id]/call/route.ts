import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { CallInitiatedEvent, CallAcceptedEvent, CallRejectedEvent, CallEndedEvent, CallType } from '@/lib/supabase/types'

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

// GET - Get active call for a job
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const { id: jobId } = await params

    // Find active call for this job
    const activeCall = await prisma.jobCall.findFirst({
      where: {
        jobId,
        status: { in: ['initiated', 'ringing', 'active'] },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ call: activeCall })
  } catch (error) {
    console.error('Error fetching call:', error)
    return NextResponse.json({ error: 'Failed to fetch call' }, { status: 500 })
  }
}

// POST - Initiate a new call
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const { id: jobId } = await params
    const body = await request.json()
    const { callType } = body as { callType: CallType }

    if (!callType || !['video', 'voice'].includes(callType)) {
      return NextResponse.json({ error: 'Invalid call type' }, { status: 400 })
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

    // Determine user type and get receiver
    const job = await prisma.serviceRequest.findFirst({
      where: {
        id: jobId,
        clientId: session.user.id,
      },
      select: { id: true, clientId: true },
    })

    const booking = await prisma.booking.findFirst({
      where: {
        serviceRequestId: jobId,
        contractor: { userId: session.user.id },
      },
      select: {
        contractorId: true,
        contractor: { select: { userId: true } },
        serviceRequest: { select: { clientId: true } },
      },
    })

    let initiatorType: 'client' | 'contractor'
    let initiatorId: string
    let receiverId: string
    let receiverType: 'client' | 'contractor'

    if (job) {
      // User is the client
      initiatorType = 'client'
      initiatorId = session.user.id

      // Find contractor via booking
      const activeBooking = await prisma.booking.findFirst({
        where: {
          serviceRequestId: jobId,
          status: { in: ['CONFIRMED', 'IN_PROGRESS'] },
        },
        select: {
          contractor: { select: { userId: true } },
        },
      })

      if (!activeBooking) {
        return NextResponse.json({ error: 'No contractor assigned to this job' }, { status: 400 })
      }

      receiverId = activeBooking.contractor.userId
      receiverType = 'contractor'
    } else if (booking) {
      // User is the contractor
      initiatorType = 'contractor'
      initiatorId = session.user.id
      receiverId = booking.serviceRequest.clientId
      receiverType = 'client'
    } else {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Check if there's already an active call
    const existingCall = await prisma.jobCall.findFirst({
      where: {
        jobId,
        status: { in: ['initiated', 'ringing', 'active'] },
      },
    })

    if (existingCall) {
      return NextResponse.json({ error: 'A call is already in progress for this job' }, { status: 409 })
    }

    // Create the call record
    const call = await prisma.jobCall.create({
      data: {
        jobId,
        initiatorId,
        initiatorType,
        receiverId,
        receiverType,
        callType,
        status: 'initiated',
      },
    })

    // Broadcast call initiated event to receiver
    const callEvent: CallInitiatedEvent = {
      type: 'CALL_INITIATED',
      jobId,
      callId: call.id,
      callType,
      senderId: initiatorId,
      senderType: initiatorType,
      receiverId,
      receiverType,
      timestamp: new Date().toISOString(),
    }

    const channelName = receiverType === 'client' ? 'jobs:client' : 'jobs:contractor'
    await getSupabase().channel(channelName).send({
      type: 'broadcast',
      event: `${receiverType}:${receiverId}`,
      payload: callEvent,
    })

    return NextResponse.json({ call })
  } catch (error) {
    console.error('Error initiating call:', error)
    return NextResponse.json({ error: 'Failed to initiate call' }, { status: 500 })
  }
}

// PATCH - Accept, reject, or end a call
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const { id: jobId } = await params
    const body = await request.json()
    const { callId, action, reason } = body as { callId: string; action: 'accept' | 'reject' | 'end'; reason?: string }

    if (!callId || !action || !['accept', 'reject', 'end'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Find the call
    const call = await prisma.jobCall.findFirst({
      where: {
        id: callId,
        jobId,
      },
    })

    if (!call) {
      return NextResponse.json({ error: 'Call not found' }, { status: 404 })
    }

    // Verify user is part of this call
    if (call.initiatorId !== session.user.id && call.receiverId !== session.user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    let newStatus: string
    let eventType: 'CALL_ACCEPTED' | 'CALL_REJECTED' | 'CALL_ENDED'
    const now = new Date()

    switch (action) {
      case 'accept':
        if (call.status !== 'initiated' && call.status !== 'ringing') {
          return NextResponse.json({ error: 'Call cannot be accepted' }, { status: 400 })
        }
        newStatus = 'active'
        eventType = 'CALL_ACCEPTED'
        break
      case 'reject':
        if (call.status !== 'initiated' && call.status !== 'ringing') {
          return NextResponse.json({ error: 'Call cannot be rejected' }, { status: 400 })
        }
        newStatus = 'rejected'
        eventType = 'CALL_REJECTED'
        break
      case 'end':
        if (call.status !== 'active') {
          return NextResponse.json({ error: 'Call is not active' }, { status: 400 })
        }
        newStatus = 'ended'
        eventType = 'CALL_ENDED'
        break
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    // Calculate duration if ending
    let duration: number | undefined
    if (action === 'end' && call.startedAt) {
      duration = Math.floor((now.getTime() - call.startedAt.getTime()) / 1000)
    }

    // Update call record
    const updatedCall = await prisma.jobCall.update({
      where: { id: callId },
      data: {
        status: newStatus,
        ...(action === 'accept' && { startedAt: now }),
        ...(action === 'end' && { endedAt: now, duration }),
      },
    })

    // Determine who to notify (the other party)
    const isInitiator = call.initiatorId === session.user.id
    const targetId = isInitiator ? call.receiverId : call.initiatorId
    const targetType = isInitiator ? call.receiverType : call.initiatorType
    const senderType = isInitiator ? call.initiatorType : call.receiverType

    // Build and send event
    const baseEvent = {
      jobId,
      callId: call.id,
      callType: call.callType as CallType,
      senderId: session.user.id,
      senderType: senderType as 'client' | 'contractor',
      timestamp: now.toISOString(),
    }

    let callEvent: CallAcceptedEvent | CallRejectedEvent | CallEndedEvent

    switch (eventType) {
      case 'CALL_ACCEPTED':
        callEvent = { ...baseEvent, type: 'CALL_ACCEPTED' }
        break
      case 'CALL_REJECTED':
        callEvent = { ...baseEvent, type: 'CALL_REJECTED', reason }
        break
      case 'CALL_ENDED':
        callEvent = { ...baseEvent, type: 'CALL_ENDED', duration, endedBy: session.user.id }
        break
    }

    const channelName = targetType === 'client' ? 'jobs:client' : 'jobs:contractor'
    await getSupabase().channel(channelName).send({
      type: 'broadcast',
      event: `${targetType}:${targetId}`,
      payload: callEvent,
    })

    return NextResponse.json({ call: updatedCall })
  } catch (error) {
    console.error('Error updating call:', error)
    return NextResponse.json({ error: 'Failed to update call' }, { status: 500 })
  }
}
