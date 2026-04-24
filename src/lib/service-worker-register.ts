/**
 * Service Worker registration helper — iOS App Store Phase 2 PR #4 (RA-1633).
 *
 * Registers `/service-worker.js` ONLY when the iOS native-bridge flag is on:
 *   NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED === 'true'
 *
 * Rationale: the offline shell (`/offline`) is a life-safety requirement for
 * the native iOS shell. On regular web we do not want to ship a service
 * worker by default — it complicates cache invalidation and is not required
 * for the browser experience. Keeping registration flag-gated means the web
 * surface has zero footprint when the flag is off.
 *
 * Cache version: the SW file itself is versioned via the `v` query string
 * sourced from `NEXT_PUBLIC_SW_CACHE_VERSION` (default `v1`). Bumping the
 * env var on deploy forces browsers to pick up a new SW registration and
 * invalidates the old cache on `activate`.
 *
 * To clear the cache manually in Safari / iOS:
 *   Settings -> Safari -> Advanced -> Website Data -> Remove
 *   (or DevTools -> Application -> Service Workers -> Unregister)
 */

const IOS_BRIDGE_FLAG = 'NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED';

export function registerServiceWorker(): void {
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) return;

  // Flag-gate: zero footprint on regular web.
  if (process.env.NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED !== 'true') return;

  // Cache-busting query so deploys can invalidate the SW without a code change.
  const version = process.env.NEXT_PUBLIC_SW_CACHE_VERSION || 'v1';
  const swUrl = `/service-worker.js?v=${encodeURIComponent(version)}`;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        // Poll for updates every 60s so a new deploy is picked up without
        // requiring a full page reload in the native shell.
        setInterval(() => {
          registration.update().catch(() => {
            /* ignore — offline or transient */
          });
        }, 60_000);

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              // New SW available. Let the app decide when to reload; do not
              // pop a confirm() inside a native WebView.
              window.dispatchEvent(new CustomEvent('sw:update-available'));
            }
          });
        });
      })
      .catch((error) => {
        // Best-effort — SW registration failure must never break navigation.
        // eslint-disable-next-line no-console
        console.warn('[SW] Registration failed:', error);
      });
  });
}

/** Exposed for tests / debugging. Do not rely on the exact string name. */
export const SERVICE_WORKER_FLAG = IOS_BRIDGE_FLAG;
