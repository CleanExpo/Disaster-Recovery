/**
 * Google Consent Mode v2 bridge.
 *
 * Defaults to denied for all optional consent signals (analytics_storage,
 * ad_storage, ad_user_data, ad_personalization, personalization_storage).
 * Called from ConsentModeInit (beforeInteractive) before GTM loads.
 *
 * updateConsentMode() fires gtag('consent', 'update', ...) when the user
 * saves preferences in the ConsentBanner, so tags respect the choice
 * without a page reload.
 */

// window.gtag and window.dataLayer are declared in src/types/global.d.ts.

export interface ConsentSignals {
  analytics: boolean;
  productExperience: boolean;
  marketing: boolean;
}

/**
 * Inline script string to fire consent-mode defaults before GTM loads.
 * Emitted via <Script strategy="beforeInteractive"> in ConsentModeInit.
 */
export const CONSENT_MODE_DEFAULT_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  personalization_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
`.trim();

/**
 * Fire gtag('consent', 'update', ...) based on user preferences.
 * Safe to call during SSR (no-ops when window is undefined).
 */
export function updateConsentMode(signals: ConsentSignals): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  const analytics = signals.analytics ? 'granted' : 'denied';
  const marketing = signals.marketing ? 'granted' : 'denied';
  const productExperience = signals.productExperience ? 'granted' : 'denied';

  window.gtag('consent', 'update', {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
    personalization_storage: productExperience,
  });
}
