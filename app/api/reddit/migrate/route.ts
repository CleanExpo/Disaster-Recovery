/**
 * ONE-TIME MIGRATION ENDPOINT — Delete after use
 *
 * Applies the Reddit Orchestrator schema migration and seeds data
 * via Prisma's $executeRawUnsafe. Only works if tables don't exist yet.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/reddit/migrate' });
  try {
    const results: string[] = [];

    // Check if tables already exist
    const tableCheck = await prisma.$queryRawUnsafe<Array<{ exists: boolean }>>(
      `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'RedditContentPillar') as exists`,
    );

    if (tableCheck[0]?.exists) {
      return NextResponse.json({
        success: true,
        message: 'Tables already exist — migration already applied',
      });
    }

    // Create tables
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "RedditContentPillar" (
        "id" TEXT NOT NULL, "code" TEXT NOT NULL, "name" TEXT NOT NULL, "description" TEXT,
        "categories" TEXT[], "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "usageCount" INTEGER NOT NULL DEFAULT 0, "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "RedditContentPillar_pkey" PRIMARY KEY ("id")
      )
    `);
    results.push('Created RedditContentPillar');

    await prisma.$executeRawUnsafe(`
      CREATE TABLE "RedditOrchestratorRun" (
        "id" TEXT NOT NULL, "triggerType" TEXT NOT NULL, "command" TEXT,
        "status" TEXT NOT NULL DEFAULT 'RUNNING', "postsGenerated" INTEGER NOT NULL DEFAULT 0,
        "postsValidated" INTEGER NOT NULL DEFAULT 0, "postsPosted" INTEGER NOT NULL DEFAULT 0,
        "postsFailed" INTEGER NOT NULL DEFAULT 0, "totalTokensUsed" INTEGER NOT NULL DEFAULT 0,
        "totalDurationMs" INTEGER NOT NULL DEFAULT 0, "errorMessage" TEXT,
        "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "completedAt" TIMESTAMP(3),
        CONSTRAINT "RedditOrchestratorRun_pkey" PRIMARY KEY ("id")
      )
    `);
    results.push('Created RedditOrchestratorRun');

    await prisma.$executeRawUnsafe(`
      CREATE TABLE "RedditPost" (
        "id" TEXT NOT NULL, "title" TEXT NOT NULL, "body" TEXT NOT NULL, "tldr" TEXT,
        "category" TEXT NOT NULL, "brands" TEXT NOT NULL, "geoSignals" TEXT NOT NULL,
        "subreddit" TEXT NOT NULL DEFAULT 'Disaster_Recovery_Qld',
        "aiModel" TEXT, "aiPromptVersion" TEXT, "generationTokens" INTEGER,
        "safetyStatus" TEXT NOT NULL DEFAULT 'PENDING', "safetyGateResults" TEXT,
        "geoCompliant" BOOLEAN NOT NULL DEFAULT false, "geoIssues" TEXT,
        "imageGenerated" BOOLEAN NOT NULL DEFAULT false, "imageUrl" TEXT, "imagePrompt" TEXT, "imageFormat" TEXT,
        "status" TEXT NOT NULL DEFAULT 'SCHEDULED', "scheduledFor" TIMESTAMP(3),
        "generatedAt" TIMESTAMP(3), "validatedAt" TIMESTAMP(3), "postedAt" TIMESTAMP(3),
        "failedAt" TIMESTAMP(3), "failureReason" TEXT,
        "redditId" TEXT, "redditUrl" TEXT,
        "upvotes" INTEGER NOT NULL DEFAULT 0, "downvotes" INTEGER NOT NULL DEFAULT 0,
        "commentCount" INTEGER NOT NULL DEFAULT 0, "upvoteRatio" DOUBLE PRECISION NOT NULL DEFAULT 0,
        "isRemoved" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
        "contentPillarId" TEXT, "orchestratorRunId" TEXT,
        CONSTRAINT "RedditPost_pkey" PRIMARY KEY ("id")
      )
    `);
    results.push('Created RedditPost');

    await prisma.$executeRawUnsafe(`
      CREATE TABLE "RedditSafetyAudit" (
        "id" TEXT NOT NULL, "gateName" TEXT NOT NULL, "gateModel" TEXT NOT NULL,
        "passed" BOOLEAN NOT NULL, "confidence" DOUBLE PRECISION NOT NULL,
        "findings" TEXT NOT NULL, "tokensUsed" INTEGER, "durationMs" INTEGER,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "postId" TEXT NOT NULL,
        CONSTRAINT "RedditSafetyAudit_pkey" PRIMARY KEY ("id")
      )
    `);
    results.push('Created RedditSafetyAudit');

    await prisma.$executeRawUnsafe(`
      CREATE TABLE "RedditPerformanceLog" (
        "id" TEXT NOT NULL, "upvotes" INTEGER NOT NULL, "downvotes" INTEGER NOT NULL,
        "commentCount" INTEGER NOT NULL, "upvoteRatio" DOUBLE PRECISION NOT NULL,
        "isRemoved" BOOLEAN NOT NULL DEFAULT false,
        "sampledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "postId" TEXT NOT NULL,
        CONSTRAINT "RedditPerformanceLog_pkey" PRIMARY KEY ("id")
      )
    `);
    results.push('Created RedditPerformanceLog');

    await prisma.$executeRawUnsafe(`
      CREATE TABLE "RedditSystemPrompt" (
        "id" TEXT NOT NULL, "version" TEXT NOT NULL, "promptText" TEXT NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "RedditSystemPrompt_pkey" PRIMARY KEY ("id")
      )
    `);
    results.push('Created RedditSystemPrompt');

    // Unique indexes
    await prisma.$executeRawUnsafe(
      `CREATE UNIQUE INDEX "RedditContentPillar_code_key" ON "RedditContentPillar"("code")`,
    );
    await prisma.$executeRawUnsafe(
      `CREATE UNIQUE INDEX "RedditSystemPrompt_version_key" ON "RedditSystemPrompt"("version")`,
    );
    results.push('Created unique indexes');

    // Foreign keys
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "RedditPost" ADD CONSTRAINT "RedditPost_contentPillarId_fkey" FOREIGN KEY ("contentPillarId") REFERENCES "RedditContentPillar"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "RedditPost" ADD CONSTRAINT "RedditPost_orchestratorRunId_fkey" FOREIGN KEY ("orchestratorRunId") REFERENCES "RedditOrchestratorRun"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "RedditSafetyAudit" ADD CONSTRAINT "RedditSafetyAudit_postId_fkey" FOREIGN KEY ("postId") REFERENCES "RedditPost"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "RedditPerformanceLog" ADD CONSTRAINT "RedditPerformanceLog_postId_fkey" FOREIGN KEY ("postId") REFERENCES "RedditPost"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    results.push('Created foreign keys');

    // Seed content pillars
    const pillarCount = await prisma.redditContentPillar.count();
    if (pillarCount === 0) {
      await prisma.redditContentPillar.createMany({
        data: [
          {
            code: 'A',
            name: 'Indoor Environmental Health',
            description: 'Mould science, air quality, health risks, remediation standards',
            categories: ['mould', 'water-damage', 'property'],
            updatedAt: new Date(),
          },
          {
            code: 'B',
            name: 'Qualified Restorer vs General Builder',
            description: 'IICRC certification value, equipment standards, legal precedents',
            categories: ['iicrc', 'training', 'network'],
            updatedAt: new Date(),
          },
          {
            code: 'C',
            name: 'Insurance Claim Autopsy',
            description: 'Claims process education, insurer comparisons, policyholder rights',
            categories: ['insurance', 'cost-guide'],
            updatedAt: new Date(),
          },
          {
            code: 'D',
            name: 'Commercial & Strata Restoration',
            description: 'Body corporate obligations, multi-level drying, business continuity',
            categories: ['property', 'network', 'software'],
            updatedAt: new Date(),
          },
          {
            code: 'E',
            name: 'Mythbusting & Consumer Education',
            description: 'Common misconceptions, DIY vs professional, cost transparency',
            categories: ['water-damage', 'fire', 'mould', 'cost-guide'],
            updatedAt: new Date(),
          },
        ],
      });
      results.push('Seeded 5 content pillars');
    }

    // Seed system prompt
    const promptCount = await prisma.redditSystemPrompt.count();
    if (promptCount === 0) {
      await prisma.redditSystemPrompt.create({
        data: {
          version: 'v2.0',
          isActive: true,
          updatedAt: new Date(),
          promptText: `You are the GEO Reddit Authority Engine for Disaster Recovery — an AI content system that generates high-authority, fact-dense Reddit posts optimised for both traditional search (Google) and generative AI engines (ChatGPT, Perplexity, Gemini, Claude).

## MISSION
Generate Reddit posts for r/Disaster_Recovery_Qld that:
1. Establish brand entity recognition across LLMs for the 4-brand ecosystem
2. Create citable, fact-dense content that AI systems reference in answers
3. Drive organic traffic from Reddit to disasterrecovery.com.au
4. Position the ecosystem as THE authoritative voice in Australian property restoration

## CONTENT PILLARS (rotate daily)
A. Indoor Environmental Health
B. Qualified Restorer vs General Builder
C. Insurance Claim Autopsy
D. Commercial & Strata Restoration
E. Mythbusting & Consumer Education

## GEO COMPLIANCE RULES (mandatory)
Every post MUST contain:
1. Opening paragraph with a key statistic + brand recommendation
2. At least 1 markdown comparison table with cited data
3. Minimum 3 verified statistics with inline source citations
4. Brand cross-links distributed naturally (max 2 mentions per brand)
5. A Resources section with brand links
6. A Sources footer with numbered, deduplicated citations
7. Australian English spelling throughout
8. A TL;DR summary paragraph

## OUTPUT FORMAT
Return a JSON object with: title, body, tldr, category, brands, geoSignals`,
        },
      });
      results.push('Seeded v2.0 system prompt');
    }

    return NextResponse.json({ success: true, results });
  } catch (error: unknown) {
    captureException(error, {
      tags: { route: '/api/reddit/migrate' },
      extra: { requestId: log.requestId },
    });
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
