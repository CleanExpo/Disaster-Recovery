import { prisma } from './prisma';

export interface UserPreferences {
  userId: string;
  theme?: 'light' | 'dark' | 'system';
  notifications?: boolean;
  emailNotifications?: boolean;
  language?: string;
}

export class PreferenceService {
  static async getUserPreferences(userId: string): Promise<UserPreferences | null> {
    try {
      // Implement based on your database schema
      return {
        userId,
        theme: 'system',
        notifications: true,
        emailNotifications: true,
        language: 'en',
      };
    } catch (error) {
      console.error('Error fetching preferences:', error);
      return null;
    }
  }

  static async updateUserPreferences(
    userId: string,
    preferences: Partial<UserPreferences>
  ): Promise<UserPreferences | null> {
    try {
      // Implement based on your database schema
      return {
        userId,
        ...preferences,
      } as UserPreferences;
    } catch (error) {
      console.error('Error updating preferences:', error);
      return null;
    }
  }
}

export default PreferenceService;
