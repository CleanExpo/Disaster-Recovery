/**
 * Usage Example for UI/UX Design Agent System
 * 
 * This example demonstrates how to use the comprehensive UI/UX Design Agent system
 * to analyse and improve components using the R6 Digital design system.
 */

import {
  UIDesignOrchestrator,
  OrchestrationConfig,
  OrchestrationResult
} from '../orchestrator/ui-orchestrator'

import {
  UIContext,
  UIComponent,
  ThemeConfig,
  AccessibilityConfig,
  BreakpointConfig,
  PerformanceMetrics,
  DesignSystemConfig
} from '../types/interfaces'

// Example: Improving a Button Component
async function improveButtonComponent() {
  console.log('🚀 Starting Button Component Improvement with R6 Digital Design System')
  console.log('=' .repeat(70))

  // 1. Configure the orchestrator
  const config: Partial<OrchestrationConfig> = {
    enabledAgents: [
      'visual-analyzer',
      'design-implementer',
      'responsive-optimizer',
      'animation-enhancer',
      'dark-mode-specialist',
      'accessibility-guardian'
    ],
    parallelExecution: false, // Sequential for better dependency handling
    qualityThreshold: 8.5,    // High quality threshold
    maxIterations: 2,
    conflictResolution: 'prioritize',
    performanceOptimization: true
  }

  const orchestrator = new UIDesignOrchestrator(config)

  // 2. Define the component to be improved
  const buttonComponent: UIComponent = {
    id: 'primary-button',
    name: 'Primary Button',
    type: 'button',
    props: {
      children: 'Click me',
      onClick: () => {},
      disabled: false,
      variant: 'default'
    },
    styles: {
      base: `
        padding: 12px 24px;
        background-colour: #007bff;
        colour: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
      `,
      hover: `
        background-colour: #0056b3;
      `
    },
    accessibility: {
      role: 'button'
    }
  }

  // 3. Create the UI context with R6 Digital design system
  const context: UIContext = {
    component: buttonComponent,
    designSystem: createR6DesignSystemConfig(),
    theme: createDarkThemeConfig(),
    breakpoints: createResponsiveBreakpoints(),
    accessibility: createAccessibilityConfig(),
    performance: createPerformanceMetrics(),
    userPreferences: {
      preferredColorScheme: 'dark',
      reducedMotion: false,
      highContrast: false,
      fontSize: 'medium',
      language: 'en',
      region: 'AU'
    }
  }

  try {
    // 4. Run the orchestration
    const result: OrchestrationResult = await orchestrator.orchestrate(context)

    // 5. Display results
    console.log('\n🎉 Orchestration Results:')
    console.log(`Overall Quality Score: ${result.overallScore.toFixed(1)}/10`)
    console.log(`Total Improvements: ${result.consolidatedImprovements.length}`)
    console.log(`Top Recommendations: ${result.prioritizedRecommendations.length}`)

    // 6. Show top 5 improvements
    console.log('\n🔧 Top 5 Improvements:')
    result.consolidatedImprovements.slice(0, 5).forEach((improvement, index) => {
      console.log(`${index + 1}. ${improvement.description}`)
      console.log(`   Impact: ${improvement.impact} | Effort: ${improvement.effort}`)
      console.log(`   Category: ${improvement.category}`)
      if (improvement.implementation.styles) {
        console.log(`   CSS: ${improvement.implementation.styles.split('\n')[1]?.trim() || 'See full implementation'}`)
      }
      console.log('')
    })

    // 7. Show quality breakdown
    console.log('📊 Quality Metrics Breakdown:')
    console.log(`Visual Design:     ${result.qualityMetrics.visual.toFixed(1)}/10`)
    console.log(`Responsiveness:    ${result.qualityMetrics.responsiveness.toFixed(1)}/10`)
    console.log(`Accessibility:     ${result.qualityMetrics.accessibility.toFixed(1)}/10`)
    console.log(`Animations:        ${result.qualityMetrics.animations.toFixed(1)}/10`)
    console.log(`Dark Mode:         ${result.qualityMetrics.darkMode.toFixed(1)}/10`)
    console.log(`WCAG Compliance:   ${result.qualityMetrics.wcagCompliance.toFixed(1)}/10`)

    // 8. Generate audit report
    const auditReport = await orchestrator.generateAuditReport(context)
    console.log('\n📋 Generated audit report (first 500 chars):')
    console.log(auditReport.substring(0, 500) + '...')

    return result

  } catch (error) {
    console.error('❌ Orchestration failed:', error)
    throw error
  }
}

// Example: Improving a Card Component
async function improveCardComponent() {
  console.log('\n🚀 Starting Card Component Improvement')
  console.log('=' .repeat(50))

  const orchestrator = new UIDesignOrchestrator({
    enabledAgents: ['visual-analyzer', 'design-implementer', 'dark-mode-specialist'],
    qualityThreshold: 9.0
  })

  const cardComponent: UIComponent = {
    id: 'feature-card',
    name: 'Feature Card',
    type: 'card',
    props: {
      title: 'Water Damage Restoration',
      description: 'Professional 24/7 emergency response',
      image: '/images/water-damage.jpg',
      cta: 'Learn More'
    },
    styles: {
      base: `
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      `,
      hover: `
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      `
    },
    children: []
  }

  const context: UIContext = {
    component: cardComponent,
    designSystem: createR6DesignSystemConfig(),
    theme: createDarkThemeConfig(),
    breakpoints: createResponsiveBreakpoints(),
    accessibility: createAccessibilityConfig(),
    performance: createPerformanceMetrics(),
    userPreferences: {
      preferredColorScheme: 'dark',
      reducedMotion: false,
      highContrast: false,
      fontSize: 'medium',
      language: 'en',
      region: 'AU'
    }
  }

  const result = await orchestrator.orchestrate(context)
  
  console.log(`✨ Card improvement complete! Score: ${result.overallScore.toFixed(1)}/10`)
  console.log(`Applied ${result.consolidatedImprovements.length} improvements`)

  return result
}

// Helper function to create R6 Digital design system config
function createR6DesignSystemConfig(): DesignSystemConfig {
  return {
    name: 'r6-digital',
    version: '1.0.0',
    colours: {
      primary: {
        main: '#131cff',
        hover: '#0f17cc',
        light: '#3d4bff',
        dark: '#0d14b3'
      },
      neutral: {
        50: '#ffffff',
        100: '#f0f0f0',
        200: '#eeeeee',
        300: '#c7cfdb',
        400: '#acadad',
        500: '#999a9b',
        600: '#6a6d72',
        700: '#404040',
        800: '#2a2a2a',
        900: '#000000'
      },
      semantic: {
        success: '#00a0d2',
        warning: '#ff6b35',
        error: '#e74c3c',
        info: '#131cff'
      },
      backgrounds: {
        primary: '#ffffff',
        secondary: '#f8f9fa',
        dark: '#1a1a1a',
        overlay: 'rgba(0, 0, 0, 0.8)'
      }
    },
    typography: {
      fonts: {
        primary: 'Poppins',
        secondary: 'Colfax',
        monospace: 'SF Mono'
      },
      sizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem'
      },
      weights: {
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
      32: '8rem',
      40: '10rem',
      48: '12rem'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      base: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
    },
    borders: {
      widths: {
        0: '0',
        1: '1px',
        2: '2px',
        4: '4px',
        8: '8px'
      },
      radius: {
        none: '0',
        sm: '0.125rem',
        base: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px'
      }
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    animations: {
      durations: {
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
        700: '700ms',
        1000: '1000ms'
      },
      timingFunctions: {
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      }
    }
  }
}

function createDarkThemeConfig(): ThemeConfig {
  return {
    mode: 'dark',
    primaryColor: '#131cff',
    accentColor: '#131cff',
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    preferences: {
      reducedMotion: false,
      highContrast: false,
      darkMode: true
    }
  }
}

function createResponsiveBreakpoints(): BreakpointConfig {
  return {
    mobile: 375,
    tablet: 768,
    desktop: 1024,
    widescreen: 1440
  }
}

function createAccessibilityConfig(): AccessibilityConfig {
  return {
    level: 'AA',
    features: {
      screenReader: true,
      keyboardNavigation: true,
      focusIndicators: true,
      colorContrast: true,
      reducedMotion: true,
      skipLinks: true
    },
    ariaLabels: {},
    landmarks: ['banner', 'navigation', 'main', 'complementary', 'contentinfo']
  }
}

function createPerformanceMetrics(): PerformanceMetrics {
  return {
    renderTime: 16, // 60fps
    bundleSize: 0,
    cacheHits: 0,
    memoryUsage: 0,
    frameRate: 60,
    coreWebVitals: {
      lcp: 2.5, // Largest Contentful Paint
      fid: 100, // First Input Delay
      cls: 0.1  // Cumulative Layout Shift
    }
  }
}

// Run examples
async function runExamples() {
  try {
    console.log('🎨 R6 Digital UI/UX Design Agent System - Examples')
    console.log('=' .repeat(70))
    
    // Example 1: Button improvement
    await improveButtonComponent()
    
    // Example 2: Card improvement
    await improveCardComponent()
    
    console.log('\n✅ All examples completed successfully!')
    
  } catch (error) {
    console.error('❌ Examples failed:', error)
  }
}

// Export for use in other files
export {
  improveButtonComponent,
  improveCardComponent,
  createR6DesignSystemConfig,
  createDarkThemeConfig,
  runExamples
}

// Run examples if this file is executed directly
if (require.main === module) {
  runExamples()
}