'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  NotificationSettings,
  LiveJobFeed,
  ConnectionIndicator,
  ToastContainer
} from '@/components/realtime'
import { useRealtimeConnection } from '@/hooks/useRealtimeConnection'
import type { RealtimeJobEvent, ConnectionStatus } from '@/lib/supabase/types'

export default function ContractorNotificationsPage() {
  const [notifications, setNotifications] = useState<RealtimeJobEvent[]>([])
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected')

  // Handle incoming job events
  const handleJobEvent = useCallback((event: RealtimeJobEvent) => {
    setNotifications(prev => [event, ...prev].slice(0, 10)) // Keep last 10
  }, [])

  // Handle connection status changes
  const handleConnectionChange = useCallback((status: ConnectionStatus) => {
    setConnectionStatus(status)
  }, [])

  // Dismiss notification
  const handleDismissNotification = useCallback((eventId: string) => {
    setNotifications(prev =>
      prev.filter(e => `${e.jobId}-${e.timestamp}` !== eventId)
    )
  }, [])

  // Note: In production, userId would come from session
  const { isConnected, reconnectAttempts, connect, disconnect } = useRealtimeConnection({
    channelName: 'jobs:contractor',
    userId: 'demo-contractor', // Would be from session
    userType: 'contractor',
    onJobEvent: handleJobEvent,
    onConnectionChange: handleConnectionChange,
  })

  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl">
      {/* Toast notifications */}
      <ToastContainer
        events={notifications}
        onDismiss={handleDismissNotification}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Real-Time Notifications</h1>
          <p className="text-muted-foreground">
            Manage how you receive job alerts and updates
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ConnectionIndicator status={connectionStatus} showLabel />
          {!isConnected && reconnectAttempts > 0 && (
            <Button variant="outline" size="sm" onClick={connect}>
              Reconnect
            </Button>
          )}
        </div>
      </div>

      {/* Subscription Status Banner */}
      <Card className="mb-6 bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                <span className="text-xl">🎉</span>
              </div>
              <div>
                <h3 className="font-semibold">3-Month Free Trial Active</h3>
                <p className="text-sm text-muted-foreground">
                  You have full access to real-time features
                </p>
              </div>
            </div>
            <Link href="/dashboard/contractor/notifications/subscription">
              <Button variant="outline" size="sm">
                View Plans
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="live-jobs">Live Jobs</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <NotificationSettings />
        </TabsContent>

        {/* Live Jobs Tab */}
        <TabsContent value="live-jobs">
          <LiveJobFeed
            userId="demo-contractor"
            userType="contractor"
            initialJobs={[
              // Demo data - would come from API
              {
                id: 'job-1',
                clientName: 'Sarah Mitchell',
                address: '42 Harbour St, Sydney NSW 2000',
                serviceType: 'Water Damage Restoration',
                status: 'accepted',
                priority: 'urgent',
                createdAt: new Date().toISOString(),
                eta: 25,
              },
              {
                id: 'job-2',
                clientName: 'James Wilson',
                address: '156 Crown St, Wollongong NSW 2500',
                serviceType: 'Mould Remediation',
                status: 'pending',
                priority: 'normal',
                createdAt: new Date(Date.now() - 3600000).toISOString(),
              },
            ]}
          />
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>
                Recent notifications and job updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {notifications.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No recent notifications
                </p>
              ) : (
                <div className="space-y-3">
                  {notifications.map((event) => (
                    <div
                      key={`${event.jobId}-${event.timestamp}`}
                      className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                    >
                      <span className="text-xl">
                        {event.type === 'NEW_JOB' && '🆕'}
                        {event.type === 'STATUS_CHANGED' && '📍'}
                        {event.type === 'JOB_REASSIGNED' && '🔄'}
                        {event.type === 'JOB_CANCELLED' && '❌'}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {event.type.replace('_', ' ')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Job: {event.jobId} • Status: {event.status}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Connection Debug (dev only) */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Debug Info</CardTitle>
          </CardHeader>
          <CardContent className="text-xs font-mono space-y-1">
            <p>Status: {connectionStatus}</p>
            <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
            <p>Reconnect attempts: {reconnectAttempts}</p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline" onClick={connect}>
                Connect
              </Button>
              <Button size="sm" variant="outline" onClick={disconnect}>
                Disconnect
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
