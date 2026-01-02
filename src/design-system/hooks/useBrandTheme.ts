/**
 * useBrandTheme Hook
 *
 * Detects brand (Disaster Recovery vs NRPG) based on user role or route
 * Returns appropriate brand-specific colors and settings
 *
 * Strategic decision: Shared foundation, different expressions
 * - Same components, spacing, typography
 * - Different color palettes per brand
 */

'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { getBrandColors, type Brand } from '../tokens/colors';
import { useSession } from 'next-auth/react';

export interface BrandTheme {
  brand: Brand;
  colors: ReturnType<typeof getBrandColors>;
  name: string;
  tagline: string;
}

/**
 * Hook to get brand-specific theme
 *
 * Detection logic:
 * 1. Check route (/contractor/* = NRPG, /client/* = Disaster Recovery)
 * 2. Check user role (CONTRACTOR = NRPG, CLIENT = Disaster Recovery)
 * 3. Default to Disaster Recovery (public brand)
 *
 * Usage:
 * ```tsx
 * const brand = useBrandTheme();
 *
 * <div style={{ backgroundColor: brand.colors.primary }}>
 *   <h1>{brand.name}</h1>
 * </div>
 * ```
 */
export function useBrandTheme(): BrandTheme {
  const pathname = usePathname();
  const { data: session } = useSession();

  const theme = useMemo(() => {
    let detectedBrand: Brand = 'disaster-recovery';

    // Check route
    if (pathname.startsWith('/dashboard/contractor') || pathname.startsWith('/contractor')) {
      detectedBrand = 'nrpg';
    }

    // Check user role (override route)
    if (session?.user) {
      const userType = (session.user as any).userType;
      if (userType === 'CONTRACTOR') {
        detectedBrand = 'nrpg';
      } else if (userType === 'CLIENT') {
        detectedBrand = 'disaster-recovery';
      }
    }

    const colors = getBrandColors(detectedBrand);

    const brandInfo =
      detectedBrand === 'nrpg'
        ? {
            name: 'NRPG',
            tagline: 'National Restoration Professionals Group',
          }
        : {
            name: 'Disaster Recovery',
            tagline: "Who First?™ Disaster Recovery",
          };

    return {
      brand: detectedBrand,
      colors,
      ...brandInfo,
    };
  }, [pathname, session]);

  return theme;
}

/**
 * Hook to check if current brand is NRPG
 */
export function useIsNRPG(): boolean {
  const { brand } = useBrandTheme();
  return brand === 'nrpg';
}

/**
 * Hook to check if current brand is Disaster Recovery
 */
export function useIsDisasterRecovery(): boolean {
  const { brand } = useBrandTheme();
  return brand === 'disaster-recovery';
}
