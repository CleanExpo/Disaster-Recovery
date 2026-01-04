'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ConnectionIndicator, ETADisplay } from '@/components/realtime'
import { useRealtimeConnection } from '@/hooks/useRealtimeConnection'
import type { JobStatus, RealtimeJobEvent, ConnectionStatus } from '@/lib/supabase/types'
import { cn } from '@/lib/utils'

interface ActiveJob {
  id: string
  serviceType: string
  address: string
  status: JobStatus
  priority: 'normal' | 'urgent' | 'emergency'
  createdAt: string
  eta?: number
  contractorName?: string
}

const statusLabels: Record<JobStatus, { label: string; color: string }> = {
  pending: { label: 'Awaiting Contractor', color: 'bg-gray-100 text-gray-800' },
  accepted: { label: 'Contractor Assigned', color: 'bg-teal-100 text-teal-800' },
  en_route: { label: 'On The Way', color: 'bg-amber-100 text-amber-800' },
  on_site: { label: 'Contractor Arrived', color: 'bg-purple-100 text-purple-800' },
  in_progress: { label: 'Work In Progress', color: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
}

export default function ClientTrackPage() {
  const [jobs, setJobs] = useState<ActiveJob[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected')

  // Handle real-time job updates
  const handleJobEvent = useCallback((event: RealtimeJobEvent) => {
    setJobs(prev =>
      prev.map(job =>
        job.id === event.jobId
          ? { ...job, status: event.status, eta: event.eta }
          : job
      )
    )
  }, [])

  // Note: userId would come from session in production
  const { isConnected } = useRealtimeConnection({
    channelName: 'jobs:client',
    userId: 'demo-client',
    userType: 'client',
    onJobEvent: handleJobEvent,
    onConnectionChange: setConnectionStatus,
  })

  // Fetch active jobs
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/realtime/jobs/live')
        if (res.ok) {
          const data = await res.json()
          setJobs(data.jobs || [])
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()

    // Demo data for development
    if (process.env.NODE_ENV === 'development') {
      setJobs([
        {
          id: 'job-client-1',
          serviceType: 'Water Damage Restoration',
          address: '42 Harbour St, Sydney NSW 2000',
          status: 'en_route',
          priority: 'urgent',
          createdAt: new Date().toISOString(),
          eta: 18,
          contractorName: 'Sydney Restoration Pro',
        },
        {
          id: 'job-client-2',
          serviceType: 'Mould Inspection',
          address: '42 Harbour St, Sydney NSW 2000',
          status: 'pending',
          priority: 'normal',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ])
      setIsLoading(false)
    }
  }, [])

  const activeJobs = jobs.filter(j => !['completed', 'cancelled'].includes(j.status))
  const pastJobs = jobs.filter(j => ['completed', 'cancelled'].includes(j.status))

  return (
    <div className="container mx-auto py-6 px-4 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Track Your Jobs</h1>
          <p className="text-muted-foreground">
            Real-time updates on your service requests
          </p>
        </div>
        <ConnectionIndicator status={connectionStatus} showLabel />
      </div>

      {/* Connection Status */}
      {!isConnected && (
        <div className="mb-6 rounded-lg bg-amber-50 p-3 text-amber-800 border border-amber-200">
          <div className="flex items-center gap-2">
            <span>⚠️</span>
            <span>Connecting to live updates... You&apos;ll receive SMS notifications if offline.</span>
          </div>
        </div>
      )}

      {isLoading ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Loading your jobs...
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Active Jobs */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Active Jobs</h2>
            {activeJobs.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground mb-4">No active jobs</p>
                  <Button asChild>
                    <Link href="/dashboard/client">Request a Service</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {activeJobs.map(job => (
                  <Link key={job.id} href={`/dashboard/client/track/${job.id}`}>
                    <Card className={cn(
                      'hover:shadow-md transition-shadow cursor-pointer',
                      job.priority === 'urgent' && 'border-amber-300',
                      job.priority === 'emergency' && 'border-red-300 bg-red-50/30'
                    )}>
                      <CardContent className="py-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{job.serviceType}</h3>
                              {job.priority !== 'normal' && (
                                <Badge variant="outline" className={
                                  job.priority === 'emergency' ? 'border-red-500 text-red-700' : 'border-amber-500 text-amber-700'
                                }>
                                  {job.priority}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{job.address}</p>
                            {job.contractorName && (
                              <p className="text-sm mt-1">
                                <span className="text-muted-foreground">Contractor:</span>{' '}
                                <span className="font-medium">{job.contractorName}</span>
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={statusLabels[job.status].color}>
                              {statusLabels[job.status].label}
                            </Badge>
                            {job.eta && (job.status === 'en_route' || job.status === 'accepted') && (
                              <ETADisplay
                                etaMinutes={job.eta}
                                lastUpdated={new Date(job.createdAt)}
                                size="sm"
                              />
                            )}
                          </div>
                        </div>

                        {/* Progress indicator */}
                        {job.status !== 'pending' && (
                          <div className="mt-4">
                            <div className="flex items-center gap-1">
                              {['accepted', 'en_route', 'on_site', 'in_progress', 'completed'].map((step, i) => {
                                const stepIndex = ['accepted', 'en_route', 'on_site', 'in_progress', 'completed'].indexOf(job.status)
                                const isComplete = i <= stepIndex
                                return (
                                  <div
                                    key={step}
                                    className={cn(
                                      'h-1.5 flex-1 rounded-full transition-colors',
                                      isComplete ? 'bg-teal-500' : 'bg-gray-200'
                                    )}
                                  />
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Past Jobs */}
          {pastJobs.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Past Jobs</h2>
              <div className="space-y-3">
                {pastJobs.map(job => (
                  <Card key={job.id} className="opacity-75">
                    <CardContent className="py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-sm">{job.serviceType}</h3>
                          <p className="text-xs text-muted-foreground">{job.address}</p>
                        </div>
                        <Badge className={statusLabels[job.status].color}>
                          {statusLabels[job.status].label}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
