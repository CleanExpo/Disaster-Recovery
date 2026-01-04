'use client'

import { useState, useEffect, useCallback } from 'react'

export type RealtimeTier = 'BASIC' | 'PRO' | 'ENTERPRISE'
export type SubscriptionStatus = 'ACTIVE' | 'TRIAL' | 'CANCELLED' | 'EXPIRED'

export interface RealtimeSubscription {
  id: string
  contractorId: string
  tier: RealtimeTier
  status: SubscriptionStatus
  pricePerMonth: number
  trialEndsAt: string | null
  startDate: string | null
  endDate: string | null
  stripeSubscriptionId: string | null
  createdAt: string
  updatedAt: string
}

interface SubscriptionResponse {
  subscription: RealtimeSubscription | null
  pricing: Record<RealtimeTier, number>
  hasActiveSubscription: boolean
  trialDaysRemaining: number
  canUpgrade: boolean
}

interface UseRealtimeSubscriptionReturn {
  subscription: RealtimeSubscription | null
  isLoading: boolean
  error: string | null
  isTrialing: boolean
  trialDaysRemaining: number
  hasActiveSubscription: boolean
  canUpgrade: boolean
  pricing: Record<RealtimeTier, number>
  startCheckout: (tier: RealtimeTier) => Promise<string | null>
  openBillingPortal: () => Promise<string | null>
  cancelSubscription: () => Promise<boolean>
  refresh: () => Promise<void>
}

const DEFAULT_PRICING: Record<RealtimeTier, number> = {
  BASIC: 49,
  PRO: 99,
  ENTERPRISE: 199,
}

export function useRealtimeSubscription(): UseRealtimeSubscriptionReturn {
  const [subscription, setSubscription] = useState<RealtimeSubscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [trialDaysRemaining, setTrialDaysRemaining] = useState(0)
  const [canUpgrade, setCanUpgrade] = useState(false)
  const [pricing, setPricing] = useState<Record<RealtimeTier, number>>(DEFAULT_PRICING)

  const fetchSubscription = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/realtime/subscription')

      if (!response.ok) {
        if (response.status === 403) {
          // Not a contractor - this is expected for non-contractors
          setSubscription(null)
          return
        }
        throw new Error('Failed to fetch subscription')
      }

      const data: SubscriptionResponse = await response.json()
      setSubscription(data.subscription)
      setTrialDaysRemaining(data.trialDaysRemaining)
      setCanUpgrade(data.canUpgrade)
      if (data.pricing) {
        setPricing(data.pricing)
      }
    } catch (err) {
      console.error('Error fetching subscription:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSubscription()
  }, [fetchSubscription])

  const startCheckout = useCallback(async (tier: RealtimeTier): Promise<string | null> => {
    try {
      setError(null)

      // Call checkout API directly
      const response = await fetch('/api/realtime/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })

      const data = await response.json()

      if (!response.ok) {
        // If redirect to portal is suggested
        if (data.redirectToPortal && data.portalUrl) {
          return data.portalUrl
        }
        throw new Error(data.error || 'Failed to create checkout session')
      }

      return data.checkoutUrl
    } catch (err) {
      console.error('Error starting checkout:', err)
      setError(err instanceof Error ? err.message : 'Failed to start checkout')
      return null
    }
  }, [])

  const openBillingPortal = useCallback(async (): Promise<string | null> => {
    try {
      setError(null)

      const response = await fetch('/api/realtime/billing/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to open billing portal')
      }

      return data.portalUrl
    } catch (err) {
      console.error('Error opening billing portal:', err)
      setError(err instanceof Error ? err.message : 'Failed to open billing portal')
      return null
    }
  }, [])

  const cancelSubscription = useCallback(async (): Promise<boolean> => {
    try {
      setError(null)

      const response = await fetch('/api/realtime/subscription', {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription')
      }

      // Refresh subscription data
      await fetchSubscription()
      return true
    } catch (err) {
      console.error('Error cancelling subscription:', err)
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription')
      return false
    }
  }, [fetchSubscription])

  const isTrialing = subscription?.status === 'TRIAL'
  const hasActiveSubscription = subscription?.status === 'ACTIVE' || subscription?.status === 'TRIAL'

  return {
    subscription,
    isLoading,
    error,
    isTrialing,
    trialDaysRemaining,
    hasActiveSubscription,
    canUpgrade,
    pricing,
    startCheckout,
    openBillingPortal,
    cancelSubscription,
    refresh: fetchSubscription,
  }
}
