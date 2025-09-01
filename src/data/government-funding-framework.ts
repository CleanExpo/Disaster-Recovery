/**
 * Government Funding and Industry Recognition Framework
 * Australian Startup Support Programs - 2025
 */

export interface FundingProgram {
  id: string
  name: string
  authority: string
  minGrant: number
  maxGrant: number
  totalPool: number
  eligibility: string[]
  focusAreas: string[]
  applicationStatus: 'Open' | 'Closed' | 'Periodic'
  coveragePercent: number
  duration: string
}

export interface IndustryRecognitionStep {
  id: string
  phase: string
  authority: string
  duration: string
  cost: string
  requirements: string[]
  deliverables: string[]
}

export const MAJOR_FUNDING_PROGRAMS: FundingProgram[] = [
  {
    id: 'IGP-ECG',
    name: 'Industry Growth Program - Early-Stage Commercialisation',
    authority: 'Department of Industry, Science and Resources',
    minGrant: 50000,
    maxGrant: 250000,
    totalPool: 2400000000,
    eligibility: [
      'SMEs in National Reconstruction Fund priority areas',
      'Technology commercialisation projects',
      'Innovative manufacturing solutions'
    ],
    focusAreas: [
      'Emergency response technology',
      'Climate resilience solutions',
      'Advanced manufacturing'
    ],
    applicationStatus: 'Open',
    coveragePercent: 50,
    duration: '12-24 months'
  },
  {
    id: 'IGP-CG',
    name: 'Industry Growth Program - Commercialisation and Growth',
    authority: 'Department of Industry, Science and Resources',
    minGrant: 100000,
    maxGrant: 5000000,
    totalPool: 2400000000,
    eligibility: [
      'Established SMEs with proven technology',
      'Export-ready businesses',
      'High-growth potential companies'
    ],
    focusAreas: [
      'Disaster recovery technology',
      'AI and automation solutions',
      'Professional services innovation'
    ],
    applicationStatus: 'Open',
    coveragePercent: 50,
    duration: '24-36 months'
  },
  {
    id: 'CEI-SS',
    name: 'Clean Energy Innovation - Solar Sunshot Program',
    authority: 'Australian Renewable Energy Agency (ARENA)',
    minGrant: 1000000,
    maxGrant: 50000000,
    totalPool: 500000000,
    eligibility: [
      'Solar technology manufacturers',
      'Clean energy innovators',
      'Sustainable technology developers'
    ],
    focusAreas: [
      'Solar manufacturing technology',
      'Clean energy storage',
      'Sustainable restoration equipment'
    ],
    applicationStatus: 'Open',
    coveragePercent: 50,
    duration: '36-60 months'
  },
  {
    id: 'DIG-ALL',
    name: 'Defence Industry Development Grants',
    authority: 'Department of Defence',
    minGrant: 50000,
    maxGrant: 1000000,
    totalPool: 169100000,
    eligibility: [
      'Defence industry suppliers',
      'Technology innovation companies',
      'Emergency response specialists'
    ],
    focusAreas: [
      'Emergency response capabilities',
      'Disaster recovery technology',
      'Critical infrastructure protection'
    ],
    applicationStatus: 'Open',
    coveragePercent: 50,
    duration: '12-36 months'
  },
  {
    id: 'CSIRO-KS',
    name: 'CSIRO Kick-Start Program',
    authority: 'Commonwealth Scientific and Industrial Research Organisation',
    minGrant: 10000,
    maxGrant: 50000,
    totalPool: 20000000,
    eligibility: [
      'Early-stage companies',
      'Research collaboration projects',
      'Innovation-focused SMEs'
    ],
    focusAreas: [
      'Advanced restoration techniques',
      'Scientific research collaboration',
      'Technology validation'
    ],
    applicationStatus: 'Open',
    coveragePercent: 100,
    duration: '6-12 months'
  }
]

export const STATE_FUNDING_PROGRAMS: FundingProgram[] = [
  {
    id: 'NSW-MVP',
    name: 'NSW MVP Ventures Program',
    authority: 'Investment NSW',
    minGrant: 25000,
    maxGrant: 200000,
    totalPool: 50000000,
    eligibility: [
      'NSW-based startups',
      'Early-stage technology companies',
      'Innovation-driven businesses'
    ],
    focusAreas: [
      'Technology commercialisation',
      'Market validation',
      'Product development'
    ],
    applicationStatus: 'Periodic',
    coveragePercent: 50,
    duration: '12-18 months'
  },
  {
    id: 'NSW-RED',
    name: 'NSW Regional Economic Development Program',
    authority: 'Regional NSW',
    minGrant: 250000,
    maxGrant: 5000000,
    totalPool: 100000000,
    eligibility: [
      'Regional NSW businesses',
      'Job creation projects',
      'Economic development initiatives'
    ],
    focusAreas: [
      'Regional development',
      'Employment generation',
      'Infrastructure development'
    ],
    applicationStatus: 'Open',
    coveragePercent: 50,
    duration: '24-48 months'
  },
  {
    id: 'QLD-CS',
    name: 'Queensland Career Start Program',
    authority: 'Department of Employment, Small Business and Training',
    minGrant: 5000,
    maxGrant: 25000,
    totalPool: 10000000,
    eligibility: [
      'Queensland employers',
      'Training providers',
      'Apprenticeship programs'
    ],
    focusAreas: [
      'Skills development',
      'Professional training',
      'Workforce development'
    ],
    applicationStatus: 'Open',
    coveragePercent: 100,
    duration: '12-24 months'
  }
]

export const INDUSTRY_RECOGNITION_PATHWAY: IndustryRecognitionStep[] = [
  {
    id: 'ANZSIC-1',
    phase: 'ANZSIC Classification Application',
    authority: 'Australian Bureau of Statistics',
    duration: '12-24 months',
    cost: 'No direct cost (ABS-managed)',
    requirements: [
      'Demonstrate economic significance',
      'Statistical need assessment',
      'International alignment analysis',
      'Industry consultation process'
    ],
    deliverables: [
      'Economic impact analysis',
      'Industry classification proposal',
      'Stakeholder consultation report',
      'Statistical framework document'
    ]
  },
  {
    id: 'TRAIN-1',
    phase: 'Training Package Enhancement',
    authority: 'Skills Service Organisation / Australian Skills Quality Authority',
    duration: '18-36 months',
    cost: '$100,000 - $500,000+',
    requirements: [
      'Industry consultation',
      'Skills gap analysis',
      'Employer validation',
      'Training pathway development'
    ],
    deliverables: [
      'Enhanced CPP40421 curriculum',
      'Assessment frameworks',
      'Training provider guidelines',
      'Quality assurance protocols'
    ]
  },
  {
    id: 'STANDARDS-1',
    phase: 'Australian Standards Development',
    authority: 'Standards Australia',
    duration: '12-18 months',
    cost: '$15,000 - $50,000+',
    requirements: [
      'Industry consensus',
      'Technical expertise',
      'Public benefit demonstration',
      'International standards alignment'
    ],
    deliverables: [
      'Restoration methodology standards',
      'Safety protocol frameworks',
      'Equipment certification standards',
      'Quality assurance guidelines'
    ]
  },
  {
    id: 'REG-1',
    phase: 'Professional Registration Framework',
    authority: 'State and Territory Governments',
    duration: '24-48 months',
    cost: '$50,000 - $200,000',
    requirements: [
      'Professional competency standards',
      'Registration system development',
      'Mutual recognition agreements',
      'Continuing professional development'
    ],
    deliverables: [
      'Professional registration system',
      'Competency assessment framework',
      'Interstate recognition agreements',
      'Professional development programs'
    ]
  }
]

export const CPP40421_SPECIALISATIONS = {
  code: 'CPP40421',
  title: 'Certificate IV in Cleaning',
  specialisations: [
    {
      name: 'Cleaning Management',
      focus: 'Leadership and operational management in cleaning services'
    },
    {
      name: 'Specialty Cleaning and Restoration',
      focus: 'Advanced restoration techniques and hazardous material handling',
      coverageAreas: [
        'Fire, smoke and water damage restoration',
        'Mould remediation',
        'Clandestine drug laboratory decontamination',
        'Trauma and crime scene cleaning',
        'High-level technical restoration skills'
      ]
    }
  ],
  currentProviders: {
    queensland: 8,
    national: 25,
    status: 'Nationally recognised qualification'
  }
}

export const FUNDING_STRATEGY = {
  primaryTarget: {
    program: 'Industry Growth Program - Commercialisation Grant',
    amount: '$1M - $5M',
    focus: 'Technology solutions for restoration industry',
    justification: 'Innovation in remediation techniques with export potential'
  },
  secondaryTargets: [
    {
      program: 'Business Research and Innovation Initiative',
      amount: 'Up to $1M',
      focus: 'Government challenges in emergency response and public health'
    },
    {
      program: 'CSIRO Kick-Start Program',
      amount: '$10K - $50K',
      focus: 'Research collaboration on advanced restoration techniques'
    }
  ],
  economicJustification: [
    'Multi-billion dollar annual property damage restoration market',
    'Creation of thousands of skilled jobs',
    'Reduction in insurance costs through professional standards',
    'Climate resilience through professional flood and fire damage expertise'
  ]
}

export const IMPLEMENTATION_TIMELINE = {
  'Phase 1: Foundation Building': {
    duration: 'Months 1-12',
    activities: [
      'Establish professional industry association',
      'Conduct comprehensive market research',
      'Document skills shortages and training gaps',
      'Engage with Safe Work Australia and insurance stakeholders'
    ]
  },
  'Phase 2: Regulatory Engagement': {
    duration: 'Months 6-18',
    activities: [
      'Submit ANZSIC classification application',
      'Propose training package enhancements',
      'Initiate Australian Standards development',
      'Build industry stakeholder consensus'
    ]
  },
  'Phase 3: Government Recognition': {
    duration: 'Months 12-24',
    activities: [
      'Secure enhanced trade recognition status',
      'Develop apprenticeship pathways',
      'Establish mutual recognition agreements',
      'Create professional registration framework'
    ]
  },
  'Phase 4: Industry Establishment': {
    duration: 'Months 18-36',
    activities: [
      'Achieve full ANZSIC classification',
      'Launch professional registration system',
      'Implement quality standards framework',
      'Establish preferred contractor programs'
    ]
  }
}

export const COMPETITIVE_ADVANTAGES = [
  {
    title: 'Regulatory Moat',
    description: 'Government-backed industry standards create competitive barriers',
    impact: 'First-mover advantage in establishing industry requirements'
  },
  {
    title: 'Revenue Diversification',
    description: 'Training, certification, and accreditation revenue streams',
    impact: 'Multiple income sources beyond core restoration services'
  },
  {
    title: 'Market Authority',
    description: 'Government recognition positions company as industry standard',
    impact: 'Enhanced credibility and preferred contractor status'
  },
  {
    title: 'Scalable Framework',
    description: 'Model replicable across other professional service industries',
    impact: 'Platform for expansion into adjacent markets'
  }
]