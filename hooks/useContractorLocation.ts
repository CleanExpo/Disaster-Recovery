'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { ContractorLocation, LocationUpdateEvent } from '@/lib/supabase/types'

interface UseContractorLocationOptions {
  jobId: string
  enabled?: boolean
  onLocationUpdate?: (location: ContractorLocation) => void
  pollingInterval?: number // Fallback polling interval in ms
}

interface UseContractorLocationReturn {
  location: ContractorLocation | null
  isLoading: boolean
  error: string | null
  lastUpdated: Date | null
  refetch: () => Promise<void>
}

export function useContractorLocation({
  jobId,
  enabled = true,
  onLocationUpdate,
  pollingInterval = 30000, // Poll every 30 seconds as fallback
}: UseContractorLocationOptions): UseContractorLocationReturn {
  const [location, setLocation] = useState<ContractorLocation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const onLocationUpdateRef = useRef(onLocationUpdate)
  onLocationUpdateRef.current = onLocationUpdate

  const fetchLocation = useCallback(async () => {
    if (!jobId) return

    try {
      const response = await fetch(`/api/realtime/jobs/${jobId}/location`)

      if (!response.ok) {
        if (response.status === 404) {
          // No location data yet - not an error
          setLocation(null)
          return
        }
        throw new Error('Failed to fetch location')
      }

      const data = await response.json()

      if (data.location) {
        setLocation(data.location)
        setLastUpdated(new Date(data.timestamp))
        onLocationUpdateRef.current?.(data.location)
      }

      setError(null)
    } catch (err) {
      console.error('Error fetching contractor location:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch location')
    } finally {
      setIsLoading(false)
    }
  }, [jobId])

  // Handle real-time location updates from WebSocket
  const handleLocationUpdate = useCallback((event: LocationUpdateEvent) => {
    if (event.jobId === jobId && event.type === 'LOCATION_UPDATE') {
      setLocation(event.location)
      setLastUpdated(new Date(event.timestamp))
      onLocationUpdateRef.current?.(event.location)
    }
  }, [jobId])

  // Initial fetch
  useEffect(() => {
    if (!enabled) {
      setIsLoading(false)
      return
    }

    fetchLocation()
  }, [enabled, fetchLocation])

  // Polling fallback (in case WebSocket updates are missed)
  useEffect(() => {
    if (!enabled || !pollingInterval) return

    const intervalId = setInterval(fetchLocation, pollingInterval)
    return () => clearInterval(intervalId)
  }, [enabled, pollingInterval, fetchLocation])

  // Expose handler for external use with useRealtimeConnection
  useEffect(() => {
    // This hook expects the parent component to pass location updates
    // from useRealtimeConnection's onJobEvent callback
    // The handleLocationUpdate function can be called externally
  }, [handleLocationUpdate])

  return {
    location,
    isLoading,
    error,
    lastUpdated,
    refetch: fetchLocation,
  }
}

// Hook for contractors to broadcast their location
interface UseLocationBroadcastOptions {
  jobId: string
  enabled?: boolean
  updateInterval?: number // How often to send updates in ms
  onError?: (error: string) => void
}

interface UseLocationBroadcastReturn {
  isTracking: boolean
  isBroadcasting: boolean
  error: string | null
  currentLocation: GeolocationPosition | null
  startTracking: () => void
  stopTracking: () => void
}

export function useLocationBroadcast({
  jobId,
  enabled = true,
  updateInterval = 30000, // 30 seconds default
  onError,
}: UseLocationBroadcastOptions): UseLocationBroadcastReturn {
  const [isTracking, setIsTracking] = useState(false)
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null)

  const watchIdRef = useRef<number | null>(null)
  const lastBroadcastRef = useRef<number>(0)
  const onErrorRef = useRef(onError)
  onErrorRef.current = onError

  const broadcastLocation = useCallback(
    async (position: GeolocationPosition) => {
      const now = Date.now()

      // Throttle broadcasts
      if (now - lastBroadcastRef.current < updateInterval) {
        return
      }

      setIsBroadcasting(true)
      lastBroadcastRef.current = now

      try {
        const response = await fetch(`/api/realtime/jobs/${jobId}/location`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            heading: position.coords.heading,
            speed: position.coords.speed ? position.coords.speed * 3.6 : null, // Convert m/s to km/h
            deviceType: getDeviceType(),
          }),
        })

        if (!response.ok) {
          const data = await response.json()
          if (response.status === 429) {
            // Rate limited - not a critical error
            return
          }
          throw new Error(data.error || 'Failed to broadcast location')
        }

        setError(null)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to broadcast location'
        setError(message)
        onErrorRef.current?.(message)
      } finally {
        setIsBroadcasting(false)
      }
    },
    [jobId, updateInterval]
  )

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      const message = 'Geolocation is not supported by this browser'
      setError(message)
      onErrorRef.current?.(message)
      return
    }

    setIsTracking(true)
    setError(null)

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLocation(position)
        broadcastLocation(position)
      },
      (positionError) => {
        let message: string
        switch (positionError.code) {
          case positionError.PERMISSION_DENIED:
            message = 'Location permission denied'
            break
          case positionError.POSITION_UNAVAILABLE:
            message = 'Location information unavailable'
            break
          case positionError.TIMEOUT:
            message = 'Location request timed out'
            break
          default:
            message = 'Unknown location error'
        }
        setError(message)
        onErrorRef.current?.(message)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    )
  }, [broadcastLocation])

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
    setIsTracking(false)
    setIsBroadcasting(false)
  }, [])

  // Auto-start if enabled
  useEffect(() => {
    if (enabled && jobId) {
      startTracking()
    }
    return () => stopTracking()
  }, [enabled, jobId, startTracking, stopTracking])

  return {
    isTracking,
    isBroadcasting,
    error,
    currentLocation,
    startTracking,
    stopTracking,
  }
}

// Helper to detect device type
function getDeviceType(): string {
  const userAgent = navigator.userAgent.toLowerCase()
  if (/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
    if (/ipad|tablet/i.test(userAgent)) {
      return 'tablet'
    }
    return 'mobile'
  }
  return 'desktop'
}
