import { User } from '@supabase/supabase-js';
import { generateNonce, getNonceAttr } from '../utils/nonce';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5; // Maximum login attempts per window

interface RateLimitEntry {
  attempts: number;
  firstAttempt: number;
  lastAttempt: number;
}

// In-memory rate limit store (consider using Redis in production)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Audit log types
export enum AuditEventType {
  LOGIN_ATTEMPT = 'LOGIN_ATTEMPT',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT = 'LOGOUT',
  SESSION_REFRESH = 'SESSION_REFRESH',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED'
}

interface AuditLogEntry {
  timestamp: number;
  eventType: AuditEventType;
  email?: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, unknown>;
}

// In-memory audit log (consider using a proper database in production)
const auditLog: AuditLogEntry[] = [];

// Generate a new nonce for each page load
export const scriptNonce = generateNonce();
export const styleNonce = generateNonce();

/**
 * Check if an email is rate limited
 * @param email The email to check
 * @returns boolean indicating if the email is rate limited
 */
export function isRateLimited(email: string): boolean {
  const entry = rateLimitStore.get(email);
  if (!entry) return false;

  const now = Date.now();
  if (now - entry.firstAttempt > RATE_LIMIT_WINDOW) {
    // Reset if window has expired
    rateLimitStore.delete(email);
    return false;
  }

  return entry.attempts >= MAX_ATTEMPTS;
}

/**
 * Record a login attempt for rate limiting
 * @param email The email attempting to login
 */
export function recordLoginAttempt(email: string): void {
  const now = Date.now();
  const entry = rateLimitStore.get(email);

  if (!entry || now - entry.firstAttempt > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(email, {
      attempts: 1,
      firstAttempt: now,
      lastAttempt: now
    });
  } else {
    entry.attempts++;
    entry.lastAttempt = now;
    rateLimitStore.set(email, entry);
  }
}

/**
 * Log an audit event
 * @param eventType The type of event
 * @param data Additional event data
 */
export function logAuditEvent(
  eventType: AuditEventType,
  data?: {
    email?: string;
    user?: User | null;
    error?: Error;
    details?: Record<string, unknown>;
  }
): void {
  const entry: AuditLogEntry = {
    timestamp: Date.now(),
    eventType,
    email: data?.email,
    userId: data?.user?.id,
    ipAddress: window.clientInformation?.platform, // In production, get from server
    userAgent: navigator.userAgent,
    details: data?.details as Record<string, unknown>
  };

  auditLog.push(entry);
  
  // In development, log to console for debugging
  if (import.meta.env.DEV) {
    console.log('Audit Log Entry:', entry);
  }
}

/**
 * Get recent audit logs for a user
 * @param userId The user ID to get logs for
 * @param limit Maximum number of entries to return
 * @returns Array of audit log entries
 */
export function getUserAuditLogs(userId: string, limit: number = 50): AuditLogEntry[] {
  return auditLog
    .filter(entry => entry.userId === userId)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}

/**
 * Clear rate limit for an email
 * @param email The email to clear rate limit for
 */
export function clearRateLimit(email: string): void {
  rateLimitStore.delete(email);
}

// Security headers configuration
export const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; " +
    `script-src 'self' 'strict-dynamic' '${getNonceAttr(scriptNonce)}' https://cdn.gpteng.co 'unsafe-inline' 'unsafe-eval' https:; ` +
    `style-src 'self' '${getNonceAttr(styleNonce)}'; ` +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co; " +
    "frame-ancestors 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "upgrade-insecure-requests;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
}; 