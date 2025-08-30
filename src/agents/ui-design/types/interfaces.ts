/**
 * Core interfaces and types for the UI/UX Design Agent System
 */

// Base agent interface
export interface UIAgent {
  id: string
  name: string
  description: string
  capabilities: string[]
  priority: number
  isActive: boolean
  execute(context: UIContext): Promise<AgentResult>
  analyse(element: UIElement): Promise<AnalysisResult>
}

// UI context for agent operations
export interface UIContext {
  component: UIComponent
  designSystem: DesignSystemConfig
  theme: ThemeConfig
  breakpoints: BreakpointConfig
  accessibility: AccessibilityConfig
  performance: PerformanceMetrics
  userPreferences: UserPreferences
}

// UI component representation
export interface UIComponent {
  id: string
  name: string
  type: ComponentType
  props: Record<string, any>
  children?: UIComponent[]
  styles: ComponentStyles
  variants?: ComponentVariant[]
  responsive?: ResponsiveStyles
  animations?: AnimationConfig[]
  accessibility?: AccessibilityAttributes
}

// Design system configuration
export interface DesignSystemConfig {
  name: 'r6-digital'
  version: string
  colours: ColorPalette
  typography: TypographySystem
  spacing: SpacingSystem
  shadows: ShadowSystem
  borders: BorderSystem
  breakpoints: BreakpointSystem
  animations: AnimationSystem
}

// Colour palette based on R6 Digital system
export interface ColorPalette {
  primary: {
    main: '#131cff'        // Electric blue
    hover: '#0f17cc'
    light: '#3d4bff'
    dark: '#0d14b3'
  }
  neutral: {
    50: '#ffffff'
    100: '#f0f0f0'
    200: '#eeeeee'
    300: '#c7cfdb'
    400: '#acadad'
    500: '#999a9b'
    600: '#6a6d72'
    700: '#404040'
    800: '#2a2a2a'
    900: '#000000'
  }
  semantic: {
    success: '#00a0d2'
    warning: '#ff6b35'
    error: '#e74c3c'
    info: '#131cff'
  }
  backgrounds: {
    primary: '#ffffff'
    secondary: '#f8f9fa'
    dark: '#1a1a1a'
    overlay: 'rgba(0, 0, 0, 0.8)'
  }
}

// Typography system
export interface TypographySystem {
  fonts: {
    primary: string    // Poppins
    secondary: string  // Colfax/Inter
    monospace: string  // SF Mono
  }
  sizes: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
    '5xl': string
  }
  weights: {
    light: number
    normal: number
    medium: number
    semibold: number
    bold: number
    extrabold: number
  }
  lineHeights: {
    tight: number
    snug: number
    normal: number
    relaxed: number
    loose: number
  }
}

// Component styles
export interface ComponentStyles {
  base: string
  variants?: Record<string, string>
  modifiers?: Record<string, string>
  responsive?: ResponsiveStyles
  darkMode?: string
  hover?: string
  focus?: string
  active?: string
  disabled?: string
}

// Responsive styles configuration
export interface ResponsiveStyles {
  mobile?: string
  tablet?: string
  desktop?: string
  widescreen?: string
}

// Animation configuration
export interface AnimationConfig {
  name: string
  type: AnimationType
  duration: number
  easing: string
  delay?: number
  trigger: AnimationTrigger
  properties: string[]
  keyframes?: KeyframeConfig[]
}

// Theme configuration with dark mode support
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto'
  primaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
  preferences: {
    reducedMotion: boolean
    highContrast: boolean
    darkMode: boolean
  }
}

// Accessibility configuration
export interface AccessibilityConfig {
  level: 'AA' | 'AAA'
  features: {
    screenReader: boolean
    keyboardNavigation: boolean
    focusIndicators: boolean
    colorContrast: boolean
    reducedMotion: boolean
    skipLinks: boolean
  }
  ariaLabels: Record<string, string>
  landmarks: string[]
}

// Performance metrics
export interface PerformanceMetrics {
  renderTime: number
  bundleSize: number
  cacheHits: number
  memoryUsage: number
  frameRate: number
  coreWebVitals: {
    lcp: number  // Largest Contentful Paint
    fid: number  // First Input Delay
    cls: number  // Cumulative Layout Shift
  }
}

// Agent result interface
export interface AgentResult {
  agentId: string
  success: boolean
  improvements: UIImprovement[]
  warnings: string[]
  errors: string[]
  metrics: PerformanceMetrics
  recommendations: Recommendation[]
  timeElapsed: number
}

// UI improvement representation
export interface UIImprovement {
  id: string
  type: ImprovementType
  description: string
  impact: ImpactLevel
  effort: EffortLevel
  category: string
  implementation: {
    code?: string
    styles?: string
    props?: Record<string, any>
    instructions?: string[]
  }
  before?: ComponentSnapshot
  after?: ComponentSnapshot
  metrics?: {
    performanceGain?: number
    accessibilityScore?: number
    userExperienceScore?: number
  }
}

// Analysis result from agents
export interface AnalysisResult {
  score: number  // 1-10 quality score
  issues: UIIssue[]
  strengths: string[]
  recommendations: Recommendation[]
  compliance: ComplianceCheck
  performance: PerformanceAnalysis
}

// UI issue identification
export interface UIIssue {
  id: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  type: IssueType
  description: string
  location: string
  fix: string
  automated: boolean
  wcagViolation?: string
}

// Recommendation from agents
export interface Recommendation {
  id: string
  agent: string
  priority: 'low' | 'medium' | 'high'
  category: string
  title: string
  description: string
  implementation: {
    complexity: 'simple' | 'moderate' | 'complex'
    estimatedTime: string
    requirements: string[]
    code?: string
    styles?: string
  }
  impact: {
    userExperience: number
    performance: number
    accessibility: number
    maintainability: number
  }
}

// Compliance checking
export interface ComplianceCheck {
  wcag: {
    level: 'AA' | 'AAA'
    score: number
    violations: WCAGViolation[]
  }
  designSystem: {
    adherence: number
    violations: DesignSystemViolation[]
  }
  performance: {
    score: number
    issues: PerformanceIssue[]
  }
}

// WCAG violation details
export interface WCAGViolation {
  guideline: string
  level: 'A' | 'AA' | 'AAA'
  description: string
  element: string
  fix: string
  automated: boolean
}

// User preferences
export interface UserPreferences {
  preferredColorScheme: 'light' | 'dark' | 'auto'
  reducedMotion: boolean
  highContrast: boolean
  fontSize: 'small' | 'medium' | 'large'
  language: string
  region: string
}

// Component variant system
export interface ComponentVariant {
  name: string
  props: Record<string, any>
  styles: ComponentStyles
  conditions?: VariantCondition[]
}

// UI element representation for analysis
export interface UIElement {
  type: string
  props: Record<string, any>
  styles: CSSStyleDeclaration | Record<string, any>
  children: UIElement[]
  accessibility: {
    role?: string
    ariaLabel?: string
    tabIndex?: number
    focusable: boolean
  }
  metrics: {
    renderTime: number
    size: { width: number; height: number }
    position: { x: number; y: number }
  }
}

// Component snapshot for before/after comparisons
export interface ComponentSnapshot {
  timestamp: number
  component: UIComponent
  metrics: PerformanceMetrics
  screenshot?: string
  accessibility: AccessibilitySnapshot
}

// Accessibility snapshot
export interface AccessibilitySnapshot {
  score: number
  violations: WCAGViolation[]
  landmarks: string[]
  headingStructure: HeadingStructure[]
  colorContrast: ContrastCheck[]
  keyboardNavigation: KeyboardNavigationCheck
}

// Type enums and constants
export type ComponentType = 
  | 'button' 
  | 'card' 
  | 'input' 
  | 'modal' 
  | 'navigation' 
  | 'header' 
  | 'footer' 
  | 'form' 
  | 'table' 
  | 'list' 
  | 'image' 
  | 'text'
  | 'container'
  | 'grid'
  | 'layout'

export type AnimationType = 
  | 'entrance' 
  | 'exit' 
  | 'hover' 
  | 'focus' 
  | 'scroll' 
  | 'interaction'
  | 'state-change'
  | 'micro-interaction'

export type AnimationTrigger = 
  | 'mount' 
  | 'unmount' 
  | 'hover' 
  | 'focus' 
  | 'click' 
  | 'scroll' 
  | 'intersection'
  | 'state-change'

export type ImprovementType = 
  | 'visual' 
  | 'interaction' 
  | 'accessibility' 
  | 'performance' 
  | 'responsive'
  | 'animation'
  | 'theme'

export type ImpactLevel = 'low' | 'medium' | 'high' | 'critical'
export type EffortLevel = 'minimal' | 'low' | 'medium' | 'high' | 'extensive'

export type IssueType = 
  | 'accessibility' 
  | 'performance' 
  | 'visual' 
  | 'interaction' 
  | 'responsive'
  | 'theme'
  | 'design-system'

// Additional supporting interfaces
export interface KeyframeConfig {
  percent: number
  properties: Record<string, any>
}

export interface VariantCondition {
  prop: string
  value: any
  operator?: 'equals' | 'not-equals' | 'includes' | 'excludes'
}

export interface BreakpointConfig {
  mobile: number
  tablet: number
  desktop: number
  widescreen: number
}

export interface SpacingSystem {
  0: string
  1: string
  2: string
  3: string
  4: string
  5: string
  6: string
  8: string
  10: string
  12: string
  16: string
  20: string
  24: string
  32: string
  40: string
  48: string
}

export interface ShadowSystem {
  sm: string
  base: string
  md: string
  lg: string
  xl: string
  '2xl': string
  inner: string
}

export interface BorderSystem {
  widths: {
    0: string
    1: string
    2: string
    4: string
    8: string
  }
  radius: {
    none: string
    sm: string
    base: string
    md: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    full: string
  }
}

export interface BreakpointSystem {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

export interface AnimationSystem {
  durations: {
    75: string
    100: string
    150: string
    200: string
    300: string
    500: string
    700: string
    1000: string
  }
  timingFunctions: {
    linear: string
    in: string
    out: string
    'in-out': string
    bounce: string
  }
}

export interface DesignSystemViolation {
  rule: string
  description: string
  element: string
  expected: string
  actual: string
  fix: string
}

export interface PerformanceIssue {
  type: string
  description: string
  element: string
  impact: string
  fix: string
  priority: 'low' | 'medium' | 'high'
}

export interface PerformanceAnalysis {
  score: number
  metrics: PerformanceMetrics
  bottlenecks: PerformanceIssue[]
  optimizations: string[]
}

export interface HeadingStructure {
  level: number
  text: string
  element: string
}

export interface ContrastCheck {
  foreground: string
  background: string
  ratio: number
  passes: boolean
  level: 'AA' | 'AAA'
}

export interface KeyboardNavigationCheck {
  focusable: boolean
  tabIndex: number
  skipLinks: boolean
  focusIndicators: boolean
  score: number
}

export interface AccessibilityAttributes {
  role?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-hidden'?: boolean
  tabindex?: number
}