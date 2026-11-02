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
const queue = vi.hoisted(() => ({
  enabled: false,
  held: [] as Array<{
    id: string;
    payload: Record<string, unknown>;
    queuedAt: number;
    attempts: number;
  }>,
  removeQueuedClaim: vi.fn(),
}));
vi.mock('@/lib/offline-queue', () => ({
  isOfflineQueueEnabled: () => queue.enabled,
  listUnacknowledgedClaims: async () => queue.held,
  removeQueuedClaim: (id: string) => queue.removeQueuedClaim(id),
  replayQueue: async () => ({
    successes: 0,
    failures: 0,
    deadLettered: 0,
    held: queue.held.length,
  }),
  enqueueClaim: async () => ({ ok: false, reason: 'flag-off' }),
}));
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
  queue.enabled = false;
  queue.held = [];
  queue.removeQueuedClaim.mockReset().mockResolvedValue(undefined);
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

describe('claim queued offline before the call-out fee acknowledgement', () => {
  it('restores it at final review, requires the tick, then sends it and clears the queue item', async () => {
    queue.enabled = true;
    queue.held = [
      {
        id: 'q_legacy',
        queuedAt: Date.now() - 60_000,
        attempts: 0,
        // Shape the pre-02/11/2026 form queued: formData + paymentConfirmed/paymentAmount.
        payload: { ...completeDraft, paymentConfirmed: false, paymentAmount: 2750 },
      },
    ];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ success: true, claimId: 'claim-legacy' }),
    });
    vi.stubGlobal('fetch', fetchMock);
    try {
      render(<ClaimFormClient />);
      const review = await screen.findByRole('region', { name: 'Final review & submit' });
      expect(within(review).getByText(/Your saved claim has not been sent yet/)).toBeVisible();
      const submit = within(review).getByRole('button', { name: 'Submit Claim' });
      expect(submit).toBeDisabled();
      expect(fetchMock).not.toHaveBeenCalled();
      expect(document.body.textContent).not.toMatch(FEE_PATTERN);

      fireEvent.click(within(review).getByRole('checkbox', { name: CALLOUT_FEE_ACK_LABEL }));
      await act(async () => {
        fireEvent.click(submit);
      });

      const submitCall = fetchMock.mock.calls.find(([url]) => url === '/api/claims/submit');
      expect(submitCall).toBeDefined();
      const body = JSON.parse(String(submitCall![1].body));
      expect(body).toMatchObject({
        fullName: 'Joe Smith',
        propertyAddress: '42 Smith St',
        calloutFeeAcknowledged: true,
      });
      expect(JSON.stringify(body)).not.toMatch(/2750/);
      expect(queue.removeQueuedClaim).toHaveBeenCalledWith('q_legacy');
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('keeps the held queue item when the resubmission fails', async () => {
    queue.enabled = true;
    queue.held = [
      { id: 'q_legacy', queuedAt: Date.now(), attempts: 0, payload: { ...completeDraft } },
    ];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({ success: false, code: 'CLAIM_PERSISTENCE_FAILED' }),
    });
    vi.stubGlobal('fetch', fetchMock);
    try {
      render(<ClaimFormClient />);
      const review = await screen.findByRole('region', { name: 'Final review & submit' });
      fireEvent.click(within(review).getByRole('checkbox', { name: CALLOUT_FEE_ACK_LABEL }));
      await act(async () => {
        fireEvent.click(within(review).getByRole('button', { name: 'Submit Claim' }));
      });
      expect(fetchMock).toHaveBeenCalled();
      expect(queue.removeQueuedClaim).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
