'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  UserCallStats,
  DailyCallStats,
  CallQualityMetrics,
} from '@/lib/calling/call-analytics';

interface CallAnalyticsSummary {
  userStats?: UserCallStats;
  dailyStats: DailyCallStats[];
  totalMetrics: number;
  qualityScore: number;
}

interface UseCallAnalyticsOptions {
  userId: string;
  days?: number;
  autoFetch?: boolean;
}

/**
 * useCallAnalytics Hook
 *
 * Fetch and manage call analytics data
 */
export function useCallAnalytics({
  userId,
  days = 30,
  autoFetch = true,
}: UseCallAnalyticsOptions) {
  const [summary, setSummary] = useState<CallAnalyticsSummary | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyCallStats[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch analytics summary
   */
  const fetchSummary = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `/api/calls/analytics?userId=${userId}&type=summary&days=${days}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch analytics summary');
      }

      const data = await response.json();
      setSummary(data.data);
      setDailyStats(data.data.dailyStats || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load analytics';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [userId, days]);

  /**
   * Fetch daily statistics
   */
  const fetchDailyStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `/api/calls/analytics?userId=${userId}&type=daily&days=${days}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch daily stats');
      }

      const data = await response.json();
      setDailyStats(data.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load daily stats';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [userId, days]);

  /**
   * Fetch quality metrics
   */
  const fetchQualityMetrics = useCallback(async (): Promise<CallQualityMetrics | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/calls/analytics?userId=${userId}&type=quality`);

      if (!response.ok) {
        throw new Error('Failed to fetch quality metrics');
      }

      const data = await response.json();
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load quality metrics';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  /**
   * Export analytics
   */
  const exportAnalytics = useCallback(async (format: 'json' | 'csv' = 'json') => {
    try {
      const response = await fetch(`/api/calls/analytics?userId=${userId}&type=export&format=${format}`);

      if (!response.ok) {
        throw new Error('Failed to export analytics');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `call-analytics-${userId}.${format === 'csv' ? 'csv' : 'json'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to export analytics';
      setError(message);
    }
  }, [userId]);

  /**
   * Refresh all data
   */
  const refresh = useCallback(async () => {
    await fetchSummary();
  }, [fetchSummary]);

  // Auto-fetch on mount and when userId changes
  useEffect(() => {
    if (autoFetch && userId) {
      fetchSummary();
    }
  }, [userId, days, autoFetch, fetchSummary]);

  return {
    summary,
    dailyStats,
    isLoading,
    error,
    fetchSummary,
    fetchDailyStats,
    fetchQualityMetrics,
    exportAnalytics,
    refresh,
  };
}

/**
 * Record call metrics after call ends
 */
export async function recordCallMetrics(callMetrics: {
  callId: string;
  userId: string;
  participantId: string;
  callType: 'voice' | 'video';
  direction: 'incoming' | 'outgoing';
  status: 'completed' | 'missed' | 'rejected';
  startTime: Date;
  endTime: Date;
  duration: number;
  metrics?: {
    audioQuality?: 'low' | 'medium' | 'high';
    videoQuality?: 'low' | 'medium' | 'high';
    averageBitrate?: number;
    packetLoss?: number;
    latency?: number;
    jitter?: number;
    bandwidth?: {
      incoming: number;
      outgoing: number;
    };
  };
}): Promise<boolean> {
  try {
    const response = await fetch('/api/calls/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(callMetrics),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to record call metrics:', error);
    return false;
  }
}
