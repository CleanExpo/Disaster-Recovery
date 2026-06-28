import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Gold Coast | 24/7 IICRC Certified',
  description: 'Professional water damage restoration across the Gold Coast. IICRC S500:2025 certified contractors respond as quickly as possible. Burst pipes, storm flooding, Ex-TC Alfred recovery. Lodge 24/7.',
  keywords: 'water damage restoration gold coast, water damage gold coast, flood damage gold coast, burst pipe gold coast, water damage repair gold coast, IICRC gold coast, alfred water damage gold coast, structural drying gold coast',
  openGraph: {
    title: 'Water Damage Restoration Gold Coast | 24/7 Emergency Response',
    description: 'Emergency water damage restoration across the Gold Coast. IICRC S500:2025 certified. priority response. Ex-TC Alfred recovery support.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Gold Coast')}&service=water-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-gold-coast`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-gold-coast/#localbusiness`,
  name: `${NAP.name} Gold Coast`,
  url: `${NAP.url}/water-damage-restoration-gold-coast`,
  description: 'IICRC-certified water damage restoration contractors serving the Gold Coast 24/7. Water extraction, structural drying, mould prevention, and full insurance documentation.',
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
  name: 'Water Damage Restoration Gold Coast',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Gold Coast' },
  serviceType: 'Water Damage Restoration',
  description: 'Professional water damage restoration on the Gold Coast: emergency water extraction, structural drying to IICRC S500:2025, mould prevention, contents protection, and full insurance claim documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly should water damage be treated on the Gold Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Within 24\u201348 hours. The Gold Coast\u2019s subtropical humidity means mould can begin establishing within 24 hours in water-affected wall cavities and subfloor. The longer moisture remains trapped, the greater the structural and contents loss. Lodge at disasterrecovery.com.au/claim for priority emergency dispatch.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is my Ex-TC Alfred damage on the Gold Coast still claimable in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes \u2014 most insurers accept late lodgements where damage can be demonstrated as originating from the Alfred event. Suburbs including Burleigh, Miami, Mermaid Beach, and Southport recorded significant rainfall. Secondary mould from incomplete drying is now appearing and is claimable as consequential loss. NRPG provides full documentation for late and supplementary lodgements.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is different about water damage restoration in Gold Coast high-rise units?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'High-rise and resort-style properties on the Gold Coast present complex water damage scenarios: inter-tenancy disputes, body corporate involvement, and multi-trade coordination. NRPG manages the full scope including body corporate notifications, strata insurer liaisons, and IICRC-compliant drying documentation for multi-level water migration.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does water damage restoration cost on the Gold Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gold Coast water damage restoration ranges from $3,000 for minor Cat 1 burst pipe losses to $150,000+ for multi-trade losses in high-rise complexes. The Disaster Recovery platform charges a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency works.',
      },
    },
  ],
};

export default function WaterDamageRestorationGoldCoastPage() {
  return (
    <>
      <Script id="wdrgc-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="wdrgc-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="wdrgc-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Gold Coast"
        subtitle="Emergency water damage restoration across the Gold Coast. IICRC S500:2025 certified technicians. priority response, 24 hours a day. Ex-TC Alfred recovery support available."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Gold Coast' },
        ]}
        sections={[
          {
            heading: 'Gold Coast Water Damage Risk Profile',
            body: (
              <>
                <p>
                  The Gold Coast&apos;s subtropical climate delivers annual rainfall exceeding 1,700 mm,
                  concentrated into intense summer storm events that regularly overwhelm drainage infrastructure
                  and breach building envelopes. The region&apos;s creek systems — the Nerang River,
                  Tallebudgera Creek, and Currumbin Creek — create flood-prone corridors through established
                  residential and resort precincts.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Gold Coast&apos;s large stock of high-rise and resort-style properties introduces complex
                  water damage scenarios not found in low-density markets: inter-tenancy water migration, body
                  corporate insurance disputes, and multi-trade remediation requirements across stacked
                  residential floors. Ex-Tropical Cyclone Alfred in March 2026 impacted northern Gold Coast
                  suburbs with significant rainfall, generating a wave of claims across Southport, Surfers
                  Paradise, and the Broadwater corridor.
                </p>
              </>
            ),
          },
          {
            heading: 'Ex-TC Alfred — Gold Coast Recovery',
            body: (
              <>
                <p>
                  Burleigh, Miami, Mermaid Beach, Broadbeach, and Southport recorded significant rainfall
                  during the Alfred event in March 2026. Many properties that appeared dry immediately after
                  the event are now presenting secondary mould issues — a consequence of incomplete initial
                  drying or moisture trapped in wall cavities and subfloor.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Late claims:</strong> NRPG supports lodgement of claims where damage can be
                    attributed to Alfred, regardless of delay. Full IICRC-compliant scope documentation
                    is provided.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Supplementary claims:</strong> If your original claim did not capture mould,
                    subfloor damage, or contents loss, NRPG prepares supplementary scope assessments for
                    insurer resubmission or AFCA escalation.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Mould appearing post-drying:</strong> A sign of incomplete remediation. NRPG
                    performs thermal imaging and moisture mapping to identify residual moisture before
                    re-remediation.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Water Damage Cost Estimates — Gold Coast 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Cat 1 burst pipe or appliance overflow:</strong> $3,000–$12,000. Water
                    extraction, drying, plasterboard and flooring repair.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Cat 2 storm water ingress:</strong> $5,000–$20,000. Moisture mapping,
                    commercial drying, antimicrobial treatment, structural repairs.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Cat 3 sewage or floodwater inundation:</strong> $15,000–$60,000+. Full
                    decontamination, subfloor treatment, and restoration to pre-loss condition.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>High-rise unit complex multi-trade loss:</strong> $25,000–$150,000+.
                    Project-managed restoration across structural, water, electrical, and mould trades
                    with body corporate coordination.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Gold Coast Suburbs We Cover',
            body: (
              <>
                <p>priority emergency response across the Gold Coast and Tweed Corridor:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Coastal Strip:</strong> Southport, Surfers Paradise, Broadbeach, Burleigh
                  Heads, Miami, Mermaid Beach, Nobby Beach
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Gold Coast:</strong> Helensvale, Coomera, Ormeau, Pimpama,
                  Oxenford, Pacific Pines
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Hinterland:</strong> Mudgeeraba, Robina, Varsity Lakes, Reedy
                  Creek, Worongary
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Tweed Corridor:</strong> Coolangatta, Bilinga, Tugun, Currumbin, Palm
                  Beach, Casuarina NSW
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly should water damage be treated on the Gold Coast?',
            answer: "Within 24–48 hours. The Gold Coast's subtropical humidity means mould can begin establishing within 24 hours in water-affected wall cavities and subfloor. The longer moisture remains trapped, the greater the structural and contents loss. Lodge at disasterrecovery.com.au/claim for priority emergency dispatch.",
          },
          {
            question: 'Is my Ex-TC Alfred damage on the Gold Coast still claimable in 2026?',
            answer: "Yes — most insurers accept late lodgements where damage can be demonstrated as originating from the Alfred event. Suburbs including Burleigh, Miami, Mermaid Beach, and Southport recorded significant rainfall. Secondary mould from incomplete drying is now appearing and is claimable as consequential loss. NRPG provides full documentation for late and supplementary lodgements.",
          },
          {
            question: 'What is different about water damage restoration in Gold Coast high-rise units?',
            answer: "High-rise and resort-style properties on the Gold Coast present complex water damage scenarios: inter-tenancy disputes, body corporate involvement, and multi-trade coordination. NRPG manages the full scope including body corporate notifications, strata insurer liaisons, and IICRC-compliant drying documentation for multi-level water migration.",
          },
          {
            question: 'How much does water damage restoration cost on the Gold Coast?',
            answer: "Gold Coast water damage restoration ranges from $3,000 for minor Cat 1 burst pipe losses to $150,000+ for multi-trade losses in high-rise complexes. The Disaster Recovery platform charges a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency works.",
          },
        ]}
        relatedGuides={[
          { title: 'Water Damage Restoration Brisbane', href: '/water-damage-restoration-brisbane', description: 'Our Brisbane water damage restoration service.' },
          { title: 'Flood Damage Restoration Gold Coast', href: '/flood-damage-restoration-gold-coast', description: 'Specialist flood damage restoration across the Gold Coast.' },
          { title: 'Mould Remediation Gold Coast', href: '/mould-remediation-gold-coast', description: 'Prevent and remediate mould after water damage on the Gold Coast.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
