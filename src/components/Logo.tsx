
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
    const scheduleNextPulse = () => {
      // Random time between 5 and 15 seconds
      const randomDelay = Math.floor(Math.random() * 10000) + 5000;
      
      timeoutRef.current = setTimeout(() => {
        setIsPulsing(true);
        
        // Reset pulse after animation completes
        setTimeout(() => {
          setIsPulsing(false);
          scheduleNextPulse();
        }, 1000); // 1 second for pulse
      }, randomDelay);
    };

    // Start the pulse cycle
    scheduleNextPulse();

    // Cleanup
    return () => {
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
          "w-full h-full object-contain transition-all duration-300",
          isPulsing && "filter drop-shadow-[0_0_8px_rgba(21,241,103,0.6)]"
        )}
      />
    </div>
  );
};

export default Logo;
