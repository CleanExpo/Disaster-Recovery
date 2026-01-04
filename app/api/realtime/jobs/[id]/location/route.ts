import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createClient } from '@supabase/supabase-js'
import type { ContractorLocation, LocationUpdateEvent } from '@/lib/supabase/types'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET - Client fetches current contractor location for a job
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const { id: jobId } = await params

    // Verify user has access to this job (is the client)
    const job = await prisma.serviceRequest.findFirst({
      where: {
        id: jobId,
        clientId: session.user.id,
      },
      select: {
        id: true,
        status: true,
      },
    })

    if (!job) {
      return NextResponse.json({ error: 'Job not found or access denied' }, { status: 404 })
    }

    // Get latest location from history
    const latestLocation = await prisma.contractorLocationHistory.findFirst({
      where: { jobId },
      orderBy: { timestamp: 'desc' },
    })

    if (!latestLocation) {
      return NextResponse.json({ location: null, message: 'No location data available yet' })
    }

    const location: ContractorLocation = {
      latitude: latestLocation.latitude,
      longitude: latestLocation.longitude,
      accuracy: latestLocation.accuracy ?? undefined,
      heading: latestLocation.heading ?? undefined,
      speed: latestLocation.speed ?? undefined,
    }

    return NextResponse.json({
      location,
      timestamp: latestLocation.timestamp.toISOString(),
      deviceType: latestLocation.deviceType,
    })
  } catch (error) {
    console.error('Error fetching location:', error)
    return NextResponse.json({ error: 'Failed to fetch location' }, { status: 500 })
  }
}

// POST - Contractor broadcasts their location
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const { id: jobId } = await params
    const body = await request.json()

    const { latitude, longitude, accuracy, heading, speed, deviceType, batteryLevel } = body

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return NextResponse.json(
        { error: 'Invalid location data: latitude and longitude are required' },
        { status: 400 }
      )
    }

    // Find the contractor record for this user
    const contractor = await prisma.contractor.findFirst({
      where: { userId: session.user.id },
      select: { id: true },
    })

    if (!contractor) {
      return NextResponse.json({ error: 'Contractor not found' }, { status: 404 })
    }

    // Verify contractor is assigned to this job
    const job = await prisma.serviceRequest.findFirst({
      where: {
        id: jobId,
        // TODO: Add contractor assignment check when field is available
        // contractorId: contractor.id,
        status: { in: ['PENDING', 'MATCHED', 'IN_PROGRESS'] },
      },
      select: {
        id: true,
        clientId: true,
        status: true,
      },
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found or you are not assigned to it' },
        { status: 404 }
      )
    }

    // Save location to history (rate limit: check last update)
    const lastLocation = await prisma.contractorLocationHistory.findFirst({
      where: { jobId, contractorId: contractor.id },
      orderBy: { timestamp: 'desc' },
    })

    const now = new Date()
    const minInterval = 10 * 1000 // 10 seconds minimum between updates

    if (lastLocation && now.getTime() - lastLocation.timestamp.getTime() < minInterval) {
      return NextResponse.json(
        { error: 'Rate limited: please wait before sending another update' },
        { status: 429 }
      )
    }

    // Save new location
    const newLocation = await prisma.contractorLocationHistory.create({
      data: {
        jobId,
        contractorId: contractor.id,
        latitude,
        longitude,
        accuracy,
        heading,
        speed,
        deviceType,
        batteryLevel,
      },
    })

    // Broadcast location update via Supabase
    const locationEvent: LocationUpdateEvent = {
      type: 'LOCATION_UPDATE',
      jobId,
      contractorId: contractor.id,
      clientId: job.clientId,
      location: {
        latitude,
        longitude,
        accuracy,
        heading,
        speed,
      },
      timestamp: now.toISOString(),
    }

    // Broadcast to client channel
    await supabase.channel('jobs:client').send({
      type: 'broadcast',
      event: `client:${job.clientId}`,
      payload: locationEvent,
    })

    return NextResponse.json({
      success: true,
      locationId: newLocation.id,
      timestamp: newLocation.timestamp.toISOString(),
    })
  } catch (error) {
    console.error('Error broadcasting location:', error)
    return NextResponse.json({ error: 'Failed to broadcast location' }, { status: 500 })
  }
}
