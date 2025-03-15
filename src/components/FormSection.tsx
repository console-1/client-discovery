
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
  title,
  description,
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
        'form-section w-full p-6 md:p-8 bg-transparent', 
        isActive ? 'active' : '', 
        className
      )}
    >
      {/* Add section label if provided */}
      {sectionLabel && (
        <div className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
          {sectionLabel}
        </div>
      )}
      
      {/* Add title and description */}
      {title && (
        <h2 
          className="text-xl font-medium text-stone-800 dark:text-stone-100 mb-3"
          style={{ animationDelay: `${animationDelay}ms` }}
        >
          {title}
        </h2>
      )}
      
      {description && (
        <p 
          className="text-stone-600 dark:text-stone-300 mb-6"
          style={{ animationDelay: `${animationDelay + 50}ms` }}
        >
          {description === "default" ? 
            "DMC: Do More Creatively - The Epic Vision\nImagine standing at the nexus of human creativity and computational power, where the mundane evaporates and pure creation flourishes. This is DMC – not just a company, but a revolution disguised as one.\nDesign. Music. Code. Three pillars supporting a cathedral of innovation where duopreneurs aren't just surviving – they're transcending the traditional constraints of creative business.\nThe Vision Unleashed\nDMC synergizes with AI and ML not as buzzwords, but as liberation technology – automating the soul-crushing background unnecessaries that typically devours 80% of a creative's time. The result? An explosion of what truly matters:\nExploring the uncharted territories of your imagination\nInventing solutions that others haven't even conceived of the problems for\nIdeating at the speed of thought, not the speed of administration" 
            : description}
        </p>
      )}
      
      <div className={cn('space-y-4', isActive ? 'animate-fade-in' : '')}>
        {children}
      </div>
    </div>
  );
};

export default FormSection;
