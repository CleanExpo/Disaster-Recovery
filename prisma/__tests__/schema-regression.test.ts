/**
 * Regression-guard tests for prisma/schema.prisma.
 *
 * These tests exist to prevent specific, known-bad configurations from
 * silently re-entering the schema. Each assertion is paired with the
 * incident that motivated it.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SCHEMA_PATH = resolve(__dirname, '..', 'schema.prisma');
const SCHEMA = readFileSync(SCHEMA_PATH, 'utf8');

describe('prisma/schema.prisma — regression guards', () => {
  describe('binaryTargets — DR-incident 2026-04-29 (PR #306)', () => {
    /**
     * Vercel Lambda runs on Amazon Linux. Without `rhel-openssl-3.0.x` in
     * `binaryTargets`, the bundled Prisma client only ships the debian
     * binary, and EVERY runtime query throws:
     *
     *   "Prisma Client could not locate the Query Engine for runtime
     *    'rhel-openssl-3.0.x'."
     *
     * Effect: silent prod data loss (claim submission falls back to
     * `local-` IDs, WebhookDelivery never populates, etc.). Discovered
     * 2026-04-29 via Vercel runtime logs, fixed in PR #306.
     *
     * If a future schema edit removes this target, this test fails LOUD
     * before deploy.
     */
    it('declares rhel-openssl-3.0.x for Vercel Lambda', () => {
      expect(SCHEMA).toMatch(/binaryTargets\s*=\s*\[[^\]]*"rhel-openssl-3\.0\.x"/);
    });

    it('also declares "native" so local development still works', () => {
      expect(SCHEMA).toMatch(/binaryTargets\s*=\s*\[[^\]]*"native"/);
    });
  });

  describe('generator client — single source-of-truth', () => {
    /**
     * If the schema declares more than one `generator client` block,
     * Prisma will silently use the last one and earlier configuration
     * (including `binaryTargets`) is dropped on the floor. Equivalent
     * silent-failure to the binary-target incident.
     */
    it('has exactly one generator client block', () => {
      const matches = SCHEMA.match(/generator\s+client\s*\{/g);
      expect(matches?.length).toBe(1);
    });
  });

  describe('datasource — env-driven, never inlined', () => {
    /**
     * The DATABASE_URL must come from `env(...)`, never a literal. A
     * leaked connection string in the schema would expose Supabase
     * credentials in every commit.
     */
    it('uses env() for url', () => {
      expect(SCHEMA).toMatch(/url\s*=\s*env\("DATABASE_URL"\)/);
    });

    it('uses env() for directUrl', () => {
      expect(SCHEMA).toMatch(/directUrl\s*=\s*env\("DIRECT_URL"\)/);
    });

    it('does NOT contain a literal Supabase pooler hostname', () => {
      expect(SCHEMA).not.toMatch(/pooler\.supabase\.com/);
    });
  });

  describe('InsuranceClaimAU.status — ADR-pending alignment', () => {
    /**
     * Prod has an existing `InsuranceClaimStatus` enum (insurer-stage
     * lifecycle: DRAFT, SUBMITTED, UNDER_REVIEW, APPROVED, etc.) that the
     * schema must reflect. The B9 lifecycle redesign (`ClaimStatus` enum)
     * is scaffolding only until the domain decision lands.
     *
     * If an edit replaces the field type with `String` or with the
     * scaffold `ClaimStatus`, this test fails — the prod DB column is
     * a Postgres enum named `InsuranceClaimStatus` and a type mismatch
     * causes Prisma client generation to ship a wrong-shaped type.
     */
    it('uses InsuranceClaimStatus as the field type', () => {
      // Match the field declaration. Tolerate whitespace + comments above.
      const claimAuMatch = SCHEMA.match(/model\s+InsuranceClaimAU\s*\{[\s\S]*?status\s+(\w+)/);
      expect(claimAuMatch).not.toBeNull();
      expect(claimAuMatch?.[1]).toBe('InsuranceClaimStatus');
    });

    it('has the InsuranceClaimStatus enum declared with prod values', () => {
      const enumMatch = SCHEMA.match(/enum\s+InsuranceClaimStatus\s*\{([\s\S]*?)\}/);
      expect(enumMatch).not.toBeNull();
      const body = enumMatch?.[1] ?? '';
      // The 8 prod enum values (verified via Supabase introspection 2026-04-29).
      for (const value of [
        'DRAFT',
        'SUBMITTED',
        'UNDER_REVIEW',
        'APPROVED',
        'PARTIALLY_APPROVED',
        'DENIED',
        'PAYMENT_PROCESSED',
        'CLOSED',
      ]) {
        expect(body).toContain(value);
      }
    });
  });

  describe('WebhookDelivery — A8 idempotency table', () => {
    /**
     * `WebhookDelivery` is the A8 Stripe webhook idempotency ledger.
     * Schema must keep `eventId` `@unique` (otherwise the insert-first
     * dedupe pattern in `app/api/stripe/webhook/route.ts` falls apart).
     */
    it('declares eventId as unique', () => {
      const modelMatch = SCHEMA.match(/model\s+WebhookDelivery\s*\{([\s\S]*?)\}/);
      expect(modelMatch).not.toBeNull();
      const body = modelMatch?.[1] ?? '';
      expect(body).toMatch(/eventId\s+String\s+@unique/);
    });
  });
});
