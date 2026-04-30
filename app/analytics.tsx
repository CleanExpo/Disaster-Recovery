'use client';

import Script from 'next/script';

type GtagFn = (...args: unknown[]) => void;
type FbqFn = (...args: unknown[]) => void;
type DataLayer = Array<Record<string, unknown>>;

interface AnalyticsWindow extends Window {
  gtag?: GtagFn;
  fbq?: FbqFn;
  dataLayer?: DataLayer;
}

function getAnalyticsWindow(): AnalyticsWindow | undefined {
  return typeof window !== 'undefined' ? (window as AnalyticsWindow) : undefined;
}

export function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

  if (!GA_ID || GA_ID === 'G-XXXXXXXXXX') {
    return null;
  }

  return (
    <div>
      {/*
        D5 Lighthouse CWV: analytics scripts deferred to `lazyOnload`
        (browser-idle time after page-load) so they're off the
        Time-To-Interactive critical path. GA does not need to fire
        before the user can interact — page-view events still capture
        once the script lands a few hundred ms later.
      */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </div>
  );
}

export function GoogleTagManager() {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';

  if (!GTM_ID || GTM_ID === 'GTM-XXXXXXX') {
    return null;
  }

  return (
    <div>
      {/* D5 Lighthouse CWV: deferred to lazyOnload (see GA comment above). */}
      <Script id="google-tag-manager" strategy="lazyOnload">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </div>
  );
}

export function MicrosoftClarity() {
  const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || '';

  if (!CLARITY_ID) {
    return null;
  }

  return (
    // D5 Lighthouse CWV: deferred to lazyOnload (see GA comment above).
    <Script id="microsoft-clarity" strategy="lazyOnload">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}

export function FacebookPixel() {
  const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

  if (!PIXEL_ID) {
    return null;
  }

  return (
    // D5 Lighthouse CWV: deferred to lazyOnload (see GA comment above).
    <Script id="facebook-pixel" strategy="lazyOnload">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}

// Track custom events
export function trackEvent(eventName: string, parameters?: Record<string, unknown>) {
  const w = getAnalyticsWindow();
  if (!w) return;

  // Google Analytics
  if (w.gtag) {
    w.gtag('event', eventName, parameters);
  }

  // Facebook Pixel
  if (w.fbq) {
    w.fbq('track', eventName, parameters);
  }

  // Google Tag Manager
  if (w.dataLayer) {
    w.dataLayer.push({
      event: eventName,
      ...parameters,
    });
  }
}

// Track lead submissions
export function trackLead(leadData: {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  [key: string]: unknown;
}) {
  trackEvent('generate_lead', {
    value: leadData.value || 550,
    currency: leadData.currency || 'AUD',
    ...leadData,
  });

  // Facebook specific lead event
  const w = getAnalyticsWindow();
  if (w?.fbq) {
    w.fbq('track', 'Lead', leadData);
  }
}

// Track conversions
export function trackConversion(conversionData: {
  value: number;
  currency?: string;
  transaction_id?: string;
  [key: string]: unknown;
}) {
  trackEvent('conversion', {
    currency: 'AUD',
    ...conversionData,
  });

  // Facebook Purchase event
  const w = getAnalyticsWindow();
  if (w?.fbq) {
    w.fbq('track', 'Purchase', {
      value: conversionData.value,
      currency: conversionData.currency || 'AUD',
    });
  }
}
