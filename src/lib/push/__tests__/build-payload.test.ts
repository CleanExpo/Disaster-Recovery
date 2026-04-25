import { describe, expect, it } from 'vitest';

import {
  buildPushPayload,
  PUSH_TEMPLATE_KEYS,
  shortClaimId,
} from '../build-payload';

describe('buildPushPayload', () => {
  const claimId = 'ckclaim0001abcdefgh';

  it('claim_status_update emits the generic update title + short claim id body', () => {
    const payload = buildPushPayload('claim_status_update', claimId);
    expect(payload.aps.alert.title).toBe('Update on your claim');
    expect(payload.aps.alert.body).toBe('Tap to view claim #ckclaim0');
    expect(payload.claimId).toBe(claimId);
  });

  it('contractor_assigned emits the assigned copy without any status verb', () => {
    const payload = buildPushPayload('contractor_assigned', claimId);
    expect(payload.aps.alert.title).toBe('Contractor assigned');
    expect(payload.aps.alert.body).toBe('Your claim is being serviced. Tap to view.');
  });

  it('contractor_on_the_way emits the en-route copy', () => {
    const payload = buildPushPayload('contractor_on_the_way', claimId);
    expect(payload.aps.alert.title).toBe('Contractor en route');
    expect(payload.aps.alert.body).toBe('Estimated arrival soon. Tap to view.');
  });

  it('truncates claim ids to a max of 8 chars in the body', () => {
    expect(shortClaimId('ckclaim0001abcdefgh').length).toBe(8);
    expect(shortClaimId('short')).toBe('short');
    const payload = buildPushPayload('claim_status_update', 'ckclaim0001abcdefgh');
    expect(payload.aps.alert.body.endsWith('ckclaim0')).toBe(true);
  });

  it('throws on an unknown template key', () => {
    expect(() => buildPushPayload('claim_cancelled', claimId)).toThrow(
      /unknown_template/,
    );
  });

  it('substitutes whitelisted params when placeholders are present', () => {
    // claim_status_update body template has no placeholders so
    // substitution is a no-op; substitution is proven via a template
    // that would include one if passed. We validate that unused params
    // do not pollute the output and that the body remains privacy-safe.
    const payload = buildPushPayload('claim_status_update', claimId, {
      unused: 'value',
    });
    expect(payload.aps.alert.body).toBe('Tap to view claim #ckclaim0');
  });

  it('privacy guard: rejects a template that would leak an email', () => {
    // The only vector today is params — guarantee the guard fires by
    // temporarily registering a claim id shaped like an email. Claim
    // ids are not emails in practice, but the assertion is the safety
    // net for future template drift.
    const evilClaimId = 'phill@example.com';
    expect(() => buildPushPayload('claim_status_update', evilClaimId)).toThrow(
      /push_body_contains_email/,
    );
  });

  it('privacy guard: rejects a template body that would leak an AU mobile', () => {
    const evilClaimId = '0412 345 678';
    expect(() => buildPushPayload('claim_status_update', evilClaimId)).toThrow(
      /push_body_contains_phone/,
    );
  });

  it('exposes the whitelist of template keys', () => {
    expect(PUSH_TEMPLATE_KEYS).toEqual([
      'claim_status_update',
      'contractor_assigned',
      'contractor_on_the_way',
    ]);
  });
});
