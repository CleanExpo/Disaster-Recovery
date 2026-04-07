'use client';

import { useEffect } from 'react';

export default function RegisterServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(registration => {
            console.log('[SW] Registration successful:', registration.scope);

            // Check for updates periodically (every 60s)
            setInterval(() => {
              registration.update();
            }, 60000);

            // Handle SW updates — prompt user to reload for new version
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (
                    newWorker.state === 'installed' &&
                    navigator.serviceWorker.controller
                  ) {
                    if (confirm('A new version of Disaster Recovery Australia is available. Reload to update?')) {
                      window.location.reload();
                    }
                  }
                });
              }
            });
          })
          .catch(error => {
            console.error('[SW] Registration failed:', error);
          });
      });

      // Redirect to offline page when navigating while offline
      window.addEventListener('offline', () => {
        console.log('[SW] Connection lost — offline mode active');
      });

      window.addEventListener('online', () => {
        console.log('[SW] Connection restored');
      });
    }
  }, []);

  return null;
}