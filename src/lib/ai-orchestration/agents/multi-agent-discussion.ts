/**
 * Multi-Agent Discussion Framework
 * Enables collaborative problem-solving between multiple AI agents
 */

import {
  Discussion,
  DiscussionRound,
  Agent,
  AgentResponse,
  AgentPersona,
  OrchestrationError,
  AgentResponseEvent
} from '../core/types';
import { AIService } from '@/lib/ai-service';
import { AIProvider, AIMessage, AITaskContext, AITaskType } from '@/types/ai-service';
import { logger } from '@/lib/logger';
import { EventEmitter } from 'events';

export class MultiAgentDiscussionEngine extends EventEmitter {
  private aiService: AIService;
  private agentRegistry: Map<AgentPersona, Agent> = new Map();
  private activeDiscussions: Map<string, Discussion> = new Map();
  private discussionCache: Map<string, Discussion> = new Map();

  constructor(aiService: AIService) {
    super();
    this.aiService = aiService;
    this.initializeAgents();
  }

  /**
   * Initialize the agent registry with predefined agents
   */
  private initializeAgents(): void {
    const agents: Agent[] = [
      {
        id: 'lead-architect-001',
        persona: AgentPersona.LEAD_ARCHITECT,
        provider: AIProvider.OPENROUTER_GPT_OSS_120B,
        model: 'gpt-oss-120b',
        systemPrompt: this.getSystemPromptForPersona(AgentPersona.LEAD_ARCHITECT),
        specializations: ['strategic-planning', 'system-architecture', 'coordination'],
        preferredTaskTypes: ['complex-analysis', 'multi-stakeholder', 'strategic-planning'],
        trustScore: 0.95,
        responseHistory: [],
        currentLoad: 0,
        maxConcurrentTasks: 3
      },
      {
        id: 'technical-expert-001',
        persona: AgentPersona.TECHNICAL_EXPERT,
        provider: AIProvider.OPENROUTER_GPT_OSS_120B,
        model: 'gpt-oss-120b',
        systemPrompt: this.getSystemPromptForPersona(AgentPersona.TECHNICAL_EXPERT),
        specializations: ['damage-assessment', 'structural-analysis', 'technical-specifications'],
        preferredTaskTypes: ['damage-assessment', 'safety-analysis', 'technical-review'],
        trustScore: 0.93,
        responseHistory: [],
        currentLoad: 0,
        maxConcurrentTasks: 2
      },
      {
        id: 'safety-inspector-001',
        persona: AgentPersona.SAFETY_INSPECTOR,
        provider: AIProvider.OPENROUTER_GPT_OSS_120B,
        model: 'gpt-oss-120b',
        systemPrompt: this.getSystemPromptForPersona(AgentPersona.SAFETY_INSPECTOR),
        specializations: ['safety-protocols', 'compliance', 'risk-assessment'],
        preferredTaskTypes: ['safety-analysis', 'compliance-review', 'risk-assessment'],
        trustScore: 0.97,
        responseHistory: [],
        currentLoad: 0,
        maxConcurrentTasks: 2
      },
      {
        id: 'cost-analyst-001',
        persona: AgentPersona.COST_ANALYST,
        provider: AIProvider.OPENROUTER_GPT_OSS_120B,
        model: 'gpt-oss-120b',
        systemPrompt: this.getSystemPromptForPersona(AgentPersona.COST_ANALYST),
        specializations: ['cost-estimation', 'resource-planning', 'budget-optimization'],
        preferredTaskTypes: ['cost-analysis', 'resource-planning', 'budget-estimation'],
        trustScore: 0.91,
        responseHistory: [],
        currentLoad: 0,
        maxConcurrentTasks: 3
      },
      {
        id: 'implementation-specialist-001',
        persona: AgentPersona.IMPLEMENTATION_SPECIALIST,
        provider: AIProvider.ANTHROPIC_CLAUDE,
        model: 'claude-3-sonnet',
        systemPrompt: this.getSystemPromptForPersona(AgentPersona.IMPLEMENTATION_SPECIALIST),
        specializations: ['implementation-planning', 'execution-strategy', 'project-management'],
        preferredTaskTypes: ['implementation', 'project-planning', 'execution'],
        trustScore: 0.89,
        responseHistory: [],
        currentLoad: 0,
        maxConcurrentTasks: 4
      },
      {
        id: 'emergency-coordinator-001',
        persona: AgentPersona.EMERGENCY_COORDINATOR,
        provider: AIProvider.ANTHROPIC_CLAUDE, // Use Claude for speed in emergencies
        model: 'claude-3-haiku',
        systemPrompt: this.getSystemPromptForPersona(AgentPersona.EMERGENCY_COORDINATOR),
        specializations: ['emergency-response', 'rapid-coordination', 'crisis-management'],
        preferredTaskTypes: ['emergency-routing', 'crisis-response', 'urgent-coordination'],
        trustScore: 0.88,
        responseHistory: [],
        currentLoad: 0,
        maxConcurrentTasks: 5
      },
      {
        id: 'quality-auditor-001',
        persona: AgentPersona.QUALITY_AUDITOR,
        provider: AIProvider.OPENROUTER_GPT_OSS_120B,
        model: 'gpt-oss-120b',
        systemPrompt: this.getSystemPromptForPersona(AgentPersona.QUALITY_AUDITOR),
        specializations: ['quality-assurance', 'final-review', 'accuracy-verification'],
        preferredTaskTypes: ['quality-review', 'final-audit', 'accuracy-check'],
        trustScore: 0.98,
        responseHistory: [],
        currentLoad: 0,
        maxConcurrentTasks: 2
      }
    ];

    agents.forEach(agent => {
      this.agentRegistry.set(agent.persona, agent);
    });

    logger.info('Initialized agent registry', { 
      agentCount: agents.length,
      personas: agents.map(a => a.persona)
    });
  }

  /**
   * Start a multi-agent discussion
   */
  async startDiscussion(
    topic: string,
    context: AITaskContext,
    options?: {
      participants?: AgentPersona[];
      moderator?: AgentPersona;
      maxRounds?: number;
      consensusThreshold?: number;
      enableDebate?: boolean;
    }
  ): Promise<Discussion> {
    const discussionId = this.generateDiscussionId();
    const participants = this.selectParticipants(context, options?.participants);
    const moderator = options?.moderator || this.selectModerator(participants);
    
    const discussion: Discussion = {
      id: discussionId,
      topic,
      context,
      participants: participants.map(persona => this.agentRegistry.get(persona)!).filter(Boolean),
      moderator,
      rounds: [],
      currentRound: 0,
      status: 'initializing',
      consensusThreshold: options?.consensusThreshold || 0.8,
      maxRounds: options?.maxRounds || 5,
      startTime: new Date(),
      confidenceLevel: 0
    };

    this.activeDiscussions.set(discussionId, discussion);

    logger.info('Started multi-agent discussion', {
      discussionId,
      topic: topic.substring(0, 100),
      participantCount: discussion.participants.length,
      moderator
    });

    try {
      discussion.status = 'discussing';
      await this.conductDiscussion(discussion, options?.enableDebate || false);
      
      discussion.status = 'completed';
      discussion.endTime = new Date();
      
      // Cache successful discussions
      this.discussionCache.set(discussionId, discussion);
      
      return discussion;
      
    } catch (error) {
      discussion.status = 'deadlocked';
      discussion.endTime = new Date();
      
      logger.error('Multi-agent discussion failed', {
        discussionId,
        error: error instanceof Error ? error.message : 'Unknown error',
        roundsCompleted: discussion.rounds.length
      });
      
      throw error;
    } finally {
      this.activeDiscussions.delete(discussionId);
    }
  }

  /**
   * Conduct the multi-agent discussion
   */
  private async conductDiscussion(discussion: Discussion, enableDebate: boolean): Promise<void> {
    let convergenceScore = 0;
    let roundsWithoutProgress = 0;
    
    for (let roundNumber = 1; roundNumber <= discussion.maxRounds; roundNumber++) {
      discussion.currentRound = roundNumber;
      
      const roundPrompt = this.buildRoundPrompt(discussion, roundNumber, enableDebate);
      
      logger.debug('Starting discussion round', {
        discussionId: discussion.id,
        roundNumber,
        participantCount: discussion.participants.length
      });
      
      const round = await this.conductDiscussionRound(
        discussion,
        roundNumber,
        roundPrompt
      );
      
      discussion.rounds.push(round);
      convergenceScore = round.convergenceScore;
      
      // Check for consensus
      if (convergenceScore >= discussion.consensusThreshold) {
        discussion.finalDecision = await this.synthesizeConsensus(discussion);
        discussion.confidenceLevel = convergenceScore;
        
        logger.info('Discussion reached consensus', {
          discussionId: discussion.id,
          roundsUsed: roundNumber,
          convergenceScore
        });
        break;
      }
      
      // Check for progress
      if (roundNumber > 1) {
        const previousScore = discussion.rounds[roundNumber - 2]?.convergenceScore || 0;
        if (convergenceScore - previousScore < 0.1) {
          roundsWithoutProgress++;
        } else {
          roundsWithoutProgress = 0;
        }
      }
      
      // Break if no progress for 2 rounds
      if (roundsWithoutProgress >= 2) {
        logger.warn('Discussion stalled, attempting to break deadlock', {
          discussionId: discussion.id,
          roundNumber
        });
        
        const breakthrough = await this.attemptBreakthrough(discussion);
        if (!breakthrough) {
          throw new OrchestrationError(
            'Discussion reached deadlock',
            'DISCUSSION_DEADLOCKED',
            { discussionId: discussion.id, finalScore: convergenceScore },
            false
          );
        }
      }
    }
    
    // If no consensus reached within max rounds, synthesize best effort
    if (!discussion.finalDecision) {
      discussion.finalDecision = await this.synthesizeBestEffort(discussion);
      discussion.confidenceLevel = convergenceScore;
      discussion.status = 'converging';
    }
  }

  /**
   * Conduct a single discussion round
   */
  private async conductDiscussionRound(
    discussion: Discussion,
    roundNumber: number,
    prompt: string
  ): Promise<DiscussionRound> {
    const responses: AgentResponse[] = [];
    const roundStartTime = Date.now();
    
    // Get responses from all participants
    const responsePromises = discussion.participants.map(agent =>
      this.getAgentResponse(agent, prompt, discussion.context, roundNumber)
    );
    
    try {
      const agentResponses = await Promise.all(responsePromises);
      responses.push(...agentResponses);
      
      // Emit events for each response
      agentResponses.forEach(response => {
        this.emitAgentResponseEvent(discussion, response, roundNumber);
      });
      
    } catch (error) {
      logger.error('Failed to get all agent responses', {
        discussionId: discussion.id,
        roundNumber,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      
      // Continue with partial responses if we have at least 2
      if (responses.length < 2) {
        throw error;
      }
    }
    
    // Analyze responses for convergence
    const convergenceScore = this.calculateConvergence(responses);
    const newInsights = this.extractNewInsights(responses, discussion.rounds);
    const unresolvedQuestions = this.extractUnresolvedQuestions(responses);
    
    const round: DiscussionRound = {
      roundNumber,
      prompt,
      responses,
      summary: this.generateRoundSummary(responses),
      convergenceScore,
      newInsights,
      unresolvedQuestions,
      timestamp: new Date()
    };
    
    logger.debug('Completed discussion round', {
      discussionId: discussion.id,
      roundNumber,
      responseCount: responses.length,
      convergenceScore: convergenceScore.toFixed(3),
      processingTime: Date.now() - roundStartTime
    });
    
    return round;
  }

  /**
   * Get response from a specific agent
   */
  private async getAgentResponse(
    agent: Agent,
    prompt: string,
    context: AITaskContext,
    roundNumber: number
  ): Promise<AgentResponse> {
    const startTime = Date.now();
    
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: agent.systemPrompt
      },
      {
        role: 'user',
        content: prompt
      }
    ];
    
    try {
      const response = await this.aiService.generateResponse(messages, context, {
        preferredProvider: agent.provider
      });
      
      const parsedResponse = this.parseAgentResponse(response.content, agent.persona);
      
      const agentResponse: AgentResponse = {
        agentId: agent.id,
        content: parsedResponse.content,
        confidence: parsedResponse.confidence,
        reasoning: parsedResponse.reasoning,
        recommendations: parsedResponse.recommendations,
        disagreements: parsedResponse.disagreements,
        questionsForOtherAgents: parsedResponse.questionsForOtherAgents,
        timestamp: new Date(),
        processingTime: Date.now() - startTime
      };
      
      // Update agent's response history
      agent.responseHistory.push(agentResponse);
      if (agent.responseHistory.length > 10) {
        agent.responseHistory = agent.responseHistory.slice(-10);
      }
      
      return agentResponse;
      
    } catch (error) {
      logger.error('Agent response failed', {
        agentId: agent.id,
        persona: agent.persona,
        roundNumber,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      
      // Return a minimal response to keep discussion going
      return {
        agentId: agent.id,
        content: 'Unable to provide response due to technical issues.',
        confidence: 0.1,
        reasoning: 'Technical failure prevented analysis.',
        recommendations: [],
        timestamp: new Date(),
        processingTime: Date.now() - startTime
      };
    }
  }

  /**
   * Parse agent response content
   */
  private parseAgentResponse(content: string, persona: AgentPersona): {
    content: string;
    confidence: number;
    reasoning: string;
    recommendations: string[];
    disagreements?: string[];
    questionsForOtherAgents?: string[];
  } {
    // Extract structured sections
    const analysis = this.extractSection(content, 'ANALYSIS:') || content;
    const reasoning = this.extractSection(content, 'REASONING:') || '';
    const recommendations = this.extractSection(content, 'RECOMMENDATIONS:') || '';
    const confidence = this.extractSection(content, 'CONFIDENCE:') || '0.5';
    const disagreements = this.extractSection(content, 'DISAGREEMENTS:') || '';
    const questions = this.extractSection(content, 'QUESTIONS:') || '';
    
    return {
      content: analysis,
      confidence: this.parseConfidence(confidence),
      reasoning: reasoning || 'No specific reasoning provided',
      recommendations: this.parseList(recommendations),
      disagreements: disagreements ? this.parseList(disagreements) : undefined,
      questionsForOtherAgents: questions ? this.parseList(questions) : undefined
    };
  }

  /**
   * Build prompt for discussion round
   */
  private buildRoundPrompt(discussion: Discussion, roundNumber: number, enableDebate: boolean): string {
    const previousRoundsContext = discussion.rounds.length > 0
      ? `\n\nPrevious discussion rounds:\n${discussion.rounds.map(round =>
          `Round ${round.roundNumber} Summary: ${round.summary}\nConvergence Score: ${round.convergenceScore.toFixed(2)}\nKey Insights: ${round.newInsights.join(', ')}`
        ).join('\n\n')}`
      : '';

    const debateInstructions = enableDebate
      ? '\n\nDEBATE MODE: You are encouraged to respectfully challenge other agents\' viewpoints and present alternative perspectives. Focus on finding the strongest solution through constructive disagreement.'
      : '\n\nCOLLABORATIVE MODE: Focus on building upon others\' insights and finding common ground.';

    return `You are participating in a multi-agent discussion to solve a complex problem. This is round ${roundNumber} of up to ${discussion.maxRounds}.

**Discussion Topic:**
${discussion.topic}

**Context:**
- Task Type: ${discussion.context.type}
- Priority: ${discussion.context.priority}
- Accuracy Required: ${discussion.context.accuracyRequired}
- Emergency: ${discussion.context.userContext?.emergency ? 'Yes' : 'No'}

**Your Role:**
You are acting as ${this.getPersonaDescription(this.getAgentPersona(discussion.participants))} in this discussion.

**Other Participants:**
${discussion.participants.map(agent => `- ${this.getPersonaDescription(agent.persona)}`).join('\n')}

${previousRoundsContext}

${debateInstructions}

**Your Task for Round ${roundNumber}:**
Provide your expert analysis and recommendations. Be specific, actionable, and consider the perspectives of other agents.

**Response Format:**
ANALYSIS:
[Your detailed analysis of the problem from your expert perspective]

REASONING:
[Your reasoning process and key factors considered]

RECOMMENDATIONS:
[Specific, actionable recommendations - list format]

CONFIDENCE:
[Your confidence level from 0.0 to 1.0]

${enableDebate ? 'DISAGREEMENTS:\n[Any points where you disagree with previous responses - list format]' : ''}

QUESTIONS:
[Questions you have for other agents or areas needing clarification - list format]

Focus on your area of expertise while considering the broader context and other agents' perspectives.`;
  }

  /**
   * Calculate convergence score between agent responses
   */
  private calculateConvergence(responses: AgentResponse[]): number {
    if (responses.length < 2) return 0;
    
    // Simple text similarity approach
    let totalSimilarity = 0;
    let comparisons = 0;
    
    for (let i = 0; i < responses.length; i++) {
      for (let j = i + 1; j < responses.length; j++) {
        const similarity = this.calculateTextSimilarity(
          responses[i].content,
          responses[j].content
        );
        totalSimilarity += similarity;
        comparisons++;
      }
    }
    
    const avgSimilarity = comparisons > 0 ? totalSimilarity / comparisons : 0;
    
    // Factor in confidence levels
    const avgConfidence = responses.reduce((sum, r) => sum + r.confidence, 0) / responses.length;
    
    // Weight similarity and confidence
    return (avgSimilarity * 0.7 + avgConfidence * 0.3);
  }

  /**
   * Calculate simple text similarity
   */
  private calculateTextSimilarity(text1: string, text2: string): number {
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...words1].filter(word => words2.has(word)));
    const union = new Set([...words1, ...words2]);
    
    return union.size > 0 ? intersection.size / union.size : 0;
  }

  /**
   * Extract new insights from responses
   */
  private extractNewInsights(responses: AgentResponse[], previousRounds: DiscussionRound[]): string[] {
    const allPreviousContent = previousRounds
      .flatMap(round => round.responses.map(r => r.content))
      .join(' ')
      .toLowerCase();
    
    const insights: string[] = [];
    
    responses.forEach(response => {
      response.recommendations.forEach(rec => {
        // Check if this recommendation is genuinely new
        if (!allPreviousContent.includes(rec.toLowerCase().substring(0, 50))) {
          insights.push(`${this.getPersonaName(this.getResponsePersona(response))}: ${rec}`);
        }
      });
    });
    
    return insights.slice(0, 5); // Limit to top 5 insights
  }

  /**
   * Extract unresolved questions
   */
  private extractUnresolvedQuestions(responses: AgentResponse[]): string[] {
    return responses
      .flatMap(response => response.questionsForOtherAgents || [])
      .slice(0, 3); // Limit to top 3 questions
  }

  /**
   * Generate round summary
   */
  private generateRoundSummary(responses: AgentResponse[]): string {
    const keyPoints = responses
      .map(response => {
        const persona = this.getResponsePersona(response);
        const topRec = response.recommendations[0] || 'No specific recommendations';
        return `${this.getPersonaName(persona)}: ${topRec}`;
      })
      .join('; ');
    
    const avgConfidence = responses.reduce((sum, r) => sum + r.confidence, 0) / responses.length;
    
    return `Key perspectives: ${keyPoints}. Average confidence: ${avgConfidence.toFixed(2)}.`;
  }

  /**
   * Synthesize consensus from discussion
   */
  private async synthesizeConsensus(discussion: Discussion): Promise<string> {
    const allResponses = discussion.rounds.flatMap(round => round.responses);
    const highConfidenceResponses = allResponses.filter(r => r.confidence >= 0.7);
    
    const consensusPrompt = `Based on the following multi-agent discussion, synthesize a consensus decision:

Topic: ${discussion.topic}

High-confidence agent responses:
${highConfidenceResponses.map(response => 
  `${this.getPersonaName(this.getResponsePersona(response))}: ${response.content}\nRecommendations: ${response.recommendations.join(', ')}`
).join('\n\n')}

Convergence Score: ${discussion.rounds[discussion.rounds.length - 1]?.convergenceScore.toFixed(2)}

Please provide a comprehensive consensus decision that incorporates the best insights from all agents while resolving any conflicts.`;

    const response = await this.aiService.generateResponse([
      {
        role: 'system',
        content: 'You are an expert at synthesizing multi-agent discussions into clear, actionable consensus decisions.'
      },
      {
        role: 'user',
        content: consensusPrompt
      }
    ], discussion.context);

    return response.content;
  }

  /**
   * Synthesize best effort decision when consensus not reached
   */
  private async synthesizeBestEffort(discussion: Discussion): Promise<string> {
    const lastRound = discussion.rounds[discussion.rounds.length - 1];
    if (!lastRound) {
      throw new OrchestrationError('No discussion rounds found', 'NO_ROUNDS', { discussionId: discussion.id });
    }

    const bestEffortPrompt = `The following multi-agent discussion did not reach full consensus. Please synthesize the best possible decision based on available information:

Topic: ${discussion.topic}
Final Convergence Score: ${lastRound.convergenceScore.toFixed(2)}

Most recent agent responses:
${lastRound.responses.map(response =>
  `${this.getPersonaName(this.getResponsePersona(response))}: ${response.content}`
).join('\n\n')}

Unresolved questions: ${lastRound.unresolvedQuestions.join(', ')}

Please provide a practical decision that acknowledges the areas of uncertainty while providing actionable guidance.`;

    const response = await this.aiService.generateResponse([
      {
        role: 'system',
        content: 'You are an expert at making practical decisions under uncertainty, synthesizing partial consensus into actionable guidance.'
      },
      {
        role: 'user',
        content: bestEffortPrompt
      }
    ], discussion.context);

    return response.content;
  }

  /**
   * Attempt to break through discussion deadlock
   */
  private async attemptBreakthrough(discussion: Discussion): Promise<boolean> {
    logger.info('Attempting discussion breakthrough', { discussionId: discussion.id });
    
    // Identify the main points of disagreement
    const lastRound = discussion.rounds[discussion.rounds.length - 1];
    const disagreements = lastRound?.responses
      .flatMap(r => r.disagreements || [])
      .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
    
    if (!disagreements || disagreements.length === 0) {
      return false;
    }
    
    // Try a focused breakthrough round with devil's advocate approach
    const breakthroughPrompt = `BREAKTHROUGH ROUND: The discussion has stalled. Let's focus on resolving key disagreements:

Main disagreements:
${disagreements.map((d, i) => `${i + 1}. ${d}`).join('\n')}

Please provide:
1. A fresh perspective on the core disagreement
2. A compromise solution that addresses all viewpoints
3. Alternative approaches not yet considered

Be creative and think outside the established positions.`;

    try {
      const breakthroughRound = await this.conductDiscussionRound(
        discussion,
        discussion.rounds.length + 1,
        breakthroughPrompt
      );
      
      // Check if breakthrough improved convergence
      const previousScore = lastRound?.convergenceScore || 0;
      const improvementThreshold = 0.15;
      
      if (breakthroughRound.convergenceScore > previousScore + improvementThreshold) {
        discussion.rounds.push(breakthroughRound);
        logger.info('Breakthrough successful', {
          discussionId: discussion.id,
          improvementScore: breakthroughRound.convergenceScore - previousScore
        });
        return true;
      }
      
      return false;
      
    } catch (error) {
      logger.error('Breakthrough attempt failed', {
        discussionId: discussion.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  /**
   * Select participants for discussion based on context
   */
  private selectParticipants(context: AITaskContext, requestedParticipants?: AgentPersona[]): AgentPersona[] {
    if (requestedParticipants) {
      return requestedParticipants;
    }
    
    const participants: AgentPersona[] = [AgentPersona.LEAD_ARCHITECT]; // Always include lead architect
    
    switch (context.type) {
      case AITaskType.DAMAGE_ASSESSMENT:
        participants.push(
          AgentPersona.TECHNICAL_EXPERT,
          AgentPersona.SAFETY_INSPECTOR,
          AgentPersona.COST_ANALYST
        );
        break;
        
      case AITaskType.EMERGENCY_ROUTING:
        participants.push(
          AgentPersona.EMERGENCY_COORDINATOR,
          AgentPersona.SAFETY_INSPECTOR
        );
        break;
        
      case AITaskType.BUSINESS_ANALYTICS:
        participants.push(
          AgentPersona.COST_ANALYST,
          AgentPersona.TECHNICAL_EXPERT
        );
        break;
        
      default:
        participants.push(
          AgentPersona.TECHNICAL_EXPERT,
          AgentPersona.COST_ANALYST
        );
    }
    
    // Add quality auditor for critical accuracy requirements
    if (context.accuracyRequired === 'critical') {
      participants.push(AgentPersona.QUALITY_AUDITOR);
    }
    
    return participants.slice(0, 5); // Limit to 5 participants for manageable discussions
  }

  /**
   * Select moderator for discussion
   */
  private selectModerator(participants: AgentPersona[]): AgentPersona {
    // Lead architect is the preferred moderator
    if (participants.includes(AgentPersona.LEAD_ARCHITECT)) {
      return AgentPersona.LEAD_ARCHITECT;
    }
    
    // Fallback to first participant
    return participants[0];
  }

  /**
   * Get system prompt for agent persona
   */
  private getSystemPromptForPersona(persona: AgentPersona): string {
    const basePrompt = "You are participating in a multi-agent discussion to solve complex disaster recovery problems in Australia. ";
    
    switch (persona) {
      case AgentPersona.LEAD_ARCHITECT:
        return `${basePrompt}As the Lead Architect, you coordinate the discussion, synthesize different viewpoints, and guide the team toward comprehensive solutions. Focus on strategic oversight and ensuring all aspects are considered.`;
        
      case AgentPersona.TECHNICAL_EXPERT:
        return `${basePrompt}As a Technical Expert, you provide detailed technical analysis, structural assessments, and engineering insights. Focus on the technical feasibility and implementation details of proposed solutions.`;
        
      case AgentPersona.SAFETY_INSPECTOR:
        return `${basePrompt}As a Safety Inspector, you prioritize safety protocols, regulatory compliance, and risk mitigation. Ensure all solutions meet Australian safety standards and protect all stakeholders.`;
        
      case AgentPersona.COST_ANALYST:
        return `${basePrompt}As a Cost Analyst, you focus on financial implications, cost-effectiveness, and resource optimization. Provide realistic cost estimates and budget-conscious alternatives.`;
        
      case AgentPersona.IMPLEMENTATION_SPECIALIST:
        return `${basePrompt}As an Implementation Specialist, you focus on practical execution, project management, and turning plans into actionable steps. Consider timeline, resources, and coordination requirements.`;
        
      case AgentPersona.EMERGENCY_COORDINATOR:
        return `${basePrompt}As an Emergency Coordinator, you prioritize rapid response, crisis management, and immediate safety. Focus on urgent actions and emergency protocols.`;
        
      case AgentPersona.QUALITY_AUDITOR:
        return `${basePrompt}As a Quality Auditor, you review all proposed solutions for accuracy, completeness, and quality assurance. Challenge assumptions and ensure high standards.`;
        
      default:
        return basePrompt;
    }
  }

  /**
   * Helper methods for persona management
   */
  private getPersonaDescription(persona: AgentPersona): string {
    switch (persona) {
      case AgentPersona.LEAD_ARCHITECT: return 'Lead Architect (Strategic Planning)';
      case AgentPersona.TECHNICAL_EXPERT: return 'Technical Expert (Engineering Analysis)';
      case AgentPersona.SAFETY_INSPECTOR: return 'Safety Inspector (Compliance & Risk)';
      case AgentPersona.COST_ANALYST: return 'Cost Analyst (Financial Planning)';
      case AgentPersona.IMPLEMENTATION_SPECIALIST: return 'Implementation Specialist (Execution)';
      case AgentPersona.EMERGENCY_COORDINATOR: return 'Emergency Coordinator (Crisis Response)';
      case AgentPersona.QUALITY_AUDITOR: return 'Quality Auditor (Final Review)';
      default: return 'Unknown Agent';
    }
  }

  private getPersonaName(persona: AgentPersona): string {
    return persona.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  private getAgentPersona(participants: Agent[]): AgentPersona {
    return participants[0]?.persona || AgentPersona.LEAD_ARCHITECT;
  }

  private getResponsePersona(response: AgentResponse): AgentPersona {
    const agent = Array.from(this.agentRegistry.values())
      .find(a => a.id === response.agentId);
    return agent?.persona || AgentPersona.LEAD_ARCHITECT;
  }

  /**
   * Extract section from structured text (shared utility)
   */
  private extractSection(content: string, sectionHeader: string): string {
    const regex = new RegExp(`${sectionHeader}\\s*([\\s\\S]*?)(?=\\n[A-Z_]+:|$)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
  }

  /**
   * Parse confidence value (shared utility)
   */
  private parseConfidence(confidenceText: string): number {
    const match = confidenceText.match(/(\d*\.?\d+)/);
    if (match) {
      const value = parseFloat(match[1]);
      return value > 1 ? value / 100 : value;
    }
    return 0.5;
  }

  /**
   * Parse list items (shared utility)
   */
  private parseList(listText: string): string[] {
    if (!listText) return [];
    
    return listText
      .split('\n')
      .map(line => line.replace(/^[-*•]\s*/, '').trim())
      .filter(line => line.length > 0)
      .slice(0, 10);
  }

  /**
   * Emit agent response event for real-time updates
   */
  private emitAgentResponseEvent(discussion: Discussion, response: AgentResponse, roundNumber: number): void {
    const event: AgentResponseEvent = {
      type: 'agent-response',
      payload: {
        discussionId: discussion.id,
        response,
        roundNumber
      },
      timestamp: new Date(),
      sessionId: discussion.context.userContext?.sessionId || 'unknown'
    };

    this.emit('agent-response', event);
  }

  /**
   * Generate unique discussion ID
   */
  private generateDiscussionId(): string {
    return `discussion_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Public API methods
   */
  getActiveDiscussion(discussionId: string): Discussion | undefined {
    return this.activeDiscussions.get(discussionId);
  }

  getCachedDiscussion(discussionId: string): Discussion | undefined {
    return this.discussionCache.get(discussionId);
  }

  getActiveDiscussions(): Discussion[] {
    return Array.from(this.activeDiscussions.values());
  }

  getAgentRegistry(): Map<AgentPersona, Agent> {
    return new Map(this.agentRegistry);
  }

  clearCache(): void {
    this.discussionCache.clear();
    logger.info('Multi-agent discussion cache cleared');
  }
}