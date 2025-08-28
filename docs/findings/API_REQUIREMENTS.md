# API Requirements Specification
# Disaster Recovery Australia Platform

**Version:** 1.0  
**Last Updated:** 28 August 2025  
**API Version:** v1  
**Base URL:** `https://api.disasterrecoveryaustralia.com.au/v1`  

---

## 📋 Executive Summary

This document outlines the complete API specification for the Disaster Recovery Australia platform. The API provides endpoints for lead management, contractor operations, authentication, and business intelligence. All endpoints follow RESTful principles and include comprehensive authentication, validation, and error handling.

**Current Status:** 40% implemented  
**Missing Critical APIs:** 18 endpoints  
**Priority:** High (Production Blocker)  

---

## 🔐 Authentication & Authorization

### Authentication Methods
```typescript
// JWT Token Authentication (Primary)
Authorization: Bearer <jwt_token>

// API Key Authentication (Partner Integrations)  
X-API-Key: <api_key>

// Session Authentication (Web Dashboard)
Cookie: session=<session_id>
```

### User Roles & Permissions
```typescript
enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",     // Full system access
  ADMIN = "ADMIN",                 // Organization admin
  CONTRACTOR = "CONTRACTOR",       // Service provider
  CLIENT = "CLIENT",              // End customer
  PARTNER = "PARTNER",            // Integration partner
  READONLY = "READONLY"           // View-only access
}
```

### Authentication Endpoints

#### POST /api/auth/signup
**Description:** Register new user account  
**Status:** ✅ Implemented  
**Access:** Public  

```typescript
// Request
interface SignupRequest {
  name: string;
  email: string;
  password: string;
  agencyName?: string;
  role?: UserRole;
}

// Response  
interface SignupResponse {
  success: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
  message: string;
}
```

#### POST /api/auth/signin
**Description:** Authenticate user and return JWT  
**Status:** ❌ Missing  
**Access:** Public  

```typescript
// Request
interface SigninRequest {
  email: string;
  password: string;
  remember?: boolean;
}

// Response
interface SigninResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  user: UserProfile;
  expiresIn: number; // seconds
}
```

#### POST /api/auth/refresh
**Description:** Refresh expired JWT token  
**Status:** ❌ Missing  
**Access:** Authenticated  

#### POST /api/auth/reset-password
**Description:** Password reset request  
**Status:** ❌ Missing  
**Access:** Public  

#### POST /api/auth/verify-email
**Description:** Email verification  
**Status:** ❌ Missing  
**Access:** Public  

---

## 🎯 Lead Management APIs

### Lead Capture

#### POST /api/leads/capture
**Description:** Capture new service request  
**Status:** ✅ Implemented  
**Access:** Public (with rate limiting)  

```typescript
interface LeadCaptureRequest {
  // Contact Information
  fullName: string;
  phone: string;
  email: string;
  
  // Property Information
  propertyType: 'residential' | 'commercial' | 'industrial';
  propertyAddress: string;
  suburb: string;
  state: AustralianState;
  postcode: string;
  propertyValue?: number;
  
  // Damage Information
  damageType: DamageType[];
  damageDate: string; // ISO date
  damageDescription: string;
  estimatedAreaAffected: AreaSize;
  
  // Insurance Information
  hasInsurance: boolean;
  insuranceCompany?: string;
  claimNumber?: string;
  excessAmount?: number;
  
  // Value Indicators
  urgencyLevel: 'emergency' | 'urgent' | 'soon' | 'planning';
  isBusinessProperty: boolean;
  requiresAccommodation: boolean;
  hasPhotos: boolean;
  readyToStart: 'immediately' | 'within_week' | 'within_month' | 'planning';
  budget?: string;
  decisionMaker: boolean;
  
  // Tracking
  source: string;
  userAgent?: string;
}

interface LeadCaptureResponse {
  success: boolean;
  leadId: string;
  message: string;
  estimatedResponse?: string; // "Within 30 minutes"
}
```

#### GET /api/leads
**Description:** Retrieve leads with filtering  
**Status:** ❌ Missing  
**Access:** Admin, Contractor  

```typescript
interface LeadsQuery {
  status?: LeadStatus;
  assignedTo?: string;
  dateFrom?: string;
  dateTo?: string;
  state?: AustralianState;
  damageType?: DamageType;
  minValue?: number;
  maxValue?: number;
  page?: number;
  limit?: number;
}

interface LeadsResponse {
  leads: Lead[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
```

#### GET /api/leads/:id
**Description:** Get single lead details  
**Status:** ❌ Missing  
**Access:** Admin, Assigned Contractor  

#### PUT /api/leads/:id
**Description:** Update lead information  
**Status:** ❌ Missing  
**Access:** Admin, Assigned Contractor  

#### POST /api/leads/:id/assign
**Description:** Manually assign lead to contractor  
**Status:** ❌ Missing  
**Access:** Admin  

#### POST /api/leads/:id/status
**Description:** Update lead status  
**Status:** ❌ Missing  
**Access:** Admin, Assigned Contractor  

---

## 👷 Contractor Management APIs

### Contractor Registration & Profile

#### POST /api/contractors/register
**Description:** Register new contractor  
**Status:** ⚠️ Partial implementation  
**Access:** Public (with approval process)  

```typescript
interface ContractorRegistrationRequest {
  // Business Information
  businessName: string;
  abn: string;
  businessType: 'sole_trader' | 'company' | 'partnership';
  yearsInBusiness: number;
  
  // Contact Information
  contactName: string;
  email: string;
  phone: string;
  mobile?: string;
  website?: string;
  
  // Address Information
  businessAddress: Address;
  mailingAddress?: Address;
  serviceAreas: ServiceArea[];
  
  // Services & Certifications
  services: ServiceType[];
  certifications: Certification[];
  insurancePolicyNumber: string;
  insuranceExpiry: string;
  
  // Capacity & Availability
  teamSize: number;
  maxJobsPerMonth: number;
  emergencyAvailable: boolean;
  operatingHours: OperatingHours;
  
  // Financial Information
  pricing: ServicePricing[];
  paymentTerms: string;
  
  // Documentation
  documents: Document[]; // Certificates, insurance, etc.
}
```

#### GET /api/contractors
**Description:** List contractors with filtering  
**Status:** ❌ Missing  
**Access:** Admin  

#### GET /api/contractors/:id
**Description:** Get contractor profile  
**Status:** ❌ Missing  
**Access:** Admin, Self  

#### PUT /api/contractors/:id
**Description:** Update contractor profile  
**Status:** ❌ Missing  
**Access:** Admin, Self  

#### POST /api/contractors/:id/approve
**Description:** Approve contractor registration  
**Status:** ❌ Missing  
**Access:** Admin  

#### POST /api/contractors/:id/suspend
**Description:** Suspend contractor  
**Status:** ❌ Missing  
**Access:** Admin  

---

## 📊 Business Intelligence & Analytics

### Dashboard APIs

#### GET /api/dashboard/overview
**Description:** Dashboard overview statistics  
**Status:** ❌ Missing  
**Access:** Admin, Contractor  

```typescript
interface DashboardOverview {
  // Lead Metrics
  totalLeads: number;
  newLeads: number;
  assignedLeads: number;
  completedLeads: number;
  conversionRate: number;
  
  // Financial Metrics
  totalRevenue: number;
  averageJobValue: number;
  outstandingPayments: number;
  
  // Performance Metrics
  averageResponseTime: number; // minutes
  customerSatisfaction: number; // 1-5
  completionRate: number; // percentage
  
  // Recent Activity
  recentLeads: Lead[];
  upcomingJobs: Job[];
  alerts: Alert[];
}
```

#### GET /api/analytics/leads
**Description:** Lead analytics and trends  
**Status:** ❌ Missing  
**Access:** Admin  

#### GET /api/analytics/revenue
**Description:** Revenue analytics  
**Status:** ❌ Missing  
**Access:** Admin  

#### GET /api/analytics/performance
**Description:** Performance metrics  
**Status:** ❌ Missing  
**Access:** Admin, Contractor  

---

## 🔔 Notification & Communication APIs

### Notification Management

#### GET /api/notifications
**Description:** Get user notifications  
**Status:** ❌ Missing  
**Access:** Authenticated  

#### POST /api/notifications/mark-read
**Description:** Mark notifications as read  
**Status:** ❌ Missing  
**Access:** Authenticated  

#### POST /api/notifications/preferences
**Description:** Update notification preferences  
**Status:** ❌ Missing  
**Access:** Authenticated  

### Communication

#### POST /api/communication/sms
**Description:** Send SMS notification  
**Status:** ❌ Missing  
**Access:** Admin, System  

#### POST /api/communication/email
**Description:** Send email notification  
**Status:** ❌ Missing  
**Access:** Admin, System  

---

## 💰 Billing & Payments APIs

### Partner Billing

#### GET /api/billing/invoices
**Description:** Get billing invoices  
**Status:** ❌ Missing  
**Access:** Partner, Admin  

#### POST /api/billing/invoices/:id/pay
**Description:** Process invoice payment  
**Status:** ❌ Missing  
**Access:** Partner  

#### GET /api/billing/statements
**Description:** Get billing statements  
**Status:** ❌ Missing  
**Access:** Partner, Admin  

---

## 🔍 Search & Filter APIs

#### GET /api/search/contractors
**Description:** Search contractors by criteria  
**Status:** ❌ Missing  
**Access:** Admin  

#### GET /api/search/leads
**Description:** Search leads  
**Status:** ❌ Missing  
**Access:** Admin, Contractor  

---

## 📝 Content Management APIs

#### GET /api/content/faqs
**Description:** Get FAQ content  
**Status:** ❌ Missing  
**Access:** Public  

#### POST /api/content/faqs
**Description:** Create FAQ  
**Status:** ❌ Missing  
**Access:** Admin  

#### GET /api/content/testimonials
**Description:** Get testimonials  
**Status:** ❌ Missing  
**Access:** Public  

---

## 🏥 Emergency & Incident APIs

#### POST /api/emergency/alert
**Description:** Create emergency alert  
**Status:** ❌ Missing  
**Access:** Admin  

#### GET /api/emergency/incidents
**Description:** Get active incidents  
**Status:** ❌ Missing  
**Access:** Public  

---

## 📋 Data Models & Types

### Core Types
```typescript
enum AustralianState {
  NSW = "NSW",
  VIC = "VIC", 
  QLD = "QLD",
  SA = "SA",
  WA = "WA",
  TAS = "TAS",
  NT = "NT",
  ACT = "ACT"
}

enum DamageType {
  WATER_DAMAGE = "Water Damage",
  FIRE_SMOKE = "Fire/Smoke Damage", 
  MOULD_REMEDIATION = "Mould Remediation",
  STORM_DAMAGE = "Storm/Wind Damage",
  SEWAGE_BACKUP = "Sewage Backup",
  BIOHAZARD = "Biohazard/Trauma",
  STRUCTURAL = "Structural Damage",
  VANDALISM = "Vandalism/Break-in"
}

enum LeadStatus {
  NEW = "NEW",
  ASSIGNED = "ASSIGNED", 
  CONTACTED = "CONTACTED",
  QUOTED = "QUOTED",
  ACCEPTED = "ACCEPTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

interface Lead {
  id: string;
  // Contact details
  fullName: string;
  phone: string;
  email: string;
  
  // Property details
  propertyAddress: string;
  suburb: string;
  state: AustralianState;
  postcode: string;
  propertyType: string;
  
  // Damage details
  damageType: DamageType[];
  damageDescription: string;
  damageDate: Date;
  
  // Lead quality
  leadScore: number;
  leadValue: number;
  status: LeadStatus;
  
  // Assignment
  partnerId?: string;
  assignedAt?: Date;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🔒 API Security Requirements

### Authentication Security
- ✅ JWT token authentication with RS256 signing
- ❌ Token refresh mechanism (missing)
- ❌ Token blacklisting for logout (missing)
- ❌ Multi-factor authentication support (missing)

### Authorization
- ❌ Role-based access control (RBAC) implementation
- ❌ Resource-level permissions
- ❌ API key management for partners

### Input Validation & Sanitization
- ⚠️ Basic Zod validation (partial)
- ❌ XSS protection with DOMPurify
- ❌ SQL injection prevention (Prisma provides some protection)
- ❌ File upload validation

### Rate Limiting
- ❌ Endpoint-specific rate limiting
- ❌ User-based rate limiting  
- ❌ IP-based rate limiting
- ❌ API key rate limiting

### Security Headers
- ❌ CORS configuration
- ❌ Security headers middleware
- ❌ Request/response logging
- ❌ API versioning strategy

---

## 📊 API Performance Requirements

### Response Time Targets
```
Endpoint Performance SLA:
┌─────────────────────────┬─────────────┬─────────────┬─────────────┐
│ Endpoint Type           │ 50th %ile   │ 95th %ile   │ 99th %ile   │
├─────────────────────────┼─────────────┼─────────────┼─────────────┤
│ Authentication          │ <100ms      │ <200ms      │ <500ms      │
│ Lead Capture            │ <200ms      │ <500ms      │ <1000ms     │
│ Data Retrieval (List)   │ <150ms      │ <300ms      │ <750ms      │  
│ Data Retrieval (Single) │ <50ms       │ <100ms      │ <250ms      │
│ Data Updates            │ <100ms      │ <250ms      │ <500ms      │
│ Analytics/Reports       │ <500ms      │ <2000ms     │ <5000ms     │
│ File Uploads            │ <2000ms     │ <5000ms     │ <10000ms    │
└─────────────────────────┴─────────────┴─────────────┴─────────────┘
```

### Throughput Requirements
- **Lead Capture:** 1000 requests/minute
- **Authentication:** 2000 requests/minute  
- **Data APIs:** 5000 requests/minute
- **Analytics:** 100 requests/minute

### Availability Requirements
- **Uptime:** 99.9% (8.77 hours downtime/year)
- **Error Rate:** <0.1% for all endpoints
- **Recovery Time:** <5 minutes for critical endpoints

---

## 📋 Implementation Priority Matrix

### P0 - Critical (Week 1-2)
```
Critical Missing APIs:
┌─────────────────────────┬─────────────┬─────────────┬─────────────┐
│ Endpoint                │ Priority    │ Effort      │ Dependency  │
├─────────────────────────┼─────────────┼─────────────┼─────────────┤
│ POST /auth/signin       │ P0          │ 6 hours     │ None        │
│ POST /auth/refresh      │ P0          │ 4 hours     │ signin      │
│ GET /leads              │ P0          │ 8 hours     │ auth        │
│ GET /leads/:id          │ P0          │ 4 hours     │ auth        │
│ PUT /leads/:id          │ P0          │ 6 hours     │ auth        │
│ GET /contractors        │ P0          │ 6 hours     │ auth        │
└─────────────────────────┴─────────────┴─────────────┴─────────────┘
```

### P1 - High Priority (Week 3-4)  
```
High Priority APIs:
┌─────────────────────────┬─────────────┬─────────────┬─────────────┐
│ Endpoint                │ Priority    │ Effort      │ Dependency  │
├─────────────────────────┼─────────────┼─────────────┼─────────────┤
│ GET /dashboard/overview │ P1          │ 12 hours    │ analytics   │
│ POST /leads/:id/assign  │ P1          │ 6 hours     │ leads       │
│ POST /contractors/approve│ P1          │ 4 hours     │ contractors │
│ GET /notifications      │ P1          │ 8 hours     │ auth        │
│ POST /communication/sms │ P1          │ 10 hours    │ Twilio      │
└─────────────────────────┴─────────────┴─────────────┴─────────────┘
```

### P2 - Medium Priority (Week 5-6)
- Analytics endpoints
- Billing APIs  
- Content management
- Advanced search

### P3 - Low Priority (Week 7-8)
- Emergency alerts
- Advanced notifications
- Reporting APIs
- Audit logging

---

## 🧪 Testing Requirements

### API Testing Strategy
```typescript
// Unit Tests (90% coverage target)
- Input validation testing
- Business logic testing  
- Error handling testing
- Authentication testing

// Integration Tests (80% coverage target)
- Database integration
- Third-party service integration
- End-to-end API workflows
- Performance testing

// Security Tests (100% coverage target)  
- Authentication bypass attempts
- Authorization testing
- Input injection testing
- Rate limiting testing
```

### Test Data Requirements
- **Lead Test Data:** 1000+ realistic test leads
- **Contractor Test Data:** 100+ contractor profiles
- **User Test Data:** Various roles and permissions
- **Performance Test Data:** High-volume datasets

---

## 📚 Documentation Requirements

### API Documentation
- ✅ OpenAPI 3.0 specification (this document serves as foundation)
- ❌ Interactive API documentation (Swagger UI)
- ❌ SDK/client library documentation  
- ❌ Integration guides for partners

### Developer Resources
- ❌ Getting started guide
- ❌ Authentication guide
- ❌ Rate limiting documentation
- ❌ Error code reference
- ❌ Webhook documentation
- ❌ Postman collection

---

## 🚀 Deployment & Environment Configuration

### Environment-Specific Configuration
```typescript
// Development Environment
{
  baseUrl: "http://localhost:3000/api/v1",
  database: "postgresql://localhost:5432/disaster_recovery_dev",
  rateLimiting: false,
  cors: "*",
  logLevel: "debug"
}

// Staging Environment  
{
  baseUrl: "https://staging-api.disasterrecoveryaustralia.com.au/v1",
  database: "postgresql://staging-db:5432/disaster_recovery_staging", 
  rateLimiting: true,
  cors: ["https://staging.disasterrecoveryaustralia.com.au"],
  logLevel: "info"
}

// Production Environment
{
  baseUrl: "https://api.disasterrecoveryaustralia.com.au/v1",
  database: "postgresql://prod-db:5432/disaster_recovery_prod",
  rateLimiting: true,
  cors: ["https://disasterrecoveryaustralia.com.au"],
  logLevel: "warn"
}
```

### Monitoring & Observability
- ❌ API response time monitoring
- ❌ Error rate tracking
- ❌ Request volume monitoring
- ❌ Security event logging
- ❌ Performance profiling

---

## 🔄 API Versioning Strategy

### Versioning Approach
- **URL Versioning:** `/api/v1/`, `/api/v2/`
- **Backward Compatibility:** Maintain v1 for 12 months after v2 release
- **Deprecation Notice:** 6 months advance notice
- **Breaking Changes:** Major version increment only

### Version Lifecycle
```
Version Lifecycle:
v1.0 (Current) -> v1.1 (Enhancements) -> v2.0 (Breaking Changes)
     ↓                ↓                      ↓
Maintenance Mode  ->  LTS Support    ->   End of Life
(6 months)            (12 months)         (24 months)
```

---

## 📈 Success Metrics & KPIs

### API Performance KPIs
- **Response Time:** <200ms average (target: <150ms)
- **Availability:** 99.9% uptime (target: 99.95%)  
- **Error Rate:** <0.1% (target: <0.05%)
- **Throughput:** Support 10,000 RPM peak load

### Business KPIs
- **Lead Conversion:** API-captured leads convert at 25%+ rate
- **Contractor Engagement:** 80%+ of contractors use API features weekly
- **Partner Integration:** 5+ partners integrate within 6 months
- **Developer Experience:** <30 minutes to first API call

---

## 🎯 Next Steps & Action Items

### Immediate Actions (This Week)
1. ✅ **Implement critical authentication endpoints** (signin, refresh)
2. ✅ **Set up API testing framework** (Jest + Supertest)
3. ✅ **Create basic error handling middleware**
4. ✅ **Implement input validation with Zod**

### Short-term Actions (Next 2 Weeks)
1. ✅ **Build core lead management APIs**
2. ✅ **Implement contractor management endpoints**  
3. ✅ **Add rate limiting middleware**
4. ✅ **Set up API monitoring**

### Long-term Actions (Next Month)
1. ✅ **Complete analytics and dashboard APIs**
2. ✅ **Build notification system**
3. ✅ **Implement billing APIs**
4. ✅ **Create comprehensive API documentation**

---

**Document Ownership:** Backend Development Team  
**Review Schedule:** Weekly during implementation phase  
**Approval Required:** Technical Lead, Product Owner, Security Team  

*This document will be updated as APIs are implemented and requirements evolve.*