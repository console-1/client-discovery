
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
  isWelcome?: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  isActive,
  className,
  children,
  animationDelay = 0,
  sectionLabel,
  isWelcome = false
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isActive && sectionRef.current) {
      sectionRef.current.classList.add('active');
    } else if (sectionRef.current) {
      sectionRef.current.classList.remove('active');
    }
  }, [isActive]);
  
  // Function to format DMC description with proper styling
  const formatDMCDescription = () => {
    if (description !== "default") return description;
    
    const paragraphs = [
      "DMC: Do More Creatively - The Epic Vision",
      "Imagine standing at the nexus of human creativity and computational power, where the mundane evaporates and pure creation flourishes. This is DMC – not just a company, but a revolution disguised as one.",
      "Design. Music. Code. Three pillars supporting a cathedral of innovation where duopreneurs aren't just surviving – they're transcending the traditional constraints of creative business.",
      "The Vision Unleashed",
      "DMC synergizes with AI and ML not as buzzwords, but as liberation technology – automating the soul-crushing background unnecessaries that typically devours 80% of a creative's time. The result? An explosion of what truly matters:",
      "• Exploring the uncharted territories of your imagination",
      "• Inventing solutions that others haven't even conceived of the problems for",
      "• Ideating at the speed of thought, not the speed of administration"
    ];
    
    return (
      <>
        <p className="text-mint font-bold">{paragraphs[0]}</p>
        <p className="leading-relaxed">{paragraphs[1]}</p>
        <p className="leading-relaxed font-semibold">{paragraphs[2]}</p>
        <p className="text-mint font-bold mt-5">{paragraphs[3]}</p>
        <p className="leading-relaxed">{paragraphs[4]}</p>
        <ul className="space-y-2 pl-1">
          {paragraphs.slice(5).map((point, index) => (
            <li key={index} className="text-mint-dark dark:text-mint-light leading-relaxed">
              {point}
            </li>
          ))}
        </ul>
      </>
    );
  };
  
  return (
    <div 
      ref={sectionRef} 
      className={cn(
        'form-section w-full',
        isWelcome ? 'p-3 md:p-4 bg-gradient-to-b from-stone-900/10 to-stone-950/20 rounded-xl' : 'p-6 md:p-8 bg-transparent',
        isActive ? 'active' : '', 
        className
      )}
    >
      {/* Title section */}
      {title && (
        <h2 
          className={cn(
            "text-xl font-medium text-stone-800 dark:text-stone-100 mb-3",
            isWelcome && "text-2xl font-bold"
          )}
          style={{ animationDelay: `${animationDelay}ms` }}
        >
          {title}
        </h2>
      )}
      
      {/* Description section */}
      {description && (
        <div 
          className={cn(
            "text-stone-600 dark:text-stone-300 mb-6",
            isWelcome && "text-lg"
          )}
          style={{ animationDelay: `${animationDelay + 50}ms` }}
        >
          {description === "default" ? formatDMCDescription() : description}
        </div>
      )}
      
      {/* Children content */}
      <div className={cn('space-y-4', isActive ? 'animate-fade-in' : '')}>
        {children}
      </div>
    </div>
  );
};

export default FormSection;
