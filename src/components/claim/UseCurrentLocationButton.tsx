'use client';

/**
 * "Use my current location" button for the /claim property-address
 * section. Collects a single position fix on tap (never on page load),
 * POSTs lat/lng to /api/public/reverse-geocode, and pre-fills the
 * address fields on success.
 *
 * DR-725 iOS App epic, Phase 2 PR #3.
 *
 * Privacy notes (.claude/rules/privacy.md APP 3 + APP 5):
 * - Renders only when the native bridge is live OR the browser
 *   Geolocation API exists — gated behind NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED.
 * - The consent note under the button covers APP 5 (notification of
 *   collection at the point of collection).
 * - Failures are silent no-ops — no modal, no error tracking. Button
 *   returns to idle so the user can retry or type the address.
 */

import { useEffect, useState } from 'react';
import { getCurrentPosition, isNative, tap, mediumTap } from '@/lib/native-bridge';

type AddressResult = {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
};

type ReverseGeocodeResponse =
  | { ok: true; address: AddressResult }
  | { ok: false; error: string };

export type LocationAutofill = {
  address: string;
  suburb: string;
  state: string;
  postcode: string;
};

export interface UseCurrentLocationButtonProps {
  /** Called with the mapped AU address fields on a successful geocode. */
  onAutofill: (fields: LocationAutofill) => void;
}

const FLAG_ENABLED =
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED === 'true';

/**
 * Web-only fallback when the Capacitor bridge is not active. Mirrors
 * the native-bridge return shape so the caller can be shape-agnostic.
 */
async function getWebPosition(): Promise<
  { lat: number; lng: number; accuracyMeters: number } | null
> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) return null;
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracyMeters: pos.coords.accuracy,
        }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 0 },
    );
  });
}

export default function UseCurrentLocationButton({
  onAutofill,
}: UseCurrentLocationButtonProps) {
  const [canRender, setCanRender] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!FLAG_ENABLED) return;
    if (typeof navigator === 'undefined') return;
    const hasWebGeo = Boolean(navigator.geolocation);
    setCanRender(isNative() || hasWebGeo);
  }, []);

  if (!canRender) return null;

  const handleTap = async () => {
    if (busy) return;
    // Phase 2 PR #6 — light haptic on press (RA-1633). No-op on web.
    void tap();
    setBusy(true);
    try {
      const position = isNative()
        ? await getCurrentPosition()
        : await getWebPosition();

      if (!position) {
        setBusy(false);
        return;
      }

      const response = await fetch('/api/public/reverse-geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat: position.lat, lng: position.lng }),
      });

      if (!response.ok) {
        setBusy(false);
        return;
      }

      const result = (await response.json()) as ReverseGeocodeResponse;
      if (!result.ok) {
        setBusy(false);
        return;
      }

      // Phase 2 PR #6 — medium haptic on successful autofill (RA-1633). No-op on web.
      void mediumTap();
      onAutofill({
        address: result.address.street,
        suburb: result.address.suburb,
        state: result.address.state,
        postcode: result.address.postcode,
      });
    } catch {
      // Silent — failure returns to idle, user types the address.
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mb-3">
      <button
        type="button"
        onClick={handleTap}
        disabled={busy}
        aria-label="Use my current location to pre-fill the property address"
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-blue-400 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span aria-hidden="true">📍</span>
        {busy ? 'Locating…' : 'Use my current location'}
      </button>
      <p className="mt-1 text-xs text-gray-500 leading-snug">
        Your location is sent securely to our geocoder to pre-fill the
        address. It is not stored.
      </p>
    </div>
  );
}
