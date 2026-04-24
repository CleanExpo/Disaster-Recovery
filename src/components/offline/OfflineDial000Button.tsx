'use client';

/**
 * Offline shell — Dial 000 button with a Heavy haptic tap.
 *
 * RA-1633 iOS App Store epic, Phase 2 PR #6.
 *
 * The offline `/app/offline` page is a Server Component. This tiny
 * Client Component exists solely to attach a native-bridge Heavy
 * haptic to the life-safety 000 affordance — a tactile confirmation
 * that the high-consequence dial action has fired, even when the
 * caller can't look at the screen.
 *
 * Flag-gated via the native bridge (`NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED`).
 * Web / flag-off: the `tel:` link still works, haptic is a no-op.
 */

import { heavyTap } from '@/lib/native-bridge';

export default function OfflineDial000Button() {
  return (
    <a
      href="tel:000"
      onClick={() => { void heavyTap(); }}
      className="inline-flex items-center justify-center min-h-[48px] w-full px-6 py-3 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
      aria-label="Call 000 emergency services now"
    >
      Dial 000 now
    </a>
  );
}
