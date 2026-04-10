-- AlterTable
ALTER TABLE "PushToken" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "ProofOfWork" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "workType" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientContact" TEXT NOT NULL,
    "projectAddress" TEXT,
    "completionDate" TIMESTAMP(3) NOT NULL,
    "projectValue" DOUBLE PRECISION NOT NULL,
    "projectDescription" TEXT,
    "damageType" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "propertyType" TEXT NOT NULL,
    "emergencyResponse" BOOLEAN NOT NULL DEFAULT false,
    "insuranceClaim" BOOLEAN NOT NULL DEFAULT false,
    "insuranceCompany" TEXT,
    "evidence" TEXT NOT NULL DEFAULT '[]',
    "verificationStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "verifiedBy" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProofOfWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetencyTestResult" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "attemptNumber" INTEGER NOT NULL DEFAULT 1,
    "score" INTEGER NOT NULL,
    "totalPossible" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "timeTakenSeconds" INTEGER,
    "certificateNumber" TEXT,
    "certificateExpiry" TIMESTAMP(3),
    "reassessmentDueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompetencyTestResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProofOfWork_contractorId_idx" ON "ProofOfWork"("contractorId");

-- CreateIndex
CREATE INDEX "ProofOfWork_verificationStatus_idx" ON "ProofOfWork"("verificationStatus");

-- CreateIndex
CREATE INDEX "ProofOfWork_workType_idx" ON "ProofOfWork"("workType");

-- CreateIndex
CREATE INDEX "CompetencyTestResult_contractorId_idx" ON "CompetencyTestResult"("contractorId");

-- CreateIndex
CREATE INDEX "CompetencyTestResult_category_idx" ON "CompetencyTestResult"("category");

-- CreateIndex
CREATE INDEX "CompetencyTestResult_passed_idx" ON "CompetencyTestResult"("passed");

-- CreateIndex
CREATE INDEX "job_outcome_logs_contractorId_outcome_idx" ON "job_outcome_logs"("contractorId", "outcome");

-- AddForeignKey
ALTER TABLE "ProofOfWork" ADD CONSTRAINT "ProofOfWork_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetencyTestResult" ADD CONSTRAINT "CompetencyTestResult_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_outcome_logs" ADD CONSTRAINT "job_outcome_logs_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_outcome_logs" ADD CONSTRAINT "job_outcome_logs_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
