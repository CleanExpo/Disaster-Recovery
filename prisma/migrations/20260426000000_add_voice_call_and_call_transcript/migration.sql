-- Audit B13 scaffold — VoiceCall + CallTranscript persistence.
-- See .context/domain-models.md (Known drift → "VoiceCall has no persistent
-- model"). Web-widget surface (PR #205) currently leaves no DR-side trail
-- beyond the compliance_events consent receipt; this migration creates the
-- target tables for the DR-714 retention cron.
--
-- Additive only. Zero impact when VOICE_AGENT_ENABLED=false. The webhook
-- extractor that actually writes rows lives in a separate PR; this migration
-- only stands the tables up.
--
-- Data class: CONFIDENTIAL (per .claude/rules/privacy.md §1). Insert path
-- MUST run the DR-714 redactor before persisting transcript text.

-- VoiceCall — persistent record of an ElevenLabs convai conversation.
CREATE TABLE IF NOT EXISTS "VoiceCall" (
  "id"                       TEXT         NOT NULL,
  "agentId"                  TEXT         NOT NULL,
  "agentRole"                TEXT         NOT NULL,
  "conversationId"           TEXT         NOT NULL,
  "channel"                  TEXT         NOT NULL,
  "surface"                  TEXT         NOT NULL DEFAULT 'web_widget',
  "consentGivenAt"           TIMESTAMP(3),
  "consentVersion"           TEXT,
  "consentMethod"            TEXT,
  "startedAt"                TIMESTAMP(3) NOT NULL,
  "endedAt"                  TIMESTAMP(3),
  "durationSeconds"          INTEGER,
  "outcome"                  TEXT,
  "redactedSummary"          TEXT,
  "correlationClaimId"       TEXT,
  "correlationApplicantId"   TEXT,
  "metadata"                 JSONB,
  "createdAt"                TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"                TIMESTAMP(3) NOT NULL,

  CONSTRAINT "VoiceCall_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "VoiceCall_conversationId_key"
  ON "VoiceCall" ("conversationId");

CREATE INDEX IF NOT EXISTS "VoiceCall_agentId_startedAt_idx"
  ON "VoiceCall" ("agentId", "startedAt");

CREATE INDEX IF NOT EXISTS "VoiceCall_conversationId_idx"
  ON "VoiceCall" ("conversationId");

CREATE INDEX IF NOT EXISTS "VoiceCall_correlationClaimId_idx"
  ON "VoiceCall" ("correlationClaimId");

-- CallTranscript — redacted transcript text for a VoiceCall.
CREATE TABLE IF NOT EXISTS "CallTranscript" (
  "id"                  TEXT         NOT NULL,
  "voiceCallId"         TEXT         NOT NULL,
  "redactedText"        TEXT         NOT NULL,
  "language"            TEXT,
  "wordCount"           INTEGER,
  "redactionApplied"    BOOLEAN      NOT NULL DEFAULT true,
  "retentionExpiresAt"  TIMESTAMP(3) NOT NULL,
  "createdAt"           TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "CallTranscript_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "CallTranscript_voiceCallId_idx"
  ON "CallTranscript" ("voiceCallId");

CREATE INDEX IF NOT EXISTS "CallTranscript_retentionExpiresAt_idx"
  ON "CallTranscript" ("retentionExpiresAt");

-- FK from CallTranscript.voiceCallId → VoiceCall.id (cascade on parent delete
-- so retention sweeps that drop a VoiceCall also clear its transcripts).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'CallTranscript_voiceCallId_fkey'
      AND table_name = 'CallTranscript'
  ) THEN
    ALTER TABLE "CallTranscript"
      ADD CONSTRAINT "CallTranscript_voiceCallId_fkey"
      FOREIGN KEY ("voiceCallId") REFERENCES "VoiceCall"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

COMMENT ON TABLE "VoiceCall" IS
  'Persistent record of ElevenLabs convai conversations. Audit B13 scaffold; webhook extractor wiring in follow-up PR. Flag-gated via VOICE_AGENT_ENABLED.';

COMMENT ON TABLE "CallTranscript" IS
  'Post-redaction transcript text. DR-714 redactor MUST run before insert. retentionExpiresAt drives the DR-714 retention cron.';
