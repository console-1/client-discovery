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
      const progress = (currentStep / totalSteps) * 100;
      progressRef.current.style.width = `${progress}%`;
    }
  }, [currentStep, totalSteps]);

  const progressSteps = useMemo(() => 
    Array.from({ length: totalSteps }).map((_, index) => (
      <div
        key={index}
        className={cn(
          'relative flex flex-col items-center',
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
            'w-4 h-4 rounded-full transition-all duration-300',
            index < currentStep
              ? 'bg-mint'
              : index === currentStep
              ? 'bg-white border-2 border-mint animate-pulse-slow'
              : 'bg-stone-200'
          )}
        />
      </div>
    )), [totalSteps, currentStep, onStepClick]);

  const progressWidth = useMemo(() => 
    `${(currentStep / totalSteps) * 100}%`, 
    [currentStep, totalSteps]
  );

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between mb-1">
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Progress
        </p>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
      
      <div className="relative h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-mint-light via-mint to-mint-dark animate-pulse-mint transition-all duration-500 ease-out"
          style={{ width: progressWidth }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {progressSteps}
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
