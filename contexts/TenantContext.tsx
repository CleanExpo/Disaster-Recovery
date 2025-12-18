'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface TenantConfig {
  id: string;
  name: string;
  domain?: string;
  subdomain?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  customCss?: string;
  industry?: string;
  isActive: boolean;
  configurations: Record<string, any>;
}

interface TenantContextType {
  tenant: TenantConfig | null;
  loading: boolean;
  error: string | null;
  updateTenantConfig: (key: string, value: any) => Promise<void>;
  getConfig: (key: string, defaultValue?: any) => any;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTenant();
  }, []);

  const loadTenant = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get tenant from domain or subdomain via API
      const hostname = window.location.hostname;
      const response = await fetch(`/api/tenant?domain=${encodeURIComponent(hostname)}`);
      
      if (response.ok) {
        const tenant = await response.json();
        setTenant(tenant);
        
        // Apply custom CSS if available
        if (tenant.customCss) {
          applyCustomCSS(tenant.customCss);
        }
        // Apply theme colors
        if (tenant.primaryColor || tenant.secondaryColor) {
          applyThemeColors(tenant.primaryColor, tenant.secondaryColor);
        }
      } else {
        // Default tenant for development
        setTenant({
          id: 'default',
          name: 'Default Platform',
          isActive: true,
          configurations: {}
        });
      }
    } catch (err) {
      console.error('Failed to load tenant:', err);
      setError('Failed to load tenant configuration');
      // Set default tenant on error
      setTenant({
        id: 'default',
        name: 'Default Platform',
        isActive: true,
        configurations: {}
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTenantConfig = async (key: string, value: any) => {
    if (!tenant) return;

    try {
      const response = await fetch(`/api/tenant/${tenant.id}/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      });

      if (response.ok) {
        // Update local state
        setTenant(prev => prev ? {
          ...prev,
          configurations: {
            ...prev.configurations,
            [key]: value
          }
        } : null);
      } else {
        throw new Error('Failed to update tenant config');
      }
    } catch (err) {
      console.error('Failed to update tenant config:', err);
      throw err;
    }
  };

  const getConfig = (key: string, defaultValue?: any) => {
    if (!tenant) return defaultValue;
    return tenant.configurations[key] ?? defaultValue;
  };

  const applyCustomCSS = (css: string) => {
    // Remove existing custom styles
    const existingStyle = document.getElementById('tenant-custom-css');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Add new custom styles
    const style = document.createElement('style');
    style.id = 'tenant-custom-css';
    style.textContent = css;
    document.head.appendChild(style);
  };

  const applyThemeColors = (primaryColor?: string, secondaryColor?: string) => {
    const root = document.documentElement;
    
    if (primaryColor) {
      root.style.setProperty('--primary-color', primaryColor);
      root.style.setProperty('--primary-foreground', getContrastColor(primaryColor));
    }
    
    if (secondaryColor) {
      root.style.setProperty('--secondary-color', secondaryColor);
      root.style.setProperty('--secondary-foreground', getContrastColor(secondaryColor));
    }
  };

  const getContrastColor = (hexColor: string): string => {
    // Simple contrast calculation
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  };

  return (
    <TenantContext.Provider value={{
      tenant,
      loading,
      error,
      updateTenantConfig,
      getConfig
    }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}

// Hook for getting tenant-specific configuration
export function useTenantConfig() {
  const { getConfig } = useTenant();
  return getConfig;
}

// Hook for getting industry-specific settings
export function useIndustryConfig() {
  const { tenant, getConfig } = useTenant();
  
  const industry = tenant?.industry || 'restoration';
  const serviceCategories = getConfig('serviceCategories', []);
  const urgencyLevels = getConfig('urgencyLevels', []);
  const enableInsurance = getConfig('enableInsurance', true);
  const enableLeadScoring = getConfig('enableLeadScoring', true);
  const defaultCurrency = getConfig('defaultCurrency', 'AUD');

  return {
    industry,
    serviceCategories,
    urgencyLevels,
    enableInsurance,
    enableLeadScoring,
    defaultCurrency
  };
}
