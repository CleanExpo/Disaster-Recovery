// SEO Keyword Strategy Generator
// Targeting low competition, high-intent keywords for #1 rankings

export interface KeywordOpportunity {
  keyword: string;
  searchVolume: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  intent: 'Commercial' | 'Informational' | 'Transactional' | 'Navigational';
  cpc: string;
  trend: 'Rising' | 'Stable' | 'Declining';
  localModifier?: boolean;
}

// Low Competition, High-Value Keywords by Category
export const easyWinKeywords = {
  // Ultra-Specific Problem Keywords (Very Easy to Rank)
  emergencySpecific: [
    {
      keyword: 'ceiling dripping water middle night',
      searchVolume: '50-100/mo',
      difficulty: 'Easy' as const,
      intent: 'Transactional' as const,
      cpc: '$15-25',
      trend: 'Stable' as const
    },
    {
      keyword: 'toilet overflowing sewage carpet',
      searchVolume: '100-200/mo',
      difficulty: 'Easy' as const,
      intent: 'Transactional' as const,
      cpc: '$20-30',
      trend: 'Rising' as const
    },
    {
      keyword: 'black spots bathroom ceiling spreading',
      searchVolume: '200-300/mo',
      difficulty: 'Easy' as const,
      intent: 'Commercial' as const,
      cpc: '$10-20',
      trend: 'Rising' as const
    },
    {
      keyword: 'musty smell walls after rain',
      searchVolume: '150-250/mo',
      difficulty: 'Easy' as const,
      intent: 'Commercial' as const,
      cpc: '$12-22',
      trend: 'Stable' as const
    },
    {
      keyword: 'water bubbling through paint',
      searchVolume: '100-150/mo',
      difficulty: 'Easy' as const,
      intent: 'Transactional' as const,
      cpc: '$18-28',
      trend: 'Rising' as const
    }
  ],

  // Question-Based Keywords (Featured Snippet Opportunities)
  questions: [
    {
      keyword: 'why does my house smell musty after rain',
      searchVolume: '500-700/mo',
      difficulty: 'Easy' as const,
      intent: 'Informational' as const,
      cpc: '$5-10',
      trend: 'Rising' as const
    },
    {
      keyword: 'is black mould covered by insurance australia',
      searchVolume: '300-400/mo',
      difficulty: 'Easy' as const,
      intent: 'Commercial' as const,
      cpc: '$8-15',
      trend: 'Stable' as const
    },
    {
      keyword: 'how long before water damage causes mould',
      searchVolume: '400-500/mo',
      difficulty: 'Easy' as const,
      intent: 'Informational' as const,
      cpc: '$6-12',
      trend: 'Rising' as const
    },
    {
      keyword: 'can i stay home during mould removal',
      searchVolume: '200-300/mo',
      difficulty: 'Easy' as const,
      intent: 'Commercial' as const,
      cpc: '$10-18',
      trend: 'Stable' as const
    },
    {
      keyword: 'who pays for water damage tenant or landlord',
      searchVolume: '600-800/mo',
      difficulty: 'Medium' as const,
      intent: 'Informational' as const,
      cpc: '$4-8',
      trend: 'Rising' as const
    }
  ],

  // Cost-Related Keywords (High Commercial Intent)
  costKeywords: [
    {
      keyword: 'water damage restoration cost per square metre',
      searchVolume: '100-200/mo',
      difficulty: 'Easy' as const,
      intent: 'Commercial' as const,
      cpc: '$15-25',
      trend: 'Rising' as const
    },
    {
      keyword: 'mould removal cost 3 bedroom house',
      searchVolume: '150-250/mo',
      difficulty: 'Easy' as const,
      intent: 'Commercial' as const,
      cpc: '$12-20',
      trend: 'Stable' as const
    },
    {
      keyword: 'insurance excess vs repair cost water damage',
      searchVolume: '80-120/mo',
      difficulty: 'Easy' as const,
      intent: 'Commercial' as const,
      cpc: '$10-18',
      trend: 'Rising' as const
    },
    {
      keyword: 'free mould inspection near me',
      searchVolume: '300-400/mo',
      difficulty: 'Medium' as const,
      intent: 'Transactional' as const,
      cpc: '$20-30',
      trend: 'Rising' as const
    },
    {
      keyword: 'emergency water extraction pricing',
      searchVolume: '50-100/mo',
      difficulty: 'Easy' as const,
      intent: 'Transactional' as const,
      cpc: '$25-35',
      trend: 'Stable' as const
    }
  ],

  // Time-Sensitive Keywords
  urgentKeywords: [
    {
      keyword: 'water damage restoration open now',
      searchVolume: '200-300/mo',
      difficulty: 'Easy' as const,
      intent: 'Transactional' as const,
      cpc: '$30-45',
      trend: 'Rising' as const
    },
    {
      keyword: 'after hours flood emergency',
      searchVolume: '100-150/mo',
      difficulty: 'Easy' as const,
      intent: 'Transactional' as const,
      cpc: '$35-50',
      trend: 'Stable' as const
    },
    {
      keyword: 'sunday water damage help',
      searchVolume: '50-100/mo',
      difficulty: 'Easy' as const,
      intent: 'Transactional' as const,
      cpc: '$40-55',
      trend: 'Rising' as const
    },
    {
      keyword: 'public holiday emergency restoration',
      searchVolume: '30-50/mo',
      difficulty: 'Easy' as const,
      intent: 'Transactional' as const,
      cpc: '$45-60',
      trend: 'Stable' as const
    },
    {
      keyword: 'same day water extraction service',
      searchVolume: '150-200/mo',
      difficulty: 'Easy' as const,
      intent: 'Transactional' as const,
      cpc: '$25-40',
      trend: 'Rising' as const
    }
  ],

  // Insurance-Specific Keywords
  insuranceKeywords: [
    {
      keyword: 'water damage claim denied what now',
      searchVolume: '100-150/mo',
      difficulty: 'Easy' as const,
      intent: 'Commercial' as const,
      cpc: '$8-15',
      trend: 'Rising' as const
    },
    {
      keyword: 'gradual water damage insurance claim',
      searchVolume: '80-120/mo',
      difficulty: 'Easy' as const,
      intent: 'Informational' as const,
      cpc: '$6-12',
      trend: 'Stable' as const
    },
    {
      keyword: 'insurance preferred repairer water damage',
      searchVolume: '150-200/mo',
      difficulty: 'Easy' as const,
      intent: 'Commercial' as const,
      cpc: '$10-18',
      trend: 'Rising' as const
    },
    {
      keyword: 'make safe certificate water damage',
      searchVolume: '50-80/mo',
      difficulty: 'Easy' as const,
      intent: 'Transactional' as const,
      cpc: '$15-25',
      trend: 'Stable' as const
    },
    {
      keyword: 'scope of works template water damage',
      searchVolume: '100-150/mo',
      difficulty: 'Easy' as const,
      intent: 'Informational' as const,
      cpc: '$5-10',
      trend: 'Rising' as const
    }
  ],

  // Comparison Keywords (Decision Stage)
  comparisonKeywords: [
    {
      keyword: 'restoration vs replacement after water damage',
      searchVolume: '80-120/mo',
      difficulty: 'Easy' as const,
      intent: 'Commercial' as const,
      cpc: '$8-15',
      trend: 'Stable' as const
    },
    {
      keyword: 'diy vs professional mould removal',
      searchVolume: '200-300/mo',
      difficulty: 'Easy' as const,
      intent: 'Commercial' as const,
      cpc: '$10-18',
      trend: 'Rising' as const
    },
    {
      keyword: 'bleach vs professional mould treatment',
      searchVolume: '150-200/mo',
      difficulty: 'Easy' as const,
      intent: 'Commercial' as const,
      cpc: '$7-14',
      trend: 'Stable' as const
    },
    {
      keyword: 'dehumidifier vs professional drying',
      searchVolume: '100-150/mo',
      difficulty: 'Easy' as const,
      intent: 'Commercial' as const,
      cpc: '$9-16',
      trend: 'Rising' as const
    }
  ]
};

// Generate Location-Specific Keywords
export function generateLocationKeywords(suburb: string, city: string, state: string): KeywordOpportunity[] {
  const templates = [
    // Ultra-specific local
    `${suburb} water damage today`,
    `${suburb} emergency mould removal`,
    `${suburb} flood restoration near me`,
    `${suburb} ceiling leak repair`,
    `water damage ${suburb} insurance approved`,
    
    // Service + location + modifier
    `24 hour water damage ${suburb}`,
    `same day mould inspection ${suburb}`,
    `emergency flood response ${suburb}`,
    `weekend water extraction ${suburb}`,
    `after hours restoration ${suburb}`
  ];
  
  return templates.map(template => ({
    keyword: template,
    searchVolume: '10-50/mo',
    difficulty: 'Easy' as const,
    intent: 'Transactional' as const,
    cpc: '$20-35',
    trend: 'Stable' as const,
    localModifier: true
  }));
}

// Generate Question Keywords for Featured Snippets
export function generateQuestionKeywords(service: string): string[] {
  const questionStarters = [
    'what causes',
    'how to fix',
    'when to call',
    'why does',
    'can i claim',
    'is it safe',
    'how much cost',
    'how long take',
    'who pays for',
    'what happens if'
  ];
  
  const problems = [
    'water damage',
    'black mould',
    'ceiling leak',
    'wet carpet',
    'musty smell',
    'bathroom mould',
    'flood damage',
    'burst pipe',
    'sewage backup',
    'storm damage'
  ];
  
  const modifiers = [
    'in apartment',
    'rental property',
    'after storm',
    'insurance claim',
    'health risk',
    'immediately',
    'myself',
    'australia',
    'queensland',
    'brisbane'
  ];
  
  const questions: string[] = [];
  
  questionStarters.forEach(start => {
    problems.forEach(problem => {
      modifiers.forEach(modifier => {
        questions.push(`${start} ${problem} ${modifier}`);
      });
    });
  });
  
  return questions;
}

// Generate Semantic Variations
export function generateSemanticVariations(primaryKeyword: string): string[] {
  const variations: { [key: string]: string[] } = {
    'water damage': ['water damage', 'flood damage', 'water restoration', 'flood restoration', 'water mitigation', 'flood cleanup'],
    'mould': ['mould', 'mould', 'black mould', 'toxic mould', 'mildew', 'fungus'],
    'removal': ['removal', 'remediation', 'cleanup', 'treatment', 'elimination', 'extraction'],
    'emergency': ['emergency', 'urgent', 'immediate', 'same day', '24 hour', 'after hours'],
    'restoration': ['restoration', 'repair', 'recovery', 'cleanup', 'remediation', 'mitigation'],
    'service': ['service', 'company', 'specialist', 'expert', 'professional', 'contractor'],
    'cost': ['cost', 'price', 'quote', 'estimate', 'pricing', 'rates'],
    'insurance': ['insurance', 'claim', 'coverage', 'approved', 'preferred', 'insurer']
  };
  
  let result = primaryKeyword;
  
  Object.keys(variations).forEach(term => {
    if (primaryKeyword.includes(term)) {
      const alternatives = variations[term];
      const randomAlternative = alternatives[Math.floor(Math.random() * alternatives.length)];
      result = result.replace(term, randomAlternative);
    }
  });
  
  return [primaryKeyword, result];
}

// Content Optimisation Suggestions
export function getContentOptimizationTips(keyword: KeywordOpportunity): string[] {
  const tips: string[] = [];
  
  if (keyword.intent === 'Transactional') {
    tips.push('Include clear CTAs above the fold');
    tips.push('Add phone number in title and H1');
    tips.push('Include "Open Now" or "24/7" messaging');
    tips.push('Add schema markup for LocalBusiness');
    tips.push('Include pricing or "Free Quote" messaging');
  }
  
  if (keyword.intent === 'Commercial') {
    tips.push('Include detailed service descriptions');
    tips.push('Add comparison tables');
    tips.push('Include case studies and examples');
    tips.push('Add FAQ section targeting the keyword');
    tips.push('Include trust signals and certifications');
  }
  
  if (keyword.intent === 'Informational') {
    tips.push('Create comprehensive guide format');
    tips.push('Include step-by-step instructions');
    tips.push('Add images and diagrams');
    tips.push('Target featured snippet format');
    tips.push('Include related questions section');
  }
  
  if (keyword.difficulty === 'Easy') {
    tips.push('Create dedicated landing page');
    tips.push('Aim for 1500+ words of unique content');
    tips.push('Include keyword in URL slug');
    tips.push('Add keyword variations in H2/H3 tags');
  }
  
  if (keyword.localModifier) {
    tips.push('Include full address and service area');
    tips.push('Add Google Maps embed');
    tips.push('Include local landmarks and suburbs');
    tips.push('Add local case studies and reviews');
  }
  
  return tips;
}

// Generate Meta Title Variations
export function generateMetaTitles(keyword: string, location?: string): string[] {
  const templates = [
    `${keyword} | 24/7 Emergency Service | Use Our Online Form`,
    `${keyword} - Same Day Response ${location ? `in ${location}` : ''} | Free Quote`,
    `Professional ${keyword} | Insurance Approved | Available Now`,
    `${keyword} Experts | ${location ? location + ' ' : ''}Certified & Insured`,
    `Emergency ${keyword} | Open Now | Direct Insurance Billing`,
    `${keyword} Near Me | 5-Star Rated | 30min Response`,
    `#1 ${keyword} Service ${location ? `in ${location}` : ''} | Submit Form Now`,
    `${keyword} Today | Free Assessment | Licensed Professionals`
  ];
  
  return templates;
}

// Generate Meta Descriptions
export function generateMetaDescriptions(keyword: string, location?: string): string[] {
  const templates = [
    `Professional ${keyword} services ${location ? `in ${location}` : ''}. 24/7 emergency response, insurance approved, certified technicians. Use Our Online Form`,
    `Need ${keyword}? Same-day service, free quotes, direct insurance billing. ${location ? `Servicing all ${location} areas` : 'nationwide coverage'}. Available now - 1300 814 870.`,
    `Expert ${keyword} with 30-minute response time. IICRC certified, 100% guarantee, insurance claims handled. ${location ? location + ' locals' : 'Australian'} trust us. Use Our Online Form`,
    `Emergency ${keyword} available 24/7. Professional assessment, competitive pricing, insurance approved. ${location ? `All ${location} suburbs` : 'All areas'} covered. 1300 814 870.`,
    `Fast, reliable ${keyword} service. Free inspection, written quotes, direct insurance billing. ${location ? `${location}'s` : "Australia's"} trusted restoration experts. Get Help Now 1300 814 870.`
  ];
  
  return templates;
}

// Generate Content Headers Structure
export function generateContentStructure(keyword: string): any {
  return {
    h1: keyword.charAt(0).toUpperCase() + keyword.slice(1),
    h2Tags: [
      `What Causes ${keyword}?`,
      `Signs You Need Professional ${keyword} Services`,
      `Our ${keyword} Process`,
      `${keyword} Cost Guide`,
      `Insurance Coverage for ${keyword}`,
      `Why Choose Our ${keyword} Service`,
      `${keyword} FAQs`
    ],
    h3Tags: [
      'Emergency Response Time',
      'Service Areas Covered',
      'Certification and Insurance',
      'Customer Reviews',
      'Before and After Examples',
      'Prevention Tips',
      'Related Services'
    ],
    schema: [
      'LocalBusiness',
      'FAQPage',
      'Service',
      'HowTo',
      'Question/Answer'
    ],
    internalLinks: [
      '/services/water-damage-restoration',
      '/services/mould-remediation',
      '/knowledge/insurance-claims',
      '/locations/[city]',
      '/emergency-services'
    ]
  };
}