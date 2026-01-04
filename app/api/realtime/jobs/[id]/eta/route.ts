import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

interface DirectionsResponse {
  routes: Array<{
    legs: Array<{
      duration: { value: number; text: string }
      duration_in_traffic?: { value: number; text: string }
      distance: { value: number; text: string }
    }>
    overview_polyline: { points: string }
  }>
  status: string
}

// Simple in-memory cache for ETA calculations
const etaCache = new Map<string, { data: unknown; expiry: number }>()
const CACHE_TTL = 30 * 1000 // 30 seconds

function getCacheKey(jobId: string, contractorLat: number, contractorLng: number): string {
  // Round coordinates to reduce cache misses for small movements
  const roundedLat = Math.round(contractorLat * 1000) / 1000
  const roundedLng = Math.round(contractorLng * 1000) / 1000
  return `${jobId}:${roundedLat}:${roundedLng}`
}

// GET - Calculate ETA using Google Directions API
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const { id: jobId } = await params

    // Verify user has access to this job
    const job = await prisma.serviceRequest.findFirst({
      where: {
        id: jobId,
        OR: [
          { clientId: session.user.id },
          // Add contractor check when available
        ],
      },
      select: {
        id: true,
        clientId: true,
        address: true,
        latitude: true,
        longitude: true,
      },
    })

    if (!job) {
      return NextResponse.json({ error: 'Job not found or access denied' }, { status: 404 })
    }

    // Get contractor's latest location
    const latestLocation = await prisma.contractorLocationHistory.findFirst({
      where: { jobId },
      orderBy: { timestamp: 'desc' },
    })

    if (!latestLocation) {
      return NextResponse.json({
        eta: null,
        message: 'Contractor location not available',
      })
    }

    // Check cache
    const cacheKey = getCacheKey(jobId, latestLocation.latitude, latestLocation.longitude)
    const cached = etaCache.get(cacheKey)
    if (cached && cached.expiry > Date.now()) {
      return NextResponse.json(cached.data)
    }

    // Determine destination coordinates
    let destLat: number | undefined
    let destLng: number | undefined

    // Check if job has coordinates
    if (job.latitude && job.longitude) {
      destLat = job.latitude
      destLng = job.longitude
    } else if (job.address) {
      // Geocode the address using Google Geocoding API
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(job.address)}&key=${process.env.GOOGLE_MAPS_SERVER_KEY}`
      const geocodeRes = await fetch(geocodeUrl)
      const geocodeData = await geocodeRes.json()

      if (geocodeData.status === 'OK' && geocodeData.results?.[0]) {
        destLat = geocodeData.results[0].geometry.location.lat
        destLng = geocodeData.results[0].geometry.location.lng
      }
    }

    if (!destLat || !destLng) {
      return NextResponse.json({
        eta: null,
        message: 'Could not determine destination coordinates',
      })
    }

    // Call Google Directions API
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${latestLocation.latitude},${latestLocation.longitude}&destination=${destLat},${destLng}&departure_time=now&traffic_model=best_guess&key=${process.env.GOOGLE_MAPS_SERVER_KEY}`

    const directionsRes = await fetch(directionsUrl)
    const directionsData: DirectionsResponse = await directionsRes.json()

    if (directionsData.status !== 'OK' || !directionsData.routes?.[0]?.legs?.[0]) {
      return NextResponse.json({
        eta: null,
        message: 'Could not calculate route',
      })
    }

    const leg = directionsData.routes[0].legs[0]
    const route = directionsData.routes[0]

    // Prefer traffic-aware duration if available
    const durationSeconds = leg.duration_in_traffic?.value || leg.duration.value
    const durationMinutes = Math.ceil(durationSeconds / 60)
    const distanceMetres = leg.distance.value
    const distanceKm = distanceMetres / 1000

    // Determine traffic condition based on difference between normal and traffic duration
    let trafficCondition: 'clear' | 'moderate' | 'heavy' = 'clear'
    if (leg.duration_in_traffic) {
      const normalDuration = leg.duration.value
      const trafficDuration = leg.duration_in_traffic.value
      const trafficRatio = trafficDuration / normalDuration

      if (trafficRatio > 1.5) {
        trafficCondition = 'heavy'
      } else if (trafficRatio > 1.2) {
        trafficCondition = 'moderate'
      }
    }

    const result = {
      eta: durationMinutes,
      distanceKm: Math.round(distanceKm * 10) / 10,
      trafficCondition,
      durationText: leg.duration_in_traffic?.text || leg.duration.text,
      distanceText: leg.distance.text,
      routePolyline: route.overview_polyline.points,
      contractorLocation: {
        latitude: latestLocation.latitude,
        longitude: latestLocation.longitude,
      },
      destinationLocation: {
        latitude: destLat,
        longitude: destLng,
      },
      calculatedAt: new Date().toISOString(),
    }

    // Cache the result
    etaCache.set(cacheKey, { data: result, expiry: Date.now() + CACHE_TTL })

    // Clean up old cache entries periodically
    if (Math.random() < 0.1) {
      const now = Date.now()
      for (const [key, value] of etaCache.entries()) {
        if (value.expiry < now) {
          etaCache.delete(key)
        }
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error calculating ETA:', error)
    return NextResponse.json({ error: 'Failed to calculate ETA' }, { status: 500 })
  }
}
