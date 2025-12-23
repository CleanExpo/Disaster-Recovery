import { NextRequest } from 'next/server';

export function createMockRequest(options: {
  method?: string;
  url?: string;
  headers?: Record<string, string>;
  body?: any;
  searchParams?: Record<string, string>;
} = {}): NextRequest {
  const {
    method = 'GET',
    url = 'http://localhost:3000',
    headers = {},
    body,
    searchParams = {},
  } = options;

  const urlWithParams = new URL(url);
  Object.entries(searchParams).forEach(([key, value]) => {
    urlWithParams.searchParams.set(key, value);
  });

  const requestInit: RequestInit = {
    method,
    headers: new Headers(headers),
  };

  if (body) {
    requestInit.body = JSON.stringify(body);
    if (!headers['content-type']) {
      (requestInit.headers as Headers).set('content-type', 'application/json');
    }
  }

  return new NextRequest(urlWithParams.toString(), requestInit);
}

export function createMockResponse(data: any, status = 200) {
  return {
    json: async () => data,
    status,
    ok: status >= 200 && status < 300,
  };
}
