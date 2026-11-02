import React from 'react';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useSearchParams } from 'next/navigation';
import { loadDraft } from '@/lib/offline-store';
import ClaimFormClient from './ClaimFormClient';
import { CALLOUT_FEE_ACK_LABEL, CALLOUT_FEE_EXPLAINER } from '@/lib/claims/callout-fee-notice';

vi.mock('next/navigation', () => ({ useSearchParams: vi.fn() }));
vi.mock('next/dynamic', () => ({ default: () => () => null }));
vi.mock('@/components/antigravity', () => ({
  AntigravityNavbar: () => null,
  AntigravityFooter: () => null,
  AgStepProgress: () => null,
  AgFormShell: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section aria-label={title}>{children}</section>
  ),
}));
vi.mock('@/lib/language-context', () => ({
  useLanguage: () => ({ language: 'en', isEnglish: true }),
}));
vi.mock('@/lib/offline-store', () => ({
  loadDraft: vi.fn(),
  saveDraft: vi.fn().mockResolvedValue(undefined),
  clearDraft: vi.fn().mockResolvedValue(undefined),
  getUnsynced: vi.fn().mockResolvedValue([]),
}));
vi.mock('@/lib/offline-queue', () => ({ isOfflineQueueEnabled: () => false }));
vi.mock('@/lib/native-bridge', () => ({
  mediumTap: vi.fn(),
  heavyTap: vi.fn(),
  isOnline: () => true,
}));

const FEE_PATTERN = /2750|2,750|From ~\$/;

const completeDraft = {
  fullName: 'Joe Smith',
  phone: '0412345678',
  email: 'joe@example.com',
  propertyAddress: '42 Smith St',
  suburb: 'Brisbane',
  state: 'QLD',
  postcode: '4000',
  propertyType: 'house',
  damageDescription: 'burst pipe in kitchen',
  damageTypes: ['Water/Flood Damage'],
  urgencyLevel: 'urgent',
  privacyCollectionNotice: true,
  understandPlatformRole: true,
  acceptContractorCommunication: true,
  agreeToTerms: true,
};

async function resumeAtStep(step: number, formData: Record<string, unknown> = {}) {
  vi.mocked(loadDraft).mockResolvedValue({
    id: 'current',
    formData,
    step,
    savedAt: Date.now(),
    synced: false,
  });
  render(<ClaimFormClient />);
  const resume = await screen.findByRole('button', { name: 'Resume' });
  await act(async () => {
    fireEvent.click(resume);
  });
  expect(
    screen.getByRole('region', {
      name: [
        'Property & damage information',
        'Insurance & documentation',
        'Authorisations & terms',
        'Final review & submit',
      ][step - 1],
    }),
  ).toBeVisible();
}

beforeEach(() => {
  vi.mocked(useSearchParams).mockReturnValue(
    new URLSearchParams() as ReturnType<typeof useSearchParams>,
  );
  vi.mocked(loadDraft).mockResolvedValue(null);
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('claim form shows no Disaster Recovery fee', () => {
  it('shows no fee before a customer starts the form', () => {
    render(<ClaimFormClient />);
    expect(screen.getByRole('region', { name: 'Property & damage information' })).toBeVisible();
    expect(screen.queryByText(FEE_PATTERN)).not.toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(FEE_PATTERN);
  });

  it.each([1, 2, 3, 4])('shows no fee on step %i', async (step) => {
    await resumeAtStep(step);
    expect(document.body.textContent).not.toMatch(FEE_PATTERN);
    expect(screen.queryByText(/Total Due/i)).not.toBeInTheDocument();
  });

  it('preserves the estimator range without adding a fee', async () => {
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams('estimateLow=4000&estimateHigh=8000') as ReturnType<
        typeof useSearchParams
      >,
    );
    render(<ClaimFormClient />);
    expect(
      await screen.findByText(/Your estimated restoration cost: \$4,000 – \$8,000/),
    ).toBeVisible();
    expect(screen.queryByText(/2750|2,750/)).not.toBeInTheDocument();
  });
});

describe('call-out fee explainer and required tick box', () => {
  it('shows the exact explainer and an unticked box in final review', async () => {
    await resumeAtStep(4);
    const review = screen.getByRole('region', { name: 'Final review & submit' });
    expect(within(review).getByText(CALLOUT_FEE_EXPLAINER)).toBeVisible();
    const box = within(review).getByRole('checkbox', { name: CALLOUT_FEE_ACK_LABEL });
    expect(box).not.toBeChecked();
    expect(within(review).getByRole('button', { name: 'Submit Claim' })).toBeDisabled();
  });

  it('enables submit only after the box is ticked', async () => {
    await resumeAtStep(4, completeDraft);
    const review = screen.getByRole('region', { name: 'Final review & submit' });
    const submit = within(review).getByRole('button', { name: 'Submit Claim' });
    expect(submit).toBeDisabled();
    fireEvent.click(within(review).getByRole('checkbox', { name: CALLOUT_FEE_ACK_LABEL }));
    expect(submit).toBeEnabled();
    fireEvent.click(within(review).getByRole('checkbox', { name: CALLOUT_FEE_ACK_LABEL }));
    expect(submit).toBeDisabled();
  });

  it('sends calloutFeeAcknowledged: true and no fee amount to the server', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true, claimId: 'claim-123' }),
    });
    vi.stubGlobal('fetch', fetchMock);
    try {
      await resumeAtStep(4, completeDraft);
      const review = screen.getByRole('region', { name: 'Final review & submit' });
      fireEvent.click(within(review).getByRole('checkbox', { name: CALLOUT_FEE_ACK_LABEL }));
      await act(async () => {
        fireEvent.click(within(review).getByRole('button', { name: 'Submit Claim' }));
      });
      const submitCall = fetchMock.mock.calls.find(([url]) => url === '/api/claims/submit');
      expect(submitCall).toBeDefined();
      const body = JSON.parse(String(submitCall![1].body));
      expect(body.calloutFeeAcknowledged).toBe(true);
      expect(JSON.stringify(body)).not.toMatch(/2750/);
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
