-- CreateTable
CREATE TABLE "SubContractor" (
    "id" TEXT NOT NULL,
    "abn" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "tradingName" TEXT,
    "contactName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "tradeType" TEXT NOT NULL,
    "licenceNumber" TEXT NOT NULL,
    "licenceState" TEXT NOT NULL,
    "licenceExpiry" TIMESTAMP(3) NOT NULL,
    "publicLiabilityCoverage" DOUBLE PRECISION NOT NULL,
    "publicLiabilityInsurer" TEXT NOT NULL,
    "publicLiabilityExpiry" TIMESTAMP(3) NOT NULL,
    "onboardingStatus" TEXT NOT NULL DEFAULT 'NOT_STARTED',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "agreementSignedAt" TIMESTAMP(3),
    "agreementSignedBy" TEXT,
    "registeredByContractorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubContractor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubContractorEngagement" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "subContractorId" TEXT NOT NULL,
    "primaryContractorId" TEXT NOT NULL,
    "tradeType" TEXT NOT NULL,
    "workScope" TEXT NOT NULL,
    "subInvoiceAmount" DOUBLE PRECISION NOT NULL,
    "markupPercent" DOUBLE PRECISION NOT NULL,
    "customerChargeAmount" DOUBLE PRECISION NOT NULL,
    "gstAmount" DOUBLE PRECISION NOT NULL,
    "customerChargeTotalIncGst" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'QUOTED',
    "authorisedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "invoicedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubContractorEngagement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SubContractor_registeredByContractorId_idx" ON "SubContractor"("registeredByContractorId");

-- CreateIndex
CREATE INDEX "SubContractor_tradeType_idx" ON "SubContractor"("tradeType");

-- CreateIndex
CREATE INDEX "SubContractor_status_idx" ON "SubContractor"("status");

-- CreateIndex
CREATE UNIQUE INDEX "SubContractor_abn_registeredByContractorId_key" ON "SubContractor"("abn", "registeredByContractorId");

-- CreateIndex
CREATE INDEX "SubContractorEngagement_jobId_idx" ON "SubContractorEngagement"("jobId");

-- CreateIndex
CREATE INDEX "SubContractorEngagement_subContractorId_idx" ON "SubContractorEngagement"("subContractorId");

-- CreateIndex
CREATE INDEX "SubContractorEngagement_primaryContractorId_idx" ON "SubContractorEngagement"("primaryContractorId");

-- CreateIndex
CREATE INDEX "SubContractorEngagement_status_idx" ON "SubContractorEngagement"("status");

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_inspectorId_fkey" FOREIGN KEY ("inspectorId") REFERENCES "Contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubContractorEngagement" ADD CONSTRAINT "SubContractorEngagement_subContractorId_fkey" FOREIGN KEY ("subContractorId") REFERENCES "SubContractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
