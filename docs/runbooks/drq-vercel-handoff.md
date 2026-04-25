# Runbook — Disaster Recovery Queensland Vercel handoff plan

> **Disaster Recovery Queensland Pty Ltd** (DRQ, ABN 42 633 062 307)
> currently has a free GoDaddy-sites trial at `disasterrecoveryqld.au`.
> Long-term it should sit on Vercel with proper engineering parity.
>
> **NOT LEGAL ADVICE / NOT FINANCIAL ADVICE.** This is an engineering plan.

_Drafted: 2026-05-01._

## Current state

- **Domain:** `disasterrecoveryqld.au` (owned, GoDaddy auto-renew ON, expires Sep 1 2027).
- **Hosting:** GoDaddy Sites coming-soon trial. Banner on the dashboard says "Your trial ended. Upgrade for premium features." → likely to lapse if not migrated.
- **Vercel:** no project yet.
- **Codebase:** none — DRQ doesn't have a separate repo. Currently piggy-backs the main Disaster Recovery codebase via QLD-specific location pages (`app/locations/qld/page.tsx`).
- **Legal status:** real Pty Ltd with its own ABN. TKM Accountants are handling annual secretarial.

## Three options for engineering parity

### Option A — Keep DRQ as a sub-brand of Disaster Recovery (cheapest)

- Treat DRQ as a regional vertical inside the main `Disaster-Recovery` repo.
- Add `disasterrecoveryqld.au` as an additional domain on the existing Vercel project.
- Use middleware to detect host header → render QLD-specific landing pages.
- Brand uses "Disaster Recovery Queensland" but legal entity remains DRQ Pty Ltd (separate billing, separate ABN).

**Pros:** zero new infrastructure. Single deploy. Shared SEO authority.
**Cons:** liability isolation is weak — both brands hit the same Vercel project, same Supabase DB. If DRQ has a separate financial obligation that needs to be ring-fenced, this doesn't do it.

### Option B — DRQ as a separate Vercel project on the same codebase (medium)

- Same monorepo / branch.
- Vercel `disaster-recovery` project deploys main domain.
- New Vercel project `disaster-recovery-qld` deploys the same code under QLD-only routing rules (env-driven gating).
- DRQ's Vercel billing line is separate.

**Pros:** clean separation of deploys + billing. DB still shared. Cheaper than full fork.
**Cons:** the codebase still mixes the two; a bug in shared code affects both.

### Option C — Full fork, separate repo, separate DB (most expensive, most isolated)

- New Git repo `Disaster-Recovery-QLD/`.
- Initial fork of the current Disaster-Recovery main, then diverges.
- Separate Vercel project, separate Supabase project, separate Stripe account, separate everything.
- Worst case for SEO (no shared backlink authority) and engineering (twice the maintenance).

**Pros:** maximum liability + data isolation. DRQ can be sold or wound up independently.
**Cons:** ~2x engineering cost ongoing. SEO setback. Probably overkill for a QLD-only vertical of the parent brand.

## Recommendation

**Option B** — separate Vercel project + shared codebase.

Reasoning: TKM Accountants will likely want each Pty Ltd to have its own line-item billing for clean BAS reporting, but the engineering cost of maintaining two codebases for what's essentially a regional landing-page set is hard to justify. Option B gets the financial separation cleanly.

If TKM advises a full corporate restructure (each brand → its own Pty Ltd with full liability ring-fencing), revisit and probably go to **Option C**.

## Execution plan (Option B — when ready)

1. **Verify DRQ entity status** with TKM (entity active, BAS up to date, no ASIC s33 notices outstanding).
2. **Vercel project setup:**
   - Add new project `disaster-recovery-qld` from same `CleanExpo/Disaster-Recovery` repo.
   - Set `NEXT_PUBLIC_BRAND_VARIANT=qld` in this project's env.
   - Add `disasterrecoveryqld.au` as the production domain.
   - DNS at GoDaddy → CNAME `disasterrecoveryqld.au` → `cname.vercel-dns.com`.
3. **Codebase changes:**
   - `next.config.js` — branch on `process.env.NEXT_PUBLIC_BRAND_VARIANT`. QLD variant rewrites root path to `app/locations/qld/page.tsx`.
   - Footer component — show DRQ ABN when variant=qld.
   - Privacy notice — show DRQ entity when variant=qld.
4. **Decommission GoDaddy Sites trial** — once Vercel is live and verified.
5. **SEO transition:**
   - Submit DRQ sitemap to GSC.
   - Add structured data with DRQ entity name + ABN.
   - 301 redirects from any old GoDaddy-sites URLs to new Vercel paths.

## Cost impact

- Vercel: extra ~$0-20/month depending on traffic (Pro tier already covers multiple projects under Unite-Group org).
- DNS: zero (existing GoDaddy registration).
- Engineering: ~1 day initial setup, then negligible ongoing.

## Open questions for TKM (already raised in the restructure email)

- Should DRQ remain a separate Pty Ltd, or be wound up and merged into NRPG?
- If kept separate, what's the right business name registration for "Disaster Recovery Queensland" trading name?
- Does DRQ need its own GST registration? (depends on annual turnover threshold).

## Status

- [ ] TKM confirms DRQ entity remains active
- [ ] Vercel project created
- [ ] DNS cutover
- [ ] GoDaddy Sites trial decommissioned
- [ ] Footer + privacy variant rendering verified
- [ ] GSC sitemap submitted

Defer execution until L11 (ASIC) and TKM advice on entity structure land.
