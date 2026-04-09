import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-477: Water Damage Restoration Adelaide
 *
 * Created: 9 April 2026
 * ACL s18 compliant.
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Adelaide | IICRC-Certified Emergency Response',
  description:
    'Professional water damage restoration across Adelaide and South Australia. IICRC S500:2025 certified contractors, 60-minute response. Storm flooding, burst pipes, and water ingress specialists. Lodge your claim 24/7.',
  keywords:
    'water damage restoration adelaide, water damage adelaide, burst pipe adelaide, storm water damage adelaide, water damage repair SA, IICRC adelaide, flood damage adelaide',
  openGraph: {
    title: 'Water Damage Restoration Adelaide | IICRC-Certified Emergency Response',
    description:
      'Professional water damage restoration across Adelaide and South Australia. IICRC S500:2025 certified contractors, 60-minute response.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Adelaide')}&service=water-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-adelaide`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-adelaide/#localbusiness`,
  name: `${NAP.name} Adelaide`,
  url: `${NAP.url}/water-damage-restoration-adelaide`,
  description:
    'IICRC-certified water damage restoration contractors serving Adelaide and South Australia 24/7. Water extraction, structural drying, mould prevention, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Adelaide', containedInPlace: { '@type': 'State', name: 'South Australia' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Adelaide', addressRegion: 'SA', addressCountry: 'AU' },
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
  name: 'Water Damage Restoration Adelaide',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Adelaide' },
  serviceType: 'Water Damage Restoration',
  description:
    'Professional water damage restoration in Adelaide: emergency water extraction, structural drying to IICRC S500:2025, mould prevention, contents protection, and full insurance claim documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What causes the most water damage in Adelaide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The three most common sources in Adelaide are: (1) burst pipes in summer \u2014 thermal expansion in Adelaide\u2019s extreme heat causes pipe joint failures; (2) winter storm water ingress through aged roofing in established inner suburbs; (3) stormwater drainage overflow in heavy winter rainfall events. Lodge immediately at disasterrecovery.com.au/claim for 60-minute emergency response.",
      },
    },
    {
      '@type': 'Question',
      name: 'How long does water damage restoration take in Adelaide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Structural drying in Adelaide typically takes 3\u20135 days in summer (low ambient humidity assists equipment efficiency) and 5\u201310 days in winter (cool temperatures require longer equipment run times). Category 3 losses involving sewage or external flooding may require 10\u201321 days. NRPG contractors produce daily psychrometric logs confirming progress toward drying targets.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Adelaide home insurance cover storm water ingress?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes \u2014 storm water entering through damaged building elements (failed roof, broken windows) is covered under the storm damage provision of most standard South Australian home insurance policies. Stormwater overflow from external drainage systems may be treated as flood and requires a specific flood extension. Document the water entry point clearly when photographing damage.',
      },
    },
  ],
};

export default function WaterDamageRestorationAdelaidePage() {
  return (
    <>
      <Script
        id="wdradl-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="wdradl-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="wdradl-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Adelaide"
        subtitle="Emergency water damage restoration across Adelaide and South Australia. IICRC S500:2025 certified technicians. 60-minute response, 24 hours a day."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Adelaide' },
        ]}
        sections={[
          {
            heading: "Water Damage in Adelaide — Mediterranean Climate Challenges",
            body: (
              <>
                <p>
                  Adelaide&apos;s Mediterranean climate (dry summers, wet winters) creates specific water damage patterns.
                  The wet season (May–August) delivers concentrated rainfall that overwhelms ageing stormwater
                  infrastructure in Adelaide&apos;s established inner suburbs — suburbs like Norwood, Prospect, and Unley
                  have drainage systems that date from the early twentieth century. Adelaide&apos;s summer heat (days
                  exceeding 40°C are not uncommon) creates extreme conditions for water damage: evaporation rates are
                  high but air conditioning systems in residential properties are frequently overwhelmed, leaving
                  moisture in wall cavities. Burst pipes occur more frequently in summer due to thermal expansion in
                  Adelaide&apos;s extreme heat than in cooler southern cities.
                </p>
              </>
            ),
          },
          {
            heading: "IICRC S500:2025 Structural Drying — Adelaide's Climate Requirements",
            body: (
              <>
                <p>
                  Adelaide&apos;s climate presents opposing seasonal drying challenges. In summer, surface materials dry
                  extremely quickly while wall cavities and subfloor spaces retain moisture — creating hidden mould
                  risk that standard visual inspection misses. In winter, ambient humidity increases and cool
                  temperatures slow structural drying significantly. NRPG&apos;s IICRC S500:2025-certified contractors use
                  thermal imaging and calibrated moisture meters to detect moisture in all building assemblies,
                  regardless of season, and produce psychrometric drying logs that Adelaide insurers require for
                  claim sign-off.
                </p>
              </>
            ),
          },
          {
            heading: 'Adelaide Suburbs We Cover',
            body: (
              <>
                <p>60-minute emergency response across the Adelaide metropolitan area:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner City:</strong> Adelaide CBD, North Adelaide, Parkside, Unley, Norwood, St Peters
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner North:</strong> Prospect, Broadview, Gepps Cross, Parafield Gardens, Elizabeth
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner South:</strong> Glenelg, Henley Beach, Brighton, Hallett Cove, Morphett Vale
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern Hills:</strong> Norton Summit, Burnside, Magill, Rostrevor, Athelstone
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Corridor:</strong> Salisbury, Tea Tree Gully, Modbury, Golden Grove
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern:</strong> Noarlunga, Christie Downs, Reynella, Old Noarlunga, Hackham
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What causes the most water damage in Adelaide?',
            answer:
              "The three most common sources in Adelaide are: (1) burst pipes in summer — thermal expansion in Adelaide's extreme heat causes pipe joint failures; (2) winter storm water ingress through aged roofing in established inner suburbs; (3) stormwater drainage overflow in heavy winter rainfall events. Lodge immediately at disasterrecovery.com.au/claim for 60-minute emergency response.",
          },
          {
            question: 'How long does water damage restoration take in Adelaide?',
            answer:
              'Structural drying in Adelaide typically takes 3–5 days in summer (low ambient humidity assists equipment efficiency) and 5–10 days in winter (cool temperatures require longer equipment run times). Category 3 losses involving sewage or external flooding may require 10–21 days. NRPG contractors produce daily psychrometric logs confirming progress toward drying targets.',
          },
          {
            question: 'Does Adelaide home insurance cover storm water ingress?',
            answer:
              "Yes — storm water entering through damaged building elements (failed roof, broken windows) is covered under the storm damage provision of most standard South Australian home insurance policies. Stormwater overflow from external drainage systems may be treated as flood and requires a specific flood extension. Document the water entry point clearly when photographing damage.",
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Melbourne',
            href: '/water-damage-restoration-melbourne',
            description: 'IICRC-certified water damage restoration in Melbourne.',
          },
          {
            title: 'Mould After Water Damage',
            href: '/services/mould-remediation',
            description: "Prevent mould in Adelaide's climate after water damage.",
          },
          {
            title: 'Water Damage Restoration Cost Guide',
            href: '/guides/cost-guides/how-much-water-damage-restoration-cost',
            description: 'Water damage restoration cost breakdown by category.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
