/**
 * XSS Sanitization Utilities
 *
 * This module provides utilities to sanitize user input and prevent
 * Cross-Site Scripting (XSS) attacks.
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * @param dirty - Untrusted HTML string
 * @param options - DOMPurify configuration options
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(
  dirty: string,
  options?: {
    allowedTags?: string[];
    allowedAttributes?: Record<string, string[]>;
    allowedSchemes?: string[];
  }
): string {
  if (!dirty) return '';

  const config: any = {
    ALLOWED_TAGS: options?.allowedTags || [
      'p',
      'br',
      'strong',
      'em',
      'u',
      'a',
      'ul',
      'ol',
      'li',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'code',
      'pre',
    ],
    ALLOWED_ATTR: options?.allowedAttributes || {
      a: ['href', 'title', 'target'],
    },
    ALLOWED_URI_REGEXP: options?.allowedSchemes
      ? new RegExp(`^(${options.allowedSchemes.join('|')}):`, 'i')
      : /^(?:https?|mailto):/i,
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
    SAFE_FOR_TEMPLATES: true,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    RETURN_TRUSTED_TYPE: false,
  };

  return DOMPurify.sanitize(dirty, config);
}

/**
 * Sanitize plain text (remove all HTML tags)
 *
 * @param dirty - Untrusted string
 * @returns Plain text with no HTML
 */
export function sanitizePlainText(dirty: string): string {
  if (!dirty) return '';

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
}

/**
 * Escape HTML special characters
 *
 * @param str - String to escape
 * @returns Escaped string
 */
export function escapeHtml(str: string): string {
  if (!str) return '';

  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return str.replace(/[&<>"'/]/g, (char) => map[char] || char);
}

/**
 * Unescape HTML entities
 *
 * @param str - String with HTML entities
 * @returns Unescaped string
 */
export function unescapeHtml(str: string): string {
  if (!str) return '';

  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/',
  };

  return str.replace(/&(?:amp|lt|gt|quot|#x27|#x2F);/g, (entity) => map[entity] || entity);
}

/**
 * Remove dangerous characters and patterns
 *
 * @param str - Input string
 * @returns Sanitized string
 */
export function removeDangerousPatterns(str: string): string {
  if (!str) return '';

  return str
    // Remove script tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
    // Remove javascript: protocol
    .replace(/javascript:/gi, '')
    // Remove data: protocol (can contain encoded scripts)
    .replace(/data:text\/html/gi, '')
    // Remove vbscript: protocol
    .replace(/vbscript:/gi, '')
    // Remove style with expression (IE specific)
    .replace(/style\s*=\s*["'][^"']*expression\s*\([^"']*["']/gi, '')
    .trim();
}

/**
 * Sanitize URL to prevent XSS via href attributes
 *
 * @param url - URL string
 * @returns Sanitized URL or empty string if dangerous
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';

  const trimmed = url.trim().toLowerCase();

  // Block dangerous protocols
  const dangerousProtocols = [
    'javascript:',
    'data:',
    'vbscript:',
    'file:',
    'about:',
  ];

  for (const protocol of dangerousProtocols) {
    if (trimmed.startsWith(protocol)) {
      return '';
    }
  }

  // Only allow http, https, mailto, tel
  const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
  const hasProtocol = /^[a-z]+:/i.test(trimmed);

  if (hasProtocol && !allowedProtocols.some((p) => trimmed.startsWith(p))) {
    return '';
  }

  // Remove any encoded variations
  const decoded = decodeURIComponent(url);
  if (decoded !== url) {
    // Recursively sanitize decoded URL
    return sanitizeUrl(decoded);
  }

  return url;
}

/**
 * Sanitize filename to prevent directory traversal
 *
 * @param filename - Filename string
 * @returns Safe filename
 */
export function sanitizeFilename(filename: string): string {
  if (!filename) return '';

  return filename
    // Remove path separators
    .replace(/[\/\\]/g, '')
    // Remove parent directory references
    .replace(/\.\./g, '')
    // Remove null bytes
    .replace(/\0/g, '')
    // Keep only safe characters
    .replace(/[^a-zA-Z0-9\-_\.]/g, '_')
    .trim();
}

/**
 * Sanitize JSON to prevent prototype pollution
 *
 * @param obj - Object to sanitize
 * @returns Sanitized object
 */
export function sanitizeJson<T extends Record<string, any>>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj;

  const sanitized = { ...obj };

  // Remove dangerous keys
  const dangerousKeys = ['__proto__', 'constructor', 'prototype'];

  for (const key of dangerousKeys) {
    delete sanitized[key];
  }

  // Recursively sanitize nested objects
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = Array.isArray(sanitized[key])
        ? sanitized[key].map((item: any) =>
            typeof item === 'object' ? sanitizeJson(item) : item
          )
        : sanitizeJson(sanitized[key]);
    }
  }

  return sanitized;
}

/**
 * Sanitize SQL-like input (basic prevention, use parameterized queries)
 *
 * @param input - User input
 * @returns Sanitized input
 */
export function sanitizeSqlInput(input: string): string {
  if (!input) return '';

  // Remove common SQL injection patterns
  return input
    .replace(/;/g, '') // Remove semicolons
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove multi-line comments
    .replace(/\*\//g, '')
    .replace(/'/g, "''") // Escape single quotes
    .trim();
}

/**
 * Sanitize search query
 *
 * @param query - Search query string
 * @returns Sanitized query
 */
export function sanitizeSearchQuery(query: string): string {
  if (!query) return '';

  return query
    // Remove special regex characters
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // Remove HTML
    .replace(/<[^>]*>/g, '')
    // Limit length
    .slice(0, 200)
    .trim();
}

/**
 * Comprehensive input sanitization
 * Use this as a general-purpose sanitizer for user input
 *
 * @param input - User input
 * @param options - Sanitization options
 * @returns Sanitized input
 */
export function sanitizeInput(
  input: string,
  options?: {
    allowHtml?: boolean;
    maxLength?: number;
    stripWhitespace?: boolean;
  }
): string {
  if (!input) return '';

  let sanitized = input;

  // Strip whitespace if requested
  if (options?.stripWhitespace) {
    sanitized = sanitized.trim();
  }

  // Sanitize HTML
  if (options?.allowHtml) {
    sanitized = sanitizeHtml(sanitized);
  } else {
    sanitized = sanitizePlainText(sanitized);
  }

  // Remove dangerous patterns
  sanitized = removeDangerousPatterns(sanitized);

  // Limit length
  if (options?.maxLength) {
    sanitized = sanitized.slice(0, options.maxLength);
  }

  return sanitized;
}

/**
 * Batch sanitize an object's string properties
 *
 * @param obj - Object with string properties
 * @param options - Sanitization options
 * @returns Object with sanitized properties
 */
export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
  options?: {
    allowHtml?: boolean;
    maxLength?: number;
    stripWhitespace?: boolean;
  }
): T {
  const sanitized = { ...obj };

  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key], options);
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeObject(sanitized[key], options);
    }
  }

  return sanitized;
}

/**
 * Check if string contains potential XSS
 *
 * @param input - String to check
 * @returns True if potentially dangerous
 */
export function isPotentialXss(input: string): boolean {
  if (!input) return false;

  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /eval\s*\(/i,
    /expression\s*\(/i,
    /vbscript:/i,
    /data:text\/html/i,
  ];

  return xssPatterns.some((pattern) => pattern.test(input));
}

/**
 * Validate and sanitize email address
 *
 * @param email - Email address
 * @returns Sanitized email or null if invalid
 */
export function sanitizeEmail(email: string): string | null {
  if (!email) return null;

  const sanitized = email.trim().toLowerCase();

  // Basic email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(sanitized)) {
    return null;
  }

  // Additional checks
  if (sanitized.length > 255) return null;
  if (sanitized.includes('..')) return null;
  if (sanitized.startsWith('.') || sanitized.endsWith('.')) return null;

  return sanitized;
}
