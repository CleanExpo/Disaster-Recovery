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
  | 'how-it-works'
  | 'blog';

const RELATED_PAGES_MAP: Record<CategoryKey, RelatedPage[]> = {
  'water-damage': [
    { title: 'Mould Remediation', href: '/services/mould-remediation', description: 'Water damage often leads to mould within 24-48 hours — get professional remediation.' },
    { title: 'Flood Damage Restoration', href: '/services/flood-damage-restoration', description: 'Specialist flood recovery including extraction, drying and structural repair.' },
    { title: 'Structural Drying', href: '/services/structural-drying', description: 'Industrial-grade drying to prevent long-term moisture damage to your property.' },
    { title: 'Storm Damage Restoration', href: '/services/storm-damage-restoration', description: 'Comprehensive storm damage repair including roof, water and debris removal.' },
    { title: 'Cost Estimator', href: '/tools/cost-estimator', description: 'Get an instant cost estimate for water damage restoration based on your property.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Navigate your insurance claim for water damage restoration.' },
  ],
  'fire-damage': [
    { title: 'Biohazard Cleanup', href: '/services/biohazard-cleaning', description: 'Post-fire biohazard and smoke residue decontamination services.' },
    { title: 'Commercial Fire Restoration', href: '/services/commercial-services', description: 'Minimise business downtime with commercial fire damage restoration.' },
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
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Storm water ingress requires immediate water damage response.' },
    { title: 'Flood Damage Restoration', href: '/services/flood-damage-restoration', description: 'Flash flooding from storms needs specialist flood recovery.' },
    { title: 'Emergency Response', href: '/services/emergency-response', description: '24/7 emergency board-up and tarping after storm damage.' },
    { title: 'Cyclone Damage Restoration', href: '/services/cyclone-damage-restoration', description: 'Specialist cyclone and severe storm damage recovery.' },
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
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Complete water extraction and drying after flood events.' },
    { title: 'Mould Remediation', href: '/services/mould-remediation', description: 'Post-flood mould prevention and remediation services.' },
    { title: 'Structural Drying', href: '/services/structural-drying', description: 'Industrial dehumidification to dry flood-affected structures.' },
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
    { title: 'Sydney Water Damage', href: '/cost/sydney-water-damage', description: 'Water damage restoration costs in Sydney.' },
    { title: 'Sydney Fire Damage', href: '/cost/sydney-fire-damage', description: 'Fire damage restoration costs in Sydney.' },
    { title: 'Sydney Mould Removal', href: '/cost/sydney-mould-removal', description: 'Mould remediation costs in Sydney.' },
    { title: 'Melbourne Services', href: '/locations/melbourne', description: 'Disaster recovery services in Melbourne.' },
    { title: 'Brisbane Services', href: '/locations/brisbane', description: 'Disaster recovery services in Brisbane.' },
    { title: 'Newcastle Services', href: '/locations/newcastle', description: 'Disaster recovery services in Newcastle.' },
  ],
  'location-melbourne': [
    { title: 'Melbourne Water Damage', href: '/cost/melbourne-water-damage', description: 'Water damage restoration costs in Melbourne.' },
    { title: 'Melbourne Fire Damage', href: '/cost/melbourne-fire-damage', description: 'Fire damage restoration costs in Melbourne.' },
    { title: 'Melbourne Mould Removal', href: '/cost/melbourne-mould-removal', description: 'Mould remediation costs in Melbourne.' },
    { title: 'Sydney Services', href: '/locations/sydney', description: 'Disaster recovery services in Sydney.' },
    { title: 'Brisbane Services', href: '/locations/brisbane', description: 'Disaster recovery services in Brisbane.' },
    { title: 'Adelaide Services', href: '/locations/adelaide', description: 'Disaster recovery services in Adelaide.' },
  ],
  'location-brisbane': [
    { title: 'Brisbane Water Damage', href: '/cost/brisbane-water-damage', description: 'Water damage restoration costs in Brisbane.' },
    { title: 'Brisbane Fire Damage', href: '/cost/brisbane-fire-damage', description: 'Fire damage restoration costs in Brisbane.' },
    { title: 'Brisbane Mould Removal', href: '/cost/brisbane-mould-removal', description: 'Mould remediation costs in Brisbane.' },
    { title: 'Gold Coast Services', href: '/locations/gold-coast', description: 'Disaster recovery services on the Gold Coast.' },
    { title: 'Sydney Services', href: '/locations/sydney', description: 'Disaster recovery services in Sydney.' },
    { title: 'Melbourne Services', href: '/locations/melbourne', description: 'Disaster recovery services in Melbourne.' },
  ],
  'location-perth': [
    { title: 'Perth Water Damage', href: '/cost/perth-water-damage', description: 'Water damage restoration costs in Perth.' },
    { title: 'Perth Fire Damage', href: '/cost/perth-fire-damage', description: 'Fire damage restoration costs in Perth.' },
    { title: 'Perth Mould Removal', href: '/cost/perth-mould-removal', description: 'Mould remediation costs in Perth.' },
    { title: 'WA State Services', href: '/locations/wa', description: 'Disaster recovery services across Western Australia.' },
    { title: 'Fremantle Services', href: '/locations/wa/fremantle', description: 'Disaster recovery services in Fremantle.' },
    { title: 'Adelaide Services', href: '/locations/adelaide', description: 'Disaster recovery services in Adelaide.' },
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
    { title: 'Gold Coast Water Damage', href: '/cost/gold-coast-water-damage', description: 'Water damage restoration costs on the Gold Coast.' },
    { title: 'Gold Coast Mould Removal', href: '/cost/gold-coast-mould-removal', description: 'Mould remediation costs on the Gold Coast.' },
    { title: 'QLD State Services', href: '/locations/qld', description: 'Disaster recovery services across Queensland.' },
    { title: 'Brisbane Services', href: '/locations/brisbane', description: 'Disaster recovery services in Brisbane.' },
    { title: 'Sunshine Coast Services', href: '/locations/qld/sunshine-coast', description: 'Disaster recovery services on the Sunshine Coast.' },
    { title: 'Sydney Services', href: '/locations/sydney', description: 'Disaster recovery services in Sydney.' },
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
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Professional water damage restoration services.' },
    { title: 'Structural Drying', href: '/services/structural-drying', description: 'Industrial drying to protect your property long-term.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'How to claim water damage on your insurance.' },
    { title: 'Mould Remediation Costs', href: '/cost/sydney-mould-removal', description: 'Mould often follows water damage — know the costs.' },
    { title: 'Emergency Response', href: '/services/emergency-response', description: '24/7 emergency water damage response.' },
  ],
  'cost-fire': [
    { title: 'Fire Damage Restoration', href: '/services/fire-damage-restoration', description: 'Professional fire and smoke damage restoration.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Filing your fire damage insurance claim.' },
    { title: 'Commercial Services', href: '/services/commercial-services', description: 'Commercial fire damage restoration services.' },
    { title: 'Emergency Response', href: '/services/emergency-response', description: '24/7 emergency fire damage response.' },
    { title: 'Biohazard Cleanup', href: '/services/biohazard-cleaning', description: 'Post-fire biohazard cleanup services.' },
  ],
  'cost-mould': [
    { title: 'Mould Remediation', href: '/services/mould-remediation', description: 'Professional mould removal and remediation.' },
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Fix the water source causing mould.' },
    { title: 'Mould Health Guide', href: '/guides/mould', description: 'Health risks of mould exposure.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Is mould covered by insurance?' },
    { title: 'Indoor Environmental Assessment', href: '/services/indoor-environmental-professional', description: 'Professional mould testing and air quality assessment.' },
  ],
  'cost-storm': [
    { title: 'Storm Damage Restoration', href: '/services/storm-damage-restoration', description: 'Professional storm damage repair services.' },
    { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Storm water ingress repair and drying.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'How to claim storm damage on insurance.' },
    { title: 'Emergency Response', href: '/services/emergency-response', description: '24/7 storm damage emergency response.' },
    { title: 'Flood Restoration Costs', href: '/cost/sydney-flood-restoration', description: 'Flash flood restoration costs.' },
  ],
  'cost-flood': [
    { title: 'Flood Damage Restoration', href: '/services/flood-damage-restoration', description: 'Specialist flood recovery services.' },
    { title: 'Structural Drying', href: '/services/structural-drying', description: 'Post-flood structural drying services.' },
    { title: 'Mould Remediation Costs', href: '/cost/sydney-mould-removal', description: 'Mould often follows flooding — know the costs.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Filing your flood damage insurance claim.' },
    { title: 'Sewage Cleanup', href: '/services/sewage-cleanup', description: 'Contaminated floodwater cleanup.' },
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
    { title: 'Fire Damage Guide', href: '/guides/fire-damage', description: 'What to do after fire damage.' },
    { title: 'Mould Guide', href: '/guides/mould', description: 'Understanding mould risks and remediation.' },
    { title: 'Insurance Guide', href: '/guides/insurance', description: 'Navigate your disaster insurance claim.' },
    { title: 'Emergency Guide', href: '/guides/emergency', description: 'Emergency preparedness and response.' },
    { title: 'Cost Guides', href: '/guides/cost-guides', description: 'Restoration cost guides by service and location.' },
  ],
  'knowledge-base': [
    { title: 'Water Damage Science', href: '/knowledge/water-damage-restoration-science', description: 'IICRC S500 water damage categories, classes, and psychrometric drying science.' },
    { title: 'Mould Remediation Standards', href: '/knowledge/mould-remediation-standards', description: 'IICRC S520 mould remediation protocols and Australian health guidelines.' },
    { title: 'Fire Damage Restoration', href: '/knowledge/fire-damage-restoration-process', description: 'Four-phase fire restoration process including smoke and soot science.' },
    { title: 'Insurance Claims Guide', href: '/knowledge/insurance-claims-process-australia', description: 'Australian insurance claims process, AFCA, and legal frameworks.' },
    { title: 'IICRC Certification', href: '/knowledge/iicrc-certification-standards', description: 'IICRC certification requirements, standards, and why they matter.' },
    { title: 'Emergency Protocols', href: '/knowledge/emergency-response-protocols', description: 'PPRR emergency response framework and the golden hour principle.' },
  ],
  'operational-excellence': [
    { title: 'Command Ecosystem', href: '/operational-excellence/command-ecosystem', description: 'Integrated technology for claims management, GPS dispatch and IICRC-compliant digital workflows.' },
    { title: 'Safety & PPE', href: '/operational-excellence/safety-ppe', description: 'Rigorous safety standards, hazmat suits, respirators and WHS-compliant protective equipment.' },
    { title: 'Field Essentials', href: '/operational-excellence/field-essentials', description: 'Battle-tested deployment kits with flashlights, power banks and weatherproof gear.' },
    { title: 'Executive Partners', href: '/operational-excellence/executive-partners', description: 'IICRC, CARSI, RestoreAssist and NRPG industry-leading affiliations.' },
    { title: 'Chemical & Remediation Assets', href: '/operational-excellence/chemical-remediation-assets', description: 'Negative air machines, antimicrobial treatments and branded containment systems.' },
    { title: 'Emergency Response', href: '/services/emergency-response', description: '24/7 emergency disaster response across Australia and New Zealand.' },
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
    { title: 'Cost Estimator', href: '/tools/cost-estimator', description: 'Get an instant cost estimate for any type of restoration.' },
    { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Navigate your insurance claim step by step.' },
    { title: 'Emergency Response', href: '/services/emergency-response', description: '24/7 emergency disaster response across Australia.' },
    { title: 'About Disaster Recovery', href: '/about', description: 'Australia\'s national claims distribution platform connecting property owners with certified contractors.' },
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
