// API Documentation Types

export interface APIEndpoint {
  id: string;
  method: HTTPMethod;
  path: string;
  category: string;
  description: string;
  summary?: string;
  authentication: AuthenticationType;
  rateLimit?: RateLimit;
  parameters?: APIParameter[];
  requestBody?: APIRequestBody;
  responses: APIResponse[];
  examples?: APIExample[];
  webhooks?: WebhookEvent[];
  deprecated?: boolean;
  version: string;
  tags?: string[];
}

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type AuthenticationType = 'none' | 'api_key' | 'bearer_token' | 'oauth2' | 'basic';

export interface APIParameter {
  name: string;
  in: 'path' | 'query' | 'header';
  description: string;
  required: boolean;
  type: DataType;
  format?: string;
  default?: any;
  example?: any;
  enum?: string[];
  min?: number;
  max?: number;
  pattern?: string;
}

export interface APIRequestBody {
  description: string;
  required: boolean;
  content: {
    [mediaType: string]: {
      schema: APISchema;
      examples?: {
        [name: string]: {
          value: any;
          description?: string;
        };
      };
    };
  };
}

export interface APIResponse {
  status: number;
  description: string;
  content?: {
    [mediaType: string]: {
      schema: APISchema;
      example?: any;
    };
  };
  headers?: {
    [name: string]: {
      description: string;
      schema: APISchema;
    };
  };
}

export interface APISchema {
  type: DataType;
  format?: string;
  description?: string;
  properties?: {
    [key: string]: APISchema;
  };
  required?: string[];
  items?: APISchema;
  enum?: any[];
  example?: any;
  nullable?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  minimum?: number;
  maximum?: number;
  pattern?: string;
}

export type DataType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'null';

export interface APIExample {
  name: string;
  description?: string;
  language: ProgrammingLanguage;
  code: string;
  request?: {
    method: HTTPMethod;
    url: string;
    headers?: Record<string, string>;
    body?: any;
  };
  response?: {
    status: number;
    headers?: Record<string, string>;
    body?: any;
  };
}

export type ProgrammingLanguage = 'curl' | 'javascript' | 'typescript' | 'python' | 'php' | 'ruby' | 'go' | 'csharp' | 'java';

export interface RateLimit {
  requests: number;
  window: string; // e.g., "1m", "1h", "1d"
  burst?: number;
  scope: 'user' | 'api_key' | 'ip' | 'global';
  headers?: {
    limit: string;
    remaining: string;
    reset: string;
  };
}

export interface WebhookEvent {
  name: string;
  description: string;
  payload: APISchema;
  headers?: Record<string, string>;
  retries?: {
    enabled: boolean;
    maxAttempts: number;
    backoff: 'linear' | 'exponential';
  };
  security?: {
    signatureHeader: string;
    signatureAlgorithm: string;
  };
}

export interface APIError {
  code: string;
  message: string;
  status: number;
  details?: string;
  fields?: Record<string, string[]>;
}

export interface APICategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  order: number;
  endpoints: APIEndpoint[];
}

export interface SDKInfo {
  language: ProgrammingLanguage;
  name: string;
  version: string;
  repository?: string;
  documentation?: string;
  packageManager?: string;
  installCommand?: string;
  quickStart?: string;
}

export interface APICredentials {
  type: AuthenticationType;
  apiKey?: string;
  clientId?: string;
  clientSecret?: string;
  scope?: string[];
  redirectUri?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  environment: 'sandbox' | 'production';
}

export interface APIUsageMetrics {
  period: 'hour' | 'day' | 'week' | 'month';
  requests: {
    total: number;
    successful: number;
    failed: number;
    byEndpoint: Record<string, number>;
  };
  rateLimit: {
    limit: number;
    used: number;
    remaining: number;
    resetsAt: Date;
  };
  latency: {
    average: number;
    p50: number;
    p95: number;
    p99: number;
  };
  errors: {
    total: number;
    byCode: Record<string, number>;
  };
}

export interface APIChangelog {
  version: string;
  date: Date;
  changes: {
    type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
    description: string;
    endpoints?: string[];
  }[];
}

// API Documentation Navigation
export interface APIDocSection {
  id: string;
  title: string;
  description: string;
  icon?: string;
  subsections?: APIDocSection[];
  content?: string; // Markdown content
  endpoints?: APIEndpoint[];
  examples?: APIExample[];
}

// Postman/OpenAPI Integration
export interface APICollection {
  name: string;
  description: string;
  format: 'postman' | 'openapi' | 'insomnia';
  version: string;
  downloadUrl: string;
  lastUpdated: Date;
}

// API Key Management
export interface APIKey {
  id: string;
  name: string;
  key: string;
  maskedKey: string; // e.g., "sk_live_abc...xyz"
  environment: 'sandbox' | 'production';
  createdAt: Date;
  lastUsed?: Date;
  expiresAt?: Date;
  permissions: string[];
  rateLimit?: RateLimit;
  status: 'active' | 'inactive' | 'revoked';
  usageCount: number;
}

// Constants
export const API_BASE_URLS = {
  sandbox: 'https://sandbox-api.nrp.com.au/v1',
  production: 'https://api.nrp.com.au/v1'
};

export const API_VERSIONS = ['v1', 'v2-beta'];

export const RESPONSE_CODES = {
  200: 'OK - Request successful',
  201: 'Created - Resource created successfully',
  204: 'No Content - Request successful, no content to return',
  400: 'Bad Request - Invalid request parameters',
  401: 'Unauthorized - Authentication required',
  403: 'Forbidden - Insufficient permissions',
  404: 'Not Found - Resource not found',
  409: 'Conflict - Resource already exists',
  422: 'Unprocessable Entity - Validation errors',
  429: 'Too Many Requests - Rate limit exceeded',
  500: 'Internal Server Error - Server error occurred',
  503: 'Service Unavailable - Service temporarily unavailable'
};

export const AUTH_FLOWS = {
  apiKey: {
    name: 'API Key',
    description: 'Use API keys for server-to-server communication',
    header: 'X-API-Key'
  },
  oauth2: {
    name: 'OAuth 2.0',
    description: 'OAuth 2.0 flow for user authentication',
    authUrl: 'https://auth.nrp.com.au/oauth/authorize',
    tokenUrl: 'https://auth.nrp.com.au/oauth/token',
    scopes: {
      'read:profile': 'Read user profile',
      'write:profile': 'Update user profile',
      'read:jobs': 'View jobs and leads',
      'write:jobs': 'Update job status',
      'read:compliance': 'View compliance status',
      'write:compliance': 'Update compliance documents',
      'read:billing': 'View billing information',
      'write:billing': 'Process payments'
    }
  },
  jwt: {
    name: 'JWT Bearer Token',
    description: 'JSON Web Token for API authentication',
    header: 'Authorization',
    prefix: 'Bearer'
  }
};

export const WEBHOOK_EVENTS = [
  'user.created',
  'user.updated',
  'user.deleted',
  'user.verified',
  'job.created',
  'job.assigned',
  'job.updated',
  'job.completed',
  'job.cancelled',
  'compliance.expiring',
  'compliance.expired',
  'compliance.renewed',
  'document.uploaded',
  'document.verified',
  'document.rejected',
  'payment.completed',
  'payment.failed',
  'subscription.created',
  'subscription.updated',
  'subscription.cancelled'
];

export const CODE_EXAMPLES: Record<ProgrammingLanguage, {
  name: string;
  extension: string;
  highlight: string;
}> = {
  curl: { name: 'cURL', extension: 'sh', highlight: 'bash' },
  javascript: { name: 'JavaScript', extension: 'js', highlight: 'javascript' },
  typescript: { name: 'TypeScript', extension: 'ts', highlight: 'typescript' },
  python: { name: 'Python', extension: 'py', highlight: 'python' },
  php: { name: 'PHP', extension: 'php', highlight: 'php' },
  ruby: { name: 'Ruby', extension: 'rb', highlight: 'ruby' },
  go: { name: 'Go', extension: 'go', highlight: 'go' },
  csharp: { name: 'C#', extension: 'cs', highlight: 'csharp' },
  java: { name: 'Java', extension: 'java', highlight: 'java' }
};