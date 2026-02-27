/**
 * Internal cross-linking map for SEO link equity distribution.
 * Returns related pages based on the current page's category/slug.
 */

export interface RelatedPage {
  title: string;
  href: string;
  description: string;
}

type CategoryKey =
  | 'water-damage'
  | 'fire-damage'
  | 'mould'
  | 'storm-damage'
  | 'biohazard'
  | 'flood'
  | 'structural-drying'
  | 'location-sydney'
  | 'location-melbourne'
  | 'location-brisbane'
  | 'location-perth'
  | 'location-adelaide'
  | 'location-canberra'
  | 'location-hobart'
  | 'location-darwin'
  | 'location-gold-coast'
  | 'location-newcastle'
  | 'location-auckland'
  | 'cost-water'
  | 'cost-fire'
  | 'cost-mould'
  | 'cost-storm'
  | 'cost-flood'
  | 'insurance'
  | 'emergency'
  | 'commercial'
  | 'guides-general'
  | 'knowledge-base'
  | 'operational-excellence'
  | 'cost-estimator'
  | 'pricing'
  | 'how-it-works'
  | 'blog';

const RELATED_PAGES_MAP: Record<CategoryKey, RelatedPage[]> = {
  'water-damage': [
    { title: 'Water Damage Restoration Sydney', href: '/water-damage-restoration-sydney', description: 'Sydney-specific water damage costs, flood zones, and IICRC-certified contractors.' },
    { title: 'Water Damage Restoration Melbourne', href: '/water-damage-restoration-melbourne', description: 'Melbourne water damage guide — apartment defects, storm surges, and restoration costs.' },
    { title: 'Mould Remediation', href: '/services/mould-remediation', description: 'Water damage often leads to mould within 24-48 hours — get professional remediation.' },
    { title: 'Flood Damage Restoration', href: '/services/flood-damage-restoration', description: 'Specialist flood recovery including extraction, drying and structural repair.' },
    { title: 'Cost Estimator', href: '/tools/cost-estimator', description: 'Get an instant cost estimate for water damage restoration based on your property.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Navigate your insurance claim for water damage restoration.' },
  ],
  'fire-damage': [
    { title: 'Fire Damage Restoration Brisbane', href: '/fire-damage-restoration-brisbane', description: 'Brisbane fire damage guide — Queenslander homes, bushfire zones, and restoration costs.' },
    { title: 'Biohazard Cleanup', href: '/services/biohazard-cleaning', description: 'Post-fire biohazard and smoke residue decontamination services.' },
    { title: 'Emergency Response', href: '/services/emergency-response', description: '24/7 emergency response to secure and stabilise fire-damaged properties.' },
    { title: 'Cost Estimator', href: '/tools/cost-estimator', description: 'Get an instant cost estimate for fire damage restoration based on your property.' },
    { title: 'Fire Damage Cost Guide', href: '/cost/sydney-fire-damage', description: 'Typical fire damage restoration costs and what to expect.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Step-by-step guide to filing your fire damage insurance claim.' },
  ],
  'mould': [
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Fix the water source causing mould growth with professional restoration.' },
    { title: 'Structural Drying', href: '/services/structural-drying', description: 'Eliminate moisture that feeds mould with industrial drying equipment.' },
    { title: 'Mould Health Guide', href: '/guides/mould', description: 'Understand health risks of mould exposure and when to act.' },
    { title: 'Indoor Environmental Assessment', href: '/services/indoor-environmental-professional', description: 'Professional air quality and mould testing for your property.' },
    { title: 'Mould Removal Cost Guide', href: '/cost/sydney-mould-removal', description: 'What does professional mould remediation cost in Australia?' },
    { title: 'Flood Damage Restoration', href: '/services/flood-damage-restoration', description: 'Post-flood restoration to prevent mould colonisation.' },
  ],
  'storm-damage': [
    { title: 'Storm Damage Restoration Gold Coast', href: '/storm-damage-restoration-gold-coast', description: 'Gold Coast storm damage guide — supercell hailstorms, high-rise wind damage, and costs.' },
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Storm water ingress requires immediate water damage response.' },
    { title: 'Flood Damage Restoration', href: '/services/flood-damage-restoration', description: 'Flash flooding from storms needs specialist flood recovery.' },
    { title: 'Emergency Response', href: '/services/emergency-response', description: '24/7 emergency board-up and tarping after storm damage.' },
    { title: 'Storm Damage Cost Guide', href: '/cost/sydney-storm-damage', description: 'Understand storm damage repair costs across Australia.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'How to claim storm damage on your insurance policy.' },
  ],
  'biohazard': [
    { title: 'Trauma Cleanup', href: '/services/trauma-cleanup', description: 'Compassionate and certified trauma scene restoration.' },
    { title: 'Meth Lab Decontamination', href: '/services/meth-lab-decontamination', description: 'Certified methamphetamine contamination remediation.' },
    { title: 'Fire Damage Restoration', href: '/services/fire-damage-restoration', description: 'Post-fire biohazard and smoke damage restoration.' },
    { title: 'Sewage Cleanup', href: '/services/sewage-cleanup', description: 'Category 3 black water and sewage overflow cleanup.' },
    { title: 'Commercial Services', href: '/services/commercial-services', description: 'Commercial-grade biohazard decontamination for businesses.' },
    { title: 'Emergency Response', href: '/services/emergency-response', description: 'Immediate biohazard containment and response.' },
  ],
  'flood': [
    { title: 'Flood Damage Restoration Perth', href: '/flood-damage-restoration-perth', description: 'Perth flood damage guide — Swan River flood zones, sandy soil risks, and restoration costs.' },
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Complete water extraction and drying after flood events.' },
    { title: 'Mould Remediation', href: '/services/mould-remediation', description: 'Post-flood mould prevention and remediation services.' },
    { title: 'Sewage Cleanup', href: '/services/sewage-cleanup', description: 'Contaminated floodwater requires specialist sewage cleanup.' },
    { title: 'Flood Restoration Cost Guide', href: '/cost/sydney-flood-restoration', description: 'What does flood damage restoration cost?' },
    { title: 'Emergency Response', href: '/services/emergency-response', description: '24/7 emergency flood response and water extraction.' },
  ],
  'structural-drying': [
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Full water damage restoration including structural drying.' },
    { title: 'Mould Remediation', href: '/services/mould-remediation', description: 'Prevent mould with proper structural drying techniques.' },
    { title: 'Flood Damage Restoration', href: '/services/flood-damage-restoration', description: 'Post-flood structural drying and dehumidification.' },
    { title: 'Equipment Guide', href: '/guides/equipment', description: 'Learn about the industrial drying equipment we use.' },
    { title: 'Technical Assessment', href: '/services/technical-assessment', description: 'Moisture mapping and technical drying assessment.' },
  ],
  'location-sydney': [
    { title: 'Water Damage Restoration Sydney', href: '/water-damage-restoration-sydney', description: 'Complete guide to water damage restoration in Sydney — costs, flood zones, and response times.' },
    { title: 'Sydney Water Damage Costs', href: '/cost/sydney-water-damage', description: 'Water damage restoration costs in Sydney.' },
    { title: 'Sydney Fire Damage Costs', href: '/cost/sydney-fire-damage', description: 'Fire damage restoration costs in Sydney.' },
    { title: 'Sydney Mould Removal Costs', href: '/cost/sydney-mould-removal', description: 'Mould remediation costs in Sydney.' },
    { title: 'Melbourne Services', href: '/locations/melbourne', description: 'Disaster recovery services in Melbourne.' },
    { title: 'Newcastle Services', href: '/locations/newcastle', description: 'Disaster recovery services in Newcastle.' },
  ],
  'location-melbourne': [
    { title: 'Water Damage Restoration Melbourne', href: '/water-damage-restoration-melbourne', description: 'Complete guide to water damage restoration in Melbourne — costs, apartment issues, and response.' },
    { title: 'Melbourne Water Damage Costs', href: '/cost/melbourne-water-damage', description: 'Water damage restoration costs in Melbourne.' },
    { title: 'Melbourne Fire Damage Costs', href: '/cost/melbourne-fire-damage', description: 'Fire damage restoration costs in Melbourne.' },
    { title: 'Melbourne Mould Removal Costs', href: '/cost/melbourne-mould-removal', description: 'Mould remediation costs in Melbourne.' },
    { title: 'Sydney Services', href: '/locations/sydney', description: 'Disaster recovery services in Sydney.' },
    { title: 'Adelaide Services', href: '/locations/adelaide', description: 'Disaster recovery services in Adelaide.' },
  ],
  'location-brisbane': [
    { title: 'Fire Damage Restoration Brisbane', href: '/fire-damage-restoration-brisbane', description: 'Complete guide to fire damage restoration in Brisbane — Queenslander homes, costs, and response.' },
    { title: 'Brisbane Water Damage Costs', href: '/cost/brisbane-water-damage', description: 'Water damage restoration costs in Brisbane.' },
    { title: 'Brisbane Mould Removal Costs', href: '/cost/brisbane-mould-removal', description: 'Mould remediation costs in Brisbane.' },
    { title: 'Gold Coast Services', href: '/locations/gold-coast', description: 'Disaster recovery services on the Gold Coast.' },
    { title: 'Sydney Services', href: '/locations/sydney', description: 'Disaster recovery services in Sydney.' },
    { title: 'Melbourne Services', href: '/locations/melbourne', description: 'Disaster recovery services in Melbourne.' },
  ],
  'location-perth': [
    { title: 'Flood Damage Restoration Perth', href: '/flood-damage-restoration-perth', description: 'Complete guide to flood damage restoration in Perth — Swan River zones, costs, and response.' },
    { title: 'Perth Water Damage Costs', href: '/cost/perth-water-damage', description: 'Water damage restoration costs in Perth.' },
    { title: 'Perth Fire Damage Costs', href: '/cost/perth-fire-damage', description: 'Fire damage restoration costs in Perth.' },
    { title: 'Perth Mould Removal Costs', href: '/cost/perth-mould-removal', description: 'Mould remediation costs in Perth.' },
    { title: 'Adelaide Services', href: '/locations/adelaide', description: 'Disaster recovery services in Adelaide.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Navigate your insurance claim for restoration.' },
  ],
  'location-adelaide': [
    { title: 'Adelaide Water Damage', href: '/cost/adelaide-water-damage', description: 'Water damage restoration costs in Adelaide.' },
    { title: 'Adelaide Fire Damage', href: '/cost/adelaide-fire-damage', description: 'Fire damage restoration costs in Adelaide.' },
    { title: 'Adelaide Mould Removal', href: '/cost/adelaide-mould-removal', description: 'Mould remediation costs in Adelaide.' },
    { title: 'SA State Services', href: '/locations/sa', description: 'Disaster recovery services across South Australia.' },
    { title: 'Melbourne Services', href: '/locations/melbourne', description: 'Disaster recovery services in Melbourne.' },
    { title: 'Perth Services', href: '/locations/perth', description: 'Disaster recovery services in Perth.' },
  ],
  'location-canberra': [
    { title: 'ACT State Services', href: '/locations/act', description: 'Disaster recovery services across the ACT.' },
    { title: 'Belconnen Services', href: '/locations/act/belconnen', description: 'Disaster recovery services in Belconnen.' },
    { title: 'Tuggeranong Services', href: '/locations/act/tuggeranong', description: 'Disaster recovery services in Tuggeranong.' },
    { title: 'Sydney Services', href: '/locations/sydney', description: 'Disaster recovery services in Sydney.' },
    { title: 'Melbourne Services', href: '/locations/melbourne', description: 'Disaster recovery services in Melbourne.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Navigate your insurance claim for restoration.' },
  ],
  'location-hobart': [
    { title: 'TAS State Services', href: '/locations/tas', description: 'Disaster recovery services across Tasmania.' },
    { title: 'Launceston Services', href: '/locations/tas/launceston', description: 'Disaster recovery services in Launceston.' },
    { title: 'Burnie Services', href: '/locations/tas/burnie', description: 'Disaster recovery services in Burnie.' },
    { title: 'Melbourne Services', href: '/locations/melbourne', description: 'Disaster recovery services in Melbourne.' },
    { title: 'Adelaide Services', href: '/locations/adelaide', description: 'Disaster recovery services in Adelaide.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Navigate your insurance claim for restoration.' },
  ],
  'location-darwin': [
    { title: 'NT State Services', href: '/locations/nt', description: 'Disaster recovery services across the Northern Territory.' },
    { title: 'Palmerston Services', href: '/locations/nt/palmerston', description: 'Disaster recovery services in Palmerston.' },
    { title: 'Alice Springs Services', href: '/locations/nt/alice-springs', description: 'Disaster recovery services in Alice Springs.' },
    { title: 'Brisbane Services', href: '/locations/brisbane', description: 'Disaster recovery services in Brisbane.' },
    { title: 'Perth Services', href: '/locations/perth', description: 'Disaster recovery services in Perth.' },
    { title: 'Cairns Services', href: '/locations/qld/cairns', description: 'Disaster recovery services in Cairns.' },
  ],
  'location-gold-coast': [
    { title: 'Storm Damage Restoration Gold Coast', href: '/storm-damage-restoration-gold-coast', description: 'Complete guide to storm damage on the Gold Coast — supercells, hail, and restoration costs.' },
    { title: 'Gold Coast Water Damage Costs', href: '/cost/gold-coast-water-damage', description: 'Water damage restoration costs on the Gold Coast.' },
    { title: 'Gold Coast Mould Removal Costs', href: '/cost/gold-coast-mould-removal', description: 'Mould remediation costs on the Gold Coast.' },
    { title: 'Brisbane Services', href: '/locations/brisbane', description: 'Disaster recovery services in Brisbane.' },
    { title: 'Sunshine Coast Services', href: '/locations/sunshine-coast', description: 'Disaster recovery services on the Sunshine Coast.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Navigate your insurance claim for storm damage.' },
  ],
  'location-newcastle': [
    { title: 'Newcastle Water Damage', href: '/cost/newcastle-water-damage', description: 'Water damage restoration costs in Newcastle.' },
    { title: 'Newcastle Mould Removal', href: '/cost/newcastle-mould-removal', description: 'Mould remediation costs in Newcastle.' },
    { title: 'NSW State Services', href: '/locations/nsw', description: 'Disaster recovery services across New South Wales.' },
    { title: 'Sydney Services', href: '/locations/sydney', description: 'Disaster recovery services in Sydney.' },
    { title: 'Central Coast Services', href: '/locations/nsw/central-coast', description: 'Disaster recovery services on the Central Coast.' },
    { title: 'Wollongong Services', href: '/locations/nsw/wollongong', description: 'Disaster recovery services in Wollongong.' },
  ],
  'location-auckland': [
    { title: 'Sydney Services', href: '/locations/sydney', description: 'Disaster recovery services in Sydney.' },
    { title: 'Melbourne Services', href: '/locations/melbourne', description: 'Disaster recovery services in Melbourne.' },
    { title: 'Brisbane Services', href: '/locations/brisbane', description: 'Disaster recovery services in Brisbane.' },
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Professional water damage restoration services.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Navigate your insurance claim for restoration.' },
    { title: 'Emergency Response', href: '/services/emergency-response', description: '24/7 emergency disaster response.' },
  ],
  'cost-water': [
    { title: 'Water Damage Pricing by City', href: '/pricing', description: 'Detailed pricing breakdowns for water damage restoration in every major city.' },
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Professional water damage restoration services.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'How to claim water damage on your insurance.' },
    { title: 'Cost Estimator Tool', href: '/tools/cost-estimator', description: 'Instant cost estimate based on your specific situation.' },
    { title: 'All Cost Guides', href: '/cost', description: 'Browse cost guides for all damage types across Australia.' },
  ],
  'cost-fire': [
    { title: 'Fire Damage Pricing by City', href: '/pricing', description: 'Detailed pricing breakdowns for fire damage restoration in every major city.' },
    { title: 'Fire Damage Restoration', href: '/services/fire-damage-restoration', description: 'Professional fire and smoke damage restoration.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Filing your fire damage insurance claim.' },
    { title: 'Cost Estimator Tool', href: '/tools/cost-estimator', description: 'Instant cost estimate based on your specific situation.' },
    { title: 'All Cost Guides', href: '/cost', description: 'Browse cost guides for all damage types across Australia.' },
  ],
  'cost-mould': [
    { title: 'Mould Removal Pricing by City', href: '/pricing', description: 'Detailed pricing breakdowns for mould removal in every major city.' },
    { title: 'Mould Remediation', href: '/services/mould-remediation', description: 'Professional mould removal and remediation.' },
    { title: 'Mould Health Guide', href: '/guides/mould', description: 'Health risks of mould exposure.' },
    { title: 'Cost Estimator Tool', href: '/tools/cost-estimator', description: 'Instant cost estimate based on your specific situation.' },
    { title: 'All Cost Guides', href: '/cost', description: 'Browse cost guides for all damage types across Australia.' },
  ],
  'cost-storm': [
    { title: 'Storm Damage Pricing by City', href: '/pricing', description: 'Detailed pricing breakdowns for storm damage restoration in every major city.' },
    { title: 'Storm Damage Restoration', href: '/services/storm-damage-restoration', description: 'Professional storm damage repair services.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'How to claim storm damage on insurance.' },
    { title: 'Cost Estimator Tool', href: '/tools/cost-estimator', description: 'Instant cost estimate based on your specific situation.' },
    { title: 'All Cost Guides', href: '/cost', description: 'Browse cost guides for all damage types across Australia.' },
  ],
  'cost-flood': [
    { title: 'Flood Recovery Pricing by City', href: '/pricing', description: 'Detailed pricing breakdowns for flood restoration in every major city.' },
    { title: 'Flood Damage Restoration', href: '/services/flood-damage-restoration', description: 'Specialist flood recovery services.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Filing your flood damage insurance claim.' },
    { title: 'Cost Estimator Tool', href: '/tools/cost-estimator', description: 'Instant cost estimate based on your specific situation.' },
    { title: 'All Cost Guides', href: '/cost', description: 'Browse cost guides for all damage types across Australia.' },
  ],
  'insurance': [
    { title: 'Emergency Make-Safe Guide', href: '/insurance/emergency-make-safe-guide', description: '$2,750 emergency service, insurance reimbursement, and your right to choose a contractor.' },
    { title: 'Cost Estimator', href: '/tools/cost-estimator', description: 'Instant cost estimate with insurance coverage likelihood for any damage type.' },
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Water damage services covered by most insurers.' },
    { title: 'Fire Damage Restoration', href: '/services/fire-damage-restoration', description: 'Fire damage restoration insurance claims.' },
    { title: 'Storm Damage Restoration', href: '/services/storm-damage-restoration', description: 'Storm damage insurance coverage guide.' },
    { title: 'Emergency Response', href: '/services/emergency-response', description: '24/7 emergency response for insured events.' },
  ],
  'emergency': [
    { title: 'Emergency Make-Safe Guide', href: '/insurance/emergency-make-safe-guide', description: 'Understand the $2,750 make-safe cost and how to claim reimbursement from your insurer.' },
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Emergency water extraction and restoration.' },
    { title: 'Fire Damage Restoration', href: '/services/fire-damage-restoration', description: 'Emergency fire damage response and restoration.' },
    { title: 'Storm Damage Restoration', href: '/services/storm-damage-restoration', description: 'Emergency storm damage repair.' },
    { title: 'Biohazard Cleanup', href: '/services/biohazard-cleaning', description: 'Emergency biohazard containment and cleanup.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Start your insurance claim after an emergency.' },
  ],
  'commercial': [
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Commercial water damage restoration services.' },
    { title: 'Fire Damage Restoration', href: '/services/fire-damage-restoration', description: 'Commercial fire damage restoration.' },
    { title: 'Mould Remediation', href: '/services/mould-remediation', description: 'Commercial mould inspection and removal.' },
    { title: 'Emergency Response', href: '/services/emergency-response', description: '24/7 commercial emergency response.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Commercial property insurance claims.' },
  ],
  'guides-general': [
    { title: 'Water Damage Guide', href: '/guides/water-damage', description: 'Complete guide to water damage restoration.' },
    { title: 'Insurance Guide', href: '/guides/insurance', description: 'Navigate your disaster insurance claim.' },
    { title: 'Browse by Industry', href: '/industries', description: 'Disaster recovery tailored to agriculture, healthcare, education, mining, and more.' },
    { title: 'Browse by Property Type', href: '/property-types', description: 'Services for every property from residential homes to high-rise towers.' },
    { title: 'Disaster Types', href: '/disasters', description: 'Bushfire, cyclone, flood, storm and coastal erosion response across Australia.' },
    { title: 'Compare Options', href: '/compare', description: 'Side-by-side comparisons — DIY vs professional, insurance vs cash, and more.' },
  ],
  'knowledge-base': [
    { title: 'Water Damage Science', href: '/knowledge/water-damage-restoration-science', description: 'IICRC S500 water damage categories, classes, and psychrometric drying science.' },
    { title: 'Mould Remediation Standards', href: '/knowledge/mould-remediation-standards', description: 'IICRC S520 mould remediation protocols and Australian health guidelines.' },
    { title: 'Fire Damage Restoration', href: '/knowledge/fire-damage-restoration-process', description: 'Four-phase fire restoration process including smoke and soot science.' },
    { title: 'Cost Guides', href: '/cost', description: 'Transparent restoration cost guides across Australia.' },
    { title: 'Pricing by City', href: '/pricing', description: 'City-specific pricing for all damage types.' },
    { title: 'Guides & Resources', href: '/guides', description: 'Practical restoration guides for property owners.' },
  ],
  'operational-excellence': [
    { title: 'Command Ecosystem', href: '/operational-excellence/command-ecosystem', description: 'Integrated technology for claims management, GPS dispatch and IICRC-compliant digital workflows.' },
    { title: 'Safety & PPE', href: '/operational-excellence/safety-ppe', description: 'Rigorous safety standards, hazmat suits, respirators and WHS-compliant protective equipment.' },
    { title: 'Field Essentials', href: '/operational-excellence/field-essentials', description: 'Battle-tested deployment kits with flashlights, power banks and weatherproof gear.' },
    { title: 'Executive Partners', href: '/operational-excellence/executive-partners', description: 'IICRC, CARSI, RestoreAssist and NRPG industry-leading affiliations.' },
    { title: 'Chemical & Remediation Assets', href: '/operational-excellence/chemical-remediation-assets', description: 'Negative air machines, antimicrobial treatments and branded containment systems.' },
    { title: 'Emergency Response', href: '/services/emergency-response', description: '24/7 emergency disaster response across Australia and New Zealand.' },
  ],
  'pricing': [
    { title: 'All Cost Guides', href: '/cost', description: 'In-depth cost guides with insurance coverage info for all damage types.' },
    { title: 'Cost Estimator Tool', href: '/tools/cost-estimator', description: 'Get an instant personalised cost estimate.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Navigate your insurance claim step by step.' },
    { title: 'Minimum Callout Fees', href: '/pricing/minimum-callout', description: 'Emergency callout minimum fees across Australia.' },
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Professional water damage restoration services.' },
    { title: 'Knowledge Base', href: '/knowledge', description: 'IICRC standards, Australian law, and restoration science.' },
  ],
  'cost-estimator': [
    { title: 'Water Damage Cost Guide', href: '/cost/sydney-water-damage', description: 'Detailed water damage restoration costs by city across Australia.' },
    { title: 'Fire Damage Cost Guide', href: '/cost/sydney-fire-damage', description: 'Fire and smoke damage restoration pricing and insurance coverage.' },
    { title: 'Emergency Make-Safe Guide', href: '/insurance/emergency-make-safe-guide', description: '$2,750 emergency service, insurance reimbursement, and your rights.' },
    { title: 'Is It Covered?', href: '/is-it-covered', description: 'Check if your damage type is covered by your insurance policy.' },
    { title: 'Lodge a Claim', href: '/claim', description: 'Start your insurance claim with a free assessment and full claims documentation.' },
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Professional water damage restoration services across Australia.' },
  ],
  'how-it-works': [
    { title: 'Emergency Make-Safe Guide', href: '/insurance/emergency-make-safe-guide', description: '$2,750 emergency service, insurance reimbursement, and your right to choose a contractor.' },
    { title: 'Lodge a Claim', href: '/claim', description: 'Start your insurance claim online with 24/7 availability.' },
    { title: 'Browse by Industry', href: '/industries', description: 'Disaster recovery tailored to your industry — agriculture, healthcare, mining, and more.' },
    { title: 'Browse by Property Type', href: '/property-types', description: 'Services for every property from residential homes to high-rise towers.' },
    { title: 'Compare Options', href: '/compare', description: 'Side-by-side comparisons — DIY vs professional, insurance vs cash, and more.' },
    { title: 'Disaster Types', href: '/disasters', description: 'Bushfire, cyclone, flood, storm and coastal erosion recovery.' },
  ],
  'blog': [
    { title: 'Water Damage Guide', href: '/guides/water-damage', description: 'Complete guide to water damage restoration.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Navigate your insurance claim step by step.' },
    { title: 'Water Damage Science', href: '/knowledge/water-damage-restoration-science', description: 'IICRC S500 water damage science and standards.' },
    { title: 'Cost Estimator', href: '/tools/cost-estimator', description: 'Get an instant restoration cost estimate.' },
    { title: 'How It Works', href: '/how-it-works', description: 'Learn how our platform connects you with contractors.' },
  ],
};

/**
 * Get related pages for a given route slug.
 * Matches the slug against known categories and returns cross-links.
 */
export function getRelatedPages(slug: string): RelatedPage[] {
  // Direct category match
  if (slug in RELATED_PAGES_MAP) {
    return RELATED_PAGES_MAP[slug as CategoryKey];
  }

  // Pattern-based matching
  if (slug.includes('how-it-works')) return RELATED_PAGES_MAP['how-it-works'];
  if (slug.includes('blog')) return RELATED_PAGES_MAP['blog'];
  if (slug.includes('operational-excellence')) return RELATED_PAGES_MAP['operational-excellence'];
  if (slug.includes('water-damage')) return RELATED_PAGES_MAP['water-damage'];
  if (slug.includes('fire-damage')) return RELATED_PAGES_MAP['fire-damage'];
  if (slug.includes('mould') || slug.includes('mold')) return RELATED_PAGES_MAP['mould'];
  if (slug.includes('storm-damage') || slug.includes('cyclone')) return RELATED_PAGES_MAP['storm-damage'];
  if (slug.includes('biohazard') || slug.includes('trauma')) return RELATED_PAGES_MAP['biohazard'];
  if (slug.includes('flood')) return RELATED_PAGES_MAP['flood'];
  if (slug.includes('structural-drying')) return RELATED_PAGES_MAP['structural-drying'];
  if (slug.includes('sewage')) return RELATED_PAGES_MAP['biohazard'];
  if (slug.includes('insurance')) return RELATED_PAGES_MAP['insurance'];
  if (slug.includes('emergency')) return RELATED_PAGES_MAP['emergency'];
  if (slug.includes('commercial')) return RELATED_PAGES_MAP['commercial'];

  // Cost estimator tool
  if (slug.includes('cost-estimator')) return RELATED_PAGES_MAP['cost-estimator'];

  // Pricing pages
  if (slug.includes('pricing')) return RELATED_PAGES_MAP['pricing'];

  // Cost page matching
  if (slug.includes('cost')) {
    if (slug.includes('water')) return RELATED_PAGES_MAP['cost-water'];
    if (slug.includes('fire')) return RELATED_PAGES_MAP['cost-fire'];
    if (slug.includes('mould') || slug.includes('mold')) return RELATED_PAGES_MAP['cost-mould'];
    if (slug.includes('storm')) return RELATED_PAGES_MAP['cost-storm'];
    if (slug.includes('flood')) return RELATED_PAGES_MAP['cost-flood'];
  }

  // Location matching
  if (slug.includes('sydney')) return RELATED_PAGES_MAP['location-sydney'];
  if (slug.includes('melbourne')) return RELATED_PAGES_MAP['location-melbourne'];
  if (slug.includes('brisbane')) return RELATED_PAGES_MAP['location-brisbane'];
  if (slug.includes('perth')) return RELATED_PAGES_MAP['location-perth'];
  if (slug.includes('adelaide')) return RELATED_PAGES_MAP['location-adelaide'];
  if (slug.includes('canberra') || slug.includes('act')) return RELATED_PAGES_MAP['location-canberra'];
  if (slug.includes('hobart') || slug.includes('tas')) return RELATED_PAGES_MAP['location-hobart'];
  if (slug.includes('darwin')) return RELATED_PAGES_MAP['location-darwin'];
  if (slug.includes('gold-coast')) return RELATED_PAGES_MAP['location-gold-coast'];
  if (slug.includes('newcastle')) return RELATED_PAGES_MAP['location-newcastle'];
  if (slug.includes('auckland')) return RELATED_PAGES_MAP['location-auckland'];

  // Knowledge pages
  if (slug.includes('knowledge') || slug.includes('iicrc') || slug.includes('psychrometric')) return RELATED_PAGES_MAP['knowledge-base'];

  // Guide pages
  if (slug.includes('guide')) return RELATED_PAGES_MAP['guides-general'];

  return [];
}
