/**
 * Client-side contractor authentication helper.
 *
 * Auth is httpOnly cookies (dr_access / dr_refresh) set by /api/auth/login
 * and /api/contractor/login. localStorage tokens are cleared on logout for
 * migration cleanup only.
 */

const AUTH_KEY = 'contractorAuth';

/** @deprecated Cookies are authoritative; kept for API compatibility. */
export function getContractorToken(): string | null {
  return null;
}

/** Check whether a contractor profile cache exists (does not validate server-side). */
export function isContractorAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(AUTH_KEY);
}

/**
 * Wrapper around `fetch()` that sends cookies (`credentials: 'include'`).
 * On 401, clears local cache and redirects to contractor login.
 */
export async function contractorFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (response.status === 401) {
    contractorLogout();
  }

  return response;
}

/** Clear auth cookies + local cache and redirect to login. */
export function contractorLogout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('contractorToken');
  localStorage.removeItem('contractorRefreshToken');
  localStorage.removeItem(AUTH_KEY);
  void fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).finally(() => {
    window.location.href = '/contractor/login';
  });
}

/** Store display profile after login (tokens live in httpOnly cookies). */
export function setContractorAuth(data: {
  tokens?: { access: string; refresh: string };
  [key: string]: unknown;
}): void {
  if (typeof window === 'undefined') return;
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
