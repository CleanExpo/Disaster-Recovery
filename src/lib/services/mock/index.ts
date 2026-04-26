/**
 * Mock Service Layer
 * Provides fully functional mock implementations for all external services
 * Automatically used when API keys are not present.
 *
 * SAFETY: hard-fails if imported in production. Mocks are dev/test only —
 * production must use real services (Stripe, Supabase, Twilio, etc.).
 * If an import path accidentally pulls these into a production bundle, the
 * fail-fast below makes it loud rather than silently serving fake data.
 * Health-check audit finding A13 (P3, 2026-04-26).
 */

if (process.env.NODE_ENV === 'production' && process.env.ALLOW_MOCKS_IN_PRODUCTION !== 'true') {
  throw new Error(
    'Mock services imported in production. Mocks are dev/test only. ' +
      'If you genuinely need mocks in prod (e.g. for a staging-like environment), set ' +
      "ALLOW_MOCKS_IN_PRODUCTION='true' explicitly. Otherwise, find the import that " +
      'pulled src/lib/services/mock into the build and replace with real service clients.',
  );
}

import { mockStripeService } from './mockStripe';
import { mockEmailService } from './mockEmail';
import { mockSMSService } from './mockSMS';
import { mockAIService } from './mockAI';
import { mockInsuranceService } from './mockInsurance';
import { mockBackgroundCheckService } from './mockBackgroundCheck';
import { mockGeocodeService } from './mockGeocode';
import { mockCleanClaimsService } from './mockCleanClaims';
import { mockDatabaseService } from './mockDatabase';

// Service detection - automatically use mock when keys missing
export const isProductionMode = () => {
  return !!(
    process.env.STRIPE_SECRET_KEY &&
    process.env.OPENROUTER_API_KEY &&
    process.env.ANTHROPIC_API_KEY &&
    process.env.EMAIL_SERVER_HOST
  );
};

// Service factory - returns mock or real service based on environment
export const getService = (serviceName: string) => {
  const isMockMode = !isProductionMode();

  if (isMockMode) {
    clientLogger.info(`🎭 Using MOCK ${serviceName} service (Demo Mode)`, { source: 'mock/index' });
  }

  const services: Record<string, any> = {
    stripe: isMockMode ? mockStripeService : null, // Real service imported when needed
    email: isMockMode ? mockEmailService : null,
    sms: isMockMode ? mockSMSService : null,
    ai: isMockMode ? mockAIService : null,
    insurance: isMockMode ? mockInsuranceService : null,
    backgroundCheck: isMockMode ? mockBackgroundCheckService : null,
    geocode: isMockMode ? mockGeocodeService : null,
    cleanClaims: isMockMode ? mockCleanClaimsService : null,
    database: mockDatabaseService, // Always use mock for demo
  };

  return services[serviceName];
};

// Demo data notification banner
export const getDemoModeStatus = () => {
  if (!isProductionMode()) {
    return {
      isDemo: true,
      message: '🎭 Demo Mode Active - Using Mock Data for Investor Presentation',
      features: {
        payments: 'Simulated (Stripe keys not configured)',
        ai: 'Mock responses (AI keys not configured)',
        email: 'Console logging (SMTP not configured)',
        sms: 'Simulated (Twilio not configured)',
        insurance: 'Mock verification (APIs not configured)',
        backgroundChecks: 'Auto-approved (PISA not configured)',
      },
    };
  }

  return {
    isDemo: false,
    message: '✅ Production Mode Active',
    features: {
      payments: 'Live Stripe processing',
      ai: 'OpenRouter + Anthropic active',
      email: 'SMTP active',
      sms: 'Twilio active',
      insurance: 'Live verification',
      backgroundChecks: 'PISA integration active',
    },
  };
};
import { clientLogger } from '@/lib/observability/client-logger';
