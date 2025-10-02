-- CreateEnum
CREATE TYPE "public"."ServiceStatus" AS ENUM ('PENDING', 'MATCHED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."AvailabilityStatus" AS ENUM ('AVAILABLE', 'BUSY', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "public"."MatchStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "public"."MessageType" AS ENUM ('GENERAL', 'MATCH_NOTIFICATION', 'PROJECT_UPDATE', 'PAYMENT_REMINDER', 'SYSTEM_NOTIFICATION');

-- AlterEnum
ALTER TYPE "public"."UserType" ADD VALUE 'ADMIN';

-- CreateTable
CREATE TABLE "public"."service_requests" (
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
    "status" "public"."ServiceStatus" NOT NULL DEFAULT 'PENDING',
    "leadScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contractor_profiles" (
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
    "availability" "public"."AvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contractor_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contractor_matches" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "serviceRequestId" TEXT NOT NULL,
    "matchScore" DOUBLE PRECISION NOT NULL,
    "status" "public"."MatchStatus" NOT NULL DEFAULT 'PENDING',
    "contractorMessage" TEXT,
    "clientMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contractor_matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."messages" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "requestId" TEXT,
    "subject" TEXT,
    "content" TEXT NOT NULL,
    "messageType" "public"."MessageType" NOT NULL DEFAULT 'GENERAL',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contractor_profiles_userId_key" ON "public"."contractor_profiles"("userId");

-- AddForeignKey
ALTER TABLE "public"."service_requests" ADD CONSTRAINT "service_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contractor_profiles" ADD CONSTRAINT "contractor_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contractor_matches" ADD CONSTRAINT "contractor_matches_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "public"."contractor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contractor_matches" ADD CONSTRAINT "contractor_matches_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "public"."service_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
