'use client';

import { useEffect } from 'react';
import { trackEmergencyCall } from '@/lib/analytics/track';

/**
 * Fires an `emergency_call` conversion event whenever the user clicks any
 * `tel:` link on the site. Uses a single delegated document-level listener so
 * every current and future phone CTA is covered without per-component wiring.
 *
 * Mounted once in app/layout.tsx.
 */
export function PhoneCallTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const phoneNumber = anchor.getAttribute('href')?.replace(/^tel:/, '') ?? '';

      // Skip emergency-services dials (000) — not a business conversion signal.
      if (phoneNumber.replace(/\D/g, '') === '000') return;

      trackEmergencyCall(phoneNumber);
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  return null;
}
