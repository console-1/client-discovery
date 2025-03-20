import { AuthError } from '@supabase/supabase-js';

export enum AuthErrorCode {
  INVALID_EMAIL = 'INVALID_EMAIL',
  NETWORK_ERROR = 'NETWORK_ERROR',
  RATE_LIMITED = 'RATE_LIMITED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  TOKEN_REFRESH_FAILED = 'TOKEN_REFRESH_FAILED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface AuthErrorDetails {
  code: AuthErrorCode;
  message: string;
  retryable: boolean;
  suggestedAction?: string;
}

export class AuthenticationError extends Error {
  constructor(
    public readonly details: AuthErrorDetails,
    public readonly originalError?: Error
  ) {
    super(details.message);
    this.name = 'AuthenticationError';
  }
}

export function handleAuthError(error: AuthError | Error): AuthErrorDetails {
  if ('status' in error && error.status === 429) {
    return {
      code: AuthErrorCode.RATE_LIMITED,
      message: 'Too many attempts. Please try again later.',
      retryable: false,
      suggestedAction: 'Please wait a few minutes before trying again.'
    };
  }

  if (error.message?.includes('network')) {
    return {
      code: AuthErrorCode.NETWORK_ERROR,
      message: 'Network connection error. Please check your internet connection.',
      retryable: true,
      suggestedAction: 'Check your internet connection and try again.'
    };
  }

  if (error.message?.includes('expired')) {
    return {
      code: AuthErrorCode.SESSION_EXPIRED,
      message: 'Your session has expired.',
      retryable: true,
      suggestedAction: 'Please sign in again to continue.'
    };
  }

  return {
    code: AuthErrorCode.UNKNOWN_ERROR,
    message: 'An unexpected error occurred.',
    retryable: true,
    suggestedAction: 'Please try again or contact support if the issue persists.'
  };
}

export const MAX_RETRY_ATTEMPTS = 3;
export const RETRY_DELAY_MS = 1000; // 1 second

export async function withRetry<T>(
  operation: () => Promise<T>,
  maxAttempts: number = MAX_RETRY_ATTEMPTS,
  delayMs: number = RETRY_DELAY_MS
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      const errorDetails = handleAuthError(error as AuthError);
      
      if (!errorDetails.retryable || attempt === maxAttempts) {
        throw new AuthenticationError(errorDetails, lastError);
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
    }
  }

  throw lastError;
} 