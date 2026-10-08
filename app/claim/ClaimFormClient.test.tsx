import React from 'react';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useSearchParams } from 'next/navigation';
import { loadDraft } from '@/lib/offline-store';
import ClaimFormClient from './ClaimFormClient';

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

const makeSafeHeading = 'Emergency make-safe — indicative cost';

async function resumeAtStep(step: number) {
  vi.mocked(loadDraft).mockResolvedValue({
    id: 'current',
    formData: {},
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

describe('claim indicative make-safe pricing', () => {
  it('does not show a make-safe price before a customer starts the form', () => {
    render(<ClaimFormClient />);
    expect(screen.getByRole('region', { name: 'Property & damage information' })).toBeVisible();
    expect(screen.queryByRole('heading', { name: makeSafeHeading })).not.toBeInTheDocument();
    expect(screen.queryByText(/2750|2,750/)).not.toBeInTheDocument();
  });

  it.each([1, 2, 3])('keeps the make-safe price out of intake step %i', async (step) => {
    await resumeAtStep(step);
    expect(screen.queryByRole('heading', { name: makeSafeHeading })).not.toBeInTheDocument();
    expect(screen.queryByText(/2750|2,750/)).not.toBeInTheDocument();
  });

  it('preserves the estimator range without adding a make-safe price above the form', async () => {
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

  it('shows the unchanged price and contractor billing disclosure inside final review', async () => {
    await resumeAtStep(4);
    const review = screen.getByRole('region', { name: 'Final review & submit' });
    expect(within(review).getByRole('heading', { name: makeSafeHeading })).toBeVisible();
    expect(within(review).getAllByText('From ~$2750')).toHaveLength(2);
    expect(within(review).getByText(/No payment is taken when you submit this form/)).toBeVisible();
    expect(within(review).getByText(/Your matched contractor will contact you/)).toBeVisible();
    expect(within(review).getByRole('button', { name: 'Submit Claim' })).toBeVisible();

    fireEvent.click(within(review).getByRole('button', { name: 'Previous' }));
    expect(screen.getByRole('region', { name: 'Authorisations & terms' })).toBeVisible();
    expect(screen.queryByText(/2750|2,750/)).not.toBeInTheDocument();
  });
});
