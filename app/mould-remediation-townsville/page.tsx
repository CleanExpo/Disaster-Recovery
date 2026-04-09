import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-480: Mould Remediation Townsville
 *
 * Created: 9 April 2026
 * Context: Post-TC Maila mould surge — Townsville corridor properties that
 * sustained water ingress are now in the critical 24-72 hour window before
 * mould establishes. Significant proportion of older fibro construction
 * creates specialist remediation requirements. ARPC Cyclone Pool applies.
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Townsville | TC Maila Post-Cyclone Specialists',
  description:
    'IICRC-certified mould remediation in Townsville and North Queensland. TC Maila post-cyclone mould specialists. 24-hour response in tropical conditions. Lodge your claim 24/7.',
  keywords:
    'mould remediation townsville, mould after cyclone townsville, TC Maila mould townsville, black mould townsville NQ, post cyclone mould remediation NQ',
  openGraph: {
    title: 'Mould Remediation Townsville | TC Maila Post-Cyclone Specialists',
    description:
      'IICRC-certified mould remediation in Townsville and North Queensland. TC Maila post-cyclone mould specialists. 24-hour response in tropical conditions. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Mould+Remediation&city=Townsville&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-townsville`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-townsville/#localbusiness`,
  name: `${NAP.name} Townsville`,
  url: `${NAP.url}/mould-remediation-townsville`,
  description:
    'IICRC S520-certified mould remediation contractors serving Townsville and North Queensland. TC Maila post-cyclone mould specialists. Fibro and older construction specialists. Full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Townsville',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Townsville',
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
  name: 'Mould Remediation Townsville',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Townsville' },
  serviceType: 'Mould Remediation',
  description:
    'IICRC S520-certified mould remediation across Townsville and NQ. Post-TC Maila cyclone mould specialists. Fibro wall assessment, thermal imaging moisture mapping, HEPA air scrubbing, and post-remediation clearance testing.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly does mould establish in Townsville after TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Townsville\u2019s tropical climate \u2014 averages 29\u00b0C with 65-75% humidity \u2014 mould establishes within 24-48 hours on wet materials. Post-TC Maila, elevated humidity during the recovery period (often above 80%) further accelerates this timeline. Act within 24 hours of receiving the all-clear.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does older Townsville construction (fibro) need specialist mould treatment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes \u2014 fibrous cement (fibro) absorbs water and supports mould growth differently from modern materials. Older fibro may also contain asbestos, requiring specialist assessment before any cutting or disturbance. NRPG contractors are equipped to identify asbestos-risk materials and coordinate licensed assessors where required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is TC Maila mould covered by Townsville home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould caused directly by TC Maila water ingress is covered as part of the cyclone damage claim through the ARPC Cyclone Pool. Lodge as part of your TC Maila claim and request IICRC S520 scope documentation for mould. Insurer disputes about mould coverage can be escalated to AFCA with NRPG documentation support.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is IICRC S520 and why does it matter for my Townsville claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC S520 is the standard for mould remediation in Australia. It specifies containment, HEPA filtration, antimicrobial treatment, and post-remediation clearance testing protocols. Townsville insurers require S520-compliant documentation for mould claim sign-off \u2014 non-certified work cannot produce this documentation.',
      },
    },
  ],
};

export default function MouldRemediationTownsvillePage() {
  return (
    <>
      <Script
        id="mrtv-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrtv-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrtv-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Townsville"
        subtitle="IICRC S520-certified mould remediation across Townsville and North Queensland. TC Maila post-cyclone mould specialists. In tropical conditions, mould establishes within 24-48 hours — act immediately."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-13"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Townsville' },
        ]}
        sections={[
          {
            heading: "Post-TC Maila Mould — Townsville's Risk Window",
            body: (
              <>
                <p>
                  Townsville experiences more days above 30&deg;C than any other major Australian city,
                  with a dry season (May-October) that creates deceivingly &quot;safe&quot; conditions
                  for mould &mdash; only for mould to re-emerge in the wet season or following a
                  cyclone event. TC Maila&apos;s impact on the Townsville corridor means properties
                  that sustained water ingress from wind-driven rain, breached roofing, or storm surge
                  are now in the critical 24-72 hour window before mould establishes.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Townsville&apos;s post-cyclone humidity (above 80% during recovery periods) combined
                  with average temperatures above 28&deg;C creates ideal mould propagation conditions.
                  NRPG IICRC S520-certified contractors are pre-positioned across the Townsville LGA
                  for immediate post-clearance mould prevention response.
                </p>
              </>
            ),
          },
          {
            heading: "Townsville's Hidden Mould Risk — Fibro and Older Construction",
            body: (
              <>
                <p>
                  A significant proportion of Townsville&apos;s residential stock is older fibrous
                  cement (fibro) construction &mdash; a material that absorbs and retains water more
                  readily than modern cladding. Fibro sheeting that has sustained cyclone water damage
                  requires careful assessment: contaminated fibro can harbour mould at the substrate
                  level, and older fibro may contain asbestos, requiring specialist removal protocols.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG contractors are equipped for asbestos-adjacent fibro assessment and can
                  coordinate licensed asbestos assessors if required before remediation proceeds.
                </p>
              </>
            ),
          },
          {
            heading: 'Townsville Mould Costs 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-cyclone water ingress mould (single storey):</strong>{' '}
                    $5,000&ndash;$22,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Fibro wall mould assessment + remediation:</strong>{' '}
                    $8,000&ndash;$35,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Roof space mould:</strong> $3,000&ndash;$10,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Full property post-inundation:</strong> $18,000&ndash;$70,000+
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Townsville Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  24-hour response across Townsville and surrounds:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>City/Inner:</strong> Townsville City, South Townsville, North Ward, Belgian
                  Gardens, Mysterton, Mundingburra, Hyde Park, Rosslea
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Beaches:</strong> Burdell, Bohle Plains, Deeragun, Rasmussen,
                  Cranbrook, Kirwan, Thuringowa, Kelso
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern:</strong> Aitkenvale, Currajong, Heatley, Hermit Park, Garbutt,
                  Stuart, Wulguru, Woodstock
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Islands:</strong> Magnetic Island &mdash; response coordinated via ferry
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly does mould establish in Townsville after TC Maila?',
            answer:
              "In Townsville's tropical climate — averages 29°C with 65-75% humidity — mould establishes within 24-48 hours on wet materials. Post-TC Maila, elevated humidity during the recovery period (often above 80%) further accelerates this timeline. Act within 24 hours of receiving the all-clear.",
          },
          {
            question: 'Does older Townsville construction (fibro) need specialist mould treatment?',
            answer:
              'Yes — fibrous cement (fibro) absorbs water and supports mould growth differently from modern materials. Older fibro may also contain asbestos, requiring specialist assessment before any cutting or disturbance. NRPG contractors are equipped to identify asbestos-risk materials and coordinate licensed assessors where required.',
          },
          {
            question: 'Is TC Maila mould covered by Townsville home insurance?',
            answer:
              'Mould caused directly by TC Maila water ingress is covered as part of the cyclone damage claim through the ARPC Cyclone Pool. Lodge as part of your TC Maila claim and request IICRC S520 scope documentation for mould. Insurer disputes about mould coverage can be escalated to AFCA with NRPG documentation support.',
          },
          {
            question: 'What is IICRC S520 and why does it matter for my Townsville claim?',
            answer:
              'IICRC S520 is the standard for mould remediation in Australia. It specifies containment, HEPA filtration, antimicrobial treatment, and post-remediation clearance testing protocols. Townsville insurers require S520-compliant documentation for mould claim sign-off — non-certified work cannot produce this documentation.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Cyclone Damage Restoration Townsville',
            href: '/cyclone-damage-restoration-townsville',
            description: 'Emergency cyclone damage restoration across Townsville and NQ.',
          },
          {
            title: 'Water Damage Restoration Townsville',
            href: '/water-damage-restoration-townsville',
            description: 'Emergency water damage restoration across Townsville.',
          },
          {
            title: 'TC Maila Recovery 2026',
            href: '/events/tc-maila-recovery-2026',
            description: 'If your TC Maila claim is stuck or underpaid, NRPG can escalate.',
          },
          {
            title: 'Mould Remediation Services',
            href: '/services/mould-remediation',
            description: 'Our national mould remediation service overview.',
          },
        ]}
        cta={{ text: 'Get Emergency Mould Help Now', href: '/claim' }}
      />
    </>
  );
}
