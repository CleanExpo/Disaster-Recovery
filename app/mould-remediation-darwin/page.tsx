import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-480: Mould Remediation Darwin
 *
 * Created: 9 April 2026
 * Context: Darwin has Australia's most extreme mould climate — wet season
 * (Oct–Apr) delivers 1,500–1,800mm of rain in 6 months at 30–34°C with
 * 80–90%+ humidity. TC Tracy (1974) legacy construction and TC Maila (Apr 2026)
 * NT watch zone make this a time-critical service page.
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Darwin | Wet Season & Post-Cyclone Mould Specialists',
  description:
    'IICRC-certified mould remediation in Darwin and the NT. Australia\'s most extreme mould climate — wet season humidity alone drives endemic mould. TC Maila NT watch zone. Post-Tracy legacy buildings. Lodge your claim 24/7.',
  keywords:
    'mould remediation darwin, mould removal darwin, wet season mould darwin, TC Maila darwin mould, post-cyclone mould darwin NT, mould darwin top end, black mould darwin',
  openGraph: {
    title: 'Mould Remediation Darwin | Wet Season & Post-Cyclone Mould Specialists',
    description:
      'IICRC-certified mould remediation in Darwin and the NT. Australia\'s most extreme mould climate — wet season humidity alone drives endemic mould. TC Maila NT watch zone. Post-Tracy legacy buildings. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Mould+Remediation&city=Darwin&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-darwin`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-darwin/#localbusiness`,
  name: `${NAP.name} Darwin`,
  url: `${NAP.url}/mould-remediation-darwin`,
  description:
    'IICRC S520-certified mould remediation contractors serving Darwin and the Northern Territory. Wet season and post-cyclone mould specialists. Thermal imaging moisture mapping, HEPA air scrubbing, tropical antimicrobial treatment, and full ARPC Cyclone Pool insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Darwin',
    containedInPlace: { '@type': 'State', name: 'Northern Territory' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Darwin',
    addressRegion: 'NT',
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
  name: 'Mould Remediation Darwin',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Darwin' },
  serviceType: 'Mould Remediation',
  description:
    'IICRC S520-certified mould remediation across Darwin and Greater Darwin. Wet season endemic mould and post-cyclone mould specialists. Thermal imaging moisture mapping, HEPA air scrubbing, tropical antimicrobial treatment, containment barriers, post-Tracy legacy building expertise, and post-remediation clearance testing.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why is mould so severe in Darwin homes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Darwin has Australia\u2019s most extreme mould climate. The wet season (October\u2013April) delivers 1,500\u20131,800mm of rainfall in six months with daily temperatures of 30\u201334\u00b0C and relative humidity of 80\u201390%+. Unlike most Australian cities where mould requires a water damage event, Darwin\u2019s Top End climate means high season humidity alone drives endemic mould in poorly ventilated buildings \u2014 particularly post-Tracy legacy homes with louvred windows, elevated timber decks, and cavity walls that trap moisture.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Pool cover mould remediation in Darwin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes \u2014 all NT postcodes (north of the Tropic of Capricorn, including Darwin at 12\u00b0S) are covered by the ARPC Cyclone Reinsurance Pool. Mould that develops as a direct consequence of covered cyclone damage is processed through the pool. Your insurer manages the mould claim as part of the cyclone event. NRPG provides IICRC S520-certified scope documentation that satisfies ARPC pool claim requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly does mould grow after a cyclone in Darwin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Darwin\u2019s wet season conditions \u2014 30\u201334\u00b0C, 80\u201390%+ humidity \u2014 the standard IICRC 24-hour mould establishment window effectively becomes a 12-hour window. Post-cyclone water ingress combined with Darwin\u2019s ambient temperature and humidity creates ideal mould propagation conditions. Act within 12 hours of receiving the all-clear after a cyclone event.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does mould remediation cost in Darwin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Darwin mould remediation costs vary by category and scale: Category 1 (clean water, limited area) $3,000\u2013$15,000; Category 2 wet season inundation $8,000\u2013$40,000; post-cyclone whole-house remediation $15,000\u2013$80,000+. Darwin\u2019s tropical climate requires enhanced HEPA equipment, higher drying loads, and specialist tropical antimicrobial formulations, which are reflected in pricing. All post-cyclone costs should be lodged as part of your ARPC Cyclone Pool claim.',
      },
    },
  ],
};

export default function MouldRemediationDarwinPage() {
  return (
    <>
      <Script
        id="mrdarwin-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrdarwin-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrdarwin-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Darwin"
        subtitle="IICRC S520-certified mould remediation across Darwin and Greater Darwin. Australia's most extreme mould climate — wet season humidity alone drives endemic mould. TC Maila NT watch zone active. In Darwin's conditions, the mould window is 12 hours, not 24."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Darwin' },
        ]}
        sections={[
          {
            heading: "Darwin's Mould Crisis \u2014 Wet Season, Humidity, and the 12-Hour Window",
            body: (
              <>
                <p>
                  Darwin has Australia&apos;s most extreme climate for mould. The wet season
                  (October&ndash;April) delivers 1,500&ndash;1,800mm of rainfall across just six months
                  at daily temperatures of 30&ndash;34&deg;C with relative humidity consistently at
                  80&ndash;90%+. This is not a one-off weather event risk &mdash; it is an endemic,
                  seasonal condition that affects every poorly ventilated building in the Top End.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Unlike the rest of Australia, Darwin&apos;s ambient climate means mould does not
                  require a burst pipe or roof leak to take hold. High season humidity alone is
                  sufficient to drive mould growth in enclosed spaces, particularly in post-Tracy
                  &quot;The Build&quot; era homes (1975&ndash;1985) with louvred windows, elevated
                  timber decks, and cavity walls that trap moisture without adequate airflow.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Under Darwin&apos;s wet season conditions, the standard IICRC S520 24-hour mould
                  establishment window effectively becomes a 12-hour window. If your Darwin property has
                  been affected by water ingress &mdash; from a cyclone, storm, plumbing failure, or
                  sustained condensation &mdash; NRPG IICRC S520-certified contractors are on call for
                  emergency response immediately after clearance.
                </p>
              </>
            ),
          },
          {
            heading: 'TC Maila and Post-Cyclone Mould in the NT',
            body: (
              <>
                <p>
                  TC Maila (April 2026) has impacted the Far North Queensland coast. Outer rain bands
                  from tropical cyclones can affect Darwin even without a direct strike — the associated
                  rainfall and humidity surge is sufficient to drive significant mould events in buildings
                  with any existing moisture vulnerability. For current BOM status, refer to bom.gov.au.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Tracy (1974) destroyed approximately 70% of Darwin. The rebuilt city contains a
                  mix of post-Tracy cyclone-code construction and remaining pre-code heritage buildings.
                  Post-Tracy homes built between 1975 and 1985 (&quot;The Build&quot; era) were designed
                  for cyclone resilience but not always for mould resistance &mdash; louvred windows and
                  elevated construction that aids ventilation under normal conditions can allow
                  cyclone-driven rain ingress at wind speeds beyond design parameters.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  All NT postcodes north of the Tropic of Capricorn &mdash; including Darwin (12&deg;S)
                  &mdash; are covered by the ARPC Cyclone Reinsurance Pool. Mould arising directly from
                  a cyclone event is covered under the pool. Lodge your TC Maila or cyclone-related
                  mould claim through your insurer and request IICRC S520-certified remediation scope
                  documentation from NRPG for ARPC pool compliance.
                </p>
              </>
            ),
          },
          {
            heading: 'Mould Remediation Cost Estimates \u2014 Darwin 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 1 (clean water, limited area):</strong> $3,000&ndash;$15,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 2 wet season inundation:</strong> $8,000&ndash;$40,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-cyclone whole-house remediation:</strong> $15,000&ndash;$80,000+
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  <em>
                    Note: Darwin pricing reflects tropical remediation requirements including enhanced
                    HEPA equipment, higher drying loads in extreme humidity, specialist tropical
                    antimicrobial formulations, and post-Tracy legacy building structural complexity.
                    All post-cyclone costs should be lodged through your ARPC Cyclone Pool claim.
                  </em>
                </p>
              </>
            ),
          },
          {
            heading: 'Darwin and Greater Darwin Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  Emergency response across Darwin and Greater Darwin:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner Darwin:</strong> Darwin CBD, Larrakeyah, Fannie Bay, Parap, Stuart
                  Park, Nightcliff, Rapid Creek
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Suburbs:</strong> Casuarina, Coconut Grove, Moil, Nakara, Leanyer,
                  Wanguri
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Greater Darwin:</strong> Palmerston, Humpty Doo, Howard Springs, Coolalinga,
                  Berry Springs
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Why is mould so severe in Darwin homes?',
            answer:
              "Darwin has Australia's most extreme mould climate. The wet season (October\u2013April) delivers 1,500\u20131,800mm of rainfall in six months with daily temperatures of 30\u201334\u00b0C and relative humidity of 80\u201390%+. Unlike most Australian cities where mould requires a water damage event, Darwin's Top End climate means high season humidity alone drives endemic mould in poorly ventilated buildings \u2014 particularly post-Tracy legacy homes with louvred windows, elevated timber decks, and cavity walls that trap moisture.",
          },
          {
            question: 'Does the ARPC Cyclone Pool cover mould remediation in Darwin?',
            answer:
              'Yes \u2014 all NT postcodes (north of the Tropic of Capricorn, including Darwin at 12\u00b0S) are covered by the ARPC Cyclone Reinsurance Pool. Mould that develops as a direct consequence of covered cyclone damage is processed through the pool. Your insurer manages the mould claim as part of the cyclone event. NRPG provides IICRC S520-certified scope documentation that satisfies ARPC pool claim requirements.',
          },
          {
            question: 'How quickly does mould grow after a cyclone in Darwin?',
            answer:
              "In Darwin's wet season conditions \u2014 30\u201334\u00b0C, 80\u201390%+ humidity \u2014 the standard IICRC 24-hour mould establishment window effectively becomes a 12-hour window. Post-cyclone water ingress combined with Darwin's ambient temperature and humidity creates ideal mould propagation conditions. Act within 12 hours of receiving the all-clear after a cyclone event.",
          },
          {
            question: 'How much does mould remediation cost in Darwin?',
            answer:
              'Darwin mould remediation costs vary by category and scale: Category 1 (clean water, limited area) $3,000\u2013$15,000; Category 2 wet season inundation $8,000\u2013$40,000; post-cyclone whole-house remediation $15,000\u2013$80,000+. Darwin\u2019s tropical climate requires enhanced HEPA equipment, higher drying loads, and specialist tropical antimicrobial formulations, which are reflected in pricing. All post-cyclone costs should be lodged as part of your ARPC Cyclone Pool claim.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Cyclone Water Damage Restoration Darwin',
            href: '/cyclone-water-damage-restoration-darwin',
            description: 'Emergency cyclone water damage restoration across Darwin and the NT.',
          },
          {
            title: 'TC Maila FNQ Emergency',
            href: '/events/tc-maila-fnq-2026',
            description: 'TC Maila emergency response — FNQ and NT watch zone information.',
          },
          {
            title: 'ARPC Cyclone Reinsurance Pool Guide',
            href: '/guides/insurance/arpc-cyclone-reinsurance-pool',
            description: 'How the ARPC Cyclone Pool works for NT and FNQ property owners.',
          },
          {
            title: 'Mould Remediation Cairns',
            href: '/mould-remediation-cairns',
            description: 'IICRC-certified mould remediation across Cairns and Far North Queensland.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
