import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Innisfail | Post-TC Maila Electrical Fire Response',
  description:
    'Fire damage restoration in Innisfail and the Cassowary Coast. IICRC S700:2025 certified. Post-TC Maila electrical and structural fire response. Lodge 24/7.',
  keywords:
    'fire damage restoration innisfail, post cyclone fire innisfail, TC Maila fire innisfail, electrical fire innisfail, smoke damage innisfail, cassowary coast fire restoration',
  openGraph: {
    title: 'Fire Damage Restoration Innisfail | Post-TC Maila Electrical Fire Response',
    description:
      'Fire damage restoration in Innisfail and the Cassowary Coast. IICRC S700:2025 certified. Post-TC Maila electrical and structural fire response. Lodge 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Fire Damage Restoration')}&city=${encodeURIComponent('Innisfail')}&service=fire-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-innisfail`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-innisfail/#localbusiness`,
  name: `${NAP.name} Innisfail`,
  url: `${NAP.url}/fire-damage-restoration-innisfail`,
  description:
    '24/7 emergency fire damage restoration across Innisfail and the Cassowary Coast. IICRC S700:2025 certified contractor network for post-TC Maila electrical fires, smoke damage, and structural fire restoration. Asbestos-aware heritage building specialists.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Innisfail',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Innisfail',
    addressRegion: 'QLD',
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
  name: 'Fire Damage Restoration Innisfail',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: {
    '@type': 'City',
    name: 'Innisfail',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  serviceType: 'Fire Damage Restoration',
  description:
    'Professional fire and smoke damage restoration across Innisfail and the Cassowary Coast. Post-TC Maila electrical fire make-safe, smoke damage in tropical conditions, soot extraction, odour elimination, asbestos management for pre-1987 fibro housing, and structural rebuild under IICRC S700:2025.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What causes post-cyclone fires in Innisfail?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TC Maila creates multiple fire ignition risks in Innisfail: damaged electrical wiring arcing after power restoration to cyclone-compromised circuits; gas line ruptures from structural movement or debris impact; generator misuse — overloading, incorrect fuel, or inadequate ventilation causing CO poisoning and fire risk; hot embers from damaged or burning structures spreading to adjacent buildings; and wet debris in contact with live power lines creating arc ignition points. Do not assume electrical safety after a cyclone — have a licensed electrician inspect before restoring power.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does cyclone insurance cover post-TC Maila electrical fires in Innisfail?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Post-cyclone electrical fires are typically covered under the same cyclone event claim. Lodge as "cyclone damage" with "fire damage" as a secondary consequence of the cyclone-caused electrical damage. The ARPC Cyclone Pool applies to Innisfail properties. IICRC S700:2025 fire restoration documentation supports the causal chain from cyclone damage to fire ignition — this documentation is important for insurer acceptance of the fire damage as a cyclone-consequential event.',
      },
    },
    {
      '@type': 'Question',
      name: 'What IICRC standard applies to fire and smoke damage restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC S700:2025 governs fire and smoke restoration. The standard requires thermal fogging, ozone treatment, and HEPA air scrubbing as minimum protocols. A commonly missed item in insurer assessments: smoke migrates to adjacent unaffected rooms through HVAC systems — the full HVAC duct network in a fire-affected building must be inspected, decontaminated, and documented. Smoke in HVAC that is not remediated continues to re-contaminate the building after restoration is otherwise complete.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is asbestos a risk in Innisfail fire damage restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — Innisfail has significant pre-1987 fibro housing stock, including heritage banana farm buildings and Art Deco structures in the CBD precinct. Fire damage involving wall linings, ceiling sheets, or eave soffits in these buildings requires a licensed asbestos assessor before any restoration work begins. Disturbing asbestos-containing materials during fire restoration without a management plan is a serious safety and legal risk. NRPG coordinates licensed asbestos management plans as part of the restoration scope for affected properties.',
      },
    },
  ],
};

export default function FireDamageRestorationInnisfailPage() {
  return (
    <>
      <Script
        id="fdrinn-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdrinn-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdrinn-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Innisfail"
        subtitle="IICRC S700:2025 certified fire damage restoration across Innisfail and the Cassowary Coast. Post-TC Maila electrical and structural fire response. Asbestos-aware heritage building specialists. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #7F0000 0%, #C62828 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-13"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Innisfail' },
        ]}
        sections={[
          {
            heading: 'Post-TC Maila Fire Risk in Innisfail',
            body: (
              <>
                <p>
                  TC Maila&apos;s passage through the Innisfail region creates a high-risk post-clearance
                  period for fire ignition. Innisfail&apos;s electrical infrastructure — a mix of overhead
                  lines and older residential wiring — is particularly vulnerable to cyclone damage: fallen
                  power lines and compromised house wiring both present fire ignition risk when grid power
                  is restored after the event.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Generator misuse is one of the most common causes of post-cyclone fires in regional FNQ
                  communities. Overloaded generators, incorrect fuel handling, and generators operated in
                  enclosed spaces create both fire and carbon monoxide risks. In Innisfail&apos;s post-TC
                  Maila conditions, extended power outages mean generator use is widespread — increasing
                  the frequency of generator-related incidents.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Innisfail&apos;s dense tropical vegetation — wet season cane fields, mango orchards, and
                  rainforest edges — creates limited traditional bushfire risk due to high moisture content.
                  However, dry post-cyclone debris accumulation (downed vegetation, structural material) can
                  create localised combustion conditions that spread rapidly to adjacent structures.
                  Heritage buildings in the Innisfail CBD&apos;s Art Deco precinct are particularly at risk
                  from structure-to-structure fire spread.
                </p>
              </>
            ),
          },
          {
            heading: 'Innisfail Fire Damage Restoration — Unique Challenges',
            body: (
              <>
                <p>
                  Innisfail&apos;s building stock presents specific challenges for fire damage restoration.
                  Pre-1987 fibro construction — common across residential Innisfail and in heritage banana
                  farm buildings — may contain asbestos in wall linings, ceiling sheets, and eave soffits.
                  Any fire damage involving these materials requires a licensed asbestos assessor and a
                  formal asbestos management plan before restoration work begins. NRPG coordinates this
                  assessment as part of the initial scope process.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Innisfail&apos;s tropical humidity significantly accelerates secondary damage after a
                  fire. Soot particles are hygroscopic — they absorb atmospheric moisture rapidly in FNQ
                  conditions — and penetrate porous materials (plasterboard, timber framing, soft
                  furnishings) more deeply than in drier climates. Without IICRC S700:2025 protocol
                  extraction, residual moisture and organic content in smoke deposits creates conditions
                  for mould colonisation within 48 hours of the fire event.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  HVAC smoke contamination is a commonly missed scope item: smoke migrates through duct
                  networks into adjacent rooms and floors, requiring HVAC decontamination and documentation
                  even for rooms with no visible fire or smoke damage. NRPG&apos;s S700:2025 scope covers
                  the full building including HVAC, not only the fire origin area.
                </p>
              </>
            ),
          },
          {
            heading: 'Areas We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  Emergency fire damage response across Innisfail and the Cassowary Coast:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Innisfail core:</strong> Innisfail CBD, South Innisfail, Mourilyan, Flying Fish
                  Point
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern corridor:</strong> Babinda, Mirriwinni
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Cassowary Coast:</strong> Silkwood, Japoonvale, Mena Creek, Tully,
                  El Arish, Mission Beach
                </p>
              </>
            ),
          },
          {
            heading: 'Fire and Smoke Insurance Claims — Innisfail',
            body: (
              <>
                <p>
                  Post-TC Maila electrical fires in Innisfail are typically covered under the cyclone event
                  claim — the fire is a secondary consequence of cyclone-caused electrical damage. Lodge as
                  &ldquo;cyclone damage&rdquo; with &ldquo;fire damage&rdquo; as a secondary peril. The
                  ARPC Cyclone Pool applies to Innisfail properties.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  IICRC S700:2025 documentation supports the insurer&apos;s assessment by providing a
                  standardised scope of works, thermal imaging evidence of hidden hotspots and structural
                  damage, and a smoke migration report covering adjacent rooms and HVAC pathways. This
                  documentation is critical where insurers dispute the extent of smoke migration or question
                  whether adjacent areas require restoration. NRPG provides complete S700:2025-compliant
                  documentation as standard.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What causes post-cyclone fires in Innisfail?',
            answer:
              'TC Maila creates multiple fire ignition risks: damaged electrical wiring arcing after power restoration, gas line ruptures, generator misuse (CO poisoning and fire risk), hot embers from damaged structures, and wet debris in contact with live power lines.',
          },
          {
            question: 'Does cyclone insurance cover post-TC Maila electrical fires in Innisfail?',
            answer:
              'Post-cyclone electrical fires are typically covered under the same cyclone event claim. Lodge as "cyclone damage" with "fire damage" as a secondary consequence. ARPC cyclone pool applies. IICRC S700:2025 fire documentation supports the causal link.',
          },
          {
            question: 'What IICRC standard applies to fire and smoke damage restoration?',
            answer:
              'IICRC S700:2025 governs fire and smoke restoration. Thermal fogging, ozone treatment, and HEPA air scrubbing are required. Smoke migrates to adjacent unaffected rooms through HVAC — a common item that assessors miss.',
          },
          {
            question: 'Is asbestos a risk in Innisfail fire damage restoration?',
            answer:
              'Yes — Innisfail has significant pre-1987 fibro housing stock including heritage banana farm buildings. Fire damage that involves wall linings requires a licensed asbestos assessor before work begins. NRPG coordinates asbestos management plans.',
          },
        ]}
        relatedGuides={[
          {
            title: 'TC Maila FNQ Emergency',
            href: '/events/tc-maila-fnq-2026',
            description: 'TC Maila recovery resources for Innisfail and all FNQ-affected areas.',
          },
          {
            title: 'Cyclone Damage Restoration Innisfail',
            href: '/cyclone-damage-restoration-innisfail',
            description: 'Cyclone structural damage restoration across Innisfail and the Cassowary Coast.',
          },
          {
            title: 'Mould Remediation Innisfail',
            href: '/mould-remediation-innisfail',
            description: 'Post-fire and post-flood mould remediation across Innisfail.',
          },
        ]}
        cta={{ text: 'Get TC Maila Fire Damage Help — Innisfail', href: '/claim' }}
      />
    </>
  );
}
