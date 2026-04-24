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

/**
 * Returns true only when BOTH the feature flag is on AND we're running
 * inside a Capacitor shell. The flag-off branch must stay zero-impact
 * (no dynamic imports, no bundle bloat).
 */
export function isNative(): boolean {
  if (!FLAG_ENABLED) return false;
  if (typeof window === 'undefined') return false;
  const w = window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } };
  return Boolean(w.Capacitor?.isNativePlatform?.());
}

export function getPlatform(): 'ios' | 'android' | 'web' {
  if (!isNative()) return 'web';
  const w = window as unknown as { Capacitor?: { getPlatform?: () => string } };
  const p = w.Capacitor?.getPlatform?.();
  return p === 'ios' || p === 'android' ? p : 'web';
}

/**
 * Capture a photo for a damage claim. Falls back to HTML
 * `<input type="file" capture="environment">` on web.
 *
 * APP 3 note: the user must have already consented to photo upload
 * before this is called. Caller is responsible for the consent gate.
 */
export async function capturePhoto(): Promise<
  { dataUrl: string; format: string } | null
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
    return { dataUrl: photo.dataUrl, format: photo.format };
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
        // addListener returns a Promise<PluginListenerHandle> on newer
        // Capacitor; cast is defensive.
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
 * Emit a short haptic tap — used on primary CTA buttons + claim submit
 * success. No-op on web.
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
