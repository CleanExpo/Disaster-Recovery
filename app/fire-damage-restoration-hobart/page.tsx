import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Hobart | Heritage Sandstone & Bushfire IICRC S700:2025',
  description: 'Emergency fire damage restoration across Hobart and Tasmania. IICRC S700:2025 certified contractors for heritage sandstone buildings, bushfire damage, and house fires. Specialist lime-compatible decontamination. Lodge your claim 24/7.',
  keywords: 'fire damage restoration hobart, fire damage hobart, bushfire damage tasmania, heritage sandstone fire restoration hobart, smoke damage hobart, soot damage tasmania, fire restoration hobart tasmania',
  openGraph: {
    title: 'Fire Damage Restoration Hobart | Heritage Sandstone & Bushfire IICRC S700:2025',
    description: 'Emergency fire damage restoration across Hobart and Tasmania. IICRC S700:2025 certified contractors for heritage sandstone buildings, bushfire damage, and house fires. Specialist lime-compatible decontamination. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Fire Damage Restoration')}&city=${encodeURIComponent('Hobart')}&service=fire-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-hobart`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-hobart/#localbusiness`,
  name: `${NAP.name} Hobart`,
  url: `${NAP.url}/fire-damage-restoration-hobart`,
  description: '24/7 emergency fire damage restoration across Hobart and Tasmania. IICRC S700:2025 certified contractor network for heritage sandstone buildings, bushfire damage, smoke, soot, and structural fire damage. Specialist lime-compatible decontamination.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Hobart', containedInPlace: { '@type': 'State', name: 'Tasmania' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Hobart', addressRegion: 'TAS', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Fire Damage Restoration Hobart',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Hobart', containedInPlace: { '@type': 'State', name: 'Tasmania' } },
  serviceType: 'Fire Damage Restoration',
  description: 'Professional fire and smoke damage restoration across Hobart and Tasmania. IICRC S700:2025 certified contractors for heritage sandstone decontamination, emergency make-safe, soot removal, bushfire structural damage, and odour elimination using lime-compatible methods.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does standard home insurance cover a rural bushfire like the 2013 Dunalley fire in Tasmania?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — bushfire is a standard insured peril under most Australian home insurance policies. Properties destroyed or damaged in events like the 2013 Dunalley fire (which destroyed over 200 properties on the Tasman Peninsula) are covered under the fire provision of standard policies. Rural properties in bushfire-prone areas may have specific BAL (Bushfire Attack Level) construction requirements noted in their policy — check your PDS for exclusions related to underinsurance. Tasmania's bushfire season runs December–March; properties in BAL zones on the eastern shore (Sorell, Rokeby, Midway Point) and southern suburbs (Kingston, Blackmans Bay) should confirm adequate sum insured before the season.",
      },
    },
    {
      '@type': 'Question',
      name: 'Why does heritage sandstone fire restoration cost more in Hobart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Heritage sandstone buildings in Battery Point, Salamanca, and North Hobart present unique restoration challenges after fire. Fire and smoke penetrate porous sandstone deeply — standard alkaline cleaners that work on modern masonry cannot be used on heritage sandstone or lime mortar without causing irreversible damage. Specialist lime-compatible decontamination methods are required, along with Heritage Tasmania-approved materials for any reinstatement. Costs for heritage sandstone property fire restoration typically range from $40,000 to over $200,000 depending on the scope of stone decontamination, structural remediation, and heritage compliance work required.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does Bushfire Attack Level (BAL) zoning affect home insurance in Hobart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Properties in BAL-rated zones — including Hobart's eastern shore suburbs (Sorell, Rokeby, Midway Point) and southern suburbs (Kingston, Blackmans Bay) — may have higher insurance premiums or specific policy conditions tied to construction standards. Some insurers require BAL-compliant construction features as a condition of cover. If you rebuild after a fire in a BAL zone, reinstatement must meet current BAL standards, which can significantly increase reconstruction costs compared to the original build. NRPG's certified contractors can document scope against current BAL requirements for insurer assessment.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does fire damage restoration typically cost for a Hobart property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Fire damage restoration costs in Hobart vary significantly by property type, fire extent, and heritage status. Indicative ranges: kitchen or residential fire (contained) $4,000–$18,000; structural fire requiring significant reconstruction $15,000–$60,000; heritage sandstone property with specialist decontamination and Heritage Tasmania compliance $40,000–$200,000+; rural Tasmanian property on large land (including fire approach infrastructure, outbuildings, fencing) $200,000+. Heritage sandstone properties sit at the upper end of any range due to the specialist lime-compatible decontamination and approved materials required.",
      },
    },
  ],
};

export default function FireDamageRestorationHobartPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="fdrhbt-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="fdrhbt-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="fdrhbt-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Hobart"
        subtitle="Emergency fire damage restoration across Hobart and Tasmania. IICRC S700:2025 certified contractors for heritage sandstone buildings, bushfire damage, and structural house fires. Specialist lime-compatible decontamination."
        gradient="linear-gradient(135deg, #1A0800 0%, #D84315 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Hobart' },
        ]}
        sections={[
          {
            heading: "Hobart Fire Risk — Heritage Buildings and Tasmania's Bushfire History",
            body: (
              <>
                <p>
                  While Hobart carries a lower bushfire risk than many mainland capitals, the city&apos;s eastern
                  shore and southern suburbs sit within Bushfire Attack Level (BAL) zones, and Tasmania&apos;s
                  record remains marked by catastrophic fire events. The 2013 Dunalley fire &mdash; Tasmania&apos;s
                  worst since 1967 &mdash; destroyed more than 200 properties on the Tasman Peninsula, crossed
                  the Arthur Highway, and cut off the village of Dunalley entirely. Tasmania&apos;s bushfire season
                  runs December&ndash;March.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  In Hobart&apos;s inner suburbs, the greater risk is house fires in the city&apos;s extensive
                  heritage building stock. Battery Point, Salamanca, and North Hobart contain some of Australia&apos;s
                  oldest residential buildings &mdash; sandstone and brick structures from the 1820s&ndash;1860s
                  where fire and smoke damage presents unique and expensive restoration challenges. NRPG&apos;s
                  IICRC S700:2025-certified contractors have experience across both bushfire damage on the Tasman
                  Peninsula and eastern shore, and complex heritage building fire restoration in Hobart&apos;s
                  inner suburbs.
                </p>
              </>
            ),
          },
          {
            heading: 'Sandstone Property Fire Restoration — Specialist Lime-Compatible Methods',
            body: (
              <>
                <p>
                  Heritage sandstone and brick buildings in Battery Point, Salamanca, South Hobart, and North
                  Hobart require a fundamentally different approach to fire and smoke restoration than modern
                  construction. Porous sandstone absorbs fire combustion byproducts, smoke, and soot deeply into
                  the stone matrix. Standard alkaline cleaning solutions &mdash; effective on modern masonry or
                  painted surfaces &mdash; cause irreversible damage to heritage sandstone and lime mortar joints
                  when applied without specialist knowledge.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG works with contractors experienced in lime-compatible decontamination methods approved for
                  Tasmanian heritage buildings. Any reinstatement work must comply with Heritage Tasmania
                  requirements for approved materials, including lime-based mortars and heritage-matched stone
                  repair. Standard insurer scope-of-works estimates frequently undervalue heritage sandstone
                  fire restoration &mdash; costs for significant heritage fire events typically range from
                  $40,000 to over $200,000 depending on the extent of stone decontamination required and Heritage
                  Tasmania compliance obligations.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Smoke penetration in heritage buildings also affects interior plasterwork, timber joinery, and
                  roof spaces. Odour elimination in sandstone buildings requires specialist encapsulation techniques
                  &mdash; standard paint-over odour blockers are not approved for heritage interiors and will not
                  address deep stone penetration.
                </p>
              </>
            ),
          },
          {
            heading: 'Hobart Areas We Cover',
            body: (
              <>
                <p>Emergency fire damage response across Greater Hobart and Tasmania:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Heritage Inner Hobart:</strong> Battery Point, Salamanca, South Hobart, West Hobart,
                  North Hobart
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern BAL Zones:</strong> Sandy Bay, Dynnyrne, Kingston, Blackmans Bay, Taroona
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern Shore (BAL &amp; Bushfire History):</strong> Sorell, Rokeby, Midway Point,
                  Howrah, Clarence
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Tasman Peninsula / Dunalley:</strong> Dunalley, Copping, Eaglehawk Neck (extended
                  response time applies)
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Rural / Derwent Valley:</strong> Huonville, New Norfolk, New Norfolk surrounds
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Corridor:</strong> Glenorchy, Moonah, Bridgewater, Derwent Park
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does standard home insurance cover a rural bushfire like the 2013 Dunalley fire in Tasmania?',
            answer: "Yes — bushfire is a standard insured peril under most Australian home insurance policies. Properties destroyed or damaged in events like the 2013 Dunalley fire (which destroyed over 200 properties on the Tasman Peninsula) are covered under the fire provision of standard policies. Rural properties in bushfire-prone areas may have specific BAL (Bushfire Attack Level) construction requirements noted in their policy — check your PDS for exclusions related to underinsurance. Tasmania's bushfire season runs December–March; properties in BAL zones on the eastern shore (Sorell, Rokeby, Midway Point) and southern suburbs (Kingston, Blackmans Bay) should confirm adequate sum insured before the season.",
          },
          {
            question: 'Why does heritage sandstone fire restoration cost more in Hobart?',
            answer: "Heritage sandstone buildings in Battery Point, Salamanca, and North Hobart present unique restoration challenges after fire. Fire and smoke penetrate porous sandstone deeply — standard alkaline cleaners that work on modern masonry cannot be used on heritage sandstone or lime mortar without causing irreversible damage. Specialist lime-compatible decontamination methods are required, along with Heritage Tasmania-approved materials for any reinstatement. Costs for heritage sandstone property fire restoration typically range from $40,000 to over $200,000 depending on the scope of stone decontamination, structural remediation, and heritage compliance work required.",
          },
          {
            question: 'How does Bushfire Attack Level (BAL) zoning affect home insurance in Hobart?',
            answer: "Properties in BAL-rated zones — including Hobart's eastern shore suburbs (Sorell, Rokeby, Midway Point) and southern suburbs (Kingston, Blackmans Bay) — may have higher insurance premiums or specific policy conditions tied to construction standards. Some insurers require BAL-compliant construction features as a condition of cover. If you rebuild after a fire in a BAL zone, reinstatement must meet current BAL standards, which can significantly increase reconstruction costs compared to the original build. NRPG's certified contractors can document scope against current BAL requirements for insurer assessment.",
          },
          {
            question: 'What does fire damage restoration typically cost for a Hobart property?',
            answer: "Fire damage restoration costs in Hobart vary significantly by property type, fire extent, and heritage status. Indicative ranges: kitchen or residential fire (contained) $4,000–$18,000; structural fire requiring significant reconstruction $15,000–$60,000; heritage sandstone property with specialist decontamination and Heritage Tasmania compliance $40,000–$200,000+; rural Tasmanian property on large land (including fire approach infrastructure, outbuildings, fencing) $200,000+. Heritage sandstone properties sit at the upper end of any range due to the specialist lime-compatible decontamination and approved materials required.",
          },
        ]}
        relatedGuides={[
          { title: 'Storm Damage Restoration Hobart', href: '/storm-damage-restoration-hobart', description: 'Emergency storm damage restoration across Hobart and Tasmania.' },
          { title: 'Water Damage Restoration Hobart', href: '/water-damage-restoration-hobart', description: 'IICRC-certified water damage restoration across Greater Hobart.' },
          { title: 'Mould Remediation Hobart', href: '/mould-remediation-hobart', description: 'Post-fire suppression mould remediation across Hobart.' },
          { title: 'Fire Damage Restoration Melbourne', href: '/fire-damage-restoration-melbourne', description: 'IICRC S700:2025 fire restoration across Melbourne and Victoria.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
