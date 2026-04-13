/**
 * Base API Service Class
 * Handles all HTTP requests with error handling and response transformation
 */

import { ApiResponse, ApiErrorResponse } from '../types/api'

export class ApiService {
  private baseUrl: string
  private defaultTimeout: number = 30000 // 30 seconds

  constructor(baseUrl: string = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api') {
    this.baseUrl = baseUrl
  }

  /**
   * Make a GET request
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, params, headers)
  }

  /**
   * Make a POST request
   */
  async post<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, undefined, headers)
  }

  /**
   * Make a PUT request
   */
  async put<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data, undefined, headers)
  }

  /**
   * Make a PATCH request
   */
  async patch<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, data, undefined, headers)
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, undefined, headers)
  }

  /**
   * Core request method
   */
  private async request<T>(
    method: string,
    endpoint: string,
    body?: any,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint, params)

    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...this.getAuthHeaders(),
      ...headers,
    }

    const config: RequestInit = {
      method,
      headers: defaultHeaders,
      signal: this.getAbortSignal(),
    }

    if (body) {
      config.body = JSON.stringify(body)
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP Error: ${response.status}`)
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
        timestamp: new Date().toISOString(),
        statusCode: response.status,
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      throw {
        success: false,
        message: errorMessage,
        timestamp: new Date().toISOString(),
        statusCode: 500,
      } as ApiErrorResponse
    }
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    let url = `${this.baseUrl}${endpoint}`

    if (params) {
      const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          if (value !== null && value !== undefined) {
            acc[key] = String(value)
          }
          return acc
        }, {} as Record<string, string>)
      ).toString()

      if (queryString) {
        url += `?${queryString}`
      }
    }

    return url
  }

  /**
   * Get authentication headers (from localStorage or session)
   */
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('authToken')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  /**
   * Get abort signal for request timeout
   */
  private getAbortSignal(): AbortSignal {
    return AbortSignal.timeout(this.defaultTimeout)
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token)
  }

  /**
   * Clear authentication token
   */
  clearAuthToken(): void {
    localStorage.removeItem('authToken')
  }
}

// Export singleton instance
export const apiService = new ApiService()
