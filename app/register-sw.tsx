'use client';

/**
 * Client-only wrapper that registers the service worker.
 *
 * The registration logic lives in `src/lib/service-worker-register.ts` and
 * is flag-gated by `NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED`. When the flag
 * is off (regular web), this component is a no-op.
 */

import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/service-worker-register';

export default function RegisterServiceWorker() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
}
