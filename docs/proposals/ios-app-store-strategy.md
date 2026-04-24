# iOS App Store Strategy — Disaster Recovery Australia

**Status:** DRAFT — scoping only. No code committed yet.
**Date:** 2026-04-24
**Owner:** Phill McGurk.
**NOT LEGAL ADVICE.**

## TL;DR

Fastest, cheapest, App-Store-compliant path to shipping a Disaster Recovery
iOS app is a **Capacitor wrapper** around the existing Next.js site with
enough real native features (push, camera, geolocation) to clear Apple
Review Guideline 4.2 ("minimum functionality" / no pure webview wrappers).

Target: TestFlight in 2 weeks, App Store approved in 4 weeks.

## Why not pure PWA

- iOS Safari PWAs can't receive push notifications from APNs directly; Web
  Push on iOS 16.4+ is limited, not equivalent to native.
- Emergency claim intake benefits from lock-screen push, background
  geolocation, camera roll integration.
- App Store presence is a credibility signal for insurance + GBP.

## Why not React Native rebuild

- 40k+ LOC Next.js site with 1,152 location pages + 129 service pages +
  49 guides + contractor portal + client portal.
- Rebuilding UI in RN is a 6-12 month project.
- Capacitor reuses 100% of existing Next.js output, adds native shell.

## Architecture

```
iOS App (Capacitor Xcode project)
  ├─ WKWebView points to https://app.disasterrecovery.com.au
  │   (or bundled offline shell for emergency mode)
  ├─ Native plugins:
  │   ├─ @capacitor/push-notifications (APNs)
  │   ├─ @capacitor/camera (damage photos → /claim upload)
  │   ├─ @capacitor/geolocation (auto-fill property address)
  │   ├─ @capacitor/network (offline detection + queue)
  │   ├─ @capacitor/device (attach device info to compliance_events)
  │   └─ @capacitor/app (deep links: drau://claim/abc123)
  ├─ Bridge layer: src/lib/native-bridge.ts
  │   (feature-detects Capacitor.isNativePlatform(), falls back to web)
  └─ Offline shell: /offline route + service worker cache
      (shows 000 button + 1300 309 361 call button without network)
```

## Native-first features (Guideline 4.2 compliance)

Apple rejects apps that are "repackaged websites". Must demonstrate real
native value:

1. **Push notifications** — claim status updates, contractor ETA, follow-up
   prompts. Wired via APNs + our backend.
2. **Camera upload** — damage photo capture → direct upload to Supabase
   Storage → attached to Claim record. Works offline (queues).
3. **Geolocation auto-fill** — on `/claim` form, tap "Use current location"
   → reverse geocode → pre-fill property address.
4. **Offline life-safety shell** — `/offline` route pre-cached, shows 000
   - 1300 309 361 call buttons, APP 3 notice, even with zero signal.
5. **Background sync** — if user submits claim while offline, queue locally,
   sync when signal returns. Audit event logged when sync completes.
6. **Haptic feedback** — on CTA taps, form submit success, emergency
   button press.

Each feature lands as a separate PR with tests.

## Phased delivery

### Phase 0 — Prerequisites (Phill-blocked)

- [ ] Apple Developer Program enrolment (`developer.apple.com/programs`) —
      $149/yr AUD. Needs Apple ID + ABN (National Restoration Professionals
      Group Pty Ltd) + D-U-N-S number (free from Dun & Bradstreet AU,
      14-day turnaround).
- [ ] Bundle ID decision: propose `au.com.disasterrecovery.app` (matches
      NAP convention).
- [ ] App Store Connect app record created (only Phill can do this — needs
      Account Holder role).
- [ ] Apple Push Notification service key (`.p8` file) generated.
- [ ] Icons + splash screens (1024x1024 PNG master, we generate all sizes
      via `capacitor-assets`).

### Phase 1 — Capacitor scaffold (3 days)

- [ ] `npm install @capacitor/core @capacitor/cli @capacitor/ios`.
- [ ] `npx cap init "Disaster Recovery" au.com.disasterrecovery.app`.
- [ ] `npx cap add ios` — creates `ios/` Xcode project.
- [ ] `capacitor.config.ts`: `server.url = 'https://disasterrecovery.com.au'`
      for live mode; bundled build for offline shell.
- [ ] CI gate: `ios/` directory builds without errors (GitHub Actions
      macOS runner).
- [ ] Feature flag: `NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED` — off by
      default so web stays unaffected.

### Phase 2 — Native features (1 week)

- [ ] PR 1: Push notifications plugin + APNs registration + backend token
      store (new Prisma model `DeviceToken`).
- [ ] PR 2: Camera plugin + photo upload bridge (`Supabase Storage RLS`).
- [ ] PR 3: Geolocation plugin + reverse geocode bridge.
- [ ] PR 4: Offline shell + service worker precache.
- [ ] PR 5: Background sync + queue replay.
- [ ] PR 6: Haptics + App Review Guideline 4.2 compliance audit.

### Phase 3 — TestFlight + review (1 week)

- [ ] Xcode archive + upload to App Store Connect.
- [ ] TestFlight internal group (Phill + 2-3 contractors).
- [ ] Fix any crash reports from TestFlight.
- [ ] Submit for App Review.
- [ ] Respond to reviewer notes (4.2 is the common reject reason;
      demonstrate native features in the Review Notes field).

### Phase 4 — Launch + post-launch (ongoing)

- [ ] Listing copy: AU English, keyword targets (water damage, flood
      restoration, fire damage, insurance claim, emergency).
- [ ] App preview video (30s screen recording of claim intake).
- [ ] Launch announcement on disasterrecovery.com.au + contractor portal.
- [ ] Crashlytics / Sentry iOS SDK wiring.
- [ ] Deep-link QR on business cards.

## Compliance

- **APP 3 + APP 5:** collection notice must render on app first launch,
  not just at form submit. Reuse `<App3CollectionNotice variant="full" />`.
- **APP 6:** device ID cannot be repurposed for marketing without fresh
  consent.
- **APP 8:** if any AI processing happens (voice agent via app), consent
  gate fires same as web.
- **NDB:** push notification content must NOT include raw PII. Template:
  "Update on your claim #ABC123 — tap to view."
- **Apple iOS 14+ App Tracking Transparency:** we do NOT track across
  apps/sites. Privacy nutrition label: "Data Not Collected for Tracking".
- **Privacy manifest (iOS 17+):** `PrivacyInfo.xcprivacy` must declare
  every API used + reason. Capacitor plugins provide theirs; ours goes
  in `ios/App/App/PrivacyInfo.xcprivacy`.

## Risks

1. **Apple Review Guideline 4.2 reject.** Mitigated by native features
   shipping in Phase 2 BEFORE submission.
2. **Content Security Policy.** `next.config.mjs` CSP currently allows
   `'unsafe-inline'` + `'unsafe-eval'`. The WKWebView is same-origin,
   but `capacitor://` scheme needs allowlisting. Separate ADR.
3. **Push notification abuse.** Rate-limit push dispatch server-side;
   never send marketing pushes without explicit toggle in app settings.
4. **Offline shell staleness.** Precache version must invalidate on
   every deploy; cache-bust via service worker versioning.

## Cost

| Item                      | Cost (AUD/yr) |
| ------------------------- | ------------- |
| Apple Developer Program   | $149          |
| D-U-N-S registration (AU) | $0 (free)     |
| APNs                      | $0 (free)     |
| App Store Connect         | $0 (included) |
| TestFlight                | $0 (included) |
| **Total**                 | **$149/yr**   |

Development time: ~2 engineer-weeks for Phases 1-3. If Claude agents run
parallel PRs, ~1 calendar week.

## Android / Google Play — out of scope for this proposal

Capacitor supports Android identically. Ship iOS first, Android as a
follow-up (same codebase, separate submission).

## Next action

1. Phill: start Apple Developer Program enrolment + request D-U-N-S.
2. Me: open Linear epic DR-725 with Phase 0-4 tickets as children.
3. Me: draft PR 1 of Phase 1 (Capacitor install + config) behind the
   `NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED` flag — flag-off is zero-impact.

---

_See `docs/adr/` for ADR-010 (iOS native bridge) once design locks._
