# Bug Fixes & Known Issues

**Purpose**: Record bugs found, fixes applied, and workarounds for known issues.

---

## Fixed Bugs

### 2025-12-25: Prisma Connection Pool Exhaustion

**Issue**: Database connections not being released, causing "Too many connections" errors

**Root Cause**: Multiple Prisma Client instances created in development

**Fix**:
```typescript
// lib/db/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

**Outcome**: Single Prisma Client instance, no more connection errors

---

### 2025-12-20: NextAuth Session Not Persisting

**Issue**: Users logged out after page refresh

**Root Cause**: Missing NEXTAUTH_SECRET environment variable

**Fix**:
```bash
NEXTAUTH_SECRET="generated-secret-key"
NEXTAUTH_URL="https://disasterrecovery.com.au"
```

**Outcome**: Sessions persist correctly

---

### 2025-12-15: Stripe Webhook Signature Verification Failure

**Issue**: Webhook events rejected with "Invalid signature"

**Root Cause**: Reading request body as JSON before verification

**Fix**:
```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(request: NextRequest) {
  const body = await request.text() // NOT request.json()
  const sig = request.headers.get('stripe-signature')!

  const event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  // ...
}
```

**Outcome**: Webhooks verified successfully

---

### 2025-12-10: Australian Postcode Validation

**Issue**: Valid postcodes (e.g., 0200, 0800) rejected as invalid

**Root Cause**: Regex only accepted 4-digit numbers without leading zeros

**Fix**:
```typescript
const POSTCODE_REGEX = /^[0-9]{4}$/
const isValidPostcode = (postcode: string) => {
  const num = parseInt(postcode)
  return POSTCODE_REGEX.test(postcode) && num >= 200 && num <= 9999
}
```

**Outcome**: All Australian postcodes (0200-9999) accepted

---

### 2025-12-05: Race Condition in Agent Orchestrator

**Issue**: Multiple agents processing same inspection data simultaneously

**Root Cause**: Workflow state not locked during processing

**Fix**:
```typescript
const workflow = await prisma.workflow.update({
  where: { id, status: 'PENDING' },
  data: { status: 'PROCESSING', lockedAt: new Date() }
})

if (!workflow) {
  throw new Error('Workflow already locked')
}
```

**Outcome**: Sequential processing, no race conditions

---

## Known Issues (Not Yet Fixed)

### Issue: Slow Image Upload on Mobile (Low Priority)

**Description**: Image uploads >5MB take >30 seconds on mobile networks

**Workaround**: Compress images client-side before upload

**Status**: Investigating client-side compression libraries

**ETA**: Next sprint

---

### Issue: Occasional Redis Connection Timeout (Low Priority)

**Description**: Redis operations timeout after 5 seconds during high load

**Workaround**: Retry logic implemented (3 attempts)

**Status**: Monitoring frequency, may need to increase connection pool

**ETA**: TBD based on monitoring data

---

## Common Debugging Tips

### Database Query Slow

**Check**:
1. Missing indexes (`prisma/schema.prisma` @@index)
2. N+1 query problem (use include sparingly)
3. Large result sets (use pagination)

**Fix**:
```prisma
model User {
  id String @id
  email String @unique

  @@index([email])  // Add index for common queries
}
```

---

### API Route Returns 500

**Check**:
1. Environment variables missing
2. Database connection failed
3. Unhandled promise rejection

**Debug**:
```typescript
try {
  // operation
} catch (error) {
  logger.error('API error', { error, stack: error.stack })
  throw error
}
```

---

### TypeScript Build Errors

**Check**:
1. Strict mode violations (null checks)
2. Missing type definitions
3. Circular imports

**Fix**: Run `npm run typecheck` to see all errors

---

**Last Updated**: 2025-12-30
**Agents**: Read this file to avoid repeating known bugs and apply established fixes.
