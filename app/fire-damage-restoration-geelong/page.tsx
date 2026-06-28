import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Geelong | Surf Coast BAL & Industrial Fire Emergency',
  description:
    'Emergency fire damage restoration across Geelong, the Surf Coast, and Corio industrial precinct. IICRC S700:2025 certified contractors for Anglesea and Lorne BAL zone bushfires, Corio industrial fires, and heritage bluestone building restoration. Lodge your claim 24/7.',
  keywords:
    'fire damage restoration geelong, fire damage geelong, anglesea fire, surf coast bushfire, corio industrial fire, geelong fire restoration, lorne fire damage, heritage fire geelong, smoke damage geelong, BAL zone geelong',
  openGraph: {
    title: 'Fire Damage Restoration Geelong | Surf Coast BAL & Industrial Fire Emergency',
    description:
      'Emergency fire damage restoration across Geelong, the Surf Coast, and Corio industrial precinct. IICRC S700:2025 certified contractors for Anglesea and Lorne BAL zone bushfires, Corio industrial fires, and heritage bluestone building restoration. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Fire Damage Restoration')}&city=${encodeURIComponent('Geelong')}&service=fire-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-geelong`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-geelong/#localbusiness`,
  name: `${NAP.name} Geelong`,
  url: `${NAP.url}/fire-damage-restoration-geelong`,
  description:
    '24/7 emergency fire damage restoration across Geelong, the Surf Coast, and Corio industrial precinct. IICRC S700:2025 certified contractor network for Anglesea and Surf Coast BAL zone bushfires, Corio industrial fires, heritage bluestone building post-fire restoration, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Geelong',
    containedInPlace: { '@type': 'State', name: 'Victoria' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Geelong',
    addressRegion: 'VIC',
    addressCountry: 'AU',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Fire Damage Restoration Geelong',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: {
    '@type': 'City',
    name: 'Geelong',
    containedInPlace: { '@type': 'State', name: 'Victoria' },
  },
  serviceType: 'Fire Damage Restoration',
  description:
    'Professional fire and smoke damage restoration across Geelong to IICRC S700:2025 standard. Emergency make-safe, smoke extraction, soot remediation, odour elimination, heritage structure assessment, and industrial fire restoration for Surf Coast BAL zone properties, Corio industrial precinct, and heritage bluestone buildings.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does home insurance cover bushfire damage to properties in Anglesea and Lorne BAL zones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — fire damage to residential properties is covered under the fire peril in standard home insurance policies, including damage caused by bushfire in Bushfire Attack Level (BAL) designated zones. Properties in Anglesea, Lorne, Aireys Inlet, and Moggs Creek along the Surf Coast sit in documented high-risk BAL zones, with Anglesea's history of severe bushfire events — including the 2015 fire that destroyed 116 homes — demonstrating the real exposure. Some insurers may apply higher premiums, specific exclusions, or increased excesses for properties in designated BAL zones. Review your policy schedule to confirm whether your BAL zone designation affects your coverage conditions. ARPC does not apply to fire damage. NRPG contractors provide IICRC S700:2025 scope documentation meeting all insurer requirements for bushfire and BAL zone fire claims.",
      },
    },
    {
      '@type': 'Question',
      name: 'What specialist requirements apply to fire restoration in the Corio industrial precinct?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Industrial fire restoration in the Corio and Norlane precinct requires capabilities and certifications beyond standard residential fire damage contractors. The ageing industrial infrastructure in Corio includes chemical storage facilities, large floor-area warehouses, and commercial manufacturing sites where fire events can involve chemical contamination of soot deposits, requiring hazardous materials assessment before standard S700:2025 fire restoration can commence. Post-fire structural assessment of industrial buildings is also more complex than residential structures. NRPG coordinates specialist industrial hygiene assessment, hazmat clearance where required, and large-scale IICRC S700:2025 fire restoration for Corio and Norlane industrial properties. Industrial fire restoration costs in this precinct typically exceed $200,000 for significant events.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is fire restoration different for Geelong\'s heritage bluestone wool store buildings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Geelong's heritage wool stores — many converted to residential apartments in the CBD and Newtown precinct — present specific challenges for post-fire structural assessment and restoration. Bluestone and solid brick heritage construction retains heat differently from modern lightweight construction, and the thermal mass means structural damage from fire may extend further than is visually apparent. Heritage fabric (stone, brick, original timber floors, ornate plasterwork) cannot be replaced with modern equivalents — restoration must use matching materials and heritage-appropriate methods. Smoke penetration into bluestone and solid brick is also more persistent than in lightweight construction. Post-fire structural assessment of heritage buildings typically requires a structural engineer's report as well as IICRC S700:2025 fire restoration documentation. NRPG works with heritage-accredited structural engineers for Geelong's wool store and heritage building fire restoration claims.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does fire damage restoration cost in Geelong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fire damage restoration costs in Geelong depend on the fire source, property type, and extent of structural damage. Indicative ranges: residential kitchen or electrical fire $4,000–$18,000; structural fire across multiple rooms $15,000–$70,000; Anglesea-style BAL zone total loss $40,000–$200,000+; Corio industrial fire $200,000+. Heritage bluestone building fire restoration typically sits in the upper residential or commercial ranges due to specialist materials and assessment requirements. NRPG provides a full IICRC S700:2025 scope of works for insurer submission including structural engineer reports where required.',
      },
    },
  ],
};

export default function FireDamageRestorationGeelongPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="fdrgeelong-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdrgeelong-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdrgeelong-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Geelong"
        subtitle="Emergency fire damage restoration across Geelong, the Surf Coast, and Corio industrial precinct. IICRC S700:2025 certified contractors for Anglesea and Lorne BAL zone bushfires, industrial Corio fires, and heritage bluestone building restoration."
        gradient="linear-gradient(135deg, #1A0800 0%, #D84315 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Geelong' },
        ]}
        sections={[
          {
            heading: 'Geelong Fire Risk — Anglesea and Surf Coast BAL Zones and Industrial Corio',
            body: (
              <>
                <p>
                  The Surf Coast west of Geelong &mdash; Lorne, Anglesea, Aireys Inlet, and Moggs
                  Creek &mdash; sits within designated Bushfire Attack Level (BAL) zones with a
                  documented history of severe bushfire events. The 2015 Anglesea fire destroyed
                  116 homes and demonstrated the catastrophic potential of fire events in this
                  coastal hinterland environment where dry eucalypt scrub meets the suburban
                  interface. Anglesea, Aireys Inlet, and Lorne remain at high BAL risk during
                  summer fire weather conditions.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Geelong&apos;s urban fringe also carries grassfire and scrub fire risk: Bellbrae,
                  the Torquay hinterland, and Winchelsea face grassfire exposure during summer when
                  dry conditions follow late spring. Residential properties at the Geelong urban
                  edge are at ember attack risk when northerly winds drive fire fronts toward the
                  suburban boundary.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Corio and Norlane industrial precinct presents a distinct fire risk profile.
                  Ageing industrial infrastructure, chemical storage facilities, and large-floor-area
                  warehouses mean that industrial fires in this precinct can involve hazardous
                  material contamination of soot deposits, requiring specialist hazmat assessment
                  before standard S700:2025 fire restoration can commence. ARPC does not apply to
                  fire damage &mdash; all fire claims are processed through your private insurer&apos;s
                  fire peril regardless of property type.
                </p>
              </>
            ),
          },
          {
            heading: 'Heritage Building Fire Restoration in Geelong',
            body: (
              <>
                <p>
                  Geelong&apos;s heritage wool stores &mdash; many now converted to residential
                  apartments and commercial tenancies in the CBD and Newtown precinct &mdash; present
                  specific challenges for post-fire structural assessment and restoration. The solid
                  bluestone and brick construction of these buildings retains heat differently from
                  modern lightweight framing: structural damage may extend further than is visually
                  apparent, and a structural engineer&apos;s assessment is essential before
                  reinstatement begins.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Heritage fabric &mdash; bluestone masonry, original timber floors, ornate
                  plasterwork &mdash; cannot be replaced with modern equivalent materials without
                  heritage impact approvals. Restoration must use matching or sympathetic materials
                  and heritage-appropriate methods, which adds both time and cost to the scope
                  relative to a comparable modern building. Smoke penetration into solid bluestone
                  and brick is also more persistent than in lightweight construction, requiring
                  more intensive S700:2025 smoke remediation protocols.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG works with heritage-accredited structural engineers and conservation
                  specialists for Geelong heritage building fire restoration claims, ensuring that
                  the scope of works submitted to insurers accurately reflects the additional
                  requirements of heritage fabric reinstatement.
                </p>
              </>
            ),
          },
          {
            heading: 'Areas We Cover',
            body: (
              <>
                <p>
                  Emergency IICRC S700:2025 fire damage response across Greater Geelong and the
                  Surf Coast:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Geelong Metro:</strong> Geelong CBD, Newtown, Belmont, Highton,
                  East Geelong, South Geelong
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Industrial Precinct:</strong> Corio, Norlane, North Geelong
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Surf Coast BAL Zone:</strong> Anglesea, Aireys Inlet, Lorne, Moggs Creek
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Urban fringe:</strong> Bellbrae, Torquay hinterland, Winchelsea
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Bellarine Peninsula:</strong> Leopold, Ocean Grove, Barwon Heads
                  (extended response time may apply for outer Surf Coast areas)
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does home insurance cover bushfire damage to properties in Anglesea and Lorne BAL zones?',
            answer:
              'Yes — fire damage including bushfire in BAL designated zones is covered under the fire peril in standard home insurance policies. Properties in Anglesea, Lorne, Aireys Inlet, and Moggs Creek sit in documented high-risk BAL zones. Some insurers apply higher premiums or excesses for BAL zone properties. ARPC does not apply to fire damage. NRPG contractors provide IICRC S700:2025 documentation for all Surf Coast bushfire claims.',
          },
          {
            question: 'What specialist requirements apply to fire restoration in the Corio industrial precinct?',
            answer:
              'Industrial fire restoration in Corio and Norlane requires hazardous materials assessment where chemical storage is involved, large-scale S700:2025 extraction capability, and specialist industrial structural assessment. Industrial fire restoration costs in this precinct typically exceed $200,000 for significant events. NRPG coordinates hazmat clearance and industrial hygiene assessment as required.',
          },
          {
            question: "How is fire restoration different for Geelong's heritage bluestone wool store buildings?",
            answer:
              "Heritage bluestone and brick buildings require a structural engineer's assessment before reinstatement — thermal mass means damage can extend further than is visually apparent. Heritage fabric replacement requires matching materials and heritage-appropriate methods, with council heritage approvals. Smoke penetration into solid masonry is also more persistent. NRPG works with heritage-accredited engineers for these claims.",
          },
          {
            question: 'How much does fire damage restoration cost in Geelong?',
            answer:
              'Indicative costs: residential kitchen or electrical fire $4,000–$18,000; structural fire $15,000–$70,000; Anglesea-style BAL zone total loss $40,000–$200,000+; Corio industrial fire $200,000+. Heritage building restoration typically sits in the upper ranges due to specialist materials and assessment. NRPG provides a full IICRC S700:2025 scope for insurer submission.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Storm Damage Geelong',
            href: '/storm-damage-restoration-geelong',
            description: 'IICRC-certified storm damage restoration across Geelong and Bellarine Peninsula.',
          },
          {
            title: 'Water Damage Geelong',
            href: '/water-damage-restoration-geelong',
            description: 'Emergency water damage restoration across Geelong and the Surf Coast.',
          },
          {
            title: 'Flood Damage Geelong',
            href: '/flood-damage-restoration-geelong',
            description: 'Barwon River and Corio Bay flood damage restoration across Geelong.',
          },
          {
            title: 'Fire Damage Melbourne',
            href: '/fire-damage-restoration-melbourne',
            description: 'IICRC S700:2025 fire damage restoration across Melbourne and surrounds.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
