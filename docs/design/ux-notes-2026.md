# UX Design Notes — DR-374

**Status:** Living document — updated as decisions are made
**Last updated:** 2026-04-07

---

## 1. Review / Rating Flow

**Route:** `/reviews/submit?claimId=xxx&contractorId=xxx`

### Decision rationale

Reviews are tied to a specific claim outcome and the contractor who performed the work. Both IDs are passed as query parameters so the form pre-populates context ("You worked with [Contractor Name] on Claim #CLM-001234").

### Interaction design

- **Rating input:** 5-star selector, each star is a radio input (`sr-only`) backed by a visual star icon. Stars fill on hover and on selection. Minimum rating: 1 star required to submit.
- **Text feedback:** Optional `<textarea>` — 500 character limit, live character counter. Placeholder guides the user: "What went well? Anything that could have been better?"
- **Submission:** Single POST to `/api/reviews` with `{ claimId, contractorId, rating, comment }`. On success redirects to `/track/:claimId` with a `?reviewed=1` flag that shows a thank-you toast.
- **Guard:** If the claim does not belong to the authenticated user, the API returns 403. The form shows an error state.

---

## 2. Language Selection

**Route:** `/settings/language`

**File:** `app/settings/language/page.tsx`

### 24 supported languages

The grid renders all entries from `src/lib/supported-languages.ts` with metadata from the inline `LANGUAGE_META` map (flag emoji + English name for accessibility, native name from `SUPPORTED_LANGUAGES` for display).

### Grid layout

- Mobile: 2 columns
- Tablet (sm+): 3 columns
- Desktop (lg+): 4 columns
- Each cell: flag emoji + native language name (e.g., "普通话", "العربية", "Tiếng Việt")
- Active language: highlighted with a blue ring and checkmark

### Persistence

Language selection is stored in `localStorage` via `LanguageContext` (`src/lib/language-context.tsx`). The chosen language code is applied globally via the context provider mounted in `app/providers.tsx`.

On initial load the context reads `localStorage.getItem('language')`. If nothing is stored, it defaults to `'en'`.

### RTL languages

Arabic (`ar`) and any future RTL additions trigger the direction change described in section 3.

---

## 3. RTL Layout

**Affected languages:** Arabic (`ar`) — and any additional RTL language added in future.

### Implementation

1. `DirectionProvider` component wraps the application in `app/layout.tsx`. It reads the current language from `LanguageContext` and sets the `dir` attribute on the `<html>` element (`dir="rtl"` or `dir="ltr"`).
2. All layout components use Tailwind `rtl:` variants for directional overrides — for example:
   - `ml-3 rtl:ml-0 rtl:mr-3` — flip margins
   - `pl-4 rtl:pl-0 rtl:pr-4` — flip padding
   - `left-0 rtl:left-auto rtl:right-0` — flip absolute positioning
3. Flexbox row direction is left to `flex-row`; `rtl:` variants handle icon-before-text reversal where needed.
4. Text alignment defaults are not overridden — the browser honours `dir="rtl"` for native text alignment.

### Known gaps

- Chart and data-visualisation components do not have RTL variants and may render with reversed axes. This is acceptable for the current scope (Arabic-speaking users represent a small fraction).
- The Playwright accessibility suite does not yet include RTL snapshot tests.

---

## 4. Offline Banner

**File:** `src/components/claim/OfflineBanner.tsx`

### Trigger

Renders when the `isOffline` prop is `true`. The parent component (`ClaimStartClient.tsx`) sets this state from:
1. Initial mount: `!navigator.onLine`
2. `window.addEventListener('offline', ...)` — sets `isOffline = true`
3. `window.addEventListener('online', ...)` — sets `isOffline = false`

### Visual design

- Background: `bg-amber-50` (warm amber, distinct from the page background)
- Border: `border-amber-300`
- Icon: `WifiOff` (lucide-react), `text-amber-600`
- Heading: "You're offline" — bold, `text-amber-900`
- Body copy: changes based on `savedLocally` prop:
  - `savedLocally === true`: "Your claim progress is saved locally and will sync automatically when you reconnect."
  - `savedLocally === false`: "Your claim progress is being saved locally and will sync automatically when you reconnect."

### Placement

Rendered immediately above the claim form sections, below the page header. This placement ensures visibility without blocking the form controls.

### Accessibility

No `role="alert"` — the banner is not an urgent interruption; the user is already aware they are offline. If we add a "you came back online" notification in future, that should use `role="status"` with `aria-live="polite"`.

---

## 5. Camera Capture

**File:** `src/components/claim/DamageMediaCapture.tsx`

### Capture strategy

Two separate file inputs are used rather than one input with `capture`:

| Input | `capture` | `accept` | Purpose |
|---|---|---|---|
| Camera input | `environment` | `image/*,video/*` | Activates rear camera directly on mobile |
| File input | (none) | `image/*,video/*` | Opens gallery / file picker (desktop-compatible) |

This pattern avoids the UX problem on Android where `capture="environment"` alone prevents gallery selection.

### Canvas compression pipeline

All selected images pass through `compressImage()` before being stored in component state:

1. Load the file into an `<img>` element via `createObjectURL`
2. Calculate scale factor: `maxPx / Math.max(width, height)` where `maxPx = 1920`
3. Draw onto a canvas at the scaled dimensions
4. Export as `image/jpeg` at quality 0.8
5. Only replace the original if the compressed `Blob` is strictly smaller
6. Files under 200 KB that fit within dimensions are returned unchanged (skip canvas round-trip)

Videos are returned unmodified — no server-side transcoding is currently implemented.

### Thumbnail grid

- Grid: `grid-cols-2 sm:grid-cols-3 md:grid-cols-4`
- Aspect ratio: `aspect-square` for consistent sizing
- Each tile: thumbnail image (or a video placeholder icon), filename (truncated with `truncate`), human-readable file size
- Remove button: absolutely positioned top-right, hidden until `group-hover` or `:focus`, `aria-label="Remove [filename]"`

### Object URL lifecycle

- Created: `URL.createObjectURL(file)` in `addFiles()`
- Revoked on remove: `URL.revokeObjectURL(media.objectUrl)` in `removeFile()`
- Revoked on unmount: cleanup effect revokes all remaining URLs

---

## 6. Claim Form Draft

**Files:**
- `src/lib/offline-store.ts` — IndexedDB persistence layer
- `app/claim/start/ClaimStartClient.tsx` — draft integration

### Auto-save

A `useEffect` watches `formData` and schedules a save after a 500 ms debounce using `setTimeout` / `clearTimeout`. This means:
- Rapid typing does not trigger multiple saves
- The draft is always current within 500 ms of the user pausing

Saved record: `{ id: 'current', formData, step: 1, savedAt: Date.now(), synced: false }`.

### Resume banner

On mount, `loadDraft()` is called. If a draft exists and is less than 24 hours old (`Date.now() - draft.savedAt < 86_400_000`), a blue resume banner is displayed showing the human-formatted save time (Australian locale via `toLocaleString('en-AU')`).

The banner offers two actions:
- **Resume** — calls `loadDraft()` again and merges `draft.formData` into `formData` state; hides banner
- **Start Fresh** — calls `clearDraft()` and hides banner

### 24-hour expiry

Drafts older than 24 hours are not surfaced in the UI (the banner condition check). They remain in IndexedDB but are silently ignored. A future cleanup job could prune them — see `getUnsynced()` which returns all records with `synced === false`.

### Offline indicator interaction

When the user is offline (`isOffline === true`) and a draft save completes, `setSavedLocally(true)` is called. This updates the `OfflineBanner` message to the "saved locally" variant and shows a secondary amber badge: "Saved locally — your progress is stored on this device."
