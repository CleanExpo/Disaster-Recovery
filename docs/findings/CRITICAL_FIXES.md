# 🚨 Critical Fixes Priority List

**Document Version:** 1.0.0  
**Last Updated:** 28 January 2025  
**Priority System:** P0 (Critical) → P1 (High) → P2 (Medium) → P3 (Low)  
**Timeline:** 4-Week Sprint Plan

---

## 🔴 P0 - CRITICAL (Week 1)
*System Breaking Issues - Fix Immediately*

### 1. Missing Technology Pages
**Impact:** Navigation breaks, 404 errors, poor UX  
**Effort:** 4 hours  
**Files to Create:**
```
src/app/technology/
├── page.tsx (Main technology hub)
├── ai/page.tsx (AI detection systems)
├── thermal/page.tsx (Thermal imaging)
└── hepa/page.tsx (HEPA filtration)
```

**Implementation:**
```typescript
// src/app/technology/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advanced Restoration Technology | Disaster Recovery',
  description: 'Cutting-edge technology for disaster recovery including AI detection, thermal imaging, and HEPA filtration systems.',
};

export default function TechnologyPage() {
  return (
    <div className="min-h-screen">
      {/* Technology hub content */}
    </div>
  );
}
```

### 2. Fix calculateLeadScore Import
**Impact:** API crashes on lead submission  
**Location:** `/src/app/api/leads/capture/route.ts`  
**Effort:** 2 hours

**Current (Broken):**
```typescript
import { calculateLeadScore } from '@/lib/lead-scoring'; // ❌ Doesn't exist
```

**Fix Required:**
```typescript
// Create src/lib/lead-scoring.ts
export function calculateLeadScore(data: LeadData): number {
  let score = 0;
  
  // Urgency scoring
  if (data.urgency === 'emergency') score += 40;
  else if (data.urgency === 'urgent') score += 30;
  else if (data.urgency === 'planning') score += 10;
  
  // Service type scoring
  const highValueServices = ['water', 'fire', 'mould'];
  if (highValueServices.includes(data.serviceType)) score += 20;
  
  // Property type scoring
  if (data.propertyType === 'commercial') score += 15;
  else if (data.propertyType === 'residential') score += 10;
  
  // Insurance scoring
  if (data.hasInsurance) score += 15;
  
  return Math.min(score, 100);
}
```

### 3. Create Schedule/Booking Page
**Impact:** CTA buttons lead to 404  
**Effort:** 6 hours  
**File:** `src/app/schedule/page.tsx`

**Implementation:**
```typescript
// src/app/schedule/page.tsx
'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

export default function SchedulePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    address: '',
    urgency: 'routine'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Connect to booking API
    const response = await fetch('/api/bookings/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    // Handle response
  };

  return (
    // Booking form implementation
  );
}
```

### 4. Fix Contact Form Backend
**Impact:** Lost leads, no customer contact  
**Location:** `/src/app/contact/page.tsx`  
**Effort:** 3 hours

**Current (Mock):**
```typescript
// Simulated submission - NOT WORKING
setTimeout(() => {
  setIsSubmitting(false);
  alert('Thank you! We will contact you soon.');
}, 2000);
```

**Fix Required:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const response = await fetch('/api/contact/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      // Success handling
      router.push('/contact/success');
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    setError('Failed to submit. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## 🟡 P1 - HIGH PRIORITY (Week 1-2)
*Security & Data Integrity Issues*

### 5. Implement Secure Authentication
**Impact:** Security vulnerability  
**Current:** localStorage (client-side)  
**Required:** JWT/Session-based  
**Effort:** 8 hours

**Implementation Plan:**
```typescript
// src/lib/auth-config.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Secure authentication logic
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return user;
        }
        return null;
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.id = user.id;
      return token;
    },
    session: async ({ session, token }) => {
      if (token) session.user.id = token.id;
      return session;
    }
  }
};
```

### 6. Standardise Australian Spelling
**Impact:** SEO, professionalism  
**Effort:** 2 hours

**Find & Replace Required:**
```
mold → mould (all instances)
color → colour (where appropriate)
center → centre (where appropriate)
organize → organise
realize → realise
optimization → optimisation
```

**Affected Files:**
- Service pages
- Navigation links
- API endpoints
- Database fields

### 7. Add Security Headers
**Impact:** Security vulnerabilities  
**Location:** `next.config.js`  
**Effort:** 1 hour

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'"
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## 🟠 P2 - MEDIUM PRIORITY (Week 2-3)
*Performance & Code Quality*

### 8. Clean Up Legacy Files
**Impact:** Code maintainability  
**Effort:** 2 hours

**Files to Delete:**
```
src/app/page-backup.tsx
src/app/page-old.tsx
src/app/page-with-framer.tsx
disaster-recovery-react/ (entire folder)
disaster-recovery-website/ (entire folder)
disaster-recovery/ (duplicate folder)
```

### 9. Implement Email Service
**Impact:** Communication with customers  
**Effort:** 4 hours

```typescript
// src/lib/email-service.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
  text
}: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
      text,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error };
  }
}
```

### 10. Add Form Validation
**Impact:** Data quality, UX  
**Effort:** 4 hours

```typescript
// src/lib/validation.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(\+61|0)[2-9]\d{8}$/, 'Invalid Australian phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  service: z.enum(['water', 'fire', 'mould', 'other']),
  urgency: z.enum(['emergency', 'urgent', 'routine'])
});

export const bookingSchema = z.object({
  date: z.string().refine(val => new Date(val) > new Date(), 'Date must be in future'),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
  address: z.string().min(10, 'Please provide full address'),
  propertyType: z.enum(['residential', 'commercial', 'industrial']),
});
```

### 11. Optimise Images
**Impact:** Performance  
**Effort:** 3 hours

**Actions Required:**
1. Convert all JPG/PNG to WebP
2. Implement responsive images
3. Add lazy loading
4. Use Next.js Image component

```typescript
import Image from 'next/image';

// Replace
<img src="/images/service.jpg" alt="Service" />

// With
<Image
  src="/images/service.webp"
  alt="Service"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  blurDataURL={blurDataUrl}
/>
```

---

## 🟢 P3 - LOW PRIORITY (Week 3-4)
*Enhancements & Optimisations*

### 12. Implement Caching Strategy
**Technology:** Redis/Vercel KV  
**Effort:** 6 hours

```typescript
// src/lib/cache.ts
import { Redis } from '@vercel/kv';

const redis = new Redis({
  url: process.env.KV_URL,
  token: process.env.KV_TOKEN,
});

export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 3600
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) return cached as T;
  
  const fresh = await fetcher();
  await redis.set(key, fresh, { ex: ttl });
  return fresh;
}
```

### 13. Add Loading States
**Impact:** UX improvement  
**Effort:** 4 hours

```typescript
// src/components/LoadingStates.tsx
export function ServiceCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-gray-200 rounded-t-lg"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}
```

### 14. Implement Error Logging
**Service:** Sentry/LogRocket  
**Effort:** 3 hours

```typescript
// src/lib/monitoring.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Filter sensitive data
    return event;
  }
});

export function logError(error: Error, context?: any) {
  Sentry.captureException(error, {
    extra: context
  });
}
```

### 15. Add Analytics
**Service:** Google Analytics 4  
**Effort:** 2 hours

```typescript
// src/app/layout.tsx
import Script from 'next/script';

<Script
  strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `}
</Script>
```

---

## 📊 Implementation Metrics

### Success Criteria
| Fix | Success Metric | Target |
|-----|---------------|--------|
| Missing Pages | Zero 404 errors | 100% |
| API Functions | All endpoints functional | 100% |
| Forms | Lead capture rate | >80% |
| Authentication | Security audit pass | A+ |
| Performance | Lighthouse score | >90 |
| Testing | Code coverage | >80% |

### Timeline Overview
```
Week 1: P0 Critical Fixes (1-4)
├── Day 1-2: Missing pages & routes
├── Day 3: API fixes
├── Day 4-5: Form backends

Week 2: P1 Security & Data (5-7)
├── Day 1-3: Authentication
├── Day 4: Spelling standardisation
└── Day 5: Security headers

Week 3: P2 Quality & Performance (8-11)
├── Day 1: Cleanup
├── Day 2-3: Email service
├── Day 4-5: Validation & optimisation

Week 4: P3 Enhancements (12-15)
├── Day 1-2: Caching
├── Day 3: Loading states
└── Day 4-5: Monitoring & analytics
```

---

## ✅ Definition of Done

Each fix is considered complete when:
1. ✅ Code implemented and tested
2. ✅ No TypeScript errors
3. ✅ Responsive design verified
4. ✅ Accessibility checked
5. ✅ Documentation updated
6. ✅ Code reviewed
7. ✅ Deployed to staging
8. ✅ Smoke tested

---

**Document Status:** Active  
**Next Update:** Daily during sprint  
**Owner:** Development Team  
**Approval:** CTO Required for P0 changes