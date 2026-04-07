const CACHE_NAME = 'dr-australia-v2';

// Critical URLs to pre-cache for offline field access
const OFFLINE_URLS = [
  '/claim/start',
  '/claim',
  '/contact',
  '/offline',
  '/emergency',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/favicon.ico',
];

// Install event — pre-cache critical offline URLs
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pre-caching offline-capable routes');
        // addAll fails if any request fails; use individual adds to be resilient
        return Promise.allSettled(
          OFFLINE_URLS.map((url) =>
            cache.add(url).catch((err) => {
              console.warn('[SW] Failed to cache:', url, err);
            })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event — clean up old caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch event — strategy varies by request type
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET and cross-origin requests
  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;

  // Skip Next.js HMR and internal routes
  if (request.url.includes('/_next/webpack-hmr')) return;

  // API routes: network-first, fall back to cache
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Navigation requests (HTML pages): network-first, offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful navigations for future offline use
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then(
            (cached) =>
              cached ||
              caches.match('/offline') ||
              caches.match('/claim/start')
          )
        )
    );
    return;
  }

  // Static assets (_next/static, images, fonts): cache-first
  if (
    request.url.includes('/_next/static/') ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    request.destination === 'style' ||
    request.destination === 'script'
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }
});

// Background sync — retry pending claim form submissions when back online
self.addEventListener('sync', (event) => {
  if (event.tag === 'claim-submission') {
    event.waitUntil(submitPendingClaims());
  }
  if (event.tag === 'lead-submission') {
    event.waitUntil(submitPendingLeads());
  }
});

async function submitPendingClaims() {
  const cache = await caches.open('pending-claims');
  const requests = await cache.keys();
  for (const request of requests) {
    try {
      const response = await fetch(request);
      if (response.ok) {
        await cache.delete(request);
        console.log('[SW] Pending claim submitted successfully');
      }
    } catch (error) {
      console.error('[SW] Failed to submit pending claim:', error);
    }
  }
}

async function submitPendingLeads() {
  const cache = await caches.open('pending-leads');
  const requests = await cache.keys();
  for (const request of requests) {
    try {
      const response = await fetch(request);
      if (response.ok) {
        await cache.delete(request);
      }
    } catch (error) {
      console.error('[SW] Failed to submit lead:', error);
    }
  }
}

// Push notifications — emergency alerts and claim status updates
self.addEventListener('push', (event) => {
  let title = 'Disaster Recovery Alert';
  let options = {
    body: 'New notification from Disaster Recovery Australia',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: { url: '/emergency', dateOfArrival: Date.now() },
    actions: [
      { action: 'view', title: 'View Details' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  };

  if (event.data) {
    try {
      const payload = event.data.json();
      title = payload.title || title;
      options.body = payload.body || payload.message || options.body;
      options.data = {
        ...options.data,
        url: payload.url || payload.data?.url || '/emergency',
        claimId: payload.claimId || payload.data?.claimId,
        type: payload.type || 'general',
      };
      if (payload.tag) options.tag = payload.tag;
      if (payload.requireInteraction) options.requireInteraction = true;
    } catch {
      // Fallback to plain text
      options.body = event.data.text();
    }
  }

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click handling — route to relevant page
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const data = event.notification.data || {};
  let targetUrl = data.url || '/emergency';

  if (data.claimId) {
    targetUrl = `/claim/${data.claimId}`;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(targetUrl);
    })
  );
});
