// ============================================================
// GBP Post Templates — Weekly Google Business Profile Posts
// UNI-768: 1 post per service per city per week
// ============================================================

export interface GBPPostTemplate {
  /** Service category slug */
  service: string;
  /** Post variants — rotated weekly to avoid duplicate content */
  variants: {
    /** Post summary (max 1,500 chars for GBP) */
    summary: string;
    /** Call-to-action text */
    ctaText: string;
    /** CTA URL path (appended to base URL) */
    ctaPath: string;
    /** Topic type for GBP API */
    topicType: 'STANDARD' | 'OFFER' | 'EVENT';
  }[];
}

// Seasonal context — used to pick seasonally relevant variants
export function getCurrentSeason(): 'summer' | 'autumn' | 'winter' | 'spring' {
  const month = new Date().getMonth(); // 0-indexed
  if (month >= 11 || month <= 1) return 'summer';
  if (month >= 2 && month <= 4) return 'autumn';
  if (month >= 5 && month <= 7) return 'winter';
  return 'spring';
}

// Week number of year — used to rotate variants
export function getWeekNumber(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  return Math.ceil(diff / (7 * 24 * 60 * 60 * 1000));
}

/**
 * Interpolate city name into a post template.
 * Replaces {{city}} with the actual city name.
 */
export function interpolatePost(
  template: string,
  city: string,
): string {
  return template.replace(/\{\{city\}\}/g, city);
}

// ============================================================
// POST TEMPLATES BY SERVICE
// Each service has 8 variants (2 months of weekly rotation)
// ============================================================

export const postTemplates: GBPPostTemplate[] = [
  {
    service: 'water-damage-restoration',
    variants: [
      {
        summary: 'Burst pipe? Leaking roof? Our IICRC-certified water damage restoration team in {{city}} responds within 60 minutes, 24/7. We handle extraction, structural drying, and full claims documentation — so you can focus on getting back to normal. Submit your claim online at disasterrecovery.com.au.',
        ctaText: 'Get Help Now',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Water damage gets worse every hour. Within 48 hours, mould can start growing in hidden wall cavities. Our {{city}} water damage specialists use thermal imaging and industrial dehumidifiers to dry your property fast. Full documentation provided for your insurance claim.',
        ctaText: 'Learn More',
        ctaPath: '/guides/water-damage',
        topicType: 'STANDARD',
      },
      {
        summary: 'Did you know? 37% of Australian insurance claims involve water damage — more than fire, storm, and theft combined. Our {{city}} restoration network is standing by 24/7 with IICRC-certified technicians and advanced drying equipment. We bill you directly with transparent pricing.',
        ctaText: 'Submit a Claim',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Strata managers in {{city}}: water damage in one unit can spread to 3-4 surrounding units within hours. Our emergency response team coordinates with body corporates, handles multi-unit extraction, and provides individual claims documentation for every affected owner.',
        ctaText: 'Get Emergency Help',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'After water damage, the clock is ticking. Our {{city}} IICRC-certified team follows the S500 standard for water damage restoration: assess, extract, dry, decontaminate, restore. Every step documented for your insurer. Payment plans available through Blue Fire Finance.',
        ctaText: 'Start Your Claim',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Flooding in {{city}}? Our disaster recovery network provides emergency water extraction and structural drying across the metro area. We arrive with industrial pumps, air movers, and dehumidifiers — ready to begin immediately. Full claims documentation included.',
        ctaText: 'Get Help Now',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Your step-by-step guide to water damage restoration in {{city}}: 1) Document damage with photos. 2) Submit your claim online. 3) Our IICRC-certified team arrives within 60 minutes. 4) Full restoration with claims documentation. We bill you directly — you claim from your insurer.',
        ctaText: 'Read the Guide',
        ctaPath: '/guides/water-damage',
        topicType: 'STANDARD',
      },
      {
        summary: 'Commercial water damage in {{city}}? From office buildings to retail spaces, our network handles large-scale water extraction and drying. Minimise downtime with our rapid emergency response. Transparent pricing — we bill you directly. Payment plans available.',
        ctaText: 'Submit a Claim',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
    ],
  },
  {
    service: 'fire-damage-restoration',
    variants: [
      {
        summary: 'After a fire in {{city}}, professional restoration is critical. Our IICRC-certified team handles make-safe, soot removal, smoke odour treatment, and full structural repair. We provide comprehensive documentation for your insurance claim. Available 24/7.',
        ctaText: 'Get Emergency Help',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Smoke damage is often worse than the fire itself. Acidic soot corrodes electronics, tarnishes metals, and permanently stains surfaces within 72 hours. Our {{city}} fire restoration specialists use carbon filtration and thermal fogging to neutralise smoke damage fast.',
        ctaText: 'Learn More',
        ctaPath: '/guides/fire-damage',
        topicType: 'STANDARD',
      },
      {
        summary: 'House fire in {{city}}? Here is what to do first: 1) Ensure everyone is safe. 2) Do not re-enter until cleared by fire services. 3) Document damage with photos. 4) Submit your claim online. Our certified team handles everything from make-safe to full restoration.',
        ctaText: 'Start Your Claim',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Fire damage restoration in {{city}} requires specialist expertise. Our network follows Australian standards for structural assessment, hazardous material handling, and smoke decontamination. We bill you directly with full documentation for your insurer.',
        ctaText: 'Get Help Now',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Kitchen fires are the #1 cause of residential fire damage in Australia. If you have experienced fire or smoke damage in {{city}}, our 24/7 emergency response team can begin make-safe within 60 minutes. IICRC-certified with full claims documentation.',
        ctaText: 'Submit a Claim',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'After a fire, contents recovery can save irreplaceable items. Our {{city}} fire restoration team uses ultrasonic cleaning, ozone treatment, and specialist drying to salvage clothing, documents, electronics, and personal belongings. Full inventory for insurance.',
        ctaText: 'Learn More',
        ctaPath: '/guides/fire-damage',
        topicType: 'STANDARD',
      },
      {
        summary: 'Commercial fire damage in {{city}}? Our network handles everything from small kitchen fires to large-scale structural damage. Fast response minimises business interruption. Transparent pricing and full documentation for your business insurance claim.',
        ctaText: 'Get Emergency Help',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Bushfire season preparedness in {{city}}: know your risk, have an evacuation plan, and keep our number ready. If bushfire damages your property, our IICRC-certified network provides emergency make-safe, ash removal, and full restoration. Available 24/7.',
        ctaText: 'Be Prepared',
        ctaPath: '/guides/fire-damage',
        topicType: 'STANDARD',
      },
    ],
  },
  {
    service: 'mould-remediation',
    variants: [
      {
        summary: 'Mould in your {{city}} home? Do not ignore it — mould spreads fast and poses serious health risks. Our IICRC S520-certified mould remediation team uses containment, HEPA filtration, and antimicrobial treatment to eliminate mould at the source. Claims documentation included.',
        ctaText: 'Get Help Now',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Black mould in {{city}}? Professional remediation is essential. DIY removal spreads spores and makes the problem worse. Our certified team tests, contains, removes, and prevents recurrence. We bill you directly — full documentation for your insurer.',
        ctaText: 'Learn More',
        ctaPath: '/guides/mould',
        topicType: 'STANDARD',
      },
      {
        summary: 'After flooding or water damage in {{city}}, mould can begin growing within 24-48 hours in hidden wall cavities. Our mould remediation specialists use moisture mapping, thermal imaging, and IICRC S520 protocols to find and eliminate mould before it spreads.',
        ctaText: 'Submit a Claim',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Landlords and property managers in {{city}}: mould complaints require professional remediation. Our IICRC-certified team provides clearance testing and documentation that protects you legally. Fast response to minimise tenant disruption.',
        ctaText: 'Get Help Now',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Mould thrives in humid Australian conditions. If your {{city}} property has persistent musty odours, visible growth, or occupant health complaints, professional assessment is critical. Our team provides transparent pricing and IICRC-certified remediation.',
        ctaText: 'Read the Guide',
        ctaPath: '/guides/mould',
        topicType: 'STANDARD',
      },
      {
        summary: 'Commercial mould remediation in {{city}}: offices, warehouses, and retail spaces require specialist treatment. Our network uses negative air pressure containment and HEPA filtration to remediate mould without disrupting your business operations.',
        ctaText: 'Submit a Claim',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Is your insurance likely to cover mould removal in {{city}}? Generally yes — if the mould resulted from a sudden event (burst pipe, storm damage, flooding). Our team provides the documentation your insurer needs. We bill you directly.',
        ctaText: 'Check Coverage',
        ctaPath: '/is-it-covered',
        topicType: 'STANDARD',
      },
      {
        summary: 'Prevent mould after water damage: ventilate immediately, run dehumidifiers, and call professionals within 48 hours. Our {{city}} mould specialists are available 24/7 for emergency assessment. IICRC S520-certified with full claims documentation.',
        ctaText: 'Get Emergency Help',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
    ],
  },
  {
    service: 'storm-damage-repairs',
    variants: [
      {
        summary: 'Storm damage in {{city}}? Our emergency response team provides 24/7 make-safe services: emergency tarping, debris removal, water extraction, and temporary repairs. IICRC-certified contractors with full claims documentation. Submit your claim online now.',
        ctaText: 'Get Emergency Help',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'After a severe storm in {{city}}, secondary water damage is the biggest risk. Our team arrives quickly to tarp damaged roofs, extract standing water, and begin structural drying — preventing thousands in additional damage. We bill you directly.',
        ctaText: 'Start Your Claim',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Hail damage to your {{city}} property? Large hailstones can crack tiles, dent metal roofing, and shatter skylights — letting water in. Our network provides emergency tarping and full roof restoration with transparent pricing and claims documentation.',
        ctaText: 'Get Help Now',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Storm season in {{city}}: be prepared. Document your property condition now, review your insurance policy, and save our claim link. If storm damage strikes, our 24/7 emergency network responds within 60 minutes with make-safe and restoration.',
        ctaText: 'Read the Guide',
        ctaPath: '/guides/storm-damage',
        topicType: 'STANDARD',
      },
      {
        summary: 'Wind damage in {{city}}? Fallen trees, lifted roofing, and broken fences need immediate attention to prevent further damage. Our disaster recovery network coordinates tree removal, structural make-safe, and full repairs. IICRC-certified.',
        ctaText: 'Submit a Claim',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Commercial storm damage in {{city}}? From warehouse roof damage to shopfront flooding, our network handles large-scale emergency response. Fast make-safe minimises business interruption. Full documentation for your commercial insurance claim.',
        ctaText: 'Get Emergency Help',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Flash flooding after storms in {{city}} can overwhelm drainage systems in minutes. Our emergency water extraction team arrives with industrial pumps and begins removing water immediately. Structural drying prevents mould growth. Available 24/7.',
        ctaText: 'Get Help Now',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Cyclone preparedness for {{city}} residents: secure loose items, check your insurance policy, and know your local evacuation route. If cyclone damage occurs, our IICRC-certified network provides emergency make-safe and full restoration Australia-wide.',
        ctaText: 'Be Prepared',
        ctaPath: '/guides/storm-damage',
        topicType: 'STANDARD',
      },
    ],
  },
  {
    service: 'flood-recovery',
    variants: [
      {
        summary: 'Flood damage in {{city}}? Our disaster recovery network provides emergency water extraction, structural drying, and sanitisation. We follow IICRC S500 protocols for floodwater contamination. Full claims documentation — we bill you directly.',
        ctaText: 'Get Emergency Help',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'After floodwaters recede in {{city}}, the real damage begins. Contaminated water, structural weakening, and rapid mould growth need professional attention. Our 24/7 team extracts water, dries structures, and prevents secondary damage.',
        ctaText: 'Start Your Claim',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Flood recovery in {{city}}: Step 1 — Do not enter until safe. Step 2 — Document everything with photos. Step 3 — Submit your claim online. Step 4 — Our certified team begins extraction and drying. We handle the restoration while you handle life.',
        ctaText: 'Read the Guide',
        ctaPath: '/guides/water-damage',
        topicType: 'STANDARD',
      },
      {
        summary: 'Category 3 floodwater (sewage-contaminated) requires specialist decontamination. Our {{city}} flood recovery team is trained in biohazard protocols, antimicrobial treatment, and safe disposal. IICRC-certified with full claims documentation.',
        ctaText: 'Get Help Now',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Flood-affected properties in {{city}} need professional assessment before re-occupation. Our team checks structural integrity, tests for contamination, and provides clearance documentation. Protect your family — do not DIY flood cleanup.',
        ctaText: 'Submit a Claim',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Insurance claim after flooding in {{city}}? We provide all the documentation your insurer needs: scope of works, moisture readings, photos, contamination reports, and restoration timeline. We bill you directly with transparent pricing.',
        ctaText: 'Check Coverage',
        ctaPath: '/is-it-covered',
        topicType: 'STANDARD',
      },
      {
        summary: 'Commercial flood recovery in {{city}}: offices, retail, and warehouses need fast water extraction to minimise stock loss and downtime. Our network deploys industrial equipment and coordinates multi-trade restoration. Available 24/7.',
        ctaText: 'Get Emergency Help',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'La Nina increases flood risk across eastern Australia. {{city}} residents should review their insurance coverage now and know their local flood risk. If flooding occurs, our 24/7 emergency network is ready with IICRC-certified restoration.',
        ctaText: 'Be Prepared',
        ctaPath: '/guides/water-damage',
        topicType: 'STANDARD',
      },
    ],
  },
  {
    service: 'emergency-restoration',
    variants: [
      {
        summary: 'Property emergency in {{city}}? Our disaster recovery network responds 24/7 — including nights, weekends, and public holidays. IICRC-certified contractors for water, fire, storm, mould, and flood damage. Submit your claim online for immediate response.',
        ctaText: 'Get Emergency Help',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'When disaster strikes your {{city}} property, every minute counts. Our network of vetted restoration contractors responds within 60 minutes for emergency make-safe, water extraction, and damage assessment. Full claims documentation provided.',
        ctaText: 'Start Your Claim',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Australia has the #1 most expensive disaster recovery market in the OECD. Our {{city}} network provides transparent pricing — we bill you directly, not your insurer. See exactly what the work costs. Payment plans available through Blue Fire Finance.',
        ctaText: 'Learn More',
        ctaPath: '/about',
        topicType: 'STANDARD',
      },
      {
        summary: '24/7 emergency restoration in {{city}}: water damage, fire damage, storm damage, mould, flooding — our IICRC-certified network handles it all. 100% online claim submission. No phone queues. Fast contractor matching. Claims documentation included.',
        ctaText: 'Submit a Claim',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Property managers in {{city}}: our emergency restoration network is your single point of contact for all property damage types. We coordinate multi-trade response, provide per-unit documentation for strata claims, and minimise tenant disruption.',
        ctaText: 'Get Help Now',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: "Disaster Recovery connects {{city}} property owners with Australia's largest network of IICRC-certified restoration contractors. From a single burst pipe to multi-storey flood damage — we have the team and equipment for any scale emergency.",
        ctaText: 'Start Your Claim',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
      {
        summary: 'Not sure if your property damage is covered by insurance? Our {{city}} team provides full claims documentation for all major Australian insurers. We bill you directly — you claim reimbursement from your insurer.',
        ctaText: 'Check Coverage',
        ctaPath: '/is-it-covered',
        topicType: 'STANDARD',
      },
      {
        summary: 'Emergency board-up and make-safe in {{city}}: broken windows, damaged doors, compromised roofs — our team secures your property immediately to prevent further damage and theft. Available 24/7, 365 days a year.',
        ctaText: 'Get Emergency Help',
        ctaPath: '/claim',
        topicType: 'STANDARD',
      },
    ],
  },
];

/**
 * Get the post template for a given service and week.
 * Rotates through 8 variants on a weekly cycle.
 */
export function getPostForWeek(service: string, city: string): {
  summary: string;
  ctaText: string;
  ctaUrl: string;
  topicType: string;
} | null {
  const template = postTemplates.find(t => t.service === service);
  if (!template) return null;

  const weekNum = getWeekNumber();
  const variantIndex = weekNum % template.variants.length;
  const variant = template.variants[variantIndex];

  return {
    summary: interpolatePost(variant.summary, city),
    ctaText: variant.ctaText,
    ctaUrl: `https://disasterrecovery.com.au${variant.ctaPath}`,
    topicType: variant.topicType,
  };
}
