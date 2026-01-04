'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useRealtimeSubscription, RealtimeTier } from '@/hooks/useRealtimeSubscription'
import { PricingCard, TIER_FEATURES, SubscriptionManager } from '@/components/realtime'

export default function RealtimePricingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    subscription,
    isLoading,
    pricing,
    startCheckout,
    hasActiveSubscription,
    isTrialing,
  } = useRealtimeSubscription()

  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Handle success/cancel from Stripe checkout
  useEffect(() => {
    const success = searchParams.get('success')
    const canceled = searchParams.get('canceled')

    if (success === 'true') {
      setSuccessMessage('Your subscription has been activated! Welcome to real-time job coordination.')
      // Clear URL params
      router.replace('/dashboard/contractor/realtime/pricing')
    } else if (canceled === 'true') {
      setErrorMessage('Checkout was cancelled. You can try again when ready.')
      router.replace('/dashboard/contractor/realtime/pricing')
    }
  }, [searchParams, router])

  const handleSubscribe = async (tier: RealtimeTier) => {
    const url = await startCheckout(tier)
    if (url) {
      window.location.href = url
    }
  }

  const tiers: RealtimeTier[] = ['BASIC', 'PRO', 'ENTERPRISE']

  return (
    <div className="min-h-screen bg-grey-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-grey-900">
                Real-Time Job Coordination
              </h1>
              <p className="mt-1 text-sm text-grey-500">
                Never miss a job, delight your clients with live updates
              </p>
            </div>
            <Link
              href="/dashboard/contractor"
              className="text-sm text-grey-600 hover:text-grey-900"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 rounded-lg bg-green-50 p-4">
            <div className="flex">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="ml-3 text-sm font-medium text-green-800">
                {successMessage}
              </p>
              <button
                onClick={() => setSuccessMessage(null)}
                className="ml-auto text-green-500 hover:text-green-600"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 rounded-lg bg-red-50 p-4">
            <div className="flex">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="ml-3 text-sm font-medium text-red-800">{errorMessage}</p>
              <button
                onClick={() => setErrorMessage(null)}
                className="ml-auto text-red-500 hover:text-red-600"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Current Subscription */}
        {hasActiveSubscription && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-grey-900">
              Your Subscription
            </h2>
            <SubscriptionManager
              onUpgrade={() => {
                document.getElementById('pricing-section')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
            />
          </div>
        )}

        {/* Pricing Section */}
        <div id="pricing-section" className="scroll-mt-8">
          {!hasActiveSubscription && (
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-grey-900">
                Choose Your Plan
              </h2>
              <p className="mt-3 text-lg text-grey-600">
                All plans include a 90-day free trial. No credit card required to start.
              </p>
            </div>
          )}

          {hasActiveSubscription && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-grey-900">
                {subscription?.tier === 'ENTERPRISE'
                  ? 'You have our top tier!'
                  : 'Upgrade Your Plan'}
              </h2>
              <p className="mt-1 text-sm text-grey-600">
                {subscription?.tier === 'ENTERPRISE'
                  ? 'Enjoy all the features of our Enterprise plan.'
                  : 'Unlock more features by upgrading to a higher tier.'}
              </p>
            </div>
          )}

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl border border-grey-200 bg-white p-6"
                >
                  <div className="h-6 w-20 rounded bg-grey-200" />
                  <div className="mt-4 h-10 w-24 rounded bg-grey-200" />
                  <div className="mt-6 space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-4 rounded bg-grey-200" />
                    ))}
                  </div>
                  <div className="mt-6 h-12 rounded bg-grey-200" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {tiers.map((tier) => (
                <PricingCard
                  key={tier}
                  tier={tier}
                  price={pricing[tier]}
                  features={TIER_FEATURES[tier]}
                  isPopular={tier === 'PRO'}
                  isCurrentTier={subscription?.tier === tier}
                  isTrialing={isTrialing}
                  onSubscribe={handleSubscribe}
                  disabled={
                    hasActiveSubscription &&
                    subscription?.tier === tier
                  }
                />
              ))}
            </div>
          )}

          {/* Trial notice */}
          {!hasActiveSubscription && (
            <div className="mt-8 rounded-lg bg-blue-50 p-4 text-center">
              <div className="flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-2 text-sm font-medium text-blue-700">
                  All plans include a 90-day free trial. Cancel anytime.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Features Comparison */}
        <div className="mt-12">
          <h2 className="mb-6 text-center text-xl font-semibold text-grey-900">
            Compare Features
          </h2>
          <div className="overflow-hidden rounded-lg border border-grey-200 bg-white">
            <table className="min-w-full divide-y divide-grey-200">
              <thead className="bg-grey-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-grey-500">
                    Feature
                  </th>
                  {tiers.map((tier) => (
                    <th
                      key={tier}
                      className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-grey-500"
                    >
                      {tier}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-grey-200 bg-white">
                {[
                  { name: 'Real-time status updates', basic: true, pro: true, enterprise: true },
                  { name: 'Push notifications', basic: true, pro: true, enterprise: true },
                  { name: 'Client status page', basic: true, pro: true, enterprise: true },
                  { name: 'Live ETA tracking', basic: false, pro: true, enterprise: true },
                  { name: 'In-app messaging', basic: false, pro: true, enterprise: true },
                  { name: 'Priority notifications', basic: false, pro: true, enterprise: true },
                  { name: 'GPS location tracking', basic: false, pro: false, enterprise: true },
                  { name: 'Video/voice calls', basic: false, pro: false, enterprise: true },
                  { name: 'Team coordination', basic: false, pro: false, enterprise: true },
                  { name: 'Advanced analytics', basic: false, pro: false, enterprise: true },
                ].map((feature) => (
                  <tr key={feature.name}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-grey-900">
                      {feature.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      {feature.basic ? (
                        <svg
                          className="mx-auto h-5 w-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="mx-auto h-5 w-5 text-grey-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      {feature.pro ? (
                        <svg
                          className="mx-auto h-5 w-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="mx-auto h-5 w-5 text-grey-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      {feature.enterprise ? (
                        <svg
                          className="mx-auto h-5 w-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="mx-auto h-5 w-5 text-grey-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="mb-6 text-center text-xl font-semibold text-grey-900">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                q: 'What happens after my trial ends?',
                a: 'After your 90-day trial, you will be automatically charged based on your selected plan. You can cancel anytime before the trial ends.',
              },
              {
                q: 'Can I upgrade or downgrade my plan?',
                a: 'Yes! You can change your plan at any time through the billing portal. Changes take effect immediately.',
              },
              {
                q: 'Is there a contract or commitment?',
                a: 'No contracts! All plans are month-to-month. Cancel anytime with no penalties.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, American Express) through our secure Stripe payment processor.',
              },
            ].map((faq, index) => (
              <div key={index} className="rounded-lg border border-grey-200 bg-white p-4">
                <h3 className="font-medium text-grey-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-grey-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 text-center">
          <p className="text-sm text-grey-600">
            Have questions? Contact us at{' '}
            <a
              href="mailto:support@disasterrecovery.com.au"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              support@disasterrecovery.com.au
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
