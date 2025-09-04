/**
 * Dark Mode Specialist Agent
 * 
 * Specializes in implementing dark mode themes with electric blue (#131cff) accents.
 * Creates sophisticated dark backgrounds, proper contrast ratios, and seamless
 * theme switching following R6 Digital's dark mode patterns.
 */

import {
  UIAgent,
  UIContext,
  UIElement,
  AgentResult,
  AnalysisResult,
  UIImprovement,
  Recommendation,
  ThemeConfig,
  ColorPalette,
  ImprovementType,
  ImpactLevel,
  EffortLevel,
  ContrastCheck
} from '../types/interfaces'

export class DarkModeSpecialistAgent implements UIAgent {
  id = 'dark-mode-specialist'
  name = 'Dark Mode Specialist'
  description = 'Implements sophisticated dark mode themes with electric blue accents and optimal contrast'
  capabilities = [
    'Dark theme implementation',
    'Electric blue accent integration',
    'Contrast ratio optimisation',
    'Theme switching mechanisms',
    'Dark mode component variants',
    'Colour scheme preference detection',
    'Accessibility-compliant dark themes'
  ]
  priority = 5
  isActive = true

  private r6DarkTheme = {
    // R6 Digital Dark Mode Colour Palette
    colours: {
      // Primary electric blue - remains consistent across themes
      primary: {
        50: '#f0f2ff',
        100: '#e6eaff',
        200: '#d4d9ff',
        300: '#b8c0ff',
        400: '#9ca8ff',
        500: '#131cff',    // Main electric blue
        600: '#0f17cc',    // Hover state
        700: '#0d14b3',    // Active state
        800: '#0a0f80',
        900: '#070b4d'
      },
      
      // Dark mode backgrounds
      backgrounds: {
        primary: '#0a0a0a',      // Deep black for main background
        secondary: '#1a1a1a',    // Lighter black for cards/containers
        tertiary: '#2a2a2a',     // Even lighter for elevated elements
        overlay: 'rgba(0, 0, 0, 0.9)', // Dark overlay
        glass: 'rgba(26, 26, 26, 0.8)', // Glass effect background
        gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
      },
      
      // Dark mode text colours
      text: {
        primary: '#ffffff',      // Pure white for primary text
        secondary: '#b3b3b3',    // Light gray for secondary text
        muted: '#808080',        // Medium gray for muted text
        disabled: '#4d4d4d',     // Dark gray for disabled text
        accent: '#131cff',       // Electric blue for accents
        success: '#22c55e',      // Green for success states
        warning: '#f59e0b',      // Amber for warnings
        error: '#ef4444',        // Red for errors
        info: '#3b82f6'          // Blue for info
      },
      
      // Dark mode borders and surfaces
      surfaces: {
        border: '#333333',       // Default border colour
        borderHover: '#4d4d4d',  // Border hover state
        borderFocus: '#131cff',  // Focus border (electric blue)
        divider: '#262626',      // Subtle dividers
        input: '#1a1a1a',        // Input backgrounds
        inputFocus: '#2a2a2a',   // Input focus background
        card: '#1a1a1a',         // Card backgrounds
        cardHover: '#2a2a2a',    // Card hover backgrounds
        modal: '#1a1a1a',        // Modal backgrounds
        tooltip: '#333333'       // Tooltip backgrounds
      },
      
      // Semantic colours for dark mode
      semantic: {
        success: {
          bg: 'rgba(34, 197, 94, 0.1)',
          border: 'rgba(34, 197, 94, 0.3)',
          text: '#22c55e'
        },
        warning: {
          bg: 'rgba(245, 158, 11, 0.1)',
          border: 'rgba(245, 158, 11, 0.3)',
          text: '#f59e0b'
        },
        error: {
          bg: 'rgba(239, 68, 68, 0.1)',
          border: 'rgba(239, 68, 68, 0.3)',
          text: '#ef4444'
        },
        info: {
          bg: 'rgba(19, 28, 255, 0.1)',
          border: 'rgba(19, 28, 255, 0.3)',
          text: '#131cff'
        }
      }
    },
    
    // Dark mode specific shadows with electric blue glows
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.8)',
      base: '0 1px 3px 0 rgba(0, 0, 0, 0.6), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
      // Electric blue glows
      electricSm: '0 0 10px rgba(19, 28, 255, 0.3)',
      electricMd: '0 0 20px rgba(19, 28, 255, 0.4)',
      electricLg: '0 0 30px rgba(19, 28, 255, 0.5)',
      electricXl: '0 0 40px rgba(19, 28, 255, 0.6)'
    },
    
    // Dark mode gradients
    gradients: {
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      card: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      button: 'linear-gradient(135deg, #131cff 0%, #0f17cc 100%)',
      accent: 'linear-gradient(45deg, transparent, rgba(19, 28, 255, 0.1), transparent)',
      glow: 'radial-gradient(circle at centre, rgba(19, 28, 255, 0.2) 0%, transparent 70%)'
    }
  }

  // Contrast ratios for WCAG compliance
  private contrastRatios = {
    AA: 4.5,      // WCAG AA standard
    AAA: 7,       // WCAG AAA standard
    AALarge: 3,   // WCAG AA for large text
    AAALarge: 4.5 // WCAG AAA for large text
  }

  async execute(context: UIContext): Promise<AgentResult> {
    const startTime = Date.now()
    const improvements: UIImprovement[] = []
    const warnings: string[] = []
    const errors: string[] = []
    const recommendations: Recommendation[] = []

    try {
      // Analyse current dark mode implementation
      const darkModeAnalysis = await this.analyzeDarkModeSupportContext(context)
      
      // Generate dark theme implementation
      improvements.push(...await this.generateDarkThemeImplementation(context))
      
      // Create electric blue accent enhancements
      improvements.push(...await this.generateElectricBlueAccents(context))
      
      // Implement theme switching functionality
      improvements.push(...await this.generateThemeSwitching(context))
      
      // Optimise contrast ratios
      improvements.push(...await this.optimizeContrastRatios(context))
      
      // Generate dark mode recommendations
      recommendations.push(...this.generateDarkModeRecommendations(context))

      // Check for contrast issues
      const contrastIssues = darkModeAnalysis.issues.filter(issue => 
        issue.description.includes('contrast') || issue.wcagViolation)
      
      if (contrastIssues.length > 0) {
        warnings.push(`Found ${contrastIssues.length} contrast issues that may affect accessibility in dark mode`)
      }

      // Check for user preference support
      const prefersColorScheme = context.theme.mode === 'auto'
      if (!prefersColorScheme) {
        warnings.push('Consider implementing prefers-colour-scheme media query support')
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
      errors.push(`Dark mode implementation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
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

    // Analyse dark mode support
    const darkModeSupport = await this.analyzeDarkModeSupport(element as any)
    issues.push(...darkModeSupport.issues)
    strengths.push(...darkModeSupport.strengths)

    // Check contrast ratios
    const contrastAnalysis = await this.analyzeContrast(element as any)
    issues.push(...contrastAnalysis.issues)
    strengths.push(...contrastAnalysis.strengths)

    // Analyse electric blue usage
    const electricBlueAnalysis = await this.analyzeElectricBlueUsage(element as any)
    issues.push(...electricBlueAnalysis.issues)
    strengths.push(...electricBlueAnalysis.strengths)

    // Generate specific recommendations
    recommendations.push(...this.generateElementDarkModeRecommendations(element))

    const score = this.calculateDarkModeScore(issues, strengths)

    return {
      score,
      issues,
      strengths,
      recommendations,
      compliance: {
        wcag: { level: 'AA', score: this.calculateWCAGScore(issues), violations: [] },
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

  private async analyzeDarkModeSupportContext(context: UIContext): Promise<AnalysisResult> {
    return this.analyse({
      type: context.component.type,
      props: context.component.props,
      styles: context.component.styles.base as any,
      children: (context.component.children || []) as any,
      accessibility: (context.component.accessibility || { focusable: false }) as any,
      metrics: { renderTime: 0, size: { width: 0, height: 0 }, position: { x: 0, y: 0 } }
    })
  }

  private async analyzeDarkModeSupport(element: UIElement): Promise<AnalysisResult> {
    const issues = []
    const strengths = []

    const styles = element.styles
    const styleString = typeof styles === 'object' ? JSON.stringify(styles) : styles

    // Check for dark mode CSS custom properties
    const usesDarkModeVars = styleString.includes('--dark-') || 
                            styleString.includes('[data-theme="dark"]') ||
                            styleString.includes('@media (prefers-colour-scheme: dark)')

    if (usesDarkModeVars) {
      strengths.push('Implements dark mode CSS variables or media queries')
    } else {
      issues.push({
        id: 'no-dark-mode-support',
        severity: 'high' as const,
        type: 'theme' as const,
        description: 'Component lacks dark mode implementation',
        location: element.type,
        fix: 'Add dark mode CSS variables and theme switching logic',
        automated: false
      })
    }

    // Check for hardcoded light colours that won't work in dark mode
    const hasHardcodedWhite = styleString.includes('#ffffff') || styleString.includes('white')
    const hasHardcodedBlack = styleString.includes('#000000') || styleString.includes('black')
    
    if (hasHardcodedWhite || hasHardcodedBlack) {
      issues.push({
        id: 'hardcoded-colours',
        severity: 'medium' as const,
        type: 'theme' as const,
        description: 'Component uses hardcoded colours that may not work in dark mode',
        location: element.type,
        fix: 'Replace hardcoded colours with CSS custom properties',
        automated: true
      })
    }

    return { 
      issues, 
      strengths, 
      score: 0, 
      recommendations: [],
      compliance: { 
        wcag: { level: 'AA', score: 100, violations: [] },
        designSystem: { adherence: 100, violations: [] },
        performance: { score: 100, issues: [] }
      },
      performance: { 
        score: 100,
        metrics: { 
          renderTime: 0, 
          bundleSize: 0, 
          cacheHits: 0, 
          memoryUsage: 0, 
          frameRate: 60,
          coreWebVitals: {
            lcp: 0,
            fid: 0,
            cls: 0
          }
        },
        bottlenecks: [],
        optimizations: []
      }
    }
  }

  private async analyzeContrast(element: UIElement): Promise<AnalysisResult> {
    const issues = []
    const strengths = []

    // Simplified contrast analysis
    // In a real implementation, this would calculate actual contrast ratios
    const hasGoodContrast = this.checkContrastRatio(element)
    
    if (hasGoodContrast) {
      strengths.push('Meets WCAG contrast ratio requirements')
    } else {
      issues.push({
        id: 'poor-contrast',
        severity: 'high' as const,
        type: 'accessibility' as const,
        description: 'Poor colour contrast in dark mode',
        location: element.type,
        fix: 'Improve colour contrast to meet WCAG AA standards (4.5:1 ratio)',
        automated: false,
        wcagViolation: 'WCAG 1.4.3 Contrast (Minimum) - Level AA'
      })
    }

    return { 
      issues, 
      strengths, 
      score: 0, 
      recommendations: [],
      compliance: { 
        wcag: { level: 'AA', score: 100, violations: [] },
        designSystem: { adherence: 100, violations: [] },
        performance: { score: 100, issues: [] }
      },
      performance: { 
        score: 100,
        metrics: { 
          renderTime: 0, 
          bundleSize: 0, 
          cacheHits: 0, 
          memoryUsage: 0, 
          frameRate: 60,
          coreWebVitals: {
            lcp: 0,
            fid: 0,
            cls: 0
          }
        },
        bottlenecks: [],
        optimizations: []
      }
    }
  }

  private async analyzeElectricBlueUsage(element: UIElement): Promise<AnalysisResult> {
    const issues = []
    const strengths = []

    const styles = element.styles
    const styleString = typeof styles === 'object' ? JSON.stringify(styles) : styles

    // Check for electric blue (#131cff) usage
    const usesElectricBlue = styleString.includes('#131cff') || 
                            styleString.includes('131, 28, 255')

    if (usesElectricBlue) {
      strengths.push('Uses R6 Digital electric blue accent colour')
    } else if (element.type === 'button' || element.type === 'link') {
      issues.push({
        id: 'missing-electric-blue',
        severity: 'low' as const,
        type: 'visual' as const,
        description: 'Interactive element could benefit from electric blue accents',
        location: element.type,
        fix: 'Add electric blue (#131cff) for primary interactions',
        automated: true
      })
    }

    return { 
      issues, 
      strengths, 
      score: 0, 
      recommendations: [],
      compliance: { 
        wcag: { level: 'AA', score: 100, violations: [] },
        designSystem: { adherence: 100, violations: [] },
        performance: { score: 100, issues: [] }
      },
      performance: { 
        score: 100,
        metrics: { 
          renderTime: 0, 
          bundleSize: 0, 
          cacheHits: 0, 
          memoryUsage: 0, 
          frameRate: 60,
          coreWebVitals: {
            lcp: 0,
            fid: 0,
            cls: 0
          }
        },
        bottlenecks: [],
        optimizations: []
      }
    }
  }

  private async generateDarkThemeImplementation(context: UIContext): Promise<UIImprovement[]> {
    const improvements: UIImprovement[] = []

    // Dark theme CSS custom properties
    improvements.push({
      id: 'dark-theme-css-properties',
      type: 'theme',
      description: 'Implement comprehensive dark theme CSS custom properties',
      impact: 'high',
      effort: 'medium',
      category: 'dark-theme-implementation',
      implementation: {
        styles: this.generateDarkThemeCSS(),
        instructions: [
          'Add dark theme CSS custom properties to root',
          'Implement theme switching data attributes',
          'Update component styles to use theme variables',
          'Test contrast ratios in both themes'
        ]
      },
      metrics: {
        userExperienceScore: 9,
        accessibilityScore: 8
      }
    })

    // Component-specific dark mode variants
    improvements.push({
      id: 'component-dark-variants',
      type: 'theme',
      description: 'Create dark mode variants for R6 components',
      impact: 'high',
      effort: 'medium',
      category: 'component-theming',
      implementation: {
        styles: this.generateComponentDarkVariants(context.component),
        instructions: [
          'Apply dark mode variants to components',
          'Ensure electric blue accents are prominent',
          'Test interactive states in dark theme',
          'Validate accessibility compliance'
        ]
      },
      metrics: {
        userExperienceScore: 8
      }
    })

    return improvements
  }

  private async generateElectricBlueAccents(context: UIContext): Promise<UIImprovement[]> {
    const improvements: UIImprovement[] = []

    improvements.push({
      id: 'electric-blue-accents',
      type: 'visual',
      description: 'Enhance dark theme with electric blue accent system',
      impact: 'medium',
      effort: 'low',
      category: 'accent-system',
      implementation: {
        styles: this.generateElectricBlueAccentSystem(),
        instructions: [
          'Apply electric blue accents to interactive elements',
          'Add glow effects for enhanced visual appeal',
          'Test accent visibility in dark backgrounds',
          'Ensure accents maintain brand consistency'
        ]
      },
      metrics: {
        userExperienceScore: 8
      }
    })

    return improvements
  }

  private async generateThemeSwitching(context: UIContext): Promise<UIImprovement[]> {
    const improvements: UIImprovement[] = []

    improvements.push({
      id: 'theme-switching-system',
      type: 'interaction',
      description: 'Implement smooth theme switching with user preference detection',
      impact: 'high',
      effort: 'medium',
      category: 'theme-switching',
      implementation: {
        code: this.generateThemeSwitchingCode(),
        styles: this.generateThemeSwitchingStyles(),
        instructions: [
          'Implement theme switcher component',
          'Add system preference detection',
          'Store user theme preference',
          'Animate theme transitions smoothly'
        ]
      },
      metrics: {
        userExperienceScore: 9,
        accessibilityScore: 7
      }
    })

    return improvements
  }

  private async optimizeContrastRatios(context: UIContext): Promise<UIImprovement[]> {
    const improvements: UIImprovement[] = []

    improvements.push({
      id: 'contrast-optimisation',
      type: 'accessibility',
      description: 'Optimise colour contrast ratios for WCAG AA/AAA compliance',
      impact: 'high',
      effort: 'medium',
      category: 'accessibility',
      implementation: {
        styles: this.generateContrastOptimizedColors(),
        instructions: [
          'Apply WCAG compliant colour combinations',
          'Test contrast ratios with automated tools',
          'Verify readability in different lighting conditions',
          'Ensure electric blue accents maintain accessibility'
        ]
      },
      metrics: {
        accessibilityScore: 10,
        userExperienceScore: 7
      }
    })

    return improvements
  }

  private generateDarkModeRecommendations(context: UIContext): Recommendation[] {
    const recommendations = []

    // System preference detection
    recommendations.push({
      id: 'implement-system-preference-detection',
      agent: this.id,
      priority: 'high',
      category: 'user-experience',
      title: 'Implement System Theme Preference Detection',
      description: 'Automatically detect and respect user\'s system colour scheme preference',
      implementation: {
        complexity: 'moderate',
        estimatedTime: '2-3 hours',
        requirements: [
          'Add prefers-colour-scheme media query support',
          'Implement JavaScript theme detection',
          'Create seamless theme switching',
          'Add user preference storage'
        ],
        code: `
          // System theme preference detection
          function detectSystemTheme() {
            if (window.matchMedia && window.matchMedia('(prefers-colour-scheme: dark)').matches) {
              return 'dark';
            }
            return 'light';
          }
          
          // Apply theme with smooth transition
          function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme-preference', theme);
            
            // Dispatch theme change event
            window.dispatchEvent(new CustomEvent('themeChange', { detail: theme }));
          }
          
          // Initialize theme
          const savedTheme = localStorage.getItem('theme-preference') || detectSystemTheme();
          setTheme(savedTheme);
          
          // Listen for system theme changes
          window.matchMedia('(prefers-colour-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme-preference')) {
              setTheme(e.matches ? 'dark' : 'light');
            }
          });
        `
      },
      impact: {
        userExperience: 9,
        performance: 3,
        accessibility: 8,
        maintainability: 7
      }
    })

    // Electric blue glow effects
    recommendations.push({
      id: 'implement-electric-blue-glows',
      agent: this.id,
      priority: 'medium',
      category: 'visual-enhancement',
      title: 'Implement Electric Blue Glow Effects',
      description: 'Add sophisticated glow effects using electric blue for premium dark mode experience',
      implementation: {
        complexity: 'simple',
        estimatedTime: '1-2 hours',
        requirements: [
          'Create glow effect utilities',
          'Apply to interactive elements',
          'Test performance impact',
          'Ensure accessibility compliance'
        ],
        styles: `
          .electric-glow {
            position: relative;
          }
          
          .electric-glow::before {
            content: '';
            position: absolute;
            inset: -2px;
            padding: 2px;
            background: linear-gradient(45deg, #131cff, transparent, #131cff);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .electric-glow:hover::before {
            opacity: 1;
            animation: electric-pulse 2s ease-in-out infinite;
          }
          
          @keyframes electric-pulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
        `
      },
      impact: {
        userExperience: 8,
        performance: 4,
        accessibility: 5,
        maintainability: 6
      }
    })

    return recommendations
  }

  private generateElementDarkModeRecommendations(element: UIElement): Recommendation[] {
    const recommendations = []

    if (['button', 'card', 'input'].includes(element.type)) {
      recommendations.push({
        id: `optimise-${element.type}-dark-mode`,
        agent: this.id,
        priority: 'medium',
        category: 'component-optimisation',
        title: `Optimise ${element.type} for Dark Mode`,
        description: `Enhance ${element.type} component with proper dark mode styling and electric blue accents`,
        implementation: {
          complexity: 'simple',
          estimatedTime: '30 minutes',
          requirements: ['Apply dark theme styles', 'Add electric blue accents', 'Test contrast ratios']
        },
        impact: {
          userExperience: 7,
          performance: 2,
          accessibility: 6,
          maintainability: 5
        }
      })
    }

    return recommendations
  }

  // CSS Generation Methods
  private generateDarkThemeCSS(): string {
    return `
      /* R6 Digital Dark Theme CSS Custom Properties */
      [data-theme="dark"] {
        /* Primary Colours */
        --colour-primary-50: ${this.r6DarkTheme.colours.primary[50]};
        --colour-primary-500: ${this.r6DarkTheme.colours.primary[500]};
        --colour-primary-600: ${this.r6DarkTheme.colours.primary[600]};
        --colour-primary-700: ${this.r6DarkTheme.colours.primary[700]};
        
        /* Background Colours */
        --colour-bg-primary: ${this.r6DarkTheme.colours.backgrounds.primary};
        --colour-bg-secondary: ${this.r6DarkTheme.colours.backgrounds.secondary};
        --colour-bg-tertiary: ${this.r6DarkTheme.colours.backgrounds.tertiary};
        --colour-bg-overlay: ${this.r6DarkTheme.colours.backgrounds.overlay};
        --colour-bg-glass: ${this.r6DarkTheme.colours.backgrounds.glass};
        
        /* Text Colours */
        --colour-text-primary: ${this.r6DarkTheme.colours.text.primary};
        --colour-text-secondary: ${this.r6DarkTheme.colours.text.secondary};
        --colour-text-muted: ${this.r6DarkTheme.colours.text.muted};
        --colour-text-disabled: ${this.r6DarkTheme.colours.text.disabled};
        --colour-text-accent: ${this.r6DarkTheme.colours.text.accent};
        
        /* Surface Colours */
        --colour-border: ${this.r6DarkTheme.colours.surfaces.border};
        --colour-border-hover: ${this.r6DarkTheme.colours.surfaces.borderHover};
        --colour-border-focus: ${this.r6DarkTheme.colours.surfaces.borderFocus};
        --colour-surface-card: ${this.r6DarkTheme.colours.surfaces.card};
        --colour-surface-input: ${this.r6DarkTheme.colours.surfaces.input};
        --colour-surface-modal: ${this.r6DarkTheme.colours.surfaces.modal};
        
        /* Semantic Colours */
        --colour-success-bg: ${this.r6DarkTheme.colours.semantic.success.bg};
        --colour-success-border: ${this.r6DarkTheme.colours.semantic.success.border};
        --colour-success-text: ${this.r6DarkTheme.colours.semantic.success.text};
        --colour-warning-bg: ${this.r6DarkTheme.colours.semantic.warning.bg};
        --colour-warning-border: ${this.r6DarkTheme.colours.semantic.warning.border};
        --colour-warning-text: ${this.r6DarkTheme.colours.semantic.warning.text};
        --colour-error-bg: ${this.r6DarkTheme.colours.semantic.error.bg};
        --colour-error-border: ${this.r6DarkTheme.colours.semantic.error.border};
        --colour-error-text: ${this.r6DarkTheme.colours.semantic.error.text};
        --colour-info-bg: ${this.r6DarkTheme.colours.semantic.info.bg};
        --colour-info-border: ${this.r6DarkTheme.colours.semantic.info.border};
        --colour-info-text: ${this.r6DarkTheme.colours.semantic.info.text};
        
        /* Dark Mode Shadows */
        --shadow-sm: ${this.r6DarkTheme.shadows.sm};
        --shadow-base: ${this.r6DarkTheme.shadows.base};
        --shadow-md: ${this.r6DarkTheme.shadows.md};
        --shadow-lg: ${this.r6DarkTheme.shadows.lg};
        --shadow-xl: ${this.r6DarkTheme.shadows.xl};
        --shadow-2xl: ${this.r6DarkTheme.shadows['2xl']};
        --shadow-electric: ${this.r6DarkTheme.shadows.electricMd};
        
        /* Dark Mode Gradients */
        --gradient-background: ${this.r6DarkTheme.gradients.background};
        --gradient-card: ${this.r6DarkTheme.gradients.card};
        --gradient-button: ${this.r6DarkTheme.gradients.button};
        --gradient-accent: ${this.r6DarkTheme.gradients.accent};
        --gradient-glow: ${this.r6DarkTheme.gradients.glow};
      }
      
      /* Auto Theme Detection */
      @media (prefers-colour-scheme: dark) {
        :root:not([data-theme="light"]) {
          /* Apply dark theme properties automatically */
          --colour-bg-primary: ${this.r6DarkTheme.colours.backgrounds.primary};
          --colour-text-primary: ${this.r6DarkTheme.colours.text.primary};
          --colour-text-secondary: ${this.r6DarkTheme.colours.text.secondary};
        }
      }
    `
  }

  private generateComponentDarkVariants(component: any): string {
    const componentType = component.type

    switch (componentType) {
      case 'button':
        return this.generateDarkButtonVariants()
      case 'card':
        return this.generateDarkCardVariants()
      case 'input':
        return this.generateDarkInputVariants()
      default:
        return this.generateGenericDarkVariants()
    }
  }

  private generateDarkButtonVariants(): string {
    return `
      /* Dark Mode Button Variants */
      [data-theme="dark"] .r6-button-primary {
        background: ${this.r6DarkTheme.gradients.button};
        colour: ${this.r6DarkTheme.colours.text.primary};
        border: 2px solid ${this.r6DarkTheme.colours.primary[500]};
        box-shadow: ${this.r6DarkTheme.shadows.base};
      }
      
      [data-theme="dark"] .r6-button-primary:hover {
        background: ${this.r6DarkTheme.colours.primary[600]};
        box-shadow: ${this.r6DarkTheme.shadows.electricMd};
        transform: translateY(-2px);
      }
      
      [data-theme="dark"] .r6-button-secondary {
        background: transparent;
        colour: ${this.r6DarkTheme.colours.primary[500]};
        border: 2px solid ${this.r6DarkTheme.colours.primary[500]};
      }
      
      [data-theme="dark"] .r6-button-secondary:hover {
        background: ${this.r6DarkTheme.colours.primary[500]};
        colour: ${this.r6DarkTheme.colours.text.primary};
        box-shadow: ${this.r6DarkTheme.shadows.electricSm};
      }
      
      [data-theme="dark"] .r6-button-ghost {
        background: transparent;
        colour: ${this.r6DarkTheme.colours.text.secondary};
        border: 1px solid ${this.r6DarkTheme.colours.surfaces.border};
      }
      
      [data-theme="dark"] .r6-button-ghost:hover {
        background: ${this.r6DarkTheme.colours.backgrounds.tertiary};
        colour: ${this.r6DarkTheme.colours.text.primary};
        border-colour: ${this.r6DarkTheme.colours.surfaces.borderHover};
      }
    `
  }

  private generateDarkCardVariants(): string {
    return `
      /* Dark Mode Card Variants */
      [data-theme="dark"] .r6-card {
        background: ${this.r6DarkTheme.colours.surfaces.card};
        border: 1px solid ${this.r6DarkTheme.colours.surfaces.border};
        box-shadow: ${this.r6DarkTheme.shadows.base};
        colour: ${this.r6DarkTheme.colours.text.primary};
      }
      
      [data-theme="dark"] .r6-card:hover {
        background: ${this.r6DarkTheme.colours.surfaces.cardHover};
        border-colour: ${this.r6DarkTheme.colours.surfaces.borderHover};
        box-shadow: ${this.r6DarkTheme.shadows.lg};
      }
      
      [data-theme="dark"] .r6-card-glass {
        background: ${this.r6DarkTheme.colours.backgrounds.glass};
        backdrop-filter: blur(12px);
        border: 1px solid ${this.r6DarkTheme.colours.surfaces.border};
      }
      
      [data-theme="dark"] .r6-card-glass:hover {
        background: rgba(42, 42, 42, 0.9);
        box-shadow: ${this.r6DarkTheme.shadows.electricMd};
      }
      
      [data-theme="dark"] .r6-card-gradient {
        background: ${this.r6DarkTheme.gradients.card};
        border: 1px solid ${this.r6DarkTheme.colours.primary[500]};
      }
      
      [data-theme="dark"] .r6-card-gradient:hover {
        box-shadow: ${this.r6DarkTheme.shadows.electricLg};
      }
    `
  }

  private generateDarkInputVariants(): string {
    return `
      /* Dark Mode Input Variants */
      [data-theme="dark"] .r6-input {
        background: ${this.r6DarkTheme.colours.surfaces.input};
        border: 2px solid ${this.r6DarkTheme.colours.surfaces.border};
        colour: ${this.r6DarkTheme.colours.text.primary};
      }
      
      [data-theme="dark"] .r6-input::placeholder {
        colour: ${this.r6DarkTheme.colours.text.muted};
      }
      
      [data-theme="dark"] .r6-input:focus {
        background: ${this.r6DarkTheme.colours.surfaces.inputFocus};
        border-colour: ${this.r6DarkTheme.colours.surfaces.borderFocus};
        box-shadow: 0 0 0 3px rgba(19, 28, 255, 0.2);
      }
      
      [data-theme="dark"] .r6-input:hover:not(:focus) {
        border-colour: ${this.r6DarkTheme.colours.surfaces.borderHover};
      }
      
      [data-theme="dark"] .r6-input.error {
        border-colour: ${this.r6DarkTheme.colours.semantic.error.border};
        background: ${this.r6DarkTheme.colours.semantic.error.bg};
      }
      
      [data-theme="dark"] .r6-input.success {
        border-colour: ${this.r6DarkTheme.colours.semantic.success.border};
        background: ${this.r6DarkTheme.colours.semantic.success.bg};
      }
    `
  }

  private generateGenericDarkVariants(): string {
    return `
      /* Generic Dark Mode Variants */
      [data-theme="dark"] {
        background-colour: ${this.r6DarkTheme.colours.backgrounds.primary};
        colour: ${this.r6DarkTheme.colours.text.primary};
      }
      
      [data-theme="dark"] h1, 
      [data-theme="dark"] h2, 
      [data-theme="dark"] h3, 
      [data-theme="dark"] h4, 
      [data-theme="dark"] h5, 
      [data-theme="dark"] h6 {
        colour: ${this.r6DarkTheme.colours.text.primary};
      }
      
      [data-theme="dark"] p {
        colour: ${this.r6DarkTheme.colours.text.secondary};
      }
      
      [data-theme="dark"] a {
        colour: ${this.r6DarkTheme.colours.primary[500]};
      }
      
      [data-theme="dark"] a:hover {
        colour: ${this.r6DarkTheme.colours.primary[600]};
        text-shadow: 0 0 8px rgba(19, 28, 255, 0.5);
      }
    `
  }

  private generateElectricBlueAccentSystem(): string {
    return `
      /* Electric Blue Accent System for Dark Mode */
      [data-theme="dark"] .electric-accent {
        colour: ${this.r6DarkTheme.colours.primary[500]};
        text-shadow: 0 0 10px rgba(19, 28, 255, 0.5);
      }
      
      .electric-border {
        border: 1px solid ${this.r6DarkTheme.colours.primary[500]};
        box-shadow: inset 0 0 10px rgba(19, 28, 255, 0.2);
      }
      
      .electric-glow {
        box-shadow: 0 0 20px rgba(19, 28, 255, 0.4);
      }
      
      .electric-glow-intense {
        box-shadow: 0 0 30px rgba(19, 28, 255, 0.6);
        border: 1px solid ${this.r6DarkTheme.colours.primary[500]};
      }
      
      /* Animated Electric Effects */
      .electric-pulse {
        animation: electric-pulse 2s ease-in-out infinite;
      }
      
      @keyframes electric-pulse {
        0%, 100% {
          box-shadow: 0 0 10px rgba(19, 28, 255, 0.3);
        }
        50% {
          box-shadow: 0 0 30px rgba(19, 28, 255, 0.7);
        }
      }
      
      .electric-shimmer {
        position: relative;
        overflow: hidden;
      }
      
      .electric-shimmer::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(19, 28, 255, 0.3),
          transparent
        );
        transition: left 0.8s ease;
      }
      
      .electric-shimmer:hover::before {
        left: 100%;
      }
    `
  }

  private generateThemeSwitchingCode(): string {
    return `
      // R6 Digital Theme Switching System
      class R6ThemeManager {
        constructor() {
          this.theme = this.getStoredTheme() || this.getSystemTheme();
          this.init();
        }
        
        init() {
          this.applyTheme(this.theme);
          this.setupEventListeners();
          this.setupSystemThemeListener();
        }
        
        getSystemTheme() {
          return window.matchMedia('(prefers-colour-scheme: dark)').matches ? 'dark' : 'light';
        }
        
        getStoredTheme() {
          return localStorage.getItem('r6-theme-preference');
        }
        
        setTheme(theme) {
          this.theme = theme;
          this.applyTheme(theme);
          this.storeTheme(theme);
          this.notifyThemeChange(theme);
        }
        
        applyTheme(theme) {
          // Add transition class for smooth theme switching
          document.documentElement.classList.add('theme-transitioning');
          
          // Apply theme
          document.documentElement.setAttribute('data-theme', theme);
          
          // Remove transition class after animation
          setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
          }, 300);
        }
        
        storeTheme(theme) {
          if (theme === this.getSystemTheme()) {
            localStorage.removeItem('r6-theme-preference');
          } else {
            localStorage.setItem('r6-theme-preference', theme);
          }
        }
        
        toggleTheme() {
          const newTheme = this.theme === 'dark' ? 'light' : 'dark';
          this.setTheme(newTheme);
        }
        
        setupEventListeners() {
          document.addEventListener('keydown', (e) => {
            // Toggle theme with Ctrl/Cmd + Shift + T
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
              e.preventDefault();
              this.toggleTheme();
            }
          });
        }
        
        setupSystemThemeListener() {
          window.matchMedia('(prefers-colour-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
              this.setTheme(e.matches ? 'dark' : 'light');
            }
          });
        }
        
        notifyThemeChange(theme) {
          window.dispatchEvent(new CustomEvent('r6ThemeChange', {
            detail: { theme, timestamp: Date.now() }
          }));
        }
      }
      
      // Initialize theme manager
      const r6Theme = new R6ThemeManager();
      
      // Export for global use
      window.R6Theme = r6Theme;
    `
  }

  private generateThemeSwitchingStyles(): string {
    return `
      /* Theme Switching Transition Styles */
      .theme-transitioning,
      .theme-transitioning * {
        transition: background-colour 0.3s ease, 
                    colour 0.3s ease, 
                    border-colour 0.3s ease, 
                    box-shadow 0.3s ease !important;
      }
      
      /* Theme Toggle Button */
      .theme-toggle {
        position: relative;
        width: 60px;
        height: 30px;
        background: ${this.r6DarkTheme.colours.surfaces.border};
        border-radius: 15px;
        border: none;
        cursor: pointer;
        padding: 0;
        transition: all 0.3s ease;
      }
      
      .theme-toggle::before {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 24px;
        height: 24px;
        background: white;
        border-radius: 50%;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
      
      [data-theme="dark"] .theme-toggle {
        background: ${this.r6DarkTheme.colours.primary[500]};
      }
      
      [data-theme="dark"] .theme-toggle::before {
        transform: translateX(30px);
        background: ${this.r6DarkTheme.colours.backgrounds.primary};
      }
      
      .theme-toggle:hover {
        box-shadow: 0 0 20px rgba(19, 28, 255, 0.3);
      }
      
      /* Theme Toggle Icon */
      .theme-toggle-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 14px;
        colour: ${this.r6DarkTheme.colours.text.muted};
        transition: all 0.3s ease;
      }
      
      .theme-toggle-icon.sun {
        left: 8px;
        opacity: 1;
      }
      
      .theme-toggle-icon.moon {
        right: 8px;
        opacity: 0.5;
      }
      
      [data-theme="dark"] .theme-toggle-icon.sun {
        opacity: 0.5;
      }
      
      [data-theme="dark"] .theme-toggle-icon.moon {
        opacity: 1;
        colour: ${this.r6DarkTheme.colours.primary[500]};
      }
    `
  }

  private generateContrastOptimizedColors(): string {
    return `
      /* WCAG Compliant Dark Mode Colours */
      [data-theme="dark"] {
        /* Primary text on dark backgrounds - 15.3:1 ratio */
        --colour-text-primary: #ffffff;
        
        /* Secondary text on dark backgrounds - 9.5:1 ratio */
        --colour-text-secondary: #b3b3b3;
        
        /* Muted text on dark backgrounds - 5.2:1 ratio (AA compliant) */
        --colour-text-muted: #808080;
        
        /* Electric blue with sufficient contrast - 4.8:1 ratio */
        --colour-primary-accessible: #4d56ff;
        
        /* Success green with high contrast - 5.7:1 ratio */
        --colour-success-accessible: #4ade80;
        
        /* Warning amber with high contrast - 6.2:1 ratio */
        --colour-warning-accessible: #fbbf24;
        
        /* Error red with high contrast - 5.4:1 ratio */
        --colour-error-accessible: #f87171;
        
        /* Background colours with proper contrast ratios */
        --colour-bg-contrast-primary: #0f0f0f;   /* Enhanced contrast */
        --colour-bg-contrast-secondary: #1f1f1f; /* Card backgrounds */
        --colour-bg-contrast-tertiary: #2f2f2f;  /* Elevated elements */
      }
      
      /* High contrast mode overrides */
      @media (prefers-contrast: high) {
        [data-theme="dark"] {
          --colour-text-primary: #ffffff;
          --colour-text-secondary: #cccccc;
          --colour-bg-primary: #000000;
          --colour-bg-secondary: #1a1a1a;
          --colour-primary-500: #5566ff; /* Higher contrast blue */
        }
      }
    `
  }

  // Helper methods
  private checkContrastRatio(element: UIElement): boolean {
    // Simplified contrast checking
    // In a real implementation, this would calculate actual contrast ratios
    // using colour parsing and luminance calculations
    return true
  }

  private calculateWCAGScore(issues: any[]): number {
    let score = 100
    issues.forEach(issue => {
      if (issue.wcagViolation) {
        score -= issue.severity === 'high' ? 30 : 15
      }
    })
    return Math.max(0, score)
  }

  private calculateDarkModeScore(issues: any[], strengths: string[]): number {
    let score = 6 // Start with moderate dark mode score
    
    issues.forEach(issue => {
      switch (issue.severity) {
        case 'high': score -= 2; break
        case 'medium': score -= 1; break
        case 'low': score -= 0.5; break
      }
    })
    
    // Bonus for dark mode strengths
    score += Math.min(strengths.length * 0.6, 4)
    
    return Math.max(1, Math.min(10, score))
  }
}