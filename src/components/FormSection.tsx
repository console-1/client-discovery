import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';

interface FormSectionProps {
  title?: string;
  description?: string;
  isActive: boolean;
  className?: string;
  children: React.ReactNode;
  animationDelay?: number;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  isActive,
  className,
  children,
  animationDelay = 0
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
        'form-section w-full p-6 md:p-8 bg-transparent border-transparent',
        isActive ? 'active' : '', 
        className
      )}
    >
      {/* Title section */}
      {title && isActive ? (
        <AnimatedText 
          text={title} 
          tag="h2" 
          className="text-2xl font-medium text-stone-800 dark:text-[#f5f5f5] mb-3 font-mono" 
          delay={animationDelay} 
        />
      ) : title && (
        <h2 className="text-2xl font-medium text-stone-800 dark:text-[#f5f5f5] mb-3 font-mono">
          {title}
        </h2>
      )}
      
      {/* Description section */}
      {description && isActive ? (
        <AnimatedText 
          text={description} 
          className="text-stone-600 dark:text-[#f5f5f5] mb-6 font-mono" 
          delay={animationDelay + 300} 
          speed={20} 
        />
      ) : description && (
        <p className="text-stone-600 dark:text-[#f5f5f5] mb-6 font-mono">
          {description}
        </p>
      )}
      
      {/* Children content */}
      <div className={cn('space-y-4', isActive ? 'animate-fade-in' : '')}>
        {children}
      </div>
    </div>
  );
};

export default FormSection;
