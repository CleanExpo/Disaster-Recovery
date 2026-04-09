import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR: Cyclone Damage Restoration Broome
 * Kimberley cyclone response — WA wet season, ARPC pool coverage
 */

export const metadata: Metadata = {
  title: 'Cyclone Damage Restoration Broome | WA Wet Season Response',
  description: 'Cyclone and storm damage restoration in Broome and the Kimberley. IICRC-certified contractors ready for wet season cyclone response. Lodge your claim 24/7.',
  keywords: 'cyclone damage broome, storm damage broome, kimberley cyclone, broome cyclone restoration, water damage broome, cyclone insurance broome',
  openGraph: {
    title: 'Cyclone Damage Restoration Broome | WA Wet Season Response',
    description: 'IICRC-certified cyclone restoration contractors in Broome and the Kimberley. Lodge your claim 24/7.',
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/cyclone-damage-restoration-broome`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/cyclone-damage-restoration-broome/#localbusiness`,
  name: `${NAP.name} Broome`,
  url: `${NAP.url}/cyclone-damage-restoration-broome`,
  description: 'IICRC-certified cyclone damage restoration in Broome and the Kimberley. Emergency response for wet season cyclone structural damage, water damage, and roof repairs.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'Place', name: 'Broome', containedInPlace: { '@type': 'State', name: 'Western Australia' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Broome', addressRegion: 'WA', postalCode: '6725', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cyclone Damage Restoration Broome',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Broome' },
  serviceType: 'Cyclone Damage Restoration',
  description: 'Professional cyclone damage restoration in Broome and the Kimberley: emergency make-safe, roof tarping, structural drying, water extraction, and insurance claim documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Broome in the ARPC Cyclone Reinsurance Pool coverage area?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 Broome (17.9\u00b0S) is well north of the Tropic of Capricorn (23.5\u00b0S). The ARPC Cyclone Reinsurance Pool covers all WA properties north of the Tropic of Capricorn, which includes Broome and the wider Kimberley region. Your insurer processes cyclone claims through the pool \u2014 lodge as \u2018cyclone damage\u2019 to ensure correct pool routing.' },
    },
    {
      '@type': 'Question',
      name: 'How does cyclone season timing affect insurance claims in Broome?',
      acceptedAnswer: { '@type': 'Answer', text: 'The official WA cyclone season runs 1 November to 30 April. Broome averages 1\u20132 significant cyclone threats per season. Lodge your claim within 30 days of the damage occurring for the fastest processing. If your property was damaged outside declared season dates, lodge as \u2018storm damage\u2019 \u2014 your insurer determines the peril classification.' },
    },
    {
      '@type': 'Question',
      name: 'How quickly can NRPG respond to cyclone damage in Broome?',
      acceptedAnswer: { '@type': 'Answer', text: 'NRPG pre-stages contractors in Broome for major forecast events. Post-clearance response is typically 60\u2013120 minutes for Broome township. Remote Kimberley locations and pastoral stations may require additional mobilisation time depending on road conditions after the event.' },
    },
    {
      '@type': 'Question',
      name: 'What cyclone damage is most common in Broome properties?',
      acceptedAnswer: { '@type': 'Answer', text: 'The most common cyclone damage in Broome properties includes: roof sheeting loss (particularly older corrugated iron), fibreglass and polycarbonate patio panels, water ingress from driving rain through roof and wall junctions, and flooding to lower-lying areas near Town Beach and the Cable Beach corridor. Pre-1985 properties may contain fibro/asbestos sheeting \u2014 always use IICRC-certified contractors for safe assessment.' },
    },
  ],
};

export default function CycloneDamageRestorationBroomePage() {
  return (
    <>
      <Script id="cdrbroome-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="cdrbroome-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="cdrbroome-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Cyclone Damage"
        title="Cyclone Damage Restoration Broome"
        subtitle="IICRC-certified contractors ready for Broome and Kimberley wet season cyclone response. Pre-staged for major events, 60–120 minute post-clearance dispatch. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Broome' },
        ]}
        sections={[
          {
            heading: "Broome's Cyclone Risk — The Kimberley Context",
            body: (
              <>
                <p>
                  Broome averages 1–2 significant cyclone threats per wet season. The town&apos;s flat coastal
                  terrain and position on the Roebuck Bay peninsula creates significant storm surge risk, with
                  the Cable Beach and Town Beach corridor directly exposed to north-westerly cyclone tracks.
                  Broome&apos;s pearl lugger heritage reflects decades of cyclone exposure — the pearling industry
                  has shaped local construction norms for cyclone resilience.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The 2022 TC Ellie near-miss reinforced the importance of pre-event preparation across the
                  Kimberley. Category determination at Cape Leveque (approximately 200 km north of Broome)
                  is a key indicator for Broome impact severity. NRPG monitors BOM forecasts and pre-stages
                  contractors in the region for events tracking toward the Kimberley coast.
                </p>
              </>
            ),
          },
          {
            heading: 'Broome Areas We Cover',
            body: (
              <>
                <p>
                  <strong>Broome CBD and Town Beach:</strong> Central Broome, Short Street precinct, Town Beach foreshore
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Cable Beach corridor:</strong> Cable Beach, Gantheaume Point, Broome North
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Chinatown and Carnarvon Street precinct:</strong> Chinatown heritage buildings, Carnarvon Street commercial
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Roebuck Estate and South Broome:</strong> Roebuck Estate, South Broome residential
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Djugun:</strong> Djugun residential, Broome International Airport precinct
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Old Broome:</strong> Old Broome heritage precinct, Streeter&apos;s Jetty area
                </p>
              </>
            ),
          },
          {
            heading: 'Wet Season Property Protection',
            body: (
              <>
                <p>
                  Broome has a significant stock of pre-1985 properties that may contain fibro or asbestos
                  sheeting — construction common during the Cyclone Tracy rebuilding era across northern
                  Australia. Cyclone damage to these properties requires certified assessment before any
                  demolition or repair work begins.
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Cyclone shutters</strong> are standard on newer Kimberley builds — ensure all
                    shutters are engaged ahead of any forecast event.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Elevated construction</strong> is common in Broome — ground-level storage areas
                    remain vulnerable to storm surge flooding regardless of elevated living areas.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Corrugated iron vs Colorbond roofing</strong> — older corrugated iron performs
                    poorly in sustained cyclone-force winds; Colorbond with correct fastener schedules
                    significantly outperforms. Lodge your claim immediately if roof sheeting is lost.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Post-Cyclone Insurance Claim Process in WA',
            body: (
              <>
                <p>
                  DFES all-clear is required before property assessment can begin in Broome. Do not
                  enter a damaged property until DFES declares the area safe.
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>ARPC Pool mechanics:</strong> WA properties north of the Tropic of Capricorn
                    (including Broome) have cyclone coverage processed through the ARPC Cyclone Reinsurance
                    Pool. Your insurer manages the claim — the pool operates in the background.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Lodge as &apos;cyclone&apos; not &apos;storm&apos;:</strong> Ensure your lodgement
                    correctly identifies the peril as &apos;cyclone damage&apos; to ensure ARPC pool routing.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Separate lodgements:</strong> Lodge &apos;wind damage&apos; and &apos;water ingress&apos;
                    as separate line items — they may be assessed differently under your PDS.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>IESL system:</strong> WA&apos;s Insurance Emergency Services Levy funds state
                    emergency response — your policy contributes to DFES operations through this mechanism.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Broome in the ARPC Cyclone Reinsurance Pool coverage area?',
            answer: 'Yes \u2014 Broome (17.9\u00b0S) is well north of the Tropic of Capricorn (23.5\u00b0S). The ARPC Cyclone Reinsurance Pool covers all WA properties north of the Tropic of Capricorn, which includes Broome and the wider Kimberley region. Your insurer processes cyclone claims through the pool \u2014 lodge as \u2018cyclone damage\u2019 to ensure correct pool routing.',
          },
          {
            question: 'How does cyclone season timing affect insurance claims in Broome?',
            answer: 'The official WA cyclone season runs 1 November to 30 April. Broome averages 1\u20132 significant cyclone threats per season. Lodge your claim within 30 days of the damage occurring for the fastest processing. If your property was damaged outside declared season dates, lodge as \u2018storm damage\u2019 \u2014 your insurer determines the peril classification.',
          },
          {
            question: 'How quickly can NRPG respond to cyclone damage in Broome?',
            answer: 'NRPG pre-stages contractors in Broome for major forecast events. Post-clearance response is typically 60\u2013120 minutes for Broome township. Remote Kimberley locations and pastoral stations may require additional mobilisation time depending on road conditions after the event.',
          },
          {
            question: 'What cyclone damage is most common in Broome properties?',
            answer: 'The most common cyclone damage in Broome properties includes: roof sheeting loss (particularly older corrugated iron), fibreglass and polycarbonate patio panels, water ingress from driving rain through roof and wall junctions, and flooding to lower-lying areas near Town Beach and the Cable Beach corridor. Pre-1985 properties may contain fibro/asbestos sheeting \u2014 always use IICRC-certified contractors for safe assessment.',
          },
        ]}
        relatedGuides={[
          { title: 'Cyclone Narelle WA Recovery', href: '/events/cyclone-narelle-western-australia-2026', description: 'Cyclone Narelle information and 24/7 claim lodgement for WA.' },
          { title: 'Cyclone Insurance Claim Process', href: '/guides/insurance/cyclone-insurance-claim-process', description: 'Step-by-step guide to lodging a cyclone insurance claim in WA.' },
          { title: 'ARPC Cyclone Reinsurance Pool', href: '/guides/insurance/arpc-cyclone-reinsurance-pool', description: 'How the ARPC pool affects your WA cyclone claim.' },
        ]}
        cta={{ text: 'Lodge Cyclone Claim \u2014 Broome', href: '/claim' }}
      />
    </>
  );
}
