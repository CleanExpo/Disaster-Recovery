export type DisasterRecoveryConnectionId =
  | 'database'
  | 'auth'
  | 'supabase'
  | 'ai_anthropic'
  | 'ai_openai'
  | 'voice_elevenlabs'
  | 'stripe'
  | 'email'
  | 'sms_twilio'
  | 'unite_group';

export type DisasterRecoveryConnectionState =
  | 'connected'
  | 'ready'
  | 'mock'
  | 'blocked'
  | 'unknown';

export type DisasterRecoveryConnection = {
  id: DisasterRecoveryConnectionId;
  label: string;
  state: DisasterRecoveryConnectionState;
  safeForMissionControl: boolean;
  detail: string;
  endpoint?: string;
  nextAction?: string;
};

export type DisasterRecoveryConnectionStatus = {
  source: 'disaster-recovery:connection-status';
  generatedAt: string;
  project: {
    slug: 'disaster-recovery';
    repo: 'CleanExpo/Disaster-Recovery';
    service: 'disaster-recovery-web';
    environment: string;
  };
  summary: Record<DisasterRecoveryConnectionState, number> & { total: number };
  connections: DisasterRecoveryConnection[];
};

function envSet(name: string, env: NodeJS.ProcessEnv): boolean {
  return Boolean(env[name]?.trim());
}

function connectionSummary(
  connections: DisasterRecoveryConnection[],
): DisasterRecoveryConnectionStatus['summary'] {
  return {
    total: connections.length,
    connected: connections.filter((c) => c.state === 'connected').length,
    ready: connections.filter((c) => c.state === 'ready').length,
    mock: connections.filter((c) => c.state === 'mock').length,
    blocked: connections.filter((c) => c.state === 'blocked').length,
    unknown: connections.filter((c) => c.state === 'unknown').length,
  };
}

/**
 * Presence-only readiness manifest for Unite-Group Mission Control polling.
 * States are derived from env-var presence, never from secret values, and no
 * secret material is ever included in the payload. "connected" is reserved
 * for infrastructure the app cannot boot without; integrations whose live
 * use is still gated report "ready" at best.
 */
export function buildDisasterRecoveryConnectionStatus(
  env: NodeJS.ProcessEnv = process.env,
  now = new Date().toISOString(),
): DisasterRecoveryConnectionStatus {
  const environment = env.VERCEL_ENV?.trim() || env.NODE_ENV?.trim() || 'development';

  const databaseReady = envSet('DATABASE_URL', env);
  const authReady = envSet('NEXTAUTH_SECRET', env) && envSet('NEXTAUTH_URL', env);
  const supabaseReady =
    envSet('NEXT_PUBLIC_SUPABASE_URL', env) && envSet('NEXT_PUBLIC_SUPABASE_ANON_KEY', env);
  const anthropicReady = envSet('ANTHROPIC_API_KEY', env);
  const openaiReady = envSet('OPENAI_API_KEY', env);
  const elevenLabsReady = envSet('ELEVENLABS_API_KEY', env);
  const stripeReady = envSet('STRIPE_SECRET_KEY', env);
  const stripeWebhookReady = envSet('STRIPE_WEBHOOK_SECRET', env);
  const emailReady = envSet('RESEND_API_KEY', env);
  const twilioReady = envSet('TWILIO_ACCOUNT_SID', env) && envSet('TWILIO_AUTH_TOKEN', env);

  const connections: DisasterRecoveryConnection[] = [
    {
      id: 'database',
      label: 'Primary database (Prisma)',
      state: databaseReady ? 'connected' : 'blocked',
      safeForMissionControl: true,
      detail: databaseReady
        ? 'DATABASE_URL is configured; metadata only exposed.'
        : 'DATABASE_URL is not set — Prisma cannot connect.',
      nextAction: databaseReady ? undefined : 'Set DATABASE_URL in the deploy environment.',
    },
    {
      id: 'auth',
      label: 'Authentication (NextAuth)',
      state: authReady ? 'connected' : 'blocked',
      safeForMissionControl: true,
      detail: authReady
        ? 'NextAuth secret and canonical URL are present.'
        : 'NEXTAUTH_SECRET and NEXTAUTH_URL are required for sign-in.',
      nextAction: authReady ? undefined : 'Set NEXTAUTH_SECRET and NEXTAUTH_URL.',
    },
    {
      id: 'supabase',
      label: 'Supabase',
      state: supabaseReady ? 'ready' : 'blocked',
      safeForMissionControl: true,
      detail: supabaseReady
        ? 'Supabase URL and anon key are present; Prisma remains the primary datastore.'
        : 'NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required.',
      nextAction: supabaseReady ? undefined : 'Set the Supabase public env pair.',
    },
    {
      id: 'ai_anthropic',
      label: 'Anthropic AI',
      state: anthropicReady ? 'ready' : 'blocked',
      safeForMissionControl: true,
      detail: anthropicReady
        ? 'Anthropic key present; AI features can run (billing applies on use).'
        : 'ANTHROPIC_API_KEY is not set — AI features degrade.',
      nextAction: anthropicReady ? undefined : 'Set ANTHROPIC_API_KEY.',
    },
    {
      id: 'ai_openai',
      label: 'OpenAI',
      state: openaiReady ? 'ready' : 'blocked',
      safeForMissionControl: true,
      detail: openaiReady
        ? 'OpenAI key present; secondary AI provider available.'
        : 'OPENAI_API_KEY is not set — OpenAI-backed features degrade.',
      nextAction: openaiReady ? undefined : 'Set OPENAI_API_KEY.',
    },
    {
      id: 'voice_elevenlabs',
      label: 'Voice agents (ElevenLabs)',
      state: elevenLabsReady ? 'ready' : 'blocked',
      safeForMissionControl: true,
      detail: elevenLabsReady
        ? 'ElevenLabs key present; voice agents remain feature-flag gated.'
        : 'ELEVENLABS_API_KEY is not set — voice agents are unavailable.',
      nextAction: elevenLabsReady ? undefined : 'Set ELEVENLABS_API_KEY.',
    },
    {
      id: 'stripe',
      label: 'Payments (Stripe)',
      state: stripeReady ? 'ready' : 'blocked',
      safeForMissionControl: true,
      detail: stripeReady
        ? stripeWebhookReady
          ? 'Stripe secret and webhook secret present; production checkout remains human-gated.'
          : 'Stripe secret present but STRIPE_WEBHOOK_SECRET is missing — webhooks will fail.'
        : 'STRIPE_SECRET_KEY is not set.',
      nextAction: stripeReady
        ? stripeWebhookReady
          ? undefined
          : 'Set STRIPE_WEBHOOK_SECRET.'
        : 'Set the Stripe key pair.',
    },
    {
      id: 'email',
      label: 'Transactional email (Resend)',
      state: emailReady ? 'ready' : 'blocked',
      safeForMissionControl: true,
      detail: emailReady
        ? 'Resend key present; claim submission notifications can send.'
        : 'RESEND_API_KEY is not set — src/lib/env.ts treats it as required; sends are skipped and claim notifications are not delivered.',
      nextAction: emailReady ? undefined : 'Set RESEND_API_KEY and RESEND_FROM_EMAIL.',
    },
    {
      id: 'sms_twilio',
      label: 'SMS and voice calls (Twilio)',
      state: twilioReady ? 'ready' : 'blocked',
      safeForMissionControl: true,
      detail: twilioReady
        ? 'Twilio credential pair present; outbound messaging remains policy-gated.'
        : 'TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required for SMS/voice.',
      nextAction: twilioReady ? undefined : 'Set the Twilio credential pair.',
    },
    {
      id: 'unite_group',
      label: 'Unite-Group Mission Control',
      state: 'ready',
      safeForMissionControl: true,
      detail:
        'This manifest is designed for Unite-Group to poll and show Disaster-Recovery readiness without secrets.',
      endpoint: '/api/v1/connections/status',
      nextAction: 'Add this endpoint to the Unite-Group project registry.',
    },
  ];

  return {
    source: 'disaster-recovery:connection-status',
    generatedAt: now,
    project: {
      slug: 'disaster-recovery',
      repo: 'CleanExpo/Disaster-Recovery',
      service: 'disaster-recovery-web',
      environment,
    },
    summary: connectionSummary(connections),
    connections,
  };
}
