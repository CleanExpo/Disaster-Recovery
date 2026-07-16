# Brand Portfolio — Disaster Recovery group

> Canonical mapping of legal entity ↔ trading name ↔ domain ↔ Vercel
> project. Single source of truth for any agent or accountant
> conversation about which brand sits where.
>
> **NOT LEGAL ADVICE. NOT TAX ADVICE.** Structure recommendations
> belong with TKM Accountants, not in this file.

_Last updated: 2026-05-01._

## Legal entities (with ABN)

| Entity                                                      | ABN                                                | Role                                         |
| ----------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------- |
| **Unite-Group Nexus Pty Ltd**                               | 95 691 477 844 _(per codebase — confirm with TKM)_ | Flagship/holding entity                      |
| **National Restoration Professionals Group Pty Ltd** (NRPG) | 85 151 794 142                                     | Operates Disaster Recovery + NRPG network    |
| **Disaster Recovery Queensland Pty Ltd** (DRQ)              | 42 633 062 307                                     | Operates QLD-specific Disaster Recovery work |
| **The Trustee for the McGurk Family Trust**                 | _(confirm with TKM)_                               | Owns CARSI                                   |

## Operating brands — entity attribution

### Under Unite-Group Nexus Pty Ltd

| Brand               | Domain                       | Vercel project                            | Status                    |
| ------------------- | ---------------------------- | ----------------------------------------- | ------------------------- |
| **Unite-Group**     | unite-group.in               | `unite-group` (repo TBD — was CleanExpo/Unite-Hub, decommissioned 2026-06-20) | Live |
| **RestoreAssist**   | restoreassist.app            | `restoreassist` (CleanExpo/RestoreAssist) | Live                      |
| **Synthex**         | synthex.social               | `synthex` (CleanExpo/Synthex)             | Live                      |
| **Persona Foundry** | personafoundry.com           | godaddysites trial                        | Pre-launch                |
| **AutoAgi**         | autoagi.app                  | (none)                                    | Just registered           |
| **Pi-CEO**          | (uses pi-dev-ops.vercel.app) | `pi-dev-ops` (CleanExpo/Pi-Dev-Ops)       | Internal — not commercial |

### Under National Restoration Professionals Group Pty Ltd (NRPG)

| Brand                                                                      | Domain                                        | Vercel project                                    | Status                  |
| -------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------- | ----------------------- |
| **Disaster Recovery** _(primary trading name — pending ASIC registration)_ | disasterrecovery.com.au + disasterrecovery.au | `disaster-recovery` (CleanExpo/Disaster-Recovery) | Live                    |
| **NRPG / DR-NRPG Platform**                                                | (uses dr-nrpg-platform.vercel.app)            | `dr-nrpg-platform` (CleanExpo/DR-NRPG)            | Live                    |
| **Restoration Induction**                                                  | restorationinduction.com / .com.au / .tech    | (none)                                            | Pre-launch              |
| **VOT Academy**                                                            | votacademy.com.au                             | (none)                                            | Pre-launch — entity TBD |

### Under Disaster Recovery Queensland Pty Ltd

| Brand                     | Domain                                                          | Vercel project            | Status        |
| ------------------------- | --------------------------------------------------------------- | ------------------------- | ------------- |
| **Disaster Recovery Qld** | disasterrecoveryqld.au + disasterrecovery.com.au regional pages | godaddysites trial (free) | Soft-launched |

### Under The Trustee for the McGurk Family Trust

| Brand                                                    | Domain                  | Vercel project                | Status |
| -------------------------------------------------------- | ----------------------- | ----------------------------- | ------ |
| **CARSI** _(Cleaning and Restoration Science Institute)_ | carsi.com.au + carsi.au | `carsi-web` (CleanExpo/CARSI) | Live   |

### Defunct / winding down

| Brand                  | Domain                                                          | Status                                        |
| ---------------------- | --------------------------------------------------------------- | --------------------------------------------- |
| **Honor Restorations** | honorrestorations.com (GoDaddy auto-renew OFF as of 2026-05-01) | Shut down 12+ months — domain lapses Jan 2029 |

## Pending ASIC Business Name registrations (L11)

After TKM confirms the entity-to-name mapping, register:

1. **"Disaster Recovery"** under NRPG Pty Ltd (so the website's "trading as Disaster Recovery" copy is legally accurate)
2. **"RestoreAssist"** under Unite-Group Nexus Pty Ltd
3. **"Synthex"** under Unite-Group Nexus Pty Ltd
4. **"NRPG"** or **"National Restoration Professionals Group Network"** under NRPG Pty Ltd
5. **"Unite-Group"** or **"Unite Group Nexus"** under Unite-Group Nexus Pty Ltd
6. **"CARSI"** under McGurk Family Trust

ASIC fees: $44/yr or $103/3yr per business name. Tier-1 (6 names × $103) ≈ **$618 for 3-year coverage**.

## Internal tools — not registered as businesses

- **Pi-CEO** — internal management tool
- **Node-JS** — internal infrastructure

These don't need ABNs or Business Names. Treat as internal cost centres of Unite-Group Nexus Pty Ltd.

## Domain inventory snapshot (GoDaddy, 2026-05-01)

45 domains in the GoDaddy account. Operational subset above; the
remainder are SEO-bait variants (water-damage-Brisbane/Ipswich/Logan
spelling permutations) that map back to the Disaster Recovery surface
via 301 redirects. Not brands.

Also held: cleanexpo247.com / .au / .net / .info / .org — Phill's
older "CleanExpo" identity (matches the GitHub org `CleanExpo/`).
Not currently traded under but reserved.

## Cross-references

- ASIC registration loop: `docs/prd/loops/2026-05-XX-asic-business-names/` _(pending TKM)_
- Apple Developer enrolment loop: `docs/prd/loops/2026-XX-XX-ios-phase3a-apple-enrolment/` _(blocked on ASIC names)_
- Brand rename loop: `docs/prd/loops/2026-05-01-dr-rename/`
- TKM Accountants email: drafted in Gmail Drafts 2026-05-01
- Privacy notice copy (uses "trading as Disaster Recovery"): `app/claim/PrivacyCollectionNotice.tsx`
- Constants: `src/lib/constants.ts` (ABN + NAP + GBP + legal name)
