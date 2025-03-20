import { useEffect } from 'react';
import { securityHeaders } from '../services/security';

interface SecurityMiddlewareProps {
  children: React.ReactNode;
}

export function SecurityMiddleware({ children }: SecurityMiddlewareProps) {
  useEffect(() => {
    // Apply security headers
    Object.entries(securityHeaders).forEach(([header, value]) => {
      if (typeof document !== 'undefined') {
        // For development purposes, log headers
        if (import.meta.env.DEV) {
          console.log(`Setting security header: ${header} = ${value}`);
        }

        // Set meta tags for CSP and other security headers
        if (header === 'Content-Security-Policy') {
          const meta = document.createElement('meta');
          meta.httpEquiv = header;
          meta.content = value;
          document.head.appendChild(meta);
        }
      }
    });

    // Additional security measures
    if (typeof window !== 'undefined') {
      // Prevent clickjacking
      if (window.self !== window.top) {
        window.top.location = window.self.location;
      }

      // Disable console in production
      if (import.meta.env.PROD) {
        console.log = () => {};
        console.debug = () => {};
        console.info = () => {};
        // Keep error and warn for debugging critical issues
      }
    }
  }, []);

  return <>{children}</>;
} 