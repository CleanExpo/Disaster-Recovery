/**
 * Code Splitting Utilities
 *
 * Dynamic imports for better performance
 * - Route-based code splitting
 * - Component-based code splitting
 * - Library code splitting
 */

import dynamic from 'next/dynamic'
import { ComponentType, lazy, Suspense } from 'react'

/**
 * Loading component for dynamic imports
 */
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}

/**
 * Loading skeleton for components
 */
export function LoadingSkeleton({ height = 'h-64' }: { height?: string }) {
  return (
    <div className={`${height} bg-gray-200 animate-pulse rounded-lg`} />
  )
}

/**
 * Dynamic import with loading state
 */
export function createDynamicComponent<P = {}>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options?: {
    loading?: ComponentType
    ssr?: boolean
  }
) {
  return dynamic(importFn, {
    loading: options?.loading || LoadingSpinner,
    ssr: options?.ssr ?? true,
  })
}

/**
 * Lazy load component with Suspense
 */
export function createLazyComponent<P = {}>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFn)

  return (props: P) => (
    <Suspense fallback={fallback || <LoadingSpinner />}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

/**
 * Preload a dynamic component
 */
export function preloadComponent(
  importFn: () => Promise<{ default: ComponentType<any> }>
) {
  return importFn()
}

// ============================================================================
// Pre-configured dynamic components for common tools
// ============================================================================

/**
 * Emergency Checklist Tool (Heavy component)
 */
export const EmergencyChecklistTool = createDynamicComponent(
  () => import('@/components/tools/EmergencyChecklist'),
  { ssr: false }
)

/**
 * Evacuation Planner Tool (Heavy component)
 */
export const EvacuationPlannerTool = createDynamicComponent(
  () => import('@/components/tools/EvacuationPlanner'),
  { ssr: false }
)

/**
 * Supply Calculator Tool (Medium component)
 */
export const SupplyCalculatorTool = createDynamicComponent(
  () => import('@/components/tools/SupplyCalculator'),
  { ssr: false }
)

/**
 * Family Communication Plan Tool (Medium component)
 */
export const FamilyCommunicationPlanTool = createDynamicComponent(
  () => import('@/components/tools/FamilyCommunicationPlan'),
  { ssr: false }
)

/**
 * Document Vault Tool (Heavy component - authentication required)
 */
export const DocumentVaultTool = createDynamicComponent(
  () => import('@/components/tools/DocumentVault'),
  { ssr: false }
)

/**
 * Recovery Timeline Tool (Medium component)
 */
export const RecoveryTimelineTool = createDynamicComponent(
  () => import('@/components/tools/RecoveryTimeline'),
  { ssr: false }
)

/**
 * Insurance Tracker Tool (Medium component)
 */
export const InsuranceTrackerTool = createDynamicComponent(
  () => import('@/components/tools/InsuranceTracker'),
  { ssr: false }
)

/**
 * Property Inventory Tool (Heavy component)
 */
export const PropertyInventoryTool = createDynamicComponent(
  () => import('@/components/tools/PropertyInventory'),
  { ssr: false }
)

/**
 * PDF Generator (Heavy library)
 */
export const PDFGenerator = createDynamicComponent(
  () => import('@/components/tools/PDFGenerator'),
  { ssr: false }
)

// ============================================================================
// Heavy third-party libraries
// ============================================================================

/**
 * Chart components (recharts is heavy)
 */
export const DynamicChart = {
  LineChart: createDynamicComponent(
    () => import('recharts').then((mod) => ({ default: mod.LineChart })),
    { ssr: false }
  ),
  BarChart: createDynamicComponent(
    () => import('recharts').then((mod) => ({ default: mod.BarChart })),
    { ssr: false }
  ),
  PieChart: createDynamicComponent(
    () => import('recharts').then((mod) => ({ default: mod.PieChart })),
    { ssr: false }
  ),
}

/**
 * Map component (if using maps library)
 */
export const DynamicMap = createDynamicComponent(
  () => import('@/components/tools/DisasterMap'),
  { ssr: false }
)

/**
 * Rich text editor (heavy component)
 */
export const RichTextEditor = createDynamicComponent(
  () => import('@/components/tools/RichTextEditor'),
  { ssr: false }
)

/**
 * Code/syntax highlighter
 */
export const CodeHighlighter = createDynamicComponent(
  () => import('@/components/tools/CodeHighlighter'),
  { ssr: false }
)

// ============================================================================
// Modal and Dialog components
// ============================================================================

/**
 * Create a dynamic modal component
 */
export function createDynamicModal<P = {}>(
  importFn: () => Promise<{ default: ComponentType<P> }>
) {
  return createDynamicComponent(importFn, {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    ),
  })
}

/**
 * Auth Modal
 */
export const AuthModal = createDynamicModal(
  () => import('@/components/auth/AuthModal')
)

/**
 * Share Modal
 */
export const ShareModal = createDynamicModal(
  () => import('@/components/tools/ShareModal')
)

/**
 * Settings Modal
 */
export const SettingsModal = createDynamicModal(
  () => import('@/components/settings/SettingsModal')
)

// ============================================================================
// Route prefetching utilities
// ============================================================================

/**
 * Prefetch a route
 */
export function prefetchRoute(href: string) {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  document.head.appendChild(link)
}

/**
 * Preconnect to external domains
 */
export function preconnect(href: string, crossorigin?: boolean) {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = href
  if (crossorigin) {
    link.crossOrigin = 'anonymous'
  }
  document.head.appendChild(link)
}

/**
 * DNS prefetch for external domains
 */
export function dnsPrefetch(href: string) {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'dns-prefetch'
  link.href = href
  document.head.appendChild(link)
}

/**
 * Preload critical resources
 */
export function preloadResource(
  href: string,
  as: 'script' | 'style' | 'font' | 'image',
  type?: string
) {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  if (type) {
    link.type = type
  }
  if (as === 'font') {
    link.crossOrigin = 'anonymous'
  }
  document.head.appendChild(link)
}

/**
 * Initialize common preconnects and prefetches
 */
export function initResourceHints() {
  // Preconnect to external APIs
  preconnect('https://api.stripe.com', true)
  preconnect('https://fonts.googleapis.com')
  preconnect('https://fonts.gstatic.com', true)

  // DNS prefetch for third-party domains
  dnsPrefetch('https://www.google-analytics.com')
  dnsPrefetch('https://www.googletagmanager.com')

  // Preload critical fonts
  preloadResource('/fonts/geist-sans.woff2', 'font', 'font/woff2')
  preloadResource('/fonts/geist-mono.woff2', 'font', 'font/woff2')
}

import React from 'react'
