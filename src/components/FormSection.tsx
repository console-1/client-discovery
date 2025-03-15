
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  title: string;
  description?: string;
  isActive: boolean;
  className?: string;
  children: React.ReactNode;
  animationDelay?: number;
  sectionLabel?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  isActive,
  className,
  children,
  animationDelay = 0,
  sectionLabel
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isActive && sectionRef.current) {
      sectionRef.current.classList.add('active');
    } else if (sectionRef.current) {
      sectionRef.current.classList.remove('active');
    }
  }, [isActive]);
  
  return (
    <div 
      ref={sectionRef} 
      className={cn(
        'form-section w-full p-6 md:p-8 bg-transparent border-none', 
        isActive ? 'active' : '', 
        className
      )}
    >
      <div className={cn('space-y-4', isActive ? 'animate-fade-in' : '')}>
        {children}
      </div>
    </div>
  );
};

export default FormSection;
