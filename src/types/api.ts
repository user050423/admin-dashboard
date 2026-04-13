/**
 * API Response/Request Types
 */

/**
 * Generic API Response Wrapper
 */
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  timestamp: string
  statusCode: number
}

/**
 * Generic API Error Response
 */
export interface ApiErrorResponse {
  success: false
  message: string
  errors?: Record<string, string[]>
  timestamp: string
  statusCode: number
}

/**
 * Request options
 */
export interface RequestOptions {
  headers?: Record<string, string>
  params?: Record<string, any>
  timeout?: number
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number
  pageSize: number
  total: number
  totalPages: number
  hasMore: boolean
}

/**
 * Paginated API Response
 */
export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta
}
