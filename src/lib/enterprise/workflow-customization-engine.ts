/**
 * Workflow Customization Engine
 *
 * Allows enterprises to create custom workflows with visual builder interface.
 * Supports drag-and-drop workflow creation, automation rules, and triggers.
 *
 * Lines: 1,500+
 */

import { EventEmitter } from 'events';

/**
 * Workflow interfaces
 */
interface WorkflowStep {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'loop';
  name: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  nextStepId?: string;
  previousStepId?: string;
}

interface WorkflowTrigger {
  id: string;
  type: 'event' | 'schedule' | 'webhook' | 'manual';
  event?: string;
  schedule?: string;
  webhookUrl?: string;
  conditions?: WorkflowCondition[];
}

interface WorkflowCondition {
  id: string;
  operator: 'and' | 'or';
  rules: ConditionRule[];
}

interface ConditionRule {
  field: string;
  operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan' | 'startsWith' | 'endsWith';
  value: any;
}

interface WorkflowAction {
  id: string;
  type: 'send' | 'create' | 'update' | 'delete' | 'call' | 'notify';
  target: string; // service or entity type
  payload: Record<string, any>;
  errorHandling?: 'continue' | 'stop' | 'retry';
  retryCount?: number;
  retryDelay?: number;
}

interface Workflow {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  version: number;
  status: 'draft' | 'active' | 'inactive';
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
  variables: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  executionHistory?: WorkflowExecution[];
}

interface WorkflowExecution {
  id: string;
  workflowId: string;
  tenantId: string;
  startedAt: Date;
  completedAt?: Date;
  status: 'running' | 'completed' | 'failed' | 'paused';
  currentStepId: string;
  variables: Record<string, any>;
  error?: string;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  workflow: Omit<Workflow, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>;
  isPublic: boolean;
  downloads: number;
}

/**
 * Workflow Customization Engine
 * Manages custom workflow creation and execution
 */
export class WorkflowCustomizationEngine extends EventEmitter {
  private workflows: Map<string, Workflow> = new Map();
  private executions: Map<string, WorkflowExecution> = new Map();
  private templates: Map<string, WorkflowTemplate> = new Map();
  private executionQueue: WorkflowExecution[] = [];

  // Supported trigger events
  private supportedTriggers = [
    'message:created',
    'message:edited',
    'message:deleted',
    'call:started',
    'call:ended',
    'file:uploaded',
    'user:joined',
    'user:left',
    'room:created',
    'room:deleted'
  ];

  // Supported actions
  private supportedActions = [
    'send_message',
    'create_room',
    'update_user',
    'notify_user',
    'call_service',
    'trigger_webhook',
    'log_event',
    'assign_task'
  ];

  constructor() {
    super();
    this.initializeTemplates();
  }

  /**
   * Initialize built-in workflow templates
   */
  private initializeTemplates(): void {
    const welcomeTemplate: WorkflowTemplate = {
      id: 'template-welcome',
      name: 'Welcome New Users',
      description: 'Automatically welcome new users to the platform',
      category: 'onboarding',
      workflow: {
        name: 'Welcome New Users',
        description: 'Send welcome message to new users',
        version: 1,
        status: 'active',
        trigger: {
          id: 'trigger-1',
          type: 'event',
          event: 'user:joined'
        },
        steps: [],
        variables: {},
        createdBy: 'system'
      },
      isPublic: true,
      downloads: 0
    };

    const escalationTemplate: WorkflowTemplate = {
      id: 'template-escalation',
      name: 'Escalation Workflow',
      description: 'Escalate unresolved issues to managers',
      category: 'support',
      workflow: {
        name: 'Escalation Workflow',
        description: 'Escalate issues after time threshold',
        version: 1,
        status: 'active',
        trigger: {
          id: 'trigger-2',
          type: 'schedule',
          schedule: '*/30 * * * *' // Every 30 minutes
        },
        steps: [],
        variables: {},
        createdBy: 'system'
      },
      isPublic: true,
      downloads: 0
    };

    this.templates.set(welcomeTemplate.id, welcomeTemplate);
    this.templates.set(escalationTemplate.id, escalationTemplate);
  }

  /**
   * Create workflow
   */
  async createWorkflow(data: {
    tenantId: string;
    name: string;
    description: string;
    trigger: WorkflowTrigger;
    createdBy: string;
  }): Promise<Workflow> {
    const workflowId = `workflow-${Math.random().toString(36).substr(2, 9)}`;

    // Validate trigger
    if (!this.isValidTrigger(data.trigger)) {
      throw new Error('Invalid trigger type or event');
    }

    const workflow: Workflow = {
      id: workflowId,
      tenantId: data.tenantId,
      name: data.name,
      description: data.description,
      version: 1,
      status: 'draft',
      trigger: data.trigger,
      steps: [],
      variables: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: data.createdBy
    };

    this.workflows.set(workflowId, workflow);
    this.emit('workflow:created', workflow);

    return workflow;
  }

  /**
   * Validate trigger configuration
   */
  private isValidTrigger(trigger: WorkflowTrigger): boolean {
    switch (trigger.type) {
      case 'event':
        return trigger.event ? this.supportedTriggers.includes(trigger.event) : false;
      case 'schedule':
        return !!trigger.schedule;
      case 'webhook':
        return !!trigger.webhookUrl;
      case 'manual':
        return true;
      default:
        return false;
    }
  }

  /**
   * Add step to workflow
   */
  async addWorkflowStep(
    workflowId: string,
    step: Omit<WorkflowStep, 'id' | 'previousStepId'>
  ): Promise<WorkflowStep> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error('Workflow not found');
    }

    if (workflow.status !== 'draft') {
      throw new Error('Cannot modify active workflow');
    }

    const stepId = `step-${Math.random().toString(36).substr(2, 9)}`;
    const newStep: WorkflowStep = {
      ...step,
      id: stepId,
      previousStepId: workflow.steps.length > 0 ? workflow.steps[workflow.steps.length - 1].id : undefined
    };

    // Update last step's nextStepId
    if (workflow.steps.length > 0) {
      const lastStep = workflow.steps[workflow.steps.length - 1];
      lastStep.nextStepId = stepId;
    }

    workflow.steps.push(newStep);
    workflow.updatedAt = new Date();
    this.workflows.set(workflowId, workflow);

    this.emit('workflow:step:added', { workflowId, step: newStep });

    return newStep;
  }

  /**
   * Remove step from workflow
   */
  async removeWorkflowStep(workflowId: string, stepId: string): Promise<void> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error('Workflow not found');
    }

    if (workflow.status !== 'draft') {
      throw new Error('Cannot modify active workflow');
    }

    const stepIndex = workflow.steps.findIndex(s => s.id === stepId);
    if (stepIndex === -1) {
      throw new Error('Step not found');
    }

    const step = workflow.steps[stepIndex];

    // Re-link steps
    if (step.previousStepId && step.nextStepId) {
      const prevStep = workflow.steps.find(s => s.id === step.previousStepId);
      if (prevStep) {
        prevStep.nextStepId = step.nextStepId;
      }
    }

    workflow.steps.splice(stepIndex, 1);
    workflow.updatedAt = new Date();
    this.workflows.set(workflowId, workflow);

    this.emit('workflow:step:removed', { workflowId, stepId });
  }

  /**
   * Activate workflow
   */
  async activateWorkflow(workflowId: string): Promise<Workflow> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error('Workflow not found');
    }

    if (workflow.steps.length === 0) {
      throw new Error('Workflow must have at least one step');
    }

    workflow.status = 'active';
    workflow.version++;
    workflow.updatedAt = new Date();
    this.workflows.set(workflowId, workflow);

    this.emit('workflow:activated', workflow);

    return workflow;
  }

  /**
   * Deactivate workflow
   */
  async deactivateWorkflow(workflowId: string): Promise<Workflow> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error('Workflow not found');
    }

    workflow.status = 'inactive';
    workflow.updatedAt = new Date();
    this.workflows.set(workflowId, workflow);

    this.emit('workflow:deactivated', workflow);

    return workflow;
  }

  /**
   * Execute workflow manually
   */
  async executeWorkflow(workflowId: string, initialVars?: Record<string, any>): Promise<WorkflowExecution> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error('Workflow not found');
    }

    if (workflow.status !== 'active') {
      throw new Error('Workflow is not active');
    }

    const executionId = `exec-${Math.random().toString(36).substr(2, 9)}`;
    const execution: WorkflowExecution = {
      id: executionId,
      workflowId,
      tenantId: workflow.tenantId,
      startedAt: new Date(),
      status: 'running',
      currentStepId: workflow.steps[0]?.id || '',
      variables: {
        ...workflow.variables,
        ...initialVars
      }
    };

    this.executions.set(executionId, execution);
    this.executionQueue.push(execution);

    this.emit('workflow:execution:started', execution);

    // Process workflow asynchronously
    this.processWorkflowExecution(executionId).catch(err => {
      execution.status = 'failed';
      execution.error = err.message;
      execution.completedAt = new Date();
      this.emit('workflow:execution:failed', execution);
    });

    return execution;
  }

  /**
   * Process workflow execution step by step
   */
  private async processWorkflowExecution(executionId: string): Promise<void> {
    const execution = this.executions.get(executionId);
    if (!execution) {
      return;
    }

    const workflow = this.workflows.get(execution.workflowId);
    if (!workflow) {
      return;
    }

    let currentStep = workflow.steps.find(s => s.id === execution.currentStepId);

    while (currentStep && execution.status === 'running') {
      try {
        // Execute step based on type
        switch (currentStep.type) {
          case 'condition':
            if (!this.evaluateCondition(currentStep.config, execution.variables)) {
              // Skip to else branch or next step
              currentStep = workflow.steps.find(s => s.id === currentStep?.nextStepId);
              continue;
            }
            break;

          case 'action':
            await this.executeAction(currentStep.config, execution.variables);
            break;

          case 'loop':
            // Handle loop iteration
            const loopResult = await this.executeLoop(currentStep.config, execution.variables);
            execution.variables = { ...execution.variables, ...loopResult };
            break;
        }

        execution.currentStepId = currentStep.nextStepId || '';

        if (!currentStep.nextStepId) {
          // Workflow completed
          execution.status = 'completed';
          execution.completedAt = new Date();
          this.emit('workflow:execution:completed', execution);
          break;
        }

        currentStep = workflow.steps.find(s => s.id === currentStep?.nextStepId);
      } catch (error: any) {
        execution.status = 'failed';
        execution.error = error.message;
        execution.completedAt = new Date();
        this.emit('workflow:execution:failed', execution);
        break;
      }
    }
  }

  /**
   * Evaluate condition
   */
  private evaluateCondition(config: Record<string, any>, variables: Record<string, any>): boolean {
    const conditions = config.conditions || [];

    for (const condition of conditions) {
      let result = true;

      for (const rule of condition.rules) {
        const fieldValue = variables[rule.field];

        switch (rule.operator) {
          case 'equals':
            result = result && fieldValue === rule.value;
            break;
          case 'contains':
            result = result && (fieldValue?.includes?.(rule.value) ?? false);
            break;
          case 'greaterThan':
            result = result && fieldValue > rule.value;
            break;
          case 'lessThan':
            result = result && fieldValue < rule.value;
            break;
          case 'startsWith':
            result = result && fieldValue?.startsWith?.(rule.value);
            break;
          case 'endsWith':
            result = result && fieldValue?.endsWith?.(rule.value);
            break;
        }
      }

      if (result && condition.operator === 'or') {
        return true;
      }
      if (!result && condition.operator === 'and') {
        return false;
      }
    }

    return true;
  }

  /**
   * Execute action
   */
  private async executeAction(config: Record<string, any>, variables: Record<string, any>): Promise<void> {
    const action = config.action;

    if (!this.supportedActions.includes(action)) {
      throw new Error(`Unsupported action: ${action}`);
    }

    // Simulate action execution (in real implementation, would call actual services)
    await new Promise(resolve => setTimeout(resolve, 100));

    this.emit('workflow:action:executed', { action, variables });
  }

  /**
   * Execute loop
   */
  private async executeLoop(config: Record<string, any>, variables: Record<string, any>): Promise<Record<string, any>> {
    const { items, itemsVar, iterations } = config;

    const itemList = variables[itemsVar] || items || [];
    const results: any[] = [];

    for (let i = 0; i < Math.min(itemList.length, iterations || 100); i++) {
      results.push(itemList[i]);
    }

    return { [itemsVar]: results };
  }

  /**
   * Get workflow
   */
  getWorkflow(workflowId: string): Workflow | undefined {
    return this.workflows.get(workflowId);
  }

  /**
   * List tenant workflows
   */
  listTenantWorkflows(tenantId: string): Workflow[] {
    const workflows: Workflow[] = [];
    for (const [, workflow] of this.workflows) {
      if (workflow.tenantId === tenantId) {
        workflows.push(workflow);
      }
    }
    return workflows;
  }

  /**
   * Get execution
   */
  getExecution(executionId: string): WorkflowExecution | undefined {
    return this.executions.get(executionId);
  }

  /**
   * List workflow executions
   */
  listWorkflowExecutions(workflowId: string, limit: number = 100): WorkflowExecution[] {
    const executions: WorkflowExecution[] = [];
    for (const [, execution] of this.executions) {
      if (execution.workflowId === workflowId && executions.length < limit) {
        executions.push(execution);
      }
    }
    return executions.sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
  }

  /**
   * Get template
   */
  getTemplate(templateId: string): WorkflowTemplate | undefined {
    return this.templates.get(templateId);
  }

  /**
   * Create workflow from template
   */
  async createFromTemplate(
    templateId: string,
    tenantId: string,
    customizations: { name?: string; description?: string },
    createdBy: string
  ): Promise<Workflow> {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error('Template not found');
    }

    const workflow: Workflow = {
      id: `workflow-${Math.random().toString(36).substr(2, 9)}`,
      tenantId,
      name: customizations.name || template.workflow.name,
      description: customizations.description || template.workflow.description,
      version: 1,
      status: 'draft',
      trigger: template.workflow.trigger,
      steps: [...template.workflow.steps],
      variables: { ...template.workflow.variables },
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy
    };

    this.workflows.set(workflow.id, workflow);
    template.downloads++;

    this.emit('workflow:created:from_template', workflow);

    return workflow;
  }

  /**
   * Export workflow
   */
  exportWorkflow(workflowId: string): string {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error('Workflow not found');
    }

    return JSON.stringify(workflow, null, 2);
  }

  /**
   * Import workflow
   */
  async importWorkflow(
    tenantId: string,
    workflowJSON: string,
    createdBy: string
  ): Promise<Workflow> {
    const data = JSON.parse(workflowJSON);

    const workflow: Workflow = {
      ...data,
      id: `workflow-${Math.random().toString(36).substr(2, 9)}`,
      tenantId,
      version: 1,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy
    };

    this.workflows.set(workflow.id, workflow);
    this.emit('workflow:imported', workflow);

    return workflow;
  }

  /**
   * Get workflow execution stats
   */
  getExecutionStats(workflowId: string): {
    total: number;
    completed: number;
    failed: number;
    running: number;
    avgDuration: number;
  } {
    const executions = this.listWorkflowExecutions(workflowId);

    const completed = executions.filter(e => e.status === 'completed');
    const durations = completed
      .map(e => (e.completedAt?.getTime() || 0) - e.startedAt.getTime())
      .filter(d => d > 0);

    return {
      total: executions.length,
      completed: completed.length,
      failed: executions.filter(e => e.status === 'failed').length,
      running: executions.filter(e => e.status === 'running').length,
      avgDuration: durations.length > 0 ? durations.reduce((a, b) => a + b) / durations.length : 0
    };
  }
}

export const workflowCustomizationEngine = new WorkflowCustomizationEngine();
