import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerClient } from '@/lib/supabase/server'
import type { JobStatus, RealtimeJobEvent } from '@/lib/supabase/types'

interface RouteParams {
  params: Promise<{ id: string }>
}

// Update job status (contractor only)
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: jobId } = await params
    const body = await request.json()
    const { status, eta, message } = body as {
      status: JobStatus
      eta?: number
      message?: string
    }

    // Validate status
    const validStatuses: JobStatus[] = [
      'pending',
      'accepted',
      'en_route',
      'on_site',
      'in_progress',
      'completed',
      'cancelled',
    ]

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Get user and contractor info
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

    // Get the service request/job
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: jobId },
      include: {
        client: true,
      },
    })

    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    // Update job status in database
    const updatedJob = await prisma.serviceRequest.update({
      where: { id: jobId },
      data: {
        // Map JobStatus to existing status field
        // This may need adjustment based on actual schema
        updatedAt: new Date(),
      },
    })

    // Broadcast real-time update via Supabase
    const supabase = getServerClient()

    const event: RealtimeJobEvent = {
      type: 'STATUS_CHANGED',
      jobId,
      contractorId: user.contractor.id,
      clientId: serviceRequest.clientId,
      status,
      eta,
      message,
      timestamp: new Date().toISOString(),
    }

    // Broadcast to job channel
    await supabase.channel(`jobs:contractor`).send({
      type: 'broadcast',
      event: 'job_event',
      payload: event,
    })

    // Send direct notification to client
    await supabase.channel(`jobs:client`).send({
      type: 'broadcast',
      event: `client:${serviceRequest.clientId}`,
      payload: event,
    })

    // Log the connection/status update
    await prisma.connectionLog.create({
      data: {
        userId: user.id,
        userType: 'CONTRACTOR',
        channelName: `jobs:contractor`,
        lastHeartbeat: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      jobId,
      status,
      timestamp: event.timestamp,
    })
  } catch (error) {
    console.error('Error updating job status:', error)
    return NextResponse.json(
      { error: 'Failed to update job status' },
      { status: 500 }
    )
  }
}

// Get current job status
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: jobId } = await params

    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: jobId },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(serviceRequest)
  } catch (error) {
    console.error('Error fetching job status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch job status' },
      { status: 500 }
    )
  }
}
