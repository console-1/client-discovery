import React from 'react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { Link } from 'react-router-dom';

interface FooterProps {
  title: string;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ title, className }) => {
  return (
    <footer className={cn("border-t border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 py-6", className)}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <Logo size="sm" />
              <span className="text-stone-800 dark:text-stone-100 font-medium">{title}</span>
            </div>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">© {new Date().getFullYear()} All rights reserved</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-stone-600 dark:text-stone-300 hover:text-mint transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-stone-600 dark:text-stone-300 hover:text-mint transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-stone-600 dark:text-stone-300 hover:text-mint transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 