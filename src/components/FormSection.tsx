
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';

interface FormSectionProps {
  title: string;
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
        'form-section w-full p-6 md:p-8 glass-card',
        isActive ? 'active' : '',
        className
      )}
    >
      <div className="space-y-3 mb-6">
        <div className="inline-block chip-mint mb-2">
          <span className="inline-block w-2 h-2 rounded-full bg-mint mr-1.5"></span>
          <span>Section {animationDelay / 100 + 1}</span>
        </div>
        
        {isActive ? (
          <AnimatedText
            text={title}
            tag="h2"
            className="text-2xl font-medium text-stone-800"
            delay={animationDelay}
          />
        ) : (
          <h2 className="text-2xl font-medium text-stone-800">{title}</h2>
        )}
        
        {description && isActive ? (
          <AnimatedText
            text={description}
            className="text-stone-600"
            delay={animationDelay + 300}
            speed={20}
          />
        ) : (
          description && <p className="text-stone-600">{description}</p>
        )}
      </div>
      
      <div className={cn('space-y-4', isActive ? 'animate-fade-in' : '')}>
        {children}
      </div>
    </div>
  );
};

export default FormSection;
