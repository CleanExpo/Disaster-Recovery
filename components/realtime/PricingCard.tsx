'use client'

import { useState } from 'react'
import { RealtimeTier } from '@/hooks/useRealtimeSubscription'

interface PricingCardProps {
  tier: RealtimeTier
  price: number
  features: string[]
  isPopular?: boolean
  isCurrentTier?: boolean
  isTrialing?: boolean
  onSubscribe: (tier: RealtimeTier) => Promise<void>
  disabled?: boolean
}

const TIER_DESCRIPTIONS: Record<RealtimeTier, string> = {
  BASIC: 'Essential real-time features for solo contractors',
  PRO: 'Advanced coordination for growing businesses',
  ENTERPRISE: 'Complete solution for large teams',
}

export function PricingCard({
  tier,
  price,
  features,
  isPopular = false,
  isCurrentTier = false,
  isTrialing = false,
  onSubscribe,
  disabled = false,
}: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (disabled || isLoading) return
    setIsLoading(true)
    try {
      await onSubscribe(tier)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`relative flex flex-col rounded-2xl border-2 p-6 shadow-sm transition-shadow hover:shadow-md ${
        isPopular
          ? 'border-blue-500 bg-blue-50/50'
          : isCurrentTier
          ? 'border-green-500 bg-green-50/50'
          : 'border-grey-200 bg-white'
      }`}
    >
      {/* Popular badge */}
      {isPopular && !isCurrentTier && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            Recommended
          </span>
        </div>
      )}

      {/* Current tier badge */}
      {isCurrentTier && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
            {isTrialing ? 'Current Trial' : 'Current Plan'}
          </span>
        </div>
      )}

      {/* Tier name */}
      <h3 className="text-lg font-semibold text-grey-900">{tier}</h3>
      <p className="mt-1 text-sm text-grey-500">{TIER_DESCRIPTIONS[tier]}</p>

      {/* Price */}
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-bold tracking-tight text-grey-900">
          ${price}
        </span>
        <span className="ml-1 text-sm text-grey-500">/month</span>
      </div>

      {/* Features list */}
      <ul className="mt-6 flex-1 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="h-5 w-5 flex-shrink-0 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2 text-sm text-grey-700">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={handleClick}
        disabled={disabled || isLoading || isCurrentTier}
        className={`mt-6 w-full rounded-lg px-4 py-3 text-sm font-semibold transition-colours ${
          isCurrentTier
            ? 'cursor-default bg-green-100 text-green-700'
            : isPopular
            ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400'
            : 'bg-grey-900 text-white hover:bg-grey-800 disabled:bg-grey-400'
        } disabled:cursor-not-allowed`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : isCurrentTier ? (
          isTrialing ? 'Current Trial' : 'Current Plan'
        ) : (
          `Subscribe to ${tier}`
        )}
      </button>
    </div>
  )
}

// Feature lists for each tier
export const TIER_FEATURES: Record<RealtimeTier, string[]> = {
  BASIC: [
    'Real-time job status updates',
    'Push notifications',
    'Client status page',
    'Basic job tracking',
    'Email notifications',
  ],
  PRO: [
    'Everything in Basic',
    'Live ETA tracking',
    'In-app messaging',
    'Priority notifications',
    'Response time analytics',
    'Custom status messages',
  ],
  ENTERPRISE: [
    'Everything in Pro',
    'GPS location tracking',
    'Video/voice calls',
    'Team coordination',
    'Advanced analytics',
    'White-label options',
    'Priority support',
  ],
}
