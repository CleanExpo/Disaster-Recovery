/**
 * Partnership Manager
 *
 * Manages strategic partnerships for link building, including insurance companies,
 * real estate platforms, property management software, trade associations,
 * and referral networks.
 *
 * @module PartnershipManager
 * @category SEO - Link Building
 */

import { z } from 'zod';

// ============================================================================
// Types & Schemas
// ============================================================================

/**
 * Partnership types
 */
export enum PartnershipType {
  INSURANCE = 'insurance',
  REAL_ESTATE = 'real_estate',
  PROPERTY_MANAGEMENT = 'property_management',
  TRADE_ASSOCIATION = 'trade_association',
  REFERRAL_NETWORK = 'referral_network',
  TECHNOLOGY = 'technology',
  GOVERNMENT = 'government',
  MEDIA = 'media'
}

/**
 * Partnership status
 */
export enum PartnershipStatus {
  PROSPECT = 'prospect',
  OUTREACH = 'outreach',
  NEGOTIATION = 'negotiation',
  ACTIVE = 'active',
  PAUSED = 'paused',
  ENDED = 'ended'
}

/**
 * Partnership tier based on value
 */
export enum PartnershipTier {
  STRATEGIC = 'strategic',  // Major national partners
  PREMIUM = 'premium',      // Regional/significant partners
  STANDARD = 'standard',    // Local/smaller partners
  AFFILIATE = 'affiliate'   // Referral-only relationships
}

/**
 * Partner schema
 */
export const PartnerSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  type: z.nativeEnum(PartnershipType),
  tier: z.nativeEnum(PartnershipTier),
  status: z.nativeEnum(PartnershipStatus),
  organization: z.object({
    website: z.string().url(),
    domainAuthority: z.number().min(0).max(100),
    industry: z.string(),
    size: z.enum(['enterprise', 'medium', 'small']),
    locations: z.array(z.string())
  }),
  contact: z.object({
    primaryName: z.string(),
    primaryEmail: z.string().email(),
    primaryPhone: z.string().optional(),
    role: z.string(),
    decisionMaker: z.boolean().default(false)
  }),
  value: z.object({
    estimatedBacklinks: z.number().min(0),
    estimatedReferrals: z.number().min(0),
    estimatedRevenue: z.number().min(0),
    domainAuthority: z.number().min(0).max(100)
  }),
  terms: z.object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    renewalDate: z.date().optional(),
    autoRenew: z.boolean().default(false),
    exclusivity: z.boolean().default(false),
    territory: z.array(z.string()).default([])
  }).optional(),
  benefits: z.object({
    linkPlacement: z.array(z.object({
      url: z.string().url(),
      location: z.string(),
      anchor: z.string(),
      isDoFollow: z.boolean()
    })).default([]),
    coMarketing: z.boolean().default(false),
    dataSharing: z.boolean().default(false),
    apiAccess: z.boolean().default(false),
    customIntegration: z.boolean().default(false)
  }),
  performance: z.object({
    backlinksEarned: z.number().default(0),
    referralsReceived: z.number().default(0),
    revenueGenerated: z.number().default(0),
    customersSent: z.number().default(0),
    lastActivity: z.date().optional()
  }).optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Partner = z.infer<typeof PartnerSchema>;

/**
 * Partnership proposal schema
 */
export const PartnershipProposalSchema = z.object({
  id: z.string().uuid(),
  partnerId: z.string().uuid(),
  proposalType: z.enum(['initial', 'renewal', 'expansion']),
  valueProposition: z.object({
    forPartner: z.array(z.string()),
    forUs: z.array(z.string()),
    mutual: z.array(z.string())
  }),
  proposedTerms: z.object({
    duration: z.number(), // months
    linkPlacement: z.array(z.object({
      page: z.string(),
      anchor: z.string(),
      context: z.string()
    })),
    referralCommission: z.number().optional(),
    coMarketingBudget: z.number().optional(),
    customizations: z.array(z.string()).default([])
  }),
  timeline: z.object({
    proposedAt: z.date(),
    responseBy: z.date().optional(),
    startDate: z.date().optional()
  }),
  status: z.enum(['draft', 'sent', 'under_review', 'accepted', 'rejected']),
  feedback: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type PartnershipProposal = z.infer<typeof PartnershipProposalSchema>;

// ============================================================================
// Pre-defined Partner Database
// ============================================================================

/**
 * Strategic partners in Australia
 */
export const STRATEGIC_PARTNERS: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // Insurance Companies
  {
    name: 'NRMA Insurance',
    type: PartnershipType.INSURANCE,
    tier: PartnershipTier.STRATEGIC,
    status: PartnershipStatus.PROSPECT,
    organization: {
      website: 'https://www.nrma.com.au',
      domainAuthority: 78,
      industry: 'Insurance',
      size: 'enterprise',
      locations: ['NSW', 'QLD', 'ACT', 'SA', 'TAS']
    },
    contact: {
      primaryName: 'Partnership Team',
      primaryEmail: 'partnerships@nrma.com.au',
      role: 'Business Development',
      decisionMaker: false
    },
    value: {
      estimatedBacklinks: 5,
      estimatedReferrals: 500,
      estimatedRevenue: 250000,
      domainAuthority: 78
    },
    benefits: {
      linkPlacement: [],
      coMarketing: false,
      dataSharing: false,
      apiAccess: false,
      customIntegration: false
    },
    tags: ['insurance', 'enterprise', 'high-value']
  },
  {
    name: 'Suncorp Insurance',
    type: PartnershipType.INSURANCE,
    tier: PartnershipTier.STRATEGIC,
    status: PartnershipStatus.PROSPECT,
    organization: {
      website: 'https://www.suncorp.com.au',
      domainAuthority: 76,
      industry: 'Insurance',
      size: 'enterprise',
      locations: ['All States']
    },
    contact: {
      primaryName: 'Partnership Team',
      primaryEmail: 'partnerships@suncorp.com.au',
      role: 'Business Development',
      decisionMaker: false
    },
    value: {
      estimatedBacklinks: 5,
      estimatedReferrals: 600,
      estimatedRevenue: 300000,
      domainAuthority: 76
    },
    benefits: {
      linkPlacement: [],
      coMarketing: false,
      dataSharing: false,
      apiAccess: false,
      customIntegration: false
    },
    tags: ['insurance', 'enterprise', 'high-value']
  },
  {
    name: 'Allianz Australia',
    type: PartnershipType.INSURANCE,
    tier: PartnershipTier.STRATEGIC,
    status: PartnershipStatus.PROSPECT,
    organization: {
      website: 'https://www.allianz.com.au',
      domainAuthority: 75,
      industry: 'Insurance',
      size: 'enterprise',
      locations: ['All States']
    },
    contact: {
      primaryName: 'Partnership Team',
      primaryEmail: 'partnerships@allianz.com.au',
      role: 'Business Development',
      decisionMaker: false
    },
    value: {
      estimatedBacklinks: 5,
      estimatedReferrals: 450,
      estimatedRevenue: 225000,
      domainAuthority: 75
    },
    benefits: {
      linkPlacement: [],
      coMarketing: false,
      dataSharing: false,
      apiAccess: false,
      customIntegration: false
    },
    tags: ['insurance', 'enterprise', 'high-value']
  },

  // Real Estate Platforms
  {
    name: 'Domain.com.au',
    type: PartnershipType.REAL_ESTATE,
    tier: PartnershipTier.STRATEGIC,
    status: PartnershipStatus.PROSPECT,
    organization: {
      website: 'https://www.domain.com.au',
      domainAuthority: 89,
      industry: 'Real Estate',
      size: 'enterprise',
      locations: ['All States']
    },
    contact: {
      primaryName: 'Partnership Team',
      primaryEmail: 'partnerships@domain.com.au',
      role: 'Business Development',
      decisionMaker: false
    },
    value: {
      estimatedBacklinks: 10,
      estimatedReferrals: 1000,
      estimatedRevenue: 500000,
      domainAuthority: 89
    },
    benefits: {
      linkPlacement: [],
      coMarketing: false,
      dataSharing: false,
      apiAccess: false,
      customIntegration: false
    },
    tags: ['real-estate', 'enterprise', 'high-authority']
  },
  {
    name: 'RealEstate.com.au',
    type: PartnershipType.REAL_ESTATE,
    tier: PartnershipTier.STRATEGIC,
    status: PartnershipStatus.PROSPECT,
    organization: {
      website: 'https://www.realestate.com.au',
      domainAuthority: 87,
      industry: 'Real Estate',
      size: 'enterprise',
      locations: ['All States']
    },
    contact: {
      primaryName: 'Partnership Team',
      primaryEmail: 'partnerships@realestate.com.au',
      role: 'Business Development',
      decisionMaker: false
    },
    value: {
      estimatedBacklinks: 10,
      estimatedReferrals: 1200,
      estimatedRevenue: 600000,
      domainAuthority: 87
    },
    benefits: {
      linkPlacement: [],
      coMarketing: false,
      dataSharing: false,
      apiAccess: false,
      customIntegration: false
    },
    tags: ['real-estate', 'enterprise', 'high-authority']
  },

  // Property Management Software
  {
    name: 'PropertyMe',
    type: PartnershipType.PROPERTY_MANAGEMENT,
    tier: PartnershipTier.PREMIUM,
    status: PartnershipStatus.PROSPECT,
    organization: {
      website: 'https://www.propertyme.com',
      domainAuthority: 58,
      industry: 'Property Management Software',
      size: 'medium',
      locations: ['All States']
    },
    contact: {
      primaryName: 'Integration Team',
      primaryEmail: 'integrations@propertyme.com',
      role: 'Technical Partnerships',
      decisionMaker: false
    },
    value: {
      estimatedBacklinks: 3,
      estimatedReferrals: 200,
      estimatedRevenue: 100000,
      domainAuthority: 58
    },
    benefits: {
      linkPlacement: [],
      coMarketing: false,
      dataSharing: false,
      apiAccess: false,
      customIntegration: false
    },
    tags: ['proptech', 'integration', 'api']
  },
  {
    name: 'Property Tree',
    type: PartnershipType.PROPERTY_MANAGEMENT,
    tier: PartnershipTier.PREMIUM,
    status: PartnershipStatus.PROSPECT,
    organization: {
      website: 'https://www.propertytree.com',
      domainAuthority: 56,
      industry: 'Property Management Software',
      size: 'medium',
      locations: ['All States']
    },
    contact: {
      primaryName: 'Partnership Team',
      primaryEmail: 'partnerships@propertytree.com',
      role: 'Business Development',
      decisionMaker: false
    },
    value: {
      estimatedBacklinks: 3,
      estimatedReferrals: 180,
      estimatedRevenue: 90000,
      domainAuthority: 56
    },
    benefits: {
      linkPlacement: [],
      coMarketing: false,
      dataSharing: false,
      apiAccess: false,
      customIntegration: false
    },
    tags: ['proptech', 'integration', 'api']
  },

  // Trade Associations
  {
    name: 'Master Builders Australia',
    type: PartnershipType.TRADE_ASSOCIATION,
    tier: PartnershipTier.PREMIUM,
    status: PartnershipStatus.PROSPECT,
    organization: {
      website: 'https://www.masterbuilders.com.au',
      domainAuthority: 68,
      industry: 'Construction',
      size: 'medium',
      locations: ['All States']
    },
    contact: {
      primaryName: 'Membership Team',
      primaryEmail: 'membership@masterbuilders.com.au',
      role: 'Member Services',
      decisionMaker: false
    },
    value: {
      estimatedBacklinks: 2,
      estimatedReferrals: 100,
      estimatedRevenue: 50000,
      domainAuthority: 68
    },
    benefits: {
      linkPlacement: [],
      coMarketing: false,
      dataSharing: false,
      apiAccess: false,
      customIntegration: false
    },
    tags: ['association', 'industry', 'credibility']
  },
  {
    name: 'Housing Industry Association',
    type: PartnershipType.TRADE_ASSOCIATION,
    tier: PartnershipTier.PREMIUM,
    status: PartnershipStatus.PROSPECT,
    organization: {
      website: 'https://www.hia.com.au',
      domainAuthority: 72,
      industry: 'Construction',
      size: 'medium',
      locations: ['All States']
    },
    contact: {
      primaryName: 'Membership Team',
      primaryEmail: 'membership@hia.com.au',
      role: 'Member Services',
      decisionMaker: false
    },
    value: {
      estimatedBacklinks: 2,
      estimatedReferrals: 120,
      estimatedRevenue: 60000,
      domainAuthority: 72
    },
    benefits: {
      linkPlacement: [],
      coMarketing: false,
      dataSharing: false,
      apiAccess: false,
      customIntegration: false
    },
    tags: ['association', 'industry', 'credibility']
  }
];

// ============================================================================
// Partnership Proposal Templates
// ============================================================================

export interface ProposalTemplate {
  name: string;
  type: PartnershipType;
  valueProps: {
    forPartner: string[];
    forUs: string[];
    mutual: string[];
  };
  terms: {
    duration: number;
    linkPlacement: Array<{ page: string; anchor: string; context: string }>;
    customizations: string[];
  };
}

export const PROPOSAL_TEMPLATES: Record<string, ProposalTemplate> = {
  insurancePartnership: {
    name: 'Insurance Company Partnership',
    type: PartnershipType.INSURANCE,
    valueProps: {
      forPartner: [
        'Access to vetted, high-quality restoration network',
        'Faster claims resolution and customer satisfaction',
        'Reduced claims costs through efficient restoration',
        'Real-time project tracking and transparency',
        'Comprehensive reporting and analytics'
      ],
      forUs: [
        'Consistent referral stream from insurance claims',
        'High-authority backlink from insurance website',
        'Brand credibility through association',
        'Access to claims data for market insights'
      ],
      mutual: [
        'Improved customer experience during disasters',
        'Streamlined communication and coordination',
        'Data-driven insights for risk management',
        'Joint marketing opportunities'
      ]
    },
    terms: {
      duration: 12,
      linkPlacement: [
        {
          page: 'Claims Resources',
          anchor: 'Find Verified Restoration Professionals',
          context: 'After filing a claim, connect with our trusted restoration partners'
        },
        {
          page: 'Disaster Recovery Guide',
          anchor: 'Professional Restoration Services',
          context: 'Get matched with qualified restoration professionals in your area'
        }
      ],
      customizations: [
        'API integration for claims data sharing',
        'Custom landing page for insurance partner referrals',
        'Co-branded marketing materials',
        'Priority matching for referred customers'
      ]
    }
  },

  realEstatePartnership: {
    name: 'Real Estate Platform Partnership',
    type: PartnershipType.REAL_ESTATE,
    valueProps: {
      forPartner: [
        'Value-added service for property sellers and buyers',
        'Content on disaster preparedness and property protection',
        'Expert insights on property disaster risk',
        'Enhanced property listings with disaster recovery info'
      ],
      forUs: [
        'High-authority backlinks from real estate domain',
        'Access to property owners during transition periods',
        'Brand visibility to property buyers/sellers',
        'Content partnership opportunities'
      ],
      mutual: [
        'Comprehensive property disaster risk information',
        'Educational content for property owners',
        'Market insights on disaster impact',
        'Joint research opportunities'
      ]
    },
    terms: {
      duration: 12,
      linkPlacement: [
        {
          page: 'Home Maintenance Guides',
          anchor: 'Disaster Recovery and Restoration',
          context: 'Learn how to protect your property and find restoration services'
        },
        {
          page: 'Selling Tips',
          anchor: 'Address Disaster Damage',
          context: 'Professional restoration before listing your property'
        }
      ],
      customizations: [
        'Property disaster risk API integration',
        'Co-created educational content',
        'Webinar series on property protection',
        'Disaster preparedness checklists'
      ]
    }
  },

  propertyManagementPartnership: {
    name: 'Property Management Software Partnership',
    type: PartnershipType.PROPERTY_MANAGEMENT,
    valueProps: {
      forPartner: [
        'Integrated restoration vendor management',
        'Automated disaster response workflows',
        'Enhanced property maintenance capabilities',
        'Value-added feature for customers'
      ],
      forUs: [
        'Direct integration with property management workflows',
        'Consistent referrals from property managers',
        'Technical backlink from integration page',
        'Access to managed property portfolio'
      ],
      mutual: [
        'Streamlined emergency response for managed properties',
        'Better tenant experience during disasters',
        'Reduced property downtime',
        'Comprehensive maintenance tracking'
      ]
    },
    terms: {
      duration: 24,
      linkPlacement: [
        {
          page: 'Integrations Directory',
          anchor: 'Disaster Recovery Integration',
          context: 'Connect with verified restoration professionals directly from your dashboard'
        },
        {
          page: 'Maintenance Features',
          anchor: 'Emergency Restoration Services',
          context: 'Integrated disaster recovery and restoration vendor management'
        }
      ],
      customizations: [
        'Full API integration',
        'White-label dashboard module',
        'Custom notification workflows',
        'Dedicated account manager'
      ]
    }
  },

  tradeAssociationPartnership: {
    name: 'Trade Association Partnership',
    type: PartnershipType.TRADE_ASSOCIATION,
    valueProps: {
      forPartner: [
        'Technology solution for association members',
        'Member benefit and value-add',
        'Modern platform for industry professionals',
        'Professional development opportunities'
      ],
      forUs: [
        'Credibility through association membership',
        'Access to qualified restoration professionals',
        'Industry authority backlink',
        'Networking opportunities'
      ],
      mutual: [
        'Elevated industry standards',
        'Professional development resources',
        'Industry research and insights',
        'Educational content collaboration'
      ]
    },
    terms: {
      duration: 12,
      linkPlacement: [
        {
          page: 'Member Resources',
          anchor: 'Business Management Tools',
          context: 'Platform for restoration professionals to manage projects and grow business'
        },
        {
          page: 'Industry Tools',
          anchor: 'Project Management Platform',
          context: 'Technology solutions for modern restoration businesses'
        }
      ],
      customizations: [
        'Member discount program',
        'Co-branded training materials',
        'Joint webinar series',
        'Industry research collaboration'
      ]
    }
  }
};

// ============================================================================
// Partnership Manager
// ============================================================================

export class PartnershipManager {
  private partners: Map<string, Partner> = new Map();
  private proposals: Map<string, PartnershipProposal> = new Map();

  constructor() {
    // Initialize with strategic partners
    this.initializePartners();
  }

  /**
   * Initialize partner database
   */
  private initializePartners(): void {
    const now = new Date();
    STRATEGIC_PARTNERS.forEach(partner => {
      const fullPartner: Partner = {
        ...partner,
        id: this.generateId(),
        createdAt: now,
        updatedAt: now
      };
      this.partners.set(fullPartner.id, fullPartner);
    });
  }

  /**
   * Create partnership proposal
   */
  async createProposal(
    partnerId: string,
    templateKey: keyof typeof PROPOSAL_TEMPLATES,
    customization?: Partial<PartnershipProposal>
  ): Promise<PartnershipProposal> {
    const partner = this.partners.get(partnerId);
    if (!partner) {
      throw new Error('Partner not found');
    }

    const template = PROPOSAL_TEMPLATES[templateKey];
    if (!template) {
      throw new Error('Template not found');
    }

    const proposalId = this.generateId();
    const now = new Date();

    const proposal: PartnershipProposal = {
      id: proposalId,
      partnerId,
      proposalType: 'initial',
      valueProposition: template.valueProps,
      proposedTerms: template.terms,
      timeline: {
        proposedAt: now,
        responseBy: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days
        startDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days
      },
      status: 'draft',
      createdAt: now,
      updatedAt: now,
      ...customization
    };

    PartnershipProposalSchema.parse(proposal);
    this.proposals.set(proposalId, proposal);

    return proposal;
  }

  /**
   * Generate proposal document
   */
  generateProposalDocument(proposalId: string): string {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) {
      throw new Error('Proposal not found');
    }

    const partner = this.partners.get(proposal.partnerId);
    if (!partner) {
      throw new Error('Partner not found');
    }

    return `
# Partnership Proposal
## ${partner.name} & Disaster Recovery Platform

### Executive Summary

We propose a strategic partnership between ${partner.name} and Disaster Recovery Platform to create mutual value through:

${proposal.valueProposition.mutual.map(v => `- ${v}`).join('\n')}

---

### Value Proposition

#### Benefits for ${partner.name}

${proposal.valueProposition.forPartner.map(v => `- ${v}`).join('\n')}

#### Benefits for Disaster Recovery Platform

${proposal.valueProposition.forUs.map(v => `- ${v}`).join('\n')}

---

### Proposed Terms

**Duration:** ${proposal.proposedTerms.duration} months

**Link Placement:**

${proposal.proposedTerms.linkPlacement.map((lp, i) => `
${i + 1}. **${lp.page}**
   - Anchor Text: "${lp.anchor}"
   - Context: ${lp.context}
`).join('\n')}

**Customizations:**

${proposal.proposedTerms.customizations.map(c => `- ${c}`).join('\n')}

${proposal.proposedTerms.referralCommission ? `
**Referral Commission:** ${proposal.proposedTerms.referralCommission}%
` : ''}

${proposal.proposedTerms.coMarketingBudget ? `
**Co-Marketing Budget:** $${proposal.proposedTerms.coMarketingBudget.toLocaleString()}
` : ''}

---

### Timeline

- **Proposal Date:** ${proposal.timeline.proposedAt.toLocaleDateString()}
- **Response By:** ${proposal.timeline.responseBy?.toLocaleDateString() || 'TBD'}
- **Proposed Start:** ${proposal.timeline.startDate?.toLocaleDateString() || 'TBD'}

---

### Next Steps

1. Review this proposal
2. Schedule discussion meeting
3. Finalize terms and agreements
4. Execute partnership agreement
5. Begin implementation

---

### Contact

For questions or to schedule a meeting, please contact:

**Partnership Team**
Disaster Recovery Platform
partnerships@disasterrecovery.com.au
+61 2 1234 5678

---

*Proposal ID: ${proposal.id}*
*Generated: ${new Date().toLocaleDateString()}*
    `.trim();
  }

  /**
   * Activate partnership
   */
  async activatePartnership(
    partnerId: string,
    terms: Partner['terms'],
    benefits: Partner['benefits']
  ): Promise<Partner> {
    const partner = this.partners.get(partnerId);
    if (!partner) {
      throw new Error('Partner not found');
    }

    partner.status = PartnershipStatus.ACTIVE;
    partner.terms = terms;
    partner.benefits = benefits;
    partner.performance = {
      backlinksEarned: 0,
      referralsReceived: 0,
      revenueGenerated: 0,
      customersSent: 0,
      lastActivity: new Date()
    };
    partner.updatedAt = new Date();

    this.partners.set(partnerId, partner);
    return partner;
  }

  /**
   * Track partnership performance
   */
  async updatePerformance(
    partnerId: string,
    metrics: Partial<NonNullable<Partner['performance']>>
  ): Promise<Partner> {
    const partner = this.partners.get(partnerId);
    if (!partner) {
      throw new Error('Partner not found');
    }

    partner.performance = {
      ...partner.performance,
      ...metrics,
      lastActivity: new Date()
    };
    partner.updatedAt = new Date();

    this.partners.set(partnerId, partner);
    return partner;
  }

  /**
   * Get partnership analytics
   */
  getPartnershipAnalytics(): {
    total: number;
    byType: Record<PartnershipType, number>;
    byStatus: Record<PartnershipStatus, number>;
    byTier: Record<PartnershipTier, number>;
    activeValue: {
      totalBacklinks: number;
      totalReferrals: number;
      totalRevenue: number;
      avgDomainAuthority: number;
    };
  } {
    const partners = Array.from(this.partners.values());
    const active = partners.filter(p => p.status === PartnershipStatus.ACTIVE);

    return {
      total: partners.length,
      byType: this.groupBy(partners, 'type'),
      byStatus: this.groupBy(partners, 'status'),
      byTier: this.groupBy(partners, 'tier'),
      activeValue: {
        totalBacklinks: active.reduce((sum, p) => sum + (p.performance?.backlinksEarned || 0), 0),
        totalReferrals: active.reduce((sum, p) => sum + (p.performance?.referralsReceived || 0), 0),
        totalRevenue: active.reduce((sum, p) => sum + (p.performance?.revenueGenerated || 0), 0),
        avgDomainAuthority: active.length > 0
          ? active.reduce((sum, p) => sum + p.organization.domainAuthority, 0) / active.length
          : 0
      }
    };
  }

  /**
   * Get partners by type
   */
  getPartnersByType(type: PartnershipType): Partner[] {
    return Array.from(this.partners.values())
      .filter(p => p.type === type)
      .sort((a, b) => b.organization.domainAuthority - a.organization.domainAuthority);
  }

  /**
   * Get partners by status
   */
  getPartnersByStatus(status: PartnershipStatus): Partner[] {
    return Array.from(this.partners.values())
      .filter(p => p.status === status);
  }

  /**
   * Get top performing partners
   */
  getTopPerformers(limit: number = 10): Partner[] {
    return Array.from(this.partners.values())
      .filter(p => p.status === PartnershipStatus.ACTIVE && p.performance)
      .sort((a, b) => {
        const scoreA = (a.performance?.revenueGenerated || 0) +
                      (a.performance?.backlinksEarned || 0) * 1000;
        const scoreB = (b.performance?.revenueGenerated || 0) +
                      (b.performance?.backlinksEarned || 0) * 1000;
        return scoreB - scoreA;
      })
      .slice(0, limit);
  }

  /**
   * Get all partners
   */
  getAllPartners(): Partner[] {
    return Array.from(this.partners.values());
  }

  /**
   * Get partner by ID
   */
  getPartner(partnerId: string): Partner | undefined {
    return this.partners.get(partnerId);
  }

  /**
   * Get all proposals
   */
  getAllProposals(): PartnershipProposal[] {
    return Array.from(this.proposals.values());
  }

  /**
   * Get proposal by ID
   */
  getProposal(proposalId: string): PartnershipProposal | undefined {
    return this.proposals.get(proposalId);
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private groupBy<T extends Record<string, any>>(
    items: T[],
    key: keyof T
  ): Record<string, number> {
    return items.reduce((acc, item) => {
      const value = String(item[key]);
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}

// ============================================================================
// Export singleton instance
// ============================================================================

export const partnershipManager = new PartnershipManager();
