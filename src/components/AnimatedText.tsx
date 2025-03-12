
import React, { useEffect, useRef } from 'react';
import { useTypewriter } from '@/utils/animations';

interface AnimatedTextProps {
  text: string;
  className?: string;
  speed?: number;
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  onComplete?: () => void;
  autoStart?: boolean;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  speed = 30,
  tag = 'p',
  onComplete,
  autoStart = true,
  delay = 0
}) => {
  const textRef = useRef<HTMLElement>(null);
  const { startTyping, stopTyping } = useTypewriter(text, speed);
  const startTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoStart && textRef.current) {
      startTimeoutRef.current = setTimeout(() => {
        startTyping(textRef.current, onComplete);
      }, delay);
    }

    return () => {
      stopTyping();
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
      }
    };
  }, [text, autoStart]);

  const TagComponent = tag as keyof JSX.IntrinsicElements;

  return (
    <TagComponent ref={textRef} className={className}>
      {/* Text will be injected by the typewriter effect */}
    </TagComponent>
  );
};

export default AnimatedText;
