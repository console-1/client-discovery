import { createClient, Session } from '@supabase/supabase-js';
import { withRetry, AuthenticationError, handleAuthError } from './authErrors';
import { isRateLimited, recordLoginAttempt, logAuditEvent, AuditEventType } from './security';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Session timeout in minutes (default: 60 minutes)
export const SESSION_TIMEOUT = 60;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Enable session persistence by default
    autoRefreshToken: true, // Enable automatic token refresh
    detectSessionInUrl: true, // Detect session from URL on initial load
  },
});

/**
 * Sign in with email magic link (passwordless)
 * @param email User's email address
 * @param rememberMe Whether to persist the session
 * @returns Promise with sign in operation result
 */
export const signInWithMagicLink = async (email: string, rememberMe: boolean = false) => {
  try {
    // Check rate limiting before attempting login
    if (isRateLimited(email)) {
      logAuditEvent(AuditEventType.RATE_LIMIT_EXCEEDED, { email });
      throw new Error('Too many login attempts. Please try again later.');
    }

    // Record the login attempt
    recordLoginAttempt(email);
    logAuditEvent(AuditEventType.LOGIN_ATTEMPT, { email });

    return await withRetry(async () => {
      const result = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            remember_me: rememberMe,
          },
        },
      });

      if (result.error) {
        logAuditEvent(AuditEventType.LOGIN_FAILURE, { 
          email, 
          error: result.error,
          details: { errorMessage: result.error.message }
        });
        throw result.error;
      }

      logAuditEvent(AuditEventType.LOGIN_SUCCESS, { email });
      return result;
    });
  } catch (error) {
    throw new AuthenticationError(handleAuthError(error as Error));
  }
};

/**
 * Get the current authenticated user
 * @returns Promise with current user or null
 */
export const getCurrentUser = async () => {
  try {
    return await withRetry(async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    });
  } catch (error) {
    throw new AuthenticationError(handleAuthError(error as Error));
  }
};

/**
 * Get the current session
 * @returns Promise with current session or null
 */
export const getCurrentSession = async (): Promise<Session | null> => {
  try {
    return await withRetry(async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    });
  } catch (error) {
    throw new AuthenticationError(handleAuthError(error as Error));
  }
};

/**
 * Refresh the current session
 * @returns Promise with refreshed session
 */
export const refreshSession = async () => {
  try {
    return await withRetry(async () => {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) {
        logAuditEvent(AuditEventType.SESSION_EXPIRED, {
          user: data?.user,
          error,
          details: { errorMessage: error.message }
        });
        throw error;
      }
      
      logAuditEvent(AuditEventType.SESSION_REFRESH, {
        user: data.user,
        details: { sessionId: data.session?.id }
      });
      return data;
    });
  } catch (error) {
    throw new AuthenticationError(handleAuthError(error as Error));
  }
};

/**
 * Sign out the current user
 * @returns Promise with sign out operation result
 */
export const signOut = async () => {
  try {
    const currentUser = await getCurrentUser();
    return await withRetry(async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        logAuditEvent(AuditEventType.LOGOUT, {
          user: currentUser,
          error,
          details: { errorMessage: error.message }
        });
        throw error;
      }

      logAuditEvent(AuditEventType.LOGOUT, { user: currentUser });
      return { error: null };
    });
  } catch (error) {
    throw new AuthenticationError(handleAuthError(error as Error));
  }
};

// Set up session refresh listener
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'TOKEN_REFRESHED') {
    console.log('Session token refreshed');
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  }
}); 