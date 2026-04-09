import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR: Cyclone Damage Restoration Carnarvon
 * Cyclone Narelle impact zone — Shire of Carnarvon DRFA declared, Gascoyne region
 */

export const metadata: Metadata = {
  title: 'Cyclone Damage Restoration Carnarvon | Cyclone Narelle Recovery',
  description: 'Cyclone and storm damage restoration in Carnarvon, Shark Bay, and the Gascoyne. IICRC-certified contractors responding to Cyclone Narelle. Lodge your claim 24/7.',
  keywords: 'cyclone damage carnarvon, cyclone narelle carnarvon, gascoyne cyclone, carnarvon cyclone restoration, shark bay cyclone, drfa carnarvon, flood damage carnarvon',
  openGraph: {
    title: 'Cyclone Damage Restoration Carnarvon | Cyclone Narelle Recovery',
    description: 'IICRC-certified cyclone restoration contractors in Carnarvon and the Gascoyne. Responding to Cyclone Narelle. Lodge your claim 24/7.',
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/cyclone-damage-restoration-carnarvon`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/cyclone-damage-restoration-carnarvon/#localbusiness`,
  name: `${NAP.name} Carnarvon`,
  url: `${NAP.url}/cyclone-damage-restoration-carnarvon`,
  description: 'IICRC-certified cyclone damage restoration in Carnarvon, Shark Bay, and the Gascoyne. Emergency response for Cyclone Narelle structural damage, water damage, and flood restoration.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'Place', name: 'Carnarvon', containedInPlace: { '@type': 'State', name: 'Western Australia' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Carnarvon', addressRegion: 'WA', postalCode: '6701', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cyclone Damage Restoration Carnarvon',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Carnarvon' },
  serviceType: 'Cyclone Damage Restoration',
  description: 'Professional cyclone and flood damage restoration in Carnarvon, Shark Bay, and the Gascoyne: emergency make-safe, roof tarping, structural drying, water extraction, and insurance claim documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Carnarvon in the Cyclone Narelle DRFA declaration?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 the Shire of Carnarvon is declared under the WA Disaster Recovery Funding Arrangements (DRFA) for Cyclone Narelle 2026. Both Carnarvon township and the Shark Bay LGA are affected. The WA Premier\u2019s Disaster Relief Payment is available for eligible properties. Contact the WA Recovery hotline on 1800 032 965.' },
    },
    {
      '@type': 'Question',
      name: 'Does ARPC cover Carnarvon cyclone claims?',
      acceptedAnswer: { '@type': 'Answer', text: 'Carnarvon is at 24.9\u00b0S \u2014 marginally south of the Tropic of Capricorn (23.5\u00b0S). However, the WA DRFA declaration for Cyclone Narelle confirms government recognition of a cyclone event affecting the Gascoyne. Check your Product Disclosure Statement \u2014 many WA coastal policies extend ARPC-equivalent cyclone coverage to the Gascoyne region. Lodge your claim and let your insurer confirm coverage; do not assume you are excluded.' },
    },
    {
      '@type': 'Question',
      name: 'How does the Gascoyne River flooding affect Carnarvon damage claims?',
      acceptedAnswer: { '@type': 'Answer', text: 'Cyclone rainfall in the upper Gascoyne catchment regularly causes river flooding in Carnarvon town. Flooding from river inundation may be assessed differently to direct cyclone wind damage under your policy. Lodge both \u2018cyclone damage\u2019 and \u2018water damage/flooding\u2019 as separate lodgements to maximise coverage. NRPG provides documentation that clearly separates wind damage from water ingress from river flooding.' },
    },
    {
      '@type': 'Question',
      name: 'What WA government assistance is available for Carnarvon?',
      acceptedAnswer: { '@type': 'Answer', text: 'The WA Premier\u2019s Disaster Relief Payment provides up to $4,000 for severely damaged or destroyed properties, and $2,000 for major damage. DFES coordinates emergency response and recovery. The WA Recovery hotline is 1800 032 965. NRPG provides IICRC-certified damage documentation to support your grant application.' },
    },
  ],
};

export default function CycloneDamageRestorationCarnarvonPage() {
  return (
    <>
      <Script id="cdrcarnarvon-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="cdrcarnarvon-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="cdrcarnarvon-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Cyclone Damage"
        title="Cyclone Damage Restoration Carnarvon"
        subtitle="IICRC-certified contractors responding to Cyclone Narelle across Carnarvon, Shark Bay, and the Gascoyne. DRFA declared zone — wind damage and river flood restoration. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Carnarvon' },
        ]}
        sections={[
          {
            heading: 'Carnarvon and the Gascoyne — Cyclone Risk Profile',
            body: (
              <>
                <p>
                  Carnarvon sits at the mouth of the Gascoyne River, making it uniquely vulnerable to both
                  direct cyclone wind damage and secondary river flooding. Cyclones that track toward Exmouth
                  and the North West Cape regularly generate intense rainfall across the upper Gascoyne
                  catchment, causing the river to flood Carnarvon town days after the initial cyclone impact.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Carnarvon town is low-lying and was devastated by TC Vance in 1999 — the most intense
                  tropical cyclone ever recorded to make landfall in Australia (central pressure 910 hPa,
                  sustained winds of 235 km/h). TC Lua (2012) tracked a similar path, and TC Narelle (2013 —
                  a different event to 2026&apos;s Cyclone Narelle) impacted the region. The Gascoyne&apos;s banana
                  and horticultural industry regularly suffers catastrophic losses in major events.
                </p>
              </>
            ),
          },
          {
            heading: 'Cyclone Narelle 2026 — Carnarvon Impact',
            body: (
              <>
                <p>
                  The DRFA declaration for the Shire of Carnarvon confirms government recognition of
                  significant property damage from Cyclone Narelle 2026. NRPG contractors are staged
                  in the Gascoyne region for response across all six DRFA-declared shires.
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Current contractor staging:</strong> NRPG has contractors positioned in
                    the Gascoyne region for post-clearance dispatch to Carnarvon and surrounding areas.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Priority lodgement queue:</strong> Carnarvon lodgements are in the priority
                    dispatch queue alongside all six DRFA-declared shires.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Financial assistance:</strong> WA Premier&apos;s Disaster Relief Payment up to
                    $4,000 for severely damaged properties. Hotline: 1800 032 965.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Carnarvon and Gascoyne Areas We Cover',
            body: (
              <>
                <p>
                  <strong>Carnarvon township:</strong> Carnarvon CBD, Robinson Street precinct, Fascine foreshore, Gascoyne Junction
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Shark Bay (Denham/Monkey Mia):</strong> Denham township, Monkey Mia resort precinct, Shark Bay World Heritage area properties
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Gascoyne Junction:</strong> Gascoyne Junction township, upper Gascoyne pastoral properties
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Coral Bay:</strong> Coral Bay resort and residential precinct (Shire of Carnarvon)
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Exmouth cross-coverage:</strong> North West Cape area covered in conjunction with Exmouth LGA operations
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Pastoral properties:</strong> Upper Gascoyne station properties — remote response subject to road conditions
                </p>
              </>
            ),
          },
          {
            heading: 'Dual Insurance Lodgement — Wind + Flood in Carnarvon',
            body: (
              <>
                <p>
                  Carnarvon properties affected by Cyclone Narelle may have damage from two distinct
                  sources: direct cyclone wind damage, and flooding from the Gascoyne River. These perils
                  are typically assessed differently under home and contents policies.
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Cyclone wind damage:</strong> Direct structural damage, roof loss, and wind-driven
                    rain entry — typically covered under building and contents as cyclone damage.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>River flooding:</strong> Gascoyne River overland flow entering the property —
                    flood coverage depends on your specific policy and whether you have flood cover included.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Storm surge:</strong> Coastal surge affecting riverfront and low-lying properties
                    — assess as a separate peril to river flooding.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Lodge separate line items</strong> for wind damage and water damage/flooding.
                    NRPG documentation clearly separates peril categories to support both lodgements.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Carnarvon in the Cyclone Narelle DRFA declaration?',
            answer: 'Yes \u2014 the Shire of Carnarvon is declared under the WA Disaster Recovery Funding Arrangements (DRFA) for Cyclone Narelle 2026. Both Carnarvon township and the Shark Bay LGA are affected. The WA Premier\u2019s Disaster Relief Payment is available for eligible properties. Contact the WA Recovery hotline on 1800 032 965.',
          },
          {
            question: 'Does ARPC cover Carnarvon cyclone claims?',
            answer: 'Carnarvon is at 24.9\u00b0S \u2014 marginally south of the Tropic of Capricorn (23.5\u00b0S). However, the WA DRFA declaration for Cyclone Narelle confirms government recognition of a cyclone event affecting the Gascoyne. Check your Product Disclosure Statement \u2014 many WA coastal policies extend ARPC-equivalent cyclone coverage to the Gascoyne region. Lodge your claim and let your insurer confirm coverage; do not assume you are excluded.',
          },
          {
            question: 'How does the Gascoyne River flooding affect Carnarvon damage claims?',
            answer: 'Cyclone rainfall in the upper Gascoyne catchment regularly causes river flooding in Carnarvon town. Flooding from river inundation may be assessed differently to direct cyclone wind damage under your policy. Lodge both \u2018cyclone damage\u2019 and \u2018water damage/flooding\u2019 as separate lodgements to maximise coverage. NRPG provides documentation that clearly separates wind damage from water ingress from river flooding.',
          },
          {
            question: 'What WA government assistance is available for Carnarvon?',
            answer: 'The WA Premier\u2019s Disaster Relief Payment provides up to $4,000 for severely damaged or destroyed properties, and $2,000 for major damage. DFES coordinates emergency response and recovery. The WA Recovery hotline is 1800 032 965. NRPG provides IICRC-certified damage documentation to support your grant application.',
          },
        ]}
        relatedGuides={[
          { title: 'Cyclone Narelle WA Recovery', href: '/events/cyclone-narelle-western-australia-2026', description: 'Real-time Cyclone Narelle information and 24/7 claim lodgement for WA.' },
          { title: 'Flood Damage Restoration Perth', href: '/flood-damage-restoration-perth', description: 'WA flood damage restoration — IICRC-certified contractors.' },
          { title: 'ARPC Cyclone Reinsurance Pool', href: '/guides/insurance/arpc-cyclone-reinsurance-pool', description: 'How the ARPC pool affects your WA cyclone claim.' },
        ]}
        cta={{ text: 'Lodge Narelle Claim \u2014 Carnarvon', href: '/claim' }}
      />
    </>
  );
}
