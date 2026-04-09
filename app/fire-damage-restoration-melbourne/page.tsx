import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Melbourne | IICRC S700:2025 Certified Emergency',
  description: 'Emergency fire damage restoration across Melbourne and Victoria. IICRC S700:2025 certified contractors for fire, smoke, soot, and bushfire damage. 60-minute response. Lodge your claim 24/7.',
  keywords: 'fire damage restoration melbourne, fire damage melbourne, smoke damage melbourne, soot damage melbourne, bushfire damage melbourne, fire restoration melbourne victoria',
  openGraph: {
    title: 'Fire Damage Restoration Melbourne | IICRC S700:2025 Certified Emergency',
    description: 'Emergency fire damage restoration across Melbourne and Victoria. IICRC S700:2025 certified contractors for fire, smoke, soot, and bushfire damage. 60-minute response. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Fire Damage Restoration')}&city=${encodeURIComponent('Melbourne')}&service=fire-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-melbourne`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-melbourne/#localbusiness`,
  name: `${NAP.name} Melbourne`,
  url: `${NAP.url}/fire-damage-restoration-melbourne`,
  description: '24/7 emergency fire damage restoration across Melbourne and Victoria. IICRC S700:2025 certified contractor network for fire, smoke, soot, and bushfire structural damage.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Melbourne', containedInPlace: { '@type': 'State', name: 'Victoria' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Melbourne', addressRegion: 'VIC', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Fire Damage Restoration Melbourne',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Melbourne', containedInPlace: { '@type': 'State', name: 'Victoria' } },
  serviceType: 'Fire Damage Restoration',
  description: 'Professional fire and smoke damage restoration across Melbourne and Victoria including emergency make-safe, soot removal, bushfire damage, odour elimination, and structural rebuild.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

export default function FireDamageRestorationMelbournePage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="fdrmelb-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="fdrmelb-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Melbourne"
        subtitle="Emergency fire damage restoration across Melbourne and Victoria. IICRC S700:2025 certified contractors for fire, smoke, soot, and bushfire structural damage. 60-minute response."
        gradient="linear-gradient(135deg, #1A0800 0%, #D84315 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Melbourne' },
        ]}
        sections={[
          {
            heading: "Melbourne and Victoria's Fire Risk — Urban and Bushfire",
            body: (
              <>
                <p>
                  Victoria has the highest bushfire risk of any Australian state &mdash; the Black Saturday fires
                  (2009) remain the deadliest bushfire disaster in Australian history, with direct economic losses
                  exceeding AU$4.4 billion. Melbourne&apos;s outer eastern and southeastern fringe suburbs
                  (Healesville, Eltham, Warrandyte, Belgrave) sit within High and Extreme bushfire attack level
                  (BAL) zones.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Urban house fires across Melbourne&apos;s established inner suburbs are driven by ageing electrical
                  infrastructure and heritage building materials that respond to fire differently from modern
                  construction. NRPG&apos;s IICRC S700:2025-certified contractors are experienced across both the
                  outer bushfire fringe and inner Melbourne urban fire damage scenarios.
                </p>
              </>
            ),
          },
          {
            heading: 'Bushfire Smoke Damage — Across Greater Melbourne',
            body: (
              <>
                <p>
                  Bushfire smoke events affect Melbourne properties well beyond the fire perimeter. The
                  2019&ndash;2020 Black Summer fires sent smoke across Melbourne for weeks, depositing PM2.5
                  particulates in roof spaces, HVAC systems, and wall cavities across the metropolitan area.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Properties that show no physical fire damage can still require professional smoke decontamination
                  &mdash; particularly for households with asthma or respiratory conditions. NRPG provides HEPA air
                  scrubbing, HVAC decontamination, and S700:2025-compliant smoke damage documentation for insurance
                  claims arising from smoke events without direct fire contact.
                </p>
              </>
            ),
          },
          {
            heading: 'Melbourne Suburbs and Regional Victoria We Cover',
            body: (
              <>
                <p>60-minute emergency response across Melbourne metro:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner City:</strong> Melbourne CBD, South Melbourne, Port Melbourne, St Kilda, Fitzroy,
                  Collingwood, Richmond
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner East:</strong> Hawthorn, Kew, Balwyn, Camberwell, Glen Waverley, Box Hill, Doncaster
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner North:</strong> Brunswick, Coburg, Northcote, Preston, Heidelberg, Ivanhoe
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner South:</strong> Prahran, Windsor, South Yarra, Toorak, Armadale, Malvern, Glen Iris
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western:</strong> Footscray, Sunshine, St Albans, Werribee, Hoppers Crossing
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Bushfire Fringe:</strong> Healesville, Eltham, Warrandyte, Belgrave, Kallista, Emerald,
                  Hurstbridge
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Regional Victoria:</strong> Geelong, Ballarat, Bendigo, Shepparton (120-minute response)
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does Victorian home insurance cover bushfire damage to Melbourne properties?',
            answer: "Yes — bushfire damage to the building, contents, and associated structures is covered under the fire damage provision of most standard Victorian home insurance policies. Victoria's high BAL-rated properties may have specific policy conditions — check your PDS. The Victorian Bushfire Insurance Scheme provides specific protections for properties in declared disaster areas.",
          },
          {
            question: 'Can I claim for smoke damage if my Melbourne property was not directly in a bushfire zone?',
            answer: "Yes — smoke damage (soot, PM2.5 deposition in roof spaces, HVAC contamination) arising from a fire event is generally covered under the fire and smoke provisions of standard policies, even if your property was not in the direct fire zone. Document the smoke event (BOM records, media coverage), photograph soot deposits, and lodge as 'smoke damage from bushfire event'.",
          },
          {
            question: 'How is Melbourne fire damage restoration different from other cities?',
            answer: "Melbourne's heritage building stock (Victorian and Edwardian construction with lath-and-plaster walls and timber subfloors) responds to fire and smoke differently from modern construction. NRPG's S700:2025-certified contractors are experienced with heritage restoration requirements, including lime-based plaster repair, heritage-compatible finishes, and the specific challenges of smoke remediation in double-brick construction.",
          },
          {
            question: 'What should I do immediately after a house fire in Melbourne?',
            answer: 'Wait for the fire brigade to confirm the property is safe to re-enter. Do not attempt to clean up — soot damage spreads when disturbed and can void insurance claims if evidence is destroyed. Photograph everything from the front gate. Call your insurer. Lodge at disasterrecovery.com.au/claim for IICRC-certified emergency make-safe and structural assessment.',
          },
        ]}
        relatedGuides={[
          { title: 'Water Damage Restoration Melbourne', href: '/water-damage-restoration-melbourne', description: 'Fire suppression water damage restoration across Melbourne.' },
          { title: 'Fire Damage Restoration Brisbane', href: '/fire-damage-restoration-brisbane', description: 'IICRC S700:2025 fire restoration in Brisbane.' },
          { title: 'Mould After Water Damage', href: '/services/mould-remediation', description: 'Fire suppression water can cause mould — act within 48 hours.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
