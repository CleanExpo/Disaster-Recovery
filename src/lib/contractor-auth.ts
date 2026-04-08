/**
 * Client-side contractor authentication helper.
 *
 * All contractor portal/onboarding pages use this module to make
 * authenticated API calls. The JWT is stored in localStorage after
 * a successful login via /api/contractor/login.
 *
 * IMPORTANT: The server-side auth middleware reads the header as
 * `authorisation` (British spelling) — see src/lib/auth-middleware.ts:44.
 */

const TOKEN_KEY = 'contractorToken';
const REFRESH_KEY = 'contractorRefreshToken';
const AUTH_KEY = 'contractorAuth';

/** Read the current access token from localStorage. */
export function getContractorToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

/** Check whether a contractor token exists (does not validate server-side). */
export function isContractorAuthenticated(): boolean {
  return !!getContractorToken();
}

/**
 * Wrapper around `fetch()` that automatically adds the contractor JWT
 * in the `Authorisation` header (British spelling — matches middleware).
 *
 * On 401 response, clears auth state and redirects to login.
 */
export async function contractorFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = getContractorToken();

  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorisation', `Bearer ${token}`);
  }
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, { ...options, headers });

  // Auto-logout on 401 Unauthorised
  if (response.status === 401) {
    contractorLogout();
  }

  return response;
}

/** Clear all contractor auth state and redirect to login. */
export function contractorLogout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(AUTH_KEY);
  window.location.href = '/contractor/login';
}

/** Store tokens + profile data after a successful login. */
export function setContractorAuth(data: {
  tokens: { access: string; refresh: string };
  [key: string]: unknown;
}): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, data.tokens.access);
  localStorage.setItem(REFRESH_KEY, data.tokens.refresh);
  // Store non-sensitive display data for client-side use
  const { tokens: _tokens, ...profile } = data;
  localStorage.setItem(AUTH_KEY, JSON.stringify(profile));
}

/** Read the stored contractor profile (non-sensitive display data). */
export function getContractorProfile(): Record<string, unknown> | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
