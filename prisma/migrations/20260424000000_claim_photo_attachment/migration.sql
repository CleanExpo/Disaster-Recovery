-- DR-725 iOS App Store epic — Phase 2 PR #2.
-- Table-of-record for photos captured via the native camera bridge and
-- uploaded to Supabase Storage bucket `claim-photos`.
--
-- Data-class: CONFIDENTIAL when joined to a claim (property PII — see
-- .claude/rules/privacy.md §1). Bytes live in Storage, not this table.

CREATE TABLE IF NOT EXISTS "ClaimPhotoAttachment" (
  "id"             UUID        NOT NULL DEFAULT gen_random_uuid(),
  "claimId"        TEXT        NOT NULL,
  "objectKey"      TEXT        NOT NULL,
  "platform"       TEXT        NOT NULL,
  "capturedAt"     TIMESTAMP(3) NOT NULL,
  "geoLat"         DOUBLE PRECISION,
  "geoLng"         DOUBLE PRECISION,
  "geoAccuracyM"   DOUBLE PRECISION,
  "sizeBytes"      INTEGER     NOT NULL,
  "mimeType"       TEXT        NOT NULL,
  "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "ClaimPhotoAttachment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "ClaimPhotoAttachment_claimId_idx"
  ON "ClaimPhotoAttachment" ("claimId");

CREATE INDEX IF NOT EXISTS "ClaimPhotoAttachment_createdAt_idx"
  ON "ClaimPhotoAttachment" ("createdAt");

-- Supabase Storage bucket for claim photos.
-- Private bucket: all reads + writes must go through the service role key
-- or a signed URL minted server-side. The native bridge posts to
-- /api/native/claim-photo-upload which uploads server-side using the
-- service role client; clients never hold write credentials.
--
-- Guarded with a DO-block so the migration is idempotent even if the
-- `storage` schema does not exist (e.g. local Postgres without Supabase).
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.schemata WHERE schema_name = 'storage'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('claim-photos', 'claim-photos', false)
    ON CONFLICT (id) DO NOTHING;
  END IF;
END
$$;
