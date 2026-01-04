'use client'

import { useState } from 'react'
import { useRealtimeSubscription, RealtimeTier } from '@/hooks/useRealtimeSubscription'
import { TIER_FEATURES } from './PricingCard'

interface SubscriptionManagerProps {
  onUpgrade?: () => void
}

export function SubscriptionManager({ onUpgrade }: SubscriptionManagerProps) {
  const {
    subscription,
    isLoading,
    error,
    isTrialing,
    trialDaysRemaining,
    hasActiveSubscription,
    openBillingPortal,
    cancelSubscription,
  } = useRealtimeSubscription()

  const [isProcessing, setIsProcessing] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const handleOpenPortal = async () => {
    setIsProcessing(true)
    try {
      const url = await openBillingPortal()
      if (url) {
        window.location.href = url
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCancel = async () => {
    setIsProcessing(true)
    try {
      await cancelSubscription()
      setShowCancelConfirm(false)
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-lg bg-grey-100 p-6">
        <div className="h-6 w-1/3 rounded bg-grey-200" />
        <div className="mt-4 h-4 w-2/3 rounded bg-grey-200" />
        <div className="mt-2 h-4 w-1/2 rounded bg-grey-200" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    )
  }

  if (!subscription) {
    return (
      <div className="rounded-lg border border-grey-200 bg-white p-6 text-center">
        <svg
          className="mx-auto h-12 w-12 text-grey-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-grey-900">
          No Active Subscription
        </h3>
        <p className="mt-2 text-sm text-grey-500">
          Subscribe to Real-Time Job Coordination to unlock powerful features.
        </p>
        {onUpgrade && (
          <button
            onClick={onUpgrade}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            View Plans
          </button>
        )}
      </div>
    )
  }

  const tier = subscription.tier as RealtimeTier
  const features = TIER_FEATURES[tier] || []

  return (
    <div className="rounded-lg border border-grey-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-grey-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-grey-900">
              {tier} Plan
            </h3>
            <div className="mt-1 flex items-center space-x-2">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  subscription.status === 'ACTIVE'
                    ? 'bg-green-100 text-green-800'
                    : subscription.status === 'TRIAL'
                    ? 'bg-blue-100 text-blue-800'
                    : subscription.status === 'CANCELLED'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-grey-100 text-grey-800'
                }`}
              >
                {subscription.status}
              </span>
              {isTrialing && trialDaysRemaining > 0 && (
                <span className="text-sm text-grey-500">
                  {trialDaysRemaining} days remaining
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-grey-900">
              ${subscription.pricePerMonth}
              <span className="text-sm font-normal text-grey-500">/mo</span>
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 py-4">
        <h4 className="text-sm font-medium text-grey-700">Included Features</h4>
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {features.slice(0, 6).map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-grey-600">
              <svg
                className="mr-2 h-4 w-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Trial warning */}
      {isTrialing && trialDaysRemaining <= 14 && trialDaysRemaining > 0 && (
        <div className="mx-6 mb-4 rounded-lg bg-amber-50 p-3">
          <div className="flex">
            <svg
              className="h-5 w-5 text-amber-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div className="ml-3">
              <p className="text-sm text-amber-700">
                Your trial ends in {trialDaysRemaining} days. Add a payment method to continue
                uninterrupted service.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="border-t border-grey-200 px-6 py-4">
        <div className="flex flex-wrap items-center gap-3">
          {subscription.stripeSubscriptionId && (
            <button
              onClick={handleOpenPortal}
              disabled={isProcessing}
              className="inline-flex items-center rounded-lg border border-grey-300 bg-white px-4 py-2 text-sm font-medium text-grey-700 hover:bg-grey-50 disabled:opacity-50"
            >
              {isProcessing ? (
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              )}
              Manage Billing
            </button>
          )}

          {onUpgrade && tier !== 'ENTERPRISE' && (
            <button
              onClick={onUpgrade}
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              Upgrade Plan
            </button>
          )}

          {subscription.status !== 'CANCELLED' && (
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="text-sm text-grey-500 hover:text-red-600"
            >
              Cancel subscription
            </button>
          )}
        </div>
      </div>

      {/* Cancel confirmation modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-grey-900">
              Cancel Subscription?
            </h3>
            <p className="mt-2 text-sm text-grey-600">
              Are you sure you want to cancel your {tier} subscription? You will lose
              access to real-time features at the end of your current billing period.
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                disabled={isProcessing}
                className="rounded-lg border border-grey-300 px-4 py-2 text-sm font-medium text-grey-700 hover:bg-grey-50"
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancel}
                disabled={isProcessing}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isProcessing ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
