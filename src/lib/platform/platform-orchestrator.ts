/**
 * Platform Orchestrator
 *
 * Coordinates complex workflows across multiple services
 * Handles transaction management, saga patterns, and distributed operations
 */

import { EventEmitter } from 'events';
import { serviceBus, ServiceMessage } from './service-bus';

export type WorkflowStatus = 'created' | 'running' | 'completed' | 'failed' | 'rolled_back';
export type WorkflowType =
  | 'user_creation' | 'room_creation' | 'message_send'
  | 'call_session' | 'file_upload' | 'deployment'
  | 'user_deletion' | 'room_deletion' | 'data_export';

export interface WorkflowStep {
  id: string;
  name: string;
  service: string;
  action: string;
  parameters: any;
  timeout: number; // ms
  retries: number;
  compensate?: {
    service: string;
    action: string;
    parameters: any;
  };
}

export interface Workflow {
  id: string;
  type: WorkflowType;
  status: WorkflowStatus;
  steps: WorkflowStep[];
  currentStepIndex: number;
  startedAt: number;
  completedAt?: number;
  error?: string;
  results: Map<string, any>;
  compensation: Map<string, any>;
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  type: WorkflowType;
  steps: WorkflowStep[];
  onSuccess?: (results: Map<string, any>) => Promise<void>;
  onFailure?: (error: string, results: Map<string, any>) => Promise<void>;
}

export interface WorkflowMetrics {
  totalWorkflows: number;
  completedWorkflows: number;
  failedWorkflows: number;
  averageDuration: number;
  successRate: number;
  averageStepsPerWorkflow: number;
}

export class PlatformOrchestrator extends EventEmitter {
  private workflows: Map<string, Workflow> = new Map();
  private workflowDefinitions: Map<string, WorkflowDefinition> = new Map();
  private workflowHistory: Workflow[] = [];
  private maxHistorySize = 10000;
  private stepTimeout = 30000; // 30 seconds default

  constructor() {
    super();
    this.initializeDefaultWorkflows();
  }

  /**
   * Initialize default workflow definitions
   */
  private initializeDefaultWorkflows() {
    // User creation workflow
    this.registerWorkflowDefinition({
      id: 'user_creation',
      name: 'User Creation Workflow',
      description: 'Create user account with security and analytics',
      type: 'user_creation',
      steps: [
        {
          id: 'create_account',
          name: 'Create User Account',
          service: 'security',
          action: 'create_user',
          parameters: { username: '', email: '', password: '' },
          timeout: 5000,
          retries: 2,
          compensate: {
            service: 'security',
            action: 'delete_user',
            parameters: { userId: '' }
          }
        },
        {
          id: 'record_audit',
          name: 'Record Audit Trail',
          service: 'security',
          action: 'record_audit',
          parameters: { userId: '', action: 'user_created' },
          timeout: 3000,
          retries: 3
        },
        {
          id: 'track_event',
          name: 'Track Analytics Event',
          service: 'analytics',
          action: 'track_event',
          parameters: { eventType: 'user_created', userId: '' },
          timeout: 5000,
          retries: 3
        },
        {
          id: 'send_notification',
          name: 'Send Welcome Notification',
          service: 'messaging',
          action: 'send_welcome',
          parameters: { userId: '' },
          timeout: 5000,
          retries: 2
        }
      ]
    });

    // Room creation workflow
    this.registerWorkflowDefinition({
      id: 'room_creation',
      name: 'Room Creation Workflow',
      description: 'Create room with initialization',
      type: 'room_creation',
      steps: [
        {
          id: 'create_room',
          name: 'Create Room',
          service: 'messaging',
          action: 'create_room',
          parameters: { name: '', description: '', creatorId: '' },
          timeout: 5000,
          retries: 2,
          compensate: {
            service: 'messaging',
            action: 'delete_room',
            parameters: { roomId: '' }
          }
        },
        {
          id: 'setup_search_index',
          name: 'Setup Search Index',
          service: 'search',
          action: 'create_index',
          parameters: { roomId: '' },
          timeout: 5000,
          retries: 2
        },
        {
          id: 'initialize_analytics',
          name: 'Initialize Analytics',
          service: 'analytics',
          action: 'initialize_room',
          parameters: { roomId: '' },
          timeout: 3000,
          retries: 3
        },
        {
          id: 'setup_encryption',
          name: 'Setup Encryption',
          service: 'security',
          action: 'setup_room_encryption',
          parameters: { roomId: '' },
          timeout: 5000,
          retries: 2
        }
      ]
    });

    // Message sending workflow
    this.registerWorkflowDefinition({
      id: 'message_send',
      name: 'Message Send Workflow',
      description: 'Send message with processing',
      type: 'message_send',
      steps: [
        {
          id: 'validate_message',
          name: 'Validate Message',
          service: 'messaging',
          action: 'validate',
          parameters: { content: '', roomId: '' },
          timeout: 2000,
          retries: 1
        },
        {
          id: 'detect_spam',
          name: 'Spam Detection',
          service: 'ai',
          action: 'detect_spam',
          parameters: { content: '' },
          timeout: 5000,
          retries: 2
        },
        {
          id: 'moderate_content',
          name: 'Content Moderation',
          service: 'ai',
          action: 'moderate',
          parameters: { content: '' },
          timeout: 5000,
          retries: 2
        },
        {
          id: 'store_message',
          name: 'Store Message',
          service: 'messaging',
          action: 'create_message',
          parameters: { content: '', roomId: '', userId: '' },
          timeout: 5000,
          retries: 2,
          compensate: {
            service: 'messaging',
            action: 'delete_message',
            parameters: { messageId: '' }
          }
        },
        {
          id: 'index_message',
          name: 'Index for Search',
          service: 'search',
          action: 'index_message',
          parameters: { messageId: '' },
          timeout: 5000,
          retries: 3
        },
        {
          id: 'track_analytics',
          name: 'Track Message Event',
          service: 'analytics',
          action: 'track_event',
          parameters: { eventType: 'message_created', messageId: '' },
          timeout: 3000,
          retries: 3
        },
        {
          id: 'analyze_sentiment',
          name: 'Sentiment Analysis',
          service: 'ai',
          action: 'analyze_sentiment',
          parameters: { content: '', messageId: '' },
          timeout: 5000,
          retries: 2
        }
      ]
    });

    // File upload workflow
    this.registerWorkflowDefinition({
      id: 'file_upload',
      name: 'File Upload Workflow',
      description: 'Upload and process file',
      type: 'file_upload',
      steps: [
        {
          id: 'upload_file',
          name: 'Upload to Storage',
          service: 'media',
          action: 'upload',
          parameters: { fileId: '', roomId: '' },
          timeout: 30000,
          retries: 2,
          compensate: {
            service: 'media',
            action: 'delete_file',
            parameters: { fileId: '' }
          }
        },
        {
          id: 'process_media',
          name: 'Process Media',
          service: 'media',
          action: 'process',
          parameters: { fileId: '' },
          timeout: 60000,
          retries: 1
        },
        {
          id: 'optimize_image',
          name: 'Optimize Images',
          service: 'media',
          action: 'optimize',
          parameters: { fileId: '' },
          timeout: 30000,
          retries: 2
        },
        {
          id: 'record_message',
          name: 'Record File Message',
          service: 'messaging',
          action: 'create_file_message',
          parameters: { fileId: '', roomId: '' },
          timeout: 5000,
          retries: 2
        },
        {
          id: 'index_file',
          name: 'Index File',
          service: 'search',
          action: 'index_file',
          parameters: { fileId: '' },
          timeout: 5000,
          retries: 3
        },
        {
          id: 'track_upload',
          name: 'Track Analytics',
          service: 'analytics',
          action: 'track_event',
          parameters: { eventType: 'file_uploaded', fileId: '' },
          timeout: 3000,
          retries: 3
        }
      ]
    });

    // User deletion workflow (with data export)
    this.registerWorkflowDefinition({
      id: 'user_deletion',
      name: 'User Deletion Workflow',
      description: 'Delete user with GDPR compliance',
      type: 'user_deletion',
      steps: [
        {
          id: 'export_data',
          name: 'Export User Data',
          service: 'security',
          action: 'export_user_data',
          parameters: { userId: '' },
          timeout: 30000,
          retries: 2
        },
        {
          id: 'anonymize_messages',
          name: 'Anonymize Messages',
          service: 'messaging',
          action: 'anonymize_user_messages',
          parameters: { userId: '' },
          timeout: 30000,
          retries: 2
        },
        {
          id: 'clear_analytics',
          name: 'Clear User Analytics',
          service: 'analytics',
          action: 'clear_user_data',
          parameters: { userId: '' },
          timeout: 15000,
          retries: 3
        },
        {
          id: 'remove_from_rooms',
          name: 'Remove from Rooms',
          service: 'messaging',
          action: 'remove_from_all_rooms',
          parameters: { userId: '' },
          timeout: 10000,
          retries: 2
        },
        {
          id: 'schedule_deletion',
          name: 'Schedule Data Deletion',
          service: 'security',
          action: 'schedule_deletion',
          parameters: { userId: '', delayDays: 30 },
          timeout: 5000,
          retries: 2
        },
        {
          id: 'record_deletion',
          name: 'Record Deletion Event',
          service: 'security',
          action: 'record_audit',
          parameters: { userId: '', action: 'user_deleted' },
          timeout: 3000,
          retries: 3
        }
      ]
    });
  }

  /**
   * Register workflow definition
   */
  registerWorkflowDefinition(definition: WorkflowDefinition): void {
    this.workflowDefinitions.set(definition.id, definition);
    this.emit('orchestrator:workflow_registered', definition);
  }

  /**
   * Get workflow definition
   */
  getWorkflowDefinition(workflowId: string): WorkflowDefinition | null {
    return this.workflowDefinitions.get(workflowId) || null;
  }

  /**
   * Execute workflow
   */
  async executeWorkflow(
    workflowId: string,
    parameters: Record<string, any>
  ): Promise<string> {
    const definition = this.workflowDefinitions.get(workflowId);
    if (!definition) {
      throw new Error(`Workflow definition not found: ${workflowId}`);
    }

    const workflow: Workflow = {
      id: `wf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: definition.type,
      status: 'running',
      steps: definition.steps,
      currentStepIndex: 0,
      startedAt: Date.now(),
      results: new Map(),
      compensation: new Map()
    };

    this.workflows.set(workflow.id, workflow);
    this.emit('orchestrator:workflow_started', { workflowId: workflow.id, type: definition.type });

    try {
      // Execute steps sequentially
      for (let i = 0; i < workflow.steps.length; i++) {
        workflow.currentStepIndex = i;
        const step = workflow.steps[i];

        // Inject previous results into step parameters
        const expandedParams = this.expandParameters(step.parameters, parameters, workflow.results);

        try {
          // Publish step event to service bus
          const messageId = await serviceBus.publishEvent({
            type: `${step.service}:${step.action}` as any,
            source: 'orchestrator',
            payload: {
              stepId: step.id,
              workflowId: workflow.id,
              parameters: expandedParams
            },
            metadata: {
              correlationId: workflow.id,
              priority: 'high'
            }
          });

          // Simulate step execution (in production, would wait for actual service response)
          const result = await this.executeStep(step, expandedParams);
          workflow.results.set(step.id, result);

          this.emit('orchestrator:step_completed', {
            workflowId: workflow.id,
            stepId: step.id,
            result
          });
        } catch (error: any) {
          this.emit('orchestrator:step_failed', {
            workflowId: workflow.id,
            stepId: step.id,
            error: error.message
          });

          // Start compensation
          await this.compensateWorkflow(workflow);

          workflow.status = 'rolled_back';
          workflow.error = error.message;
          workflow.completedAt = Date.now();

          if (definition.onFailure) {
            await definition.onFailure(error.message, workflow.results);
          }

          this.emit('orchestrator:workflow_failed', {
            workflowId: workflow.id,
            error: error.message
          });

          throw error;
        }
      }

      // All steps completed successfully
      workflow.status = 'completed';
      workflow.completedAt = Date.now();

      if (definition.onSuccess) {
        await definition.onSuccess(workflow.results);
      }

      this.emit('orchestrator:workflow_completed', {
        workflowId: workflow.id,
        results: Object.fromEntries(workflow.results)
      });

      // Add to history
      this.workflowHistory.push(workflow);
      if (this.workflowHistory.length > this.maxHistorySize) {
        this.workflowHistory.shift();
      }

      return workflow.id;
    } catch (error) {
      // Ensure workflow is marked as failed
      if (workflow.status !== 'rolled_back') {
        workflow.status = 'failed';
        workflow.completedAt = Date.now();
        workflow.error = error instanceof Error ? error.message : 'Unknown error';
      }

      // Add to history
      this.workflowHistory.push(workflow);
      if (this.workflowHistory.length > this.maxHistorySize) {
        this.workflowHistory.shift();
      }

      throw error;
    }
  }

  /**
   * Execute individual step
   */
  private async executeStep(step: WorkflowStep, parameters: any): Promise<any> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= step.retries; attempt++) {
      try {
        // Simulate service call with timeout
        return await Promise.race([
          this.simulateServiceCall(step, parameters),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Step timeout: ${step.timeout}ms`)), step.timeout)
          )
        ]);
      } catch (error: any) {
        lastError = error;

        if (attempt < step.retries) {
          // Wait before retrying (exponential backoff)
          const delay = 1000 * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError || new Error('Step execution failed');
  }

  /**
   * Simulate service call
   */
  private async simulateServiceCall(step: WorkflowStep, parameters: any): Promise<any> {
    // In production, this would make actual service calls
    // For now, simulate successful response
    return {
      stepId: step.id,
      service: step.service,
      action: step.action,
      parameters,
      timestamp: Date.now(),
      success: true
    };
  }

  /**
   * Compensate workflow (rollback)
   */
  private async compensateWorkflow(workflow: Workflow): Promise<void> {
    // Execute compensation steps in reverse order
    for (let i = workflow.currentStepIndex; i >= 0; i--) {
      const step = workflow.steps[i];
      if (!step.compensate) continue;

      try {
        await serviceBus.publishEvent({
          type: `${step.compensate.service}:${step.compensate.action}` as any,
          source: 'orchestrator',
          payload: {
            stepId: step.id,
            workflowId: workflow.id,
            parameters: step.compensate.parameters
          },
          metadata: {
            correlationId: workflow.id,
            priority: 'critical'
          }
        });

        workflow.compensation.set(step.id, { status: 'compensated' });

        this.emit('orchestrator:step_compensated', {
          workflowId: workflow.id,
          stepId: step.id
        });
      } catch (error: any) {
        this.emit('orchestrator:compensation_failed', {
          workflowId: workflow.id,
          stepId: step.id,
          error: error.message
        });
      }
    }
  }

  /**
   * Expand parameters with template variables
   */
  private expandParameters(
    template: any,
    parameters: Record<string, any>,
    results: Map<string, any>
  ): any {
    if (typeof template !== 'object' || template === null) {
      return template;
    }

    const expanded: any = Array.isArray(template) ? [] : {};

    for (const [key, value] of Object.entries(template)) {
      if (typeof value === 'string' && value.startsWith('$')) {
        // Template variable reference
        const varName = value.substring(1);
        const parts = varName.split('.');

        let resolved: any = parameters[parts[0]];
        for (let i = 1; i < parts.length; i++) {
          resolved = resolved?.[parts[i]];
        }

        expanded[key] = resolved || value;
      } else if (typeof value === 'object' && value !== null) {
        expanded[key] = this.expandParameters(value, parameters, results);
      } else {
        expanded[key] = value;
      }
    }

    return expanded;
  }

  /**
   * Get workflow status
   */
  getWorkflowStatus(workflowId: string): Workflow | null {
    return this.workflows.get(workflowId) || null;
  }

  /**
   * Get workflow history
   */
  getWorkflowHistory(filters?: {
    type?: WorkflowType;
    status?: WorkflowStatus;
    since?: number;
    limit?: number;
  }): Workflow[] {
    let history = [...this.workflowHistory];

    if (filters?.type) {
      history = history.filter(w => w.type === filters.type);
    }
    if (filters?.status) {
      history = history.filter(w => w.status === filters.status);
    }
    if (filters?.since) {
      history = history.filter(w => w.startedAt >= filters.since!);
    }

    const limit = filters?.limit || 50;
    return history.slice(-limit);
  }

  /**
   * Get orchestrator metrics
   */
  getMetrics(): WorkflowMetrics {
    const completed = this.workflowHistory.filter(w => w.status === 'completed').length;
    const failed = this.workflowHistory.filter(w => w.status === 'failed' || w.status === 'rolled_back').length;

    const durations = this.workflowHistory
      .filter(w => w.completedAt)
      .map(w => (w.completedAt! - w.startedAt) / 1000);

    const averageDuration = durations.length > 0
      ? durations.reduce((a, b) => a + b, 0) / durations.length
      : 0;

    const totalSteps = this.workflowHistory.reduce((sum, w) => sum + w.steps.length, 0);
    const avgSteps = this.workflowHistory.length > 0 ? totalSteps / this.workflowHistory.length : 0;

    return {
      totalWorkflows: this.workflowHistory.length,
      completedWorkflows: completed,
      failedWorkflows: failed,
      averageDuration,
      successRate: this.workflowHistory.length > 0 ? (completed / this.workflowHistory.length) * 100 : 0,
      averageStepsPerWorkflow: avgSteps
    };
  }

  /**
   * Clear workflow history (maintenance)
   */
  clearWorkflowHistory(): void {
    this.workflowHistory = [];
    this.emit('orchestrator:history_cleared');
  }
}

// Export singleton instance
export const platformOrchestrator = new PlatformOrchestrator();
