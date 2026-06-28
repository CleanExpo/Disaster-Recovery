import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Canberra | 2003 Bushfire Zone & Heritage ACT IICRC S700:2025',
  description: 'Emergency fire damage restoration across Canberra and the ACT. IICRC S700:2025 certified contractors for bush-urban interface properties, ACT Heritage buildings, and structural fire damage. Duffy, Chapman, Weston Creek, Tuggeranong and surrounds.',
  keywords: 'fire damage restoration canberra, fire damage canberra, bushfire damage act, canberra fire restoration, smoke damage canberra, soot damage act, fire restoration act canberra, 2003 canberra bushfire, weston creek fire damage',
  openGraph: {
    title: 'Fire Damage Restoration Canberra | 2003 Bushfire Zone & Heritage ACT IICRC S700:2025',
    description: 'Emergency fire damage restoration across Canberra and the ACT. IICRC S700:2025 certified contractors for bush-urban interface properties, ACT Heritage buildings, and structural fire damage. Duffy, Chapman, Weston Creek, Tuggeranong and surrounds.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Fire Damage Restoration')}&city=${encodeURIComponent('Canberra')}&service=fire-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-canberra`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-canberra/#localbusiness`,
  name: `${NAP.name} Canberra`,
  url: `${NAP.url}/fire-damage-restoration-canberra`,
  description: '24/7 emergency fire damage restoration across Canberra and the ACT. IICRC S700:2025 certified contractor network for bush-urban interface properties, ACT Heritage buildings, smoke, soot, and structural fire damage. Duffy, Chapman, Weston Creek, Tuggeranong and surrounds.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Canberra', containedInPlace: { '@type': 'State', name: 'Australian Capital Territory' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Canberra', addressRegion: 'ACT', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Fire Damage Restoration Canberra',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Canberra', containedInPlace: { '@type': 'State', name: 'Australian Capital Territory' } },
  serviceType: 'Fire Damage Restoration',
  description: 'Professional fire and smoke damage restoration across Canberra and the ACT. IICRC S700:2025 certified contractors for bush-urban interface properties, ACT Heritage Council-compliant building restoration, emergency make-safe, soot removal, bushfire structural damage, and odour elimination.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'If another 2003-style bushfire hit Canberra today, would standard home insurance cover it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — bushfire is a standard insured peril under virtually all Australian home insurance policies. A repeat of the January 2003 Canberra fires — which destroyed over 500 homes in Duffy, Chapman, Kambah, Rivett, and Holder — would be covered under the fire provision of standard policies. The major issue Canberra homeowners should focus on is not whether they are covered, but whether they are adequately insured. Properties in Duffy, Chapman, and Weston Creek that were rebuilt after 2003 are now valued at $1.5M–$2.5M or more. If your sum insured has not kept pace with current rebuild costs — including BAL FZ/40 construction requirements for properties on the bush interface — you face a significant underinsurance gap. Review your PDS carefully and request an independent valuation if your property borders Namadgi National Park or Stromlo Forest.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are the ACT Heritage Council requirements for fire restoration of a heritage-listed building?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Heritage-listed buildings in Canberra — including properties in the Kingston Foreshore precinct, the Old Parliament House surrounds (Barton, Forrest), and Academy of Science precinct — are subject to Heritage Council of ACT oversight for any post-fire reinstatement work. This means any replacement materials, structural repairs, and surface treatments must be approved by or notified to the Heritage Council. Unauthorised substitution of heritage materials (for example, replacing heritage-matched brick with modern equivalents) can result in enforcement action even in a post-fire context. NRPG's certified contractors can scope fire restoration work with Heritage Council requirements in mind and assist in documentation for insurer assessment. Costs for ACT heritage building fire restoration typically carry a 30–60% premium over equivalent modern construction due to approved materials and specialist workmanship requirements.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does living in a Namadgi National Park interface zone or BAL FZ/40 area affect my fire insurance premiums?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, significantly. Properties in suburbs bordering Namadgi National Park — including Banks, Macgregor, Calwell, Wanniassa, and outer Tuggeranong — often carry BAL FZ (Flame Zone) or BAL 40 ratings. Many insurers apply higher fire-specific premiums for properties in these zones, and some have specific construction compliance requirements as a condition of cover. If your property was built before current BAL construction standards, a rebuild following fire damage must meet current ACT requirements — this can add substantially to reinstatement costs compared to the original construction. Some insurers operating in high BAL zones also impose bushfire-season exclusion windows or special conditions — check your PDS and speak to your broker before December each year.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does fire damage restoration cost for a Canberra property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Fire damage restoration costs across Canberra vary widely depending on property type, fire extent, and location. Indicative ranges: kitchen or contained electrical fire $5,000–$20,000; structural fire requiring significant reconstruction $15,000–$70,000; ACT Heritage-listed property with Heritage Council compliance $50,000–$250,000+; BAL FZ/40 total-loss property on the Namadgi interface (many now valued at $2M+) $50,000–$500,000 or more depending on rebuild specification. Properties in the 2003 Canberra bushfire footprint — Duffy, Chapman, Rivett, Holder — have risen dramatically in value since reconstruction; rebuilding to current BAL FZ standards adds cost that original 1970s–80s construction did not carry.",
      },
    },
  ],
};

export default function FireDamageRestorationCanberraPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="fdrcbr-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="fdrcbr-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="fdrcbr-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Canberra"
        subtitle="Emergency fire damage restoration across Canberra and the ACT. IICRC S700:2025 certified contractors for bush-urban interface properties, ACT Heritage buildings, and structural house fires. Serving the 2003 fire ground and Namadgi interface suburbs."
        gradient="linear-gradient(135deg, #1A0800 0%, #D84315 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Canberra' },
        ]}
        sections={[
          {
            heading: "Canberra Fire Risk — 2003 Bushfires and the Bush-Urban Interface",
            body: (
              <>
                <p>
                  The January 2003 Canberra bushfires remain the worst urban bushfire disaster in Australian
                  history. Over 500 homes were destroyed across Duffy, Chapman, Kambah, Rivett, and Holder in
                  a single afternoon &mdash; four people died, and entire suburbs were erased from the
                  Weston Creek and Tuggeranong districts. More than two decades later, the 2003 fires define
                  how Canberra residents, planners, and insurers think about fire risk in the ACT.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  That risk has not diminished. Canberra&apos;s western and southern suburbs border Namadgi
                  National Park and Stromlo Forest Park &mdash; the same landscapes that drove the 2003
                  firestorm. Suburbs including Banks, Macgregor, Calwell, Wanniassa, and outer Tuggeranong
                  carry Bushfire Attack Level (BAL) FZ or BAL 40 ratings, meaning they sit in Australia&apos;s
                  highest fire danger classifications. Canberra&apos;s fire season runs December&ndash;March.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG&apos;s IICRC S700:2025-certified contractors respond to fire damage across the ACT,
                  including both structural house fires and bush-interface fire events. Our network has
                  experience with the specific challenges of ACT properties &mdash; from BAL-compliant
                  reinstatement in Tuggeranong to heritage compliance work in the inner south.
                </p>
              </>
            ),
          },
          {
            heading: 'ACT Heritage Building Fire Restoration',
            body: (
              <>
                <p>
                  Canberra&apos;s heritage buildings present distinct fire restoration challenges. The Kingston
                  Foreshore precinct, Old Parliament House surrounds (Barton, Forrest, Griffith), the Academy
                  of Science precinct, and other nationally significant precincts contain buildings subject to
                  Heritage Council of ACT oversight. Any post-fire reinstatement on a heritage-listed property
                  requires approved materials, specialist workmanship, and in many cases formal notification to
                  or approval by the Heritage Council before work commences.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Standard fire restoration scopes prepared by insurance assessors frequently do not account
                  for heritage compliance obligations &mdash; materials substitution, approved colour matching,
                  and specialist trades. This gap between a standard scope and a compliant heritage scope can
                  be significant. NRPG&apos;s certified contractors understand ACT Heritage Council requirements
                  and can prepare documentation that supports an accurate insurer scope from the outset,
                  reducing delays caused by scope revisions mid-project.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Fire and smoke penetration in older masonry buildings in Barton, Kingston, and Griffith
                  also requires specialist decontamination approaches. Soot and combustion byproducts embed
                  into porous brick and mortar &mdash; surface cleaning alone does not address deep
                  penetration, and standard encapsulants are not appropriate for heritage masonry. Specialist
                  assessment is essential before any scope is finalised.
                </p>
              </>
            ),
          },
          {
            heading: 'ACT Suburbs We Cover',
            body: (
              <>
                <p>Emergency fire damage response across Canberra and the ACT:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>2003 Fire Ground (Weston Creek):</strong> Duffy, Chapman, Rivett, Holder, Weston
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Namadgi Interface (South / Tuggeranong):</strong> Banks, Macgregor, Calwell,
                  Wanniassa, Kambah, Conder, Gordon
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner South / Heritage:</strong> Kingston, Barton, Griffith, Forrest, Manuka,
                  Red Hill
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner North / Central:</strong> Braddon, Ainslie, Downer, Watson, Bruce
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Belconnen / North-West:</strong> Belconnen, Macquarie, Emu Ridge, Flynn, Latham
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Gungahlin / Outer North:</strong> Gungahlin, Ngunnawal, Nicholls, Palmerston,
                  Forde
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'If another 2003-style bushfire hit Canberra today, would standard home insurance cover it?',
            answer: "Yes — bushfire is a standard insured peril under virtually all Australian home insurance policies. A repeat of the January 2003 Canberra fires — which destroyed over 500 homes in Duffy, Chapman, Kambah, Rivett, and Holder — would be covered under the fire provision of standard policies. The major issue Canberra homeowners should focus on is not whether they are covered, but whether they are adequately insured. Properties in Duffy, Chapman, and Weston Creek that were rebuilt after 2003 are now valued at $1.5M–$2.5M or more. If your sum insured has not kept pace with current rebuild costs — including BAL FZ/40 construction requirements for properties on the bush interface — you face a significant underinsurance gap. Review your PDS carefully and request an independent valuation if your property borders Namadgi National Park or Stromlo Forest.",
          },
          {
            question: 'What are the ACT Heritage Council requirements for fire restoration of a heritage-listed building?',
            answer: "Heritage-listed buildings in Canberra — including properties in the Kingston Foreshore precinct, the Old Parliament House surrounds (Barton, Forrest), and Academy of Science precinct — are subject to Heritage Council of ACT oversight for any post-fire reinstatement work. This means any replacement materials, structural repairs, and surface treatments must be approved by or notified to the Heritage Council. Unauthorised substitution of heritage materials (for example, replacing heritage-matched brick with modern equivalents) can result in enforcement action even in a post-fire context. NRPG's certified contractors can scope fire restoration work with Heritage Council requirements in mind and assist in documentation for insurer assessment. Costs for ACT heritage building fire restoration typically carry a 30–60% premium over equivalent modern construction due to approved materials and specialist workmanship requirements.",
          },
          {
            question: 'Does living in a Namadgi National Park interface zone or BAL FZ/40 area affect my fire insurance premiums?',
            answer: "Yes, significantly. Properties in suburbs bordering Namadgi National Park — including Banks, Macgregor, Calwell, Wanniassa, and outer Tuggeranong — often carry BAL FZ (Flame Zone) or BAL 40 ratings. Many insurers apply higher fire-specific premiums for properties in these zones, and some have specific construction compliance requirements as a condition of cover. If your property was built before current BAL construction standards, a rebuild following fire damage must meet current ACT requirements — this can add substantially to reinstatement costs compared to the original construction. Some insurers operating in high BAL zones also impose bushfire-season exclusion windows or special conditions — check your PDS and speak to your broker before December each year.",
          },
          {
            question: 'What does fire damage restoration cost for a Canberra property?',
            answer: "Fire damage restoration costs across Canberra vary widely depending on property type, fire extent, and location. Indicative ranges: kitchen or contained electrical fire $5,000–$20,000; structural fire requiring significant reconstruction $15,000–$70,000; ACT Heritage-listed property with Heritage Council compliance $50,000–$250,000+; BAL FZ/40 total-loss property on the Namadgi interface (many now valued at $2M+) $50,000–$500,000 or more depending on rebuild specification. Properties in the 2003 Canberra bushfire footprint — Duffy, Chapman, Rivett, Holder — have risen dramatically in value since reconstruction; rebuilding to current BAL FZ standards adds cost that original 1970s–80s construction did not carry.",
          },
        ]}
        relatedGuides={[
          { title: 'Storm Damage Restoration Canberra', href: '/storm-damage-restoration-canberra', description: 'Emergency storm damage restoration across Canberra and the ACT.' },
          { title: 'Water Damage Restoration Canberra', href: '/water-damage-restoration-canberra', description: 'IICRC-certified water damage restoration across Greater Canberra.' },
          { title: 'Flood Damage Restoration Canberra', href: '/flood-damage-restoration-canberra', description: 'Flood damage restoration across the ACT and Canberra region.' },
          { title: 'Fire Damage Restoration Melbourne', href: '/fire-damage-restoration-melbourne', description: 'IICRC S700:2025 fire restoration across Melbourne and Victoria.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
