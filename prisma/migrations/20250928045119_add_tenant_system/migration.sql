-- AlterTable
ALTER TABLE "public"."contractor_profiles" ADD COLUMN     "tenantId" TEXT;

-- AlterTable
ALTER TABLE "public"."messages" ADD COLUMN     "tenantId" TEXT;

-- AlterTable
ALTER TABLE "public"."service_requests" ADD COLUMN     "tenantId" TEXT;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "tenantId" TEXT;

-- CreateTable
CREATE TABLE "public"."tenants" (
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
CREATE TABLE "public"."tenant_configurations" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'string',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_domain_key" ON "public"."tenants"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_subdomain_key" ON "public"."tenants"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_configurations_tenantId_key_key" ON "public"."tenant_configurations"("tenantId", "key");

-- AddForeignKey
ALTER TABLE "public"."tenant_configurations" ADD CONSTRAINT "tenant_configurations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_requests" ADD CONSTRAINT "service_requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contractor_profiles" ADD CONSTRAINT "contractor_profiles_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
