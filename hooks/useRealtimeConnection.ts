'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import type { ConnectionStatus, RealtimeJobEvent, JobStatus } from '@/lib/supabase/types'

interface UseRealtimeConnectionOptions {
  channelName: string
  userId?: string
  userType?: 'contractor' | 'client' | 'admin'
  onJobEvent?: (event: RealtimeJobEvent) => void
  onConnectionChange?: (status: ConnectionStatus) => void
  autoReconnect?: boolean
  reconnectInterval?: number
}

interface RealtimeConnectionState {
  status: ConnectionStatus
  channel: RealtimeChannel | null
  lastHeartbeat: Date | null
  reconnectAttempts: number
}

export function useRealtimeConnection(options: UseRealtimeConnectionOptions) {
  const {
    channelName,
    userId,
    userType,
    onJobEvent,
    onConnectionChange,
    autoReconnect = true,
    reconnectInterval = 5000,
  } = options

  const [state, setState] = useState<RealtimeConnectionState>({
    status: 'disconnected',
    channel: null,
    lastHeartbeat: null,
    reconnectAttempts: 0,
  })

  const channelRef = useRef<RealtimeChannel | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Update status and notify
  const updateStatus = useCallback((status: ConnectionStatus) => {
    setState(prev => ({ ...prev, status }))
    onConnectionChange?.(status)
  }, [onConnectionChange])

  // Connect to realtime channel
  const connect = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.unsubscribe()
    }

    updateStatus('connecting')

    const channel = supabase.channel(channelName, {
      config: {
        presence: {
          key: userId || 'anonymous',
        },
      },
    })

    // Listen for job events
    channel.on('broadcast', { event: 'job_event' }, (payload) => {
      const event = payload.payload as RealtimeJobEvent
      onJobEvent?.(event)
    })

    // Listen for direct messages (contractor-specific)
    if (userId && userType === 'contractor') {
      channel.on('broadcast', { event: `contractor:${userId}` }, (payload) => {
        const event = payload.payload as RealtimeJobEvent
        onJobEvent?.(event)
      })
    }

    // Listen for client-specific updates
    if (userId && userType === 'client') {
      channel.on('broadcast', { event: `client:${userId}` }, (payload) => {
        const event = payload.payload as RealtimeJobEvent
        onJobEvent?.(event)
      })
    }

    // Track presence
    channel.on('presence', { event: 'sync' }, () => {
      setState(prev => ({ ...prev, lastHeartbeat: new Date() }))
    })

    // Subscribe and handle connection state
    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        updateStatus('connected')
        setState(prev => ({ ...prev, reconnectAttempts: 0 }))

        // Track presence
        if (userId) {
          channel.track({
            id: userId,
            type: userType,
            online_at: new Date().toISOString(),
          })
        }
      } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
        updateStatus('disconnected')

        // Auto reconnect
        if (autoReconnect) {
          setState(prev => ({ ...prev, reconnectAttempts: prev.reconnectAttempts + 1 }))
          reconnectTimeoutRef.current = setTimeout(() => {
            connect()
          }, reconnectInterval)
        }
      }
    })

    channelRef.current = channel
    setState(prev => ({ ...prev, channel }))
  }, [channelName, userId, userType, onJobEvent, autoReconnect, reconnectInterval, updateStatus])

  // Disconnect from channel
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }

    if (channelRef.current) {
      channelRef.current.unsubscribe()
      channelRef.current = null
    }

    updateStatus('disconnected')
    setState(prev => ({ ...prev, channel: null }))
  }, [updateStatus])

  // Send job status update
  const sendStatusUpdate = useCallback(async (
    jobId: string,
    status: JobStatus,
    eta?: number
  ) => {
    if (!channelRef.current) {
      console.error('Not connected to realtime channel')
      return false
    }

    const event: RealtimeJobEvent = {
      type: 'STATUS_CHANGED',
      jobId,
      contractorId: userType === 'contractor' ? userId : undefined,
      status,
      eta,
      timestamp: new Date().toISOString(),
    }

    const result = await channelRef.current.send({
      type: 'broadcast',
      event: 'job_event',
      payload: event,
    })

    return result === 'ok'
  }, [userId, userType])

  // Send direct message to specific user
  const sendDirectMessage = useCallback(async (
    targetUserId: string,
    targetType: 'contractor' | 'client',
    event: Omit<RealtimeJobEvent, 'timestamp'>
  ) => {
    if (!channelRef.current) {
      console.error('Not connected to realtime channel')
      return false
    }

    const fullEvent: RealtimeJobEvent = {
      ...event,
      timestamp: new Date().toISOString(),
    }

    const result = await channelRef.current.send({
      type: 'broadcast',
      event: `${targetType}:${targetUserId}`,
      payload: fullEvent,
    })

    return result === 'ok'
  }, [])

  // Connect on mount
  useEffect(() => {
    connect()
    return () => disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    status: state.status,
    isConnected: state.status === 'connected',
    lastHeartbeat: state.lastHeartbeat,
    reconnectAttempts: state.reconnectAttempts,
    connect,
    disconnect,
    sendStatusUpdate,
    sendDirectMessage,
  }
}

export type { RealtimeConnectionState, UseRealtimeConnectionOptions }
