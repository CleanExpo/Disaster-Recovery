// Insurance Decoder System - Translating policy language into understanding

export interface InsuranceTerm {
  id: string;
  term: string;
  category: 'coverage' | 'exclusion' | 'process' | 'timeline' | 'evidence';
  plainEnglish: string;
  insurerVariations: {
    insurer: string;
    variation: string;
    interpretation: string;
  }[];
  examples: {
    covered: string[];
    notCovered: string[];
    greyArea: string[];
  };
  relatedTerms: string[];
  commonMisunderstandings: string[];
  claimImpact: 'critical' | 'important' | 'helpful';
  evidenceNeeded: string[];
  timelineCritical: boolean;
  seoKeywords: string[];
}

export interface CoverageScenario {
  id: string;
  title: string;
  description: string;
  damageType: string;
  questions: {
    id: string;
    question: string;
    options: {
      value: string;
      label: string;
      impact: 'positive' | 'negative' | 'neutral';
      explanation: string;
    }[];
    weight: number;
  }[];
  coverageCriteria: {
    criterion: string;
    importance: 'critical' | 'important' | 'helpful';
    explanation: string;
  }[];
  commonExclusions: string[];
  documentationRequired: string[];
  timelineRequirements: string[];
  successTips: string[];
  redFlags: string[];
  realExamples: {
    scenario: string;
    outcome: 'covered' | 'denied' | 'partial';
    reason: string;
    lesson: string;
  }[];
}

export interface PolicyComparison {
  id: string;
  damageType: string;
  scenario: string;
  insurers: {
    name: string;
    logo?: string;
    coverage: 'comprehensive' | 'limited' | 'excluded' | 'conditional';
    keyTerms: string[];
    specificExclusions: string[];
    notificationPeriod: string;
    documentationRequired: string[];
    hiddenCoverage?: string[];
    commonDisputes: string[];
    successRate?: number;
  }[];
  industryStandard: string;
  bestPractice: string;
  warnings: string[];
}

export class InsuranceDecoder {
  // Core insurance terms database
  private static insuranceTerms: Map<string, InsuranceTerm> = new Map([
    ['sudden-accidental', {
      id: 'sudden-accidental',
      term: 'Sudden and Accidental Damage',
      category: 'coverage',
      plainEnglish: 'Damage that happens unexpectedly and quickly, not over time. Think "burst pipe" not "slow leak".',
      insurerVariations: [
        {
          insurer: 'AAMI',
          variation: 'sudden and accidental loss',
          interpretation: 'Unexpected damage not caused by neglect or lack of maintenance'
        },
        {
          insurer: 'Suncorp',
          variation: 'sudden and unforeseen damage',
          interpretation: 'Damage you couldn\'t predict or prevent through normal maintenance'
        },
        {
          insurer: 'Allianz',
          variation: 'accidental damage',
          interpretation: 'Unintentional damage from a single unexpected event'
        }
      ],
      examples: {
        covered: [
          'Pipe bursts during cold snap flooding basement',
          'Tree falls on roof during storm causing immediate damage',
          'Washing machine hose suddenly fails flooding laundry'
        ],
        notCovered: [
          'Roof tiles deteriorating over years finally letting water in',
          'Slow pipe leak behind wall causing gradual damage',
          'Shower seal wearing out over time causing water damage'
        ],
        greyArea: [
          'Old pipe that suddenly bursts (age vs sudden event)',
          'Storm damage to already deteriorating fence',
          'Sudden discovery of long-term hidden damage'
        ]
      },
      relatedTerms: ['gradual-damage', 'wear-tear', 'maintenance-issue'],
      commonMisunderstandings: [
        'Thinking all water damage is "sudden"',
        'Believing age of damage doesn\'t matter if just discovered',
        'Assuming any pipe burst is covered regardless of cause'
      ],
      claimImpact: 'critical',
      evidenceNeeded: [
        'Photos showing sudden nature',
        'Timeline of when damage occurred',
        'Maintenance records proving upkeep',
        'Weather reports for storm claims'
      ],
      timelineCritical: true,
      seoKeywords: [
        'sudden accidental damage insurance',
        'what is sudden damage insurance',
        'sudden vs gradual damage claims',
        'accidental damage coverage Australia'
      ]
    }],
    ['gradual-damage', {
      id: 'gradual-damage',
      term: 'Gradual Damage/Deterioration',
      category: 'exclusion',
      plainEnglish: 'Damage that happens slowly over time. Insurance is for surprises, not aging.',
      insurerVariations: [
        {
          insurer: 'QBE',
          variation: 'gradual deterioration',
          interpretation: 'Damage from wear, tear, rust, rot, or corrosion over time'
        },
        {
          insurer: 'NRMA',
          variation: 'gradually operating cause',
          interpretation: 'Any cause of damage that operates over a period of time'
        }
      ],
      examples: {
        covered: [],
        notCovered: [
          'Bathroom grout deteriorating causing water seepage',
          'Roof slowly deteriorating from weather exposure',
          'Pipes corroding internally over years',
          'Timber rot from long-term moisture exposure'
        ],
        greyArea: [
          'Hidden gradual damage just discovered',
          'Gradual damage accelerated by sudden event',
          'Maintenance attempted but insufficient'
        ]
      },
      relatedTerms: ['wear-tear', 'maintenance-issue', 'sudden-accidental'],
      commonMisunderstandings: [
        'Thinking discovery date matters more than damage timeline',
        'Believing hidden damage changes gradual nature',
        'Assuming some coverage exists for gradual damage'
      ],
      claimImpact: 'critical',
      evidenceNeeded: [
        'Professional assessment of damage age',
        'Maintenance history',
        'Previous inspection reports',
        'Photos showing progression'
      ],
      timelineCritical: true,
      seoKeywords: [
        'gradual damage insurance exclusion',
        'wear and tear insurance coverage',
        'gradual deterioration claims',
        'insurance gradual vs sudden'
      ]
    }],
    ['maintenance-issue', {
      id: 'maintenance-issue',
      term: 'Maintenance Issue',
      category: 'exclusion',
      plainEnglish: 'Damage from not properly maintaining your property. Insurance expects reasonable upkeep.',
      insurerVariations: [
        {
          insurer: 'CGU',
          variation: 'failure to maintain',
          interpretation: 'Damage resulting from inadequate maintenance or repairs'
        },
        {
          insurer: 'Allianz',
          variation: 'lack of maintenance',
          interpretation: 'Damage that proper maintenance would have prevented'
        }
      ],
      examples: {
        covered: [
          'Storm damage to well-maintained roof',
          'Pipe burst in regularly serviced system'
        ],
        notCovered: [
          'Blocked gutters causing water overflow damage',
          'Unmaintained roof letting water in',
          'Neglected plumbing finally failing'
        ],
        greyArea: [
          'Maintained but not to professional standard',
          'Maintenance done but inadequate for conditions',
          'Dispute over what constitutes "reasonable" maintenance'
        ]
      ],
      relatedTerms: ['gradual-damage', 'wear-tear', 'duty-of-care'],
      commonMisunderstandings: [
        'Thinking DIY maintenance always suffices',
        'Believing age alone determines maintenance',
        'Assuming maintenance is only for visible areas'
      ],
      claimImpact: 'critical',
      evidenceNeeded: [
        'Maintenance receipts and records',
        'Professional service reports',
        'Photos showing property condition',
        'Inspection certificates'
      ],
      timelineCritical: false,
      seoKeywords: [
        'maintenance vs insurance damage',
        'insurance maintenance exclusion',
        'property maintenance insurance claims',
        'maintenance issue coverage'
      ]
    }]
  ]);

  // Generate decoder content for any term
  static decodeTerm(termId: string): InsuranceTerm | undefined {
    return this.insuranceTerms.get(termId);
  }

  // Generate comparison content
  static generateComparison(
    damageType: string,
    insurers: string[] = ['AAMI', 'Suncorp', 'Allianz', 'NRMA', 'QBE']
  ): PolicyComparison {
    const comparisons: PolicyComparison = {
      id: `${damageType}-comparison`,
      damageType,
      scenario: `Understanding ${damageType} coverage across major insurers`,
      insurers: insurers.map(insurer => this.getInsurerProfile(insurer, damageType)),
      industryStandard: this.getIndustryStandard(damageType),
      bestPractice: this.getBestPractice(damageType),
      warnings: this.getWarnings(damageType)
    };
    
    return comparisons;
  }

  // Check coverage probability
  static checkCoverage(scenario: CoverageScenario, answers: Record<string, string>): {
    probability: number;
    explanation: string;
    factors: { factor: string; impact: 'positive' | 'negative'; reason: string }[];
    recommendations: string[];
  } {
    let score = 50; // Start at neutral
    const factors: { factor: string; impact: 'positive' | 'negative'; reason: string }[] = [];
    
    // Analyze each answer
    scenario.questions.forEach(question => {
      const answer = answers[question.id];
      const option = question.options.find(o => o.value === answer);
      
      if (option) {
        if (option.impact === 'positive') {
          score += question.weight;
          factors.push({
            factor: question.question,
            impact: 'positive',
            reason: option.explanation
          });
        } else if (option.impact === 'negative') {
          score -= question.weight;
          factors.push({
            factor: question.question,
            impact: 'negative',
            reason: option.explanation
          });
        }
      }
    });
    
    // Ensure score is between 0 and 100
    score = Math.max(0, Math.min(100, score));
    
    const explanation = this.getExplanation(score);
    const recommendations = this.getRecommendations(score, scenario, factors);
    
    return {
      probability: score,
      explanation,
      factors,
      recommendations
    };
  }

  // Generate scenario-based content
  static generateScenario(
    damageType: string,
    specifics: string,
    propertyType: string = 'residential'
  ): CoverageScenario {
    const scenarioId = `${damageType}-${specifics}-${propertyType}`.toLowerCase().replace(/\s+/g, '-');
    
    return {
      id: scenarioId,
      title: `Is ${this.formatTitle(specifics)} ${this.formatTitle(damageType)} Covered?`,
      description: `Understanding insurance coverage for ${specifics} causing ${damageType} in ${propertyType} properties`,
      damageType,
      questions: this.generateQuestions(damageType, specifics),
      coverageCriteria: this.getCoverageCriteria(damageType),
      commonExclusions: this.getCommonExclusions(damageType),
      documentationRequired: this.getDocumentation(damageType),
      timelineRequirements: this.getTimelineRequirements(damageType),
      successTips: this.getSuccessTips(damageType),
      redFlags: this.getRedFlags(damageType),
      realExamples: this.getRealExamples(damageType, specifics)
    };
  }

  // Helper methods
  private static getInsurerProfile(insurer: string, damageType: string) {
    // Generate insurer-specific coverage profile
    const profiles: Record<string, any> = {
      'AAMI': {
        name: 'AAMI',
        coverage: damageType === 'water-damage' ? 'comprehensive' : 'limited',
        keyTerms: ['sudden and accidental', 'internal water system'],
        specificExclusions: ['gradual damage', 'lack of maintenance'],
        notificationPeriod: 'As soon as possible',
        documentationRequired: ['Photos', 'Quotes', 'Proof of maintenance'],
        hiddenCoverage: ['Limited gradual water damage from hidden pipes'],
        commonDisputes: ['Timeline of damage', 'Maintenance adequacy'],
        successRate: 75
      },
      'Suncorp': {
        name: 'Suncorp',
        coverage: 'comprehensive',
        keyTerms: ['sudden and unforeseen', 'accidental damage'],
        specificExclusions: ['wear and tear', 'gradual deterioration'],
        notificationPeriod: 'Within 30 days',
        documentationRequired: ['Incident report', 'Photos', 'Receipts'],
        commonDisputes: ['Pre-existing damage', 'Storm vs maintenance'],
        successRate: 70
      }
    };
    
    return profiles[insurer] || this.generateDefaultProfile(insurer, damageType);
  }

  private static generateDefaultProfile(insurer: string, damageType: string) {
    return {
      name: insurer,
      coverage: 'conditional',
      keyTerms: ['sudden damage', 'accidental loss'],
      specificExclusions: ['gradual damage', 'maintenance'],
      notificationPeriod: 'As soon as practicable',
      documentationRequired: ['Photos', 'Reports', 'Quotes'],
      commonDisputes: ['Causation', 'Timeline'],
      successRate: 65
    };
  }

  private static getIndustryStandard(damageType: string): string {
    const standards: Record<string, string> = {
      'water-damage': 'Most insurers cover sudden water damage from burst pipes but exclude gradual leaks',
      'fire-damage': 'Fire damage is generally well covered unless caused by illegal activities or lack of maintenance',
      'storm-damage': 'Storm damage covered when from defined weather event, not general weather deterioration',
      'mould': 'Mould only covered when direct result of covered water damage event, not gradual moisture'
    };
    
    return standards[damageType] || 'Coverage varies significantly between insurers and specific circumstances';
  }

  private static getBestPractice(damageType: string): string {
    const practices: Record<string, string> = {
      'water-damage': 'Document immediately, mitigate promptly, maintain regularly, keep all receipts',
      'fire-damage': 'Ensure safety first, document everything, don\'t dispose of damaged items, get fire report',
      'storm-damage': 'Photograph during/immediately after storm, get weather bureau confirmation, temporary repairs okay',
      'mould': 'Get professional assessment quickly, document moisture source, show mitigation efforts'
    };
    
    return practices[damageType] || 'Document thoroughly, notify quickly, mitigate damage, keep evidence';
  }

  private static getWarnings(damageType: string): string[] {
    const baseWarnings = [
      'This is general education only - check your specific policy',
      'Every claim is assessed individually',
      'Timeframes are critical for coverage'
    ];
    
    const specificWarnings: Record<string, string[]> = {
      'water-damage': [
        'Gradual leaks are rarely covered',
        'Maintenance history is crucial',
        'Hidden damage doesn\'t change gradual nature'
      ],
      'mould': [
        'Pre-existing mould voids coverage',
        'Must prove direct link to covered event',
        'Quick action essential to maintain coverage'
      ]
    };
    
    return [...baseWarnings, ...(specificWarnings[damageType] || [])];
  }

  private static generateQuestions(damageType: string, specifics: string) {
    // Generate relevant questions based on damage type
    const baseQuestions = [
      {
        id: 'timeline',
        question: 'When did the damage occur?',
        options: [
          { value: 'sudden', label: 'Suddenly/unexpectedly', impact: 'positive' as const, explanation: 'Sudden damage is typically covered' },
          { value: 'gradual', label: 'Over time/gradually', impact: 'negative' as const, explanation: 'Gradual damage is usually excluded' },
          { value: 'unknown', label: 'Unknown/just discovered', impact: 'neutral' as const, explanation: 'Requires investigation to determine coverage' }
        ],
        weight: 30
      },
      {
        id: 'maintenance',
        question: 'What\'s your maintenance history?',
        options: [
          { value: 'regular', label: 'Regular professional maintenance', impact: 'positive' as const, explanation: 'Good maintenance supports coverage' },
          { value: 'diy', label: 'DIY maintenance', impact: 'neutral' as const, explanation: 'May require proof of adequacy' },
          { value: 'minimal', label: 'Minimal/no maintenance', impact: 'negative' as const, explanation: 'Lack of maintenance can void coverage' }
        ],
        weight: 20
      },
      {
        id: 'notification',
        question: 'When did you notify your insurer?',
        options: [
          { value: 'immediate', label: 'Immediately', impact: 'positive' as const, explanation: 'Prompt notification preserves coverage' },
          { value: 'delayed', label: 'Within a week', impact: 'neutral' as const, explanation: 'May be acceptable depending on policy' },
          { value: 'late', label: 'Over a week later', impact: 'negative' as const, explanation: 'Late notification can affect coverage' }
        ],
        weight: 15
      }
    ];
    
    return baseQuestions;
  }

  private static getCoverageCriteria(damageType: string) {
    return [
      {
        criterion: 'Sudden and accidental nature',
        importance: 'critical' as const,
        explanation: 'Damage must be unexpected and not gradual'
      },
      {
        criterion: 'Proper maintenance',
        importance: 'critical' as const,
        explanation: 'Property must be reasonably maintained'
      },
      {
        criterion: 'Timely notification',
        importance: 'important' as const,
        explanation: 'Insurer must be notified promptly'
      },
      {
        criterion: 'Mitigation efforts',
        importance: 'important' as const,
        explanation: 'Must take steps to prevent further damage'
      }
    ];
  }

  private static getCommonExclusions(damageType: string): string[] {
    const baseExclusions = [
      'Gradual deterioration',
      'Wear and tear',
      'Lack of maintenance',
      'Pre-existing damage'
    ];
    
    const specificExclusions: Record<string, string[]> = {
      'water-damage': [
        'Gradual leaks',
        'Rising damp',
        'Hydrostatic pressure',
        'Shower recesses (some policies)'
      ],
      'mould': [
        'Pre-existing mould',
        'Condensation-caused mould',
        'Poor ventilation mould',
        'Gradual moisture accumulation'
      ]
    };
    
    return [...baseExclusions, ...(specificExclusions[damageType] || [])];
  }

  private static getDocumentation(damageType: string): string[] {
    return [
      'Photos of damage (immediate)',
      'Timeline of events',
      'Maintenance records',
      'Professional assessments',
      'Quotes for repairs',
      'Weather reports (if applicable)',
      'Previous inspection reports',
      'Receipts for emergency repairs'
    ];
  }

  private static getTimelineRequirements(damageType: string): string[] {
    return [
      'Notify insurer: As soon as possible (usually within 30 days)',
      'Document damage: Immediately upon discovery',
      'Mitigate damage: Within 24-48 hours',
      'Submit claim: Follow insurer timeline',
      'Provide information: Within 10 business days when requested'
    ];
  }

  private static getSuccessTips(damageType: string): string[] {
    return [
      'Document everything immediately',
      'Keep damaged items as evidence',
      'Get multiple professional opinions',
      'Maintain detailed timeline',
      'Cooperate fully with insurer',
      'Use proper technical terms',
      'Show mitigation efforts',
      'Keep all receipts and records'
    ];
  }

  private static getRedFlags(damageType: string): string[] {
    return [
      'Multiple areas of wear and deterioration',
      'No maintenance records',
      'Delayed notification to insurer',
      'Conflicting timelines',
      'DIY repairs before assessment',
      'Disposing of evidence',
      'Previous similar claims',
      'Seasonal/predictable damage'
    ];
  }

  private static getRealExamples(damageType: string, specifics: string) {
    return [
      {
        scenario: `Burst pipe in ceiling during cold snap`,
        outcome: 'covered' as const,
        reason: 'Sudden event with immediate notification and mitigation',
        lesson: 'Quick action and proper documentation secured coverage'
      },
      {
        scenario: `Slow leak discovered during renovation`,
        outcome: 'denied' as const,
        reason: 'Gradual damage over extended period',
        lesson: 'Discovery timing doesn\'t change gradual nature'
      },
      {
        scenario: `Storm damage to deteriorating fence`,
        outcome: 'partial' as const,
        reason: 'Storm damage covered but not pre-existing deterioration',
        lesson: 'Maintenance condition affects coverage extent'
      }
    ];
  }

  private static getExplanation(probability: number): string {
    if (probability >= 80) {
      return 'High likelihood of coverage based on typical policy terms. Strong indicators suggest this would generally be covered.';
    } else if (probability >= 60) {
      return 'Moderate coverage probability. Some positive factors but also concerns that could affect the claim.';
    } else if (probability >= 40) {
      return 'Uncertain coverage. Mixed factors make this a grey area requiring careful documentation and potentially dispute.';
    } else if (probability >= 20) {
      return 'Low coverage probability. Several factors suggest this may fall under common exclusions.';
    } else {
      return 'Unlikely to be covered. Multiple indicators suggest this would typically be excluded under standard policies.';
    }
  }

  private static getRecommendations(
    probability: number,
    scenario: CoverageScenario,
    factors: { factor: string; impact: 'positive' | 'negative'; reason: string }[]
  ): string[] {
    const recommendations: string[] = [];
    
    if (probability < 60) {
      recommendations.push('Get professional assessment to strengthen your case');
      recommendations.push('Gather extensive documentation to overcome exclusion concerns');
    }
    
    if (factors.some(f => f.factor.includes('maintenance') && f.impact === 'negative')) {
      recommendations.push('Compile any maintenance records you have, even minor ones');
      recommendations.push('Get expert opinion on whether maintenance was reasonable');
    }
    
    if (factors.some(f => f.factor.includes('timeline') && f.impact === 'negative')) {
      recommendations.push('Focus on sudden triggering event if one exists');
      recommendations.push('Document any sudden change or acceleration of damage');
    }
    
    recommendations.push('Call Disaster Recovery for expert claim preparation assistance');
    recommendations.push('Don\'t admit fault or agree damage is gradual without expert advice');
    
    return recommendations;
  }

  private static formatTitle(str: string): string {
    return str.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  // Generate SEO content for all insurance terms
  static generateAllTermPages(): { term: InsuranceTerm; url: string }[] {
    const pages: { term: InsuranceTerm; url: string }[] = [];
    
    this.insuranceTerms.forEach((term, key) => {
      pages.push({
        term,
        url: `/insurance-decoder/${key}`
      });
    });
    
    return pages;
  }

  // Generate comparison pages for all damage types and insurers
  static generateAllComparisonPages(): { comparison: PolicyComparison; url: string }[] {
    const damageTypes = ['water-damage', 'fire-damage', 'storm-damage', 'mould'];
    const insurers = ['AAMI', 'Suncorp', 'Allianz', 'NRMA', 'QBE', 'CGU'];
    const pages: { comparison: PolicyComparison; url: string }[] = [];
    
    damageTypes.forEach(damage => {
      // Generate overall comparison
      pages.push({
        comparison: this.generateComparison(damage, insurers),
        url: `/insurance-coverage/${damage}/comparison`
      });
      
      // Generate pairwise comparisons
      for (let i = 0; i < insurers.length; i++) {
        for (let j = i + 1; j < insurers.length; j++) {
          pages.push({
            comparison: this.generateComparison(damage, [insurers[i], insurers[j]]),
            url: `/insurance-coverage/${damage}/${insurers[i].toLowerCase()}-vs-${insurers[j].toLowerCase()}`
          });
        }
      }
    });
    
    return pages;
  }
}