/**
 * Unite-Group Social Pages
 * DR-286: Post scheduling, engagement stats, comment management
 */

import { getUniteGroupClient } from './client';

interface SocialPost {
  id?: string;
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter';
  content: string;
  mediaUrls?: string[];
  scheduledAt?: string;
  status?: 'draft' | 'scheduled' | 'published' | 'failed';
}

interface EngagementStats {
  postId: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  impressions: number;
}

export async function createPost(post: Omit<SocialPost, 'id'>) {
  const client = getUniteGroupClient();
  return client.post<SocialPost>('/social/posts', { ...post });
}

export async function schedulePost(post: Omit<SocialPost, 'id'> & { scheduledAt: string }) {
  const client = getUniteGroupClient();
  return client.post<SocialPost>('/social/posts/schedule', { ...post });
}

export async function getEngagement(postId: string) {
  const client = getUniteGroupClient();
  return client.get<EngagementStats>(`/social/posts/${postId}/engagement`);
}

export async function getPageStats(platform: SocialPost['platform']) {
  const client = getUniteGroupClient();
  return client.get<Record<string, unknown>>(`/social/pages/${platform}/stats`);
}
