import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-478: Mould Remediation Hobart
 *
 * Created: 9 April 2026
 * Context: Hobart at 42°S has cool, wet winters with relative humidity averaging
 * 70–80% in winter months. Tasmania's colonial heritage buildings (Battery Point,
 * North Hobart, Salamanca, South Hobart) contain lime plaster, stone, and brick
 * cavity walls that absorb moisture — endemic structural mould without proper
 * ventilation. Heritage overlay requirements mean specialist consolidation is
 * required rather than standard lime plaster removal.
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Hobart | IICRC-Certified 24/7 Emergency',
  description:
    'Professional mould remediation across Hobart. IICRC-certified contractors for heritage lime plaster, post-storm, and winter condensation mould. HEPA remediation, Heritage Tasmania compliant. Lodge your claim 24/7.',
  keywords:
    'mould remediation hobart, mould removal hobart, heritage mould hobart, mould battery point, mould remediation tasmania, lime plaster mould hobart, black mould hobart, mould inspection hobart',
  openGraph: {
    title: 'Mould Remediation Hobart | IICRC-Certified 24/7 Emergency',
    description:
      'Professional mould remediation across Hobart. IICRC-certified contractors for heritage lime plaster, post-storm, and winter condensation mould. HEPA remediation, Heritage Tasmania compliant.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Mould+Remediation&city=Hobart&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-hobart`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-hobart/#localbusiness`,
  name: `${NAP.name} Hobart`,
  url: `${NAP.url}/mould-remediation-hobart`,
  description:
    'IICRC-certified mould remediation contractors serving all Hobart suburbs and the Channel area. Heritage lime plaster specialists. Post-storm and winter condensation mould remediation with Heritage Tasmania compliant methods.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Hobart',
    containedInPlace: { '@type': 'State', name: 'Tasmania' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hobart',
    addressRegion: 'TAS',
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
  name: 'Mould Remediation Hobart',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Hobart' },
  serviceType: 'Mould Remediation',
  description:
    'Professional mould remediation across Hobart and surrounding suburbs. Heritage lime plaster and stone building specialists. HEPA air scrubbing, thermal imaging, containment barriers, antimicrobial treatment, and post-remediation clearance testing to IICRC S520.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why do Hobart heritage buildings get so much mould?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Hobart's colonial-era buildings — particularly in Battery Point, Salamanca, North Hobart, and South Hobart — were constructed with lime plaster, sandstone, and solid brick cavity walls. These materials are highly hygroscopic: they absorb atmospheric moisture readily and release it slowly. Hobart winters at 42°S bring relative humidity averaging 70–80%, often sustained for weeks at a time. Without adequate internal ventilation, this moisture cannot escape — it accumulates in wall cavities and lime plaster surfaces, creating ideal conditions for mould colonisation. Modern remediation methods used in non-heritage properties (cutting out and replacing plasterboard) cannot be applied to these materials without Heritage Tasmania approval.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover mould in Tasmanian homes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Mould directly caused by a covered water event — such as a storm-related roof leak or burst pipe — is generally covered under standard home and contents policies. Chronic condensation mould (caused by inadequate ventilation rather than a sudden event) is typically excluded. For heritage properties where mould remediation requires specialist lime-compatible methods, the additional cost of heritage-compliant treatment can be included in the claim scope if the underlying cause is a covered event. NRPG documents all remediation to IICRC S520 standard with moisture mapping and photographic evidence. Note: the ARPC Cyclone Pool does not apply to Hobart; standard private insurance applies.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is different about mould remediation in a heritage Hobart property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Heritage properties in Battery Point, Salamanca, and North Hobart are subject to Heritage Tasmania guidelines. This means mould remediation cannot simply remove original lime plaster — specialist consolidation and compatible lime-based treatments must be used to preserve the fabric of the building. NRPG contractors experienced in Hobart heritage work understand these constraints. We work within Heritage Tasmania guidelines while achieving full mould clearance to IICRC S520 standard.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does mould remediation cost in Hobart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Costs depend on the extent and category of contamination. Category 1 (surface mould, single room): $1,500–$7,000. Category 2 (structural or wall cavity mould): $4,000–$18,000. Heritage property specialist remediation (Battery Point, Salamanca, North Hobart): $8,000–$40,000+. Where mould is caused by a covered insurance event, the scope and cost is documented to IICRC S520 standard for insurer submission.',
      },
    },
  ],
};

export default function MouldRemediationHobartPage() {
  return (
    <>
      <Script
        id="mrhbt-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrhbt-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrhbt-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Hobart"
        subtitle="IICRC-certified mould remediation across all Hobart suburbs and the Channel area. Heritage lime plaster and stone building specialists. Post-storm and winter condensation mould remediation. Heritage Tasmania compliant methods. 24/7 response."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Hobart' },
        ]}
        sections={[
          {
            heading: "Hobart's Heritage Mould Problem — Cold, Damp, and Lime Plaster",
            body: (
              <>
                <p>
                  Hobart sits at 42°S — the same latitude as the southern tip of Spain or the northern coast
                  of California, but exposed to the full force of Southern Ocean weather systems without
                  continental buffering. Winters are cool and persistently wet: average annual rainfall of
                  625mm is concentrated in winter months, and relative humidity regularly sits at 70–80%
                  for weeks at a time. In these conditions, moisture does not simply evaporate — it
                  accumulates.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The problem is acute in Hobart&apos;s colonial heritage precincts. Battery Point,
                  Salamanca, North Hobart, South Hobart, and West Hobart contain a significant proportion of
                  pre-1900 stone and brick construction with original lime plaster interiors. These materials
                  are highly hygroscopic: they absorb atmospheric moisture readily and hold it within their
                  fabric. Unlike modern gypsum plasterboard, which can be cut out and replaced, lime plaster
                  is a heritage material — in properties covered by Heritage Tasmania overlays, it cannot be
                  removed without approval. Specialist consolidation and lime-compatible antimicrobial
                  treatment is required.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Pre-1950 housing stock across Hobart adds a further vulnerability: poor or absent
                  insulation means internal wall surface temperatures in winter drop to near-dewpoint
                  levels. Warm, moisture-laden indoor air contacts cold wall surfaces and condensation
                  forms — daily, persistently, through winter. This sustained surface moisture drives mould
                  colonisation in bedrooms, kitchens, and behind furniture where air circulation is
                  limited.
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Thermal imaging to locate moisture within lime plaster, stone cavity walls, and
                    subfloor spaces
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    HEPA air scrubbing to capture airborne mould spores during remediation
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Lime-compatible antimicrobial treatment for heritage wall surfaces — not modern
                    biocide products that damage lime plaster chemistry
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Containment barriers to protect unaffected areas and contents during work
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Post-remediation clearance testing to IICRC S520 for insurer and Heritage Tasmania
                    documentation
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Post-Storm Mould in Tasmania',
            body: (
              <>
                <p>
                  Hobart&apos;s exposure to Southern Ocean low-pressure systems means severe storm events
                  are a recurring feature of Tasmanian winters. The 2016 east coast low was particularly
                  damaging: unprecedented rainfall caused roof failures, subfloor flooding, and internal
                  water ingress across a wide range of Hobart properties. In the cold, damp conditions that
                  follow a Tasmanian storm, mould can establish within 48–72 hours in water-affected
                  materials — faster than many homeowners realise.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Subfloor flooding is a particular concern in older Hobart housing. Many pre-1950
                  properties have low-clearance subfloors with minimal or absent waterproofing membranes.
                  After sustained winter rain, water accumulates under the home — saturating subfloor
                  timbers, floor joists, and insulation batts. In Hobart&apos;s cool temperatures, this
                  moisture does not evaporate naturally. Without mechanical drying, subfloor mould spreads
                  upward into the interior within weeks.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Roof leaks in heritage properties present a specific challenge: water tracking through
                  sandstone or brick fabric before appearing internally can saturate large areas of lime
                  plaster and structural timber before the source is identified. NRPG performs moisture
                  mapping across the full water pathway — not just the visible surface — to ensure all
                  affected material is identified and dried before remediation begins.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  IICRC S520 applies to all mould remediation in Hobart. Hobart&apos;s cooler temperatures
                  mean mould spore counts are typically lower than in tropical cities, but colonisation
                  persists for much longer without active intervention — cold temperatures inhibit the
                  natural drying that would otherwise slow mould growth in warmer climates.
                </p>
              </>
            ),
          },
          {
            heading: 'Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  24/7 response across the greater Hobart area, the Channel, and the Derwent Valley:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner / Heritage Precincts:</strong> Battery Point, Salamanca, South Hobart,
                  West Hobart, North Hobart, Glebe
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Sandy Bay, Dynnyrne, Lower Sandy Bay
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Corridor:</strong> Glenorchy, Moonah, Derwent Park
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Channel Area:</strong> Kingston, Blackmans Bay, Taroona
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Derwent Valley:</strong> Huonville, New Norfolk
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Why do Hobart heritage buildings get so much mould?',
            answer:
              "Hobart's colonial-era buildings — Battery Point, Salamanca, North Hobart, and South Hobart — were constructed with lime plaster, sandstone, and solid brick cavity walls. These materials are highly hygroscopic and absorb atmospheric moisture readily. Hobart winters bring relative humidity averaging 70–80% sustained for weeks at a time. Without adequate internal ventilation, moisture accumulates in wall cavities and lime plaster surfaces, creating ideal conditions for mould colonisation that cannot be remediated using standard plasterboard replacement methods.",
          },
          {
            question: 'Does insurance cover mould in Tasmanian homes?',
            answer:
              "Mould directly caused by a covered water event — storm roof leak, burst pipe — is generally covered. Chronic condensation mould from inadequate ventilation is typically excluded. For heritage properties, additional costs of Heritage Tasmania compliant remediation methods can be included in the claim scope where the underlying cause is a covered event. NRPG documents to IICRC S520 standard. Note: the ARPC Cyclone Pool does not apply to Hobart; standard private insurance applies.",
          },
          {
            question: 'What is different about mould remediation in a Hobart heritage property?',
            answer:
              "Heritage properties in Battery Point, Salamanca, and North Hobart are subject to Heritage Tasmania guidelines. Mould remediation cannot simply remove original lime plaster — specialist consolidation and lime-compatible treatments must be used to preserve the building fabric. NRPG contractors experienced in Hobart heritage work operate within these constraints while achieving full mould clearance to IICRC S520 standard.",
          },
          {
            question: 'How much does mould remediation cost in Hobart?',
            answer:
              'Costs depend on the extent and category of contamination. Category 1 (surface mould, single room): $1,500–$7,000. Category 2 (structural or wall cavity mould): $4,000–$18,000. Heritage property specialist remediation (Battery Point, Salamanca, North Hobart): $8,000–$40,000+. Where mould is caused by a covered insurance event, the scope and cost is documented to IICRC S520 standard for insurer submission.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Storm Damage Restoration Hobart',
            href: '/storm-damage-restoration-hobart',
            description: 'Storm damage restoration and insurance claim support across Hobart.',
          },
          {
            title: 'Mould Remediation Melbourne',
            href: '/mould-remediation-melbourne',
            description: 'Our Melbourne mould remediation service.',
          },
          {
            title: 'Water Damage Restoration Services',
            href: '/services/water-damage',
            description: 'Emergency water damage restoration across Australia.',
          },
          {
            title: 'Mould Remediation Perth',
            href: '/mould-remediation-perth',
            description: 'Our Perth mould remediation service.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
