import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Sign in with email magic link (passwordless)
 * @param email User's email address
 * @returns Promise with sign in operation result
 */
export const signInWithMagicLink = async (email: string) => {
  return await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    }
  });
};

/**
 * Get the current authenticated user
 * @returns Promise with current user or null
 */
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};

/**
 * Sign out the current user
 * @returns Promise with sign out operation result
 */
export const signOut = async () => {
  return await supabase.auth.signOut();
}; 