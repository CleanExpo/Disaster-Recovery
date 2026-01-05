/**
 * useSearchDominance Hook
 *
 * React hook for subscribing to Search Dominance real-time events.
 * Provides typed WebSocket subscriptions for all Search Dominance topics.
 *
 * Pattern: Follows existing useSocket.ts pattern
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { SEARCH_DOMINANCE_TOPICS } from '@/lib/search-dominance/realtime/topics';
import type {
  RankingData,
  RankingChange,
  TrafficData,
  TrafficAnomaly,
  SearchAlertData,
  BlueOceanOpportunityData,
  CompetitorActivity,
  AlgorithmUpdateData,
  DominanceMetricsData,
  JobProgress,
  JobResult,
} from '@/lib/search-dominance/types/search-dominance-types';

// Import WebSocket manager (assumes it's available client-side)
// This will need to be adapted based on your actual WebSocket implementation
let socket: any = null;

if (typeof window !== 'undefined') {
  // Initialize WebSocket connection client-side
  // This is a placeholder - adjust based on your actual WebSocket manager
  try {
    // @ts-ignore - WebSocket manager will be available at runtime
    socket = window.__WEBSOCKET_MANAGER__;
  } catch (error) {
    console.warn('[useSearchDominance] WebSocket manager not available');
  }
}

/**
 * Event handler types
 */
type RankingUpdateHandler = (data: { rankings: RankingData[]; count: number; timestamp: string }) => void;
type RankingChangeHandler = (data: RankingChange & { timestamp: string }) => void;
type TrafficUpdateHandler = (data: { totals: any; recordCount: number; timestamp: string }) => void;
type TrafficAnomalyHandler = (data: TrafficAnomaly & { timestamp: string }) => void;
type AlertHandler = (data: SearchAlertData & { timestamp: string }) => void;
type BlueOceanHandler = (data: BlueOceanOpportunityData & { timestamp: string }) => void;
type CompetitorActivityHandler = (data: CompetitorActivity & { timestamp: string }) => void;
type AlgorithmUpdateHandler = (data: AlgorithmUpdateData & { timestamp: string }) => void;
type DominanceUpdateHandler = (data: { score: number; breakdown: any; timestamp: string }) => void;
type AICitationHandler = (data: { keyword: string; gained: boolean; position: number | null; location: string; timestamp: string }) => void;
type JobProgressHandler = (data: JobProgress & { jobName: string; timestamp: string }) => void;
type JobCompleteHandler = (data: JobResult & { jobName: string; timestamp: string }) => void;

/**
 * Hook options
 */
interface UseSearchDominanceOptions {
  onRankingUpdate?: RankingUpdateHandler;
  onRankingChange?: RankingChangeHandler;
  onTrafficUpdate?: TrafficUpdateHandler;
  onTrafficAnomaly?: TrafficAnomalyHandler;
  onAlert?: AlertHandler;
  onBlueOcean?: BlueOceanHandler;
  onCompetitorActivity?: CompetitorActivityHandler;
  onAlgorithmUpdate?: AlgorithmUpdateHandler;
  onDominanceUpdate?: DominanceUpdateHandler;
  onAICitation?: AICitationHandler;
  onJobProgress?: JobProgressHandler;
  onJobComplete?: JobCompleteHandler;
  autoConnect?: boolean;
}

/**
 * Hook state
 */
interface UseSearchDominanceState {
  connected: boolean;
  latestRankings: RankingData[];
  latestDominanceScore: number | null;
  recentAlerts: SearchAlertData[];
  jobStatus: Record<string, { progress?: JobProgress; result?: JobResult }>;
}

/**
 * Main hook
 */
export function useSearchDominance(options: UseSearchDominanceOptions = {}) {
  const {
    onRankingUpdate,
    onRankingChange,
    onTrafficUpdate,
    onTrafficAnomaly,
    onAlert,
    onBlueOcean,
    onCompetitorActivity,
    onAlgorithmUpdate,
    onDominanceUpdate,
    onAICitation,
    onJobProgress,
    onJobComplete,
    autoConnect = true,
  } = options;

  const [state, setState] = useState<UseSearchDominanceState>({
    connected: false,
    latestRankings: [],
    latestDominanceScore: null,
    recentAlerts: [],
    jobStatus: {},
  });

  /**
   * Subscribe to topics
   */
  const subscribe = useCallback(() => {
    if (!socket) {
      console.warn('[useSearchDominance] WebSocket not available');
      return;
    }

    // Rankings
    if (onRankingUpdate) {
      socket.on(SEARCH_DOMINANCE_TOPICS.RANKINGS, (data: any) => {
        setState((prev) => ({ ...prev, latestRankings: data.data || [] }));
        onRankingUpdate(data);
      });
    }

    if (onRankingChange) {
      socket.on(SEARCH_DOMINANCE_TOPICS.RANKING_CHANGE, onRankingChange);
    }

    // Traffic
    if (onTrafficUpdate) {
      socket.on(SEARCH_DOMINANCE_TOPICS.TRAFFIC, onTrafficUpdate);
    }

    if (onTrafficAnomaly) {
      socket.on(SEARCH_DOMINANCE_TOPICS.TRAFFIC_ANOMALY, onTrafficAnomaly);
    }

    // Alerts
    if (onAlert) {
      socket.on(SEARCH_DOMINANCE_TOPICS.ALERT_NEW, (data: any) => {
        setState((prev) => ({
          ...prev,
          recentAlerts: [data.alert, ...prev.recentAlerts].slice(0, 50), // Keep last 50
        }));
        onAlert(data);
      });
    }

    // Blue Ocean
    if (onBlueOcean) {
      socket.on(SEARCH_DOMINANCE_TOPICS.BLUE_OCEAN_NEW, onBlueOcean);
    }

    // Competitors
    if (onCompetitorActivity) {
      socket.on(SEARCH_DOMINANCE_TOPICS.COMPETITOR_ACTIVITY, onCompetitorActivity);
    }

    // Algorithm
    if (onAlgorithmUpdate) {
      socket.on(SEARCH_DOMINANCE_TOPICS.ALGORITHM_DETECTED, onAlgorithmUpdate);
    }

    // Dominance Score
    if (onDominanceUpdate) {
      socket.on(SEARCH_DOMINANCE_TOPICS.DOMINANCE_UPDATE, (data: any) => {
        setState((prev) => ({ ...prev, latestDominanceScore: data.score }));
        onDominanceUpdate(data);
      });
    }

    // AI Citations
    if (onAICitation) {
      socket.on(SEARCH_DOMINANCE_TOPICS.AI_CITATION, onAICitation);
    }

    // Job Status
    if (onJobProgress) {
      socket.on(SEARCH_DOMINANCE_TOPICS.JOB_PROGRESS, (data: any) => {
        setState((prev) => ({
          ...prev,
          jobStatus: {
            ...prev.jobStatus,
            [data.jobName]: { progress: data },
          },
        }));
        onJobProgress(data);
      });
    }

    if (onJobComplete) {
      socket.on(SEARCH_DOMINANCE_TOPICS.JOB_COMPLETE, (data: any) => {
        setState((prev) => ({
          ...prev,
          jobStatus: {
            ...prev.jobStatus,
            [data.jobName]: { result: data },
          },
        }));
        onJobComplete(data);
      });
    }

    setState((prev) => ({ ...prev, connected: true }));
  }, [
    onRankingUpdate,
    onRankingChange,
    onTrafficUpdate,
    onTrafficAnomaly,
    onAlert,
    onBlueOcean,
    onCompetitorActivity,
    onAlgorithmUpdate,
    onDominanceUpdate,
    onAICitation,
    onJobProgress,
    onJobComplete,
  ]);

  /**
   * Unsubscribe from topics
   */
  const unsubscribe = useCallback(() => {
    if (!socket) return;

    socket.off(SEARCH_DOMINANCE_TOPICS.RANKINGS);
    socket.off(SEARCH_DOMINANCE_TOPICS.RANKING_CHANGE);
    socket.off(SEARCH_DOMINANCE_TOPICS.TRAFFIC);
    socket.off(SEARCH_DOMINANCE_TOPICS.TRAFFIC_ANOMALY);
    socket.off(SEARCH_DOMINANCE_TOPICS.ALERT_NEW);
    socket.off(SEARCH_DOMINANCE_TOPICS.BLUE_OCEAN_NEW);
    socket.off(SEARCH_DOMINANCE_TOPICS.COMPETITOR_ACTIVITY);
    socket.off(SEARCH_DOMINANCE_TOPICS.ALGORITHM_DETECTED);
    socket.off(SEARCH_DOMINANCE_TOPICS.DOMINANCE_UPDATE);
    socket.off(SEARCH_DOMINANCE_TOPICS.AI_CITATION);
    socket.off(SEARCH_DOMINANCE_TOPICS.JOB_PROGRESS);
    socket.off(SEARCH_DOMINANCE_TOPICS.JOB_COMPLETE);

    setState((prev) => ({ ...prev, connected: false }));
  }, []);

  /**
   * Auto-subscribe on mount
   */
  useEffect(() => {
    if (autoConnect) {
      subscribe();
    }

    return () => {
      unsubscribe();
    };
  }, [autoConnect, subscribe, unsubscribe]);

  return {
    ...state,
    subscribe,
    unsubscribe,
  };
}

/**
 * Convenience hooks for specific topics
 */

export function useRankingUpdates(handler: RankingUpdateHandler) {
  return useSearchDominance({ onRankingUpdate: handler });
}

export function useRankingChanges(handler: RankingChangeHandler) {
  return useSearchDominance({ onRankingChange: handler });
}

export function useTrafficUpdates(handler: TrafficUpdateHandler) {
  return useSearchDominance({ onTrafficUpdate: handler });
}

export function useAlerts(handler: AlertHandler) {
  return useSearchDominance({ onAlert: handler });
}

export function useDominanceScore(handler: DominanceUpdateHandler) {
  return useSearchDominance({ onDominanceUpdate: handler });
}

export function useJobStatus(handler: JobCompleteHandler) {
  return useSearchDominance({ onJobComplete: handler });
}
