import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Sydney | IICRC S700:2025 Certified 24/7',
  description: 'Emergency fire damage restoration across all Sydney suburbs. IICRC S700:2025 certified contractors for fire, smoke, and soot damage. Structural make-safe, odour removal, contents restoration. Lodge your claim 24/7.',
  keywords: 'fire damage restoration sydney, fire damage sydney, smoke damage sydney, soot damage sydney, fire restoration sydney, house fire sydney, IICRC fire restoration sydney',
  openGraph: {
    title: 'Fire Damage Restoration Sydney | IICRC S700:2025 Certified 24/7',
    description: 'Emergency fire damage restoration across all Sydney suburbs. IICRC S700:2025 certified contractors for fire, smoke, and soot damage. Structural make-safe, odour removal, contents restoration. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Fire Damage Restoration')}&city=${encodeURIComponent('Sydney')}&service=fire-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-sydney`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-sydney/#localbusiness`,
  name: `${NAP.name} Sydney`,
  url: `${NAP.url}/fire-damage-restoration-sydney`,
  description: '24/7 emergency fire damage restoration across all Sydney suburbs. IICRC S700:2025 certified contractor network for fire, smoke, soot, and odour restoration.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Sydney', containedInPlace: { '@type': 'State', name: 'New South Wales' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Sydney', addressRegion: 'NSW', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Fire Damage Restoration Sydney',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Sydney', containedInPlace: { '@type': 'State', name: 'New South Wales' } },
  serviceType: 'Fire Damage Restoration',
  description: 'Professional fire and smoke damage restoration across Sydney including emergency structural make-safe, soot removal, odour elimination, contents restoration, and full rebuild.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I lodge a house fire insurance claim in Sydney?',
      acceptedAnswer: { '@type': 'Answer', text: "Call your insurer immediately after the fire brigade confirms it is safe to re-enter. Photograph all damage \u2014 fire, smoke, soot, and water from fire suppression. Lodge your claim describing \u2018fire damage\u2019 and \u2018smoke damage\u2019 as separate items. Your insurer\u2019s ALE (Additional Living Expenses) benefit covers temporary accommodation if the property is uninhabitable. Lodge at disasterrecovery.com.au/claim for an IICRC-certified assessment to support your claim scope." },
    },
    {
      '@type': 'Question',
      name: 'Does home insurance cover bushfire ember damage in Sydney?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 ember attack damage (embers entering through roof vents, gutters, or crevices and igniting internal materials) is covered under the fire damage provision of most standard Australian home insurance policies. Smoke and soot damage from nearby bushfires (even without direct ember impact) is also generally covered. Document the source of damage carefully \u2014 photograph the entry points.' },
    },
    {
      '@type': 'Question',
      name: 'Can fire damage restoration remove smoke odour from my Sydney home?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. IICRC S700:2025-certified restoration uses thermal fogging and ozone treatment to chemically neutralise smoke odour molecules \u2014 not mask them. This is the only effective method for permanent odour elimination. Household cleaning products address surface soot but cannot penetrate wall cavities or HVAC systems where odour-causing compounds are absorbed. NRPG contractors are S700:2025-certified and equipped for full odour remediation.' },
    },
    {
      '@type': 'Question',
      name: 'How long does fire damage restoration take in Sydney?',
      acceptedAnswer: { '@type': 'Answer', text: 'Minor fire damage (single room, limited smoke spread): 7\u201314 days. Moderate fire damage (multiple rooms, smoke in HVAC): 3\u20136 weeks. Major structural fires: 3\u20136 months for full restoration to pre-loss condition. NRPG provides a project timeline as part of the initial assessment scope.' },
    },
  ],
};

export default function FireDamageRestorationSydneyPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="fdrsyd-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="fdrsyd-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="fdrsyd-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Sydney"
        subtitle="Emergency fire damage restoration across all Sydney suburbs. IICRC S700:2025 certified technicians for fire, smoke, soot, and odour restoration. 60-minute dispatch, 24 hours a day."
        gradient="linear-gradient(135deg, #1A0800 0%, #D84315 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Sydney' },
        ]}
        sections={[
          {
            heading: 'Fire Damage in Sydney — Types and Coverage',
            body: (
              <>
                <p>
                  Sydney experiences fire damage across three categories that require different restoration
                  approaches: residential house fires (the most common &mdash; kitchen fires, electrical faults, and
                  structural fires affecting 1&ndash;3 rooms); bushfire ember attack (particularly in Western Sydney,
                  the Northern Beaches, and Sutherland Shire &mdash; smoke and ember damage often extends well beyond
                  the burn zone); and multi-unit building fires (apartment and strata fires where shared spaces and
                  infrastructure create complex scope and insurance coordination requirements).
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG IICRC S700:2025-certified contractors are equipped for all three categories, with emergency
                  structural make-safe as the first priority in every engagement.
                </p>
              </>
            ),
          },
          {
            heading: 'Smoke and Soot — The Hidden Fire Damage',
            body: (
              <>
                <p>
                  The visible fire damage is often a fraction of the total restoration scope. Smoke travels through
                  wall cavities, HVAC systems, and roof spaces, depositing soot across areas far beyond the fire zone.
                  In Sydney&apos;s coastal climate, moisture absorption by smoke-contaminated materials accelerates
                  corrosion of metal fixtures, electrical components, and building hardware.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Soot from synthetic materials (common in modern furnishings) contains toxic compounds that require
                  HEPA filtration and professional decontamination &mdash; not household cleaning. NRPG&apos;s IICRC
                  S700:2025 restoration process includes: smoke mapping across the full property; HEPA air scrubbing;
                  thermal fogging for deep odour elimination; contents separation and assessment for restoration vs
                  write-off.
                </p>
              </>
            ),
          },
          {
            heading: 'Sydney Suburbs We Cover',
            body: (
              <>
                <p>
                  60-minute emergency response across all Sydney suburbs for fire damage make-safe and structural
                  assessment.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner West:</strong> Glebe, Newtown, Marrickville, Leichhardt
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>North Shore:</strong> Chatswood, Lane Cove, Ryde, Willoughby
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern Suburbs:</strong> Randwick, Bondi, Coogee, Paddington
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Beaches:</strong> Manly, Dee Why, Narrabeen
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western Suburbs:</strong> Parramatta, Blacktown, Penrith, Liverpool, Campbelltown
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>South Sydney:</strong> Hurstville, Kogarah, Sutherland, Miranda
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Bushfire ember attack response extends to the urban-rural fringe: Blue Mountains fringe,
                  Ku-ring-gai, Royal National Park corridor.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How do I lodge a house fire insurance claim in Sydney?',
            answer: 'Call your insurer immediately after the fire brigade confirms it is safe to re-enter. Photograph all damage — fire, smoke, soot, and water from fire suppression. Lodge your claim describing \'fire damage\' and \'smoke damage\' as separate items. Your insurer\'s ALE (Additional Living Expenses) benefit covers temporary accommodation if the property is uninhabitable. Lodge at disasterrecovery.com.au/claim for an IICRC-certified assessment to support your claim scope.',
          },
          {
            question: 'Does home insurance cover bushfire ember damage in Sydney?',
            answer: 'Yes — ember attack damage (embers entering through roof vents, gutters, or crevices and igniting internal materials) is covered under the fire damage provision of most standard Australian home insurance policies. Smoke and soot damage from nearby bushfires (even without direct ember impact) is also generally covered. Document the source of damage carefully — photograph the entry points.',
          },
          {
            question: 'Can fire damage restoration remove smoke odour from my Sydney home?',
            answer: 'Yes. IICRC S700:2025-certified restoration uses thermal fogging and ozone treatment to chemically neutralise smoke odour molecules — not mask them. This is the only effective method for permanent odour elimination. Household cleaning products address surface soot but cannot penetrate wall cavities or HVAC systems where odour-causing compounds are absorbed. NRPG contractors are S700:2025-certified and equipped for full odour remediation.',
          },
          {
            question: 'How long does fire damage restoration take in Sydney?',
            answer: 'Minor fire damage (single room, limited smoke spread): 7–14 days. Moderate fire damage (multiple rooms, smoke in HVAC): 3–6 weeks. Major structural fires: 3–6 months for full restoration to pre-loss condition. NRPG provides a project timeline as part of the initial assessment scope.',
          },
        ]}
        relatedGuides={[
          { title: 'Water Damage Restoration Sydney', href: '/water-damage-restoration-sydney', description: 'Fire suppression water damage — IICRC-certified restoration.' },
          { title: 'Storm Damage Restoration Sydney', href: '/storm-damage-restoration-sydney', description: 'Sydney storm damage — hail, wind, and structural repairs.' },
          { title: 'Fire Damage Restoration Brisbane', href: '/fire-damage-restoration-brisbane', description: 'IICRC S700:2025 fire restoration in Brisbane.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
