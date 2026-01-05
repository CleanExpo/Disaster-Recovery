import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { MessageSentEvent, MessageReadEvent, ChatMessage } from '@/lib/supabase/types'

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

// GET - Fetch message history for a job
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const { id: jobId } = await params
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const before = searchParams.get('before') // cursor for pagination

    // Verify user is party to this job
    const job = await prisma.serviceRequest.findFirst({
      where: {
        id: jobId,
        clientId: session.user.id,
      },
      select: { id: true, clientId: true },
    })

    // Also check if user is contractor via booking
    const booking = await prisma.booking.findFirst({
      where: {
        serviceRequestId: jobId,
        contractor: { userId: session.user.id },
      },
      select: { contractorId: true },
    })

    if (!job && !booking) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Check tier access (PRO+ only)
    const tierAccess = await checkTierAccess(session.user.id, jobId)
    if (!tierAccess.hasMessaging) {
      return NextResponse.json(
        {
          error: 'Messaging requires PRO tier or higher',
          upgradeRequired: true,
          currentTier: tierAccess.tier,
        },
        { status: 403 }
      )
    }

    // Fetch messages
    const messages = await prisma.jobMessage.findMany({
      where: {
        jobId,
        ...(before ? { createdAt: { lt: new Date(before) } } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    // Mark messages as read if user is the receiver
    const unreadMessages = messages
      .filter((m: { isRead: boolean; receiverId: string }) => !m.isRead && m.receiverId === session.user.id)
    const unreadMessageIds = unreadMessages.map((m: { id: string }) => m.id)

    if (unreadMessageIds.length > 0) {
      await prisma.jobMessage.updateMany({
        where: { id: { in: unreadMessageIds } },
        data: { isRead: true, readAt: new Date() },
      })

      // Broadcast MESSAGE_READ events to senders
      const senderMap = new Map<string, string>()
      unreadMessages.forEach((m: { senderId: string; senderType: string }) => {
        senderMap.set(m.senderId, m.senderType)
      })

      for (const [senderId, senderType] of senderMap.entries()) {
        const readEvent: MessageReadEvent = {
          type: 'MESSAGE_READ',
          jobId,
          messageId: unreadMessageIds[0], // First message ID as reference
          readBy: session.user.id,
          timestamp: new Date().toISOString(),
        }

        const channelName = senderType === 'client' ? 'jobs:client' : 'jobs:contractor'
        await getSupabase().channel(channelName).send({
          type: 'broadcast',
          event: `${senderType}:${senderId}`,
          payload: readEvent,
        })
      }
    }

    const formattedMessages: ChatMessage[] = messages.map((m: {
      id: string
      jobId: string
      senderId: string
      senderType: string
      content: string
      isRead: boolean
      createdAt: Date
    }) => ({
      id: m.id,
      jobId: m.jobId,
      senderId: m.senderId,
      senderType: m.senderType as 'client' | 'contractor',
      content: m.content,
      isRead: m.isRead,
      createdAt: m.createdAt.toISOString(),
    }))

    return NextResponse.json({
      messages: formattedMessages.reverse(), // Return in chronological order
      hasMore: messages.length === limit,
      nextCursor: messages.length > 0 ? messages[messages.length - 1].createdAt.toISOString() : null,
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

// POST - Send a new message
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const { id: jobId } = await params
    const body = await request.json()
    const { content } = body

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 })
    }

    // Sanitise content (basic XSS prevention)
    const sanitisedContent = content
      .trim()
      .slice(0, 2000) // Max 2000 characters
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

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

    let senderType: 'client' | 'contractor'
    let senderId: string
    let receiverId: string
    let receiverType: 'client' | 'contractor'

    if (job) {
      // User is the client
      senderType = 'client'
      senderId = session.user.id

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
      senderType = 'contractor'
      senderId = session.user.id
      receiverId = booking.serviceRequest.clientId
      receiverType = 'client'
    } else {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Check tier access
    const tierAccess = await checkTierAccess(session.user.id, jobId)
    if (!tierAccess.hasMessaging) {
      return NextResponse.json(
        {
          error: 'Messaging requires PRO tier or higher',
          upgradeRequired: true,
        },
        { status: 403 }
      )
    }

    // Create message
    const message = await prisma.jobMessage.create({
      data: {
        jobId,
        senderId,
        senderType,
        receiverId,
        receiverType,
        content: sanitisedContent,
      },
    })

    // Broadcast via Supabase
    const messageEvent: MessageSentEvent = {
      type: 'MESSAGE_SENT',
      jobId,
      messageId: message.id,
      senderId,
      senderType,
      content: sanitisedContent,
      timestamp: message.createdAt.toISOString(),
    }

    // Send to receiver's channel
    const channelName = receiverType === 'client' ? 'jobs:client' : 'jobs:contractor'
    await getSupabase().channel(channelName).send({
      type: 'broadcast',
      event: `${receiverType}:${receiverId}`,
      payload: messageEvent,
    })

    return NextResponse.json({
      message: {
        id: message.id,
        jobId: message.jobId,
        senderId: message.senderId,
        senderType: message.senderType,
        content: message.content,
        isRead: message.isRead,
        createdAt: message.createdAt.toISOString(),
      } as ChatMessage,
    })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

// Helper function to check tier access
async function checkTierAccess(userId: string, jobId: string) {
  // Check if user is contractor
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
    hasMessaging: tierLevel >= 2,
    hasLiveEta: tierLevel >= 2,
    hasGpsTracking: tierLevel >= 2, // PRO+ (moved from ENTERPRISE in Phase 8)
  }
}
