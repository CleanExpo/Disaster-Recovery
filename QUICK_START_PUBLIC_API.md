# Quick Start: Public API Development

## 🚀 Getting Started (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create `.env.local`:
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/disaster_recovery"
DIRECT_URL="postgresql://user:password@localhost:5432/disaster_recovery"

# CAPTCHA (optional for development)
RECAPTCHA_SECRET_KEY="your_secret_key_here"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### 3. Run Database Migration
```bash
# Apply the new public API tables
psql -U postgres -d disaster_recovery -f prisma/migrations/add_public_api_tables.sql

# Or generate and apply with Prisma
npx prisma generate
npx prisma db push
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Test Endpoints
```bash
# Test lead capture
curl -X POST http://localhost:3000/api/public/lead-capture \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com",
    "phone": "0412345678",
    "propertyAddress": "123 Main St",
    "suburb": "Sydney",
    "state": "NSW",
    "postcode": "2000",
    "damageType": "WATER_DAMAGE",
    "damageDescription": "Burst pipe causing water damage",
    "hasInsurance": true,
    "urgency": "URGENT",
    "marketingConsent": true
  }'
```

---

## 📚 Common Tasks

### Adding a New Public Endpoint

1. **Create route file:**
```bash
mkdir -p app/api/public/my-endpoint
touch app/api/public/my-endpoint/route.ts
```

2. **Use the template:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { standardRateLimit } from '@/lib/api/rate-limit';
import { verifyRecaptcha, addSecurityHeaders } from '@/lib/api/security';
import { withErrorHandler, successResponse, Logger } from '@/lib/api/error-handler';

const prisma = new PrismaClient();

async function handleMyEndpoint(req: NextRequest) {
  const logger = new Logger({ endpoint: '/api/public/my-endpoint' });

  // 1. Rate limiting
  const rateLimitResult = await standardRateLimit(req);
  if (rateLimitResult) return rateLimitResult;

  // 2. Parse and validate
  const body = await req.json();

  // 3. CAPTCHA verification
  if (body.captchaToken) {
    const captchaResult = await verifyRecaptcha(body.captchaToken);
    if (!captchaResult.success) {
      throw new ValidationError('CAPTCHA verification failed');
    }
  }

  // 4. Your logic here
  const result = await prisma.myModel.create({ data: body });

  // 5. Return response
  const response = successResponse({ message: 'Success', data: result });
  return addSecurityHeaders(response, { csp: 'strict', cors: true });
}

export const POST = withErrorHandler(handleMyEndpoint);
```

3. **Add validation schema in `lib/api/validation-schemas.ts`:**
```typescript
export const myEndpointSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  // ... other fields
  captchaToken: captchaSchema,
  honeypot: honeypotSchema,
});
```

---

## 🔧 Development Tips

### Bypass CAPTCHA in Development
CAPTCHA is automatically bypassed when `NODE_ENV=development` and secret key is not set.

### Test Rate Limiting
Rate limits are per-IP. Use different IPs or clear the in-memory store by restarting the server.

### View Logs
Logs are colored in development for easy reading:
- 🔵 DEBUG (Cyan)
- 🟢 INFO (Green)
- 🟡 WARN (Yellow)
- 🔴 ERROR (Red)

### Check Database
```bash
# Connect to database
psql -U postgres -d disaster_recovery

# View lead captures
SELECT * FROM "LeadCapture" ORDER BY "submittedAt" DESC LIMIT 10;

# View triage assessments
SELECT * FROM "TriageAssessment" ORDER BY "createdAt" DESC LIMIT 10;

# View newsletter subscriptions
SELECT * FROM "NewsletterSubscription" WHERE "isActive" = true;

# View contractor inquiries
SELECT * FROM "ContractorInquiry" ORDER BY "applicationScore" DESC;
```

---

## 🧪 Testing

### Manual Testing with cURL

**Lead Capture:**
```bash
curl -X POST http://localhost:3000/api/public/lead-capture \
  -H "Content-Type: application/json" \
  -d @test-data/public-api-examples.json
```

**Triage:**
```bash
curl -X POST http://localhost:3000/api/public/triage \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "postcode": "2000",
    "responses": [
      {"questionId": "water_standing", "answer": true},
      {"questionId": "affected_area", "answer": "entire floor"}
    ]
  }'
```

**Newsletter:**
```bash
curl -X POST http://localhost:3000/api/public/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "marketingConsent": true
  }'
```

**Contractor Inquiry:**
```bash
curl -X POST http://localhost:3000/api/public/contractor-inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Test Restoration",
    "abn": "53004085616",
    "businessType": "COMPANY",
    "contactFirstName": "John",
    "contactLastName": "Smith",
    "contactEmail": "john@test.com",
    "contactPhone": "0412345678",
    "businessAddress": "123 Test St",
    "suburb": "Sydney",
    "state": "NSW",
    "postcode": "2000",
    "servicesOffered": ["WATER_DAMAGE"],
    "serviceAreas": ["NSW"],
    "hasPublicLiability": true,
    "publicLiabilityAmount": 10000000,
    "hasWorkersCompensation": true,
    "yearsInBusiness": 5,
    "numberOfEmployees": 10,
    "termsAccepted": true,
    "backgroundCheckConsent": true
  }'
```

### Testing with Postman

Import the collection (coming soon) or create requests manually:
1. Set method to POST
2. Set URL to `http://localhost:3000/api/public/{endpoint}`
3. Set header: `Content-Type: application/json`
4. Add body from `test-data/public-api-examples.json`

---

## 🐛 Debugging

### Common Issues

**"Rate limit exceeded"**
- Solution: Restart server or wait for window to expire
- Development tip: Increase limits in `lib/api/rate-limit.ts`

**"CAPTCHA verification failed"**
- Solution: Set `RECAPTCHA_SECRET_KEY` or leave unset for dev bypass
- Check: `NODE_ENV=development`

**"Validation failed"**
- Check: Request body matches schema in `validation-schemas.ts`
- Tip: Error response shows which fields failed

**"Database error"**
- Check: Database is running
- Check: Migration applied
- Run: `npx prisma db push`

**"Module not found"**
- Run: `npm install`
- Check: TypeScript paths are correct (`@/lib/...`)

### Enable Debug Logging

Add this to your endpoint:
```typescript
const logger = new Logger({ endpoint: '/api/...' });
logger.debug('Request body', { body });
logger.debug('After validation', { data });
```

---

## 📖 Key Files Reference

| File | Purpose |
|------|---------|
| `lib/api/rate-limit.ts` | Rate limiting middleware |
| `lib/api/security.ts` | CAPTCHA, security headers, validation |
| `lib/api/validation-schemas.ts` | Zod schemas for all endpoints |
| `lib/api/error-handler.ts` | Error handling and logging |
| `app/api/public/*/route.ts` | Endpoint implementations |
| `test-data/public-api-examples.json` | Sample request payloads |

---

## 🔐 Security Checklist

Before deploying to production:
- [ ] Set all environment variables
- [ ] Configure CAPTCHA secret key
- [ ] Set allowed CORS origins (not `*`)
- [ ] Enable Redis for distributed rate limiting
- [ ] Test rate limiting under load
- [ ] Run security audit
- [ ] Test with production-like data
- [ ] Configure monitoring and alerts
- [ ] Set up error tracking (Sentry)
- [ ] Review logs for sensitive data exposure

---

## 📞 Need Help?

### Documentation
- [Public API README](app/api/public/README.md)
- [Implementation Guide](PUBLIC_API_IMPLEMENTATION.md)
- [Test Examples](test-data/public-api-examples.json)

### Contacts
- **Technical Issues:** tech@disasterrecovery.com.au
- **Security Questions:** security@disasterrecovery.com.au
- **Slack:** #public-api-dev

---

## 🎯 Quick Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run start                  # Start production server

# Database
npx prisma studio             # Visual database editor
npx prisma db push            # Push schema changes
npx prisma generate           # Regenerate client

# Testing
curl http://localhost:3000/api/public/lead-capture  # Quick test
npm run test                  # Run tests (when added)

# Logs
tail -f .next/server.log      # Watch server logs
```

---

**Happy coding! 🚀**
