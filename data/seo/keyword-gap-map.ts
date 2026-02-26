// ============================================================
// UNI-780: Keyword Gap Map — Missing City-Service Page Coverage
// UNI-781: Priority Keyword → Page Mapping
// Purpose: Identify where we have NO page for high-value keywords
// Method: Cross-reference validServices × validCities × suburb coverage
// ============================================================

export interface KeywordGap {
  /** The target keyword/phrase */
  keyword: string;
  /** Estimated monthly AU search volume */
  volumeEstimate: 'high' | 'medium' | 'low';
  /** Whether a page exists for this keyword */
  pageExists: boolean;
  /** Existing page URL (if any) */
  existingPage?: string;
  /** Recommended page to create (if gap) */
  recommendedPage?: string;
  /** Gap type */
  gapType: 'no-page' | 'no-suburb-depth' | 'no-service-variant' | 'no-guide-content' | 'covered';
  /** Priority for addressing */
  priority: 1 | 2 | 3;
  /** Notes on the gap */
  notes: string;
}

// ============================================================
// SECTION 1: GEOGRAPHIC GAPS
// Cities with NO suburb expansion (8 cities × 6 services = 48 pages, no suburb depth)
// ============================================================
export const geographicGaps: KeywordGap[] = [
  // --- Hobart (no suburbs) ---
  { keyword: 'water damage restoration hobart', volumeEstimate: 'medium', pageExists: true, existingPage: '/locations/hobart/water-damage-restoration', gapType: 'no-suburb-depth', priority: 2, notes: 'City page exists but no suburb expansion. Top suburbs needed: Sandy Bay, New Town, Glenorchy, Kingston, Moonah, Bellerive.' },
  { keyword: 'mould remediation hobart', volumeEstimate: 'medium', pageExists: true, existingPage: '/locations/hobart/mould-remediation', gapType: 'no-suburb-depth', priority: 2, notes: 'Hobart has high mould risk due to damp climate. Suburb pages would capture long-tail.' },

  // --- Canberra (no suburbs) ---
  { keyword: 'water damage restoration canberra', volumeEstimate: 'medium', pageExists: true, existingPage: '/locations/canberra/water-damage-restoration', gapType: 'no-suburb-depth', priority: 2, notes: 'City page exists but no suburb expansion. Top suburbs: Belconnen, Woden, Tuggeranong, Gungahlin, Civic, Weston Creek.' },
  { keyword: 'fire damage restoration canberra', volumeEstimate: 'medium', pageExists: true, existingPage: '/locations/canberra/fire-damage-restoration', gapType: 'no-suburb-depth', priority: 1, notes: 'Canberra has extreme bushfire risk (2003 fires). High-value keyword.' },

  // --- Newcastle (no suburbs) ---
  { keyword: 'flood recovery newcastle', volumeEstimate: 'medium', pageExists: true, existingPage: '/locations/newcastle/flood-recovery', gapType: 'no-suburb-depth', priority: 1, notes: 'Newcastle had severe 2007 and 2015 floods. Suburbs: Hamilton, Mayfield, Merewether, Charlestown, Lambton.' },
  { keyword: 'storm damage repairs newcastle', volumeEstimate: 'medium', pageExists: true, existingPage: '/locations/newcastle/storm-damage-repairs', gapType: 'no-suburb-depth', priority: 2, notes: 'East coast low events. Hunter Valley proximity.' },

  // --- Wollongong (no suburbs) ---
  { keyword: 'water damage restoration wollongong', volumeEstimate: 'low', pageExists: true, existingPage: '/locations/wollongong/water-damage-restoration', gapType: 'no-suburb-depth', priority: 3, notes: 'Illawarra region. Suburbs: Figtree, Corrimal, Fairy Meadow, Thirroul, Dapto.' },

  // --- Gold Coast (no suburbs) ---
  { keyword: 'water damage restoration gold coast', volumeEstimate: 'high', pageExists: true, existingPage: '/locations/gold-coast/water-damage-restoration', gapType: 'no-suburb-depth', priority: 1, notes: 'Gold Coast is a top-10 metro. Suburbs: Surfers Paradise, Broadbeach, Southport, Robina, Nerang, Burleigh Heads.' },
  { keyword: 'storm damage repairs gold coast', volumeEstimate: 'high', pageExists: true, existingPage: '/locations/gold-coast/storm-damage-repairs', gapType: 'no-suburb-depth', priority: 1, notes: 'Hailstorm corridor. Extremely high demand keyword.' },
  { keyword: 'mould remediation gold coast', volumeEstimate: 'medium', pageExists: true, existingPage: '/locations/gold-coast/mould-remediation', gapType: 'no-suburb-depth', priority: 1, notes: 'Subtropical climate = persistent mould. High conversion intent.' },

  // --- Sunshine Coast (no suburbs) ---
  { keyword: 'storm damage repairs sunshine coast', volumeEstimate: 'medium', pageExists: true, existingPage: '/locations/sunshine-coast/storm-damage-repairs', gapType: 'no-suburb-depth', priority: 2, notes: 'Severe storm corridor. Suburbs: Maroochydore, Caloundra, Noosa, Buderim, Nambour.' },

  // --- Geelong (no suburbs) ---
  { keyword: 'water damage restoration geelong', volumeEstimate: 'low', pageExists: true, existingPage: '/locations/geelong/water-damage-restoration', gapType: 'no-suburb-depth', priority: 3, notes: 'Growing metro. Suburbs: Belmont, Newtown, Corio, Highton, Lara.' },

  // --- Townsville (no suburbs) ---
  { keyword: 'flood recovery townsville', volumeEstimate: 'medium', pageExists: true, existingPage: '/locations/townsville/flood-recovery', gapType: 'no-suburb-depth', priority: 1, notes: '2019 monsoon flooding event — extremely high awareness. Suburbs: Aitkenvale, Kirwan, Cranbrook, Douglas, Pimlico.' },
];

// ============================================================
// SECTION 2: SERVICE VARIANT GAPS
// Services mentioned in CLAUDE.md but NOT in validServices (no pages exist)
// ============================================================
export const serviceVariantGaps: KeywordGap[] = [
  { keyword: 'sewage cleanup', volumeEstimate: 'medium', pageExists: false, recommendedPage: '/services/sewage-cleanup', gapType: 'no-service-variant', priority: 1, notes: 'Listed in CLAUDE.md service coverage. No dedicated page. Currently partially covered under water damage.' },
  { keyword: 'biohazard cleaning', volumeEstimate: 'medium', pageExists: false, recommendedPage: '/services/biohazard-cleaning', gapType: 'no-service-variant', priority: 2, notes: 'CLAUDE.md lists biohazard cleaning. No dedicated page. High-value commercial keyword.' },
  { keyword: 'trauma scene cleaning', volumeEstimate: 'low', pageExists: false, recommendedPage: '/services/trauma-cleaning', gapType: 'no-service-variant', priority: 2, notes: 'Specialist niche with low competition. High per-job value.' },
  { keyword: 'vandalism repair', volumeEstimate: 'low', pageExists: false, recommendedPage: '/services/vandalism-repair', gapType: 'no-service-variant', priority: 3, notes: 'CLAUDE.md lists vandalism repair. Low volume but zero competition.' },
  { keyword: 'emergency board up', volumeEstimate: 'medium', pageExists: false, recommendedPage: '/services/emergency-board-up', gapType: 'no-service-variant', priority: 2, notes: 'CLAUDE.md lists emergency board-up. High urgency transactional keyword.' },
  { keyword: 'bacteria decontamination', volumeEstimate: 'low', pageExists: false, recommendedPage: '/services/decontamination', gapType: 'no-service-variant', priority: 3, notes: 'Post-COVID awareness. Covers virus/bacteria/chemical decontamination.' },
];

// ============================================================
// SECTION 3: CONTENT/GUIDE GAPS
// Informational keywords with no matching content
// ============================================================
export const contentGaps: KeywordGap[] = [
  { keyword: 'what to do after house flood australia', volumeEstimate: 'high', pageExists: false, recommendedPage: '/guides/what-to-do-after-a-flood', gapType: 'no-guide-content', priority: 1, notes: 'High-volume informational query. Perfect for featured snippet + AI citation. Step-by-step guide format.' },
  { keyword: 'how to file insurance claim for water damage', volumeEstimate: 'high', pageExists: false, recommendedPage: '/guides/insurance-claims-guide', gapType: 'no-guide-content', priority: 1, notes: 'Massive search volume. Positions DR as authority. Must comply with CLAUDE.md billing model (client claims from insurer).' },
  { keyword: 'how to prevent mould after flooding', volumeEstimate: 'medium', pageExists: false, recommendedPage: '/guides/preventing-mould-after-flooding', gapType: 'no-guide-content', priority: 1, notes: 'Seasonal spike during flood season. Cross-links to mould remediation service pages.' },
  { keyword: 'fire damage restoration timeline', volumeEstimate: 'medium', pageExists: false, recommendedPage: '/guides/fire-damage-restoration-timeline', gapType: 'no-guide-content', priority: 2, notes: 'Step-by-step timeline content. HowTo schema opportunity.' },
  { keyword: 'how to choose a restoration company australia', volumeEstimate: 'medium', pageExists: false, recommendedPage: '/guides/choosing-a-restoration-company', gapType: 'no-guide-content', priority: 2, notes: 'Comparison/authority content. Positions NRPG as trusted advisor. E-E-A-T signal.' },
  { keyword: 'disaster recovery checklist for homeowners', volumeEstimate: 'medium', pageExists: false, recommendedPage: '/guides/disaster-recovery-checklist', gapType: 'no-guide-content', priority: 2, notes: 'Downloadable checklist opportunity. Lead magnet potential.' },
  { keyword: 'storm season preparation tips australia', volumeEstimate: 'medium', pageExists: false, recommendedPage: '/guides/storm-preparation', gapType: 'no-guide-content', priority: 3, notes: 'Seasonal content. Annual refresh opportunity. Builds topical authority.' },
];

// ============================================================
// SECTION 4: PRIORITY KEYWORD → PAGE MAPPING (UNI-781)
// Consolidated mapping of highest-priority keywords to target pages
// ============================================================
export interface KeywordPageMapping {
  keyword: string;
  volumeEstimate: 'high' | 'medium' | 'low';
  targetPage: string;
  pageStatus: 'exists' | 'needs-creation' | 'needs-suburb-expansion';
  priority: 1 | 2 | 3;
  estimatedImpact: 'high' | 'medium' | 'low';
  actionRequired: string;
}

export const priorityKeywordMapping: KeywordPageMapping[] = [
  // === PRIORITY 1: Highest Impact / Quickest Wins ===
  { keyword: 'water damage restoration sydney', volumeEstimate: 'high', targetPage: '/locations/sydney/water-damage-restoration', pageStatus: 'exists', priority: 1, estimatedImpact: 'high', actionRequired: 'Optimise title, add suburb internal links, enhance FAQ section' },
  { keyword: 'water damage restoration melbourne', volumeEstimate: 'high', targetPage: '/locations/melbourne/water-damage-restoration', pageStatus: 'exists', priority: 1, estimatedImpact: 'high', actionRequired: 'Optimise title, add suburb internal links, enhance FAQ section' },
  { keyword: 'water damage restoration brisbane', volumeEstimate: 'high', targetPage: '/locations/brisbane/water-damage-restoration', pageStatus: 'exists', priority: 1, estimatedImpact: 'high', actionRequired: 'Optimise title, add suburb internal links, enhance FAQ section' },
  { keyword: 'mould remediation sydney', volumeEstimate: 'high', targetPage: '/locations/sydney/mould-remediation', pageStatus: 'exists', priority: 1, estimatedImpact: 'high', actionRequired: 'Add cost FAQ, seasonal content, suburb links' },
  { keyword: 'flood recovery brisbane', volumeEstimate: 'high', targetPage: '/locations/brisbane/flood-recovery', pageStatus: 'exists', priority: 1, estimatedImpact: 'high', actionRequired: 'Add 2022 flood reference content, suburb internal links' },
  { keyword: 'storm damage gold coast', volumeEstimate: 'high', targetPage: '/locations/gold-coast/storm-damage-repairs', pageStatus: 'needs-suburb-expansion', priority: 1, estimatedImpact: 'high', actionRequired: 'Create Gold Coast suburb data file (25+ suburbs), wire into suburb-utils.ts' },
  { keyword: 'fire damage restoration canberra', volumeEstimate: 'medium', targetPage: '/locations/canberra/fire-damage-restoration', pageStatus: 'needs-suburb-expansion', priority: 1, estimatedImpact: 'high', actionRequired: 'Create Canberra suburb data file (20+ suburbs). Bushfire corridor = high value.' },
  { keyword: 'flood recovery townsville', volumeEstimate: 'medium', targetPage: '/locations/townsville/flood-recovery', pageStatus: 'needs-suburb-expansion', priority: 1, estimatedImpact: 'medium', actionRequired: 'Create Townsville suburb data file. 2019 monsoon = high awareness.' },

  // === PRIORITY 2: New Content Creation ===
  { keyword: 'what to do after house flood australia', volumeEstimate: 'high', targetPage: '/guides/what-to-do-after-a-flood', pageStatus: 'needs-creation', priority: 1, estimatedImpact: 'high', actionRequired: 'Create guide page with HowTo schema, step-by-step format, internal links to service pages' },
  { keyword: 'insurance claim water damage australia', volumeEstimate: 'high', targetPage: '/guides/insurance-claims-guide', pageStatus: 'needs-creation', priority: 1, estimatedImpact: 'high', actionRequired: 'Create guide — MUST comply with CLAUDE.md billing model (client-direct, not insurer billing)' },
  { keyword: 'sewage cleanup service', volumeEstimate: 'medium', targetPage: '/services/sewage-cleanup', pageStatus: 'needs-creation', priority: 1, estimatedImpact: 'medium', actionRequired: 'New service page + add to validServices + generate location variants' },
  { keyword: 'emergency board up service', volumeEstimate: 'medium', targetPage: '/services/emergency-board-up', pageStatus: 'needs-creation', priority: 2, estimatedImpact: 'medium', actionRequired: 'New service page + location variants' },
  { keyword: 'biohazard cleaning australia', volumeEstimate: 'medium', targetPage: '/services/biohazard-cleaning', pageStatus: 'needs-creation', priority: 2, estimatedImpact: 'medium', actionRequired: 'New service page. High per-job value, low competition.' },

  // === PRIORITY 3: Suburb Expansion for Remaining Metros ===
  { keyword: 'water damage restoration newcastle suburbs', volumeEstimate: 'medium', targetPage: '/locations/newcastle/*', pageStatus: 'needs-suburb-expansion', priority: 2, estimatedImpact: 'medium', actionRequired: 'Create Newcastle suburb data file (20+ suburbs)' },
  { keyword: 'mould remediation hobart suburbs', volumeEstimate: 'low', targetPage: '/locations/hobart/*', pageStatus: 'needs-suburb-expansion', priority: 2, estimatedImpact: 'low', actionRequired: 'Create Hobart suburb data file (15+ suburbs)' },
  { keyword: 'water damage wollongong suburbs', volumeEstimate: 'low', targetPage: '/locations/wollongong/*', pageStatus: 'needs-suburb-expansion', priority: 3, estimatedImpact: 'low', actionRequired: 'Create Wollongong suburb data file (15+ suburbs)' },
  { keyword: 'storm damage geelong suburbs', volumeEstimate: 'low', targetPage: '/locations/geelong/*', pageStatus: 'needs-suburb-expansion', priority: 3, estimatedImpact: 'low', actionRequired: 'Create Geelong suburb data file (15+ suburbs)' },
];

// ============================================================
// SUMMARY STATISTICS
// ============================================================
export const gapAnalysisSummary = {
  totalGaps: {
    geographic: 12,
    serviceVariant: 6,
    contentGuide: 7,
    priorityMappings: 17,
  },
  currentCoverage: {
    citiesWithSuburbs: 7,    // Sydney, Melbourne, Brisbane, Perth, Adelaide, Darwin, Cairns
    citiesWithoutSuburbs: 8,  // Hobart, Canberra, Newcastle, Wollongong, Gold Coast, Sunshine Coast, Geelong, Townsville
    totalLocationPages: 1140, // 90 city-service + 1050 suburb-service (175 suburbs × 6 services)
    totalPublicPages: 1846,   // 1140 dynamic + 706 static (services, guides, knowledge, etc.)
    serviceCategories: 6,     // water, fire, storm, mould, flood, emergency
    staticServicePages: 132,  // Under app/services/
    guidesAndKnowledge: 122,  // guides (59) + knowledge (14) + property-types (21) + industries (7) + certs (8) + case-studies (6) + emergency (1) + disasters (6)
    missingServiceCategories: 6, // sewage, biohazard, trauma, vandalism, board-up, decontamination
    guidePages: 59,           // Existing guides under app/guides/
  },
  recommendedNextSteps: [
    '1. Create Gold Coast + Canberra + Newcastle suburb data files (highest population gaps)',
    '2. Create /guides/what-to-do-after-a-flood guide page (highest volume informational query)',
    '3. Create /guides/insurance-claims-guide page (CLAUDE.md compliant)',
    '4. Add sewage cleanup to validServices + create service page',
    '5. Create Hobart + Townsville + Sunshine Coast suburb data files',
    '6. Add emergency board-up + biohazard cleaning service pages',
    '7. Expand suburb coverage to Wollongong + Geelong (lower priority)',
  ],
};
