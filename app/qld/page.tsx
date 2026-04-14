import { Metadata } from 'next';
import Script from 'next/script';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-605: Queensland State Hub — URGENT, 27 Apr hardship deadline
 *
 * Active events:
 * - QLD Floods March 2026 — Personal Hardship Assistance deadline 27 April 2026
 * - TC Maila Cape York approaching
 *
 * ACL s18 compliant — no guarantee language, no first-person business language.
 * No IICRC standards reproductions.
 */

export const metadata: Metadata = {
  title: 'Queensland Disaster Recovery & Insurance Claim Support | QLD Hub',
  description:
    'Queensland disaster recovery hub. QLD Floods March 2026 Personal Hardship Assistance closes 27 April 2026. TC Maila approaching Cape York. IICRC-certified restoration contractors across Bundaberg, Cairns, Townsville, Mackay, Rockhampton, Gold Coast.',
  keywords:
    'Queensland disaster recovery, QLD flood claims 2026, Queensland insurance claim support, Personal Hardship Assistance QLD, TC Maila Cape York, Bundaberg flood, Cairns cyclone, IICRC certified Queensland',
  openGraph: {
    title: 'Queensland Disaster Recovery & Insurance Claim Support | QLD Hub',
    description:
      'Queensland disaster recovery hub. QLD Floods March 2026 hardship assistance closes 27 April 2026. TC Maila approaching Cape York. IICRC-certified restoration contractors statewide.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Queensland Disaster Recovery Hub')}&city=${encodeURIComponent('Queensland')}&service=disaster-recovery`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/qld`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/qld/#professionalservice`,
  name: `${NAP.name} — Queensland`,
  url: `${NAP.url}/qld`,
  description:
    'IICRC-certified disaster restoration and insurance claim support across Queensland. Servicing Bundaberg, Cairns, Townsville, Mackay, Rockhampton, Gold Coast and all QLD regions.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: [
    { '@type': 'State', name: 'Queensland' },
    { '@type': 'City', name: 'Brisbane' },
    { '@type': 'City', name: 'Cairns' },
    { '@type': 'City', name: 'Townsville' },
    { '@type': 'City', name: 'Bundaberg' },
    { '@type': 'City', name: 'Mackay' },
    { '@type': 'City', name: 'Rockhampton' },
    { '@type': 'City', name: 'Gold Coast' },
  ],
  address: {
    '@type': 'PostalAddress',
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: NAP.url },
    { '@type': 'ListItem', position: 2, name: 'Queensland', item: `${NAP.url}/qld` },
  ],
};

export default function QLDHubPage() {
  return (
    <>
      <Script
        id="qld-professionalservice"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <Script
        id="qld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AgGuidePageTemplate
        category="State Hub"
        title="Queensland Disaster Recovery Hub"
        subtitle="Active events: QLD Floods March 2026 (Personal Hardship Assistance closes 27 April 2026) and TC Maila approaching Cape York. IICRC-certified restoration contractors across Bundaberg, Cairns, Townsville, Mackay, Rockhampton, and Gold Coast."
        gradient="linear-gradient(135deg, #6B1C1C 0%, #9B2335 100%)"
        icon={<MapPin className="h-10 w-10" />}
        lastReviewed="2026-04-14"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Queensland' },
        ]}
        sections={[
          {
            heading: 'URGENT: QLD Floods March 2026 — Government Assistance Closes 27 April 2026',
            body: (
              <>
                <div
                  style={{
                    backgroundColor: '#fff1f2',
                    border: '2px solid #e11d48',
                    borderRadius: '6px',
                    padding: '0.75rem 1rem',
                    marginBottom: '1rem',
                    fontWeight: 600,
                  }}
                >
                  <strong style={{ color: '#be123c' }}>Deadline: 27 April 2026</strong>
                  {' '}— QLD Personal Hardship Assistance for the March 2026 floods closes on this date.
                  Applications must be submitted before midnight. Insurance claims have no equivalent deadline.
                </div>
                <p>
                  Queensland floods in March 2026 affected a broad swathe of the state, with significant
                  impacts in Bundaberg, Rockhampton, and surrounding LGAs. The Queensland Government activated
                  Personal Hardship Assistance, DRFA, and Queensland Reconstruction Authority support programs
                  for eligible residents in declared disaster areas.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The <strong>27 April 2026 deadline applies to government assistance programs only</strong>.
                  Insurance claims under your home or contents policy are not subject to this government
                  program deadline — standard policy lodgement timeframes apply, typically 30&ndash;90 days
                  from discovery of damage.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>QLD Personal Hardship Assistance</strong> — emergency and essential household
                    support for eligible flood-affected residents.{' '}
                    <a
                      href="https://www.disaster.qld.gov.au/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      disaster.qld.gov.au
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>DRFA (Disaster Recovery Funding Arrangements)</strong> — infrastructure and
                    individual assistance for declared LGAs.{' '}
                    <a
                      href="https://www.qra.qld.gov.au/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      qra.qld.gov.au
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>QRA Structural Assistance Grant — up to $80,000</strong> for eligible
                    homeowners to repair disaster-damaged dwellings to a safe and habitable standard.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#555' }}>
                  Check current eligibility and activation status at official Queensland Government sources
                  before applying. NRPG is a restoration and claim support service and does not administer
                  government grants.
                </p>
              </>
            ),
          },
          {
            heading: 'TC Maila — Cape York Approaching',
            body: (
              <>
                <p>
                  Tropical Cyclone Maila is tracking towards Cape York Peninsula and Far North Queensland.
                  Residents in Cairns, Cape York, and surrounding communities should monitor BOM advisories
                  and follow Queensland Government emergency guidance.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Certified restoration contractors are on standby across FNQ for post-Maila deployment.
                  Property damage assessments, cyclone drying protocols, and insurance documentation can
                  be initiated within 24 hours of safe access to affected areas.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>BOM Cyclone Tracker:</strong>{' '}
                    <a
                      href="https://www.bom.gov.au/cyclone/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      bom.gov.au/cyclone
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>QLD Disaster Management:</strong>{' '}
                    <a
                      href="https://www.disaster.qld.gov.au/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      disaster.qld.gov.au
                    </a>
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  See the full TC Maila event page for claim lodgement and contractor dispatch:{' '}
                  <a href="/events/cyclone-maila-cape-york-fnq-2026">
                    TC Maila Cape York FNQ 2026
                  </a>
                  .
                </p>
              </>
            ),
          },
          {
            heading: 'QLD Flood Claims — Insurance Support',
            body: (
              <>
                <p>
                  Flood damage claims in Queensland frequently involve disputes over coverage scope,
                  moisture assessment, mould arising after incomplete drying, and insurer-appointed
                  assessor underscoping. IICRC-certified contractors provide independent documentation
                  that supports both initial claims and AFCA escalations.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Bundaberg flood damage claims:</strong>{' '}
                    <a href="/qld/bundaberg-flood-damage-claims">
                      Bundaberg Flood Damage Claims Hub
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>QLD Floods March 2026 event page:</strong>{' '}
                    <a href="/events/queensland-floods-2026">
                      Queensland Floods 2026
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>AFCA claims escalation:</strong>{' '}
                    <a
                      href="https://www.afca.org.au/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      afca.org.au
                    </a>{' '}
                    — free, independent dispute resolution for insurance claims.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.875rem', color: '#555' }}>
                  NRPG collects your contact and property details to coordinate contractor matching. See our{' '}
                  <a href="/privacy">Privacy Policy</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'Queensland Coverage Areas',
            body: (
              <>
                <p>
                  Certified restoration contractors operate across all Queensland LGAs, with concentrated
                  capacity in:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Bundaberg</strong> — flood and storm damage restoration, insurance documentation
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Cairns</strong> — cyclone, flood, and mould remediation; FNQ contractor network
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Townsville</strong> — flood, storm, and cyclone damage; 24/7 emergency response
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Mackay</strong> — cyclone and storm damage restoration, claim documentation
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Rockhampton</strong> — flood restoration and insurance claim support
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Gold Coast</strong> — storm, hail, and flood damage; metropolitan contractor network
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Brisbane Metro</strong> — all disaster types; rapid dispatch available
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Cape York Peninsula</strong> — cyclone specialist contractors; FNQ remote response
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'The 27 April 2026 deadline — does it apply to my insurance claim?',
            answer:
              'No. The 27 April 2026 deadline applies to Queensland Government hardship assistance programs, not insurance claims. Insurance claims are lodged directly with your insurer and are subject to standard policy timeframes, typically 30\u201390 days from discovery of damage.',
          },
          {
            question: 'How do I apply for QLD Personal Hardship Assistance?',
            answer:
              'Apply through disaster.qld.gov.au or qra.qld.gov.au before 27 April 2026. Eligibility depends on your LGA being declared a disaster area and your specific household circumstances. NRPG does not administer government assistance programs.',
          },
          {
            question: 'My insurer\u2019s assessor said the damage is less than I expect. What can I do?',
            answer:
              'Request an independent scope assessment from a certified IICRC contractor. An independent assessment documents the full extent of damage using IICRC S500:2025 moisture measurement and drying protocols. This documentation supports your position if you escalate to AFCA.',
          },
          {
            question: 'TC Maila is approaching \u2014 can I lodge a claim before it hits?',
            answer:
              'You can register now and a certified contractor will be dispatched once safe access is available post-storm. Insurance claims are lodged after damage is assessed. Register at /claim to be first in the response queue for your area.',
          },
          {
            question: 'Mould has appeared months after the QLD floods. Is that covered?',
            answer:
              'Yes, if the mould arose from flood water ingress during a covered event. NRPG documents the moisture pathway from the original flood damage to current mould growth for insurer and AFCA purposes, establishing the causal link required for supplementary claim acceptance.',
          },
        ]}
        relatedGuides={[
          {
            title: 'QLD Floods 2026 Event Page',
            href: '/events/queensland-floods-2026',
            description: 'Full event details, claim support, and government assistance for QLD March 2026 floods.',
          },
          {
            title: 'TC Maila Cape York FNQ 2026',
            href: '/events/cyclone-maila-cape-york-fnq-2026',
            description: 'TC Maila Cape York tracking, claim lodgement, and FNQ contractor dispatch.',
          },
          {
            title: 'Bundaberg Flood Damage Claims',
            href: '/qld/bundaberg-flood-damage-claims',
            description: 'Bundaberg flood damage claims hub — IICRC-certified contractors.',
          },
          {
            title: 'Ex-TC Alfred FNQ Recovery',
            href: '/events/cyclone-alfred-fnq-2026',
            description: 'Ex-TC Alfred final PERILS AU$1.877 billion — supplementary and disputed claim support.',
          },
          {
            title: 'IICRC S500 Water Damage Standard',
            href: '/standards/iicrc-s500-water-damage',
            description: 'What IICRC S500:2025 means for your flood or water damage claim.',
          },
        ]}
        cta={{ text: 'Lodge a Queensland Claim Assessment', href: '/claim' }}
      />
    </>
  );
}
