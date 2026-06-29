import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-475 / BUILD-006: Cyclone Damage Restoration Cairns
 *
 * Created: 9 April 2026 — TC Maila tracked toward FNQ coast (April 2026).
 * DR-573 ACL hotfix: removed Cat 5 / 215 km/h superlatives. All intensity
 * references now point to live BOM sources.
 * This page captures the highest-intent search traffic in Australia right now.
 * ACL s18 compliant — NRPG is restoration + claim support, NOT claim advocate.
 */

export const metadata: Metadata = {
  title: 'Cyclone Damage Restoration Cairns | TC Maila Emergency Response',
  description:
    'Cyclone damage restoration in Cairns and Far North Queensland. IICRC-certified contractors pre-positioned across postcodes 4870, 4877, 4895, 4874, 4875, 4873, 4880. Lodge your claim 24/7 at disasterrecovery.com.au.',
  keywords:
    'cyclone damage restoration cairns, cyclone damage cairns, TC Maila Cairns, FNQ cyclone repair, cyclone insurance claim cairns, storm damage cairns, water damage cairns cyclone, IICRC cairns',
  openGraph: {
    title: 'Cyclone Damage Restoration Cairns | TC Maila Emergency Response',
    description:
      'IICRC-certified cyclone damage contractors pre-positioned across FNQ. priority response post-clearance. Lodge your TC Maila claim online 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Cyclone Damage Restoration')}&city=${encodeURIComponent('Cairns')}&service=cyclone-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/cyclone-damage-restoration-cairns`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/cyclone-damage-restoration-cairns/#localbusiness`,
  name: `${NAP.name} Cairns`,
  url: `${NAP.url}/cyclone-damage-restoration-cairns`,
  description:
    'IICRC-certified cyclone damage restoration contractors serving Cairns and all Far North Queensland postcodes. priority emergency response post-clearance. Full insurance claim documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Cairns',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
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
  name: 'Cyclone Damage Restoration Cairns',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Cairns' },
  serviceType: 'Cyclone Damage Restoration',
  description:
    'Professional cyclone damage restoration in Cairns and Far North Queensland: emergency make-safe, roof tarping, structural drying, water damage remediation, and full insurance claim documentation following IICRC S500:2025 and S700:2025 standards.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly will NRPG contractors reach my Cairns property after TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG contractors are pre-positioned across FNQ. Response occurs as soon as a certified contractor is confirmed for your area of emergency services issuing the all-clear for your area. Lodge your claim at disasterrecovery.com.au/claim now \u2014 we queue assignments and dispatch the moment clearance is confirmed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is cyclone damage covered by home insurance in FNQ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes \u2014 most Australian home insurance policies cover cyclone wind damage and associated water ingress. FNQ policies are subject to the ARPC Cyclone Reinsurance Pool, which your insurer participates in. Lodge your claim as \u201ccyclone damage\u201d and \u201cwater ingress\u201d separately. NRPG provides full claims documentation packs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the ARPC Cyclone Pool and how does it affect my claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Australian Reinsurance Pool Corporation (ARPC) Cyclone Pool is a government backstop for cyclone losses in northern Australia. Your insurer holds reinsurance through the pool and manages your claim on its behalf. This does not change your rights as a policyholder \u2014 you can still dispute underpayment through AFCA.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I stay in my Cairns home after cyclone damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This depends on structural safety assessments. Queensland Building and Construction Commission (QBCC) inspectors and SES assess structural integrity after major events. If your property is deemed uninhabitable, your insurer\u2019s Additional Living Expenses (ALE) benefit covers temporary accommodation \u2014 keep all receipts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I prevent mould after cyclone water damage in Cairns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cairns\u2019 tropical climate (30\u00b0C+ and high humidity) means mould begins growing within 24\u201348 hours of water damage. IICRC-certified contractors use commercial dehumidifiers, air movers, and HEPA filtration to achieve structural drying targets. Do not use household bleach \u2014 it does not eliminate mould at the root. Lodge immediately for rapid response.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documents do I need for a cyclone insurance claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You need: timestamped photographs of all damage, your policy number and PDS, purchase receipts or valuations for damaged contents, receipts for any emergency repairs already done, and a detailed scope of works from an IICRC-certified contractor. NRPG provides a full documentation pack as part of the restoration service.',
      },
    },
  ],
};

export default function CycloneDamageRestorationCairnsPage() {
  return (
    <>
      <Script
        id="cdrc-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="cdrc-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="cdrc-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Cyclone Damage"
        title="Cyclone Damage Restoration Cairns"
        subtitle="IICRC-certified contractors pre-positioned across Far North Queensland. priority response post-clearance for Cairns, Port Douglas, Mossman, Innisfail, and Cape York. Lodge your claim online 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Cairns' },
        ]}
        sections={[
          {
            heading: "Why Cairns Is Australia's Highest-Risk Cyclone Zone",
            body: (
              <>
                <p>
                  Cairns is among the most cyclone-exposed cities in Australia. The region sits
                  within the primary cyclone track for storms forming in the Coral Sea, with the FNQ
                  coastline directly in the path of systems that develop north of the continent
                  between November and May. Cairns has experienced direct or near-direct cyclone
                  impacts from Category 3 or above events on average every 7–10 years, with the
                  terrain channelling storm surge into low-lying residential areas including Cairns
                  North, Manunda, and the Esplanade foreshore.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The geography of the region amplifies cyclone impacts: the Great Dividing Range to
                  the west creates a funnel effect that concentrates wind and rainfall on the coast.
                  Suburb elevations range from sea level along the foreshore to 30–50 metres in
                  areas like Edge Hill and Whitfield, creating significant variation in flood and
                  wind exposure across the LGA. Properties in low-lying coastal suburbs — including
                  Machans Beach, Holloways Beach, Yorkeys Knob, and Trinity Beach — face combined
                  wind, rain, and storm surge risk in major cyclone events.
                </p>
              </>
            ),
          },
          {
            heading: 'TC Maila FNQ — Impact and Recovery',
            body: (
              <>
                <p>
                  Tropical Cyclone Maila has impacted the Far North Queensland coast and Cape York
                  Peninsula. For current warning status and all-clear notifications, refer to{' '}
                  <a
                    href="https://www.bom.gov.au/cyclone/7dayforecast/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    bom.gov.au
                  </a>
                  .
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG certified contractors are pre-positioned across postcodes 4870 (Cairns), 4877
                  (Port Douglas), 4895 (Daintree), 4874 (Mossman), 4875 (Wonga Beach), 4873
                  (Kuranda), and 4880 (Atherton Tablelands). Claims can be lodged online 24/7.
                  Contractor dispatch occurs as soon as a certified contractor is confirmed for your
                  area of emergency services issuing the all-clear for affected areas.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>
                    Do NOT enter a damaged property until emergency services confirm it is safe.
                  </strong>
                </p>
              </>
            ),
          },
          {
            heading: 'Cyclone Damage Restoration Cost Estimates — Cairns 2026',
            body: (
              <>
                <p>
                  Cyclone damage restoration costs in Cairns vary by cyclone category, building
                  type, and proximity to the coast. The following are indicative costs for
                  residential properties following a Category 3–5 cyclone event:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Emergency make-safe (tarping, board-up, temporary fencing):</strong>{' '}
                    $2,000–$8,000. Critical within 24 hours of storm passage to prevent secondary
                    water damage.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Structural wind damage (roof, walls, windows):</strong> $15,000–$80,000.
                    Cyclone-rated roofing systems, cyclone shutters, structural tie-downs.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Water damage from wind-driven rain or flooding:</strong> $8,000–$40,000.
                    Water extraction, structural drying to IICRC S500:2025, mould prevention
                    treatment.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Storm surge or flooding inundation:</strong> $20,000–$100,000+. Category
                    3 water remediation, contents removal, full structural drying, subfloor
                    treatment.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Full rebuild following Cat 4–5 structural loss:</strong>{' '}
                    $100,000–$350,000+. Managed through insurer-approved builder program with NRPG
                    project management.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'What to Do After a Cyclone Hits Your Cairns Property',
            body: (
              <>
                <ol style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Wait for the all-clear from emergency services.</strong> Do not leave
                    shelter until Queensland Police, SES, or BOM confirms conditions are safe. The
                    eye of a cyclone creates a deceptive calm — violent conditions return when the
                    eye passes.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Document everything before touching anything.</strong> Photograph and
                    video all visible damage to roof, walls, windows, contents, and external
                    structures. Timestamped evidence is critical for your insurance claim.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Lodge your claim within 72 hours.</strong> Most QLD home insurance
                    policies have claim notification requirements. Lodge as "cyclone damage" and
                    "water ingress" — not just "flood". The ARPC Cyclone Pool applies to FNQ events.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Request an IICRC-certified assessor.</strong> Do not accept the
                    insurer&apos;s first contractor without confirming IICRC certification.
                    Non-certified contractors cannot produce the psychrometric drying logs and scope
                    documentation your insurer needs for sign-off.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Keep all receipts for emergency accommodation.</strong> If your property
                    is uninhabitable, your insurer&apos;s Additional Living Expenses (ALE) benefit
                    typically covers temporary accommodation up to 12 months. Keep all receipts.
                  </li>
                </ol>
              </>
            ),
          },
          {
            heading: 'FNQ Suburbs and Postcodes We Cover',
            body: (
              <>
                <p>
                  NRPG contractors are deployed across all Far North Queensland postcodes. Primary
                  coverage zones for TC Maila response:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Cairns LGA (4870):</strong> Cairns City, Cairns North, Manunda, Westcourt,
                  Manoora, Edge Hill, Whitfield, Mooroobool, Brinsmead, Freshwater, Redlynch,
                  Smithfield, Caravonica, Barron Gorge
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Beaches (4878–4879):</strong> Machans Beach, Holloways Beach,
                  Yorkeys Knob, Trinity Beach, Trinity Park, Kewarra Beach, Clifton Beach, Palm
                  Cove, Ellis Beach
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Corridor (4871–4872):</strong> Gordonvale, Edmonton, Woree,
                  Bentley Park, White Rock, Mount Sheridan
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Port Douglas / Mossman (4877/4874):</strong> Port Douglas, Four Mile
                  Beach, Mossman, Daintree Village, Cape Tribulation
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Innisfail / Cassowary Coast (4860):</strong> Innisfail, Babinda, Mission
                  Beach, Tully, El Arish
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate
                  contractor matching across all FNQ postcodes.
                </p>
              </>
            ),
          },
          {
            heading: 'The ARPC Cyclone Reinsurance Pool — FNQ Claimants',
            body: (
              <>
                <p>
                  FNQ is one of the primary coverage zones for the Australian Reinsurance Pool
                  Corporation (ARPC) Cyclone Pool. If your property is north of the Tropic of
                  Capricorn, your insurer is required by law to hold cyclone reinsurance through the
                  ARPC scheme. This affects how your cyclone claim is processed:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Your insurer manages the claim on behalf of the pool — do not assume this means
                    faster processing.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Cyclone damage and associated water ingress within 48 hours of the event are
                    generally covered. Separate flood inundation is assessed separately.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    If your claim is disputed or underpaid, lodge a complaint with AFCA — the ARPC
                    pool does not remove your right to dispute under the Insurance Contracts Act.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly will NRPG contractors reach my Cairns property after TC Maila?',
            answer:
              'NRPG contractors are pre-positioned across FNQ. Response occurs as soon as a certified contractor is confirmed for your area of emergency services issuing the all-clear for your area. Lodge your claim at disasterrecovery.com.au/claim now — we queue assignments and dispatch the moment clearance is confirmed.',
          },
          {
            question: 'Is cyclone damage covered by home insurance in FNQ?',
            answer:
              'Yes — most Australian home insurance policies cover cyclone wind damage and associated water ingress. FNQ policies are subject to the ARPC Cyclone Reinsurance Pool, which your insurer participates in. Lodge your claim as "cyclone damage" and "water ingress" separately. NRPG provides full claims documentation packs.',
          },
          {
            question: 'What is the ARPC Cyclone Pool and how does it affect my claim?',
            answer:
              'The Australian Reinsurance Pool Corporation (ARPC) Cyclone Pool is a government backstop for cyclone losses in northern Australia. Your insurer holds reinsurance through the pool and manages your claim on its behalf. This does not change your rights as a policyholder — you can still dispute underpayment through AFCA.',
          },
          {
            question: 'Can I stay in my Cairns home after cyclone damage?',
            answer:
              "This depends on structural safety assessments. Queensland Building and Construction Commission (QBCC) inspectors and SES assess structural integrity after major events. If your property is deemed uninhabitable, your insurer's Additional Living Expenses (ALE) benefit covers temporary accommodation — keep all receipts.",
          },
          {
            question: 'How do I prevent mould after cyclone water damage in Cairns?',
            answer:
              "Cairns' tropical climate (30°C+ and high humidity) means mould begins growing within 24–48 hours of water damage. IICRC-certified contractors use commercial dehumidifiers, air movers, and HEPA filtration to achieve structural drying targets. Do not use household bleach — it does not eliminate mould at the root. Lodge immediately for rapid response.",
          },
          {
            question: 'What documents do I need for a cyclone insurance claim?',
            answer:
              'You need: timestamped photographs of all damage, your policy number and PDS, purchase receipts or valuations for damaged contents, receipts for any emergency repairs already done, and a detailed scope of works from an IICRC-certified contractor. NRPG provides a full documentation pack as part of the restoration service.',
          },
        ]}
        relatedGuides={[
          {
            title: 'TC Maila FNQ Emergency Response — Claims Support',
            href: '/events/tc-maila-fnq-2026',
            description: 'Real-time TC Maila response information for FNQ property owners.',
          },
          {
            title: 'ARPC Cyclone Pool — What FNQ Homeowners Need to Know',
            href: '/events/tc-maila-fnq-2026',
            description: 'How the ARPC Cyclone Reinsurance Pool affects your TC Maila claim.',
          },
          {
            title: 'Storm Damage Restoration Cost Guide Australia 2026',
            href: '/guides/cost-guides/how-much-storm-damage-restoration-cost',
            description: 'Full cost breakdown by damage type and cyclone category.',
          },
          {
            title: 'Mould After Cyclone Flooding — FNQ Guide',
            href: '/services/mould-remediation',
            description: 'Why tropical conditions accelerate mould and what to do within 48 hours.',
          },
        ]}
        cta={{ text: 'Lodge Your TC Maila Claim Now', href: '/claim' }}
      />
    </>
  );
}
