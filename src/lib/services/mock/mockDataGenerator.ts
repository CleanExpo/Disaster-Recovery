/**
 * Mock Data Generator
 * Creates realistic demo data for investor presentations
 */

interface MockContractor {
  id: string;
  businessName: string;
  abn: string;
  email: string;
  phone: string;
  services: string[];
  locations: string[];
  rating: number;
  completedJobs: number;
  responseTime: string;
  availability: 'available' | 'busy' | 'offline';
  kpiScore: number;
  insuranceVerified: boolean;
  backgroundCheckStatus: 'approved' | 'pending' | 'failed';
  joinedDate: string;
  subscription: {
    tier: 'starter' | 'professional' | 'enterprise';
    monthlyFee: number;
    territories: string[];
  };
}

interface MockLead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceType: string;
  urgencyLevel: 'emergency' | 'urgent' | 'standard';
  propertyType: 'residential' | 'commercial' | 'industrial';
  location: {
    suburb: string;
    postcode: string;
    state: string;
  };
  damageDescription: string;
  insuranceCompany?: string;
  claimNumber?: string;
  estimatedValue: number;
  status: 'new' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  assignedContractor?: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  bookingFee: number;
}

interface MockKPI {
  contractorId: string;
  period: string;
  metrics: {
    responseTime: number; // minutes
    completionRate: number; // percentage
    customerSatisfaction: number; // 1-5
    firstTimeFixRate: number; // percentage
    safetyCompliance: number; // percentage
    documentationQuality: number; // 1-10
  };
}

class MockDataGenerator {
  private contractors: MockContractor[] = [];
  private leads: MockLead[] = [];
  private kpis: MockKPI[] = [];

  constructor() {
    this.generateInitialData();
  }

  private generateInitialData() {
    // Generate 50 realistic contractors across Australia
    this.contractors = this.generateContractors(50);
    
    // Generate 200 leads over the past 3 months
    this.leads = this.generateLeads(200);
    
    // Generate KPI data for all contractors
    this.kpis = this.generateKPIs();
  }

  private generateContractors(count: number): MockContractor[] {
    const businessNames = [
      'Rapid Response Restoration', 'Emergency Flood Services', 'Fire Damage Specialists',
      'Mold Remediation Experts', 'Storm Recovery Group', 'Water Damage Solutions',
      'Disaster Recovery Professionals', 'Emergency Restoration Services', 'Damage Control Australia',
      'Crisis Response Team', 'Property Restoration Services', 'Flood Recovery Specialists'
    ];
    
    const locations = [
      { state: 'NSW', suburbs: ['Sydney CBD', 'Parramatta', 'Penrith', 'Newcastle', 'Wollongong'] },
      { state: 'VIC', suburbs: ['Melbourne CBD', 'Geelong', 'Ballarat', 'Bendigo', 'Frankston'] },
      { state: 'QLD', suburbs: ['Brisbane CBD', 'Gold Coast', 'Sunshine Coast', 'Townsville', 'Cairns'] },
      { state: 'WA', suburbs: ['Perth CBD', 'Fremantle', 'Joondalup', 'Mandurah', 'Bunbury'] },
      { state: 'SA', suburbs: ['Adelaide CBD', 'Glenelg', 'Port Adelaide', 'Elizabeth', 'Mount Barker'] }
    ];
    
    const services = [
      'water-damage', 'fire-damage', 'storm-damage', 'mold-remediation',
      'biohazard-cleanup', 'sewage-cleanup', 'structural-drying', 'emergency-response'
    ];
    
    const contractors: MockContractor[] = [];
    
    for (let i = 0; i < count; i++) {
      const state = locations[Math.floor(Math.random() * locations.length)];
      const businessName = `${businessNames[i % businessNames.length]} ${state.state}`;
      const tier = i < 10 ? 'enterprise' : i < 25 ? 'professional' : 'starter';
      
      contractors.push({
        id: `contractor_${i + 1}`,
        businessName,
        abn: `${11 + i}${234567890 + i}`,
        email: `contact@${businessName.toLowerCase().replace(/\s+/g, '')}.com.au`,
        phone: `04${20000000 + i}`,
        services: services.slice(0, Math.floor(Math.random() * 4) + 2),
        locations: state.suburbs.slice(0, Math.floor(Math.random() * 3) + 1),
        rating: 3.5 + Math.random() * 1.5,
        completedJobs: Math.floor(Math.random() * 500) + 50,
        responseTime: ['30 min', '1 hour', '2 hours'][Math.floor(Math.random() * 3)],
        availability: Math.random() > 0.2 ? 'available' : Math.random() > 0.5 ? 'busy' : 'offline',
        kpiScore: 70 + Math.random() * 30,
        insuranceVerified: true,
        backgroundCheckStatus: 'approved',
        joinedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        subscription: {
          tier,
          monthlyFee: tier === 'enterprise' ? 1199 : tier === 'professional' ? 699 : 299,
          territories: state.suburbs.slice(0, tier === 'enterprise' ? 5 : tier === 'professional' ? 3 : 1)
        }
      });
    }
    
    return contractors;
  }

  private generateLeads(count: number): MockLead[] {
    const firstNames = ['John', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'James', 'Anna'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson'];
    
    const damageDescriptions = [
      'Severe water damage from burst pipe in kitchen and living area',
      'Fire damage to bedroom and roof, smoke damage throughout property',
      'Storm damage - tree through roof, water intrusion in multiple rooms',
      'Flooding in basement, water damage to flooring and walls',
      'Mold growth in bathroom and adjacent bedroom after water leak',
      'Sewage backup in ground floor, contamination of carpets and furniture',
      'Hail damage to roof and windows, water leaking into attic'
    ];
    
    const insuranceCompanies = [
      'NRMA Insurance', 'AAMI', 'Allianz', 'Suncorp', 'QBE', 'CGU', 'GIO', null
    ];
    
    const leads: MockLead[] = [];
    const locations = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'];
    
    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const daysAgo = Math.floor(Math.random() * 90);
      const isEmergency = Math.random() < 0.2;
      const isPaid = Math.random() < 0.85;
      const isAssigned = isPaid && Math.random() < 0.9;
      const isCompleted = isAssigned && daysAgo > 7 && Math.random() < 0.7;
      
      leads.push({
        id: `lead_${i + 1}`,
        customerName: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
        phone: `04${10000000 + Math.floor(Math.random() * 90000000)}`,
        serviceType: ['water-damage', 'fire-damage', 'storm-damage', 'mold-remediation'][Math.floor(Math.random() * 4)],
        urgencyLevel: isEmergency ? 'emergency' : Math.random() < 0.3 ? 'urgent' : 'standard',
        propertyType: Math.random() < 0.7 ? 'residential' : Math.random() < 0.8 ? 'commercial' : 'industrial',
        location: {
          suburb: locations[Math.floor(Math.random() * locations.length)],
          postcode: `${2000 + Math.floor(Math.random() * 1000)}`,
          state: ['NSW', 'VIC', 'QLD', 'WA', 'SA'][Math.floor(Math.random() * 5)]
        },
        damageDescription: damageDescriptions[Math.floor(Math.random() * damageDescriptions.length)],
        insuranceCompany: insuranceCompanies[Math.floor(Math.random() * insuranceCompanies.length)],
        claimNumber: Math.random() < 0.6 ? `CLM${100000 + i}` : undefined,
        estimatedValue: 5000 + Math.floor(Math.random() * 45000),
        status: isCompleted ? 'completed' : isAssigned ? 'in_progress' : isPaid ? 'assigned' : 'new',
        createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
        assignedContractor: isAssigned ? this.contractors[Math.floor(Math.random() * Math.min(20, this.contractors.length))]?.id : undefined,
        paymentStatus: isPaid ? 'paid' : 'pending',
        bookingFee: 2750
      });
    }
    
    return leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  private generateKPIs(): MockKPI[] {
    const kpis: MockKPI[] = [];
    const periods = ['2024-10', '2024-11', '2024-12'];
    
    this.contractors.forEach(contractor => {
      periods.forEach(period => {
        kpis.push({
          contractorId: contractor.id,
          period,
          metrics: {
            responseTime: 15 + Math.floor(Math.random() * 45), // 15-60 minutes
            completionRate: 85 + Math.floor(Math.random() * 15), // 85-100%
            customerSatisfaction: 4 + Math.random(), // 4-5
            firstTimeFixRate: 75 + Math.floor(Math.random() * 25), // 75-100%
            safetyCompliance: 90 + Math.floor(Math.random() * 10), // 90-100%
            documentationQuality: 7 + Math.floor(Math.random() * 3) // 7-10
          }
        });
      });
    });
    
    return kpis;
  }

  // Public methods to access mock data
  getContractors(filters?: {
    service?: string;
    location?: string;
    availability?: string;
  }): MockContractor[] {
    let result = [...this.contractors];
    
    if (filters?.service) {
      result = result.filter(c => c.services.includes(filters.service!));
    }
    if (filters?.location) {
      result = result.filter(c => 
        c.locations.some(l => l.toLowerCase().includes(filters.location!.toLowerCase()))
      );
    }
    if (filters?.availability) {
      result = result.filter(c => c.availability === filters.availability);
    }
    
    return result;
  }

  getLeads(filters?: {
    status?: string;
    urgency?: string;
    dateRange?: { start: Date; end: Date };
  }): MockLead[] {
    let result = [...this.leads];
    
    if (filters?.status) {
      result = result.filter(l => l.status === filters.status);
    }
    if (filters?.urgency) {
      result = result.filter(l => l.urgencyLevel === filters.urgency);
    }
    if (filters?.dateRange) {
      result = result.filter(l => {
        const date = new Date(l.createdAt);
        return date >= filters.dateRange!.start && date <= filters.dateRange!.end;
      });
    }
    
    return result;
  }

  getKPIs(contractorId: string, period?: string): MockKPI[] {
    return this.kpis.filter(k => 
      k.contractorId === contractorId && 
      (!period || k.period === period)
    );
  }

  // Dashboard statistics
  getDashboardStats() {
    const now = new Date();
    const thisMonth = this.leads.filter(l => {
      const leadDate = new Date(l.createdAt);
      return leadDate.getMonth() === now.getMonth() && 
             leadDate.getFullYear() === now.getFullYear();
    });
    
    const revenue = thisMonth.filter(l => l.paymentStatus === 'paid').length * 550;
    const contractorPayouts = thisMonth.filter(l => l.status === 'completed').length * 2200;
    
    return {
      totalContractors: this.contractors.length,
      activeContractors: this.contractors.filter(c => c.availability === 'available').length,
      totalLeads: this.leads.length,
      leadsThisMonth: thisMonth.length,
      conversionRate: (thisMonth.filter(l => l.paymentStatus === 'paid').length / thisMonth.length * 100).toFixed(1),
      monthlyRevenue: revenue,
      contractorPayouts,
      netRevenue: revenue - contractorPayouts,
      averageResponseTime: '45 minutes',
      customerSatisfaction: 4.6,
      topServices: [
        { name: 'Water Damage', count: 87, revenue: 47850 },
        { name: 'Fire Damage', count: 42, revenue: 23100 },
        { name: 'Storm Damage', count: 38, revenue: 20900 },
        { name: 'Mold Remediation', count: 33, revenue: 18150 }
      ],
      recentActivity: thisMonth.slice(0, 10).map(lead => ({
        type: lead.urgencyLevel === 'emergency' ? 'emergency' : 'lead',
        description: `${lead.customerName} - ${lead.serviceType.replace('-', ' ')} in ${lead.location.suburb}`,
        time: lead.createdAt,
        status: lead.status
      }))
    };
  }
}

// Singleton instance
export const mockDataGenerator = new MockDataGenerator();

// Export for use in components
export const getMockContractors = (filters?: any) => mockDataGenerator.getContractors(filters);
export const getMockLeads = (filters?: any) => mockDataGenerator.getLeads(filters);
export const getMockKPIs = (contractorId: string, period?: string) => mockDataGenerator.getKPIs(contractorId, period);
export const getMockDashboardStats = () => mockDataGenerator.getDashboardStats();