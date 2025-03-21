import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { AuthenticationError, AuthErrorCode } from '@/services/authErrors';

interface LoginFormProps {
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Store the return URL before initiating the magic link flow
      const returnUrl = new URLSearchParams(location.search).get('returnUrl') || '/';
      localStorage.setItem('returnUrl', returnUrl);

      await signIn(email, rememberMe);
      toast({
        title: "Magic link sent!",
        description: "Check your email to continue your journey.",
      });
      setEmail('');
    } catch (error) {
      if (error instanceof AuthenticationError) {
        const { details } = error;
        setErrorMessage(details.message);
        
        if (details.code === AuthErrorCode.RATE_LIMITED) {
          setTimeout(() => setErrorMessage(null), 60000);
        }
        
        toast({
          title: details.code,
          description: `${details.message}${details.suggestedAction ? ` ${details.suggestedAction}` : ''}`,
          variant: "destructive",
        });
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
        toast({
          title: "Error",
          description: "Failed to send magic link. Please try again.",
          variant: "destructive",
        });
      }
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
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage(null);
              }}
              required
              placeholder="Enter your email"
              className={cn(
                "input-mint w-full transition-opacity duration-200",
                isLoading && "opacity-50",
                errorMessage && "border-red-500 focus:border-red-500"
              )}
              disabled={isLoading}
              aria-invalid={errorMessage ? "true" : "false"}
              aria-describedby={errorMessage ? "email-error" : undefined}
              autoComplete="email"
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-stone-400 dark:text-stone-500" />
              </div>
            )}
          </div>
          {errorMessage && (
            <p id="email-error" className="text-sm text-red-500 mt-1">
              {errorMessage}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-stone-300 text-mint-600 focus:ring-mint-500"
            disabled={isLoading}
            autoComplete="off"
          />
          <label 
            htmlFor="rememberMe" 
            className="text-sm text-stone-600 dark:text-stone-400"
          >
            Remember me
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading || !email}
          className={cn(
            "btn-mint w-full flex items-center justify-center gap-2 transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isLoading && "cursor-wait",
            errorMessage && "border-red-500"
          )}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? 'Sending...' : 'Continue'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm; 