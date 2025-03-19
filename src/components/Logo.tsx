
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import logoImage from '../assets/logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const [isPulsing, setIsPulsing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  useEffect(() => {
    // Start pulsing immediately
    setIsPulsing(true);
    
    // No need for random timing - use consistent 5-second interval
    const intervalId = setInterval(() => {
      setIsPulsing(false);
      
      // Short delay before starting the next pulse
      setTimeout(() => {
        setIsPulsing(true);
      }, 200);
    }, 5000);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={cn(
      "flex items-center justify-center",
      sizeClasses[size],
      className
    )}>
      <img 
        src={logoImage}
        alt="Logo" 
        className={cn(
          "w-full h-full object-contain",
          isPulsing && "animate-breathing-glow"
        )}
      />
    </div>
  );
};

export default Logo;
