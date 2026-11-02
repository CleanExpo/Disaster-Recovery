import React from 'react';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useSearchParams } from 'next/navigation';
import { clearDraft, loadDraft, saveDraft } from '@/lib/offline-store';
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
  readHeldClaims: vi.fn(),
  removeQueuedClaim: vi.fn(),
  enqueueClaim: vi.fn(),
  online: true,
}));
vi.mock('@/lib/offline-queue', () => ({
  isOfflineQueueEnabled: () => queue.enabled,
  // The form must never call these; they exist so a regression is visible.
  readHeldClaims: () => queue.readHeldClaims(),
  removeQueuedClaim: (id: string) => queue.removeQueuedClaim(id),
  replayQueue: async () => ({
    successes: 0,
    failures: 0,
    deadLettered: 0,
    held: queue.held.length,
  }),
  enqueueClaim: (payload: Record<string, unknown>) => queue.enqueueClaim(payload),
}));
vi.mock('@/lib/native-bridge', () => ({
  mediumTap: vi.fn(),
  heavyTap: vi.fn(),
  isOnline: async () => queue.online,
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
  queue.removeQueuedClaim.mockReset().mockResolvedValue(true);
  queue.readHeldClaims.mockReset().mockResolvedValue({ ok: true, items: queue.held });
  queue.enqueueClaim.mockReset().mockResolvedValue({ ok: false, reason: 'flag-off' });
  queue.online = true;
  vi.mocked(saveDraft).mockClear().mockResolvedValue(undefined);
  vi.mocked(clearDraft).mockClear().mockResolvedValue(undefined);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('claim form shows no Disaster Recovery fee', () => {
  it('shows no fee before a customer starts the form', async () => {
    render(<ClaimFormClient />);
    expect(
      await screen.findByRole('region', { name: 'Property & damage information' }),
    ).toBeVisible();
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

// ── Saved-claim lifecycle (DR-966) ──────────────────────────────────────
// docs/plans/2026-11-02-saved-claim-lifecycle.md. Each R test pins one earlier
// review finding (or main's own draft-overwrite bug) so it cannot come back.

const AUTOSAVE_WAIT_MS = 700; // the form debounces autosave by 500 ms

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function savedNames(): unknown[] {
  return vi
    .mocked(saveDraft)
    .mock.calls.map(([draft]) => (draft.formData as { fullName?: unknown }).fullName);
}

function savedDraft(formData: Record<string, unknown>, step = 1) {
  return { id: 'current', formData, step, savedAt: Date.now(), synced: false };
}

async function typeFullName(value: string) {
  const input = await screen.findByLabelText('Full Name *');
  fireEvent.change(input, { target: { value } });
  return input;
}

async function submitAtReview() {
  const review = screen.getByRole('region', { name: 'Final review & submit' });
  fireEvent.click(within(review).getByRole('checkbox', { name: CALLOUT_FEE_ACK_LABEL }));
  await act(async () => {
    fireEvent.click(within(review).getByRole('button', { name: 'Submit Claim' }));
  });
}

describe('saved-claim lifecycle', () => {
  it('R1 a claim the server accepted is never autosaved back as a draft', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ success: true, claimId: 'claim-sent' }),
    });
    vi.stubGlobal('fetch', fetchMock);
    try {
      await resumeAtStep(4, completeDraft);
      await sleep(AUTOSAVE_WAIT_MS);
      await submitAtReview();
      expect(
        await screen.findByRole('region', { name: 'Claim submitted successfully' }),
      ).toBeVisible();
      const savesAtSuccess = vi.mocked(saveDraft).mock.calls.length;
      await act(async () => {
        await sleep(AUTOSAVE_WAIT_MS);
      });
      expect(vi.mocked(saveDraft).mock.calls.length).toBe(savesAtSuccess);
      expect(clearDraft).toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('R1 a claim queued offline is never autosaved back, and no form is left to type into', async () => {
    queue.enabled = true;
    queue.online = false;
    queue.enqueueClaim.mockResolvedValue({ ok: true, id: 'q_new' });
    await resumeAtStep(4, completeDraft);
    await submitAtReview();
    expect(await screen.findByText(/your claim is saved on this device/i)).toBeVisible();
    expect(queue.enqueueClaim).toHaveBeenCalledWith(
      expect.objectContaining({ fullName: 'Joe Smith', calloutFeeAcknowledged: true }),
    );
    const savesAtQueue = vi.mocked(saveDraft).mock.calls.length;
    await act(async () => {
      await sleep(AUTOSAVE_WAIT_MS);
    });
    expect(vi.mocked(saveDraft).mock.calls.length).toBe(savesAtQueue);
    expect(clearDraft).toHaveBeenCalled();
    expect(screen.queryByLabelText('Full Name *')).not.toBeInTheDocument();
  });

  it('R3 a waiting draft is only deleted by the homeowner choosing to start a new claim', async () => {
    vi.mocked(loadDraft).mockResolvedValue(savedDraft({ fullName: 'Waiting Draft' }));
    render(<ClaimFormClient />);
    expect(await screen.findByRole('button', { name: 'Resume' })).toBeVisible();
    // No form to fill (and so nothing to submit) while the choice is open.
    expect(screen.queryByLabelText('Full Name *')).not.toBeInTheDocument();
    await act(async () => {
      await sleep(AUTOSAVE_WAIT_MS);
    });
    expect(clearDraft).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Start a new claim' }));
    expect(clearDraft).toHaveBeenCalledTimes(1);
    expect(await screen.findByLabelText('Full Name *')).toHaveValue('');
  });

  it('R5 typing is saved after starting a new claim', async () => {
    vi.mocked(loadDraft).mockResolvedValue(savedDraft({ fullName: 'Waiting Draft' }));
    render(<ClaimFormClient />);
    fireEvent.click(await screen.findByRole('button', { name: 'Start a new claim' }));
    await typeFullName('New Claim Name');
    await act(async () => {
      await sleep(AUTOSAVE_WAIT_MS);
    });
    expect(savedNames()).toContain('New Claim Name');
  });

  it('R5 typing is saved when there was no draft', async () => {
    render(<ClaimFormClient />);
    await typeFullName('Fresh Claim Name');
    await act(async () => {
      await sleep(AUTOSAVE_WAIT_MS);
    });
    expect(savedNames()).toContain('Fresh Claim Name');
  });

  it('R7 the form never reads or deletes held queue items, and typing is never replaced', async () => {
    queue.enabled = true;
    queue.held = [
      { id: 'q_legacy', queuedAt: Date.now(), attempts: 0, payload: { fullName: 'Held Claim' } },
    ];
    render(<ClaimFormClient />);
    const input = await typeFullName('Typed Name');
    await act(async () => {
      await sleep(AUTOSAVE_WAIT_MS);
    });
    expect(input).toHaveValue('Typed Name');
    expect(screen.getByRole('region', { name: 'Property & damage information' })).toBeVisible();
    expect(queue.readHeldClaims).not.toHaveBeenCalled();
    expect(queue.removeQueuedClaim).not.toHaveBeenCalled();
    expect(savedNames()).not.toContain('Held Claim');
  });

  it('R7 after the homeowner chose to start a new claim, a late draft lookup never replaces typing', async () => {
    let answer: (d: ReturnType<typeof savedDraft>) => void = () => {};
    vi.mocked(loadDraft).mockReturnValue(
      new Promise((resolve) => {
        answer = resolve;
      }),
    );
    render(<ClaimFormClient />);
    fireEvent.click(
      await screen.findByRole('button', { name: 'Start a new claim' }, { timeout: 4000 }),
    );
    const input = await typeFullName('Typed After Choice');
    await act(async () => {
      answer(savedDraft({ fullName: 'Late Draft' }));
      await sleep(AUTOSAVE_WAIT_MS);
    });
    expect(input).toHaveValue('Typed After Choice');
    expect(screen.queryByRole('button', { name: 'Resume' })).not.toBeInTheDocument();
    expect(savedNames()).toContain('Typed After Choice');
  }, 10_000);

  it('R7 a draft lookup that answers while the page is still waiting is offered as normal', async () => {
    let answer: (d: ReturnType<typeof savedDraft>) => void = () => {};
    vi.mocked(loadDraft).mockReturnValue(
      new Promise((resolve) => {
        answer = resolve;
      }),
    );
    render(<ClaimFormClient />);
    await screen.findByRole('button', { name: 'Start a new claim' }, { timeout: 4000 });
    await act(async () => {
      answer(savedDraft({ fullName: 'Late Draft' }));
    });
    fireEvent.click(await screen.findByRole('button', { name: 'Resume' }));
    expect(await screen.findByLabelText('Full Name *')).toHaveValue('Late Draft');
  }, 10_000);

  it('R8 after the 3 s lookup limit nothing is editable until the homeowner chooses, then typing is saved', async () => {
    vi.mocked(loadDraft).mockReturnValue(new Promise(() => {}));
    render(<ClaimFormClient />);
    expect(screen.getByRole('status')).toHaveTextContent(/Checking this device/);
    const start = await screen.findByRole(
      'button',
      { name: 'Start a new claim' },
      { timeout: 4000 },
    );
    expect(screen.getByText(/taking longer than usual/)).toBeVisible();
    // No form, so nothing can be typed and lost, and nothing has been written.
    expect(screen.queryByLabelText('Full Name *')).not.toBeInTheDocument();
    expect(saveDraft).not.toHaveBeenCalled();
    expect(clearDraft).not.toHaveBeenCalled();

    fireEvent.click(start);
    expect(clearDraft).toHaveBeenCalledTimes(1);
    await typeFullName('Typed After Choice');
    await act(async () => {
      await sleep(AUTOSAVE_WAIT_MS);
    });
    expect(savedNames()).toContain('Typed After Choice');
  }, 10_000);

  it('R9 the saved draft is not overwritten before the homeowner chooses, and Resume restores it', async () => {
    vi.mocked(loadDraft).mockResolvedValue(savedDraft({ fullName: 'Saved Earlier' }));
    render(<ClaimFormClient />);
    const resume = await screen.findByRole('button', { name: 'Resume' });
    await act(async () => {
      await sleep(AUTOSAVE_WAIT_MS);
    });
    expect(saveDraft).not.toHaveBeenCalled();
    fireEvent.click(resume);
    expect(await screen.findByLabelText('Full Name *')).toHaveValue('Saved Earlier');
  });

  it('R9 an untouched visit writes nothing to the draft slot', async () => {
    render(<ClaimFormClient />);
    await screen.findByLabelText('Full Name *');
    await act(async () => {
      await sleep(AUTOSAVE_WAIT_MS);
    });
    expect(saveDraft).not.toHaveBeenCalled();
  });
});
