# 🏭 Mock Data Factory Agent

## Mission Statement
The Mock Data Factory generates realistic, compelling demonstration data for investor presentations, system testing, and stakeholder demonstrations, showcasing the platform's full capabilities without requiring real customer data.

## Core Capabilities

### 1. Data Generation
- **Contractor Profiles**: Realistic contractor data across Australia
- **Customer Claims**: Diverse disaster recovery scenarios
- **Geographic Coverage**: All Australian locations
- **Performance Metrics**: Impressive KPIs and analytics
- **Financial Data**: Revenue projections and growth metrics

### 2. Scenario Simulation
- **Disaster Events**: Various disaster types and scales
- **Customer Journeys**: End-to-end claim processes
- **Contractor Responses**: Realistic response times and quotes
- **Market Dynamics**: Seasonal patterns and trends
- **Growth Trajectories**: Scaling scenarios

### 3. Visualization Support
- **Dashboard Data**: Real-time metrics and charts
- **Heat Maps**: Geographic distribution visualization
- **Timeline Data**: Historical and projected growth
- **Comparison Data**: Competitor analysis metrics
- **ROI Calculations**: Investment return projections

## Mock Data Templates

### Contractor Profile
```typescript
interface MockContractor {
  id: string;
  businessName: string;
  abn: string;
  location: {
    suburb: string;
    city: string;
    state: string;
    postcode: string;
    coordinates: [number, number];
  };
  serviceRadius: number; // km
  services: ServiceType[];
  certifications: Certification[];
  rating: number; // 1-5
  completedJobs: number;
  responseTime: number; // minutes
  pricing: PricingTier;
  availability: AvailabilityStatus;
  performanceMetrics: {
    customerSatisfaction: number;
    onTimeCompletion: number;
    quotaAccuracy: number;
  };
}
```

### Insurance Claim
```typescript
interface MockClaim {
  id: string;
  timestamp: Date;
  customer: {
    name: string;
    propertyType: PropertyType;
    location: Location;
  };
  disaster: {
    type: DisasterType;
    severity: 'minor' | 'moderate' | 'major' | 'catastrophic';
    affectedArea: number; // sq meters
    estimatedDamage: number; // AUD
  };
  insuranceCompany: string;
  claimAmount: number;
  status: ClaimStatus;
  assignedContractor?: string;
  timeline: ClaimEvent[];
}
```

## Data Generation Patterns

### Geographic Distribution
```yaml
distribution:
  major_cities:
    sydney: 30%
    melbourne: 25%
    brisbane: 15%
    perth: 10%
    adelaide: 8%
    other_capitals: 7%
  regional: 35%
  rural: 20%
  remote: 10%

coverage_targets:
  total_locations: 15000+
  contractors_per_100k: 50
  service_coverage: 99.9%
```

### Disaster Type Distribution
```yaml
disaster_types:
  water_damage: 35%
  fire_damage: 20%
  storm_damage: 15%
  mould_remediation: 10%
  flood_recovery: 8%
  vandalism: 5%
  biohazard: 4%
  other: 3%

severity_distribution:
  minor: 40%
  moderate: 35%
  major: 20%
  catastrophic: 5%
```

## Investor Pack Data Sets

### Growth Metrics
```typescript
const growthData = {
  monthlyGrowth: {
    contractors: 15, // %
    claims: 25, // %
    revenue: 30, // %
    coverage: 10 // %
  },
  projections: {
    year1: {
      contractors: 500,
      monthlyRevenue: 250000,
      marketShare: 5
    },
    year2: {
      contractors: 2000,
      monthlyRevenue: 1500000,
      marketShare: 20
    },
    year3: {
      contractors: 5000,
      monthlyRevenue: 5000000,
      marketShare: 45
    }
  }
};
```

### Performance Showcase
```typescript
const performanceMetrics = {
  operational: {
    automationRate: 100,
    humanIntervention: 0,
    systemUptime: 99.95,
    responseTime: 0.8 // seconds
  },
  business: {
    leadConversion: 65,
    contractorRetention: 95,
    customerSatisfaction: 92,
    costPerLead: 12.50
  },
  seo: {
    keywordsRanked: 15000,
    page1Rankings: 8500,
    organicTraffic: 250000,
    domainAuthority: 75
  }
};
```

## Data Scenarios for Demonstrations

### Scenario 1: Major Storm Event
```yaml
event: Brisbane Hailstorm
date: 2024-02-15
affected_properties: 1250
claim_volume: 850
contractor_response:
  mobilized: 45
  average_response: 2.5 hours
  completion_time: 7 days
revenue_generated: $425,000
```

### Scenario 2: Nationwide Coverage
```yaml
demonstration: SEO Domination
locations_covered: 
  - "Sydney water damage restoration"
  - "Coober Pedy mould removal"
  - "Thursday Island fire restoration"
  - "Broken Hill sewage cleanup"
results:
  all_page_1: true
  competitor_visibility: 0%
  lead_generation: 500/day
```

### Scenario 3: Contractor Success Story
```yaml
contractor: "Brisbane Restoration Pros"
joined: 2024-01-01
initial_radius: 25km
current_radius: 100km
monthly_leads: 150
conversion_rate: 70%
revenue_increase: 280%
testimonial: "NRP transformed our business..."
```

## Real-Time Simulation

### Live Dashboard Data
```typescript
interface LiveDashboard {
  currentStats: {
    activeContractors: number;
    claimsInProgress: number;
    todayRevenue: number;
    responseTime: number;
  };
  recentActivity: Activity[];
  alerts: Alert[];
  trends: TrendData[];
}

// Updates every 5 seconds with realistic variations
const simulateLiveData = () => {
  return {
    activeContractors: 127 + Math.floor(Math.random() * 20),
    claimsInProgress: 45 + Math.floor(Math.random() * 10),
    todayRevenue: 45000 + Math.floor(Math.random() * 5000),
    responseTime: 0.7 + Math.random() * 0.3
  };
};
```

## Data Quality Assurance

### Validation Rules
- **ABN Format**: Valid Australian Business Numbers
- **Postcodes**: Real Australian postcodes
- **Phone Numbers**: Valid Australian format
- **Coordinates**: Within Australian boundaries
- **Pricing**: Market-realistic ranges

### Consistency Checks
- **Temporal Logic**: Dates and times make sense
- **Geographic Logic**: Distances and locations align
- **Business Logic**: Metrics are achievable
- **Financial Logic**: Numbers add up correctly

## Integration with Demo System

### API Endpoints
```typescript
// Mock data API
GET /api/mock/contractors?location={suburb}&radius={km}
GET /api/mock/claims?status={status}&limit={n}
GET /api/mock/metrics?period={period}
GET /api/mock/analytics/dashboard
POST /api/mock/simulate/disaster
```

### Database Seeding
```sql
-- Seed contractors across Australia
INSERT INTO contractors (name, location, services, rating)
SELECT * FROM generate_mock_contractors(1000);

-- Seed historical claims
INSERT INTO claims (date, type, amount, status)
SELECT * FROM generate_mock_claims('2023-01-01', '2024-12-31');

-- Seed performance metrics
INSERT INTO metrics (date, metric, value)
SELECT * FROM generate_mock_metrics('daily', 365);
```

## Configuration

```yaml
mock_data_factory:
  seed_size: large # small, medium, large, massive
  refresh_interval: 3600 # seconds
  randomization: true
  
  profiles:
    investor_demo:
      contractors: 2500
      claims: 10000
      locations: 500
      time_period: 2_years
      
    stress_test:
      contractors: 10000
      claims: 100000
      locations: 2000
      time_period: 5_years
      
    quick_demo:
      contractors: 100
      claims: 500
      locations: 50
      time_period: 3_months
      
  realism:
    use_real_suburbs: true
    use_real_disaster_patterns: true
    use_market_pricing: true
    use_seasonal_variations: true
```

## Performance Optimization

### Caching Strategy
- **Static Data**: Pre-generate and cache
- **Dynamic Data**: Generate on-demand
- **Bulk Operations**: Batch generation
- **Memory Management**: Stream large datasets

### Generation Speed
- **Single Record**: < 1ms
- **Bulk (1000)**: < 100ms
- **Full Seed**: < 30s
- **Live Updates**: < 50ms

## Success Metrics

### Data Quality
- **Realism Score**: > 95%
- **Consistency**: 100%
- **Coverage**: All scenarios
- **Performance**: Sub-second generation

### Business Impact
- **Investor Engagement**: 90% positive
- **Demo Success Rate**: 95%
- **Time to Demo**: < 5 minutes
- **Customization Time**: < 1 hour

---

*Agent Version: 1.0.0*
*Last Updated: 2024-01-30*
*Status: ACTIVE*
*Specialization: Investor Demonstrations*