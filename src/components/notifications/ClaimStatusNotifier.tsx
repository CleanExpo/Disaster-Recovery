'use client';

/**
 * DR-389: ClaimStatusNotifier
 *
 * Mounted on the /track/[claimId] page. It:
 *  1. Requests browser Notification permission on first render.
 *  2. Registers a Service Worker push subscription when available (future-proofing).
 *  3. Falls back to polling GET /api/notifications/[claimId]?unread=true every 30 s.
 *  4. Shows a toast for each unread notification using the existing toast primitive.
 *  5. Marks notifications as read after displaying them.
 */

import { useEffect, useRef, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

interface ClaimNotification {
  id: string;
  claimId: string;
  status: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface ClaimStatusNotifierProps {
  claimId: string;
  /** Polling interval in milliseconds. Defaults to 30 000 (30 s). */
  pollingIntervalMs?: number;
}

export default function ClaimStatusNotifier({
  claimId,
  pollingIntervalMs = 30_000,
}: ClaimStatusNotifierProps) {
  const permissionGranted = useRef(false);
  const seenIds = useRef<Set<string>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── 1. Request Notification permission ──────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('Notification' in window)) return;

    if (Notification.permission === 'granted') {
      permissionGranted.current = true;
      return;
    }

    if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((perm) => {
        permissionGranted.current = perm === 'granted';
      });
    }
  }, []);

  // ── 2. Register SW push subscription (best-effort) ──────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;
    if (!claimId) return;

    navigator.serviceWorker.ready
      .then(async (registration) => {
        const existingSub = await registration.pushManager.getSubscription();
        const sub = existingSub ?? null;
        if (!sub) return; // No subscription; polling fallback handles delivery.

        await fetch('/api/notifications/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            claimId,
            token: JSON.stringify(sub.toJSON()),
            platform: 'web',
          }),
        });
      })
      .catch(() => {
        // SW not ready or push not supported — silent fail, polling covers this.
      });
  }, [claimId]);

  // ── 3 & 4. Polling with toast display ───────────────────────────────────────
  const fetchAndNotify = useCallback(async () => {
    if (!claimId) return;

    try {
      const res = await fetch(
        `/api/notifications/${encodeURIComponent(claimId)}?unread=true`,
      );
      if (!res.ok) return;

      const data = (await res.json()) as {
        success: boolean;
        notifications: ClaimNotification[];
      };

      if (!data.success || !Array.isArray(data.notifications)) return;

      const fresh = data.notifications.filter((n) => !seenIds.current.has(n.id));
      if (fresh.length === 0) return;

      const newIds: string[] = [];

      for (const n of fresh) {
        seenIds.current.add(n.id);
        newIds.push(n.id);

        // Show in-app toast
        toast({
          title: n.title,
          description: n.message,
        });

        // Show native notification if permission granted
        if (permissionGranted.current && 'Notification' in window) {
          try {
            new Notification(n.title, {
              body: n.message,
              icon: '/icons/icon-192x192.png',
              tag: `claim-${n.claimId}-${n.status}`,
            });
          } catch {
            // Ignore — native notification failure must not affect the UI.
          }
        }
      }

      // ── 5. Mark displayed notifications as read ──────────────────────────────
      if (newIds.length > 0) {
        fetch(`/api/notifications/${encodeURIComponent(claimId)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: newIds }),
        }).catch(() => {
          // Non-critical — mark-read failures are acceptable.
        });
      }
    } catch {
      // Network errors during polling are expected (offline, tab in background).
    }
  }, [claimId]);

  useEffect(() => {
    if (!claimId) return undefined;

    // Immediate first poll
    void fetchAndNotify();

    // Recurring poll
    intervalRef.current = setInterval(fetchAndNotify, pollingIntervalMs);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [claimId, fetchAndNotify, pollingIntervalMs]);

  // This component renders nothing — it is a side-effect-only controller.
  return null;
}
