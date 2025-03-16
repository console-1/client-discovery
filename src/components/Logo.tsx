import React from 'react';
import { cn } from '@/lib/utils';
import logoImage from '../assets/logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn(
      "flex items-center justify-center",
      sizeClasses[size],
      className
    )}>
      <img 
        src={logoImage}
        alt="Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo; 