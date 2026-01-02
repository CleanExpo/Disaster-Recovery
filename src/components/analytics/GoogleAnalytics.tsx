/**
 * Google Analytics 4 Component
 *
 * Initializes GA4 tracking with GTM support and cookie consent
 */

'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { initializeGA4 } from '@/lib/analytics';

interface GoogleAnalyticsProps {
  measurementId: string;
  gtmId?: string;
  debug?: boolean;
  cookieConsent?: boolean;
}

export function GoogleAnalytics({
  measurementId,
  gtmId,
  debug = false,
  cookieConsent = true,
}: GoogleAnalyticsProps) {
  useEffect(() => {
    // Only initialize if we have consent or consent is not required
    if (cookieConsent || typeof window === 'undefined') {
      initializeGA4({
        measurementId,
        debug,
      });
    }
  }, [measurementId, debug, cookieConsent]);

  // Don't load scripts if consent is required but not given
  if (!cookieConsent) {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />

      {/* Google Tag Manager (Optional) */}
      {gtmId && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}
    </>
  );
}
