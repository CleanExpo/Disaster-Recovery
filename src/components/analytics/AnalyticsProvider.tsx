/**
 * Analytics Provider Component
 *
 * Wraps the app with analytics initialization and cookie consent
 */

'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { GoogleAnalytics } from './GoogleAnalytics';
import { CookieConsent, type CookiePreferences, hasAnalyticsConsent } from './CookieConsent';
import { useGA4PageAnalytics } from '@/hooks/useGA4';

interface AnalyticsProviderProps {
  children: ReactNode;
  measurementId: string;
  gtmId?: string;
  debug?: boolean;
}

export function AnalyticsProvider({
  children,
  measurementId,
  gtmId,
  debug = false,
}: AnalyticsProviderProps) {
  const [cookieConsent, setCookieConsent] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has already given consent
    setCookieConsent(hasAnalyticsConsent());
  }, []);

  const handleConsentChange = (preferences: CookiePreferences) => {
    setCookieConsent(preferences.analytics);
  };

  // Enable comprehensive page tracking once consent is given
  useGA4PageAnalytics({
    enableScrollTracking: cookieConsent,
    enableTimeTracking: cookieConsent,
    enableOutboundTracking: cookieConsent,
  });

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {/* GA4 Scripts */}
      <GoogleAnalytics
        measurementId={measurementId}
        gtmId={gtmId}
        debug={debug}
        cookieConsent={cookieConsent}
      />

      {/* Cookie Consent Banner */}
      <CookieConsent onConsentChange={handleConsentChange} />

      {children}
    </>
  );
}
