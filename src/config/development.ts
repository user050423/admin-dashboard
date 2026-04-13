/**
 * Development Configuration
 * 
 * Override or extend the API service behavior during development
 */

/**
 * Development mode flag
 * Set to false to use real API calls
 */
export const USE_MOCK_DATA = true

/**
 * Mock API response delay (ms)
 * Simulates network latency
 */
export const MOCK_API_DELAY = 1500

/**
 * Enable API request logging
 */
export const LOG_API_REQUESTS = true

/**
 * Enable API response logging
 */
export const LOG_API_RESPONSES = true

/**
 * Enable error logging
 */
export const LOG_API_ERRORS = true

/**
 * API request timeout (ms)
 */
export const API_TIMEOUT = 30000

/**
 * Number of retry attempts for failed requests
 */
export const MAX_RETRIES = 3

/**
 * Retry delay multiplier (exponential backoff)
 */
export const RETRY_DELAY_MS = 1000

/**
 * Session storage key for auth token
 */
export const AUTH_TOKEN_KEY = 'authToken'

/**
 * Session storage key for user data
 */
export const USER_DATA_KEY = 'userData'
