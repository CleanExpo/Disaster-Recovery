# Mobile PWA Specification — DR-376

**Status:** Partially implemented (see section statuses below)
**Last updated:** 2026-04-07

---

## 1. Overview

Disaster Recovery is a Progressive Web App optimised for field access during disaster events. The primary use case is a homeowner or insurance representative on-site who needs to lodge or track a damage claim with limited or intermittent mobile connectivity.

Key design constraints:

- Must function at minimum on a 375 px viewport (iPhone SE / small Android)
- Core claim lodgement workflow must work entirely offline and sync when connectivity returns
- Install to home screen to provide native-app feel (standalone display mode, no browser chrome)
- Touch targets min 44 px to accommodate gloved or stressed field use

---

## 2. Manifest (IMPLEMENTED)

**File:** `app/manifest.ts`

Next.js generates `/manifest.json` at build time via the `MetadataRoute.Manifest` type export.

Key values:

| Field              | Value                 |
| ------------------ | --------------------- |
| `name`             | Disaster Recovery     |
| `short_name`       | DR Australia          |
| `start_url`        | `/claim/start`        |
| `display`          | `standalone`          |
| `theme_color`      | `#1E3A5F` (navy blue) |
| `background_color` | `#ffffff`             |
| `orientation`      | `portrait`            |
| `scope`            | `/`                   |
| `lang`             | `en-AU`               |

**Icons:** Ten icon variants from 72×72 through 512×512, covering Android Chrome, iOS, and maskable purposes. See `app/manifest.ts` for the full icon array.

**Shortcuts:** Three deep-links registered — Lodge a Claim (`/claim/start`), Emergency Services (`/emergency`), Contact Us (`/contact`). These appear in the Android long-press home screen menu.

---

## 3. Service Worker (IMPLEMENTED)

**File:** `public/service-worker.js`
**Registration:** `app/register-sw.tsx`

Cache name: `dr-australia-v2` (bump version string to invalidate all caches on next deploy).

### Pre-cached offline URLs (install event)

```
/claim/start
/claim
/contact
/offline
/emergency
/manifest.json
/icon-192x192.png
/icon-512x512.png
/favicon.ico
```

Individual `cache.add()` calls wrapped in `Promise.allSettled` — a single fetch failure does not abort the install.

### Fetch strategies by request type

| Request type                                                     | Strategy                                                                            |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `/_next/webpack-hmr`                                             | Skipped (dev HMR)                                                                   |
| Cross-origin                                                     | Passed through unmodified                                                           |
| `/api/*`                                                         | Network-first, cache on 200, fall back to cache                                     |
| Navigation (`mode: navigate`)                                    | Network-first, cache on 200, fall back to cached page → `/offline` → `/claim/start` |
| Static assets (`/_next/static/`, images, fonts, scripts, styles) | Cache-first, populate cache on miss                                                 |

### Background sync

Two sync tags registered:

- `claim-submission` — retries pending claims from `pending-claims` cache
- `lead-submission` — retries pending leads from `pending-leads` cache

Triggered automatically by the browser when connectivity is restored after a `navigator.serviceWorker.sync.register()` call from the form submit handler.

### Push notifications

Push event handler in place. Displays a notification titled "Disaster Recovery Alert" with vibration pattern `[100, 50, 100]`, view/dismiss actions, and navigates to `/emergency` on the explore action.

**Pending:** Firebase FCM credentials are not yet configured — see section 8.

---

## 4. Offline Forms (IMPLEMENTED)

**File:** `src/lib/offline-store.ts`

Pure IndexedDB implementation (no third-party library). Works client-side only — all functions guard against SSR with `typeof window === 'undefined'` and `!window.indexedDB` checks.

**Database:** `dr-australia-offline` v1
**Object store:** `claim-drafts` (keyPath: `id`)

### Schema — `ClaimDraft`

```ts
interface ClaimDraft {
  id: string; // 'current' for the active draft
  formData: Record<string, unknown>;
  step: number;
  savedAt: number; // unix timestamp ms
  synced: boolean;
}
```

### Exported functions

| Function           | Description                                 |
| ------------------ | ------------------------------------------- |
| `saveDraft(draft)` | Upserts a draft record                      |
| `loadDraft()`      | Returns the `'current'` draft or `null`     |
| `clearDraft()`     | Deletes the `'current'` draft (best-effort) |
| `getUnsynced()`    | Returns all drafts where `synced === false` |
| `markSynced(id)`   | Sets `synced = true` for a given draft id   |

### Integration in ClaimStartClient

- On mount: loads draft; shows resume banner if draft is less than 24 hours old
- On `formData` change: debounced save (500 ms) via `setTimeout`
- On online event: calls `getUnsynced()` to check for pending submissions
- On successful submit: calls `clearDraft()`

---

## 5. Camera / Media Capture (IMPLEMENTED)

**File:** `src/components/claim/DamageMediaCapture.tsx`

Two hidden `<input type="file">` elements:

1. `capture="environment"` — triggers rear camera directly on mobile (camera-only flow)
2. No `capture` attribute — opens the standard file picker (gallery or file system)

### Image compression

Canvas-based compression runs before any file is stored or displayed:

- Max dimension: 1920 px (configurable via `maxPx` param)
- Quality: 0.8 JPEG
- Skips compression if file is already under 200 KB and within dimension limits
- Only replaces the original if the compressed blob is actually smaller
- Videos are passed through unmodified

### Thumbnail grid

- 2 columns on mobile, 3 on sm, 4 on md
- Each thumbnail shows: scaled image preview, filename (truncated), file size label
- Remove button (X) visible on hover/focus with accessible `aria-label`
- Object URLs revoked on component unmount to prevent memory leaks

### Accessibility

- `role="group"` with `aria-labelledby` and `aria-describedby`
- All interactive elements have descriptive `aria-label`
- Hidden file inputs use `tabIndex={-1}` and `aria-hidden="true"`

---

## 6. Mobile Responsiveness (IMPLEMENTED)

All 21 public-facing pages tested at 375 px viewport width. Design system rules:

| Rule                        | Value                                                 |
| --------------------------- | ----------------------------------------------------- |
| Minimum viewport            | 375 px                                                |
| Minimum touch target height | 44 px (`min-h-[44px]`)                                |
| Primary breakpoint stack    | `sm:640px` `md:768px` `lg:1024px`                     |
| Horizontal padding          | `px-4` mobile, `sm:px-6` desktop                      |
| Grid collapse               | All multi-column grids collapse to 1-column on mobile |

RTL layout support is applied via Tailwind `rtl:` variants and a `DirectionProvider` wrapper — see the UX notes doc for detail.

The `OfflineBanner` component (`src/components/claim/OfflineBanner.tsx`) renders an amber banner when `isOffline === true`, with a `WifiOff` icon and descriptive message. It appears at the top of the claim form area, above all form sections.

---

## 7. Install Prompt (TODO)

**Status:** Not yet implemented.

**What is needed:**

A client-side component that listens for the `beforeinstallprompt` event (Chrome/Edge/Samsung Android) and surfaces a dismissible banner offering the user a one-tap install.

**Implementation reference:** `src/components/pwa/InstallPromptBanner.tsx` (created as part of DR-376).

**Behaviour spec:**

- Listen for `beforeinstallprompt` on `window`; stash the event reference
- Only show if the user is on mobile (check `navigator.userAgent` width or `window.matchMedia('(max-width: 768px)')`)
- Do not show if the app is already installed (`window.matchMedia('(display-mode: standalone)').matches`)
- Do not show if user has previously dismissed (check `localStorage.getItem('pwa-install-dismissed')`)
- Banner text: "Install the DR Australia app for faster access during disasters"
- Install button calls `deferredPrompt.prompt()`
- Dismiss button sets `localStorage.setItem('pwa-install-dismissed', '1')` and hides banner
- iOS note: `beforeinstallprompt` does not fire on Safari; a separate iOS-specific prompt (Share → Add to Home Screen instructions) is deferred

**Where to mount:**
`app/claim/start/ClaimStartClient.tsx` — add `<InstallPromptBanner />` immediately below the `<OfflineBanner>` render.

---

## 8. Push Notifications (PARTIAL)

**Status:** DB-backed polling implemented; Firebase FCM credentials pending.

### What is implemented

- Service worker `push` event handler (`public/service-worker.js` lines 173–208)
- Notification display with title, body, icon, badge, vibration, and explore/close actions
- `notificationclick` handler opens `/emergency` on the explore action

### What is pending

Firebase Cloud Messaging (FCM) credentials must be configured before real push notifications can be delivered:

1. Create a Firebase project at console.firebase.google.com
2. Enable Cloud Messaging and copy:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`
   - `FIREBASE_VAPID_KEY` (from Cloud Messaging > Web Push certificates)
3. Add all values to `.env.local` and the Vercel project environment
4. Create `src/lib/firebase.ts` initialising `getApp()` / `getMessaging()`
5. Update the service worker to use `importScripts('/__/firebase/init.js')` and handle FCM background messages

Until credentials are in place, push events can be simulated from DevTools → Application → Service Workers → Push.

---

## 9. Testing

### Playwright E2E suite

**Location:** `tests/e2e/`
**Run command:** `npm run test:e2e`
**UI mode:** `npm run test:e2e:ui`
**Report:** `npm run test:e2e:report`
**Config:** `playwright.config.ts`

Spec files:

| File                       | Coverage                                            |
| -------------------------- | --------------------------------------------------- |
| `claim-flow.spec.ts`       | End-to-end claim submission flow                    |
| `offline.spec.ts`          | Service worker offline behaviour, draft persistence |
| `navigation.spec.ts`       | Page routing, breadcrumbs, 404 handling             |
| `accessibility.spec.ts`    | Axe-core audit on key pages                         |
| `contractor-apply.spec.ts` | Contractor application form flow                    |

Helper utilities are in `tests/e2e/helpers/`.

### Manual PWA checklist

- [ ] Lighthouse PWA audit score >= 90 (run in Chrome DevTools → Lighthouse)
- [ ] Install prompt appears on Android Chrome after first meaningful interaction
- [ ] App installs and launches in standalone mode (no browser chrome)
- [ ] Claim form saves draft offline and resumes correctly after reconnect
- [ ] Background sync fires pending submission after reconnect
- [ ] Push notification received and tapped navigates to `/emergency`
- [ ] All pages render correctly at 375 px width

---

## 10. Performance Targets

| Metric                          | Target   | Notes                                        |
| ------------------------------- | -------- | -------------------------------------------- |
| LCP (Largest Contentful Paint)  | < 2.5 s  | Measured on 4G, no throttle                  |
| INP (Interaction to Next Paint) | < 200 ms | Replaces FID from Chrome 115+                |
| CLS (Cumulative Layout Shift)   | < 0.1    | Avoid layout shift from late-loading banners |
| FCP (First Contentful Paint)    | < 1.8 s  |                                              |
| TTI (Time to Interactive)       | < 3.5 s  |                                              |
| Offline fallback load           | < 0.5 s  | Served from cache                            |

Performance is monitored via `src/components/performance-monitor.tsx` and Vercel Analytics.

---

## 11. Pending Items

| Item                                          | Blocker                                    | Priority |
| --------------------------------------------- | ------------------------------------------ | -------- |
| Firebase FCM credentials                      | Human — needs Firebase project setup       | High     |
| iOS install prompt (Share sheet instructions) | No `beforeinstallprompt` on Safari         | Medium   |
| File upload to cloud storage for photos       | Integration work — S3 or Supabase Storage  | High     |
| Push subscription persistence in DB           | Depends on FCM setup                       | High     |
| Web Share API integration                     | Nice-to-have                               | Low      |
| Periodic background sync for claim status     | Experimental API — limited browser support | Low      |
