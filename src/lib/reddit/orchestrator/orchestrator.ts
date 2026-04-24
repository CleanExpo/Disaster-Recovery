/**
 * Orchestrator — Main pipeline coordinator
 *
 * Sequences the full daily content generation pipeline:
 * Topic Selection → Content Generation → Visual Generation →
 * Safety Gates → Reddit Posting → Performance Tracking
 */

import { prisma } from '@/lib/prisma';
import { selectDailyTopic } from './topic-selector';
import { generateRedditPost } from './content-generator';
import { generatePostVisual } from './visual-generator';
import { runSafetyPipeline } from './safety-gates';
import { postToReddit } from './poster';
import { checkRecentPostPerformance } from './performance-tracker';
import type { OrchestratorOptions, OrchestratorRunResult, VisualAsset } from './types';
import type { PostCategory } from '../reddit-types';
import { clientLogger } from '@/lib/observability/client-logger';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Run the daily Reddit content orchestrator.
 *
 * Pipeline:
 * 1. Create RedditOrchestratorRun record (status: RUNNING)
 * 2. selectDailyTopic() → TopicSelection
 * 3. checkRecentPostPerformance() → feedback context
 * 4. Create RedditPost record (status: SCHEDULED)
 * 5. generateRedditPost(topic, systemPrompt, feedback) → GENERATED
 * 6. generatePostVisual(topic, content) → store image URL
 * 7. runSafetyPipeline(title, body, pillar) → VALIDATED or FAILED
 * 8. If validated + not dryRun: postToReddit() → POSTED
 * 9. Update RedditOrchestratorRun with counts → COMPLETED
 */
export async function runDailyOrchestrator(
  options?: OrchestratorOptions,
): Promise<OrchestratorRunResult> {
  const startTime = Date.now();
  const triggerType = options?.triggerType ?? 'MANUAL';
  const command = options?.command ?? 'DAILY-AUTO';
  const dryRun = options?.dryRun ?? false;
  const subreddit = options?.subreddit;

  // 1. Create run record
  const run = await prisma.redditOrchestratorRun.create({
    data: {
      triggerType,
      command,
      status: 'RUNNING',
    },
  });

  try {
    // 2. Select topic
    const topic = await selectDailyTopic(options?.category);

    // 3. Get performance feedback
    let feedback;
    try {
      const perfResult = await checkRecentPostPerformance();
      feedback = perfResult.feedback;
    } catch {
      // Performance tracking is non-critical
      clientLogger.warn('[orchestrator] Performance tracking failed, continuing without feedback', { source: 'orchestrator/orchestrator' });
    }

    // 4. Create post record
    const post = await prisma.redditPost.create({
      data: {
        title: topic.topic,
        body: '',
        category: topic.category,
        brands: JSON.stringify(topic.brands),
        geoSignals: JSON.stringify(topic.facts),
        subreddit: subreddit || 'Disaster_Recovery_Qld',
        status: 'SCHEDULED',
        scheduledFor: new Date(),
        contentPillarId: topic.pillarId,
        orchestratorRunId: run.id,
      },
    });

    // 5. Generate content
    const content = await generateRedditPost(topic, feedback, command);

    await prisma.redditPost.update({
      where: { id: post.id },
      data: {
        title: content.title,
        body: content.body,
        tldr: content.tldr,
        category: content.category,
        brands: JSON.stringify(content.brands),
        geoSignals: JSON.stringify(content.geoSignals),
        aiModel: content.model,
        aiPromptVersion: content.promptVersion,
        generationTokens: content.tokensUsed,
        status: 'GENERATED',
        generatedAt: new Date(),
      },
    });

    // 6. Generate visual (non-blocking — continue even if it fails)
    let visual: VisualAsset | undefined;
    try {
      visual = await generatePostVisual(topic, content);
      await prisma.redditPost.update({
        where: { id: post.id },
        data: {
          imageGenerated: true,
          imagePrompt: visual.prompt,
          imageFormat: visual.imageFormat,
          imageUrl: visual.imageUrl || null,
        },
      });
    } catch (err) {
      clientLogger.warn('[orchestrator] Visual generation failed:', { source: 'orchestrator/orchestrator', data: err });
    }

    // 7. Run safety pipeline
    const safety = await runSafetyPipeline(content.title, content.body, content.category as PostCategory);

    // Store safety audit records
    for (const gate of safety.gates) {
      await prisma.redditSafetyAudit.create({
        data: {
          postId: post.id,
          gateName: gate.gateName,
          gateModel: gate.gateModel,
          passed: gate.passed,
          confidence: gate.confidence,
          findings: JSON.stringify(gate.findings),
          tokensUsed: gate.tokensUsed,
          durationMs: gate.durationMs,
        },
      });
    }

    const safetyStatus = safety.allPassed ? 'PASSED' : 'FAILED';
    const postStatus = safety.allPassed ? 'VALIDATED' : 'FAILED';

    await prisma.redditPost.update({
      where: { id: post.id },
      data: {
        safetyStatus,
        safetyGateResults: JSON.stringify(safety.gates),
        geoCompliant: safety.allPassed,
        geoIssues: safety.allPassed ? null : JSON.stringify(safety.gates.filter((g) => !g.passed).flatMap((g) => g.findings)),
        status: postStatus,
        validatedAt: safety.allPassed ? new Date() : null,
        failedAt: safety.allPassed ? null : new Date(),
        failureReason: safety.allPassed ? null : `Safety gate(s) failed: ${safety.gates.filter((g) => !g.passed).map((g) => g.gateName).join(', ')}`,
      },
    });

    // 8. Post to Reddit (if validated and not dry run)
    let postResult;
    if (safety.allPassed && !dryRun) {
      try {
        postResult = await postToReddit(post.id, content.title, content.body, subreddit, visual);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        await prisma.redditPost.update({
          where: { id: post.id },
          data: {
            status: 'FAILED',
            failedAt: new Date(),
            failureReason: `Reddit posting failed: ${errorMsg}`,
          },
        });
      }
    }

    // 9. Finalise run
    const totalDurationMs = Date.now() - startTime;
    const totalTokensUsed = content.tokensUsed + safety.totalTokens;

    const postsPosted = postResult ? 1 : 0;
    const postsFailed = !safety.allPassed || (!dryRun && !postResult) ? 1 : 0;

    await prisma.redditOrchestratorRun.update({
      where: { id: run.id },
      data: {
        status: 'COMPLETED',
        postsGenerated: 1,
        postsValidated: safety.allPassed ? 1 : 0,
        postsPosted,
        postsFailed,
        totalTokensUsed,
        totalDurationMs,
        completedAt: new Date(),
      },
    });

    return {
      runId: run.id,
      status: 'COMPLETED',
      postsGenerated: 1,
      postsValidated: safety.allPassed ? 1 : 0,
      postsPosted,
      postsFailed,
      totalTokensUsed,
      totalDurationMs,
      postId: post.id,
      redditUrl: postResult?.redditUrl,
    };
  } catch (error) {
    // Handle pipeline failure
    const totalDurationMs = Date.now() - startTime;
    const errorMsg = error instanceof Error ? error.message : String(error);

    await prisma.redditOrchestratorRun.update({
      where: { id: run.id },
      data: {
        status: 'FAILED',
        errorMessage: errorMsg,
        totalDurationMs,
        completedAt: new Date(),
      },
    });

    return {
      runId: run.id,
      status: 'FAILED',
      postsGenerated: 0,
      postsValidated: 0,
      postsPosted: 0,
      postsFailed: 1,
      totalTokensUsed: 0,
      totalDurationMs,
      error: errorMsg,
    };
  }
}
