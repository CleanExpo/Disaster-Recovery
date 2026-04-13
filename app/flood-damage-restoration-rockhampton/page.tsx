import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Rockhampton | Fitzroy River Recovery',
  description: 'Flood damage restoration across Rockhampton. Fitzroy River flood recovery specialists. IICRC S500:2025 certified Cat 3 decontamination. priority response 24/7.',
  openGraph: {
    title: 'Flood Damage Restoration Rockhampton | Fitzroy River Recovery',
    description: 'Flood damage restoration across Rockhampton. Fitzroy River flood recovery specialists. IICRC S500:2025 certified Cat 3 decontamination. priority response 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Flood Damage Restoration')}&city=${encodeURIComponent('Rockhampton')}&service=flood-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-rockhampton`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-rockhampton/#localbusiness`,
  name: `${NAP.name} Rockhampton`,
  url: `${NAP.url}/flood-damage-restoration-rockhampton`,
  description: 'Flood damage restoration across Rockhampton. Fitzroy River flood recovery, IICRC S500:2025 Category 3 decontamination, priority emergency response 24/7.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Rockhampton', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Rockhampton', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Flood Damage Restoration Rockhampton',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Rockhampton', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  serviceType: 'Flood Damage Restoration',
  description: 'Professional flood damage restoration across Rockhampton including Fitzroy River flood recovery, Category 3 water decontamination per IICRC S500:2025, structural drying, and full insurance documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How often does Rockhampton flood?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The Fitzroy River reaches major flood level (8.5m) approximately every 5-7 years, with minor flooding (5.5m) occurring nearly every year. Rockhampton has been called Australia's most flood-prone city. Recent major events: 2011 peaked at 9.2m, 2013 at 8.3m, and 2023 at 8.1m. Low-lying suburbs including Depot Hill and areas adjacent to the Fitzroy are affected at every major event.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does Fitzroy River flood restoration cost in Rockhampton?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Fitzroy River floodwater is Category 3 contaminated, requiring full decontamination protocols. Typical costs: single-storey ground floor inundation $25,000-$80,000+; Queenslander raised floor with subfloor affected $15,000-$40,000. Contents destruction typically exceeds structural costs. These figures reflect IICRC S500:2025 Cat 3 decontamination requirements.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does flood cover apply to Fitzroy River inundation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Specific flood extension is required — standard QLD home policies often exclude river flooding. Following the 2011 floods many Rockhampton properties were uninsured or underinsured for flood. Check your Product Disclosure Statement carefully. NRPG helps with coverage analysis and provides IICRC-certified scope documentation for disputed claims. AFCA (Australian Financial Complaints Authority) is available for unresolved insurance disputes.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is Category 3 floodwater and how is it treated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Fitzroy River water is Category 3 contaminated — it contains sewage, agricultural chemicals, and petroleum products from the vast upstream catchment. IICRC S500:2025 Cat 3 protocol requires: full PPE for all contractors, systematic decontamination of all affected surfaces, removal of porous materials that cannot be safely restored, subfloor treatment, and antimicrobial fogging. Full psychrometric drying logs are maintained throughout for insurance documentation.",
      },
    },
  ],
};

export default function FloodDamageRestorationRockhamptonPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="fdrrrock-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="fdrrrock-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="fdrrrock-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Flood Damage Restoration Rockhampton"
        subtitle="Flood damage restoration across Rockhampton. Fitzroy River flood recovery specialists. IICRC S500:2025 certified Category 3 decontamination. priority response 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #0D47A1 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Flood', href: '/services/water-damage/flood' },
          { label: 'Rockhampton' },
        ]}
        sections={[
          {
            heading: "Rockhampton — Australia's Flood Capital",
            body: (
              <>
                <p>
                  Rockhampton sits on the Fitzroy River, one of Australia&apos;s largest river systems draining
                  a vast Central Queensland catchment. The Fitzroy reaches minor flood level (5.5m) nearly every
                  year and major flood level (8.5m) approximately every 5&ndash;7 years. Major flood events
                  have peaked at 9.2m in 2011, 8.3m in 2013, and 8.1m in 2023 &mdash; each event inundating
                  thousands of Rockhampton properties and causing hundreds of millions in damage.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Depot Hill and lower sections of The Range are the highest-risk residential areas, with
                  properties in these suburbs typically among the first to flood and the last to be accessible
                  after inundation. Elevated Queenslander-style homes provide subfloor protection but are not
                  immune &mdash; subfloor inundation causes significant structural damage and requires specialist
                  decontamination. Slab-on-ground homes face the highest internal flood damage risk at any given
                  flood height. The combination of river flood frequency, contamination levels, and insurance
                  availability issues makes Rockhampton one of the most challenging flood restoration
                  environments in Australia.
                </p>
              </>
            ),
          },
          {
            heading: 'Category 3 Flood Restoration Process',
            body: (
              <>
                <p>
                  Fitzroy River floodwater is Category 3 contaminated under IICRC S500:2025 &mdash; it contains
                  sewage overflows, agricultural chemicals, petroleum products, and biological hazards from the
                  vast upstream catchment. Cat 3 protocol is non-negotiable for safe restoration and insurance
                  compliance.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Rockhampton flood restoration sequence: structural safety assessment and water extraction
                  with hazardous waste disposal protocols; material salvageability assessment (what can be saved
                  vs what must be removed); removal of affected flooring, wall cavities, insulation, and
                  cabinetry as required under IICRC S500:2025 Cat 3 guidelines; full decontamination treatment
                  including antimicrobial application; subfloor treatment (critical for Queenslander-style homes);
                  monitored structural drying with continuous psychrometric logging. All documentation is
                  generated to insurance standards and provided to your insurer as part of the restoration scope.
                </p>
              </>
            ),
          },
          {
            heading: 'Rocky Suburbs Most Affected by Fitzroy Flooding',
            body: (
              <>
                <p>
                  Fitzroy River flooding affects Rockhampton suburbs in a predictable sequence based on flood
                  height. NRPG covers all affected areas with priority dispatch to highest-risk zones:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Highest Risk (floods at 5.5m+):</strong> Depot Hill &mdash; lowest-lying residential
                  area, typically first to flood and last to drain
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>High Risk (floods at 7m+):</strong> The Range (lower sections), South Rockhampton,
                  Frenchville lower sections
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Moderate Risk (floods at 8.5m+):</strong> Gracemere (Dawson Road corridor),
                  additional Range and Frenchville properties
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>All Areas:</strong> NRPG covers the full Greater Rockhampton region including
                  Gracemere, Berserker, Norman Gardens, and surrounding areas for all flood levels.
                </p>
              </>
            ),
          },
          {
            heading: 'Is Rocky Flood Worth Insuring?',
            body: (
              <>
                <p>
                  Post-2011 flood insurance availability in Rockhampton became a significant public policy issue.
                  Many insurers withdrew from or dramatically repriced Rockhampton flood cover following the
                  9.2m 2011 event, leaving property owners without meaningful options. The situation has
                  improved since the introduction of mandatory flood cover disclosure, but premium affordability
                  for high-risk Fitzroy floodplain properties remains a genuine challenge.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The ARPC Cyclone Reinsurance Pool does not cover flood &mdash; it covers cyclone damage only.
                  There is ongoing federal government discussion about a broader flood insurance pool for
                  high-risk areas like Rockhampton, but no such scheme existed as of April 2026.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  For Rockhampton property owners with flood cover, NRPG provides IICRC-certified scope
                  documentation that withstands insurer scrutiny. For those with disputed claims, NRPG&apos;s
                  independent assessment provides an evidence base for AFCA (Australian Financial Complaints
                  Authority) complaints. For uninsured properties, NRPG provides competitive restoration
                  quotes and can stage works to manage out-of-pocket costs.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How often does Rockhampton flood?',
            answer: "The Fitzroy River reaches major flood level (8.5m) approximately every 5-7 years, with minor flooding (5.5m) occurring nearly every year. Rockhampton has been called Australia's most flood-prone city. Recent major events: 2011 peaked at 9.2m, 2013 at 8.3m, and 2023 at 8.1m. Low-lying suburbs including Depot Hill and areas adjacent to the Fitzroy are affected at every major event.",
          },
          {
            question: 'How much does Fitzroy River flood restoration cost in Rockhampton?',
            answer: "Fitzroy River floodwater is Category 3 contaminated, requiring full decontamination protocols. Typical costs: single-storey ground floor inundation $25,000-$80,000+; Queenslander raised floor with subfloor affected $15,000-$40,000. Contents destruction typically exceeds structural costs. These figures reflect IICRC S500:2025 Cat 3 decontamination requirements.",
          },
          {
            question: 'Does flood cover apply to Fitzroy River inundation?',
            answer: "Specific flood extension is required — standard QLD home policies often exclude river flooding. Following the 2011 floods many Rockhampton properties were uninsured or underinsured for flood. Check your Product Disclosure Statement carefully. NRPG helps with coverage analysis and provides IICRC-certified scope documentation for disputed claims. AFCA (Australian Financial Complaints Authority) is available for unresolved insurance disputes.",
          },
          {
            question: 'What is Category 3 floodwater and how is it treated?',
            answer: "Fitzroy River water is Category 3 contaminated — it contains sewage, agricultural chemicals, and petroleum products from the vast upstream catchment. IICRC S500:2025 Cat 3 protocol requires: full PPE for all contractors, systematic decontamination of all affected surfaces, removal of porous materials that cannot be safely restored, subfloor treatment, and antimicrobial fogging. Full psychrometric drying logs are maintained throughout for insurance documentation.",
          },
        ]}
        relatedGuides={[
          { title: 'Water Damage Restoration Rockhampton', href: '/water-damage-restoration-rockhampton', description: 'IICRC-certified water damage restoration across Rockhampton.' },
          { title: 'Cyclone Damage Restoration Rockhampton', href: '/cyclone-damage-restoration-rockhampton', description: 'Specialist cyclone structural restoration across Rockhampton.' },
          { title: 'Flood Damage Cost Guide', href: '/guides/cost-guides/how-much-flood-damage-restoration-cost', description: 'How much does flood damage restoration cost in Australia?' },
        ]}
        cta={{ text: 'Get Flood Damage Help — Rockhampton', href: '/claim' }}
      />
    </>
  );
}
