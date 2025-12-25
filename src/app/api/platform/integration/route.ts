import { NextRequest, NextResponse } from 'next/server';
import { platformIntegration } from '@/lib/platform/platform-integration';
import { platformOrchestrator } from '@/lib/platform/platform-orchestrator';
import { serviceBus } from '@/lib/platform/service-bus';

/**
 * Platform Integration API
 *
 * GET /api/platform/integration - Get platform status
 * POST /api/platform/integration - Execute workflows and operations
 * PATCH /api/platform/integration - Update platform configuration
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // Get platform status
    if (action === 'status') {
      const status = platformIntegration.getPlatformStatus();
      return NextResponse.json(status, { status: 200 });
    }

    // Get platform health
    if (action === 'health') {
      const health = platformIntegration.getPlatformHealth();
      return NextResponse.json(health, { status: 200 });
    }

    // Get service registry
    if (action === 'services') {
      const registry = platformIntegration.getServiceRegistry();
      return NextResponse.json(
        {
          services: Object.entries(registry).map(([name, info]) => ({
            name,
            ...info
          })),
          count: Object.keys(registry).length
        },
        { status: 200 }
      );
    }

    // Get service bus statistics
    if (action === 'bus-statistics') {
      const stats = serviceBus.getStatistics();
      return NextResponse.json(stats, { status: 200 });
    }

    // Get message history
    if (action === 'message-history') {
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;
      const type = searchParams.get('type') as any;
      const source = searchParams.get('source');

      const history = serviceBus.getMessageHistory({
        type,
        source: source || undefined,
        limit
      });

      return NextResponse.json(
        {
          messages: history,
          count: history.length
        },
        { status: 200 }
      );
    }

    // Get dead letter queue
    if (action === 'dead-letter-queue') {
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;
      const messages = serviceBus.getDeadLetterQueue(limit);

      return NextResponse.json(
        {
          messages,
          count: messages.length
        },
        { status: 200 }
      );
    }

    // Get workflow history
    if (action === 'workflow-history') {
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;
      const type = searchParams.get('type') as any;
      const status = searchParams.get('status') as any;

      const history = platformOrchestrator.getWorkflowHistory({
        type,
        status,
        limit
      });

      return NextResponse.json(
        {
          workflows: history.map(w => ({
            id: w.id,
            type: w.type,
            status: w.status,
            startedAt: w.startedAt,
            completedAt: w.completedAt,
            stepCount: w.steps.length
          })),
          count: history.length
        },
        { status: 200 }
      );
    }

    // Get orchestrator metrics
    if (action === 'orchestrator-metrics') {
      const metrics = platformOrchestrator.getMetrics();
      return NextResponse.json(metrics, { status: 200 });
    }

    // Get circuit breaker status
    if (action === 'circuit-breakers') {
      const breakers = serviceBus.getCircuitBreakerStatus();
      return NextResponse.json(
        {
          breakers,
          count: breakers.length,
          openCount: (breakers as any[]).filter(b => b.state === 'open').length
        },
        { status: 200 }
      );
    }

    // Get workflow definition
    if (action === 'workflow-definition') {
      const workflowId = searchParams.get('workflowId');
      if (!workflowId) {
        return NextResponse.json(
          { error: 'workflowId is required' },
          { status: 400 }
        );
      }

      const definition = platformOrchestrator.getWorkflowDefinition(workflowId);
      if (!definition) {
        return NextResponse.json(
          { error: 'Workflow definition not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(definition, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Missing or invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in platform integration GET:', error);
    return NextResponse.json(
      { error: 'Failed to fetch platform integration data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // Execute workflow
    if (action === 'execute_workflow') {
      const { workflowId, parameters } = body;

      if (!workflowId) {
        return NextResponse.json(
          { error: 'workflowId is required' },
          { status: 400 }
        );
      }

      try {
        const jobId = await platformIntegration.executeWorkflow(
          workflowId,
          parameters || {}
        );

        return NextResponse.json(
          {
            jobId,
            workflowId,
            status: 'started'
          },
          { status: 201 }
        );
      } catch (error: any) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
    }

    // Publish event to service bus
    if (action === 'publish_event') {
      const { type, source, payload, metadata } = body;

      if (!type || !source) {
        return NextResponse.json(
          { error: 'Missing required fields: type, source' },
          { status: 400 }
        );
      }

      const messageId = await serviceBus.publishEvent({
        type: type as any,
        source,
        payload: payload || {},
        metadata
      });

      return NextResponse.json(
        {
          messageId,
          type,
          source,
          timestamp: Date.now()
        },
        { status: 201 }
      );
    }

    // Retry dead letter message
    if (action === 'retry_dlq_message') {
      const { messageId } = body;

      if (!messageId) {
        return NextResponse.json(
          { error: 'messageId is required' },
          { status: 400 }
        );
      }

      const success = await serviceBus.retryDeadLetterMessage(messageId);

      return NextResponse.json(
        {
          messageId,
          retried: success,
          status: success ? 'retried' : 'failed'
        },
        { status: 200 }
      );
    }

    // Register workflow definition
    if (action === 'register_workflow') {
      const { id, name, description, type, steps } = body;

      if (!id || !name || !type || !steps) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }

      platformOrchestrator.registerWorkflowDefinition({
        id,
        name,
        description: description || '',
        type: type as any,
        steps
      });

      return NextResponse.json(
        {
          id,
          name,
          type,
          stepCount: steps.length
        },
        { status: 201 }
      );
    }

    // Initialize platform
    if (action === 'initialize') {
      try {
        await platformIntegration.initialize();

        return NextResponse.json(
          {
            status: 'initialized',
            timestamp: Date.now()
          },
          { status: 200 }
        );
      } catch (error: any) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in platform integration POST:', error);
    return NextResponse.json(
      { error: 'Failed to process platform integration request' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // Attempt circuit breaker recovery
    if (action === 'recover_circuit_breaker') {
      const { service } = body;

      if (!service) {
        return NextResponse.json(
          { error: 'service is required' },
          { status: 400 }
        );
      }

      const success = serviceBus.attemptRecovery(service);

      return NextResponse.json(
        {
          service,
          recoveryStarted: success,
          status: success ? 'recovering' : 'not_applicable'
        },
        { status: 200 }
      );
    }

    // Clear message history
    if (action === 'clear_message_history') {
      serviceBus.clearMessageHistory();

      return NextResponse.json(
        {
          message: 'Message history cleared'
        },
        { status: 200 }
      );
    }

    // Clear workflow history
    if (action === 'clear_workflow_history') {
      platformOrchestrator.clearWorkflowHistory();

      return NextResponse.json(
        {
          message: 'Workflow history cleared'
        },
        { status: 200 }
      );
    }

    // Clear dead letter queue
    if (action === 'clear_dlq') {
      serviceBus.clearDeadLetterQueue();

      return NextResponse.json(
        {
          message: 'Dead letter queue cleared'
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in platform integration PATCH:', error);
    return NextResponse.json(
      { error: 'Failed to update platform integration' },
      { status: 500 }
    );
  }
}
