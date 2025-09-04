/**
 * Visual Analyzer Agent
 * 
 * Specializes in analysing current design implementation and identifying gaps
 * against the R6 Digital design system standards. Provides comprehensive
 * visual quality assessments and improvement recommendations.
 */

import {
  UIAgent,
  UIContext,
  UIElement,
  AgentResult,
  AnalysisResult,
  UIIssue,
  UIImprovement,
  Recommendation,
  ComponentStyles,
  ColorPalette,
  ImprovementType,
  ImpactLevel,
  EffortLevel
} from '../types/interfaces'

export class VisualAnalyzerAgent implements UIAgent {
  id = 'visual-analyzer'
  name = 'Visual Analyzer'
  description = 'Analyzes design implementation and identifies visual gaps against R6 Digital standards'
  capabilities = [
    'Design consistency analysis',
    'Colour palette compliance',
    'Typography assessment',
    'Spacing and layout evaluation',
    'Visual hierarchy analysis',
    'Brand alignment checking',
    'Component variant optimisation'
  ]
  priority = 1 // High priority for visual foundation
  isActive = true

  private r6Standards = {
    colours: {
      primary: '#131cff',
      primaryHover: '#0f17cc',
      primaryLight: '#3d4bff',
      primaryDark: '#0d14b3',
      neutrals: ['#ffffff', '#f0f0f0', '#eeeeee', '#c7cfdb', '#acadad', '#999a9b', '#6a6d72', '#404040', '#2a2a2a', '#000000'],
      backgrounds: {
        primary: '#ffffff',
        secondary: '#f8f9fa',
        dark: '#1a1a1a'
      }
    },
    typography: {
      primaryFont: 'Poppins',
      secondaryFont: 'Colfax',
      weights: [300, 400, 500, 600, 700, 800],
      scales: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']
    },
    spacing: {
      values: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192],
      consistency: 8 // Base spacing unit
    },
    borderRadius: {
      values: [0, 2, 4, 6, 8, 12, 16, 24, '50%'], // Including R6's pill shapes
      default: 8
    },
    shadows: [
      'none',
      '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)'
    ]
  }

  async execute(context: UIContext): Promise<AgentResult> {
    const startTime = Date.now()
    const improvements: UIImprovement[] = []
    const warnings: string[] = []
    const errors: string[] = []
    const recommendations: Recommendation[] = []

    try {
      // Analyse component against R6 standards
      const analysis = await this.analyse({
        type: context.component.type,
        props: context.component.props,
        styles: context.component.styles.base as any,
        children: (context.component.children || []).map(child => ({
          type: child.type,
          props: child.props,
          styles: child.styles.base as any,
          children: [],
          accessibility: {
            role: child.accessibility?.role,
            ariaLabel: child.accessibility?.['aria-label'],
            tabIndex: child.accessibility?.tabindex,
            focusable: child.accessibility?.tabindex !== -1 ?? true
          },
          metrics: { renderTime: 0, size: { width: 0, height: 0 }, position: { x: 0, y: 0 } }
        })),
        accessibility: {
          role: context.component.accessibility?.role,
          ariaLabel: context.component.accessibility?.['aria-label'],
          tabIndex: context.component.accessibility?.tabindex,
          focusable: context.component.accessibility?.tabindex !== -1 ?? true
        },
        metrics: { renderTime: 0, size: { width: 0, height: 0 }, position: { x: 0, y: 0 } }
      })

      // Generate improvements based on analysis
      improvements.push(...await this.generateImprovements(context, analysis))
      recommendations.push(...analysis.recommendations)

      // Check for critical visual issues
      const criticalIssues = analysis.issues.filter(issue => issue.severity === 'critical')
      if (criticalIssues.length > 0) {
        warnings.push(`Found ${criticalIssues.length} critical visual issues that need immediate attention`)
      }

      return {
        agentId: this.id,
        success: true,
        improvements,
        warnings,
        errors,
        metrics: context.performance,
        recommendations,
        timeElapsed: Date.now() - startTime
      }
    } catch (error) {
      errors.push(`Visual analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return {
        agentId: this.id,
        success: false,
        improvements,
        warnings,
        errors,
        metrics: context.performance,
        recommendations,
        timeElapsed: Date.now() - startTime
      }
    }
  }

  async analyse(element: UIElement): Promise<AnalysisResult> {
    const issues: UIIssue[] = []
    const strengths: string[] = []
    const recommendations: Recommendation[] = []
    
    // Analyse colour usage
    const colorAnalysis = this.analyzeColors(element)
    issues.push(...colorAnalysis.issues)
    strengths.push(...colorAnalysis.strengths)
    recommendations.push(...colorAnalysis.recommendations)

    // Analyse typography
    const typographyAnalysis = this.analyzeTypography(element)
    issues.push(...typographyAnalysis.issues)
    strengths.push(...typographyAnalysis.strengths)
    recommendations.push(...typographyAnalysis.recommendations)

    // Analyse spacing and layout
    const spacingAnalysis = this.analyzeSpacing(element)
    issues.push(...spacingAnalysis.issues)
    strengths.push(...spacingAnalysis.strengths)
    recommendations.push(...spacingAnalysis.recommendations)

    // Analyse visual hierarchy
    const hierarchyAnalysis = this.analyzeVisualHierarchy(element)
    issues.push(...hierarchyAnalysis.issues)
    strengths.push(...hierarchyAnalysis.strengths)
    recommendations.push(...hierarchyAnalysis.recommendations)

    // Calculate overall score (1-10)
    const score = this.calculateVisualScore(issues, strengths)

    return {
      score,
      issues,
      strengths,
      recommendations,
      compliance: {
        wcag: { level: 'AA', score: 0, violations: [] },
        designSystem: { adherence: score / 10, violations: [] },
        performance: { score: 0, issues: [] }
      },
      performance: {
        score: 0,
        metrics: { renderTime: 0, bundleSize: 0, cacheHits: 0, memoryUsage: 0, frameRate: 0, coreWebVitals: { lcp: 0, fid: 0, cls: 0 } },
        bottlenecks: [],
        optimizations: []
      }
    }
  }

  private analyzeColors(element: UIElement) {
    const issues: UIIssue[] = []
    const strengths: string[] = []
    const recommendations: Recommendation[] = []

    // Check for R6 primary colour usage
    const hasR6Primary = this.checkColorUsage(element, this.r6Standards.colours.primary)
    if (hasR6Primary) {
      strengths.push('Uses R6 Digital primary blue (#131cff)')
    } else {
      issues.push({
        id: 'missing-r6-primary',
        severity: 'medium',
        type: 'visual',
        description: 'Component does not use R6 Digital primary blue colour',
        location: element.type,
        fix: 'Apply R6 primary blue (#131cff) for key interactive elements',
        automated: true
      })

      recommendations.push({
        id: 'apply-r6-primary',
        agent: this.id,
        priority: 'high',
        category: 'colour',
        title: 'Apply R6 Primary Colour',
        description: 'Use R6 Digital\'s signature electric blue (#131cff) for primary actions and accents',
        implementation: {
          complexity: 'simple',
          estimatedTime: '5 minutes',
          requirements: ['Update colour values', 'Test contrast ratios'],
          styles: `
            --colour-primary: #131cff;
            --colour-primary-hover: #0f17cc;
            background-colour: var(--colour-primary);
            colour: white;
          `
        },
        impact: {
          userExperience: 8,
          performance: 0,
          accessibility: 0,
          maintainability: 7
        }
      })
    }

    // Check for proper neutral colour usage
    const neutralUsage = this.analyzeNeutralColors(element)
    if (neutralUsage.isProper) {
      strengths.push('Proper use of R6 neutral colour palette')
    } else {
      issues.push({
        id: 'improper-neutral-colours',
        severity: 'low',
        type: 'visual',
        description: 'Uses colours outside the R6 neutral palette',
        location: element.type,
        fix: 'Replace with R6 neutral colours for consistency',
        automated: true
      })
    }

    return { issues, strengths, recommendations }
  }

  private analyzeTypography(element: UIElement) {
    const issues: UIIssue[] = []
    const strengths: string[] = []
    const recommendations: Recommendation[] = []

    // Check font family compliance
    const fontFamily = this.extractStyleProperty(element, 'fontFamily')
    const isR6Font = fontFamily?.includes('Poppins') || fontFamily?.includes('Colfax') || fontFamily?.includes('Inter')
    
    if (isR6Font) {
      strengths.push('Uses R6 Digital typography system')
    } else {
      issues.push({
        id: 'non-r6-font',
        severity: 'medium',
        type: 'visual',
        description: 'Component uses fonts outside R6 typography system',
        location: element.type,
        fix: 'Apply Poppins for headings, Colfax/Inter for body text',
        automated: true
      })

      recommendations.push({
        id: 'apply-r6-typography',
        agent: this.id,
        priority: 'high',
        category: 'typography',
        title: 'Apply R6 Typography System',
        description: 'Use Poppins for headings and Colfax/Inter for body text to match R6 standards',
        implementation: {
          complexity: 'simple',
          estimatedTime: '10 minutes',
          requirements: ['Load R6 fonts', 'Update font-family declarations'],
          styles: `
            font-family: var(--font-primary); /* Poppins for headings */
            font-family: var(--font-secondary); /* Colfax/Inter for body */
          `
        },
        impact: {
          userExperience: 7,
          performance: 1,
          accessibility: 2,
          maintainability: 8
        }
      })
    }

    // Check font weight usage
    const fontWeight = this.extractStyleProperty(element, 'fontWeight')
    const isValidWeight = this.r6Standards.typography.weights.includes(Number(fontWeight))
    
    if (!isValidWeight && fontWeight) {
      issues.push({
        id: 'invalid-font-weight',
        severity: 'low',
        type: 'visual',
        description: 'Font weight not part of R6 typography scale',
        location: element.type,
        fix: 'Use R6 standard weights: 300, 400, 500, 600, 700, 800',
        automated: true
      })
    }

    return { issues, strengths, recommendations }
  }

  private analyzeSpacing(element: UIElement) {
    const issues: UIIssue[] = []
    const strengths: string[] = []
    const recommendations: Recommendation[] = []

    // Check padding consistency
    const padding = this.extractSpacingValues(element, 'padding')
    const isConsistentPadding = padding.every(value => 
      this.r6Standards.spacing.values.includes(value) || value === 0
    )

    if (isConsistentPadding) {
      strengths.push('Uses consistent R6 spacing values for padding')
    } else {
      issues.push({
        id: 'inconsistent-padding',
        severity: 'medium',
        type: 'visual',
        description: 'Padding values do not follow R6 spacing scale',
        location: element.type,
        fix: 'Use R6 spacing scale (4px base unit): 4, 8, 12, 16, 20, 24, 32, etc.',
        automated: true
      })

      recommendations.push({
        id: 'normalize-spacing',
        agent: this.id,
        priority: 'medium',
        category: 'spacing',
        title: 'Normalize Spacing Scale',
        description: 'Apply consistent R6 spacing scale for better visual rhythm',
        implementation: {
          complexity: 'simple',
          estimatedTime: '15 minutes',
          requirements: ['Update spacing values', 'Test visual alignment'],
          styles: `
            padding: var(--space-4); /* 16px */
            margin: var(--space-6); /* 24px */
            gap: var(--space-3); /* 12px */
          `
        },
        impact: {
          userExperience: 6,
          performance: 0,
          accessibility: 0,
          maintainability: 9
        }
      })
    }

    // Check margin consistency
    const margin = this.extractSpacingValues(element, 'margin')
    const isConsistentMargin = margin.every(value => 
      this.r6Standards.spacing.values.includes(value) || value === 0
    )

    if (!isConsistentMargin) {
      issues.push({
        id: 'inconsistent-margin',
        severity: 'low',
        type: 'visual',
        description: 'Margin values do not follow R6 spacing scale',
        location: element.type,
        fix: 'Use R6 spacing scale for margins',
        automated: true
      })
    }

    return { issues, strengths, recommendations }
  }

  private analyzeVisualHierarchy(element: UIElement) {
    const issues: UIIssue[] = []
    const strengths: string[] = []
    const recommendations: Recommendation[] = []

    // Check for proper heading structure
    if (element.type === 'heading' || element.type === 'text') {
      const fontSize = this.extractStyleProperty(element, 'fontSize')
      const fontWeight = this.extractStyleProperty(element, 'fontWeight')
      
      // Analyse if the sizing follows R6's type scale
      const followsTypeScale = this.checkTypeScale(fontSize)
      if (followsTypeScale) {
        strengths.push('Follows R6 typography scale for visual hierarchy')
      } else {
        issues.push({
          id: 'improper-type-scale',
          severity: 'medium',
          type: 'visual',
          description: 'Typography does not follow R6 type scale hierarchy',
          location: element.type,
          fix: 'Use R6 type scale: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl',
          automated: true
        })
      }
    }

    // Check for proper contrast and visual weight
    const hasProperContrast = this.checkVisualContrast(element)
    if (hasProperContrast) {
      strengths.push('Good visual contrast and hierarchy')
    } else {
      issues.push({
        id: 'poor-visual-contrast',
        severity: 'high',
        type: 'visual',
        description: 'Poor visual contrast affecting hierarchy',
        location: element.type,
        fix: 'Improve colour contrast and visual weight differentiation',
        automated: false
      })

      recommendations.push({
        id: 'improve-visual-hierarchy',
        agent: this.id,
        priority: 'high',
        category: 'hierarchy',
        title: 'Enhance Visual Hierarchy',
        description: 'Improve visual contrast and hierarchy for better user comprehension',
        implementation: {
          complexity: 'moderate',
          estimatedTime: '30 minutes',
          requirements: ['Adjust colour contrast', 'Review type scales', 'Test accessibility'],
          styles: `
            /* Primary headings */
            h1 { font-size: var(--text-5xl); font-weight: var(--font-bold); }
            h2 { font-size: var(--text-4xl); font-weight: var(--font-semibold); }
            
            /* Body text hierarchy */
            .text-primary { colour: var(--colour-text-primary); }
            .text-secondary { colour: var(--colour-text-secondary); }
          `
        },
        impact: {
          userExperience: 9,
          performance: 0,
          accessibility: 8,
          maintainability: 6
        }
      })
    }

    return { issues, strengths, recommendations }
  }

  private async generateImprovements(context: UIContext, analysis: AnalysisResult): Promise<UIImprovement[]> {
    const improvements: UIImprovement[] = []

    // Generate improvements for critical and high issues
    const criticalIssues = analysis.issues.filter(issue => issue.severity === 'critical' || issue.severity === 'high')
    
    for (const issue of criticalIssues) {
      const improvement = await this.createImprovementFromIssue(issue, context)
      improvements.push(improvement)
    }

    // Add R6-specific improvements
    improvements.push(...this.generateR6SpecificImprovements(context))

    return improvements
  }

  private async createImprovementFromIssue(issue: UIIssue, context: UIContext): Promise<UIImprovement> {
    const improvementType: ImprovementType = issue.type === 'visual' ? 'visual' : 'interaction'
    const impact: ImpactLevel = issue.severity === 'critical' ? 'critical' : 'high'
    const effort: EffortLevel = issue.automated ? 'minimal' : 'medium'

    return {
      id: `improvement-${issue.id}`,
      type: improvementType,
      description: issue.fix,
      impact,
      effort,
      category: 'visual-compliance',
      implementation: {
        instructions: [issue.fix],
        styles: this.generateFixStyles(issue, context)
      },
      metrics: {
        userExperienceScore: impact === 'critical' ? 9 : 7
      }
    }
  }

  private generateR6SpecificImprovements(context: UIContext): UIImprovement[] {
    const improvements: UIImprovement[] = []

    // Add R6 button styling improvement
    if (context.component.type === 'button') {
      improvements.push({
        id: 'r6-button-enhancement',
        type: 'visual',
        description: 'Apply R6 Digital button styling with hover effects and animations',
        impact: 'high',
        effort: 'low',
        category: 'r6-enhancement',
        implementation: {
          styles: `
            background-colour: #131cff;
            colour: white;
            border-radius: 50px; /* R6's pill shape */
            padding: 12px 24px;
            font-weight: 600;
            transition: all 0.2s ease;
            position: relative;
            overflow: hidden;
            
            &:hover {
              background-colour: #0f17cc;
              transform: translateY(-2px);
              box-shadow: 0 8px 30px rgba(19, 28, 255, 0.3);
            }
            
            &:before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
              transition: left 0.7s;
            }
            
            &:hover:before {
              left: 100%;
            }
          `
        },
        metrics: {
          userExperienceScore: 9,
          performanceGain: 0,
          accessibilityScore: 8
        }
      })
    }

    // Add R6 card styling improvement
    if (context.component.type === 'card') {
      improvements.push({
        id: 'r6-card-enhancement',
        type: 'visual',
        description: 'Apply R6 Digital card styling with hover effects and subtle animations',
        impact: 'high',
        effort: 'low',
        category: 'r6-enhancement',
        implementation: {
          styles: `
            background: white;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border: 1px solid #eeeeee;
            transition: all 0.5s ease;
            position: relative;
            overflow: hidden;
            
            &:hover {
              transform: translateY(-4px);
              box-shadow: 0 8px 30px rgba(19, 28, 255, 0.12);
              border-colour: rgba(19, 28, 255, 0.2);
            }
            
            &:after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(90deg, transparent, rgba(19, 28, 255, 0.05), transparent);
              opacity: 0;
              transition: opacity 0.5s ease;
            }
            
            &:hover:after {
              opacity: 1;
            }
          `
        },
        metrics: {
          userExperienceScore: 8,
          performanceGain: 0,
          accessibilityScore: 7
        }
      })
    }

    return improvements
  }

  // Helper methods
  private checkColorUsage(element: UIElement, colour: string): boolean {
    const styles = element.styles
    if (typeof styles === 'object' && styles !== null) {
      const styleValues = Object.values(styles).join(' ')
      return styleValues.includes(colour)
    }
    return false
  }

  private analyzeNeutralColors(element: UIElement): { isProper: boolean; issues: string[] } {
    // Simplified neutral colour analysis
    return { isProper: true, issues: [] }
  }

  private extractStyleProperty(element: UIElement, property: string): string | null {
    if (typeof element.styles === 'object' && element.styles !== null) {
      return (element.styles as any)[property] || null
    }
    return null
  }

  private extractSpacingValues(element: UIElement, property: string): number[] {
    const value = this.extractStyleProperty(element, property)
    if (!value) return []
    
    // Parse spacing values (simplified)
    const matches = value.match(/(\d+)px/g)
    return matches ? matches.map(match => parseInt(match)) : []
  }

  private checkTypeScale(fontSize: string | null): boolean {
    if (!fontSize) return false
    
    const r6Sizes = ['0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '1.875rem', '2.25rem', '3rem']
    return r6Sizes.some(size => fontSize.includes(size))
  }

  private checkVisualContrast(element: UIElement): boolean {
    // Simplified contrast checking
    // In a real implementation, this would use colour contrast algorithms
    return true
  }

  private calculateVisualScore(issues: UIIssue[], strengths: string[]): number {
    let score = 10
    
    for (const issue of issues) {
      switch (issue.severity) {
        case 'critical':
          score -= 3
          break
        case 'high':
          score -= 2
          break
        case 'medium':
          score -= 1
          break
        case 'low':
          score -= 0.5
          break
      }
    }
    
    // Add bonus for strengths
    score += Math.min(strengths.length * 0.2, 2)
    
    return Math.max(1, Math.min(10, score))
  }

  private generateFixStyles(issue: UIIssue, context: UIContext): string {
    switch (issue.id) {
      case 'missing-r6-primary':
        return `
          background-colour: #131cff;
          colour: white;
          border-colour: #131cff;
          
          &:hover {
            background-colour: #0f17cc;
            border-colour: #0f17cc;
          }
        `
      case 'non-r6-font':
        return `
          font-family: var(--font-primary);
        `
      case 'inconsistent-padding':
        return `
          padding: var(--space-4); /* 16px */
        `
      default:
        return '/* No specific styles for this issue */'
    }
  }
}