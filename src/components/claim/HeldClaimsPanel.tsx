'use client';

/**
 * HeldClaimsPanel — recovery for claims queued offline before the call-out
 * fee acknowledgement existed (DR-966).
 *
 * Such claims are held in the offline queue: never sent, never dead-lettered,
 * because consent is never inferred. This panel lists them, shows the call-out
 * fee explainer, and lets the homeowner tick and send each one, or remove it.
 *
 * It is deliberately separate from the claim form: it never reads or writes
 * the form or its draft slot, and the form never reads held claims. Ticking
 * turns a held claim into an ordinary queued claim and runs the normal replay,
 * so it gets the same send, retry and dead-letter handling as any queued claim.
 * Design: docs/plans/2026-11-02-saved-claim-lifecycle.md.
 *
 * Gated behind NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED; renders null when off.
 */

import { useCallback, useEffect, useState } from 'react';
import {
  acknowledgeHeldClaim,
  isOfflineQueueEnabled,
  onQueueEvent,
  readHeldClaims,
  removeQueuedClaim,
  replayQueue,
  type QueueEvent,
  type QueuedClaim,
} from '@/lib/offline-queue';
import { CALLOUT_FEE_ACK_LABEL, CALLOUT_FEE_EXPLAINER } from '@/lib/claims/callout-fee-notice';
const DR_CALL_CLAUSE = ', or call 1300 309 361';

type Outcome = 'sent' | 'waiting' | 'not-accepted' | 'removed';

const OUTCOME_TEXT: Record<Outcome, string> = {
  sent: 'Claim sent. A contractor will be in touch.',
  waiting: 'Saved with your tick. We’ll send it as soon as you’re back online.',
  'not-accepted': `We couldn’t send this claim. Please check the notice above${DR_CALL_CLAUSE}.`,
  removed: 'Claim removed from this device.',
};

const WRITE_FAILED = `We couldn’t update this claim on your device. Please try again${DR_CALL_CLAUSE}.`;

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function summary(item: QueuedClaim): { name: string; place: string; damage: string } {
  const p = item.payload ?? {};
  const place = [text(p.suburb), text(p.state), text(p.postcode)].filter(Boolean).join(' ');
  const damage = Array.isArray(p.damageTypes)
    ? p.damageTypes.filter((d): d is string => typeof d === 'string').join(', ')
    : '';
  return { name: text(p.fullName), place, damage };
}

function formatQueuedAt(ts: number): string {
  return new Date(ts).toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' });
}

/** Run one replay and report what happened to `id`. */
async function sendAcknowledged(id: string): Promise<Outcome> {
  let outcome: Outcome = 'waiting';
  const off = onQueueEvent((event: QueueEvent) => {
    if (!('id' in event) || event.id !== id) return;
    if (event.type === 'replay-success') outcome = 'sent';
    else if (event.type === 'replay-deadletter') outcome = 'not-accepted';
  });
  try {
    await replayQueue();
  } catch {
    // The tick is stored; the next replay sends it.
  } finally {
    off();
  }
  return outcome;
}

export default function HeldClaimsPanel(): JSX.Element | null {
  const [read, setRead] = useState<'loading' | 'ok' | 'failed'>('loading');
  const [held, setHeld] = useState<QueuedClaim[]>([]);
  const [ticked, setTicked] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Outcomes outlive the held list: a sent claim is no longer held.
  const [outcomes, setOutcomes] = useState<Array<{ id: string; name: string; outcome: Outcome }>>(
    [],
  );

  const refresh = useCallback(async () => {
    const result = await readHeldClaims();
    if (result.ok) {
      setHeld(result.items);
      setRead('ok');
    } else {
      setRead('failed');
    }
  }, []);

  useEffect(() => {
    if (!isOfflineQueueEnabled()) return;
    void refresh();
  }, [refresh]);

  const finish = useCallback(
    async (item: QueuedClaim, outcome: Outcome) => {
      setOutcomes((prev) => [...prev, { id: item.id, name: summary(item).name, outcome }]);
      await refresh();
    },
    [refresh],
  );

  const handleSend = useCallback(
    async (item: QueuedClaim) => {
      if (busy || !ticked[item.id]) return;
      setBusy(item.id);
      setErrors((prev) => ({ ...prev, [item.id]: '' }));
      try {
        const stored = await acknowledgeHeldClaim(item.id);
        if (!stored) {
          setErrors((prev) => ({ ...prev, [item.id]: WRITE_FAILED }));
          return;
        }
        await finish(item, await sendAcknowledged(item.id));
      } finally {
        setBusy(null);
      }
    },
    [busy, ticked, finish],
  );

  const handleRemove = useCallback(
    async (item: QueuedClaim) => {
      if (busy) return;
      setBusy(item.id);
      try {
        const removed = await removeQueuedClaim(item.id);
        if (!removed) {
          setErrors((prev) => ({ ...prev, [item.id]: WRITE_FAILED }));
          return;
        }
        setConfirmRemove(null);
        await finish(item, 'removed');
      } finally {
        setBusy(null);
      }
    },
    [busy, finish],
  );

  if (!isOfflineQueueEnabled()) return null;
  if (read === 'loading') return null;

  if (read === 'failed') {
    return (
      <div
        role="status"
        className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900"
      >
        We couldn&rsquo;t check this device for claims saved earlier. Reload the page to try again
        {DR_CALL_CLAUSE}.
      </div>
    );
  }

  if (held.length === 0 && outcomes.length === 0) return null;

  return (
    <section
      aria-label="Claims saved on this device"
      className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-950"
    >
      {held.length > 0 && (
        <>
          <h2 className="mb-2 text-base font-bold">
            {held.length === 1
              ? 'You have a claim saved on this device that has not been sent'
              : `You have ${held.length} claims saved on this device that have not been sent`}
          </h2>
          <p className="mb-2 text-sm">
            It was saved while you were offline. Before we send it, please read what happens next
            and tick the box.
          </p>
          <p className="mb-4 text-sm leading-relaxed">{CALLOUT_FEE_EXPLAINER}</p>
        </>
      )}

      <ul className="space-y-4">
        {held.map((item) => {
          const s = summary(item);
          const ackId = `held-ack-${item.id}`;
          const isBusy = busy === item.id;
          return (
            <li
              key={item.id}
              aria-label={`Saved claim${s.name ? ` for ${s.name}` : ''}`}
              className="rounded-lg border border-amber-200 bg-white p-3 text-sm"
            >
              <p className="font-semibold">{s.name || 'Saved claim'}</p>
              <p className="text-gray-700">{[s.place, s.damage].filter(Boolean).join(' · ')}</p>
              <p className="text-xs text-gray-600">Saved {formatQueuedAt(item.queuedAt)}</p>

              <div className="mt-3 flex items-start gap-3">
                <input
                  id={ackId}
                  type="checkbox"
                  className="mt-0.5 h-5 w-5 shrink-0"
                  checked={ticked[item.id] === true}
                  disabled={isBusy}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setTicked((prev) => ({ ...prev, [item.id]: checked }));
                  }}
                />
                <label htmlFor={ackId} className="leading-snug">
                  {CALLOUT_FEE_ACK_LABEL}
                </label>
              </div>

              {errors[item.id] && (
                <p role="alert" className="mt-2 text-amber-900">
                  {errors[item.id]}
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void handleSend(item)}
                  disabled={!ticked[item.id] || busy !== null}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
                >
                  {isBusy ? 'Sending…' : 'Send this claim'}
                </button>
                {confirmRemove === item.id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => void handleRemove(item)}
                      disabled={busy !== null}
                      className="rounded-lg border border-red-300 bg-white px-4 py-2 font-semibold text-red-800 disabled:opacity-50"
                    >
                      Yes, remove it
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmRemove(null)}
                      disabled={busy !== null}
                      className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700"
                    >
                      Keep it
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmRemove(item.id)}
                    disabled={busy !== null}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 disabled:opacity-50"
                  >
                    Remove from this device
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {outcomes.length > 0 && (
        <ul role="status" aria-live="polite" className="mt-4 space-y-1 text-sm">
          {outcomes.map((o) => (
            <li key={`${o.id}-${o.outcome}`}>
              {o.name ? <strong>{o.name}: </strong> : null}
              {OUTCOME_TEXT[o.outcome]}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
