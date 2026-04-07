'use client';

import { WifiOff } from 'lucide-react';

interface OfflineBannerProps {
  isOffline: boolean;
  savedLocally?: boolean;
}

export default function OfflineBanner({ isOffline, savedLocally }: OfflineBannerProps) {
  if (!isOffline) return null;

  return (
    <div className="w-full bg-amber-50 border border-amber-300 rounded-lg px-4 py-3 flex items-start gap-3 mb-4">
      <WifiOff className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-semibold text-amber-900">You&apos;re offline</p>
        <p className="text-sm text-amber-800">
          {savedLocally
            ? 'Your claim progress is saved locally and will sync automatically when you reconnect.'
            : 'Your claim progress is being saved locally and will sync automatically when you reconnect.'}
        </p>
      </div>
    </div>
  );
}
