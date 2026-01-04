'use client'

/**
 * Client Demo View
 *
 * Shows the client's job tracking interface
 * using demo data and simulated events.
 */

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useDemo, type DemoScenario, statusConfig, demoRoute } from '@/lib/demo'
import { DemoControlPanel, DemoModeIndicator } from '@/components/demo'
import { ConnectionIndicator } from '@/components/realtime/ConnectionIndicator'
import { ETADisplay } from '@/components/realtime/ETADisplay'
import { cn } from '@/lib/utils'
import type { JobStatus } from '@/lib/supabase/types'
import { MapPin, Phone, MessageSquare, Star, Navigation, User } from 'lucide-react'

const STATUS_STEPS: { status: JobStatus; label: string; icon: string }[] = [
  { status: 'pending', label: 'Request Submitted', icon: '📝' },
  { status: 'accepted', label: 'Contractor Assigned', icon: '✅' },
  { status: 'en_route', label: 'On The Way', icon: '🚗' },
  { status: 'on_site', label: 'Arrived', icon: '📍' },
  { status: 'in_progress', label: 'Work In Progress', icon: '🔧' },
  { status: 'completed', label: 'Completed', icon: '🎉' },
]

const statusIndex = (status: JobStatus): number => {
  const idx = STATUS_STEPS.findIndex((s) => s.status === status)
  return idx >= 0 ? idx : 0
}

export default function ClientDemoPage() {
  const searchParams = useSearchParams()
  const scenario = searchParams.get('scenario') as DemoScenario | null
  const { state, controls } = useDemo()

  // Auto-start scenario from URL param
  useEffect(() => {
    if (scenario && !state.currentScenario) {
      controls.startScenario(scenario)
    }
  }, [scenario, state.currentScenario, controls])

  const { activeJob, currentEta, trafficCondition, contractorLocation, routeProgress, messages } = state

  const currentStep = activeJob ? statusIndex(activeJob.status) : 0
  const isEnRoute = activeJob?.status === 'en_route'
  const isCompleted = activeJob?.status === 'completed'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DemoModeIndicator position="top-left" />
      <DemoControlPanel position="bottom-right" />

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Track Your Job
            </h1>
            <p className="text-sm text-gray-500">
              {activeJob?.serviceType || 'Loading...'}
            </p>
          </div>
          <ConnectionIndicator status="connected" showLabel size="sm" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-4">
        {activeJob ? (
          <>
            {/* ETA Banner */}
            {isEnRoute && currentEta !== null && (
              <Card className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border-teal-200 dark:border-teal-800">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🚗</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          Your contractor is on the way!
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activeJob.contractor?.businessName || 'Contractor'} is heading to your location
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <ETADisplay
                        etaMinutes={currentEta}
                        lastUpdated={new Date()}
                        size="lg"
                      />
                      {trafficCondition && (
                        <p className={cn(
                          'text-xs mt-1',
                          trafficCondition === 'heavy' && 'text-red-500',
                          trafficCondition === 'moderate' && 'text-amber-500',
                          trafficCondition === 'clear' && 'text-green-500'
                        )}>
                          {trafficCondition} traffic
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Map Preview */}
            {isEnRoute && contractorLocation && (
              <Card className="overflow-hidden">
                <div className="h-64 bg-gray-200 dark:bg-gray-700 relative">
                  {/* Simplified map visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Route line */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet">
                        {/* Background route */}
                        <polyline
                          points={demoRoute.map((p, i) => {
                            const x = 50 + (i / (demoRoute.length - 1)) * 300
                            const y = 50 + Math.sin(i * 0.5) * 30 + (i / demoRoute.length) * 100
                            return `${x},${y}`
                          }).join(' ')}
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        {/* Progress route */}
                        <polyline
                          points={demoRoute.slice(0, Math.floor(routeProgress * demoRoute.length) + 1).map((p, i) => {
                            const x = 50 + (i / (demoRoute.length - 1)) * 300
                            const y = 50 + Math.sin(i * 0.5) * 30 + (i / demoRoute.length) * 100
                            return `${x},${y}`
                          }).join(' ')}
                          fill="none"
                          stroke="#14B8A6"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>

                      {/* Contractor marker */}
                      <div
                        className="absolute transition-all duration-500"
                        style={{
                          left: `${12.5 + routeProgress * 75}%`,
                          top: `${20 + Math.sin(routeProgress * Math.PI * 2) * 12 + routeProgress * 40}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <div className="relative">
                          <div className="absolute -inset-4 bg-teal-400/30 rounded-full animate-ping" />
                          <div className="relative bg-teal-500 text-white p-2 rounded-full shadow-lg">
                            <Navigation className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* Destination marker */}
                      <div
                        className="absolute"
                        style={{
                          right: '10%',
                          bottom: '20%',
                          transform: 'translate(50%, 50%)',
                        }}
                      >
                        <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                          <MapPin className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 px-3 py-2 rounded-lg text-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-3 h-3 bg-teal-500 rounded-full" />
                          <span className="text-gray-600 dark:text-gray-300">Contractor</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full" />
                          <span className="text-gray-600 dark:text-gray-300">Your Location</span>
                        </div>
                      </div>

                      {/* Distance */}
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 px-3 py-2 rounded-lg text-sm font-medium">
                        {((1 - routeProgress) * 5).toFixed(1)} km away
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Progress Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Job Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                  <div
                    className="absolute left-5 top-0 w-0.5 bg-teal-500 transition-all duration-500"
                    style={{
                      height: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%`,
                    }}
                  />

                  {/* Steps */}
                  <div className="space-y-6">
                    {STATUS_STEPS.map((step, index) => {
                      const isActive = index === currentStep
                      const isPast = index < currentStep

                      return (
                        <div key={step.status} className="relative flex items-start gap-4">
                          {/* Step Icon */}
                          <div
                            className={cn(
                              'relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all',
                              isPast || isActive
                                ? 'bg-teal-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                            )}
                          >
                            {isPast ? '✓' : step.icon}
                          </div>

                          {/* Step Content */}
                          <div className="flex-1 pt-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  'font-medium',
                                  isActive && 'text-teal-600 dark:text-teal-400',
                                  !isPast && !isActive && 'text-gray-400'
                                )}
                              >
                                {step.label}
                              </span>
                              {isActive && !isCompleted && (
                                <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 animate-pulse">
                                  Current
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contractor Info */}
            {activeJob.contractor && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Your Contractor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl">
                      👷
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {activeJob.contractor.businessName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {activeJob.contractor.user.name}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-medium">{activeJob.contractor.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {activeJob.contractor.completedJobs} jobs completed
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="relative">
                        <MessageSquare className="w-4 h-4" />
                        {messages.length > 0 && (
                          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {messages.length}
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Messages */}
            {messages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {messages.map(msg => (
                      <div
                        key={msg.id}
                        className={cn(
                          'flex gap-3',
                          msg.senderType === 'client' && 'flex-row-reverse'
                        )}
                      >
                        <div className={cn(
                          'h-8 w-8 rounded-full flex items-center justify-center text-sm flex-shrink-0',
                          msg.senderType === 'client'
                            ? 'bg-blue-100 dark:bg-blue-900/30'
                            : 'bg-gray-100 dark:bg-gray-800'
                        )}>
                          {msg.senderType === 'client' ? <User className="w-4 h-4" /> : '👷'}
                        </div>
                        <div className={cn(
                          'max-w-[80%] px-4 py-2 rounded-2xl',
                          msg.senderType === 'client'
                            ? 'bg-blue-500 text-white rounded-br-none'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
                        )}>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Completion Message */}
            {isCompleted && (
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="py-8 text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
                    Job Completed!
                  </h3>
                  <p className="text-green-600 dark:text-green-400 mb-4">
                    Your contractor has finished the work.
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Rate Your Experience
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No Active Job
              </h3>
              <p className="text-gray-500 mb-4">
                Start a demo scenario to see the client tracking experience.
              </p>
              <Button onClick={() => controls.startScenario('full_journey')}>
                Start Full Journey Demo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Help */}
        <div className="text-center text-sm text-gray-500">
          <p>
            Need help?{' '}
            <a href="mailto:support@disasterrecovery.com.au" className="text-teal-600 hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
