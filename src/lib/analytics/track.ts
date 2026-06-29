/**
 * Client-side conversion event tracking.
 *
 * Thin wrapper over the analytics globals (gtag / dataLayer / fbq) that the
 * inline GA4 snippet in app/layout.tsx and GoogleTagManager install. Every
 * helper is a no-op during SSR and when the relevant global is absent, so it
 * is always safe to call from a component event handler.
 *
 * Consent is enforced upstream by Google Consent Mode v2 (see
 * src/lib/analytics/consent.ts): gtag queues events and only forwards them
 * once analytics_storage is granted, so callers do not gate on consent here.
 *
 * window.gtag / window.dataLayer / window.fbq are declared in
 * src/types/global.d.ts.
 */

const DEFAULT_LEAD_VALUE_AUD = 550;

/**
 * Fire a custom event to GA4 (gtag), GTM (dataLayer) and Meta (fbq).
 */
export function trackEvent(eventName: string, parameters: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...parameters });
  }

  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, parameters);
  }
}

/**
 * Track a lead submission (contact / lead-capture / quick-response forms).
 * Emits GA4 `generate_lead` + a granular `lead_submit`, and the Meta `Lead`
 * standard event, so the conversion is visible in every connected platform.
 */
export function trackLead(
  leadData: {
    value?: number;
    currency?: string;
    content_name?: string;
    lead_type?: string;
    [key: string]: unknown;
  } = {},
): void {
  const payload = {
    value: leadData.value ?? DEFAULT_LEAD_VALUE_AUD,
    currency: leadData.currency ?? 'AUD',
    ...leadData,
  };

  trackEvent('generate_lead', payload);
  trackEvent('lead_submit', payload);

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', payload);
  }
}

/**
 * Track an emergency phone-call intent (click on a `tel:` link).
 * Wired globally via PhoneCallTracker, so individual CTAs need no changes.
 */
export function trackEmergencyCall(phoneNumber: string): void {
  trackEvent('emergency_call', {
    phone_number: phoneNumber,
    content_name: 'phone_cta',
  });
}
