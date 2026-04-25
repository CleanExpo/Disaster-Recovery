/**
 * Performance Tracker — Feedback loop metrics
 *
 * Polls Reddit for post metrics on recent posts, records
 * performance snapshots, and generates feedback summaries
 * for the content generator.
 */

import { prisma } from '@/lib/prisma';
import { getSubmissionMetrics } from '../reddit-client';
import type { PerformanceFeedback, PerformanceSnapshot } from './types';
import type { PostCategory } from '../reddit-types';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Check performance of all posts from the last 7 days.
 *
 * 1. Query RedditPost WHERE status = 'POSTED' AND postedAt > 7 days ago
 * 2. Fetch metrics from Reddit via Snoowrap
 * 3. Record RedditPerformanceLog entries
 * 4. Update RedditPost with latest metrics
 * 5. Return aggregated feedback
 */
export async function checkRecentPostPerformance(): Promise<{
  snapshots: PerformanceSnapshot[];
  feedback: PerformanceFeedback;
}> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentPosts = await prisma.redditPost.findMany({
    where: {
      status: 'POSTED',
      postedAt: { gte: sevenDaysAgo },
      redditId: { not: null },
    },
  });

  if (recentPosts.length === 0) {
    return {
      snapshots: [],
      feedback: {
        averageUpvotes: 0,
        averageComments: 0,
        topPerformingCategory: null,
        lowPerformingCategory: null,
        summary: 'No recent posts to analyse.',
      },
    };
  }

  const snapshots: PerformanceSnapshot[] = [];
  const now = new Date();

  for (const post of recentPosts) {
    if (!post.redditId) continue;

    try {
      const submission = await getSubmissionMetrics(post.redditId);

      const snapshot: PerformanceSnapshot = {
        postId: post.id,
        redditId: post.redditId,
        upvotes: submission.ups ?? 0,
        downvotes: submission.downs ?? 0,
        commentCount: submission.num_comments ?? 0,
        upvoteRatio: submission.upvote_ratio ?? 0,
        isRemoved: !!submission.removed_by_category,
        sampledAt: now,
      };

      snapshots.push(snapshot);

      // Record performance log
      await prisma.redditPerformanceLog.create({
        data: {
          postId: post.id,
          upvotes: snapshot.upvotes,
          downvotes: snapshot.downvotes,
          commentCount: snapshot.commentCount,
          upvoteRatio: snapshot.upvoteRatio,
          isRemoved: snapshot.isRemoved,
        },
      });

      // Update post with latest metrics
      await prisma.redditPost.update({
        where: { id: post.id },
        data: {
          upvotes: snapshot.upvotes,
          downvotes: snapshot.downvotes,
          commentCount: snapshot.commentCount,
          upvoteRatio: snapshot.upvoteRatio,
          isRemoved: snapshot.isRemoved,
        },
      });
    } catch (error) {
      clientLogger.warn(`[performance-tracker] Failed to fetch metrics for ${post.redditId}:`, { source: 'orchestrator/performance-tracker', data: error });
    }
  }

  const feedback = generateFeedback(snapshots, recentPosts);

  return { snapshots, feedback };
}
import { clientLogger } from '@/lib/observability/client-logger';

// ---------------------------------------------------------------------------
// Internal
// ---------------------------------------------------------------------------

function generateFeedback(
  snapshots: PerformanceSnapshot[],
  posts: Array<{ id: string; category: string }>,
): PerformanceFeedback {
  if (snapshots.length === 0) {
    return {
      averageUpvotes: 0,
      averageComments: 0,
      topPerformingCategory: null,
      lowPerformingCategory: null,
      summary: 'No performance data available yet.',
    };
  }

  const totalUpvotes = snapshots.reduce((sum, s) => sum + s.upvotes, 0);
  const totalComments = snapshots.reduce((sum, s) => sum + s.commentCount, 0);
  const averageUpvotes = Math.round(totalUpvotes / snapshots.length);
  const averageComments = Math.round(totalComments / snapshots.length);

  // Find top/low categories by average upvotes
  const categoryMetrics: Record<string, { totalUpvotes: number; count: number }> = {};

  for (const snapshot of snapshots) {
    const post = posts.find((p) => p.id === snapshot.postId);
    if (!post) continue;

    if (!categoryMetrics[post.category]) {
      categoryMetrics[post.category] = { totalUpvotes: 0, count: 0 };
    }
    categoryMetrics[post.category].totalUpvotes += snapshot.upvotes;
    categoryMetrics[post.category].count += 1;
  }

  const categoryAverages = Object.entries(categoryMetrics)
    .map(([cat, m]) => ({ category: cat as PostCategory, avg: m.totalUpvotes / m.count }))
    .sort((a, b) => b.avg - a.avg);

  const topPerformingCategory = categoryAverages[0]?.category ?? null;
  const lowPerformingCategory = categoryAverages.length > 1
    ? categoryAverages[categoryAverages.length - 1].category
    : null;

  const summary = [
    `Last 7 days: ${snapshots.length} posts tracked.`,
    `Average upvotes: ${averageUpvotes}, average comments: ${averageComments}.`,
    topPerformingCategory ? `Top category: ${topPerformingCategory}.` : '',
    lowPerformingCategory ? `Consider varying approach for: ${lowPerformingCategory}.` : '',
    snapshots.some((s) => s.isRemoved) ? 'WARNING: Some posts were removed by moderators.' : '',
  ].filter(Boolean).join(' ');

  return {
    averageUpvotes,
    averageComments,
    topPerformingCategory,
    lowPerformingCategory,
    summary,
  };
}
