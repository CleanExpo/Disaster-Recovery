-- DR-390: Add accessInstructions column to InsuranceClaimAU
-- Stores AES-256-GCM encrypted property access instructions for contractors.
-- Stored as a prefixed base64 blob produced by src/lib/encryption.ts.
ALTER TABLE "InsuranceClaimAU" ADD COLUMN "accessInstructions" TEXT;

-- DR-389: ClaimNotification table — outbox for claim status change notifications
CREATE TABLE "ClaimNotification" (
    "id" TEXT NOT NULL,
    "claimId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ClaimNotification_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "ClaimNotification_claimId_read_idx" ON "ClaimNotification"("claimId", "read");
CREATE INDEX "ClaimNotification_claimId_createdAt_idx" ON "ClaimNotification"("claimId", "createdAt");

-- DR-389: PushToken table — stores web push subscriptions per claim
CREATE TABLE "PushToken" (
    "id" TEXT NOT NULL,
    "claimId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "platform" TEXT NOT NULL DEFAULT 'web',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PushToken_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "PushToken_claimId_idx" ON "PushToken"("claimId");

-- DR-322: job_outcome_logs table (JobOutcome model)
CREATE TABLE "job_outcome_logs" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "contractorId" TEXT,
    "clientId" TEXT,
    "insuranceClaimId" TEXT,
    "actualCost" DECIMAL(65,30),
    "hoursWorked" DECIMAL(65,30),
    "loggedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loggedByUserId" TEXT NOT NULL DEFAULT 'SYSTEM',
    "tenantId" TEXT,
    "metadata" JSONB,
    "state" TEXT,
    "suburb" TEXT,
    "postcode" TEXT,
    "urgency" TEXT,
    "insuranceClaim" BOOLEAN NOT NULL DEFAULT false,
    "insurerName" TEXT,
    "responseMinutes" INTEGER,
    "durationMinutes" INTEGER,
    "totalMinutes" INTEGER,
    CONSTRAINT "job_outcome_logs_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "job_outcome_logs_jobId_key" ON "job_outcome_logs"("jobId");
CREATE INDEX "job_outcome_logs_outcome_loggedAt_idx" ON "job_outcome_logs"("outcome", "loggedAt");
CREATE INDEX "job_outcome_logs_state_jobType_loggedAt_idx" ON "job_outcome_logs"("state", "jobType", "loggedAt");
