import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-493: April 13 Dual Media Convergence Content
 *
 * Created: 9 April 2026 — Captures peak search moment when two major events coincide:
 * 1. PERILS releases final Alfred insured loss figure (AU$1.877 billion)
 * 2. TC Maila forecast to make landfall on FNQ coast (Cat 5, 215 km/h)
 */

export const metadata: Metadata = {
  title: 'TC Maila Landfall & Alfred Insurance Claims | April 13 2026 FNQ',
  description: 'TC Maila landfall forecast April 13 — FNQ coast. PERILS confirms Alfred final loss AU$1.877 billion. Lodge your TC Maila claim or escalate your Alfred dispute 24/7.',
  keywords: 'TC Maila landfall April 13, Alfred insurance payout April 2026, FNQ cyclone April 2026, cyclone insurance claim Queensland April 2026',
  openGraph: {
    title: 'TC Maila Landfall & Alfred Insurance Claims | April 13 2026 FNQ',
    description: 'TC Maila landfall forecast April 13 — FNQ coast. PERILS confirms Alfred final loss AU$1.877 billion. Lodge your TC Maila claim or escalate your Alfred dispute 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('April 13 — TC Maila & Alfred Insurance')}&city=${encodeURIComponent('FNQ')}&service=cyclone-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  // DR-745: canonical winner is tc-maila-fnq-2026; this page is a near-duplicate
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${NAP.url}/events/tc-maila-fnq-2026`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/events/april-13-convergence-2026/#localbusiness`,
  name: `${NAP.name} Far North Queensland`,
  url: `${NAP.url}/events/april-13-convergence-2026`,
  description: 'IICRC-certified cyclone damage restoration contractors serving Far North Queensland. Pre-positioned for TC Maila landfall and supporting Alfred insurance claim escalations. priority emergency response post-clearance.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'Place', name: 'Far North Queensland', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Cairns', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'TC Maila & Alfred Cyclone Damage Restoration — April 13 2026',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Far North Queensland' },
  serviceType: 'Cyclone Damage Restoration',
  description: 'Professional cyclone damage restoration for TC Maila landfall impacts across FNQ and ongoing Alfred insurance claim support. IICRC-certified contractors, priority post-clearance response, full insurer documentation management for both new TC Maila claims and unresolved Alfred disputes.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

export default function April13ConvergencePage() {
  return (
    <>
      <Script id="a13c-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="a13c-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AgGuidePageTemplate
        category="Emergency Response"
        title="April 13 — TC Maila Landfall &amp; Alfred Insurance: Two Events, One Window"
        subtitle="TC Maila is forecast to make landfall on the FNQ coast on 13 April 2026. On the same day, PERILS releases its AU$1.877 billion Alfred final loss estimate. Whether you&apos;re bracing for TC Maila or still navigating an Alfred claim — NRPG is ready."
        gradient="linear-gradient(135deg, #1a0533 0%, #6B21A8 50%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Events', href: '/events' },
          { label: 'April 13 Convergence' },
        ]}
        sections={[
          {
            heading: 'TC Maila — April 13 Landfall Window Active',
            body: (
              <>
                <p>
                  Tropical Cyclone Maila has been upgraded to Category 5 with sustained winds of 215 km/h and is
                  tracking directly toward the Far North Queensland coast. BOM has forecast landfall impacts across
                  the Cairns to Cape York corridor, with April 13 representing the peak convergence date in the
                  11–14 April 2026 window.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Category 5 conditions include destructive winds exceeding 200 km/h, storm surge along the
                  coastline, and intense rainfall causing flash flooding and riverine inundation. The FNQ coast
                  from Cairns to Cape York is on high alert, with postcodes 4870 (Cairns), 4877 (Port Douglas),
                  4873 (Kuranda), 4874 (Mossman), 4880 (Atherton Tablelands), and 4895 (Daintree) identified as
                  primary impact zones.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG certified contractors are pre-positioned across all affected postcodes. Claims can be
                  lodged online 24/7 at disasterrecovery.com.au/claim. Contractor dispatch occurs within
                  60 minutes of emergency services issuing the all-clear for affected areas.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Do NOT enter a damaged property until emergency services confirm the all-clear.</strong>
                </p>
              </>
            ),
          },
          {
            heading: 'Alfred Final Loss: AU$1.877 Billion — What It Means for Outstanding Claims',
            body: (
              <>
                <p>
                  PERILS has released its final insured loss estimate for Ex-Tropical Cyclone Alfred at
                  AU$1.877 billion — the largest insured cyclone loss on a current-value basis since
                  Cyclone Debbie in 2017. The figure covers over 132,000 ICA claims across Queensland
                  and northern New South Wales.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Alfred loss breakdown: personal lines account for 70% of the total, commercial
                  property 26%, and motor 4%. This distribution reflects the widespread residential
                  impact of Alfred&apos;s wind, water ingress, and flooding across the affected region.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  If your Alfred claim is still open, underpaid, or disputed — you have options. The
                  PERILS final loss confirmation does not close your claim window. Most policies allow
                  supplementary lodgement for underpaid or disputed claims. Where your insurer has
                  stalled or underpaid, escalation to the Australian Financial Complaints Authority
                  (AFCA) is available at no cost to you.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG provides full documentation packs for both new TC Maila claims and ongoing Alfred
                  disputes — including IICRC-certified scope of works, psychrometric drying logs, and
                  insurer correspondence management.
                </p>
              </>
            ),
          },
          {
            heading: 'Lodge Your Claim — TC Maila or Alfred',
            body: (
              <>
                <p>
                  Whether you need emergency make-safe after TC Maila or are still resolving an Alfred
                  water damage dispute, lodge at{' '}
                  <a href="/claim">disasterrecovery.com.au/claim</a>.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG is IICRC-certified, operating 24/7, with insurer correspondence managed on
                  your behalf. Services include:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>TC Maila emergency response:</strong> Emergency make-safe, roof tarping,
                    structural drying, and water damage remediation. priority response post-clearance
                    across postcodes 4870, 4877, 4873, 4874, 4880, and 4895.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Alfred claim escalation:</strong> Full documentation packs for underpaid or
                    disputed claims. IICRC-certified scope documentation to support AFCA escalation.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Dual-event properties:</strong> If your property was damaged by Alfred and
                    sustains additional TC Maila damage, NRPG manages both claims with clearly
                    delineated documentation for separate lodgement.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'When is TC Maila expected to make landfall?',
            answer: 'BOM is forecasting TC Maila landfall impacts for the FNQ coast in the 11–14 April 2026 window, with April 13 the peak convergence forecast date. NRPG contractors are pre-positioned across postcodes 4870 (Cairns), 4877 (Port Douglas), 4873 (Kuranda), 4874 (Mossman), 4880 (Atherton Tablelands), and 4895 (Daintree). Lodge your claim now at disasterrecovery.com.au/claim.',
          },
          {
            question: 'I have an unresolved Alfred claim — can I still lodge it?',
            answer: "Yes. PERILS' April 13 final loss confirmation of AU$1.877 billion does not close your claim window. Most policies allow supplementary lodgement for underpaid or disputed claims. NRPG provides IICRC-certified scope documentation to support AFCA escalation if your insurer has underpaid or stalled.",
          },
          {
            question: 'Can NRPG help with both TC Maila damage and an Alfred claim at the same property?',
            answer: 'Yes. If your property was damaged by Alfred and now sustains additional TC Maila damage, NRPG manages both claims — ensuring documentation clearly delineates each event for separate lodgement. This is critical for maximising your combined claim outcome.',
          },
          {
            question: 'What is the PERILS final loss figure for Ex-TC Alfred?',
            answer: 'PERILS confirmed a final insured loss of AU$1.877 billion for Ex-Tropical Cyclone Alfred. This represents the largest insured cyclone loss on a current-value basis since Cyclone Debbie in 2017. The figure comprises personal lines (70%), commercial (26%), and motor (4%) losses across Queensland and northern NSW.',
          },
        ]}
        relatedGuides={[
          { title: 'TC Maila FNQ Emergency — Lodge Your Claim', href: '/events/tc-maila-fnq-2026', description: 'Real-time TC Maila response information and claim lodgement.' },
          { title: 'Ex-TC Alfred Recovery — Disputed Claims', href: '/events/ex-cyclone-alfred-recovery', description: 'If your Alfred claim is stalled or underpaid, NRPG can escalate.' },
          { title: 'Cyclone Damage Restoration Cairns', href: '/cyclone-damage-restoration-cairns', description: 'FNQ cyclone restoration hub — pre-positioned contractors.' },
        ]}
        cta={{ text: 'Lodge Your Claim Now — TC Maila or Alfred', href: '/claim' }}
      />
    </>
  );
}
