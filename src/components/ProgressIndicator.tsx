
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
  className?: string;
  onStepClick?: (stepIndex: number) => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
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

  return (
    <div className={cn('w-full', className)}>
      <div className="relative h-1 w-full bg-stone-100 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="absolute top-0 left-0 h-full bg-mint transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
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
                'w-3 h-3 rounded-full transition-all duration-300',
                index < currentStep
                  ? 'bg-mint'
                  : index === currentStep
                  ? 'bg-white border-2 border-mint animate-pulse-slow'
                  : 'bg-stone-200'
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
