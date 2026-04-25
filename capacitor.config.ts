import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Capacitor config for Disaster Recovery iOS app.
 *
 * Phase 1 scaffold. Native iOS project is NOT yet generated via
 * `npx cap add ios` — that requires macOS + Xcode and happens in CI
 * (GitHub Actions macOS runner) or on Phill's Mac when the Apple
 * Developer Team ID is available.
 *
 * When NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED is 'false' (default),
 * web remains unaffected — this config file is inert.
 *
 * Team ID + signing identity live in Xcode project settings, NOT here.
 * NOT LEGAL ADVICE.
 */
const config: CapacitorConfig = {
  appId: 'au.com.disasterrecovery.app',
  appName: 'Disaster Recovery',
  // In production, the app loads the live site in a WKWebView. The
  // offline shell (/offline) is pre-cached by the service worker and
  // serves as a fallback when the device has no signal — critical for
  // emergency flood/fire scenarios where users need the 000 call
  // button without network.
  webDir: 'public',
  server: {
    url: 'https://disasterrecovery.com.au',
    cleartext: false,
    // allowNavigation locks the WKWebView to our domain + subdomains
    // so a compromised link can't redirect into an attacker's site.
    allowNavigation: ['disasterrecovery.com.au', '*.disasterrecovery.com.au'],
  },
  ios: {
    // Content inset matches the notch/Dynamic Island on modern iPhones.
    contentInset: 'always',
    // Allow WKWebView to use low-power mode for media playback
    // (matters for damage-photo review).
    limitsNavigationsToAppBoundDomains: false,
    // Scheme used for deep links (drau://claim/abc123).
    scheme: 'DisasterRecovery',
  },
  plugins: {
    PushNotifications: {
      // Prompt for permission on first claim-status subscription, NOT
      // on app launch (APP 3 minimisation + Apple review preference).
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    SplashScreen: {
      launchShowDuration: 800,
      backgroundColor: '#0f172a', // slate-900 (matches hero)
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#60a5fa', // blue-400
    },
  },
};

export default config;
