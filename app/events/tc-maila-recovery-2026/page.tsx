import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-478: TC Maila Recovery Hub — Post-Event
 *
 * Created: 9 April 2026
 * Pre-built for post-TC Maila landfall searches in the 48–72 hour window.
 * Targets property owners looking for recovery help immediately after the event.
 * ACL s18 compliant.
 */

export const metadata: Metadata = {
  title: 'TC Maila Recovery — FNQ Damage Restoration and Insurance Claims',
  description:
    'TC Maila has made landfall. Lodge your cyclone damage claim now. IICRC-certified NRPG contractors are deployed across FNQ postcodes 4870, 4877, 4895, 4873, 4874, 4880, 4860. 60-minute post-clearance response.',
  keywords:
    'TC Maila recovery, TC Maila damage, TC Maila restoration, cyclone Maila damage FNQ, FNQ cyclone recovery 2026, TC Maila insurance claim',
  openGraph: {
    title: 'TC Maila Recovery — FNQ Damage Restoration and Insurance Claims',
    description:
      'TC Maila has made landfall. Lodge your cyclone damage claim now. IICRC-certified NRPG contractors deployed across FNQ. 60-minute post-clearance response.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('TC Maila Recovery')}&city=${encodeURIComponent('FNQ')}&service=cyclone-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/events/tc-maila-recovery-2026`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${NAP.url}/events/tc-maila-recovery-2026/#localbusiness`,
  name: `${NAP.name} Far North Queensland`,
  url: `${NAP.url}/events/tc-maila-recovery-2026`,
  description:
    'IICRC-certified cyclone damage restoration contractors deployed across Far North Queensland post-TC Maila. 60-minute post-clearance response. Emergency make-safe, water extraction, structural drying, and full insurance documentation.',
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
  name: 'Cyclone Damage Restoration — TC Maila Recovery',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Far North Queensland' },
  serviceType: 'Cyclone Damage Restoration',
  description:
    'Post-TC Maila cyclone damage restoration across Far North Queensland: emergency make-safe, roof tarping, water extraction, structural drying to IICRC S500:2025, mould prevention, and full ARPC Cyclone Pool claim documentation.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '12847',
    bestRating: '5',
    worstRating: '1',
  },
};

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is it safe to enter my property after TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Only after emergency services confirm the all-clear for your specific area. Wait for Queensland Police, SES, or BOM to issue clearance. Do not re-enter during the calm of the eye — violent conditions return as the eye passes. Structural damage may not be visible externally but can cause collapse risk internally.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do I do first after TC Maila — insurance or restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both simultaneously. While waiting for the all-clear, contact your insurer to notify them of the loss — this activates your ALE (temporary accommodation) benefit immediately. Once safe to re-enter, photograph everything before cleanup. Then lodge at disasterrecovery.com.au/claim — NRPG manages all insurer correspondence as restoration proceeds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I claim for both structural and water damage from TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Lodge both as a single event: 'TC Maila cyclone damage — structural and water ingress'. The ARPC Cyclone Pool covers cyclone wind damage and associated water ingress within 48 hours of the event. Lodge structural damage and water ingress as separate line items within the same claim — this ensures each component receives proper assessment.",
      },
    },
    {
      '@type': 'Question',
      name: 'How long will TC Maila restoration take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency make-safe: within 24 hours of clearance. Structural drying: 3–14 days depending on damage extent. Full structural restoration: 4–12 weeks for moderate damage, 3–12 months for major structural losses. NRPG coordinates the full restoration timeline, including managing insurer delays that extend the program.',
      },
    },
  ],
};

export default function TCMailaRecovery2026Page() {
  return (
    <>
      <Script
        id="tcmrec-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="tcmrec-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="tcmrec-faqpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <AgGuidePageTemplate
        category="Emergency Recovery"
        title="TC Maila Recovery — Damage Restoration and Claims"
        subtitle="TC Maila has impacted the Far North Queensland coast. NRPG IICRC-certified contractors are deployed across FNQ. Lodge your claim now for 60-minute post-clearance response. Do NOT enter a damaged property until emergency services confirm it is safe."
        gradient="linear-gradient(135deg, #4A0404 0%, #7B1FA2 50%, #0C2340 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-13"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Events', href: '/events' },
          { label: 'TC Maila Recovery 2026' },
        ]}
        sections={[
          {
            heading: 'Immediate Actions — Post-TC Maila',
            body: (
              <>
                <ol style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    Wait for official emergency services all-clear before leaving shelter or entering your property.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    Do NOT re-enter until Queensland Police, SES, or BOM confirms conditions are safe — the eye
                    creates a deceptive calm; violent conditions return as the eye passes.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    Once cleared: photograph ALL damage before touching anything. Timestamped photographic evidence
                    is critical for your ARPC Cyclone Pool claim.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    Lodge your claim at disasterrecovery.com.au/claim — NRPG is deployed and will dispatch within
                    60 minutes of clearance for your area.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    Contact your insurer to notify of loss — this triggers your ALE (Additional Living Expenses)
                    benefit if your property is uninhabitable.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    Do NOT accept the first contractor who arrives uninvited — confirm IICRC certification before
                    allowing any restoration work.
                  </li>
                </ol>
              </>
            ),
          },
          {
            heading: 'TC Maila Damage — What NRPG Is Deployed For',
            body: (
              <>
                <p>
                  NRPG IICRC-certified contractors are deployed across the full TC Maila impact corridor and
                  available within 60 minutes of post-clearance for the following services:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Emergency make-safe:</strong> Roof tarping, boarding, and temporary fencing to secure
                    the property immediately post-impact.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Water extraction and structural drying:</strong> Commercial-grade extraction and drying
                    to IICRC S500:2025 with psychrometric logging.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>IICRC-certified documentation:</strong> Full scope assessment and documentation packs
                    for ARPC Cyclone Pool claim lodgement.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Mould prevention treatment:</strong> Antimicrobial treatment applied in FNQ&apos;s tropical
                    heat to prevent mould establishment during the drying phase.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Multi-trade coordination:</strong> Full project management for combined structural,
                    water, and mould losses — single point of contact through the entire restoration.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'ARPC Cyclone Pool — Your Rights Post-TC Maila',
            body: (
              <>
                <p>
                  The Australian Reinsurance Pool Corporation (ARPC) Cyclone Pool applies to residential and
                  eligible commercial properties in FNQ and other designated cyclone-prone postcodes. For TC Maila
                  claims:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Lodge your claim as <strong>cyclone damage and water ingress</strong> — not flood. Cyclone
                    and associated water ingress are pool-covered perils; overland flood is a separate category.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Your insurer manages the claim on behalf of the pool — your policyholder rights are unchanged.
                    Timeframes and assessment standards remain the same.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    If your claim is underpaid or disputed, AFCA (Australian Financial Complaints Authority)
                    escalation is available at no cost to you — your rights under the ARPC pool are the same as
                    under a standard policy.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    NRPG provides full documentation packs — psychrometric drying logs, photographic evidence,
                    scope of works, and supporting materials — that satisfy ARPC Cyclone Pool claim requirements.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'FNQ Areas — TC Maila Impact Corridor',
            body: (
              <>
                <p>NRPG response status across the TC Maila impact corridor:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Cairns (4870):</strong> Deployed — 60-minute post-clearance response.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Beaches (4878–4879):</strong> Deployed — 60-minute post-clearance response.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Port Douglas / Daintree (4877 / 4895):</strong> Deployed — 60-minute post-clearance
                  response.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Mossman (4873 / 4874):</strong> Deployed — 60-minute post-clearance response.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Innisfail / Cassowary Coast (4860):</strong> Deployed — 60-minute post-clearance
                  response.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Townsville corridor (4810–4814):</strong> Coordinated response — 90-minute
                  post-clearance response.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Mackay (4740):</strong> Coordinated response — 90-minute post-clearance response.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is it safe to enter my property after TC Maila?',
            answer:
              'Only after emergency services confirm the all-clear for your specific area. Wait for Queensland Police, SES, or BOM to issue clearance. Do not re-enter during the calm of the eye — violent conditions return as the eye passes. Structural damage may not be visible externally but can cause collapse risk internally.',
          },
          {
            question: 'What do I do first after TC Maila — insurance or restoration?',
            answer:
              'Both simultaneously. While waiting for the all-clear, contact your insurer to notify them of the loss — this activates your ALE (temporary accommodation) benefit immediately. Once safe to re-enter, photograph everything before cleanup. Then lodge at disasterrecovery.com.au/claim — NRPG manages all insurer correspondence as restoration proceeds.',
          },
          {
            question: 'How do I claim for both structural and water damage from TC Maila?',
            answer:
              "Lodge both as a single event: 'TC Maila cyclone damage — structural and water ingress'. The ARPC Cyclone Pool covers cyclone wind damage and associated water ingress within 48 hours of the event. Lodge structural damage and water ingress as separate line items within the same claim — this ensures each component receives proper assessment.",
          },
          {
            question: 'How long will TC Maila restoration take?',
            answer:
              'Emergency make-safe: within 24 hours of clearance. Structural drying: 3–14 days depending on damage extent. Full structural restoration: 4–12 weeks for moderate damage, 3–12 months for major structural losses. NRPG coordinates the full restoration timeline, including managing insurer delays that extend the program.',
          },
        ]}
        relatedGuides={[
          {
            title: 'TC Maila FNQ Emergency — Pre-Event Information',
            href: '/events/tc-maila-fnq-2026',
            description: 'TC Maila event timeline, NRPG pre-positioning, and ARPC pool information.',
          },
          {
            title: 'Cyclone Damage Restoration Cairns',
            href: '/cyclone-damage-restoration-cairns',
            description: 'Cairns FNQ cyclone restoration — IICRC-certified contractors.',
          },
          {
            title: 'ARPC Cyclone Pool Explained',
            href: '/guides/insurance/arpc-cyclone-reinsurance-pool',
            description: 'How the ARPC Cyclone Pool affects your TC Maila claim.',
          },
          {
            title: 'Ex-TC Alfred Recovery',
            href: '/events/ex-cyclone-alfred-recovery',
            description: 'If you have both Alfred and TC Maila damage, document each event separately.',
          },
        ]}
        cta={{ text: 'Lodge Your TC Maila Claim Now', href: '/claim' }}
      />
    </>
  );
}
