import { createContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getCurrentUser, signInWithMagicLink, signOut, getCurrentSession, refreshSession } from '../services/auth';
import { useToast } from '@/components/ui/use-toast';
import { AuthenticationError, AuthErrorCode } from '../services/authErrors';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export { AuthContext };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Function to check session expiration
  const checkSessionExpiration = useCallback((session: Session | null) => {
    if (!session) return;

    const expiresAt = new Date(session.expires_at! * 1000);
    const now = new Date();
    const timeUntilExpiry = expiresAt.getTime() - now.getTime();
    
    // Show warning when session is about to expire (5 minutes before)
    if (timeUntilExpiry > 0 && timeUntilExpiry <= 5 * 60 * 1000) {
      toast({
        title: "Session Expiring Soon",
        description: "Your session will expire in 5 minutes. Please save your work.",
        duration: 10000, // Show for 10 seconds
      });
    }
  }, [toast]);

  const handleAuthError = useCallback((error: AuthenticationError) => {
    const { details } = error;
    
    toast({
      title: details.code,
      description: `${details.message}${details.suggestedAction ? ` ${details.suggestedAction}` : ''}`,
      variant: "destructive",
      duration: 6000,
    });

    // Handle specific error cases
    switch (details.code) {
      case AuthErrorCode.SESSION_EXPIRED:
        setUser(null);
        setSession(null);
        break;
      case AuthErrorCode.TOKEN_REFRESH_FAILED:
        // Clear the session since refresh failed
        setUser(null);
        setSession(null);
        break;
    }
  }, [toast]);

  // Function to refresh the session
  const refreshUserSession = useCallback(async () => {
    try {
      const { session } = await refreshSession();
      if (session) {
        setSession(session);
        setUser(session.user);
        toast({
          title: "Session Refreshed",
          description: "Your session has been successfully renewed.",
        });
      }
    } catch (error) {
      if (error instanceof AuthenticationError) {
        handleAuthError(error);
      } else {
        console.error('Error refreshing session:', error);
        toast({
          title: "Session Refresh Failed",
          description: "Please sign in again to continue.",
          variant: "destructive",
        });
        // Clear session state on any refresh error
        setUser(null);
        setSession(null);
      }
      throw error;
    }
  }, [toast, handleAuthError]);

  // Check user and session status
  const checkUser = useCallback(async () => {
    try {
      // First try to get the current session
      const currentSession = await getCurrentSession();
      
      if (!currentSession) {
        // No session found, clear the state
        setUser(null);
        setSession(null);
        return;
      }
      
      // Session exists, validate it
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          throw new Error('User not found');
        }
        
        setUser(currentUser);
        setSession(currentSession);
        checkSessionExpiration(currentSession);
      } catch (userError) {
        // Invalid session, clear everything
        setUser(null);
        setSession(null);
        if (userError instanceof AuthenticationError) {
          handleAuthError(userError);
        }
      }
    } catch (error) {
      // Handle session retrieval errors
      setUser(null);
      setSession(null);
      if (error instanceof AuthenticationError) {
        handleAuthError(error);
      } else {
        console.error('Error checking auth state:', error);
        toast({
          title: "Authentication Error",
          description: "There was a problem verifying your session. Please try signing in again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [checkSessionExpiration, handleAuthError, setUser, setSession, setLoading, toast]);

  useEffect(() => {
    checkUser();
    
    // Set up session check interval
    const intervalId = setInterval(() => {
      getCurrentSession().then(session => {
        if (session) {
          checkSessionExpiration(session);
        }
      });
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [checkSessionExpiration, checkUser]);

  const signIn = async (email: string, rememberMe: boolean = false) => {
    try {
      const { error } = await signInWithMagicLink(email, rememberMe);
      if (error) throw error;
    } catch (error) {
      if (error instanceof AuthenticationError) {
        handleAuthError(error);
      } else {
        console.error('Error signing in:', error);
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      setUser(null);
      setSession(null);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        handleAuthError(error);
      } else {
        console.error('Error signing out:', error);
      }
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    logout,
    refreshUserSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 