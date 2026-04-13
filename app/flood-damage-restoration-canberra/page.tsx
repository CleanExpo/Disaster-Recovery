import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Canberra | Murrumbidgee & ACT IICRC S500',
  description: 'Emergency flood damage restoration across Canberra and the ACT. IICRC S500:2025 certified contractors for Murrumbidgee inundation, creek flooding, and government building restoration. Lodge your claim 24/7.',
  keywords: 'flood damage canberra, flood damage ACT, murrumbidgee flood canberra, flood restoration tuggeranong, flood damage molonglo valley, ACT government building flood, canberra creek flooding, flood damage weston creek',
  openGraph: {
    title: 'Flood Damage Restoration Canberra | Murrumbidgee & ACT IICRC S500',
    description: 'Emergency flood damage restoration across Canberra and the ACT. Murrumbidgee inundation, creek overflow, and government/heritage building restoration. IICRC S500:2025 certified. priority response.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Flood Damage Restoration')}&city=${encodeURIComponent('Canberra')}&service=flood-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-canberra`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-canberra/#localbusiness`,
  name: `${NAP.name} Canberra`,
  url: `${NAP.url}/flood-damage-restoration-canberra`,
  description: 'IICRC S500:2025 certified flood damage restoration contractors serving Canberra and the ACT. Murrumbidgee River inundation, creek flooding, and specialist government building restoration.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'Place', name: 'Canberra', containedInPlace: { '@type': 'AdministrativeArea', name: 'Australian Capital Territory' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Canberra', addressRegion: 'ACT', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Flood Damage Restoration Canberra',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Canberra' },
  serviceType: 'Flood Damage Restoration',
  description: 'Professional flood damage restoration across Canberra and the ACT: emergency water extraction, structural drying to IICRC S500:2025, Murrumbidgee inundation response, creek flooding, and specialist government and heritage building restoration.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Murrumbidgee River flooding in Canberra covered by home insurance?',
      acceptedAnswer: { '@type': 'Answer', text: 'Flood coverage for Murrumbidgee River inundation depends on your home insurance policy\'s definition of flood and whether you have purchased flood cover as an optional extension. Many standard home insurance policies in Australia exclude riverine flood events as a default peril, requiring a separate flood endorsement. Suburbs along the Murrumbidgee corridor — including parts of Kambah, Tuggeranong, Weston Creek, and the Molonglo Valley — are in flood-mapped zones where insurers may apply additional premiums or exclusions. NRPG provides detailed scope reports and documentation to support flood insurance claims regardless of the claim outcome.' },
    },
    {
      '@type': 'Question',
      name: 'Can Canberra homeowners still lodge a supplementary claim from the 2022 La Niña flooding?',
      acceptedAnswer: { '@type': 'Answer', text: 'ACT homeowners who experienced flooding during the 2022 La Niña event and whose claims were underpaid, disputed, or incompletely remediated may still have avenues available. If residual damage — such as ongoing mould growth, structural moisture, or incomplete reinstatement — can be linked to the original flood event, a supplementary claim or AFCA dispute may be viable. The limitation period for lodging insurance disputes varies, and legal advice is recommended for historical claims. NRPG can provide independent IICRC-certified reassessment and documentation to support any supplementary or dispute process.' },
    },
    {
      '@type': 'Question',
      name: 'Are ACT government and Commonwealth buildings covered for flood damage differently?',
      acceptedAnswer: { '@type': 'Answer', text: 'ACT government and Commonwealth-owned buildings near Lake Burley Griffin, Parkes, and low-lying parts of the parliamentary precinct have specialist flood contingency plans and are typically managed under government self-insurance or dedicated Commonwealth risk frameworks rather than standard commercial property insurance. Restoration of government and heritage-listed buildings requires contractors with experience in heritage materials, secure-site access protocols, and the documentation requirements of ACT government procurement. NRPG contractors working in the ACT government and heritage sector carry appropriate clearances and specialist restoration capability.' },
    },
    {
      '@type': 'Question',
      name: 'How much does flood damage restoration cost in Canberra?',
      acceptedAnswer: { '@type': 'Answer', text: 'Flood damage restoration costs in Canberra depend on the flood source and scale of inundation. Minor creek flooding — from Giralang, Kaleen, Charnwood, or similar ACT creek systems — typically results in costs ranging from $4,000 to $18,000 for localised water extraction, structural drying, and reinstatement. Murrumbidgee River inundation affecting larger areas of a property ranges from $12,000 to $50,000 depending on the depth and duration of flood water. Government or heritage building restoration involving specialist materials and clearance requirements ranges from $30,000 to $100,000 or more. NRPG provides itemised scopes of work for insurance lodgement at no upfront cost.' },
    },
  ],
};

export default function FloodDamageRestorationCanberraPage() {
  return (
    <>
      <Script id="fdcbr-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="fdcbr-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="fdcbr-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="Flood Damage Restoration Canberra"
        subtitle="Emergency flood damage restoration across Canberra and the ACT. Murrumbidgee inundation, creek flooding, and specialist government building restoration. IICRC S500:2025 certified. priority response."
        gradient="linear-gradient(135deg, #0F2942 0%, #01579B 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Flood Damage', href: '/services/water-damage' },
          { label: 'Canberra' },
        ]}
        sections={[
          {
            heading: 'Canberra Flood Risk — Murrumbidgee River and 2022 La Niña',
            body: (
              <>
                <p>
                  The Murrumbidgee River is Canberra&rsquo;s major river corridor, running through the western
                  and southern suburbs of the ACT before continuing into NSW. Suburbs along the Murrumbidgee
                  corridor — including parts of Kambah, Tuggeranong, Weston Creek, and the Molonglo Valley —
                  sit within flood-mapped zones that are subject to inundation risk during significant
                  rainfall events and upstream catchment runoff.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The 2022 La Ni&ntilde;a event produced significant flooding across the ACT, with Murrumbidgee
                  River overflow affecting riverside properties in Kambah, Tuggeranong, and the Molonglo
                  Valley. Extended periods of above-average rainfall saturated ACT catchments and caused
                  prolonged drainage delays in low-lying suburbs. Many affected property owners experienced
                  compound damage from initial inundation followed by secondary mould and structural
                  deterioration during the extended drying period.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Smaller ACT creek systems — including creeks through Giralang, Kaleen, and Charnwood —
                  overflow during intense summer thunderstorm events that are a recurring feature of
                  Canberra&rsquo;s climate. These localised creek flooding events can cause significant property
                  damage in a short timeframe despite not involving the Murrumbidgee main channel.
                </p>
              </>
            ),
          },
          {
            heading: 'ACT Government Building Flood Damage',
            body: (
              <>
                <p>
                  Canberra&rsquo;s concentration of Commonwealth and ACT government buildings near Lake Burley
                  Griffin, the parliamentary precinct in Parkes, and low-lying areas of the national
                  capital creates a distinct flood damage risk profile not present in other Australian
                  cities. Many Commonwealth buildings in these areas have formal flood contingency plans
                  and are managed under government self-insurance or dedicated Commonwealth risk frameworks.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Heritage-listed buildings throughout central Canberra — including properties on the
                  parliamentary triangle and in established inner suburbs — require specialist restoration
                  capability. Heritage flood damage restoration involves working with period materials,
                  maintaining heritage fabric where possible, and complying with ACT Heritage Council
                  requirements for approved reinstatement methods.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG contractors operating in the ACT government and heritage sector carry appropriate
                  clearances, understand government procurement documentation requirements, and have
                  experience with the specialist materials and methods required for heritage-compliant
                  flood restoration in Canberra.
                </p>
              </>
            ),
          },
          {
            heading: 'Suburbs We Cover',
            body: (
              <>
                <p>
                  NRPG contractors cover the full ACT and Canberra metro area for flood damage restoration:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Tuggeranong Valley:</strong> Kambah, Tuggeranong, Greenway, Calwell, Wanniassa, Macarthur
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Weston Creek:</strong> Weston, Waramanga, Rivett, Stirling, Chapman
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Molonglo Valley:</strong> Coombs, Wright, Whitlam, Denman Prospect
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner North:</strong> Giralang, Kaleen, Charnwood, Belconnen, Bruce
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Central Canberra:</strong> Parkes, Barton, Kingston, Manuka, Yarralumla
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner South:</strong> Woden, Phillip, Curtin, Hughes, Garran
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate contractor
                  matching across Canberra and the ACT.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Murrumbidgee River flooding in Canberra covered by home insurance?',
            answer: "Flood coverage for Murrumbidgee River inundation depends on your home insurance policy's definition of flood and whether you have purchased flood cover as an optional extension. Many standard home insurance policies in Australia exclude riverine flood events as a default peril, requiring a separate flood endorsement. Suburbs along the Murrumbidgee corridor — including parts of Kambah, Tuggeranong, Weston Creek, and the Molonglo Valley — are in flood-mapped zones where insurers may apply additional premiums or exclusions. NRPG provides detailed scope reports and documentation to support flood insurance claims regardless of the claim outcome.",
          },
          {
            question: 'Can Canberra homeowners still lodge a supplementary claim from the 2022 La Niña flooding?',
            answer: 'ACT homeowners who experienced flooding during the 2022 La Niña event and whose claims were underpaid, disputed, or incompletely remediated may still have avenues available. If residual damage — such as ongoing mould growth, structural moisture, or incomplete reinstatement — can be linked to the original flood event, a supplementary claim or AFCA dispute may be viable. The limitation period for lodging insurance disputes varies, and legal advice is recommended for historical claims. NRPG can provide independent IICRC-certified reassessment and documentation to support any supplementary or dispute process.',
          },
          {
            question: 'Are ACT government and Commonwealth buildings covered for flood damage differently?',
            answer: 'ACT government and Commonwealth-owned buildings near Lake Burley Griffin, Parkes, and low-lying parts of the parliamentary precinct have specialist flood contingency plans and are typically managed under government self-insurance or dedicated Commonwealth risk frameworks rather than standard commercial property insurance. Restoration of government and heritage-listed buildings requires contractors with experience in heritage materials, secure-site access protocols, and the documentation requirements of ACT government procurement. NRPG contractors working in the ACT government and heritage sector carry appropriate clearances and specialist restoration capability.',
          },
          {
            question: 'How much does flood damage restoration cost in Canberra?',
            answer: 'Flood damage restoration costs in Canberra depend on the flood source and scale of inundation. Minor creek flooding — from Giralang, Kaleen, Charnwood, or similar ACT creek systems — typically results in costs ranging from $4,000 to $18,000 for localised water extraction, structural drying, and reinstatement. Murrumbidgee River inundation affecting larger areas of a property ranges from $12,000 to $50,000 depending on the depth and duration of flood water. Government or heritage building restoration involving specialist materials and clearance requirements ranges from $30,000 to $100,000 or more. NRPG provides itemised scopes of work for insurance lodgement at no upfront cost.',
          },
        ]}
        relatedGuides={[
          { title: 'Storm Damage Canberra', href: '/storm-damage-restoration-canberra', description: 'Storm damage restoration across Canberra and the ACT.' },
          { title: 'Water Damage Canberra', href: '/water-damage-restoration-canberra', description: 'Emergency water damage restoration across Canberra and the ACT.' },
          { title: 'Mould Remediation Canberra', href: '/mould-remediation-canberra', description: 'IICRC-certified mould remediation following flood and water damage in Canberra.' },
          { title: 'Flood Damage Melbourne', href: '/flood-damage-restoration-melbourne', description: 'Professional flood damage restoration across Melbourne and Victoria.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
