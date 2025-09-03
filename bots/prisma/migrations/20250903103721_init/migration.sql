-- CreateTable
CREATE TABLE "VerifiedContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "approvedBy" TEXT,
    "approvedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "StepByStepGuide" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "estimatedReadTime" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "lastUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "GuideStep" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guideId" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "warningNotes" TEXT NOT NULL,
    "estimatedTime" TEXT,
    "requiredTools" TEXT NOT NULL,
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GuideStep_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "StepByStepGuide" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ServiceProcedure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "safetyNotes" TEXT NOT NULL,
    "requiredPPE" TEXT NOT NULL,
    "estimatedTime" TEXT NOT NULL,
    "difficultyLevel" TEXT NOT NULL,
    "certificationReq" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "version" TEXT NOT NULL DEFAULT '1.0.0',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "EmergencyGuide" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "emergencyType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "immediateSteps" TEXT NOT NULL,
    "safetyWarnings" TEXT NOT NULL,
    "doNotActions" TEXT NOT NULL,
    "contactNumbers" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "InsuranceProcess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "insurerName" TEXT NOT NULL,
    "processType" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "specialNotes" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "lastVerified" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Contractor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "businessName" TEXT NOT NULL,
    "abn" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "serviceAreas" TEXT NOT NULL,
    "services" TEXT NOT NULL,
    "certifications" TEXT NOT NULL,
    "insuranceDetails" TEXT NOT NULL,
    "responseTime" REAL NOT NULL DEFAULT 0,
    "completionRate" REAL NOT NULL DEFAULT 0,
    "customerRating" REAL NOT NULL DEFAULT 0,
    "totalJobs" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" DATETIME,
    "backgroundCheck" BOOLEAN NOT NULL DEFAULT false,
    "backgroundCheckAt" DATETIME,
    "currentCapacity" INTEGER NOT NULL DEFAULT 10,
    "maxCapacity" INTEGER NOT NULL DEFAULT 10,
    "emergencyAvailable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContractorTerritory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "radius" INTEGER NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContractorTerritory_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorAvailability" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContractorAvailability_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT,
    "contractorId" TEXT,
    "serviceType" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "coordinates" TEXT,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerEmail" TEXT,
    "insuranceClaim" BOOLEAN NOT NULL DEFAULT false,
    "insurerName" TEXT,
    "claimNumber" TEXT,
    "policyNumber" TEXT,
    "assignedAt" DATETIME,
    "acceptedAt" DATETIME,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "description" TEXT NOT NULL,
    "internalNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Job_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BotConversation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "jobId" TEXT,
    "contractorId" TEXT,
    "messages" TEXT NOT NULL,
    "context" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" DATETIME,
    "lastMessageAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BotConversation_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ComplianceAudit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conversationId" TEXT,
    "requestType" TEXT NOT NULL,
    "requestContent" TEXT NOT NULL,
    "responseContent" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "prohibited" BOOLEAN NOT NULL DEFAULT false,
    "disclaimersAdded" TEXT NOT NULL,
    "dataSources" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channel" TEXT NOT NULL,
    "userType" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BotMetrics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalRequests" INTEGER NOT NULL DEFAULT 0,
    "avgResponseTime" REAL NOT NULL DEFAULT 0,
    "successRate" REAL NOT NULL DEFAULT 0,
    "uniqueSessions" INTEGER NOT NULL DEFAULT 0,
    "messagesProcessed" INTEGER NOT NULL DEFAULT 0,
    "emergencyRequests" INTEGER NOT NULL DEFAULT 0,
    "claimsProcessed" INTEGER NOT NULL DEFAULT 0,
    "webRequests" INTEGER NOT NULL DEFAULT 0,
    "smsRequests" INTEGER NOT NULL DEFAULT 0,
    "whatsappRequests" INTEGER NOT NULL DEFAULT 0,
    "emailRequests" INTEGER NOT NULL DEFAULT 0,
    "totalErrors" INTEGER NOT NULL DEFAULT 0,
    "validationErrors" INTEGER NOT NULL DEFAULT 0,
    "systemErrors" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE INDEX "VerifiedContent_type_active_idx" ON "VerifiedContent"("type", "active");

-- CreateIndex
CREATE INDEX "StepByStepGuide_type_userType_active_idx" ON "StepByStepGuide"("type", "userType", "active");

-- CreateIndex
CREATE INDEX "GuideStep_guideId_stepNumber_idx" ON "GuideStep"("guideId", "stepNumber");

-- CreateIndex
CREATE INDEX "ServiceProcedure_serviceType_active_idx" ON "ServiceProcedure"("serviceType", "active");

-- CreateIndex
CREATE INDEX "EmergencyGuide_emergencyType_active_priority_idx" ON "EmergencyGuide"("emergencyType", "active", "priority");

-- CreateIndex
CREATE INDEX "InsuranceProcess_insurerName_processType_active_idx" ON "InsuranceProcess"("insurerName", "processType", "active");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_abn_key" ON "Contractor"("abn");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_email_key" ON "Contractor"("email");

-- CreateIndex
CREATE INDEX "Contractor_active_verified_idx" ON "Contractor"("active", "verified");

-- CreateIndex
CREATE INDEX "ContractorTerritory_contractorId_postcode_idx" ON "ContractorTerritory"("contractorId", "postcode");

-- CreateIndex
CREATE INDEX "ContractorTerritory_suburb_state_idx" ON "ContractorTerritory"("suburb", "state");

-- CreateIndex
CREATE INDEX "ContractorAvailability_contractorId_dayOfWeek_idx" ON "ContractorAvailability"("contractorId", "dayOfWeek");

-- CreateIndex
CREATE INDEX "Job_status_urgency_idx" ON "Job"("status", "urgency");

-- CreateIndex
CREATE INDEX "Job_contractorId_status_idx" ON "Job"("contractorId", "status");

-- CreateIndex
CREATE INDEX "Job_suburb_state_idx" ON "Job"("suburb", "state");

-- CreateIndex
CREATE UNIQUE INDEX "BotConversation_sessionId_key" ON "BotConversation"("sessionId");

-- CreateIndex
CREATE INDEX "BotConversation_sessionId_idx" ON "BotConversation"("sessionId");

-- CreateIndex
CREATE INDEX "BotConversation_status_userType_idx" ON "BotConversation"("status", "userType");

-- CreateIndex
CREATE INDEX "ComplianceAudit_conversationId_idx" ON "ComplianceAudit"("conversationId");

-- CreateIndex
CREATE INDEX "ComplianceAudit_timestamp_idx" ON "ComplianceAudit"("timestamp");

-- CreateIndex
CREATE INDEX "BotMetrics_date_idx" ON "BotMetrics"("date");
