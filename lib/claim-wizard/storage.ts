/**
 * Claim Wizard Storage Utility
 *
 * Handles cross-device persistence of claim wizard progress
 * Features:
 * - localStorage for immediate persistence
 * - Version management for schema migrations
 * - Auto-cleanup of expired/stale data
 * - Type-safe storage operations
 */

import type { ClaimFormState } from './types';
import { STORAGE_KEY, STORAGE_VERSION } from './types';

interface StorageWrapper {
  version: string;
  data: ClaimFormState;
  expiresAt: string;
}

const EXPIRY_DAYS = 7; // Claims older than 7 days are auto-deleted

// ============================================================================
// Storage Operations
// ============================================================================

/**
 * Save claim form state to localStorage
 */
export function saveClaimProgress(state: ClaimFormState): void {
  if (typeof window === 'undefined') return;

  try {
    const wrapper: StorageWrapper = {
      version: STORAGE_VERSION,
      data: {
        ...state,
        lastUpdatedAt: new Date().toISOString(),
      },
      expiresAt: new Date(Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000).toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(wrapper));
  } catch (error) {
    console.error('Failed to save claim progress:', error);
    // Fail silently - don't block form submission
  }
}

/**
 * Load claim form state from localStorage
 */
export function loadClaimProgress(): ClaimFormState | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const wrapper: StorageWrapper = JSON.parse(stored);

    // Check expiry
    if (new Date(wrapper.expiresAt) < new Date()) {
      clearClaimProgress();
      return null;
    }

    // Check version compatibility
    if (wrapper.version !== STORAGE_VERSION) {
      console.warn('Claim wizard storage version mismatch, clearing old data');
      clearClaimProgress();
      return null;
    }

    return wrapper.data;
  } catch (error) {
    console.error('Failed to load claim progress:', error);
    return null;
  }
}

/**
 * Clear claim form state from localStorage
 */
export function clearClaimProgress(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear claim progress:', error);
  }
}

/**
 * Check if there's saved progress
 */
export function hasSavedProgress(): boolean {
  const state = loadClaimProgress();
  return state !== null && (state.step1 || state.step2 || state.step3) !== undefined;
}

// ============================================================================
// GPS Location Detection
// ============================================================================

export interface LocationResult {
  success: boolean;
  latitude?: number;
  longitude?: number;
  error?: string;
}

/**
 * Get user's current GPS location for auto-filling address
 */
export async function getCurrentLocation(): Promise<LocationResult> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    return {
      success: false,
      error: 'Geolocation is not supported by your browser',
    };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          success: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }

        resolve({
          success: false,
          error: errorMessage,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

/**
 * Reverse geocode coordinates to address (requires Google Places API)
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<{ address?: string; suburb?: string; postcode?: string; error?: string }> {
  try {
    // This would use Google Places API or similar
    // For now, return structure for future implementation
    return {
      error: 'Reverse geocoding not yet implemented - please enter address manually',
    };
  } catch (error) {
    return {
      error: 'Failed to convert location to address',
    };
  }
}
