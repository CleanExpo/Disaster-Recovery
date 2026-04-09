import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-474: TC Maila FNQ Emergency Page — updated 9 April 2026
 *
 * Event: Tropical Cyclone Maila — Category 5 (upgraded 9 Apr 2026)
 * Sustained winds: 215 km/h. Forecast landfall: 11–14 April 2026.
 * Alfred final PERILS estimate: AU$1.877 billion.
 *
 * ACL s18 compliant — NRPG is restoration + claim support, NOT claim advocate.
 * IICRC references: S500:2025 (water) — certified standards only, no classifications reproduced.
 */

export const metadata: Metadata = {
  title: 'TC Maila FNQ Emergency — Claim Lodgement and Restoration Support',
  description:
    'Category 5 Tropical Cyclone Maila is forecast to impact the Far North Queensland coast on 11–14 April 2026. NRPG IICRC-certified contractors are pre-positioned. Lodge your claim online 24/7.',
  keywords:
    'TC Maila FNQ, tropical cyclone Maila Cairns, TC Maila landfall April 2026, FNQ cyclone damage, TC Maila insurance claim',
  openGraph: {
    title: 'TC Maila FNQ Emergency — Claim Lodgement and Restoration Support',
    description:
      'Category 5 Tropical Cyclone Maila forecast to impact FNQ 11–14 April 2026. NRPG IICRC-certified contractors pre-positioned. Lodge your TC Maila claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('TC Maila FNQ Emergency')}&city=${encodeURIComponent('FNQ')}&service=cyclone-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/events/tc-maila-fnq-2026`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${NAP.url}/events/tc-maila-fnq-2026/#localbusiness`,
  name: `${NAP.name} Far North Queensland`,
  url: `${NAP.url}/events/tc-maila-fnq-2026`,
  description:
    'IICRC-certified cyclone damage restoration contractors serving Far North Queensland. Pre-positioned for TC Maila landfall. 60-minute emergency response post-clearance.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'Place', name: 'Far North Queensland' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cairns',
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
  name: 'Cyclone Damage Restoration — TC Maila FNQ',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Far North Queensland' },
  serviceType: 'Cyclone Damage Restoration',
  description:
    'Professional cyclone damage restoration for TC Maila impacts across Far North Queensland: emergency make-safe, roof tarping, water extraction, structural drying to IICRC S500:2025, and full insurance documentation.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '12847',
    bestRating: '5',
    worstRating: '1',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is TC Maila still dangerous?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. TC Maila remains a Category 5 severe tropical cyclone until landfall, with sustained winds of 215 km/h. BOM issues official all-clears for each affected area \u2014 do not leave shelter or enter a damaged property until the BOM/Queensland Police all-clear is confirmed for your specific postcode.',
      },
    },
    {
      '@type': 'Question',
      name: 'What postcodes does NRPG cover for TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG covers the full FNQ impact corridor including postcodes 4870 (Cairns), 4877 (Port Douglas), 4895 (Daintree), 4873 (Kuranda), 4874 (Mossman), 4880 (Atherton Tablelands), 4860 (Innisfail/Cassowary Coast), 4878 (Palm Cove), and 4879 (Trinity Beach). Lodge at disasterrecovery.com.au/claim for contractor matching across all FNQ postcodes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the ARPC Cyclone Pool affect my claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The Australian Reinsurance Pool Corporation (ARPC) Cyclone Pool is a government reinsurance backstop for FNQ cyclone losses. Your insurer manages your claim on the pool\u2019s behalf \u2014 this does not change your rights as a policyholder. If your claim is underpaid or disputed, escalation to AFCA (Australian Financial Complaints Authority) remains available at no cost to you.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I claim for both Alfred and TC Maila damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. If your property sustained damage during Ex-TC Alfred (March 2026) and now sustains additional TC Maila damage, you must document and lodge each event separately. NRPG manages both claims with clearly delineated documentation packs. Lodge at disasterrecovery.com.au/claim and note prior Alfred damage in your submission.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly will NRPG respond after TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG contractors are pre-positioned across FNQ and will respond within 60 minutes of emergency services issuing the all-clear for your area. Lodge your claim now at disasterrecovery.com.au/claim to be first in the dispatch queue \u2014 assignments are queued and contractors are deployed the moment post-clearance conditions allow.',
      },
    },
  ],
};

export default function TCMailaFNQ2026Page() {
  return (
    <>
      <Script
        id="tcmaila-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="tcmaila-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="tcmaila-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Emergency Response"
        title="TC Maila FNQ Emergency — Claim Lodgement and Restoration Support"
        subtitle="Category 5 Tropical Cyclone Maila is forecast to impact the Far North Queensland coast on 11–14 April 2026. NRPG IICRC-certified contractors are pre-positioned. Lodge your claim online 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #7B1FA2 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Events', href: '/events' },
          { label: 'TC Maila FNQ 2026' },
        ]}
        sections={[
          {
            heading: 'TC Maila — Current Situation',
            body: (
              <>
                <p>
                  Tropical Cyclone Maila has been upgraded to Category 5 with sustained winds of 215 km/h
                  and is tracking toward the Far North Queensland coast. The Bureau of Meteorology (BOM) is
                  forecasting landfall impacts across the Cairns to Cape York corridor in the 11–14 April
                  2026 window. Properties in the direct path face destructive wind, storm surge, intense
                  rainfall, and flash flooding.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG IICRC-certified contractors are pre-positioned across FNQ postcodes including
                  4870 (Cairns), 4877 (Port Douglas), 4895 (Daintree), 4873 (Kuranda), 4874 (Mossman),
                  4880 (Atherton Tablelands), 4860 (Innisfail/Cassowary Coast), 4878 (Palm Cove), and
                  4879 (Trinity Beach). Claims can be lodged online 24/7 at disasterrecovery.com.au/claim.
                  Contractor dispatch occurs within 60 minutes of emergency services issuing the all-clear
                  for affected areas.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Do NOT enter a damaged property until emergency services confirm the all-clear.</strong>{' '}
                  Queensland Police, SES, or BOM will issue an official all-clear for each affected area.
                  The eye of a cyclone produces deceptive calm — violent conditions return when the eye passes.
                </p>
              </>
            ),
          },
          {
            heading: 'Immediate Actions — Before and After TC Maila',
            body: (
              <>
                <ol style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Wait for the official all-clear.</strong> Do not leave shelter until Queensland
                    Police, SES, or BOM confirms the all-clear for your area.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Photograph all damage immediately.</strong> Timestamped photos and video of
                    roof, walls, windows, contents, and external structures are critical for your insurance
                    claim. Document before touching or moving anything.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Lodge your claim within 72 hours.</strong> Most QLD home insurance policies
                    have notification requirements. Lodge as &quot;cyclone damage&quot; and &quot;water ingress&quot; — not just
                    &quot;flood&quot;. The ARPC Cyclone Pool applies to FNQ events.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Request an IICRC-certified contractor.</strong> NRPG provides psychrometric
                    drying logs and full scope documentation required for insurer sign-off. Lodge now at{' '}
                    <a href="/claim">disasterrecovery.com.au/claim</a> to be first in the queue for
                    post-clearance dispatch.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Keep all emergency accommodation receipts.</strong> If your property is
                    uninhabitable, your insurer&apos;s Additional Living Expenses (ALE) benefit typically
                    covers temporary accommodation. Retain all receipts.
                  </li>
                </ol>
              </>
            ),
          },
          {
            heading: 'What NRPG Provides',
            body: (
              <>
                <p>
                  NRPG provides end-to-end cyclone damage restoration and insurance documentation support
                  across the full TC Maila impact corridor. Services available from 60 minutes post-clearance:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Emergency make-safe:</strong> Structural stabilisation, temporary fencing, and
                    hazard removal to secure the property immediately post-impact.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Roof tarping:</strong> Emergency tarping and board-up to prevent further water
                    ingress until permanent repairs can proceed.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Water extraction:</strong> Commercial-grade extraction of storm surge and
                    wind-driven rain ingress from all affected areas.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Structural drying to IICRC S500:2025:</strong> Psychrometric drying logs and
                    full moisture mapping documentation for insurer compliance.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Full insurance documentation:</strong> Scope of works, photo evidence packs,
                    drying logs, and supporting documentation required for claim lodgement and assessment.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Insurer correspondence coordination:</strong> NRPG manages correspondence
                    with your insurer through the restoration process, reducing delays and disputes.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Alfred Comparison — PERILS AU$1.877 Billion',
            body: (
              <>
                <p>
                  For context on the scale of FNQ cyclone events: Ex-Tropical Cyclone Alfred (March 2026)
                  was confirmed by PERILS at a final insured loss of AU$1.877 billion — the largest insured
                  cyclone loss on a current-value basis since Cyclone Debbie in 2017. The Alfred loss
                  involved over 132,000 ICA claims across Queensland and northern New South Wales, with
                  personal lines accounting for 70% of the total, commercial property 26%, and motor 4%.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  FNQ properties in the TC Maila corridor that also sustained damage during Ex-TC Alfred
                  must document each event separately. NRPG manages dual-event properties with clearly
                  delineated documentation packs for each claim — ensuring both events are lodged
                  independently and accurately assessed by your insurer. Lodge at{' '}
                  <a href="/claim">disasterrecovery.com.au/claim</a> and note if your property has prior
                  Alfred damage.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is TC Maila still dangerous?',
            answer:
              'Yes. TC Maila remains a Category 5 severe tropical cyclone until landfall, with sustained winds of 215 km/h. BOM issues official all-clears for each affected area — do not leave shelter or enter a damaged property until the BOM/Queensland Police all-clear is confirmed for your specific postcode.',
          },
          {
            question: 'What postcodes does NRPG cover for TC Maila?',
            answer:
              'NRPG covers the full FNQ impact corridor including postcodes 4870 (Cairns), 4877 (Port Douglas), 4895 (Daintree), 4873 (Kuranda), 4874 (Mossman), 4880 (Atherton Tablelands), 4860 (Innisfail/Cassowary Coast), 4878 (Palm Cove), and 4879 (Trinity Beach). Lodge at disasterrecovery.com.au/claim for contractor matching across all FNQ postcodes.',
          },
          {
            question: 'How does the ARPC Cyclone Pool affect my claim?',
            answer:
              'The Australian Reinsurance Pool Corporation (ARPC) Cyclone Pool is a government reinsurance backstop for FNQ cyclone losses. Your insurer manages your claim on the pool\'s behalf — this does not change your rights as a policyholder. If your claim is underpaid or disputed, escalation to AFCA (Australian Financial Complaints Authority) remains available at no cost to you.',
          },
          {
            question: 'Can I claim for both Alfred and TC Maila damage?',
            answer:
              'Yes. If your property sustained damage during Ex-TC Alfred (March 2026) and now sustains additional TC Maila damage, you must document and lodge each event separately. NRPG manages both claims with clearly delineated documentation packs. Lodge at disasterrecovery.com.au/claim and note prior Alfred damage in your submission.',
          },
          {
            question: 'How quickly will NRPG respond after TC Maila?',
            answer:
              'NRPG contractors are pre-positioned across FNQ and will respond within 60 minutes of emergency services issuing the all-clear for your area. Lodge your claim now at disasterrecovery.com.au/claim to be first in the dispatch queue — assignments are queued and contractors are deployed the moment post-clearance conditions allow.',
          },
        ]}
        relatedGuides={[
          {
            title: 'April 13 Convergence — TC Maila & Alfred Final Loss',
            href: '/events/april-13-convergence-2026',
            description: 'TC Maila landfall and PERILS Alfred final release — two events, one window.',
          },
          {
            title: 'Cyclone Damage Restoration Cairns',
            href: '/cyclone-damage-restoration-cairns',
            description: 'Cairns FNQ cyclone restoration hub.',
          },
          {
            title: 'Cyclone Damage Restoration Townsville',
            href: '/cyclone-damage-restoration-townsville',
            description: 'Townsville NQ cyclone restoration.',
          },
          {
            title: 'Storm Damage Restoration Port Douglas',
            href: '/storm-damage-restoration-port-douglas',
            description: 'Port Douglas and Daintree Coast cyclone restoration.',
          },
          {
            title: 'Ex-TC Alfred Recovery',
            href: '/events/ex-cyclone-alfred-recovery',
            description: 'Alfred recovery support — AU$1.877 billion event.',
          },
        ]}
        cta={{ text: 'Lodge Your TC Maila Claim Now', href: '/claim' }}
      />
    </>
  );
}
