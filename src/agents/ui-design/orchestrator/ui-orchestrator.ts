/**
 * UI/UX Design Orchestrator Agent
 * 
 * Master orchestrator that coordinates all UI/UX design agents to deliver
 * premium 10/10 quality user interfaces. Manages agent execution order,
 * resolves conflicts, and ensures cohesive implementation of the R6 Digital
 * design system across all components.
 */

import {
  UIAgent,
  UIContext,
  UIElement,
  AgentResult,
  AnalysisResult,
  UIImprovement,
  Recommendation,
  PerformanceMetrics,
  ImpactLevel,
  EffortLevel
} from '../types/interfaces'

import { VisualAnalyzerAgent } from '../agents/visual-analyzer'
import { DesignImplementerAgent } from '../agents/design-implementer'
import { ResponsiveOptimizerAgent } from '../agents/responsive-optimizer'
import { AnimationEnhancerAgent } from '../agents/animation-enhancer'
import { DarkModeSpecialistAgent } from '../agents/dark-mode-specialist'
import { AccessibilityGuardianAgent } from '../agents/accessibility-guardian'

export interface OrchestrationConfig {
  enabledAgents: string[]
  parallelExecution: boolean
  qualityThreshold: number
  maxIterations: number
  conflictResolution: 'merge' | 'prioritize' | 'manual'
  performanceOptimization: boolean
}

export interface OrchestrationResult {
  overallScore: number
  agentResults: Map<string, AgentResult>
  consolidatedImprovements: UIImprovement[]
  prioritizedRecommendations: Recommendation[]
  qualityMetrics: QualityMetrics
  executionSummary: ExecutionSummary
  nextSteps: string[]
}

export interface QualityMetrics {
  visual: number
  responsiveness: number
  animations: number
  darkMode: number
  accessibility: number
  overall: number
  wcagCompliance: number
  performanceImpact: number
}

export interface ExecutionSummary {
  totalAgents: number
  successfulAgents: number
  failedAgents: string[]
  totalImprovements: number
  criticalImprovements: number
  executionTime: number
  resourceUsage: {
    memory: number
    cpu: number
  }
}

export class UIDesignOrchestrator {
  private agents: Map<string, UIAgent>
  private config: OrchestrationConfig
  private executionOrder: string[]

  constructor(config: Partial<OrchestrationConfig> = {}) {
    this.config = {
      enabledAgents: [
        'visual-analyzer',
        'design-implementer', 
        'responsive-optimizer',
        'animation-enhancer',
        'dark-mode-specialist',
        'accessibility-guardian'
      ],
      parallelExecution: false,
      qualityThreshold: 8.0,
      maxIterations: 3,
      conflictResolution: 'prioritize',
      performanceOptimization: true,
      ...config
    }

    this.initializeAgents()
    this.defineExecutionOrder()
  }

  private initializeAgents() {
    this.agents = new Map([
      ['visual-analyzer', new VisualAnalyzerAgent()],
      ['design-implementer', new DesignImplementerAgent()],
      ['responsive-optimizer', new ResponsiveOptimizerAgent()],
      ['animation-enhancer', new AnimationEnhancerAgent()],
      ['dark-mode-specialist', new DarkModeSpecialistAgent()],
      ['accessibility-guardian', new AccessibilityGuardianAgent()]
    ])

    // Filter agents based on config
    const enabledAgents = new Map()
    this.config.enabledAgents.forEach(agentId => {
      if (this.agents.has(agentId)) {
        enabledAgents.set(agentId, this.agents.get(agentId))
      }
    })
    this.agents = enabledAgents
  }

  private defineExecutionOrder() {
    // Define optimal execution order based on dependencies and priorities
    this.executionOrder = [
      'visual-analyzer',      // 1. Analyse current state first
      'design-implementer',   // 2. Apply design system foundations
      'responsive-optimizer', // 3. Ensure responsive design
      'dark-mode-specialist', // 4. Implement dark mode theme
      'animation-enhancer',   // 5. Add animations and micro-interactions
      'accessibility-guardian' // 6. Ensure accessibility compliance (final check)
    ].filter(agentId => this.agents.has(agentId))
  }

  /**
   * Main orchestration method that coordinates all agents
   */
  async orchestrate(context: UIContext): Promise<OrchestrationResult> {
    const startTime = Date.now()
    const agentResults = new Map<string, AgentResult>()
    
    console.log('🚀 Starting UI/UX Design Orchestration...')
    console.log(`Enabled Agents: ${Array.from(this.agents.keys()).join(', ')}`)

    try {
      // Execute agents in defined order or parallel based on config
      if (this.config.parallelExecution) {
        await this.executeAgentsParallel(context, agentResults)
      } else {
        await this.executeAgentsSequential(context, agentResults)
      }

      // Consolidate results from all agents
      const consolidatedImprovements = this.consolidateImprovements(agentResults)
      const prioritizedRecommendations = this.prioritizeRecommendations(agentResults)
      
      // Calculate quality metrics
      const qualityMetrics = this.calculateQualityMetrics(agentResults, context)
      
      // Generate execution summary
      const executionSummary = this.generateExecutionSummary(agentResults, startTime)
      
      // Determine next steps based on quality score
      const nextSteps = this.generateNextSteps(qualityMetrics, consolidatedImprovements)

      const result: OrchestrationResult = {
        overallScore: qualityMetrics.overall,
        agentResults,
        consolidatedImprovements,
        prioritizedRecommendations,
        qualityMetrics,
        executionSummary,
        nextSteps
      }

      this.logOrchestrationResults(result)
      return result

    } catch (error) {
      console.error('❌ Orchestration failed:', error)
      throw new Error(`UI/UX Design Orchestration failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private async executeAgentsSequential(context: UIContext, agentResults: Map<string, AgentResult>) {
    for (const agentId of this.executionOrder) {
      const agent = this.agents.get(agentId)
      if (!agent) continue

      console.log(`🔄 Executing ${agent.name}...`)
      
      try {
        // Update context with previous improvements
        const updatedContext = this.updateContextWithImprovements(context, agentResults)
        
        const result = await agent.execute(updatedContext)
        agentResults.set(agentId, result)
        
        if (result.success) {
          console.log(`✅ ${agent.name} completed with ${result.improvements.length} improvements`)
        } else {
          console.warn(`⚠️ ${agent.name} completed with errors:`, result.errors)
        }
      } catch (error) {
        console.error(`❌ ${agent.name} failed:`, error)
        agentResults.set(agentId, {
          agentId,
          success: false,
          improvements: [],
          warnings: [],
          errors: [error instanceof Error ? error.message : 'Unknown error'],
          metrics: context.performance,
          recommendations: [],
          timeElapsed: 0
        })
      }
    }
  }

  private async executeAgentsParallel(context: UIContext, agentResults: Map<string, AgentResult>) {
    const agentPromises = this.executionOrder.map(async (agentId) => {
      const agent = this.agents.get(agentId)
      if (!agent) return

      console.log(`🔄 Executing ${agent.name} (parallel)...`)
      
      try {
        const result = await agent.execute(context)
        agentResults.set(agentId, result)
        
        if (result.success) {
          console.log(`✅ ${agent.name} completed with ${result.improvements.length} improvements`)
        } else {
          console.warn(`⚠️ ${agent.name} completed with errors:`, result.errors)
        }
      } catch (error) {
        console.error(`❌ ${agent.name} failed:`, error)
        agentResults.set(agentId, {
          agentId,
          success: false,
          improvements: [],
          warnings: [],
          errors: [error instanceof Error ? error.message : 'Unknown error'],
          metrics: context.performance,
          recommendations: [],
          timeElapsed: 0
        })
      }
    })

    await Promise.all(agentPromises)
  }

  private updateContextWithImprovements(context: UIContext, agentResults: Map<string, AgentResult>): UIContext {
    // Create updated context incorporating improvements from previous agents
    const allImprovements = Array.from(agentResults.values())
      .flatMap(result => result.improvements)
    
    // In a real implementation, this would apply improvements to the context
    // For now, we'll return the original context
    return context
  }

  private consolidateImprovements(agentResults: Map<string, AgentResult>): UIImprovement[] {
    const allImprovements = Array.from(agentResults.values())
      .flatMap(result => result.improvements)
    
    // Remove duplicates based on improvement ID
    const uniqueImprovements = new Map<string, UIImprovement>()
    
    allImprovements.forEach(improvement => {
      if (!uniqueImprovements.has(improvement.id)) {
        uniqueImprovements.set(improvement.id, improvement)
      } else {
        // Merge improvements if they have the same ID
        const existing = uniqueImprovements.get(improvement.id)!
        uniqueImprovements.set(improvement.id, this.mergeImprovements(existing, improvement))
      }
    })

    // Sort by impact and effort
    return Array.from(uniqueImprovements.values())
      .sort((a, b) => {
        const impactOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 }
        const effortOrder = { 'minimal': 1, 'low': 2, 'medium': 3, 'high': 4, 'extensive': 5 }
        
        const aScore = impactOrder[a.impact] * 10 - effortOrder[a.effort]
        const bScore = impactOrder[b.impact] * 10 - effortOrder[b.effort]
        
        return bScore - aScore
      })
  }

  private mergeImprovements(existing: UIImprovement, additional: UIImprovement): UIImprovement {
    return {
      ...existing,
      description: `${existing.description} | ${additional.description}`,
      implementation: {
        ...existing.implementation,
        styles: `${existing.implementation.styles || ''}\n${additional.implementation.styles || ''}`,
        code: `${existing.implementation.code || ''}\n${additional.implementation.code || ''}`,
        instructions: [
          ...(existing.implementation.instructions || []),
          ...(additional.implementation.instructions || [])
        ]
      },
      metrics: {
        ...existing.metrics,
        ...additional.metrics
      }
    }
  }

  private prioritizeRecommendations(agentResults: Map<string, AgentResult>): Recommendation[] {
    const allRecommendations = Array.from(agentResults.values())
      .flatMap(result => result.recommendations)
    
    // Sort recommendations by priority and impact
    return allRecommendations
      .sort((a, b) => {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 }
        const aPriority = priorityOrder[a.priority]
        const bPriority = priorityOrder[b.priority]
        
        if (aPriority !== bPriority) {
          return bPriority - aPriority
        }
        
        // If priorities are equal, sort by combined impact score
        const aImpactScore = a.impact.userExperience + a.impact.accessibility + a.impact.performance
        const bImpactScore = b.impact.userExperience + b.impact.accessibility + b.impact.performance
        
        return bImpactScore - aImpactScore
      })
      .slice(0, 20) // Limit to top 20 recommendations
  }

  private calculateQualityMetrics(agentResults: Map<string, AgentResult>, context: UIContext): QualityMetrics {
    const metrics: QualityMetrics = {
      visual: 0,
      responsiveness: 0,
      animations: 0,
      darkMode: 0,
      accessibility: 0,
      overall: 0,
      wcagCompliance: 0,
      performanceImpact: 0
    }

    // Calculate individual agent scores based on their improvements and success
    agentResults.forEach((result, agentId) => {
      if (!result.success) return

      const improvementScore = Math.min(10, result.improvements.length * 1.5)
      const qualityBonus = result.improvements.filter(imp => 
        imp.impact === 'critical' || imp.impact === 'high').length * 0.5

      const agentScore = Math.min(10, improvementScore + qualityBonus)

      switch (agentId) {
        case 'visual-analyzer':
          metrics.visual = agentScore
          break
        case 'design-implementer':
          metrics.visual = Math.max(metrics.visual, agentScore)
          break
        case 'responsive-optimizer':
          metrics.responsiveness = agentScore
          break
        case 'animation-enhancer':
          metrics.animations = agentScore
          break
        case 'dark-mode-specialist':
          metrics.darkMode = agentScore
          break
        case 'accessibility-guardian':
          metrics.accessibility = agentScore
          metrics.wcagCompliance = agentScore
          break
      }
    })

    // Calculate performance impact based on improvements
    const performanceImprovements = Array.from(agentResults.values())
      .flatMap(result => result.improvements)
      .filter(imp => imp.category.includes('performance'))
    
    metrics.performanceImpact = Math.min(10, performanceImprovements.length * 2)

    // Calculate overall score (weighted average)
    const weights = {
      visual: 0.25,
      responsiveness: 0.20,
      accessibility: 0.25,
      animations: 0.10,
      darkMode: 0.10,
      performanceImpact: 0.10
    }

    metrics.overall = 
      metrics.visual * weights.visual +
      metrics.responsiveness * weights.responsiveness +
      metrics.accessibility * weights.accessibility +
      metrics.animations * weights.animations +
      metrics.darkMode * weights.darkMode +
      metrics.performanceImpact * weights.performanceImpact

    return metrics
  }

  private generateExecutionSummary(agentResults: Map<string, AgentResult>, startTime: number): ExecutionSummary {
    const successfulAgents = Array.from(agentResults.values()).filter(result => result.success)
    const failedAgents = Array.from(agentResults.entries())
      .filter(([_, result]) => !result.success)
      .map(([agentId, _]) => agentId)
    
    const totalImprovements = Array.from(agentResults.values())
      .reduce((total, result) => total + result.improvements.length, 0)
    
    const criticalImprovements = Array.from(agentResults.values())
      .flatMap(result => result.improvements)
      .filter(improvement => improvement.impact === 'critical').length

    return {
      totalAgents: agentResults.size,
      successfulAgents: successfulAgents.length,
      failedAgents,
      totalImprovements,
      criticalImprovements,
      executionTime: Date.now() - startTime,
      resourceUsage: {
        memory: process.memoryUsage?.()?.heapUsed || 0,
        cpu: 0 // CPU usage would need to be measured separately
      }
    }
  }

  private generateNextSteps(qualityMetrics: QualityMetrics, improvements: UIImprovement[]): string[] {
    const nextSteps: string[] = []

    // Quality-based next steps
    if (qualityMetrics.overall < this.config.qualityThreshold) {
      nextSteps.push(`🎯 Overall quality score (${qualityMetrics.overall.toFixed(1)}) is below threshold (${this.config.qualityThreshold}). Implement high-impact improvements first.`)
    }

    if (qualityMetrics.accessibility < 8) {
      nextSteps.push('♿ Accessibility needs improvement. Focus on WCAG compliance and screen reader optimisation.')
    }

    if (qualityMetrics.responsiveness < 7) {
      nextSteps.push('📱 Responsive design needs enhancement. Test and optimise mobile experience.')
    }

    if (qualityMetrics.visual < 8) {
      nextSteps.push('🎨 Visual design needs refinement. Apply R6 Digital design system more consistently.')
    }

    // Improvement-based next steps
    const criticalImprovements = improvements.filter(imp => imp.impact === 'critical')
    if (criticalImprovements.length > 0) {
      nextSteps.push(`🚨 ${criticalImprovements.length} critical improvements identified. Address these immediately.`)
    }

    const quickWins = improvements.filter(imp => imp.effort === 'minimal' || imp.effort === 'low')
    if (quickWins.length > 0) {
      nextSteps.push(`⚡ ${quickWins.length} quick wins available. Implement these for immediate impact.`)
    }

    // Performance next steps
    if (qualityMetrics.performanceImpact < 6) {
      nextSteps.push('⚡ Consider performance optimizations to ensure smooth user experience.')
    }

    // Default next steps if quality is good
    if (nextSteps.length === 0) {
      nextSteps.push('✨ Quality metrics look good! Consider implementing recommended enhancements for premium experience.')
    }

    return nextSteps
  }

  private logOrchestrationResults(result: OrchestrationResult) {
    console.log('\n🎉 UI/UX Design Orchestration Complete!')
    console.log('='.repeat(50))
    console.log(`Overall Score: ${result.overallScore.toFixed(1)}/10`)
    console.log(`Total Improvements: ${result.consolidatedImprovements.length}`)
    console.log(`Recommendations: ${result.prioritizedRecommendations.length}`)
    console.log(`Execution Time: ${result.executionSummary.executionTime}ms`)
    console.log('')
    
    console.log('📊 Quality Breakdown:')
    console.log(`  Visual Design:     ${result.qualityMetrics.visual.toFixed(1)}/10`)
    console.log(`  Responsiveness:    ${result.qualityMetrics.responsiveness.toFixed(1)}/10`)
    console.log(`  Accessibility:     ${result.qualityMetrics.accessibility.toFixed(1)}/10`)
    console.log(`  Animations:        ${result.qualityMetrics.animations.toFixed(1)}/10`)
    console.log(`  Dark Mode:         ${result.qualityMetrics.darkMode.toFixed(1)}/10`)
    console.log(`  WCAG Compliance:   ${result.qualityMetrics.wcagCompliance.toFixed(1)}/10`)
    
    if (result.executionSummary.failedAgents.length > 0) {
      console.log(`\n⚠️ Failed Agents: ${result.executionSummary.failedAgents.join(', ')}`)
    }

    console.log('\n🎯 Next Steps:')
    result.nextSteps.forEach((step, index) => {
      console.log(`  ${index + 1}. ${step}`)
    })
    console.log('')
  }

  /**
   * Analyse a single UI element with all available agents
   */
  async analyzeElement(element: UIElement): Promise<Map<string, AnalysisResult>> {
    const analysisResults = new Map<string, AnalysisResult>()

    for (const [agentId, agent] of this.agents.entries()) {
      try {
        console.log(`🔍 Analysing with ${agent.name}...`)
        const result = await agent.analyse(element)
        analysisResults.set(agentId, result)
      } catch (error) {
        console.error(`❌ Analysis failed for ${agent.name}:`, error)
      }
    }

    return analysisResults
  }

  /**
   * Get available agents
   */
  getAvailableAgents(): Map<string, UIAgent> {
    return new Map(this.agents)
  }

  /**
   * Update orchestration configuration
   */
  updateConfig(config: Partial<OrchestrationConfig>) {
    this.config = { ...this.config, ...config }
    this.initializeAgents() // Re-initialize with new config
    this.defineExecutionOrder()
  }

  /**
   * Get current configuration
   */
  getConfig(): OrchestrationConfig {
    return { ...this.config }
  }

  /**
   * Generate a comprehensive UI/UX audit report
   */
  async generateAuditReport(context: UIContext): Promise<string> {
    const result = await this.orchestrate(context)
    
    return `
# UI/UX Design Audit Report
*Generated by R6 Digital Design System Orchestrator*

## Executive Summary
- **Overall Score:** ${result.overallScore.toFixed(1)}/10
- **Total Improvements:** ${result.consolidatedImprovements.length}
- **Critical Issues:** ${result.consolidatedImprovements.filter(imp => imp.impact === 'critical').length}
- **WCAG Compliance:** ${result.qualityMetrics.wcagCompliance.toFixed(1)}/10

## Quality Metrics
| Category | Score | Status |
|----------|-------|---------|
| Visual Design | ${result.qualityMetrics.visual.toFixed(1)}/10 | ${result.qualityMetrics.visual >= 8 ? '✅ Good' : '⚠️ Needs Improvement'} |
| Responsiveness | ${result.qualityMetrics.responsiveness.toFixed(1)}/10 | ${result.qualityMetrics.responsiveness >= 8 ? '✅ Good' : '⚠️ Needs Improvement'} |
| Accessibility | ${result.qualityMetrics.accessibility.toFixed(1)}/10 | ${result.qualityMetrics.accessibility >= 8 ? '✅ Good' : '⚠️ Needs Improvement'} |
| Animations | ${result.qualityMetrics.animations.toFixed(1)}/10 | ${result.qualityMetrics.animations >= 7 ? '✅ Good' : '⚠️ Needs Improvement'} |
| Dark Mode | ${result.qualityMetrics.darkMode.toFixed(1)}/10 | ${result.qualityMetrics.darkMode >= 7 ? '✅ Good' : '⚠️ Needs Improvement'} |

## Priority Improvements
${result.consolidatedImprovements.slice(0, 5).map((imp, index) => `
### ${index + 1}. ${imp.description}
- **Impact:** ${imp.impact}
- **Effort:** ${imp.effort}
- **Category:** ${imp.category}
`).join('')}

## Recommendations
${result.prioritizedRecommendations.slice(0, 5).map((rec, index) => `
### ${index + 1}. ${rec.title}
- **Priority:** ${rec.priority}
- **Complexity:** ${rec.implementation.complexity}
- **Estimated Time:** ${rec.implementation.estimatedTime}
- **Description:** ${rec.description}
`).join('')}

## Next Steps
${result.nextSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

---
*Report generated on ${new Date().toISOString()}*
    `.trim()
  }
}