-- CreateTable
CREATE TABLE "ContractorApplication" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT,
    "businessName" TEXT,
    "contactName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractorApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContractorApplication" ADD CONSTRAINT "ContractorApplication_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
