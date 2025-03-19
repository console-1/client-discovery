
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import logoImage from '../assets/logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const [isRotating, setIsRotating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  useEffect(() => {
    const scheduleNextRotation = () => {
      // Random time between 5 and 15 seconds
      const randomDelay = Math.floor(Math.random() * 10000) + 5000;
      
      timeoutRef.current = setTimeout(() => {
        setIsRotating(true);
        
        // Reset rotation after animation completes
        setTimeout(() => {
          setIsRotating(false);
          scheduleNextRotation();
        }, 1000); // 1 second for rotation
      }, randomDelay);
    };

    // Start the rotation cycle
    scheduleNextRotation();

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
          "w-full h-full object-contain transition-transform duration-1000",
          isRotating && "rotate-[360deg]"
        )}
      />
    </div>
  );
};

export default Logo;
