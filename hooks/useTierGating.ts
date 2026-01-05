'use client'

import { useState, useEffect, useCallback } from 'react'
import type { TierAccess, RealtimeTier } from '@/lib/supabase/types'

interface UseTierGatingOptions {
  jobId: string
  enabled?: boolean
}

interface UseTierGatingReturn extends TierAccess {
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useTierGating({
  jobId,
  enabled = true,
}: UseTierGatingOptions): UseTierGatingReturn {
  const [tierAccess, setTierAccess] = useState<TierAccess>({
    tier: null,
    hasLiveEta: false,
    hasMessaging: false,
    hasGpsTracking: false,
    hasVideoCalls: false,
    isBetaAccess: false,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTierAccess = useCallback(async () => {
    if (!jobId) return

    try {
      setIsLoading(true)
      const response = await fetch(`/api/realtime/tier/check?jobId=${jobId}`)

      if (!response.ok) {
        throw new Error('Failed to check tier access')
      }

      const data: TierAccess = await response.json()
      setTierAccess(data)
      setError(null)
    } catch (err) {
      console.error('Error checking tier:', err)
      setError(err instanceof Error ? err.message : 'Failed to check tier')
      // Default to no access on error
      setTierAccess({
        tier: null,
        hasLiveEta: false,
        hasMessaging: false,
        hasGpsTracking: false,
        hasVideoCalls: false,
        isBetaAccess: false,
      })
    } finally {
      setIsLoading(false)
    }
  }, [jobId])

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false)
      return
    }

    fetchTierAccess()
  }, [enabled, fetchTierAccess])

  return {
    ...tierAccess,
    isLoading,
    error,
    refetch: fetchTierAccess,
  }
}

// Helper function to get tier display info
export function getTierInfo(tier: RealtimeTier | null): {
  name: string
  price: number
  features: string[]
  colour: string
} {
  switch (tier) {
    case 'BASIC':
      return {
        name: 'Basic',
        price: 49,
        features: ['Status updates', 'Push notifications', 'SMS fallback'],
        colour: 'text-gray-600',
      }
    case 'PRO':
      return {
        name: 'Pro',
        price: 99,
        features: [
          'Everything in Basic',
          'Live ETA tracking',
          'In-app messaging',
          'GPS location tracking',
          'Priority support',
        ],
        colour: 'text-teal-600',
      }
    case 'ENTERPRISE':
      return {
        name: 'Enterprise',
        price: 199,
        features: [
          'Everything in Pro',
          'Video/voice calls',
          'Team coordination',
          'Custom integrations',
          'Dedicated support',
        ],
        colour: 'text-purple-600',
      }
    default:
      return {
        name: 'Free',
        price: 0,
        features: ['Basic job tracking'],
        colour: 'text-gray-400',
      }
  }
}

// Helper to check if user can access a feature
export function canAccessFeature(
  tier: RealtimeTier | null,
  feature: 'liveEta' | 'messaging' | 'gpsTracking' | 'videoCalls'
): boolean {
  const tierOrder: Record<string, number> = {
    BASIC: 1,
    PRO: 2,
    ENTERPRISE: 3,
  }

  const tierLevel = tier ? tierOrder[tier] || 0 : 0

  switch (feature) {
    case 'liveEta':
    case 'messaging':
    case 'gpsTracking':
      return tierLevel >= 2 // PRO+ (GPS moved from ENTERPRISE in Phase 8)
    case 'videoCalls':
      return tierLevel >= 3 // ENTERPRISE only (Phase 10)
    default:
      return false
  }
}
