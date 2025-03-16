import React from 'react';
import { cn } from '@/lib/utils';

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
          {/* Left-aligned text */}
          <div className="absolute left-0 flex items-center">
            <div>
              <h1 className="text-xl font-bold text-stone-800 dark:text-stone-100">{title}</h1>
              {subtitle && (
                <p className="text-xs text-stone-600 dark:text-stone-400 tracking-wider">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Centered logo */}
          <div className="w-10 h-10 bg-mint rounded-lg flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 