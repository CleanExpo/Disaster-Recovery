# Session Wrap — 2026-04-24

**NOT LEGAL ADVICE. Engineering record.**
**Duration:** single session, ~full day.
**Operator:** Phill McGurk + Claude (CC 1M context).

## Headline

| Stream | Result |
|---|---|
| carsi.com.au email | `phill.m@carsi.com.au` renamed, verified receiving. Mailbox LIVE. |
| iOS App Store epic (RA-1633) | Phase 1 + Phase 2 (6/6) + Phase 3b backend all shipped. Phase 3a blocked on Phill's Apple credentials. |
| Main branch health | Green: `tsc --noEmit` = 0 errors, vitest 106/106 passing. |
| PRs merged | **13 contiguous** (PR #121 → #134) |
| New tests | +37 unit tests added |
| Lines of code | ~5,000 shipped behind feature flags |
| Live-site breakage | Zero |

## Chronology

1. **Rename** — `phill@carsi.com.au` → `phill.m@carsi.com.au` via GoDaddy Email Essentials admin. Rana had set up wrong variant without `.m`.
2. **Mail flow verified** — Gmail test hit the new OWA inbox at 15:17.
3. **DNS cleared as a false lead** — DO DNS was always correct for Microsoft tenant `NETORGFT6483632`; no DNS changes made.
4. **Siteground cleared as a false lead** — hosting plan exists but 0 websites deployed, carsi email was never there.
5. **Historical email recovery inconclusive** — 1.2 GB `archive.pst` on OneDrive couldn't be auto-scanned (Outlook COM disconnected post-reprov, Python 3.13 has no PST wheels). PST file untouched, next step needs manual Outlook inspection.
6. **iOS epic** — 10 PRs across Phase 1, Phase 2 (6/6), Phase 3b backend + 3 supporting docs (strategy, prerequisites, Review 4.2 audit).
7. **Smoke test + tsc fixes** — surfaced + cleared 17 pre-existing tsc errors that were blocking `npm run build`.

## All 13 PRs in order

| PR | Title | Category |
|---|---|---|
| #121 | iOS + DO scoping docs | Plan |
| #122 | Capacitor scaffold + native bridge + ADR-010 | Phase 1 |
| #123 | `/api/native/device-token` + 6 tests | Phase 2 |
| #124 | `/offline` life-safety shell + service worker | Phase 2 |
| #125 | Geolocation auto-fill + reverse-geocode + 5 tests | Phase 2 |
| #126 | Camera upload + ClaimPhotoAttachment + 9 tests | Phase 2 |
| #127 | carsi email session handoff | Ops |
| #128 | Haptics + Apple Review 4.2 audit | Phase 2 |
| #129 | Offline claim queue + background sync + 8 tests | Phase 2 |
| #130 | Phase 3 prerequisites checklist | Plan |
| #131 | Smoke test matrix | QA |
| #132 | APNs push dispatcher + 9 tests | Phase 3b |
| #133 | tsc error sweep + partytown types | Fix |
| #134 | PST inventory result (inconclusive) | Ops |

## Open loops for Phill

### 1. Historical carsi email recovery — choose one path

**Path A — Manual Outlook PST inspection (fastest, ~15 min):**
1. Open Outlook desktop on Phill's PC.
2. Microsoft account sign-in may prompt — complete it (this fixes the "disconnected" state the automated scan hit).
3. File → Open & Export → Open Outlook Data File → select `C:\Users\Phill\OneDrive - Disaster Recovery\Documents\Outlook Files\archive.pst`.
4. In the archive folder tree, search `from:@carsi.com.au` OR `to:@carsi.com.au`.
5. If results exist: add the new `phill.m@carsi.com.au` mailbox to Outlook, then drag folders from the archive into the new mailbox. They'll sync up to M365.
6. If zero results: the archive doesn't contain carsi mail. Accept the loss.

**Path B — Install Python 3.11 + libratom (semi-automated, ~30 min):**
- `py -3.11 -m venv .venv-pst` → `.venv-pst\Scripts\pip install libratom` → run the helper script the BG agent left at `scripts/pst-inventory-v2.ps1` but with the Python pathway.

**Path C — Accept the loss and move forward:**
- Forward new carsi mail to Gmail as a shadow archive (NOT recommended — you already rejected this once for clutter + data-residency reasons).
- Just operate the fresh mailbox going forward. Historical mail from before 23/04 stays lost.

### 2. iOS Phase 3a — Apple Developer credentials

From `docs/proposals/ios-phase3-prerequisites-2026-04-24.md` — paste values back:
- Team ID (10 chars)
- Team Name + Account Holder email
- Bundle ID (confirm `au.com.disasterrecovery.app` or alternative)
- APNs `.p8` key ID + file location

Once pasted, the next session runs `npx cap add ios` on a Mac and uploads to TestFlight.

### 3. DKIM for outbound mail deliverability — optional polish

Add 2 CNAMEs in DigitalOcean (`cloud.digitalocean.com/networking/domains/carsi.com.au`):

| Type | Hostname | Value |
|---|---|---|
| CNAME | `selector1._domainkey` | `selector1-carsi-com-au._domainkey.NETORGFT6483632.onmicrosoft.com` |
| CNAME | `selector2._domainkey` | `selector2-carsi-com-au._domainkey.NETORGFT6483632.onmicrosoft.com` |

Then enable DKIM signing in Microsoft 365 Defender (`security.microsoft.com/dkimv2`) for the carsi tenant. Only matters for outbound mail not being spam-scored.

### 4. Siteground hosting plan (GoGeek, expires 18 May 2026)

Zero websites deployed. Let it auto-expire to save the renewal fee, or cancel now. Domains (2) on Siteground are separate products — leave those.

### 5. Unused M365 subscription on `phill@disasterrecovery.com.au` GoDaddy

Customer #123895016 has 1 unused M365 sub. Either cancel for cost save, or keep as overflow for DR network.

### 6. Schema debt (PR #133 flagged this)

`src/lib/validation/schemas.ts` has a nested `claimSubmitSchema` that doesn't match the flat shape `/api/claims/submit` uses. Route restores its own local schema to compile. Reconcile as a separate PR: pick one shape, update both schema + route.

## What's NOT in this wrap

- Phase 3 Xcode archive + TestFlight submission (blocks on §2)
- App Store screenshots (need the app running first)
- App Store listing copy (AU English pass, need Phill's sign-off on tone)
- Production APNs `.p8` Vercel env var configuration (dispatcher #132 exits 503 until these exist)
- Ongoing PST recovery (depends on §1)

## Compliance notes (NOT LEGAL ADVICE)

- Feature flag: everything iOS-related is gated behind `NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED`. Default unset = no footprint on the current web deploy.
- APP 3/5/6/8: the camera upload, geolocation, and push dispatcher all include the consent + data-class rules from `.claude/rules/privacy.md`.
- Apple Review Guideline 4.2: audit doc is in `docs/proposals/apple-review-guideline-4.2-audit-2026-04-24.md`. Review Notes copy is ready for the Xcode submission form.
- iOS 17 Privacy Manifest: planned; populates when `ios/App/App/` exists after `npx cap add ios`.

## Final state

- `main` green, `tsc --noEmit` = 0 errors
- All Phase 2 feature flags OFF by default — zero live-site impact
- `phill.m@carsi.com.au` LIVE, receiving mail, no forwarding (clean state)
- Linear RA-1633 epic updated to Phase 2 = 83%; should be bumped to 100% once PR #132 is counted
- PST archive untouched, awaiting manual inspection
