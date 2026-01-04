'use client'

/**
 * Split Screen Demo View
 *
 * Shows contractor and client views side-by-side
 * for tradeshow booth demonstrations.
 */

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useDemo, type DemoScenario, statusConfig, priorityConfig, demoRoute } from '@/lib/demo'
import { DemoControlPanel, DemoModeIndicator } from '@/components/demo'
import { ConnectionIndicator } from '@/components/realtime/ConnectionIndicator'
import { ETADisplay } from '@/components/realtime/ETADisplay'
import { cn } from '@/lib/utils'
import type { JobStatus } from '@/lib/supabase/types'
import {
  MapPin,
  Phone,
  MessageSquare,
  Navigation,
  Clock,
  CheckCircle2,
  Star,
  User,
  Monitor,
  Users,
} from 'lucide-react'

const STATUS_STEPS: { status: JobStatus; label: string; icon: string }[] = [
  { status: 'pending', label: 'Request', icon: '📝' },
  { status: 'accepted', label: 'Assigned', icon: '✅' },
  { status: 'en_route', label: 'On Way', icon: '🚗' },
  { status: 'on_site', label: 'Arrived', icon: '📍' },
  { status: 'in_progress', label: 'Working', icon: '🔧' },
  { status: 'completed', label: 'Done', icon: '🎉' },
]

const statusIndex = (status: JobStatus): number => {
  const idx = STATUS_STEPS.findIndex((s) => s.status === status)
  return idx >= 0 ? idx : 0
}

export default function SplitScreenDemoPage() {
  const searchParams = useSearchParams()
  const scenario = searchParams.get('scenario') as DemoScenario | null
  const { state, controls } = useDemo()

  // Auto-start scenario from URL param
  useEffect(() => {
    if (scenario && !state.currentScenario) {
      controls.startScenario(scenario)
    }
  }, [scenario, state.currentScenario, controls])

  const {
    activeJob,
    currentEta,
    trafficCondition,
    contractorLocation,
    routeProgress,
    messages,
  } = state

  const currentStep = activeJob ? statusIndex(activeJob.status) : 0
  const isEnRoute = activeJob?.status === 'en_route'
  const isCompleted = activeJob?.status === 'completed'

  // Status action buttons for contractor
  const getNextStatusAction = (status: JobStatus) => {
    switch (status) {
      case 'pending':
        return { label: 'Accept', nextStatus: 'accepted' as JobStatus }
      case 'accepted':
        return { label: 'Start Drive', nextStatus: 'en_route' as JobStatus }
      case 'en_route':
        return { label: 'Arrived', nextStatus: 'on_site' as JobStatus }
      case 'on_site':
        return { label: 'Start Work', nextStatus: 'in_progress' as JobStatus }
      case 'in_progress':
        return { label: 'Complete', nextStatus: 'completed' as JobStatus }
      default:
        return null
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      <DemoModeIndicator position="top-left" />
      <DemoControlPanel position="bottom-right" />

      {/* Header Bar */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold text-white">Real-Time Job Coordination</h1>
          <Badge className="bg-orange-500 text-white">LIVE DEMO</Badge>
        </div>
        <ConnectionIndicator status="connected" showLabel size="sm" />
      </header>

      {/* Split Panels */}
      <div className="flex-1 flex overflow-hidden">
        {/* Contractor Panel */}
        <div className="w-1/2 border-r border-gray-700 flex flex-col overflow-hidden">
          <div className="bg-teal-600 px-4 py-2 flex items-center gap-2 flex-shrink-0">
            <Monitor className="w-4 h-4 text-white" />
            <span className="font-semibold text-white text-sm">Contractor View</span>
          </div>
          <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 overflow-y-auto">
            {activeJob ? (
              <div className="space-y-4">
                {/* Job Card */}
                <Card className={cn(
                  'border-2',
                  activeJob.priority === 'emergency' && 'border-red-400 bg-red-50/50 dark:bg-red-900/20',
                  activeJob.priority === 'urgent' && 'border-orange-400 bg-orange-50/50 dark:bg-orange-900/20',
                  activeJob.priority === 'normal' && 'border-teal-400 bg-teal-50/50 dark:bg-teal-900/20'
                )}>
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge className={priorityConfig[activeJob.priority].color}>
                          {activeJob.priority}
                        </Badge>
                        <Badge className={statusConfig[activeJob.status].color}>
                          {statusConfig[activeJob.status].label}
                        </Badge>
                      </div>
                      {currentEta !== null && isEnRoute && (
                        <div className="text-right">
                          <span className="text-2xl font-bold text-teal-600">{currentEta}</span>
                          <span className="text-sm text-gray-500 ml-1">min</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {activeJob.serviceType}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                        {activeJob.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 p-2 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        👤
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                          {activeJob.client.name}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {activeJob.client.address}
                        </p>
                      </div>
                    </div>

                    {trafficCondition && isEnRoute && (
                      <div className={cn(
                        'flex items-center gap-2 p-2 rounded text-xs',
                        trafficCondition === 'clear' && 'bg-green-100 text-green-700',
                        trafficCondition === 'moderate' && 'bg-amber-100 text-amber-700',
                        trafficCondition === 'heavy' && 'bg-red-100 text-red-700'
                      )}>
                        <Navigation className="w-3 h-3" />
                        Traffic: {trafficCondition}
                      </div>
                    )}

                    {getNextStatusAction(activeJob.status) && (
                      <Button
                        onClick={() => controls.updateJobStatus(getNextStatusAction(activeJob.status)!.nextStatus)}
                        className="w-full bg-teal-600 hover:bg-teal-700"
                        size="sm"
                      >
                        {getNextStatusAction(activeJob.status)!.label}
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Messages */}
                {messages.length > 0 && (
                  <Card>
                    <CardHeader className="py-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Messages
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="space-y-2 max-h-24 overflow-y-auto">
                        {messages.slice(-3).map(msg => (
                          <div
                            key={msg.id}
                            className={cn(
                              'p-2 rounded text-xs',
                              msg.senderType === 'contractor'
                                ? 'bg-teal-50 dark:bg-teal-900/30'
                                : 'bg-gray-100 dark:bg-gray-800'
                            )}
                          >
                            <span className="font-medium">
                              {msg.senderType === 'contractor' ? 'You' : activeJob.client.name}:
                            </span>{' '}
                            {msg.content}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <p className="mb-2">Start a demo scenario</p>
                  <Button size="sm" onClick={() => controls.startScenario('full_journey')}>
                    Full Journey
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Client Panel */}
        <div className="w-1/2 flex flex-col overflow-hidden">
          <div className="bg-blue-600 px-4 py-2 flex items-center gap-2 flex-shrink-0">
            <Users className="w-4 h-4 text-white" />
            <span className="font-semibold text-white text-sm">Client View</span>
          </div>
          <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 overflow-y-auto">
            {activeJob ? (
              <div className="space-y-4">
                {/* ETA Banner */}
                {isEnRoute && currentEta !== null && (
                  <Card className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border-teal-200">
                    <CardContent className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🚗</span>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                              Contractor on the way!
                            </p>
                            <p className="text-xs text-gray-500">
                              {activeJob.contractor?.businessName}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-teal-600">{currentEta}</span>
                          <span className="text-xs text-gray-500 ml-1">min</span>
                          {trafficCondition && (
                            <p className={cn(
                              'text-xs',
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

                {/* Mini Map */}
                {isEnRoute && contractorLocation && (
                  <Card className="overflow-hidden">
                    <div className="h-32 bg-gray-200 dark:bg-gray-700 relative">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="xMidYMid meet">
                        <polyline
                          points="30,30 90,50 150,35 210,60 270,90"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="3"
                        />
                        <polyline
                          points={`30,30 ${30 + routeProgress * 240},${30 + routeProgress * 60}`}
                          fill="none"
                          stroke="#14B8A6"
                          strokeWidth="3"
                        />
                      </svg>
                      <div
                        className="absolute transition-all duration-500"
                        style={{
                          left: `${10 + routeProgress * 80}%`,
                          top: `${25 + routeProgress * 50}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <div className="bg-teal-500 text-white p-1.5 rounded-full shadow-lg">
                          <Navigation className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="absolute right-4 bottom-4">
                        <div className="bg-red-500 text-white p-1.5 rounded-full shadow-lg">
                          <MapPin className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Progress */}
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="flex items-center gap-1">
                      {STATUS_STEPS.map((step, index) => {
                        const isPast = index < currentStep
                        const isActive = index === currentStep
                        return (
                          <div key={step.status} className="flex-1 flex flex-col items-center">
                            <div
                              className={cn(
                                'w-8 h-8 rounded-full flex items-center justify-center text-sm',
                                isPast || isActive
                                  ? 'bg-teal-500 text-white'
                                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                              )}
                            >
                              {isPast ? '✓' : step.icon}
                            </div>
                            <span className={cn(
                              'text-xs mt-1',
                              isActive && 'font-medium text-teal-600'
                            )}>
                              {step.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Contractor */}
                {activeJob.contractor && (
                  <Card>
                    <CardContent className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl">
                          👷
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                            {activeJob.contractor.businessName}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs text-gray-600">{activeJob.contractor.rating}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-600">{activeJob.contractor.completedJobs} jobs</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Messages */}
                {messages.length > 0 && (
                  <Card>
                    <CardHeader className="py-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Messages
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="space-y-2 max-h-24 overflow-y-auto">
                        {messages.slice(-3).map(msg => (
                          <div
                            key={msg.id}
                            className={cn(
                              'flex gap-2',
                              msg.senderType === 'client' && 'flex-row-reverse'
                            )}
                          >
                            <div className={cn(
                              'max-w-[80%] px-3 py-1.5 rounded-xl text-xs',
                              msg.senderType === 'client'
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'
                            )}>
                              {msg.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Completion */}
                {isCompleted && (
                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
                    <CardContent className="py-4 text-center">
                      <div className="text-3xl mb-2">🎉</div>
                      <p className="font-semibold text-green-800 dark:text-green-300">
                        Job Completed!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <p className="mb-2">Waiting for job...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <footer className="bg-gray-800 border-t border-gray-700 px-4 py-2 flex items-center justify-between text-xs text-gray-400 flex-shrink-0">
        <div className="flex items-center gap-4">
          <span>Scenario: {state.currentScenario || 'None'}</span>
          <span>Step: {state.currentStep}/{state.totalSteps}</span>
          <span>Speed: {state.speed}x</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Press ? for shortcuts</span>
          <span>{state.elapsedTime}s elapsed</span>
        </div>
      </footer>
    </div>
  )
}
