import React from 'react';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HeldClaimsPanel from './HeldClaimsPanel';
import { CALLOUT_FEE_ACK_LABEL, CALLOUT_FEE_EXPLAINER } from '@/lib/claims/callout-fee-notice';

type Event = { type: string; id?: string };

const q = vi.hoisted(() => ({
  enabled: true,
  listeners: new Set<(e: Event) => void>(),
  readHeldClaims: vi.fn(),
  acknowledgeHeldClaim: vi.fn(),
  removeQueuedClaim: vi.fn(),
  replayEvents: [] as Event[],
  replayQueue: vi.fn(),
}));

vi.mock('@/lib/offline-queue', () => ({
  isOfflineQueueEnabled: () => q.enabled,
  readHeldClaims: () => q.readHeldClaims(),
  acknowledgeHeldClaim: (id: string) => q.acknowledgeHeldClaim(id),
  removeQueuedClaim: (id: string) => q.removeQueuedClaim(id),
  replayQueue: () => q.replayQueue(),
  onQueueEvent: (cb: (e: Event) => void) => {
    q.listeners.add(cb);
    return () => q.listeners.delete(cb);
  },
}));

const legacy = {
  id: 'q_legacy',
  queuedAt: Date.UTC(2026, 9, 30, 1, 0),
  attempts: 0,
  payload: {
    fullName: 'Joe Smith',
    suburb: 'Brisbane',
    state: 'QLD',
    postcode: '4000',
    damageTypes: ['Water/Flood Damage'],
    paymentAmount: 2750,
  },
};

beforeEach(() => {
  q.enabled = true;
  q.listeners.clear();
  q.replayEvents = [];
  q.readHeldClaims.mockReset().mockResolvedValue({ ok: true, items: [legacy] });
  q.acknowledgeHeldClaim.mockReset().mockResolvedValue(true);
  q.removeQueuedClaim.mockReset().mockResolvedValue(true);
  q.replayQueue.mockReset().mockImplementation(async () => {
    q.replayEvents.forEach((e) => q.listeners.forEach((cb) => cb(e)));
    return { successes: 0, failures: 0, deadLettered: 0, held: 0 };
  });
});

afterEach(() => {
  cleanup();
});

async function findClaim() {
  return await screen.findByRole('listitem', { name: 'Saved claim for Joe Smith' });
}

describe('HeldClaimsPanel', () => {
  it('R10 lists a held claim with the explainer and sends it only after the tick', async () => {
    render(<HeldClaimsPanel />);
    const claim = await findClaim();
    expect(screen.getByText(CALLOUT_FEE_EXPLAINER)).toBeVisible();
    expect(within(claim).getByText(/Brisbane QLD 4000/)).toBeVisible();
    expect(document.body.textContent).not.toMatch(/2750|2,750/);

    const send = within(claim).getByRole('button', { name: 'Send this claim' });
    expect(send).toBeDisabled();
    fireEvent.click(send);
    expect(q.acknowledgeHeldClaim).not.toHaveBeenCalled();

    q.replayEvents = [{ type: 'replay-success', id: 'q_legacy' }];
    q.readHeldClaims.mockResolvedValue({ ok: true, items: [] });
    fireEvent.click(within(claim).getByRole('checkbox', { name: CALLOUT_FEE_ACK_LABEL }));
    expect(send).toBeEnabled();
    await act(async () => {
      fireEvent.click(send);
    });

    expect(q.acknowledgeHeldClaim).toHaveBeenCalledWith('q_legacy');
    expect(q.replayQueue).toHaveBeenCalledTimes(1);
    expect(await screen.findByText(/Claim sent/)).toBeVisible();
    expect(screen.queryByRole('listitem', { name: 'Saved claim for Joe Smith' })).toBeNull();
  });

  it('R10 says the claim will be sent when back online if the replay could not reach the server', async () => {
    q.replayEvents = [{ type: 'replay-retry', id: 'q_legacy' }];
    render(<HeldClaimsPanel />);
    const claim = await findClaim();
    q.readHeldClaims.mockResolvedValue({ ok: true, items: [] });
    fireEvent.click(within(claim).getByRole('checkbox', { name: CALLOUT_FEE_ACK_LABEL }));
    await act(async () => {
      fireEvent.click(within(claim).getByRole('button', { name: 'Send this claim' }));
    });
    expect(await screen.findByText(/as soon as you’re back online/)).toBeVisible();
    expect(screen.queryByText(/Claim sent/)).toBeNull();
  });

  it('R10 reports a refused claim instead of claiming it was sent', async () => {
    q.replayEvents = [{ type: 'replay-deadletter', id: 'q_legacy' }];
    render(<HeldClaimsPanel />);
    const claim = await findClaim();
    q.readHeldClaims.mockResolvedValue({ ok: true, items: [] });
    fireEvent.click(within(claim).getByRole('checkbox', { name: CALLOUT_FEE_ACK_LABEL }));
    await act(async () => {
      fireEvent.click(within(claim).getByRole('button', { name: 'Send this claim' }));
    });
    expect(await screen.findByText(/We couldn’t send this claim/)).toBeVisible();
    expect(screen.queryByText(/Claim sent/)).toBeNull();
  });

  it('R6 a failed acknowledgement write shows an error, sends nothing and keeps the claim', async () => {
    q.acknowledgeHeldClaim.mockResolvedValue(false);
    render(<HeldClaimsPanel />);
    const claim = await findClaim();
    fireEvent.click(within(claim).getByRole('checkbox', { name: CALLOUT_FEE_ACK_LABEL }));
    await act(async () => {
      fireEvent.click(within(claim).getByRole('button', { name: 'Send this claim' }));
    });
    expect(within(claim).getByRole('alert')).toHaveTextContent(/couldn’t update this claim/);
    expect(q.replayQueue).not.toHaveBeenCalled();
    expect(await findClaim()).toBeVisible();
  });

  it('R6 removing needs a confirmation, and a failed delete is reported, not hidden', async () => {
    q.removeQueuedClaim.mockResolvedValue(false);
    render(<HeldClaimsPanel />);
    const claim = await findClaim();
    fireEvent.click(within(claim).getByRole('button', { name: 'Remove from this device' }));
    expect(q.removeQueuedClaim).not.toHaveBeenCalled();
    await act(async () => {
      fireEvent.click(within(claim).getByRole('button', { name: 'Yes, remove it' }));
    });
    expect(q.removeQueuedClaim).toHaveBeenCalledWith('q_legacy');
    expect(within(claim).getByRole('alert')).toBeVisible();
    expect(screen.queryByText(/Claim removed/)).toBeNull();
  });

  it('R4 a failed read says it could not check, rather than showing nothing', async () => {
    q.readHeldClaims.mockResolvedValue({ ok: false, reason: 'no-idb' });
    render(<HeldClaimsPanel />);
    expect(await screen.findByText(/couldn’t check this device/)).toBeVisible();
  });

  it('renders nothing and reads nothing when the offline queue flag is off', async () => {
    q.enabled = false;
    const { container } = render(<HeldClaimsPanel />);
    await act(async () => {});
    expect(container).toBeEmptyDOMElement();
    expect(q.readHeldClaims).not.toHaveBeenCalled();
  });

  it('renders nothing when no claims are held', async () => {
    q.readHeldClaims.mockResolvedValue({ ok: true, items: [] });
    const { container } = render(<HeldClaimsPanel />);
    await act(async () => {});
    expect(container).toBeEmptyDOMElement();
  });
});
