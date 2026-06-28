import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * Water Damage Restoration Toowoomba
 *
 * Created: 10 April 2026
 * Context: Darling Downs market — elevated location with unique cold/storm risk profile.
 * ACL s18 compliant.
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Toowoomba | 24/7 IICRC Certified',
  description: 'Professional water damage restoration across Toowoomba and the Darling Downs. IICRC S500:2025 certified contractors. priority response. Burst pipes, storm flooding, insurance claims. Lodge 24/7.',
  keywords: 'water damage restoration toowoomba, water damage toowoomba, flood damage toowoomba, burst pipe toowoomba, darling downs water damage, IICRC toowoomba, storm damage toowoomba',
  openGraph: {
    title: 'Water Damage Restoration Toowoomba | 24/7 Emergency Response',
    description: 'Emergency water damage restoration across Toowoomba and the Darling Downs. IICRC S500:2025 certified. priority response.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Toowoomba')}&service=water-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-toowoomba`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-toowoomba/#localbusiness`,
  name: `${NAP.name} Toowoomba`,
  url: `${NAP.url}/water-damage-restoration-toowoomba`,
  description: 'IICRC-certified water damage restoration contractors serving Toowoomba and the Darling Downs 24/7. Water extraction, structural drying, mould prevention, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Toowoomba', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Toowoomba', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Water Damage Restoration Toowoomba',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Toowoomba' },
  serviceType: 'Water Damage Restoration',
  description: 'Professional water damage restoration in Toowoomba: emergency water extraction, structural drying to IICRC S500:2025, mould prevention, contents protection, and full insurance claim documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly should water damage be treated in Toowoomba?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Within 24\u201348 hours. Despite Toowoomba\u2019s cooler climate, mould can still establish in water-affected wall cavities and subfloor within two days. Flash flooding from summer storms can saturate building materials rapidly. Lodge at disasterrecovery.com.au/claim for priority emergency dispatch.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover flash flood water damage in Toowoomba?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the source. Water entering through a breached roof or overflowing gutters is typically covered as storm damage under standard home insurance. Inundation from overland flow or rising creek water usually requires a specific flood extension. The 2011 Toowoomba flash flood generated significant disputes over these distinctions. NRPG provides detailed damage categorisation documentation to support your claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes water damage restoration in Toowoomba different from other regions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Toowoomba\u2019s elevation of approximately 700 metres above sea level creates two distinct risk profiles: cold winters with temperature differentials that cause condensation within building cavities, and intense summer convective storms that can deliver extreme rainfall in short periods. The 2011 event saw 100 mm in 30 minutes, overwhelming drainage and causing rapid flash flooding in the CBD. IICRC-certified technicians account for these conditions when setting drying targets and equipment configurations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does water damage restoration cost in Toowoomba?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Water damage restoration in Toowoomba typically ranges from $2,500 for minor Category 1 losses (burst pipe, appliance overflow) up to $50,000 or more for severe Category 3 events (sewage or floodwater inundation). Category 2 losses (storm water ingress) typically fall in the $4,500\u2013$18,000 range. The Disaster Recovery platform charges a $2,750 initial commitment to begin emergency works.',
      },
    },
  ],
};

export default function WaterDamageRestorationToowoombaPage() {
  return (
    <>
      <Script id="wdrtba-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="wdrtba-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="wdrtba-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Toowoomba"
        subtitle="Emergency water damage restoration across Toowoomba and the Darling Downs. IICRC S500:2025 certified technicians. priority response, 24 hours a day. Burst pipes, flash flooding, and storm damage."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Toowoomba' },
        ]}
        sections={[
          {
            heading: 'Toowoomba Water Damage Risk',
            body: (
              <>
                <p>
                  Toowoomba&apos;s position on the Great Dividing Range at approximately 700 metres above sea level
                  creates a water damage risk profile unlike any other Queensland city. Cold winters produce significant
                  temperature differentials between interior and exterior building elements, leading to condensation
                  within wall cavities and roof spaces — particularly in older commercial and residential stock in the
                  CBD and inner suburbs. Left undetected, this moisture accumulates over time and can produce extensive
                  structural damage and mould colonisation.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The summer risk is equally severe. Toowoomba sits in a zone of intense convective storm activity,
                  with the city prone to sudden, high-intensity rainfall events. On 10 January 2011, Toowoomba
                  received approximately 100 mm of rain in under 30 minutes, generating a catastrophic flash flood
                  through the CBD that overwhelmed drainage infrastructure entirely. The event remains one of the
                  most significant urban flash floods in Australian history and demonstrated the vulnerability of
                  the city&apos;s older building stock to rapid water ingress.
                </p>
              </>
            ),
          },
          {
            heading: 'Common Water Damage Causes in Toowoomba',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Flash flooding from intense summer storms:</strong> Convective storm cells over the
                    Toowoomba range regularly deliver extreme short-duration rainfall that overwhelms stormwater
                    systems, causing rapid overland flow into low-lying properties and underpasses.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Burst pipes during winter cold snaps:</strong> Sub-zero overnight temperatures on the
                    range can freeze water in exposed pipework, particularly in older homes without pipe insulation.
                    Pipe burst events typically occur in the early morning hours as temperatures rise.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Roof damage from severe hail events:</strong> Toowoomba sits within Queensland&apos;s
                    hail alley. Large hail stones regularly compromise roof membranes, ridge capping, and skylights,
                    allowing storm water to enter roof spaces and ceilings.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Appliance and plumbing failures:</strong> Hot water systems, washing machines, and
                    dishwashers are a leading cause of Category 1 water damage across all property types.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Commercial HVAC condensation:</strong> Large commercial buildings in the Toowoomba CBD
                    experience condensation issues in HVAC ductwork and plant rooms due to the region&apos;s
                    pronounced temperature extremes.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Water Damage Cost Estimates \u2014 Toowoomba 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 1 \u2014 clean water (burst pipe, appliance overflow):</strong> $2,500\u2013$10,000.
                    Water extraction, structural drying, plasterboard and flooring repair.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 2 \u2014 grey water (storm ingress, condensation damage):</strong> $4,500\u2013$18,000.
                    Moisture mapping, commercial drying equipment, antimicrobial treatment, structural repairs.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 3 \u2014 black water (sewage, flash flood inundation):</strong> $12,000\u2013$50,000+.
                    Full decontamination, subfloor treatment, and restoration to pre-loss condition.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Toowoomba Suburbs We Cover',
            body: (
              <>
                <p>priority emergency response across Toowoomba and the Darling Downs:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner Toowoomba:</strong> Toowoomba CBD, South Toowoomba, East Toowoomba, Newtown,
                  Harristown, Glenvale
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Range and Northern Corridor:</strong> Highfields, Kingsthorpe, Kleinton, Yarraman
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern Approaches:</strong> Withcott, Gatton, Laidley
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Darling Downs:</strong> Dalby, Oakey, Pittsworth, Warwick
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly should water damage be treated in Toowoomba?',
            answer: "Within 24\u201348 hours. Despite Toowoomba\u2019s cooler climate, mould can still establish in water-affected wall cavities and subfloor within two days. Flash flooding from summer storms can saturate building materials rapidly. Lodge at disasterrecovery.com.au/claim for priority emergency dispatch.",
          },
          {
            question: 'Does insurance cover flash flood water damage in Toowoomba?',
            answer: "It depends on the source. Water entering through a breached roof or overflowing gutters is typically covered as storm damage under standard home insurance. Inundation from overland flow or rising creek water usually requires a specific flood extension. The 2011 Toowoomba flash flood generated significant disputes over these distinctions. NRPG provides detailed damage categorisation documentation to support your claim.",
          },
          {
            question: 'What makes water damage restoration in Toowoomba different from other regions?',
            answer: "Toowoomba\u2019s elevation of approximately 700 metres above sea level creates two distinct risk profiles: cold winters with temperature differentials that cause condensation within building cavities, and intense summer convective storms that can deliver extreme rainfall in short periods. The 2011 event saw 100 mm in 30 minutes, overwhelming drainage and causing rapid flash flooding in the CBD. IICRC-certified technicians account for these conditions when setting drying targets and equipment configurations.",
          },
          {
            question: 'How much does water damage restoration cost in Toowoomba?',
            answer: "Water damage restoration in Toowoomba typically ranges from $2,500 for minor Category 1 losses (burst pipe, appliance overflow) up to $50,000 or more for severe Category 3 events (sewage or floodwater inundation). Category 2 losses (storm water ingress) typically fall in the $4,500\u2013$18,000 range. The Disaster Recovery platform charges a $2,750 initial commitment to begin emergency works.",
          },
        ]}
        relatedGuides={[
          { title: 'Flood Damage Restoration Toowoomba', href: '/flood-damage-restoration-toowoomba', description: 'Specialist flood damage recovery across Toowoomba and the Darling Downs.' },
          { title: 'Water Damage Restoration Brisbane', href: '/water-damage-restoration-brisbane', description: 'Our Brisbane water damage restoration service.' },
          { title: 'Water Damage Restoration Gold Coast', href: '/water-damage-restoration-gold-coast', description: 'Our Gold Coast water damage restoration service.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
