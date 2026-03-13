'use client'

import { usePathname } from 'next/navigation'
import UltraModernHeader from '@/components/UltraModernHeader'
import UltraModernFooter from '@/components/UltraModernFooter'
import MobileNav from '@/components/mobile/MobileNav'
import MobileFAB from '@/components/mobile/MobileFAB'
import MobileEmergencyCTA from '@/components/emergency/MobileEmergencyCTA'
import Breadcrumb from '@/components/Breadcrumb'
import NavigationIndicator from '@/components/NavigationIndicator'
import { AntigravityLayoutGuard } from '@/components/AntigravityLayoutGuard'

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
      <AntigravityLayoutGuard>
        <div className="hidden lg:block">
          <UltraModernHeader />
        </div>
        <MobileNav />
        <Breadcrumb />
      </AntigravityLayoutGuard>
      <NavigationIndicator />
      {children}
      <AntigravityLayoutGuard>
        <div className="pb-16 lg:pb-0">
          <UltraModernFooter />
        </div>
        <MobileFAB />
        <MobileEmergencyCTA />
      </AntigravityLayoutGuard>
    </>
  )
}
