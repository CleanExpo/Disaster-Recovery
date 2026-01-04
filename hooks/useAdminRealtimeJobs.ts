'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import type { ConnectionStatus, RealtimeJobEvent } from '@/lib/supabase/types'

export interface AdminLiveJob {
  id: string
  serviceTitle: string
  serviceCategory: string
  description: string
  location: string
  urgency: string
  status: string
  urgentResponse: boolean
  createdAt: string
  updatedAt: string
  client: {
    id: string
    name: string | null
    email: string
    phone: string | null
  }
  contractor: {
    id: string
    userId: string
    name: string | null
    email: string
    phone: string | null
    matchStatus: string
  } | null
  contractorLocation: {
    latitude: number
    longitude: number
    timestamp: string
  } | null
}

interface AdminMetrics {
  activeJobs: number
  pendingJobs: number
  inProgressJobs: number
  avgResponseTimeMinutes: number
  activeConnections: number
  jobsToday: number
  contractorResponseRate: number
}

interface UseAdminRealtimeJobsOptions {
  autoFetch?: boolean
  pollingInterval?: number // for metrics refresh
  onJobEvent?: (event: RealtimeJobEvent) => void
}

interface AdminRealtimeState {
  jobs: AdminLiveJob[]
  metrics: AdminMetrics | null
  connectionStatus: ConnectionStatus
  isLoading: boolean
  error: string | null
  lastUpdated: Date | null
}

export function useAdminRealtimeJobs(options: UseAdminRealtimeJobsOptions = {}) {
  const {
    autoFetch = true,
    pollingInterval = 30000, // Refresh metrics every 30s
    onJobEvent,
  } = options

  const [state, setState] = useState<AdminRealtimeState>({
    jobs: [],
    metrics: null,
    connectionStatus: 'disconnected',
    isLoading: true,
    error: null,
    lastUpdated: null,
  })

  const channelRef = useRef<RealtimeChannel | null>(null)
  const pollingRef = useRef<NodeJS.Timeout | null>(null)
  const onJobEventRef = useRef(onJobEvent)
  onJobEventRef.current = onJobEvent

  // Fetch jobs from API
  const fetchJobs = useCallback(async (filters?: {
    status?: string[]
    urgency?: string
    search?: string
  }) => {
    try {
      const params = new URLSearchParams()
      if (filters?.status?.length) {
        params.set('status', filters.status.join(','))
      }
      if (filters?.urgency) {
        params.set('urgency', filters.urgency)
      }
      if (filters?.search) {
        params.set('search', filters.search)
      }

      const response = await fetch(`/api/admin/jobs/live?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch jobs')
      }

      const data = await response.json()
      if (data.success) {
        setState(prev => ({
          ...prev,
          jobs: data.data.jobs,
          isLoading: false,
          error: null,
          lastUpdated: new Date(),
        }))
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }))
    }
  }, [])

  // Fetch metrics from API
  const fetchMetrics = useCallback(async (timeRange: string = '24h') => {
    try {
      const response = await fetch(`/api/admin/metrics/realtime?range=${timeRange}`)
      if (!response.ok) {
        throw new Error('Failed to fetch metrics')
      }

      const data = await response.json()
      if (data.success) {
        setState(prev => ({
          ...prev,
          metrics: data.data.summary,
        }))
        return data.data
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error)
    }
    return null
  }, [])

  // Handle incoming realtime events
  const handleJobEvent = useCallback((event: RealtimeJobEvent) => {
    // Call external handler if provided
    onJobEventRef.current?.(event)

    // Update local state based on event type
    setState(prev => {
      const updatedJobs = [...prev.jobs]

      switch (event.type) {
        case 'STATUS_CHANGED': {
          const jobIndex = updatedJobs.findIndex(j => j.id === event.jobId)
          if (jobIndex >= 0 && event.status) {
            updatedJobs[jobIndex] = {
              ...updatedJobs[jobIndex],
              status: event.status.toUpperCase(),
              updatedAt: event.timestamp,
            }
          }
          break
        }
        case 'JOB_REASSIGNED': {
          // Trigger a refresh to get updated contractor info
          fetchJobs()
          break
        }
        case 'NEW_JOB': {
          // Trigger a refresh to include new job
          fetchJobs()
          break
        }
        case 'JOB_CANCELLED': {
          const jobIndex = updatedJobs.findIndex(j => j.id === event.jobId)
          if (jobIndex >= 0) {
            updatedJobs[jobIndex] = {
              ...updatedJobs[jobIndex],
              status: 'CANCELLED',
              updatedAt: event.timestamp,
            }
          }
          break
        }
      }

      return {
        ...prev,
        jobs: updatedJobs,
        lastUpdated: new Date(),
      }
    })
  }, [fetchJobs])

  // Connect to admin realtime channel
  const connect = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.unsubscribe()
    }

    setState(prev => ({ ...prev, connectionStatus: 'connecting' }))

    const channel = supabase.channel('jobs:admin', {
      config: {
        presence: { key: 'admin' },
      },
    })

    // Listen for all job events on admin channel
    channel.on('broadcast', { event: 'job_event' }, (payload) => {
      handleJobEvent(payload.payload as RealtimeJobEvent)
    })

    // Listen for job reassignment events
    channel.on('broadcast', { event: 'job_reassigned' }, (payload) => {
      handleJobEvent(payload.payload as RealtimeJobEvent)
    })

    // Listen for new jobs
    channel.on('broadcast', { event: 'new_job' }, (payload) => {
      handleJobEvent(payload.payload as RealtimeJobEvent)
    })

    // Listen for status changes
    channel.on('broadcast', { event: 'status_changed' }, (payload) => {
      handleJobEvent(payload.payload as RealtimeJobEvent)
    })

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        setState(prev => ({ ...prev, connectionStatus: 'connected' }))
        channel.track({ type: 'admin', online_at: new Date().toISOString() })
      } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
        setState(prev => ({ ...prev, connectionStatus: 'disconnected' }))
        // Auto-reconnect after 5 seconds
        setTimeout(() => connect(), 5000)
      }
    })

    channelRef.current = channel
  }, [handleJobEvent])

  // Disconnect from channel
  const disconnect = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.unsubscribe()
      channelRef.current = null
    }
    if (pollingRef.current) {
      clearInterval(pollingRef.current)
      pollingRef.current = null
    }
    setState(prev => ({ ...prev, connectionStatus: 'disconnected' }))
  }, [])

  // Reassign job
  const reassignJob = useCallback(async (
    jobId: string,
    newContractorId: string,
    reason: string
  ) => {
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}/reassign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newContractorId, reason }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to reassign job')
      }

      const data = await response.json()

      // Refresh jobs list
      await fetchJobs()

      return { success: true, data: data.data }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }, [fetchJobs])

  // Get available contractors for reassignment
  const getAvailableContractors = useCallback(async (jobId: string, search?: string) => {
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)

      const response = await fetch(`/api/admin/jobs/${jobId}/reassign?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch contractors')
      }

      const data = await response.json()
      return data.success ? data.data.contractors : []
    } catch (error) {
      console.error('Failed to fetch contractors:', error)
      return []
    }
  }, [])

  // Initial fetch and setup
  useEffect(() => {
    if (autoFetch) {
      fetchJobs()
      fetchMetrics()
      connect()

      // Set up polling for metrics
      pollingRef.current = setInterval(() => {
        fetchMetrics()
      }, pollingInterval)
    }

    return () => {
      disconnect()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    // State
    jobs: state.jobs,
    metrics: state.metrics,
    connectionStatus: state.connectionStatus,
    isConnected: state.connectionStatus === 'connected',
    isLoading: state.isLoading,
    error: state.error,
    lastUpdated: state.lastUpdated,

    // Actions
    fetchJobs,
    fetchMetrics,
    reassignJob,
    getAvailableContractors,
    connect,
    disconnect,
    refresh: () => {
      fetchJobs()
      fetchMetrics()
    },
  }
}

export type { AdminLiveJob, AdminMetrics, AdminRealtimeState }
