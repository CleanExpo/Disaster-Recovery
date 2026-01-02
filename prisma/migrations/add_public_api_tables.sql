-- Migration: Add Public API Tables
-- Created: 2025-01-02
-- Description: Add tables for public API endpoints (lead capture, triage, newsletter, contractor inquiry)

-- Lead Capture Table
CREATE TABLE IF NOT EXISTS "LeadCapture" (
  "id" TEXT NOT NULL PRIMARY KEY,

  -- Personal Information
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,

  -- Property Information
  "propertyAddress" TEXT NOT NULL,
  "suburb" TEXT NOT NULL,
  "state" TEXT NOT NULL,
  "postcode" TEXT NOT NULL,

  -- Damage Information
  "damageType" TEXT NOT NULL,
  "damageDescription" TEXT NOT NULL,

  -- Insurance Information
  "hasInsurance" BOOLEAN NOT NULL DEFAULT false,
  "insuranceProvider" TEXT,
  "claimNumber" TEXT,

  -- Urgency
  "urgency" TEXT NOT NULL DEFAULT 'STANDARD',

  -- Marketing
  "preferredContactMethod" TEXT DEFAULT 'EMAIL',
  "marketingConsent" BOOLEAN NOT NULL DEFAULT false,

  -- Metadata
  "source" TEXT,
  "referrer" TEXT,
  "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "ipAddress" TEXT,
  "userAgent" TEXT,

  -- Status Tracking
  "status" TEXT DEFAULT 'NEW',
  "assignedTo" TEXT,
  "contactedAt" TIMESTAMP(3),
  "convertedToClientAt" TIMESTAMP(3),

  -- Timestamps
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX "LeadCapture_email_idx" ON "LeadCapture"("email");
CREATE INDEX "LeadCapture_phone_idx" ON "LeadCapture"("phone");
CREATE INDEX "LeadCapture_status_idx" ON "LeadCapture"("status");
CREATE INDEX "LeadCapture_submittedAt_idx" ON "LeadCapture"("submittedAt" DESC);
CREATE INDEX "LeadCapture_urgency_idx" ON "LeadCapture"("urgency");

-- Triage Assessment Table
CREATE TABLE IF NOT EXISTS "TriageAssessment" (
  "id" TEXT NOT NULL PRIMARY KEY,

  -- Contact Information
  "email" TEXT,
  "phone" TEXT,

  -- Location
  "postcode" TEXT,
  "state" TEXT,

  -- Responses (JSON)
  "responses" JSONB NOT NULL,

  -- Calculated Results
  "urgencyScore" INTEGER NOT NULL DEFAULT 0,
  "urgencyLevel" TEXT NOT NULL DEFAULT 'STANDARD',
  "estimatedCost" DECIMAL(10,2) DEFAULT 0,
  "recommendations" TEXT[],
  "requiredServices" TEXT[],

  -- Metadata
  "triageSessionId" TEXT,
  "completedAt" TIMESTAMP(3),
  "ipAddress" TEXT,
  "userAgent" TEXT,

  -- Follow-up
  "followedUp" BOOLEAN DEFAULT false,
  "followedUpAt" TIMESTAMP(3),
  "convertedToLead" BOOLEAN DEFAULT false,
  "convertedAt" TIMESTAMP(3),

  -- Timestamps
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX "TriageAssessment_email_idx" ON "TriageAssessment"("email");
CREATE INDEX "TriageAssessment_urgencyLevel_idx" ON "TriageAssessment"("urgencyLevel");
CREATE INDEX "TriageAssessment_completedAt_idx" ON "TriageAssessment"("completedAt" DESC);
CREATE INDEX "TriageAssessment_triageSessionId_idx" ON "TriageAssessment"("triageSessionId");

-- Newsletter Subscription Table
CREATE TABLE IF NOT EXISTS "NewsletterSubscription" (
  "id" TEXT NOT NULL PRIMARY KEY,

  -- Contact Information
  "email" TEXT NOT NULL UNIQUE,
  "firstName" TEXT,
  "lastName" TEXT,

  -- Preferences
  "interests" TEXT[],

  -- Location
  "state" TEXT,
  "postcode" TEXT,

  -- Consent
  "marketingConsent" BOOLEAN NOT NULL DEFAULT false,

  -- Status
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "unsubscribedAt" TIMESTAMP(3),
  "resubscribedAt" TIMESTAMP(3),

  -- Unsubscribe Token
  "unsubscribeToken" TEXT UNIQUE,

  -- Metadata
  "source" TEXT,
  "referrer" TEXT,
  "ipAddress" TEXT,
  "userAgent" TEXT,

  -- Email Engagement
  "emailsSent" INTEGER DEFAULT 0,
  "emailsOpened" INTEGER DEFAULT 0,
  "emailsClicked" INTEGER DEFAULT 0,
  "lastEmailSentAt" TIMESTAMP(3),
  "lastEmailOpenedAt" TIMESTAMP(3),

  -- Timestamps
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX "NewsletterSubscription_isActive_idx" ON "NewsletterSubscription"("isActive");
CREATE INDEX "NewsletterSubscription_subscribedAt_idx" ON "NewsletterSubscription"("subscribedAt" DESC);
CREATE INDEX "NewsletterSubscription_state_idx" ON "NewsletterSubscription"("state");

-- Contractor Inquiry Table
CREATE TABLE IF NOT EXISTS "ContractorInquiry" (
  "id" TEXT NOT NULL PRIMARY KEY,

  -- Business Information
  "businessName" TEXT NOT NULL,
  "abn" TEXT NOT NULL UNIQUE,
  "businessType" TEXT NOT NULL,

  -- Contact Information
  "contactFirstName" TEXT NOT NULL,
  "contactLastName" TEXT NOT NULL,
  "contactEmail" TEXT NOT NULL,
  "contactPhone" TEXT NOT NULL,

  -- Business Address
  "businessAddress" TEXT NOT NULL,
  "suburb" TEXT NOT NULL,
  "state" TEXT NOT NULL,
  "postcode" TEXT NOT NULL,

  -- Services & Experience
  "servicesOffered" TEXT[] NOT NULL,
  "serviceAreas" TEXT[] NOT NULL,
  "certifications" JSONB,
  "yearsInBusiness" INTEGER NOT NULL,
  "numberOfEmployees" INTEGER NOT NULL,

  -- Insurance
  "hasPublicLiability" BOOLEAN NOT NULL,
  "publicLiabilityAmount" DECIMAL(12,2),
  "hasWorkersCompensation" BOOLEAN NOT NULL,

  -- Additional Information
  "additionalInfo" TEXT,
  "website" TEXT,
  "availability24x7" BOOLEAN DEFAULT false,
  "emergencyResponseTime" TEXT,

  -- Consent
  "termsAccepted" BOOLEAN NOT NULL,
  "backgroundCheckConsent" BOOLEAN NOT NULL,

  -- Application Scoring
  "applicationScore" INTEGER DEFAULT 0,
  "status" TEXT DEFAULT 'PENDING',

  -- Review Process
  "reviewedBy" TEXT,
  "reviewedAt" TIMESTAMP(3),
  "reviewNotes" TEXT,
  "approvalReason" TEXT,
  "rejectionReason" TEXT,

  -- Metadata
  "source" TEXT,
  "referrer" TEXT,
  "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "ipAddress" TEXT,
  "userAgent" TEXT,

  -- Timestamps
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX "ContractorInquiry_status_idx" ON "ContractorInquiry"("status");
CREATE INDEX "ContractorInquiry_submittedAt_idx" ON "ContractorInquiry"("submittedAt" DESC);
CREATE INDEX "ContractorInquiry_applicationScore_idx" ON "ContractorInquiry"("applicationScore" DESC);
CREATE INDEX "ContractorInquiry_contactEmail_idx" ON "ContractorInquiry"("contactEmail");
CREATE INDEX "ContractorInquiry_state_idx" ON "ContractorInquiry"("state");
