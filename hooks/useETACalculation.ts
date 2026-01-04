'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { ETAUpdateEvent, ContractorLocation } from '@/lib/supabase/types'

interface ETAData {
  eta: number // minutes
  distanceKm: number
  trafficCondition: 'clear' | 'moderate' | 'heavy'
  durationText: string
  distanceText: string
  routePolyline?: string
  contractorLocation?: ContractorLocation
  destinationLocation?: { latitude: number; longitude: number }
  calculatedAt: string
}

interface UseETACalculationOptions {
  jobId: string
  enabled?: boolean
  refreshInterval?: number // How often to refresh ETA in ms
  onETAUpdate?: (eta: ETAData) => void
}

interface UseETACalculationReturn {
  eta: ETAData | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useETACalculation({
  jobId,
  enabled = true,
  refreshInterval = 60000, // Refresh every 60 seconds
  onETAUpdate,
}: UseETACalculationOptions): UseETACalculationReturn {
  const [eta, setEta] = useState<ETAData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const onETAUpdateRef = useRef(onETAUpdate)
  onETAUpdateRef.current = onETAUpdate

  const fetchETA = useCallback(async () => {
    if (!jobId) return

    try {
      setIsLoading(true)
      const response = await fetch(`/api/realtime/jobs/${jobId}/eta`)

      if (!response.ok) {
        if (response.status === 404) {
          setEta(null)
          return
        }
        throw new Error('Failed to fetch ETA')
      }

      const data = await response.json()

      if (data.eta !== null && data.eta !== undefined) {
        const etaData: ETAData = {
          eta: data.eta,
          distanceKm: data.distanceKm,
          trafficCondition: data.trafficCondition,
          durationText: data.durationText,
          distanceText: data.distanceText,
          routePolyline: data.routePolyline,
          contractorLocation: data.contractorLocation,
          destinationLocation: data.destinationLocation,
          calculatedAt: data.calculatedAt,
        }
        setEta(etaData)
        onETAUpdateRef.current?.(etaData)
      } else {
        setEta(null)
      }

      setError(null)
    } catch (err) {
      console.error('Error fetching ETA:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch ETA')
    } finally {
      setIsLoading(false)
    }
  }, [jobId])

  // Handle real-time ETA updates from WebSocket
  const handleETAUpdate = useCallback((event: ETAUpdateEvent) => {
    if (event.jobId === jobId && event.type === 'ETA_UPDATE') {
      const etaData: ETAData = {
        eta: event.eta,
        distanceKm: event.distanceKm,
        trafficCondition: event.trafficCondition || 'clear',
        durationText: `${event.eta} min`,
        distanceText: `${event.distanceKm} km`,
        routePolyline: event.routePolyline,
        calculatedAt: event.timestamp,
      }
      setEta(etaData)
      onETAUpdateRef.current?.(etaData)
    }
  }, [jobId])

  // Initial fetch
  useEffect(() => {
    if (!enabled) {
      setIsLoading(false)
      return
    }

    fetchETA()
  }, [enabled, fetchETA])

  // Periodic refresh
  useEffect(() => {
    if (!enabled || !refreshInterval) return

    const intervalId = setInterval(fetchETA, refreshInterval)
    return () => clearInterval(intervalId)
  }, [enabled, refreshInterval, fetchETA])

  return {
    eta,
    isLoading,
    error,
    refetch: fetchETA,
  }
}

// Helper hook to format ETA for display
export function useFormattedETA(etaMinutes: number | null): string {
  if (etaMinutes === null || etaMinutes === undefined) {
    return 'Calculating...'
  }

  if (etaMinutes < 1) {
    return 'Arriving now'
  }

  if (etaMinutes < 60) {
    return `${Math.round(etaMinutes)} min`
  }

  const hours = Math.floor(etaMinutes / 60)
  const minutes = Math.round(etaMinutes % 60)

  if (minutes === 0) {
    return `${hours} hr`
  }

  return `${hours} hr ${minutes} min`
}

// Helper hook to get ETA colour based on time
export function useETAColour(etaMinutes: number | null): string {
  if (etaMinutes === null || etaMinutes === undefined) {
    return 'text-gray-500'
  }

  if (etaMinutes <= 5) {
    return 'text-green-600'
  }

  if (etaMinutes <= 15) {
    return 'text-teal-600'
  }

  if (etaMinutes <= 30) {
    return 'text-amber-600'
  }

  return 'text-orange-600'
}
