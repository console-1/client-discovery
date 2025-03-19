
import React, { useEffect, useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
  className?: string;
  onStepClick?: (stepIndex: number) => void;
  fadeInDelay?: number;
  onFadeComplete?: () => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = React.memo(({
  totalSteps,
  currentStep,
  className,
  onStepClick,
  fadeInDelay = 0,
  onFadeComplete
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      const progress = ((currentStep) / (totalSteps - 1)) * 100;
      progressRef.current.style.width = `${progress}%`;
    }

    // Handle fade-in animation with delay
    if (containerRef.current && fadeInDelay > 0) {
      containerRef.current.style.opacity = '0';
      
      const timer = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = 'opacity 0.5s ease-out';
          containerRef.current.style.opacity = '1';
          
          // Trigger onFadeComplete after animation finishes
          if (onFadeComplete) {
            const animationTimer = setTimeout(() => {
              onFadeComplete();
            }, 500); // Match transition duration
            
            return () => clearTimeout(animationTimer);
          }
        }
      }, fadeInDelay);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, totalSteps, fadeInDelay, onFadeComplete]);

  const progressWidth = useMemo(() => 
    `${((currentStep) / (totalSteps - 1)) * 100}%`, 
    [currentStep, totalSteps]
  );

  return (
    <div 
      ref={containerRef}
      className={cn('w-full -mt-2', className)}
    >
      <div className="flex justify-between mb-1">
        <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">
          Progress
        </p>
        <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">
          Step {currentStep + 1} of {totalSteps}
        </p>
      </div>
      
      {/* Progress bar container with relative positioning */}
      <div className="relative h-4 w-full">
        {/* Background line - centered vertically */}
        <div className="absolute h-1.5 top-1/2 -translate-y-1/2 w-full bg-stone-100 dark:bg-stone-700 rounded-full"></div>
        
        {/* Progress fill - centered vertically - removed animate-pulse-slow */}
        <div
          ref={progressRef}
          className="absolute h-1.5 top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-mint-light via-mint to-mint-dark transition-all duration-500 ease-out rounded-full"
          style={{ width: progressWidth }}
        />
        
        {/* Dots positioned absolutely on top of the line */}
        <div className="absolute w-full flex justify-between top-1/2 -translate-y-1/2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center justify-center',
                index < currentStep ? 'text-mint' : 'text-stone-400',
                onStepClick ? 'cursor-pointer' : ''
              )}
              onClick={() => onStepClick && onStepClick(index)}
              role={onStepClick ? "button" : undefined}
              tabIndex={onStepClick ? 0 : undefined}
              aria-label={onStepClick ? `Go to step ${index + 1}` : undefined}
            >
              <div
                className={cn(
                  'w-4 h-4 rounded-full transition-all duration-300 z-10',
                  index < currentStep
                    ? 'bg-mint'
                    : index === currentStep
                    ? 'bg-white dark:bg-stone-900 border-[3px] border-mint shadow-[0_0_8px_rgba(0,239,174,0.6)] animate-pulse-slow'
                    : 'bg-stone-200 dark:bg-stone-600'
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.currentStep === nextProps.currentStep &&
         prevProps.totalSteps === nextProps.totalSteps &&
         prevProps.className === nextProps.className &&
         prevProps.onStepClick === nextProps.onStepClick &&
         prevProps.fadeInDelay === nextProps.fadeInDelay;
});

ProgressIndicator.displayName = 'ProgressIndicator';

export default ProgressIndicator;
