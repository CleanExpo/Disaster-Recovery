import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Gold Coast | IICRC S700:2025 Certified 24/7',
  description: 'Emergency fire damage restoration across all Gold Coast suburbs. IICRC S700:2025 certified contractors for fire, smoke, and soot damage in highrise strata and bushland interface properties. Structural make-safe, odour removal, contents restoration. Lodge your claim 24/7.',
  keywords: 'fire damage restoration gold coast, fire damage gold coast, smoke damage gold coast, soot damage gold coast, fire restoration gold coast, house fire gold coast, strata fire gold coast, bushfire gold coast hinterland, IICRC fire restoration gold coast',
  openGraph: {
    title: 'Fire Damage Restoration Gold Coast | IICRC S700:2025 Certified 24/7',
    description: 'Emergency fire damage restoration across all Gold Coast suburbs. IICRC S700:2025 certified contractors for fire, smoke, and soot damage in highrise strata and bushland interface properties. Structural make-safe, odour removal, contents restoration. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Fire Damage Restoration')}&city=${encodeURIComponent('Gold Coast')}&service=fire-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-gold-coast`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-gold-coast/#localbusiness`,
  name: `${NAP.name} Gold Coast`,
  url: `${NAP.url}/fire-damage-restoration-gold-coast`,
  description: '24/7 emergency fire damage restoration across all Gold Coast suburbs. IICRC S700:2025 certified contractor network for fire, smoke, soot, and odour restoration in highrise strata buildings and bushland interface properties.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Gold Coast', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Gold Coast', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Fire Damage Restoration Gold Coast',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Gold Coast', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  serviceType: 'Fire Damage Restoration',
  description: 'Professional fire and smoke damage restoration across the Gold Coast including emergency structural make-safe, soot removal, odour elimination, strata coordination, contents restoration, and full rebuild. Covers highrise apartment buildings through to hinterland bushfire interface properties.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '8621', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What should I do immediately after a fire in my Gold Coast home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Do not re-enter the property until Queensland Fire and Emergency Services (QFES) confirm it is safe. Once cleared, photograph all visible damage — fire, smoke, soot, and water from fire suppression — before any cleaning is attempted. Contact your insurer immediately to lodge a fire damage claim and request emergency accommodation under your ALE (Additional Living Expenses) benefit if the property is uninhabitable. For strata properties, notify your body corporate manager as well as your contents insurer — building damage is covered under the strata policy. Lodge at disasterrecovery.com.au/claim for an IICRC-certified assessment to support your claim scope.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does home insurance cover bushfire damage in Gold Coast hinterland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — bushfire damage is covered under the fire damage provision of most standard Australian home insurance policies, including properties in BAL-rated zones across the Gold Coast hinterland (Canungra, Advancetown, Springbrook, Mt Tamborine). Smoke and ember attack damage is also generally covered even without direct flame contact. Note that the ARPC Cyclone Pool does not apply to fire damage — fire claims are handled directly through your private insurer. Properties in high BAL zones may face higher premiums or specific exclusions; review your policy schedule carefully and document the origin of damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does fire damage in a strata building work for insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In a Gold Coast strata or apartment building, fire damage claims involve two separate insurance policies: the building (strata) policy covers structural elements, common areas, and shared building fabric — this is managed by the owners corporation/body corporate; your individual contents policy covers personal belongings and any fixtures you installed. If the fire originated in your lot, your strata insurer may seek contribution from you under the body corporate by-laws. Smoke damage affecting multiple units is typically covered under the strata building policy as the cause (fire) is an insured event. Whole-building HVAC decontamination is a common requirement in high-rise fires where smoke has circulated through shared air systems. NRPG works with both strata insurers and individual lot owners to coordinate scope and access.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does fire damage restoration take on the Gold Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timelines vary by damage extent. Minor fire damage (single room, limited smoke spread): 7–14 days. Moderate fire damage (multiple rooms or units, smoke in HVAC): 3–6 weeks. Major structural fires: 3–6 months for full restoration to pre-loss condition. Strata complex fires affecting multiple lots may extend timelines due to insurance coordination, owner access requirements, and shared building works. Gold Coast\'s subtropical humidity can slow drying and accelerate mould in smoke-affected materials if restoration is delayed — early engagement matters. NRPG provides a project timeline as part of the initial assessment scope.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does fire damage restoration cost on the Gold Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cost depends on the scale and type of fire. Kitchen or single-room fire: $5,000–$25,000. Multi-room structural fire: $20,000–$80,000. Total loss with rebuild: $50,000–$250,000+. Strata complex fires affecting multiple lots or common areas can exceed $1,000,000 when structural repairs, HVAC decontamination, and reinstatement of shared building elements are included. These costs are typically covered by your building or contents insurance policy subject to your sum insured and excess. NRPG provides a full scope of works report for insurer submission.',
      },
    },
  ],
};

export default function FireDamageRestorationGoldCoastPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="fdrgc-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="fdrgc-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="fdrgc-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Gold Coast"
        subtitle="Emergency fire damage restoration across all Gold Coast suburbs. IICRC S700:2025 certified technicians for fire, smoke, soot, and odour restoration in highrise strata buildings and bushland interface properties. 60-minute dispatch, 24 hours a day."
        gradient="linear-gradient(135deg, #1A0800 0%, #D84315 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Gold Coast' },
        ]}
        sections={[
          {
            heading: 'Fire Damage on the Gold Coast \u2014 The Risk Landscape',
            body: (
              <>
                <p>
                  The Gold Coast presents a dual fire risk profile unlike any other Australian city. On one side,
                  the coastal strip from Southport to Coolangatta holds one of Australia&apos;s highest concentrations
                  of highrise apartment buildings &mdash; Surfers Paradise alone has hundreds of strata towers where
                  a single kitchen fire can trigger smoke contamination across dozens of units through shared HVAC
                  corridors and inter-tenancy gaps. On the other side, the rapidly growing northern suburbs of
                  Coomera, Upper Coomera, and Pimpama back directly onto bushland, and the Gold Coast hinterland
                  &mdash; Canungra, Advancetown, Springbrook, Mt Tamborine, Mudgeeraba &mdash; sits within active
                  Bushfire Attack Level (BAL) zones.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The 2019&ndash;20 Black Summer fires reached the Gondwana Rainforest World Heritage areas on
                  the Gold Coast&apos;s western edge, demonstrating that even areas with historically low fire
                  frequency can be impacted under extreme conditions. Properties in BAL-12.5 through BAL-FZ
                  zones face ember attack, radiant heat, and direct flame contact &mdash; each requiring a
                  different structural assessment and restoration approach.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG IICRC S700:2025-certified contractors are equipped for both urban highrise fires and
                  bushland interface damage, with emergency structural make-safe as the first priority in
                  every engagement.
                </p>
              </>
            ),
          },
          {
            heading: 'Strata and Multi-Unit Fire Damage',
            body: (
              <>
                <p>
                  Fire in a Gold Coast apartment building creates restoration complexity that single-dwelling
                  fires do not. Smoke travels through wall cavities, inter-floor penetrations, and shared HVAC
                  systems &mdash; a fire contained to one unit can deposit soot and odour-causing compounds
                  across an entire building level or multiple floors. In Gold Coast&apos;s subtropical humidity,
                  smoke odour persists in porous materials (carpet, soft furnishings, painted plasterboard)
                  far longer than in cooler, drier climates.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Whole-building decontamination is often required when a structure fire occurs in a highrise
                  setting. This involves: smoke mapping to trace contamination paths through the building;
                  HEPA air scrubbing of affected levels; HVAC system cleaning and decontamination; thermal
                  fogging or ozone treatment for deep odour elimination; and individual lot assessment to
                  separate contents restoration from building reinstatement scope.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Insurance coordination in strata fires is more involved than residential claims. Building
                  damage is covered under the owners corporation&apos;s strata building policy; individual
                  lot owners&apos; contents and internal fittings are covered under their own contents
                  policies. Where the fire originates in a particular lot, subrogation proceedings may follow.
                  NRPG works directly with both the strata insurer and individual lot owners to coordinate
                  access, scope of works, and staged reinstatement to minimise displacement time.
                </p>
              </>
            ),
          },
          {
            heading: 'Fire Damage Restoration Cost Estimates \u2014 Gold Coast 2026',
            body: (
              <>
                <p>
                  Cost ranges for fire damage restoration on the Gold Coast vary significantly based on the
                  type of property, extent of fire and smoke spread, and whether strata building elements
                  are involved.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Kitchen or single-room fire (apartment or house):</strong> $5,000&ndash;$25,000.
                  Covers soot removal, odour treatment, repainting, and replacement of damaged fixtures and
                  fittings within the affected room.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Multi-room structural fire:</strong> $20,000&ndash;$80,000. Includes structural
                  make-safe, whole-property smoke assessment, HVAC decontamination, contents separation and
                  assessment, and full internal reinstatement.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Total loss / major structural fire:</strong> $50,000&ndash;$250,000+. Full demolition
                  and rebuild or extensive structural restoration to pre-loss condition. Timeline: 3&ndash;12
                  months depending on scope and approvals.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Strata complex fire (multiple lots and common areas):</strong> Can exceed $1,000,000
                  when HVAC decontamination across multiple levels, structural building repairs, reinstatement
                  of common areas, and multi-lot contents restoration are combined.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  All costs above are typically covered by your building or contents insurance policy subject
                  to your sum insured and applicable excess. Note that ARPC Cyclone Pool coverage does not
                  apply to fire damage &mdash; fire claims are handled directly by your private insurer.
                  NRPG provides a full scope of works report formatted for insurer submission.
                </p>
              </>
            ),
          },
          {
            heading: 'Gold Coast Areas We Cover',
            body: (
              <>
                <p>
                  60-minute emergency response across all Gold Coast suburbs for fire damage make-safe and
                  structural assessment.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Highrise and strata corridor:</strong> Surfers Paradise, Broadbeach, Southport,
                  Labrador, Main Beach, Chevron Island, Bundall
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Leafy southern suburbs:</strong> Robina, Mudgeeraba, Reedy Creek, Varsity Lakes,
                  Burleigh Heads, Palm Beach, Currumbin, Tugun, Tweed Heads
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern bushland interface:</strong> Coomera, Upper Coomera, Pimpama, Oxenford,
                  Helensvale, Arundel, Pacific Pines, Nerang
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hinterland (highest bushfire risk &mdash; BAL zones):</strong> Canungra,
                  Advancetown, Springbrook, Mt Tamborine, Tamborine Mountain, Beechmont,
                  Bonogin, Tallai
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Bushfire and ember attack response extends to all BAL-rated hinterland properties.
                  Canungra and Advancetown corridor properties in BAL-FZ and BAL-40 zones are prioritised
                  for rapid structural assessment following fire events.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What should I do immediately after a fire in my Gold Coast home?',
            answer: 'Do not re-enter the property until Queensland Fire and Emergency Services (QFES) confirm it is safe. Once cleared, photograph all visible damage — fire, smoke, soot, and water from fire suppression — before any cleaning is attempted. Contact your insurer immediately to lodge a fire damage claim and request emergency accommodation under your ALE (Additional Living Expenses) benefit if the property is uninhabitable. For strata properties, notify your body corporate manager as well as your contents insurer — building damage is covered under the strata policy. Lodge at disasterrecovery.com.au/claim for an IICRC-certified assessment to support your claim scope.',
          },
          {
            question: 'Does home insurance cover bushfire damage in Gold Coast hinterland?',
            answer: 'Yes — bushfire damage is covered under the fire damage provision of most standard Australian home insurance policies, including properties in BAL-rated zones across the Gold Coast hinterland (Canungra, Advancetown, Springbrook, Mt Tamborine). Smoke and ember attack damage is also generally covered even without direct flame contact. Note that the ARPC Cyclone Pool does not apply to fire damage — fire claims are handled directly through your private insurer. Properties in high BAL zones may face higher premiums or specific exclusions; review your policy schedule carefully and document the origin of damage.',
          },
          {
            question: 'How does fire damage in a strata building work for insurance?',
            answer: 'In a Gold Coast strata or apartment building, fire damage claims involve two separate insurance policies: the building (strata) policy covers structural elements, common areas, and shared building fabric — managed by the owners corporation/body corporate; your individual contents policy covers personal belongings and any fixtures you installed. If the fire originated in your lot, your strata insurer may seek contribution from you under the body corporate by-laws. Smoke damage affecting multiple units is typically covered under the strata building policy as the cause (fire) is an insured event. Whole-building HVAC decontamination is a common requirement in high-rise fires where smoke has circulated through shared air systems. NRPG works with both strata insurers and individual lot owners to coordinate scope and access.',
          },
          {
            question: 'How long does fire damage restoration take on the Gold Coast?',
            answer: 'Timelines vary by damage extent. Minor fire damage (single room, limited smoke spread): 7–14 days. Moderate fire damage (multiple rooms or units, smoke in HVAC): 3–6 weeks. Major structural fires: 3–6 months for full restoration to pre-loss condition. Strata complex fires affecting multiple lots may extend timelines due to insurance coordination, owner access requirements, and shared building works. Gold Coast\'s subtropical humidity can slow drying and accelerate mould in smoke-affected materials if restoration is delayed — early engagement matters. NRPG provides a project timeline as part of the initial assessment scope.',
          },
          {
            question: 'How much does fire damage restoration cost on the Gold Coast?',
            answer: 'Cost depends on the scale and type of fire. Kitchen or single-room fire: $5,000–$25,000. Multi-room structural fire: $20,000–$80,000. Total loss with rebuild: $50,000–$250,000+. Strata complex fires affecting multiple lots or common areas can exceed $1,000,000 when structural repairs, HVAC decontamination, and reinstatement of shared building elements are included. These costs are typically covered by your building or contents insurance policy subject to your sum insured and excess. NRPG provides a full scope of works report for insurer submission.',
          },
        ]}
        relatedGuides={[
          { title: 'Water Damage Restoration Gold Coast', href: '/water-damage-restoration-gold-coast', description: 'Fire suppression water damage — IICRC-certified restoration.' },
          { title: 'Storm Damage Restoration Gold Coast', href: '/storm-damage-restoration-gold-coast', description: 'Gold Coast storm damage — hail, wind, and structural repairs.' },
          { title: 'Mould Remediation Gold Coast', href: '/mould-remediation-gold-coast', description: 'Smoke-affected materials in subtropical humidity — mould prevention and remediation.' },
          { title: 'Fire Damage Restoration Sydney', href: '/fire-damage-restoration-sydney', description: 'IICRC S700:2025 fire restoration in Sydney.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
