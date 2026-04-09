import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm and Water Damage Restoration Sunshine Coast | IICRC Emergency',
  description: 'Emergency storm and water damage restoration across the Sunshine Coast. IICRC-certified contractors for water damage, storm flooding, and roof damage. Ex-TC Alfred recovery. Lodge your claim 24/7.',
  keywords: 'storm damage sunshine coast, water damage sunshine coast, storm damage noosa, water damage maroochydore, storm restoration sunshine coast QLD, alfred flood sunshine coast',
  openGraph: {
    title: 'Storm and Water Damage Restoration Sunshine Coast | IICRC Emergency',
    description: 'Emergency storm and water damage restoration across the Sunshine Coast from Noosa to Caloundra. IICRC S500:2025 certified. 60-minute response. Ex-TC Alfred recovery support available.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm and Water Damage Restoration')}&city=${encodeURIComponent('Sunshine Coast')}&service=storm-water-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-water-damage-restoration-sunshine-coast`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-water-damage-restoration-sunshine-coast/#localbusiness`,
  name: `${NAP.name} Sunshine Coast`,
  url: `${NAP.url}/storm-water-damage-restoration-sunshine-coast`,
  description: 'IICRC-certified storm and water damage restoration contractors serving the Sunshine Coast from Noosa to Caloundra. 60-minute emergency response. Ex-TC Alfred recovery support available.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'Place', name: 'Sunshine Coast', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Maroochydore', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Storm and Water Damage Restoration Sunshine Coast',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Sunshine Coast' },
  serviceType: 'Water Damage Restoration',
  description: 'Professional storm and water damage restoration across the Sunshine Coast: emergency water extraction, structural drying to IICRC S500:2025, mould remediation, and full insurance claim documentation including ex-TC Alfred recovery support.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

export default function StormWaterDamageRestorationSunshineCoastPage() {
  return (
    <>
      <Script id="swdsc-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="swdsc-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AgGuidePageTemplate
        category="Storm and Water Damage"
        title="Storm and Water Damage Restoration Sunshine Coast"
        subtitle="Emergency storm and water damage restoration across the Sunshine Coast from Noosa to Caloundra. IICRC S500:2025 certified. 60-minute response. Ex-TC Alfred recovery support available."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Sunshine Coast' },
        ]}
        sections={[
          {
            heading: 'Sunshine Coast Storm and Water Damage — The Risk Profile',
            body: (
              <>
                <p>
                  The Sunshine Coast stretches 100 kilometres from Caloundra in the south to Noosa in the north,
                  encompassing multiple distinct storm and flood risk profiles. Coastal suburbs face storm surge and
                  wind-driven rain exposure during East Coast Lows and ex-tropical cyclone events. Canal estate
                  communities — including Pelican Waters, Kawana Waters, and Cotton Tree — are exposed to canal rise
                  during sustained rainfall events. The Sunshine Coast hinterland communities of Maleny, Montville,
                  and Mapleton receive orographic rainfall significantly above coastal averages, creating concentrated
                  runoff that affects properties in the ranges and valley floor communities below.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Ex-Tropical Cyclone Alfred made landfall in March 2026 and produced more than 300mm of rainfall in
                  48 hours across parts of the Sunshine Coast LGA. Alfred was classified as a PERILS industry loss
                  event with a final estimated loss of AU$1.877 billion across 132,000 claims — the largest
                  insured weather event on the Sunshine Coast in recorded history. Many properties sustained
                  compound damage from wind, roof penetration, and subsequent water ingress over multiple days.
                </p>
              </>
            ),
          },
          {
            heading: 'Ex-TC Alfred — Sunshine Coast Recovery Support',
            body: (
              <>
                <p>
                  Many Sunshine Coast properties affected by ex-TC Alfred in March 2026 still have unresolved
                  recovery issues as of April 2026. Common ongoing problems include secondary mould growth from
                  incomplete structural drying, residual moisture in wall cavities and subfloors that was missed
                  during initial assessment, and disputed or underpaid insurance claims where the original scope
                  of works did not capture the full extent of damage.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG can step in at any stage of the Alfred recovery process. Services available for Alfred
                  claimants include: independent IICRC-certified scope reassessment where the original repair
                  scope is contested; moisture mapping using thermal imaging and pin/pinless meters to identify
                  residual wet areas missed in earlier assessments; and AFCA-ready documentation packages for
                  property owners pursuing dispute resolution with their insurer.
                </p>
              </>
            ),
          },
          {
            heading: 'Sunshine Coast Areas We Cover',
            body: (
              <>
                <p>
                  NRPG contractors cover the full Sunshine Coast corridor from Noosa to Caloundra, including
                  hinterland communities:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Noosa Shire:</strong> Noosa Heads, Noosaville, Tewantin, Cooroy, Pomona
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Maroochydore:</strong> Maroochydore, Alexandra Headlands, Mooloolaba, Buderim, Sippy Downs
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Caloundra:</strong> Caloundra, Kings Beach, Bokarina, Birtinya, Wurtulla
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Canal Estates:</strong> Pelican Waters, Kawana Waters, Bokarina Beach
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hinterland (90-min response):</strong> Maleny, Montville, Mapleton, Kenilworth, Eumundi
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inland:</strong> Nambour, Bli Bli, Palmview, Mountain Creek
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate contractor matching
                  across the full Noosa-to-Caloundra corridor.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Can I still lodge or supplement an Alfred claim on the Sunshine Coast?',
            answer: 'Yes — if your Alfred claim is still open, underpaid, or disputed, NRPG can assist at any stage. We provide independent IICRC reassessment, supplementary moisture mapping, and AFCA-ready documentation for properties where the original scope missed damage or where the insurer has disputed the full extent of loss.',
          },
          {
            question: 'Is canal estate storm damage covered differently from flood damage?',
            answer: 'Storm damage and flood inundation are two distinct perils under most Australian home insurance policies. Canal rise from storm events may be classified as either stormwater runoff or flood depending on your policy wording and the origin of the water. Documenting the exact entry point and timing of water ingress is critical. NRPG provides detailed scope reports that distinguish between storm and flood damage for insurance purposes.',
          },
          {
            question: 'Why is mould appearing in my property months after Alfred?',
            answer: "Mould appearing weeks or months after a storm event typically indicates incomplete structural drying. Queensland's high ambient humidity means residual moisture in wall cavities, insulation, and subfloor spaces remains at levels that support mould growth even after surface materials appear dry. IICRC-certified contractors use thermal imaging and calibrated moisture meters to identify wet areas that standard visual inspection misses.",
          },
          {
            question: 'How quickly can NRPG respond to storm damage on the Sunshine Coast?',
            answer: 'NRPG contractors respond within 60 minutes across the full Noosa-to-Caloundra corridor following emergency storms. Hinterland communities including Maleny, Montville, and Eumundi have a 90-minute response window. Lodge your claim at disasterrecovery.com.au/claim for immediate contractor matching.',
          },
        ]}
        relatedGuides={[
          { title: 'Ex-TC Alfred Recovery — Sunshine Coast and SEQ', href: '/events/ex-cyclone-alfred-recovery', description: 'Claims support, incomplete drying, and dispute documentation for Alfred-affected properties.' },
          { title: 'Water Damage Restoration Brisbane', href: '/water-damage-restoration-brisbane', description: 'IICRC-certified water damage restoration across Brisbane and surrounds.' },
          { title: 'Water Damage Restoration Gold Coast', href: '/water-damage-restoration-gold-coast', description: 'Emergency water damage restoration across the Gold Coast.' },
          { title: 'Mould Remediation', href: '/services/mould-remediation', description: 'Professional mould remediation following storm and flood events in QLD humidity.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
