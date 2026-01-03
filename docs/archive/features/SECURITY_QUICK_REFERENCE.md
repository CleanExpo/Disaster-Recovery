# Security Quick Reference

**Quick guide for implementing security features in the NRPG platform**

---

## Setup Checklist

### 1. Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Required for Rate Limiting
UPSTASH_REDIS_REST_URL=https://your-endpoint.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# Required for CAPTCHA
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
HCAPTCHA_SECRET_KEY=your_hcaptcha_secret_key
```

**Get Upstash Redis**: https://console.upstash.com/
**Get hCaptcha Keys**: https://dashboard.hcaptcha.com/

---

## Using Security Features

### Rate Limiting

Rate limiting is automatic on these endpoints:
- `/api/public/lead-capture` - 3/hour per IP
- `/api/public/contractor-inquiry` - 5/day per IP
- `/api/auth/*` - 5/15min per IP
- All other `/api/*` - 100/min per IP

No code changes needed - handled by middleware!

---

### CAPTCHA Verification

#### Client-Side (React Component)

```tsx
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useState } from 'react';

function MyForm() {
  const [captchaToken, setCaptchaToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      alert('Please complete the CAPTCHA');
      return;
    }

    const response = await fetch('/api/public/lead-capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // ... your form data
        captchaToken,
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}

      <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
        onVerify={(token) => setCaptchaToken(token)}
        onExpire={() => setCaptchaToken('')}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

#### Server-Side (API Route)

```typescript
import { verifyCaptchaMiddleware } from '@/lib/security/captcha';
import { getClientIp } from '@/lib/security/rate-limit';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const clientIp = getClientIp(request);

  // Verify CAPTCHA
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

  // Continue with request...
}
```

---

### Input Validation

Use Zod schemas to validate all user inputs:

```typescript
import { LeadCaptureSchema } from '@/lib/security/validation-schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate and parse input
    const validatedData = LeadCaptureSchema.parse(body);

    // validatedData is now type-safe and sanitized

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
  }
}
```

**Available Schemas:**
- `LeadCaptureSchema` - Lead capture forms
- `ContractorInquirySchema` - Contractor inquiries
- `ClaimSubmissionSchema` - Insurance claims
- `ContactFormSchema` - Contact forms
- `NRPGApplicationSchema` - NRPG applications
- `FileUploadSchema` - File uploads

---

### XSS Prevention

Sanitize user input before displaying:

```typescript
import {
  sanitizeHtml,
  sanitizePlainText,
  sanitizeUrl
} from '@/lib/security/sanitize';

// Remove all HTML
const safeName = sanitizePlainText(userInput);

// Allow safe HTML tags only
const safeDescription = sanitizeHtml(userInput, {
  allowedTags: ['p', 'br', 'strong', 'em'],
});

// Sanitize URLs (blocks javascript:, data:, etc.)
const safeLink = sanitizeUrl(userUrl);

// Sanitize entire object
const safeData = sanitizeObject(formData, {
  allowHtml: false,
  stripWhitespace: true,
});
```

---

## Security Headers

Already configured in `next.config.mjs`:

✅ Content Security Policy (CSP)
✅ X-Frame-Options: DENY
✅ X-Content-Type-Options: nosniff
✅ X-XSS-Protection: 1; mode=block
✅ Strict-Transport-Security (HSTS)
✅ Referrer-Policy
✅ Permissions-Policy

No action needed!

---

## Creating a Secure API Route

**Complete template:**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { YourSchema } from '@/lib/security/validation-schemas';
import { verifyCaptchaMiddleware } from '@/lib/security/captcha';
import { sanitizeObject } from '@/lib/security/sanitize';
import { getClientIp } from '@/lib/security/rate-limit';
import { ZodError } from 'zod';

/**
 * POST /api/your-endpoint
 * Rate Limited: Automatic via middleware
 * CAPTCHA Required: Yes
 */
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
    // ... your business logic

    // 6. Return response
    return NextResponse.json(
      { success: true, data: sanitizedData },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
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

### Test Rate Limiting

```bash
# Send 5 requests quickly
for i in {1..5}; do
  curl -X POST http://localhost:3000/api/public/lead-capture \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","captchaToken":"test"}'
done

# Expected: 429 Too Many Requests on 4th request
```

### Test XSS Prevention

```typescript
const malicious = '<script>alert("XSS")</script>';
const safe = sanitizePlainText(malicious);
console.log(safe); // Output: alert("XSS")
```

### Test Input Validation

```typescript
try {
  LeadCaptureSchema.parse({
    email: 'invalid-email', // Will fail
  });
} catch (error) {
  console.log(error.errors); // Validation errors
}
```

---

## Common Issues & Solutions

### Issue: Rate limit not working

**Solution:**
1. Check `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in `.env.local`
2. Verify Upstash Redis database is active
3. In development, rate limiting is skipped if not configured

### Issue: CAPTCHA verification fails

**Solution:**
1. Check `HCAPTCHA_SECRET_KEY` in `.env.local`
2. Verify `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` matches your domain
3. Check network requests in browser DevTools
4. Ensure CAPTCHA token is sent in request body

### Issue: Validation errors

**Solution:**
1. Check schema requirements in `/src/lib/security/validation-schemas.ts`
2. Ensure all required fields are present
3. Verify data types match schema
4. Check regex patterns for format requirements

---

## Security Monitoring

### What to Monitor

- Rate limit violations (check Upstash analytics)
- CAPTCHA failures (check server logs)
- Validation errors (check error tracking)
- Suspicious activity (check middleware logs)

### Log Locations

- **Development**: Console output
- **Production**: Vercel logs or error tracking service

---

## Production Deployment

### Pre-Deploy Checklist

- [ ] Upstash Redis configured
- [ ] hCaptcha keys configured
- [ ] All environment variables set in Vercel
- [ ] Security headers tested
- [ ] Rate limiting tested
- [ ] CAPTCHA tested on all forms
- [ ] Input validation tested

### Post-Deploy Verification

```bash
# Test security headers
curl -I https://your-domain.com

# Test rate limiting
# (Make multiple requests to /api/public/lead-capture)

# Test CAPTCHA
# (Submit form without CAPTCHA token)
```

---

## Additional Resources

- **Full Documentation**: `/docs/SECURITY_IMPLEMENTATION.md`
- **Upstash Docs**: https://upstash.com/docs/redis
- **hCaptcha Docs**: https://docs.hcaptcha.com/
- **Zod Docs**: https://zod.dev/
- **CSP Reference**: https://content-security-policy.com/

---

## Support

For security questions or issues:
- Check `/docs/SECURITY_IMPLEMENTATION.md` for detailed guide
- Review example API routes in `/src/app/api/public/`
- Contact development team for assistance

---

**Last Updated**: 2025-01-02
**Status**: Production Ready ✅
