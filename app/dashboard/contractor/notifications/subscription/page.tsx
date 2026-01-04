'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type RealtimeTier = 'BASIC' | 'PRO' | 'ENTERPRISE'

interface Subscription {
  id: string
  tier: RealtimeTier
  status: 'ACTIVE' | 'TRIAL' | 'CANCELLED' | 'EXPIRED'
  pricePerMonth: number
  trialEndsAt: string | null
  startDate: string
  endDate: string | null
}

const TIER_FEATURES: Record<RealtimeTier, {
  name: string
  price: number
  description: string
  features: string[]
  recommended?: boolean
}> = {
  BASIC: {
    name: 'Basic',
    price: 49,
    description: 'Essential real-time updates',
    features: [
      'Real-time status updates',
      'Push notifications',
      'Sound alerts',
      'SMS fallback',
      'Connection status indicator',
    ],
  },
  PRO: {
    name: 'Pro',
    price: 99,
    description: 'Enhanced communication',
    features: [
      'Everything in Basic',
      'Live ETA tracking',
      'In-app messaging with clients',
      'Priority notifications',
      'Quiet hours configuration',
      'Custom notification sounds',
    ],
    recommended: true,
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 199,
    description: 'Full-featured solution',
    features: [
      'Everything in Pro',
      'GPS live tracking',
      'Video/voice calling',
      'Priority dispatch queue',
      'Advanced analytics',
      'Dedicated support',
      'Custom integrations',
    ],
  },
}

export default function SubscriptionPage() {
  const router = useRouter()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubscribing, setIsSubscribing] = useState(false)

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      const res = await fetch('/api/realtime/subscription')
      if (res.ok) {
        const data = await res.json()
        setSubscription(data.subscription)
      }
    } catch (error) {
      console.error('Failed to fetch subscription:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubscribe = async (tier: RealtimeTier) => {
    setIsSubscribing(true)
    try {
      const res = await fetch('/api/realtime/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })

      if (res.ok) {
        await fetchSubscription()
      }
    } catch (error) {
      console.error('Failed to subscribe:', error)
    } finally {
      setIsSubscribing(false)
    }
  }

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) return

    try {
      const res = await fetch('/api/realtime/subscription', {
        method: 'DELETE',
      })

      if (res.ok) {
        await fetchSubscription()
      }
    } catch (error) {
      console.error('Failed to cancel:', error)
    }
  }

  const getTrialDaysRemaining = () => {
    if (!subscription?.trialEndsAt) return null
    const remaining = Math.ceil(
      (new Date(subscription.trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
    return remaining > 0 ? remaining : 0
  }

  const trialDays = getTrialDaysRemaining()

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4 max-w-5xl">
        <p className="text-center text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          ← Back
        </Button>
        <h1 className="text-2xl font-bold">Real-Time Subscription</h1>
        <p className="text-muted-foreground">
          Choose the plan that best fits your business needs
        </p>
      </div>

      {/* Current Status Banner */}
      {subscription && (
        <Card className={cn(
          'mb-8',
          subscription.status === 'TRIAL' && 'bg-teal-50 border-teal-200',
          subscription.status === 'ACTIVE' && 'bg-blue-50 border-blue-200',
          subscription.status === 'CANCELLED' && 'bg-gray-50 border-gray-200'
        )}>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">
                    {TIER_FEATURES[subscription.tier].name} Plan
                  </h3>
                  <Badge variant={subscription.status === 'TRIAL' ? 'secondary' : 'default'}>
                    {subscription.status}
                  </Badge>
                </div>
                {subscription.status === 'TRIAL' && trialDays !== null && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {trialDays} days remaining in your free trial
                  </p>
                )}
              </div>
              {subscription.status !== 'CANCELLED' && (
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel Subscription
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {(Object.entries(TIER_FEATURES) as [RealtimeTier, typeof TIER_FEATURES[RealtimeTier]][]).map(
          ([tier, config]) => {
            const isCurrentTier = subscription?.tier === tier
            const isActive = subscription?.status === 'ACTIVE' || subscription?.status === 'TRIAL'

            return (
              <Card
                key={tier}
                className={cn(
                  'relative',
                  config.recommended && 'border-teal-500 border-2',
                  isCurrentTier && isActive && 'ring-2 ring-teal-500'
                )}
              >
                {config.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-teal-500">Recommended</Badge>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="flex items-baseline justify-between">
                    <span>{config.name}</span>
                    <span className="text-2xl font-bold">
                      ${config.price}
                      <span className="text-sm font-normal text-muted-foreground">/mo</span>
                    </span>
                  </CardTitle>
                  <CardDescription>{config.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2">
                    {config.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-teal-500 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  {isCurrentTier && isActive ? (
                    <Button className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      className={cn(
                        'w-full',
                        config.recommended && 'bg-teal-500 hover:bg-teal-600'
                      )}
                      onClick={() => handleSubscribe(tier)}
                      disabled={isSubscribing}
                    >
                      {isSubscribing ? 'Processing...' : (
                        subscription ? `Switch to ${config.name}` : 'Start Free Trial'
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          }
        )}
      </div>

      {/* FAQ */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">How does the 3-month free trial work?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              New subscribers get full access to their chosen tier for 3 months at no cost.
              You&apos;ll only be charged after the trial ends.
            </p>
          </div>
          <div>
            <h4 className="font-medium">Can I upgrade or downgrade anytime?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Yes, you can change your plan at any time. Changes take effect immediately.
            </p>
          </div>
          <div>
            <h4 className="font-medium">What happens if I cancel?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              You&apos;ll retain access until the end of your current billing period.
              After that, real-time features will be disabled.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
