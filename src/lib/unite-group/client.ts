/**
 * Unite-Group API Client
 * DR-281: Setup & Auth — base API client with retry logic
 */

interface UniteGroupConfig {
  baseUrl: string;
  apiKey: string;
  timeout?: number;
  maxRetries?: number;
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  ok: boolean;
}

class UniteGroupApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'UniteGroupApiError';
  }
}

export class UniteGroupClient {
  private baseUrl: string;
  private apiKey: string;
  private timeout: number;
  private maxRetries: number;

  constructor(config?: Partial<UniteGroupConfig>) {
    this.baseUrl = config?.baseUrl || process.env.UNITE_GROUP_API_URL || '';
    this.apiKey = config?.apiKey || process.env.UNITE_GROUP_API_KEY || '';
    this.timeout = config?.timeout || 30000;
    this.maxRetries = config?.maxRetries || 3;
  }

  private async request<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { method = 'GET', body, headers = {}, params } = options;

    let url = `${this.baseUrl}${path}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
            'X-Client': 'disaster-recovery-platform',
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          throw new UniteGroupApiError(
            (errorBody as Record<string, string>).message || `API error: ${response.status}`,
            response.status,
            (errorBody as Record<string, string>).code
          );
        }

        const data = await response.json() as T;
        return { data, status: response.status, ok: true };
      } catch (error) {
        lastError = error as Error;

        // Don't retry on client errors (4xx)
        if (error instanceof UniteGroupApiError && error.status >= 400 && error.status < 500) {
          throw error;
        }

        // Retry on server errors and network failures
        if (attempt < this.maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError || new Error('Request failed after retries');
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'GET', params });
  }

  async post<T>(path: string, body: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'POST', body });
  }

  async put<T>(path: string, body: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'PUT', body });
  }

  async patch<T>(path: string, body: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'PATCH', body });
  }

  async delete<T>(path: string): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'DELETE' });
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.get('/health');
      return true;
    } catch {
      return false;
    }
  }
}

// Singleton instance
let clientInstance: UniteGroupClient | null = null;

export function getUniteGroupClient(): UniteGroupClient {
  if (!clientInstance) {
    clientInstance = new UniteGroupClient();
  }
  return clientInstance;
}

export { UniteGroupApiError };
