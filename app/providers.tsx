'use client'

import { SessionProvider } from 'next-auth/react'
import { LanguageProvider } from '@/lib/language-context'

/**
 * Root providers.
 *
 * SessionProvider is intentionally configured with `refetchOnWindowFocus={false}`
 * and `refetchInterval={0}`. The site is mostly anonymous — public location
 * pages, the `/claim` flow, and SEO-indexed content. Aggressive session
 * refetching on every focus / on a polling interval added two failure modes:
 *
 *   1. Tabs that sat open in the background fired hundreds of `/api/auth/session`
 *      requests, amplifying any transient edge cache miss / cold-start HTML
 *      response into a recurring `[next-auth][error][CLIENT_FETCH_ERROR]`
 *      console error. That tripped the lighthouse `errors-in-console` gate.
 *
 *   2. Background refetches raced against route changes and occasionally hit
 *      a Vercel edge route in the middle of being warmed for a different
 *      function, producing brief HTML error pages that next-auth then tried
 *      to JSON.parse.
 *
 * Authenticated portal flows that genuinely need live session refresh can
 * call `useSession()` from a nested provider with their own refetch policy.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus={false} refetchInterval={0}>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </SessionProvider>
  )
}