/**
 * Environment Variable Validation
 *
 * This module validates that all required environment variables are set
 * at application startup, preventing runtime errors due to missing config.
 */

export function validateSecrets(): void {
  const requiredSecrets = [
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'DATABASE_URL',
  ];

  const optionalSecrets = [
    'ANTHROPIC_API_KEY',
    'OPENAI_API_KEY',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_PUBLISHABLE_KEY',
    'EXA_API_KEY',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'REDIS_URL',
  ];

  const missing: string[] = [];

  // Check required secrets
  requiredSecrets.forEach((secret) => {
    if (!process.env[secret]) {
      missing.push(secret);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
      `Please check your .env.local file for configuration instructions.`
    );
  }

  // Log missing optional secrets (development only)
  if (process.env.NODE_ENV === 'development') {
    optionalSecrets.forEach((secret) => {
      if (!process.env[secret]) {
        console.warn(`⚠️  Optional environment variable not set: ${secret}`);
      }
    });
  }

  console.log('✅ Environment variables validated successfully');
}

// Validate on server startup (server-side only)
if (typeof window === 'undefined') {
  try {
    validateSecrets();
  } catch (error) {
    console.error('❌ Secret validation failed:', error);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}
