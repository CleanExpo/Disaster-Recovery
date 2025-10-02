-- AlterTable
ALTER TABLE "public"."user_preferences" ADD COLUMN     "brandingColor" TEXT,
ADD COLUMN     "selectedTheme" TEXT;

-- CreateTable
CREATE TABLE "public"."admin_service_categories" (
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
CREATE TABLE "public"."admin_services" (
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
CREATE TABLE "public"."admin_themes" (
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

-- CreateIndex
CREATE UNIQUE INDEX "admin_themes_identifier_key" ON "public"."admin_themes"("identifier");

-- AddForeignKey
ALTER TABLE "public"."admin_services" ADD CONSTRAINT "admin_services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."admin_service_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
