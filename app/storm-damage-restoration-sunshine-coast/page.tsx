import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Sunshine Coast | Ex-TC Alfred Structural Repairs',
  description: 'Emergency storm damage restoration across the Sunshine Coast. IICRC-certified contractors for wind damage, roof loss, fallen trees, and structural compromise. Ex-TC Alfred recovery. Lodge your claim 24/7.',
  keywords: 'storm damage sunshine coast, roof damage sunshine coast, structural storm damage sunshine coast, ex-tc alfred storm damage, hinterland tree fall sunshine coast, storm damage maleny montville, ARPC cyclone pool QLD',
  openGraph: {
    title: 'Storm Damage Restoration Sunshine Coast | Ex-TC Alfred Structural Repairs',
    description: 'Emergency storm damage restoration across the Sunshine Coast. Structural repairs, roof loss, and hinterland tree-fall damage. Ex-TC Alfred recovery support. IICRC-certified. priority response.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Sunshine Coast')}&service=storm-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-sunshine-coast`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-sunshine-coast/#localbusiness`,
  name: `${NAP.name} Sunshine Coast`,
  url: `${NAP.url}/storm-damage-restoration-sunshine-coast`,
  description: 'IICRC-certified storm damage restoration contractors serving the Sunshine Coast. Structural repairs, roof loss, wind damage, and hinterland tree-fall. Ex-TC Alfred recovery support available.',
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
  name: 'Storm Damage Restoration Sunshine Coast',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Sunshine Coast' },
  serviceType: 'Storm Damage Restoration',
  description: 'Professional storm damage restoration across the Sunshine Coast: structural assessment, emergency tarping, wind damage repair, hinterland tree-fall remediation, and full insurance claim documentation including ex-TC Alfred recovery support.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I still make an Alfred storm damage claim on the Sunshine Coast in April 2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — if your Alfred storm damage claim is still open, underpaid, or disputed, you can pursue a supplementary claim or dispute at any time while the claim remains active. Many Sunshine Coast homeowners are still navigating incomplete repairs or disputed scopes weeks after Alfred made landfall in March 2026. NRPG provides independent IICRC-certified reassessment, structural moisture mapping, and AFCA-ready documentation to support claims where the original insurer scope did not capture the full extent of structural damage.' },
    },
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Pool apply to Alfred storm damage on the Sunshine Coast?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ex-Tropical Cyclone Alfred was classified as an ex-tropical cyclone event, and the ARPC Cyclone Pool may apply to storm damage claims from Alfred for QLD postcodes. The Cyclone Pool covers residential and strata properties in eligible cyclone risk areas of Queensland, and coverage depends on your insurer\'s participation in the scheme and the nature of the damage. Property owners in Sunshine Coast LGA postcodes affected by Alfred should check with their insurer whether the ARPC Cyclone Pool applies to their specific claim. NRPG can document the scope of structural storm damage to support any pool-related assessment.' },
    },
    {
      '@type': 'Question',
      name: 'Is tree-fall storm damage covered by home insurance in the Sunshine Coast hinterland?',
      acceptedAnswer: { '@type': 'Answer', text: 'Storm-caused tree fall is generally covered as storm damage under standard Australian home insurance policies, including when large canopy trees fall onto structures during high wind events. In the Sunshine Coast hinterland — particularly Maleny, Montville, and Mapleton — the steep terrain and large subtropical tree canopy create a higher risk of structural tree-fall during severe storm events. Coverage specifics depend on your policy wording, and some policies distinguish between tree removal costs and structural repair. Documenting the damage pathway and the storm event link is important for claim acceptance.' },
    },
    {
      '@type': 'Question',
      name: 'How much does storm damage restoration cost on the Sunshine Coast?',
      acceptedAnswer: { '@type': 'Answer', text: 'Storm damage restoration costs on the Sunshine Coast vary significantly by severity. Standard structural damage — roof tile loss, fence damage, and minor penetration repairs — typically ranges from $2,000 to $15,000. Major structural damage involving partial roof loss or significant wind damage to the building envelope ranges from $8,000 to $40,000. Hinterland tree-fall events causing whole or partial structural loss can range from $30,000 to $150,000 or more depending on the extent of structural compromise. NRPG provides itemised scopes of work for insurance lodgement at no upfront cost.' },
    },
  ],
};

export default function StormDamageRestorationSunshineCoastPage() {
  return (
    <>
      <Script id="sdrsc-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrsc-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="sdrsc-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Sunshine Coast"
        subtitle="Emergency storm damage restoration across the Sunshine Coast. Structural repairs, roof loss, wind damage, and hinterland tree-fall. Ex-TC Alfred recovery support. IICRC-certified contractors. priority response."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Sunshine Coast' },
        ]}
        sections={[
          {
            heading: 'Ex-TC Alfred Storm Damage — Sunshine Coast Recovery',
            body: (
              <>
                <p>
                  Ex-Tropical Cyclone Alfred made landfall in March 2026 and delivered widespread structural
                  storm damage across the Sunshine Coast LGA. Wind speeds caused significant roof losses,
                  fence failures, fallen trees, and structural compromise across coastal and hinterland
                  communities from Caloundra to Noosa. PERILS recorded a final industry loss figure of
                  AU$1.877 billion from Alfred, with the Sunshine Coast LGA among the highest-density claim
                  areas in SEQ. More than 132,000 ICA claims were lodged across South East Queensland.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  As of April 2026 — more than four weeks after Alfred — many Sunshine Coast homeowners
                  remain in active recovery. Common outstanding issues include unrepaired structural damage
                  awaiting insurer scope approval, disputed claims where the original scope understated the
                  full extent of structural loss, and secondary water damage from roof penetrations that
                  occurred during Alfred and have not yet been fully rectified.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  ARPC classified Alfred as an &ldquo;Ex-Tropical Cyclone&rdquo; event. The ARPC Cyclone Pool may
                  apply to storm damage claims from Alfred for eligible Queensland postcodes — property
                  owners in Sunshine Coast LGA should confirm with their insurer whether the Cyclone Pool
                  applies to their claim. NRPG can provide detailed structural documentation to support
                  any pool-related assessment process.
                </p>
              </>
            ),
          },
          {
            heading: 'Hinterland Tree-Fall and Structural Damage',
            body: (
              <>
                <p>
                  The Sunshine Coast hinterland communities of Maleny, Montville, and Mapleton present a
                  distinct storm damage risk profile compared to the coastal corridor. Steep terrain
                  concentrates wind loading on ridge-line and exposed properties, while the large subtropical
                  canopy trees prevalent throughout the ranges create significant tree-fall risk during
                  severe storm events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Tree-fall structural damage in the hinterland during Alfred resulted in some of the most
                  severe individual property losses across the Sunshine Coast. Whole or partial roof
                  failures caused by large tree impacts require specialised structural assessment before
                  any repair scope can be finalised. NRPG hinterland contractors carry specialist equipment
                  for steep-site access and work within a 90-minute response window to Maleny, Montville,
                  and Mapleton from the coastal corridor.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Canal estate properties at Kawana Waters and Bokarina facing structural storm damage
                  during Alfred are also covered. Canal-facing structures sustained additional wind loading
                  due to their exposed waterfront positioning, and some properties experienced compound
                  damage from both wind-driven roof penetration and subsequent water ingress.
                </p>
              </>
            ),
          },
          {
            heading: 'Suburbs We Cover',
            body: (
              <>
                <p>
                  NRPG contractors cover the full Sunshine Coast corridor from Caloundra to Noosa for
                  storm damage restoration:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Noosa Shire:</strong> Noosa Heads, Noosaville, Tewantin, Cooroy, Pomona
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Maroochydore corridor:</strong> Maroochydore, Alexandra Headlands, Mooloolaba, Buderim, Sippy Downs
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Caloundra corridor:</strong> Caloundra, Kings Beach, Bokarina, Birtinya, Wurtulla
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Canal estates:</strong> Kawana Waters, Pelican Waters, Bokarina Beach
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hinterland (90-min response):</strong> Maleny, Montville, Mapleton, Kenilworth, Eumundi
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inland:</strong> Nambour, Bli Bli, Palmview, Mountain Creek
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate contractor
                  matching across the full Sunshine Coast.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Can I still make an Alfred storm damage claim on the Sunshine Coast in April 2026?',
            answer: 'Yes — if your Alfred storm damage claim is still open, underpaid, or disputed, you can pursue a supplementary claim or dispute at any time while the claim remains active. Many Sunshine Coast homeowners are still navigating incomplete repairs or disputed scopes weeks after Alfred made landfall in March 2026. NRPG provides independent IICRC-certified reassessment, structural moisture mapping, and AFCA-ready documentation to support claims where the original insurer scope did not capture the full extent of structural damage.',
          },
          {
            question: 'Does the ARPC Cyclone Pool apply to Alfred storm damage on the Sunshine Coast?',
            answer: "Ex-Tropical Cyclone Alfred was classified as an ex-tropical cyclone event, and the ARPC Cyclone Pool may apply to storm damage claims from Alfred for QLD postcodes. The Cyclone Pool covers residential and strata properties in eligible cyclone risk areas of Queensland, and coverage depends on your insurer's participation in the scheme and the nature of the damage. Property owners in Sunshine Coast LGA postcodes affected by Alfred should check with their insurer whether the ARPC Cyclone Pool applies to their specific claim. NRPG can document the scope of structural storm damage to support any pool-related assessment.",
          },
          {
            question: 'Is tree-fall storm damage covered by home insurance in the Sunshine Coast hinterland?',
            answer: 'Storm-caused tree fall is generally covered as storm damage under standard Australian home insurance policies, including when large canopy trees fall onto structures during high wind events. In the Sunshine Coast hinterland — particularly Maleny, Montville, and Mapleton — the steep terrain and large subtropical tree canopy create a higher risk of structural tree-fall during severe storm events. Coverage specifics depend on your policy wording, and some policies distinguish between tree removal costs and structural repair. Documenting the damage pathway and the storm event link is important for claim acceptance.',
          },
          {
            question: 'How much does storm damage restoration cost on the Sunshine Coast?',
            answer: 'Storm damage restoration costs on the Sunshine Coast vary significantly by severity. Standard structural damage — roof tile loss, fence damage, and minor penetration repairs — typically ranges from $2,000 to $15,000. Major structural damage involving partial roof loss or significant wind damage to the building envelope ranges from $8,000 to $40,000. Hinterland tree-fall events causing whole or partial structural loss can range from $30,000 to $150,000 or more depending on the extent of structural compromise. NRPG provides itemised scopes of work for insurance lodgement at no upfront cost.',
          },
        ]}
        relatedGuides={[
          { title: 'Storm Water Damage Sunshine Coast', href: '/storm-water-damage-restoration-sunshine-coast', description: 'Storm water and flooding restoration across the full Noosa-to-Caloundra corridor.' },
          { title: 'Water Damage Sunshine Coast', href: '/water-damage-restoration-sunshine-coast', description: 'Emergency water damage restoration across the Sunshine Coast.' },
          { title: 'Mould Remediation Sunshine Coast', href: '/mould-remediation-sunshine-coast', description: 'IICRC-certified mould remediation following storm and water damage on the Sunshine Coast.' },
          { title: 'Flood Damage Sunshine Coast', href: '/flood-damage-restoration-sunshine-coast', description: 'Professional flood damage restoration across the Sunshine Coast.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
