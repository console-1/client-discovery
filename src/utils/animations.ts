
import { useEffect, useRef, useCallback } from 'react';

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = { threshold: 0.1 }
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, options);
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options]);

  return {
    observe: (element: Element) => {
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    },
    unobserve: (element: Element) => {
      if (observerRef.current) {
        observerRef.current.unobserve(element);
      }
    }
  };
};

export const useTypewriter = (text: string, speed: number = 30) => {
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  const textRef = useRef('');
  const isRunningRef = useRef(false);

  const startTyping = useCallback(
    (element: HTMLElement | null, onComplete?: () => void) => {
      if (!element || isRunningRef.current) return;
      
      // Set running flag to prevent multiple starts
      isRunningRef.current = true;

      // Reset
      indexRef.current = 0;
      textRef.current = '';
      element.textContent = '';

      typewriterRef.current = setInterval(() => {
        if (indexRef.current < text.length) {
          textRef.current += text[indexRef.current];
          element.textContent = textRef.current;
          indexRef.current++;
        } else {
          if (typewriterRef.current) {
            clearInterval(typewriterRef.current);
            typewriterRef.current = null;
            if (onComplete) onComplete();
          }
        }
      }, speed);
    },
    [text, speed]
  );

  const stopTyping = useCallback(() => {
    if (typewriterRef.current) {
      clearInterval(typewriterRef.current);
      typewriterRef.current = null;
    }
    isRunningRef.current = false;
  }, []);

  return { startTyping, stopTyping };
};

export const animateElement = (
  element: HTMLElement | null,
  animation: string,
  duration: number = 500,
  delay: number = 0
): Promise<void> => {
  return new Promise((resolve) => {
    if (!element) {
      resolve();
      return;
    }

    setTimeout(() => {
      element.style.animation = `${animation} ${duration}ms ease-out forwards`;
      
      const handleAnimationEnd = () => {
        element.removeEventListener('animationend', handleAnimationEnd);
        resolve();
      };
      
      element.addEventListener('animationend', handleAnimationEnd);
    }, delay);
  });
};

export const animateElements = async (
  elements: (HTMLElement | null)[],
  animation: string,
  duration: number = 500,
  staggerDelay: number = 100
): Promise<void> => {
  for (let i = 0; i < elements.length; i++) {
    await animateElement(elements[i], animation, duration, i * staggerDelay);
  }
};
