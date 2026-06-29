/**
 * Unit tests for src/lib/analytics/track.ts
 *
 * Verifies that conversion helpers forward to every installed analytics
 * global (gtag / dataLayer / fbq) with the expected event names and that
 * trackLead applies the default AUD lead value.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { trackEvent, trackLead, trackEmergencyCall } from '../track';

describe('analytics/track', () => {
  let gtag: ReturnType<typeof vi.fn>;
  let fbq: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    gtag = vi.fn();
    fbq = vi.fn();
    window.gtag = gtag as unknown as typeof window.gtag;
    window.fbq = fbq as unknown as typeof window.fbq;
    window.dataLayer = [];
  });

  afterEach(() => {
    delete window.gtag;
    delete window.fbq;
    delete window.dataLayer;
  });

  it('trackEvent forwards to gtag, dataLayer and fbq', () => {
    trackEvent('demo_event', { foo: 'bar' });

    expect(gtag).toHaveBeenCalledWith('event', 'demo_event', { foo: 'bar' });
    expect(window.dataLayer).toContainEqual({ event: 'demo_event', foo: 'bar' });
    expect(fbq).toHaveBeenCalledWith('trackCustom', 'demo_event', { foo: 'bar' });
  });

  it('trackLead emits generate_lead + lead_submit with default AUD value', () => {
    trackLead({ content_name: 'contact_form' });

    const eventNames = gtag.mock.calls.map((c) => c[1]);
    expect(eventNames).toContain('generate_lead');
    expect(eventNames).toContain('lead_submit');

    const leadCall = gtag.mock.calls.find((c) => c[1] === 'generate_lead');
    expect(leadCall?.[2]).toMatchObject({ value: 550, currency: 'AUD', content_name: 'contact_form' });

    // Meta standard Lead event also fires
    expect(fbq).toHaveBeenCalledWith('track', 'Lead', expect.objectContaining({ value: 550 }));
  });

  it('trackLead respects an explicit value', () => {
    trackLead({ value: 1200, content_name: 'lead_capture_form' });
    const leadCall = gtag.mock.calls.find((c) => c[1] === 'generate_lead');
    expect(leadCall?.[2]).toMatchObject({ value: 1200 });
  });

  it('trackEmergencyCall emits an emergency_call event with the number', () => {
    trackEmergencyCall('1300309361');
    expect(gtag).toHaveBeenCalledWith(
      'event',
      'emergency_call',
      expect.objectContaining({ phone_number: '1300309361', content_name: 'phone_cta' }),
    );
  });

  it('helpers are safe no-ops when no analytics globals are present', () => {
    delete window.gtag;
    delete window.fbq;
    delete window.dataLayer;
    expect(() => trackEvent('x')).not.toThrow();
    expect(() => trackLead({})).not.toThrow();
  });
});
