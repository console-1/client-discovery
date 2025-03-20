import { Buffer } from 'buffer';

/**
 * Generates a cryptographically secure nonce for CSP
 * @returns A base64 encoded nonce string
 */
export function generateNonce(): string {
  // Use crypto.getRandomValues for better entropy
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);
  return Buffer.from(randomBytes).toString('base64');
}

/**
 * Creates a CSP nonce attribute value
 * @param nonce The base64 encoded nonce
 * @returns The nonce attribute value
 */
export function getNonceAttr(nonce: string): string {
  return `nonce-${nonce}`;
} 