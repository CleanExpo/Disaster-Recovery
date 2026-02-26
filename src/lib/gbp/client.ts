// ============================================================
// GBP API Client — Google Business Profile posting via OAuth2
// UNI-768: Server-to-server GBP automation
// ============================================================

/**
 * Environment variables required:
 *   GBP_CLIENT_ID       — Google Cloud OAuth2 client ID
 *   GBP_CLIENT_SECRET   — Google Cloud OAuth2 client secret
 *   GBP_REFRESH_TOKEN   — Long-lived refresh token (obtained once via consent screen)
 *   GBP_ACCOUNT_ID      — My Business account ID (e.g. "accounts/123456789")
 *   GBP_LOCATION_ID     — Location resource name (e.g. "locations/987654321")
 *   GBP_ENABLED         — Kill switch ("true" to enable, anything else to skip)
 */

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const GBP_API_BASE = 'https://mybusinessbusinessinformation.googleapis.com/v1';
const GBP_POSTS_BASE = 'https://mybusiness.googleapis.com/v4';

// ─── Token cache (in-memory, per invocation) ────────────────

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

/**
 * Exchange a refresh token for a fresh access token.
 * Caches the token for the lifetime of the serverless invocation.
 */
export async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.accessToken;
  }

  const clientId = process.env.GBP_CLIENT_ID;
  const clientSecret = process.env.GBP_CLIENT_SECRET;
  const refreshToken = process.env.GBP_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing GBP OAuth2 credentials (GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN)');
  }

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GBP token refresh failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  cachedToken = {
    accessToken: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };

  return cachedToken.accessToken;
}

// ─── Post creation ──────────────────────────────────────────

export interface GBPPostPayload {
  /** Post body text (max 1,500 chars) */
  summary: string;
  /** Topic type: STANDARD, OFFER, or EVENT */
  topicType: string;
  /** Call-to-action */
  callToAction?: {
    actionType: 'LEARN_MORE' | 'BOOK' | 'ORDER' | 'SHOP' | 'SIGN_UP' | 'CALL' | 'GET_OFFER';
    url: string;
  };
}

/**
 * Map our CTA text to GBP's enum action types.
 */
export function mapCtaAction(ctaText: string): GBPPostPayload['callToAction']['actionType'] {
  const lower = ctaText.toLowerCase();
  if (lower.includes('book') || lower.includes('start')) return 'BOOK';
  if (lower.includes('get') || lower.includes('help') || lower.includes('emergency')) return 'GET_OFFER';
  if (lower.includes('submit') || lower.includes('claim')) return 'SIGN_UP';
  if (lower.includes('check') || lower.includes('coverage')) return 'LEARN_MORE';
  if (lower.includes('prepared') || lower.includes('read') || lower.includes('learn')) return 'LEARN_MORE';
  return 'LEARN_MORE';
}

/**
 * Create a local post on the Google Business Profile.
 */
export async function createLocalPost(payload: GBPPostPayload): Promise<{
  success: boolean;
  postName?: string;
  error?: string;
}> {
  const accountId = process.env.GBP_ACCOUNT_ID;
  const locationId = process.env.GBP_LOCATION_ID;

  if (!accountId || !locationId) {
    throw new Error('Missing GBP_ACCOUNT_ID or GBP_LOCATION_ID');
  }

  const accessToken = await getAccessToken();

  // GBP local posts endpoint (v4 API)
  const url = `${GBP_POSTS_BASE}/${accountId}/${locationId}/localPosts`;

  const body: Record<string, unknown> = {
    languageCode: 'en-AU',
    summary: payload.summary.slice(0, 1500), // Enforce max length
    topicType: payload.topicType,
  };

  if (payload.callToAction) {
    body.callToAction = payload.callToAction;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    return {
      success: false,
      error: `GBP API error (${res.status}): ${errorBody}`,
    };
  }

  const result = await res.json();
  return {
    success: true,
    postName: result.name,
  };
}

/**
 * Check if GBP automation is enabled.
 */
export function isGBPEnabled(): boolean {
  return process.env.GBP_ENABLED === 'true';
}

/**
 * Validate that all required environment variables are set.
 * Returns a list of missing variable names.
 */
export function validateGBPConfig(): string[] {
  const required = [
    'GBP_CLIENT_ID',
    'GBP_CLIENT_SECRET',
    'GBP_REFRESH_TOKEN',
    'GBP_ACCOUNT_ID',
    'GBP_LOCATION_ID',
  ];
  return required.filter((key) => !process.env[key]);
}
