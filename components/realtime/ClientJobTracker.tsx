'use client'

import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ConnectionIndicator } from './ConnectionIndicator'
import { ETADisplay } from './ETADisplay'
import { MapPreview } from './MapPreview'
import { FeatureGate, TierUpgradePrompt } from './FeatureGate'
import { JobMessaging } from './JobMessaging'
import { useRealtimeConnection } from '@/hooks/useRealtimeConnection'
import { useContractorLocation } from '@/hooks/useContractorLocation'
import { useETACalculation } from '@/hooks/useETACalculation'
import { useTierGating } from '@/hooks/useTierGating'
import type {
  JobStatus,
  RealtimeJobEvent,
  ConnectionStatus,
  ContractorLocation,
  LocationUpdateEvent,
  ETAUpdateEvent,
  MessageSentEvent,
  TypingStartEvent,
  TypingStopEvent,
} from '@/lib/supabase/types'
import { cn } from '@/lib/utils'

interface ContractorInfo {
  id: string
  businessName: string
  contactName?: string
  phone?: string
  rating: number
  completedJobs: number
  avatar?: string
}

interface JobDetails {
  id: string
  serviceType: string
  address: string
  latitude?: number
  longitude?: number
  status: JobStatus
  priority: 'normal' | 'urgent' | 'emergency'
  createdAt: string
  scheduledFor?: string
  eta?: number
  contractor?: ContractorInfo
  statusHistory: {
    status: JobStatus
    timestamp: string
    message?: string
  }[]
}

interface ClientJobTrackerProps {
  jobId: string
  userId: string
  initialJob?: JobDetails
  className?: string
}

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

export function ClientJobTracker({
  jobId,
  userId,
  initialJob,
  className,
}: ClientJobTrackerProps) {
  const [job, setJob] = useState<JobDetails | null>(initialJob || null)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected')
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [contractorLocation, setContractorLocation] = useState<ContractorLocation | null>(null)
  const [showMessaging, setShowMessaging] = useState(false)
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [isContractorTyping, setIsContractorTyping] = useState(false)

  // Tier gating
  const { tier, hasLiveEta, hasMessaging, hasGpsTracking, isLoading: tierLoading } = useTierGating({
    jobId,
  })

  // Live ETA calculation
  const { eta: etaData, refetch: refetchETA } = useETACalculation({
    jobId,
    enabled: hasLiveEta && (job?.status === 'en_route' || job?.status === 'accepted'),
    refreshInterval: 60000,
  })

  // Contractor location tracking (fallback polling)
  const { location: polledLocation } = useContractorLocation({
    jobId,
    enabled: hasGpsTracking && (job?.status === 'en_route' || job?.status === 'on_site'),
    pollingInterval: 30000,
  })

  // Use polled location if no realtime update
  useEffect(() => {
    if (polledLocation && !contractorLocation) {
      setContractorLocation(polledLocation)
    }
  }, [polledLocation, contractorLocation])

  // Handle incoming job events
  const handleJobEvent = useCallback(
    (event: RealtimeJobEvent) => {
      if (event.jobId !== jobId) return

      setLastUpdate(new Date())

      switch (event.type) {
        case 'STATUS_CHANGED':
          setJob((prev) => {
            if (!prev) return prev
            return {
              ...prev,
              status: event.status!,
              eta: event.eta,
              statusHistory: [
                ...prev.statusHistory,
                {
                  status: event.status!,
                  timestamp: event.timestamp,
                  message: event.message,
                },
              ],
            }
          })
          // Refetch ETA when status changes
          if (event.status === 'en_route' || event.status === 'accepted') {
            refetchETA()
          }
          break

        case 'JOB_CANCELLED':
          setJob((prev) => (prev ? { ...prev, status: 'cancelled' } : prev))
          break
      }
    },
    [jobId, refetchETA]
  )

  // Handle location updates
  const handleLocationUpdate = useCallback(
    (event: LocationUpdateEvent) => {
      if (event.jobId !== jobId) return
      setContractorLocation(event.location)
      setLastUpdate(new Date())
    },
    [jobId]
  )

  // Handle ETA updates
  const handleETAUpdate = useCallback(
    (event: ETAUpdateEvent) => {
      if (event.jobId !== jobId) return
      setJob((prev) => (prev ? { ...prev, eta: event.eta } : prev))
      setLastUpdate(new Date())
    },
    [jobId]
  )

  // Handle new messages
  const handleMessageSent = useCallback(
    (event: MessageSentEvent) => {
      if (event.jobId !== jobId) return
      if (event.senderId !== userId) {
        setUnreadMessages((prev) => prev + 1)
      }
    },
    [jobId, userId]
  )

  // Handle typing indicators
  const handleTypingStart = useCallback(
    (event: TypingStartEvent) => {
      if (event.jobId !== jobId) return
      if (event.senderType === 'contractor') {
        setIsContractorTyping(true)
      }
    },
    [jobId]
  )

  const handleTypingStop = useCallback(
    (event: TypingStopEvent) => {
      if (event.jobId !== jobId) return
      if (event.senderType === 'contractor') {
        setIsContractorTyping(false)
      }
    },
    [jobId]
  )

  const { isConnected, sendDirectMessage } = useRealtimeConnection({
    channelName: 'jobs:client',
    userId,
    userType: 'client',
    onJobEvent: handleJobEvent,
    onLocationUpdate: handleLocationUpdate,
    onETAUpdate: handleETAUpdate,
    onMessageSent: handleMessageSent,
    onTypingStart: handleTypingStart,
    onTypingStop: handleTypingStop,
    onConnectionChange: setConnectionStatus,
  })

  // Send typing indicator to contractor
  const handleTypingChange = useCallback(
    (isTyping: boolean) => {
      if (!job?.contractor?.id || !sendDirectMessage) return

      sendDirectMessage(job.contractor.id, 'contractor', {
        type: isTyping ? 'TYPING_START' : 'TYPING_STOP',
        jobId,
        senderId: userId,
        senderType: 'client',
      } as any)
    },
    [jobId, userId, job?.contractor?.id, sendDirectMessage]
  )

  // Fetch job details on mount
  useEffect(() => {
    if (!initialJob) {
      fetch(`/api/realtime/jobs/${jobId}/status`)
        .then((res) => res.json())
        .then((data) => setJob(data))
        .catch(console.error)
    }
  }, [jobId, initialJob])

  if (!job) {
    return (
      <Card className={className}>
        <CardContent className="py-8 text-center text-muted-foreground">
          Loading job details...
        </CardContent>
      </Card>
    )
  }

  const currentStep = statusIndex(job.status)
  const isCompleted = job.status === 'completed'
  const isCancelled = job.status === 'cancelled'
  const showMap = job.status === 'en_route' || job.status === 'accepted'
  const displayEta = etaData?.eta ?? job.eta

  // Prepare destination coordinates for map
  const destinationCoords =
    job.latitude && job.longitude ? { lat: job.latitude, lng: job.longitude } : undefined

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Track Your Job</h2>
          <p className="text-sm text-muted-foreground">
            {job.serviceType} • {job.address}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasMessaging && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowMessaging(!showMessaging)
                setUnreadMessages(0)
              }}
              className="relative"
            >
              💬 Chat
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </Button>
          )}
          <ConnectionIndicator status={connectionStatus} showLabel size="sm" />
        </div>
      </div>

      {/* Messaging Panel (collapsible) */}
      {showMessaging && hasMessaging && job.contractor && (
        <JobMessaging
          jobId={jobId}
          userId={userId}
          userType="client"
          otherPartyName={job.contractor.businessName}
          className="max-h-96"
          isOtherTyping={isContractorTyping}
          onNewMessage={() => setUnreadMessages(0)}
          onTypingChange={handleTypingChange}
        />
      )}

      {/* Live ETA Banner + Map */}
      {displayEta && showMap && (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border-teal-200 dark:border-teal-800">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🚗</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Your contractor is on the way!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {job.contractor?.businessName || 'Contractor'} is heading to your location
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <ETADisplay
                    etaMinutes={displayEta}
                    lastUpdated={lastUpdate || new Date(job.createdAt)}
                    size="lg"
                  />
                  {etaData?.trafficCondition && (
                    <p
                      className={cn(
                        'text-xs mt-1',
                        etaData.trafficCondition === 'heavy'
                          ? 'text-red-500'
                          : etaData.trafficCondition === 'moderate'
                            ? 'text-amber-500'
                            : 'text-green-500'
                      )}
                    >
                      {etaData.trafficCondition} traffic
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Preview - Tier gated */}
          {hasGpsTracking ? (
            <MapPreview
              destinationAddress={job.address}
              destinationCoords={destinationCoords}
              contractorLocation={contractorLocation || undefined}
              eta={displayEta}
              distanceKm={etaData?.distanceKm}
              trafficCondition={etaData?.trafficCondition}
              contractorName={job.contractor?.businessName}
              isLive={isConnected}
              className="rounded-lg overflow-hidden"
            />
          ) : (
            <TierUpgradePrompt requiredTier="PRO" feature="gpsTracking" compact />
          )}
        </div>
      )}

      {/* PRO tier Live ETA upsell (if they don't have it) */}
      {!hasLiveEta && showMap && !tierLoading && (
        <TierUpgradePrompt requiredTier="PRO" feature="liveEta" compact />
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
                const historyEntry = job.statusHistory.find((h) => h.status === step.status)

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
                            isActive && 'text-teal-600',
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
                      {historyEntry && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {new Date(historyEntry.timestamp).toLocaleString()}
                          {historyEntry.message && ` • ${historyEntry.message}`}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Cancelled State */}
          {isCancelled && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 text-red-800 dark:text-red-300">
                <span>❌</span>
                <span className="font-medium">This job has been cancelled</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contractor Info */}
      {job.contractor && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Contractor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl">
                {job.contractor.avatar ? (
                  <img
                    src={job.contractor.avatar}
                    alt={job.contractor.businessName}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  '👷'
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{job.contractor.businessName}</h3>
                {job.contractor.contactName && (
                  <p className="text-sm text-muted-foreground">{job.contractor.contactName}</p>
                )}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <span className="text-amber-500">★</span>
                    <span className="text-sm font-medium">{job.contractor.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {job.contractor.completedJobs} jobs completed
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {!hasMessaging && job.status !== 'pending' && (
                  <TierUpgradePrompt requiredTier="PRO" feature="messaging" compact />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Connection Warning */}
      {!isConnected && (
        <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-3 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-sm">
          <div className="flex items-center gap-2">
            <span>⚠️</span>
            <span>Live updates paused. We&apos;ll send you an SMS if there are any changes.</span>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Need help?{' '}
          <a href="mailto:support@disasterrecovery.com.au" className="text-teal-600 hover:underline">
            Contact support
          </a>
        </p>
      </div>

      {/* Last Updated */}
      {lastUpdate && (
        <p className="text-xs text-center text-muted-foreground">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </p>
      )}
    </div>
  )
}
