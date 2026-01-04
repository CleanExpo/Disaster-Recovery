'use client'

/**
 * Demo Layout
 *
 * Wraps all demo pages with the DemoProvider.
 */

import { useSearchParams } from 'next/navigation'
import { DemoProvider, type DemoScenario } from '@/lib/demo'

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const scenario = searchParams.get('scenario') as DemoScenario | null

  return (
    <DemoProvider enabled>
      {children}
    </DemoProvider>
  )
}
