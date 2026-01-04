'use client'

/**
 * Demo Control Panel
 *
 * Floating control panel for booth operators to manage
 * demo scenarios during tradeshow presentations.
 */

import { useState, useEffect, useCallback } from 'react'
import { useDemo, type DemoScenario, type DemoSpeed } from '@/lib/demo'
import {
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  MapPin,
  MessageSquare,
  Bell,
  X,
  Minimize2,
  Maximize2,
  Keyboard,
} from 'lucide-react'

const SCENARIOS: { value: DemoScenario; label: string; duration: string; description: string }[] = [
  {
    value: 'full_journey',
    label: 'Full Journey',
    duration: '90s',
    description: 'Complete job lifecycle from request to completion',
  },
  {
    value: 'live_tracking',
    label: 'Live Tracking',
    duration: '60s',
    description: 'Contractor moving on map with ETA updates',
  },
  {
    value: 'messaging',
    label: 'Messaging Demo',
    duration: '30s',
    description: 'Real-time chat between client and contractor',
  },
  {
    value: 'new_job_alert',
    label: 'New Job Alert',
    duration: '10s',
    description: 'Urgent job notification with sound',
  },
  {
    value: 'multi_job',
    label: 'Multi-Job Dashboard',
    duration: 'Instant',
    description: 'Admin view with multiple active jobs',
  },
]

interface DemoControlPanelProps {
  defaultMinimized?: boolean
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

export function DemoControlPanel({
  defaultMinimized = false,
  position = 'bottom-right',
}: DemoControlPanelProps) {
  const { state, controls } = useDemo()
  const [isMinimized, setIsMinimized] = useState(defaultMinimized)
  const [isScenarioOpen, setIsScenarioOpen] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)

  const selectedScenario = SCENARIOS.find(s => s.value === state.currentScenario)
  const progress = state.totalSteps > 0 ? (state.currentStep / state.totalSteps) * 100 : 0

  // Keyboard shortcuts
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // Don't trigger if typing in an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return
    }

    switch (e.key.toLowerCase()) {
      case ' ':
        e.preventDefault()
        if (state.isPlaying && !state.isPaused) {
          controls.pause()
        } else {
          controls.play()
        }
        break
      case 'r':
        controls.reset()
        break
      case '1':
        controls.startScenario('full_journey')
        break
      case '2':
        controls.startScenario('live_tracking')
        break
      case '3':
        controls.startScenario('messaging')
        break
      case '4':
        controls.startScenario('new_job_alert')
        break
      case '5':
        controls.startScenario('multi_job')
        break
      case '+':
      case '=':
        const nextSpeed = state.speed === 1 ? 2 : state.speed === 2 ? 4 : 4
        controls.setSpeed(nextSpeed as DemoSpeed)
        break
      case '-':
        const prevSpeed = state.speed === 4 ? 2 : state.speed === 2 ? 1 : 1
        controls.setSpeed(prevSpeed as DemoSpeed)
        break
      case 'm':
        setIsMinimized(prev => !prev)
        break
      case 'n':
        controls.triggerNewJob()
        break
      case '?':
        setShowShortcuts(prev => !prev)
        break
    }
  }, [state, controls])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  // Position classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  }

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className={`fixed ${positionClasses[position]} z-50 flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors`}
      >
        <span className="animate-pulse w-2 h-2 bg-white rounded-full" />
        <span className="font-medium">DEMO</span>
        <Maximize2 className="w-4 h-4" />
      </button>
    )
  }

  return (
    <>
      <div
        className={`fixed ${positionClasses[position]} z-50 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="flex items-center gap-2">
            <span className="animate-pulse w-2 h-2 bg-white rounded-full" />
            <span className="font-semibold">DEMO MODE</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowShortcuts(true)}
              className="p-1.5 hover:bg-white/20 rounded transition-colors"
              title="Keyboard shortcuts (?)"
            >
              <Keyboard className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 hover:bg-white/20 rounded transition-colors"
              title="Minimize (M)"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Scenario Selector */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Scenario
            </label>
            <button
              onClick={() => setIsScenarioOpen(!isScenarioOpen)}
              className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-300 transition-colors"
            >
              <span className="text-sm text-gray-900 dark:text-gray-100">
                {selectedScenario?.label || 'Select a scenario'}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isScenarioOpen ? 'rotate-180' : ''}`} />
            </button>

            {isScenarioOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-10">
                {SCENARIOS.map((scenario, index) => (
                  <button
                    key={scenario.value}
                    onClick={() => {
                      controls.startScenario(scenario.value)
                      setIsScenarioOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {scenario.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{index + 1}</span>
                        <span className="text-xs text-orange-500">{scenario.duration}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {scenario.description}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={state.isPaused || !state.isPlaying ? controls.play : controls.pause}
              disabled={!state.currentScenario}
              className="flex items-center justify-center w-12 h-12 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-full transition-colors"
              title={state.isPaused || !state.isPlaying ? 'Play (Space)' : 'Pause (Space)'}
            >
              {state.isPaused || !state.isPlaying ? (
                <Play className="w-5 h-5 ml-0.5" />
              ) : (
                <Pause className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={controls.reset}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full transition-colors"
              title="Reset (R)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Speed Control */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Speed
            </label>
            <div className="flex gap-1">
              {([1, 2, 4] as DemoSpeed[]).map(speed => (
                <button
                  key={speed}
                  onClick={() => controls.setSpeed(speed)}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    state.speed === speed
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Progress */}
          {state.currentScenario && (
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>{state.stepLabel || 'Ready'}</span>
                <span>Step {state.currentStep}/{state.totalSteps}</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-right text-xs text-gray-400 mt-1">
                {state.elapsedTime}s elapsed
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Quick Actions
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={controls.moveContractor}
                className="flex flex-col items-center gap-1 p-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Move Contractor"
              >
                <MapPin className="w-4 h-4 text-teal-500" />
                <span className="text-xs text-gray-600 dark:text-gray-300">Move</span>
              </button>
              <button
                onClick={() => controls.sendMessage("Hi, I'm on my way!", 'contractor')}
                className="flex flex-col items-center gap-1 p-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Send Message"
              >
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-gray-600 dark:text-gray-300">Message</span>
              </button>
              <button
                onClick={controls.triggerNewJob}
                className="flex flex-col items-center gap-1 p-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Trigger Alert (N)"
              >
                <Bell className="w-4 h-4 text-orange-500" />
                <span className="text-xs text-gray-600 dark:text-gray-300">New Job</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Keyboard Shortcuts
              </h3>
              <button
                onClick={() => setShowShortcuts(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-2 text-sm">
              {[
                { key: 'Space', action: 'Play / Pause' },
                { key: 'R', action: 'Reset scenario' },
                { key: '1-5', action: 'Quick select scenario' },
                { key: '+ / -', action: 'Speed up / slow down' },
                { key: 'M', action: 'Toggle control panel' },
                { key: 'N', action: 'Trigger new job alert' },
                { key: '?', action: 'Show this help' },
              ].map(shortcut => (
                <div key={shortcut.key} className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded text-xs font-mono">
                    {shortcut.key}
                  </kbd>
                  <span className="text-gray-600 dark:text-gray-400">{shortcut.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
