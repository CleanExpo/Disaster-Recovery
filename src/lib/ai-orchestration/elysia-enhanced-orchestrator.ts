/**
 * ElysiaJS Enhanced AI Orchestrator
 * Integrates RAG capabilities with existing AI orchestration system
 * Reduces hallucinations and improves accuracy through structured responses
 */

import { Elysia, t } from 'elysia'
import { SimpleOrchestrator } from './simple-orchestrator'
import { 
  AIRequest, 
  AIResponse, 
  AITaskType,
  OrchestrationDecision 
} from './core/types'
import { getElysiaConfig } from '@/lib/config/elysia-config'
import { 
  AgentTaskSchema, 
  AgentResponseSchema,
  type AgentTask,
  type AgentResponse 
} from '@/lib/ai-engine/types'

const config = getElysiaConfig()

export class EnhancedOrchestrator extends SimpleOrchestrator {
  private ragEnabled: boolean = true
  private hallucinationThreshold: number = 0.7
  
  constructor() {
    super()
  }

  /**
   * Enhanced orchestration with RAG integration
   */
  async orchestrateWithRAG(
    prompt: string,
    options: {
      type?: AITaskType
      priority?: 'low' | 'normal' | 'high' | 'critical' | 'emergency'
      accuracyRequired?: 'standard' | 'high' | 'critical'
      context?: Record<string, any>
      useRAG?: boolean
      ragQuery?: string
      verificationLevel?: 'basic' | 'standard' | 'strict'
    } = {}
  ): Promise<AIResponse & { ragEnhanced?: boolean; hallucinationRisk?: string }> {
    const startTime = Date.now()
    
    try {
      let enhancedPrompt = prompt
      let ragContext = null
      let hallucinationRisk = 'medium'
      
      // Apply RAG enhancement if enabled
      if (options.useRAG !== false && this.ragEnabled) {
        const ragResult = await this.queryRAGSystem(options.ragQuery || prompt)
        
        if (ragResult && ragResult.confidence > this.hallucinationThreshold) {
          // Enhance prompt with RAG context
          enhancedPrompt = this.buildRAGEnhancedPrompt(prompt, ragResult)
          ragContext = ragResult
          hallucinationRisk = ragResult.hallucinationRisk
        }
      }
      
      // Apply verification level adjustments
      const verificationPrompt = this.applyVerificationLevel(
        enhancedPrompt, 
        options.verificationLevel || 'standard'
      )
      
      // Execute enhanced orchestration
      const response = await this.orchestrate(verificationPrompt, {
        ...options,
        context: {
          ...options.context,
          ragEnhanced: !!ragContext,
          ragSources: ragContext?.sources,
          hallucinationRisk
        }
      })
      
      // Post-process response for quality
      const qualityScore = this.assessResponseQuality(response, ragContext)
      
      return {
        ...response,
        ragEnhanced: !!ragContext,
        hallucinationRisk,
        metadata: {
          ...response.metadata,
          ragConfidence: ragContext?.confidence,
          qualityScore,
          verificationLevel: options.verificationLevel || 'standard',
          processingTime: Date.now() - startTime
        }
      }
      
    } catch (error) {
      console.error('Enhanced orchestration failed:', error)
      
      // Fallback to standard orchestration
      const fallbackResponse = await this.orchestrate(prompt, options)
      
      return {
        ...fallbackResponse,
        ragEnhanced: false,
        hallucinationRisk: 'high',
        metadata: {
          ...fallbackResponse.metadata,
          fallbackUsed: true,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    }
  }

  /**
   * Query the RAG system for enhanced context
   */
  private async queryRAGSystem(query: string): Promise<any> {
    try {
      // This would make an internal request to the RAG system
      // For now, we'll simulate the RAG response
      const response = await fetch('/api/ai-engine/rag/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          options: {
            maxResults: 3,
            includeMetadata: true,
            useCache: true
          }
        })
      })
      
      if (!response.ok) {
        console.warn('RAG system unavailable, proceeding without enhancement')
        return null
      }
      
      const result = await response.json()
      return result.data
      
    } catch (error) {
      console.warn('RAG query failed:', error)
      return null
    }
  }

  /**
   * Build RAG-enhanced prompt with source attribution
   */
  private buildRAGEnhancedPrompt(originalPrompt: string, ragResult: any): string {
    const sources = ragResult.sources.map((source: any, index: number) => 
      `Source ${index + 1}: ${source.metadata.title}\n${source.content}`
    ).join('\n\n')
    
    return `
CONTEXT INFORMATION:
Based on the following verified sources, provide an accurate response. If the sources don't contain enough information to fully answer the question, clearly state what information is missing.

${sources}

QUERY: ${originalPrompt}

INSTRUCTIONS:
- Base your response primarily on the provided context
- Clearly indicate if you're drawing from sources vs. general knowledge
- If conflicting information exists, mention the conflict
- Provide source attribution where relevant
- If the context is insufficient, state this clearly rather than guessing
    `.trim()
  }

  /**
   * Apply verification level to prompt
   */
  private applyVerificationLevel(prompt: string, level: 'basic' | 'standard' | 'strict'): string {
    const verificationInstructions = {
      basic: 'Provide a clear, direct response.',
      standard: 'Provide a response with source attribution. Indicate confidence level.',
      strict: 'Provide a highly verified response. Include confidence scores, source quality assessment, and explicit uncertainty statements where applicable. Flag any potential inaccuracies.'
    }
    
    return `${prompt}\n\nVERIFICATION LEVEL: ${level.toUpperCase()}\n${verificationInstructions[level]}`
  }

  /**
   * Assess response quality based on RAG context
   */
  private assessResponseQuality(response: AIResponse, ragContext: any): number {
    let qualityScore = 0.5 // Base score
    
    // Factor in response length and structure
    if (response.response.length > 50) qualityScore += 0.1
    if (response.response.includes('Source:') || response.response.includes('According to')) qualityScore += 0.1
    
    // Factor in RAG confidence if available
    if (ragContext) {
      qualityScore += (ragContext.confidence * 0.3)
    }
    
    // Factor in model confidence
    if (response.confidence > 0.8) qualityScore += 0.1
    
    return Math.min(qualityScore, 1.0)
  }

  /**
   * Emergency response orchestration with strict verification
   */
  async orchestrateEmergencyResponse(
    situation: string,
    context: Record<string, any> = {}
  ): Promise<AIResponse & { emergencyProtocol?: any }> {
    return await this.orchestrateWithRAG(
      `EMERGENCY SITUATION: ${situation}\n\nProvide immediate action steps, safety protocols, and resource requirements.`,
      {
        type: AITaskType.CRITICAL_ANALYSIS,
        priority: 'emergency',
        accuracyRequired: 'critical',
        useRAG: true,
        verificationLevel: 'strict',
        context: {
          ...context,
          isEmergency: true,
          requiresProtocol: true
        }
      }
    )
  }
}

// ElysiaJS Plugin for Enhanced Orchestration
export const ElysiaOrchestrationProvider = new Elysia({ name: 'enhanced-orchestration' })
  .state('orchestrator', new EnhancedOrchestrator())
  .derive({ as: 'global' }, ({ store }) => ({
    orchestrationService: {
      async orchestrate(prompt: string, options: any = {}) {
        return await store.orchestrator.orchestrateWithRAG(prompt, options)
      },
      
      async emergencyOrchestrate(situation: string, context: any = {}) {
        return await store.orchestrator.orchestrateEmergencyResponse(situation, context)
      },
      
      async healthCheck() {
        return {
          status: 'healthy',
          service: 'enhanced-orchestration',
          ragEnabled: true,
          timestamp: new Date()
        }
      }
    }
  }))
  // Enhanced orchestration endpoint
  .post('/orchestrate', async ({ body, orchestrationService }) => {
    try {
      const result = await orchestrationService.orchestrate(body.prompt, body.options)
      
      return {
        success: true,
        data: result,
        metadata: {
          requestId: `orch_${Date.now()}`,
          timestamp: new Date(),
          enhanced: true
        }
      }
    } catch (error) {
      return {
        success: false,
        error: {
          error: 'ORCHESTRATION_FAILED',
          message: error instanceof Error ? error.message : 'Unknown error',
          code: 'ORCH_500',
          timestamp: new Date()
        }
      }
    }
  }, {
    body: t.Object({
      prompt: t.String({ minLength: 1 }),
      options: t.Optional(t.Object({
        type: t.Optional(t.String()),
        priority: t.Optional(t.Union([
          t.Literal('low'),
          t.Literal('normal'),
          t.Literal('high'),
          t.Literal('critical'),
          t.Literal('emergency')
        ])),
        accuracyRequired: t.Optional(t.Union([
          t.Literal('standard'),
          t.Literal('high'),
          t.Literal('critical')
        ])),
        useRAG: t.Optional(t.Boolean()),
        verificationLevel: t.Optional(t.Union([
          t.Literal('basic'),
          t.Literal('standard'),
          t.Literal('strict')
        ])),
        context: t.Optional(t.Object({}, { additionalProperties: true }))
      }))
    }),
    detail: {
      tags: ['Orchestration'],
      summary: 'Enhanced AI orchestration',
      description: 'Execute AI tasks with RAG enhancement and reduced hallucination risk'
    }
  })
  // Emergency orchestration endpoint
  .post('/emergency', async ({ body, orchestrationService }) => {
    try {
      const result = await orchestrationService.emergencyOrchestrate(
        body.situation,
        body.context
      )
      
      return {
        success: true,
        data: result,
        metadata: {
          requestId: `emrg_${Date.now()}`,
          timestamp: new Date(),
          emergencyLevel: 'high',
          enhanced: true
        }
      }
    } catch (error) {
      return {
        success: false,
        error: {
          error: 'EMERGENCY_ORCHESTRATION_FAILED',
          message: error instanceof Error ? error.message : 'Unknown error',
          code: 'EMRG_500',
          timestamp: new Date()
        }
      }
    }
  }, {
    body: t.Object({
      situation: t.String({ minLength: 10 }),
      context: t.Optional(t.Object({}, { additionalProperties: true }))
    }),
    detail: {
      tags: ['Orchestration'],
      summary: 'Emergency response orchestration',
      description: 'Handle emergency situations with strict verification and protocol adherence'
    }
  })
  // Health check
  .get('/health', async ({ orchestrationService }) => {
    return await orchestrationService.healthCheck()
  }, {
    detail: {
      tags: ['Orchestration'],
      summary: 'Orchestration health check',
      description: 'Check the health and status of the enhanced orchestration system'
    }
  })

// Macro for easy AI task integration
export const aiTaskMacro = {
  aiTask: (config: { 
    type: string
    priority: string
    useRAG?: boolean
    verificationLevel?: 'basic' | 'standard' | 'strict'
  }) => ({
    resolve: async ({ orchestrationService, body, headers }: any) => {
      const response = await orchestrationService.orchestrate(body.prompt, {
        type: config.type,
        priority: config.priority,
        useRAG: config.useRAG !== false,
        verificationLevel: config.verificationLevel || 'standard',
        context: { 
          ...body.context,
          headers: headers['user-agent'] ? { userAgent: headers['user-agent'] } : {}
        },
        accuracyRequired: body.accuracyRequired || 'standard'
      })
      
      return { aiResponse: response }
    }
  })
}