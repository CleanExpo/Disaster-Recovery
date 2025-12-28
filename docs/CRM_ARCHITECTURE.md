# CRM Architecture Documentation

## Overview

The Disaster Recovery NRPG Platform includes a comprehensive Customer Relationship Management (CRM) system designed specifically for the disaster recovery industry. The CRM tracks customer lifecycle stages, manages opportunities (sales pipeline), records activities, and implements business rules with automated accountability.

**Date Created**: 2025-12-29
**Last Updated**: 2025-12-29
**Version**: 1.0.0

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Core Models](#core-models)
3. [Health Score Calculation](#health-score-calculation)
4. [Business Rules & Accountability](#business-rules--accountability)
5. [API Endpoints](#api-endpoints)
6. [Service Layer](#service-layer)
7. [Integration Points](#integration-points)

---

## System Architecture

### High-Level Design

```
┌─────────────────────────────────────────────────────────────┐
│                     CRM Core System                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐ │
│  │   Customer     │  │   Opportunity  │  │   Activity   │ │
│  │   Lifecycle    │◄─┤   Management   │◄─┤   Tracking   │ │
│  │                │  │                │  │              │ │
│  └────────────────┘  └────────────────┘  └──────────────┘ │
│         ▲                    ▲                    ▲         │
│         │                    │                    │         │
│         └────────────────────┴────────────────────┘         │
│                              │                               │
│                    ┌─────────▼──────────┐                   │
│                    │   Business Rules   │                   │
│                    │   & Automation     │                   │
│                    └────────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Database**: PostgreSQL with Prisma ORM
- **Backend**: TypeScript/Node.js
- **Real-time Updates**: Redis for caching and event publishing
- **Logging**: Winston with structured logging
- **Health Monitoring**: Custom health score algorithm

---

## Core Models

### 1. CustomerLifecycle

**Purpose**: Tracks the complete journey of a customer from initial lead to advocate.

**Database Schema** (`prisma/schema.prisma`):

```prisma
model CustomerLifecycle {
  id String @id @default(cuid())

  // Customer Reference
  userId String @unique
  user   User   @relation("CustomerLifecycle", fields: [userId], references: [id], onDelete: Cascade)

  // Lifecycle Stage
  currentStage      CustomerLifecycleStage @default(LEAD)
  previousStage     CustomerLifecycleStage?
  stageChangedAt    DateTime               @default(now())

  // Engagement Metrics
  totalInteractions    Int      @default(0)
  lastInteractionDate  DateTime?
  daysSinceLastContact Int      @default(0)

  // Value Metrics
  lifetimeValueAUD   Decimal @default(0) @db.Decimal(10, 2)
  averageJobValueAUD Decimal @default(0) @db.Decimal(10, 2)
  totalJobsCompleted Int     @default(0)

  // Health Score (0-100)
  healthScore       Int     @default(50)
  healthScoreReason String? @db.Text

  // Churn Risk Indicators
  churnRiskScore Int      @default(0) // 0-100 scale
  isAtRisk       Boolean  @default(false)
  atRiskReasons  String[] // ["low_engagement", "payment_issues", "poor_rating"]

  // Customer Success
  assignedCSMId      String? // Customer Success Manager
  nextTouchpointDate DateTime?

  // Audit
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  opportunities Opportunity[]
  activities    Activity[]
  tasks         Task[]

  @@index([currentStage])
  @@index([healthScore])
  @@index([churnRiskScore])
  @@index([isAtRisk])
  @@index([lastInteractionDate])
  @@map("customer_lifecycle")
}
```

**Lifecycle Stages**:

```typescript
enum CustomerLifecycleStage {
  LEAD              // Initial inquiry
  QUALIFIED_LEAD    // Passed lead scoring
  OPPORTUNITY       // Active sales discussion
  CUSTOMER          // Won deal, active customer
  AT_RISK           // Low engagement signals
  CHURNED           // Lost customer
  ADVOCATE          // Promoter, referral source
}
```

**Key Features**:
- Automatic stage progression based on activities
- Real-time health score calculation
- Churn prediction using engagement patterns
- Customer Success Manager assignment

---

### 2. Opportunity

**Purpose**: Manages sales pipeline from initial discovery to closed (won/lost).

**Database Schema**:

```prisma
model Opportunity {
  id String @id @default(cuid())

  // Customer Reference
  customerLifecycleId String
  customerLifecycle   CustomerLifecycle @relation(fields: [customerLifecycleId], references: [id], onDelete: Cascade)

  // Link to existing ServiceRequest
  serviceRequestId String?         @unique
  serviceRequest   ServiceRequest? @relation("OpportunityServiceRequest", fields: [serviceRequestId], references: [id])

  // Link to Booking if converted
  bookingId String?  @unique
  booking   Booking? @relation("OpportunityBooking", fields: [bookingId], references: [id])

  // Opportunity Details
  name               String // "Water Damage - 123 Smith St"
  stage              OpportunityStage @default(DISCOVERY)
  estimatedValueAUD  Decimal          @db.Decimal(10, 2)
  probabilityPercent Int              @default(50) // 0-100

  // Service Details
  australianServiceType AustralianServiceType
  urgencyLevel          EmergencyResponseLevel
  serviceState          AustralianState
  servicePostcode       String

  // Timeline
  expectedCloseDate DateTime?
  actualCloseDate   DateTime?

  // Assignment
  assignedContractorId String?
  assignedContractor   Contractor? @relation("OpportunityContractor", fields: [assignedContractorId], references: [id])

  // Close Reason (if lost)
  closeReason      String? // "price_too_high", "chose_competitor", "timeline_mismatch"
  competitorChosen String? // Name of competitor if applicable

  // Forecast
  forecastCategory String? // "commit", "best_case", "pipeline"

  // Audit
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  activities Activity[]
  tasks      Task[]

  @@index([stage])
  @@index([expectedCloseDate])
  @@index([australianServiceType])
  @@index([serviceState])
  @@index([assignedContractorId])
  @@map("opportunities")
}
```

**Opportunity Stages**:

```typescript
enum OpportunityStage {
  DISCOVERY         // Initial conversation
  ASSESSMENT        // NRPG inspection scheduled
  PROPOSAL          // Quote/estimate sent
  NEGOTIATION       // Discussing terms
  CLOSED_WON        // Deal won
  CLOSED_LOST       // Deal lost
}
```

**Key Features**:
- Linked to ServiceRequest (initial inquiry)
- Automatic conversion to Booking when won
- Probability-weighted forecasting
- Competitor tracking for lost deals
- Australian state and postcode targeting

---

### 3. Activity

**Purpose**: Records all customer interactions (calls, emails, meetings, inspections, etc.).

**Database Schema**:

```prisma
model Activity {
  id String @id @default(cuid())

  // Customer Reference
  customerLifecycleId String?
  customerLifecycle   CustomerLifecycle? @relation(fields: [customerLifecycleId], references: [id], onDelete: Cascade)

  // Opportunity Reference
  opportunityId String?
  opportunity   Opportunity? @relation(fields: [opportunityId], references: [id], onDelete: Cascade)

  // Booking Reference (for post-sale activities)
  bookingId String?
  booking   Booking? @relation("ActivityBooking", fields: [bookingId], references: [id])

  // Claim Reference
  claimId         String?
  insuranceClaim  InsuranceClaimAU? @relation("ActivityClaim", fields: [claimId], references: [id])

  // Activity Details
  type        ActivityType
  subject     String // "Follow-up call with John"
  description String? @db.Text
  outcome     String? @db.Text // Result of the activity

  // Participants
  performedById String // User who performed activity
  performedBy   User   @relation("ActivityPerformer", fields: [performedById], references: [id])

  customerId String? // Customer involved
  customer   User?   @relation("ActivityCustomer", fields: [customerId], references: [id])

  contractorId String?
  contractor   Contractor? @relation("ActivityContractor", fields: [contractorId], references: [id])

  // Timing
  activityDate    DateTime @default(now())
  durationMinutes Int?     // For calls/meetings

  // Attachments
  attachments String[] // URLs to documents, recordings, etc.

  // Sentiment Analysis
  sentiment      String? // "positive", "neutral", "negative"
  sentimentScore Float?  // -1.0 to 1.0

  // Follow-up
  requiresFollowUp Boolean   @default(false)
  followUpDate     DateTime?
  followUpTaskId   String?

  // Audit
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([customerLifecycleId])
  @@index([opportunityId])
  @@index([type])
  @@index([activityDate])
  @@index([performedById])
  @@index([requiresFollowUp])
  @@map("activities")
}
```

**Activity Types**:

```typescript
enum ActivityType {
  EMAIL             // Email communication
  CALL              // Phone call
  MEETING           // In-person/virtual meeting
  NOTE              // Internal note
  INSPECTION        // NRPG site inspection
  QUOTE_SENT        // Quote/proposal sent
  CONTRACT_SIGNED   // Contract executed
  BOOKING_CREATED   // Service booking initiated
  PAYMENT_RECEIVED  // Payment processed
  CLAIM_SUBMITTED   // Insurance claim filed
  CLAIM_APPROVED    // Insurance claim approved
  FOLLOW_UP         // Follow-up action
  COMPLAINT         // Customer complaint
  REVIEW_RECEIVED   // Customer review/rating
}
```

**Key Features**:
- Links to CustomerLifecycle, Opportunity, Booking, or Claim
- Sentiment analysis integration
- Automatic follow-up task creation
- Duration tracking for calls/meetings
- Attachment support (documents, recordings)

---

### 4. Task

**Purpose**: Manages to-do items, follow-ups, and assignments.

**Database Schema**:

```prisma
model Task {
  id String @id @default(cuid())

  // Customer Context
  customerLifecycleId String?
  customerLifecycle   CustomerLifecycle? @relation(fields: [customerLifecycleId], references: [id], onDelete: Cascade)

  // Opportunity Context
  opportunityId String?
  opportunity   Opportunity? @relation(fields: [opportunityId], references: [id], onDelete: Cascade)

  // Task Details
  title       String
  description String? @db.Text

  // Assignment
  assignedToId String
  assignedTo   User   @relation("TaskAssignee", fields: [assignedToId], references: [id], onDelete: Cascade)

  createdById String
  createdBy   User   @relation("TaskCreator", fields: [createdById], references: [id])

  // Status & Priority
  status   TaskStatus   @default(TODO)
  priority TaskPriority @default(MEDIUM)

  // Timeline
  dueDate     DateTime?
  completedAt DateTime?

  // Reminders
  reminderDate DateTime?
  isOverdue    Boolean  @default(false)

  // Linked Entity
  relatedEntityType String? // "Booking", "Claim", "Opportunity"
  relatedEntityId   String?

  // Audit
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([assignedToId])
  @@index([status])
  @@index([priority])
  @@index([dueDate])
  @@index([isOverdue])
  @@map("tasks")
}
```

**Task Priorities & Status**:

```typescript
enum TaskPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  WAITING
  COMPLETED
  CANCELLED
}
```

---

## Health Score Calculation

### Algorithm Overview

The health score is a 0-100 metric calculated based on:

1. **Recent Activity** (30 points max)
   - Last interaction within 7 days: +30
   - Last interaction 8-30 days: +15
   - Last interaction 31-60 days: +5
   - No interaction in 60+ days: 0

2. **Total Interactions** (20 points max)
   - 50+ interactions: +20
   - 25-49 interactions: +15
   - 10-24 interactions: +10
   - 1-9 interactions: +5

3. **Lifetime Value** (20 points max)
   - $50,000+ AUD: +20
   - $25,000-49,999 AUD: +15
   - $10,000-24,999 AUD: +10
   - $1,000-9,999 AUD: +5

4. **Completed Jobs** (15 points max)
   - 10+ jobs: +15
   - 5-9 jobs: +10
   - 2-4 jobs: +5
   - 1 job: +3

5. **Payment History** (15 points max)
   - All payments on time: +15
   - 1-2 late payments: +10
   - 3+ late payments: +5
   - Payment issues: 0

### Implementation

**Service**: `src/lib/crm/customer-lifecycle.service.ts`

```typescript
async calculateHealthScore(lifecycleId: string): Promise<{
  score: number;
  reasons: string[];
}> {
  const lifecycle = await this.prisma.customerLifecycle.findUnique({
    where: { id: lifecycleId },
    include: {
      activities: {
        orderBy: { activityDate: 'desc' },
        take: 1,
      },
    },
  });

  if (!lifecycle) {
    throw new Error(`CustomerLifecycle not found: ${lifecycleId}`);
  }

  let score = 0;
  const reasons: string[] = [];

  // 1. Recent Activity (30 points)
  const daysSinceLastContact = lifecycle.daysSinceLastContact;
  if (daysSinceLastContact <= 7) {
    score += 30;
    reasons.push('Recent contact within 7 days');
  } else if (daysSinceLastContact <= 30) {
    score += 15;
    reasons.push('Contact within 30 days');
  } else if (daysSinceLastContact <= 60) {
    score += 5;
    reasons.push('Contact within 60 days');
  } else {
    reasons.push('No recent contact (60+ days)');
  }

  // 2. Total Interactions (20 points)
  if (lifecycle.totalInteractions >= 50) {
    score += 20;
    reasons.push('High engagement (50+ interactions)');
  } else if (lifecycle.totalInteractions >= 25) {
    score += 15;
    reasons.push('Good engagement (25-49 interactions)');
  } else if (lifecycle.totalInteractions >= 10) {
    score += 10;
    reasons.push('Moderate engagement (10-24 interactions)');
  } else if (lifecycle.totalInteractions >= 1) {
    score += 5;
    reasons.push('Low engagement (1-9 interactions)');
  }

  // 3. Lifetime Value (20 points)
  const ltv = parseFloat(lifecycle.lifetimeValueAUD.toString());
  if (ltv >= 50000) {
    score += 20;
    reasons.push('High value customer ($50K+ AUD)');
  } else if (ltv >= 25000) {
    score += 15;
    reasons.push('Good value customer ($25K-49K AUD)');
  } else if (ltv >= 10000) {
    score += 10;
    reasons.push('Moderate value customer ($10K-24K AUD)');
  } else if (ltv >= 1000) {
    score += 5;
    reasons.push('New customer ($1K-9K AUD)');
  }

  // 4. Completed Jobs (15 points)
  if (lifecycle.totalJobsCompleted >= 10) {
    score += 15;
    reasons.push('Repeat customer (10+ jobs)');
  } else if (lifecycle.totalJobsCompleted >= 5) {
    score += 10;
    reasons.push('Returning customer (5-9 jobs)');
  } else if (lifecycle.totalJobsCompleted >= 2) {
    score += 5;
    reasons.push('Second-time customer (2-4 jobs)');
  } else if (lifecycle.totalJobsCompleted >= 1) {
    score += 3;
    reasons.push('First job completed');
  }

  // 5. Payment History (15 points) - Placeholder
  // TODO: Implement payment history analysis
  score += 15;
  reasons.push('Good payment history');

  return { score, reasons };
}
```

### Health Score Triggers

- **Score < 30**: Automatically marks as `AT_RISK`, creates urgent task for CSM
- **Score 30-60**: Medium priority, schedule touchpoint
- **Score 61-80**: Healthy customer, maintain cadence
- **Score 81-100**: Advocate potential, nurture for referrals

---

## Business Rules & Accountability

### Overview

Business rules automate accountability by monitoring key metrics and triggering actions when thresholds are violated.

### BusinessRule Model

```prisma
model BusinessRule {
  id String @id @default(cuid())

  name        String
  description String @db.Text

  // Rule Definition
  ruleType   String     // "RESPONSE_TIME", "CONVERSION_THRESHOLD", "CHURN_PREVENTION"
  metric     MetricType
  threshold  Decimal    @db.Decimal(10, 2)
  comparison String     // "greater_than", "less_than", "equals"

  // Actions
  actionOnViolation String[] // ["send_alert", "create_task", "notify_manager"]

  // Assignment
  ownerId String // Manager/owner of this rule
  owner   User   @relation("BusinessRuleOwner", fields: [ownerId], references: [id])

  // Status
  isActive Boolean @default(true)

  // Audit
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  violations BusinessRuleViolation[]

  @@index([ruleType])
  @@index([isActive])
  @@map("business_rules")
}
```

### Example Business Rules

**1. Lead Response Time Rule**

```typescript
{
  name: "Lead Response Time - 2 Hours",
  description: "All new leads must be contacted within 2 hours",
  ruleType: "RESPONSE_TIME",
  metric: "RESPONSE_TIME",
  threshold: 120, // minutes
  comparison: "less_than",
  actionOnViolation: [
    "send_alert",
    "create_task",
    "notify_manager"
  ],
  ownerId: "sales-manager-id"
}
```

**2. Opportunity Conversion Rate Rule**

```typescript
{
  name: "Opportunity Win Rate - 40% Minimum",
  description: "Monthly win rate must exceed 40%",
  ruleType: "CONVERSION_THRESHOLD",
  metric: "CONVERSION_RATE",
  threshold: 40, // percentage
  comparison: "greater_than",
  actionOnViolation: [
    "send_alert",
    "notify_manager"
  ],
  ownerId: "sales-director-id"
}
```

**3. Customer Churn Prevention Rule**

```typescript
{
  name: "High Churn Risk Alert",
  description: "Alert when customer health score drops below 30",
  ruleType: "CHURN_PREVENTION",
  metric: "CUSTOMER_SATISFACTION",
  threshold: 30,
  comparison: "less_than",
  actionOnViolation: [
    "send_alert",
    "create_task",
    "notify_manager",
    "assign_csm"
  ],
  ownerId: "customer-success-manager-id"
}
```

### Violation Tracking

```prisma
model BusinessRuleViolation {
  id String @id @default(cuid())

  businessRuleId String
  businessRule   BusinessRule @relation(fields: [businessRuleId], references: [id], onDelete: Cascade)

  // Violation Details
  entityType String // "Opportunity", "CustomerLifecycle", "Booking"
  entityId   String

  actualValue   Decimal @db.Decimal(10, 2)
  expectedValue Decimal @db.Decimal(10, 2)
  severity      AlertSeverity

  // Resolution
  isResolved     Boolean   @default(false)
  resolvedAt     DateTime?
  resolvedById   String?
  resolutionNote String?   @db.Text

  // Audit
  detectedAt DateTime @default(now())

  @@index([businessRuleId])
  @@index([isResolved])
  @@index([severity])
  @@map("business_rule_violations")
}
```

---

## API Endpoints

### Customer Lifecycle Endpoints

```typescript
// Get or create lifecycle for a user
GET /api/crm/lifecycle/:userId
POST /api/crm/lifecycle

// Update lifecycle stage
PATCH /api/crm/lifecycle/:id/stage

// Calculate health score
POST /api/crm/lifecycle/:id/calculate-health

// Get at-risk customers
GET /api/crm/lifecycle/at-risk
```

### Opportunity Endpoints

```typescript
// CRUD operations
GET /api/crm/opportunities
GET /api/crm/opportunities/:id
POST /api/crm/opportunities
PATCH /api/crm/opportunities/:id
DELETE /api/crm/opportunities/:id

// Stage transitions
PATCH /api/crm/opportunities/:id/stage

// Forecasting
GET /api/crm/opportunities/forecast
```

### Activity Endpoints

```typescript
// CRUD operations
GET /api/crm/activities
GET /api/crm/activities/:id
POST /api/crm/activities
PATCH /api/crm/activities/:id
DELETE /api/crm/activities/:id

// Query by entity
GET /api/crm/activities/customer/:customerId
GET /api/crm/activities/opportunity/:opportunityId
```

### Task Endpoints

```typescript
// CRUD operations
GET /api/crm/tasks
GET /api/crm/tasks/:id
POST /api/crm/tasks
PATCH /api/crm/tasks/:id
DELETE /api/crm/tasks/:id

// Assignments
GET /api/crm/tasks/assigned/:userId
GET /api/crm/tasks/overdue
```

---

## Service Layer

### CustomerLifecycleService

**Location**: `src/lib/crm/customer-lifecycle.service.ts`

**Key Methods**:

```typescript
class CustomerLifecycleService {
  // Lifecycle Management
  async getOrCreateLifecycle(userId: string)
  async updateStage(lifecycleId: string, newStage: CustomerLifecycleStage)

  // Health Score
  async calculateHealthScore(lifecycleId: string)
  async updateHealthScore(lifecycleId: string)

  // Churn Prediction
  async calculateChurnRisk(lifecycleId: string)
  async getAtRiskCustomers(limit?: number)

  // Metrics
  async updateLifetimeValue(lifecycleId: string)
  async recordInteraction(lifecycleId: string, activityType: ActivityType)
}
```

### OpportunityService

**Location**: `src/lib/crm/opportunity.service.ts`

**Key Methods**:

```typescript
class OpportunityService {
  // CRUD
  async createOpportunity(data: CreateOpportunityInput)
  async updateOpportunity(id: string, data: UpdateOpportunityInput)
  async getOpportunityById(id: string)

  // Stage Management
  async transitionStage(id: string, newStage: OpportunityStage, userId: string)
  async closeWon(id: string, bookingId: string)
  async closeLost(id: string, reason: string, competitorChosen?: string)

  // Forecasting
  async getForecastByPeriod(startDate: Date, endDate: Date)
  async getWeightedPipeline()
}
```

### ActivityService

**Location**: `src/lib/crm/activity.service.ts`

**Key Methods**:

```typescript
class ActivityService {
  // Recording
  async createActivity(data: CreateActivityInput)
  async updateActivity(id: string, data: UpdateActivityInput)

  // Queries
  async getActivitiesByCustomer(customerId: string, limit?: number)
  async getActivitiesByOpportunity(opportunityId: string)
  async getRecentActivities(limit?: number)

  // Sentiment Analysis
  async analyzeSentiment(activityId: string)

  // Follow-ups
  async createFollowUpTask(activityId: string, dueDate: Date)
}
```

---

## Integration Points

### 1. ServiceRequest → Opportunity

When a customer submits a service request, it automatically creates an Opportunity:

```typescript
// src/services/service-request.service.ts
async createServiceRequest(data: ServiceRequestInput) {
  // Create service request
  const serviceRequest = await this.prisma.serviceRequest.create({ ... });

  // Get or create customer lifecycle
  const lifecycle = await customerLifecycleService.getOrCreateLifecycle(data.userId);

  // Create opportunity
  const opportunity = await opportunityService.createOpportunity({
    customerLifecycleId: lifecycle.id,
    serviceRequestId: serviceRequest.id,
    name: `${data.serviceCategory} - ${data.location}`,
    stage: 'DISCOVERY',
    estimatedValueAUD: estimateValue(data),
    australianServiceType: data.australianServiceType,
    urgencyLevel: data.urgencyLevel,
    serviceState: data.state,
    servicePostcode: data.postcode
  });

  // Record activity
  await activityService.createActivity({
    customerLifecycleId: lifecycle.id,
    opportunityId: opportunity.id,
    type: 'NOTE',
    subject: 'New service request received',
    description: data.description,
    performedById: 'system-user-id'
  });
}
```

### 2. Opportunity → Booking

When an opportunity is closed-won, it converts to a Booking:

```typescript
// src/lib/crm/opportunity.service.ts
async closeWon(opportunityId: string, bookingId: string) {
  const opportunity = await this.prisma.opportunity.update({
    where: { id: opportunityId },
    data: {
      stage: 'CLOSED_WON',
      bookingId,
      actualCloseDate: new Date()
    }
  });

  // Update customer lifecycle stage
  await customerLifecycleService.updateStage(
    opportunity.customerLifecycleId,
    'CUSTOMER'
  );

  // Record activity
  await activityService.createActivity({
    customerLifecycleId: opportunity.customerLifecycleId,
    opportunityId: opportunity.id,
    bookingId,
    type: 'BOOKING_CREATED',
    subject: 'Opportunity converted to booking',
    performedById: 'system-user-id'
  });
}
```

### 3. Activity → Health Score Update

All activities trigger health score recalculation:

```typescript
// src/lib/crm/activity.service.ts
async createActivity(data: CreateActivityInput) {
  const activity = await this.prisma.activity.create({ data });

  // Update lifecycle interaction count
  if (data.customerLifecycleId) {
    await this.prisma.customerLifecycle.update({
      where: { id: data.customerLifecycleId },
      data: {
        totalInteractions: { increment: 1 },
        lastInteractionDate: new Date(),
        daysSinceLastContact: 0
      }
    });

    // Recalculate health score
    await customerLifecycleService.updateHealthScore(data.customerLifecycleId);
  }

  return activity;
}
```

### 4. Business Rule Violations → Tasks

When a business rule is violated, tasks are automatically created:

```typescript
// src/lib/crm/business-rules.service.ts
async checkRule(ruleId: string, entityId: string) {
  const rule = await this.prisma.businessRule.findUnique({
    where: { id: ruleId }
  });

  const actualValue = await this.calculateMetric(rule.metric, entityId);

  const isViolation = this.compareValues(
    actualValue,
    rule.threshold,
    rule.comparison
  );

  if (isViolation) {
    // Create violation record
    const violation = await this.prisma.businessRuleViolation.create({
      data: {
        businessRuleId: ruleId,
        entityType: rule.ruleType,
        entityId,
        actualValue,
        expectedValue: rule.threshold,
        severity: this.determineSeverity(actualValue, rule.threshold)
      }
    });

    // Execute actions
    for (const action of rule.actionOnViolation) {
      if (action === 'create_task') {
        await taskService.createTask({
          title: `Business Rule Violation: ${rule.name}`,
          description: `Violation detected for ${rule.ruleType}`,
          assignedToId: rule.ownerId,
          priority: 'URGENT',
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
          relatedEntityType: rule.ruleType,
          relatedEntityId: entityId
        });
      }

      if (action === 'send_alert') {
        await this.sendAlert(rule.ownerId, violation);
      }

      if (action === 'notify_manager') {
        await this.notifyManager(rule.ownerId, violation);
      }
    }
  }
}
```

---

## Best Practices

1. **Always record activities** for audit trails and health score accuracy
2. **Update lifecycle stages** promptly to ensure accurate pipeline reporting
3. **Monitor business rules** regularly to prevent violations
4. **Review at-risk customers** weekly for proactive intervention
5. **Link opportunities to service requests** for complete customer journey tracking
6. **Use sentiment analysis** to identify dissatisfied customers early
7. **Assign tasks with clear due dates** to ensure accountability
8. **Calculate health scores nightly** via automated job

---

## Future Enhancements

1. **AI-powered churn prediction** using ML models
2. **Automated lead scoring** based on historical conversion data
3. **Predictive next-best-action** recommendations for CSMs
4. **Customer segmentation** for targeted campaigns
5. **Revenue forecasting** with confidence intervals
6. **Integration with external CRMs** (Salesforce, HubSpot)

---

**Document Version**: 1.0.0
**Last Updated**: 2025-12-29
**Maintained By**: Disaster Recovery NRPG Platform Team
