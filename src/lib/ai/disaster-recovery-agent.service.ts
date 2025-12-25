import { aiService } from './ai.service';
import { addAIJob } from '../config/queue.config';
import { logger } from '../logger';

/**
 * Disaster Recovery AI Agent
 * Domain-specific AI agent for disaster recovery operations
 */

export interface DisasterAnalysis {
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedAreas: string[];
  estimatedImpact: {
    financial: number;
    operational: number;
    reputation: number;
  };
  recommendedActions: string[];
  priorityLevel: number;
  timeframe: string;
  resources: {
    required: string[];
    available: string[];
  };
}

export interface RecoveryPlan {
  id: string;
  disasterId: string;
  phases: RecoveryPhase[];
  estimatedDuration: string;
  totalCost: number;
  risks: Risk[];
  dependencies: string[];
  createdAt: string;
}

export interface RecoveryPhase {
  id: string;
  name: string;
  description: string;
  duration: string;
  tasks: Task[];
  dependencies: string[];
  resources: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  estimatedHours: number;
}

export interface Risk {
  id: string;
  description: string;
  probability: number;
  impact: number;
  mitigation: string;
  owner?: string;
}

/**
 * Disaster Recovery AI Agent
 */
class DisasterRecoveryAgent {
  private static instance: DisasterRecoveryAgent;

  private constructor() {
    logger.info('Disaster Recovery AI Agent initialized');
  }

  public static getInstance(): DisasterRecoveryAgent {
    if (!DisasterRecoveryAgent.instance) {
      DisasterRecoveryAgent.instance = new DisasterRecoveryAgent();
    }
    return DisasterRecoveryAgent.instance;
  }

  /**
   * Analyze disaster scenario
   */
  public async analyzeDisaster(
    description: string,
    metadata?: Record<string, any>
  ): Promise<DisasterAnalysis> {
    try {
      logger.info('Analyzing disaster scenario');

      // Extract key information
      const extractionResult = await aiService.extractInformation(description);

      // Analyze sentiment and severity
      const analysisResult = await aiService.analyzeText(description);

      // Determine severity based on sentiment and extracted entities
      const severity = this.determineSeverity(analysisResult);

      // Extract affected areas from entities
      const affectedAreas = this.extractAffectedAreas(extractionResult);

      // Generate recommendations
      const recommendations = await this.generateRecommendations(description, severity);

      // Estimate impact
      const estimatedImpact = this.estimateImpact(severity, affectedAreas.length);

      const analysis: DisasterAnalysis = {
        severity,
        affectedAreas,
        estimatedImpact,
        recommendedActions: recommendations,
        priorityLevel: this.calculatePriority(severity),
        timeframe: this.estimateTimeframe(severity),
        resources: {
          required: this.identifyRequiredResources(severity),
          available: [],
        },
      };

      logger.info('Disaster analysis completed', { severity, affectedAreas: affectedAreas.length });
      return analysis;
    } catch (error) {
      logger.error('Error analyzing disaster:', error);
      throw new Error(`Disaster analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate recovery plan
   */
  public async generateRecoveryPlan(
    disasterId: string,
    analysis: DisasterAnalysis
  ): Promise<RecoveryPlan> {
    try {
      logger.info('Generating recovery plan', { disasterId });

      // Generate phases based on severity
      const phases = await this.generateRecoveryPhases(analysis);

      // Estimate total duration and cost
      const estimatedDuration = this.calculateTotalDuration(phases);
      const totalCost = this.estimateTotalCost(phases, analysis);

      // Identify risks
      const risks = this.identifyRisks(analysis);

      const plan: RecoveryPlan = {
        id: `plan-${Date.now()}`,
        disasterId,
        phases,
        estimatedDuration,
        totalCost,
        risks,
        dependencies: this.extractDependencies(phases),
        createdAt: new Date().toISOString(),
      };

      logger.info('Recovery plan generated', {
        phases: phases.length,
        estimatedDuration,
        totalCost,
      });

      return plan;
    } catch (error) {
      logger.error('Error generating recovery plan:', error);
      throw new Error(`Recovery plan generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Summarize disaster report
   */
  public async summarizeReport(report: string): Promise<string> {
    try {
      logger.info('Summarizing disaster report');
      const summary = await aiService.summarizeText(report, {
        minLength: 50,
        maxLength: 200,
      });
      return summary;
    } catch (error) {
      logger.error('Error summarizing report:', error);
      throw error;
    }
  }

  /**
   * Process disaster report asynchronously
   */
  public async processReportAsync(
    report: string,
    userId?: string,
    tenantId?: string
  ): Promise<string> {
    try {
      const job = await addAIJob(
        {
          type: 'analyze',
          input: report,
          userId,
          tenantId,
          metadata: { reportType: 'disaster' },
        },
        { priority: 1 }
      );

      logger.info('Disaster report queued for processing', { jobId: job.id });
      return job.id.toString();
    } catch (error) {
      logger.error('Error queuing disaster report:', error);
      throw error;
    }
  }

  /**
   * Helper: Determine severity
   */
  private determineSeverity(analysis: any): 'low' | 'medium' | 'high' | 'critical' {
    if (!analysis.sentiment) return 'medium';

    const sentimentScore = analysis.sentiment.score;
    const isNegative = analysis.sentiment.label === 'NEGATIVE';

    if (isNegative && sentimentScore > 0.9) return 'critical';
    if (isNegative && sentimentScore > 0.7) return 'high';
    if (isNegative && sentimentScore > 0.5) return 'medium';
    return 'low';
  }

  /**
   * Helper: Extract affected areas
   */
  private extractAffectedAreas(extraction: any): string[] {
    if (!extraction.entities) return [];

    return extraction.entities
      .filter((entity: any) => entity.type === 'LOC' || entity.type === 'ORG')
      .map((entity: any) => entity.text);
  }

  /**
   * Helper: Generate recommendations
   */
  private async generateRecommendations(
    description: string,
    severity: string
  ): Promise<string[]> {
    const baseRecommendations = [
      'Activate emergency response team',
      'Assess immediate safety risks',
      'Document all damage and incidents',
      'Contact insurance providers',
    ];

    if (severity === 'critical' || severity === 'high') {
      baseRecommendations.unshift('Evacuate affected areas immediately');
      baseRecommendations.push('Activate disaster recovery plan');
    }

    return baseRecommendations;
  }

  /**
   * Helper: Estimate impact
   */
  private estimateImpact(severity: string, affectedAreasCount: number): any {
    const multiplier = affectedAreasCount || 1;
    const severityMultipliers = {
      low: 0.25,
      medium: 0.5,
      high: 0.75,
      critical: 1,
    };

    const base = severityMultipliers[severity as keyof typeof severityMultipliers] || 0.5;

    return {
      financial: base * multiplier * 100000,
      operational: base * multiplier * 80,
      reputation: base * multiplier * 60,
    };
  }

  /**
   * Helper: Calculate priority
   */
  private calculatePriority(severity: string): number {
    const priorities = { critical: 1, high: 2, medium: 3, low: 4 };
    return priorities[severity as keyof typeof priorities] || 3;
  }

  /**
   * Helper: Estimate timeframe
   */
  private estimateTimeframe(severity: string): string {
    const timeframes = {
      critical: 'Immediate (0-24 hours)',
      high: 'Urgent (1-3 days)',
      medium: 'Standard (3-7 days)',
      low: 'Normal (7-14 days)',
    };
    return timeframes[severity as keyof typeof timeframes] || 'Standard (3-7 days)';
  }

  /**
   * Helper: Identify required resources
   */
  private identifyRequiredResources(severity: string): string[] {
    const baseResources = ['Emergency Response Team', 'Communication Equipment', 'Documentation Tools'];

    if (severity === 'critical' || severity === 'high') {
      return [
        ...baseResources,
        'Medical Support',
        'Security Personnel',
        'Heavy Equipment',
        'Emergency Supplies',
      ];
    }

    return baseResources;
  }

  /**
   * Helper: Generate recovery phases
   */
  private async generateRecoveryPhases(analysis: DisasterAnalysis): Promise<RecoveryPhase[]> {
    const phases: RecoveryPhase[] = [
      {
        id: 'phase-1',
        name: 'Immediate Response',
        description: 'Initial assessment and safety measures',
        duration: '24 hours',
        tasks: [
          {
            id: 'task-1-1',
            title: 'Safety Assessment',
            description: 'Conduct immediate safety assessment of affected areas',
            priority: 'critical',
            status: 'pending',
            estimatedHours: 4,
          },
          {
            id: 'task-1-2',
            title: 'Activate Response Team',
            description: 'Mobilize emergency response team',
            priority: 'critical',
            status: 'pending',
            estimatedHours: 2,
          },
        ],
        dependencies: [],
        resources: ['Emergency Response Team'],
      },
      {
        id: 'phase-2',
        name: 'Stabilization',
        description: 'Contain damage and prevent further losses',
        duration: '3-5 days',
        tasks: [
          {
            id: 'task-2-1',
            title: 'Damage Control',
            description: 'Implement measures to prevent additional damage',
            priority: 'high',
            status: 'pending',
            estimatedHours: 16,
          },
        ],
        dependencies: ['phase-1'],
        resources: ['Technical Team', 'Equipment'],
      },
      {
        id: 'phase-3',
        name: 'Recovery',
        description: 'Restore operations and services',
        duration: '1-2 weeks',
        tasks: [
          {
            id: 'task-3-1',
            title: 'Service Restoration',
            description: 'Restore critical services and operations',
            priority: 'high',
            status: 'pending',
            estimatedHours: 40,
          },
        ],
        dependencies: ['phase-2'],
        resources: ['Full Team', 'Specialized Equipment'],
      },
    ];

    return phases;
  }

  /**
   * Helper: Calculate total duration
   */
  private calculateTotalDuration(phases: RecoveryPhase[]): string {
    // Simple estimation based on phases
    return `${phases.length * 3}-${phases.length * 5} days`;
  }

  /**
   * Helper: Estimate total cost
   */
  private estimateTotalCost(phases: RecoveryPhase[], analysis: DisasterAnalysis): number {
    const baselineCost = 50000;
    const phaseCost = phases.reduce((total, phase) => {
      const taskHours = phase.tasks.reduce((sum, task) => sum + task.estimatedHours, 0);
      return total + taskHours * 150; // $150 per hour
    }, 0);

    return baselineCost + phaseCost + analysis.estimatedImpact.financial * 0.1;
  }

  /**
   * Helper: Identify risks
   */
  private identifyRisks(analysis: DisasterAnalysis): Risk[] {
    return [
      {
        id: 'risk-1',
        description: 'Secondary damage during recovery operations',
        probability: 0.3,
        impact: 0.5,
        mitigation: 'Implement safety protocols and continuous monitoring',
      },
      {
        id: 'risk-2',
        description: 'Resource availability constraints',
        probability: 0.4,
        impact: 0.6,
        mitigation: 'Maintain backup resource pool and vendor relationships',
      },
    ];
  }

  /**
   * Helper: Extract dependencies
   */
  private extractDependencies(phases: RecoveryPhase[]): string[] {
    return phases.map((phase) => phase.id);
  }
}

// Export singleton instance
export const disasterRecoveryAgent = DisasterRecoveryAgent.getInstance();
export const analyzeDisaster = (description: string, metadata?: Record<string, any>) =>
  disasterRecoveryAgent.analyzeDisaster(description, metadata);
export const generateRecoveryPlan = (disasterId: string, analysis: DisasterAnalysis) =>
  disasterRecoveryAgent.generateRecoveryPlan(disasterId, analysis);
export const summarizeDisasterReport = (report: string) =>
  disasterRecoveryAgent.summarizeReport(report);
export const processDisasterReportAsync = (report: string, userId?: string, tenantId?: string) =>
  disasterRecoveryAgent.processReportAsync(report, userId, tenantId);

export default DisasterRecoveryAgent;
