/**
 * Lead fields are attacker-controllable via the public capture endpoint, and
 * they are interpolated into the partner/admin notification HTML. Assert that
 * HTML in a lead field is escaped, not rendered as markup.
 */
import { describe, it, expect } from 'vitest';
import { emailTemplates } from '@/lib/email';

describe('email HTML injection', () => {
  it('escapes user-supplied HTML in the lead notification', () => {
    const { html, subject } = emailTemplates.leadNotification({
      id: 'lead1',
      fullName: '<script>alert(1)</script>',
      email: 'a"b<img src=x onerror=alert(1)>@evil.com',
      serviceType: 'water',
      suburb: 'Brisbane',
      state: 'QLD',
      postcode: '4000',
      propertyType: 'residential',
      hasInsurance: true,
      leadScore: 90,
      leadValue: 550,
    });
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).not.toContain('<img src=x');
    expect(subject).not.toContain('<script>');
  });

  it('escapes user-supplied HTML in the partner assignment', () => {
    const { html } = emailTemplates.partnerLeadAssignment(
      { businessName: 'Acme' },
      {
        id: 'lead1',
        fullName: '<b>bad</b>',
        serviceType: 'fire',
        address: '<script>x</script>',
        suburb: 'Brisbane',
        hasInsurance: false,
        leadValue: 550,
        urgencyLevel: 'emergency',
      },
    );
    expect(html).not.toContain('<script>x</script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).not.toContain('<b>bad</b>');
  });
});
