# NRP Membership Portal Specifications
## Adapting CORE's Model for Australian Market Domination

---

## 1. MEMBERSHIP PORTAL OVERVIEW

### Portal URL Structure
- Public: `portal.nrp.com.au`
- Members: `members.nrp.com.au`
- Partners: `partners.nrp.com.au`
- Training: `university.nrp.com.au`

### Core Portal Components
1. **Public-Facing Membership Sales**
2. **Member Dashboard & Tools**
3. **Lead Management System**
4. **Training University**
5. **Vendor Perks Marketplace**
6. **Performance Analytics**
7. **Community Forum**
8. **API Developer Portal**

---

## 2. MEMBERSHIP TIERS & PRICING

### 🔷 FOUNDATION MEMBER - $299/month
```json
{
  "tier": "Foundation",
  "price": 299,
  "included_leads": 10,
  "additional_lead_cost": 50,
  "service_areas": 5,
  "features": [
    "Basic AI bot access",
    "Standard lead distribution",
    "10% vendor discounts",
    "Basic training modules",
    "Email support",
    "Monthly reporting"
  ],
  "ideal_for": "Solo operators, new businesses"
}
```

### 🔶 PROFESSIONAL MEMBER - $599/month
```json
{
  "tier": "Professional",
  "price": 599,
  "included_leads": 30,
  "additional_lead_cost": 35,
  "service_areas": 15,
  "features": [
    "Priority AI bot routing",
    "Advanced lead filtering",
    "20% vendor discounts",
    "Full training library",
    "Phone support",
    "Weekly reporting",
    "Marketing templates",
    "Review management"
  ],
  "ideal_for": "Growing businesses, 2-5 employees"
}
```

### 🏆 ENTERPRISE MEMBER - $1,299/month
```json
{
  "tier": "Enterprise",
  "price": 1299,
  "included_leads": 100,
  "additional_lead_cost": 25,
  "service_areas": "Unlimited",
  "features": [
    "First priority routing",
    "Exclusive territories available",
    "30% vendor discounts",
    "Custom training programs",
    "Dedicated account manager",
    "Real-time reporting",
    "API access",
    "White-label options",
    "Co-marketing opportunities"
  ],
  "ideal_for": "Established companies, 5+ employees"
}
```

### 👑 FRANCHISE PARTNER - $2,499/month + 5% revenue
```json
{
  "tier": "Franchise",
  "price": 2499,
  "revenue_share": 0.05,
  "included_leads": "Unlimited",
  "service_areas": "State/Region Exclusive",
  "features": [
    "Exclusive territory rights",
    "Co-branded operations",
    "Full business systems",
    "Board representation",
    "Equity participation option",
    "National account access",
    "Priority vendor negotiations",
    "Custom technology development"
  ],
  "ideal_for": "Market leaders, multi-location operators"
}
```

---

## 3. MEMBER DASHBOARD FEATURES

### 3.1 Lead Management Centre
```typescript
interface LeadDashboard {
  // Real-time lead feed
  newLeads: Lead[];
  
  // Lead acceptance
  acceptLead(leadId: string): Promise<void>;
  declineLead(leadId: string, reason: string): Promise<void>;
  
  // Lead filtering
  filters: {
    jobType: string[];
    maxDistance: number;
    minValue: number;
    insuranceOnly: boolean;
    urgency: 'emergency' | 'standard' | 'scheduled';
  };
  
  // Lead history
  completedJobs: Job[];
  conversionRate: number;
  averageJobValue: number;
}
```

### 3.2 Performance Analytics
- **Revenue Tracking**: Daily, weekly, monthly, yearly
- **Lead Conversion**: Accept rate, win rate, completion rate
- **Customer Satisfaction**: NPS scores, reviews, complaints
- **Response Times**: First contact, arrival, completion
- **Comparative Analysis**: Peer benchmarking, area rankings

### 3.3 Financial Dashboard
- **Earnings Summary**: Gross revenue, NRP fees, net income
- **Invoice Management**: Create, send, track payments
- **Payment Processing**: Instant payments via Stripe/PayPal
- **Commission Tracking**: NRP fees, referral bonuses
- **Tax Reporting**: GST summary, PAYG, annual statements

### 3.4 Territory Management
```javascript
const TerritoryManager = {
  // View current coverage
  myTerritories: PostalCode[],
  
  // Request new areas
  requestTerritory: (postalCode) => {
    if (checkAvailability(postalCode)) {
      return addToAccount(postalCode);
    }
    return joinWaitlist(postalCode);
  },
  
  // Exclusive territories (Enterprise+)
  exclusiveTerritories: {
    purchase: (postalCode, duration) => {},
    renew: (territoryId) => {},
    transfer: (territoryId, newOwner) => {}
  }
};
```

---

## 4. NRP UNIVERSITY (Training Platform)

### 4.1 Course Structure
```yaml
Foundation Courses: # Free with membership
  - Australian Insurance Fundamentals
  - Water Damage Basics
  - Customer Service Excellence
  - Safety Essentials
  - Documentation Requirements

Professional Certification: # $299-499 each
  - IICRC WRT Equivalent
  - Mould Remediation Specialist
  - Fire & Smoke Restoration
  - Biohazard Cleanup
  - Advanced Structural Drying

Business Development: # $199-299 each
  - Digital Marketing for Restorers
  - Insurance Relationship Building
  - Team Management
  - Financial Planning
  - Scaling Your Business

Specialty Programs: # $599-999 each
  - High-Value Property Restoration
  - Commercial Large Loss
  - Forensic Restoration
  - Environmental Remediation
  - Catastrophe Response
```

### 4.2 Certification Tracking
- Digital badges and certificates
- Continuing education credits
- Compliance tracking
- Skill verification for insurers
- Public profile display

---

## 5. NRP PERKS (Vendor Marketplace)

### 5.1 Vendor Categories & Targets

#### Equipment & Tools
- **Kennards Hire**: 25% off daily rates
- **Coates Hire**: 20% off + priority delivery
- **Total Tools**: 15% trade discount
- **Sydney Tools**: Bulk purchase programs

#### Supplies & Materials
- **Bunnings Trade**: 10% + PowerPass benefits
- **Reece Plumbing**: Trade pricing + credit
- **Dulux Trade**: 30% off retail
- **3M Safety**: Direct wholesale pricing

#### Vehicle & Fuel
- **Toyota Fleet**: Fleet discounts + servicing
- **Budget Trucks**: 30% off daily rates
- **BP Plus**: 4c/L discount + rewards
- **NRMA Business**: Fleet management

#### Technology
- **Telstra Business**: 20% off plans
- **Microsoft 365**: 30% off licenses
- **Xero**: 50% off first 6 months
- **ServiceM8**: Discounted integration

#### Insurance & Finance
- **GIO Business**: Preferred rates
- **Prospa**: Fast business loans
- **American Express**: Lower merchant fees
- **Commonwealth Bank**: Business accounts

### 5.2 Perks Platform Features
```javascript
const PerksPortal = {
  // Browse deals
  viewDeals: () => VendorDeal[],
  
  // Activate perks
  activatePerk: (vendorId, memberId) => ActivationCode,
  
  // Track savings
  savingsTracker: {
    monthlyTotal: number,
    yearlyTotal: number,
    lifetimeTotal: number,
    topVendors: Vendor[]
  },
  
  // Bulk ordering
  groupBuy: {
    current: GroupBuyOffer[],
    propose: (product, quantity) => void,
    commit: (offerId, quantity) => Order
  },
  
  // Rebate management
  rebates: {
    pending: Rebate[],
    claimed: Rebate[],
    submitClaim: (receipt) => Claim
  }
};
```

---

## 6. LEAD DISTRIBUTION ALGORITHM

### 6.1 Priority Scoring System
```python
def calculate_member_priority(member, lead):
    score = 0
    
    # Membership tier weighting
    tier_weights = {
        'Foundation': 1.0,
        'Professional': 1.5,
        'Enterprise': 2.0,
        'Franchise': 2.5
    }
    score += tier_weights[member.tier] * 100
    
    # Performance metrics
    score += member.acceptance_rate * 50
    score += member.completion_rate * 50
    score += member.customer_satisfaction * 40
    score += member.response_time_score * 30
    
    # Distance penalty
    distance = calculate_distance(member.location, lead.location)
    score -= distance * 2
    
    # Specialisation bonus
    if lead.type in member.specialisations:
        score += 50
    
    # Availability bonus
    if member.instant_availability:
        score += 75
    
    # Exclusive territory override
    if lead.postcode in member.exclusive_territories:
        score = 9999
    
    return score
```

### 6.2 Lead Routing Rules
1. **Exclusive Territories**: Always route first
2. **Emergency Jobs**: Only to verified 24/7 providers
3. **High-Value Jobs**: Enterprise/Franchise members first
4. **Standard Jobs**: Score-based distribution
5. **Overflow**: Cascade through tiers if declined

---

## 7. MOBILE APP FEATURES

### 7.1 Contractor App (iOS/Android)
```
Core Features:
✓ Push notifications for new leads
✓ One-tap lead acceptance
✓ GPS navigation to jobs
✓ Photo documentation
✓ Digital forms/signatures
✓ Invoice generation
✓ In-app messaging
✓ Schedule management
✓ Training videos
✓ Emergency SOS
```

### 7.2 Smart Features
- **Voice Commands**: "Accept lead", "Navigate to job"
- **AR Measurement**: Room dimensions via camera
- **AI Damage Assessment**: Photo analysis for quotes
- **Offline Mode**: Sync when connected
- **Wearable Integration**: Apple Watch alerts

---

## 8. INSURANCE PARTNER INTEGRATION

### 8.1 Direct API Integrations
```yaml
Priority Partners:
  - IAG Group:
      - NRMA Insurance
      - CGU
      - SGIO/SGIC
  - Suncorp Group:
      - AAMI
      - GIO
      - Suncorp Insurance
  - Allianz Australia
  - QBE Insurance

Integration Features:
  - Real-time claim feed
  - Automatic contractor assignment
  - Direct billing
  - Photo/document upload
  - Status updates
  - Quality scorecards
```

### 8.2 Insurer Portal
- Contractor performance metrics
- Claim status tracking
- Preferred contractor lists
- Direct messaging
- Bulk job assignment
- Custom reporting

---

## 9. COMMUNITY & NETWORKING

### 9.1 Member Forum
```
Categories:
├── Technical Help
│   ├── Water Damage
│   ├── Fire Restoration
│   ├── Mould Remediation
│   └── Equipment Troubleshooting
├── Business Development
│   ├── Marketing Strategies
│   ├── Insurance Relations
│   ├── Team Building
│   └── Financial Planning
├── Regional Groups
│   ├── Queensland
│   ├── New South Wales
│   ├── Victoria
│   └── [Other States]
└── Marketplace
    ├── Equipment For Sale
    ├── Job Opportunities
    ├── Subcontractor Needs
    └── Business For Sale
```

### 9.2 Events & Networking
- **Monthly Webinars**: Technical training, business development
- **Regional Meetups**: Quarterly in-person networking
- **Annual Summit**: 3-day conference (Gold Coast)
- **Certification Days**: Group training sessions
- **Vendor Showcases**: Equipment demonstrations

---

## 10. QUALITY ASSURANCE SYSTEM

### 10.1 Automated Monitoring
```javascript
const QualitySystem = {
  // Customer feedback
  collectFeedback: async (jobId) => {
    await sendSMS(customer, surveyLink);
    await sendEmail(customer, detailedSurvey);
    return trackResponses();
  },
  
  // Mystery shopping
  mysteryShop: {
    frequency: 'quarterly',
    scenarios: ['emergency', 'standard', 'complex'],
    evaluation: ['response', 'professionalism', 'quality']
  },
  
  // Compliance checking
  compliance: {
    insurance: checkCurrent(),
    licenses: validateActive(),
    training: verifyCertifications(),
    safety: auditRecords()
  },
  
  // Performance scoring
  scorecard: {
    responseTime: 0-100,
    completionRate: 0-100,
    customerSatisfaction: 0-100,
    documentationQuality: 0-100,
    overallScore: calculateWeighted()
  }
};
```

### 10.2 Improvement Programs
- **Probation System**: For underperforming members
- **Excellence Awards**: Monthly recognition
- **Peer Mentoring**: Pair high/low performers
- **Remedial Training**: Targeted skill improvement

---

## 11. TECHNOLOGY ARCHITECTURE

### 11.1 Tech Stack
```yaml
Frontend:
  - Next.js 14 (React)
  - TypeScript
  - Tailwind CSS
  - Framer Motion

Backend:
  - Node.js + Express
  - PostgreSQL
  - Redis (caching)
  - Elasticsearch (search)

AI/ML:
  - OpenAI GPT-4 (customer bot)
  - Claude (documentation)
  - TensorFlow (predictions)
  - Computer Vision (damage assessment)

Infrastructure:
  - AWS/Google Cloud
  - Kubernetes
  - CloudFlare (CDN)
  - Stripe (payments)

Mobile:
  - React Native
  - Push notifications
  - Offline sync
  - Biometric auth
```

### 11.2 API Ecosystem
```typescript
// Public API endpoints
api.nrp.com.au/v1/
  /leads           // Lead submission
  /contractors     // Find contractors
  /quote          // Instant quotes
  /status         // Job status

// Member API endpoints  
api.nrp.com.au/member/v1/
  /profile        // Member details
  /leads          // Lead management
  /jobs           // Job tracking
  /invoices       // Financial
  /analytics      // Performance

// Partner API endpoints
api.nrp.com.au/partner/v1/
  /claims         // Submit claims
  /contractors    // Assign contractors
  /reports        // Analytics
  /billing        // Direct billing
```

---

## 12. LAUNCH STRATEGY

### Phase 1: Beta Launch (Month 1-2)
- [ ] 25 Foundation Members (Brisbane)
- [ ] Basic portal functionality
- [ ] Manual lead distribution
- [ ] 3 vendor partnerships
- [ ] 100 SEO pages

### Phase 2: Regional Launch (Month 3-4)
- [ ] 100 members (QLD)
- [ ] AI bot integration
- [ ] Automated distribution
- [ ] 10 vendor partnerships
- [ ] 1,000 SEO pages
- [ ] Mobile app beta

### Phase 3: National Expansion (Month 5-6)
- [ ] 500 members (East Coast)
- [ ] Insurance integration
- [ ] Full portal features
- [ ] 25 vendor partnerships
- [ ] 5,000 SEO pages
- [ ] University launch

### Phase 4: Market Domination (Month 7-12)
- [ ] 1,500+ members (National)
- [ ] 5 insurance partners
- [ ] 50+ vendor partnerships
- [ ] 10,000+ SEO pages
- [ ] Franchise program
- [ ] New Zealand expansion

---

## 13. SUCCESS METRICS

### Member Metrics
- Monthly Active Members
- Member Retention Rate
- Average Revenue Per Member
- Lead Acceptance Rate
- Member Satisfaction Score

### Business Metrics
- Monthly Recurring Revenue
- Lead Generation Volume
- Transaction Commission
- Platform Uptime
- Cost Per Acquisition

### Market Metrics
- Market Share
- Geographic Coverage
- SEO Rankings
- Brand Recognition
- Competitor Analysis

---

## CONCLUSION

The NRP Membership Portal takes CORE Group's proven model and enhances it with:
1. **Australian market specificity**
2. **AI-powered automation**
3. **Superior member benefits**
4. **Aggressive pricing strategy**
5. **Technology-first approach**

By combining the best of CORE's network model with cutting-edge technology and local market knowledge, NRP will rapidly become the dominant restoration network in Australia.

---

*Version: 1.0*
*Date: 2024*
*Status: Ready for Development*
*Next Step: Begin portal development with Foundation tier features*