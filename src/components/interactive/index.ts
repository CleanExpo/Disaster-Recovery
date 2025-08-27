// Interactive Components Index
// This file provides easy access to all interactive components

// Core Interactive Components
export { default as AnimatedHero } from './AnimatedHero';
export { default as Interactive3DServiceCards } from './Interactive3DServiceCards';
export { default as InteractiveBeforeAfterSlider } from './InteractiveBeforeAfterSlider';
export { default as AnimatedCountersAndWidgets } from './AnimatedCountersAndWidgets';
export { default as FloatingActionButtons } from './FloatingActionButtons';

// Animation and Scroll Effects
export { default as ScrollAnimations } from './ScrollTriggeredAnimations';
export {
  ParallaxBackground,
  StaggeredList,
  ScrollProgressIndicator,
  FadeInOnScroll,
  TextReveal,
  ScrollCounter,
  ParallaxSection,
  StickyScrollElement,
  HorizontalScroll,
} from './ScrollTriggeredAnimations';

// Particle Systems
export { default as EmergencyParticleSystem } from './EmergencyParticleSystems';
export {
  WaterParticles,
  FireParticles,
  StormParticles,
  EmergencyResponseParticles,
  CSSParticleEffect,
} from './EmergencyParticleSystems';

// Glass Morphism and Visual Effects
export { default as GlassMorphismEffects } from './GlassMorphismEffects';
export {
  GlassMorphismCard,
  NeonGlowButton,
  NeonText,
  FrostedGlassPanel,
  HolographicCard,
  CyberpunkGrid,
} from './GlassMorphismEffects';

// Performance Optimization
export { default as PerformanceOptimizer } from './PerformanceOptimizer';
export {
  LazyLoadComponent,
  GPUAccelerated,
  OptimizedAnimation,
  useOptimizedScroll,
  MemoizedComponent,
  VirtualList,
  OptimizedImage,
  useResourcePreloader,
  PerformanceDashboard,
  usePerformanceMonitor,
} from './PerformanceOptimizer';

// Types and Interfaces
export interface InteractiveComponentProps {
  className?: string;
  animate?: boolean;
  performanceMode?: 'high' | 'medium' | 'low';
}

export interface ParticleSystemConfig {
  type: 'water' | 'fire' | 'storm' | 'emergency';
  intensity: 'low' | 'medium' | 'high';
  use3D?: boolean;
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  respectReducedMotion?: boolean;
}

export interface GlassEffectConfig {
  intensity?: 'light' | 'medium' | 'strong';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  glow?: boolean;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'yellow';
}

// Utility Functions
export const createInteractiveComponent = (
  component: React.ComponentType<any>,
  config: InteractiveComponentProps = {}
) => {
  const { animate = true, performanceMode = 'medium', ...props } = config;
  
  return React.memo((componentProps: any) => {
    const optimizedProps = {
      ...props,
      ...componentProps,
      animate: animate && performanceMode !== 'low',
      gpu: performanceMode === 'high',
    };
    
    return React.createElement(component, optimizedProps);
  });
};

export const preloadInteractiveComponents = async () => {
  // Preload critical interactive components
  const componentsToPreload = [
    () => import('./AnimatedHero'),
    () => import('./FloatingActionButtons'),
    () => import('./ScrollTriggeredAnimations'),
  ];
  
  try {
    await Promise.all(componentsToPreload.map(loader => loader()));
    console.log('Interactive components preloaded successfully');
  } catch (error) {
    console.warn('Some interactive components failed to preload:', error);
  }
};

// Performance monitoring utilities
export const getInteractivePerformanceMetrics = () => {
  if (typeof window === 'undefined') return null;
  
  const now = performance.now();
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  return {
    loadTime: navigation.loadEventEnd - navigation.fetchStart,
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
    firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime,
    firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime,
    currentTime: now,
  };
};

// Component factory for creating optimized interactive elements
export const createOptimizedInteractiveElement = <T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  defaultProps: Partial<T> = {}
) => {
  return React.memo(React.forwardRef<any, T>((props, ref) => {
    const mergedProps = { ...defaultProps, ...props } as T;
    return <Component ref={ref} {...mergedProps} />;
  }));
};

// Animation presets
export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  slideLeft: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  rotate: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Particle system presets
export const particlePresets = {
  water: { type: 'water' as const, intensity: 'medium' as const, use3D: true },
  fire: { type: 'fire' as const, intensity: 'medium' as const, use3D: true },
  storm: { type: 'storm' as const, intensity: 'high' as const, use3D: true },
  emergency: { type: 'emergency' as const, intensity: 'medium' as const, use3D: true },
  subtle: { type: 'water' as const, intensity: 'low' as const, use3D: false },
};

// Glass effect presets
export const glassPresets = {
  subtle: { intensity: 'light' as const, blur: 'sm' as const, border: true, glow: false },
  medium: { intensity: 'medium' as const, blur: 'md' as const, border: true, glow: false },
  strong: { intensity: 'strong' as const, blur: 'lg' as const, border: true, glow: true },
  holographic: { intensity: 'medium' as const, blur: 'md' as const, border: false, glow: true, glowColor: 'purple' as const },
  emergency: { intensity: 'strong' as const, blur: 'xl' as const, border: true, glow: true, glowColor: 'red' as const },
};

export default {
  AnimatedHero,
  Interactive3DServiceCards,
  InteractiveBeforeAfterSlider,
  AnimatedCountersAndWidgets,
  FloatingActionButtons,
  ScrollAnimations,
  EmergencyParticleSystem,
  GlassMorphismEffects,
  PerformanceOptimizer,
  presets: {
    animation: animationPresets,
    particles: particlePresets,
    glass: glassPresets,
  },
  utils: {
    createInteractiveComponent,
    preloadInteractiveComponents,
    getInteractivePerformanceMetrics,
    createOptimizedInteractiveElement,
  },
};