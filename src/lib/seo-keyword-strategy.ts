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
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$15-25',
      trend: 'Stable'
    },
    {
      keyword: 'toilet overflowing sewage carpet',
      searchVolume: '100-200/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$20-30',
      trend: 'Rising'
    },
    {
      keyword: 'black spots bathroom ceiling spreading',
      searchVolume: '200-300/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$10-20',
      trend: 'Rising'
    },
    {
      keyword: 'musty smell walls after rain',
      searchVolume: '150-250/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$12-22',
      trend: 'Stable'
    },
    {
      keyword: 'water bubbling through paint',
      searchVolume: '100-150/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$18-28',
      trend: 'Rising'
    }
  ],

  // Question-Based Keywords (Featured Snippet Opportunities)
  questions: [
    {
      keyword: 'why does my house smell musty after rain',
      searchVolume: '500-700/mo',
      difficulty: 'Easy',
      intent: 'Informational',
      cpc: '$5-10',
      trend: 'Rising'
    },
    {
      keyword: 'is black mould covered by insurance australia',
      searchVolume: '300-400/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$8-15',
      trend: 'Stable'
    },
    {
      keyword: 'how long before water damage causes mould',
      searchVolume: '400-500/mo',
      difficulty: 'Easy',
      intent: 'Informational',
      cpc: '$6-12',
      trend: 'Rising'
    },
    {
      keyword: 'can i stay home during mould removal',
      searchVolume: '200-300/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$10-18',
      trend: 'Stable'
    },
    {
      keyword: 'who pays for water damage tenant or landlord',
      searchVolume: '600-800/mo',
      difficulty: 'Medium',
      intent: 'Informational',
      cpc: '$4-8',
      trend: 'Rising'
    }
  ],

  // Cost-Related Keywords (High Commercial Intent)
  costKeywords: [
    {
      keyword: 'water damage restoration cost per square metre',
      searchVolume: '100-200/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$15-25',
      trend: 'Rising'
    },
    {
      keyword: 'mould removal cost 3 bedroom house',
      searchVolume: '150-250/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$12-20',
      trend: 'Stable'
    },
    {
      keyword: 'insurance excess vs repair cost water damage',
      searchVolume: '80-120/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$10-18',
      trend: 'Rising'
    },
    {
      keyword: 'free mould inspection near me',
      searchVolume: '300-400/mo',
      difficulty: 'Medium',
      intent: 'Transactional',
      cpc: '$20-30',
      trend: 'Rising'
    },
    {
      keyword: 'emergency water extraction pricing',
      searchVolume: '50-100/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$25-35',
      trend: 'Stable'
    }
  ],

  // Time-Sensitive Keywords
  urgentKeywords: [
    {
      keyword: 'water damage restoration open now',
      searchVolume: '200-300/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$30-45',
      trend: 'Rising'
    },
    {
      keyword: 'after hours flood emergency',
      searchVolume: '100-150/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$35-50',
      trend: 'Stable'
    },
    {
      keyword: 'sunday water damage help',
      searchVolume: '50-100/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$40-55',
      trend: 'Rising'
    },
    {
      keyword: 'public holiday emergency restoration',
      searchVolume: '30-50/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$45-60',
      trend: 'Stable'
    },
    {
      keyword: 'same day water extraction service',
      searchVolume: '150-200/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$25-40',
      trend: 'Rising'
    }
  ],

  // Insurance-Specific Keywords
  insuranceKeywords: [
    {
      keyword: 'water damage claim denied what now',
      searchVolume: '100-150/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$8-15',
      trend: 'Rising'
    },
    {
      keyword: 'gradual water damage insurance claim',
      searchVolume: '80-120/mo',
      difficulty: 'Easy',
      intent: 'Informational',
      cpc: '$6-12',
      trend: 'Stable'
    },
    {
      keyword: 'insurance preferred repairer water damage',
      searchVolume: '150-200/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$10-18',
      trend: 'Rising'
    },
    {
      keyword: 'make safe certificate water damage',
      searchVolume: '50-80/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$15-25',
      trend: 'Stable'
    },
    {
      keyword: 'scope of works template water damage',
      searchVolume: '100-150/mo',
      difficulty: 'Easy',
      intent: 'Informational',
      cpc: '$5-10',
      trend: 'Rising'
    }
  ],

  // Comparison Keywords (Decision Stage)
  comparisonKeywords: [
    {
      keyword: 'restoration vs replacement after water damage',
      searchVolume: '80-120/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$8-15',
      trend: 'Stable'
    },
    {
      keyword: 'diy vs professional mould removal',
      searchVolume: '200-300/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$10-18',
      trend: 'Rising'
    },
    {
      keyword: 'bleach vs professional mould treatment',
      searchVolume: '150-200/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$7-14',
      trend: 'Stable'
    },
    {
      keyword: 'dehumidifier vs professional drying',
      searchVolume: '100-150/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$9-16',
      trend: 'Rising'
    }
  ],

  // Suburb-Specific Long-Tail Keywords
  suburbSpecific: [
    {
      keyword: '[suburb] water damage restoration same day',
      searchVolume: '10-50/mo per suburb',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$25-40',
      trend: 'Stable',
      localModifier: true
    },
    {
      keyword: '[suburb] emergency mould removal today',
      searchVolume: '10-30/mo per suburb',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$20-35',
      trend: 'Rising',
      localModifier: true
    },
    {
      keyword: '[suburb] flood damage insurance help',
      searchVolume: '20-40/mo per suburb',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$15-25',
      trend: 'Stable',
      localModifier: true
    }
  ],

  // Building Type Specific
  buildingTypeKeywords: [
    {
      keyword: 'townhouse water damage between units',
      searchVolume: '50-100/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$12-20',
      trend: 'Rising'
    },
    {
      keyword: 'apartment ceiling water damage from above',
      searchVolume: '200-300/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$15-25',
      trend: 'Rising'
    },
    {
      keyword: 'queenslander house mould under floor',
      searchVolume: '100-150/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$10-18',
      trend: 'Stable'
    },
    {
      keyword: 'high rise water damage liability',
      searchVolume: '80-120/mo',
      difficulty: 'Easy',
      intent: 'Informational',
      cpc: '$8-15',
      trend: 'Rising'
    },
    {
      keyword: 'granny flat flood damage repair',
      searchVolume: '30-50/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$18-28',
      trend: 'Stable'
    }
  ],

  // Damage Source Specific
  damageSourceKeywords: [
    {
      keyword: 'dishwasher leak under floorboards',
      searchVolume: '100-150/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$20-30',
      trend: 'Rising'
    },
    {
      keyword: 'washing machine overflow damage downstairs',
      searchVolume: '150-200/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$18-28',
      trend: 'Stable'
    },
    {
      keyword: 'air conditioner leak ceiling damage',
      searchVolume: '200-250/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$15-25',
      trend: 'Rising'
    },
    {
      keyword: 'hot water system burst cleanup',
      searchVolume: '100-150/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$25-35',
      trend: 'Stable'
    },
    {
      keyword: 'fish tank leak carpet damage',
      searchVolume: '30-50/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$15-22',
      trend: 'Stable'
    }
  ],

  // Health Symptom Keywords
  healthKeywords: [
    {
      keyword: 'sick after cleaning mouldy bathroom',
      searchVolume: '100-150/mo',
      difficulty: 'Easy',
      intent: 'Informational',
      cpc: '$5-10',
      trend: 'Rising'
    },
    {
      keyword: 'baby coughing mould in house',
      searchVolume: '200-300/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$8-15',
      trend: 'Rising'
    },
    {
      keyword: 'headaches from water damaged ceiling',
      searchVolume: '80-120/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$7-14',
      trend: 'Stable'
    },
    {
      keyword: 'allergic reaction black mould symptoms',
      searchVolume: '300-400/mo',
      difficulty: 'Easy',
      intent: 'Informational',
      cpc: '$6-12',
      trend: 'Rising'
    }
  ],

  // Seasonal Keywords
  seasonalKeywords: [
    {
      keyword: 'wet season mould prevention queensland',
      searchVolume: '150-200/mo (seasonal)',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$8-15',
      trend: 'Rising'
    },
    {
      keyword: 'storm season preparation brisbane homes',
      searchVolume: '200-300/mo (seasonal)',
      difficulty: 'Easy',
      intent: 'Informational',
      cpc: '$5-10',
      trend: 'Rising'
    },
    {
      keyword: 'la nina flooding preparation',
      searchVolume: '500-1000/mo (seasonal)',
      difficulty: 'Medium',
      intent: 'Informational',
      cpc: '$4-8',
      trend: 'Rising'
    },
    {
      keyword: 'winter mould problems melbourne',
      searchVolume: '100-150/mo (seasonal)',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$10-18',
      trend: 'Stable'
    }
  ],

  // IEP Specific Low Competition
  iepKeywords: [
    {
      keyword: 'sick building syndrome testing australia',
      searchVolume: '100-150/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$20-30',
      trend: 'Rising'
    },
    {
      keyword: 'indoor air quality test cost',
      searchVolume: '200-300/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$15-25',
      trend: 'Rising'
    },
    {
      keyword: 'voc testing home australia',
      searchVolume: '80-120/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$18-28',
      trend: 'Stable'
    },
    {
      keyword: 'electromagnetic field testing service',
      searchVolume: '50-100/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$25-35',
      trend: 'Rising'
    },
    {
      keyword: 'formaldehyde testing new house',
      searchVolume: '100-150/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$20-30',
      trend: 'Rising'
    }
  ],

  // Commercial Property Keywords
  commercialKeywords: [
    {
      keyword: 'office water damage after hours',
      searchVolume: '50-100/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$30-45',
      trend: 'Stable'
    },
    {
      keyword: 'retail store flood damage overnight',
      searchVolume: '30-50/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$35-50',
      trend: 'Rising'
    },
    {
      keyword: 'warehouse mould remediation cost',
      searchVolume: '80-120/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$20-30',
      trend: 'Stable'
    },
    {
      keyword: 'restaurant kitchen flood cleanup',
      searchVolume: '100-150/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$25-40',
      trend: 'Rising'
    },
    {
      keyword: 'gym flooring water damage',
      searchVolume: '50-80/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$22-32',
      trend: 'Stable'
    }
  ],

  // Voice Search Optimised
  voiceSearchKeywords: [
    {
      keyword: 'who do i call for water damage right now',
      searchVolume: '100-150/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$25-35',
      trend: 'Rising'
    },
    {
      keyword: 'find emergency water damage help near me open now',
      searchVolume: '150-200/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$30-40',
      trend: 'Rising'
    },
    {
      keyword: 'what to do ceiling leaking water everywhere',
      searchVolume: '80-120/mo',
      difficulty: 'Easy',
      intent: 'Transactional',
      cpc: '$20-30',
      trend: 'Rising'
    },
    {
      keyword: 'how much to fix water damaged wall',
      searchVolume: '200-300/mo',
      difficulty: 'Easy',
      intent: 'Commercial',
      cpc: '$12-20',
      trend: 'Stable'
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
    
    // Nearby/comparison
    `water damage ${suburb} vs ${city}`,
    `cheapest mould removal ${suburb}`,
    `best water damage company ${suburb}`,
    `${suburb} restoration reviews`,
    `${suburb} flood damage specialists`,
    
    // Service + location + modifier
    `24 hour water damage ${suburb}`,
    `same day mould inspection ${suburb}`,
    `emergency flood response ${suburb}`,
    `weekend water extraction ${suburb}`,
    `after hours restoration ${suburb}`,
    
    // Problem-specific local
    `burst pipe ${suburb} emergency`,
    `sewage overflow ${suburb} help`,
    `storm damage ${suburb} today`,
    `basement flooding ${suburb}`,
    `roof leak ${suburb} urgent`,
    
    // Commercial local
    `commercial water damage ${suburb}`,
    `office mould removal ${suburb}`,
    `restaurant flood cleanup ${suburb}`,
    `warehouse restoration ${suburb}`,
    `retail water damage ${suburb}`
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
    'what happens if',
    'should i worry about',
    'do i need professional',
    'can insurance cover',
    'will insurance pay',
    'how to prevent'
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
    tips.push('Add Email Address in title and H1');
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
    `${keyword} | 24/7 Emergency Service | Use Our Online Form
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
    `Professional ${keyword} services ${location ? `in ${location}` : ''}. 24/7 emergency response, insurance approved, certified technicians. Use Our Online Form
    `Need ${keyword}? Same-day service, free quotes, direct insurance billing. ${location ? `Servicing all ${location} areas` : 'nationwide coverage'}. Available now - 1300 814 870.`,
    `Expert ${keyword} with 30-minute response time. IICRC certified, 100% guarantee, insurance claims handled. ${location ? location + ' locals' : 'Australian'} trust us. Use Our Online Form
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