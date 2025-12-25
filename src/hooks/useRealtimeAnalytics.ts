'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export interface SystemMetrics {
  activeUsers: number;
  activeUsersByRole: {
    customer: number;
    contractor: number;
    admin: number;
  };
  messagesPerMinute: number;
  bookingUpdatesPerMinute: number;
  claimUpdatesPerMinute: number;
  averageMessageLatency: number;
  averageLatency: number;
  errorRate: number;
  uptime: number;
  timestamp: Date;
}

export interface AnalyticsSummary {
  metrics: SystemMetrics;
  topUsers: Array<{
    userId: string;
    userName: string;
    messageCount: number;
    lastActivity: Date;
  }>;
  topBookings: Array<{
    bookingId: string;
    updateCount: number;
    lastUpdate: Date;
  }>;
  roomStats: Array<{
    roomId: string;
    roomName: string;
    memberCount: number;
    messageCount: number;
    messagesPerHour: number;
    lastMessageAt: Date;
    averageMessageLength: number;
  }>;
  health: {
    database: boolean;
    redis: boolean;
    socketIO: boolean;
    messageQueue: boolean;
    timestamp: Date;
  };
}

/**
 * useRealtimeAnalytics Hook
 *
 * Fetch and manage real-time analytics data with auto-refresh capability
 */
export function useRealtimeAnalytics(autoRefresh: boolean = true) {
  const { data: session } = useSession();
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Fetch metrics
  const fetchMetrics = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/analytics/metrics?timeRange=realtime');

      if (!response.ok) {
        throw new Error('Failed to fetch metrics');
      }

      const data = await response.json();
      setMetrics(data);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.id]);

  // Fetch summary
  const fetchSummary = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      const response = await fetch('/api/analytics/summary');

      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }

      const data = await response.json();
      setSummary(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    }
  }, [session?.user?.id]);

  // Setup auto-refresh
  useEffect(() => {
    if (!autoRefresh || !session?.user?.id) return;

    // Initial fetch
    fetchMetrics();
    fetchSummary();

    // Setup refresh intervals
    const metricsInterval = setInterval(fetchMetrics, 5000); // Every 5 seconds
    const summaryInterval = setInterval(fetchSummary, 30000); // Every 30 seconds

    return () => {
      clearInterval(metricsInterval);
      clearInterval(summaryInterval);
    };
  }, [autoRefresh, session?.user?.id, fetchMetrics, fetchSummary]);

  // Manual refresh
  const refresh = useCallback(async () => {
    await Promise.all([fetchMetrics(), fetchSummary()]);
  }, [fetchMetrics, fetchSummary]);

  return {
    metrics,
    summary,
    isLoading,
    error,
    lastUpdate,
    fetchMetrics,
    fetchSummary,
    refresh,
  };
}
