# Digital Ocean Recon — What's Running, What's Broken?

**Status:** BLOCKED — need Phill to share DO panel access or answer
recon questions below.
**Date:** 2026-04-24.
**NOT LEGAL ADVICE.**

## Context

Current DR production stack (tracked in CLAUDE.md):

- **Web app:** Vercel (`disasterrecovery.com.au`).
- **Database:** Supabase (DR-NRPG project, Pro tier, Singapore).
- **Voice:** Twilio + ElevenLabs.
- **Payments:** Stripe (flag-gated).
- **Observability:** Vercel OTel + Analytics + Speed Insights.

**No DigitalOcean resources are referenced** in:

- `Disaster-Recovery/` (main repo, Vercel-deployed)
- `NRPG-Onboarding-Framework/` (markdown-only)
- `DR-Sandbox-starter/` (research scratchpad)

## Where DO content DOES exist

Local-only archive clone `Disaster Recovery - NRPG/` (same GitHub repo,
older checkout) contains archived scripts:

- `setup-digitalocean.sh`
- `k8s/deployment.yaml` (DOKS — DO Kubernetes Service)
- `docs/archive/features/VERCEL_DIGITALOCEAN_DEPLOYMENT.md`
- `docs/archive/phases/PHASE23_DEPLOYMENT_README.md`
- `.github/workflows/deploy-phase23.yml`

All under `docs/archive/` — abandoned in favour of Vercel. Not active on
the main branch.

## Possible live DO footprints (need Phill confirmation)

1. **A droplet running something else entirely** — CARSI? RestoreAssist?
   Pi-CEO backend? RA-1373 mentions Railway for Pi-CEO session runner, not
   DO.
2. **DO App Platform deployment** — was there ever a production DO App
   Platform config for NRPG-Onboarding before the Next.js rebuild?
3. **DO Spaces (S3-compatible)** — used as CDN for old
   VERCEL_DIGITALOCEAN_DEPLOYMENT.md pipeline?
4. **DO Managed Postgres** — abandoned before Supabase cutover?
5. **Billing alerts** — subscription running on a dead droplet burning
   money? (This is the most likely "issue".)

## Recon questions for Phill

1. Which DO account is this? (Email associated with DO login.)
2. What's the symptom? Billing alert, deployment failure, 500 errors,
   something else?
3. Any DO panel URL / dashboard screenshot you can share?
4. Are there DO API tokens I should be aware of / rotate?
5. Is this about keeping something running, or tearing it down (cost cut,
   like the Supabase Fresh deletion earlier tonight)?

## Safe default if unclear

If the intent is "tear down anything running" (consistent with the
cost-cleanup pass on Supabase Fresh), the fastest answer is:

1. Log into DO dashboard.
2. Destroy all droplets, k8s clusters, App Platform apps, managed DBs,
   Spaces that aren't referenced in active CLAUDE.md.
3. Revoke API tokens.
4. Cancel the subscription if no resources remain.

This is a DESTRUCTIVE action that needs explicit authorisation per the
auto-mode safety rules. Will not proceed without Phill's go-ahead AND a
verification of what each resource is before destroying it.

## Next action

Waiting on Phill's answer to recon questions above.

---

_Related: ROTATION-VERIFIED-2026-04-24.md (same pattern — verified inert
before acting)._
