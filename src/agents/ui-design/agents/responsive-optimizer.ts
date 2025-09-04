/**
 * Responsive Optimizer Agent
 * 
 * Specializes in ensuring mobile-first responsive design implementation.
 * Optimizes component layouts, breakpoints, and user experience across
 * all device sizes following R6 Digital responsive patterns.
 */

import {
  UIAgent,
  UIContext,
  UIElement,
  AgentResult,
  AnalysisResult,
  UIImprovement,
  Recommendation,
  ResponsiveStyles,
  BreakpointConfig,
  ImprovementType,
  ImpactLevel,
  EffortLevel
} from '../types/interfaces'

export class ResponsiveOptimizerAgent implements UIAgent {
  id = 'responsive-optimizer'
  name = 'Responsive Optimizer'
  description = 'Ensures mobile-first responsive design with optimal layouts across all device sizes'
  capabilities = [
    'Mobile-first design analysis',
    'Breakpoint optimisation',
    'Flexible grid systems',
    'Touch-friendly interface design',
    'Responsive typography scaling',
    'Image and media optimisation',
    'Progressive enhancement patterns'
  ]
  priority = 3
  isActive = true

  private breakpoints: BreakpointConfig = {
    mobile: 375,    // iPhone SE and up
    tablet: 768,    // iPad portrait
    desktop: 1024,  // iPad landscape / small desktop
    widescreen: 1440 // Large desktop
  }

  private r6ResponsivePatterns = {
    // R6 Digital breakpoint system
    breakpoints: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    
    // Container max-widths at different breakpoints
    containers: {
      xs: '100%',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1370px' // R6's max container width
    },
    
    // Responsive padding and margins
    spacing: {
      mobile: {
        container: '16px',
        section: '32px',
        element: '16px'
      },
      tablet: {
        container: '24px',
        section: '48px',
        element: '24px'
      },
      desktop: {
        container: '32px',
        section: '64px',
        element: '32px'
      }
    },
    
    // Typography scaling
    typography: {
      mobile: {
        h1: 'clamp(1.75rem, 4vw, 2.25rem)',
        h2: 'clamp(1.5rem, 3.5vw, 2rem)',
        h3: 'clamp(1.25rem, 3vw, 1.75rem)',
        body: 'clamp(0.875rem, 2.5vw, 1rem)',
        small: 'clamp(0.75rem, 2vw, 0.875rem)'
      },
      desktop: {
        h1: 'clamp(2.25rem, 5vw, 4rem)',
        h2: 'clamp(2rem, 4vw, 3rem)',
        h3: 'clamp(1.75rem, 3vw, 2.5rem)',
        body: 'clamp(1rem, 2vw, 1.125rem)',
        small: 'clamp(0.875rem, 1.5vw, 1rem)'
      }
    },
    
    // Touch targets (minimum 44px as per WCAG)
    touchTargets: {
      minimum: '44px',
      comfortable: '48px',
      optimal: '56px'
    },
    
    // Grid systems
    grid: {
      mobile: {
        columns: 4,
        gap: '16px'
      },
      tablet: {
        columns: 8,
        gap: '24px'
      },
      desktop: {
        columns: 12,
        gap: '32px'
      }
    }
  }

  async execute(context: UIContext): Promise<AgentResult> {
    const startTime = Date.now()
    const improvements: UIImprovement[] = []
    const warnings: string[] = []
    const errors: string[] = []
    const recommendations: Recommendation[] = []

    try {
      // Analyse current responsive implementation
      const responsiveAnalysis = await this.analyzeResponsiveDesign(context)
      
      // Generate mobile-first improvements
      improvements.push(...await this.generateMobileFirstImprovements(context))
      
      // Optimise breakpoints and layouts
      improvements.push(...await this.optimizeBreakpoints(context))
      
      // Generate touch-friendly enhancements
      improvements.push(...await this.generateTouchFriendlyImprovements(context))
      
      // Create responsive typography improvements
      improvements.push(...await this.generateResponsiveTypography(context))
      
      // Generate recommendations
      recommendations.push(...this.generateResponsiveRecommendations(context))

      // Check for mobile usability issues
      const mobileIssues = responsiveAnalysis.issues.filter(issue => 
        issue.type === 'responsive' || issue.description.includes('mobile'))
      
      if (mobileIssues.length > 0) {
        warnings.push(`Found ${mobileIssues.length} mobile usability issues that may impact user experience`)
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
      errors.push(`Responsive optimisation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
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
    const issues = []
    const strengths = []
    const recommendations = []

    // Analyse mobile-first approach
    const mobileFirstAnalysis = this.analyzeMobileFirst(element)
    issues.push(...mobileFirstAnalysis.issues)
    strengths.push(...mobileFirstAnalysis.strengths)

    // Analyse breakpoint usage
    const breakpointAnalysis = this.analyzeBreakpoints(element)
    issues.push(...breakpointAnalysis.issues)
    strengths.push(...breakpointAnalysis.strengths)

    // Analyse touch targets
    const touchTargetAnalysis = this.analyzeTouchTargets(element)
    issues.push(...touchTargetAnalysis.issues)
    strengths.push(...touchTargetAnalysis.strengths)

    // Analyse responsive typography
    const typographyAnalysis = this.analyzeResponsiveTypography(element)
    issues.push(...typographyAnalysis.issues)
    strengths.push(...typographyAnalysis.strengths)

    // Generate specific recommendations
    recommendations.push(...this.generateElementRecommendations(element))

    const score = this.calculateResponsiveScore(issues, strengths)

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

  private async analyzeResponsiveDesign(context: UIContext): Promise<AnalysisResult> {
    return this.analyse({
      type: context.component.type,
      props: context.component.props,
      styles: context.component.styles.base as any,
      children: (context.component.children || []) as any,
      accessibility: (context.component.accessibility || { focusable: false }) as any,
      metrics: { renderTime: 0, size: { width: 0, height: 0 }, position: { x: 0, y: 0 } }
    })
  }

  private analyzeMobileFirst(element: UIElement) {
    const issues = []
    const strengths = []

    // Check for mobile-first CSS approach
    const styles = element.styles
    const styleString = typeof styles === 'object' ? JSON.stringify(styles) : styles
    
    const hasMobileFirst = styleString.includes('@media (min-width') && 
                          !styleString.includes('@media (max-width')
    
    if (hasMobileFirst) {
      strengths.push('Uses mobile-first media queries')
    } else {
      issues.push({
        id: 'not-mobile-first',
        severity: 'high' as const,
        type: 'responsive' as const,
        description: 'Component does not follow mobile-first approach',
        location: element.type,
        fix: 'Restructure CSS to use min-width media queries starting from mobile',
        automated: false
      })
    }

    // Check for viewport meta tag (would be at document level)
    if (element.type === 'html' || element.type === 'document') {
      const hasViewportMeta = styleString.includes('viewport') || 
                              element.props?.viewport
      
      if (hasViewportMeta) {
        strengths.push('Includes proper viewport meta tag')
      } else {
        issues.push({
          id: 'missing-viewport-meta',
          severity: 'critical' as const,
          type: 'responsive' as const,
          description: 'Missing or improper viewport meta tag',
          location: 'document head',
          fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">',
          automated: true
        })
      }
    }

    return { issues, strengths }
  }

  private analyzeBreakpoints(element: UIElement) {
    const issues = []
    const strengths = []

    const styles = element.styles
    const styleString = typeof styles === 'object' ? JSON.stringify(styles) : styles

    // Check for R6 standard breakpoints
    const r6Breakpoints = Object.values(this.r6ResponsivePatterns.breakpoints)
    const usesR6Breakpoints = r6Breakpoints.some(bp => 
      styleString.includes(bp) || styleString.includes(bp.replace('px', 'em'))
    )

    if (usesR6Breakpoints) {
      strengths.push('Uses R6 standard breakpoints')
    } else if (styleString.includes('@media')) {
      issues.push({
        id: 'non-standard-breakpoints',
        severity: 'medium' as const,
        type: 'responsive' as const,
        description: 'Uses non-standard breakpoints',
        location: element.type,
        fix: 'Use R6 standard breakpoints: 640px, 768px, 1024px, 1280px, 1536px',
        automated: true
      })
    }

    return { issues, strengths }
  }

  private analyzeTouchTargets(element: UIElement) {
    const issues = []
    const strengths = []

    // Check interactive elements for touch target size
    const isInteractive = ['button', 'link', 'input', 'select'].includes(element.type) ||
                          element.props?.onClick || element.props?.onTap

    if (isInteractive) {
      const minSize = this.extractSize(element)
      const hasAdequateSize = minSize.width >= 44 && minSize.height >= 44

      if (hasAdequateSize) {
        strengths.push('Interactive elements meet minimum touch target size (44px)')
      } else {
        issues.push({
          id: 'inadequate-touch-target',
          severity: 'high' as const,
          type: 'responsive' as const,
          description: 'Touch target smaller than recommended 44px minimum',
          location: element.type,
          fix: 'Increase touch target size to at least 44px × 44px',
          automated: true,
          wcagViolation: 'WCAG 2.5.5 Target Size (Enhanced) - Level AAA'
        })
      }
    }

    return { issues, strengths }
  }

  private analyzeResponsiveTypography(element: UIElement) {
    const issues = []
    const strengths = []

    const styles = element.styles
    const styleString = typeof styles === 'object' ? JSON.stringify(styles) : styles

    // Check for fluid typography (clamp, vw units)
    const hasFluidTypography = styleString.includes('clamp(') || 
                              styleString.includes('vw') ||
                              styleString.includes('vh')

    if (hasFluidTypography) {
      strengths.push('Uses fluid typography for responsive scaling')
    } else if (element.type.includes('text') || element.type.includes('heading')) {
      issues.push({
        id: 'static-typography',
        severity: 'medium' as const,
        type: 'responsive' as const,
        description: 'Typography does not scale responsively',
        location: element.type,
        fix: 'Implement fluid typography using clamp() or responsive font sizes',
        automated: true
      })
    }

    return { issues, strengths }
  }

  private async generateMobileFirstImprovements(context: UIContext): Promise<UIImprovement[]> {
    const improvements: UIImprovement[] = []

    // Mobile-first CSS structure improvement
    improvements.push({
      id: 'mobile-first-css',
      type: 'responsive',
      description: 'Restructure CSS to follow mobile-first approach',
      impact: 'high',
      effort: 'medium',
      category: 'mobile-optimisation',
      implementation: {
        styles: this.generateMobileFirstCSS(context.component),
        instructions: [
          'Start with mobile styles as the base',
          'Add desktop enhancements with min-width media queries',
          'Test on actual mobile devices',
          'Optimise for touch interactions'
        ]
      },
      metrics: {
        userExperienceScore: 9,
        performanceGain: 5
      }
    })

    // Responsive container improvement
    improvements.push({
      id: 'responsive-container',
      type: 'responsive',
      description: 'Implement R6 responsive container system',
      impact: 'high',
      effort: 'low',
      category: 'layout-optimisation',
      implementation: {
        styles: this.generateResponsiveContainer(),
        instructions: [
          'Apply responsive container classes',
          'Ensure proper padding at each breakpoint',
          'Test content overflow at different screen sizes'
        ]
      },
      metrics: {
        userExperienceScore: 8
      }
    })

    return improvements
  }

  private async optimizeBreakpoints(context: UIContext): Promise<UIImprovement[]> {
    const improvements: UIImprovement[] = []

    improvements.push({
      id: 'optimise-breakpoints',
      type: 'responsive',
      description: 'Implement R6 Digital standard breakpoints',
      impact: 'medium',
      effort: 'low',
      category: 'breakpoint-optimisation',
      implementation: {
        styles: this.generateStandardBreakpoints(),
        instructions: [
          'Replace custom breakpoints with R6 standards',
          'Update media queries to use consistent values',
          'Test layout at each breakpoint',
          'Ensure content remains readable'
        ]
      },
      metrics: {
        // maintainability: 9,
        userExperienceScore: 7
      }
    })

    return improvements
  }

  private async generateTouchFriendlyImprovements(context: UIContext): Promise<UIImprovement[]> {
    const improvements: UIImprovement[] = []

    improvements.push({
      id: 'touch-friendly-targets',
      type: 'responsive',
      description: 'Ensure all interactive elements meet touch target guidelines',
      impact: 'high',
      effort: 'low',
      category: 'touch-optimisation',
      implementation: {
        styles: this.generateTouchFriendlyStyles(context.component),
        instructions: [
          'Increase touch target sizes to minimum 44px',
          'Add adequate spacing between interactive elements',
          'Implement hover states for desktop',
          'Test on touch devices'
        ]
      },
      metrics: {
        userExperienceScore: 9,
        accessibilityScore: 8
      }
    })

    return improvements
  }

  private async generateResponsiveTypography(context: UIContext): Promise<UIImprovement[]> {
    const improvements: UIImprovement[] = []

    improvements.push({
      id: 'fluid-typography',
      type: 'responsive',
      description: 'Implement fluid typography for optimal readability across devices',
      impact: 'medium',
      effort: 'medium',
      category: 'typography-optimisation',
      implementation: {
        styles: this.generateFluidTypography(),
        instructions: [
          'Replace static font sizes with fluid scales',
          'Test readability at different screen sizes',
          'Ensure text remains accessible',
          'Optimise line heights for mobile reading'
        ]
      },
      metrics: {
        userExperienceScore: 8,
        accessibilityScore: 7
      }
    })

    return improvements
  }

  private generateResponsiveRecommendations(context: UIContext): Recommendation[] {
    const recommendations: Recommendation[] = []

    // Responsive grid system recommendation
    recommendations.push({
      id: 'implement-responsive-grid',
      agent: this.id,
      priority: 'high',
      category: 'layout',
      title: 'Implement R6 Responsive Grid System',
      description: 'Use a consistent grid system across all breakpoints for better layout control',
      implementation: {
        complexity: 'moderate',
        estimatedTime: '2-3 hours',
        requirements: [
          'Define grid system CSS',
          'Apply grid classes to components',
          'Test responsiveness',
          'Optimise for mobile performance'
        ],
        code: `
          // R6 Responsive Grid System
          .grid-container {
            display: grid;
            gap: var(--grid-gap, 1rem);
            padding: var(--container-padding);
          }
          
          // Mobile (4 columns)
          @media (min-width: 375px) {
            .grid-container {
              grid-template-columns: repeat(4, 1fr);
              --container-padding: 1rem;
              --grid-gap: 1rem;
            }
          }
          
          // Tablet (8 columns)
          @media (min-width: 768px) {
            .grid-container {
              grid-template-columns: repeat(8, 1fr);
              --container-padding: 1.5rem;
              --grid-gap: 1.5rem;
            }
          }
          
          // Desktop (12 columns)
          @media (min-width: 1024px) {
            .grid-container {
              grid-template-columns: repeat(12, 1fr);
              --container-padding: 2rem;
              --grid-gap: 2rem;
            }
          }
        `
      },
      impact: {
        userExperience: 9,
        performance: 6,
        accessibility: 5,
        // maintainability: 8
      }
    })

    // Progressive enhancement recommendation
    recommendations.push({
      id: 'progressive-enhancement',
      agent: this.id,
      priority: 'medium',
      category: 'enhancement',
      title: 'Implement Progressive Enhancement',
      description: 'Build features that work on all devices and enhance with advanced capabilities',
      implementation: {
        complexity: 'moderate',
        estimatedTime: '3-4 hours',
        requirements: [
          'Start with basic functionality',
          'Add enhanced features for capable devices',
          'Test on low-end devices',
          'Ensure graceful degradation'
        ],
        code: `
          // Progressive enhancement example
          .enhanced-component {
            /* Base styles for all devices */
            padding: 1rem;
            background: white;
            border: 1px solid #e5e5e5;
            
            /* Enhanced styles for capable devices */
            @supports (backdrop-filter: blur(10px)) {
              background: rgba(255, 255, 255, 0.8);
              backdrop-filter: blur(10px);
            }
            
            /* Touch-friendly enhancements */
            @media (pointer: coarse) {
              padding: 1.5rem;
              min-height: 44px;
            }
            
            /* High-DPI display optimizations */
            @media (-webkit-min-device-pixel-ratio: 2) {
              border-width: 0.5px;
            }
          }
        `
      },
      impact: {
        userExperience: 8,
        performance: 7,
        accessibility: 6,
        // maintainability: 7
      }
    })

    return recommendations
  }

  // Helper methods for generating CSS
  private generateMobileFirstCSS(component: any): string {
    return `
      /* Mobile-first base styles */
      .${component.type} {
        /* Base mobile styles */
        padding: ${this.r6ResponsivePatterns.spacing.mobile.element};
        font-size: ${this.r6ResponsivePatterns.typography.mobile.body};
        
        /* Touch-friendly sizing */
        min-height: ${this.r6ResponsivePatterns.touchTargets.minimum};
        
        /* Responsive enhancements */
        @media (min-width: ${this.r6ResponsivePatterns.breakpoints.sm}) {
          padding: ${this.r6ResponsivePatterns.spacing.tablet.element};
          font-size: ${this.r6ResponsivePatterns.typography.desktop.body};
        }
        
        @media (min-width: ${this.r6ResponsivePatterns.breakpoints.lg}) {
          padding: ${this.r6ResponsivePatterns.spacing.desktop.element};
          min-height: ${this.r6ResponsivePatterns.touchTargets.optimal};
        }
      }
    `
  }

  private generateResponsiveContainer(): string {
    return `
      .container {
        width: 100%;
        margin: 0 auto;
        padding: 0 ${this.r6ResponsivePatterns.spacing.mobile.container};
        
        @media (min-width: ${this.r6ResponsivePatterns.breakpoints.sm}) {
          max-width: ${this.r6ResponsivePatterns.containers.sm};
          padding: 0 ${this.r6ResponsivePatterns.spacing.tablet.container};
        }
        
        @media (min-width: ${this.r6ResponsivePatterns.breakpoints.md}) {
          max-width: ${this.r6ResponsivePatterns.containers.md};
        }
        
        @media (min-width: ${this.r6ResponsivePatterns.breakpoints.lg}) {
          max-width: ${this.r6ResponsivePatterns.containers.lg};
          padding: 0 ${this.r6ResponsivePatterns.spacing.desktop.container};
        }
        
        @media (min-width: ${this.r6ResponsivePatterns.breakpoints.xl}) {
          max-width: ${this.r6ResponsivePatterns.containers.xl};
        }
        
        @media (min-width: ${this.r6ResponsivePatterns.breakpoints['2xl']}) {
          max-width: ${this.r6ResponsivePatterns.containers['2xl']};
        }
      }
    `
  }

  private generateStandardBreakpoints(): string {
    return `
      /* R6 Digital Standard Breakpoints */
      :root {
        --breakpoint-xs: ${this.r6ResponsivePatterns.breakpoints.xs};
        --breakpoint-sm: ${this.r6ResponsivePatterns.breakpoints.sm};
        --breakpoint-md: ${this.r6ResponsivePatterns.breakpoints.md};
        --breakpoint-lg: ${this.r6ResponsivePatterns.breakpoints.lg};
        --breakpoint-xl: ${this.r6ResponsivePatterns.breakpoints.xl};
        --breakpoint-2xl: ${this.r6ResponsivePatterns.breakpoints['2xl']};
      }
      
      /* Usage in media queries */
      @media (min-width: var(--breakpoint-sm)) {
        /* Tablet styles */
      }
      
      @media (min-width: var(--breakpoint-lg)) {
        /* Desktop styles */
      }
      
      @media (min-width: var(--breakpoint-xl)) {
        /* Large desktop styles */
      }
    `
  }

  private generateTouchFriendlyStyles(component: any): string {
    return `
      /* Touch-friendly interactive elements */
      .${component.type}[role="button"],
      .${component.type}.interactive {
        min-height: ${this.r6ResponsivePatterns.touchTargets.minimum};
        min-width: ${this.r6ResponsivePatterns.touchTargets.minimum};
        
        /* Comfortable touch targets on mobile */
        @media (max-width: ${this.r6ResponsivePatterns.breakpoints.md}) {
          min-height: ${this.r6ResponsivePatterns.touchTargets.comfortable};
          padding: 12px 16px;
          
          /* Increase spacing between touch targets */
          margin: 8px 0;
          
          /* Optimal size for thumb interaction */
          @media (orientation: portrait) {
            min-height: ${this.r6ResponsivePatterns.touchTargets.optimal};
          }
        }
        
        /* Hover states for non-touch devices */
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            /* Desktop hover styles */
            opacity: 0.9;
            transform: translateY(-1px);
          }
        }
        
        /* Focus styles for keyboard navigation */
        &:focus-visible {
          outline: 2px solid #131cff;
          outline-offset: 2px;
        }
      }
    `
  }

  private generateFluidTypography(): string {
    return `
      /* R6 Fluid Typography Scale */
      .text-xs { font-size: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem); }
      .text-sm { font-size: clamp(0.875rem, 0.8rem + 0.375vw, 1rem); }
      .text-base { font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem); }
      .text-lg { font-size: clamp(1.125rem, 1rem + 0.625vw, 1.25rem); }
      .text-xl { font-size: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem); }
      .text-2xl { font-size: clamp(1.5rem, 1.3rem + 1vw, 2rem); }
      .text-3xl { font-size: clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem); }
      .text-4xl { font-size: clamp(2.25rem, 1.9rem + 1.75vw, 3.5rem); }
      .text-5xl { font-size: clamp(3rem, 2.5rem + 2.5vw, 4.5rem); }
      
      /* Responsive line heights */
      h1, .text-5xl, .text-4xl { line-height: 1.1; }
      h2, .text-3xl, .text-2xl { line-height: 1.2; }
      h3, .text-xl, .text-lg { line-height: 1.3; }
      p, .text-base, .text-sm { line-height: 1.6; }
      .text-xs { line-height: 1.5; }
      
      /* Responsive letter spacing */
      h1, .text-5xl { letter-spacing: -0.02em; }
      h2, .text-4xl { letter-spacing: -0.01em; }
      h3, .text-3xl { letter-spacing: -0.005em; }
    `
  }

  private generateElementRecommendations(element: UIElement): Recommendation[] {
    const recommendations = []

    if (['button', 'link'].includes(element.type)) {
      recommendations.push({
        id: 'optimise-interactive-element',
        agent: this.id,
        priority: 'high',
        category: 'touch-optimisation',
        title: 'Optimise Interactive Element for Touch',
        description: 'Ensure interactive elements are touch-friendly on mobile devices',
        implementation: {
          complexity: 'simple',
          estimatedTime: '15 minutes',
          requirements: ['Increase touch target size', 'Add proper spacing', 'Test on mobile devices']
        },
        impact: {
          userExperience: 9,
          performance: 2,
          accessibility: 8,
          // maintainability: 5
        }
      })
    }

    return recommendations
  }

  // Helper methods
  private extractSize(element: UIElement): { width: number; height: number } {
    // Simplified size extraction - in a real implementation,
    // this would parse CSS or use computed styles
    return element.metrics?.size || { width: 40, height: 40 }
  }

  private calculateResponsiveScore(issues: any[], strengths: string[]): number {
    let score = 8 // Start with good responsive score
    
    issues.forEach(issue => {
      switch (issue.severity) {
        case 'critical': score -= 3; break
        case 'high': score -= 2; break
        case 'medium': score -= 1; break
        case 'low': score -= 0.5; break
      }
    })
    
    // Bonus for responsive strengths
    score += Math.min(strengths.length * 0.4, 2)
    
    return Math.max(1, Math.min(10, score))
  }
}