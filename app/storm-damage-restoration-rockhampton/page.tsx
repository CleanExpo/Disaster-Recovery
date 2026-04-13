import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Rockhampton | 24/7 IICRC Certified',
  description: 'Storm damage restoration across Rockhampton and Central Queensland. IICRC-certified contractors. Cyclone-driven storm, hail, and flood events. priority emergency response.',
  keywords: 'storm damage restoration rockhampton, cyclone damage rockhampton, storm rockhampton, central queensland storm restoration, rocky storm damage',
  openGraph: {
    title: 'Storm Damage Restoration Rockhampton | 24/7 IICRC Certified',
    description: 'Storm damage restoration across Rockhampton and Central Queensland. IICRC-certified contractors. Cyclone-driven storm, hail, and flood events. priority emergency response.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Rockhampton')}&service=storm-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-rockhampton`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-rockhampton/#localbusiness`,
  name: `${NAP.name} Rockhampton`,
  url: `${NAP.url}/storm-damage-restoration-rockhampton`,
  description: '24/7 emergency storm damage restoration across Rockhampton and Central Queensland. IICRC-certified contractor network for storm, hail, cyclone-remnant, and flood damage.',
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
  name: 'Emergency Storm Damage Restoration Rockhampton',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Rockhampton', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  serviceType: 'Storm Damage Restoration',
  description: 'Professional storm damage restoration across Rockhampton including emergency make-safe, roof tarping, hail damage repair, cyclone-remnant storm response, and full insurance documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What storm damage is most common in Rockhampton?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The most common storm damage in Rockhampton includes supercell thunderstorms with hail and wind damage, cyclone-remnant storms from FNQ events tracking south, Fitzroy River flooding after cyclone-rainfall events, and lightning strikes causing fire damage. Hailstorms in spring and early summer are particularly damaging to roofing and vehicles in the Rocky region.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does ARPC Cyclone Pool apply to Rockhampton storm events?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Rockhampton (23.4°S) is just north of the Tropic of Capricorn (23.5°S), so the ARPC Cyclone Reinsurance Pool technically applies. For storms caused by a declared cyclone system, lodge your claim as 'cyclone' rather than 'storm' for correct ARPC processing. NRPG does not provide policy advice — contact your insurer for specific coverage questions.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my Rocky storm damage is storm or flood?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Rain blown through a damaged building envelope is storm damage. Fitzroy River overflowing its banks is flood damage (requires separate flood cover). Surface water runoff depends on the specific cause. These distinctions matter for insurance claims. NRPG's IICRC-certified contractors correctly categorise each damage type in the scope of works to support maximum claim outcome.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get emergency make-safe after a storm in Rockhampton tonight?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — NRPG operates 24/7/365. Lodge your claim at disasterrecovery.com.au/claim and an NRPG-certified contractor will be dispatched to your Rockhampton property. NRPG targets a priority emergency response for structural make-safe anywhere in Greater Rockhampton.",
      },
    },
  ],
};

export default function StormDamageRestorationRockhamptonPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="sdrrrock-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrrrock-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="sdrrrock-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Rockhampton"
        subtitle="Storm damage restoration across Rockhampton and Central Queensland. IICRC-certified contractors for cyclone-driven storm, hail, and flood events. priority emergency response 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Rockhampton' },
        ]}
        sections={[
          {
            heading: "Rockhampton's Storm Profile",
            body: (
              <>
                <p>
                  Rockhampton (23.4&deg;S) sits at the southern edge of the ARPC Cyclone Reinsurance Pool zone,
                  exposed to multiple storm hazard types. Supercell thunderstorms generated from the Darling
                  Downs trough track northeast through Central Queensland, bringing intense hail, wind, and
                  lightning. Cyclone-remnant rainfall systems from FNQ events frequently reach Rockhampton,
                  producing extended heavy rainfall and Fitzroy River flooding.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Hailstorms in spring and early summer are a significant and recurring source of roofing and
                  vehicle damage across the Rocky region. The Fitzroy River &mdash; one of Australia&apos;s
                  largest river systems &mdash; drains a vast Central Queensland catchment and frequently floods
                  Rockhampton&apos;s low-lying suburbs following major rainfall events associated with cyclone
                  systems tracking south from the tropics. Lightning strikes causing structural fire damage are
                  also more frequent in Rockhampton than in most other Queensland cities.
                </p>
              </>
            ),
          },
          {
            heading: 'What to Do After Storm Damage in Rockhampton',
            body: (
              <>
                <p>
                  Following a severe storm event in Rockhampton, follow this five-step sequence:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>1. Safety check:</strong> Do not re-enter your property until you are certain it is
                  structurally safe. Check for downed power lines, gas leaks, and structural compromise before
                  approaching.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>2. Photograph everything:</strong> Document all visible damage before any clean-up
                  begins. This photographic evidence is critical for your insurance claim scope.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>3. Temporary make-safe:</strong> Roof tarping and window boarding prevent further
                  water ingress &mdash; these are temporary measures, not permanent repairs. Do not undertake
                  permanent repairs until your insurer has assessed the damage.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>4. Lodge your claim:</strong> Contact your insurer or lodge at
                  disasterrecovery.com.au/claim. Early lodgement secures your place in the contractor queue
                  before high-volume post-storm demand.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>5. Call NRPG:</strong> NRPG&apos;s IICRC-certified contractors provide 60-minute
                  emergency response for structural make-safe, moisture mapping, and initial scope documentation
                  anywhere in Greater Rockhampton.
                </p>
              </>
            ),
          },
          {
            heading: 'Rockhampton Suburbs We Cover',
            body: (
              <>
                <p>Emergency storm damage response across Rockhampton and surrounds:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner City:</strong> Rockhampton CBD, Depot Hill, The Range, Wandal, Allenstown
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Suburbs:</strong> North Rockhampton, Berserker, Kawana, Park Avenue,
                  Norman Gardens, Frenchville
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern and Western:</strong> Southside, Gracemere, Koongal, Currajong, Hermit Park
                </p>
              </>
            ),
          },
          {
            heading: 'Emergency Make-Safe and Storm Damage Cost in Rocky',
            body: (
              <>
                <p>
                  NRPG&apos;s emergency make-safe response stabilises your Rockhampton property immediately
                  after storm damage. Typical costs for emergency services:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Emergency roof tarping:</strong> $800&ndash;$3,000 depending on extent of roof
                  damage and tarp area required
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Window and door board-up:</strong> $400&ndash;$1,200 per property for temporary
                  structural security
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Structural drying after storm water ingress:</strong> $3,000&ndash;$15,000+
                  depending on the extent of moisture penetration and affected floor area
                </p>
                <p style={{ marginTop: '1rem' }}>
                  These costs are generally covered by home and contents insurance for storm events. NRPG&apos;s
                  IICRC-certified contractors document all work to insurance standards, providing the scope
                  evidence your insurer needs for correct claim settlement.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What storm damage is most common in Rockhampton?',
            answer: "The most common storm damage in Rockhampton includes supercell thunderstorms with hail and wind damage, cyclone-remnant storms from FNQ events tracking south, Fitzroy River flooding after cyclone-rainfall events, and lightning strikes causing fire damage. Hailstorms in spring and early summer are particularly damaging to roofing and vehicles in the Rocky region.",
          },
          {
            question: 'Does ARPC Cyclone Pool apply to Rockhampton storm events?',
            answer: "Rockhampton (23.4°S) is just north of the Tropic of Capricorn (23.5°S), so the ARPC Cyclone Reinsurance Pool technically applies. For storms caused by a declared cyclone system, lodge your claim as 'cyclone' rather than 'storm' for correct ARPC processing. NRPG does not provide policy advice — contact your insurer for specific coverage questions.",
          },
          {
            question: 'How do I know if my Rocky storm damage is storm or flood?',
            answer: "Rain blown through a damaged building envelope is storm damage. Fitzroy River overflowing its banks is flood damage (requires separate flood cover). Surface water runoff depends on the specific cause. These distinctions matter for insurance claims. NRPG's IICRC-certified contractors correctly categorise each damage type in the scope of works to support maximum claim outcome.",
          },
          {
            question: 'Can I get emergency make-safe after a storm in Rockhampton tonight?',
            answer: "Yes — NRPG operates 24/7/365. Lodge your claim at disasterrecovery.com.au/claim and an NRPG-certified contractor will be dispatched to your Rockhampton property. NRPG targets a priority emergency response for structural make-safe anywhere in Greater Rockhampton.",
          },
        ]}
        relatedGuides={[
          { title: 'Cyclone Damage Restoration Rockhampton', href: '/cyclone-damage-restoration-rockhampton', description: 'Specialist cyclone structural restoration across Rockhampton.' },
          { title: 'Storm Damage Insurance Claim', href: '/guides/insurance/storm-damage-insurance-claim-process', description: 'Step-by-step guide to lodging a storm damage insurance claim in Australia.' },
          { title: 'Storm Damage Cost Guide', href: '/guides/cost-guides/how-much-storm-damage-restoration-cost', description: 'How much does storm damage restoration cost in Australia?' },
        ]}
        cta={{ text: 'Get Emergency Storm Help — Rockhampton', href: '/claim' }}
      />
    </>
  );
}
