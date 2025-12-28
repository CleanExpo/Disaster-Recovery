/**
 * Digital PR Campaign Manager
 *
 * Manages PR campaigns, press releases, media outreach, and campaign tracking
 * for link building and brand awareness initiatives.
 *
 * @module PRCampaignManager
 * @category SEO - Link Building
 */

import { z } from 'zod';

// ============================================================================
// Types & Schemas
// ============================================================================

/**
 * Campaign status lifecycle
 */
export enum CampaignStatus {
  PLANNING = 'planning',
  RESEARCH = 'research',
  CONTENT_CREATION = 'content_creation',
  OUTREACH = 'outreach',
  PUBLISHED = 'published',
  MONITORING = 'monitoring',
  COMPLETED = 'completed',
  ARCHIVED = 'archived'
}

/**
 * Campaign types for different PR strategies
 */
export enum CampaignType {
  RESEARCH_STUDY = 'research_study',
  DATA_VISUALIZATION = 'data_visualization',
  INDUSTRY_REPORT = 'industry_report',
  EXPERT_ROUNDUP = 'expert_roundup',
  NEWSJACKING = 'newsjacking',
  THOUGHT_LEADERSHIP = 'thought_leadership',
  SURVEY = 'survey',
  INFOGRAPHIC = 'infographic'
}

/**
 * Media contact schema
 */
export const MediaContactSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  publication: z.string(),
  publicationUrl: z.string().url().optional(),
  role: z.string(),
  beat: z.array(z.string()), // Topics they cover
  tier: z.enum(['tier1', 'tier2', 'tier3']),
  socialMedia: z.object({
    twitter: z.string().optional(),
    linkedin: z.string().optional()
  }).optional(),
  lastContact: z.date().optional(),
  responseRate: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([])
});

export type MediaContact = z.infer<typeof MediaContactSchema>;

/**
 * PR campaign schema
 */
export const PRCampaignSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  type: z.nativeEnum(CampaignType),
  status: z.nativeEnum(CampaignStatus),
  description: z.string(),
  goals: z.object({
    targetBacklinks: z.number().min(1),
    targetDomainAuthority: z.number().min(0).max(100),
    targetPublications: z.number().min(1),
    targetReach: z.number().min(0)
  }),
  content: z.object({
    title: z.string(),
    hook: z.string(),
    keyFindings: z.array(z.string()),
    dataPoints: z.array(z.object({
      metric: z.string(),
      value: z.string(),
      context: z.string()
    })),
    visualAssets: z.array(z.string()).optional()
  }),
  targeting: z.object({
    industries: z.array(z.string()),
    publications: z.array(z.string()),
    journalists: z.array(z.string()),
    geoTargets: z.array(z.string())
  }),
  timeline: z.object({
    launchDate: z.date(),
    endDate: z.date().optional(),
    milestones: z.array(z.object({
      name: z.string(),
      date: z.date(),
      completed: z.boolean().default(false)
    }))
  }),
  results: z.object({
    backlinksEarned: z.number().default(0),
    publicationsSecured: z.array(z.string()).default([]),
    totalReach: z.number().default(0),
    domainAuthorityGain: z.number().default(0),
    socialShares: z.number().default(0)
  }).optional(),
  budget: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type PRCampaign = z.infer<typeof PRCampaignSchema>;

/**
 * Press release schema
 */
export const PressReleaseSchema = z.object({
  id: z.string().uuid(),
  campaignId: z.string().uuid(),
  headline: z.string().min(1),
  subheadline: z.string().optional(),
  dateline: z.string(),
  body: z.string().min(100),
  boilerplate: z.string(),
  contactInfo: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional()
  }),
  mediaAssets: z.array(z.object({
    type: z.enum(['image', 'video', 'infographic', 'pdf']),
    url: z.string().url(),
    caption: z.string().optional()
  })).default([]),
  seoElements: z.object({
    title: z.string(),
    metaDescription: z.string(),
    keywords: z.array(z.string()),
    canonicalUrl: z.string().url().optional()
  }),
  distributionList: z.array(z.string()).default([]),
  publishedAt: z.date().optional(),
  createdAt: z.date()
});

export type PressRelease = z.infer<typeof PressReleaseSchema>;

/**
 * Media pitch schema
 */
export const MediaPitchSchema = z.object({
  id: z.string().uuid(),
  campaignId: z.string().uuid(),
  contactId: z.string().uuid(),
  subject: z.string().min(1),
  body: z.string().min(50),
  personalization: z.array(z.object({
    field: z.string(),
    value: z.string(),
    reason: z.string()
  })).optional(),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
    type: z.string()
  })).default([]),
  sentAt: z.date().optional(),
  response: z.object({
    receivedAt: z.date(),
    type: z.enum(['interested', 'not_interested', 'request_more_info', 'no_response']),
    notes: z.string().optional()
  }).optional(),
  followUpScheduled: z.date().optional(),
  createdAt: z.date()
});

export type MediaPitch = z.infer<typeof MediaPitchSchema>;

// ============================================================================
// Pre-built Campaign Templates
// ============================================================================

/**
 * Campaign template for major PR initiatives
 */
export interface CampaignTemplate {
  name: string;
  type: CampaignType;
  description: string;
  suggestedGoals: PRCampaign['goals'];
  contentOutline: {
    sections: string[];
    dataRequirements: string[];
    visualAssets: string[];
  };
  targetAudience: {
    publications: string[];
    journalists: string[];
    industries: string[];
  };
  timelineWeeks: number;
}

/**
 * Pre-defined campaign templates for the three major campaigns
 */
export const CAMPAIGN_TEMPLATES: Record<string, CampaignTemplate> = {
  trueCostOfDelays: {
    name: 'True Cost of Disaster Delays',
    type: CampaignType.RESEARCH_STUDY,
    description: 'Comprehensive research study analyzing the financial and emotional cost of delays in disaster restoration',
    suggestedGoals: {
      targetBacklinks: 50,
      targetDomainAuthority: 70,
      targetPublications: 25,
      targetReach: 500000
    },
    contentOutline: {
      sections: [
        'Executive Summary',
        'Methodology',
        'Key Findings',
        'Regional Analysis',
        'Industry Impact',
        'Recommendations',
        'Case Studies'
      ],
      dataRequirements: [
        'Average delay times by disaster type',
        'Cost per day of delay',
        'Insurance claim processing times',
        'Emotional impact survey results',
        'Business interruption costs',
        'Secondary damage statistics'
      ],
      visualAssets: [
        'Infographic: Cost breakdown',
        'Interactive map: Regional delay patterns',
        'Chart: Delay vs. total cost correlation',
        'Timeline: Typical restoration journey',
        'Video: Customer testimonials'
      ]
    },
    targetAudience: {
      publications: [
        'Domain.com.au',
        'RealEstate.com.au',
        'Australian Financial Review',
        'The Age',
        'Sydney Morning Herald',
        'Insurance News',
        'Australian Property Journal'
      ],
      journalists: [
        'Property editors',
        'Insurance reporters',
        'Business journalists',
        'Consumer affairs reporters'
      ],
      industries: [
        'Insurance',
        'Property Management',
        'Real Estate',
        'Construction',
        'Disaster Recovery'
      ]
    },
    timelineWeeks: 12
  },

  climateChangeImpact: {
    name: 'Climate Change Impact on Australian Properties',
    type: CampaignType.DATA_VISUALIZATION,
    description: 'Interactive data visualization showing climate change impact on property disaster frequency and severity',
    suggestedGoals: {
      targetBacklinks: 75,
      targetDomainAuthority: 75,
      targetPublications: 30,
      targetReach: 1000000
    },
    contentOutline: {
      sections: [
        'Climate Trends Analysis',
        'Property Risk Mapping',
        'Historical Data Comparison',
        'Future Projections',
        'Prevention Strategies',
        'Insurance Implications'
      ],
      dataRequirements: [
        'Bureau of Meteorology data',
        'Insurance claim frequency by region',
        'Disaster type trends (2000-2025)',
        'Property value impact',
        'Climate model projections',
        'Adaptation cost estimates'
      ],
      visualAssets: [
        'Interactive map: Disaster risk by postcode',
        'Time-lapse: Disaster frequency 2000-2025',
        'Chart: Property value vs. climate risk',
        'Infographic: Adaptation strategies',
        'Calculator: Property climate risk score'
      ]
    },
    targetAudience: {
      publications: [
        'ABC News',
        'The Guardian Australia',
        'Domain.com.au',
        'RealEstate.com.au',
        'Climate Council',
        'Australian Geographic',
        'The Conversation'
      ],
      journalists: [
        'Environment reporters',
        'Science journalists',
        'Property editors',
        'Data journalists',
        'Climate specialists'
      ],
      industries: [
        'Environmental Science',
        'Property Development',
        'Insurance',
        'Government',
        'Urban Planning'
      ]
    },
    timelineWeeks: 16
  },

  stateOfRestoration2025: {
    name: 'State of Restoration Industry 2025',
    type: CampaignType.INDUSTRY_REPORT,
    description: 'Comprehensive industry report on the restoration sector with market analysis, trends, and future outlook',
    suggestedGoals: {
      targetBacklinks: 40,
      targetDomainAuthority: 65,
      targetPublications: 20,
      targetReach: 250000
    },
    contentOutline: {
      sections: [
        'Industry Overview',
        'Market Size & Growth',
        'Technology Adoption',
        'Workforce Trends',
        'Competitive Landscape',
        'Regulatory Changes',
        '2026 Outlook'
      ],
      dataRequirements: [
        'Market size estimates',
        'Revenue growth rates',
        'Technology adoption rates',
        'Workforce demographics',
        'Customer satisfaction scores',
        'Average project timelines',
        'Profit margins by segment'
      ],
      visualAssets: [
        'Infographic: Industry at a glance',
        'Chart: Market size trends',
        'Graph: Technology adoption curve',
        'Table: Competitive comparison',
        'Visual: Future trends'
      ]
    },
    targetAudience: {
      publications: [
        'Master Builders Australia',
        'Housing Industry Association',
        'Australian Financial Review',
        'Business Insider Australia',
        'SmartCompany',
        'Trade media'
      ],
      journalists: [
        'Industry reporters',
        'Business journalists',
        'Trade publication editors',
        'B2B writers'
      ],
      industries: [
        'Restoration',
        'Construction',
        'Insurance',
        'Property Management',
        'Professional Services'
      ]
    },
    timelineWeeks: 10
  }
};

// ============================================================================
// PR Campaign Manager
// ============================================================================

export class PRCampaignManager {
  private campaigns: Map<string, PRCampaign> = new Map();
  private contacts: Map<string, MediaContact> = new Map();
  private pressReleases: Map<string, PressRelease> = new Map();
  private pitches: Map<string, MediaPitch> = new Map();

  /**
   * Create a new PR campaign from template or custom
   */
  async createCampaign(
    template: keyof typeof CAMPAIGN_TEMPLATES | 'custom',
    customData?: Partial<PRCampaign>
  ): Promise<PRCampaign> {
    const campaignId = this.generateId();
    const now = new Date();

    let campaign: PRCampaign;

    if (template !== 'custom' && CAMPAIGN_TEMPLATES[template]) {
      const tmpl = CAMPAIGN_TEMPLATES[template];
      campaign = {
        id: campaignId,
        name: tmpl.name,
        type: tmpl.type,
        status: CampaignStatus.PLANNING,
        description: tmpl.description,
        goals: tmpl.suggestedGoals,
        content: {
          title: tmpl.name,
          hook: tmpl.description,
          keyFindings: [],
          dataPoints: []
        },
        targeting: {
          industries: tmpl.targetAudience.industries,
          publications: tmpl.targetAudience.publications,
          journalists: tmpl.targetAudience.journalists,
          geoTargets: ['Australia']
        },
        timeline: {
          launchDate: new Date(now.getTime() + tmpl.timelineWeeks * 7 * 24 * 60 * 60 * 1000),
          milestones: this.generateMilestones(tmpl.timelineWeeks)
        },
        results: {
          backlinksEarned: 0,
          publicationsSecured: [],
          totalReach: 0,
          domainAuthorityGain: 0,
          socialShares: 0
        },
        createdAt: now,
        updatedAt: now
      };
    } else {
      // Custom campaign
      if (!customData) {
        throw new Error('Custom campaign requires data');
      }
      campaign = PRCampaignSchema.parse({
        ...customData,
        id: campaignId,
        createdAt: now,
        updatedAt: now
      });
    }

    this.campaigns.set(campaignId, campaign);
    return campaign;
  }

  /**
   * Generate press release from campaign data
   */
  async generatePressRelease(campaignId: string): Promise<PressRelease> {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const pressReleaseId = this.generateId();
    const now = new Date();

    const pressRelease: PressRelease = {
      id: pressReleaseId,
      campaignId,
      headline: this.generateHeadline(campaign),
      subheadline: this.generateSubheadline(campaign),
      dateline: this.generateDateline(),
      body: this.generatePressReleaseBody(campaign),
      boilerplate: this.generateBoilerplate(),
      contactInfo: {
        name: 'Media Relations',
        email: 'media@disasterrecovery.com.au',
        phone: '+61 2 1234 5678'
      },
      mediaAssets: [],
      seoElements: {
        title: campaign.content.title,
        metaDescription: campaign.description,
        keywords: campaign.targeting.industries
      },
      distributionList: [],
      createdAt: now
    };

    this.pressReleases.set(pressReleaseId, pressRelease);
    return pressRelease;
  }

  /**
   * Generate personalized media pitch
   */
  async generateMediaPitch(
    campaignId: string,
    contactId: string,
    customization?: Partial<MediaPitch>
  ): Promise<MediaPitch> {
    const campaign = this.campaigns.get(campaignId);
    const contact = this.contacts.get(contactId);

    if (!campaign || !contact) {
      throw new Error('Campaign or contact not found');
    }

    const pitchId = this.generateId();
    const now = new Date();

    const pitch: MediaPitch = {
      id: pitchId,
      campaignId,
      contactId,
      subject: this.generatePitchSubject(campaign, contact),
      body: this.generatePitchBody(campaign, contact),
      personalization: this.generatePersonalization(campaign, contact),
      attachments: [],
      createdAt: now,
      ...customization
    };

    this.pitches.set(pitchId, pitch);
    return pitch;
  }

  /**
   * Add media contact
   */
  async addMediaContact(contact: Omit<MediaContact, 'id'>): Promise<MediaContact> {
    const contactId = this.generateId();
    const fullContact: MediaContact = {
      ...contact,
      id: contactId
    };

    MediaContactSchema.parse(fullContact);
    this.contacts.set(contactId, fullContact);
    return fullContact;
  }

  /**
   * Track campaign results
   */
  async updateCampaignResults(
    campaignId: string,
    results: Partial<PRCampaign['results']>
  ): Promise<PRCampaign> {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    campaign.results = {
      ...campaign.results,
      ...results
    };
    campaign.updatedAt = new Date();

    this.campaigns.set(campaignId, campaign);
    return campaign;
  }

  /**
   * Get campaign analytics
   */
  async getCampaignAnalytics(campaignId: string): Promise<{
    campaign: PRCampaign;
    performance: {
      goalProgress: {
        backlinks: number;
        publications: number;
        reach: number;
        domainAuthority: number;
      };
      outreachMetrics: {
        pitchesSent: number;
        responseRate: number;
        conversionRate: number;
      };
      roi: {
        backlinksPerDollar: number;
        reachPerDollar: number;
        estimatedValue: number;
      };
    };
  }> {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const pitches = Array.from(this.pitches.values())
      .filter(p => p.campaignId === campaignId);

    const responses = pitches.filter(p => p.response);
    const interested = responses.filter(p => p.response?.type === 'interested');

    return {
      campaign,
      performance: {
        goalProgress: {
          backlinks: (campaign.results?.backlinksEarned || 0) / campaign.goals.targetBacklinks * 100,
          publications: (campaign.results?.publicationsSecured.length || 0) / campaign.goals.targetPublications * 100,
          reach: (campaign.results?.totalReach || 0) / campaign.goals.targetReach * 100,
          domainAuthority: campaign.results?.domainAuthorityGain || 0
        },
        outreachMetrics: {
          pitchesSent: pitches.length,
          responseRate: pitches.length > 0 ? (responses.length / pitches.length * 100) : 0,
          conversionRate: pitches.length > 0 ? (interested.length / pitches.length * 100) : 0
        },
        roi: {
          backlinksPerDollar: campaign.budget ? (campaign.results?.backlinksEarned || 0) / campaign.budget : 0,
          reachPerDollar: campaign.budget ? (campaign.results?.totalReach || 0) / campaign.budget : 0,
          estimatedValue: this.calculateBacklinkValue(campaign)
        }
      }
    };
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateMilestones(weeks: number): PRCampaign['timeline']['milestones'] {
    const milestones = [
      { name: 'Research & Data Collection', weekOffset: Math.floor(weeks * 0.2) },
      { name: 'Content Creation', weekOffset: Math.floor(weeks * 0.4) },
      { name: 'Design & Visualization', weekOffset: Math.floor(weeks * 0.6) },
      { name: 'Media Outreach', weekOffset: Math.floor(weeks * 0.8) },
      { name: 'Launch', weekOffset: weeks }
    ];

    const now = new Date();
    return milestones.map(m => ({
      name: m.name,
      date: new Date(now.getTime() + m.weekOffset * 7 * 24 * 60 * 60 * 1000),
      completed: false
    }));
  }

  private generateHeadline(campaign: PRCampaign): string {
    const headlines: Record<CampaignType, (c: PRCampaign) => string> = {
      [CampaignType.RESEARCH_STUDY]: (c) =>
        `New Study Reveals: ${c.content.title}`,
      [CampaignType.DATA_VISUALIZATION]: (c) =>
        `Interactive Data Shows: ${c.content.title}`,
      [CampaignType.INDUSTRY_REPORT]: (c) =>
        `${c.content.title}: Key Insights for ${new Date().getFullYear()}`,
      [CampaignType.EXPERT_ROUNDUP]: (c) =>
        `Industry Experts Weigh In: ${c.content.title}`,
      [CampaignType.NEWSJACKING]: (c) =>
        `${c.content.title}: Expert Analysis`,
      [CampaignType.THOUGHT_LEADERSHIP]: (c) =>
        `${c.content.title}: A New Perspective`,
      [CampaignType.SURVEY]: (c) =>
        `National Survey Finds: ${c.content.title}`,
      [CampaignType.INFOGRAPHIC]: (c) =>
        `${c.content.title}: By the Numbers`
    };

    return headlines[campaign.type](campaign);
  }

  private generateSubheadline(campaign: PRCampaign): string {
    return campaign.content.hook;
  }

  private generateDateline(): string {
    const now = new Date();
    const cities = ['SYDNEY', 'MELBOURNE', 'BRISBANE', 'PERTH', 'ADELAIDE'];
    const city = cities[Math.floor(Math.random() * cities.length)];

    return `${city}, Australia - ${now.toLocaleDateString('en-AU', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })}`;
  }

  private generatePressReleaseBody(campaign: PRCampaign): string {
    return `
${campaign.description}

${campaign.content.keyFindings.length > 0 ? `
Key Findings:
${campaign.content.keyFindings.map((f, i) => `${i + 1}. ${f}`).join('\n')}
` : ''}

${campaign.content.dataPoints.length > 0 ? `
Notable Data Points:
${campaign.content.dataPoints.map(d => `• ${d.metric}: ${d.value} - ${d.context}`).join('\n')}
` : ''}

For more information, visit: https://disasterrecovery.com.au/research/${campaign.id}
    `.trim();
  }

  private generateBoilerplate(): string {
    return `
About Disaster Recovery Platform

Disaster Recovery Platform is Australia's leading network connecting property owners with verified, high-quality restoration professionals. Our mission is to accelerate disaster recovery through technology, transparency, and trust. With advanced AI-powered matching and comprehensive project management tools, we help thousands of Australians rebuild faster after disasters.

For more information, visit: https://disasterrecovery.com.au
    `.trim();
  }

  private generatePitchSubject(campaign: PRCampaign, contact: MediaContact): string {
    const subjectTemplates = [
      `Exclusive: ${campaign.content.title} [Data for ${contact.publication}]`,
      `New Research: ${campaign.content.title} - ${contact.name}`,
      `Story Idea: ${campaign.content.title} [${contact.beat[0]}]`,
      `${contact.publication} readers: ${campaign.content.title}`
    ];

    return subjectTemplates[Math.floor(Math.random() * subjectTemplates.length)];
  }

  private generatePitchBody(campaign: PRCampaign, contact: MediaContact): string {
    return `
Hi ${contact.name},

I hope this email finds you well. I've been following your work at ${contact.publication}, particularly your coverage of ${contact.beat[0] || 'industry news'}.

I wanted to reach out with an exclusive story opportunity that I think would resonate with your readers:

${campaign.content.title}

${campaign.content.hook}

${campaign.content.keyFindings.slice(0, 3).map((f, i) => `${i + 1}. ${f}`).join('\n')}

We have comprehensive data, visualizations, and expert commentary available. I'd be happy to provide exclusive access before the broader launch.

Would you be interested in discussing this further?

Best regards,
Media Relations Team
Disaster Recovery Platform
    `.trim();
  }

  private generatePersonalization(campaign: PRCampaign, contact: MediaContact): MediaPitch['personalization'] {
    return [
      {
        field: 'publication',
        value: contact.publication,
        reason: 'Tailored to publication audience'
      },
      {
        field: 'beat',
        value: contact.beat.join(', '),
        reason: 'Aligned with journalist coverage areas'
      },
      {
        field: 'tier',
        value: contact.tier,
        reason: 'Pitch complexity matches outlet tier'
      }
    ];
  }

  private calculateBacklinkValue(campaign: PRCampaign): number {
    // Estimate backlink value based on domain authority
    const avgDomainAuthority = 60; // Conservative estimate
    const valuePerBacklink = avgDomainAuthority * 10; // $10 per DA point
    return (campaign.results?.backlinksEarned || 0) * valuePerBacklink;
  }

  /**
   * Get all campaigns
   */
  getAllCampaigns(): PRCampaign[] {
    return Array.from(this.campaigns.values());
  }

  /**
   * Get campaign by ID
   */
  getCampaign(campaignId: string): PRCampaign | undefined {
    return this.campaigns.get(campaignId);
  }

  /**
   * Get all media contacts
   */
  getAllContacts(): MediaContact[] {
    return Array.from(this.contacts.values());
  }

  /**
   * Get contact by ID
   */
  getContact(contactId: string): MediaContact | undefined {
    return this.contacts.get(contactId);
  }

  /**
   * Get all pitches for a campaign
   */
  getCampaignPitches(campaignId: string): MediaPitch[] {
    return Array.from(this.pitches.values())
      .filter(p => p.campaignId === campaignId);
  }

  /**
   * Update pitch response
   */
  async updatePitchResponse(
    pitchId: string,
    response: MediaPitch['response']
  ): Promise<MediaPitch> {
    const pitch = this.pitches.get(pitchId);
    if (!pitch) {
      throw new Error('Pitch not found');
    }

    pitch.response = response;
    this.pitches.set(pitchId, pitch);

    // Update contact response rate
    const contact = this.contacts.get(pitch.contactId);
    if (contact) {
      const contactPitches = Array.from(this.pitches.values())
        .filter(p => p.contactId === contact.id);
      const responses = contactPitches.filter(p => p.response);
      contact.responseRate = (responses.length / contactPitches.length) * 100;
      contact.lastContact = new Date();
      this.contacts.set(contact.id, contact);
    }

    return pitch;
  }
}

// ============================================================================
// Export singleton instance
// ============================================================================

export const prCampaignManager = new PRCampaignManager();
