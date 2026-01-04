'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRealtimeSubscription } from '@/hooks/useRealtimeSubscription'

interface TrialBannerProps {
  variant?: 'full' | 'compact'
  showDismiss?: boolean
}

export function TrialBanner({ variant = 'full', showDismiss = true }: TrialBannerProps) {
  const { subscription, isTrialing, trialDaysRemaining, isLoading } = useRealtimeSubscription()
  const [isDismissed, setIsDismissed] = useState(false)

  // Don't show if loading, dismissed, not trialing, or no subscription
  if (isLoading || isDismissed || !isTrialing || !subscription) {
    return null
  }

  // Determine urgency based on days remaining
  const isUrgent = trialDaysRemaining <= 7
  const isWarning = trialDaysRemaining <= 14 && trialDaysRemaining > 7

  const bgColor = isUrgent
    ? 'bg-red-600'
    : isWarning
    ? 'bg-amber-500'
    : 'bg-blue-600'

  const textColor = isUrgent || isWarning ? 'text-white' : 'text-white'

  if (variant === 'compact') {
    return (
      <div className={`${bgColor} px-4 py-2`}>
        <div className="flex items-center justify-between">
          <p className={`text-sm font-medium ${textColor}`}>
            {isUrgent ? (
              <>
                Trial ends in {trialDaysRemaining} day{trialDaysRemaining !== 1 ? 's' : ''}!
              </>
            ) : (
              <>
                {trialDaysRemaining} days left in your {subscription.tier} trial
              </>
            )}
          </p>
          <Link
            href="/dashboard/contractor/realtime/pricing"
            className="ml-4 rounded-md bg-white/20 px-3 py-1 text-sm font-medium text-white hover:bg-white/30"
          >
            {isUrgent ? 'Subscribe Now' : 'View Plans'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`${bgColor} rounded-lg shadow-sm`}>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            {isUrgent ? (
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${textColor}`}>
                {isUrgent
                  ? `Your trial ends in ${trialDaysRemaining} day${trialDaysRemaining !== 1 ? 's' : ''}!`
                  : `You're on a ${subscription.tier} trial`}
              </h3>
              <p className={`mt-1 text-sm ${textColor} opacity-90`}>
                {isUrgent
                  ? 'Subscribe now to keep access to real-time job coordination features.'
                  : `${trialDaysRemaining} days remaining. Subscribe anytime to continue after your trial.`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/dashboard/contractor/realtime/pricing"
              className={`rounded-md px-4 py-2 text-sm font-semibold shadow-sm ${
                isUrgent
                  ? 'bg-white text-red-600 hover:bg-red-50'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              {isUrgent ? 'Subscribe Now' : 'View Plans'}
            </Link>

            {showDismiss && !isUrgent && (
              <button
                onClick={() => setIsDismissed(true)}
                className="rounded-md p-1 text-white/80 hover:bg-white/20 hover:text-white"
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
