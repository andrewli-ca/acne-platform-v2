import { ApiError, type HttpMethod, type RequestConfig } from './types';

/**
 * Base REST API Client
 * Provides common functionality for making HTTP requests
 */
export abstract class BaseRestClient {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Build URL with query parameters
   */
  protected buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    // Handle absolute URLs (from Pokemon API's nested requests)
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      const url = new URL(endpoint);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, String(value));
        });
      }

      return url.toString();
    }

    // Construct URL from base URL and endpoint
    const fullUrl = `${this.baseUrl}${endpoint}`;
    const url = new URL(fullUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  }

  /**
   * Core fetch method with error handling
   */
  protected async fetch<T>(
    endpoint: string,
    method: HttpMethod = 'GET',
    config?: RequestConfig & { body?: unknown }
  ): Promise<T> {
    try {
      const url = this.buildUrl(endpoint, config?.params);

      // Only set Content-Type header if we have a body
      const headers: Record<string, string> = {
        ...config?.headers,
      };

      if (config?.body) {
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, {
        method,
        headers,
        body: config?.body ? JSON.stringify(config.body) : undefined,
      });

      if (!response.ok) {
        throw new ApiError(
          `HTTP error: ${response.status} ${response.statusText}`,
          response.status,
          response.statusText
        );
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        throw new ApiError(`Request failed: ${error.message}`);
      }

      throw new ApiError('Request failed: Unknown error');
    }
  }

  /**
   * GET request helper
   */
  protected async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.fetch<T>(endpoint, 'GET', config);
  }

  /**
   * POST request helper
   */
  protected async post<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.fetch<T>(endpoint, 'POST', { ...config, body });
  }

  /**
   * PUT request helper
   */
  protected async put<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.fetch<T>(endpoint, 'PUT', { ...config, body });
  }

  /**
   * PATCH request helper
   */
  protected async patch<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.fetch<T>(endpoint, 'PATCH', { ...config, body });
  }

  /**
   * DELETE request helper
   */
  protected async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.fetch<T>(endpoint, 'DELETE', config);
  }
}
