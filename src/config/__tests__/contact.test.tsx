import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { DisasterEventPageProps } from '@/components/events/DisasterEventPage';
import { resolveDrPhone } from '../contact';

// ACMA reserves 02 5550 xxxx for fictional use, so this can never dial anyone.
const DISPLAY = '(02) 5550 1234';
const E164 = '+61255501234';

async function load(display?: string, e164?: string) {
  vi.resetModules();
  vi.stubEnv('NEXT_PUBLIC_DR_PHONE_DISPLAY', display ?? '');
  vi.stubEnv('NEXT_PUBLIC_DR_PHONE_E164', e164 ?? '');
  return {
    contact: await import('../contact'),
    link: await import('@/components/contact/DrPhoneLink'),
    errorState: await import('@/components/antigravity/AgFormPrimitives'),
    claimError: await import('../../../app/claim/error'),
    eventPage: await import('@/components/events/DisasterEventPage'),
  };
}

function telLinks(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll('a[href^="tel:"]')).map(
    (a) => a.getAttribute('href') ?? '',
  );
}

const eventProps: DisasterEventPageProps = {
  eventName: 'Test Event',
  eventType: 'flood',
  eventPhase: 'recovery',
  state: 'Queensland',
  stateAbbr: 'QLD',
  year: 2026,
  iicrcStandard: 'S500',
  affectedLGAs: ['Brisbane'],
  financialAssistance: [],
  metaTitle: 'Test',
  metaDescription: 'Test',
  slug: 'test-event',
};

describe('resolveDrPhone', () => {
  it('returns the pair when both values are usable', () => {
    expect(resolveDrPhone(` ${DISPLAY} `, ` ${E164} `)).toEqual({ display: DISPLAY, e164: E164 });
  });

  it.each([
    [undefined, undefined],
    ['', ''],
    ['   ', E164],
    [DISPLAY, undefined],
    [undefined, E164],
    [DISPLAY, '0255501234'],
    [DISPLAY, '+61 2 5550 1234'],
  ])('treats display=%j e164=%j as no phone number', (display, e164) => {
    expect(resolveDrPhone(display, e164)).toBeNull();
  });
});

describe('when the phone number is not configured', () => {
  beforeEach(() => vi.unstubAllEnvs());
  afterEach(() => vi.unstubAllEnvs());

  it('exports null and an empty call clause', async () => {
    const { contact } = await load();
    expect(contact.DR_PHONE_DISPLAY).toBeNull();
    expect(contact.DR_PHONE_E164).toBeNull();
    expect(contact.DR_CALL_CLAUSE).toBe('');
  });

  it('DrPhoneLink renders nothing', async () => {
    const { link } = await load();
    const { container } = render(<link.DrPhoneLink />);
    expect(container.innerHTML).toBe('');
  });

  it('AgErrorState mentions no phone number', async () => {
    const { errorState } = await load();
    render(<errorState.AgErrorState />);
    expect(screen.getByRole('alert').textContent).toContain('Please try again.');
    expect(screen.getByRole('alert').textContent).not.toMatch(/call/i);
  });

  it('the claim error page has no tel link and still offers the claim form', async () => {
    const { claimError } = await load();
    const ClaimError = claimError.default;
    const { container } = render(<ClaimError error={new Error('x')} reset={() => undefined} />);
    expect(telLinks(container)).toEqual([]);
    expect(container.querySelector('a[href="/claim"]')).not.toBeNull();
  });

  it('an event page passing the unset value shows the claim CTA and no hotline', async () => {
    const { contact, eventPage } = await load();
    const Page = eventPage.default;
    const { container } = render(
      <Page {...eventProps} claimsHotline={contact.DR_PHONE_DISPLAY ?? undefined} />,
    );
    expect(telLinks(container).filter((href) => href !== 'tel:000')).toEqual([]);
    expect(container.querySelector('a[href="/claim"]')).not.toBeNull();
  });
});

describe('when the phone number is configured', () => {
  beforeEach(() => vi.unstubAllEnvs());
  afterEach(() => vi.unstubAllEnvs());

  it('DrPhoneLink dials the E.164 number and shows the display form', async () => {
    const { link } = await load(DISPLAY, E164);
    const { container } = render(<link.DrPhoneLink />);
    expect(telLinks(container)).toEqual([`tel:${E164}`]);
    expect(container.textContent).toBe(`Call ${DISPLAY}`);
    expect(container.querySelector('a')?.getAttribute('aria-label')).toContain(DISPLAY);
  });

  it('AgErrorState and the claim error page offer the number', async () => {
    const { errorState, claimError } = await load(DISPLAY, E164);
    render(<errorState.AgErrorState />);
    expect(screen.getByRole('alert').textContent).toContain(`call ${DISPLAY}`);
    const ClaimError = claimError.default;
    const { container } = render(<ClaimError error={new Error('x')} reset={() => undefined} />);
    expect(telLinks(container)).toEqual([`tel:${E164}`]);
  });

  it('an event page dials a valid tel link from a display number with brackets', async () => {
    const { contact, eventPage } = await load(DISPLAY, E164);
    const Page = eventPage.default;
    const { container } = render(
      <Page {...eventProps} claimsHotline={contact.DR_PHONE_DISPLAY ?? undefined} />,
    );
    expect(telLinks(container)).toContain('tel:0255501234');
  });
});
