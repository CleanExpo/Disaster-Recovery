'use client'

/**
 * Contractor Demo View
 *
 * Shows the contractor's job management interface
 * using demo data and simulated events.
 */

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useDemo, type DemoScenario, statusConfig, priorityConfig } from '@/lib/demo'
import { DemoControlPanel, DemoModeIndicator } from '@/components/demo'
import { ConnectionIndicator } from '@/components/realtime/ConnectionIndicator'
import { ETADisplay } from '@/components/realtime/ETADisplay'
import { cn } from '@/lib/utils'
import type { JobStatus } from '@/lib/supabase/types'
import { MapPin, Phone, MessageSquare, Navigation, Clock, CheckCircle2 } from 'lucide-react'

export default function ContractorDemoPage() {
  const searchParams = useSearchParams()
  const scenario = searchParams.get('scenario') as DemoScenario | null
  const { state, controls } = useDemo()

  // Auto-start scenario from URL param
  useEffect(() => {
    if (scenario && !state.currentScenario) {
      controls.startScenario(scenario)
    }
  }, [scenario, state.currentScenario, controls])

  const { jobs, activeJob, currentEta, trafficCondition, messages } = state
  const activeJobs = jobs.filter(j => j.status !== 'completed' && j.status !== 'cancelled')
  const completedToday = jobs.filter(j => j.status === 'completed').length

  // Status action buttons based on current status
  const getNextStatusAction = (status: JobStatus): { label: string; nextStatus: JobStatus; icon: React.ReactNode } | null => {
    switch (status) {
      case 'pending':
        return { label: 'Accept Job', nextStatus: 'accepted', icon: <CheckCircle2 className="w-4 h-4" /> }
      case 'accepted':
        return { label: 'Start Driving', nextStatus: 'en_route', icon: <Navigation className="w-4 h-4" /> }
      case 'en_route':
        return { label: "I've Arrived", nextStatus: 'on_site', icon: <MapPin className="w-4 h-4" /> }
      case 'on_site':
        return { label: 'Start Work', nextStatus: 'in_progress', icon: <Clock className="w-4 h-4" /> }
      case 'in_progress':
        return { label: 'Complete Job', nextStatus: 'completed', icon: <CheckCircle2 className="w-4 h-4" /> }
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DemoModeIndicator position="top-left" />
      <DemoControlPanel position="bottom-right" />

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Contractor Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              {activeJobs.length} active • {completedToday} completed today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ConnectionIndicator status="connected" showLabel size="sm" />
            <div className="h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-400">
              👷
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Active Job Card - Featured */}
        {activeJob && (
          <Card className={cn(
            'border-2 transition-all',
            activeJob.priority === 'emergency' && 'border-red-400 bg-red-50/50 dark:bg-red-900/20',
            activeJob.priority === 'urgent' && 'border-orange-400 bg-orange-50/50 dark:bg-orange-900/20',
            activeJob.priority === 'normal' && 'border-teal-400 bg-teal-50/50 dark:bg-teal-900/20'
          )}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={priorityConfig[activeJob.priority].color}>
                      {priorityConfig[activeJob.priority].label}
                    </Badge>
                    <Badge className={statusConfig[activeJob.status].color}>
                      {statusConfig[activeJob.status].label}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{activeJob.serviceType}</CardTitle>
                </div>
                {currentEta !== null && activeJob.status === 'en_route' && (
                  <ETADisplay
                    etaMinutes={currentEta}
                    lastUpdated={new Date()}
                    size="lg"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Client Info */}
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl">
                  👤
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {activeJob.client.name}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {activeJob.client.address}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 relative">
                    <MessageSquare className="w-4 h-4" />
                    {messages.length > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {messages.length}
                      </span>
                    )}
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {activeJob.description}
                </p>
              </div>

              {/* Traffic Info */}
              {trafficCondition && activeJob.status === 'en_route' && (
                <div className={cn(
                  'flex items-center gap-2 p-2 rounded-lg text-sm',
                  trafficCondition === 'clear' && 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
                  trafficCondition === 'moderate' && 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
                  trafficCondition === 'heavy' && 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                )}>
                  <Navigation className="w-4 h-4" />
                  <span>Traffic: {trafficCondition}</span>
                  {activeJob.distanceKm && (
                    <span className="ml-auto">{activeJob.distanceKm.toFixed(1)} km away</span>
                  )}
                </div>
              )}

              {/* Action Button */}
              {getNextStatusAction(activeJob.status) && (
                <Button
                  onClick={() => controls.updateJobStatus(getNextStatusAction(activeJob.status)!.nextStatus)}
                  className="w-full h-12 text-base gap-2 bg-teal-600 hover:bg-teal-700"
                >
                  {getNextStatusAction(activeJob.status)!.icon}
                  {getNextStatusAction(activeJob.status)!.label}
                </Button>
              )}

              {/* Messages Preview */}
              {messages.length > 0 && (
                <div className="border-t pt-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recent Messages
                  </h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {messages.slice(-3).map(msg => (
                      <div
                        key={msg.id}
                        className={cn(
                          'p-2 rounded-lg text-sm',
                          msg.senderType === 'client'
                            ? 'bg-gray-100 dark:bg-gray-800'
                            : 'bg-teal-50 dark:bg-teal-900/30'
                        )}
                      >
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {msg.senderType === 'client' ? activeJob.client.name : 'You'}:
                        </span>{' '}
                        <span className="text-gray-600 dark:text-gray-400">{msg.content}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Other Jobs */}
        {activeJobs.filter(j => j.id !== activeJob?.id).length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Other Jobs</h2>
            <div className="space-y-3">
              {activeJobs.filter(j => j.id !== activeJob?.id).map(job => (
                <Card key={job.id} className="hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                  <CardContent className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={priorityConfig[job.priority].color} variant="outline">
                            {job.priority}
                          </Badge>
                          <Badge className={statusConfig[job.status].color} variant="outline">
                            {statusConfig[job.status].label}
                          </Badge>
                        </div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {job.client.name}
                        </p>
                        <p className="text-sm text-gray-500">{job.serviceType}</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed Jobs */}
        {jobs.filter(j => j.status === 'completed').length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Completed Today</h2>
            <div className="space-y-2">
              {jobs.filter(j => j.status === 'completed').map(job => (
                <Card key={job.id} className="bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
                  <CardContent className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {job.client.name}
                        </p>
                        <p className="text-sm text-gray-500">{job.serviceType}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        Completed
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {jobs.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-4xl mb-4">📭</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No Jobs Yet
              </h3>
              <p className="text-gray-500 mb-4">
                New job requests will appear here in real-time.
              </p>
              <Button onClick={controls.triggerNewJob} variant="outline">
                Simulate New Job
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
