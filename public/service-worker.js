/**
 * Disaster Recovery Australia — Service Worker
 * iOS App Store Phase 2 PR #4 (RA-1633) — life-safety offline shell.
 *
 * Strategy:
 *   - On install: precache /offline + minimal static assets so the shell
 *     renders with zero network.
 *   - On fetch: network-first for everything.
 *   - On navigation failure: return the cached /offline HTML.
 *   - API routes and authenticated pages are NOT cached. The only
 *     whitelisted cache entries are the /offline shell and static assets
 *     that the shell depends on (manifest + favicon).
 *
 * Cache invalidation:
 *   The registering page passes `?v=${NEXT_PUBLIC_SW_CACHE_VERSION}`. To
 *   roll a new SW + flush old caches, bump that env var in Vercel and
 *   redeploy. On `activate`, any cache name that does not match the
 *   current CACHE_NAME is deleted.
 *
 * Manual clear (Safari / iOS):
 *   Settings -> Safari -> Advanced -> Website Data -> Remove.
 *   DevTools -> Application -> Service Workers -> Unregister.
 *
 * Registration is gated by `NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED`.
 * See `src/lib/service-worker-register.ts`.
 */

// Parse the `?v=<version>` the registering page passed us. Falls back to v1
// when the SW is fetched directly (e.g. DevTools).
const SW_VERSION = (() => {
  try {
    const url = new URL(self.location.href);
    return url.searchParams.get('v') || 'v1';
  } catch {
    return 'v1';
  }
})();

const CACHE_NAME = `dr-offline-shell-${SW_VERSION}`;

// Life-safety offline shell + its bare-minimum static deps. Keep this list
// minimal: anything precached here must be safe to serve even if months
// stale (no auth, no PII, no live data).
const PRECACHE_URLS = [
  '/offline',
  '/manifest.json',
  '/favicon.ico',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Use individual adds so a single failure does not abort install.
      await Promise.allSettled(
        PRECACHE_URLS.map((url) =>
          cache.add(url).catch((err) => {
            // eslint-disable-next-line no-console
            console.warn('[SW] Failed to precache:', url, err);
          })
        )
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;

  // Never cache API routes or the Next.js HMR endpoints.
  if (request.url.includes('/api/')) return;
  if (request.url.includes('/_next/webpack-hmr')) return;

  // Navigation requests: network-first with an /offline fallback.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match('/offline');
        if (cached) return cached;
        return new Response(
          '<h1>You are offline</h1><p>Call 000 in an emergency, or 1300 309 361 for Disaster Recovery Australia.</p>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      })
    );
    return;
  }

  // Non-navigation requests: network-first, fall back to cache if we have
  // a pre-seeded copy (e.g. manifest, favicon). Nothing new is cached at
  // runtime — the precache list is authoritative.
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
