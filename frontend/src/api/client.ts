type FetchInit = RequestInit & { signal?: AbortSignal };

const BASE_URL = '/api';

const buildUrl = (path: string, params?: Record<string, string | undefined>): string => {
  const url = new URL(`${BASE_URL}${path}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    });
  }
  return url.pathname + url.search;
};

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

const assertJsonResponse = (response: Response, path: string, method: string): void => {
  if (!response.ok) {
    throw new ApiError(response.status, `${method} ${path} failed`);
  }
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new ApiError(response.status, `${method} ${path} returned non-JSON`);
  }
};

export const apiGet = async <T>(
  path: string,
  params?: Record<string, string | undefined>,
  init?: FetchInit,
): Promise<T> => {
  const response = await fetch(buildUrl(path, params), {
    method: 'GET',
    headers: { Accept: 'application/json' },
    ...init,
  });
  assertJsonResponse(response, path, 'GET');
  return (await response.json()) as T;
};

export const apiPost = async <TBody, TResponse>(
  path: string,
  body: TBody,
  init?: FetchInit,
): Promise<TResponse> => {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...init,
  });
  assertJsonResponse(response, path, 'POST');
  return (await response.json()) as TResponse;
};
