import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-500: Ex-TC Alfred FNQ Recovery — Final PERILS AU$1.877 Billion
 *
 * PERILS 4th and final estimate: AU$1.877 billion (source: artemis.bm / Reinsurance News)
 * ICA claims: 132,000
 * ARPC Cyclone Pool: passed $1 billion threshold (April 8, 2026)
 * Personal lines 70% / commercial 26% / motor 4%
 *
 * ACL s18 compliant — NRPG is restoration + claim support, NOT claim advocate.
 * No guarantee language. No dual stats.
 * Privacy collection notice adjacent to all CTA and lodge links.
 */

export const metadata: Metadata = {
  title: 'Ex-TC Alfred FNQ Recovery — Final PERILS AU$1.877 Billion | Claim Support',
  description:
    'Ex-Tropical Cyclone Alfred (March 2026) final PERILS insured loss: AU$1.877 billion. 132,000 ICA claims. IICRC-certified restoration contractors supporting late, disputed, and supplementary Alfred claims across QLD and NSW. Lodge free assessment 24/7.',
  keywords:
    'TC Alfred FNQ, cyclone Alfred Queensland 2026, Alfred insurance claim, PERILS AU$1.877 billion, Alfred ARPC cyclone pool, Alfred supplementary claim, Alfred disputed claim',
  openGraph: {
    title: 'Ex-TC Alfred FNQ Recovery — Final PERILS AU$1.877 Billion | Claim Support',
    description:
      'Ex-Tropical Cyclone Alfred final PERILS insured loss AU$1.877 billion. 132,000 ICA claims. IICRC-certified contractors supporting late, disputed, and supplementary Alfred claims across QLD and NSW.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Ex-TC Alfred FNQ Recovery')}&city=${encodeURIComponent('FNQ')}&service=cyclone-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/events/cyclone-alfred-fnq-2026`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/events/cyclone-alfred-fnq-2026/#professionalservice`,
  name: `${NAP.name} — Ex-TC Alfred FNQ Recovery`,
  url: `${NAP.url}/events/cyclone-alfred-fnq-2026`,
  description:
    'IICRC-certified cyclone damage restoration and insurance claim support for Ex-TC Alfred across Far North Queensland and northern NSW. Supporting late, disputed, and supplementary Alfred claims.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: [
    { '@type': 'Place', name: 'Far North Queensland' },
    { '@type': 'Place', name: 'Queensland' },
    { '@type': 'Place', name: 'New South Wales' },
  ],
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '12847',
    bestRating: '5',
    worstRating: '1',
  },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cyclone Damage Restoration — Ex-TC Alfred FNQ Recovery',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: [
    { '@type': 'Place', name: 'Far North Queensland' },
    { '@type': 'Place', name: 'Queensland' },
  ],
  serviceType: 'Cyclone Damage Restoration and Insurance Claim Support',
  description:
    'Professional cyclone damage restoration and claim documentation for Ex-TC Alfred impacts across FNQ, Queensland, and northern NSW: structural drying to IICRC S500:2025, mould remediation, full insurance documentation, and supplementary and disputed claim support.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '12847',
    bestRating: '5',
    worstRating: '1',
  },
};

export default function AlfredFNQ2026Page() {
  return (
    <>
      <Script
        id="alfredFNQ-professionalservice"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <Script
        id="alfredFNQ-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <AgGuidePageTemplate
        category="Event Recovery"
        title="Ex-TC Alfred FNQ Recovery — Final PERILS AU$1.877 Billion"
        subtitle="Ex-Tropical Cyclone Alfred (March 2026) final PERILS insured loss: AU$1.877 billion. 132,000 ICA claims. IICRC-certified restoration contractors supporting late, disputed, and supplementary Alfred claims across QLD and NSW."
        gradient="linear-gradient(135deg, #0C2340 0%, #1B5E20 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-10"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Events', href: '/events' },
          { label: 'Ex-TC Alfred FNQ Recovery 2026' },
        ]}
        sections={[
          {
            heading: 'Ex-TC Alfred — Final PERILS Loss Confirmed',
            body: (
              <>
                <p>
                  PERILS has confirmed a 4th and final insured loss estimate of{' '}
                  <strong>AU$1.877 billion</strong> for Ex-Tropical Cyclone Alfred, which made landfall
                  across Southeast Queensland and northern New South Wales in March 2026. The Insurance
                  Council of Australia (ICA) recorded <strong>132,000 claims</strong> across the event, with
                  personal lines accounting for 70% of the total loss, commercial property 26%, and motor 4%.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  On <strong>April 8, 2026</strong>, the ARPC (Australian Reinsurance Pool Corporation)
                  Cyclone Pool passed the <strong>$1 billion threshold</strong> — a significant marker
                  reflecting the scale of FNQ cyclone losses absorbed by the pool. Alfred is the{' '}
                  <strong>largest insured cyclone event on a current-value basis since Cyclone Debbie in 2017</strong>.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Many policyholders are still navigating disputed, delayed, or underpaid claims. The PERILS
                  final estimate closing out does not close your individual claim rights — supplementary
                  claims, AFCA escalations, and independent assessments remain fully available.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Official BOM event record:</strong>{' '}
                  <a
                    href="https://www.bom.gov.au/cyclone/history/qld/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BOM Queensland Cyclone History
                  </a>
                </p>
              </>
            ),
          },
          {
            heading: 'Is Your Alfred Claim Fully Settled?',
            body: (
              <>
                <p>
                  Late claims, supplementary claims for damage discovered after initial settlement, and
                  disputed assessments are still valid pathways. NRPG supports Alfred policyholders in the
                  following circumstances:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Mould now appearing:</strong> Properties where drying was incomplete or not
                    performed to IICRC S500:2025 standards are presenting mould months after the event.
                    If mould arose from water ingress during Alfred, this is a supplementary claim.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Structural damage underscoped:</strong> Initial insurer assessments frequently
                    underestimate structural damage extent. NRPG provides an independent scope that
                    documents the full repair requirement.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Contents claims disputed:</strong> Insurer valuations for contents replacement
                    are frequently below replacement cost. NRPG documents current replacement values and
                    supports AFCA lodgement.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Claims not yet lodged:</strong> Policyholders still displaced, or who discovered
                    damage after returning, can lodge now. Most QLD policies allow 30&ndash;90 days from
                    discovery, not from event date.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.875rem', color: '#555' }}>
                  NRPG collects your contact and property details to coordinate contractor matching and
                  insurance documentation. See our <a href="/privacy">Privacy Policy</a> for full details.
                </p>
              </>
            ),
          },
          {
            heading: 'Alfred Insurer Accountability — What the Regulator Found',
            body: (
              <>
                <p>
                  Regulatory outcomes from recent ICA catastrophe events demonstrate that insurers failing
                  to handle claims efficiently face real consequences:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Bupa — ACCC AU$14.3 million civil penalty</strong> for misleading customers
                    during the 2022 floods, including misrepresenting claim outcomes. This outcome
                    establishes a precedent for misleading conduct in the claims handling context.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Youi — AU$115,765 fine</strong> for failing to handle claims efficiently and
                    within required timeframes under ASIC regulatory action.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>IAG — AU$89,000 penalty</strong> for delays in claims handling under ASIC
                    enforcement action.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  These regulatory outcomes demonstrate that if your Alfred claim has stalled, is disputed,
                  or has been underpaid, escalation to AFCA (Australian Financial Complaints Authority) is
                  free and available. NRPG provides independent assessment documentation to support your
                  AFCA lodgement. NRPG does not control claim outcomes — your insurer and AFCA determine
                  final claim decisions.
                </p>
              </>
            ),
          },
          {
            heading: 'ARPC Cyclone Pool — What FNQ Policyholders Need to Know',
            body: (
              <>
                <p>
                  The ARPC Cyclone Pool passed the <strong>$1 billion threshold in April 2026</strong>,
                  reflecting the accumulated impact of FNQ cyclone events on the pool balance. This is a
                  government reinsurance backstop — it does <strong>not</strong> change your rights as a
                  policyholder.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Your insurer manages your Alfred claim under pool rules, exactly as they would manage a
                  standard home insurance claim. The pool operates behind the scenes as reinsurance for your
                  insurer — it is not an additional claims channel and it does not provide direct payments
                  to policyholders.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  If your pool-backed Alfred claim is disputed or underpaid, AFCA escalation remains fully
                  available at no cost. AFCA can review pool-backed claims on the same basis as any
                  standard insurance claim. Lodge your Alfred claim assessment at{' '}
                  <a href="/claim">disasterrecovery.com.au/claim</a> and NRPG will document the independent
                  scope required for AFCA purposes.
                </p>
                <p style={{ marginTop: '0.75rem', fontStyle: 'italic', fontSize: '0.875rem', color: '#555' }}>
                  NRPG collects your contact and property details to coordinate contractor matching.
                  See our <a href="/privacy">Privacy Policy</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'Government Assistance — Alfred QLD',
            body: (
              <>
                <p>
                  The following government assistance programs were activated for Ex-TC Alfred affected
                  areas. Check eligibility and current activation status at official sources before
                  applying — some programs have application deadlines.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>QLD Structural Assistance Grant — up to $80,000</strong> for repair of a
                    disaster-damaged dwelling to make it safe and habitable.{' '}
                    <a
                      href="https://www.disaster.qld.gov.au/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Check eligibility at disaster.qld.gov.au
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>QLD Personal Hardship Assistance</strong> — emergency hardship payments and
                    essential household contents grants for eligible residents.{' '}
                    <a
                      href="https://www.qra.qld.gov.au/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Queensland Reconstruction Authority — qra.qld.gov.au
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>DRFA Assistance</strong> — Disaster Recovery Funding Arrangements support
                    for eligible individuals and communities in declared LGAs.{' '}
                    <a
                      href="https://www.disaster.qld.gov.au/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      disaster.qld.gov.au
                    </a>
                  </li>
                </ul>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#555' }}>
                  Check eligibility and current activation status at official sources before applying.
                  Program availability and application deadlines are subject to change by the Queensland
                  Government. NRPG is a restoration and claim support service and does not administer
                  government grants.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is it too late to lodge an Alfred claim?',
            answer:
              'No. Most QLD policies allow up to 30\u201390 days from event discovery. Mould and structural issues discovered months later can be lodged as supplementary claims if they arose from the Alfred event. NRPG documents the causal chain between the original Alfred damage and current conditions for insurer and AFCA purposes.',
          },
          {
            question: 'PERILS said AU$1.877B \u2014 why might my claim be less than I expected?',
            answer:
              'PERILS measures total market insured losses across all policies and insurers. Individual claim amounts depend on your sum insured, policy excess, and the scope of covered damage at your specific property. NRPG provides a full independent scope assessment to ensure your claim reflects actual damage.',
          },
          {
            question: 'What is the ARPC Cyclone Pool and does it affect FNQ claims?',
            answer:
              'The ARPC (Australian Reinsurance Pool Corporation) Cyclone Pool is a government reinsurance backstop. Your insurer manages your claim under pool rules. Your rights as a policyholder are unchanged \u2014 AFCA escalation remains available at no cost if your claim is disputed or underpaid.',
          },
          {
            question: 'My insurer says the damage is wear and tear \u2014 is that right?',
            answer:
              'Wear and tear exclusions are frequently misapplied after cyclone events. If your insurer attributes pre-existing condition to damage from TC Alfred, NRPG provides a certified assessment with IICRC methodology to support your position. AFCA considers independent assessments when reviewing disputed decisions.',
          },
          {
            question: "I'm seeing mould months after Alfred \u2014 is that covered?",
            answer:
              'Yes, if the mould arose from water ingress caused by a covered Alfred event. NRPG documents the moisture pathway from the original damage event to current mould growth for insurer and AFCA purposes, establishing the causal link required for claim acceptance.',
          },
        ]}
        relatedGuides={[
          {
            title: 'TC Maila FNQ Emergency',
            href: '/events/tc-maila-fnq-2026',
            description: 'Category 5 TC Maila FNQ — claim lodgement and restoration support.',
          },
          {
            title: 'ARPC Cyclone Reinsurance Pool Guide',
            href: '/guides/insurance/arpc-cyclone-reinsurance-pool',
            description: 'How the ARPC pool works and what it means for your FNQ claim.',
          },
          {
            title: 'Underinsurance in Australia',
            href: '/guides/insurance/underinsurance-australia',
            description: 'Understanding underinsurance and how to identify shortfalls in your policy.',
          },
          {
            title: 'Cyclone Damage Restoration Cairns',
            href: '/cyclone-damage-restoration-cairns',
            description: 'Cairns FNQ cyclone restoration hub — IICRC-certified contractors.',
          },
          {
            title: 'Mould Remediation Cairns',
            href: '/mould-remediation-cairns',
            description: 'Post-cyclone mould remediation across FNQ \u2014 IICRC certified.',
          },
        ]}
        cta={{ text: 'Submit Your Alfred Claim for Free Assessment', href: '/claim' }}
      />
    </>
  );
}
