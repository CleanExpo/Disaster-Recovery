import * as Sentry from '@sentry/nextjs';

// Only initialise when DSN is configured (no-op in local dev)
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,

    // Performance monitoring — sample 10% of transactions in prod
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Session replay — capture 1% of sessions, 100% of errored sessions
    replaysSessionSampleRate: 0.01,
    replaysOnErrorSampleRate: 1.0,

    integrations: [
      Sentry.replayIntegration(),
      Sentry.browserTracingIntegration(),
    ],

    // Filter out noisy non-actionable errors
    ignoreErrors: [
      'ResizeObserver loop',
      'Non-Error promise rejection captured',
      /^Loading chunk \d+ failed/,
    ],
  });
}
