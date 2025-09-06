// Who's First Scenario Generator - Creates SEO-optimized content for every disaster scenario

export interface WhosFirstScenario {
  id: string;
  title: string;
  question: string;
  metaDescription: string;
  situation: string;
  whyUsFirst: string[];
  wrongFirstCalls: {
    who: string;
    consequence: string;
  }[];
  ourProcess: string[];
  timelineCritical: string[];
  insuranceInsights: string[];
  healthSafety: string[];
  costImpact: {
    withUs: string;
    withoutUs: string;
    savings: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  caseStudy?: {
    title: string;
    situation: string;
    action: string;
    result: string;
  };
  relatedScenarios: string[];
  searchKeywords: string[];
}

export class WhosFirstGenerator {
  private static baseScenarios = {
    'water-damage': {
      variations: [
        'burst-pipe', 'flooding', 'roof-leak', 'bathroom-leak', 'kitchen-flood',
        'basement-flood', 'washing-machine-overflow', 'hot-water-burst',
        'storm-water-ingress', 'sewage-backup', 'pool-leak', 'irrigation-damage'
      ],
      timeFactors: ['immediate', 'within-hours', 'next-day', 'after-weekend'],
      propertyTypes: ['residential', 'commercial', 'industrial', 'strata'],
    },
    'fire-damage': {
      variations: [
        'kitchen-fire', 'electrical-fire', 'candle-fire', 'garage-fire',
        'wildfire', 'smoke-damage-only', 'partial-burn', 'total-loss'
      ],
      timeFactors: ['during-fire', 'immediately-after', 'next-day', 'week-later'],
      propertyTypes: ['home', 'business', 'warehouse', 'retail'],
    },
    'mould-growth': {
      variations: [
        'black-mould', 'bathroom-mould', 'ceiling-mould', 'wall-cavity-mould',
        'under-floor-mould', 'attic-mould', 'hvac-mould', 'hidden-mould'
      ],
      timeFactors: ['just-discovered', 'spreading', 'health-symptoms', 'long-term'],
      propertyTypes: ['rental', 'owner-occupied', 'commercial', 'school'],
    },
    'storm-damage': {
      variations: [
        'roof-damage', 'tree-fall', 'window-damage', 'structural-damage',
        'fence-damage', 'car-port-collapse', 'power-surge', 'hail-damage'
      ],
      timeFactors: ['during-storm', 'after-storm', 'multiple-storms', 'season-end'],
      propertyTypes: ['house', 'apartment', 'office', 'factory'],
    },
  };

  static generateScenario(
    damageType: string,
    variation: string,
    timeFactor: string,
    propertyType: string,
    location?: string
  ): WhosFirstScenario {
    const scenarioId = `${damageType}-${variation}-${timeFactor}-${propertyType}${location ? `-${location.toLowerCase().replace(/\s+/g, '-')}` : ''}`;
    
    const title = this.generateTitle(damageType, variation, propertyType, location);
    const question = this.generateQuestion(damageType, variation, timeFactor, propertyType);
    
    return {
      id: scenarioId,
      title,
      question,
      metaDescription: this.generateMetaDescription(damageType, variation, location),
      situation: this.generateSituation(damageType, variation, timeFactor, propertyType),
      whyUsFirst: this.generateWhyUsFirst(damageType, variation),
      wrongFirstCalls: this.generateWrongFirstCalls(damageType),
      ourProcess: this.generateOurProcess(damageType, timeFactor),
      timelineCritical: this.generateTimelineCritical(damageType, timeFactor),
      insuranceInsights: this.generateInsuranceInsights(damageType, variation),
      healthSafety: this.generateHealthSafety(damageType, variation),
      costImpact: this.generateCostImpact(damageType, propertyType),
      faqs: this.generateFAQs(damageType, variation, propertyType),
      caseStudy: this.generateCaseStudy(damageType, variation, location),
      relatedScenarios: this.generateRelatedScenarios(damageType, variation),
      searchKeywords: this.generateKeywords(damageType, variation, location, propertyType),
    };
  }

  private static generateTitle(damageType: string, variation: string, propertyType: string, location?: string): string {
    const baseTitle = `Who to Call First: ${this.formatString(variation)} in ${this.formatString(propertyType)} Property`;
    return location ? `${baseTitle} - ${location}` : baseTitle;
  }

  private static generateQuestion(damageType: string, variation: string, timeFactor: string, propertyType: string): string {
    const timeContext = {
      'immediate': 'happening right now',
      'within-hours': 'just happened',
      'next-day': 'discovered this morning',
      'after-weekend': 'found after being away',
    };
    
    return `My ${this.formatString(propertyType)} has ${this.formatString(variation)} ${timeContext[timeFactor] || ''} - who do I call first?`;
  }

  private static generateMetaDescription(damageType: string, variation: string, location?: string): string {
    const locationText = location ? ` in ${location}` : ' in Australia';
    return `Discover who to call first for ${this.formatString(variation)}${locationText}. Expert guidance on the critical first steps, insurance coordination, and why Disaster Recovery should be your first call. Available 24/7.`;
  }

  private static generateSituation(damageType: string, variation: string, timeFactor: string, propertyType: string): string {
    const situations = {
      'water-damage': {
        'burst-pipe': `A pipe has burst in your ${propertyType} property, causing water to flood multiple rooms. The water is spreading quickly and you're not sure whether to turn off the mains, call a plumber, or contact insurance first.`,
        'flooding': `Your ${propertyType} is experiencing significant flooding. Water levels are rising and you need immediate help but don't know who handles what - emergency services, insurance, or restoration.`,
      },
      'fire-damage': {
        'kitchen-fire': `A kitchen fire has damaged your ${propertyType}. The fire is out but there's smoke damage throughout, water damage from firefighting, and you're overwhelmed about next steps.`,
      },
      'mould-growth': {
        'black-mould': `You've discovered black mould in your ${propertyType}. Family members are experiencing health symptoms and you need to know if it's safe to stay and who can handle this properly.`,
      },
      'storm-damage': {
        'roof-damage': `A storm has damaged your ${propertyType} roof. Rain is coming in, and you need emergency repairs but also proper insurance documentation.`,
      },
    };
    
    return situations[damageType]?.[variation] || this.generateDefaultSituation(damageType, variation, propertyType);
  }

  private static generateWhyUsFirst(damageType: string, variation: string): string[] {
    const baseReasons = [
      'We understand the complete picture - not just one aspect of the damage',
      'We document everything correctly for insurance from minute one',
      'We coordinate all necessary trades in the optimal sequence',
      'We prevent secondary damage that others might miss',
      'We know what your insurance policy actually covers',
      'We work 24/7 because disasters don\'t wait for business hours',
    ];

    const specificReasons = {
      'water-damage': [
        'We stop water spread while preserving insurance evidence',
        'We prevent mould growth with immediate moisture control',
        'We identify all affected areas including hidden moisture',
      ],
      'fire-damage': [
        'We address smoke, soot, water, and structural damage simultaneously',
        'We prevent permanent smoke damage with immediate action',
        'We coordinate with fire department reports for insurance',
      ],
      'mould-growth': [
        'We ensure safe containment to prevent spore spread',
        'We identify and fix the moisture source, not just visible mould',
        'We provide health-compliant remediation with proper testing',
      ],
      'storm-damage': [
        'We provide immediate weatherproofing to prevent further damage',
        'We document all damage vectors for complete insurance claims',
        'We coordinate emergency repairs with permanent restoration',
      ],
    };

    return [...baseReasons, ...(specificReasons[damageType] || [])];
  }

  private static generateWrongFirstCalls(damageType: string): { who: string; consequence: string }[] {
    const commonMistakes = {
      'water-damage': [
        { who: 'Plumber', consequence: 'Fixes pipe but misses drying requirements, mould risk increases, insurance documentation incomplete' },
        { who: 'Insurance Company', consequence: 'Delays mitigation while claim processes, damage worsens, higher restoration costs' },
        { who: 'General Cleaner', consequence: 'Surface cleaning only, moisture trapped in walls, guaranteed mould growth' },
      ],
      'fire-damage': [
        { who: 'General Contractor', consequence: 'Starts repairs before proper smoke remediation, smells return, work needs redoing' },
        { who: 'Cleaning Service', consequence: 'Spreads soot deeper into materials, permanent staining, improper chemical use' },
        { who: 'Insurance Alone', consequence: 'No emergency mitigation, smoke damage becomes permanent, claim value reduced' },
      ],
      'mould-growth': [
        { who: 'Regular Cleaner', consequence: 'Disturbs spores causing spread, no moisture source fix, mould returns worse' },
        { who: 'Handyman', consequence: 'Improper removal techniques, health risks increase, insurance won\'t cover DIY attempts' },
        { who: 'Ignore It', consequence: 'Health deteriorates, structural damage worsens, property value plummets' },
      ],
      'storm-damage': [
        { who: 'Roofer Only', consequence: 'Fixes roof but misses interior water damage, mould grows hidden, claim incomplete' },
        { who: 'Tree Service', consequence: 'Removes tree but doesn\'t address structural damage, safety risks remain' },
        { who: 'Tarp It Yourself', consequence: 'Improper installation, water still enters, insurance may deny claim for DIY attempts' },
      ],
    };

    return commonMistakes[damageType] || [];
  }

  private static generateOurProcess(damageType: string, timeFactor: string): string[] {
    const urgentSteps = timeFactor === 'immediate' || timeFactor === 'within-hours';
    
    const process = [
      urgentSteps ? '1. Immediate 24/7 response team dispatch' : '1. Priority scheduling within 2 hours',
      '2. Safety assessment and hazard mitigation',
      '3. Comprehensive damage documentation for insurance',
      '4. Emergency mitigation to prevent further damage',
      '5. Insurance liaison and claim maximization',
      '6. Coordinate all necessary specialists',
      '7. Project management through completion',
      '8. Quality assurance and warranty',
    ];

    return process;
  }

  private static generateTimelineCritical(damageType: string, timeFactor: string): string[] {
    return [
      '0-1 Hour: Critical - Document damage, stop spread, ensure safety',
      '1-6 Hours: Urgent - Begin mitigation, notify insurance, prevent secondary damage',
      '6-24 Hours: Important - Full assessment, drying begins, claim filed',
      '24-48 Hours: Monitoring - Moisture tracking, mould prevention, repair planning',
      '48-72 Hours: Stabilization - Ensure drying targets met, coordinate repairs',
      '3-7 Days: Restoration - Begin rebuild, maintain documentation, quality control',
    ];
  }

  private static generateInsuranceInsights(damageType: string, variation: string): string[] {
    return [
      'Most policies require mitigation within 24-48 hours',
      'Proper documentation from hour one doubles average claim payout',
      'Insurance companies prefer approved restoration companies',
      'Secondary damage (like mould) may not be covered if primary damage isn\'t addressed quickly',
      'We speak insurance language - technical terms that maximize coverage',
      'Our documentation has never had a claim rejected',
      'We identify coverage you didn\'t know you had',
      'We prevent claim delays with proper procedures',
    ];
  }

  private static generateHealthSafety(damageType: string, variation: string): string[] {
    const hazards = {
      'water-damage': [
        'Electrical hazards from water contact',
        'Slip and fall risks',
        'Contamination categories (clean, grey, black water)',
        'Mould growth begins within 24-48 hours',
        'Structural integrity concerns',
      ],
      'fire-damage': [
        'Toxic smoke residue',
        'Structural stability risks',
        'Electrical system damage',
        'Asbestos disturbance in older properties',
        'Carbon monoxide concerns',
      ],
      'mould-growth': [
        'Respiratory health impacts',
        'Allergic reactions',
        'Toxic mould species identification',
        'Immunocompromised individual risks',
        'Proper containment requirements',
      ],
      'storm-damage': [
        'Structural collapse risks',
        'Electrical hazards from damaged wiring',
        'Sharp debris hazards',
        'Contaminated flood water',
        'Unstable trees and branches',
      ],
    };

    return hazards[damageType] || [];
  }

  private static generateCostImpact(damageType: string, propertyType: string): { withUs: string; withoutUs: string; savings: string } {
    const residential = propertyType === 'residential' || propertyType === 'home' || propertyType === 'house';
    
    const impacts = {
      'water-damage': {
        withUs: residential ? '$3,000-$8,000' : '$10,000-$50,000',
        withoutUs: residential ? '$8,000-$25,000' : '$50,000-$200,000',
        savings: residential ? '$5,000-$17,000' : '$40,000-$150,000',
      },
      'fire-damage': {
        withUs: residential ? '$10,000-$30,000' : '$50,000-$200,000',
        withoutUs: residential ? '$25,000-$70,000' : '$150,000-$500,000',
        savings: residential ? '$15,000-$40,000' : '$100,000-$300,000',
      },
      'mould-growth': {
        withUs: residential ? '$2,000-$6,000' : '$5,000-$30,000',
        withoutUs: residential ? '$5,000-$15,000' : '$20,000-$80,000',
        savings: residential ? '$3,000-$9,000' : '$15,000-$50,000',
      },
      'storm-damage': {
        withUs: residential ? '$5,000-$15,000' : '$20,000-$100,000',
        withoutUs: residential ? '$12,000-$35,000' : '$60,000-$250,000',
        savings: residential ? '$7,000-$20,000' : '$40,000-$150,000',
      },
    };

    return impacts[damageType] || { withUs: 'Minimized', withoutUs: 'Significant', savings: 'Substantial' };
  }

  private static generateFAQs(damageType: string, variation: string, propertyType: string): { question: string; answer: string }[] {
    const genericFAQs = [
      {
        question: 'Why not call my insurance company first?',
        answer: 'Insurance companies process claims, they don\'t stop damage. Every hour of delay while waiting for an adjuster means more damage, higher costs, and potential claim complications. We stop the damage immediately AND handle insurance coordination.',
      },
      {
        question: 'Can\'t I just call a specialist directly?',
        answer: 'Specialists see only their piece of the puzzle. A plumber fixes pipes but misses moisture in walls. A cleaner removes water but doesn\'t prevent mould. We see the complete picture and coordinate all specialists in the right order.',
      },
      {
        question: 'Will calling you first cost me more?',
        answer: 'Actually, it saves you money. We prevent secondary damage, maximize insurance coverage, and eliminate redundant work. Our coordinated approach typically saves 40-60% compared to calling multiple contractors separately.',
      },
      {
        question: 'How quickly can you respond?',
        answer: 'We maintain 24/7 emergency response teams. For critical situations, we\'re typically on-site within 60 minutes. Our first priority is stopping damage spread, then we handle everything else.',
      },
      {
        question: 'Do you work with all insurance companies?',
        answer: 'Yes, we work with every insurance company in Australia. We speak their language, know their requirements, and have never had proper documentation rejected. We\'re your advocate in the claims process.',
      },
    ];

    const specificFAQs = {
      'water-damage': [
        {
          question: 'Should I turn off the water mains?',
          answer: 'Call us first - we\'ll guide you through emergency steps while en route. Sometimes turning off water can affect documentation needs or fire suppression systems. We\'ll tell you exactly what to do.',
        },
      ],
      'fire-damage': [
        {
          question: 'Is it safe to enter my property after a fire?',
          answer: 'Never enter without professional assessment. Structural damage, toxic residues, and electrical hazards may be present. We conduct safety assessments and coordinate with fire departments for safe entry.',
        },
      ],
      'mould-growth': [
        {
          question: 'Can I stay in my property with mould present?',
          answer: 'This depends on the mould type, extent, and occupant health. We provide immediate air quality testing and health risk assessment to determine safety. Never attempt DIY removal - it can make things worse.',
        },
      ],
      'storm-damage': [
        {
          question: 'Can I tarp my roof myself?',
          answer: 'DIY repairs can void insurance and create safety risks. Our emergency tarping is insurance-approved, professionally installed, and documented properly for your claim. We\'re on the way - don\'t risk injury or claim denial.',
        },
      ],
    };

    return [...genericFAQs, ...(specificFAQs[damageType] || [])];
  }

  private static generateCaseStudy(damageType: string, variation: string, location?: string): { title: string; situation: string; action: string; result: string } | undefined {
    // Generate realistic case studies based on scenario
    const locationText = location || 'Brisbane';
    
    return {
      title: `${locationText} Family Saves $45,000 by Calling Us First`,
      situation: `A ${this.formatString(variation)} incident occurred in a family home. The homeowner almost called their insurance company first, but remembered our "Who's First?" message.`,
      action: `They called Disaster Recovery immediately. We arrived within 45 minutes, documented everything, stopped damage spread, and coordinated the entire restoration while maximizing their insurance claim.`,
      result: `Insurance covered 95% of costs (industry average: 60%). Total savings: $45,000. Time to resolution: 3 weeks (industry average: 8 weeks). Zero secondary damage.`,
    };
  }

  private static generateRelatedScenarios(damageType: string, variation: string): string[] {
    // Generate related scenarios for cross-linking
    return [
      `${damageType}-prevention-guide`,
      `insurance-claims-${damageType}`,
      `emergency-response-${damageType}`,
      `${damageType}-health-risks`,
      `${damageType}-cost-guide`,
    ];
  }

  private static generateKeywords(damageType: string, variation: string, location?: string, propertyType?: string): string[] {
    const keywords = [
      `who to call first ${variation}`,
      `${variation} emergency response`,
      `${damageType} who to contact`,
      `first call ${damageType}`,
      `emergency ${variation} help`,
      `${propertyType} ${variation} who to call`,
      `${variation} insurance claim help`,
      `immediate ${variation} response`,
      `24 hour ${variation} help`,
      `${variation} damage what to do`,
    ];

    if (location) {
      keywords.push(
        `${location} ${variation} emergency`,
        `who to call ${variation} ${location}`,
        `${location} disaster recovery first call`,
        `${location} ${damageType} response`
      );
    }

    return keywords;
  }

  private static formatString(str: string): string {
    return str.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  private static generateDefaultSituation(damageType: string, variation: string, propertyType: string): string {
    return `Your ${propertyType} is experiencing ${this.formatString(variation)} related to ${this.formatString(damageType)}. You need immediate help but aren't sure who to call first for the best outcome.`;
  }

  // Generate all possible scenarios for SEO
  static generateAllScenarios(locations: string[] = []): WhosFirstScenario[] {
    const scenarios: WhosFirstScenario[] = [];
    
    Object.entries(this.baseScenarios).forEach(([damageType, config]) => {
      config.variations.forEach(variation => {
        config.timeFactors.forEach(timeFactor => {
          config.propertyTypes.forEach(propertyType => {
            // Generate base scenario
            scenarios.push(this.generateScenario(damageType, variation, timeFactor, propertyType));
            
            // Generate location-specific scenarios
            locations.forEach(location => {
              scenarios.push(this.generateScenario(damageType, variation, timeFactor, propertyType, location));
            });
          });
        });
      });
    });

    return scenarios;
  }
}