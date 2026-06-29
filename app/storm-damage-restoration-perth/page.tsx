import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Perth | Hail, Wind and Roof Damage 24/7',
  description: 'Emergency storm damage restoration across Perth. IICRC-certified contractors for hail damage, wind damage, roof repairs, and structural make-safe. priority response. Lodge your claim 24/7.',
  keywords: 'storm damage restoration perth, storm damage perth, hail damage perth, roof damage perth, wind damage perth WA, storm restoration perth, cyclone damage perth',
  openGraph: {
    title: 'Storm Damage Restoration Perth | Hail, Wind and Roof Damage 24/7',
    description: 'Emergency storm damage restoration across Perth. IICRC-certified contractors for hail damage, wind damage, roof repairs, and structural make-safe. priority response. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Perth')}&service=storm-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-perth`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-perth/#localbusiness`,
  name: `${NAP.name} Perth`,
  url: `${NAP.url}/storm-damage-restoration-perth`,
  description: '24/7 emergency storm damage restoration across Perth and Western Australia. IICRC-certified contractor network for hail damage, wind damage, roof repairs, and structural make-safe.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Perth', containedInPlace: { '@type': 'State', name: 'Western Australia' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Perth', addressRegion: 'WA', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Storm Damage Restoration Perth',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Perth', containedInPlace: { '@type': 'State', name: 'Western Australia' } },
  serviceType: 'Storm Damage Restoration',
  description: 'Professional storm damage restoration across Perth including emergency make-safe, roof tarping, hail damage repair, structural restoration, and full insurance documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Perth home insurance cover hail damage?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 hail damage to roofs, skylights, gutters, and external structures is covered under the storm provision of most standard WA home insurance policies. Lodge the claim describing "hail damage" and "storm damage" specifically. Request an IICRC-certified roof inspection before lodging to capture the full scope \u2014 many hail impacts create hairline fractures that are not visible from the ground.' },
    },
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Pool apply to Perth?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. The ARPC Cyclone Reinsurance Pool covers WA properties north of the Tropic of Capricorn \u2014 the Perth metropolitan area is not within the pool zone. Perth storm damage claims are processed under standard storm provisions of your home insurance policy. If an ex-tropical cyclone system reaches Perth, it is typically re-classified as a severe storm event by that latitude, and pool provisions do not apply.' },
    },
    {
      '@type': 'Question',
      name: 'What are the most common storm damage claims in Perth?',
      acceptedAnswer: { '@type': 'Answer', text: 'The most common Perth storm damage claims involve: roof tile displacement and cracking from downburst winds; fence collapse (particularly Colorbond fencing) from squall conditions; swimming pool pump and equipment damage from wind-driven debris; and broken skylights from hail impact. Fremantle Doctor-driven squalls cause a high volume of fence and pergola claims across coastal suburbs.' },
    },
    {
      '@type': 'Question',
      name: 'How quickly can NRPG respond to storm damage in Perth?',
      acceptedAnswer: { '@type': 'Answer', text: 'NRPG targets a priority response for emergency make-safe across the Perth metropolitan area. Lodge at disasterrecovery.com.au/claim for immediate IICRC-certified contractor dispatch. Hills properties (Kalamunda, Mundaring) may require 60\u201390 minutes depending on traffic and access.' },
    },
  ],
};

export default function StormDamageRestorationPerthPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="sdrperth-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrperth-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="sdrperth-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Perth"
        subtitle="Emergency storm damage restoration across Perth and Western Australia. Hail, wind damage, roof failures, and structural make-safe. IICRC-certified contractors, priority response."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Perth' },
        ]}
        sections={[
          {
            heading: 'Perth Storm Season \u2014 Convective Storms, Fremantle Doctor, and Tropical Cyclones',
            body: (
              <>
                <p>
                  Perth has a split storm risk profile. Summer convective storms (November&ndash;March) generate strong
                  downburst winds, hail, and localised flash flooding particularly in the eastern suburbs and inland
                  areas. The Fremantle Doctor sea breeze interacts with hot inland air to produce gusty squall conditions
                  that regularly damage roofing and fencing in coastal Perth suburbs.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  In rare years, ex-tropical cyclones tracking down the WA coast can bring gale-force winds to the Perth
                  metropolitan area &mdash; ex-TC Alby (1978) caused significant damage to Perth. Properties in
                  Perth&apos;s northern corridor (Joondalup, Wanneroo, Yanchep) face higher cyclone-related wind risk
                  when WA cyclones track south.
                </p>
              </>
            ),
          },
          {
            heading: 'Storm Damage vs Cyclone Damage \u2014 Perth Insurance Implications',
            body: (
              <>
                <p>
                  Perth properties are not within the ARPC Cyclone Reinsurance Pool zone (the pool covers WA properties
                  north of the Tropic of Capricorn, not the Perth metropolitan area). Perth storm damage claims are
                  processed under standard storm provisions rather than the cyclone pool.
                </p>
                <p style={{ marginTop: '1rem' }}>This means:</p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Standard insurance assessment processes apply</li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Storm wind damage and hail are covered under most standard WA home insurance policies
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Cyclone-specific exclusions or conditions that apply to northern WA do not apply to Perth
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If an ex-cyclone system affects Perth, it is typically classified as a severe storm by the time it
                  reaches Perth latitude &mdash; not a cyclone event under the ARPC pool definition.
                </p>
              </>
            ),
          },
          {
            heading: 'Perth Suburbs We Cover',
            body: (
              <>
                <p>priority response across the Perth metropolitan area:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner City:</strong> Perth CBD, Northbridge, Leederville, Highgate, Subiaco, Mount Lawley
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>North Shore:</strong> Scarborough, Trigg, Floreat, City Beach, Cottesloe, Swanbourne
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Corridor:</strong> Joondalup, Wanneroo, Burns Beach, Yanchep, Mindarie, Quinns Rocks
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern:</strong> Midland, Kalamunda, Mundaring, Armadale, Byford, Harrisdale
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Fremantle/South:</strong> Fremantle, Cockburn, Success, Rockingham, Kwinana
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hills:</strong> Kalamunda, Bickley, Pickering Brook (60&ndash;90 min for storm damage)
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge your claim at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate contractor
                  matching across any Perth suburb.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does Perth home insurance cover hail damage?',
            answer: 'Yes — hail damage to roofs, skylights, gutters, and external structures is covered under the storm provision of most standard WA home insurance policies. Lodge the claim describing "hail damage" and "storm damage" specifically. Request an IICRC-certified roof inspection before lodging to capture the full scope — many hail impacts create hairline fractures that are not visible from the ground.',
          },
          {
            question: 'Does the ARPC Cyclone Pool apply to Perth?',
            answer: 'No. The ARPC Cyclone Reinsurance Pool covers WA properties north of the Tropic of Capricorn — the Perth metropolitan area is not within the pool zone. Perth storm damage claims are processed under standard storm provisions of your home insurance policy. If an ex-tropical cyclone system reaches Perth, it is typically re-classified as a severe storm event by that latitude, and pool provisions do not apply.',
          },
          {
            question: 'What are the most common storm damage claims in Perth?',
            answer: 'The most common Perth storm damage claims involve: roof tile displacement and cracking from downburst winds; fence collapse (particularly Colorbond fencing) from squall conditions; swimming pool pump and equipment damage from wind-driven debris; and broken skylights from hail impact. Fremantle Doctor-driven squalls cause a high volume of fence and pergola claims across coastal suburbs.',
          },
          {
            question: 'How quickly can NRPG respond to storm damage in Perth?',
            answer: 'NRPG targets a priority response for emergency make-safe across the Perth metropolitan area. Lodge at disasterrecovery.com.au/claim for immediate IICRC-certified contractor dispatch. Hills properties (Kalamunda, Mundaring) may require 60–90 minutes depending on traffic and access.',
          },
        ]}
        relatedGuides={[
          { title: 'Water Damage Restoration Perth', href: '/water-damage-restoration-perth', description: 'IICRC-certified water damage restoration across Perth.' },
          { title: 'Flood Damage Restoration Perth', href: '/flood-damage-restoration-perth', description: 'Emergency flood damage restoration across the Perth metropolitan area.' },
          { title: 'Storm Damage Restoration Sydney', href: '/storm-damage-restoration-sydney', description: 'Storm damage restoration across all Sydney suburbs.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
