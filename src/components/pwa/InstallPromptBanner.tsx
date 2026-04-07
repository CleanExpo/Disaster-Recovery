'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

const STORAGE_KEY = 'pwa-install-dismissed';

/**
 * BeforeInstallPromptEvent is not in the standard lib types.
 * Declare it locally so we can stash and call `.prompt()`.
 */
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * InstallPromptBanner
 *
 * Shows a dismissible "Add to Home Screen" banner on mobile when the browser
 * fires the `beforeinstallprompt` event (Chrome, Edge, Samsung Internet).
 *
 * Conditions for display:
 *  - `beforeinstallprompt` has fired (browser deems site installable)
 *  - Not already running in standalone mode (app not yet installed)
 *  - User has not previously dismissed (localStorage flag absent)
 *  - Viewport width <= 768 px (mobile only)
 */
export default function InstallPromptBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isDismissed = Boolean(localStorage.getItem(STORAGE_KEY));
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Only attach listener when the banner can actually be shown
    if (isStandalone || isDismissed || !isMobile) {
      return undefined;
    }

    const handler = (e: Event) => {
      // Prevent the default mini-infobar from appearing on mobile
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      // Hide banner — app is installing
      setVisible(false);
    }
    // Clear stashed event regardless of outcome
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="banner"
      aria-label="Install app prompt"
      className="
        mb-4 flex items-center gap-3
        rounded-xl border border-blue-200 bg-blue-50
        px-4 py-3
        shadow-sm
      "
    >
      <Download
        className="h-5 w-5 shrink-0 text-blue-600"
        aria-hidden="true"
      />

      <p className="flex-1 text-sm text-blue-900">
        Install the DR Australia app for faster access during disasters.
      </p>

      <button
        type="button"
        onClick={handleInstall}
        className="
          shrink-0 rounded-lg bg-blue-600 px-3 py-1.5
          text-sm font-semibold text-white
          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
          min-h-[44px]
        "
      >
        Install
      </button>

      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss install prompt"
        className="
          shrink-0 rounded-full p-1.5 text-blue-500
          hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
          min-h-[44px] min-w-[44px] flex items-center justify-center
        "
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
