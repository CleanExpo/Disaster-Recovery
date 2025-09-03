/**
 * Agent Orchestration Hierarchy
 * Master -> Primary -> Sub-agents
 */

export interface AgentContext {
  sessionId: string;
  urgency: 'emergency' | 'urgent' | 'normal';
  conversationHistory: any[];
  metadata?: any;
}

export interface AgentResult {
  success: boolean;
  confidence: number;
  data?: any;
  error?: string;
  nextAgent?: string;
}

export class MasterOrchestrator {
  private primaryAgents: Map<string, PrimaryAgent> = new Map();
  
  constructor() {
    // Initialize primary agents
    this.primaryAgents.set('client', new ClientPrimaryAgent());
    this.primaryAgents.set('contractor', new ContractorPrimaryAgent());
  }
  
  async processClientRequest(
    message: string,
    context: AgentContext
  ): Promise<AgentResult> {
    const clientAgent = this.primaryAgents.get('client');
    return clientAgent!.process(message, context);
  }
  
  async processContractorRequest(
    action: string,
    data: any,
    context: AgentContext
  ): Promise<AgentResult> {
    const contractorAgent = this.primaryAgents.get('contractor');
    return contractorAgent!.processAction(action, data, context);
  }
}

abstract class PrimaryAgent {
  protected subAgents: Map<string, SubAgent> = new Map();
  
  abstract process(input: any, context: AgentContext): Promise<AgentResult>;
  
  protected async routeToSubAgent(
    agentName: string,
    input: any,
    context: AgentContext
  ): Promise<AgentResult> {
    const subAgent = this.subAgents.get(agentName);
    if (!subAgent) {
      return {
        success: false,
        confidence: 0,
        error: `Sub-agent ${agentName} not found`
      };
    }
    
    return subAgent.execute(input, context);
  }
}

class ClientPrimaryAgent extends PrimaryAgent {
  constructor() {
    super();
    this.subAgents.set('emergency', new EmergencySubAgent());
    this.subAgents.set('insurance', new InsuranceSubAgent());
    this.subAgents.set('service', new ServiceInquirySubAgent());
  }
  
  async process(message: string, context: AgentContext): Promise<AgentResult> {
    // Determine intent
    const intent = await this.determineIntent(message);
    
    // Route to appropriate sub-agent
    switch (intent) {
      case 'emergency':
        return this.routeToSubAgent('emergency', message, context);
      case 'insurance':
        return this.routeToSubAgent('insurance', message, context);
      case 'service':
        return this.routeToSubAgent('service', message, context);
      default:
        return {
          success: true,
          confidence: 0.8,
          data: {
            response: 'I can help you with emergency response, insurance claims, and finding contractors. Please provide more details about what you need.'
          }
        };
    }
  }
  
  private async determineIntent(message: string): Promise<string> {
    const lower = message.toLowerCase();
    
    if (lower.includes('emergency') || lower.includes('urgent') || lower.includes('flood') || lower.includes('fire')) {
      return 'emergency';
    }
    
    if (lower.includes('insurance') || lower.includes('claim') || lower.includes('policy')) {
      return 'insurance';
    }
    
    if (lower.includes('contractor') || lower.includes('service') || lower.includes('quote')) {
      return 'service';
    }
    
    return 'general';
  }
  
  processAction(action: string, data: any, context: AgentContext): Promise<AgentResult> {
    throw new Error('Method not implemented.');
  }
}

class ContractorPrimaryAgent extends PrimaryAgent {
  constructor() {
    super();
    this.subAgents.set('job', new JobManagementSubAgent());
    this.subAgents.set('schedule', new SchedulingSubAgent());
    this.subAgents.set('compliance', new ComplianceSubAgent());
  }
  
  async process(input: any, context: AgentContext): Promise<AgentResult> {
    return this.processAction('process', input, context);
  }
  
  async processAction(action: string, data: any, context: AgentContext): Promise<AgentResult> {
    switch (action) {
      case 'accept_job':
      case 'update_job':
        return this.routeToSubAgent('job', data, context);
      case 'update_schedule':
        return this.routeToSubAgent('schedule', data, context);
      case 'verify_compliance':
        return this.routeToSubAgent('compliance', data, context);
      default:
        return {
          success: false,
          confidence: 0,
          error: `Unknown action: ${action}`
        };
    }
  }
}

// Sub-agents
abstract class SubAgent {
  abstract execute(input: any, context: AgentContext): Promise<AgentResult>;
}

class EmergencySubAgent extends SubAgent {
  async execute(input: any, context: AgentContext): Promise<AgentResult> {
    return {
      success: true,
      confidence: 0.95,
      data: {
        response: 'Emergency response initiated. Contractors are being notified.',
        priority: 'emergency'
      }
    };
  }
}

class InsuranceSubAgent extends SubAgent {
  async execute(input: any, context: AgentContext): Promise<AgentResult> {
    return {
      success: true,
      confidence: 0.9,
      data: {
        response: 'I can help you with your insurance claim. Please provide your policy number and details of the damage.',
        requiresInfo: ['policyNumber', 'damageDescription', 'photos']
      }
    };
  }
}

class ServiceInquirySubAgent extends SubAgent {
  async execute(input: any, context: AgentContext): Promise<AgentResult> {
    return {
      success: true,
      confidence: 0.85,
      data: {
        response: 'I can help you find qualified contractors in your area. What type of service do you need?',
        services: ['water_damage', 'fire_damage', 'mould_remediation']
      }
    };
  }
}

class JobManagementSubAgent extends SubAgent {
  async execute(input: any, context: AgentContext): Promise<AgentResult> {
    return {
      success: true,
      confidence: 0.92,
      data: {
        action: 'job_processed',
        jobId: input.jobId
      }
    };
  }
}

class SchedulingSubAgent extends SubAgent {
  async execute(input: any, context: AgentContext): Promise<AgentResult> {
    return {
      success: true,
      confidence: 0.88,
      data: {
        action: 'schedule_updated',
        availability: input.availability
      }
    };
  }
}

class ComplianceSubAgent extends SubAgent {
  async execute(input: any, context: AgentContext): Promise<AgentResult> {
    return {
      success: true,
      confidence: 0.95,
      data: {
        compliant: true,
        verifications: ['insurance', 'certifications', 'background_check']
      }
    };
  }
}