# Apple App Review Guideline 4.2 — Minimum Functionality Audit

**Date:** 24/04/2026
**Epic:** RA-1633 (iOS App Store)
**Phase / PR:** Phase 2 PR #6 (haptics + 4.2 audit)
**Owner:** Phill McGurk
**Status:** DRAFT — pre-submission audit. Nothing here is submitted yet.
**NOT LEGAL ADVICE.**

---

## 1. Why this audit exists

Guideline 4.2 ("Minimum Functionality") is the most common rejection
reason for Capacitor / webview wrappers. Apple rejects apps that are
"websites bundled as an app" with nothing a mobile browser can't
already do. This audit maps each native capability we ship to an
explicit 4.2 justification, so a reviewer (and our submission notes)
can see why the DR app is more than a repackaged website.

### Guideline 4.2 — paraphrased summary

- Your app should include features, content, and UI that elevate it
  beyond a repackaged website. If your app is not particularly useful,
  unique, or "app-like", it doesn't belong on the App Store.
- Apps that are primarily marketing materials, web-clip shortcuts, or
  content aggregators with no native value are rejected.
- Sub-section 4.2.2 (obsolete APIs): the app must use current Apple
  APIs and not rely on deprecated or undocumented functionality.
- Sub-section 4.2.3 (minimum native): apps must not be written purely
  in a web language rendered in a webview without meaningful native
  integration.

Authoritative text: the App Review Guidelines at
https://developer.apple.com/app-store/review/guidelines/#minimum-functionality
(always check the live version immediately before submission — Apple
updates these with short notice).

---

## 2. Feature → 4.2 justification map

| DR native feature | What it does | 4.2 justification | Flag / status |
| --- | --- | --- | --- |
| Push notifications (APNs) | Claim status updates delivered to lock screen; contractor ETA pushes; follow-up prompts. | Webviews cannot receive APNs lock-screen notifications. Delivers genuine native utility (lock-screen surface, badge updates). | `NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED` — Phase 2 PR #1. Wired in `src/lib/native-bridge.ts:registerPushNotifications`. Backend token store pending. |
| Camera (damage photo capture + upload) | Native camera capture → direct upload to `/api/native/claim-photo-upload` with bundle-ID spoof guard. | Native camera roll integration + background upload resume; superior to mobile web `<input capture>`. Life-critical in loss events where users are in-field. | Phase 2 PR #2. `capturePhoto()` in native-bridge. |
| Geolocation (address auto-fill) | Single high-accuracy fix on user tap → reverse-geocode → pre-fills `/claim` property address. | High-accuracy CoreLocation fix, on-demand, not available to Safari without user permission ceremony. Reduces claim-intake friction in distressed contexts. | Phase 2 PR #3. `getCurrentPosition()` in native-bridge + `UseCurrentLocationButton`. |
| Offline shell (life-safety) | `/offline` route precached by service worker; surfaces 000 + 1300 309 361 call buttons with zero network. | True offline availability of life-safety affordances — a webview without an app cannot guarantee this. Aligns with the DR-542 life-safety carve-out. | Phase 2 PR #4. `app/offline/page.tsx`. |
| Haptic feedback (native tactile distinction) | Light tap on CTAs, Medium tap on success outcomes, Heavy tap on life-safety (Dial 000). | CoreHaptics integration; web browsers on iOS cannot emit `ImpactStyle.Heavy`. Provides non-visual feedback for users acting under duress. | Phase 2 PR #6 (this PR). `tap()`, `mediumTap()`, `heavyTap()` in native-bridge. |
| Background sync (offline queue replay) | Claims submitted while offline are queued locally and replayed on reconnect; audit event on sync completion. | Background URLSession semantics; a Safari tab cannot replay a POST after the page is closed. | Phase 2 PR #5. Offline queue in `src/lib/offline-queue.ts` (owned by a concurrent agent). |

---

## 3. Copy for the Apple Review Notes field (≤500 words)

> Disaster Recovery Australia is the consumer-facing app of National
> Restoration Professionals Group Pty Ltd (NRPG), an Australian
> network that connects people whose homes or businesses have been
> damaged (water, fire, flood, storm, mould, biohazard, trauma) with
> IICRC-certified restoration contractors. This submission is built
> on Capacitor. We would like to call out the native capabilities
> that place the app well beyond a webview wrapper:
>
> 1. Push notifications over APNs deliver claim-status updates and
>    contractor ETA to the user's lock screen. The wrapper-equivalent
>    experience (mobile Safari) cannot deliver APNs.
> 2. The native camera captures damage photos in-field and uploads
>    them to our backend with a bundle-ID spoof guard; this is how
>    contractors triage a job before arriving on site.
> 3. CoreLocation supplies a single high-accuracy fix when the user
>    taps "Use my current location" on the claim-intake form. We do
>    NOT request background location. The fix is used once to
>    pre-fill the property address, then discarded.
> 4. An offline "life-safety" shell is precached at install. If a
>    user loses network (common during flood or storm events), the
>    app still surfaces the 000 emergency button and our 24/7 intake
>    line (1300 309 361). We consider this the most important native
>    behaviour in the app and the reason a website alone is not
>    enough.
> 5. Core Haptics fires a tactile signal on primary actions — light
>    on CTA press, medium on submit success, heavy on the 000 button
>    — so a user under duress gets non-visual confirmation that an
>    action has registered.
> 6. Background sync replays claim submissions made offline once
>    connectivity returns; an audit event is written to our
>    `compliance_events` ledger on replay.
>
> Privacy posture:
>
> - We do NOT track users across apps or websites (App Tracking
>   Transparency: "Data Not Collected for Tracking"). No ATT prompt
>   is required; we do not call `requestTrackingAuthorization`.
> - Personal information is collected under the Australian Privacy
>   Act 1988 (Cth) and the Australian Privacy Principles. A
>   collection notice renders at app first launch (not only at form
>   submit).
> - Push payloads contain no raw PII. Example template: "Update on
>   your claim #ABC123 — tap to view".
> - Location is collected on user tap only, never on launch.
>
> Demo credentials (TestFlight only): `demo` / `Demo123!` against the
> contractor portal login at `/contractor/login`. A reviewer can
> trigger the native-feature demo from the app's home screen without
> creating a claim.
>
> Contact for review questions: Phill McGurk — phill@disasterrecovery.com.au.

(Word count: approx. 420. Trim when submitting if Apple's character
counter disagrees.)

---

## 4. Screenshots required (asset list — NOT produced in this PR)

This PR does not create screenshots; it lists what the assets team
must produce before submission.

Apple currently requires:

- iPhone 6.9" (e.g. iPhone 16 Pro Max) — at least 3, up to 10 images.
- iPhone 6.5" / 6.7" (e.g. iPhone 14 Pro Max) — at least 3, up to 10.
- iPhone 5.5" (legacy, optional for new apps).
- iPad 13" (e.g. iPad Pro M4) — required if the app supports iPad.

Required shots (suggested set):

1. Home / claim-intake hero (showing native-app chrome, not Safari).
2. `/claim` form with "Use my current location" demonstrated.
3. Native camera capture (damage photo) mid-flow.
4. Claim submit success screen with the claim ID.
5. Offline shell showing the 000 + 1300 309 361 buttons.
6. Push notification preview on lock screen (mock-up acceptable per
   Apple; clearly identified).
7. Contractor portal login screen (for reviewer demo credentials).
8. App preview video (optional, 15–30s): claim-intake end-to-end.

Format: PNG or JPEG, sRGB, no transparency, no status-bar mock issues.
**Status: pending — owned by design assets workstream.**

---

## 5. Privacy manifest (iOS 17 `PrivacyInfo.xcprivacy`)

File location: `ios/App/App/PrivacyInfo.xcprivacy`. Not yet committed
(pending `npx cap add ios` scaffold in Phase 1 PR). When created, it
must declare:

### `NSPrivacyAccessedAPITypes`

| API category | Reason code (Apple) | Our reason string |
| --- | --- | --- |
| File timestamp APIs | `C617.1` (inside app container) | Offline draft claims store modified timestamps locally. |
| System boot time | `35F9.1` (measuring time elapsed within the app) | Claim-intake analytics: time from form open to submit. |
| Disk space | `E174.1` (displaying disk space to user) | Offline photo-capture pre-check — warn the user before they shoot 50 photos and hit a full disk. |
| User defaults | `CA92.1` (read/write own app defaults) | Feature flag + consent state persistence. |

### Third-party SDK manifests

Capacitor plugins ship their own `PrivacyInfo.xcprivacy`. Confirm at
submission time that each plugin version bundled includes one:

- `@capacitor/push-notifications` — pending verification.
- `@capacitor/camera` — pending verification.
- `@capacitor/geolocation` — pending verification.
- `@capacitor/haptics` — pending verification (no obvious privacy API
  usage; still list).
- `@capacitor/network` — pending verification.
- `@capacitor/app` — pending verification.

**Status: all "pending" items must be verified before first submission.**

### Tracking declaration

`NSPrivacyTracking = false`. We do not track users across apps or
websites. No `NSPrivacyTrackingDomains` entries.

---

## 6. Data safety / ATT nutrition label summary

For App Store Connect → App Privacy → Data Types:

| Data type | Collected? | Linked to user? | Used for tracking? | Purpose |
| --- | --- | --- | --- | --- |
| Contact info (name, email, phone) | Yes | Yes | No | App functionality (claim intake). |
| Physical address | Yes | Yes | No | App functionality (dispatch). |
| Precise location | Yes (on tap) | No (one-shot, discarded post-geocode) | No | App functionality. |
| Photos | Yes (damage photos) | Yes | No | App functionality. |
| Device ID | Yes (APNs token) | Yes | No | App functionality (push). |
| Crash data | TBD (Sentry/Crashlytics) | No | No | App functionality. |
| Usage data | No | — | — | — |
| Diagnostics | TBD | No | No | App functionality. |
| Identifiers (IDFA) | No | — | — | — |

ATT banner: NOT shown (we do not track). No
`requestTrackingAuthorization` call in the app.

---

## 7. Pre-submission checklist

Discipline: nothing here gets a tick until it is actually verified.

- [ ] Apple Developer Program enrolment active (NRPG, ABN verified).
- [ ] D-U-N-S number confirmed.
- [ ] App Store Connect app record created.
- [ ] Bundle ID registered (`au.com.disasterrecovery.app`).
- [ ] APNs `.p8` key generated + stored in Vercel env.
- [ ] Icons (1024×1024 master + derivatives via `capacitor-assets`).
- [ ] Splash screens generated.
- [ ] `PrivacyInfo.xcprivacy` created + reason strings populated.
- [ ] Each bundled Capacitor plugin's privacy manifest verified.
- [ ] App Tracking Transparency: confirmed NOT required.
- [ ] Push-notification copy verified to contain no raw PII.
- [ ] Offline shell verified to render with airplane mode on a
      physical device.
- [ ] Haptic behaviour verified on a physical iPhone (simulator does
      not fire haptics).
- [ ] Camera permission string in `Info.plist` (`NSCameraUsageDescription`).
- [ ] Location permission string in `Info.plist`
      (`NSLocationWhenInUseUsageDescription` only — we do NOT request
      `Always`).
- [ ] Push-notification permission string handled by APNs plugin.
- [ ] Screenshots produced at every required size.
- [ ] Demo credentials provided in Review Notes.
- [ ] Review Notes copy (§3 above) finalised and pasted into App
      Store Connect.
- [ ] Build uploaded via Xcode Organizer / Transporter.
- [ ] Internal TestFlight group validated on a physical device.
- [ ] External TestFlight (optional) opened.
- [ ] Submit for review.

---

## 8. Known gaps / "pending" flags

- Plugin-level privacy manifests not yet verified — must be checked
  against the versions bundled at submission time.
- Crashlytics / Sentry iOS SDK integration not yet decided; the Data
  Safety table reflects "TBD".
- Offline shell precache freshness policy (invalidation on every
  deploy) is implemented web-side; native-cache parity is Phase 2 PR
  #5's concern — listed here for visibility.
- `ios/` Xcode project does not yet exist in the repo; this audit is
  authored against the design intent. Values here must be rechecked
  once `npx cap add ios` has scaffolded the project.

---

## 9. Disclaimer

**NOT LEGAL ADVICE.** This document is an engineering pre-submission
audit. It is neither an opinion on App Store approval nor a privacy
legal opinion. Apple's Review Guidelines are updated without notice;
always read the live version immediately before submission. Privacy
Act 1988 (Cth), APP compliance, and NDB obligations are tracked in
`.claude/rules/compliance.md` and `.claude/rules/privacy.md` — this
document supplements, but does not replace, those rules.

---

## References

- `docs/proposals/ios-app-store-strategy.md`
- `docs/adr/ADR-010-ios-native-bridge.md`
- `src/lib/native-bridge.ts`
- `.claude/rules/compliance.md`
- `.claude/rules/privacy.md`
- Apple: https://developer.apple.com/app-store/review/guidelines/
- Apple: https://developer.apple.com/documentation/bundleresources/privacy_manifest_files
