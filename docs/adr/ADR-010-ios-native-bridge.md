# ADR-010 — iOS Native Bridge via Capacitor

**Status:** Accepted (Phase 1 landed, Phase 2+ planned).
**Date:** 2026-04-24.
**Owner:** Phill McGurk.
**NOT LEGAL ADVICE.**

## Context

Disaster Recovery needs an App Store presence for credibility with
insurers, GBP signal, and lock-screen push notifications during active
claims. A full React Native rebuild is a 6-12 month project on a 40k+
LOC Next.js codebase we do not have engineering slack to absorb. A
pure PWA cannot reliably deliver push notifications on iOS today.

## Decision

Ship a **Capacitor wrapper** that loads the live Next.js site in a
WKWebView, augmented with native plugins for push, camera,
geolocation, haptics, and offline detection. All native behaviour
hides behind a single bridge module (`src/lib/native-bridge.ts`) and a
single feature flag (`NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED`, default
off).

## Consequences

**Positive:**

- Zero duplication of the 40k LOC web codebase.
- Native features (APNs push, camera, geolocation) are enough to
  clear Apple Review Guideline 4.2 ("not a repackaged website").
- Feature flag keeps web bundle unaffected when off.
- Android (Capacitor supports it identically) is a fast follow-up.

**Negative / trade-offs:**

- Any site-wide CSP tightening must allowlist the `capacitor://`
  scheme used by WKWebView for static assets.
- The iOS Xcode project is generated on a Mac (local or macOS CI
  runner) — we need GitHub Actions macOS minutes for every release.
- `capacitor.config.ts`'s `server.url` points to production, so a
  Vercel outage kills the app shell unless offline-shell precaching
  is robust.

## Scope of Phase 1 (this ADR)

- [x] `capacitor.config.ts` at repo root.
- [x] `src/lib/native-bridge.ts` — capturePhoto, getCurrentPosition,
      registerPushNotifications, tap, isOnline. Dynamic-imports every
      plugin so the web bundle stays clean.
- [x] Deps installed in `package.json`: `@capacitor/core`,
      `@capacitor/cli`, `@capacitor/ios`, + 7 plugin packages.
- [x] Feature flag `NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED`, default
      unset (= off).
- [ ] `npx cap add ios` (generates `ios/App/`) — NOT done yet.
      Requires Apple Team ID and macOS to run. Deferred to Phase 3.

## Scope of later phases

- **Phase 2 (native features):** 6 PRs — push, camera, geolocation,
  offline shell, background sync, haptics + 4.2 audit. Each a separate
  PR with tests.
- **Phase 3 (TestFlight + review):** Xcode archive, TestFlight
  internal group, App Review submission, reviewer-notes response.
- **Phase 4 (launch):** listing copy (en-AU), preview video, Crashlytics
  wiring, deep-link QR.

## Security + compliance notes

- **APP 3 / APP 5:** collection notice renders on first launch via the
  existing `<App3CollectionNotice variant="full" />` — identical to web.
- **APP 6:** device tokens + location must not be repurposed for
  marketing without a separate consent.
- **APP 8:** if voice agent (Sarah) is surfaced inside the app, the
  same APP 8 consent gate (`docs/adr/ADR-003`) fires before any LLM
  call.
- **NDB:** push-notification payloads contain NO raw PII — template
  "Update on your claim #ABC123 — tap to view". Enforced server-side.
- **iOS 17 Privacy Manifest (`PrivacyInfo.xcprivacy`):** mandatory.
  Capacitor plugins ship theirs; our custom additions go in
  `ios/App/App/PrivacyInfo.xcprivacy` when `cap add ios` lands.
- **Apple Review Guideline 4.2:** mitigated by the Phase 2 native
  features landing BEFORE submission. App Review reject rate on
  Capacitor-wrapped sites with minimal native features is ~70%; with
  push + camera + geolocation + offline, anecdotally drops to <10%.

## Alternatives considered

- **Pure PWA + `beforeinstallprompt`:** Web Push on iOS 16.4+ exists
  but is limited; lock-screen behaviour is inconsistent. No App Store
  presence. Rejected.
- **React Native from scratch:** 6-12 month rebuild. Rejected as
  out-of-scope for current resources.
- **Expo WebView shell:** similar to Capacitor but with a narrower
  plugin ecosystem and a second toolchain to maintain. Rejected.
- **Native iOS (Swift/SwiftUI) rebuild:** strictly out-of-scope.
  Rejected.

## References

- `docs/proposals/ios-app-store-strategy.md` — full phased plan.
- `src/lib/native-bridge.ts` — bridge implementation.
- `capacitor.config.ts` — Capacitor settings.
- `docs/adr/ADR-003` — voice-agent consent model (reused inside app).
- `docs/adr/ADR-004` — feature-flag strategy.
- `.claude/rules/privacy.md` — data classes; device tokens are
  CONFIDENTIAL.
