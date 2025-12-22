'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

interface NotificationPreference {
  userId: string;
  bookingNotifications: boolean;
  bookingEmail: boolean;
  bookingSMS: boolean;
  claimNotifications: boolean;
  claimEmail: boolean;
  claimSMS: boolean;
  contractorNotifications: boolean;
  contractorEmail: boolean;
  contractorSMS: boolean;
  chatNotifications: boolean;
  chatEmail: boolean;
  chatSMS: boolean;
  systemNotifications: boolean;
  systemEmail: boolean;
  systemSMS: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  doNotDisturb: boolean;
  unsubscribedChannels: string[];
  updatedAt: Date;
}

/**
 * useNotificationPreferences Hook
 *
 * Handles fetching and updating user's notification preferences
 */
export function useNotificationPreferences() {
  const { data: session } = useSession();
  const [preferences, setPreferences] = useState<NotificationPreference | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch preferences
  useEffect(() => {
    if (!session?.user?.id) {
      setIsLoading(false);
      return;
    }

    const fetchPreferences = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/notifications/preferences`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch preferences');
        }

        const data = await response.json();
        setPreferences(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch notification preferences:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        // Set default preferences on error
        setPreferences({
          userId: session.user.id,
          bookingNotifications: true,
          bookingEmail: true,
          bookingSMS: false,
          claimNotifications: true,
          claimEmail: true,
          claimSMS: false,
          contractorNotifications: true,
          contractorEmail: true,
          contractorSMS: false,
          chatNotifications: true,
          chatEmail: false,
          chatSMS: false,
          systemNotifications: true,
          systemEmail: false,
          systemSMS: false,
          quietHoursEnabled: false,
          quietHoursStart: '22:00',
          quietHoursEnd: '08:00',
          doNotDisturb: false,
          unsubscribedChannels: [],
          updatedAt: new Date(),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreferences();
  }, [session?.user?.id]);

  // Update preferences
  const updatePreferences = useCallback(
    async (updates: Partial<NotificationPreference>): Promise<boolean> => {
      if (!session?.user?.id) {
        return false;
      }

      try {
        const response = await fetch(`/api/notifications/preferences`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          throw new Error('Failed to update preferences');
        }

        const data = await response.json();
        setPreferences(data);
        setError(null);
        return true;
      } catch (err) {
        console.error('Failed to update notification preferences:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        return false;
      }
    },
    [session?.user?.id]
  );

  // Toggle individual notification setting
  const toggleNotificationSetting = useCallback(
    async (field: keyof NotificationPreference): Promise<boolean> => {
      if (!preferences) return false;

      const currentValue = preferences[field];
      if (typeof currentValue !== 'boolean') return false;

      return updatePreferences({
        [field]: !currentValue,
      });
    },
    [preferences, updatePreferences]
  );

  // Enable quiet hours
  const enableQuietHours = useCallback(
    async (startTime: string, endTime: string): Promise<boolean> => {
      return updatePreferences({
        quietHoursEnabled: true,
        quietHoursStart: startTime,
        quietHoursEnd: endTime,
      });
    },
    [updatePreferences]
  );

  // Disable quiet hours
  const disableQuietHours = useCallback(async (): Promise<boolean> => {
    return updatePreferences({
      quietHoursEnabled: false,
    });
  }, [updatePreferences]);

  // Toggle do not disturb
  const toggleDoNotDisturb = useCallback(async (): Promise<boolean> => {
    return toggleNotificationSetting('doNotDisturb');
  }, [toggleNotificationSetting]);

  // Unsubscribe from notification type
  const unsubscribeFromChannel = useCallback(
    async (channel: string): Promise<boolean> => {
      if (!preferences) return false;

      const updated = new Set(preferences.unsubscribedChannels);
      updated.add(channel);

      return updatePreferences({
        unsubscribedChannels: Array.from(updated),
      });
    },
    [preferences, updatePreferences]
  );

  // Resubscribe to notification type
  const resubscribeToChannel = useCallback(
    async (channel: string): Promise<boolean> => {
      if (!preferences) return false;

      const updated = new Set(preferences.unsubscribedChannels);
      updated.delete(channel);

      return updatePreferences({
        unsubscribedChannels: Array.from(updated),
      });
    },
    [preferences, updatePreferences]
  );

  return {
    preferences,
    isLoading,
    error,
    updatePreferences,
    toggleNotificationSetting,
    enableQuietHours,
    disableQuietHours,
    toggleDoNotDisturb,
    unsubscribeFromChannel,
    resubscribeToChannel,
  };
}
