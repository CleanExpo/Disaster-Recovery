'use client'

import type React from 'react'
import { SessionProvider } from 'next-auth/react'

import { AuthProvider } from '@/contexts/AuthContext'
import { TenantProvider } from '@/contexts/TenantContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

interface AppProvidersProps {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ThemeProvider>
          <TenantProvider>{children}</TenantProvider>
        </ThemeProvider>
      </AuthProvider>
    </SessionProvider>
  )
}

