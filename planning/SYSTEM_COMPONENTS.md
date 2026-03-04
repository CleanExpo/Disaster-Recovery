# Disaster Recovery Platform - System Components Documentation

## Business Model Overview
- **Platform Type**: Lead Generation Only
- **Platform Fee**: $2,750 per claim
- **Service Delivery**: 100% by contractors (NOT the platform)
- **Critical KPI**: 60-minute contractor contact guarantee

---

## 1. LANDING PAGE (`app/page.tsx`)
**Purpose**: Entry point for customers seeking disaster recovery services

### Key Features:
- Hero section with digital platform messaging
- Emergency services showcase (Water, Fire, Mould, Storm)
- 60-minute response time guarantee prominently displayed
- Coverage statistics (115,000+ contractors, 24/7 availability)
- Property type coverage (Residential, Commercial, Industrial)
- "Submit Online Claim" and "View Workflow Demo" CTAs

### Important Elements:
- NO direct phone numbers (100% digital platform)
- Clear messaging about platform role
- Insurance partner badges
- 60min response time prominently featured

---

## 2. ONLINE CLAIM FORM (`app/claim/page.tsx`)
**Purpose**: Capture customer details and process $2,750 platform fee

### Form Sections:
1. **Property & Damage Information**
   - Contact details
   - Property address and type
   - Damage description and urgency
   - Safety hazards

2. **Insurance & Documentation**
   - Insurance company details
   - Claim numbers
   - Photo availability

3. **Authorizations & Terms**
   - Property access authorization
   - Insurance liaison consent
   - Platform role acknowledgment
   - Contractor communication agreement

4. **Payment Processing**
   - $2,750 platform fee
   - Secure card payment
   - Clear breakdown of what fee covers

### Critical Requirements:
- Must accept all terms before payment
- Payment required before claim processing
- Clear disclaimer about platform role
- 60-MINUTE contact guarantee emphasized

---

## 3. CLAIMS API (`app/api/claims/submit/route.ts`)
**Purpose**: Process paid claims and initiate contractor matching

### Workflow:
1. Validates $2,750 payment
2. Creates claim record with unique ID
3. Stores all customer information
4. Triggers contractor matching (async)
5. Returns confirmation with tracking URL

### Key Features:
- Payment validation (402 response if unpaid)
- Contractor responsibilities clearly defined
- 60-minute contact KPI tracked
- Mock contractor assignment for demo

### Contractor Responsibilities (Automated in Response):
- Initial phone contact within 60 MINUTES
- Schedule site inspection
- Perform make-safe works
- Document all damage
- Liaise with insurance company
- Coordinate re-attendances
- Manage additional work
- Provide claim documentation

---

## 4. WORKFLOW DEMONSTRATION (`app/demo/workflow/page.tsx`)
**Purpose**: Visual demonstration of complete claim-to-contractor process

### Workflow Steps:
1. Client submits online claim + pays $2,750
2. Payment processed successfully
3. CRM receives paid claim
4. System matches to NRP contractor
5. Contractor notified of lead
6. Contractor accepts lead
7. **Contractor calls client within 60 MINUTES**
8. Contractor handles all work independently

### Demo Features:
- Real-time progress visualization
- Live status updates
- KPI tracking display
- Mock data pre-populated
- Visual step completion

---

## 5. EXISTING COMPONENTS

### Lead Capture Form (`src/components/forms/LeadCaptureForm.tsx`)
- Original lead capture with scoring
- Calculates lead value
- Insurance-focused questions
- **Note**: Being replaced by paid claim form

### Contractor Dashboard (`src/components/contractor/dashboard/ContractorDashboard.tsx`)
- Contractor portal interface
- Job management
- KPI metrics
- Compliance tracking
- Territory management

### Mock Clean Claims (`src/lib/services/mock/mockCleanClaims.ts`)
- Simulates CARSI integration
- Mock claim submission
- Contractor validation
- Status tracking

---

## 6. KEY BUSINESS RULES

### Platform Rules:
1. **NO customer service** - Platform provides zero direct support
2. **NO service delivery** - All work done by contractors
3. **Payment required** - $2,750 must be paid upfront
4. **60-minute KPI** - Contractor must call within 60 minutes

### Contractor Rules:
1. Must follow NRP standards and guidelines
2. Handle ALL client communication
3. Perform all restoration work
4. Manage insurance liaison
5. Meet 60-minute contact KPI

### Financial Model:
- **Revenue**: $2,750 per claim
- **Service**: Lead generation and matching only
- **Contractors**: Independent service providers
- **Platform overhead**: Minimal (self-running system)

---

## 7. SYSTEM FLOW

```
Customer → Online Claim Form → Payment ($2,750) → API Processing
                                                         ↓
                                               CRM Integration
                                                         ↓
                                            Contractor Matching
                                                         ↓
                                          Contractor Notification
                                                         ↓
                                    Contractor Accepts (Portal)
                                                         ↓
                              **60-MINUTE CONTACT GUARANTEE**
                                                         ↓
                           Contractor ← Direct Communication → Customer
                                                         ↓
                                    [Platform Role Ends Here]
                                                         ↓
                        Contractor Handles Everything:
                        - Inspection
                        - Make-safe works
                        - Documentation
                        - Insurance liaison
                        - Re-attendances
                        - Additional work
                        - Claim completion
```

---

## 8. CRITICAL KPIs

### Primary KPI:
- **60-Minute Contact**: Contractor MUST call customer within 60 minutes

### Secondary KPIs:
- Lead-to-contractor assignment time
- Contractor acceptance rate
- Payment processing success rate
- Platform uptime
- CRM sync reliability

---

## 9. TECHNOLOGY STACK

### Frontend:
- Next.js 14.2.32 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend:
- Next.js API Routes
- Mock services for demo
- Webhook integrations (planned)

### Payment:
- Stripe integration (planned)
- $2,750 fixed fee processing

### Deployment:
- Vercel hosting
- GitHub repository
- Automatic deployments

---

## 10. IMPORTANT NOTES

### What the Platform IS:
- Lead generation service
- Contractor matching system
- Payment processor
- Compliance tracker

### What the Platform IS NOT:
- Customer service provider
- Restoration service company
- Insurance company
- Call center

### Revenue Model:
- Single revenue stream: $2,750 platform fee
- No commission on work
- No ongoing fees
- No contractor subscription fees

---

## SUMMARY

The Disaster Recovery platform is a **pure lead generation system** that:
1. Collects customer claims
2. Processes $2,750 payment
3. Matches to certified contractors
4. Ensures 60-minute contact
5. Steps away completely

All actual work, communication, and service delivery is handled by independent contractors following NRP standards.