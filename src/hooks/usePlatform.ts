'use client';

import { useEffect, useState, useCallback } from 'react';

/**
 * usePlatformIntegration - Manage platform-wide operations and monitoring
 */
export function usePlatformIntegration() {
  const [platformStatus, setPlatformStatus] = useState<any>(null);
  const [platformHealth, setPlatformHealth] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load platform status
  const loadPlatformStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/platform/integration?action=status');
      if (!response.ok) throw new Error('Failed to load platform status');

      const data = await response.json();
      setPlatformStatus(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load platform health
  const loadPlatformHealth = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/platform/integration?action=health');
      if (!response.ok) throw new Error('Failed to load platform health');

      const data = await response.json();
      setPlatformHealth(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load services
  const loadServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/platform/integration?action=services');
      if (!response.ok) throw new Error('Failed to load services');

      const data = await response.json();
      setServices(data.services || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize platform
  const initializePlatform = useCallback(async () => {
    setError(null);

    try {
      const response = await fetch('/api/platform/integration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'initialize' })
      });

      if (!response.ok) throw new Error('Failed to initialize platform');

      const data = await response.json();
      await loadPlatformStatus();
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [loadPlatformStatus]);

  // Execute workflow
  const executeWorkflow = useCallback(
    async (workflowId: string, parameters: Record<string, any>) => {
      setError(null);

      try {
        const response = await fetch('/api/platform/integration', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'execute_workflow',
            workflowId,
            parameters
          })
        });

        if (!response.ok) throw new Error('Failed to execute workflow');

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
    loadPlatformStatus();
    loadPlatformHealth();
    loadServices();

    // Refresh every 30 seconds
    const interval = setInterval(() => {
      loadPlatformStatus();
      loadPlatformHealth();
    }, 30000);

    return () => clearInterval(interval);
  }, [loadPlatformStatus, loadPlatformHealth, loadServices]);

  return {
    platformStatus,
    platformHealth,
    services,
    isLoading,
    error,
    loadPlatformStatus,
    loadPlatformHealth,
    loadServices,
    initializePlatform,
    executeWorkflow
  };
}

/**
 * useServiceBus - Manage service bus operations
 */
export function useServiceBus() {
  const [busStatistics, setBusStatistics] = useState<any>(null);
  const [messageHistory, setMessageHistory] = useState<any[]>([]);
  const [deadLetterQueue, setDeadLetterQueue] = useState<any[]>([]);
  const [circuitBreakers, setCircuitBreakers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load bus statistics
  const loadBusStatistics = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/platform/integration?action=bus-statistics');
      if (!response.ok) throw new Error('Failed to load bus statistics');

      const data = await response.json();
      setBusStatistics(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load message history
  const loadMessageHistory = useCallback(async (limit: number = 50) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/platform/integration?action=message-history&limit=${limit}`);
      if (!response.ok) throw new Error('Failed to load message history');

      const data = await response.json();
      setMessageHistory(data.messages || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load dead letter queue
  const loadDeadLetterQueue = useCallback(async (limit: number = 50) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/platform/integration?action=dead-letter-queue&limit=${limit}`);
      if (!response.ok) throw new Error('Failed to load dead letter queue');

      const data = await response.json();
      setDeadLetterQueue(data.messages || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load circuit breakers
  const loadCircuitBreakers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/platform/integration?action=circuit-breakers');
      if (!response.ok) throw new Error('Failed to load circuit breakers');

      const data = await response.json();
      setCircuitBreakers(data.breakers || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Publish event
  const publishEvent = useCallback(
    async (type: string, source: string, payload: any, metadata?: any) => {
      setError(null);

      try {
        const response = await fetch('/api/platform/integration', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'publish_event',
            type,
            source,
            payload,
            metadata
          })
        });

        if (!response.ok) throw new Error('Failed to publish event');

        const data = await response.json();
        return data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    []
  );

  // Retry DLQ message
  const retryDLQMessage = useCallback(async (messageId: string) => {
    setError(null);

    try {
      const response = await fetch('/api/platform/integration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'retry_dlq_message',
          messageId
        })
      });

      if (!response.ok) throw new Error('Failed to retry message');

      const data = await response.json();
      if (data.retried) {
        await loadDeadLetterQueue();
      }
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [loadDeadLetterQueue]);

  // Recover circuit breaker
  const recoverCircuitBreaker = useCallback(async (service: string) => {
    setError(null);

    try {
      const response = await fetch('/api/platform/integration', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'recover_circuit_breaker',
          service
        })
      });

      if (!response.ok) throw new Error('Failed to recover circuit breaker');

      const data = await response.json();
      await loadCircuitBreakers();
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [loadCircuitBreakers]);

  useEffect(() => {
    loadBusStatistics();
    loadCircuitBreakers();

    const interval = setInterval(() => {
      loadBusStatistics();
      loadCircuitBreakers();
    }, 30000);

    return () => clearInterval(interval);
  }, [loadBusStatistics, loadCircuitBreakers]);

  return {
    busStatistics,
    messageHistory,
    deadLetterQueue,
    circuitBreakers,
    isLoading,
    error,
    loadBusStatistics,
    loadMessageHistory,
    loadDeadLetterQueue,
    loadCircuitBreakers,
    publishEvent,
    retryDLQMessage,
    recoverCircuitBreaker
  };
}

/**
 * useWorkflowOrchestration - Manage workflow execution
 */
export function useWorkflowOrchestration() {
  const [workflowHistory, setWorkflowHistory] = useState<any[]>([]);
  const [orchestratorMetrics, setOrchestratorMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load workflow history
  const loadWorkflowHistory = useCallback(async (limit: number = 50) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/platform/integration?action=workflow-history&limit=${limit}`);
      if (!response.ok) throw new Error('Failed to load workflow history');

      const data = await response.json();
      setWorkflowHistory(data.workflows || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load orchestrator metrics
  const loadOrchestratorMetrics = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/platform/integration?action=orchestrator-metrics');
      if (!response.ok) throw new Error('Failed to load orchestrator metrics');

      const data = await response.json();
      setOrchestratorMetrics(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get workflow definition
  const getWorkflowDefinition = useCallback(async (workflowId: string) => {
    setError(null);

    try {
      const response = await fetch(
        `/api/platform/integration?action=workflow-definition&workflowId=${workflowId}`
      );
      if (!response.ok) throw new Error('Failed to load workflow definition');

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Register workflow
  const registerWorkflow = useCallback(async (definition: any) => {
    setError(null);

    try {
      const response = await fetch('/api/platform/integration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register_workflow',
          ...definition
        })
      });

      if (!response.ok) throw new Error('Failed to register workflow');

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  useEffect(() => {
    loadWorkflowHistory();
    loadOrchestratorMetrics();

    const interval = setInterval(() => {
      loadWorkflowHistory();
      loadOrchestratorMetrics();
    }, 30000);

    return () => clearInterval(interval);
  }, [loadWorkflowHistory, loadOrchestratorMetrics]);

  return {
    workflowHistory,
    orchestratorMetrics,
    isLoading,
    error,
    loadWorkflowHistory,
    loadOrchestratorMetrics,
    getWorkflowDefinition,
    registerWorkflow
  };
}
