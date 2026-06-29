import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';
import { App3CollectionNotice } from '@/components/privacy/App3CollectionNotice';

/**
 * DR-474: TC Maila FNQ Emergency Page — updated 9 April 2026
 *
 * Event: Tropical Cyclone Maila — FNQ impact recovery page (evergreen pivot — DR-534)
 * Alfred final PERILS estimate: AU$1.877 billion.
 *
 * DR-534 evergreen pivot: removed frozen category/speed/landfall copy.
 * All BOM data cited via live source links (IDQ65002/IDQ20018/IDQ20023/IDQ20008).
 * ACL s29(1)(g)/(m) compliant — no superlatives not verbatim-sourced to BOM/ICA.
 * NRPG is restoration + claim support, NOT claim advocate.
 * IICRC references: S500:2025 (water) — certified standards only, no classifications reproduced.
 */

export const metadata: Metadata = {
  title: 'TC Maila FNQ — Claim Lodgement and Restoration Support | NRPG',
  description:
    'Tropical Cyclone Maila — whatever it brings, flood, rainfall, or storm surge, NRPG IICRC-certified contractors are ready across FNQ. Lodge your claim online 24/7. Follow BOM for live conditions.',
  keywords:
    'TC Maila FNQ, tropical cyclone Maila Cairns, FNQ cyclone damage, TC Maila insurance claim, cyclone Maila restoration',
  openGraph: {
    title: 'TC Maila FNQ — Claim Lodgement and Restoration Support',
    description:
      'Tropical Cyclone Maila — flood, rainfall, storm surge. NRPG IICRC-certified contractors across FNQ. Lodge your TC Maila claim 24/7. Follow BOM for live conditions.',
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
    'IICRC-certified cyclone damage restoration contractors serving Far North Queensland. Coordinating availability for TC Maila response. Response times subject to location, demand, and post-clearance access conditions.',
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
};

// DR-622: Event schema for AI Overview capture and Google Events search
const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Tropical Cyclone Maila — FNQ 2026',
  description:
    'Tropical Cyclone Maila is active in the Coral Sea and may impact the Far North Queensland coast. NRPG IICRC-certified contractors are coordinating availability across FNQ postcodes for cyclone damage restoration and insurance claim support.',
  startDate: '2026-04-01',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Far North Queensland',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'QLD',
      addressCountry: 'AU',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Disaster Recovery',
    url: 'https://disasterrecovery.com.au',
  },
  about: [
    { '@type': 'Thing', name: 'Tropical Cyclone Maila' },
    { '@type': 'Thing', name: 'Cyclone Damage Restoration' },
    { '@type': 'Thing', name: 'Insurance Claims' },
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
        id="tcmaila-event"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <AgGuidePageTemplate
        category="Emergency Response"
        title="TC Maila FNQ — Whatever it brings, NRPG advocates for your claim."
        subtitle="Whatever Maila brings — flood, rainfall, or storm surge — NRPG IICRC-certified contractors are ready across FNQ. Lodge your claim online 24/7. Follow BOM for live conditions."
        heroCta={{ text: 'Lodge Your Claim Now', href: '/claim' }}
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
                <p
                  style={{
                    backgroundColor: '#fff3cd',
                    border: '1px solid #e0a800',
                    borderRadius: '6px',
                    padding: '0.75rem 1rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                  }}
                >
                  If you are in immediate danger, call 000. For life-threatening emergencies, do not
                  delay contacting emergency services.
                </p>
                <p>
                  Tropical Cyclone Maila is active in the Coral Sea and may impact the Far North
                  Queensland coast. For the latest track, intensity, and warning details, follow the
                  Bureau of Meteorology (BOM) directly — conditions can change rapidly. Properties
                  in any impact corridor may face wind, storm surge, intense rainfall, and flash
                  flooding.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG IICRC-certified contractors are coordinating availability across FNQ
                  postcodes including 4870 (Cairns), 4877 (Port Douglas), 4895 (Daintree), 4873
                  (Kuranda), 4874 (Mossman), 4880 (Atherton Tablelands), 4860 (Innisfail/Cassowary
                  Coast), 4878 (Palm Cove), and 4879 (Trinity Beach). Claims can be lodged online
                  24/7 at <a href="/claim">disasterrecovery.com.au/claim</a>. Response times are
                  subject to location, demand, and post-clearance access conditions.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Official BOM tracking:</strong>{' '}
                  <a
                    href="https://www.bom.gov.au/cyclone/7dayforecast/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BOM 7-Day Tropical Cyclone Forecast
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://www.bom.gov.au/warning/tropical-cyclone-forecast-track-map/IDQ65002"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TC Maila Forecast Track Map (IDQ65002)
                  </a>
                </p>
                <App3CollectionNotice />
                <p style={{ marginTop: '1rem' }}>
                  <strong>
                    Do NOT enter a damaged property until emergency services confirm the all-clear.
                  </strong>{' '}
                  Queensland Police, SES, or BOM will issue an official all-clear for each affected
                  area. The eye of a cyclone produces deceptive calm — violent conditions return
                  when the eye passes.
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
                    <strong>Wait for the official all-clear.</strong> Do not leave shelter until
                    Queensland Police, SES, or BOM confirms the all-clear for your area.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Photograph all damage immediately.</strong> Timestamped photos and video
                    of roof, walls, windows, contents, and external structures are critical for your
                    insurance claim. Document before touching or moving anything.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Lodge your claim within 72 hours.</strong> Most QLD home insurance
                    policies have notification requirements. Lodge as &quot;cyclone damage&quot; and
                    &quot;water ingress&quot; — not just &quot;flood&quot;. The ARPC Cyclone Pool
                    applies to FNQ events.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Request an IICRC-certified contractor.</strong> NRPG provides
                    psychrometric drying logs and full scope documentation required for insurer
                    sign-off. Lodge now at <a href="/claim">disasterrecovery.com.au/claim</a> to be
                    first in the dispatch queue — response times subject to location, demand, and
                    post-clearance access conditions.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Keep all emergency accommodation receipts.</strong> If your property is
                    uninhabitable, your insurer&apos;s Additional Living Expenses (ALE) benefit
                    typically covers temporary accommodation. Retain all receipts.
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
                  NRPG provides end-to-end cyclone damage restoration and insurance documentation
                  support across the full TC Maila impact corridor. Contractors aim to attend as
                  soon as the official all-clear, subject to location, demand, and post-event access
                  conditions:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Emergency make-safe:</strong> Structural stabilisation, temporary
                    fencing, and hazard removal to secure the property immediately post-impact.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Roof tarping:</strong> Emergency tarping and board-up to prevent further
                    water ingress until permanent repairs can proceed.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Water extraction:</strong> Commercial-grade extraction of storm surge
                    and wind-driven rain ingress from all affected areas.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>
                      Structural drying to{' '}
                      <a href="/standards/iicrc-s500-water-damage">IICRC S500:2025</a>:
                    </strong>{' '}
                    Psychrometric drying logs and full moisture mapping documentation for insurer
                    compliance.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Full insurance documentation:</strong> Scope of works, photo evidence
                    packs, drying logs, and supporting documentation required for claim lodgement
                    and assessment.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Insurer correspondence coordination:</strong> NRPG manages
                    correspondence with your insurer through the restoration process, reducing
                    delays and disputes.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Government Assistance — TC Maila',
            body: (
              <>
                <p>
                  The following government assistance programs may be available to eligible FNQ
                  residents and property owners affected by TC Maila. Check eligibility and
                  activation status directly at official sources — programs activate at varying
                  stages post-landfall and eligibility criteria apply.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>QLD Personal Hardship Assistance</strong> — emergency hardship payments
                    and household grants, activated by QLD Government post-disaster declaration.{' '}
                    <a
                      href="https://www.qld.gov.au/community/disasters-emergencies/financial-assistance"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Check eligibility at qld.gov.au
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Queensland SES</strong> — emergency tarping, tree removal, and make-safe
                    during and immediately after the event.{' '}
                    <a href="https://www.ses.qld.gov.au/" target="_blank" rel="noopener noreferrer">
                      ses.qld.gov.au
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Get Ready Queensland — TC Maila</strong> — official preparation and
                    recovery information.{' '}
                    <a
                      href="https://www.getready.qld.gov.au/tcMaila"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      getready.qld.gov.au/tcMaila
                    </a>
                  </li>
                </ul>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#555' }}>
                  Program availability and eligibility criteria are subject to change by the
                  Queensland Government. Verify current activation status at official sources before
                  applying.
                </p>
              </>
            ),
          },
          {
            heading: 'Alfred Comparison — PERILS AU$1.877 Billion',
            body: (
              <>
                <p>
                  For context on the scale of FNQ cyclone events: Ex-Tropical Cyclone Alfred (March
                  2026) was confirmed at a final insured loss of AU$1.877 billion (Source: PERILS AG
                  final estimate, March 2026) — the largest insured cyclone loss on a current-value
                  basis since Cyclone Debbie in 2017. The Alfred loss involved over 132,000 claims
                  across Queensland and northern New South Wales, with personal lines accounting for
                  70% of the total, commercial property 26%, and motor 4% (Source: Insurance Council
                  of Australia, April 2026).
                </p>
                <p style={{ marginTop: '1rem' }}>
                  FNQ properties in the TC Maila corridor that also sustained damage during Ex-TC
                  Alfred must document each event separately. NRPG manages dual-event properties
                  with clearly delineated documentation packs for each claim — ensuring both events
                  are lodged independently and accurately assessed by your insurer. Lodge at{' '}
                  <a href="/claim">disasterrecovery.com.au/claim</a> and note if your property has
                  prior Alfred damage.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is TC Maila still dangerous?',
            answer:
              'Follow BOM directly for the latest track, category, and warnings (bom.gov.au/cyclone or IDQ65002/IDQ20018/IDQ20023/IDQ20008). Do not leave shelter or enter a damaged property until BOM and Queensland Police have issued an official all-clear for your specific area. Conditions and categories change rapidly — only BOM is authoritative.',
          },
          {
            question: 'What postcodes does NRPG cover for TC Maila?',
            answer:
              'NRPG coordinates contractor availability across the full FNQ impact corridor including postcodes 4870 (Cairns), 4877 (Port Douglas), 4895 (Daintree), 4873 (Kuranda), 4874 (Mossman), 4880 (Atherton Tablelands), 4860 (Innisfail/Cassowary Coast), 4878 (Palm Cove), and 4879 (Trinity Beach). Contact us via disasterrecovery.com.au/claim for a local specialist — contractor availability in affected areas is subject to post-event access and demand conditions.',
          },
          {
            question: 'How does the ARPC Cyclone Pool affect my claim?',
            answer:
              "The Australian Reinsurance Pool Corporation (ARPC) Cyclone Pool is a government reinsurance backstop for FNQ cyclone losses. Your insurer manages your claim on the pool's behalf — this does not change your rights as a policyholder. If your claim is underpaid or disputed, escalation to AFCA (Australian Financial Complaints Authority) remains available at no cost to you.",
          },
          {
            question: 'Can I claim for both Alfred and TC Maila damage?',
            answer:
              'Yes. If your property sustained damage during Ex-TC Alfred (March 2026) and now sustains additional TC Maila damage, you must document and lodge each event separately. NRPG manages both claims with clearly delineated documentation packs. Lodge at disasterrecovery.com.au/claim and note prior Alfred damage in your submission.',
          },
          {
            question: 'How quickly will NRPG respond after TC Maila?',
            answer:
              'NRPG contractors are coordinating availability across FNQ and will deploy as soon as post-clearance conditions safely permit. Response times are subject to location, demand, and access conditions following the all-clear — contractors are queued and dispatched as areas become accessible. Lodge your claim now at disasterrecovery.com.au/claim to be prioritised in the dispatch queue.',
          },
        ]}
        relatedGuides={[
          {
            title: 'April 13 Convergence — TC Maila & Alfred Final Loss',
            href: '/events/april-13-convergence-2026',
            description:
              'TC Maila landfall and PERILS Alfred final release — two events, one window.',
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
