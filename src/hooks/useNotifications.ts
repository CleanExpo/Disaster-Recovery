'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { clientLogger } from '@/lib/observability/client-logger';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
  claimId?: string;
}

interface UseNotificationsOptions {
  claimId?: string;
  pollIntervalMs?: number;
  enabled?: boolean;
}

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  requestPushPermission: () => Promise<NotificationPermission>;
  pushSupported: boolean;
  pushPermission: NotificationPermission | 'default';
}

export function useNotifications({
  claimId,
  pollIntervalMs = 30000,
  enabled = true,
}: UseNotificationsOptions = {}): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pushPermission, setPushPermission] = useState<NotificationPermission | 'default'>('default');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pushSupported = typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;

  // Check initial push permission
  useEffect(() => {
    if (pushSupported) {
      setPushPermission(Notification.permission);
    }
  }, [pushSupported]);

  // Fetch notifications via polling
  const fetchNotifications = useCallback(async (): Promise<void> => {
    if (!claimId || !enabled) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/notifications/${claimId}`);
      if (!res.ok) throw new Error('Failed to fetch notifications');
      const data = await res.json();
      setNotifications(data.notifications || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [claimId, enabled]);

  // Start polling
  useEffect(() => {
    if (!claimId || !enabled) return undefined;

    fetchNotifications();
    intervalRef.current = setInterval(fetchNotifications, pollIntervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [claimId, enabled, pollIntervalMs, fetchNotifications]);

  // Mark single notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    if (!claimId) return;

    try {
      await fetch(`/api/notifications/${claimId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: notificationId }),
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
    } catch {
      // Silently fail — will sync on next poll
    }
  }, [claimId]);

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    if (!claimId) return;

    try {
      await fetch(`/api/notifications/${claimId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ all: true }),
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {
      // Silently fail
    }
  }, [claimId]);

  // Request push notification permission
  const requestPushPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!pushSupported) return 'denied';

    const permission = await Notification.requestPermission();
    setPushPermission(permission);

    if (permission === 'granted' && 'serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        });

        // Register subscription with backend
        await fetch('/api/notifications/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subscription: subscription.toJSON(),
            claimId,
            platform: 'web',
          }),
        });
      } catch (err) {
        clientLogger.error('Push subscription failed', { source: 'useNotifications' }, err);
      }
    }

    return permission;
  }, [pushSupported, claimId]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    requestPushPermission,
    pushSupported,
    pushPermission,
  };
}
