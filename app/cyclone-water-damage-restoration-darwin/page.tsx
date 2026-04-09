import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cyclone and Water Damage Restoration Darwin | IICRC-Certified NT Response',
  description: 'Cyclone and water damage restoration in Darwin and the Northern Territory. IICRC-certified contractors for cyclone, storm, and tropical flooding damage. ARPC Cyclone Pool applies. Lodge your claim 24/7.',
  keywords: 'cyclone damage restoration darwin, water damage darwin, cyclone darwin NT, storm damage darwin, tropical flooding darwin, IICRC darwin NT, cyclone restoration northern territory',
  openGraph: {
    title: 'Cyclone and Water Damage Restoration Darwin | IICRC-Certified NT Response',
    description: 'IICRC-certified cyclone and water damage restoration contractors in Darwin and the Northern Territory. 60-minute post-clearance response. ARPC Cyclone Pool applies.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Cyclone and Water Damage Restoration')}&city=${encodeURIComponent('Darwin')}&service=cyclone-water-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/cyclone-water-damage-restoration-darwin`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/cyclone-water-damage-restoration-darwin/#localbusiness`,
  name: `${NAP.name} Darwin`,
  url: `${NAP.url}/cyclone-water-damage-restoration-darwin`,
  description: 'IICRC-certified cyclone and water damage restoration contractors serving Darwin and the Northern Territory. 60-minute emergency response post-clearance. ARPC Cyclone Pool applies to all NT properties.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'Place', name: 'Darwin', containedInPlace: { '@type': 'State', name: 'Northern Territory' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Darwin', addressRegion: 'NT', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cyclone and Water Damage Restoration Darwin',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Darwin' },
  serviceType: 'Cyclone Damage Restoration',
  description: 'Professional cyclone and water damage restoration in Darwin and the Northern Territory: emergency make-safe, structural drying, water damage remediation, and full insurance claim documentation following IICRC S500:2025 standards.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

export default function CycloneWaterDamageRestorationDarwinPage() {
  return (
    <>
      <Script id="cddarwin-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="cddarwin-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AgGuidePageTemplate
        category="Cyclone Damage"
        title="Cyclone and Water Damage Restoration Darwin"
        subtitle="IICRC-certified cyclone and water damage restoration contractors in Darwin and the Northern Territory. 60-minute post-clearance response. ARPC Cyclone Pool applies to all NT properties."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Cyclone Damage', href: '/services/cyclone-damage' },
          { label: 'Darwin' },
        ]}
        sections={[
          {
            heading: 'Darwin — Australia\'s Most Cyclone-Exposed Capital City',
            body: (
              <>
                <p>
                  Darwin sits at 12 degrees south, directly in the peak tropical cyclone belt. The NT cyclone season
                  runs November through April, with Darwin recording some of the highest frequency of cyclone impacts
                  of any Australian capital. Tropical Cyclone Tracy in December 1974 destroyed approximately 70% of
                  Darwin&apos;s housing stock — the most devastating cyclone event in Australian urban history. The
                  city was rebuilt to significantly higher standards, with modern construction requiring cyclone-rated
                  design and structural tie-downs.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Pre-1975 properties remain the most vulnerable in Darwin. Modern building codes require cyclone-rated
                  construction designed for Category 4 conditions, but older homes — particularly in inner suburbs like
                  Larrakeyah, Parap, and Stuart Park — may not have been fully upgraded to post-Tracy standards.
                  All NT properties are covered under the ARPC Cyclone Reinsurance Pool: not just properties north of
                  the Tropic of Capricorn, but the full Northern Territory jurisdiction.
                </p>
              </>
            ),
          },
          {
            heading: 'Darwin\'s Wet Season — Tropical Flooding and Water Damage',
            body: (
              <>
                <p>
                  Darwin receives over 1,700mm of annual rainfall concentrated into a 6-month wet season
                  (October–April). Individual storm events regularly produce 100–200mm per day. The city&apos;s flat
                  coastal topography means stormwater infrastructure is frequently overwhelmed, leading to surface
                  flooding across residential and commercial areas. Low-lying suburbs near creek systems face the
                  highest repeat inundation risk during peak wet season months.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Rapid Creek and the drainage corridors around Nightcliff Beach and the northern suburbs create
                  concentrated wet season flood risk. Properties in Rapid Creek, Nightcliff, Tiwi, and surrounding
                  areas experience repeat inundation during heavy monsoonal events. NRPG provides both cyclone
                  restoration services and wet season flooding restoration across Darwin and the broader NT.
                </p>
              </>
            ),
          },
          {
            heading: 'Darwin Suburbs and NT Regional Areas We Cover',
            body: (
              <>
                <p>
                  NRPG contractors cover Darwin City and surrounds, with extended response capacity across the NT:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Darwin City:</strong> CBD, Fannie Bay, Parap, Stuart Park, The Narrows, Larrakeyah
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Suburbs:</strong> Nightcliff, Casuarina, Tiwi, Wanguri, Moil, Anula, Malak, Marrara
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Palmerston:</strong> City, Woodroffe, Moulden, Durack, Farrar, Gray, Johnston
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Darwin Fringe:</strong> Humpty Doo, Howard Springs, Virginia, Noonamah
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>NT Regional (extended response):</strong> Katherine — 4-hour response window
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate contractor matching
                  across Darwin and the Northern Territory.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does the ARPC Cyclone Pool apply to Darwin and NT properties?',
            answer: 'Yes — the ARPC Cyclone Reinsurance Pool applies to all NT properties, not just those north of the Tropic of Capricorn. The full Northern Territory jurisdiction is covered. Your insurer holds cyclone reinsurance through the pool and manages your claim on its behalf. This does not change your rights — you can still dispute underpayment through AFCA.',
          },
          {
            question: 'What cyclone rating applies to Darwin homes?',
            answer: 'Post-1985 Darwin homes are built to Category D wind classification, designed for sustained winds of 240 km/h. Homes built between 1975 and 1985 under the post-Tracy rebuilding code offer significant protection but may not meet the full current standard. Pre-1975 properties are most vulnerable and should be assessed by a licensed structural engineer after any significant cyclone event.',
          },
          {
            question: 'Is wet season flooding covered the same way as cyclone damage under insurance?',
            answer: 'No — wet season flooding and cyclone damage are treated as distinct perils under most Australian home insurance policies. Cyclone damage (wind, wind-driven rain, storm surge within 48 hours of the event) is covered under the cyclone peril. Separate flood inundation from overflowing waterways is assessed as a flood event. Documenting the cause and entry point of water is critical to correct claim classification.',
          },
          {
            question: 'How quickly will NRPG contractors respond after a Darwin cyclone?',
            answer: 'NRPG contractors dispatch within 60 minutes of emergency services issuing the all-clear for your area following a cyclone event. Lodge your claim at disasterrecovery.com.au/claim in advance — we queue assignments and dispatch the moment clearance is confirmed for your suburb.',
          },
        ]}
        relatedGuides={[
          { title: 'ARPC Cyclone Reinsurance Pool — What NT Homeowners Need to Know', href: '/guides/insurance/arpc-cyclone-reinsurance-pool', description: 'How the ARPC Cyclone Pool applies to all NT properties and affects your claim processing.' },
          { title: 'TC Maila FNQ Emergency Response', href: '/events/tc-maila-fnq-2026', description: 'Real-time TC Maila response information for FNQ and NT property owners.' },
          { title: 'Cyclone Damage Restoration Cairns', href: '/cyclone-damage-restoration-cairns', description: 'IICRC-certified cyclone damage contractors for Cairns and Far North Queensland.' },
        ]}
        cta={{ text: 'Lodge Your Claim 24/7', href: '/claim' }}
      />
    </>
  );
}
