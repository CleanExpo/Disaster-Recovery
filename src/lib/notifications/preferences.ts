import { prisma } from '@/lib/prisma';

/**
 * Notification preference types
 */
export interface NotificationPreference {
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
  quietHoursStart?: string; // HH:MM format
  quietHoursEnd?: string; // HH:MM format

  doNotDisturb: boolean;
  unsubscribedChannels: string[];

  updatedAt: Date;
}

export class PreferencesService {
  /**
   * Get user's notification preferences
   */
  static async getPreferences(userId: string): Promise<NotificationPreference> {
    try {
      const prefs = await prisma.notificationPreference.findUnique({
        where: { userId },
      });

      if (!prefs) {
        // Return default preferences if not found
        return this.getDefaultPreferences(userId);
      }

      return {
        userId: prefs.userId,
        bookingNotifications: prefs.bookingNotifications,
        bookingEmail: prefs.bookingEmail,
        bookingSMS: prefs.bookingSMS,
        claimNotifications: prefs.claimNotifications,
        claimEmail: prefs.claimEmail,
        claimSMS: prefs.claimSMS,
        contractorNotifications: prefs.contractorNotifications,
        contractorEmail: prefs.contractorEmail,
        contractorSMS: prefs.contractorSMS,
        chatNotifications: prefs.chatNotifications,
        chatEmail: prefs.chatEmail,
        chatSMS: prefs.chatSMS,
        systemNotifications: prefs.systemNotifications,
        systemEmail: prefs.systemEmail,
        systemSMS: prefs.systemSMS,
        quietHoursEnabled: prefs.quietHoursEnabled,
        quietHoursStart: prefs.quietHoursStart,
        quietHoursEnd: prefs.quietHoursEnd,
        doNotDisturb: prefs.doNotDisturb,
        unsubscribedChannels: prefs.unsubscribedChannels as string[],
        updatedAt: prefs.updatedAt,
      };
    } catch (error) {
      console.error('Failed to get notification preferences:', error);
      return this.getDefaultPreferences(userId);
    }
  }

  /**
   * Update notification preferences
   */
  static async updatePreferences(
    userId: string,
    updates: Partial<NotificationPreference>
  ): Promise<NotificationPreference> {
    try {
      const prefs = await prisma.notificationPreference.upsert({
        where: { userId },
        create: {
          userId,
          ...this.getDefaultPreferencesObject(),
          ...updates,
        },
        update: {
          ...updates,
          updatedAt: new Date(),
        },
      });

      return {
        userId: prefs.userId,
        bookingNotifications: prefs.bookingNotifications,
        bookingEmail: prefs.bookingEmail,
        bookingSMS: prefs.bookingSMS,
        claimNotifications: prefs.claimNotifications,
        claimEmail: prefs.claimEmail,
        claimSMS: prefs.claimSMS,
        contractorNotifications: prefs.contractorNotifications,
        contractorEmail: prefs.contractorEmail,
        contractorSMS: prefs.contractorSMS,
        chatNotifications: prefs.chatNotifications,
        chatEmail: prefs.chatEmail,
        chatSMS: prefs.chatSMS,
        systemNotifications: prefs.systemNotifications,
        systemEmail: prefs.systemEmail,
        systemSMS: prefs.systemSMS,
        quietHoursEnabled: prefs.quietHoursEnabled,
        quietHoursStart: prefs.quietHoursStart,
        quietHoursEnd: prefs.quietHoursEnd,
        doNotDisturb: prefs.doNotDisturb,
        unsubscribedChannels: prefs.unsubscribedChannels as string[],
        updatedAt: prefs.updatedAt,
      };
    } catch (error) {
      console.error('Failed to update notification preferences:', error);
      throw error;
    }
  }

  /**
   * Check if notification should be sent based on preferences
   */
  static async shouldSendNotification(
    userId: string,
    type: 'booking' | 'claim' | 'contractor' | 'system' | 'chat',
    channel: 'in-app' | 'email' | 'sms'
  ): Promise<boolean> {
    try {
      const prefs = await this.getPreferences(userId);

      // Check do not disturb
      if (prefs.doNotDisturb) {
        return false;
      }

      // Check quiet hours
      if (prefs.quietHoursEnabled && prefs.quietHoursStart && prefs.quietHoursEnd) {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        if (currentTime >= prefs.quietHoursStart && currentTime <= prefs.quietHoursEnd) {
          // Allow in-app notifications even during quiet hours, but not email/sms
          if (channel !== 'in-app') {
            return false;
          }
        }
      }

      // Check if unsubscribed from specific channel
      const channelKey = `${type}:${channel}`;
      if (prefs.unsubscribedChannels.includes(channelKey)) {
        return false;
      }

      // Check type-specific preferences
      switch (type) {
        case 'booking':
          if (!prefs.bookingNotifications) return false;
          if (channel === 'email' && !prefs.bookingEmail) return false;
          if (channel === 'sms' && !prefs.bookingSMS) return false;
          break;

        case 'claim':
          if (!prefs.claimNotifications) return false;
          if (channel === 'email' && !prefs.claimEmail) return false;
          if (channel === 'sms' && !prefs.claimSMS) return false;
          break;

        case 'contractor':
          if (!prefs.contractorNotifications) return false;
          if (channel === 'email' && !prefs.contractorEmail) return false;
          if (channel === 'sms' && !prefs.contractorSMS) return false;
          break;

        case 'chat':
          if (!prefs.chatNotifications) return false;
          if (channel === 'email' && !prefs.chatEmail) return false;
          if (channel === 'sms' && !prefs.chatSMS) return false;
          break;

        case 'system':
          if (!prefs.systemNotifications) return false;
          if (channel === 'email' && !prefs.systemEmail) return false;
          if (channel === 'sms' && !prefs.systemSMS) return false;
          break;
      }

      return true;
    } catch (error) {
      console.error('Error checking notification preference:', error);
      // Default to true if there's an error
      return true;
    }
  }

  /**
   * Get default preferences for a new user
   */
  private static getDefaultPreferences(userId: string): NotificationPreference {
    return {
      userId,
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
    };
  }

  /**
   * Helper to get default preferences object for database
   */
  private static getDefaultPreferencesObject() {
    return {
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
    };
  }
}
