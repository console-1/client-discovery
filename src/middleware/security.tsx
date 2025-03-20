import { useEffect } from 'react';
import { securityHeaders, scriptNonce, styleNonce } from '../services/security';

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

    // Apply nonces to existing scripts and styles
    if (typeof document !== 'undefined') {
      // Add nonces to scripts
      document.querySelectorAll('script').forEach((script) => {
        if (!script.hasAttribute('nonce')) {
          script.setAttribute('nonce', scriptNonce);
        }
      });

      // Add nonces to styles
      document.querySelectorAll('style, link[rel="stylesheet"]').forEach((style) => {
        if (!style.hasAttribute('nonce')) {
          style.setAttribute('nonce', styleNonce);
        }
      });
    }

    // Additional security measures
    if (typeof window !== 'undefined') {
      // Prevent clickjacking
      if (window.self !== window.top && window.top) {
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