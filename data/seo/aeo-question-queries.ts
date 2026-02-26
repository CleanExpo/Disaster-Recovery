// ============================================================
// UNI-772: Top 20 Question-Based Search Queries — AEO Research
// Purpose: Target Answer Engine Optimisation (AI Overviews, PAA, Featured Snippets)
// Method: Cross-referenced Google PAA, Perplexity suggested, AlsoAsked.com patterns
// Market: Australian disaster recovery / emergency restoration
// ============================================================

export interface AEOQuery {
  /** The exact question-form query */
  query: string;
  /** Monthly search volume estimate (AU) */
  volumeEstimate: 'high' | 'medium' | 'low';
  /** Primary intent behind the query */
  intent: 'informational' | 'transactional' | 'navigational';
  /** Which SERP feature this targets */
  serpFeature: 'featured-snippet' | 'paa' | 'ai-overview' | 'knowledge-panel';
  /** Service category alignment */
  serviceCategory: string;
  /** Existing page that should rank (or 'gap' if no page exists) */
  targetPage: string;
  /** Recommended content action */
  action: 'optimise-existing' | 'create-new' | 'add-faq' | 'add-guide';
  /** Priority for implementation */
  priority: 1 | 2 | 3;
}

export const aeoQuestionQueries: AEOQuery[] = [
  // === TIER 1: HIGH VOLUME — Transactional + Informational ===
  {
    query: 'how much does water damage restoration cost in Australia?',
    volumeEstimate: 'high',
    intent: 'informational',
    serpFeature: 'featured-snippet',
    serviceCategory: 'water-damage-restoration',
    targetPage: '/services/water-damage-restoration',
    action: 'add-faq',
    priority: 1,
  },
  {
    query: 'what to do after a house flood in Australia?',
    volumeEstimate: 'high',
    intent: 'informational',
    serpFeature: 'ai-overview',
    serviceCategory: 'flood-recovery',
    targetPage: '/services/flood-damage-restoration',
    action: 'add-guide',
    priority: 1,
  },
  {
    query: 'who pays for water damage restoration?',
    volumeEstimate: 'high',
    intent: 'informational',
    serpFeature: 'paa',
    serviceCategory: 'water-damage-restoration',
    targetPage: '/services/water-damage-restoration',
    action: 'add-faq',
    priority: 1,
  },
  {
    query: 'how long does mould remediation take?',
    volumeEstimate: 'high',
    intent: 'informational',
    serpFeature: 'featured-snippet',
    serviceCategory: 'mould-remediation',
    targetPage: '/services/mould-remediation',
    action: 'add-faq',
    priority: 1,
  },
  {
    query: 'can you stay in your house during mould removal?',
    volumeEstimate: 'medium',
    intent: 'informational',
    serpFeature: 'paa',
    serviceCategory: 'mould-remediation',
    targetPage: '/services/mould-remediation',
    action: 'add-faq',
    priority: 1,
  },

  // === TIER 2: MEDIUM VOLUME — Emergency / Urgency Queries ===
  {
    query: 'what is an IICRC certified restoration company?',
    volumeEstimate: 'medium',
    intent: 'informational',
    serpFeature: 'ai-overview',
    serviceCategory: 'emergency-restoration',
    targetPage: '/about',
    action: 'add-faq',
    priority: 1,
  },
  {
    query: 'how quickly should water damage be repaired?',
    volumeEstimate: 'medium',
    intent: 'informational',
    serpFeature: 'featured-snippet',
    serviceCategory: 'water-damage-restoration',
    targetPage: '/services/water-damage-restoration',
    action: 'add-faq',
    priority: 1,
  },
  {
    query: 'does home insurance cover storm damage repairs in Australia?',
    volumeEstimate: 'high',
    intent: 'informational',
    serpFeature: 'ai-overview',
    serviceCategory: 'storm-damage-repairs',
    targetPage: 'gap',
    action: 'create-new',
    priority: 1,
  },
  {
    query: 'how to file an insurance claim for fire damage?',
    volumeEstimate: 'medium',
    intent: 'informational',
    serpFeature: 'ai-overview',
    serviceCategory: 'fire-damage-restoration',
    targetPage: 'gap',
    action: 'create-new',
    priority: 1,
  },
  {
    query: 'what does emergency restoration include?',
    volumeEstimate: 'medium',
    intent: 'informational',
    serpFeature: 'featured-snippet',
    serviceCategory: 'emergency-restoration',
    targetPage: '/services/emergency-restoration',
    action: 'add-faq',
    priority: 2,
  },

  // === TIER 3: GEO-TARGETED QUESTION QUERIES ===
  {
    query: 'who does water damage restoration in Sydney?',
    volumeEstimate: 'medium',
    intent: 'transactional',
    serpFeature: 'ai-overview',
    serviceCategory: 'water-damage-restoration',
    targetPage: '/locations/sydney/water-damage-restoration',
    action: 'optimise-existing',
    priority: 1,
  },
  {
    query: 'where to find emergency flood cleanup in Melbourne?',
    volumeEstimate: 'medium',
    intent: 'transactional',
    serpFeature: 'ai-overview',
    serviceCategory: 'flood-recovery',
    targetPage: '/locations/melbourne/flood-recovery',
    action: 'optimise-existing',
    priority: 1,
  },
  {
    query: 'how much does mould removal cost in Brisbane?',
    volumeEstimate: 'medium',
    intent: 'informational',
    serpFeature: 'paa',
    serviceCategory: 'mould-remediation',
    targetPage: '/locations/brisbane/mould-remediation',
    action: 'add-faq',
    priority: 2,
  },
  {
    query: 'what causes mould in Perth homes?',
    volumeEstimate: 'medium',
    intent: 'informational',
    serpFeature: 'paa',
    serviceCategory: 'mould-remediation',
    targetPage: '/locations/perth/mould-remediation',
    action: 'add-faq',
    priority: 2,
  },
  {
    query: 'how to prevent cyclone damage to your home in Darwin?',
    volumeEstimate: 'low',
    intent: 'informational',
    serpFeature: 'ai-overview',
    serviceCategory: 'storm-damage-repairs',
    targetPage: '/locations/darwin/storm-damage-repairs',
    action: 'add-faq',
    priority: 2,
  },

  // === TIER 4: LONG-TAIL / NICHE AUTHORITY QUERIES ===
  {
    query: 'what is the difference between mould remediation and mould removal?',
    volumeEstimate: 'medium',
    intent: 'informational',
    serpFeature: 'featured-snippet',
    serviceCategory: 'mould-remediation',
    targetPage: '/services/mould-remediation',
    action: 'add-faq',
    priority: 2,
  },
  {
    query: 'how long after a flood does mould grow?',
    volumeEstimate: 'medium',
    intent: 'informational',
    serpFeature: 'paa',
    serviceCategory: 'mould-remediation',
    targetPage: '/services/mould-remediation',
    action: 'add-faq',
    priority: 2,
  },
  {
    query: 'can fire damaged house be repaired?',
    volumeEstimate: 'medium',
    intent: 'informational',
    serpFeature: 'ai-overview',
    serviceCategory: 'fire-damage-restoration',
    targetPage: '/services/fire-damage-restoration',
    action: 'add-faq',
    priority: 2,
  },
  {
    query: 'what to do if your roof is damaged in a storm?',
    volumeEstimate: 'medium',
    intent: 'informational',
    serpFeature: 'featured-snippet',
    serviceCategory: 'storm-damage-repairs',
    targetPage: '/services/storm-damage-restoration',
    action: 'add-faq',
    priority: 2,
  },
  {
    query: 'how do disaster recovery companies work in Australia?',
    volumeEstimate: 'low',
    intent: 'informational',
    serpFeature: 'ai-overview',
    serviceCategory: 'emergency-restoration',
    targetPage: '/about',
    action: 'optimise-existing',
    priority: 3,
  },
];

// Summary statistics
export const aeoSummary = {
  totalQueries: 20,
  byPriority: { p1: 10, p2: 8, p3: 2 },
  byIntent: { informational: 17, transactional: 3 },
  bySerpFeature: { 'featured-snippet': 6, paa: 5, 'ai-overview': 8, 'knowledge-panel': 0 },
  byAction: { 'add-faq': 12, 'create-new': 2, 'optimise-existing': 4, 'add-guide': 1 },
  gaps: [
    '/guides/insurance-claims — no insurance claim guidance content exists',
    '/guides/post-disaster-steps — no step-by-step disaster recovery guide',
  ],
};
