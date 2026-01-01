# Client Onboarding System - Complete Technical Specification

**Project:** NRPG Disaster Recovery Platform - Client Onboarding
**Version:** 1.0.0
**Date:** 2026-01-02
**Status:** Specification Phase
**Branch:** `client-onboarding`

---

## Executive Summary

Build a comprehensive 7-phase client onboarding system following the proven contractor onboarding pattern (Phases 1-7 completed). Transform the current basic 5-step modal into a production-grade multi-page system with progress tracking, education modules, AI-powered matching, email notifications, WebSocket real-time sync, and admin analytics.

### Strategic Objectives
1. **Educate clients** about disaster recovery process (completion valuable regardless of immediate requests)
2. **Build brand trust** through NRPG certification emphasis and insurance expertise
3. **Optimize conversion** using ML-powered A/B testing and progressive disclosure
4. **Enable high-value client tiers** with VIP pathways for property managers and large claims
5. **Ensure accessibility** with WCAG 2.1 AAA compliance from day 1

---

## Table of Contents

1. [User Journey & Flow](#user-journey--flow)
2. [Strategic Requirements](#strategic-requirements)
3. [Technical Architecture](#technical-architecture)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [UI/UX Specifications](#uiux-specifications)
7. [Phase-by-Phase Breakdown](#phase-by-phase-breakdown)
8. [AI/ML Integration](#aiml-integration)
9. [Email Notifications](#email-notifications)
10. [Security & Privacy](#security--privacy)
11. [Accessibility](#accessibility)
12. [Performance & Scalability](#performance--scalability)
13. [Analytics & Monitoring](#analytics--monitoring)
14. [Edge Cases & Error Handling](#edge-cases--error-handling)
15. [Success Metrics](#success-metrics)

---

## User Journey & Flow

### Primary Flow (Standard Onboarding - 7 Phases)
```
Sign Up → Welcome → Profile → Services → Property → Insurance → Payment → Communication → Education → Complete
   ↓         ↓          ↓          ↓          ↓           ↓           ↓              ↓             ↓          ↓
 Account   Phase 1   Phase 1    Phase 2    Phase 3     Phase 4     Phase 5       Phase 6       Phase 7   Actions
```

**Time-Aware Progressive Disclosure:**
- **Core Phases (Required Immediately):** Phases 1-3 (Profile, Services, Property) = ~10 minutes
- **Enhanced Phases (Unlock Progressively):** Phases 4-7 unlock after first service request or 7 days
- **Rationale:** Reduce initial friction, capture essential data, defer optional phases

### Emergency Fast-Track Flow (3-Phase Compressed)
```
Emergency Entry → Express Profile → Express Property → Service Type → DISPATCH
       ↓               ↓                  ↓                  ↓            ↓
  Detected        Name+Phone+      Address+Access        Water/Fire    Match
  Urgency         Emergency        Instructions          /Mold/etc.   Contractors
                  Contact

Post-Emergency: Complete Phases 4-7 later (prompted via email Day 3 after job completion)
```

### High-Value Client Flow (VIP Track)
```
Detected as High-Value → Dedicated Account Manager → Expedited Verification → Premium Matching
         ↓                        ↓                             ↓                    ↓
  Property Manager         Human assisted           Skip Phase 4-6          Priority
  Verified Insurance       onboarding              (pre-verified)         contractors
  Repeat Client            1-on-1 support          Fast-track              Top-rated
  $25k+ Claim             Phone call                                      Available 24/7
```

**High-Value Detection Triggers:**
1. **Property Manager/Strata Manager:** Detected when propertyOwnershipStatus = 'property_manager' or 'strata_manager'
2. **Verified Insurance:** Policy uploaded + verified during Phase 4
3. **Repeat Client:** 2+ completed service requests with rating >4.0
4. **High-Value Claim:** Estimated damage >$25,000 AUD in service request

---

## Strategic Requirements

### 1. Re-engagement Strategy
**Abandonment Handling (Soft Touch):**
- Client abandons at any phase → Wait 48 hours
- Send single reminder email: "You're 60% complete - pick up where you left off"
- Include direct deep link to exact incomplete phase
- No additional follow-ups (respect client's decision)
- Track abandonment reason if provided

### 2. Insurance Philosophy
**Optional During Onboarding, Required at Claim:**
- Phase 4 (Insurance) is **optional**
- Can skip and complete phases 5-7
- System prompts for insurance upload when:
  - Service request status changes to 'MATCHED' (contractor accepted)
  - Before work commencement
  - Required for insurance claim submission
- **Benefit:** Lower onboarding friction, collect when genuinely needed

### 3. Emergency vs. Planning Detection
**Dual-Path Dashboard Presentation:**
```
Client Dashboard (After Login):

┌─────────────────────────────────────────────────────────┐
│  [🚨 EMERGENCY SERVICE - Get Help Now →]                │  ← Red, prominent
│                                                           │
│  [ Complete Your Profile - Recommended ]                 │  ← Green, secondary
└─────────────────────────────────────────────────────────┘

Emergency Button: Fast-track 3-phase onboarding
Profile Button: Full 7-phase onboarding
```

### 4. Value Proposition (Differentiation from Competitors)
**Emphasize in onboarding UI at multiple touchpoints:**
1. **NRPG Certification & Quality Guarantee**
   - Badge on every page: "Only NRPG-Certified Contractors"
   - Tooltip: "Rigorous training, insurance verified, background checked"

2. **Insurance Claim Expertise**
   - Phase 4 highlight: "We work directly with your insurer"
   - Module 2: "Understanding Your Insurance Claim" education

3. **Speed of Response for Emergencies**
   - Stat display: "Average 30-minute response time"
   - "24/7 emergency dispatch" badge

4. **Transparent Pricing**
   - Show: "No hidden platform fees"
   - Display: "What you see is what you pay"

### 5. High-Value Client Tiers

**Tier 1: Property Manager / Strata Manager**
- **Detection:** propertyOwnershipStatus selection in Phase 1
- **VIP Treatment:**
  - Dedicated account manager contact info
  - Bulk property import tool (CSV upload)
  - Priority contractor matching
  - Commercial insurance specialists
  - Monthly reporting dashboard

**Tier 2: Verified Insurance Client**
- **Detection:** Insurance uploaded + policy verified in Phase 4
- **Benefits:**
  - "Verified Insurance" badge on profile
  - Fast-track claims processing
  - Guaranteed payment protection for contractors
  - Access to insurance-preferred contractor network

**Tier 3: Repeat Client**
- **Detection:** 2+ completed service requests with rating ≥4.0
- **Benefits:**
  - Loyalty badge
  - 5% discount on future requests
  - Priority support
  - Saved preferences auto-applied
  - Streamlined re-booking

**Tier 4: High-Value Claim**
- **Detection:** Service request with estimated damage ≥$25,000 AUD
- **Benefits:**
  - Project manager assigned
  - Insurance liaison support
  - Senior contractor matching only
  - Dedicated claims documentation help
  - Progress reporting

---

## Technical Architecture

### Tech Stack
- **Frontend:** Next.js 14, React 18, TypeScript
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL 15
- **Real-time:** WebSockets (Socket.io)
- **Payments:** Stripe
- **Email:** Nodemailer (SendGrid/AWS SES)
- **File Upload:** AWS S3 / Cloudinary
- **Analytics:** Custom service + Hotjar/FullStory session recordings
- **Offline:** IndexedDB for auto-save drafts
- **Localization:** next-intl (5+ languages)
- **Accessibility:** react-aria, radix-ui primitives

### Real-Time Sync Architecture

**WebSocket Implementation:**
```typescript
// Server: app/api/socket/route.ts
import { Server } from 'socket.io';

// When client updates onboarding progress:
socket.emit('onboarding:progress', {
  userId,
  phase,
  completionPercentage,
  timestamp
});

// All client's connected tabs receive:
socket.on('onboarding:progress', (data) => {
  updateLocalState(data);
  refreshUI();
});
```

**Use Cases:**
- Client fills form on mobile, sees progress update on desktop immediately
- Family member helps on another device, real-time coordination
- Admin views client progress live during support call

### Offline-First Architecture

**Auto-Save with IndexedDB:**
```typescript
// Save draft every 30 seconds
useEffect(() => {
  const interval = setInterval(() => {
    saveToIndexedDB({
      phase: currentPhase,
      formData: form.getValues(),
      timestamp: Date.now(),
      synced: false
    });
  }, 30000);

  return () => clearInterval(interval);
}, [currentPhase, form]);

// On reconnection, sync to server
useEffect(() => {
  if (isOnline) {
    syncPendingDrafts();
  }
}, [isOnline]);
```

**Error Recovery:**
- Connection drops → Show "Offline - Changes saved locally" banner
- User continues filling form → All data saved to IndexedDB
- Connection restored → Auto-sync to server
- Stripe payment → Block until online (cannot process offline)

### AI/ML Integration

**1. Full AI Training Data Pipeline**

**Data Collection:**
```typescript
interface OnboardingTrainingData {
  userId: string; // For ML training
  phase: string;
  selections: Record<string, any>;
  timeSpent: number;
  deviceType: 'mobile' | 'desktop' | 'tablet';
  browserLang: string;
  completed: boolean;
  abandonedAt?: string;

  // Outcome data (for supervised learning)
  createdServiceRequest: boolean;
  contractorMatched: boolean;
  jobCompleted: boolean;
  satisfaction: number; // 1-5 stars
}
```

**ML Models to Train:**
1. **Smart Default Predictor**
   - Input: Postcode, property type, season, time of day
   - Output: Top 3 likely service types to pre-select
   - Algorithm: Gradient Boosting (XGBoost)

2. **Abandonment Risk Predictor**
   - Input: Time on phase, mouse hesitation, form errors, device type
   - Output: Probability of abandonment (0-1)
   - Trigger: If >0.7, show inline help or offer human assistance

3. **High-Value Client Classifier**
   - Input: Email domain, property address, insurance provider, claim size estimate
   - Output: VIP tier prediction
   - Algorithm: Random Forest

4. **Contractor Match Quality Predictor**
   - Input: Client preferences + property + contractor profile
   - Output: Match quality score (0-100)
   - Algorithm: Neural Network (TensorFlow.js)

**Privacy Compliance:**
- Store training data with consent (opt-in during Phase 6)
- Anonymize before ML training (replace PII with hashed IDs)
- Allow data export and deletion (GDPR compliance)

**2. Automated A/B Testing**

**If Phase 5 (Payment) shows 60% drop-off:**
```typescript
// Automatic experiment creation
const experiment = await createExperiment({
  name: 'Payment Phase - Deferred vs Immediate',
  variants: [
    { id: 'control', flow: 'Phase 5 immediate', traffic: 0.5 },
    { id: 'deferred', flow: 'Phase 5 moved to post-completion', traffic: 0.5 }
  ],
  metric: 'onboarding_completion_rate',
  duration: '14 days',
  minimumSampleSize: 1000
});

// Route users to variants
const variant = await getExperimentVariant(userId, 'payment-timing');
if (variant === 'deferred') {
  skipPhase5();
  deferToPostCompletion();
}

// Auto-declare winner at 95% confidence
if (experiment.statistical_significance > 0.95) {
  adoptWinner();
  updateDefaultFlow();
}
```

### Localization Strategy

**Supported Languages (Auto-Detect):**
1. English (en-AU) - Primary
2. Mandarin Chinese (zh-CN)
3. Arabic (ar)
4. Vietnamese (vi)
5. Greek (el)

**Implementation:**
```typescript
// app/[locale]/dashboard/client/onboarding/page.tsx
import { useTranslations } from 'next-intl';

const t = useTranslations('Onboarding');

<h1>{t('welcome.title')}</h1>
<p>{t('welcome.subtitle')}</p>
```

**Translation Files:**
- `messages/en-AU.json`
- `messages/zh-CN.json`
- `messages/ar.json`
- `messages/vi.json`
- `messages/el.json`

**Auto-Detection:**
- Use `navigator.language` from browser
- Fall back to IP geolocation if language unsupported
- Allow manual language selector in Phase 6 (Communication)

---

## Database Schema

### New Tables (7 Models)

#### 1. ClientProfile
```prisma
model ClientProfile {
  id                      String   @id @default(cuid())
  userId                  String   @unique
  displayName             String?
  phoneNumber             String?
  phoneNumberVerified     Boolean  @default(false)
  preferredContactMethod  String   @default("email")
  timezone                String   @default("Australia/Sydney")
  language                String   @default("en-AU")
  propertyOwnershipStatus String?
  propertyCount           Int      @default(1)
  isProfileComplete       Boolean  @default(false)

  // High-value client tier
  tier                    String   @default("standard") // standard, property_manager, verified_insurance, repeat, high_value
  vipAssignedManagerId    String?

  // Risk assessment
  riskZone                String?  // flood_zone, bushfire_zone, cyclone_zone
  riskAssessmentOffered   Boolean  @default(false)
  riskAssessmentCompleted Boolean  @default(false)

  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt

  user              User                     @relation(fields: [userId], references: [id], onDelete: Cascade)
  properties        ClientProperty[]
  insurance         ClientInsurance?
  payment           ClientPayment?
  emergencyContacts ClientEmergencyContact[]
  onboarding        ClientOnboarding?

  @@index([tier])
  @@index([riskZone])
  @@map("client_profiles")
}
```

#### 2. ClientProperty
```prisma
model ClientProperty {
  id                  String          @id @default(cuid())
  clientProfileId     String
  streetAddress       String
  suburb              String
  postcode            String
  state               AustralianState
  country             String          @default("AU")
  propertyType        String          // residential_house, commercial_office, etc.
  propertySize        String?
  buildingAge         String?

  // Encrypted access instructions (client-specific encryption key)
  accessInstructions  String?         @db.Text // ENCRYPTED
  accessKeyId         String?         // Reference to encryption key

  parkingAvailable    Boolean         @default(true)
  securityAccess      Boolean         @default(false)
  petOnPremises       Boolean         @default(false)
  petDetails          String?         // "3 dogs - friendly" (helps contractor prepare)

  // Preventive service recommendations
  recommendedServices String[]        // Auto-populated based on risk zone

  isPrimary           Boolean         @default(false)
  createdAt           DateTime        @default(now())
  updatedAt           DateTime        @updatedAt

  clientProfile ClientProfile @relation(fields: [clientProfileId], references: [id], onDelete: Cascade)

  @@index([clientProfileId])
  @@index([postcode])
  @@index([state])
  @@map("client_properties")
}
```

#### 3. ClientInsurance
```prisma
model ClientInsurance {
  id                    String    @id @default(cuid())
  clientProfileId       String    @unique
  hasInsurance          Boolean   @default(false)
  insuranceProvider     String?   // NRMA, Suncorp, Allianz, QBE, etc.
  policyNumber          String?
  policyExpiryDate      DateTime?
  policyDocumentUrls    String[]  // S3 URLs

  // Verification status
  policyVerified        Boolean   @default(false)
  verifiedAt            DateTime?
  verifiedBy            String?   // Admin user ID

  // Claims history
  hasPreviousClaims     Boolean   @default(false)
  claimCount            Int       @default(0)
  lastClaimDate         DateTime?

  // Contractor preferences
  preferredContractors  String[]  // Contractor IDs
  restrictedContractors String[]  // Contractor IDs

  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  clientProfile ClientProfile @relation(fields: [clientProfileId], references: [id], onDelete: Cascade)

  @@index([policyExpiryDate])
  @@index([policyVerified])
  @@map("client_insurance")
}
```

#### 4. ClientPayment
```prisma
model ClientPayment {
  id                    String          @id @default(cuid())
  clientProfileId       String          @unique
  stripeCustomerId      String?         @unique
  stripePaymentMethodId String?

  // Payment method metadata
  cardBrand             String?         // visa, mastercard
  cardLast4             String?
  cardExpiryMonth       Int?
  cardExpiryYear        Int?

  // Billing address
  billingAddressSameAs  Boolean         @default(true)
  billingStreet         String?
  billingSuburb         String?
  billingPostcode       String?
  billingState          AustralianState?

  // Preferences
  autoPayEnabled        Boolean         @default(false)
  invoiceDeliveryMethod String          @default("email")
  taxInvoiceRecipient   String?
  abnNumber             String?         // If business

  createdAt             DateTime        @default(now())
  updatedAt             DateTime        @updatedAt

  clientProfile ClientProfile @relation(fields: [clientProfileId], references: [id], onDelete: Cascade)

  @@index([stripeCustomerId])
  @@index([cardExpiryMonth, cardExpiryYear]) // For expiry reminders
  @@map("client_payments")
}
```

#### 5. ClientEmergencyContact
```prisma
model ClientEmergencyContact {
  id                     String   @id @default(cuid())
  clientProfileId        String
  name                   String
  relationship           String
  phone                  String
  allowContractorContact Boolean  @default(false)
  isPrimary              Boolean  @default(true)
  createdAt              DateTime @default(now())
  updatedAt              DateTime @updatedAt

  clientProfile ClientProfile @relation(fields: [clientProfileId], references: [id], onDelete: Cascade)

  @@index([clientProfileId])
  @@map("client_emergency_contacts")
}
```

#### 6. ClientOnboarding
```prisma
model ClientOnboarding {
  id                   String           @id @default(cuid())
  clientId             String           @unique

  // Timeline
  startDate            DateTime?
  targetCompletionDate DateTime?        // 7 days from start
  actualCompletionDate DateTime?

  // Progress
  status               OnboardingStatus @default(PENDING_START) // PENDING_START, IN_PROGRESS, COMPLETED
  currentPhase         String?          // profile, services, property, insurance, payment, communication, education
  completedPhases      String[]         // Array of completed phase names

  // Flow variant (for A/B testing)
  flowVariant          String?          // standard, fast_track, vip

  // Completion
  certificateIssued    Boolean          @default(false)
  certificateUrl       String?
  tourCompleted        Boolean          @default(false)
  firstRequestCreated  Boolean          @default(false)

  // Analytics
  totalTimeSpentSeconds Int             @default(0)
  deviceType           String?          // mobile, desktop, tablet

  createdAt            DateTime         @default(now())
  updatedAt            DateTime         @updatedAt

  clientProfile  ClientProfile          @relation(fields: [clientId], references: [userId])
  moduleProgress ClientModuleProgress[]

  @@index([status])
  @@index([currentPhase])
  @@index([flowVariant])
  @@map("client_onboarding")
}
```

#### 7. ClientModuleProgress
```prisma
model ClientModuleProgress {
  id           String       @id @default(cuid())
  onboardingId String
  moduleId     String       // MODULE-001, MODULE-002, etc.
  moduleName   String?
  startedAt    DateTime?
  completedAt  DateTime?
  completed    Boolean      @default(false)
  status       ModuleStatus @default(NOT_STARTED)
  progress     Int          @default(0)  // 0-100%

  // Optional quiz (education verification)
  quizScore    Int?         // 0-100%
  quizAttempts Int          @default(0)

  // Analytics
  timeSpentSeconds Int      @default(0)

  createdAt    DateTime     @default(now())

  onboarding ClientOnboarding @relation(fields: [onboardingId], references: [id], onDelete: Cascade)

  @@index([onboardingId])
  @@index([status])
  @@map("client_module_progress")
}
```

### Additional Tables for Advanced Features

#### 8. OnboardingABTest
```prisma
model OnboardingABTest {
  id                  String   @id @default(cuid())
  experimentName      String   @unique
  phase               String   // Which phase being tested
  variantA            String   // Description of variant A (control)
  variantB            String   // Description of variant B (test)

  // Metrics
  trafficSplit        Float    @default(0.5) // 50/50 split
  sampleSize          Int      @default(0)
  conversionsA        Int      @default(0)
  conversionsB        Int      @default(0)

  // Statistical significance
  pValue              Float?
  confidence          Float?
  winner              String?  // A or B

  // Status
  status              String   @default("RUNNING") // RUNNING, PAUSED, COMPLETED
  startDate           DateTime @default(now())
  endDate             DateTime?

  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  @@map("onboarding_ab_tests")
}
```

#### 9. ClientOnboardingSession (Session Recording Metadata)
```prisma
model ClientOnboardingSession {
  id                String   @id @default(cuid())
  clientId          String
  sessionId         String   @unique // Hotjar/FullStory session ID

  // Session metadata
  startedAt         DateTime
  endedAt           DateTime?
  duration          Int?     // Seconds
  pagesViewed       Int      @default(0)
  errorsEncountered Int      @default(0)

  // Behavior flags
  hasRageClicks     Boolean  @default(false)
  hasDeadClicks     Boolean  @default(false)
  hasFormErrors     Boolean  @default(false)

  // Outcome
  completedPhase    String?
  abandonedPhase    String?
  conversionOutcome String?  // completed, abandoned, emergency_fast_track

  createdAt         DateTime @default(now())

  @@index([clientId])
  @@index([sessionId])
  @@map("client_onboarding_sessions")
}
```

**File:** `prisma/schema.prisma` - Add all models

---

## API Endpoints

### Core Onboarding Flow (8 endpoints)

#### 1. Initialize Onboarding
```typescript
POST /api/client/onboarding/start

Request:
{
  flowType?: 'standard' | 'fast_track' | 'vip'
}

Response:
{
  success: boolean;
  onboardingId: string;
  currentPhase: 'profile';
  resumeUrl: '/dashboard/client/onboarding/profile';
  estimatedMinutes: 15; // For standard flow
}
```

#### 2. Get Progress
```typescript
GET /api/client/onboarding/progress/:clientId

Response:
{
  success: boolean;
  progress: {
    completionPercentage: number;
    currentPhase: string;
    completedPhases: string[];
    nextPhase: string;
    resumeUrl: string;
    estimatedMinutesRemaining: number;
  };
  highValueTier?: {
    tier: string;
    benefits: string[];
    accountManager?: { name: string; email: string; phone: string; };
  };
}
```

#### 3-8. Phase Completion Endpoints
```typescript
POST /api/client/onboarding/profile      // Phase 1
POST /api/client/onboarding/services     // Phase 2
POST /api/client/onboarding/property     // Phase 3
POST /api/client/onboarding/insurance    // Phase 4
POST /api/client/onboarding/payment      // Phase 5
POST /api/client/onboarding/communication // Phase 6

// Each returns updated progress + next phase URL
```

### Education Modules (5 endpoints)

```typescript
GET    /api/client/onboarding/education/modules      // List all modules
POST   /api/client/onboarding/education/module/start  // Track module started
POST   /api/client/onboarding/education/module/complete // Mark complete
POST   /api/client/onboarding/education/quiz         // Submit quiz
GET    /api/client/onboarding/certificate            // Get completion certificate
```

### Completion & Actions (1 endpoint)

```typescript
POST /api/client/onboarding/complete

Request:
{
  autoCreateRequest: boolean;
  requestData?: {
    serviceType: string;
    urgency: string;
    description: string;
  };
  startTour: boolean;
}

Response:
{
  success: boolean;
  certificateUrl: string;
  badge: { name: string; imageUrl: string; };
  nextSteps: {
    tourUrl?: string;
    requestUrl?: string;
    dashboardUrl: string;
  };
}

Side Effects:
- Award "Prepared Client" badge
- Send welcome package email
- Create service request if requested
- Initialize dashboard tour if requested
```

### Client Management (6 endpoints)

```typescript
GET    /api/client/profile                    // Get full profile
PUT    /api/client/profile                    // Update profile
GET    /api/client/properties                 // List properties
POST   /api/client/properties                 // Add property
GET    /api/client/insurance                  // Get insurance
PUT    /api/client/insurance                  // Update insurance
POST   /api/client/emergency-contact          // Add emergency contact
GET    /api/client/eligibility                // Check if can create requests
```

### Admin Analytics (3 endpoints)

```typescript
GET /api/admin/analytics/client-onboarding/funnel    // Funnel metrics
GET /api/admin/analytics/client-onboarding/dropoff/:phase // Drop-off analysis
GET /api/admin/analytics/client-onboarding/experiments // A/B test results
```

### Cross-Device Resume (1 endpoint)

```typescript
POST /api/client/onboarding/send-resume-link

Request:
{
  email: string;
  currentPhase: string;
}

Response:
{
  success: boolean;
  message: "Magic link sent to your email";
}

Side Effect:
- Generate secure token (expires 24h)
- Send email with deep link: /dashboard/client/onboarding/{phase}?token={token}
- Token auto-authenticates and resumes
```

**Total: 23 API endpoints**

---

## UI/UX Specifications

### Design System Alignment
- **Color Palette:** NRPG Teal (#00BFA6) primary, consistent with contractor onboarding
- **Typography:** System fonts (Geist), readable 16px base
- **Components:** Radix UI primitives for accessibility
- **Spacing:** Consistent with contractor onboarding (8px grid)
- **Icons:** Lucide React (same as contractor system)

### WCAG 2.1 AAA Compliance (Top Priority)

**Requirements:**
1. **Color Contrast:** 7:1 minimum for normal text, 4.5:1 for large text
2. **Keyboard Navigation:** All interactive elements tabbable, clear focus indicators
3. **Screen Reader Support:** Comprehensive ARIA labels, semantic HTML, live regions for dynamic updates
4. **Alternative Text:** All images, icons, and graphics have descriptive alt text
5. **Form Labels:** Explicit labels, error messages associated with fields
6. **Time Limits:** None, or user-controllable with warnings
7. **Motion:** Respect `prefers-reduced-motion`, no auto-playing animations
8. **Resizable Text:** Support up to 200% zoom without breaking layout

**Implementation:**
```typescript
// Every form input
<label htmlFor="phoneNumber" className="sr-only">
  Phone Number (Australian format)
</label>
<Input
  id="phoneNumber"
  aria-required="true"
  aria-describedby="phone-help phone-error"
  aria-invalid={errors.phoneNumber ? "true" : "false"}
/>
<p id="phone-help" className="text-sm text-muted-foreground">
  Format: 04XX XXX XXX or 02/03/07/08 XXXX XXXX
</p>
{errors.phoneNumber && (
  <p id="phone-error" className="text-sm text-destructive" role="alert">
    {errors.phoneNumber.message}
  </p>
)}
```

### Smart Defaults with Transparency

**When ML predicts top 3 services:**
```tsx
<div className="space-y-2">
  <Label>Service Types</Label>
  <p className="text-sm text-muted-foreground">
    ℹ️ We pre-selected common services for properties in {suburb}, {state}.
    Feel free to adjust based on your actual needs.
  </p>
  <div className="grid grid-cols-3 gap-2">
    <ServiceCard
      type="WATER_DAMAGE"
      preSelected={true}  // ← ML-powered
      reason="Common in coastal suburbs"
    />
    <ServiceCard
      type="MOULD_REMEDIATION"
      preSelected={true}
      reason="High humidity area"
    />
    <ServiceCard
      type="STORM_DAMAGE"
      preSelected={true}
      reason="Storm season approaching"
    />
  </div>
</div>
```

### Trust-Building UI Elements

**Contractor Matching Page (Trust Signals):**
```tsx
<ContractorCard>
  {/* 1. NRPG Verification Badge */}
  <Badge className="bg-green-600">
    ✓ NRPG Verified
    <Tooltip>
      Rigorous vetting: IICRC certified, insurance verified,
      background checked, mandatory training completed
    </Tooltip>
  </Badge>

  {/* 2. AI-Powered Confidence Score */}
  <ConfidenceScore score={92}>
    <ul>
      <li>✓ IICRC Water Damage Certified (Level 3)</li>
      <li>✓ $20M Public Liability Insurance</li>
      <li>✓ 127 Completed Jobs (4.8★ average)</li>
      <li>✓ 2.3km from your property</li>
      <li>✓ Available within 30 minutes</li>
    </ul>
  </ConfidenceScore>

  {/* 3. Video Testimonial */}
  <VideoTestimonial
    url="https://cdn.nrpg.com.au/testimonials/contractor-123.mp4"
    thumbnail="..."
    duration="45s"
    client="Sarah M., Bondi"
  />

  {/* 4. Inline Education Tooltip */}
  <div className="mt-2">
    <Button variant="ghost" size="sm">
      <Info className="h-4 w-4" />
      Why IICRC certification matters
    </Button>
    <Tooltip>
      IICRC (Institute of Inspection, Cleaning and Restoration Certification)
      is the global standard for disaster restoration. Certified contractors
      have completed rigorous training in proper techniques to protect your
      property and ensure insurance claim compliance.
    </Tooltip>
  </div>
</ContractorCard>
```

### Privacy Controls (Phase 6 Implementation)

**Privacy Settings UI:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>What Contractors See Before You Accept Their Quote</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Full Address</Label>
        <div className="text-sm text-muted-foreground">
          Hidden - Only suburb & postcode shown
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label>Property Access Instructions</Label>
        <div className="text-sm text-muted-foreground">
          Revealed 24h before scheduled work
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label>Phone Number</Label>
        <Switch
          checked={sharePhone}
          onCheckedChange={setSharePhone}
        />
        <div className="text-sm">
          {sharePhone ? 'Visible after quote accepted' : 'Hidden until job starts'}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label>Insurance Information</Label>
        <div className="text-sm text-muted-foreground">
          Never shared with contractors
        </div>
      </div>
    </div>
  </CardContent>
</Card>
```

**Implementation:** Suburb + Postcode only visible until client accepts contractor quote

### Dashboard Layout (Dual Path Presentation)

```tsx
// app/dashboard/client/page.tsx
export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      {/* Dual-path buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-red-500">
          <CardContent className="pt-6">
            <Button
              size="lg"
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => router.push('/dashboard/client/requests/emergency')}
            >
              <AlertCircle className="mr-2" />
              🚨 EMERGENCY SERVICE - Get Help Now
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Fast-track: Name, Phone, Address only (3 min)
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-500">
          <CardContent className="pt-6">
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={() => router.push('/dashboard/client/onboarding')}
            >
              <CheckCircle className="mr-2" />
              Complete Your Profile (Recommended)
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Full setup: Better matching, priority support (15 min)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Eligibility banner if onboarding incomplete */}
      {!isOnboardingComplete && <ClientEligibilityBanner />}

      {/* Rest of dashboard */}
    </div>
  );
}
```

---

## Phase-by-Phase Breakdown

### PHASE 1: Welcome & Profile Setup (Required - Core)

**Page:** `app/dashboard/client/onboarding/profile/page.tsx`

**UI Flow:**
1. Welcome screen with NRPG value propositions
2. Name input (prefill from auth if available)
3. Phone number (Australian format validation)
4. Preferred contact method (email/phone/SMS radio buttons)
5. Timezone selector (auto-detect, allow override)
6. Property ownership status (owner/tenant/manager dropdown)

**Time:** ~2 minutes

**Validation:**
- Phone: Australian format (`/^(\+61|0)[2-478]\d{8}$/`)
- Name: 2-100 characters
- All fields required

**Email Trigger:** Welcome email sent on completion

### PHASE 2: Service Preferences (Required - Core)

**Page:** `app/dashboard/client/onboarding/services/page.tsx`

**UI Flow:**
1. Service type multi-select with icons (Water, Fire, Mold, etc.)
   - ML pre-selection with explanation: "Based on properties in {suburb}, we suggest:"
2. Urgency preference slider (Emergency → Standard → Low Priority)
3. Budget range selector (5 tiers: <$1k to $25k+)
4. Service frequency (One-time, Occasional, Regular, Ongoing)
5. Past experience checkbox
6. Emergency contact available checkbox

**Time:** ~3 minutes

**Smart Defaults:**
- Pre-select top 3 services based on:
  - Property postcode
  - Season (e.g., flood season = Water Damage)
  - Property type (e.g., commercial = Commercial Water Damage)
- Show tooltip explaining why pre-selected

**Email Trigger:** None (mid-flow)

### PHASE 3: Location & Property Details (Required - Core)

**Page:** `app/dashboard/client/onboarding/property/page.tsx`

**UI Flow:**
1. Address autocomplete (Google Places API)
2. Manual entry fallback if autocomplete fails
3. Property type dropdown
4. Property size (optional, text input)
5. Building age (optional, dropdown: <5yr, 5-10yr, 10-20yr, 20-50yr, 50+yr)
6. Access instructions (textarea, 500 char limit)
   - Warning: "This will be encrypted and only shown to contractor 24h before work"
7. Checkboxes: Parking available, Security access required, Pets on premises
8. If pets: "Pet details (helps contractor prepare)"

**Time:** ~5 minutes

**Security:**
- Encrypt `accessInstructions` at rest using client-specific key
- Store key in AWS KMS or similar
- Only decrypt when contractor accepted and job scheduled

**Risk Zone Detection:**
- Check postcode against flood zone database
- Check postcode against bushfire zone database
- If high-risk → Flag for preventive service offers

**Email Trigger:** Phase completion email with summary

### PHASE 4: Insurance & Documentation (Optional - Progressive)

**Page:** `app/dashboard/client/onboarding/insurance/page.tsx`

**UI Flow:**
1. "Do you have insurance?" radio buttons
2. If yes:
   - Provider dropdown (NRMA, Suncorp, Allianz, QBE, IAG, CGU, Other)
   - Policy number input
   - Expiry date picker
   - Policy document upload (FileUpload component)
3. "Have you made previous claims?" checkbox
4. If yes: Claim count and last claim date
5. Skip button: "Add insurance details later"

**Time:** ~3 minutes (or skip)

**Insurance Verification:**
- Admin can manually verify policy documents
- Set `policyVerified = true` when confirmed
- Verified insurance → Auto-upgrade to "Verified Insurance" tier

**Email Trigger:** If skipped, reminder email Day 3

**Optional:** Email after 30 days if policy nearing expiry

### PHASE 5: Payment & Billing (Optional - Progressive)

**Page:** `app/dashboard/client/onboarding/payment/page.tsx`

**UI Flow:**
1. Stripe Payment Element (card input)
2. "Use same address as property" checkbox
3. If unchecked: Billing address form
4. Auto-pay toggle (default OFF)
5. Invoice delivery method (Email/Postal/Both radio)
6. If business: "Tax invoice recipient name" + ABN input
7. Skip button: "Add payment method before first job"

**Time:** ~4 minutes (or skip)

**A/B Test Variant (Automated):**
- If drop-off >60%: Test "defer payment to post-completion"
- Track both flows for 14 days
- Auto-adopt winner at 95% confidence

**Payment Method Handling (Strategic Decision):**
- **During Onboarding:** Optional, encouraged
- **During Service Request Matching:** Required (pre-authorization hold)
- **Hold Amount:** Estimated job cost (released if job cancelled, captured on completion)

**Email Trigger:** Payment method added confirmation

**Card Expiry Monitoring:**
- Email 30 days before card expiry
- Email 7 days before card expiry (urgent)

### PHASE 6: Communication Preferences (Optional - Progressive)

**Page:** `app/dashboard/client/onboarding/communication/page.tsx`

**UI Flow:**
1. Notification Preferences (10 toggles):
   - Email notifications
   - SMS notifications
   - Push notifications
   - Contractor match alerts
   - Quote received alerts
   - Work commenced alerts
   - Work completed alerts
   - Payment reminders
   - Insurance updates
   - Marketing emails

2. Contact Time Preferences:
   - Preferred days (multi-select: Mon-Sun)
   - Preferred hours (time range slider: 09:00-17:00)
   - Do Not Disturb toggle
   - If DND: DND hours (e.g., 22:00-07:00)

3. Emergency Contact (optional):
   - Name, Relationship, Phone
   - "Allow contractor to contact in emergency" checkbox

**Time:** ~2 minutes

**Privacy Controls:**
- What contractors see before quote acceptance (explained)
- Data sharing preferences
- Marketing opt-out

**Multi-User Access (Post-Completion Offer):**
- Not prompted during onboarding
- After completion screen shows: "Manage a property with others? Invite co-owners"

**Email Trigger:** Preferences saved confirmation

### PHASE 7: Education & Completion (Optional - Progressive)

**Pages:**
1. `app/dashboard/client/onboarding/education/page.tsx` - Module list
2. `app/dashboard/client/onboarding/education/module/[moduleId]/page.tsx` - Module viewer
3. `app/dashboard/client/onboarding/complete/page.tsx` - Completion celebration

**Education Modules (7 Modules - Professional, No Gamification):**

**MODULE-001: "What to Do After Water Damage" (10 min)**
- Immediate safety actions
- Stop the source (if safe to do so)
- Document damage (photo/video guide)
- Contact insurer within 24 hours
- Call emergency restoration
- What NOT to do (common mistakes)

**MODULE-002: "Understanding Your Insurance Claim" (12 min)**
- Types of coverage (building vs contents)
- Claims process timeline
- Required documentation checklist
- Working with loss assessors
- Understanding excess/deductibles
- Common reasons for claim rejection
- **Focus:** NRPG-specific process, avoid insurer-specific details

**MODULE-003: "Choosing the Right Contractor" (10 min)**
- IICRC certification explained
- Verifying credentials (ABN, insurance, license)
- Reading reviews effectively
- Getting multiple quotes (how many, when)
- Red flags to watch for
- Contract essentials (scope, timeline, cost)

**MODULE-004: "Fire Damage Recovery Process" (15 min)**
- Initial assessment and safety inspection
- Structural evaluation requirements
- Smoke odor removal techniques
- Content restoration possibilities
- Realistic timeline expectations
- Living arrangements during restoration
- Insurance considerations

**MODULE-005: "Mold Remediation Explained" (12 min)**
- Health risks of mold exposure
- Common causes of mold growth
- Why professional assessment is necessary
- Remediation process steps
- Prevention strategies
- When to call professionals immediately

**MODULE-006: "Your Rights as a Property Owner" (10 min)**
- Australian Consumer Law protections
- Warranty periods for restoration work
- Dispute resolution options
- Fair Trading regulations by state
- Building code compliance requirements
- Your responsibilities as client

**MODULE-007: "Emergency Preparedness & Prevention" (15 min)**
- Seasonal home maintenance checklist
- Emergency kit essentials (Australian-specific)
- Important documents to safeguard
- Evacuation planning
- Risk mitigation by disaster type
- Annual property inspection calendar

**Module Viewing Experience:**
- Full-screen HTML viewer (like contractor NRP modules)
- Progress auto-saved (scroll position, time spent)
- Optional quiz at end (5 questions, 70% to pass)
- No quiz requirement to proceed (education-focused, not gate-keeping)
- Certificate awarded for completing all 7 modules

**Completion Actions Screen:**
```tsx
<CompletionCelebration>
  <Award icon with confetti animation />
  <h1>Congratulations! You're a Prepared Client</h1>
  <p>You've completed all 7 phases and 7 education modules</p>

  <div className="grid grid-cols-2 gap-4 mt-6">
    {/* Action 1: Auto-create request */}
    <Card>
      <CardHeader>
        <CardTitle>Create Your First Service Request</CardTitle>
      </CardHeader>
      <CardContent>
        <p>We'll pre-fill it with your information</p>
        <Button onClick={handleCreateRequest}>
          Create Emergency Request →
        </Button>
      </CardContent>
    </Card>

    {/* Action 2: Dashboard tour */}
    <Card>
      <CardHeader>
        <CardTitle>Take a Dashboard Tour</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Learn how to get the most from NRPG</p>
        <Button onClick={handleStartTour}>
          Start Tour (2 min) →
        </Button>
      </CardContent>
    </Card>
  </div>

  {/* Display badge */}
  <div className="mt-6 text-center">
    <img src="/badges/prepared-client.svg" alt="Prepared Client Badge" />
    <p>This badge appears on your profile</p>
  </div>

  {/* Download certificate */}
  <Button variant="outline" className="mt-4">
    <Download className="mr-2" />
    Download Completion Certificate
  </Button>
</CompletionCelebration>
```

**Email Trigger:** Welcome package email with:
- Certificate attached (PDF)
- Quick start guide
- Support contacts
- Link to dashboard

**Time:** ~35-40 minutes for education (optional, can skip)

---

## AI/ML Integration

### 1. Smart Default Prediction Model

**Training Data:**
```typescript
interface ServicePredictionData {
  features: {
    postcode: string;
    suburb: string;
    state: string;
    propertyType: string;
    season: string; // summer, autumn, winter, spring
    month: number;
    dayOfWeek: number;
    timeOfDay: number; // hour 0-23
  };
  labels: {
    primaryService: string;
    secondaryService: string;
    urgencyLevel: string;
  };
}
```

**Model Architecture:**
- **Algorithm:** XGBoost Classifier
- **Input Features:** 8 features (postcode, property type, temporal data)
- **Output:** Top 3 service types with confidence scores
- **Training:** Weekly batch retraining on historical data
- **Deployment:** TensorFlow.js for client-side inference (privacy)

**Usage:**
```typescript
// Phase 2: Services page
const predictions = await predictServices({
  postcode: '2000',
  propertyType: 'residential_house',
  season: 'winter',
  month: 7,
  dayOfWeek: 2,
  timeOfDay: 14
});

// predictions = [
//   { service: 'WATER_DAMAGE', confidence: 0.87, reason: 'Common in coastal suburbs' },
//   { service: 'MOULD_REMEDIATION', confidence: 0.72, reason: 'High humidity area' },
//   { service: 'STORM_DAMAGE', confidence: 0.65, reason: 'Storm season approaching' }
// ]

// Pre-select with explanation
<ServiceCard
  type={predictions[0].service}
  preSelected={true}
  reason={predictions[0].reason}
  confidence={predictions[0].confidence}
/>
```

### 2. Abandonment Risk Detection

**Real-Time Prediction:**
```typescript
interface AbandonmentRisk {
  score: number; // 0-1 probability
  factors: string[]; // What's driving risk
  intervention?: string; // Suggested action
}

const risk = calculateAbandonmentRisk({
  timeOnPhase: 180, // seconds
  mouseHesitation: true,
  formErrors: 3,
  scrolledToBottom: false,
  deviceType: 'mobile',
  previousPhaseTime: 45 // They rushed previous phase
});

// risk.score = 0.73 (high)
// risk.factors = ['Long time on phase', 'Multiple form errors', 'Mobile device']
// risk.intervention = 'offer_help_chat'

if (risk.score > 0.7) {
  showInlineHelp();
  // or
  offerLiveChat();
}
```

### 3. Contractor Match Quality Scoring

**AI Confidence Score (Displayed to Client):**
```typescript
function calculateMatchConfidence(
  clientPreferences: ClientPreferences,
  clientProperty: ClientProperty,
  contractor: Contractor
): number {
  const factors = {
    iicrcCertified: contractor.iicrcCertifications.length > 0 ? 20 : 0,
    insuranceVerified: contractor.publicLiabilityPolicyNumber ? 15 : 0,
    completedJobs: Math.min(contractor.completedJobs / 10, 20), // Max 20 points
    averageRating: (contractor.averageRating / 5) * 20,
    distance: calculateDistanceScore(clientProperty, contractor), // Max 15 points
    availability: contractor.availability === 'AVAILABLE' ? 10 : 0
  };

  return Object.values(factors).reduce((sum, score) => sum + score, 0);
  // Score out of 100
}
```

**Display:**
```tsx
<ConfidenceScore score={92}>
  92% Match Confidence

  Why this contractor is a great fit:
  ✓ IICRC Water Damage Certified (20 pts)
  ✓ $20M Insurance Verified (15 pts)
  ✓ 127 Completed Jobs (20 pts)
  ✓ 4.8★ Average Rating (19 pts)
  ✓ 2.3km Away (13 pts)
  ✓ Available Now (10 pts)
</ConfidenceScore>
```

### 4. Regional Performance Analysis

**When Sydney completes 40% faster than Perth, investigate:**

**1. Localization Check:**
```typescript
// Analyze language/terminology
const perthReviews = await getPhaseDropOffReasons({ state: 'WA' });
// If "confusing terms" appears frequently → Update content

// A/B test Perth-specific terminology
await createExperiment({
  name: 'Perth Terminology Test',
  region: 'WA',
  variants: ['generic_terms', 'wa_specific_terms']
});
```

**2. Network Latency Check:**
```typescript
// Measure API response times by state
const latencyByState = await analyzeLatency({
  groupBy: 'client_state',
  endpoint: '/api/client/onboarding/*',
  period: 'last_30_days'
});

// If WA > 500ms and NSW < 200ms:
//   → Deploy CloudFlare Workers in Perth
//   → Or use Perth-based CDN endpoint
```

**3. Demographic Analysis:**
```typescript
// Analyze user behavior patterns
const behaviorByState = await analyzeBehavior({
  metrics: ['form_errors', 'help_clicks', 'phase_restarts'],
  groupBy: 'state'
});

// If Perth shows 2x help clicks:
//   → Add more inline help for WA users
//   → Simplify UI for Perth cohort
```

**4. Market Maturity Check:**
```typescript
// Measure brand awareness
const brandAwareness = await surveyClients({
  question: 'How did you hear about NRPG?',
  segment: 'state'
});

// If Perth shows low brand awareness:
//   → Add more social proof (testimonials from WA)
//   → Emphasize trust signals earlier in flow
```

---

## Email Notifications

### Email Service Configuration

**Provider:** SendGrid (primary), AWS SES (fallback)
**Sending Domain:** `noreply@nrpg.com.au`
**From Name:** "NRPG - Disaster Recovery"

### Email Templates (7 Templates)

#### 1. Welcome Email
**Trigger:** Phase 1 completion
**Subject:** "Welcome to NRPG - Your Disaster Recovery Partner"
**Content:**
- Welcome message with client name
- Summary of what NRPG offers (4 value props)
- Next steps: Complete remaining phases
- Resume link with magic token
- Support contact info

#### 2. Phase Completion Emails (6 emails - one per phase 2-7)
**Trigger:** Each phase completion
**Subject:** "Phase {N} Complete - {Phase Name}"
**Content:**
- Congratulate completion
- What they accomplished
- Progress bar visual (X/7 phases complete)
- Next phase preview
- Resume link to next phase
- Estimated time remaining

#### 3. Education Module Complete
**Trigger:** Module completion
**Subject:** "Module Complete: {Module Title}"
**Content:**
- Module summary
- Quiz score (if taken)
- Key takeaways recap
- Next module preview
- Link to continue education

#### 4. Onboarding Complete (Welcome Package)
**Trigger:** All 7 phases + education complete
**Subject:** "🎉 You're a Prepared NRPG Client! Here's Your Certificate"
**Content:**
- Celebration message
- Certificate PDF attached
- Badge image ("Prepared Client")
- Quick start guide (how to create first request)
- Dashboard tour link
- Support contacts
- **Special Offer:** "Complete your first request this week and get priority contractor matching"

#### 5. Onboarding Reminder (48hr after abandonment)
**Trigger:** 48 hours after last activity, onboarding incomplete
**Subject:** "Resume Your NRPG Setup - You're {X}% Complete"
**Content:**
- Friendly reminder (not pushy)
- Progress summary
- Direct resume link to exact phase
- Estimated time remaining
- Option to pause/resume later
- One email only (no sequence)

#### 6. Data Retention Warning (Day 60)
**Trigger:** 60 days since last onboarding activity
**Subject:** "Your NRPG Onboarding Data Will Be Deleted in 30 Days"
**Content:**
- GDPR compliance notice
- Current progress summary
- Resume link
- Deletion date (Day 90)
- How to prevent deletion (complete or activity)

#### 7. Educational Drip Campaign (Dormant Clients)
**Trigger:** Onboarding complete, no service request in 30 days
**Schedule:** One email per week, 7-week sequence
**Content:**
- Week 1: "Storm Season Prep Checklist"
- Week 2: "How to Spot Water Damage Early"
- Week 3: "Fire Safety Tips for Australian Homes"
- Week 4: "Mold Prevention in High-Humidity Areas"
- Week 5: "Understanding Your Insurance Coverage"
- Week 6: "Emergency Kit Essentials"
- Week 7: "Annual Property Maintenance Calendar"

**Each email includes:**
- Educational content (excerpt from education module)
- CTA: "Create preventive service request" or "Schedule inspection"
- Link to full module in dashboard

---

## Security & Privacy

### 1. Access Instructions Encryption

**Sensitive Data:** Gate codes, key locations, alarm codes, access passwords

**Encryption Strategy:**
```typescript
// Client-specific encryption
import { kms } from '@aws-sdk/client-kms';

async function encryptAccessInstructions(
  clientId: string,
  plaintext: string
): Promise<{ encrypted: string; keyId: string }> {
  // Generate client-specific data encryption key (DEK)
  const { CiphertextBlob, KeyId } = await kms.generateDataKey({
    KeyId: process.env.AWS_KMS_MASTER_KEY_ID,
    KeySpec: 'AES_256'
  });

  // Encrypt access instructions with DEK
  const encrypted = encrypt(plaintext, CiphertextBlob);

  return { encrypted, keyId: KeyId };
}

async function decryptAccessInstructions(
  encrypted: string,
  keyId: string
): Promise<string> {
  // Only decrypt when:
  // 1. Contractor accepted job
  // 2. Within 24h of scheduled work
  // 3. Admin override for support

  const { Plaintext } = await kms.decrypt({
    CiphertextBlob: encrypted,
    KeyId: keyId
  });

  return decrypt(Plaintext);
}
```

**Access Control:**
- Encrypted at rest in database
- Only decrypted when contractor accepted AND job scheduled within 24h
- Audit log every decryption (who, when, why)
- Auto-hide after job completion + 24h

### 2. Privacy by Design (GDPR/CCPA Compliance)

**Data Minimization:**
- Only collect what's necessary for service delivery
- Insurance details optional (unless submitting claim)
- Payment method optional (unless creating request)

**Right to Erasure:**
```typescript
// After 90 days of inactivity
async function autoDeleteIncompleteOnboarding(clientId: string) {
  // Day 60: Send warning email
  await sendDataRetentionWarning(clientId);

  // Day 90: Permanent deletion
  await prisma.$transaction([
    prisma.clientOnboarding.delete({ where: { clientId } }),
    prisma.clientProfile.delete({ where: { userId: clientId } }),
    prisma.clientProperty.deleteMany({ where: { clientProfileId: profile.id } }),
    prisma.clientInsurance.delete({ where: { clientProfileId: profile.id } }),
    prisma.clientPayment.delete({ where: { clientProfileId: profile.id } }),
    // Keep anonymized analytics data
    prisma.onboardingSession.update({
      where: { clientId },
      data: {
        clientId: 'ANONYMIZED',
        pii_removed: true
      }
    })
  ]);

  console.log(`GDPR: Client ${clientId} incomplete onboarding data deleted after 90 days`);
}
```

**Data Export:**
```typescript
GET /api/client/data-export

// Returns JSON with all client data
{
  profile: {...},
  properties: [...],
  insurance: {...},
  payment: {...},
  onboarding: {...},
  serviceRequests: [...],
  messages: [...]
}
```

### 3. Contractor Data Visibility (Privacy Controls)

**Before Quote Acceptance:**
```json
{
  "suburb": "Bondi",
  "postcode": "2026",
  "state": "NSW",
  "propertyType": "residential_house",
  "serviceType": "WATER_DAMAGE",
  "urgency": "URGENT",
  "approximateAddress": "Bondi, NSW 2026"
}
```

**After Quote Acceptance:**
```json
{
  "fullAddress": "123 Beach Road, Bondi, NSW 2026",
  "clientName": "Sarah M.",
  "clientPhone": "0412 345 678",
  "accessInstructions": null, // Still encrypted
  "parkingAvailable": true,
  "pets": "2 small dogs - friendly"
}
```

**24h Before Scheduled Work:**
```json
{
  "accessInstructions": "Gate code 1234, key under blue pot, alarm code 5678",
  "emergencyContact": {
    "name": "John M.",
    "phone": "0423 456 789",
    "relationship": "Spouse"
  }
}
```

**After Job Completion + 24h:**
```json
{
  "accessInstructions": "[REDACTED]" // Re-encrypted
}
```

### 4. Data Integrity (Post-Job Reconciliation)

**Contractor Survey After Job:**
```typescript
POST /api/jobs/{jobId}/reconciliation

Request (from contractor):
{
  jobId: string;
  propertyDetailsAccurate: boolean;
  inaccuracies?: {
    pets: { expected: false, actual: "3 dogs present" },
    parking: { expected: true, actual: "No parking available" },
    access: { expected: "Gate code works", actual: "Code incorrect, had to call client" }
  };
  notes: string;
}

// System actions:
if (!propertyDetailsAccurate) {
  // Flag client profile for review
  await prisma.clientProfile.update({
    where: { userId: clientId },
    data: { flaggedForReview: true, flagReason: inaccuracies }
  });

  // Notify admin
  await notifyAdmin({
    type: 'PROFILE_INACCURACY',
    clientId,
    details: inaccuracies
  });

  // Update property record
  await updatePropertyFromContractorFeedback(propertyId, inaccuracies);
}
```

**Client receives:**
- Email: "Your property details were updated based on contractor feedback"
- Prompt to review and confirm changes

---

## Accessibility (WCAG 2.1 AAA Compliance)

### Priority: TOP PRIORITY - Day 1 Requirement

### Compliance Requirements

#### 1. Color Contrast (AAA = 7:1 minimum)
```css
/* All text must meet 7:1 ratio */
--text-primary: #000000;      /* Black on white = 21:1 ✓ */
--text-secondary: #4A4A4A;    /* Dark gray on white = 9.7:1 ✓ */
--text-muted: #6B6B6B;        /* Gray on white = 7.1:1 ✓ */

/* Interactive elements */
--primary: #00BFA6;           /* Teal - ensure 7:1 on white */
--primary-foreground: #FFFFFF;

/* Error states */
--destructive: #C62828;       /* Red with sufficient contrast */
```

**Automated Testing:**
```typescript
// Vitest + axe-core
import { axe, toHaveNoViolations } from 'jest-axe';

test('Phase 1 profile form meets WCAG AAA', async () => {
  const { container } = render(<ProfileSetupPage />);
  const results = await axe(container, {
    runOnly: ['wcag2aaa']
  });
  expect(results).toHaveNoViolations();
});
```

#### 2. Keyboard Navigation

**All interactive elements accessible via keyboard:**
- Tab order logical (top-to-bottom, left-to-right)
- Focus indicators clear (2px solid outline)
- Skip links for navigation ("Skip to main content")
- Escape key closes modals/dialogs
- Arrow keys for radio/checkbox groups
- Enter/Space activates buttons

**Focus Management:**
```typescript
// When phase changes
useEffect(() => {
  // Focus first interactive element
  const firstInput = document.querySelector('input, button, select');
  (firstInput as HTMLElement)?.focus();

  // Announce page change to screen readers
  announceToScreenReader(`Navigated to ${phaseName} phase`);
}, [currentPhase]);
```

#### 3. Screen Reader Support

**ARIA Labels:**
```tsx
{/* Progress indicator */}
<div
  role="progressbar"
  aria-valuenow={completionPercentage}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={`Onboarding progress: ${completionPercentage}% complete`}
>
  <Progress value={completionPercentage} />
</div>

{/* Phase checklist */}
<ul aria-label="Onboarding phases">
  {phases.map(phase => (
    <li key={phase.id}>
      <span aria-label={`Phase ${phase.number}: ${phase.name}`}>
        {phase.complete && <span aria-label="Completed">✓</span>}
        {phase.name}
      </span>
    </li>
  ))}
</ul>

{/* Form validation */}
<Input
  aria-required="true"
  aria-invalid={!!errors.email}
  aria-describedby="email-help email-error"
/>
{errors.email && (
  <p id="email-error" role="alert" aria-live="assertive">
    {errors.email.message}
  </p>
)}
```

**Live Regions for Dynamic Updates:**
```tsx
{/* Auto-save notification */}
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {lastSaved && `Form auto-saved at ${lastSaved.toLocaleTimeString()}`}
</div>

{/* WebSocket updates */}
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {progressUpdate && `Progress updated: ${progressUpdate}% complete`}
</div>
```

#### 4. Alternative Text

**All visual elements described:**
```tsx
{/* Badge images */}
<img
  src="/badges/prepared-client.svg"
  alt="Prepared Client badge - Completed all 7 onboarding phases and 7 education modules"
  role="img"
/>

{/* Icon buttons */}
<Button aria-label="Upload insurance policy document">
  <Upload className="h-4 w-4" aria-hidden="true" />
  <span className="sr-only">Upload Document</span>
</Button>

{/* Decorative images */}
<img
  src="/illustrations/welcome.svg"
  alt=""
  role="presentation"
  aria-hidden="true"
/>
```

#### 5. Form Labels (Explicit, Always Visible)

**No placeholder-only labels:**
```tsx
{/* ❌ Bad - Placeholder as label */}
<Input placeholder="Enter your phone number" />

{/* ✓ Good - Visible label + placeholder */}
<Label htmlFor="phone">Phone Number *</Label>
<Input
  id="phone"
  placeholder="04XX XXX XXX"
  aria-required="true"
/>
<p id="phone-help" className="text-sm text-muted-foreground">
  Australian mobile or landline number
</p>
```

#### 6. Time Limits (None or User-Controlled)

**No session timeouts during onboarding:**
- Client can take as long as needed on each phase
- Auto-save prevents data loss
- No countdown timers (avoid pressure)

**For payment pre-authorization (Stripe):**
- 15-minute session for security
- Clear warning at 13 minutes: "Complete payment in 2 minutes"
- Easy extension: "Need more time? Click to extend session"

#### 7. Motion Sensitivity

**Respect `prefers-reduced-motion`:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Implementation:**
```tsx
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

<div className={prefersReducedMotion ? '' : 'animate-fade-in'}>
  {content}
</div>
```

---

## Performance & Scalability

### 1. Rate Limiting (Graceful Degradation)

**File Upload Rate Limit: 1000 uploads/hour**

**When limit hit (Phase 4 insurance upload):**
```typescript
// Queue with estimated wait time
const queuePosition = await getUploadQueuePosition();
const estimatedWaitMinutes = Math.ceil(queuePosition / 20); // 20 uploads/minute

return NextResponse.json({
  success: false,
  queued: true,
  message: `Upload queued - estimated wait: ${estimatedWaitMinutes} minutes`,
  queuePosition,
  retryAfter: estimatedWaitMinutes * 60 // seconds
});

// UI shows:
<Alert>
  <Clock className="h-4 w-4" />
  <AlertDescription>
    Your upload is queued. Estimated wait: ~5 minutes.
    You can continue to the next phase while waiting.
  </AlertDescription>
</Alert>

// Process queue in background
// Send email when upload completes
```

**Fallback Strategy:**
- Primary: Queue with ETA
- If queue >30 minutes: Offer "Upload later via email" option
- Client receives unique upload link valid for 7 days

### 2. Database Performance

**Indexing Strategy:**
- All foreign keys indexed
- Postcode indexed (high-cardinality lookups)
- Status fields indexed (filtering)
- Dates indexed (range queries)

**Query Optimization:**
```typescript
// Bad: N+1 query
const clients = await prisma.clientProfile.findMany();
for (const client of clients) {
  const onboarding = await prisma.clientOnboarding.findUnique({
    where: { clientId: client.userId }
  });
}

// Good: Single query with include
const clients = await prisma.clientProfile.findMany({
  include: {
    onboarding: true,
    properties: { where: { isPrimary: true } },
    insurance: true
  }
});
```

### 3. Caching Strategy

**Client Progress (Frequently Accessed):**
```typescript
// Redis cache for 5 minutes
const cacheKey = `client:onboarding:${clientId}`;
const cached = await redis.get(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

const progress = await getOnboardingProgress(clientId);
await redis.setex(cacheKey, 300, JSON.stringify(progress)); // 5min TTL

return progress;
```

**Invalidation:**
- On phase completion → Invalidate cache
- On profile update → Invalidate cache
- WebSocket broadcast → All connected clients clear local cache

### 4. CDN & Asset Optimization

**Education Module Videos (if any):**
- Host on CloudFlare Stream or AWS CloudFront
- Adaptive bitrate streaming (360p/720p/1080p)
- Regional CDN for Australian users

**Images:**
- Next.js Image optimization (automatic WebP conversion)
- Lazy loading below fold
- Responsive sizes (mobile/tablet/desktop)

---

## Analytics & Monitoring

### 1. Funnel Metrics (Admin Dashboard)

**Display at:** `app/dashboard/admin/analytics/client-onboarding/page.tsx`

**Metrics Tracked:**
```typescript
interface FunnelMetrics {
  overview: {
    totalStarted: number;
    totalCompleted: number;
    conversionRate: number;
    avgCompletionTimeHours: number;
  };

  phases: [
    {
      phase: 'profile',
      entered: 1000,
      completed: 920,
      dropOffCount: 80,
      dropOffRate: 8.0,
      avgTimeMinutes: 2.3,
      medianTimeMinutes: 2.0
    },
    // ... 6 more phases
  ];

  bottleneck: {
    phase: 'payment',
    dropOffRate: 62.0,
    reason: 'High friction, testing alternative flow'
  };

  experiments: [
    {
      name: 'Payment Deferred vs Immediate',
      status: 'RUNNING',
      variantA: { traffic: 0.5, conversionRate: 38.0 },
      variantB: { traffic: 0.5, conversionRate: 51.0 },
      confidence: 0.94,
      recommendation: 'Adopt Variant B (deferred)'
    }
  ];
}
```

**Visualization:**
- Funnel chart (decreasing bar sizes)
- Conversion rate sparklines (trend over time)
- Bottleneck highlighting (red alert)
- A/B test results table

### 2. Session Recording (Hotjar / FullStory)

**Implementation:**
```tsx
// app/layout.tsx
import { Hotjar } from '@hotjar/browser';

useEffect(() => {
  if (process.env.NEXT_PUBLIC_HOTJAR_ID) {
    Hotjar.init(
      parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID),
      parseInt(process.env.NEXT_PUBLIC_HOTJAR_SV)
    );

    // Tag onboarding sessions
    Hotjar.tag('onboarding');

    // Identify user (with consent)
    if (user && userConsent.analytics) {
      Hotjar.identify(user.id, {
        email: user.email,
        tier: userTier,
        onboardingPhase: currentPhase
      });
    }
  }
}, [user, currentPhase]);
```

**What to Track:**
- Mouse movement heatmaps
- Click maps (where users click)
- Rage clicks (same element clicked 3+ times rapidly)
- Dead clicks (clicks that do nothing)
- Scroll depth
- Form abandonment points

**Privacy:**
- Require consent during Phase 6 (Communication preferences)
- Checkbox: "Help improve NRPG by sharing anonymous usage data"
- If unchecked: No session recording, only basic analytics
- Default: Unchecked (opt-in, not opt-out)

### 3. Real-Time Monitoring (Admin Dashboard)

**Live Client Activity:**
```tsx
// admin/dashboard/live-onboarding/page.tsx
<LiveOnboardingMonitor>
  {clients.map(client => (
    <ClientActivityCard key={client.id}>
      <Avatar>{client.initials}</Avatar>
      <div>
        <p>{client.displayName}</p>
        <Badge>{client.currentPhase}</Badge>
        <p className="text-xs">
          Started {timeAgo(client.startDate)} • {client.completionPercentage}% complete
        </p>
      </div>

      {/* Real-time status */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs">Active now</span>
      </div>
    </ClientActivityCard>
  ))}
</LiveOnboardingMonitor>
```

**WebSocket for Live Updates:**
- Admin sees clients starting/completing phases in real-time
- Useful for support team to proactively help struggling clients

---

## Edge Cases & Error Handling

### 1. Cross-Device Resume

**Scenario:** Client starts on mobile, needs to continue on desktop for insurance PDF upload

**Solution: Email Magic Link**
```typescript
// Client clicks "Continue on Another Device"
POST /api/client/onboarding/send-resume-link

Request:
{
  email: "client@example.com",
  currentPhase: "insurance"
}

// Server generates secure token
const token = generateSecureToken({
  userId: clientId,
  phase: 'insurance',
  expiresIn: 86400 // 24 hours
});

// Email sent with link
const resumeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/client/onboarding/insurance?token=${token}`;

// Email template:
Subject: Continue Your NRPG Setup on Another Device

Hi {clientName},

Click below to resume your onboarding on another device:
[Continue Onboarding →] (button linking to resumeUrl)

This link expires in 24 hours.

// Desktop browser opens link
// Token auto-authenticates and resumes at Phase 4
```

### 2. Network Connection Loss (Offline Handling)

**IndexedDB Auto-Save:**
```typescript
// hooks/useAutoSave.ts
export function useAutoSave(formData: any, phase: string) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Detect online/offline
  useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      await saveToIndexedDB({
        userId,
        phase,
        data: formData,
        timestamp: new Date(),
        synced: isOnline
      });
      setLastSaved(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [formData, phase]);

  // Sync when back online
  useEffect(() => {
    if (isOnline) {
      syncToServer();
    }
  }, [isOnline]);

  return { lastSaved, isOnline };
}
```

**UI Feedback:**
```tsx
{!isOnline && (
  <Alert className="border-amber-500">
    <AlertTriangle className="h-4 w-4" />
    <AlertDescription>
      You're offline. Changes are saved locally and will sync when reconnected.
    </AlertDescription>
  </Alert>
)}

{lastSaved && (
  <p className="text-xs text-muted-foreground">
    Auto-saved {formatDistance(lastSaved, new Date())} ago
  </p>
)}
```

### 3. Stripe Payment Failure (Phase 5)

**Scenarios:**
1. **Card declined:**
   - Show error: "Card declined - please try another payment method"
   - Allow retry
   - Offer "Skip and add later" option

2. **3D Secure required:**
   - Stripe handles redirect
   - Return to Phase 5 after authentication
   - Resume onboarding seamlessly

3. **Network timeout:**
   - Check payment intent status
   - If succeeded: Mark phase complete
   - If failed: Allow retry
   - If pending: Poll for result

```typescript
try {
  const { paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement
  });

  await attachPaymentMethod(clientId, paymentMethod.id);
  completePhase('payment');
} catch (error) {
  if (error.code === 'card_declined') {
    showError('Card declined. Please try another card.');
    logEvent('payment_declined', { reason: error.decline_code });
  } else if (error.code === 'network_error') {
    showError('Network issue. Your payment was not processed. Please try again.');
    // Don't mark phase as failed, allow retry
  }
}
```

### 4. Conflicting Data (Multiple Devices)

**Scenario:** Client fills Phase 2 on mobile, simultaneously fills Phase 2 on desktop with different data

**Solution: Last-Write-Wins with Conflict Detection**
```typescript
// Server: Check version timestamp
PUT /api/client/onboarding/services

Request:
{
  data: {...},
  lastModified: "2026-01-02T10:30:00Z" // Client's last known version
}

const current = await prisma.clientProfile.findUnique({
  where: { userId },
  select: { updatedAt: true }
});

if (current.updatedAt > new Date(body.lastModified)) {
  // Conflict detected
  return NextResponse.json({
    success: false,
    conflict: true,
    message: "Data was updated from another device. Please review and resubmit.",
    currentData: current
  }, { status: 409 });
}

// No conflict, proceed with update
```

**UI Handling:**
```tsx
if (response.status === 409) {
  showDialog({
    title: "Changes Detected",
    message: "You made changes on another device. Which version would you like to keep?",
    options: [
      { label: "Keep This Device", action: () => forceUpdate() },
      { label: "Use Other Device", action: () => reloadData() },
      { label: "Review Both", action: () => showDiff() }
    ]
  });
}
```

### 5. Browser Compatibility

**Supported Browsers:**
- Chrome 90+ (Desktop & Mobile)
- Safari 14+ (Desktop & Mobile)
- Firefox 88+
- Edge 90+

**Fallbacks:**
- WebSockets → Long polling for older browsers
- IndexedDB → LocalStorage for iOS Safari <14
- CSS Grid → Flexbox fallback

**Testing:**
```typescript
// Playwright E2E tests
test.describe('Cross-browser onboarding', () => {
  test('Chrome - Complete Phase 1', async ({ page }) => {
    // Test in Chrome
  });

  test('Safari - Complete Phase 1', async ({ page, browserName }) => {
    test.skip(browserName !== 'webkit');
    // Test in Safari
  });

  test('Mobile Safari - Complete Phase 1', async ({ page }) => {
    await page.emulate(iPhone12);
    // Test mobile Safari
  });
});
```

---

## Success Metrics

### Primary Metrics

**Onboarding Completion Rate:**
- **Target:** 75% of started clients complete all 7 phases
- **Current Baseline:** Unknown (new system)
- **Measurement:** `(totalCompleted / totalStarted) * 100`

**Time to Complete:**
- **Target:** <20 minutes for core phases (1-3)
- **Target:** <45 minutes for full onboarding (1-7)
- **Measurement:** `actualCompletionDate - startDate`

**Education Module Completion:**
- **Target:** 40% of clients complete at least 3 modules
- **Target:** 20% of clients complete all 7 modules
- **Measurement:** Module completion counts

### Secondary Metrics

**Phase-Specific Conversion Rates:**
- Phase 1 → Phase 2: >95%
- Phase 2 → Phase 3: >90%
- Phase 3 → Phase 4: >70% (optional phase)
- Phase 4 → Phase 5: >60% (optional phase)
- Phase 5 → Phase 6: >80%
- Phase 6 → Phase 7: >85%
- Phase 7 → Complete: >95%

**Client Tier Distribution:**
- Standard: 80%
- Property Manager: 5%
- Verified Insurance: 10%
- Repeat: 3%
- High-Value: 2%

**Email Engagement:**
- Welcome email open rate: >60%
- Phase completion email open rate: >50%
- Resume link click rate: >30% (for abandonment reminders)
- Drip campaign open rate: >40%

### Value Metrics (Onboarding → Business Outcome)

**Service Request Creation:**
- **Target:** 85% of completed onboarding clients create request within 90 days
- **Emergency fast-track:** 100% create request (by definition)
- **Standard flow:** 70% create request within 90 days

**Client Satisfaction:**
- **Target:** >4.5/5 stars average for onboarding experience
- **Measurement:** Post-completion survey

**Contractor Match Quality:**
- **Target:** >4.0/5 stars average for AI-matched contractors
- **Measurement:** Post-job rating

**Claim Success Rate (For Insured Clients):**
- **Target:** 90% of insurance claims approved
- **Hypothesis:** Educated clients document better → Higher approval rate

### Success Criteria (MVP Launch)

✅ All 7 database models created and migrated
✅ All 23 API endpoints functional
✅ All 12 pages created and navigable
✅ Progress tracking works with real-time WebSocket updates
✅ Smart deep links resume to correct phase
✅ Email notifications send successfully (7 templates)
✅ Education modules viewable and tracked
✅ Completion actions work (auto-request, tour, badge, email)
✅ Admin analytics dashboard displays funnel metrics
✅ WCAG 2.1 AAA compliance verified (automated tests passing)
✅ Mobile responsive (tested on iOS + Android)
✅ Cross-browser compatible (Chrome, Safari, Firefox, Edge)
✅ Auto-save + offline support functional
✅ A/B testing framework operational
✅ Session recording integrated (Hotjar)

---

## Technical Debt & Trade-offs

### Conscious Trade-offs Made

**1. Optional Phases (4-6) vs All Required:**
- **Decision:** Phases 4-6 optional, unlock progressively
- **Trade-off:** Lower data completeness vs higher completion rate
- **Mitigation:** Prompt to complete when creating first request

**2. Client-Side ML Inference vs Server-Side:**
- **Decision:** TensorFlow.js client-side for smart defaults
- **Trade-off:** Larger bundle size vs faster predictions + privacy
- **Mitigation:** Code-split, lazy load ML models only when needed

**3. Session Recording vs Privacy:**
- **Decision:** Full session recording with Hotjar (opt-in)
- **Trade-off:** Privacy concerns vs UX insights
- **Mitigation:** Clear consent, opt-in not opt-out, easy to disable

**4. Real-Time WebSockets vs Polling:**
- **Decision:** WebSockets for cross-tab sync
- **Trade-off:** Server complexity vs better UX
- **Mitigation:** Graceful fallback to polling if WebSocket fails

**5. Encryption Overhead for Access Instructions:**
- **Decision:** Client-specific encryption with AWS KMS
- **Trade-off:** Performance cost vs security
- **Mitigation:** Cache decrypted values for active jobs only

### Known Limitations

**1. Education Module Quizzes:**
- Currently optional, no AI-generated questions
- **Future:** Use GPT-4 to generate contextual quiz questions

**2. Video Testimonials:**
- Requires content production team
- **Placeholder:** Stock videos or customer quotes initially

**3. Multi-Language Support:**
- Professional translation needed (not machine translation)
- **Phase 1:** English + machine translation
- **Phase 2:** Professional translation for top 3 languages

**4. Risk Assessment Service:**
- Requires partnership with assessment providers
- **MVP:** Auto-suggest based on postcode, manual booking
- **Future:** Direct API integration with assessment platforms

---

## Development Timeline

### Week 1-2: Foundation
- Database schema (7 models)
- Validation schemas
- Core services (4 services)
- Basic API endpoints (onboarding start/progress)

### Week 3-4: Core Phases (1-3)
- Profile page + API
- Services page + API
- Property page + API
- Progress tracking dashboard
- Checklist page

### Week 5-6: Progressive Phases (4-6)
- Insurance page + API
- Payment page + API (Stripe integration)
- Communication page + API
- Email service + 7 templates

### Week 7-8: Education & Completion (Phase 7)
- Education module pages
- 7 education HTML modules (content writing)
- Module progress tracking
- Completion actions (auto-request, tour, badge)
- Certificate generation

### Week 9-10: Advanced Features
- WebSocket real-time sync
- Offline auto-save (IndexedDB)
- ML smart defaults (TensorFlow.js)
- A/B testing framework
- Session recording integration

### Week 11-12: Admin & Analytics
- Admin analytics dashboard
- Funnel visualization
- A/B test management UI
- Live monitoring dashboard

### Week 13-14: Polish & Accessibility
- WCAG 2.1 AAA compliance audit
- Screen reader testing
- Keyboard navigation testing
- Cross-browser testing
- Performance optimization
- Load testing

**Total: 14 weeks (3.5 months)**

---

## Environment Variables Required

```bash
# Email Service
SENDGRID_API_KEY=SG.xxx
EMAIL_FROM=noreply@nrpg.com.au

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxx

# AWS (for encryption)
AWS_KMS_MASTER_KEY_ID=arn:aws:kms:...
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=xxx

# File Storage
AWS_S3_BUCKET=nrpg-client-documents
CLOUDINARY_CLOUD_NAME=nrpg
CLOUDINARY_API_KEY=xxx

# Analytics
HOTJAR_ID=xxx
HOTJAR_SV=6
FULLSTORY_ORG_ID=xxx

# WebSockets
WEBSOCKET_URL=wss://api.nrpg.com.au

# App URL
NEXT_PUBLIC_APP_URL=https://disasterrecovery.com.au

# Feature Flags
ENABLE_AB_TESTING=true
ENABLE_SESSION_RECORDING=true
ENABLE_ML_PREDICTIONS=true
```

---

## Risk Assessment & Mitigation

### High Risk

**1. Low Completion Rate (Onboarding Too Long)**
- **Mitigation:** Progressive disclosure (core 3 phases, defer 4-7)
- **Monitoring:** Track drop-off per phase weekly
- **Contingency:** A/B test shorter flows, auto-adopt winners

**2. Payment Phase Drop-Off (Friction)**
- **Mitigation:** Make optional, defer to pre-request
- **Monitoring:** A/B test payment timing
- **Contingency:** Remove from onboarding entirely, collect at checkout only

**3. WCAG AAA Compliance Complexity**
- **Mitigation:** Use accessible primitives (Radix UI) from start
- **Monitoring:** Automated axe-core tests in CI/CD
- **Contingency:** Accessibility audit by specialist before launch

### Medium Risk

**4. WebSocket Scaling (10k+ concurrent clients)**
- **Mitigation:** Use Socket.io clustering with Redis adapter
- **Monitoring:** WebSocket connection count metrics
- **Contingency:** Fallback to polling if WebSocket overloaded

**5. ML Model Accuracy (Smart Defaults Wrong)**
- **Mitigation:** Show confidence scores, explain predictions, easy override
- **Monitoring:** Track override rate (if >40%, model needs retraining)
- **Contingency:** Disable smart defaults if accuracy <70%

### Low Risk

**6. Cross-Device Resume Link Abuse**
- **Mitigation:** Token expires 24h, one-time use, rate limit (5 emails/hour)
- **Monitoring:** Track abuse attempts
- **Contingency:** Add CAPTCHA if abuse detected

---

## Appendix: Email Templates (Detailed Content)

### Template 1: Welcome Email
```
Subject: Welcome to NRPG - Australia's Trusted Disaster Recovery Network

Hi {clientName},

Welcome to NRPG! You've taken the first step toward protecting your property
with Australia's most trusted disaster recovery network.

What makes NRPG different:
✓ Only NRPG-Certified contractors (rigorous vetting)
✓ Insurance claim expertise (we work with your insurer)
✓ 30-minute average emergency response time
✓ Transparent pricing (no hidden platform fees)

Your onboarding is {completionPercentage}% complete.

[Continue Onboarding →]

Next step: {nextPhaseName} (est. {estimatedMinutes} minutes)

Need help? Reply to this email or call 1800 NRPG (1800 6774)

Best regards,
The NRPG Team
```

### Template 2-7: Phase Completion Emails
```
Subject: Phase {N} Complete - {PhaseName}

Hi {clientName},

Great progress! You've completed {phaseName}.

Your progress: {completionPercentage}% complete ({completedPhases}/7 phases)

[Progress Bar Visual]

Next up: {nextPhaseName}
{nextPhaseDescription}

[Continue to {nextPhaseName} →]

Estimated time: {estimatedMinutes} minutes

You're doing great!
NRPG Team
```

### Template 8: Onboarding Complete (Welcome Package)
```
Subject: 🎉 Congratulations! You're a Prepared NRPG Client

Hi {clientName},

Fantastic! You've completed all 7 phases of NRPG onboarding and earned your
"Prepared Client" certificate!

[Certificate Image/PDF Attachment]

What you've accomplished:
✓ Profile setup complete
✓ Service preferences configured
✓ Property details saved
✓ Insurance information added
✓ Payment method secured
✓ Communication preferences set
✓ Education modules completed

Your Benefits:
• Priority contractor matching
• Insurance claim support
• 24/7 emergency access
• Prepared Client badge
• Educational resources

Ready to get started?

[Create Your First Service Request →]
[Take Dashboard Tour →]
[Download Your Certificate →]

As a welcome gift, your first service request gets priority contractor matching!

Need assistance? Our team is here to help:
📞 1800 NRPG (1800 6774)
📧 support@nrpg.com.au

Welcome to the NRPG family!

The NRPG Team
```

---

## Conclusion

This specification defines a comprehensive, accessible, AI-powered client onboarding system that:

1. ✅ Mirrors contractor onboarding architecture (proven success)
2. ✅ Implements progressive disclosure (reduce friction)
3. ✅ Supports emergency fast-track (3-phase) and VIP flows
4. ✅ Uses ML for smart defaults and A/B testing
5. ✅ Provides real-time cross-device sync (WebSockets)
6. ✅ Ensures WCAG 2.1 AAA accessibility (top priority)
7. ✅ Encrypts sensitive security data (access instructions)
8. ✅ Builds trust through AI confidence scores and testimonials
9. ✅ Educates clients (7 modules, professional content)
10. ✅ Monitors with admin analytics and session recording

**Implementation:** 57 tasks over 14 weeks
**Expected Outcome:** 75% completion rate, <45min average time, educated client base
**ROI:** Higher request creation, better contractor matching, fewer disputes, improved satisfaction

---

**Document Version:** 1.0.0
**Last Updated:** 2026-01-02
**Next Review:** After MVP completion (Week 14)
