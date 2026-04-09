import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-479: Mould Remediation Cairns
 *
 * Created: 9 April 2026
 * Context: Post-TC Maila mould surge — massive search category 2-6 weeks
 * after TC Maila landfall. Cairns' tropical climate (30°C+, 70-85% humidity)
 * means mould establishes within 24 hours. This is a time-critical extension
 * of the cyclone restoration process for all FNQ properties.
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Cairns | TC Maila Post-Cyclone Mould Specialists',
  description:
    'IICRC-certified mould remediation in Cairns and Far North Queensland. TC Maila post-cyclone mould specialists. Tropical heat and humidity make 24-hour response critical. Lodge your claim 24/7.',
  keywords:
    'mould remediation cairns, mould after cyclone cairns, TC Maila mould cairns, mould removal FNQ, black mould cairns tropical, post cyclone mould cairns',
  openGraph: {
    title: 'Mould Remediation Cairns | TC Maila Post-Cyclone Mould Specialists',
    description:
      'IICRC-certified mould remediation in Cairns and Far North Queensland. TC Maila post-cyclone mould specialists. Tropical heat and humidity make 24-hour response critical. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Mould+Remediation&city=Cairns&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-cairns`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-cairns/#localbusiness`,
  name: `${NAP.name} Cairns`,
  url: `${NAP.url}/mould-remediation-cairns`,
  description:
    'IICRC S520-certified mould remediation contractors serving Cairns and Far North Queensland. TC Maila post-cyclone mould specialists. Tropical antimicrobial formulations, HEPA air scrubbing, and full insurance documentation.',
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
  name: 'Mould Remediation Cairns',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Cairns' },
  serviceType: 'Mould Remediation',
  description:
    'IICRC S520-certified mould remediation across Cairns and FNQ. Post-TC Maila tropical mould specialists. Thermal imaging moisture mapping, HEPA air scrubbing, tropical antimicrobial treatment, containment barriers, and post-remediation clearance testing.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly does mould grow after TC Maila water damage in Cairns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Cairns\u2019 tropical conditions \u2014 30\u00b0C+, 70-85% humidity \u2014 mould establishes on wet materials within 24 hours. Post-cyclone, the combination of high temperatures, saturated materials, and organic debris from wind-driven rain creates ideal mould propagation conditions. Act within 24 hours of receiving the all-clear.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is post-TC Maila mould covered by my Cairns home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes \u2014 mould that develops as a direct consequence of TC Maila cyclone damage is covered under the cyclone and water ingress provisions of most FNQ home insurance policies, processed through the ARPC Cyclone Pool. Lodge as part of your TC Maila claim and request IICRC S520-certified mould remediation specifically.',
      },
    },
    {
      '@type': 'Question',
      name: 'My Cairns property was dried \u2014 why is mould still appearing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Incomplete structural drying \u2014 inadequate equipment, shortened drying period, or non-certified contractors \u2014 leaves residual moisture in wall cavities, roof spaces, and subfloor. In Cairns\u2019 tropical climate, this residual moisture supports ongoing mould growth for weeks or months. NRPG performs thermal imaging moisture mapping to identify wet areas before S520 remediation begins.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Pool cover mould remediation in Cairns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes \u2014 mould remediation that is a direct consequence of covered cyclone damage is covered through the pool. Your insurer manages the mould claim as part of the cyclone event. NRPG provides IICRC S520-certified scope documentation that satisfies ARPC pool claim requirements.',
      },
    },
  ],
};

export default function MouldRemediationCairnsPage() {
  return (
    <>
      <Script
        id="mrcns-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrcns-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrcns-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Cairns"
        subtitle="IICRC S520-certified mould remediation across Cairns and Far North Queensland. Post-TC Maila cyclone mould specialists. In tropical conditions, mould establishes within 24 hours — act immediately."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-13"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Cairns' },
        ]}
        sections={[
          {
            heading: "Post-TC Maila Mould — Cairns' Tropical Urgency",
            body: (
              <>
                <p>
                  TC Maila has impacted the Cairns and FNQ coast. In the days and weeks following TC
                  Maila, mould is the single greatest secondary risk for property owners across the
                  LGA. Cairns&apos; tropical climate (daily maximum temperatures 28-34&deg;C, relative
                  humidity 70-85%) means mould can establish within 24 hours in materials wet from
                  cyclone water ingress.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The window between &quot;building is wet&quot; and &quot;mould is entrenched&quot;
                  is dramatically shorter in Cairns than in any other major Australian city. If your
                  Cairns property sustained TC Maila water damage, mould remediation is not optional
                  &mdash; it is a time-critical extension of the restoration process. Lodge immediately
                  for 60-minute post-clearance emergency response.
                </p>
              </>
            ),
          },
          {
            heading: 'Cyclone Mould vs Standard Mould — What\u2019s Different in FNQ',
            body: (
              <>
                <p>
                  Post-cyclone mould in FNQ is distinct from standard residential mould in three ways:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Scale</strong> &mdash; cyclone water ingress typically affects multiple
                    rooms, roof spaces, and wall cavities simultaneously, creating a far larger mould
                    substrate than a single burst pipe.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category</strong> &mdash; wind-driven rain that penetrates through building
                    breaches may carry organic matter (vegetation, debris) that accelerates mould
                    growth compared to clean water.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Speed</strong> &mdash; Cairns&apos; tropical climate means the 24-48 hour
                    window before mould establishes is non-negotiable.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  NRPG IICRC S520-certified contractors perform emergency make-safe and initial drying
                  within 60 minutes of clearance to prevent mould becoming the dominant issue.
                </p>
              </>
            ),
          },
          {
            heading: 'Mould Remediation Cost — Cairns Post-TC Maila 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-cyclone wind-driven rain ingress mould:</strong> $5,000&ndash;$25,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Multi-room structural mould from major water ingress:</strong>{' '}
                    $15,000&ndash;$60,000+
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Roof space mould (common in cyclone events):</strong>{' '}
                    $3,000&ndash;$12,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Full property post-inundation mould:</strong> $20,000&ndash;$80,000+
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  <em>
                    Note: Post-cyclone pricing reflects tropical remediation requirements (enhanced HEPA
                    equipment, higher drying loads, tropical antimicrobial formulations).
                  </em>
                </p>
              </>
            ),
          },
          {
            heading: 'Cairns Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  60-minute post-clearance response across Cairns and FNQ:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>City/Inner:</strong> Cairns City, Cairns North, Manunda, Westcourt, Manoora,
                  Edge Hill, Whitfield, Mooroobool
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Beaches:</strong> Machans Beach, Holloways Beach, Yorkeys Knob,
                  Trinity Beach, Trinity Park, Kewarra Beach, Clifton Beach, Palm Cove
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern:</strong> Gordonvale, Edmonton, Woree, Bentley Park, Mount Sheridan,
                  Brinsmead, Freshwater, Redlynch, Smithfield, Caravonica
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly does mould grow after TC Maila water damage in Cairns?',
            answer:
              "In Cairns' tropical conditions — 30°C+, 70-85% humidity — mould establishes on wet materials within 24 hours. Post-cyclone, the combination of high temperatures, saturated materials, and organic debris from wind-driven rain creates ideal mould propagation conditions. Act within 24 hours of receiving the all-clear.",
          },
          {
            question: 'Is post-TC Maila mould covered by my Cairns home insurance?',
            answer:
              'Yes — mould that develops as a direct consequence of TC Maila cyclone damage is covered under the cyclone and water ingress provisions of most FNQ home insurance policies, processed through the ARPC Cyclone Pool. Lodge as part of your TC Maila claim and request IICRC S520-certified mould remediation specifically.',
          },
          {
            question: 'My Cairns property was dried — why is mould still appearing?',
            answer:
              "Incomplete structural drying — inadequate equipment, shortened drying period, or non-certified contractors — leaves residual moisture in wall cavities, roof spaces, and subfloor. In Cairns' tropical climate, this residual moisture supports ongoing mould growth for weeks or months. NRPG performs thermal imaging moisture mapping to identify wet areas before S520 remediation begins.",
          },
          {
            question: 'Does the ARPC Cyclone Pool cover mould remediation in Cairns?',
            answer:
              'Yes — mould remediation that is a direct consequence of covered cyclone damage is covered through the pool. Your insurer manages the mould claim as part of the cyclone event. NRPG provides IICRC S520-certified scope documentation that satisfies ARPC pool claim requirements.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Cyclone Damage Restoration Cairns',
            href: '/cyclone-damage-restoration-cairns',
            description: 'Emergency cyclone damage restoration across Cairns and FNQ.',
          },
          {
            title: 'Water Damage Restoration Cairns',
            href: '/water-damage-restoration-cairns',
            description: 'Emergency water damage restoration across Cairns.',
          },
          {
            title: 'TC Maila Recovery 2026',
            href: '/events/tc-maila-recovery-2026',
            description: 'If your TC Maila claim is stuck or underpaid, NRPG can escalate.',
          },
          {
            title: 'ARPC Cyclone Reinsurance Pool',
            href: '/guides/insurance/arpc-cyclone-reinsurance-pool',
            description: 'How the ARPC Cyclone Pool works for FNQ property owners.',
          },
        ]}
        cta={{ text: 'Get Emergency Mould Help Now', href: '/claim' }}
      />
    </>
  );
}
