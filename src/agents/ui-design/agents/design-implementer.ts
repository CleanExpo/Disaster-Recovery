/**
 * Design Implementer Agent
 * 
 * Specializes in applying R6 Digital design system patterns across components.
 * Ensures consistent implementation of design tokens, component variants,
 * and brand standards throughout the application.
 */

import {
  UIAgent,
  UIContext,
  UIElement,
  AgentResult,
  AnalysisResult,
  UIImprovement,
  Recommendation,
  ComponentStyles,
  ComponentVariant,
  ImprovementType,
  ImpactLevel,
  EffortLevel
} from '../types/interfaces'

export class DesignImplementerAgent implements UIAgent {
  id = 'design-implementer'
  name = 'Design Implementer'
  description = 'Applies R6 Digital design system patterns and ensures consistent implementation'
  capabilities = [
    'Design system token application',
    'Component variant generation',
    'Brand consistency enforcement',
    'Style optimisation',
    'Design pattern implementation',
    'CSS custom property management',
    'Component library standardization'
  ]
  priority = 2
  isActive = true

  private r6DesignTokens = {
    colours: {
      primary: {
        50: '#f0f2ff',
        100: '#e6eaff',
        500: '#131cff',
        600: '#0f17cc',
        700: '#0d14b3',
        900: '#0a0f80'
      },
      neutral: {
        0: '#ffffff',
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827'
      },
      semantic: {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6'
      }
    },
    typography: {
      fontFamilies: {
        primary: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        secondary: '"Colfax", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        mono: '"SF Mono", Consolas, "Liberation Mono", monospace'
      },
      fontSizes: {
        xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        sm: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        base: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        lg: 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        xl: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        '2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',
        '3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem)',
        '4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3.5rem)',
        '5xl': 'clamp(3rem, 2.5rem + 2.5vw, 4.5rem)'
      },
      fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800
      },
      lineHeights: {
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2
      }
    },
    spacing: {
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem'
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      base: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
    },
    animations: {
      durations: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
        slower: '500ms'
      },
      easings: {
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
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
      // Generate component variants based on R6 design system
      const variants = this.generateR6ComponentVariants(context.component)
      
      // Apply design tokens to component
      const tokenizedStyles = this.applyDesignTokens(context.component.styles)
      
      // Generate improvements for better design system compliance
      improvements.push(...await this.generateDesignSystemImprovements(context))
      
      // Create R6-specific component enhancements
      recommendations.push(...this.generateR6Recommendations(context))

      // Validate design system adherence
      const adherenceScore = this.calculateDesignSystemAdherence(context.component)
      if (adherenceScore < 7) {
        warnings.push(`Design system adherence is low (${adherenceScore}/10). Consider implementing more R6 patterns.`)
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
      errors.push(`Design implementation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
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

    // Analyse design token usage
    const tokenUsage = this.analyzeDesignTokenUsage(element)
    issues.push(...tokenUsage.issues)
    strengths.push(...tokenUsage.strengths)

    // Analyse component consistency
    const consistency = this.analyzeComponentConsistency(element)
    issues.push(...consistency.issues)
    strengths.push(...consistency.strengths)

    // Generate implementation recommendations
    recommendations.push(...this.generateImplementationRecommendations(element))

    const score = this.calculateImplementationScore(issues, strengths)

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

  private generateR6ComponentVariants(component: any): ComponentVariant[] {
    const variants: ComponentVariant[] = []

    switch (component.type) {
      case 'button':
        variants.push(...this.generateButtonVariants())
        break
      case 'card':
        variants.push(...this.generateCardVariants())
        break
      case 'input':
        variants.push(...this.generateInputVariants())
        break
      default:
        variants.push(...this.generateGenericVariants(component.type))
    }

    return variants
  }

  private generateButtonVariants(): ComponentVariant[] {
    return [
      {
        name: 'primary',
        props: { variant: 'primary', size: 'md' },
        styles: {
          base: `
            background-colour: ${this.r6DesignTokens.colours.primary[500]};
            colour: white;
            border: 2px solid ${this.r6DesignTokens.colours.primary[500]};
            border-radius: ${this.r6DesignTokens.borderRadius.full};
            padding: ${this.r6DesignTokens.spacing[3]} ${this.r6DesignTokens.spacing[6]};
            font-family: ${this.r6DesignTokens.typography.fontFamilies.primary};
            font-weight: ${this.r6DesignTokens.typography.fontWeights.semibold};
            font-size: ${this.r6DesignTokens.typography.fontSizes.base};
            transition: all ${this.r6DesignTokens.animations.durations.normal} ${this.r6DesignTokens.animations.easings.out};
            position: relative;
            overflow: hidden;
            cursor: pointer;
            user-select: none;
          `,
          hover: `
            background-colour: ${this.r6DesignTokens.colours.primary[600]};
            border-colour: ${this.r6DesignTokens.colours.primary[600]};
            transform: translateY(-2px);
            box-shadow: ${this.r6DesignTokens.shadows.lg};
          `,
          active: `
            transform: translateY(0);
            box-shadow: ${this.r6DesignTokens.shadows.md};
          `,
          focus: `
            outline: 2px solid ${this.r6DesignTokens.colours.primary[500]};
            outline-offset: 2px;
          `
        }
      },
      {
        name: 'secondary',
        props: { variant: 'secondary', size: 'md' },
        styles: {
          base: `
            background-colour: transparent;
            colour: ${this.r6DesignTokens.colours.primary[500]};
            border: 2px solid ${this.r6DesignTokens.colours.primary[500]};
            border-radius: ${this.r6DesignTokens.borderRadius.full};
            padding: ${this.r6DesignTokens.spacing[3]} ${this.r6DesignTokens.spacing[6]};
            font-family: ${this.r6DesignTokens.typography.fontFamilies.primary};
            font-weight: ${this.r6DesignTokens.typography.fontWeights.semibold};
            transition: all ${this.r6DesignTokens.animations.durations.normal} ${this.r6DesignTokens.animations.easings.out};
          `,
          hover: `
            background-colour: ${this.r6DesignTokens.colours.primary[500]};
            colour: white;
            transform: translateY(-2px);
            box-shadow: ${this.r6DesignTokens.shadows.lg};
          `
        }
      },
      {
        name: 'gradient',
        props: { variant: 'gradient', size: 'md' },
        styles: {
          base: `
            background: linear-gradient(135deg, ${this.r6DesignTokens.colours.primary[500]}, ${this.r6DesignTokens.colours.semantic.info});
            colour: white;
            border: none;
            border-radius: ${this.r6DesignTokens.borderRadius.full};
            padding: ${this.r6DesignTokens.spacing[3]} ${this.r6DesignTokens.spacing[6]};
            font-family: ${this.r6DesignTokens.typography.fontFamilies.primary};
            font-weight: ${this.r6DesignTokens.typography.fontWeights.semibold};
            transition: all ${this.r6DesignTokens.animations.durations.normal} ${this.r6DesignTokens.animations.easings.out};
            position: relative;
            overflow: hidden;
          `,
          hover: `
            transform: translateY(-2px) scale(1.02);
            box-shadow: ${this.r6DesignTokens.shadows['2xl']};
          `
        }
      }
    ]
  }

  private generateCardVariants(): ComponentVariant[] {
    return [
      {
        name: 'default',
        props: { variant: 'default', padding: 'md' },
        styles: {
          base: `
            background-colour: ${this.r6DesignTokens.colours.neutral[0]};
            border: 1px solid ${this.r6DesignTokens.colours.neutral[200]};
            border-radius: ${this.r6DesignTokens.borderRadius['2xl']};
            padding: ${this.r6DesignTokens.spacing[6]};
            box-shadow: ${this.r6DesignTokens.shadows.base};
            transition: all ${this.r6DesignTokens.animations.durations.slower} ${this.r6DesignTokens.animations.easings.out};
            position: relative;
            overflow: hidden;
          `,
          hover: `
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(19, 28, 255, 0.12);
            border-colour: rgba(19, 28, 255, 0.2);
          `
        }
      },
      {
        name: 'glass',
        props: { variant: 'glass', padding: 'md' },
        styles: {
          base: `
            background-colour: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: ${this.r6DesignTokens.borderRadius['2xl']};
            padding: ${this.r6DesignTokens.spacing[6]};
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
            transition: all ${this.r6DesignTokens.animations.durations.slower} ${this.r6DesignTokens.animations.easings.out};
          `,
          hover: `
            background-colour: rgba(255, 255, 255, 0.9);
            transform: translateY(-4px);
            box-shadow: 0 8px 40px rgba(19, 28, 255, 0.25);
          `
        }
      },
      {
        name: 'interactive',
        props: { variant: 'interactive', padding: 'md' },
        styles: {
          base: `
            background-colour: ${this.r6DesignTokens.colours.neutral[0]};
            border: 1px solid ${this.r6DesignTokens.colours.neutral[200]};
            border-radius: ${this.r6DesignTokens.borderRadius['2xl']};
            padding: ${this.r6DesignTokens.spacing[6]};
            box-shadow: ${this.r6DesignTokens.shadows.base};
            transition: all ${this.r6DesignTokens.animations.durations.slower} ${this.r6DesignTokens.animations.easings.out};
            cursor: pointer;
          `,
          hover: `
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 12px 40px rgba(19, 28, 255, 0.2);
            border-colour: rgba(19, 28, 255, 0.3);
          `,
          active: `
            transform: translateY(-2px) scale(0.98);
          `
        }
      }
    ]
  }

  private generateInputVariants(): ComponentVariant[] {
    return [
      {
        name: 'default',
        props: { variant: 'default', size: 'md' },
        styles: {
          base: `
            background-colour: ${this.r6DesignTokens.colours.neutral[0]};
            border: 2px solid ${this.r6DesignTokens.colours.neutral[300]};
            border-radius: ${this.r6DesignTokens.borderRadius.lg};
            padding: ${this.r6DesignTokens.spacing[3]} ${this.r6DesignTokens.spacing[4]};
            font-family: ${this.r6DesignTokens.typography.fontFamilies.secondary};
            font-size: ${this.r6DesignTokens.typography.fontSizes.base};
            colour: ${this.r6DesignTokens.colours.neutral[900]};
            transition: all ${this.r6DesignTokens.animations.durations.normal} ${this.r6DesignTokens.animations.easings.out};
            width: 100%;
          `,
          focus: `
            border-colour: ${this.r6DesignTokens.colours.primary[500]};
            outline: none;
            box-shadow: 0 0 0 3px rgba(19, 28, 255, 0.1);
          `,
          hover: `
            border-colour: ${this.r6DesignTokens.colours.neutral[400]};
          `
        }
      }
    ]
  }

  private generateGenericVariants(componentType: string): ComponentVariant[] {
    return [
      {
        name: 'r6-enhanced',
        props: { variant: 'r6-enhanced' },
        styles: {
          base: `
            font-family: ${this.r6DesignTokens.typography.fontFamilies.secondary};
            colour: ${this.r6DesignTokens.colours.neutral[900]};
            transition: all ${this.r6DesignTokens.animations.durations.normal} ${this.r6DesignTokens.animations.easings.out};
          `
        }
      }
    ]
  }

  private applyDesignTokens(styles: ComponentStyles): ComponentStyles {
    let processedBase = styles.base || ''
    
    // Replace hardcoded colours with design tokens
    processedBase = this.replaceColorTokens(processedBase)
    
    // Replace hardcoded spacing with design tokens
    processedBase = this.replaceSpacingTokens(processedBase)
    
    // Replace hardcoded typography with design tokens
    processedBase = this.replaceTypographyTokens(processedBase)

    return {
      ...styles,
      base: processedBase
    }
  }

  private replaceColorTokens(css: string): string {
    const colorMappings = {
      '#131cff': 'var(--colour-primary-500)',
      '#0f17cc': 'var(--colour-primary-600)',
      '#ffffff': 'var(--colour-neutral-0)',
      '#000000': 'var(--colour-neutral-900)',
      '#f9fafb': 'var(--colour-neutral-50)',
      '#6b7280': 'var(--colour-neutral-500)'
    }

    let processedCSS = css
    Object.entries(colorMappings).forEach(([hex, token]) => {
      processedCSS = processedCSS.replace(new RegExp(hex, 'gi'), token)
    })

    return processedCSS
  }

  private replaceSpacingTokens(css: string): string {
    const spacingMappings = {
      '4px': 'var(--space-1)',
      '8px': 'var(--space-2)',
      '12px': 'var(--space-3)',
      '16px': 'var(--space-4)',
      '20px': 'var(--space-5)',
      '24px': 'var(--space-6)',
      '32px': 'var(--space-8)'
    }

    let processedCSS = css
    Object.entries(spacingMappings).forEach(([px, token]) => {
      processedCSS = processedCSS.replace(new RegExp(px, 'g'), token)
    })

    return processedCSS
  }

  private replaceTypographyTokens(css: string): string {
    let processedCSS = css
    
    // Replace font families
    processedCSS = processedCSS.replace(/font-family:\s*[^;]+/g, (match) => {
      if (match.includes('Poppins')) return 'font-family: var(--font-primary)'
      if (match.includes('Inter') || match.includes('Colfax')) return 'font-family: var(--font-secondary)'
      return match
    })

    return processedCSS
  }

  private async generateDesignSystemImprovements(context: UIContext): Promise<UIImprovement[]> {
    const improvements: UIImprovement[] = []

    // Generate CSS custom properties improvement
    improvements.push({
      id: 'css-custom-properties',
      type: 'visual',
      description: 'Implement R6 Digital CSS custom properties for consistent theming',
      impact: 'high',
      effort: 'medium',
      category: 'design-system',
      implementation: {
        styles: this.generateCSSCustomProperties(),
        instructions: [
          'Add CSS custom properties to root element',
          'Replace hardcoded values with custom properties',
          'Update component styles to use design tokens'
        ]
      },
      metrics: {
        userExperienceScore: 8
      }
    })

    // Generate component standardization improvement
    improvements.push({
      id: 'component-standardization',
      type: 'visual',
      description: 'Standardize component implementation using R6 patterns',
      impact: 'high',
      effort: 'medium',
      category: 'standardization',
      implementation: {
        code: this.generateStandardizedComponent(context.component),
        instructions: [
          'Apply R6 component patterns',
          'Implement proper variants',
          'Add hover and focus states',
          'Ensure accessibility compliance'
        ]
      },
      metrics: {
        userExperienceScore: 9
      }
    })

    return improvements
  }

  private generateR6Recommendations(context: UIContext): Recommendation[] {
    const recommendations: Recommendation[] = []

    // Recommend R6 component library usage
    recommendations.push({
      id: 'use-r6-components',
      agent: this.id,
      priority: 'high',
      category: 'component-library',
      title: 'Use R6 Digital Component Library',
      description: 'Replace custom components with standardized R6 components for consistency',
      implementation: {
        complexity: 'moderate',
        estimatedTime: '2-4 hours',
        requirements: [
          'Import R6 component library',
          'Replace existing components',
          'Update component props',
          'Test component functionality'
        ],
        code: `
          import { R6Button, R6Card, R6Input } from '@/components/ui'
          
          // Replace custom button with R6Button
          <R6Button variant="primary" size="md">
            Click me
          </R6Button>
          
          // Replace custom card with R6Card
          <R6Card variant="glass" padding="lg">
            <R6CardHeader>
              <R6CardTitle>Title</R6CardTitle>
            </R6CardHeader>
            <R6CardContent>
              Content here
            </R6CardContent>
          </R6Card>
        `
      },
      impact: {
        userExperience: 9,
        performance: 5,
        accessibility: 8,
        maintainability: 10
      }
    })

    // Recommend design token implementation
    recommendations.push({
      id: 'implement-design-tokens',
      agent: this.id,
      priority: 'high',
      category: 'design-tokens',
      title: 'Implement R6 Design Tokens',
      description: 'Use design tokens for consistent styling across components',
      implementation: {
        complexity: 'simple',
        estimatedTime: '1-2 hours',
        requirements: [
          'Define CSS custom properties',
          'Update component styles',
          'Replace hardcoded values'
        ],
        styles: `
          /* Use design tokens instead of hardcoded values */
          .component {
            colour: var(--colour-primary-500);
            padding: var(--space-4);
            border-radius: var(--radius-lg);
            font-family: var(--font-primary);
            transition: all var(--duration-normal) var(--ease-out);
          }
        `
      },
      impact: {
        userExperience: 7,
        performance: 3,
        accessibility: 5,
        maintainability: 10
      }
    })

    return recommendations
  }

  private generateCSSCustomProperties(): string {
    return `
      :root {
        /* Colours */
        --colour-primary-50: ${this.r6DesignTokens.colours.primary[50]};
        --colour-primary-500: ${this.r6DesignTokens.colours.primary[500]};
        --colour-primary-600: ${this.r6DesignTokens.colours.primary[600]};
        --colour-primary-700: ${this.r6DesignTokens.colours.primary[700]};
        
        /* Neutral Colours */
        --colour-neutral-0: ${this.r6DesignTokens.colours.neutral[0]};
        --colour-neutral-100: ${this.r6DesignTokens.colours.neutral[100]};
        --colour-neutral-500: ${this.r6DesignTokens.colours.neutral[500]};
        --colour-neutral-900: ${this.r6DesignTokens.colours.neutral[900]};
        
        /* Typography */
        --font-primary: ${this.r6DesignTokens.typography.fontFamilies.primary};
        --font-secondary: ${this.r6DesignTokens.typography.fontFamilies.secondary};
        --text-xs: ${this.r6DesignTokens.typography.fontSizes.xs};
        --text-base: ${this.r6DesignTokens.typography.fontSizes.base};
        --text-xl: ${this.r6DesignTokens.typography.fontSizes.xl};
        --text-2xl: ${this.r6DesignTokens.typography.fontSizes['2xl']};
        
        /* Spacing */
        --space-1: ${this.r6DesignTokens.spacing[1]};
        --space-2: ${this.r6DesignTokens.spacing[2]};
        --space-3: ${this.r6DesignTokens.spacing[3]};
        --space-4: ${this.r6DesignTokens.spacing[4]};
        --space-6: ${this.r6DesignTokens.spacing[6]};
        --space-8: ${this.r6DesignTokens.spacing[8]};
        
        /* Border Radius */
        --radius-base: ${this.r6DesignTokens.borderRadius.base};
        --radius-lg: ${this.r6DesignTokens.borderRadius.lg};
        --radius-xl: ${this.r6DesignTokens.borderRadius.xl};
        --radius-2xl: ${this.r6DesignTokens.borderRadius['2xl']};
        --radius-full: ${this.r6DesignTokens.borderRadius.full};
        
        /* Shadows */
        --shadow-sm: ${this.r6DesignTokens.shadows.sm};
        --shadow-base: ${this.r6DesignTokens.shadows.base};
        --shadow-lg: ${this.r6DesignTokens.shadows.lg};
        --shadow-xl: ${this.r6DesignTokens.shadows.xl};
        
        /* Animations */
        --duration-fast: ${this.r6DesignTokens.animations.durations.fast};
        --duration-normal: ${this.r6DesignTokens.animations.durations.normal};
        --duration-slow: ${this.r6DesignTokens.animations.durations.slow};
        --ease-out: ${this.r6DesignTokens.animations.easings.out};
        --ease-in-out: ${this.r6DesignTokens.animations.easings['in-out']};
      }
    `
  }

  private generateStandardizedComponent(component: any): string {
    switch (component.type) {
      case 'button':
        return `
          import { R6Button } from '@/components/ui/r6-button'
          
          const StandardizedButton = ({ children, ...props }) => (
            <R6Button 
              variant="primary"
              size="md"
              className="group"
              {...props}
            >
              {children}
            </R6Button>
          )
        `
      case 'card':
        return `
          import { R6Card, R6CardHeader, R6CardTitle, R6CardContent } from '@/components/ui/r6-card'
          
          const StandardizedCard = ({ title, children, ...props }) => (
            <R6Card 
              variant="default"
              padding="md"
              hover="lift"
              {...props}
            >
              {title && (
                <R6CardHeader>
                  <R6CardTitle>{title}</R6CardTitle>
                </R6CardHeader>
              )}
              <R6CardContent>
                {children}
              </R6CardContent>
            </R6Card>
          )
        `
      default:
        return `
          // Apply R6 styling patterns to ${component.type}
          const Standardized${component.type} = (props) => (
            <div 
              className="r6-component"
              style={{
                fontFamily: 'var(--font-secondary)',
                colour: 'var(--colour-neutral-900)',
                transition: 'all var(--duration-normal) var(--ease-out)'
              }}
              {...props}
            />
          )
        `
    }
  }

  // Analysis helper methods
  private analyzeDesignTokenUsage(element: UIElement) {
    const issues = []
    const strengths = []
    
    // Check if using CSS custom properties
    const styles = element.styles
    const usesTokens = typeof styles === 'object' && 
      JSON.stringify(styles).includes('var(--')
    
    if (usesTokens) {
      strengths.push('Uses CSS custom properties for theming')
    } else {
      issues.push({
        id: 'no-design-tokens',
        severity: 'medium' as const,
        type: 'visual' as const,
        description: 'Component does not use design tokens',
        location: element.type,
        fix: 'Replace hardcoded values with CSS custom properties',
        automated: true
      })
    }

    return { issues, strengths }
  }

  private analyzeComponentConsistency(element: UIElement) {
    const issues = []
    const strengths = []

    // Simplified consistency check
    if (element.type === 'button' || element.type === 'card') {
      strengths.push('Component follows R6 patterns')
    }

    return { issues, strengths }
  }

  private generateImplementationRecommendations(element: UIElement): Recommendation[] {
    return [
      {
        id: 'enhance-component',
        agent: this.id,
        priority: 'medium',
        category: 'enhancement',
        title: `Enhance ${element.type} Component`,
        description: `Apply R6 Digital design patterns to improve ${element.type} component`,
        implementation: {
          complexity: 'simple',
          estimatedTime: '30 minutes',
          requirements: ['Apply R6 styling', 'Add interactive states', 'Ensure accessibility']
        },
        impact: {
          userExperience: 7,
          performance: 2,
          accessibility: 5,
          maintainability: 8
        }
      }
    ]
  }

  private calculateDesignSystemAdherence(component: any): number {
    let score = 10
    
    // Deduct points for missing R6 patterns
    if (!component.styles?.base?.includes('#131cff')) score -= 2
    if (!component.styles?.base?.includes('Poppins')) score -= 1
    if (!component.variants?.length) score -= 1
    
    return Math.max(1, score)
  }

  private calculateImplementationScore(issues: any[], strengths: string[]): number {
    let score = 8 // Start with good score
    
    issues.forEach(issue => {
      switch (issue.severity) {
        case 'high': score -= 2; break
        case 'medium': score -= 1; break
        case 'low': score -= 0.5; break
      }
    })
    
    // Bonus for strengths
    score += Math.min(strengths.length * 0.3, 2)
    
    return Math.max(1, Math.min(10, score))
  }
}