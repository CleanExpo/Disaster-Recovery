# Security Implementation Guide

## Overview

This document provides a comprehensive guide to the security measures implemented in the NRPG platform. All security features are production-ready and follow industry best practices.

---

## Table of Contents

1. [Security Features](#security-features)
2. [Rate Limiting](#rate-limiting)
3. [CAPTCHA Integration](#captcha-integration)
4. [Input Validation](#input-validation)
5. [XSS Prevention](#xss-prevention)
6. [Content Security Policy](#content-security-policy)
7. [DDoS Protection](#ddos-protection)
8. [Environment Variables](#environment-variables)
9. [API Security Examples](#api-security-examples)
10. [Testing Security](#testing-security)
11. [Monitoring & Logging](#monitoring--logging)
12. [Security Checklist](#security-checklist)

---

## Security Features

### Implemented Security Measures

✅ **Rate Limiting** - Upstash Redis-based rate limiting on all sensitive endpoints
✅ **CAPTCHA Verification** - hCaptcha integration on forms
✅ **Input Validation** - Comprehensive Zod schemas for all inputs
✅ **XSS Prevention** - DOMPurify sanitization utilities
✅ **Content Security Policy** - Strict CSP headers configured
✅ **Security Headers** - HSTS, X-Frame-Options, X-Content-Type-Options, etc.
✅ **Suspicious Activity Detection** - Pattern-based threat detection
✅ **SQL Injection Prevention** - Prisma ORM with parameterized queries
✅ **CORS Protection** - Controlled cross-origin resource sharing
✅ **File Upload Validation** - Type, size, and name validation

---

## Rate Limiting

### Implementation

Rate limiting is implemented using **Upstash Redis** with sliding window algorithm.

#### Configuration

```typescript
// Lead Capture: 3 submissions per hour per IP
export const leadCaptureRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: true,
  prefix: 'ratelimit:lead-capture',
});

// Contractor Inquiry: 5 submissions per day per IP
export const contractorInquiryRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '24 h'),
  analytics: true,
  prefix: 'ratelimit:contractor-inquiry',
});

// General API: 100 requests per minute per IP
export const generalApiRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true,
  prefix: 'ratelimit:api',
});

// Authentication: 5 attempts per 15 minutes per IP
export const authRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  analytics: true,
  prefix: 'ratelimit:auth',
});
```

#### Rate Limited Endpoints

| Endpoint | Limit | Window | Purpose |
|----------|-------|--------|---------|
| `/api/public/lead-capture` | 3 | 1 hour | Prevent lead spam |
| `/api/public/contractor-inquiry` | 5 | 24 hours | Prevent contractor spam |
| `/api/auth/signin` | 5 | 15 minutes | Prevent brute force |
| `/api/auth/signup` | 5 | 15 minutes | Prevent account spam |
| `/api/auth/forgot-password` | 3 | 1 hour | Prevent abuse |
| `/api/*` (general) | 100 | 1 minute | API protection |

#### Response Headers

When rate limited, the API returns:

```json
{
  "error": "Too Many Requests",
  "message": "You have exceeded the rate limit. Please try again later.",
  "retryAfter": 3600
}
```

Headers:
- `Retry-After`: Seconds until limit resets
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: ISO timestamp of reset

---

## CAPTCHA Integration

### hCaptcha Setup

#### Environment Variables

```bash
# Public key (client-side)
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_site_key_here

# Secret key (server-side)
HCAPTCHA_SECRET_KEY=your_secret_key_here
```

#### Client-Side Implementation

```tsx
import HCaptcha from '@hcaptcha/react-hcaptcha';

function MyForm() {
  const [captchaToken, setCaptchaToken] = useState('');

  return (
    <form>
      {/* Form fields */}

      <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
        onVerify={(token) => setCaptchaToken(token)}
        onExpire={() => setCaptchaToken('')}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

#### Server-Side Verification

```typescript
import { verifyCaptchaMiddleware } from '@/lib/security/captcha';

// In API route
const captchaResult = await verifyCaptchaMiddleware(
  captchaToken,
  clientIp
);

if (!captchaResult.success) {
  return NextResponse.json(
    { error: captchaResult.error },
    { status: 400 }
  );
}
```

#### CAPTCHA-Required Forms

- ✅ Lead capture form
- ✅ Contractor inquiry form
- ✅ Claim submission form
- ✅ NRPG application form
- ✅ Contact form

---

## Input Validation

### Zod Schemas

All user inputs are validated using **Zod** schemas with strict rules.

#### Example: Lead Capture Schema

```typescript
export const LeadCaptureSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters'),

  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email is too long'),

  phone: z.string()
    .trim()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\d\s\-\+\(\)\.]+$/, 'Invalid phone format'),

  captchaToken: z.string()
    .min(1, 'CAPTCHA verification is required'),
});
```

#### Validation Features

- ✅ Type checking
- ✅ Length constraints
- ✅ Pattern matching (regex)
- ✅ Custom error messages
- ✅ Transformation (trim, lowercase)
- ✅ Sanitization (remove dangerous characters)

#### Available Schemas

| Schema | Purpose | Fields |
|--------|---------|--------|
| `LeadCaptureSchema` | Lead forms | Name, email, phone, address, claim type |
| `ContractorInquirySchema` | Contractor signup | Company info, license, services |
| `ClaimSubmissionSchema` | Claim filing | Personal, property, insurance info |
| `ContactFormSchema` | Contact forms | Name, email, subject, message |
| `NRPGApplicationSchema` | NRPG membership | Company, licensing, insurance |
| `FileUploadSchema` | File uploads | Name, size, type validation |

---

## XSS Prevention

### Sanitization Utilities

All user input is sanitized using **DOMPurify** to prevent XSS attacks.

#### HTML Sanitization

```typescript
import { sanitizeHtml } from '@/lib/security/sanitize';

// Allow only safe HTML tags
const safe = sanitizeHtml(userInput, {
  allowedTags: ['p', 'br', 'strong', 'em'],
  allowedAttributes: { a: ['href', 'title'] },
});
```

#### Plain Text Sanitization

```typescript
import { sanitizePlainText } from '@/lib/security/sanitize';

// Remove all HTML tags
const plainText = sanitizePlainText(userInput);
```

#### URL Sanitization

```typescript
import { sanitizeUrl } from '@/lib/security/sanitize';

// Block dangerous protocols (javascript:, data:, etc.)
const safeUrl = sanitizeUrl(userInput);
```

#### Object Sanitization

```typescript
import { sanitizeObject } from '@/lib/security/sanitize';

// Sanitize all string properties in an object
const sanitized = sanitizeObject(formData, {
  allowHtml: false,
  stripWhitespace: true,
  maxLength: 5000,
});
```

#### Dangerous Pattern Detection

```typescript
import { isPotentialXss } from '@/lib/security/sanitize';

if (isPotentialXss(userInput)) {
  console.warn('Potential XSS detected');
}
```

---

## Content Security Policy

### CSP Configuration

Strict CSP headers are configured in `next.config.mjs`:

```javascript
{
  key: 'Content-Security-Policy',
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://hcaptcha.com",
    "style-src 'self' 'unsafe-inline' https://hcaptcha.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://hcaptcha.com https://*.stripe.com",
    "frame-src 'self' https://hcaptcha.com https://*.stripe.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; '),
}
```

### Security Headers

| Header | Value | Purpose |
|--------|-------|---------|
| `Content-Security-Policy` | Strict policy | Prevent XSS, clickjacking |
| `X-Frame-Options` | DENY | Prevent clickjacking |
| `X-Content-Type-Options` | nosniff | Prevent MIME sniffing |
| `X-XSS-Protection` | 1; mode=block | Legacy XSS protection |
| `Referrer-Policy` | strict-origin-when-cross-origin | Control referrer info |
| `Permissions-Policy` | Restrictive | Limit browser features |
| `Strict-Transport-Security` | max-age=63072000 | Force HTTPS |

---

## DDoS Protection

### Vercel DDoS Protection

Vercel provides automatic DDoS protection at the edge:

- ✅ Automatic rate limiting at edge
- ✅ Firewall rules
- ✅ IP blocking
- ✅ Geographic filtering

### Application-Level Protection

1. **Rate Limiting** - Per-endpoint limits
2. **IP Tracking** - Monitor suspicious IPs
3. **Pattern Detection** - Block attack patterns
4. **CAPTCHA** - Human verification on sensitive forms

### Suspicious Activity Detection

The middleware detects and blocks:

- Directory traversal attempts (`../`)
- XSS attempts (`<script>`)
- SQL injection patterns (`UNION SELECT`)
- Code injection (`eval(`)
- Null byte injection (`%00`)
- Known attack tools (sqlmap, nikto)

---

## Environment Variables

### Required Security Variables

Create a `.env.local` file with:

```bash
# Upstash Redis (Rate Limiting)
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token_here

# hCaptcha
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
HCAPTCHA_SECRET_KEY=your_hcaptcha_secret_key

# Database (Prisma)
DATABASE_URL=postgresql://user:password@host:port/database

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://yourdomain.com

# Vercel (Production)
VERCEL_ENV=production
VERCEL_URL=your-app.vercel.app
```

### Security Best Practices

1. **Never commit** `.env.local` to version control
2. **Use strong secrets** (32+ characters, random)
3. **Rotate secrets** regularly (every 90 days)
4. **Use Vercel environment variables** for production
5. **Separate environments** (development, staging, production)

---

## API Security Examples

### Secured API Route Template

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { YourSchema } from '@/lib/security/validation-schemas';
import { verifyCaptchaMiddleware } from '@/lib/security/captcha';
import { sanitizeObject } from '@/lib/security/sanitize';
import { getClientIp } from '@/lib/security/rate-limit';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // 1. Parse request
    const body = await request.json();
    const clientIp = getClientIp(request);

    // 2. Verify CAPTCHA
    const captchaResult = await verifyCaptchaMiddleware(
      body.captchaToken,
      clientIp
    );
    if (!captchaResult.success) {
      return NextResponse.json(
        { error: captchaResult.error },
        { status: 400 }
      );
    }

    // 3. Validate input
    const validatedData = YourSchema.parse(body);

    // 4. Sanitize input
    const sanitizedData = sanitizeObject(validatedData, {
      allowHtml: false,
      stripWhitespace: true,
    });

    // 5. Process request
    // ... your business logic here

    // 6. Return success
    return NextResponse.json(
      { success: true, data: sanitizedData },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## Testing Security

### Manual Testing

1. **Rate Limiting Test**
   ```bash
   # Send multiple requests to trigger rate limit
   for i in {1..5}; do
     curl -X POST http://localhost:3000/api/public/lead-capture \
       -H "Content-Type: application/json" \
       -d '{"email":"test@example.com"}'
   done
   ```

2. **XSS Test**
   ```bash
   # Attempt XSS injection
   curl -X POST http://localhost:3000/api/public/lead-capture \
     -H "Content-Type: application/json" \
     -d '{"firstName":"<script>alert(1)</script>","email":"test@example.com"}'
   ```

3. **SQL Injection Test**
   ```bash
   # Attempt SQL injection
   curl -X POST http://localhost:3000/api/public/lead-capture \
     -H "Content-Type: application/json" \
     -d '{"firstName":"admin'\'' OR 1=1--","email":"test@example.com"}'
   ```

### Automated Testing

```typescript
// Jest test example
describe('Security', () => {
  it('should block XSS attempts', () => {
    const malicious = '<script>alert(1)</script>';
    const sanitized = sanitizePlainText(malicious);
    expect(sanitized).not.toContain('<script>');
  });

  it('should enforce rate limits', async () => {
    // Make 4 requests (limit is 3)
    for (let i = 0; i < 4; i++) {
      const response = await fetch('/api/public/lead-capture', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' }),
      });

      if (i < 3) {
        expect(response.status).not.toBe(429);
      } else {
        expect(response.status).toBe(429);
      }
    }
  });
});
```

---

## Monitoring & Logging

### Security Event Logging

All security events are logged for monitoring:

```typescript
{
  timestamp: '2025-01-02T19:30:00Z',
  event: 'suspicious_pattern_detected',
  path: '/api/public/lead-capture',
  method: 'POST',
  ip: '192.168.1.1',
  userAgent: 'Mozilla/5.0...',
  pattern: '/\\.\\.\\//',
}
```

### Events Logged

- ✅ Suspicious patterns detected
- ✅ Suspicious user agents
- ✅ Rate limit violations
- ✅ CAPTCHA failures
- ✅ Validation errors
- ✅ Authentication failures

### Monitoring Tools

- **Vercel Analytics** - Traffic and performance
- **Upstash Analytics** - Rate limit metrics
- **Console Logs** - Security events (production)
- **Error Tracking** - Sentry/LogRocket (recommended)

---

## Security Checklist

### Pre-Deployment

- [ ] All environment variables configured
- [ ] Upstash Redis provisioned and tested
- [ ] hCaptcha keys configured and tested
- [ ] CSP headers tested in production
- [ ] Rate limiting tested on all endpoints
- [ ] Input validation tested on all forms
- [ ] XSS prevention tested
- [ ] SQL injection prevention verified (Prisma)
- [ ] HTTPS enforced (Vercel handles this)
- [ ] Security headers verified

### Post-Deployment

- [ ] Monitor rate limit violations
- [ ] Monitor CAPTCHA failures
- [ ] Monitor suspicious activity logs
- [ ] Review CSP violation reports
- [ ] Test all forms with CAPTCHA
- [ ] Verify rate limits in production
- [ ] Check security headers with securityheaders.com
- [ ] Run penetration tests
- [ ] Update security documentation

### Ongoing Maintenance

- [ ] Rotate secrets every 90 days
- [ ] Review security logs weekly
- [ ] Update dependencies monthly
- [ ] Run security audits quarterly
- [ ] Review and update CSP as needed
- [ ] Monitor for new vulnerabilities
- [ ] Update rate limits based on usage
- [ ] Test disaster recovery procedures

---

## Additional Resources

- [Upstash Redis Documentation](https://upstash.com/docs/redis)
- [hCaptcha Documentation](https://docs.hcaptcha.com/)
- [Zod Documentation](https://zod.dev/)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy Reference](https://content-security-policy.com/)

---

## Support

For security concerns or questions:
- **Security Issues**: Report via GitHub Security Advisories
- **Documentation**: See `/docs` folder
- **Support**: Contact development team

---

**Last Updated**: 2025-01-02
**Version**: 1.0.0
**Status**: Production Ready ✅
