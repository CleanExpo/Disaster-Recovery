/**
 * Animation Enhancer Agent
 * 
 * Specializes in adding smooth animations, transitions, and micro-interactions
 * that enhance user experience. Implements R6 Digital's sophisticated animation
 * patterns while maintaining performance and accessibility.
 */

import {
  UIAgent,
  UIContext,
  UIElement,
  AgentResult,
  AnalysisResult,
  UIImprovement,
  Recommendation,
  AnimationConfig,
  AnimationType,
  AnimationTrigger,
  KeyframeConfig,
  ImprovementType,
  ImpactLevel,
  EffortLevel
} from '../types/interfaces'

export class AnimationEnhancerAgent implements UIAgent {
  id = 'animation-enhancer'
  name = 'Animation Enhancer'
  description = 'Adds smooth animations, transitions, and micro-interactions for premium user experience'
  capabilities = [
    'Smooth transition implementation',
    'Micro-interaction design',
    'Entrance and exit animations',
    'Hover and focus effects',
    'Scroll-triggered animations',
    'Performance-optimised animations',
    'Accessibility-aware motion design'
  ]
  priority = 4
  isActive = true

  private r6AnimationSystem = {
    // R6 Digital animation principles
    principles: {
      duration: {
        instant: '0ms',
        fast: '150ms',
        normal: '200ms',      // R6's standard duration
        medium: '300ms',
        slow: '500ms',
        slower: '700ms',
        slowest: '1000ms'
      },
      easing: {
        linear: 'linear',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        r6Standard: 'cubic-bezier(0.25, 0.8, 0.25, 1)' // R6's signature easing
      },
      transform: {
        subtle: 'translateY(-2px)',
        moderate: 'translateY(-4px)',
        strong: 'translateY(-8px)',
        scale: 'scale(1.02)',
        scaleDown: 'scale(0.98)',
        rotate: 'rotate(2deg)'
      }
    },

    // Pre-defined animation configs
    animations: {
      // Button animations
      buttonHover: {
        name: 'button-hover',
        type: 'hover' as AnimationType,
        duration: 200,
        easing: 'cubic-bezier(0, 0, 0.2, 1)',
        trigger: 'hover' as AnimationTrigger,
        properties: ['transform', 'box-shadow', 'background-colour']
      },
      buttonPress: {
        name: 'button-press',
        type: 'interaction' as AnimationType,
        duration: 150,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        trigger: 'click' as AnimationTrigger,
        properties: ['transform', 'box-shadow']
      },

      // Card animations
      cardHover: {
        name: 'card-hover',
        type: 'hover' as AnimationType,
        duration: 500,
        easing: 'cubic-bezier(0, 0, 0.2, 1)',
        trigger: 'hover' as AnimationTrigger,
        properties: ['transform', 'box-shadow', 'border-colour']
      },
      cardEntrance: {
        name: 'card-entrance',
        type: 'entrance' as AnimationType,
        duration: 600,
        easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
        trigger: 'intersection' as AnimationTrigger,
        properties: ['opacity', 'transform']
      },

      // Text animations
      fadeInUp: {
        name: 'fade-in-up',
        type: 'entrance' as AnimationType,
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
        trigger: 'intersection' as AnimationTrigger,
        properties: ['opacity', 'transform']
      },

      // Loading animations
      shimmer: {
        name: 'shimmer',
        type: 'state-change' as AnimationType,
        duration: 1500,
        easing: 'ease-in-out',
        trigger: 'mount' as AnimationTrigger,
        properties: ['background-position']
      },

      // Modal animations
      modalEnter: {
        name: 'modal-enter',
        type: 'entrance' as AnimationType,
        duration: 300,
        easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
        trigger: 'mount' as AnimationTrigger,
        properties: ['opacity', 'transform', 'backdrop-filter']
      },

      // Navigation animations
      slideIn: {
        name: 'slide-in',
        type: 'entrance' as AnimationType,
        duration: 400,
        easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
        trigger: 'state-change' as AnimationTrigger,
        properties: ['transform', 'opacity']
      }
    },

    // R6-specific micro-interactions
    microInteractions: {
      buttonShimmer: {
        trigger: 'hover',
        effect: 'shimmer-across',
        duration: 700
      },
      cardGlow: {
        trigger: 'hover',
        effect: 'electric-blue-glow',
        duration: 500
      },
      inputFocus: {
        trigger: 'focus',
        effect: 'blue-ring-expansion',
        duration: 200
      },
      scrollReveal: {
        trigger: 'intersection',
        effect: 'stagger-fade-up',
        duration: 600
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
      // Analyse current animations
      const animationAnalysis = await this.analyzeCurrentAnimations(context)
      
      // Generate R6-style animations
      improvements.push(...await this.generateR6Animations(context))
      
      // Add micro-interactions
      improvements.push(...await this.generateMicroInteractions(context))
      
      // Optimise animation performance
      improvements.push(...await this.optimizeAnimationPerformance(context))
      
      // Generate accessibility-friendly animations
      improvements.push(...await this.generateAccessibleAnimations(context))
      
      // Create animation recommendations
      recommendations.push(...this.generateAnimationRecommendations(context))

      // Check for motion sensitivity
      if (context.userPreferences.reducedMotion) {
        warnings.push('User prefers reduced motion - animations will be simplified or disabled')
      }

      // Performance warnings
      const hasComplexAnimations = improvements.some(imp => 
        imp.category.includes('complex-animation'))
      if (hasComplexAnimations) {
        warnings.push('Complex animations detected - monitor performance impact on low-end devices')
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
      errors.push(`Animation enhancement failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
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

    // Analyse existing animations
    const animationAnalysis = this.analyzeElementAnimations(element)
    issues.push(...animationAnalysis.issues)
    strengths.push(...animationAnalysis.strengths)

    // Check for smooth transitions
    const transitionAnalysis = this.analyzeTransitions(element)
    issues.push(...transitionAnalysis.issues)
    strengths.push(...transitionAnalysis.strengths)

    // Analyse micro-interactions
    const interactionAnalysis = this.analyzeMicroInteractions(element)
    issues.push(...interactionAnalysis.issues)
    strengths.push(...interactionAnalysis.strengths)

    // Generate animation recommendations
    recommendations.push(...this.generateElementAnimationRecommendations(element))

    const score = this.calculateAnimationScore(issues, strengths)

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

  private async analyzeCurrentAnimations(context: UIContext): Promise<AnalysisResult> {
    return this.analyse({
      type: context.component.type,
      props: context.component.props,
      styles: context.component.styles.base as any,
      children: (context.component.children || []) as any,
      accessibility: (context.component.accessibility || { focusable: false }) as any,
      metrics: { renderTime: 0, size: { width: 0, height: 0 }, position: { x: 0, y: 0 } }
    })
  }

  private analyzeElementAnimations(element: UIElement) {
    const issues = []
    const strengths = []

    const styles = element.styles
    const styleString = typeof styles === 'object' ? JSON.stringify(styles) : styles

    // Check for existing transitions
    const hasTransitions = styleString.includes('transition') || 
                          styleString.includes('animation')

    if (hasTransitions) {
      strengths.push('Element includes CSS transitions/animations')
      
      // Check for R6-compliant durations
      const hasR6Duration = Object.values(this.r6AnimationSystem.principles.duration)
        .some(duration => styleString.includes(duration))
      
      if (hasR6Duration) {
        strengths.push('Uses R6 standard animation durations')
      } else {
        issues.push({
          id: 'non-standard-duration',
          severity: 'low' as const,
          type: 'visual' as const,
          description: 'Animation duration does not follow R6 standards',
          location: element.type,
          fix: 'Use R6 standard durations: 150ms, 200ms, 300ms, 500ms',
          automated: true
        })
      }
    } else if (this.isInteractiveElement(element)) {
      issues.push({
        id: 'missing-transitions',
        severity: 'medium' as const,
        type: 'interaction' as const,
        description: 'Interactive element lacks smooth transitions',
        location: element.type,
        fix: 'Add CSS transitions for hover, focus, and active states',
        automated: true
      })
    }

    return { issues, strengths }
  }

  private analyzeTransitions(element: UIElement) {
    const issues = []
    const strengths = []

    if (this.isInteractiveElement(element)) {
      const hasHoverEffects = this.hasStateStyles(element, 'hover')
      const hasFocusEffects = this.hasStateStyles(element, 'focus')

      if (hasHoverEffects) {
        strengths.push('Includes hover state transitions')
      } else {
        issues.push({
          id: 'missing-hover-transition',
          severity: 'medium' as const,
          type: 'interaction' as const,
          description: 'Interactive element lacks hover transitions',
          location: element.type,
          fix: 'Add smooth hover transition effects',
          automated: true
        })
      }

      if (hasFocusEffects) {
        strengths.push('Includes focus state transitions')
      } else {
        issues.push({
          id: 'missing-focus-transition',
          severity: 'high' as const,
          type: 'accessibility' as const,
          description: 'Interactive element lacks focus transitions',
          location: element.type,
          fix: 'Add smooth focus transition for keyboard navigation',
          automated: true
        })
      }
    }

    return { issues, strengths }
  }

  private analyzeMicroInteractions(element: UIElement) {
    const issues = []
    const strengths = []

    // Check for R6-style micro-interactions
    const hasMicroInteractions = this.hasMicroInteractionEffects(element)
    
    if (hasMicroInteractions) {
      strengths.push('Includes micro-interaction effects')
    } else if (element.type === 'button' || element.type === 'card') {
      issues.push({
        id: 'missing-micro-interactions',
        severity: 'low' as const,
        type: 'interaction' as const,
        description: 'Element could benefit from micro-interaction enhancements',
        location: element.type,
        fix: 'Add subtle micro-interactions for better user feedback',
        automated: true
      })
    }

    return { issues, strengths }
  }

  private async generateR6Animations(context: UIContext): Promise<UIImprovement[]> {
    const improvements: UIImprovement[] = []

    // Generate component-specific animations
    switch (context.component.type) {
      case 'button':
        improvements.push(...this.generateButtonAnimations(context))
        break
      case 'card':
        improvements.push(...this.generateCardAnimations(context))
        break
      case 'input':
        improvements.push(...this.generateInputAnimations(context))
        break
      case 'modal':
        improvements.push(...this.generateModalAnimations(context))
        break
      default:
        improvements.push(...this.generateGenericAnimations(context))
    }

    return improvements
  }

  private generateButtonAnimations(context: UIContext): UIImprovement[] {
    return [
      {
        id: 'r6-button-animations',
        type: 'interaction' as any,
        description: 'Add R6 Digital button animations with shimmer effect',
        impact: 'medium',
        effort: 'low',
        category: 'button-animation',
        implementation: {
          styles: `
            /* R6 Button Base Animation */
            .r6-button {
              position: relative;
              overflow: hidden;
              transition: all ${this.r6AnimationSystem.principles.duration.normal} ${this.r6AnimationSystem.principles.easing.r6Standard};
              transform: translateY(0);
            }
            
            /* Hover Effects */
            .r6-button:hover {
              transform: ${this.r6AnimationSystem.principles.transform.moderate};
              box-shadow: 0 8px 30px rgba(19, 28, 255, 0.3);
            }
            
            /* Active/Press Effect */
            .r6-button:active {
              transform: ${this.r6AnimationSystem.principles.transform.scaleDown};
              transition-duration: ${this.r6AnimationSystem.principles.duration.fast};
            }
            
            /* R6 Shimmer Effect */
            .r6-button::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.2),
                transparent
              );
              transition: left ${this.r6AnimationSystem.principles.duration.slower} ${this.r6AnimationSystem.principles.easing.easeOut};
            }
            
            .r6-button:hover::before {
              left: 100%;
            }
            
            /* Loading State */
            .r6-button.loading {
              pointer-events: none;
            }
            
            .r6-button.loading::after {
              content: '';
              position: absolute;
              width: 20px;
              height: 20px;
              border: 2px solid transparent;
              border-top: 2px solid currentColor;
              border-radius: 50%;
              animation: button-spin 1s linear infinite;
            }
            
            @keyframes button-spin {
              to { transform: rotate(360deg); }
            }
          `,
          instructions: [
            'Apply R6 button animation classes',
            'Test hover and press states',
            'Verify loading state functionality',
            'Check accessibility with reduced motion'
          ]
        },
        metrics: {
          userExperienceScore: 8
        }
      }
    ]
  }

  private generateCardAnimations(context: UIContext): UIImprovement[] {
    return [
      {
        id: 'r6-card-animations',
        type: 'interaction' as any,
        description: 'Add R6 Digital card animations with hover effects and entrance transitions',
        impact: 'high',
        effort: 'medium',
        category: 'card-animation',
        implementation: {
          styles: `
            /* R6 Card Base Animation */
            .r6-card {
              transition: all ${this.r6AnimationSystem.principles.duration.slower} ${this.r6AnimationSystem.principles.easing.r6Standard};
              transform: translateY(0);
              position: relative;
              overflow: hidden;
            }
            
            /* Hover Effects */
            .r6-card:hover {
              transform: ${this.r6AnimationSystem.principles.transform.moderate};
              box-shadow: 0 8px 30px rgba(19, 28, 255, 0.12);
              border-colour: rgba(19, 28, 255, 0.2);
            }
            
            /* Gradient Overlay Animation */
            .r6-card::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(
                135deg,
                transparent,
                rgba(19, 28, 255, 0.05),
                transparent
              );
              opacity: 0;
              transition: opacity ${this.r6AnimationSystem.principles.duration.slower} ${this.r6AnimationSystem.principles.easing.easeOut};
              pointer-events: none;
            }
            
            .r6-card:hover::after {
              opacity: 1;
            }
            
            /* Entrance Animation */
            .r6-card.animate-in {
              opacity: 0;
              transform: translateY(20px);
              animation: card-fade-in-up ${this.r6AnimationSystem.principles.duration.slower} ${this.r6AnimationSystem.principles.easing.r6Standard} forwards;
            }
            
            @keyframes card-fade-in-up {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            /* Interactive Card Press Effect */
            .r6-card.interactive:active {
              transform: translateY(-2px) ${this.r6AnimationSystem.principles.transform.scaleDown};
              transition-duration: ${this.r6AnimationSystem.principles.duration.fast};
            }
            
            /* Loading Shimmer Effect */
            .r6-card.loading {
              background: linear-gradient(
                90deg,
                #f0f0f0 25%,
                #e0e0e0 50%,
                #f0f0f0 75%
              );
              background-size: 200% 100%;
              animation: card-shimmer 1.5s ease-in-out infinite;
            }
            
            @keyframes card-shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `,
          instructions: [
            'Apply card animation classes',
            'Implement intersection observer for entrance animations',
            'Test hover and press states',
            'Add stagger delay for multiple cards'
          ]
        },
        metrics: {
          userExperienceScore: 9
        }
      }
    ]
  }

  private generateInputAnimations(context: UIContext): UIImprovement[] {
    return [
      {
        id: 'r6-input-animations',
        type: 'interaction' as any,
        description: 'Add R6 Digital input animations with focus effects',
        impact: 'medium',
        effort: 'low',
        category: 'input-animation',
        implementation: {
          styles: `
            /* R6 Input Base Animation */
            .r6-input {
              transition: all ${this.r6AnimationSystem.principles.duration.normal} ${this.r6AnimationSystem.principles.easing.easeOut};
              position: relative;
            }
            
            /* Focus Ring Animation */
            .r6-input:focus {
              outline: none;
              box-shadow: 0 0 0 3px rgba(19, 28, 255, 0.1);
              border-colour: #131cff;
              animation: focus-ring-pulse 0.6s ${this.r6AnimationSystem.principles.easing.easeOut};
            }
            
            @keyframes focus-ring-pulse {
              0% { box-shadow: 0 0 0 0 rgba(19, 28, 255, 0.3); }
              100% { box-shadow: 0 0 0 3px rgba(19, 28, 255, 0.1); }
            }
            
            /* Label Float Animation */
            .r6-input-group {
              position: relative;
            }
            
            .r6-input-group .floating-label {
              position: absolute;
              left: 12px;
              top: 50%;
              transform: translateY(-50%);
              colour: #999;
              transition: all ${this.r6AnimationSystem.principles.duration.normal} ${this.r6AnimationSystem.principles.easing.easeOut};
              pointer-events: none;
              background: white;
              padding: 0 4px;
            }
            
            .r6-input:focus + .floating-label,
            .r6-input:not(:placeholder-shown) + .floating-label {
              top: 0;
              font-size: 12px;
              colour: #131cff;
              transform: translateY(-50%);
            }
            
            /* Error State Animation */
            .r6-input.error {
              border-colour: #ef4444;
              animation: input-shake 0.3s ease-in-out;
            }
            
            @keyframes input-shake {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(-4px); }
              75% { transform: translateX(4px); }
            }
            
            /* Success State Animation */
            .r6-input.success {
              border-colour: #10b981;
            }
            
            .r6-input.success::after {
              content: '✓';
              position: absolute;
              right: 12px;
              top: 50%;
              transform: translateY(-50%);
              colour: #10b981;
              font-weight: bold;
              animation: success-appear 0.4s ${this.r6AnimationSystem.principles.easing.bounce};
            }
            
            @keyframes success-appear {
              0% { opacity: 0; transform: translateY(-50%) scale(0.5); }
              100% { opacity: 1; transform: translateY(-50%) scale(1); }
            }
          `,
          instructions: [
            'Apply input animation classes',
            'Implement floating label functionality',
            'Test focus and validation states',
            'Ensure keyboard navigation works smoothly'
          ]
        },
        metrics: {
          userExperienceScore: 8,
          accessibilityScore: 7
        }
      }
    ]
  }

  private generateModalAnimations(context: UIContext): UIImprovement[] {
    return [
      {
        id: 'r6-modal-animations',
        type: 'entrance' as any,
        description: 'Add R6 Digital modal entrance and exit animations',
        impact: 'high',
        effort: 'medium',
        category: 'modal-animation',
        implementation: {
          styles: `
            /* Modal Backdrop Animation */
            .r6-modal-backdrop {
              opacity: 0;
              backdrop-filter: blur(0px);
              transition: all ${this.r6AnimationSystem.principles.duration.medium} ${this.r6AnimationSystem.principles.easing.easeOut};
            }
            
            .r6-modal-backdrop.open {
              opacity: 1;
              backdrop-filter: blur(8px);
            }
            
            /* Modal Content Animation */
            .r6-modal-content {
              opacity: 0;
              transform: scale(0.95) translateY(20px);
              transition: all ${this.r6AnimationSystem.principles.duration.medium} ${this.r6AnimationSystem.principles.easing.r6Standard};
            }
            
            .r6-modal-content.open {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
            
            /* Stagger Animation for Modal Elements */
            .r6-modal-content > * {
              opacity: 0;
              transform: translateY(10px);
              transition: all ${this.r6AnimationSystem.principles.duration.normal} ${this.r6AnimationSystem.principles.easing.easeOut};
            }
            
            .r6-modal-content.open > *:nth-child(1) { transition-delay: 100ms; }
            .r6-modal-content.open > *:nth-child(2) { transition-delay: 150ms; }
            .r6-modal-content.open > *:nth-child(3) { transition-delay: 200ms; }
            .r6-modal-content.open > *:nth-child(4) { transition-delay: 250ms; }
            
            .r6-modal-content.open > * {
              opacity: 1;
              transform: translateY(0);
            }
            
            /* Close Button Animation */
            .r6-modal-close {
              transition: all ${this.r6AnimationSystem.principles.duration.fast} ${this.r6AnimationSystem.principles.easing.easeOut};
              opacity: 0.7;
            }
            
            .r6-modal-close:hover {
              opacity: 1;
              transform: ${this.r6AnimationSystem.principles.transform.rotate};
              background-colour: rgba(239, 68, 68, 0.1);
            }
          `,
          instructions: [
            'Apply modal animation classes',
            'Implement proper enter/exit timing',
            'Add escape key functionality',
            'Test with screen readers'
          ]
        },
        metrics: {
          userExperienceScore: 9,
          accessibilityScore: 6
        }
      }
    ]
  }

  private generateGenericAnimations(context: UIContext): UIImprovement[] {
    return [
      {
        id: 'generic-r6-animations',
        type: 'visual' as any,
        description: 'Add R6 Digital base animations for enhanced user experience',
        impact: 'medium',
        effort: 'low',
        category: 'base-animation',
        implementation: {
          styles: `
            /* Base R6 Animation Classes */
            .r6-animate {
              transition: all ${this.r6AnimationSystem.principles.duration.normal} ${this.r6AnimationSystem.principles.easing.r6Standard};
            }
            
            .r6-fade-in {
              opacity: 0;
              animation: r6-fade-in ${this.r6AnimationSystem.principles.duration.slower} ${this.r6AnimationSystem.principles.easing.easeOut} forwards;
            }
            
            @keyframes r6-fade-in {
              to { opacity: 1; }
            }
            
            .r6-slide-up {
              opacity: 0;
              transform: translateY(20px);
              animation: r6-slide-up ${this.r6AnimationSystem.principles.duration.slower} ${this.r6AnimationSystem.principles.easing.r6Standard} forwards;
            }
            
            @keyframes r6-slide-up {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            /* Hover Effects */
            .r6-hover-lift:hover {
              transform: ${this.r6AnimationSystem.principles.transform.moderate};
            }
            
            .r6-hover-glow:hover {
              box-shadow: 0 0 20px rgba(19, 28, 255, 0.3);
            }
            
            /* Reduced Motion Support */
            @media (prefers-reduced-motion: reduce) {
              .r6-animate,
              .r6-fade-in,
              .r6-slide-up,
              .r6-hover-lift,
              .r6-hover-glow {
                animation: none;
                transition: none;
                transform: none;
              }
            }
          `,
          instructions: [
            'Apply animation utility classes',
            'Test with reduced motion preferences',
            'Monitor performance impact',
            'Use intersection observer for entrance animations'
          ]
        },
        metrics: {
          userExperienceScore: 7
        }
      }
    ]
  }

  private async generateMicroInteractions(context: UIContext): Promise<UIImprovement[]> {
    return [
      {
        id: 'r6-micro-interactions',
        type: 'micro-interaction' as any,
        description: 'Add R6 Digital micro-interactions for enhanced feedback',
        impact: 'medium',
        effort: 'medium',
        category: 'micro-interactions',
        implementation: {
          styles: `
            /* Electric Blue Glow Effect */
            .r6-electric-glow {
              position: relative;
            }
            
            .r6-electric-glow::before {
              content: '';
              position: absolute;
              inset: -2px;
              background: linear-gradient(45deg, transparent, #131cff, transparent);
              border-radius: inherit;
              opacity: 0;
              transition: opacity ${this.r6AnimationSystem.principles.duration.normal};
              z-index: -1;
              filter: blur(4px);
            }
            
            .r6-electric-glow:hover::before {
              opacity: 0.7;
              animation: electric-pulse 2s ease-in-out infinite;
            }
            
            @keyframes electric-pulse {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.7; }
            }
            
            /* Ripple Effect */
            .r6-ripple {
              position: relative;
              overflow: hidden;
            }
            
            .r6-ripple::before {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              width: 0;
              height: 0;
              background: rgba(19, 28, 255, 0.3);
              border-radius: 50%;
              transform: translate(-50%, -50%);
              transition: width 0.6s, height 0.6s;
            }
            
            .r6-ripple:active::before {
              width: 300px;
              height: 300px;
            }
            
            /* Magnetic Effect */
            .r6-magnetic {
              transition: transform ${this.r6AnimationSystem.principles.duration.fast} ${this.r6AnimationSystem.principles.easing.easeOut};
            }
            
            /* Text Reveal Effect */
            .r6-text-reveal {
              overflow: hidden;
            }
            
            .r6-text-reveal .word {
              display: inline-block;
              opacity: 0;
              transform: translateY(20px);
              animation: text-reveal 0.8s ${this.r6AnimationSystem.principles.easing.r6Standard} forwards;
            }
            
            .r6-text-reveal .word:nth-child(1) { animation-delay: 0.1s; }
            .r6-text-reveal .word:nth-child(2) { animation-delay: 0.2s; }
            .r6-text-reveal .word:nth-child(3) { animation-delay: 0.3s; }
            .r6-text-reveal .word:nth-child(4) { animation-delay: 0.4s; }
            
            @keyframes text-reveal {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `,
          instructions: [
            'Apply micro-interaction classes selectively',
            'Implement JavaScript for dynamic effects',
            'Test performance on various devices',
            'Provide reduced motion alternatives'
          ]
        },
        metrics: {
          userExperienceScore: 8
        }
      }
    ]
  }

  private async optimizeAnimationPerformance(context: UIContext): Promise<UIImprovement[]> {
    return [
      {
        id: 'animation-performance-optimisation',
        type: 'performance' as any,
        description: 'Optimise animations for better performance and smoother experience',
        impact: 'high',
        effort: 'low',
        category: 'performance-optimisation',
        implementation: {
          styles: `
            /* GPU Acceleration */
            .r6-gpu-accelerated {
              transform: translateZ(0);
              will-change: transform, opacity;
            }
            
            /* Composite Layer Optimisation */
            .r6-composite-layer {
              transform: translate3d(0, 0, 0);
              backface-visibility: hidden;
              perspective: 1000px;
            }
            
            /* Animation State Management */
            .r6-animation-complete {
              will-change: auto;
            }
            
            /* Efficient Box Shadow Animation */
            .r6-efficient-shadow {
              position: relative;
            }
            
            .r6-efficient-shadow::before {
              content: '';
              position: absolute;
              inset: 0;
              box-shadow: 0 8px 30px rgba(19, 28, 255, 0.3);
              border-radius: inherit;
              opacity: 0;
              transition: opacity ${this.r6AnimationSystem.principles.duration.normal};
              z-index: -1;
            }
            
            .r6-efficient-shadow:hover::before {
              opacity: 1;
            }
            
            /* Reduced Motion Optimizations */
            @media (prefers-reduced-motion: reduce) {
              * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behaviour: auto !important;
              }
            }
          `,
          instructions: [
            'Apply performance optimisation classes',
            'Monitor frame rates during animations',
            'Use will-change property judiciously',
            'Test on low-end devices'
          ]
        },
        metrics: {
          performanceGain: 8,
          userExperienceScore: 6
        }
      }
    ]
  }

  private async generateAccessibleAnimations(context: UIContext): Promise<UIImprovement[]> {
    return [
      {
        id: 'accessible-animations',
        type: 'accessibility',
        description: 'Ensure animations are accessible and respect user preferences',
        impact: 'high',
        effort: 'medium',
        category: 'accessibility',
        implementation: {
          styles: `
            /* Respect Reduced Motion Preference */
            @media (prefers-reduced-motion: reduce) {
              .r6-respectful-animation {
                animation: none;
                transition: opacity 0.01ms;
              }
              
              .r6-respectful-animation:hover,
              .r6-respectful-animation:focus {
                transform: none;
                opacity: 0.8;
              }
            }
            
            /* Focus-Visible Only Animations */
            .r6-focus-animation:focus-visible {
              animation: gentle-pulse 2s ease-in-out infinite;
              outline: 2px solid #131cff;
              outline-offset: 2px;
            }
            
            @keyframes gentle-pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.9; }
            }
            
            /* Screen Reader Friendly Animations */
            .r6-sr-friendly {
              /* Provide text-based feedback for screen readers */
            }
            
            .r6-sr-friendly[aria-busy="true"]::after {
              content: " (Loading...)";
              position: absolute;
              left: -9999px;
              top: -9999px;
            }
            
            /* High Contrast Mode Support */
            @media (prefers-contrast: high) {
              .r6-high-contrast {
                animation: none;
                transition: border-colour 0.2s;
              }
              
              .r6-high-contrast:hover,
              .r6-high-contrast:focus {
                border: 2px solid currentColor;
              }
            }
          `,
          instructions: [
            'Test with reduced motion enabled',
            'Verify screen reader compatibility',
            'Ensure keyboard navigation works with animations',
            'Test in high contrast mode'
          ]
        },
        metrics: {
          accessibilityScore: 9,
          userExperienceScore: 7
        }
      }
    ]
  }

  private generateAnimationRecommendations(context: UIContext): Recommendation[] {
    const recommendations = []

    // Intersection Observer recommendation
    recommendations.push({
      id: 'implement-intersection-observer',
      agent: this.id,
      priority: 'high',
      category: 'performance',
      title: 'Implement Intersection Observer for Animations',
      description: 'Use Intersection Observer API to trigger animations only when elements are visible',
      implementation: {
        complexity: 'moderate',
        estimatedTime: '2-3 hours',
        requirements: [
          'Set up Intersection Observer',
          'Create animation trigger system',
          'Add stagger delays for multiple elements',
          'Test performance impact'
        ],
        code: `
          // Intersection Observer for scroll animations
          const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
          };
          
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
              }
            });
          }, observerOptions);
          
          // Observe elements
          document.querySelectorAll('.r6-animate-on-scroll').forEach(el => {
            observer.observe(el);
          });
        `
      },
      impact: {
        userExperience: 9,
        performance: 8,
        accessibility: 5,
        // maintainability: 7
      }
    })

    return recommendations
  }

  private generateElementAnimationRecommendations(element: UIElement): Recommendation[] {
    const recommendations = []

    if (element.type === 'button') {
      recommendations.push({
        id: 'enhance-button-feedback',
        agent: this.id,
        priority: 'medium',
        category: 'interaction',
        title: 'Enhance Button Feedback Animations',
        description: 'Add micro-interactions to provide better user feedback',
        implementation: {
          complexity: 'simple',
          estimatedTime: '30 minutes',
          requirements: ['Add hover animations', 'Include press feedback', 'Test accessibility']
        },
        impact: {
          userExperience: 8,
          performance: 2,
          accessibility: 6,
          // maintainability: 5
        }
      })
    }

    return recommendations
  }

  // Helper methods
  private isInteractiveElement(element: UIElement): boolean {
    const interactiveTypes = ['button', 'link', 'input', 'select', 'textarea']
    return interactiveTypes.includes(element.type) ||
           !!element.props?.onClick ||
           !!element.accessibility?.focusable
  }

  private hasStateStyles(element: UIElement, state: string): boolean {
    const styles = element.styles
    if (typeof styles === 'object' && styles[state as keyof typeof styles]) {
      return true
    }
    return false
  }

  private hasMicroInteractionEffects(element: UIElement): boolean {
    const styles = element.styles
    const styleString = typeof styles === 'object' ? JSON.stringify(styles) : styles
    
    return styleString.includes('::before') ||
           styleString.includes('::after') ||
           styleString.includes('transform') ||
           styleString.includes('box-shadow')
  }

  private calculateAnimationScore(issues: any[], strengths: string[]): number {
    let score = 7 // Start with decent animation score
    
    issues.forEach(issue => {
      switch (issue.severity) {
        case 'high': score -= 2; break
        case 'medium': score -= 1; break
        case 'low': score -= 0.5; break
      }
    })
    
    // Bonus for animation strengths
    score += Math.min(strengths.length * 0.5, 3)
    
    return Math.max(1, Math.min(10, score))
  }
}