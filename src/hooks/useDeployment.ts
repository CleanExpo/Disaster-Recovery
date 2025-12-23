'use client';

import { useEffect, useState, useCallback } from 'react';

/**
 * useDeploymentConfig - Manage deployment environments and feature flags
 */
export function useDeploymentConfig() {
  const [environments, setEnvironments] = useState<any[]>([]);
  const [currentEnvironment, setCurrentEnvironment] = useState<any>(null);
  const [featureFlags, setFeatureFlags] = useState<any[]>([]);
  const [dependencies, setDependencies] = useState<any>(null);
  const [readiness, setReadiness] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch environments
  const loadEnvironments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/deployment/config?action=environments');
      if (!response.ok) throw new Error('Failed to load environments');

      const data = await response.json();
      setEnvironments(data.environments || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch specific environment
  const loadEnvironment = useCallback(async (envId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/deployment/config?action=environment&envId=${envId}`
      );
      if (!response.ok) throw new Error('Failed to load environment');

      const data = await response.json();
      setCurrentEnvironment(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch feature flags
  const loadFeatureFlags = useCallback(async (envId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/deployment/config?action=feature-flags&envId=${envId}`
      );
      if (!response.ok) throw new Error('Failed to load feature flags');

      const data = await response.json();
      setFeatureFlags(data.featureFlags || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch dependencies
  const checkDependencies = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/deployment/config?action=dependencies');
      if (!response.ok) throw new Error('Failed to check dependencies');

      const data = await response.json();
      setDependencies(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check readiness
  const checkReadiness = useCallback(async (envId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/deployment/config?action=readiness&envId=${envId}`
      );
      if (!response.ok) throw new Error('Failed to check readiness');

      const data = await response.json();
      setReadiness(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Set secret
  const setSecret = useCallback(async (envId: string, key: string, value: string) => {
    setError(null);

    try {
      const response = await fetch('/api/deployment/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'set_secret',
          envId,
          key,
          value,
        }),
      });

      if (!response.ok) throw new Error('Failed to set secret');

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Create feature flag
  const createFeatureFlag = useCallback(
    async (name: string, targetEnvironments: string[], enabled: boolean, rolloutPercentage: number) => {
      setError(null);

      try {
        const response = await fetch('/api/deployment/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create_feature_flag',
            name,
            targetEnvironments,
            enabled,
            rolloutPercentage,
          }),
        });

        if (!response.ok) throw new Error('Failed to create feature flag');

        const data = await response.json();
        setFeatureFlags([...featureFlags, data]);
        return data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    [featureFlags]
  );

  // Update feature flag rollout
  const updateFeatureFlagRollout = useCallback(
    async (flagId: string, rolloutPercentage: number) => {
      setError(null);

      try {
        const response = await fetch('/api/deployment/config', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'update_feature_flag_rollout',
            flagId,
            rolloutPercentage,
          }),
        });

        if (!response.ok) throw new Error('Failed to update feature flag');

        const data = await response.json();
        setFeatureFlags(
          featureFlags.map(f => (f.id === flagId ? data : f))
        );
        return data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    [featureFlags]
  );

  // Create deployment config
  const createDeploymentConfig = useCallback(
    async (name: string, version: string, environment: string) => {
      setError(null);

      try {
        const response = await fetch('/api/deployment/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create_deployment_config',
            name,
            version,
            environment,
          }),
        });

        if (!response.ok) throw new Error('Failed to create deployment config');

        const data = await response.json();
        return data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    []
  );

  useEffect(() => {
    loadEnvironments();
    checkDependencies();
  }, [loadEnvironments, checkDependencies]);

  return {
    environments,
    currentEnvironment,
    featureFlags,
    dependencies,
    readiness,
    isLoading,
    error,
    loadEnvironment,
    loadFeatureFlags,
    checkDependencies,
    checkReadiness,
    setSecret,
    createFeatureFlag,
    updateFeatureFlagRollout,
    createDeploymentConfig,
  };
}

/**
 * useDeploymentPipeline - Manage deployment pipelines and jobs
 */
export function useDeploymentPipeline() {
  const [pipelines, setPipelines] = useState<any[]>([]);
  const [currentJob, setCurrentJob] = useState<any>(null);
  const [jobHistory, setJobHistory] = useState<any[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch pipelines
  const loadPipelines = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/deployment/pipeline?action=pipelines');
      if (!response.ok) throw new Error('Failed to load pipelines');

      const data = await response.json();
      setPipelines(data.pipelines || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch pipeline details
  const loadPipeline = useCallback(async (pipelineId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/deployment/pipeline?action=pipeline&pipelineId=${pipelineId}`
      );
      if (!response.ok) throw new Error('Failed to load pipeline');

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch job history
  const loadJobHistory = useCallback(async (pipelineId: string, limit: number = 20) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/deployment/pipeline?action=job-history&pipelineId=${pipelineId}&limit=${limit}`
      );
      if (!response.ok) throw new Error('Failed to load job history');

      const data = await response.json();
      setJobHistory(data.jobs || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch deployment statistics
  const loadStatistics = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/deployment/pipeline?action=statistics');
      if (!response.ok) throw new Error('Failed to load statistics');

      const data = await response.json();
      setStatistics(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Start deployment job
  const startDeployment = useCallback(
    async (pipelineId: string, environment: string, version: string) => {
      setError(null);

      try {
        const response = await fetch('/api/deployment/pipeline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'start_deployment',
            pipelineId,
            environment,
            version,
          }),
        });

        if (!response.ok) throw new Error('Failed to start deployment');

        const data = await response.json();
        setCurrentJob(data);
        return data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    []
  );

  // Trigger rollback
  const triggerRollback = useCallback(
    async (environment: string, targetVersion: string, reason?: string) => {
      setError(null);

      try {
        const response = await fetch('/api/deployment/pipeline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'trigger_rollback',
            environment,
            targetVersion,
            reason,
          }),
        });

        if (!response.ok) throw new Error('Failed to trigger rollback');

        const data = await response.json();
        setCurrentJob(data);
        return data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    []
  );

  // Cancel deployment job
  const cancelJob = useCallback(async (jobId: string) => {
    setError(null);

    try {
      const response = await fetch(
        `/api/deployment/pipeline?jobId=${jobId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) throw new Error('Failed to cancel job');

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Fetch job details
  const getJobDetails = useCallback(async (jobId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/deployment/pipeline?action=job&jobId=${jobId}`
      );
      if (!response.ok) throw new Error('Failed to load job');

      const data = await response.json();
      setCurrentJob(data);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPipelines();
    loadStatistics();
  }, [loadPipelines, loadStatistics]);

  return {
    pipelines,
    currentJob,
    jobHistory,
    statistics,
    isLoading,
    error,
    loadPipeline,
    loadJobHistory,
    loadStatistics,
    startDeployment,
    triggerRollback,
    cancelJob,
    getJobDetails,
  };
}

/**
 * useDeploymentMonitoring - Monitor health, performance, and alerts
 */
export function useDeploymentMonitoring() {
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [trends, setTrends] = useState<any>(null);
  const [uptime, setUptime] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get health summary
  const loadHealthStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/deployment/monitor?action=health-summary');
      if (!response.ok) throw new Error('Failed to load health status');

      const data = await response.json();
      setHealthStatus(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get performance metrics
  const loadPerformanceMetrics = useCallback(async (limit: number = 100) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/deployment/monitor?action=performance-metrics&limit=${limit}`
      );
      if (!response.ok) throw new Error('Failed to load metrics');

      const data = await response.json();
      setPerformanceMetrics(data.metrics || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get active alerts
  const loadAlerts = useCallback(async (severity?: 'warning' | 'critical') => {
    setIsLoading(true);
    setError(null);

    try {
      const url = new URL('/api/deployment/monitor', window.location.origin);
      url.searchParams.set('action', 'active-alerts');
      if (severity) url.searchParams.set('severity', severity);

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error('Failed to load alerts');

      const data = await response.json();
      setAlerts(data.alerts || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get performance trends
  const loadTrends = useCallback(async (period: 'hour' | 'day' | 'week' = 'day') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/deployment/monitor?action=performance-trends&period=${period}`
      );
      if (!response.ok) throw new Error('Failed to load trends');

      const data = await response.json();
      setTrends(data.trends);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get uptime statistics
  const loadUptime = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/deployment/monitor?action=uptime-statistics');
      if (!response.ok) throw new Error('Failed to load uptime');

      const data = await response.json();
      setUptime(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Record health check
  const recordHealthCheck = useCallback(
    async (componentName: string, status: string, responseTime: number, details?: any) => {
      setError(null);

      try {
        const response = await fetch('/api/deployment/monitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'record_health_check',
            componentName,
            status,
            responseTime,
            details,
          }),
        });

        if (!response.ok) throw new Error('Failed to record health check');

        const data = await response.json();
        return data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    []
  );

  // Acknowledge alert
  const acknowledgeAlert = useCallback(async (alertId: string) => {
    setError(null);

    try {
      const response = await fetch('/api/deployment/monitor', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'acknowledge_alert',
          alertId,
        }),
      });

      if (!response.ok) throw new Error('Failed to acknowledge alert');

      const data = await response.json();
      setAlerts(alerts.map(a => (a.id === alertId ? data : a)));
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [alerts]);

  // Create alert rule
  const createAlertRule = useCallback(
    async (id: string, name: string, metric: string, threshold: number, operator: string, severity: string) => {
      setError(null);

      try {
        const response = await fetch('/api/deployment/monitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create_alert_rule',
            id,
            name,
            metric,
            threshold,
            operator,
            severity,
          }),
        });

        if (!response.ok) throw new Error('Failed to create alert rule');

        const data = await response.json();
        return data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    []
  );

  useEffect(() => {
    loadHealthStatus();
    loadPerformanceMetrics();
    loadAlerts();
    loadTrends();
    loadUptime();

    // Refresh every 30 seconds
    const interval = setInterval(() => {
      loadHealthStatus();
      loadPerformanceMetrics();
      loadAlerts();
    }, 30000);

    return () => clearInterval(interval);
  }, [loadHealthStatus, loadPerformanceMetrics, loadAlerts, loadTrends, loadUptime]);

  return {
    healthStatus,
    performanceMetrics,
    alerts,
    trends,
    uptime,
    isLoading,
    error,
    loadHealthStatus,
    loadPerformanceMetrics,
    loadAlerts,
    loadTrends,
    loadUptime,
    recordHealthCheck,
    acknowledgeAlert,
    createAlertRule,
  };
}
