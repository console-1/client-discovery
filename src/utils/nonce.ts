/**
 * Generates a cryptographically secure nonce for CSP
 * @returns A base64 encoded nonce string
 */
export function generateNonce(): string {
  // Use crypto.getRandomValues for better entropy
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);
  
  // Convert to base64 using the browser's built-in btoa function
  return btoa(String.fromCharCode.apply(null, Array.from(randomBytes)));
}

/**
 * Creates a CSP nonce attribute value
 * @param nonce The base64 encoded nonce
 * @returns The nonce attribute value
 */
export function getNonceAttr(nonce: string): string {
  return `nonce-${nonce}`;
} 