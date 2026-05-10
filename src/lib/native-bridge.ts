/**
 * Native bridge — feature-detects Capacitor (iOS/Android) and exposes
 * a small API that falls back to web behaviour when running in a
 * normal browser.
 *
 * Usage:
 *   import { isNative, getPlatform, capturePhoto } from '@/lib/native-bridge';
 *   if (isNative()) {
 *     const photo = await capturePhoto();
 *     …
 *   }
 *
 * Gated behind NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED. When the flag is
 * off (default), `isNative()` returns false and every helper no-ops —
 * so the web bundle stays unaffected.
 *
 * NOT LEGAL ADVICE. APP 3 + APP 6 notes inline.
 */

const FLAG_ENABLED =
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED === 'true';

declare global {
  interface Window {
    Capacitor?: {
      isNativePlatform?: () => boolean;
      getPlatform?: () => string;
    };
  }
}

/**
 * Returns true only when BOTH the feature flag is on AND we're running
 * inside a Capacitor shell. The flag-off branch must stay zero-impact
 * (no dynamic imports, no bundle bloat).
 */
export function isNative(): boolean {
  if (!FLAG_ENABLED) return false;
  if (typeof window === 'undefined') return false;
  return Boolean(window.Capacitor?.isNativePlatform?.());
}

export function getPlatform(): 'ios' | 'android' | 'web' {
  if (!isNative()) return 'web';
  const p = window.Capacitor?.getPlatform?.();
  return p === 'ios' || p === 'android' ? p : 'web';
}

/**
 * App bundle identifier — authoritative on the server as a spoof guard.
 * Must match the literal in `claimPhotoUploadSchema`.
 */
const APP_BUNDLE_ID = 'au.com.disasterrecovery.app';

/**
 * App version reported to the server. Sourced from Capacitor App plugin
 * when available; falls back to a stub so dev builds don't fail schema
 * validation.
 */
async function resolveAppVersion(): Promise<string> {
  try {
    const { App } = await import('@capacitor/app');
    const info = await App.getInfo();
    return `${info.version}+${info.build}`;
  } catch {
    return '0.0.0+0';
  }
}

/**
 * Capture a photo for a damage claim and upload it to the server.
 *
 * Falls back to null on web (caller renders the web `<input type="file"
 * capture="environment">` path). When the feature flag is off, this
 * helper no-ops — no dynamic imports, no network calls.
 *
 * APP 3 note: the user must have already consented to photo upload
 * before this is called. Caller is responsible for the consent gate.
 *
 * @param opts.claimId — optional, associates the photo with an existing
 *   claim. Omit when the user hasn't reached the claim-submit step yet.
 * @param opts.geo — optional geo fix (lat/lng/accuracy). Only pass when
 *   the user granted Geolocation permission separately.
 */
export async function capturePhoto(opts?: {
  claimId?: string;
  geo?: { lat: number; lng: number; accuracyMeters: number };
}): Promise<
  { dataUrl: string; format: string; uploadId: string | null } | null
> {
  if (!isNative()) return null;
  try {
    // Dynamic import so the Capacitor plugin is tree-shaken out of the
    // web bundle when the flag is off.
    const { Camera, CameraResultType } = await import('@capacitor/camera');
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      quality: 80,
      allowEditing: false,
      correctOrientation: true,
    });
    if (!photo.dataUrl) return null;

    const platform = getPlatform();
    if (platform === 'web') {
      return { dataUrl: photo.dataUrl, format: photo.format, uploadId: null };
    }

    const appVersion = await resolveAppVersion();
    let uploadId: string | null = null;
    try {
      const res = await fetch('/api/native/claim-photo-upload', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          photoDataUrl: photo.dataUrl,
          claimId: opts?.claimId,
          platform,
          appId: APP_BUNDLE_ID,
          appVersion,
          capturedAt: new Date().toISOString(),
          geo: opts?.geo,
        }),
      });
      if (res.ok) {
        const json = (await res.json()) as { ok?: boolean; id?: string };
        if (json.ok && typeof json.id === 'string') {
          uploadId = json.id;
        }
      }
    } catch {
      // Swallow — caller still gets the dataUrl for a later retry.
    }

    return { dataUrl: photo.dataUrl, format: photo.format, uploadId };
  } catch {
    return null;
  }
}

/**
 * Request a single high-accuracy position fix for the `/claim` form.
 *
 * APP 3 note: collected only when the user taps "Use my current
 * location" — never on app launch. Prompt for permission lazily.
 */
export async function getCurrentPosition(): Promise<
  { lat: number; lng: number; accuracyMeters: number } | null
> {
  if (!isNative()) return null;
  try {
    const { Geolocation } = await import('@capacitor/geolocation');
    const perm = await Geolocation.checkPermissions();
    if (perm.location !== 'granted') {
      const req = await Geolocation.requestPermissions();
      if (req.location !== 'granted') return null;
    }
    const pos = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10_000,
    });
    return {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      accuracyMeters: pos.coords.accuracy,
    };
  } catch {
    return null;
  }
}

/**
 * Register for APNs push notifications. Returns the device token so
 * the caller can POST it to `/api/native/device-token` (not yet
 * implemented — Phase 2 PR 1).
 *
 * NDB note: push-notification payloads must NEVER contain raw PII.
 * Backend enforces this; helper is agnostic.
 */
export async function registerPushNotifications(): Promise<string | null> {
  if (!isNative()) return null;
  try {
    const { PushNotifications } = await import('@capacitor/push-notifications');
    const perm = await PushNotifications.checkPermissions();
    if (perm.receive !== 'granted') {
      const req = await PushNotifications.requestPermissions();
      if (req.receive !== 'granted') return null;
    }
    await PushNotifications.register();
    return new Promise<string | null>((resolve) => {
      const off = PushNotifications.addListener('registration', (token) => {
        // TODO(ts-phase-3): Type C — @capacitor/push-notifications types addListener as returning
        // PluginListenerHandle directly, but newer runtime versions return Promise<PluginListenerHandle>.
        // Fix requires a module augmentation or version-pinned type upgrade.
        void (off as unknown as Promise<{ remove: () => void }>).then((h) =>
          h.remove()
        );
        resolve(token.value ?? null);
      });
      // Timeout fallback so we don't hang forever.
      setTimeout(() => resolve(null), 15_000);
    });
  } catch {
    return null;
  }
}

/**
 * Emit a short haptic tap (Light impact) — used on primary CTA button
 * presses. No-op on web.
 */
export async function tap(): Promise<void> {
  if (!isNative()) return;
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {
    // Swallow — haptics are cosmetic, never block.
  }
}

/**
 * Emit a Medium haptic — used to signal a successful outcome (e.g.
 * location autofill succeeded, claim submit succeeded). No-op on web.
 */
export async function mediumTap(): Promise<void> {
  if (!isNative()) return;
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    await Haptics.impact({ style: ImpactStyle.Medium });
  } catch {
    // Swallow — haptics are cosmetic, never block.
  }
}

/**
 * Emit a Heavy haptic — reserved for life-safety affordances (e.g. the
 * "Dial 000" button on /claim and the offline shell). Gives the user
 * tactile confirmation that a high-consequence action has fired, even
 * when they can't look at the screen. No-op on web.
 */
export async function heavyTap(): Promise<void> {
  if (!isNative()) return;
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    await Haptics.impact({ style: ImpactStyle.Heavy });
  } catch {
    // Swallow — haptics are cosmetic, never block.
  }
}

/**
 * Detect online/offline for the offline-shell decision. Web falls back
 * to `navigator.onLine`.
 */
export async function isOnline(): Promise<boolean> {
  if (!isNative()) {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine !== false;
  }
  try {
    const { Network } = await import('@capacitor/network');
    const status = await Network.getStatus();
    return status.connected;
  } catch {
    return true;
  }
}
