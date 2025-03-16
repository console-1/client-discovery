import React from 'react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, className }) => {
  return (
    <header className={cn("py-6 border-b border-stone-200 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 backdrop-blur-sm sticky top-0 z-50", className)}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center relative">
          {/* Centered logo with right-aligned text */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo size="md" />
            <div>
              <h1 className="text-xl font-bold text-stone-800 dark:text-stone-100">{title}</h1>
              {subtitle && (
                <p className="text-xs text-stone-600 dark:text-stone-400 tracking-wider">{subtitle}</p>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 