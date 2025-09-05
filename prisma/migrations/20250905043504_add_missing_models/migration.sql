-- CreateTable
CREATE TABLE "Agency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "domain" TEXT,
    "logo" TEXT,
    "primaryColor" TEXT NOT NULL DEFAULT '#3B82F6',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'CLIENT',
    "emailVerified" DATETIME,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "agencyId" TEXT,
    CONSTRAINT "User_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "businessName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "industry" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "agencyId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Client_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Audit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "version" INTEGER NOT NULL DEFAULT 1,
    "shareToken" TEXT,
    "findings" TEXT,
    "metrics" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "sharedAt" DATETIME,
    "agencyId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    CONSTRAINT "Audit_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Audit_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Audit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "shareToken" TEXT,
    "price" REAL,
    "validUntil" DATETIME,
    "acceptedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "agencyId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "auditId" TEXT,
    "createdById" TEXT NOT NULL,
    CONSTRAINT "Proposal_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Proposal_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Proposal_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Proposal_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "invoiceNumber" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "tax" REAL NOT NULL DEFAULT 0,
    "total" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "dueDate" DATETIME NOT NULL,
    "paidAt" DATETIME,
    "stripeInvoiceId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "agencyId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "proposalId" TEXT,
    CONSTRAINT "Invoice_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invoice_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "source" TEXT,
    "metadata" TEXT,
    "responded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT,
    CONSTRAINT "Enquiry_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "propertyAddress" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "damageType" TEXT NOT NULL,
    "damageDate" DATETIME NOT NULL,
    "damageDescription" TEXT NOT NULL,
    "estimatedAreaAffected" TEXT NOT NULL,
    "hasInsurance" BOOLEAN NOT NULL,
    "insuranceCompany" TEXT,
    "claimNumber" TEXT,
    "excessAmount" TEXT,
    "urgencyLevel" TEXT NOT NULL,
    "propertyValue" TEXT NOT NULL,
    "isBusinessProperty" BOOLEAN NOT NULL,
    "requiresAccommodation" BOOLEAN NOT NULL,
    "leadScore" INTEGER NOT NULL,
    "leadValue" REAL NOT NULL,
    "hasPhotos" BOOLEAN NOT NULL,
    "readyToStart" TEXT NOT NULL,
    "budget" TEXT,
    "decisionMaker" BOOLEAN NOT NULL,
    "qualityStatus" TEXT NOT NULL,
    "source" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "partnerId" TEXT,
    "assignedAt" DATETIME,
    "acceptedAt" DATETIME,
    "rejectedAt" DATETIME,
    "completedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Lead_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "businessName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "abn" TEXT,
    "serviceAreas" TEXT NOT NULL,
    "specializations" TEXT NOT NULL,
    "certifications" TEXT,
    "insuranceApproved" BOOLEAN NOT NULL DEFAULT false,
    "leadCredits" REAL NOT NULL DEFAULT 0,
    "accountBalance" REAL NOT NULL DEFAULT 0,
    "creditLimit" REAL NOT NULL DEFAULT 5000,
    "paymentTerms" INTEGER NOT NULL DEFAULT 7,
    "autoAcceptScore" INTEGER NOT NULL DEFAULT 80,
    "maxLeadsPerDay" INTEGER NOT NULL DEFAULT 10,
    "receiveEmergency" BOOLEAN NOT NULL DEFAULT true,
    "receiveCommercial" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "verifiedAt" DATETIME,
    "suspendedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PartnerBilling" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "partnerId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "dueDate" DATETIME NOT NULL,
    "paidAt" DATETIME,
    "paymentMethod" TEXT,
    "transactionId" TEXT,
    "invoiceNumber" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PartnerBilling_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PartnerBilling_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PartnerPayment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "partnerId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "transactionId" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PartnerPayment_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LeadTracking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LeadTracking_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LeadNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LeadNote_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Contractor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "passwordResetToken" TEXT,
    "passwordResetExpiry" DATETIME,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationToken" TEXT,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorSecret" TEXT,
    "twoFactorBackupCodes" TEXT,
    "mobileNumber" TEXT NOT NULL,
    "mobileVerified" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "onboardingStep" INTEGER NOT NULL DEFAULT 1,
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "approvedAt" DATETIME,
    "rejectedAt" DATETIME,
    "suspendedAt" DATETIME,
    "rejectionReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastLoginAt" DATETIME
);

-- CreateTable
CREATE TABLE "ContractorCompany" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "tradingName" TEXT,
    "abn" TEXT NOT NULL,
    "acn" TEXT,
    "companyStructure" TEXT NOT NULL,
    "registeredAddress" TEXT NOT NULL,
    "registeredCity" TEXT NOT NULL,
    "registeredState" TEXT NOT NULL,
    "registeredPostcode" TEXT NOT NULL,
    "mailingAddress" TEXT,
    "mailingCity" TEXT,
    "mailingState" TEXT,
    "mailingPostcode" TEXT,
    "officePhone" TEXT,
    "officeFax" TEXT,
    "website" TEXT,
    "companyEmail" TEXT,
    "directors" TEXT NOT NULL,
    "companyLogo" TEXT,
    "brandColors" TEXT,
    "abnVerified" BOOLEAN NOT NULL DEFAULT false,
    "abnVerifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContractorCompany_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorCertification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "certificationType" TEXT NOT NULL,
    "certificationName" TEXT NOT NULL,
    "certificationNumber" TEXT NOT NULL,
    "issuingOrganization" TEXT NOT NULL,
    "issueDate" DATETIME NOT NULL,
    "expiryDate" DATETIME,
    "documentUrl" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" DATETIME,
    "verifiedBy" TEXT,
    "verificationNotes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContractorCertification_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorInsurance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "insuranceType" TEXT NOT NULL,
    "insurer" TEXT NOT NULL,
    "policyNumber" TEXT NOT NULL,
    "coverageAmount" REAL NOT NULL,
    "excess" REAL,
    "effectiveDate" DATETIME NOT NULL,
    "expiryDate" DATETIME NOT NULL,
    "certificateUrl" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" DATETIME,
    "verifiedBy" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContractorInsurance_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorReference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "referenceName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "projectDescription" TEXT,
    "contacted" BOOLEAN NOT NULL DEFAULT false,
    "contactedAt" DATETIME,
    "rating" INTEGER,
    "feedback" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContractorReference_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BackgroundCheck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "checkType" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerReference" TEXT,
    "consentGiven" BOOLEAN NOT NULL,
    "consentDate" DATETIME NOT NULL,
    "consentDocument" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "result" TEXT,
    "resultDetails" TEXT,
    "reportUrl" TEXT,
    "riskScore" INTEGER,
    "riskLevel" TEXT,
    "requestedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    "expiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BackgroundCheck_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorSubscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "baseRadius" INTEGER NOT NULL,
    "additionalTerritories" TEXT,
    "billingFrequency" TEXT NOT NULL DEFAULT 'MONTHLY',
    "amount" REAL NOT NULL,
    "nextBillingDate" DATETIME,
    "paymentMethod" TEXT,
    "paymentDetails" TEXT,
    "bondAmount" REAL NOT NULL DEFAULT 5000,
    "bondStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "bondSecuredDate" DATETIME,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "cancelledAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContractorSubscription_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorPayment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subscriptionId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT NOT NULL,
    "transactionId" TEXT,
    "failureReason" TEXT,
    "dueDate" DATETIME NOT NULL,
    "paidAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContractorPayment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "ContractorSubscription" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorInvoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subscriptionId" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "gst" REAL NOT NULL,
    "total" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "issueDate" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "paidAt" DATETIME,
    "items" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContractorInvoice_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "ContractorSubscription" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentName" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "category" TEXT,
    "tags" TEXT,
    "description" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" DATETIME,
    "verifiedBy" TEXT,
    "expiryDate" DATETIME,
    "expiryNotificationSent" BOOLEAN NOT NULL DEFAULT false,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContractorDocument_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorTerritory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "centerLat" REAL,
    "centerLng" REAL,
    "radiusKm" REAL,
    "postcodes" TEXT,
    "suburbs" TEXT,
    "emergencyResponse" BOOLEAN NOT NULL DEFAULT true,
    "afterHours" BOOLEAN NOT NULL DEFAULT false,
    "weekendService" BOOLEAN NOT NULL DEFAULT true,
    "maxJobsPerDay" INTEGER NOT NULL DEFAULT 5,
    "currentActiveJobs" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContractorTerritory_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorKPI" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "periodType" TEXT NOT NULL,
    "periodStart" DATETIME NOT NULL,
    "periodEnd" DATETIME NOT NULL,
    "totalJobs" INTEGER NOT NULL DEFAULT 0,
    "completedJobs" INTEGER NOT NULL DEFAULT 0,
    "averageResponseTime" REAL,
    "averageCompletionTime" REAL,
    "customerSatisfaction" REAL,
    "qualityScore" REAL,
    "complianceScore" REAL,
    "cleanClaimsScore" REAL,
    "carsiCompliance" REAL,
    "totalRevenue" REAL,
    "averageJobValue" REAL,
    "complaints" INTEGER NOT NULL DEFAULT 0,
    "violations" INTEGER NOT NULL DEFAULT 0,
    "calculatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContractorKPI_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorAgreement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "agreementType" TEXT NOT NULL,
    "agreementName" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "documentUrl" TEXT,
    "content" TEXT,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "acceptedAt" DATETIME,
    "acceptanceMethod" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "signatureData" TEXT,
    "signedName" TEXT,
    "signedPosition" TEXT,
    "effectiveDate" DATETIME NOT NULL,
    "expiryDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContractorAgreement_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorTraining" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "trainingType" TEXT NOT NULL,
    "trainingName" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NOT_STARTED',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "completedAt" DATETIME,
    "certificateUrl" TEXT,
    "certificateNumber" TEXT,
    "ceuPoints" REAL,
    "validFrom" DATETIME,
    "validUntil" DATETIME,
    "enrolledAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastAccessedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContractorTraining_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorProject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectType" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "duration" INTEGER,
    "scopeOfWork" TEXT NOT NULL,
    "areaAffected" REAL,
    "projectValue" REAL,
    "insuranceCompany" TEXT,
    "claimNumber" TEXT,
    "beforePhotos" TEXT,
    "afterPhotos" TEXT,
    "reportUrl" TEXT,
    "customerRating" REAL,
    "customerFeedback" TEXT,
    "canContact" BOOLEAN NOT NULL DEFAULT false,
    "contactName" TEXT,
    "contactPhone" TEXT,
    "contactEmail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContractorProject_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorNotification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "actionRequired" BOOLEAN NOT NULL DEFAULT false,
    "actionUrl" TEXT,
    "actionDeadline" DATETIME,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "readAt" DATETIME,
    "dismissed" BOOLEAN NOT NULL DEFAULT false,
    "dismissedAt" DATETIME,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "smsSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContractorNotification_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorSupport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "ticketNumber" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "assignedTo" TEXT,
    "assignedAt" DATETIME,
    "resolution" TEXT,
    "resolvedAt" DATETIME,
    "closedAt" DATETIME,
    "satisfactionRating" INTEGER,
    "satisfactionFeedback" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContractorSupport_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SupportMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "supportTicketId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isInternal" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "authorType" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "attachments" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SupportMessage_supportTicketId_fkey" FOREIGN KEY ("supportTicketId") REFERENCES "ContractorSupport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractorAuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "details" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "performedBy" TEXT NOT NULL,
    "performedByType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContractorAuditLog_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OnboardingPayment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'AUD',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "stripePaymentId" TEXT,
    "stripeSessionId" TEXT,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "OnboardingProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "totalSteps" INTEGER NOT NULL DEFAULT 14,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    "metadata" TEXT
);

-- CreateTable
CREATE TABLE "ModuleProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractorId" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "score" REAL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME
);

-- CreateTable
CREATE TABLE "SubscriptionPricing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'AUD',
    "interval" TEXT NOT NULL DEFAULT 'month',
    "features" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ErrorLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT,
    "metadata" TEXT,
    "source" TEXT,
    "userId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "resourceId" TEXT,
    "details" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Agency_slug_key" ON "Agency"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Audit_shareToken_key" ON "Audit"("shareToken");

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_shareToken_key" ON "Proposal"("shareToken");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_stripeInvoiceId_key" ON "Invoice"("stripeInvoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_proposalId_key" ON "Invoice"("proposalId");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_email_key" ON "Partner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_username_key" ON "Contractor"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_email_key" ON "Contractor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ContractorCompany_contractorId_key" ON "ContractorCompany"("contractorId");

-- CreateIndex
CREATE UNIQUE INDEX "ContractorCompany_abn_key" ON "ContractorCompany"("abn");

-- CreateIndex
CREATE INDEX "ContractorInsurance_expiryDate_idx" ON "ContractorInsurance"("expiryDate");

-- CreateIndex
CREATE UNIQUE INDEX "ContractorSubscription_contractorId_key" ON "ContractorSubscription"("contractorId");

-- CreateIndex
CREATE UNIQUE INDEX "ContractorInvoice_invoiceNumber_key" ON "ContractorInvoice"("invoiceNumber");

-- CreateIndex
CREATE INDEX "ContractorInvoice_invoiceNumber_idx" ON "ContractorInvoice"("invoiceNumber");

-- CreateIndex
CREATE INDEX "ContractorDocument_documentType_expiryDate_idx" ON "ContractorDocument"("documentType", "expiryDate");

-- CreateIndex
CREATE INDEX "ContractorTerritory_type_active_idx" ON "ContractorTerritory"("type", "active");

-- CreateIndex
CREATE INDEX "ContractorKPI_periodType_periodStart_idx" ON "ContractorKPI"("periodType", "periodStart");

-- CreateIndex
CREATE UNIQUE INDEX "ContractorKPI_contractorId_periodType_periodStart_key" ON "ContractorKPI"("contractorId", "periodType", "periodStart");

-- CreateIndex
CREATE INDEX "ContractorAgreement_agreementType_accepted_idx" ON "ContractorAgreement"("agreementType", "accepted");

-- CreateIndex
CREATE INDEX "ContractorTraining_trainingType_status_idx" ON "ContractorTraining"("trainingType", "status");

-- CreateIndex
CREATE INDEX "ContractorProject_projectType_startDate_idx" ON "ContractorProject"("projectType", "startDate");

-- CreateIndex
CREATE INDEX "ContractorNotification_type_read_priority_idx" ON "ContractorNotification"("type", "read", "priority");

-- CreateIndex
CREATE UNIQUE INDEX "ContractorSupport_ticketNumber_key" ON "ContractorSupport"("ticketNumber");

-- CreateIndex
CREATE INDEX "ContractorSupport_ticketNumber_idx" ON "ContractorSupport"("ticketNumber");

-- CreateIndex
CREATE INDEX "ContractorSupport_status_priority_idx" ON "ContractorSupport"("status", "priority");

-- CreateIndex
CREATE INDEX "ContractorAuditLog_category_createdAt_idx" ON "ContractorAuditLog"("category", "createdAt");

-- CreateIndex
CREATE INDEX "ContractorAuditLog_action_createdAt_idx" ON "ContractorAuditLog"("action", "createdAt");

-- CreateIndex
CREATE INDEX "OnboardingPayment_contractorId_idx" ON "OnboardingPayment"("contractorId");

-- CreateIndex
CREATE INDEX "OnboardingPayment_status_idx" ON "OnboardingPayment"("status");

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingProgress_contractorId_key" ON "OnboardingProgress"("contractorId");

-- CreateIndex
CREATE INDEX "OnboardingProgress_contractorId_idx" ON "OnboardingProgress"("contractorId");

-- CreateIndex
CREATE INDEX "ModuleProgress_contractorId_idx" ON "ModuleProgress"("contractorId");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleProgress_contractorId_moduleName_key" ON "ModuleProgress"("contractorId", "moduleName");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPricing_name_key" ON "SubscriptionPricing"("name");

-- CreateIndex
CREATE INDEX "SubscriptionPricing_isActive_idx" ON "SubscriptionPricing"("isActive");

-- CreateIndex
CREATE INDEX "ErrorLog_level_idx" ON "ErrorLog"("level");

-- CreateIndex
CREATE INDEX "ErrorLog_createdAt_idx" ON "ErrorLog"("createdAt");

-- CreateIndex
CREATE INDEX "ErrorLog_userId_idx" ON "ErrorLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_resource_idx" ON "AuditLog"("resource");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");
