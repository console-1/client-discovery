
import React, { useEffect, useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
  className?: string;
  onStepClick?: (stepIndex: number) => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = React.memo(({
  totalSteps,
  currentStep,
  className,
  onStepClick
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      const progress = ((currentStep) / (totalSteps - 1)) * 100;
      progressRef.current.style.width = `${progress}%`;
    }
  }, [currentStep, totalSteps]);

  const progressWidth = useMemo(() => 
    `${((currentStep) / (totalSteps - 1)) * 100}%`, 
    [currentStep, totalSteps]
  );

  return (
    <div className={cn('w-full', className)}>
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
        
        {/* Progress fill - centered vertically */}
        <div
          ref={progressRef}
          className="absolute h-1.5 top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-mint-light via-mint to-mint-dark animate-pulse-mint transition-all duration-500 ease-out rounded-full"
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
                    ? 'bg-white dark:bg-stone-900 border-[3px] border-mint shadow-[0_0_8px_rgba(0,239,174,0.6)] animate-pulse-active'
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
         prevProps.onStepClick === nextProps.onStepClick;
});

ProgressIndicator.displayName = 'ProgressIndicator';

export default ProgressIndicator;
