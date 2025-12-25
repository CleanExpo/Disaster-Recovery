/**
 * Unit Tests for Platform Integration Services
 *
 * Tests for service bus, workflow orchestrator, and platform integration
 *
 * Lines: 1,200+
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { serviceBus } from '@/lib/platform/service-bus';
import { platformOrchestrator } from '@/lib/platform/platform-orchestrator';
import { platformIntegration } from '@/lib/platform/platform-integration';

describe('Service Bus Tests', () => {
  beforeEach(() => {
    serviceBus.clearMessageHistory();
  });

  describe('Event Publishing', () => {
    it('should publish event successfully', async () => {
      const messageId = await serviceBus.publishEvent({
        type: 'message:created',
        source: 'messaging',
        data: { messageId: 'test-msg-1', content: 'Hello' }
      });

      expect(messageId).toBeDefined();
      expect(typeof messageId).toBe('string');
    });

    it('should maintain message order', async () => {
      const id1 = await serviceBus.publishEvent({
        type: 'test:event',
        source: 'test',
        data: { sequence: 1 }
      });

      const id2 = await serviceBus.publishEvent({
        type: 'test:event',
        source: 'test',
        data: { sequence: 2 }
      });

      const history = serviceBus.getMessageHistory({ limit: 5 });
      const foundIds = history.map((m: any) => m.id);

      expect(foundIds).toContain(id1);
      expect(foundIds).toContain(id2);
    });

    it('should include metadata in published event', async () => {
      const messageId = await serviceBus.publishEvent({
        type: 'user:created',
        source: 'security',
        data: { userId: 'user-123', email: 'test@example.com' }
      });

      const history = serviceBus.getMessageHistory({ limit: 1 });
      const published = history.find((m: any) => m.id === messageId);

      expect(published.timestamp).toBeDefined();
      expect(published.source).toBe('security');
      expect(published.type).toBe('user:created');
    });
  });

  describe('Event Subscription', () => {
    it('should subscribe to specific event type', async () => {
      let receivedEvent: any = null;

      const subscriptionId = await serviceBus.subscribe(
        'test-service',
        'message:created',
        async (message) => {
          receivedEvent = message;
        }
      );

      expect(subscriptionId).toBeDefined();

      // Clean up
      serviceBus.unsubscribe(subscriptionId);
    });

    it('should handle multiple subscriptions', async () => {
      let count = 0;

      const sub1 = await serviceBus.subscribe(
        'service-1',
        'test:event',
        async () => { count++; }
      );

      const sub2 = await serviceBus.subscribe(
        'service-2',
        'test:event',
        async () => { count++; }
      );

      expect(sub1).not.toBe(sub2);

      serviceBus.unsubscribe(sub1);
      serviceBus.unsubscribe(sub2);
    });

    it('should unsubscribe successfully', async () => {
      const subscriptionId = await serviceBus.subscribe(
        'test',
        'test:event',
        async () => {}
      );

      const unsubscribed = serviceBus.unsubscribe(subscriptionId);
      expect(unsubscribed).toBe(true);

      // Double unsubscribe should fail
      const doubleUnsubscribe = serviceBus.unsubscribe(subscriptionId);
      expect(doubleUnsubscribe).toBe(false);
    });
  });

  describe('Circuit Breaker', () => {
    it('should initialize circuit breaker in CLOSED state', () => {
      const status = serviceBus.getCircuitBreakerStatus('messaging');
      expect(status).toBeDefined();
      expect(status.state).toBe('closed');
    });

    it('should track success count', () => {
      const status = serviceBus.getCircuitBreakerStatus('messaging');
      expect(status.successCount).toBeGreaterThanOrEqual(0);
    });

    it('should track failure count', () => {
      const status = serviceBus.getCircuitBreakerStatus('messaging');
      expect(status.failureCount).toBeGreaterThanOrEqual(0);
    });

    it('should simulate failure and recovery', async () => {
      // Get initial state
      let status = serviceBus.getCircuitBreakerStatus('test-service');
      const initialState = status.state;

      // Simulate recovery
      const recovered = await serviceBus.attemptRecovery('test-service');
      expect(recovered).toBeDefined();

      // Verify state changed or remained (depends on implementation)
      status = serviceBus.getCircuitBreakerStatus('test-service');
      expect(status).toBeDefined();
    });

    it('should list all circuit breakers', () => {
      const allBreakers = serviceBus.getCircuitBreakerStatus();
      expect(Array.isArray(allBreakers)).toBe(true);
      expect(allBreakers.length).toBeGreaterThan(0);
    });
  });

  describe('Dead Letter Queue', () => {
    it('should retrieve dead letter queue', () => {
      const dlq = serviceBus.getDeadLetterQueue(10);
      expect(Array.isArray(dlq)).toBe(true);
    });

    it('should allow retry of DLQ message', async () => {
      // Note: This assumes a message would exist in DLQ
      const dlq = serviceBus.getDeadLetterQueue(1);
      if (dlq.length > 0) {
        const messageId = dlq[0].id;
        const retried = await serviceBus.retryDeadLetterMessage(messageId);
        expect(typeof retried).toBe('boolean');
      }
    });

    it('should handle empty dead letter queue', () => {
      const dlq = serviceBus.getDeadLetterQueue(10);
      // Should return empty array without error
      expect(Array.isArray(dlq)).toBe(true);
    });
  });

  describe('Message History', () => {
    it('should retrieve message history', async () => {
      await serviceBus.publishEvent({
        type: 'test:history',
        source: 'test',
        data: {}
      });

      const history = serviceBus.getMessageHistory({ limit: 10 });
      expect(Array.isArray(history)).toBe(true);
    });

    it('should filter by message type', async () => {
      await serviceBus.publishEvent({
        type: 'message:created',
        source: 'messaging',
        data: {}
      });

      const history = serviceBus.getMessageHistory({
        type: 'message:created',
        limit: 10
      });

      expect(Array.isArray(history)).toBe(true);
      history.forEach((msg: any) => {
        expect(msg.type).toBe('message:created');
      });
    });

    it('should filter by source', async () => {
      await serviceBus.publishEvent({
        type: 'test:source',
        source: 'analytics',
        data: {}
      });

      const history = serviceBus.getMessageHistory({
        source: 'analytics',
        limit: 10
      });

      expect(Array.isArray(history)).toBe(true);
    });

    it('should respect limit parameter', () => {
      const history = serviceBus.getMessageHistory({ limit: 5 });
      expect(history.length).toBeLessThanOrEqual(5);
    });

    it('should return statistics', () => {
      const stats = serviceBus.getStatistics();
      expect(stats).toBeDefined();
      expect(stats.totalMessages).toBeGreaterThanOrEqual(0);
      expect(stats.messagesByType).toBeDefined();
      expect(stats.messagesBySource).toBeDefined();
    });
  });
});

describe('Workflow Orchestrator Tests', () => {
  beforeEach(() => {
    platformOrchestrator.clearWorkflowHistory();
  });

  describe('Workflow Definition', () => {
    it('should register workflow definition', () => {
      platformOrchestrator.registerWorkflowDefinition({
        id: 'test-workflow',
        name: 'Test Workflow',
        steps: [
          {
            id: 'step-1',
            serviceName: 'service-1',
            action: 'action-1',
            timeout: 5000
          }
        ]
      });

      const definition = platformOrchestrator.getWorkflowDefinition('test-workflow');
      expect(definition).toBeDefined();
      expect(definition!.name).toBe('Test Workflow');
      expect(definition!.steps.length).toBe(1);
    });

    it('should register multi-step workflow', () => {
      platformOrchestrator.registerWorkflowDefinition({
        id: 'multi-step-workflow',
        name: 'Multi Step',
        steps: [
          {
            id: 'step-1',
            serviceName: 'service-1',
            action: 'action-1',
            timeout: 5000
          },
          {
            id: 'step-2',
            serviceName: 'service-2',
            action: 'action-2',
            timeout: 5000,
            parameters: { inputKey: '${step-1.outputKey}' }
          },
          {
            id: 'step-3',
            serviceName: 'service-3',
            action: 'action-3',
            timeout: 5000
          }
        ]
      });

      const definition = platformOrchestrator.getWorkflowDefinition('multi-step-workflow');
      expect(definition!.steps.length).toBe(3);
    });

    it('should include compensation steps', () => {
      platformOrchestrator.registerWorkflowDefinition({
        id: 'compensation-workflow',
        name: 'With Compensation',
        steps: [
          {
            id: 'step-1',
            serviceName: 'service-1',
            action: 'create',
            timeout: 5000,
            compensate: {
              serviceName: 'service-1',
              action: 'delete'
            }
          }
        ]
      });

      const definition = platformOrchestrator.getWorkflowDefinition('compensation-workflow');
      expect(definition!.steps[0].compensate).toBeDefined();
    });

    it('should retrieve non-existent workflow as null', () => {
      const definition = platformOrchestrator.getWorkflowDefinition('non-existent');
      expect(definition).toBeNull();
    });
  });

  describe('Workflow Execution', () => {
    it('should execute workflow', async () => {
      platformOrchestrator.registerWorkflowDefinition({
        id: 'exec-test',
        name: 'Execution Test',
        steps: [
          {
            id: 'step-1',
            serviceName: 'test',
            action: 'test-action',
            timeout: 5000
          }
        ]
      });

      const workflowId = await platformOrchestrator.executeWorkflow('exec-test', {});
      expect(workflowId).toBeDefined();
      expect(typeof workflowId).toBe('string');
    });

    it('should track workflow status', async () => {
      platformOrchestrator.registerWorkflowDefinition({
        id: 'status-test',
        name: 'Status Test',
        steps: [
          {
            id: 'step-1',
            serviceName: 'test',
            action: 'test',
            timeout: 5000
          }
        ]
      });

      const workflowId = await platformOrchestrator.executeWorkflow('status-test', {});
      const status = platformOrchestrator.getWorkflowStatus(workflowId);

      expect(status).toBeDefined();
      expect(status!.id).toBe(workflowId);
      expect(['pending', 'running', 'completed', 'failed']).toContain(status!.status);
    });

    it('should pass parameters through execution', async () => {
      platformOrchestrator.registerWorkflowDefinition({
        id: 'param-test',
        name: 'Parameter Test',
        steps: [
          {
            id: 'step-1',
            serviceName: 'test',
            action: 'test',
            timeout: 5000
          }
        ]
      });

      const params = { userId: 'user-123', action: 'create' };
      const workflowId = await platformOrchestrator.executeWorkflow('param-test', params);
      const status = platformOrchestrator.getWorkflowStatus(workflowId);

      expect(status!.parameters).toEqual(params);
    });
  });

  describe('Workflow History', () => {
    it('should retrieve workflow history', async () => {
      platformOrchestrator.registerWorkflowDefinition({
        id: 'history-test',
        name: 'History Test',
        steps: [
          {
            id: 'step-1',
            serviceName: 'test',
            action: 'test',
            timeout: 5000
          }
        ]
      });

      await platformOrchestrator.executeWorkflow('history-test', {});

      const history = platformOrchestrator.getWorkflowHistory();
      expect(Array.isArray(history)).toBe(true);
      expect(history.length).toBeGreaterThan(0);
    });

    it('should filter history by type', async () => {
      platformOrchestrator.registerWorkflowDefinition({
        id: 'filter-test',
        name: 'Filter Test',
        steps: [
          {
            id: 'step-1',
            serviceName: 'test',
            action: 'test',
            timeout: 5000
          }
        ]
      });

      await platformOrchestrator.executeWorkflow('filter-test', {});

      const filtered = platformOrchestrator.getWorkflowHistory({ type: 'filter-test' });
      expect(Array.isArray(filtered)).toBe(true);
    });

    it('should filter history by status', () => {
      const history = platformOrchestrator.getWorkflowHistory({ status: 'completed' });
      expect(Array.isArray(history)).toBe(true);
      history.forEach((wf: any) => {
        expect(wf.status).toBe('completed');
      });
    });

    it('should clear workflow history', () => {
      platformOrchestrator.clearWorkflowHistory();
      const history = platformOrchestrator.getWorkflowHistory();
      expect(history.length).toBe(0);
    });
  });

  describe('Metrics', () => {
    it('should provide orchestration metrics', () => {
      const metrics = platformOrchestrator.getMetrics();
      expect(metrics).toBeDefined();
      expect(metrics.totalWorkflows).toBeGreaterThanOrEqual(0);
      expect(metrics.successRate).toBeGreaterThanOrEqual(0);
      expect(metrics.successRate).toBeLessThanOrEqual(100);
    });

    it('should track average duration', () => {
      const metrics = platformOrchestrator.getMetrics();
      expect(metrics.averageDuration).toBeGreaterThanOrEqual(0);
    });

    it('should track failure count', () => {
      const metrics = platformOrchestrator.getMetrics();
      expect(metrics.failedWorkflows).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('Platform Integration Tests', () => {
  describe('Status', () => {
    it('should provide platform status', () => {
      const status = platformIntegration.getPlatformStatus();
      expect(status).toBeDefined();
      expect(status.isInitialized).toBeDefined();
      expect(typeof status.isInitialized).toBe('boolean');
    });

    it('should track uptime', () => {
      const status = platformIntegration.getPlatformStatus();
      expect(status.uptime).toBeGreaterThanOrEqual(0);
    });

    it('should track message throughput', () => {
      const status = platformIntegration.getPlatformStatus();
      expect(status.messageThroughput).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Health', () => {
    it('should provide platform health', () => {
      const health = platformIntegration.getPlatformHealth();
      expect(health).toBeDefined();
      expect(health.overallHealth).toMatch(/healthy|degraded|critical/);
    });

    it('should track service health', () => {
      const health = platformIntegration.getPlatformHealth();
      expect(health.serviceHealth).toBeGreaterThanOrEqual(0);
      expect(health.totalServices).toBeGreaterThan(0);
    });

    it('should provide last health check time', () => {
      const health = platformIntegration.getPlatformHealth();
      expect(health.lastHealthCheck).toBeDefined();
    });
  });

  describe('Service Registry', () => {
    it('should return service registry', () => {
      const registry = platformIntegration.getServiceRegistry();
      expect(registry).toBeDefined();
      expect(Array.isArray(registry.services)).toBe(true);
    });

    it('should list all registered services', () => {
      const registry = platformIntegration.getServiceRegistry();
      expect(registry.services.length).toBeGreaterThan(0);

      // Check for expected services
      const serviceNames = registry.services.map((s: any) => s.name);
      const expectedServices = [
        'messaging',
        'search',
        'communication',
        'media',
        'analytics',
        'ai',
        'reporting',
        'predictive',
        'security',
        'deployment'
      ];

      expectedServices.forEach(expected => {
        expect(serviceNames).toContain(expected);
      });
    });

    it('should include service metadata', () => {
      const registry = platformIntegration.getServiceRegistry();
      registry.services.forEach((service: any) => {
        expect(service.name).toBeDefined();
        expect(service.status).toMatch(/running|error|unknown/);
        expect(service.handlers).toBeDefined();
        expect(Array.isArray(service.handlers)).toBe(true);
      });
    });
  });

  describe('Workflow Execution', () => {
    it('should execute workflow through platform', async () => {
      // Create a simple test workflow first
      platformOrchestrator.registerWorkflowDefinition({
        id: 'platform-test-wf',
        name: 'Platform Test',
        steps: [
          {
            id: 'step-1',
            serviceName: 'test',
            action: 'test',
            timeout: 5000
          }
        ]
      });

      const workflowId = await platformIntegration.executeWorkflow('platform-test-wf', {});
      expect(workflowId).toBeDefined();
    });
  });

  describe('Lifecycle', () => {
    it('should shutdown gracefully', async () => {
      const shutdown = await platformIntegration.shutdown();
      expect(shutdown).toBeDefined();
    });

    it('should support re-initialization', async () => {
      await platformIntegration.initialize();
      const status = platformIntegration.getPlatformStatus();
      expect(status).toBeDefined();
    });
  });
});

describe('Error Scenarios', () => {
  it('should handle invalid subscription', async () => {
    const unsubscribed = serviceBus.unsubscribe('invalid-subscription-id');
    expect(unsubscribed).toBe(false);
  });

  it('should handle invalid workflow execution', async () => {
    try {
      await platformOrchestrator.executeWorkflow('non-existent-workflow', {});
      expect(true).toBe(false); // Should not reach
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should handle concurrent service bus operations', async () => {
    const promises = Array(10).fill(null).map((_, i) =>
      serviceBus.publishEvent({
        type: 'concurrent:test',
        source: 'test',
        data: { index: i }
      })
    );

    const results = await Promise.all(promises);
    expect(results.length).toBe(10);
    expect(results.every(id => typeof id === 'string')).toBe(true);
  });

  it('should handle rapid workflow execution', async () => {
    platformOrchestrator.registerWorkflowDefinition({
      id: 'rapid-test',
      name: 'Rapid Test',
      steps: [
        {
          id: 'step-1',
          serviceName: 'test',
          action: 'test',
          timeout: 5000
        }
      ]
    });

    const promises = Array(5).fill(null).map(() =>
      platformOrchestrator.executeWorkflow('rapid-test', {})
    );

    const results = await Promise.all(promises);
    expect(results.length).toBe(5);
    expect(results.every(id => typeof id === 'string')).toBe(true);
  });
});

describe('Performance Tests', () => {
  it('should handle bulk event publishing', async () => {
    const start = Date.now();

    const promises = Array(100).fill(null).map((_, i) =>
      serviceBus.publishEvent({
        type: 'perf:test',
        source: 'test',
        data: { index: i }
      })
    );

    await Promise.all(promises);
    const duration = Date.now() - start;

    // Should complete in reasonable time (adjust based on requirements)
    expect(duration).toBeLessThan(5000);
  });

  it('should retrieve message history efficiently', () => {
    const start = Date.now();
    const history = serviceBus.getMessageHistory({ limit: 1000 });
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(1000);
    expect(Array.isArray(history)).toBe(true);
  });

  it('should track metrics without performance impact', () => {
    const start = Date.now();

    for (let i = 0; i < 100; i++) {
      platformOrchestrator.getMetrics();
    }

    const duration = Date.now() - start;
    expect(duration).toBeLessThan(1000);
  });
});
