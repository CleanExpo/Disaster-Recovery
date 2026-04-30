-- DR-804 Step 4 — Reddit orchestrator tables (6 models).
--
-- Reddit orchestrator confirmed live by Phill (2026-05-01). The
-- orchestrator runs from 3 routes:
--   - app/api/cron/reddit-orchestrator/route.ts
--   - app/api/cron/reddit-performance/route.ts
--   - app/api/reddit/orchestrator/route.ts
-- All 6 phantom Reddit Prisma models become real tables here.
--
-- Audit: docs/audits/dr-804-phantom-prisma-models-2026-04-30.md
--   §3 (Bucket 3 4d, originally listed as drop candidates pending
--   live-or-dead decision; flipped to live-table per Phill).
--   §2 (RedditPost was Bucket 1 P3 — same fix applies).
--
-- Idempotent pattern: CREATE TABLE IF NOT EXISTS + guarded DO block
-- for FKs (Postgres has no ADD CONSTRAINT IF NOT EXISTS at this
-- version). Same shape as 20260501100000_dr_804_p2_quick_wins +
-- 20260501110000_dr_804_contractor_tables.
--
-- Creation order respects intra-cluster FK dependencies:
--   1. RedditContentPillar (no inbound)
--   2. RedditOrchestratorRun (no inbound)
--   3. RedditSystemPrompt (standalone)
--   4. RedditPost (FK -> RedditContentPillar + RedditOrchestratorRun)
--   5. RedditSafetyAudit (FK -> RedditPost)
--   6. RedditPerformanceLog (FK -> RedditPost)

-- ────────────────────────────────────────────────────────────────────
-- 1. RedditContentPillar
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "RedditContentPillar" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "categories" TEXT[],
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "RedditContentPillar_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "RedditContentPillar_code_key"
    ON "RedditContentPillar"("code");

-- ────────────────────────────────────────────────────────────────────
-- 2. RedditOrchestratorRun
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "RedditOrchestratorRun" (
    "id" TEXT NOT NULL,
    "triggerType" TEXT NOT NULL,
    "command" TEXT,
    "status" TEXT NOT NULL DEFAULT 'RUNNING',
    "postsGenerated" INTEGER NOT NULL DEFAULT 0,
    "postsValidated" INTEGER NOT NULL DEFAULT 0,
    "postsPosted" INTEGER NOT NULL DEFAULT 0,
    "postsFailed" INTEGER NOT NULL DEFAULT 0,
    "totalTokensUsed" INTEGER NOT NULL DEFAULT 0,
    "totalDurationMs" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    CONSTRAINT "RedditOrchestratorRun_pkey" PRIMARY KEY ("id")
);

-- ────────────────────────────────────────────────────────────────────
-- 3. RedditSystemPrompt
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "RedditSystemPrompt" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "promptText" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "RedditSystemPrompt_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "RedditSystemPrompt_version_key"
    ON "RedditSystemPrompt"("version");

-- ────────────────────────────────────────────────────────────────────
-- 4. RedditPost (depends on 1 + 2)
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "RedditPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "tldr" TEXT,
    "category" TEXT NOT NULL,
    "brands" TEXT NOT NULL,
    "geoSignals" TEXT NOT NULL,
    "subreddit" TEXT NOT NULL DEFAULT 'Disaster_Recovery_Qld',
    "aiModel" TEXT,
    "aiPromptVersion" TEXT,
    "generationTokens" INTEGER,
    "safetyStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "safetyGateResults" TEXT,
    "geoCompliant" BOOLEAN NOT NULL DEFAULT false,
    "geoIssues" TEXT,
    "imageGenerated" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "imagePrompt" TEXT,
    "imageFormat" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "scheduledFor" TIMESTAMP(3),
    "generatedAt" TIMESTAMP(3),
    "validatedAt" TIMESTAMP(3),
    "postedAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "failureReason" TEXT,
    "redditId" TEXT,
    "redditUrl" TEXT,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "upvoteRatio" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isRemoved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contentPillarId" TEXT,
    "orchestratorRunId" TEXT,
    CONSTRAINT "RedditPost_pkey" PRIMARY KEY ("id")
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'RedditPost_contentPillarId_fkey'
    ) THEN
        ALTER TABLE "RedditPost"
            ADD CONSTRAINT "RedditPost_contentPillarId_fkey"
            FOREIGN KEY ("contentPillarId")
            REFERENCES "RedditContentPillar"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'RedditPost_orchestratorRunId_fkey'
    ) THEN
        ALTER TABLE "RedditPost"
            ADD CONSTRAINT "RedditPost_orchestratorRunId_fkey"
            FOREIGN KEY ("orchestratorRunId")
            REFERENCES "RedditOrchestratorRun"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE;
    END IF;
END $$;

-- ────────────────────────────────────────────────────────────────────
-- 5. RedditSafetyAudit (depends on RedditPost)
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "RedditSafetyAudit" (
    "id" TEXT NOT NULL,
    "gateName" TEXT NOT NULL,
    "gateModel" TEXT NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "findings" TEXT NOT NULL,
    "tokensUsed" INTEGER,
    "durationMs" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" TEXT NOT NULL,
    CONSTRAINT "RedditSafetyAudit_pkey" PRIMARY KEY ("id")
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'RedditSafetyAudit_postId_fkey'
    ) THEN
        ALTER TABLE "RedditSafetyAudit"
            ADD CONSTRAINT "RedditSafetyAudit_postId_fkey"
            FOREIGN KEY ("postId")
            REFERENCES "RedditPost"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
    END IF;
END $$;

-- ────────────────────────────────────────────────────────────────────
-- 6. RedditPerformanceLog (depends on RedditPost)
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "RedditPerformanceLog" (
    "id" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL,
    "downvotes" INTEGER NOT NULL,
    "commentCount" INTEGER NOT NULL,
    "upvoteRatio" DOUBLE PRECISION NOT NULL,
    "isRemoved" BOOLEAN NOT NULL DEFAULT false,
    "sampledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" TEXT NOT NULL,
    CONSTRAINT "RedditPerformanceLog_pkey" PRIMARY KEY ("id")
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'RedditPerformanceLog_postId_fkey'
    ) THEN
        ALTER TABLE "RedditPerformanceLog"
            ADD CONSTRAINT "RedditPerformanceLog_postId_fkey"
            FOREIGN KEY ("postId")
            REFERENCES "RedditPost"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
    END IF;
END $$;
