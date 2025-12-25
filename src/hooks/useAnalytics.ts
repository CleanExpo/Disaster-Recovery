'use client';

import { useState, useCallback, useEffect } from 'react';

export type AnalyticsEventType =
  | 'message:sent'
  | 'message:deleted'
  | 'message:edited'
  | 'message:reacted'
  | 'message:threaded'
  | 'call:initiated'
  | 'call:completed'
  | 'call:failed'
  | 'call:recorded'
  | 'file:uploaded'
  | 'file:downloaded'
  | 'file:deleted'
  | 'search:executed'
  | 'user:login'
  | 'user:logout'
  | 'room:created'
  | 'room:archived'
  | 'user:invited'
  | 'presence:online'
  | 'presence:offline';

interface AnalyticsMetrics {
  totalEvents: number;
  activeUsers: number;
  eventsByType: Record<string, number>;
  peakHour: number;
  peakHourTraffic: number;
}

/**
 * useAnalytics Hook
 *
 * Track and retrieve analytics data
 */
export function useAnalytics() {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Track an event
   */
  const trackEvent = useCallback(
    async (
      type: AnalyticsEventType,
      userId: string,
      data: Record<string, any> = {},
      roomId?: string
    ) => {
      try {
        const response = await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type,
            userId,
            roomId,
            data,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to track event');
        }

        return await response.json();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to track event';
        console.error('Track event error:', message);
        return { success: false, error: message };
      }
    },
    []
  );

  /**
   * Get current metrics
   */
  const fetchMetrics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/analytics?type=summary');

      if (!response.ok) {
        throw new Error('Failed to fetch metrics');
      }

      const data = await response.json();
      setMetrics(data.metrics);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch metrics';
      setError(message);
      console.error('Fetch metrics error:', message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch metrics on mount
  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return {
    metrics,
    isLoading,
    error,
    trackEvent,
    fetchMetrics,
  };
}

/**
 * useUserAnalytics Hook
 *
 * Get user-specific analytics
 */
export function useUserAnalytics(userId: string) {
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/analytics/user?userId=${userId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user analytics');
      }

      const data = await response.json();
      setAnalytics(data.analytics);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch user analytics';
      setError(message);
      console.error('Fetch user analytics error:', message);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const trackSession = useCallback(
    async (action: 'login' | 'logout') => {
      try {
        const response = await fetch('/api/analytics/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, action }),
        });

        if (!response.ok) {
          throw new Error('Failed to track session');
        }

        return await response.json();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to track session';
        console.error('Track session error:', message);
        return { success: false, error: message };
      }
    },
    [userId]
  );

  useEffect(() => {
    if (userId) {
      fetchAnalytics();
    }
  }, [userId, fetchAnalytics]);

  return {
    analytics,
    isLoading,
    error,
    fetchAnalytics,
    trackSession,
  };
}

/**
 * useRoomAnalytics Hook
 *
 * Get room-specific analytics
 */
export function useRoomAnalytics(roomId: string) {
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/analytics/room?roomId=${roomId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch room analytics');
      }

      const data = await response.json();
      setAnalytics(data.analytics);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch room analytics';
      setError(message);
      console.error('Fetch room analytics error:', message);
    } finally {
      setIsLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      fetchAnalytics();
    }
  }, [roomId, fetchAnalytics]);

  return {
    analytics,
    isLoading,
    error,
    fetchAnalytics,
  };
}

/**
 * useReporting Hook
 *
 * Generate and manage reports
 */
export function useReporting() {
  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = useCallback(
    async (
      type: 'executive' | 'detailed' | 'user' | 'room' | 'performance',
      options: any = {}
    ) => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.append('type', type);

        if (options.period) params.append('period', options.period);
        if (options.userId) params.append('userId', options.userId);
        if (options.roomId) params.append('roomId', options.roomId);

        const response = await fetch(`/api/analytics/reports?${params.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to generate report');
        }

        const data = await response.json();
        setReport(data.report);
        return data.report;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to generate report';
        setError(message);
        console.error('Generate report error:', message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const exportReport = useCallback(async (reportId: string, format: 'json' | 'csv' | 'pdf') => {
    try {
      const response = await fetch(`/api/analytics/reports?id=${reportId}&format=${format}`);

      if (!response.ok) {
        throw new Error('Failed to export report');
      }

      return await response.text();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to export report';
      console.error('Export report error:', message);
      return null;
    }
  }, []);

  return {
    report,
    isLoading,
    error,
    generateReport,
    exportReport,
  };
}
