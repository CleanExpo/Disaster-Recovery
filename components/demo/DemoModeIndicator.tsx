'use client'

/**
 * Demo Mode Indicator
 *
 * A floating badge that shows demo mode is active.
 * Positioned in the corner of the screen.
 */

import { useDemo } from '@/lib/demo'

interface DemoModeIndicatorProps {
  position?: 'top-left' | 'top-right'
  showScenario?: boolean
}

export function DemoModeIndicator({
  position = 'top-left',
  showScenario = true,
}: DemoModeIndicatorProps) {
  const { state } = useDemo()

  if (!state.isDemo) {
    return null
  }

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
  }

  const scenarioLabels: Record<string, string> = {
    full_journey: 'Full Journey',
    live_tracking: 'Live Tracking',
    messaging: 'Messaging',
    new_job_alert: 'New Job Alert',
    multi_job: 'Multi-Job',
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-40 flex items-center gap-2`}>
      {/* Main Badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500 text-white rounded-full shadow-lg">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <span className="text-sm font-semibold tracking-wide">DEMO</span>
      </div>

      {/* Scenario Badge */}
      {showScenario && state.currentScenario && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900/80 text-white rounded-full text-sm">
          <span>{scenarioLabels[state.currentScenario] || state.currentScenario}</span>
          {state.isPlaying && !state.isPaused && (
            <span className="flex gap-0.5">
              <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          )}
          {state.isPaused && (
            <span className="text-xs text-orange-300">PAUSED</span>
          )}
        </div>
      )}

      {/* Speed Indicator */}
      {state.speed > 1 && (
        <div className="px-2 py-1 bg-teal-500 text-white rounded-full text-xs font-bold">
          {state.speed}x
        </div>
      )}
    </div>
  )
}

/**
 * Compact version for embedding in headers
 */
export function DemoModeBadge() {
  const { state } = useDemo()

  if (!state.isDemo) {
    return null
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium border border-orange-200 dark:border-orange-800">
      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
      <span>Demo Mode</span>
    </div>
  )
}
