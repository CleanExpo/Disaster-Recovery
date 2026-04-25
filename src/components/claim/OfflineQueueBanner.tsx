'use client';

/**
 * OfflineQueueBanner — iOS App Store Phase 2 PR #5 (RA-1633).
 *
 * Shown only when the offline queue has pending or dead-letter items.
 * Gated behind `NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED`; renders `null`
 * when the flag is off.
 *
 * - Pending > 0: calm informational tone, optional "Retry now" button.
 * - Dead-letter > 0: amber warning "We couldn't send your claim. Tap to retry".
 *
 * AU English throughout.
 */

import { useCallback, useEffect, useState } from 'react';
import {
  getQueueSize,
  getDeadLetterSize,
  replayQueue,
  onQueueEvent,
  isOfflineQueueEnabled,
} from '@/lib/offline-queue';

export default function OfflineQueueBanner(): JSX.Element | null {
  const [pending, setPending] = useState(0);
  const [dead, setDead] = useState(0);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    setPending(await getQueueSize());
    setDead(await getDeadLetterSize());
  }, []);

  useEffect(() => {
    if (!isOfflineQueueEnabled()) return;
    void refresh();
    const off = onQueueEvent(() => {
      void refresh();
    });
    return () => {
      off();
    };
  }, [refresh]);

  const handleRetry = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    try {
      await replayQueue();
    } finally {
      setBusy(false);
      void refresh();
    }
  }, [busy, refresh]);

  if (!isOfflineQueueEnabled()) return null;
  if (pending === 0 && dead === 0) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-4 rounded-lg border p-3 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
      style={{
        borderColor: dead > 0 ? '#f59e0b' : '#3b82f6',
        backgroundColor: dead > 0 ? '#fffbeb' : '#eff6ff',
        color: dead > 0 ? '#78350f' : '#1e3a8a',
      }}
    >
      <div>
        {dead > 0 ? (
          <p>
            <strong>We couldn&rsquo;t send your claim.</strong>{' '}
            {dead === 1
              ? '1 submission needs your attention.'
              : `${dead} submissions need your attention.`}{' '}
            Tap retry to try again.
          </p>
        ) : (
          <p>
            {pending === 1
              ? '1 claim queued offline. We&rsquo;ll send it automatically when you&rsquo;re back online.'
              : `${pending} claims queued offline. We&rsquo;ll send them automatically when you&rsquo;re back online.`}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={handleRetry}
        disabled={busy}
        className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-md font-semibold text-white disabled:opacity-60"
        style={{ backgroundColor: dead > 0 ? '#d97706' : '#2563eb' }}
      >
        {busy ? 'Retrying…' : 'Retry now'}
      </button>
    </div>
  );
}
