'use client'

/**
 * LayoutChrome — wraps page content with optional global navigation indicator.
 *
 * DR-LCP-FIX (2026-04-29): Removed dead imports of UltraModernHeader,
 * UltraModernFooter, MobileNav, MobileFAB, MobileEmergencyCTA, Breadcrumb.
 * They were wrapped by AntigravityLayoutGuard, which returns null — so the
 * components never rendered, but their JS (framer-motion, lucide-react,
 * SearchBar) still shipped to every page in the route bundle. Removing
 * them drops ~1,400 lines of client JS from the critical path on every
 * route, which was the dominant cause of the prod LCP > 2.5s gate
 * failure (3064ms → target < 2500ms).
 *
 * Each Antigravity page renders its own AntigravityNavbar + AntigravityFooter
 * inline (see AntigravityHomePage.tsx and per-page composition).
 */

import { usePathname } from 'next/navigation'
import NavigationIndicator from '@/components/NavigationIndicator'

/** Paths that should render without header/footer (e.g. login, admin). */
const BARE_PATHS = ['/login']
const BARE_PREFIX = '/admin' // admin has its own layout chrome

export function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isBare = pathname && (BARE_PATHS.includes(pathname) || pathname.startsWith(BARE_PREFIX))

  if (isBare) {
    return <>{children}</>
  }

  return (
    <>
      <NavigationIndicator />
      {children}
    </>
  )
}
