# NRPG SaaS Platform - Complete Architecture Specification

**Project:** NRPG Disaster Recovery Platform - Dual-Sided Dispatch SaaS
**Version:** 1.0.0
**Date:** 2026-01-02
**Status:** Architecture Specification
**Type:** Subscription-Based Lead Generation + Dispatch Platform

---

## Executive Summary

NRPG is a dual-sided SaaS platform connecting disaster recovery clients with certified restoration contractors through intelligent dispatch, rotation systems, and subscription-based access.

### Core Business Model

**Revenue Model:** Contractor subscription fees (lead generation SaaS)
- Contractors pay monthly subscription for access to client leads
- Tiered pricing: Basic, Pro, Enterprise
- Clients use platform free (emergency intake, education, tracking)

**Platform Function:** Dispatch/Routing + Education Authority
- NOT a data warehouse (contractors bring own CRM/storage)
- NOT a traditional marketplace (no bidding, no client choice initially)
- IS a rotation-based dispatch system with geographic matching
- IS an education authority (client education + contractor training)

### Unique Architecture

**Contractors Bring Own Infrastructure:**
- Contractors maintain own CRM (ServiceM8, Fergus, Tradify, or NRPG's basic CRM)
- Contractors store own client data and job photos
- Platform tracks via API integration (real-time webhooks)
- Platform provides: Lead dispatch, training, certification, leaderboard

**Clients Get Free Platform:**
- Emergency intake and education
- Job tracking and status updates
- Quality assurance (private ratings affect rotation)
- No charge to property owners

---

## Table of Contents

1. [User Roles & Permissions](#user-roles--permissions)
2. [Contractor Subscription Tiers](#contractor-subscription-tiers)
3. [Dispatch & Rotation System](#dispatch--rotation-system)
4. [Multi-Tenant Workspace Model](#multi-tenant-workspace-model)
5. [Database Architecture](#database-architecture)
6. [API Integration Layer](#api-integration-layer)
7. [Billing & Subscription Management](#billing--subscription-management)
8. [Audit Logging](#audit-logging)
9. [Performance & Quality Metrics](#performance--quality-metrics)
10. [Edge Cases & Business Rules](#edge-cases--business-rules)

---

## User Roles & Permissions

### Role Hierarchy

**1. Super Admin (Platform Owner)**
- Full platform access
- Manage contractor subscriptions
- Override rotation system
- View all audit logs
- Configure platform settings (rotation rules, tier pricing)

**2. Admin (Operations Staff)**
- View all incidents and jobs
- Manual dispatch override
- Approve contractor onboarding
- Handle dispute escalations
- Cannot change pricing or platform configuration

**3. Contractor (Subscriber)**
- **Workspace Owner:** Full workspace control, billing, team management
- **Team Member:** Job access, client communication, status updates
- **Field Technician:** View-only assigned jobs, update status, upload photos
- Tiered access based on subscription level

**4. Client (Free User)**
- Submit emergency requests
- Track job status
- Provide private feedback (ratings)
- Access educational content
- No billing, no subscription

### Permission Matrix

| Action | Super Admin | Admin | Contractor Owner | Team Member | Field Tech | Client |
|--------|-------------|-------|------------------|-------------|------------|--------|
| View own jobs | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Accept new jobs | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| Update job status | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| Invite team members | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ |
| Manage billing | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ |
| View leaderboard | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| Access training modules | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| View platform analytics | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Override rotation | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |

---

## Contractor Subscription Tiers

### Strategic Decision: Tiered Seats + Geographic Radius + CRM

**Basic Tier: $99/month**
- **Seats:** 1 user (owner only)
- **Monthly Job Limit:** 10 jobs
- **Overage Pricing:** $15 per job over limit
- **Geographic Radius:** Platform-assigned based on density
- **CRM:** Included (basic NRPG CRM - jobs, clients, invoices)
- **Features:**
  - Job rotation access
  - Basic training modules
  - Regional leaderboard
  - Email notifications
  - Mobile app access

**Pro Tier: $299/month**
- **Seats:** 5 users (owner + 4 team members)
- **Monthly Job Limit:** 50 jobs
- **Overage Pricing:** $10 per job over limit
- **Geographic Radius:** Configurable (up to 50km)
- **CRM:** Choose NRPG CRM OR integrate external (ServiceM8, Fergus, Tradify)
- **Features:**
  - Everything in Basic
  - Priority rotation (slight preference in tie-breaks)
  - Advanced training modules
  - National + regional leaderboard
  - API access for integrations
  - Priority support (24hr response)

**Enterprise Tier: $799/month**
- **Seats:** Unlimited team members
- **Monthly Job Limit:** Unlimited jobs
- **Overage Pricing:** N/A
- **Geographic Radius:** Custom (multi-region coverage)
- **CRM:** Full external integration + custom API endpoints
- **Features:**
  - Everything in Pro
  - Dedicated account manager
  - Custom integration development
  - White-label reporting
  - Priority dispatch (first in rotation for high-value jobs)
  - Bulk property management tools
  - Advanced analytics dashboard

### Tier Comparison Table

| Feature | Basic | Pro | Enterprise |
|---------|-------|-----|------------|
| Monthly Fee | $99 | $299 | $799 |
| Seats | 1 | 5 | Unlimited |
| Job Limit | 10 | 50 | Unlimited |
| Overage Rate | $15/job | $10/job | N/A |
| Radius | Auto | Up to 50km | Custom |
| CRM | Basic included | NRPG or External | Full integration |
| Support | Email | Priority (24hr) | Dedicated manager |
| Leaderboard | Regional | National + Regional | Featured placement |

---

## Dispatch & Rotation System

### Rotation Algorithm (Strategic Decision: Auto-Dispatch)

**Emergency Jobs (Critical Priority):**
```
1. Receive emergency intake (e.g., sewage backup at school, 2am)
2. Classify priority: CRITICAL
3. Query contractors:
   - Within KM radius of incident
   - Have required certifications (e.g., IICRC S500, biohazard)
   - Currently available (status = AVAILABLE)
   - Not at monthly job limit (or willing to pay overage)
   - Sort by: Last job received (fair rotation)
4. Notify Contractor #1 (SMS + push + email)
5. Wait 5 minutes for response
6. If declined/no response:
   - No penalty (strategic decision)
   - Move to Contractor #2
   - Repeat until accepted
7. If no contractor within 100km accepts:
   - Queue for 6am next morning (strategic decision)
   - Send apology email to client
   - Alert admin for manual follow-up
8. Once accepted:
   - Notify client (contractor details, ETA)
   - Remove from rotation pool
   - Track via API integration
```

**Soft Preference for Repeat Clients (Strategic Decision):**
```
If (job.clientId has previous job with contractorId):
  Offer to previous contractor FIRST
  If declined, continue normal rotation
Else:
  Standard rotation
```

**Rotation Fairness:**
- Track "last job received" timestamp per contractor
- Always offer to contractor who has waited longest
- Reset on decline/no response (but no penalty)
- Geographic filtering happens before rotation sort

### Decline Behavior (Strategic Decision: No Penalty)

**When contractor declines or doesn't respond:**
- ✅ Continue to next contractor in rotation
- ✅ Maintain contractor's position for next job
- ✅ No penalties or timeouts
- ✅ Track decline rate (for tier eligibility, not punishment)

**Rationale:** Keep contractor relationships positive, allow selective job acceptance

---

## Multi-Tenant Workspace Model

### Workspace Structure (Strategic Decision: Tiered Seats)

**Workspace = Contractor Business Entity**

```
Workspace (e.g., "ABC Restoration Pty Ltd")
├─ Owner (1 seat) - Full control, billing admin
├─ Team Members (4 seats on Pro, unlimited on Enterprise)
│   ├─ Role: Manager (can accept jobs, manage team)
│   ├─ Role: Technician (can update job status, upload photos)
│   └─ Role: Admin Staff (can view jobs, handle invoices)
└─ Settings
    ├─ Subscription tier
    ├─ Payment method
    ├─ Service areas (postcodes)
    ├─ Certifications (IICRC codes)
    └─ CRM integration (own CRM or NRPG CRM)
```

**Seat Management:**
- Basic: 1 seat (owner only)
- Pro: 5 seats ($299/month flat, not per-seat)
- Enterprise: Unlimited seats ($799/month flat)
- Invite flow: Owner sends email → recipient creates account → auto-added to workspace

**Data Isolation:**
```sql
-- Every contractor-related table has workspaceId
CREATE TABLE contractor_jobs (
  id UUID PRIMARY KEY,
  workspaceId UUID NOT NULL, -- Workspace isolation
  clientId UUID,
  status VARCHAR,
  assignedUserId UUID, -- Team member assigned
  ...
);

-- Queries always filter by workspace
SELECT * FROM contractor_jobs
WHERE workspaceId = :currentUserWorkspaceId
AND status = 'active';
```

---

## Database Architecture

### Core Tables

#### 1. Users (Authentication)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  passwordHash VARCHAR,
  emailVerified BOOLEAN DEFAULT false,
  role VARCHAR NOT NULL, -- 'SUPER_ADMIN', 'ADMIN', 'CONTRACTOR', 'CLIENT'
  createdAt TIMESTAMP,
  lastLoginAt TIMESTAMP
);
```

#### 2. Workspaces (Contractor Businesses)
```sql
CREATE TABLE workspaces (
  id UUID PRIMARY KEY,
  businessName VARCHAR NOT NULL,
  abnNumber VARCHAR UNIQUE,
  subscriptionTier VARCHAR NOT NULL, -- 'basic', 'pro', 'enterprise'
  subscriptionStatus VARCHAR, -- 'active', 'past_due', 'cancelled', 'trial'
  stripeCustomerId VARCHAR UNIQUE,
  stripeSubscriptionId VARCHAR,
  currentPeriodEnd TIMESTAMP,
  seatLimit INT, -- 1, 5, unlimited
  jobLimit INT, -- 10, 50, unlimited
  serviceRadiusKm INT,
  createdAt TIMESTAMP,
  ownerId UUID REFERENCES users(id)
);
```

#### 3. Workspace Members (Team)
```sql
CREATE TABLE workspace_members (
  id UUID PRIMARY KEY,
  workspaceId UUID REFERENCES workspaces(id),
  userId UUID REFERENCES users(id),
  role VARCHAR NOT NULL, -- 'owner', 'manager', 'technician', 'admin_staff'
  invitedAt TIMESTAMP,
  joinedAt TIMESTAMP,
  invitedBy UUID REFERENCES users(id),
  UNIQUE(workspaceId, userId)
);
```

#### 4. Clients (Free Users)
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES users(id),
  -- Client data stored here (onboarding results)
  -- Property, insurance, preferences
  fraudFlagCount INT DEFAULT 0,
  totalJobsSubmitted INT DEFAULT 0,
  createdAt TIMESTAMP
);
```

#### 5. Incidents (Job Requests)
```sql
CREATE TABLE incidents (
  id UUID PRIMARY KEY,
  clientId UUID REFERENCES clients(id),
  priority VARCHAR NOT NULL, -- 'critical', 'high', 'medium', 'low'
  disasterType VARCHAR,
  location VARCHAR,
  suburb VARCHAR,
  postcode VARCHAR,
  latitude DECIMAL,
  longitude DECIMAL,
  status VARCHAR, -- 'new', 'dispatching', 'accepted', 'in-progress', 'completed', 'cancelled'

  -- Dispatch tracking
  offeredToContractors JSONB, -- [{contractorId, offeredAt, response}]
  acceptedByWorkspaceId UUID REFERENCES workspaces(id),
  acceptedByUserId UUID REFERENCES users(id),
  acceptedAt TIMESTAMP,

  -- Verification
  clientConfirmedComplete BOOLEAN,
  clientRating INT, -- 1-5, private
  clientFeedback TEXT, -- Private feedback

  createdAt TIMESTAMP,
  completedAt TIMESTAMP
);
```

#### 6. Contractor Rotation Queue
```sql
CREATE TABLE contractor_rotation (
  id UUID PRIMARY KEY,
  workspaceId UUID REFERENCES workspaces(id),
  postcode VARCHAR,
  lastJobReceivedAt TIMESTAMP, -- For fair rotation
  totalJobsReceived INT,
  totalJobsDeclined INT,
  declineRate DECIMAL,
  availabilityStatus VARCHAR, -- 'available', 'busy', 'offline'
  updatedAt TIMESTAMP
);
```

#### 7. Audit Log (Complete Logging - Strategic Decision)
```sql
CREATE TABLE audit_log (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES users(id),
  workspaceId UUID REFERENCES workspaces(id),
  action VARCHAR NOT NULL, -- 'job_viewed', 'job_accepted', 'job_declined', 'status_updated', etc.
  entityType VARCHAR, -- 'incident', 'workspace', 'subscription', 'training'
  entityId UUID,
  metadata JSONB, -- Details specific to action
  ipAddress VARCHAR,
  userAgent VARCHAR,
  createdAt TIMESTAMP
);

CREATE INDEX idx_audit_log_user ON audit_log(userId, createdAt);
CREATE INDEX idx_audit_log_workspace ON audit_log(workspaceId, createdAt);
CREATE INDEX idx_audit_log_action ON audit_log(action, createdAt);
```

**Rationale:** Complete audit log for:
- Dispute resolution
- Regulatory compliance
- Fraud investigation
- Performance analytics
- Churn analysis

---

## API Integration Layer

### Contractor CRM Integration (Strategic Decision: Real-Time Webhooks)

**Supported External CRMs:**
- ServiceM8 (Australian trade management)
- Fergus (job management)
- Tradify (trade business software)
- Custom API (Enterprise tier)

**Integration Pattern: Webhooks (Real-Time)**

```typescript
// Contractor CRM → NRPG Platform
POST https://api.nrpg.com.au/webhooks/job-status

Headers:
  X-Workspace-ID: {workspaceId}
  X-API-Key: {contractor_api_key}
  X-Webhook-Signature: {hmac_signature}

Body:
{
  externalJobId: "SM-12345", // ID in contractor's CRM
  nrpgIncidentId: "inc_abc123", // NRPG incident ID
  status: "in-progress", // new, in-progress, completed, cancelled
  statusDetails: {
    arrivedAt: "2026-01-02T14:30:00Z",
    workCommencedAt: "2026-01-02T14:45:00Z",
    estimatedCompletionAt: "2026-01-02T18:00:00Z"
  },
  photos: [
    {url: "https://contractor-storage.com/photo1.jpg", type: "before"},
    {url: "https://contractor-storage.com/photo2.jpg", type: "during"}
  ],
  notes: "Water extraction complete, dehumidifiers placed"
}

// NRPG validates webhook signature, updates incident status, notifies client
```

**Webhook Security:**
- HMAC signature verification
- API key per workspace
- Rate limiting (100 requests/minute)
- IP whitelist (optional)

**Fallback: Polling (if contractor CRM doesn't support webhooks)**
- NRPG polls contractor's API every 5 minutes
- Standard REST endpoints
- Same data schema
- Slight delay acceptable for non-critical updates

---

## Billing & Subscription Management

### Stripe Integration (Strategic Decision: Upfront Monthly)

**Subscription Flow:**
```
1. Contractor completes onboarding
2. Selects tier (Basic $99, Pro $299, Enterprise $799)
3. Stripe Checkout Session created
4. Payment method saved
5. Subscription created (recurring monthly)
6. Workspace.subscriptionStatus = 'active'
7. Workspace.currentPeriodEnd = 30 days from now
8. Welcome email sent (after email verification)
9. Access to rotation system granted
```

**Billing Cycle:**
- Monthly recurring (1st of each month or anniversary)
- Prorated on tier upgrades
- Immediate on tier downgrades (credit applied to next month)

### Overage Pricing (Strategic Decision: Allow with Premium Charge)

**When contractor exceeds monthly job limit:**
```
Scenario: Basic tier (10 jobs/month), contractor has accepted 10 jobs

Job #11 offered:
1. Show modal: "You've reached your 10-job limit for this month"
2. Options:
   a) "Accept job for $15 overage fee" (allow with charge)
   b) "Upgrade to Pro ($299/month unlimited)" (upsell)
   c) "Decline this job" (skip)
3. If accepts overage:
   - Charge $15 immediately
   - Add to next invoice
   - Job added to this month's count
4. If upgrades:
   - Prorate upgrade
   - Job counts towards new unlimited tier
```

**Overage Tracking:**
```sql
CREATE TABLE subscription_overages (
  id UUID PRIMARY KEY,
  workspaceId UUID,
  billingPeriod DATE, -- '2026-01-01'
  jobCount INT, -- How many over limit
  overageFees DECIMAL, -- Total $ charged
  stripeInvoiceId VARCHAR,
  createdAt TIMESTAMP
);
```

### Subscription Lifecycle

**Payment Failure (Strategic Decision: Smart Retry + 3-Day Grace)**

```
Day 1 (Payment Fails):
  - Stripe auto-retries
  - Email: "Payment failed, we'll retry tomorrow"
  - workspace.subscriptionStatus = 'past_due'
  - NO service interruption yet

Day 2 (2nd Retry):
  - Stripe retries
  - Email: "2nd payment attempt failed, please update card"
  - Still past_due, still has access

Day 3 (3rd Retry):
  - Stripe final retry
  - Email: "Final attempt tomorrow, update card to avoid suspension"
  - Grace period: Finish active jobs, cannot accept new jobs

Day 4 (Failed Final Retry):
  - workspace.subscriptionStatus = 'suspended'
  - Block new job offers
  - Allow view-only access (see dashboard, job history)
  - Email: "Subscription suspended, reactivate to receive jobs"
  - Active jobs: Allow completion (7-day grace - strategic decision)

Day 11 (Active Jobs Grace Period Ends):
  - If payment still not resolved:
  - workspace.subscriptionStatus = 'cancelled'
  - Full account lock (read-only)
  - Retain data for 30 days (re-activation possible)

Day 41 (30 Days After Cancellation):
  - Anonymize workspace data
  - Delete PII
  - Keep aggregated metrics for analytics
```

### Downgrade Behavior

**Contractor downgrades Pro → Basic:**
- Immediate tier change
- Seat limit enforced (5 → 1):
  - Owner keeps access
  - 4 team members locked out
  - Email to team: "Workspace downgraded, contact owner"
- Job limit enforced:
  - Current month: Prorated based on days remaining
  - Next month: 10 job limit
- External CRM integration:
  - Remains active (don't break existing setup)
  - But cannot modify integration

---

## Performance & Quality Metrics

### Public Leaderboard (Strategic Decision: Dual - Global + Regional)

**Global Leaderboard (Top 100 Australia-Wide):**
```
Ranking Criteria:
1. Job completion rate (40% weight)
2. Average client rating (30% weight) - Private but affects leaderboard
3. Response time (20% weight)
4. Total jobs completed (10% weight)

Display:
- Rank #1-100
- Business name
- State
- Completion rate %
- Total jobs (count)
- Member since date
- Badges (IICRC certifications, years of service)
```

**Regional Leaderboard (Top 10 per State/Metro):**
```
Regions:
- Sydney Metro
- Melbourne Metro
- Brisbane/Gold Coast
- Perth Metro
- Adelaide
- Regional NSW
- Regional VIC
- Regional QLD
- etc.

Same ranking criteria, scoped to region
Prevents metro dominance, achievable goals
```

### Private Feedback (Strategic Decision: Platform-Only Visibility)

**After Job Completion:**
```
Client receives:
"How was your experience with ABC Restoration?"

1-5 Star Rating: ⭐⭐⭐⭐⭐
Comments (optional): [text field]

[Submit Feedback]

Visibility:
- Client: Sees their own feedback
- Contractor: NEVER sees individual feedback (avoid conflict)
- Platform: Uses for rotation priority
  - 4.5★+ = normal rotation
  - 4.0-4.49★ = slight de-prioritization
  - <4.0★ = quality review, possible suspension
- Leaderboard: Average rating affects ranking (but individual reviews hidden)
```

**Rationale:** Protect contractors from one unfair review, use aggregate for quality, prevent public shaming

---

## Edge Cases & Business Rules

### Scenario: No Contractors Available (Rural 3am)

**Strategic Decision: Queue for Morning**

```
If (no contractor within 100km radius accepts within 30 minutes):
  1. Send email to client:
     Subject: "We're Finding You Help"
     Body: "Due to the late hour and your location, we're coordinating contractors
           to respond at 6am. In the meantime, here's what to do..."
     Include: Emergency safety steps, documentation checklist, NRPG emergency line

  2. Queue incident for 6am dispatch:
     - Set status = 'queued_for_morning'
     - Schedule automated re-dispatch at 6:00am
     - Alert admin dashboard (manual backup option)

  3. At 6am:
     - Re-run rotation algorithm
     - Expand radius to 200km
     - Notify contractors via phone call (not just SMS)

  4. If still no response by 8am:
     - Admin manual outreach
     - Interstate contractor coordination
     - Offer surge pricing (2x) to incentivize
```

### Scenario: Fraud Detection (3 Claims in 6 Months)

**Strategic Decision: Auto-Flag with Visible Warning**

```
If (client.totalJobsSubmitted > 3 in last 6 months):
  1. Display warning on intake form:
     "We noticed you've submitted multiple requests recently.
      To prevent fraud and maintain quality, please verify:
      - Upload clear damage photos
      - Provide insurance claim reference (if applicable)
      - Confirm property ownership or tenant authorization"

  2. Flag incident for admin review:
     - status = 'pending_verification'
     - Auto-dispatch blocked until admin approves
     - Admin sees: Client history, all previous jobs, pattern analysis

  3. Admin review:
     - Approve: Continue normal dispatch
     - Request more info: Email client for clarification
     - Reject: Block submission, flag client account

  4. Track:
     - clients.fraudFlagCount++
     - If fraudFlagCount > 5: Permanent block + investigation
```

**Rationale:** Transparent with client (educational, not accusatory), prevent actual fraud, allow legitimate repeat users

### Scenario: Contractor Tier Limit Reached

**Strategic Decision: Overage Pricing**

```
Contractor (Basic tier, 10 jobs this month) receives job #11 offer:

UI Modal:
┌─────────────────────────────────────────────┐
│ 🎉 New Job Available                        │
│                                              │
│ Sewage Backup - Bondi - $4,500 job          │
│                                              │
│ ⚠️ You've reached your 10-job limit         │
│                                              │
│ Options:                                     │
│ ○ Accept for $15 overage fee                │
│ ○ Upgrade to Pro (unlimited) for $299/month │
│ ○ Decline this job                          │
│                                              │
│ [Your Choice]                                │
└─────────────────────────────────────────────┘

If accepts overage:
  - Stripe: Charge $15 immediately
  - Email: "Overage fee applied: $15 for job beyond limit"
  - Allow job acceptance
  - Add line item to next invoice

If upgrades:
  - Stripe: Prorate upgrade ($299 - used portion of $99)
  - Immediate tier change
  - Job counts towards Pro tier (unlimited)
  - Welcome to Pro email

If declines:
  - Move to next contractor
  - No penalty for decline
```

---

## Webhook Event System

### Stripe Webhooks (Subscription Lifecycle)

```typescript
// Listen for Stripe webhook events
POST /api/webhooks/stripe

Events to handle:
- customer.subscription.created → Activate workspace
- customer.subscription.updated → Update tier/status
- customer.subscription.deleted → Cancel workspace
- invoice.payment_succeeded → Confirm payment, extend period
- invoice.payment_failed → Start dunning cycle
- customer.subscription.trial_will_end → 3-day reminder email
- charge.succeeded → Log successful overage payment
- charge.failed → Alert admin, email contractor

Signature Verification:
  const sig = request.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  // Prevents replay attacks, validates authenticity
```

### Contractor CRM Webhooks (Job Status Updates)

```typescript
// Contractor's CRM → NRPG
POST /api/webhooks/job-status

{
  workspaceId: "ws_abc123",
  incidentId: "inc_xyz789",
  externalJobId: "SM-98765", // ID in contractor's ServiceM8
  status: "in-progress",
  updates: {
    arrivedAt: "2026-01-02T10:30:00Z",
    estimatedCompletion: "2026-01-02T16:00:00Z",
    notes: "Water extraction complete, drying equipment placed"
  }
}

Platform actions:
1. Validate webhook signature
2. Update incident.status
3. Notify client via email/SMS
4. Log to audit_log
5. Update contractor performance metrics
```

---

## Security & Compliance

### API Key Management (Contractor Integrations)

```typescript
// Generate API key for contractor workspace
POST /api/workspace/{workspaceId}/api-keys

Response:
{
  apiKey: "nrpg_live_abc123...", // SHA-256, 64 chars
  secretKey: "sk_live_xyz789...", // For webhook signatures
  createdAt: "2026-01-02T10:00:00Z",
  expiresAt: null, // Doesn't expire unless revoked
  scopes: ["job:read", "job:update", "webhook:receive"]
}

Storage:
- Hash API key before storing (bcrypt)
- Plain secret key stored (for HMAC verification)
- Never show API key again after generation
- Regenerate if compromised
```

### Rate Limiting

**API Endpoints:**
```
/api/webhooks/* - 100 requests/min per workspace
/api/jobs/* - 1000 requests/hour per workspace
/api/auth/* - 5 requests/min per IP (login protection)
/api/public/* - 60 requests/min per IP
```

**Implementation:**
- Redis-based (sliding window)
- Return `429 Too Many Requests` with `Retry-After` header
- Log rate limit violations (potential abuse)

---

## Data Retention & Privacy

### Churn Data Retention (Strategic Decision: 30-Day Grace)

**When contractor cancels subscription:**

```
Day 0 (Cancellation):
  - workspace.subscriptionStatus = 'cancelled'
  - Block new job offers immediately
  - Allow active jobs to complete (grace period)
  - Email: "Subscription cancelled, data retained for 30 days"

Day 1-30 (Grace Period):
  - Full data access (read-only)
  - Can download job history, invoices, certificates
  - Can reactivate anytime (resume subscription)
  - All data intact

Day 30 (Data Anonymization):
  - Delete PII: business name, ABN, contact details
  - Keep anonymized metrics:
    - Job completion rate (for platform analytics)
    - Geographic data (aggregate)
    - Churn analysis data
  - Delete API keys
  - Remove from rotation system

Day 60 (Full Purge):
  - Delete anonymized data
  - Complete removal from platform
  - Irreversible
```

---

## Contractor Tier Structure (Detail Required)

**REQUEST: User mentioned "Look into the construction of the Tiers for contractors. It is all included within there"**

Based on session context, here's the proposed tier structure:

### Basic Tier - $99/month
- 1 seat (owner only)
- 10 jobs/month
- $15/job overage
- Platform-assigned radius (10-25km based on density)
- Included basic CRM
- Regional leaderboard access
- Standard rotation (no priority)

### Pro Tier - $299/month
- 5 seats (owner + 4 team)
- 50 jobs/month
- $10/job overage
- Configurable radius (up to 50km)
- External CRM integration OR NRPG CRM
- National + regional leaderboard
- API access
- Priority support

### Enterprise Tier - $799/month
- Unlimited seats
- Unlimited jobs
- No overage fees
- Multi-region coverage (custom radius)
- Full external CRM integration + custom API
- Featured leaderboard placement
- Dedicated account manager
- White-label reporting
- Bulk property tools

**NOTE:** User should provide actual tier specifications if different

---

## Implementation Checklist

### Stage 1: Foundation (Week 1-2)
- [ ] User roles and permissions table
- [ ] Workspace/organization model
- [ ] Basic auth (signup, login, email verification)
- [ ] Subscription tier selection UI

### Stage 2: Database (Week 3-4)
- [ ] All core tables (users, workspaces, members, incidents, audit)
- [ ] Migrations system
- [ ] Row-level security (workspace isolation)
- [ ] Indexes for performance

### Stage 3: Auth & RBAC (Week 5-6)
- [ ] Role-based access control middleware
- [ ] Workspace invites (email flow)
- [ ] Team member management
- [ ] Permission checks on all API routes

### Stage 4: Billing (Week 7-8)
- [ ] Stripe subscription integration
- [ ] Tier selection and checkout
- [ ] Webhook handling (payment events)
- [ ] Overage pricing logic
- [ ] Billing portal (invoices, payment method)

### Stage 5: Dispatch & Rotation (Week 9-10)
- [ ] Auto-dispatch algorithm
- [ ] KM radius calculation (PostGIS or similar)
- [ ] Rotation queue management
- [ ] Contractor notification system (SMS, push, email)
- [ ] Job acceptance/decline flow

### Stage 6: CRM Integration (Week 11-12)
- [ ] Webhook endpoint (/api/webhooks/job-status)
- [ ] API key generation
- [ ] Signature verification
- [ ] External CRM adapters (ServiceM8, Fergus)
- [ ] Basic NRPG CRM (for Basic tier)

### Stage 7: Quality & Compliance (Week 13-14)
- [ ] Private feedback/rating system
- [ ] Leaderboard calculation (global + regional)
- [ ] Fraud detection (3 claims in 6 months)
- [ ] Complete audit logging
- [ ] Data retention policies

---

**SaaS Architecture Specification v1.0.0**
**Status:** Complete - Ready for Implementation
**Next:** Begin Stage 1 (Foundation)

**NOTE:** This spec incorporates all strategic decisions from 17 interview questions. Ready to build production-grade dual-sided SaaS platform.
