'use client'

import { useTierGating, getTierInfo } from '@/hooks/useTierGating'
import type { RealtimeTier } from '@/lib/supabase/types'

interface FeatureGateProps {
  jobId: string
  requiredTier: 'PRO' | 'ENTERPRISE'
  feature: 'liveEta' | 'messaging' | 'gpsTracking'
  children: React.ReactNode
  fallback?: React.ReactNode
}

const TIER_ORDER: Record<string, number> = {
  BASIC: 1,
  PRO: 2,
  ENTERPRISE: 3,
}

export function FeatureGate({
  jobId,
  requiredTier,
  feature,
  children,
  fallback,
}: FeatureGateProps) {
  const { tier, isLoading } = useTierGating({ jobId })

  if (isLoading) {
    return (
      <div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      </div>
    )
  }

  const currentLevel = tier ? TIER_ORDER[tier] || 0 : 0
  const requiredLevel = TIER_ORDER[requiredTier]
  const hasAccess = currentLevel >= requiredLevel

  if (hasAccess) {
    return <>{children}</>
  }

  return fallback ?? <TierUpgradePrompt requiredTier={requiredTier} feature={feature} />
}

interface TierUpgradePromptProps {
  requiredTier: 'PRO' | 'ENTERPRISE'
  feature: 'liveEta' | 'messaging' | 'gpsTracking'
  compact?: boolean
}

export function TierUpgradePrompt({ requiredTier, feature, compact = false }: TierUpgradePromptProps) {
  const tierInfo = getTierInfo(requiredTier as RealtimeTier)

  const featureLabels: Record<string, { title: string; description: string }> = {
    liveEta: {
      title: 'Live ETA Tracking',
      description: 'See real-time estimated arrival times based on live contractor location',
    },
    messaging: {
      title: 'In-App Messaging',
      description: 'Chat directly with your assigned contractor',
    },
    gpsTracking: {
      title: 'Live GPS Tracking',
      description: 'Watch your contractor\'s location in real-time on the map',
    },
  }

  const { title, description } = featureLabels[feature] || {
    title: 'Premium Feature',
    description: 'This feature requires an upgraded plan',
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
        <span className="text-lg">🔒</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Upgrade to {tierInfo.name} to unlock
          </p>
        </div>
        <button
          onClick={() => window.open('/dashboard/contractor/realtime/pricing', '_blank')}
          className="px-3 py-1 text-xs font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-full transition-colors"
        >
          Upgrade
        </button>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
          <span className="text-2xl">🔒</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-sm mx-auto">
          {description}
        </p>

        <div className="mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg inline-block">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Available with</p>
          <p className={`font-semibold ${tierInfo.colour}`}>
            {tierInfo.name} Plan - ${tierInfo.price}/month
          </p>
        </div>

        <div className="space-y-2 mb-6">
          {tierInfo.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-teal-500">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => window.open('/dashboard/contractor/realtime/pricing', '_blank')}
          className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
        >
          Upgrade to {tierInfo.name}
        </button>

        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Contact support@disasterrecovery.com.au for questions
        </p>
      </div>
    </div>
  )
}
