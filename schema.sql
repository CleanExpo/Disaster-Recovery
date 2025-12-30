-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CLIENT', 'CONTRACTOR', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "AustralianState" AS ENUM ('NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT');

-- CreateEnum
CREATE TYPE "IICRCCertificationLevel" AS ENUM ('TECHNICIAN', 'SUPERVISOR', 'INSPECTOR', 'MASTER');

-- CreateEnum
CREATE TYPE "AustralianServiceType" AS ENUM ('WATER_DAMAGE', 'FIRE_DAMAGE', 'SMOKE_DAMAGE', 'MOULD_REMEDIATION', 'ODOUR_REMEDIATION', 'CARPET_CLEANING', 'COMMERCIAL_WATER_DAMAGE', 'COMMERCIAL_FIRE_DAMAGE', 'COMMERCIAL_MOULD', 'COMMERCIAL_ODOUR', 'CRIME_SCENE_CLEANING', 'BIOHAZARD_REMEDIATION', 'HOARDING_CLEANUP', 'VANDALISM_CLEANUP', 'GENERAL_RESTORATION');

-- CreateEnum
CREATE TYPE "EmergencyResponseLevel" AS ENUM ('URGENT', 'HIGH', 'STANDARD', 'SCHEDULED');

-- CreateEnum
CREATE TYPE "InsuranceProviderType" AS ENUM ('NRMA', 'SUNCORP', 'ALLIANZ', 'QBE', 'IAG', 'CGU', 'MEDIBANK', 'OTHER');

-- CreateEnum
CREATE TYPE "InsuranceClaimStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'PARTIALLY_APPROVED', 'DENIED', 'PAYMENT_PROCESSED', 'CLOSED');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('PENDING', 'MATCHED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('AVAILABLE', 'BUSY', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('GENERAL', 'MATCH_NOTIFICATION', 'PROJECT_UPDATE', 'PAYMENT_REMINDER', 'SYSTEM_NOTIFICATION', 'INITIATE_CHAT', 'BID_ACCEPTED', 'BID_REJECTED');

-- CreateEnum
CREATE TYPE "OnboardingStatus" AS ENUM ('PENDING_START', 'IN_PROGRESS', 'PAUSED', 'COMPLETED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ModuleStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "CertificationLevel" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM');

-- CreateEnum
CREATE TYPE "CompetitorCategory" AS ENUM ('RESTORATION_COMPANY', 'INSURANCE_NETWORK', 'CONTRACTOR_MARKETPLACE', 'INDUSTRY_ASSOCIATION');

-- CreateEnum
CREATE TYPE "BlogCategory" AS ENUM ('EMERGENCY_GUIDE', 'INSURANCE_CLAIM', 'PREVENTION', 'INDUSTRY_INSIGHT', 'CASE_STUDY', 'RESOURCE');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "FAQCategory" AS ENUM ('EMERGENCY_RESPONSE', 'PRICING_QUOTES', 'INSURANCE_CLAIMS', 'SERVICE_SPECIFIC', 'CONTRACTOR_NETWORK', 'PLATFORM_USAGE', 'PREVENTION_TIPS', 'SAFETY_HEALTH');

-- CreateEnum
CREATE TYPE "CustomerLifecycleStage" AS ENUM ('LEAD', 'QUALIFIED_LEAD', 'OPPORTUNITY', 'CUSTOMER', 'AT_RISK', 'CHURNED', 'ADVOCATE');

-- CreateEnum
CREATE TYPE "OpportunityStage" AS ENUM ('DISCOVERY', 'ASSESSMENT', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('EMAIL', 'CALL', 'MEETING', 'NOTE', 'INSPECTION', 'QUOTE_SENT', 'CONTRACT_SIGNED', 'BOOKING_CREATED', 'PAYMENT_RECEIVED', 'CLAIM_SUBMITTED', 'CLAIM_APPROVED', 'FOLLOW_UP', 'COMPLAINT', 'REVIEW_RECEIVED');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'WAITING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MetricType" AS ENUM ('CONVERSION_RATE', 'RESPONSE_TIME', 'CUSTOMER_SATISFACTION', 'REVENUE_TARGET', 'CHURN_RATE');

-- CreateEnum
CREATE TYPE "AlertSeverity" AS ENUM ('INFO', 'WARNING', 'CRITICAL');

-- CreateEnum
CREATE TYPE "InspectionStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'DATA_COLLECTION_COMPLETE', 'DRAFT_GENERATED', 'TECHNICAL_REVIEW', 'MANAGER_REVIEW', 'APPROVED', 'SENT_TO_CLIENT', 'SENT_TO_INSURER', 'REVISED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DamageCategory" AS ENUM ('CATEGORY_1', 'CATEGORY_2', 'CATEGORY_3', 'CATEGORY_4');

-- CreateEnum
CREATE TYPE "IICRCStandard" AS ENUM ('S500_WATER_DAMAGE', 'S520_MOLD_REMEDIATION', 'S800_BIOHAZARD', 'WRT_WATER_RESTORATION', 'AMRT_APPLIED_MICROBIAL', 'FSRT_FIRE_SMOKE');

-- CreateEnum
CREATE TYPE "ReportApprovalStatus" AS ENUM ('PENDING_REVIEW', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'REVISION_REQUESTED');

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT,
    "subdomain" TEXT,
    "logo" TEXT,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "customCss" TEXT,
    "industry" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_configurations" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'string',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "userType" "UserType" NOT NULL DEFAULT 'CLIENT',
    "googleId" TEXT,
    "avatar" TEXT,
    "australianPhoneNumber" TEXT,
    "australianPostcode" TEXT,
    "australianState" "AustralianState",
    "suburb" TEXT,
    "streetAddress" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationToken" TEXT,
    "emailVerificationTokenExpiry" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginAt" TIMESTAMP(3),
    "tenantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "interests" TEXT[],
    "serviceTypes" TEXT[],
    "budgetRange" TEXT,
    "urgencyLevel" TEXT,
    "communicationStyle" TEXT,
    "notificationSettings" JSONB,
    "dashboardLayout" JSONB,
    "themePreferences" JSONB,
    "isOnboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brandingColor" TEXT,
    "selectedTheme" TEXT,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contractor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "abnNumber" TEXT,
    "acnNumber" TEXT,
    "businessRegistrationDate" TIMESTAMP(3),
    "primaryPostcode" TEXT,
    "primaryState" "AustralianState",
    "operatingStates" "AustralianState"[],
    "nrpgMemberId" TEXT,
    "nrpgVerifiedAt" TIMESTAMP(3),
    "nrpgVerificationLevel" TEXT,
    "australianSpecialties" "AustralianServiceType"[],
    "supportedEmergencyLevels" "EmergencyResponseLevel"[],
    "publicLiabilityPolicyNumber" TEXT,
    "publicLiabilityExpiryDate" TIMESTAMP(3),
    "workCoverNumber" TEXT,
    "workCoverExpiryDate" TIMESTAMP(3),
    "completedJobs" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "averageResponseTimeMinutes" INTEGER NOT NULL DEFAULT 0,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationDate" TIMESTAMP(3),
    "lastBackgroundCheckDate" TIMESTAMP(3),
    "backgroundCheckStatus" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isSuspended" BOOLEAN NOT NULL DEFAULT false,
    "suspensionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contractor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IICRCCertification" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "certificationLevel" "IICRCCertificationLevel" NOT NULL,
    "certificationCode" TEXT NOT NULL,
    "certificationDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "verificationDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "verifiedBy" TEXT,
    "certificatePdfUrl" TEXT,
    "certificateFileName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IICRCCertification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractorServiceArea" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "state" "AustralianState" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "responseTimeMinutes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractorServiceArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_service_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "theme" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_service_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_services" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "theme" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_themes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "secondaryColor" TEXT NOT NULL,
    "accentColor" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceCategory" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "serviceTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "budget" TEXT,
    "phone" TEXT,
    "preferredTime" TEXT,
    "insurance" BOOLEAN NOT NULL DEFAULT false,
    "urgentResponse" BOOLEAN NOT NULL DEFAULT false,
    "status" "ServiceStatus" NOT NULL DEFAULT 'PENDING',
    "leadScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "service_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "licenseNumber" TEXT,
    "insuranceProvider" TEXT,
    "insuranceExpiry" TIMESTAMP(3),
    "services" TEXT[],
    "serviceAreas" TEXT[],
    "hourlyRate" DOUBLE PRECISION,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalJobs" INTEGER NOT NULL DEFAULT 0,
    "bio" TEXT,
    "availability" "AvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "contractor_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_matches" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "serviceRequestId" TEXT NOT NULL,
    "matchScore" DOUBLE PRECISION NOT NULL,
    "status" "MatchStatus" NOT NULL DEFAULT 'PENDING',
    "contractorMessage" TEXT,
    "clientMessage" TEXT,
    "budget" TEXT,
    "timeline" TEXT,
    "startDate" TEXT,
    "estimatedHours" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contractor_matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceCategories" TEXT[],
    "locations" TEXT[],
    "experience" TEXT,
    "expertise" TEXT[],
    "background" TEXT,
    "hourlyRate" TEXT,
    "availability" TEXT,
    "maxDistance" TEXT,
    "selectedTheme" TEXT,
    "brandingColor" TEXT,
    "isOnboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contractor_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "contractorId" TEXT,
    "australianServiceType" "AustralianServiceType" NOT NULL,
    "description" TEXT NOT NULL,
    "estimatedDamagePhotosCount" INTEGER NOT NULL DEFAULT 0,
    "servicePostcode" TEXT NOT NULL,
    "serviceState" "AustralianState" NOT NULL,
    "serviceSuburb" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "emergencyResponseLevel" "EmergencyResponseLevel" NOT NULL DEFAULT 'STANDARD',
    "scheduledDate" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "estimatedCostAUD" DECIMAL(65,30) NOT NULL,
    "finalCostAUD" DECIMAL(65,30),
    "notes" TEXT,
    "internalNotes" TEXT,
    "clientNotes" TEXT,
    "damagePhotos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "contractorId" TEXT,
    "amountAUD" DECIMAL(65,30) NOT NULL,
    "platformFeeAUD" DECIMAL(65,30) NOT NULL,
    "platformFeePercentage" DECIMAL(65,30) NOT NULL DEFAULT 15.00,
    "gstAUD" DECIMAL(65,30) NOT NULL,
    "netAmountAUD" DECIMAL(65,30) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "stripePaymentIntentId" TEXT,
    "transactionId" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "processedAt" TIMESTAMP(3),
    "failureReason" TEXT,
    "receiptUrl" TEXT,
    "invoiceNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceAU" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "dateIssued" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateDue" TIMESTAMP(3) NOT NULL,
    "subtotalAUD" DECIMAL(65,30) NOT NULL,
    "gstAUD" DECIMAL(65,30) NOT NULL,
    "totalAUD" DECIMAL(65,30) NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "paidDate" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvoiceAU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "providerType" "InsuranceProviderType" NOT NULL,
    "code" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "apiEndpoint" TEXT,
    "apiKey" TEXT,
    "webhookUrl" TEXT,
    "supportedStates" "AustralianState"[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsuranceProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceClaimAU" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "insuranceProviderId" TEXT NOT NULL,
    "policyNumber" TEXT NOT NULL,
    "claimNumber" TEXT,
    "totalClaimAmountAUD" DECIMAL(65,30) NOT NULL,
    "approvedAmountAUD" DECIMAL(65,30),
    "paymentAmountAUD" DECIMAL(65,30),
    "status" "InsuranceClaimStatus" NOT NULL DEFAULT 'DRAFT',
    "damageDescription" TEXT NOT NULL,
    "damagePhotos" TEXT[],
    "invoiceUrl" TEXT,
    "estimateUrl" TEXT,
    "additionalDocuments" TEXT[],
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "denialReason" TEXT,
    "deniedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsuranceClaimAU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "wouldRecommend" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "requestId" TEXT,
    "subject" TEXT,
    "content" TEXT NOT NULL,
    "messageType" "MessageType" NOT NULL DEFAULT 'GENERAL',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "performedBy" TEXT,
    "oldValues" JSONB,
    "newValues" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskAssessment" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "riskScore" DECIMAL(65,30) NOT NULL,
    "riskFactors" TEXT[],
    "recommendation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RiskAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisasterAlert" (
    "id" TEXT NOT NULL,
    "disasterType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "affectedPostcodes" TEXT[],
    "affectedStates" "AustralianState"[],
    "description" TEXT NOT NULL,
    "alertUrl" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DisasterAlert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_onboarding" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contractorId" UUID NOT NULL,
    "specialization" VARCHAR(50) NOT NULL,
    "assessmentScore" INTEGER,
    "recommendedModules" JSONB,
    "startDate" TIMESTAMP(3),
    "targetCompletionDate" TIMESTAMP(3),
    "actualCompletionDate" TIMESTAMP(3),
    "status" "OnboardingStatus" NOT NULL DEFAULT 'PENDING_START',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contractor_onboarding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_module_progress" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "onboardingId" UUID NOT NULL,
    "moduleId" VARCHAR(100) NOT NULL,
    "courseName" VARCHAR(255),
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "status" "ModuleStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contractor_module_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_assessments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "onboardingId" UUID NOT NULL,
    "moduleId" VARCHAR(100) NOT NULL,
    "assessmentType" VARCHAR(50),
    "score" INTEGER,
    "maxScore" INTEGER NOT NULL DEFAULT 100,
    "completedAt" TIMESTAMP(3),
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contractor_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_certifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contractorId" UUID NOT NULL,
    "certificationName" VARCHAR(255) NOT NULL,
    "certificationLevel" INTEGER,
    "issueDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "specializations" TEXT[],
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contractor_certifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competitors" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "CompetitorCategory" NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 5,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "businessModel" TEXT,
    "targetMarket" TEXT,
    "geographicFocus" TEXT[],
    "contactInfo" JSONB,
    "socialProfiles" JSONB,
    "notes" TEXT,
    "discoveredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastAnalyzedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "competitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competitor_analyses" (
    "id" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "organicTraffic" INTEGER,
    "paidTraffic" INTEGER,
    "totalKeywords" INTEGER,
    "organicKeywords" INTEGER,
    "paidKeywords" INTEGER,
    "domainRating" DOUBLE PRECISION,
    "trustFlow" DOUBLE PRECISION,
    "citationFlow" DOUBLE PRECISION,
    "totalBacklinks" INTEGER,
    "referringDomains" INTEGER,
    "pageSpeed" DOUBLE PRECISION,
    "mobileScore" DOUBLE PRECISION,
    "coreWebVitals" JSONB,
    "totalPages" INTEGER,
    "blogPosts" INTEGER,
    "servicePages" INTEGER,
    "analysisDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataSource" TEXT NOT NULL,
    "rawData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "competitor_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competitor_keywords" (
    "id" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "searchVolume" INTEGER,
    "difficulty" DOUBLE PRECISION,
    "cpc" DOUBLE PRECISION,
    "position" INTEGER,
    "previousPosition" INTEGER,
    "url" TEXT,
    "intent" TEXT,
    "category" TEXT,
    "opportunityScore" DOUBLE PRECISION,
    "difficultyTier" TEXT,
    "lastChecked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "competitor_keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "backlinks" (
    "id" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "sourceDomain" TEXT NOT NULL,
    "anchorText" TEXT,
    "linkType" TEXT,
    "domainRating" DOUBLE PRECISION,
    "traffic" INTEGER,
    "firstSeen" TIMESTAMP(3),
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "backlinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "swot_analyses" (
    "id" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "strengths" JSONB NOT NULL,
    "weaknesses" JSONB NOT NULL,
    "opportunities" JSONB NOT NULL,
    "threats" JSONB NOT NULL,
    "summary" TEXT,
    "recommendations" JSONB,
    "competitiveAdvantages" JSONB,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "generatedBy" TEXT,

    CONSTRAINT "swot_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keyword_opportunities" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "searchVolume" INTEGER NOT NULL,
    "difficulty" DOUBLE PRECISION NOT NULL,
    "cpc" DOUBLE PRECISION,
    "competitorCount" INTEGER NOT NULL,
    "averagePosition" DOUBLE PRECISION NOT NULL,
    "gapScore" DOUBLE PRECISION NOT NULL,
    "difficultyTier" TEXT NOT NULL,
    "category" TEXT,
    "intent" TEXT,
    "competitors" JSONB NOT NULL,
    "identifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "keyword_opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" "BlogCategory" NOT NULL,
    "tags" TEXT[],
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" TEXT[],
    "authorId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorBio" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "scheduledFor" TIMESTAMP(3),
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "shareCount" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "featuredImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_faqs" (
    "id" TEXT NOT NULL,
    "blogPostId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "blog_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" "FAQCategory" NOT NULL,
    "tags" TEXT[],
    "serviceType" TEXT,
    "location" TEXT,
    "keywords" TEXT[],
    "searchVolume" INTEGER,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "helpful" INTEGER NOT NULL DEFAULT 0,
    "notHelpful" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_studies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerType" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "incidentDate" TIMESTAMP(3) NOT NULL,
    "challenge" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "testimonial" TEXT,
    "beforeImages" TEXT[],
    "afterImages" TEXT[],
    "videoUrl" TEXT,
    "projectCost" DOUBLE PRECISION,
    "responseTime" INTEGER,
    "completionTime" INTEGER,
    "customerRating" DOUBLE PRECISION,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_studies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_lifecycle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentStage" "CustomerLifecycleStage" NOT NULL DEFAULT 'LEAD',
    "previousStage" "CustomerLifecycleStage",
    "stageChangedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalInteractions" INTEGER NOT NULL DEFAULT 0,
    "lastInteractionDate" TIMESTAMP(3),
    "daysSinceLastContact" INTEGER NOT NULL DEFAULT 0,
    "lifetimeValueAUD" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "averageJobValueAUD" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "totalJobsCompleted" INTEGER NOT NULL DEFAULT 0,
    "healthScore" INTEGER NOT NULL DEFAULT 50,
    "healthScoreReason" TEXT,
    "churnRiskScore" INTEGER NOT NULL DEFAULT 0,
    "isAtRisk" BOOLEAN NOT NULL DEFAULT false,
    "atRiskReasons" TEXT[],
    "assignedCSMId" TEXT,
    "nextTouchpointDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_lifecycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opportunities" (
    "id" TEXT NOT NULL,
    "customerLifecycleId" TEXT NOT NULL,
    "serviceRequestId" TEXT,
    "bookingId" TEXT,
    "name" TEXT NOT NULL,
    "stage" "OpportunityStage" NOT NULL DEFAULT 'DISCOVERY',
    "estimatedValueAUD" DECIMAL(10,2) NOT NULL,
    "probabilityPercent" INTEGER NOT NULL DEFAULT 50,
    "australianServiceType" "AustralianServiceType" NOT NULL,
    "urgencyLevel" "EmergencyResponseLevel" NOT NULL,
    "serviceState" "AustralianState" NOT NULL,
    "servicePostcode" TEXT NOT NULL,
    "expectedCloseDate" TIMESTAMP(3),
    "actualCloseDate" TIMESTAMP(3),
    "assignedContractorId" TEXT,
    "closeReason" TEXT,
    "competitorChosen" TEXT,
    "forecastCategory" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "customerLifecycleId" TEXT,
    "opportunityId" TEXT,
    "bookingId" TEXT,
    "claimId" TEXT,
    "type" "ActivityType" NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT,
    "outcome" TEXT,
    "performedById" TEXT NOT NULL,
    "customerId" TEXT,
    "contractorId" TEXT,
    "activityDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "durationMinutes" INTEGER,
    "attachments" TEXT[],
    "sentiment" TEXT,
    "sentimentScore" DOUBLE PRECISION,
    "requiresFollowUp" BOOLEAN NOT NULL DEFAULT false,
    "followUpDate" TIMESTAMP(3),
    "followUpTaskId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "customerLifecycleId" TEXT,
    "opportunityId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "assignedToId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'TODO',
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "dueDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "reminderDate" TIMESTAMP(3),
    "isOverdue" BOOLEAN NOT NULL DEFAULT false,
    "relatedEntityType" TEXT,
    "relatedEntityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_rules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ruleType" TEXT NOT NULL,
    "metric" "MetricType" NOT NULL,
    "threshold" DECIMAL(10,2) NOT NULL,
    "comparison" TEXT NOT NULL,
    "actionOnViolation" TEXT[],
    "ownerId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_rule_violations" (
    "id" TEXT NOT NULL,
    "businessRuleId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "actualValue" DECIMAL(10,2) NOT NULL,
    "expectedValue" DECIMAL(10,2) NOT NULL,
    "severity" "AlertSeverity" NOT NULL,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedAt" TIMESTAMP(3),
    "resolvedById" TEXT,
    "resolutionNote" TEXT,
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_rule_violations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspection_reports" (
    "id" TEXT NOT NULL,
    "reportNumber" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "insuranceClaimId" TEXT,
    "inspectionDate" TIMESTAMP(3) NOT NULL,
    "inspectorId" TEXT NOT NULL,
    "jurisdiction" "AustralianState" NOT NULL,
    "applicableCodes" TEXT[],
    "iicrcStandards" "IICRCStandard"[],
    "status" "InspectionStatus" NOT NULL DEFAULT 'SCHEDULED',
    "version" INTEGER NOT NULL DEFAULT 1,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "technicalReviewerId" TEXT,
    "technicalReviewDate" TIMESTAMP(3),
    "technicalReviewNotes" TEXT,
    "managerReviewerId" TEXT,
    "managerReviewDate" TIMESTAMP(3),
    "managerReviewNotes" TEXT,
    "finalApproverId" TEXT,
    "finalApprovalDate" TIMESTAMP(3),
    "executiveSummary" TEXT,
    "scopeOfWork" TEXT NOT NULL,
    "findings" TEXT NOT NULL,
    "recommendations" TEXT NOT NULL,
    "limitations" TEXT,
    "pdfUrl" TEXT,
    "pdfGeneratedAt" TIMESTAMP(3),
    "pdfVersion" INTEGER NOT NULL DEFAULT 0,
    "complianceStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "inspection_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "damage_areas" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "areaName" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "roomType" TEXT NOT NULL,
    "damageCategory" "DamageCategory" NOT NULL,
    "affectedArea" DOUBLE PRECISION NOT NULL,
    "affectedMaterials" TEXT[],
    "initialMoistureLevel" DOUBLE PRECISION,
    "targetMoistureLevel" DOUBLE PRECISION,
    "description" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "requiredActions" TEXT[],
    "equipmentNeeded" TEXT[],
    "estimatedDryingTime" INTEGER,
    "estimatedCost" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "damage_areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moisture_readings" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "readingDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "moistureContent" DOUBLE PRECISION NOT NULL,
    "ambientTemperature" DOUBLE PRECISION,
    "ambientHumidity" DOUBLE PRECISION,
    "meterType" TEXT NOT NULL,
    "readingDepth" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "moisture_readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspection_photos" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "damageAreaId" TEXT,
    "photoUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "filename" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "photoType" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "description" TEXT,
    "capturedAt" TIMESTAMP(3) NOT NULL,
    "gpsLatitude" DOUBLE PRECISION,
    "gpsLongitude" DOUBLE PRECISION,
    "deviceModel" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inspection_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_estimates" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "totalLaborHours" DOUBLE PRECISION NOT NULL,
    "totalLaborCost" DOUBLE PRECISION NOT NULL,
    "totalMaterialCost" DOUBLE PRECISION NOT NULL,
    "totalEquipmentCost" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "gst" DOUBLE PRECISION NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,
    "pricingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jurisdiction" "AustralianState" NOT NULL,
    "pricingSource" TEXT NOT NULL,
    "contingencyPercent" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "contingencyAmount" DOUBLE PRECISION NOT NULL,
    "assumptions" TEXT,
    "exclusions" TEXT,
    "validityPeriod" INTEGER NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cost_estimates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "labor_line_items" (
    "id" TEXT NOT NULL,
    "costEstimateId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "taskCode" TEXT NOT NULL,
    "iicrcLevel" TEXT NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "hourlyRate" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "jurisdiction" "AustralianState" NOT NULL,
    "rateEffectiveDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "labor_line_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_line_items" (
    "id" TEXT NOT NULL,
    "costEstimateId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "materialCode" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "supplierName" TEXT,
    "supplierSKU" TEXT,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "jurisdiction" "AustralianState" NOT NULL,
    "priceEffectiveDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "material_line_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment_line_items" (
    "id" TEXT NOT NULL,
    "costEstimateId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "equipmentCode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "rentalDays" INTEGER NOT NULL,
    "dailyRate" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "jurisdiction" "AustralianState" NOT NULL,
    "rateEffectiveDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "equipment_line_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance_checks" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "checkName" TEXT NOT NULL,
    "checkCode" TEXT NOT NULL,
    "jurisdiction" "AustralianState" NOT NULL,
    "status" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "evidence" TEXT,
    "referenceSection" TEXT,
    "validatedBy" TEXT,
    "validatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "compliance_checks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_revisions" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "revisionReason" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "snapshotData" JSONB NOT NULL,
    "pdfUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_revisions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_domain_key" ON "tenants"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_subdomain_key" ON "tenants"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_configurations_tenantId_key_key" ON "tenant_configurations"("tenantId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_userType_idx" ON "users"("userType");

-- CreateIndex
CREATE INDEX "users_australianState_idx" ON "users"("australianState");

-- CreateIndex
CREATE INDEX "users_isActive_idx" ON "users"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "user_preferences_userId_key" ON "user_preferences"("userId");

-- CreateIndex
CREATE INDEX "LoginAttempt_userId_idx" ON "LoginAttempt"("userId");

-- CreateIndex
CREATE INDEX "LoginAttempt_ipAddress_idx" ON "LoginAttempt"("ipAddress");

-- CreateIndex
CREATE INDEX "LoginAttempt_attemptedAt_idx" ON "LoginAttempt"("attemptedAt");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE INDEX "VerificationToken_userId_idx" ON "VerificationToken"("userId");

-- CreateIndex
CREATE INDEX "VerificationToken_token_idx" ON "VerificationToken"("token");

-- CreateIndex
CREATE INDEX "VerificationToken_expiresAt_idx" ON "VerificationToken"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_userId_key" ON "Contractor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_abnNumber_key" ON "Contractor"("abnNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_acnNumber_key" ON "Contractor"("acnNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_nrpgMemberId_key" ON "Contractor"("nrpgMemberId");

-- CreateIndex
CREATE INDEX "Contractor_businessName_idx" ON "Contractor"("businessName");

-- CreateIndex
CREATE INDEX "Contractor_primaryState_idx" ON "Contractor"("primaryState");

-- CreateIndex
CREATE INDEX "Contractor_nrpgMemberId_idx" ON "Contractor"("nrpgMemberId");

-- CreateIndex
CREATE INDEX "Contractor_isVerified_idx" ON "Contractor"("isVerified");

-- CreateIndex
CREATE INDEX "Contractor_isActive_idx" ON "Contractor"("isActive");

-- CreateIndex
CREATE INDEX "Contractor_abnNumber_idx" ON "Contractor"("abnNumber");

-- CreateIndex
CREATE UNIQUE INDEX "IICRCCertification_certificationCode_key" ON "IICRCCertification"("certificationCode");

-- CreateIndex
CREATE INDEX "IICRCCertification_contractorId_idx" ON "IICRCCertification"("contractorId");

-- CreateIndex
CREATE INDEX "IICRCCertification_certificationCode_idx" ON "IICRCCertification"("certificationCode");

-- CreateIndex
CREATE INDEX "IICRCCertification_expiryDate_idx" ON "IICRCCertification"("expiryDate");

-- CreateIndex
CREATE INDEX "IICRCCertification_isActive_idx" ON "IICRCCertification"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "IICRCCertification_contractorId_certificationLevel_certific_key" ON "IICRCCertification"("contractorId", "certificationLevel", "certificationCode");

-- CreateIndex
CREATE INDEX "ContractorServiceArea_postcode_idx" ON "ContractorServiceArea"("postcode");

-- CreateIndex
CREATE INDEX "ContractorServiceArea_state_idx" ON "ContractorServiceArea"("state");

-- CreateIndex
CREATE INDEX "ContractorServiceArea_contractorId_idx" ON "ContractorServiceArea"("contractorId");

-- CreateIndex
CREATE UNIQUE INDEX "ContractorServiceArea_contractorId_postcode_key" ON "ContractorServiceArea"("contractorId", "postcode");

-- CreateIndex
CREATE UNIQUE INDEX "admin_service_categories_name_key" ON "admin_service_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "admin_services_categoryId_name_key" ON "admin_services"("categoryId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "admin_themes_identifier_key" ON "admin_themes"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_profiles_userId_key" ON "contractor_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_preferences_userId_key" ON "contractor_preferences"("userId");

-- CreateIndex
CREATE INDEX "Booking_clientId_idx" ON "Booking"("clientId");

-- CreateIndex
CREATE INDEX "Booking_contractorId_idx" ON "Booking"("contractorId");

-- CreateIndex
CREATE INDEX "Booking_servicePostcode_idx" ON "Booking"("servicePostcode");

-- CreateIndex
CREATE INDEX "Booking_serviceState_idx" ON "Booking"("serviceState");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_emergencyResponseLevel_idx" ON "Booking"("emergencyResponseLevel");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "Payment"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_invoiceNumber_key" ON "Payment"("invoiceNumber");

-- CreateIndex
CREATE INDEX "Payment_bookingId_idx" ON "Payment"("bookingId");

-- CreateIndex
CREATE INDEX "Payment_clientId_idx" ON "Payment"("clientId");

-- CreateIndex
CREATE INDEX "Payment_contractorId_idx" ON "Payment"("contractorId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "Payment_invoiceNumber_idx" ON "Payment"("invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceAU_paymentId_key" ON "InvoiceAU"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceAU_invoiceNumber_key" ON "InvoiceAU"("invoiceNumber");

-- CreateIndex
CREATE INDEX "InvoiceAU_invoiceNumber_idx" ON "InvoiceAU"("invoiceNumber");

-- CreateIndex
CREATE INDEX "InvoiceAU_contractorId_idx" ON "InvoiceAU"("contractorId");

-- CreateIndex
CREATE INDEX "InvoiceAU_clientId_idx" ON "InvoiceAU"("clientId");

-- CreateIndex
CREATE INDEX "InvoiceAU_isPaid_idx" ON "InvoiceAU"("isPaid");

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceProvider_code_key" ON "InsuranceProvider"("code");

-- CreateIndex
CREATE INDEX "InsuranceProvider_code_idx" ON "InsuranceProvider"("code");

-- CreateIndex
CREATE INDEX "InsuranceProvider_isActive_idx" ON "InsuranceProvider"("isActive");

-- CreateIndex
CREATE INDEX "InsuranceProvider_providerType_idx" ON "InsuranceProvider"("providerType");

-- CreateIndex
CREATE INDEX "InsuranceClaimAU_bookingId_idx" ON "InsuranceClaimAU"("bookingId");

-- CreateIndex
CREATE INDEX "InsuranceClaimAU_clientId_idx" ON "InsuranceClaimAU"("clientId");

-- CreateIndex
CREATE INDEX "InsuranceClaimAU_insuranceProviderId_idx" ON "InsuranceClaimAU"("insuranceProviderId");

-- CreateIndex
CREATE INDEX "InsuranceClaimAU_policyNumber_idx" ON "InsuranceClaimAU"("policyNumber");

-- CreateIndex
CREATE INDEX "InsuranceClaimAU_claimNumber_idx" ON "InsuranceClaimAU"("claimNumber");

-- CreateIndex
CREATE INDEX "InsuranceClaimAU_status_idx" ON "InsuranceClaimAU"("status");

-- CreateIndex
CREATE INDEX "Rating_contractorId_idx" ON "Rating"("contractorId");

-- CreateIndex
CREATE INDEX "Rating_clientId_idx" ON "Rating"("clientId");

-- CreateIndex
CREATE INDEX "Rating_rating_idx" ON "Rating"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_bookingId_contractorId_key" ON "Rating"("bookingId", "contractorId");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_idx" ON "AuditLog"("entityType");

-- CreateIndex
CREATE INDEX "AuditLog_entityId_idx" ON "AuditLog"("entityId");

-- CreateIndex
CREATE INDEX "AuditLog_performedBy_idx" ON "AuditLog"("performedBy");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "RiskAssessment_bookingId_key" ON "RiskAssessment"("bookingId");

-- CreateIndex
CREATE INDEX "RiskAssessment_bookingId_idx" ON "RiskAssessment"("bookingId");

-- CreateIndex
CREATE INDEX "RiskAssessment_riskScore_idx" ON "RiskAssessment"("riskScore");

-- CreateIndex
CREATE INDEX "DisasterAlert_disasterType_idx" ON "DisasterAlert"("disasterType");

-- CreateIndex
CREATE INDEX "DisasterAlert_severity_idx" ON "DisasterAlert"("severity");

-- CreateIndex
CREATE INDEX "DisasterAlert_isActive_idx" ON "DisasterAlert"("isActive");

-- CreateIndex
CREATE INDEX "DisasterAlert_startDate_idx" ON "DisasterAlert"("startDate");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_onboarding_contractorId_key" ON "contractor_onboarding"("contractorId");

-- CreateIndex
CREATE INDEX "idx_contractor_status" ON "contractor_onboarding"("status");

-- CreateIndex
CREATE INDEX "idx_contractor_specialization" ON "contractor_onboarding"("specialization");

-- CreateIndex
CREATE INDEX "idx_contractor_id_onboarding" ON "contractor_onboarding"("contractorId");

-- CreateIndex
CREATE INDEX "idx_module_progress" ON "contractor_module_progress"("onboardingId", "status");

-- CreateIndex
CREATE INDEX "idx_contractor_id_cert" ON "contractor_certifications"("contractorId");

-- CreateIndex
CREATE UNIQUE INDEX "competitors_domain_key" ON "competitors"("domain");

-- CreateIndex
CREATE INDEX "competitors_category_idx" ON "competitors"("category");

-- CreateIndex
CREATE INDEX "competitors_isActive_idx" ON "competitors"("isActive");

-- CreateIndex
CREATE INDEX "competitors_lastAnalyzedAt_idx" ON "competitors"("lastAnalyzedAt");

-- CreateIndex
CREATE INDEX "competitor_analyses_competitorId_idx" ON "competitor_analyses"("competitorId");

-- CreateIndex
CREATE INDEX "competitor_analyses_analysisDate_idx" ON "competitor_analyses"("analysisDate");

-- CreateIndex
CREATE INDEX "competitor_keywords_competitorId_idx" ON "competitor_keywords"("competitorId");

-- CreateIndex
CREATE INDEX "competitor_keywords_difficultyTier_idx" ON "competitor_keywords"("difficultyTier");

-- CreateIndex
CREATE INDEX "competitor_keywords_opportunityScore_idx" ON "competitor_keywords"("opportunityScore");

-- CreateIndex
CREATE UNIQUE INDEX "competitor_keywords_competitorId_keyword_key" ON "competitor_keywords"("competitorId", "keyword");

-- CreateIndex
CREATE INDEX "backlinks_competitorId_idx" ON "backlinks"("competitorId");

-- CreateIndex
CREATE INDEX "backlinks_sourceDomain_idx" ON "backlinks"("sourceDomain");

-- CreateIndex
CREATE INDEX "backlinks_isActive_idx" ON "backlinks"("isActive");

-- CreateIndex
CREATE INDEX "swot_analyses_competitorId_idx" ON "swot_analyses"("competitorId");

-- CreateIndex
CREATE INDEX "swot_analyses_generatedAt_idx" ON "swot_analyses"("generatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "keyword_opportunities_keyword_key" ON "keyword_opportunities"("keyword");

-- CreateIndex
CREATE INDEX "keyword_opportunities_difficultyTier_idx" ON "keyword_opportunities"("difficultyTier");

-- CreateIndex
CREATE INDEX "keyword_opportunities_gapScore_idx" ON "keyword_opportunities"("gapScore");

-- CreateIndex
CREATE INDEX "keyword_opportunities_category_idx" ON "keyword_opportunities"("category");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_slug_idx" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_category_idx" ON "blog_posts"("category");

-- CreateIndex
CREATE INDEX "blog_posts_status_idx" ON "blog_posts"("status");

-- CreateIndex
CREATE INDEX "blog_posts_publishedAt_idx" ON "blog_posts"("publishedAt");

-- CreateIndex
CREATE INDEX "blog_faqs_blogPostId_idx" ON "blog_faqs"("blogPostId");

-- CreateIndex
CREATE INDEX "faqs_category_idx" ON "faqs"("category");

-- CreateIndex
CREATE INDEX "faqs_serviceType_idx" ON "faqs"("serviceType");

-- CreateIndex
CREATE INDEX "faqs_location_idx" ON "faqs"("location");

-- CreateIndex
CREATE UNIQUE INDEX "case_studies_slug_key" ON "case_studies"("slug");

-- CreateIndex
CREATE INDEX "case_studies_slug_idx" ON "case_studies"("slug");

-- CreateIndex
CREATE INDEX "case_studies_serviceType_idx" ON "case_studies"("serviceType");

-- CreateIndex
CREATE INDEX "case_studies_location_idx" ON "case_studies"("location");

-- CreateIndex
CREATE UNIQUE INDEX "customer_lifecycle_userId_key" ON "customer_lifecycle"("userId");

-- CreateIndex
CREATE INDEX "customer_lifecycle_currentStage_idx" ON "customer_lifecycle"("currentStage");

-- CreateIndex
CREATE INDEX "customer_lifecycle_healthScore_idx" ON "customer_lifecycle"("healthScore");

-- CreateIndex
CREATE INDEX "customer_lifecycle_churnRiskScore_idx" ON "customer_lifecycle"("churnRiskScore");

-- CreateIndex
CREATE INDEX "customer_lifecycle_isAtRisk_idx" ON "customer_lifecycle"("isAtRisk");

-- CreateIndex
CREATE INDEX "customer_lifecycle_lastInteractionDate_idx" ON "customer_lifecycle"("lastInteractionDate");

-- CreateIndex
CREATE UNIQUE INDEX "opportunities_serviceRequestId_key" ON "opportunities"("serviceRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "opportunities_bookingId_key" ON "opportunities"("bookingId");

-- CreateIndex
CREATE INDEX "opportunities_stage_idx" ON "opportunities"("stage");

-- CreateIndex
CREATE INDEX "opportunities_expectedCloseDate_idx" ON "opportunities"("expectedCloseDate");

-- CreateIndex
CREATE INDEX "opportunities_australianServiceType_idx" ON "opportunities"("australianServiceType");

-- CreateIndex
CREATE INDEX "opportunities_serviceState_idx" ON "opportunities"("serviceState");

-- CreateIndex
CREATE INDEX "opportunities_assignedContractorId_idx" ON "opportunities"("assignedContractorId");

-- CreateIndex
CREATE INDEX "activities_customerLifecycleId_idx" ON "activities"("customerLifecycleId");

-- CreateIndex
CREATE INDEX "activities_opportunityId_idx" ON "activities"("opportunityId");

-- CreateIndex
CREATE INDEX "activities_type_idx" ON "activities"("type");

-- CreateIndex
CREATE INDEX "activities_activityDate_idx" ON "activities"("activityDate");

-- CreateIndex
CREATE INDEX "activities_performedById_idx" ON "activities"("performedById");

-- CreateIndex
CREATE INDEX "activities_requiresFollowUp_idx" ON "activities"("requiresFollowUp");

-- CreateIndex
CREATE INDEX "tasks_assignedToId_idx" ON "tasks"("assignedToId");

-- CreateIndex
CREATE INDEX "tasks_status_idx" ON "tasks"("status");

-- CreateIndex
CREATE INDEX "tasks_priority_idx" ON "tasks"("priority");

-- CreateIndex
CREATE INDEX "tasks_dueDate_idx" ON "tasks"("dueDate");

-- CreateIndex
CREATE INDEX "tasks_isOverdue_idx" ON "tasks"("isOverdue");

-- CreateIndex
CREATE INDEX "business_rules_ruleType_idx" ON "business_rules"("ruleType");

-- CreateIndex
CREATE INDEX "business_rules_isActive_idx" ON "business_rules"("isActive");

-- CreateIndex
CREATE INDEX "business_rule_violations_businessRuleId_idx" ON "business_rule_violations"("businessRuleId");

-- CreateIndex
CREATE INDEX "business_rule_violations_isResolved_idx" ON "business_rule_violations"("isResolved");

-- CreateIndex
CREATE INDEX "business_rule_violations_severity_idx" ON "business_rule_violations"("severity");

-- CreateIndex
CREATE UNIQUE INDEX "inspection_reports_reportNumber_key" ON "inspection_reports"("reportNumber");

-- CreateIndex
CREATE INDEX "inspection_reports_bookingId_idx" ON "inspection_reports"("bookingId");

-- CreateIndex
CREATE INDEX "inspection_reports_status_idx" ON "inspection_reports"("status");

-- CreateIndex
CREATE INDEX "inspection_reports_jurisdiction_idx" ON "inspection_reports"("jurisdiction");

-- CreateIndex
CREATE INDEX "inspection_reports_reportNumber_idx" ON "inspection_reports"("reportNumber");

-- CreateIndex
CREATE INDEX "inspection_reports_inspectorId_idx" ON "inspection_reports"("inspectorId");

-- CreateIndex
CREATE INDEX "damage_areas_reportId_idx" ON "damage_areas"("reportId");

-- CreateIndex
CREATE INDEX "moisture_readings_reportId_idx" ON "moisture_readings"("reportId");

-- CreateIndex
CREATE INDEX "moisture_readings_readingDate_idx" ON "moisture_readings"("readingDate");

-- CreateIndex
CREATE INDEX "inspection_photos_reportId_idx" ON "inspection_photos"("reportId");

-- CreateIndex
CREATE INDEX "inspection_photos_damageAreaId_idx" ON "inspection_photos"("damageAreaId");

-- CreateIndex
CREATE INDEX "inspection_photos_photoType_idx" ON "inspection_photos"("photoType");

-- CreateIndex
CREATE UNIQUE INDEX "cost_estimates_reportId_key" ON "cost_estimates"("reportId");

-- CreateIndex
CREATE INDEX "cost_estimates_reportId_idx" ON "cost_estimates"("reportId");

-- CreateIndex
CREATE INDEX "labor_line_items_costEstimateId_idx" ON "labor_line_items"("costEstimateId");

-- CreateIndex
CREATE INDEX "material_line_items_costEstimateId_idx" ON "material_line_items"("costEstimateId");

-- CreateIndex
CREATE INDEX "equipment_line_items_costEstimateId_idx" ON "equipment_line_items"("costEstimateId");

-- CreateIndex
CREATE INDEX "compliance_checks_reportId_idx" ON "compliance_checks"("reportId");

-- CreateIndex
CREATE INDEX "compliance_checks_status_idx" ON "compliance_checks"("status");

-- CreateIndex
CREATE INDEX "report_revisions_reportId_idx" ON "report_revisions"("reportId");

-- CreateIndex
CREATE INDEX "report_revisions_version_idx" ON "report_revisions"("version");

-- AddForeignKey
ALTER TABLE "tenant_configurations" ADD CONSTRAINT "tenant_configurations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginAttempt" ADD CONSTRAINT "LoginAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contractor" ADD CONSTRAINT "Contractor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IICRCCertification" ADD CONSTRAINT "IICRCCertification_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractorServiceArea" ADD CONSTRAINT "ContractorServiceArea_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_services" ADD CONSTRAINT "admin_services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "admin_service_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_profiles" ADD CONSTRAINT "contractor_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_profiles" ADD CONSTRAINT "contractor_profiles_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_matches" ADD CONSTRAINT "contractor_matches_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "contractor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_matches" ADD CONSTRAINT "contractor_matches_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "service_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_preferences" ADD CONSTRAINT "contractor_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceAU" ADD CONSTRAINT "InvoiceAU_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceAU" ADD CONSTRAINT "InvoiceAU_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceAU" ADD CONSTRAINT "InvoiceAU_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceClaimAU" ADD CONSTRAINT "InsuranceClaimAU_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceClaimAU" ADD CONSTRAINT "InsuranceClaimAU_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceClaimAU" ADD CONSTRAINT "InsuranceClaimAU_insuranceProviderId_fkey" FOREIGN KEY ("insuranceProviderId") REFERENCES "InsuranceProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_module_progress" ADD CONSTRAINT "contractor_module_progress_onboardingId_fkey" FOREIGN KEY ("onboardingId") REFERENCES "contractor_onboarding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_assessments" ADD CONSTRAINT "contractor_assessments_onboardingId_fkey" FOREIGN KEY ("onboardingId") REFERENCES "contractor_onboarding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competitor_analyses" ADD CONSTRAINT "competitor_analyses_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "competitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competitor_keywords" ADD CONSTRAINT "competitor_keywords_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "competitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backlinks" ADD CONSTRAINT "backlinks_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "competitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swot_analyses" ADD CONSTRAINT "swot_analyses_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "competitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_faqs" ADD CONSTRAINT "blog_faqs_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "blog_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_lifecycle" ADD CONSTRAINT "customer_lifecycle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_customerLifecycleId_fkey" FOREIGN KEY ("customerLifecycleId") REFERENCES "customer_lifecycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "service_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_assignedContractorId_fkey" FOREIGN KEY ("assignedContractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_customerLifecycleId_fkey" FOREIGN KEY ("customerLifecycleId") REFERENCES "customer_lifecycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "InsuranceClaimAU"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_customerLifecycleId_fkey" FOREIGN KEY ("customerLifecycleId") REFERENCES "customer_lifecycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_rules" ADD CONSTRAINT "business_rules_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_rule_violations" ADD CONSTRAINT "business_rule_violations_businessRuleId_fkey" FOREIGN KEY ("businessRuleId") REFERENCES "business_rules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_insuranceClaimId_fkey" FOREIGN KEY ("insuranceClaimId") REFERENCES "InsuranceClaimAU"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_inspectorId_fkey" FOREIGN KEY ("inspectorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_technicalReviewerId_fkey" FOREIGN KEY ("technicalReviewerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_managerReviewerId_fkey" FOREIGN KEY ("managerReviewerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_finalApproverId_fkey" FOREIGN KEY ("finalApproverId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "damage_areas" ADD CONSTRAINT "damage_areas_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "inspection_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moisture_readings" ADD CONSTRAINT "moisture_readings_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "inspection_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_photos" ADD CONSTRAINT "inspection_photos_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "inspection_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_photos" ADD CONSTRAINT "inspection_photos_damageAreaId_fkey" FOREIGN KEY ("damageAreaId") REFERENCES "damage_areas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_estimates" ADD CONSTRAINT "cost_estimates_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "inspection_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "labor_line_items" ADD CONSTRAINT "labor_line_items_costEstimateId_fkey" FOREIGN KEY ("costEstimateId") REFERENCES "cost_estimates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_line_items" ADD CONSTRAINT "material_line_items_costEstimateId_fkey" FOREIGN KEY ("costEstimateId") REFERENCES "cost_estimates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment_line_items" ADD CONSTRAINT "equipment_line_items_costEstimateId_fkey" FOREIGN KEY ("costEstimateId") REFERENCES "cost_estimates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_checks" ADD CONSTRAINT "compliance_checks_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "inspection_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_revisions" ADD CONSTRAINT "report_revisions_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "inspection_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_revisions" ADD CONSTRAINT "report_revisions_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

