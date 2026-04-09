import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-477: Mould Remediation Gold Coast
 *
 * Created: 9 April 2026
 * Context: Post-Alfred canal estate mould surge — Gold Coast LGA was one of the
 * highest-density Alfred claim areas. Canal inundation (Category 3) combined with
 * subtropical humidity creates rapid mould propagation. 260km canal network means
 * subfloor and cavity mould is endemic to post-Alfred Gold Coast properties.
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Gold Coast | IICRC S520 Certified Emergency',
  description:
    'Professional mould remediation across the Gold Coast. IICRC S520-certified contractors for post-Alfred, post-storm, and canal estate mould. HEPA remediation, insurance documentation. Lodge your claim 24/7.',
  keywords:
    'mould remediation gold coast, mould removal gold coast, black mould gold coast, mould after flooding gold coast, alfred mould gold coast QLD, mould inspection gold coast',
  openGraph: {
    title: 'Mould Remediation Gold Coast | IICRC S520 Certified Emergency',
    description:
      'Professional mould remediation across the Gold Coast. IICRC S520-certified contractors for post-Alfred, post-storm, and canal estate mould. HEPA remediation, insurance documentation.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Mould+Remediation&city=Gold+Coast&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-gold-coast`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-gold-coast/#localbusiness`,
  name: `${NAP.name} Gold Coast`,
  url: `${NAP.url}/mould-remediation-gold-coast`,
  description:
    'IICRC S520-certified mould remediation contractors serving all Gold Coast suburbs. Post-Alfred canal estate mould specialists. HEPA air scrubbing, thermal imaging, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Gold Coast',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gold Coast',
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
  name: 'Mould Remediation Gold Coast',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Gold Coast' },
  serviceType: 'Mould Remediation',
  description:
    'Professional mould remediation across the Gold Coast. Post-Alfred canal estate specialists. HEPA air scrubbing, thermal imaging, antimicrobial treatment, containment barriers, and post-remediation clearance testing to IICRC S520.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Alfred mould covered by Gold Coast home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — mould directly caused by Alfred storm or water inundation is covered as part of the storm or water event claim. Document causation: photograph the mould, demonstrate it appeared after the Alfred event, provide IICRC-certified scope showing causal link.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do canal estate properties have more mould after flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Canal inundation is Category 3 water — contaminated with organic matter from canal sediment. Category 3 mould growth is accelerated compared to clean water events. Subfloor and wall cavity spaces in canal estates are often partially inundated and not fully accessed during remediation, leaving ongoing mould sources.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can NRPG fix incomplete Alfred remediation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — if a previous contractor dried your property and mould has appeared, NRPG performs thermal imaging moisture assessment to identify residual wet areas. We provide IICRC S520 re-remediation with documentation for supplementary insurer lodgement or AFCA escalation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly does mould grow in the Gold Coast climate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In subtropical Gold Coast conditions (30°C+, 65-80% humidity), mould can establish within 24-48 hours on damp materials. Post-Alfred properties left incompletely dried will typically show visible mould within 3-6 weeks. Lodge immediately — each week of delay makes remediation more extensive and expensive.',
      },
    },
  ],
};

export default function MouldRemediationGoldCoastPage() {
  return (
    <>
      <Script
        id="mrgc-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrgc-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrgc-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Gold Coast"
        subtitle="IICRC S520-certified mould remediation across all Gold Coast suburbs. Post-Alfred specialists. Canal estate mould, tropical humidity remediation, and full insurance documentation. 48-hour response."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Gold Coast' },
        ]}
        sections={[
          {
            heading: 'Gold Coast Mould — Canal Estates, Subtropical Heat, and Alfred',
            body: (
              <>
                <p>
                  The Gold Coast&apos;s 260-kilometre canal network creates a unique mould risk profile for canal
                  estate properties. During Ex-TC Alfred (March 2026), canal levels rose and inundated ground
                  floors across Broadbeach Waters, Clear Island Waters, Mermaid Waters, and Isle of Capri. Canal
                  inundation is Category 3 water — highly contaminated — and incomplete remediation of Category 3
                  events invariably results in mould growth within 2–6 weeks.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Gold Coast&apos;s subtropical humidity (65–80% year-round) means mould propagates faster here
                  than in temperate cities. PERILS confirmed AU$1.877 billion in final Alfred losses — Gold Coast
                  LGA accounted for a significant share.
                </p>
              </>
            ),
          },
          {
            heading: 'Canal Estate Mould — Special Considerations',
            body: (
              <>
                <p>
                  Canal estate properties that sustained Alfred inundation face specific mould risks: subfloor
                  spaces (typically elevated due to flood-prone location) that were partially inundated and not
                  fully dried; cavity walls at ground floor level where Category 3 water penetrated but was not
                  fully extracted; and hardwood or composite flooring that retained moisture at the substrate level
                  even after surface drying.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG IICRC S520-certified contractors use thermal imaging and calibrated moisture meters to map
                  residual moisture in canal estate properties — identifying wet areas that surface inspection
                  misses and that drive ongoing mould growth.
                </p>
              </>
            ),
          },
          {
            heading: 'Mould Remediation Cost — Gold Coast 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-Alfred canal inundation (Category 3):</strong> $15,000–$60,000+ (including
                    subfloor, wall cavities, decontamination)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Subtropical surface mould (single room):</strong> $1,500–$4,500
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Multi-room residential:</strong> $5,000–$22,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Canal estate partial inundation:</strong> $10,000–$40,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-storm water ingress mould:</strong> $3,000–$15,000
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Gold Coast Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>48-hour response across all Gold Coast suburbs:</p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Beachfront:</strong> Surfers Paradise, Broadbeach, Main Beach, Mermaid Beach, Miami,
                  Burleigh Heads, Coolangatta
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Canal Estates:</strong> Broadbeach Waters, Clear Island Waters, Mermaid Waters, Isle of
                  Capri, Sorrento, Bundall, Benowa Waters, Hope Island
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Corridor:</strong> Coomera, Helensvale, Oxenford, Upper Coomera, Pimpama,
                  Ormeau
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Palm Beach, Currumbin, Tugun, Elanora, Varsity Lakes,
                  Robina, Mudgeeraba
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hinterland:</strong> Nerang, Highland Park, Gilston, Mount Tamborine
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Alfred mould covered by Gold Coast home insurance?',
            answer:
              'Yes — mould directly caused by Alfred storm or water inundation is covered as part of the storm or water event claim. Document causation: photograph the mould, demonstrate it appeared after the Alfred event, provide IICRC-certified scope showing causal link.',
          },
          {
            question: 'Why do canal estate properties have more mould after flooding?',
            answer:
              'Canal inundation is Category 3 water — contaminated with organic matter from canal sediment. Category 3 mould growth is accelerated compared to clean water events. Subfloor and wall cavity spaces in canal estates are often partially inundated and not fully accessed during remediation, leaving ongoing mould sources.',
          },
          {
            question: 'Can NRPG fix incomplete Alfred remediation?',
            answer:
              'Yes — if a previous contractor dried your property and mould has appeared, NRPG performs thermal imaging moisture assessment to identify residual wet areas. We provide IICRC S520 re-remediation with documentation for supplementary insurer lodgement or AFCA escalation.',
          },
          {
            question: 'How quickly does mould grow in the Gold Coast climate?',
            answer:
              'In subtropical Gold Coast conditions (30°C+, 65-80% humidity), mould can establish within 24-48 hours on damp materials. Post-Alfred properties left incompletely dried will typically show visible mould within 3-6 weeks. Lodge immediately — each week of delay makes remediation more extensive and expensive.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Gold Coast',
            href: '/water-damage-restoration-gold-coast',
            description: 'Emergency water damage restoration across all Gold Coast suburbs.',
          },
          {
            title: 'Ex-TC Alfred Recovery',
            href: '/events/ex-cyclone-alfred-recovery',
            description: 'If your Alfred claim is stuck or underpaid, NRPG can escalate.',
          },
          {
            title: 'Storm Damage Restoration Gold Coast',
            href: '/storm-damage-restoration-gold-coast',
            description: 'Storm damage restoration and insurance claim support for the Gold Coast.',
          },
          {
            title: 'Mould Remediation Services',
            href: '/services/mould-remediation',
            description: 'Our national mould remediation service overview.',
          },
        ]}
        cta={{ text: 'Get Emergency Mould Help', href: '/claim' }}
      />
    </>
  );
}
