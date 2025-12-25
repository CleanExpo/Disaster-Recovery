import { useState, useCallback, useEffect } from 'react';

interface UsePredictiveAnalyticsState {
  forecasts: any[] | null;
  userBehavior: any | null;
  churnRisks: any[] | null;
  anomalyPredictions: any[] | null;
  alerts: any[] | null;
  customMetrics: any[] | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook for predictive analytics operations
 */
export function usePredictiveAnalytics() {
  const [state, setState] = useState<UsePredictiveAnalyticsState>({
    forecasts: null,
    userBehavior: null,
    churnRisks: null,
    anomalyPredictions: null,
    alerts: null,
    customMetrics: null,
    isLoading: false,
    error: null,
  });

  /**
   * Forecast metric trend
   */
  const forecastMetric = useCallback(
    async (metricId: string, days: number = 30) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await fetch('/api/analytics/forecast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ metricId, days }),
        });

        if (!response.ok) {
          throw new Error('Failed to forecast metric');
        }

        const data = await response.json();
        setState(prev => ({
          ...prev,
          forecasts: data.forecast,
          isLoading: false,
        }));

        return data.forecast;
      } catch (err: any) {
        const errorMsg = err.message || 'Error forecasting metric';
        setState(prev => ({ ...prev, error: errorMsg, isLoading: false }));
        throw err;
      }
    },
    []
  );

  /**
   * Predict user behavior
   */
  const predictUserBehavior = useCallback(
    async (userId: string) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await fetch('/api/analytics/predict-behavior', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error('Failed to predict user behavior');
        }

        const data = await response.json();
        setState(prev => ({
          ...prev,
          userBehavior: data.prediction,
          isLoading: false,
        }));

        return data.prediction;
      } catch (err: any) {
        const errorMsg = err.message || 'Error predicting user behavior';
        setState(prev => ({ ...prev, error: errorMsg, isLoading: false }));
        throw err;
      }
    },
    []
  );

  /**
   * Identify churn risks
   */
  const identifyChurnRisks = useCallback(
    async (options?: { limit?: number }) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const params = new URLSearchParams();
        if (options?.limit) {
          params.append('limit', String(options.limit));
        }

        const response = await fetch(
          `/api/analytics/churn-risks?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error('Failed to identify churn risks');
        }

        const data = await response.json();
        setState(prev => ({
          ...prev,
          churnRisks: data.risks,
          isLoading: false,
        }));

        return data.risks;
      } catch (err: any) {
        const errorMsg = err.message || 'Error identifying churn risks';
        setState(prev => ({ ...prev, error: errorMsg, isLoading: false }));
        throw err;
      }
    },
    []
  );

  /**
   * Predict anomalies
   */
  const predictAnomalies = useCallback(
    async (entityType: 'user' | 'room' | 'system', entityId?: string) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await fetch('/api/analytics/predict-anomalies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entityType, entityId }),
        });

        if (!response.ok) {
          throw new Error('Failed to predict anomalies');
        }

        const data = await response.json();
        setState(prev => ({
          ...prev,
          anomalyPredictions: data.predictions,
          isLoading: false,
        }));

        return data.predictions;
      } catch (err: any) {
        const errorMsg = err.message || 'Error predicting anomalies';
        setState(prev => ({ ...prev, error: errorMsg, isLoading: false }));
        throw err;
      }
    },
    []
  );

  /**
   * Get active alerts
   */
  const getActiveAlerts = useCallback(
    async (options?: { severity?: string; limit?: number }) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const params = new URLSearchParams();
        if (options?.severity) {
          params.append('severity', options.severity);
        }
        if (options?.limit) {
          params.append('limit', String(options.limit));
        }

        const response = await fetch(
          `/api/analytics/alerts?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch alerts');
        }

        const data = await response.json();
        setState(prev => ({
          ...prev,
          alerts: data.alerts,
          isLoading: false,
        }));

        return data.alerts;
      } catch (err: any) {
        const errorMsg = err.message || 'Error fetching alerts';
        setState(prev => ({ ...prev, error: errorMsg, isLoading: false }));
        throw err;
      }
    },
    []
  );

  /**
   * Acknowledge alert
   */
  const acknowledgeAlert = useCallback(
    async (alertId: string) => {
      try {
        const response = await fetch(`/api/analytics/alerts/${alertId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'acknowledge' }),
        });

        if (!response.ok) {
          throw new Error('Failed to acknowledge alert');
        }

        const data = await response.json();

        // Update alerts in state
        setState(prev => ({
          ...prev,
          alerts: prev.alerts
            ? prev.alerts.map(a => (a.id === alertId ? data.alert : a))
            : null,
        }));

        return data.alert;
      } catch (err: any) {
        const errorMsg = err.message || 'Error acknowledging alert';
        setState(prev => ({ ...prev, error: errorMsg }));
        throw err;
      }
    },
    []
  );

  /**
   * Create custom metric
   */
  const createCustomMetric = useCallback(
    async (name: string, formula: string, variables: Record<string, string>) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await fetch('/api/analytics/custom-metrics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, formula, variables }),
        });

        if (!response.ok) {
          throw new Error('Failed to create custom metric');
        }

        const data = await response.json();
        setState(prev => ({
          ...prev,
          customMetrics: prev.customMetrics
            ? [...prev.customMetrics, data.metric]
            : [data.metric],
          isLoading: false,
        }));

        return data.metric;
      } catch (err: any) {
        const errorMsg = err.message || 'Error creating custom metric';
        setState(prev => ({ ...prev, error: errorMsg, isLoading: false }));
        throw err;
      }
    },
    []
  );

  /**
   * Get custom metrics
   */
  const getCustomMetrics = useCallback(
    async (tag?: string) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const params = new URLSearchParams();
        if (tag) {
          params.append('tag', tag);
        }

        const response = await fetch(
          `/api/analytics/custom-metrics?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch custom metrics');
        }

        const data = await response.json();
        setState(prev => ({
          ...prev,
          customMetrics: data.metrics,
          isLoading: false,
        }));

        return data.metrics;
      } catch (err: any) {
        const errorMsg = err.message || 'Error fetching custom metrics';
        setState(prev => ({ ...prev, error: errorMsg, isLoading: false }));
        throw err;
      }
    },
    []
  );

  /**
   * Calculate metric value
   */
  const calculateMetric = useCallback(
    async (metricId: string, variables: Record<string, number>) => {
      try {
        const response = await fetch(`/api/analytics/custom-metrics/${metricId}/calculate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ variables }),
        });

        if (!response.ok) {
          throw new Error('Failed to calculate metric');
        }

        const data = await response.json();
        return data.result;
      } catch (err: any) {
        const errorMsg = err.message || 'Error calculating metric';
        setState(prev => ({ ...prev, error: errorMsg }));
        throw err;
      }
    },
    []
  );

  /**
   * Predict engagement times
   */
  const predictEngagementTimes = useCallback(
    async (userId: string) => {
      try {
        const response = await fetch('/api/analytics/engagement-times', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error('Failed to predict engagement times');
        }

        const data = await response.json();
        return data.times;
      } catch (err: any) {
        const errorMsg = err.message || 'Error predicting engagement times';
        setState(prev => ({ ...prev, error: errorMsg }));
        throw err;
      }
    },
    []
  );

  /**
   * Get alert statistics
   */
  const getAlertStats = useCallback(
    async () => {
      try {
        const response = await fetch('/api/analytics/alert-stats');

        if (!response.ok) {
          throw new Error('Failed to fetch alert statistics');
        }

        const data = await response.json();
        return data.stats;
      } catch (err: any) {
        const errorMsg = err.message || 'Error fetching alert statistics';
        setState(prev => ({ ...prev, error: errorMsg }));
        throw err;
      }
    },
    []
  );

  return {
    ...state,
    forecastMetric,
    predictUserBehavior,
    identifyChurnRisks,
    predictAnomalies,
    getActiveAlerts,
    acknowledgeAlert,
    createCustomMetric,
    getCustomMetrics,
    calculateMetric,
    predictEngagementTimes,
    getAlertStats,
  };
}

/**
 * Hook for alert management
 */
export function useAlerts() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(
    async (severity?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (severity) {
          params.append('severity', severity);
        }

        const response = await fetch(
          `/api/analytics/alerts?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch alerts');
        }

        const data = await response.json();
        setAlerts(data.alerts);
      } catch (err: any) {
        setError(err.message || 'Error fetching alerts');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const acknowledgeAlert = useCallback(
    async (alertId: string, acknowledgedBy: string) => {
      try {
        const response = await fetch(`/api/analytics/alerts/${alertId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'acknowledge', acknowledgedBy }),
        });

        if (!response.ok) {
          throw new Error('Failed to acknowledge alert');
        }

        const data = await response.json();
        setAlerts(alerts.map(a => (a.id === alertId ? data.alert : a)));

        return data.alert;
      } catch (err: any) {
        setError(err.message || 'Error acknowledging alert');
        throw err;
      }
    },
    [alerts]
  );

  const resolveAlert = useCallback(
    async (alertId: string) => {
      try {
        const response = await fetch(`/api/analytics/alerts/${alertId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'resolve' }),
        });

        if (!response.ok) {
          throw new Error('Failed to resolve alert');
        }

        const data = await response.json();
        setAlerts(alerts.filter(a => a.id !== alertId));

        return data.alert;
      } catch (err: any) {
        setError(err.message || 'Error resolving alert');
        throw err;
      }
    },
    [alerts]
  );

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return {
    alerts,
    isLoading,
    error,
    fetchAlerts,
    acknowledgeAlert,
    resolveAlert,
  };
}
