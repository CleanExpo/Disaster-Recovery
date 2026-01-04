'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ConnectionIndicator } from './ConnectionIndicator'
import { StatusToggle } from './StatusToggle'
import { ETADisplay } from './ETADisplay'
import { useRealtimeConnection } from '@/hooks/useRealtimeConnection'
import type { JobStatus, RealtimeJobEvent } from '@/lib/supabase/types'
import { cn } from '@/lib/utils'

interface Job {
  id: string
  clientName: string
  address: string
  serviceType: string
  status: JobStatus
  priority: 'normal' | 'urgent' | 'emergency'
  createdAt: string
  eta?: number
}

interface LiveJobFeedProps {
  userId: string
  userType: 'contractor' | 'client' | 'admin'
  initialJobs?: Job[]
  className?: string
}

const priorityColors = {
  normal: 'bg-blue-100 text-blue-800',
  urgent: 'bg-amber-100 text-amber-800',
  emergency: 'bg-red-100 text-red-800',
}

const statusBadgeColors: Record<JobStatus, string> = {
  pending: 'bg-gray-100 text-gray-800',
  accepted: 'bg-teal-100 text-teal-800',
  en_route: 'bg-amber-100 text-amber-800',
  on_site: 'bg-purple-100 text-purple-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export function LiveJobFeed({
  userId,
  userType,
  initialJobs = [],
  className,
}: LiveJobFeedProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs)
  const [notification, setNotification] = useState<string | null>(null)

  // Handle incoming job events
  const handleJobEvent = useCallback((event: RealtimeJobEvent) => {
    switch (event.type) {
      case 'NEW_JOB':
        // Play notification sound for contractors
        if (userType === 'contractor') {
          playNotificationSound('chime')
          setNotification('New job available!')
          setTimeout(() => setNotification(null), 3000)
        }
        // In real implementation, would fetch job details
        break

      case 'STATUS_CHANGED':
        setJobs(prev =>
          prev.map(job =>
            job.id === event.jobId
              ? { ...job, status: event.status, eta: event.eta }
              : job
          )
        )
        break

      case 'JOB_REASSIGNED':
        setJobs(prev => prev.filter(job => job.id !== event.jobId))
        setNotification('A job has been reassigned')
        setTimeout(() => setNotification(null), 3000)
        break

      case 'JOB_CANCELLED':
        setJobs(prev =>
          prev.map(job =>
            job.id === event.jobId
              ? { ...job, status: 'cancelled' }
              : job
          )
        )
        break
    }
  }, [userType])

  const {
    status: connectionStatus,
    isConnected,
    sendStatusUpdate,
  } = useRealtimeConnection({
    channelName: `jobs:${userType}`,
    userId,
    userType,
    onJobEvent: handleJobEvent,
  })

  // Handle status change from StatusToggle
  const handleStatusChange = useCallback(async (jobId: string, newStatus: JobStatus) => {
    const success = await sendStatusUpdate(jobId, newStatus)

    if (success) {
      // Optimistic update
      setJobs(prev =>
        prev.map(job =>
          job.id === jobId ? { ...job, status: newStatus } : job
        )
      )
    }

    return success
  }, [sendStatusUpdate])

  return (
    <div className={cn('space-y-4', className)}>
      {/* Connection Status Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Live Jobs</h2>
        <ConnectionIndicator status={connectionStatus} showLabel size="sm" />
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="rounded-lg bg-teal-50 p-3 text-teal-800 border border-teal-200 animate-in slide-in-from-top">
          {notification}
        </div>
      )}

      {/* Offline Warning */}
      {!isConnected && (
        <div className="rounded-lg bg-amber-50 p-3 text-amber-800 border border-amber-200">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">⚠️</span>
            <span>Connection lost. Updates may be delayed. Reconnecting...</span>
          </div>
        </div>
      )}

      {/* Job List */}
      {jobs.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No active jobs
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {jobs.map(job => (
            <Card key={job.id} className={cn(
              'transition-all duration-200',
              job.priority === 'emergency' && 'border-red-300 bg-red-50/50'
            )}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{job.clientName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{job.address}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={priorityColors[job.priority]}>
                      {job.priority}
                    </Badge>
                    <Badge className={statusBadgeColors[job.status]}>
                      {job.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {job.serviceType}
                    </span>
                    {job.eta && (job.status === 'en_route' || job.status === 'accepted') && (
                      <ETADisplay
                        etaMinutes={job.eta}
                        lastUpdated={new Date(job.createdAt)}
                        size="sm"
                      />
                    )}
                  </div>
                  {userType === 'contractor' && (
                    <StatusToggle
                      jobId={job.id}
                      currentStatus={job.status}
                      onStatusChange={handleStatusChange}
                      disabled={!isConnected}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// Audio notification helper
function playNotificationSound(type: 'chime' | 'urgent') {
  // In production, would use actual audio files
  if (typeof window !== 'undefined' && 'AudioContext' in window) {
    try {
      const audioContext = new AudioContext()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = type === 'urgent' ? 880 : 523.25
      oscillator.type = 'sine'
      gainNode.gain.value = 0.1

      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.2)
    } catch {
      // Audio not supported
    }
  }
}
