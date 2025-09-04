/**
 * UNIFIED UI SYSTEM - SINGLE SOURCE OF TRUTH
 * This file contains ALL UI constants, z-indexes, and component configurations
 * to prevent whack-a-mole issues and ensure consistency
 */

// Z-INDEX HIERARCHY - DO NOT MODIFY WITHOUT REVIEWING ALL COMPONENTS
export const Z_INDEX = {
  // Base layers
  BASE: 0,
  DROPDOWN: 10,
  STICKY: 20,
  FIXED: 30,
  
  // Overlays
  MODAL_BACKDROP: 1000,
  MODAL: 1010,
  NOTIFICATION: 1020,
  TOOLTIP: 1030,
  
  // Critical UI elements (always on top)
  EMERGENCY_BAR: 9998,
  CHAT_WIDGET: 9999,
  CRITICAL_ALERT: 10000,
} as const;

// BREAKPOINTS - Consistent across all components
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
} as const;

// CONTACT METHODS - DIGITAL ONLY (NO PHONE)
export const CONTACT_METHODS = {
  CHAT: {
    label: 'Live Chat',
    icon: 'MessageCircle',
    available: true,
    responseTime: '< 30 seconds',
  },
  FORM: {
    label: 'Online Form',
    icon: 'Globe',
    available: true,
    responseTime: '2 minutes',
  },
  EMAIL: {
    label: 'Email Support',
    icon: 'Mail',
    available: true,
    responseTime: '< 1 hour',
  },
  // PHONE IS EXPLICITLY REMOVED - DO NOT ADD
} as const;

// COLORS - Centralized color system
export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  emergency: {
    bg: '#ef4444',
    text: '#ffffff',
    hover: '#dc2626',
  },
  success: {
    bg: '#10b981',
    text: '#ffffff',
    hover: '#059669',
  },
} as const;

// ANIMATION TIMING
export const ANIMATION = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 1000,
} as const;

// COMPONENT REGISTRY - Prevents duplicate components
export const COMPONENT_REGISTRY = {
  header: 'DigitalContactBar',
  chat: 'EnhancedChatBot',
  footer: 'ModernFooter',
  hero: 'CleanHero',
  services: 'ServiceGrid',
  journey: 'CustomerJourneyWizard',
} as const;

// LAYOUT CONSTANTS
export const LAYOUT = {
  maxWidth: '1280px',
  padding: {
    mobile: '1rem',
    tablet: '1.5rem',
    desktop: '2rem',
  },
  headerHeight: '64px',
  footerHeight: '400px',
} as const;

// ERROR MESSAGES - Consistent error handling
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  validation: 'Please check your input and try again.',
  noPhone: 'Phone support is not available. Please use chat or email.',
} as const;

// API ENDPOINTS - Centralized API configuration
export const API = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
  endpoints: {
    chat: '/api/chat',
    claim: '/api/claim',
    email: '/api/email',
    contractor: '/api/contractor',
  },
} as const;

// FORM VALIDATION RULES
export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  postcode: /^\d{4}$/,
  // NO PHONE VALIDATION - DIGITAL ONLY
} as const;

// SEO DEFAULTS
export const SEO = {
  defaultTitle: 'Disaster Recovery - 100% Digital Emergency Response',
  defaultDescription: 'Australia\'s #1 digital disaster recovery platform. No phone calls needed.',
  keywords: ['disaster recovery', 'digital', 'online', 'emergency', 'restoration'],
} as const;

// FEATURE FLAGS - Enable/disable features globally
export const FEATURES = {
  chat: true,
  onlineForm: true,
  email: true,
  phone: false, // EXPLICITLY DISABLED
  analytics: true,
  animations: true,
} as const;

// Export helper functions
export const getZIndex = (layer: keyof typeof Z_INDEX): number => Z_INDEX[layer];

export const isFeatureEnabled = (feature: keyof typeof FEATURES): boolean => FEATURES[feature];

export const getContactMethod = (method: keyof typeof CONTACT_METHODS) => {
  if (method === 'PHONE' as any) {
    throw new Error('Phone contact is not available. Use digital methods only.');
  }
  return CONTACT_METHODS[method];
};

export default {
  Z_INDEX,
  BREAKPOINTS,
  CONTACT_METHODS,
  COLORS,
  ANIMATION,
  COMPONENT_REGISTRY,
  LAYOUT,
  ERROR_MESSAGES,
  API,
  VALIDATION,
  SEO,
  FEATURES,
};