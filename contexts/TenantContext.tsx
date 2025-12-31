'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Tenant {
  id: string
  name: string
  domain: string
  logo?: string
  theme?: {
    primary: string
    secondary: string
    background: string
    text: string
  }
}

interface TenantContextType {
  tenant: Tenant | null
  setTenant: (tenant: Tenant) => void
  clearTenant: () => void
}

const TenantContext = createContext<TenantContextType | undefined>(undefined)

export const useTenant = () => {
  const context = useContext(TenantContext)
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider')
  }
  return context
}

interface IndustryConfig {
  serviceCategories: string[]
  urgencyLevels: string[]
}

/**
 * Lightweight industry configuration hook used by onboarding + contractor UIs.
 *
 * For now this returns empty arrays so consuming components can fall back to their
 * built-in defaults. In a future iteration this can be tenant-driven.
 */
export const useIndustryConfig = (): IndustryConfig => {
  return {
    serviceCategories: [],
    urgencyLevels: []
  }
}

interface TenantProviderProps {
  children: ReactNode
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [tenant, setTenantState] = useState<Tenant | null>(null)

  const setTenant = (tenant: Tenant) => {
    setTenantState(tenant)
  }

  const clearTenant = () => {
    setTenantState(null)
  }

  const value = {
    tenant,
    setTenant,
    clearTenant
  }

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  )
}
