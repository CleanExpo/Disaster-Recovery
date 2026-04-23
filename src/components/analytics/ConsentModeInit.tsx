'use client';

import Script from 'next/script';
import { CONSENT_MODE_DEFAULT_SCRIPT } from '@/lib/analytics/consent';

/**
 * Emits the Google Consent Mode v2 default-deny block BEFORE GTM loads.
 * Must be mounted in app/layout.tsx above <GoogleTagManager /> so the
 * defaults win on first paint.
 */
export function ConsentModeInit() {
  return (
    <Script
      id="consent-mode-default"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: CONSENT_MODE_DEFAULT_SCRIPT }}
    />
  );
}
