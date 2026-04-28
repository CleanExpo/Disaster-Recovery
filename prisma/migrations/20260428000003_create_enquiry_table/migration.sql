-- DR-804 Bucket 1 backfill: Enquiry table missing in live Supabase.
-- Public contact form posts to this table. Nearest live tables (waitlist_submissions,
-- opportunities) are not clean matches — Enquiry is the canonical pre-Lead surface
-- per UBIQUITOUS_LANGUAGE.md.
-- Idempotent (IF NOT EXISTS).

-- CreateTable
CREATE TABLE IF NOT EXISTS "Enquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "source" TEXT,
    "metadata" TEXT,
    "responded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT,

    CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey (Client relation; nullable; ON DELETE NO ACTION is Prisma default)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Client')
       AND NOT EXISTS (
           SELECT 1 FROM information_schema.table_constraints
           WHERE constraint_name = 'Enquiry_clientId_fkey'
       ) THEN
        ALTER TABLE "Enquiry"
        ADD CONSTRAINT "Enquiry_clientId_fkey"
        FOREIGN KEY ("clientId") REFERENCES "Client"("id")
        ON DELETE NO ACTION ON UPDATE CASCADE;
    END IF;
END $$;
