import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoginFormProps {
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Store the return URL before initiating the magic link flow
      const returnUrl = new URLSearchParams(location.search).get('returnUrl') || '/';
      localStorage.setItem('returnUrl', returnUrl);

      await signIn(email);
      toast({
        title: "Check your email",
        description: "We've sent you a magic link to sign in.",
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send magic link. Please try again.",
        variant: "destructive",
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-stone-600 dark:text-stone-400"
          >
            Email address
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className={cn(
                "input-mint w-full transition-opacity duration-200",
                isLoading && "opacity-50"
              )}
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-stone-400 dark:text-stone-500" />
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading || !email}
          className={cn(
            "btn-mint w-full flex items-center justify-center gap-2 transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isLoading && "cursor-wait"
          )}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? 'Sending Magic Link...' : 'Sign in with Email'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm; 