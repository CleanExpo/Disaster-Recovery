/**
 * Recommendation Engine
 *
 * AI-powered recommendations for users and content
 */

import { analyticsEngine } from '@/lib/analytics/analytics-engine';

export interface UserProfile {
  userId: string;
  preferences: {
    favoriteRooms: string[];
    activeHours: number[];
    communicationStyle: 'detailed' | 'brief' | 'balanced';
    engagementLevel: number; // 0-100
  };
  history: {
    recentRooms: Array<{ roomId: string; lastActive: Date }>;
    frequentCollaborators: Array<{ userId: string; interactions: number }>;
    topicInterests: string[];
  };
}

export interface RoomRecommendation {
  roomId: string;
  roomName: string;
  relevanceScore: number; // 0-1
  reason: string;
  memberCount: number;
  activityLevel: 'high' | 'medium' | 'low';
}

export interface ContentRecommendation {
  id: string;
  type: 'message' | 'file' | 'search_result';
  title: string;
  relevanceScore: number; // 0-1
  reason: string;
  timestamp: Date;
}

export interface CollaboratorRecommendation {
  userId: string;
  username: string;
  relevanceScore: number; // 0-1
  commonRooms: number;
  sharedInterests: string[];
  reason: string;
}

export interface SmartSuggestion {
  id: string;
  type: 'room_join' | 'contact' | 'content' | 'time_to_call' | 'catchup';
  title: string;
  description: string;
  action: string;
  actionUrl?: string;
  confidence: number; // 0-1
  expiresAt: Date;
}

/**
 * Recommendation Engine - AI-powered suggestions
 */
export class RecommendationEngine {
  private userProfiles: Map<string, UserProfile> = new Map();
  private recommendations: Map<string, SmartSuggestion[]> = new Map();

  /**
   * Build user profile from analytics
   */
  buildUserProfile(userId: string): UserProfile {
    const analytics = analyticsEngine.getUserAnalytics(userId);

    const profile: UserProfile = {
      userId,
      preferences: {
        favoriteRooms: analytics.mostActiveRooms,
        activeHours: analytics.mostActiveHours,
        communicationStyle: this.determineCommunicationStyle(analytics),
        engagementLevel: Math.min(100, (analytics.totalEvents / 50) * 10),
      },
      history: {
        recentRooms: analytics.mostActiveRooms.map((roomId) => ({
          roomId,
          lastActive: new Date(),
        })),
        frequentCollaborators: [],
        topicInterests: this.extractTopics(analytics),
      },
    };

    this.userProfiles.set(userId, profile);
    return profile;
  }

  /**
   * Recommend rooms for user
   */
  recommendRooms(userId: string, limit: number = 5): RoomRecommendation[] {
    const profile = this.userProfiles.get(userId) || this.buildUserProfile(userId);
    const recommendations: RoomRecommendation[] = [];

    // Simulate room recommendations based on user profile
    const allRooms = [
      { id: 'general', name: 'General', members: 45, activity: 'high' },
      { id: 'random', name: 'Random', members: 32, activity: 'medium' },
      { id: 'announcements', name: 'Announcements', members: 50, activity: 'low' },
      { id: 'tech-discussion', name: 'Tech Discussion', members: 28, activity: 'high' },
      { id: 'watercooler', name: 'Watercooler', members: 35, activity: 'medium' },
    ];

    allRooms.forEach((room) => {
      if (!profile.preferences.favoriteRooms.includes(room.id)) {
        const relevanceScore = this.calculateRoomRelevance(profile, room);
        recommendations.push({
          roomId: room.id,
          roomName: room.name,
          relevanceScore,
          reason: this.generateRoomReason(profile, room),
          memberCount: room.members,
          activityLevel: room.activity as 'high' | 'medium' | 'low',
        });
      }
    });

    return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, limit);
  }

  /**
   * Recommend collaborators
   */
  recommendCollaborators(userId: string, limit: number = 5): CollaboratorRecommendation[] {
    const profile = this.userProfiles.get(userId) || this.buildUserProfile(userId);
    const recommendations: CollaboratorRecommendation[] = [];

    // Simulate collaborator recommendations
    const potentialCollaborators = [
      { id: 'user-001', username: 'Alice Chen', commonRooms: 3, interests: ['backend', 'devops'] },
      { id: 'user-002', username: 'Bob Smith', commonRooms: 2, interests: ['frontend', 'design'] },
      { id: 'user-003', username: 'Carol Johnson', commonRooms: 4, interests: ['backend', 'database'] },
      { id: 'user-004', username: 'David Lee', commonRooms: 1, interests: ['devops', 'infrastructure'] },
    ];

    potentialCollaborators.forEach((collaborator) => {
      if (collaborator.id !== userId) {
        const relevanceScore = this.calculateCollaboratorRelevance(profile, collaborator);
        recommendations.push({
          userId: collaborator.id,
          username: collaborator.username,
          relevanceScore,
          commonRooms: collaborator.commonRooms,
          sharedInterests: this.findSharedInterests(profile.history.topicInterests, collaborator.interests),
          reason: this.generateCollaboratorReason(collaborator),
        });
      }
    });

    return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, limit);
  }

  /**
   * Generate smart suggestions
   */
  generateSmartSuggestions(userId: string, limit: number = 5): SmartSuggestion[] {
    const profile = this.userProfiles.get(userId) || this.buildUserProfile(userId);
    const suggestions: SmartSuggestion[] = [];

    // Room join suggestion
    const roomRecs = this.recommendRooms(userId, 1);
    if (roomRecs.length > 0) {
      suggestions.push({
        id: `suggestion-room-${Date.now()}`,
        type: 'room_join',
        title: `Join ${roomRecs[0].roomName}`,
        description: roomRecs[0].reason,
        action: 'join_room',
        actionUrl: `/rooms/${roomRecs[0].roomId}`,
        confidence: roomRecs[0].relevanceScore,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });
    }

    // Collaborator suggestion
    const collabRecs = this.recommendCollaborators(userId, 1);
    if (collabRecs.length > 0) {
      suggestions.push({
        id: `suggestion-collab-${Date.now()}`,
        type: 'contact',
        title: `Connect with ${collabRecs[0].username}`,
        description: `You both work on ${collabRecs[0].sharedInterests.join(', ')}`,
        action: 'view_profile',
        actionUrl: `/profile/${collabRecs[0].userId}`,
        confidence: collabRecs[0].relevanceScore,
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      });
    }

    // Time to call suggestion
    const currentHour = new Date().getHours();
    if (profile.preferences.activeHours.includes(currentHour)) {
      suggestions.push({
        id: `suggestion-call-${Date.now()}`,
        type: 'time_to_call',
        title: 'Time for a team sync?',
        description: 'You\'re usually active around this time. Consider scheduling a call.',
        action: 'start_call',
        confidence: 0.6,
        expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
      });
    }

    // Catchup suggestion
    const lastActive = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    suggestions.push({
      id: `suggestion-catchup-${Date.now()}`,
      type: 'catchup',
      title: 'Catch up with your team',
      description: 'You haven\'t checked your favorite rooms in a while.',
      action: 'view_rooms',
      actionUrl: '/rooms',
      confidence: 0.5,
      expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
    });

    this.recommendations.set(userId, suggestions);
    return suggestions.slice(0, limit);
  }

  /**
   * Predict user engagement
   */
  predictEngagement(userId: string): { score: number; trend: 'increasing' | 'decreasing' | 'stable' } {
    const profile = this.userProfiles.get(userId) || this.buildUserProfile(userId);

    const score = Math.min(100, profile.preferences.engagementLevel);
    const trend: 'increasing' | 'decreasing' | 'stable' = score > 70 ? 'increasing' : score < 30 ? 'decreasing' : 'stable';

    return { score, trend };
  }

  /**
   * Recommend best time to reach user
   */
  recommendBestTimeToReach(userId: string): { hour: number; confidence: number } {
    const profile = this.userProfiles.get(userId) || this.buildUserProfile(userId);

    if (profile.preferences.activeHours.length === 0) {
      return { hour: 10, confidence: 0.5 };
    }

    const mostActiveHour = profile.preferences.activeHours[0];
    const confidence = 0.7 + Math.random() * 0.3;

    return { hour: mostActiveHour, confidence };
  }

  /**
   * Get personalized greeting
   */
  getPersonalizedGreeting(userId: string): string {
    const profile = this.userProfiles.get(userId) || this.buildUserProfile(userId);
    const currentHour = new Date().getHours();

    const greetings = {
      morning: [
        `Good morning! You're usually active around this time.`,
        `Rise and shine! Ready to collaborate?`,
        `Morning! Here are your recommendations for today.`,
      ],
      afternoon: [
        `Good afternoon! Catch up with your team?`,
        `Afternoon update: Here's what you might have missed.`,
        `Hope you're having a productive day!`,
      ],
      evening: [
        `Good evening! Time to wrap up or catch up?`,
        `End of day check-in: Here's your summary.`,
        `Evening catch-up time!`,
      ],
    };

    let period: 'morning' | 'afternoon' | 'evening' = 'afternoon';
    if (currentHour < 12) period = 'morning';
    else if (currentHour >= 17) period = 'evening';

    const greetingList = greetings[period];
    return greetingList[Math.floor(Math.random() * greetingList.length)];
  }

  /**
   * Determine communication style
   */
  private determineCommunicationStyle(analytics: any): 'detailed' | 'brief' | 'balanced' {
    if (!analytics.messagesSent) return 'balanced';

    // Simplified heuristic
    const avgMessageLength = analytics.totalEvents > 0 ? analytics.messagesSent / analytics.totalEvents : 0;

    if (avgMessageLength > 0.5) return 'detailed';
    if (avgMessageLength < 0.2) return 'brief';
    return 'balanced';
  }

  /**
   * Extract topics from user analytics
   */
  private extractTopics(analytics: any): string[] {
    // Simplified topic extraction
    const topics = ['collaboration', 'communication', 'productivity'];

    if (analytics.callsInitiated > 0) topics.push('calling');
    if (analytics.filesUploaded > 0) topics.push('file-sharing');

    return topics;
  }

  /**
   * Calculate room relevance score
   */
  private calculateRoomRelevance(profile: UserProfile, room: any): number {
    let score = 0.5;

    // Activity level bonus
    if (room.activity === 'high') score += 0.2;
    else if (room.activity === 'medium') score += 0.1;

    // Member count relevance
    if (room.members > 30) score += 0.1;

    // Random variation
    score += (Math.random() - 0.5) * 0.2;

    return Math.min(1, Math.max(0, score));
  }

  /**
   * Generate room recommendation reason
   */
  private generateRoomReason(profile: UserProfile, room: any): string {
    const reasons = [
      `Popular room with ${room.members} members`,
      `High activity level - great for discussions`,
      `Matches your interests in collaboration`,
      `Colleagues are active in this room`,
      `Recommended based on your activity patterns`,
    ];

    return reasons[Math.floor(Math.random() * reasons.length)];
  }

  /**
   * Calculate collaborator relevance score
   */
  private calculateCollaboratorRelevance(profile: UserProfile, collaborator: any): number {
    let score = 0.5;

    if (collaborator.commonRooms >= 3) score += 0.3;
    else if (collaborator.commonRooms >= 1) score += 0.15;

    // Random variation
    score += (Math.random() - 0.5) * 0.2;

    return Math.min(1, Math.max(0, score));
  }

  /**
   * Find shared interests
   */
  private findSharedInterests(interests1: string[], interests2: string[]): string[] {
    return interests1.filter((interest) => interests2.includes(interest));
  }

  /**
   * Generate collaborator reason
   */
  private generateCollaboratorReason(collaborator: any): string {
    return `You share interests in ${collaborator.interests.join(', ')}`;
  }

  /**
   * Clear old suggestions
   */
  clearExpiredSuggestions(userId: string): number {
    const suggestions = this.recommendations.get(userId) || [];
    const now = new Date();

    const active = suggestions.filter((s) => s.expiresAt > now);
    const removed = suggestions.length - active.length;

    if (active.length > 0) {
      this.recommendations.set(userId, active);
    } else {
      this.recommendations.delete(userId);
    }

    return removed;
  }
}

// Export singleton instance
export const recommendationEngine = new RecommendationEngine();
