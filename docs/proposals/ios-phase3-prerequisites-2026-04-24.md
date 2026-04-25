# iOS Phase 3 — Prerequisites Checklist

**Status:** BLOCKED on Phill-supplied Apple Developer data.
**Date:** 2026-04-24.
**Owner:** Phill McGurk.
**Epic:** RA-1633.
**NOT LEGAL ADVICE.**

## Context

Phase 2 is complete — all native features (push, camera, geolocation, offline shell, haptics, background sync, and the Apple Review 4.2 audit doc) have shipped to main behind the `NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED` feature flag.

Phase 3 ships the actual iOS app to TestFlight → App Review → App Store. Every Phase 3 step lives on a macOS machine and inside Apple's services. Nothing more can happen in this repo until the credentials below exist.

## The three things Phill has to supply

### 1. Apple Developer Program — team info

Log into `https://developer.apple.com/account` with the Apple ID on the enrolment. Capture:

| Field | Where to find it | Paste here |
|---|---|---|
| **Team ID** (10 chars, uppercase alphanumeric) | Membership → Team ID | `__________` |
| **Team Name** | Membership → Entity Name | `__________` |
| **Account Holder email** | Membership → People section | `__________` |
| **Program expiry date** | Membership → Expiration Date | `__________` |

### 2. App Store Connect — bundle ID reservation

Log into `https://appstoreconnect.apple.com`. Two paths:

- **Option A (preferred):** Phill registers Bundle ID `au.com.disasterrecovery.app` under Certificates, Identifiers & Profiles → Identifiers → App IDs → `+` → App → Explicit → `au.com.disasterrecovery.app` → Capabilities (tick Push Notifications, Associated Domains, Background Modes).
- **Option B:** If `au.com.disasterrecovery.app` is already taken by another of Phill's apps, use `au.com.disasterrecovery.ios` instead. Document the change here and in `capacitor.config.ts`.

| Field | Paste here |
|---|---|
| Registered Bundle ID | `au.com.disasterrecovery.app` (assumed) |
| Push Notifications capability enabled | `Yes / No` |
| App record created in App Store Connect | `Yes / No` |
| App Name reserved | `Disaster Recovery` |

### 3. APNs authentication key (push notifications backend)

One-time: generate a `.p8` key in `https://developer.apple.com/account/resources/authkeys/list`. Certificates, Identifiers & Profiles → Keys → `+` → Name: `DR iOS APNs Production` → tick `Apple Push Notifications service (APNs)` → Continue → Register → **Download the `.p8` file immediately (can only be downloaded once)**.

Store:

| Field | Paste here |
|---|---|
| Key ID (10 chars) | `__________` |
| Team ID (same as §1) | `__________` |
| `.p8` file location (NOT in repo) | e.g. `C:\Users\Phill\Secrets\AuthKey_XXXXX.p8` |

Eventually this `.p8`, Key ID, and Team ID go into **Vercel env vars** (`APNS_KEY_ID`, `APNS_TEAM_ID`, `APNS_P8_BASE64`) so the server can sign push requests. Do NOT commit the `.p8` file. The backend sender code is not built yet (Phase 3b).

### 4. D-U-N-S Number (if Apple Developer was enrolled as a company)

If NRPG enrolled as an **Organization** (not Individual), the D-U-N-S was already confirmed. Paste here for record:

| Field | Paste here |
|---|---|
| D-U-N-S Number | `__________` |
| Registered entity name (must match auDA + ABN) | National Restoration Professionals Group Pty Ltd |

If NRPG is enrolled as an **Individual** under Phill's personal Apple ID, skip this section and note the enrolment type.

## When the credentials land — what happens next

The moment Phill pastes §1–§3 values (or drops the `.p8` into a safe location), an engineering pass executes:

1. Machine with macOS access (Phill's Mac, or a macOS CI runner on GitHub Actions) runs:
   ```
   npx cap add ios
   npx cap sync ios
   ```
   This generates `ios/App/App.xcworkspace` from the existing `capacitor.config.ts`.
2. Xcode opens the workspace, sets:
   - Signing → Team: `<Team ID>`
   - Bundle Identifier: `au.com.disasterrecovery.app` (or whatever §2 resolved)
   - Capabilities: Push Notifications, Background Modes (Remote notifications, Background fetch), Associated Domains if used.
3. `capacitor.config.ts` is updated with the Team ID in the `ios` section.
4. `PrivacyInfo.xcprivacy` manifest (per PR #128 audit doc) is populated and committed under `ios/App/App/`.
5. `Info.plist` usage strings added:
   - `NSCameraUsageDescription` — "Used to capture damage photos for your claim."
   - `NSLocationWhenInUseUsageDescription` — "Used to auto-fill the property address on your claim form."
   - `NSPhotoLibraryAddUsageDescription` — "Save damage photos to your camera roll after upload."
6. Icons generated from a 1024x1024 master via `@capacitor/assets`.
7. Splash screen generated same way.
8. First Xcode archive (`Product → Archive`) → upload to App Store Connect.
9. TestFlight internal testing group created (Phill + 2-3 contractors).
10. Build submitted for App Review with the Review Notes verbatim from `docs/proposals/apple-review-guideline-4.2-audit-2026-04-24.md`.

Time estimate for steps 1-10 once credentials are in hand: **4-6 hours on a single macOS machine**.

## Backend work that can start now (Phase 3b — no Apple credentials needed)

One concrete parallelisable piece:

- **APNs push sender on the backend** — a Vercel serverless route `POST /api/native/push-dispatch` that signs a JWT against the `.p8` + Team ID + Key ID and POSTs to `api.push.apple.com`. The key ID and team ID are env vars; code is server-side only.
- Used by the `claim.status` update flow to notify subscribed devices.
- Guarded by `NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED` on the token-registration side; the sender route itself is internal.

This can be built NOW — the credentials only matter at runtime.

## Risks + unknowns

- **App Review Guideline 4.2 reject.** Mitigated by having push / camera / geolocation / offline / haptics shipping. Notes doc ready. Rejection probability ~10-20% on first submission; ~5% on second after response.
- **Bundle ID collision.** If `au.com.disasterrecovery.app` is taken, Phase 3 work is blocked until a new bundle ID is chosen.
- **Apple Developer Program expiry.** $149/yr AUD. If lapsed, Phase 3 blocks.
- **CSP + WKWebView.** `next.config.mjs` currently has `'unsafe-inline'` + `'unsafe-eval'` in script-src. WKWebView is same-origin so fine, but the `capacitor://` scheme may need allowlisting when the iOS app loads. Deferred until we see behaviour in a TestFlight build.
- **iOS 17 Privacy Manifest** — mandatory; covered in PR #128 doc. Will need completion and commit under `ios/App/App/PrivacyInfo.xcprivacy` as part of Phase 3 step 4.

## References

- PR #122 — Capacitor scaffold.
- PR #128 — Apple Review Guideline 4.2 audit + Privacy Manifest plan.
- `docs/adr/ADR-010-ios-native-bridge.md` — decision record.
- `docs/proposals/ios-app-store-strategy.md` — full roadmap.
- `capacitor.config.ts` — needs Team ID at Phase 3 step 3.

## Phill's next action (5-10 minutes)

Open a password manager entry or a secure notes doc titled "Apple Developer — DR iOS credentials" and paste the values from §1–§4 into it. Share the fields (not the `.p8` file) back to this session and Phase 3a can start.
