/**
 * Marketing Components
 *
 * Comprehensive marketing and lead generation components for the
 * Disaster Recovery platform, optimized for conversion and engagement.
 *
 * Categories:
 * - Hero Variants: Full-width, video, and split-screen heroes
 * - Testimonials: Social proof and trust-building components
 * - Interactive Tools: Calculators, quizzes, and triage tools
 * - Location: Australia-specific geographic components
 *
 * All components follow DesignOS standards:
 * - Authority/clinical aesthetic
 * - Mobile-first responsive
 * - WCAG 2.1 AA compliant
 * - TypeScript typed
 */

// ============================================================================
// HERO VARIANTS
// ============================================================================

export { HeroFullWidth } from './HeroFullWidth';
export type { HeroFullWidthProps } from './HeroFullWidth';

export { HeroVideo } from './HeroVideo';
export type { HeroVideoProps } from './HeroVideo';

export { HeroSplitScreen } from './HeroSplitScreen';
export type { HeroSplitScreenProps } from './HeroSplitScreen';

// ============================================================================
// TESTIMONIAL COMPONENTS
// ============================================================================

export { ClientTestimonialCard } from './ClientTestimonialCard';
export type { ClientTestimonialCardProps } from './ClientTestimonialCard';

export { TestimonialCarousel } from './TestimonialCarousel';
export type { TestimonialCarouselProps, TestimonialItem } from './TestimonialCarousel';

export { VideoTestimonial } from './VideoTestimonial';
export type { VideoTestimonialProps } from './VideoTestimonial';

// Existing contractor-focused testimonial (re-export for backward compatibility)
export { default as TestimonialCard } from './TestimonialCard';
export type { TestimonialCardProps } from './TestimonialCard';

// ============================================================================
// INTERACTIVE TOOLS
// ============================================================================

export { DamageCostCalculator } from './DamageCostCalculator';
export type {
  DamageCostCalculatorProps,
  CalculatorStep,
  CalculatorResult,
} from './DamageCostCalculator';

export { RiskAssessmentQuiz } from './RiskAssessmentQuiz';
export type {
  RiskAssessmentQuizProps,
  QuizQuestion,
  QuizResult,
} from './RiskAssessmentQuiz';

export { TriageTool } from './TriageTool';
export type {
  TriageToolProps,
  TriageNode,
  TriageResult,
} from './TriageTool';

// ============================================================================
// LOCATION COMPONENTS
// ============================================================================

export { AustraliaMap } from './AustraliaMap';
export type { AustraliaMapProps, StateData } from './AustraliaMap';

export { ServiceAreaVisualization } from './ServiceAreaVisualization';
export type {
  ServiceAreaVisualizationProps,
  RegionData,
} from './ServiceAreaVisualization';

export { LocalContractorCounter } from './LocalContractorCounter';
export type { LocalContractorCounterProps } from './LocalContractorCounter';

// ============================================================================
// EXISTING COMPONENTS (for backward compatibility)
// ============================================================================

export { default as Hero } from './Hero';
export type { HeroProps } from './Hero';

export { default as PricingCard } from './PricingCard';
export type { PricingCardProps } from './PricingCard';

// ============================================================================
// COMPONENT GROUPS (for easier imports)
// ============================================================================

/**
 * All hero variant components
 */
export const HeroComponents = {
  Hero: require('./Hero').default,
  HeroFullWidth: require('./HeroFullWidth').HeroFullWidth,
  HeroVideo: require('./HeroVideo').HeroVideo,
  HeroSplitScreen: require('./HeroSplitScreen').HeroSplitScreen,
};

/**
 * All testimonial components
 */
export const TestimonialComponents = {
  TestimonialCard: require('./TestimonialCard').default,
  ClientTestimonialCard: require('./ClientTestimonialCard').ClientTestimonialCard,
  TestimonialCarousel: require('./TestimonialCarousel').TestimonialCarousel,
  VideoTestimonial: require('./VideoTestimonial').VideoTestimonial,
};

/**
 * All interactive tool components
 */
export const InteractiveToolComponents = {
  DamageCostCalculator: require('./DamageCostCalculator').DamageCostCalculator,
  RiskAssessmentQuiz: require('./RiskAssessmentQuiz').RiskAssessmentQuiz,
  TriageTool: require('./TriageTool').TriageTool,
};

/**
 * All location-based components
 */
export const LocationComponents = {
  AustraliaMap: require('./AustraliaMap').AustraliaMap,
  ServiceAreaVisualization: require('./ServiceAreaVisualization').ServiceAreaVisualization,
  LocalContractorCounter: require('./LocalContractorCounter').LocalContractorCounter,
};

/**
 * All marketing components
 */
export const MarketingComponents = {
  ...HeroComponents,
  ...TestimonialComponents,
  ...InteractiveToolComponents,
  ...LocationComponents,
  PricingCard: require('./PricingCard').default,
};
