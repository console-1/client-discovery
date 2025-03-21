import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, className }) => {
  const { user, logout, loading } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await logout();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className={cn("py-6 border-b border-stone-200 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 backdrop-blur-sm sticky top-0 z-50", className)}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between relative">
          {/* Logo and title */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo size="md" />
            <div>
              <h1 className="text-xl font-bold text-stone-800 dark:text-stone-100">{title}</h1>
              {subtitle && (
                <p className="text-xs text-stone-600 dark:text-stone-400 tracking-wider">{subtitle}</p>
              )}
            </div>
          </Link>

          {/* Auth buttons */}
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-stone-600 dark:text-stone-400" />
                <span className="text-sm text-stone-600 dark:text-stone-400">
                  Loading...
                </span>
              </div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-stone-600 dark:text-stone-400">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className={cn(
                    "btn-mint-outline text-sm px-4 py-2",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isSigningOut ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing Out...
                    </div>
                  ) : (
                    "Sign Out"
                  )}
                </button>
              </div>
            ) : !isLoginPage && (
              <Link
                to="/login"
                className="btn-mint text-sm px-4 py-2"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 