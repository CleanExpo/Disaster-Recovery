import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Hobart | Derwent Valley & Heritage Stone Specialists',
  description: 'Professional flood damage restoration across Hobart and Tasmania. IICRC S500:2025 certified specialists for Derwent River flooding, Hobart Rivulet flash flooding, and heritage sandstone foundation restoration. Lodge your claim 24/7.',
  keywords: 'flood damage restoration hobart, flood damage hobart, derwent river flooding, hobart rivulet flooding, heritage sandstone flood restoration hobart, 2016 east coast low hobart, new norfolk flooding, flood cleanup tasmania',
  openGraph: {
    title: 'Flood Damage Restoration Hobart | Derwent Valley & Heritage Stone Specialists',
    description: 'Professional flood damage restoration across Hobart and Tasmania. IICRC S500:2025 certified specialists for Derwent River flooding, Hobart Rivulet flash flooding, and heritage sandstone foundation restoration. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Flood Damage Restoration')}&city=${encodeURIComponent('Hobart')}&service=flood-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-hobart`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-hobart/#localbusiness`,
  name: `${NAP.name} Hobart`,
  url: `${NAP.url}/flood-damage-restoration-hobart`,
  description: 'IICRC S500:2025 certified flood damage restoration contractors serving Hobart and Tasmania. Specialists in Derwent River inundation, Hobart Rivulet flash flooding, heritage sandstone and bluestone foundation restoration, and full insurance documentation.',
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
  name: 'Flood Damage Restoration Hobart',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Hobart', containedInPlace: { '@type': 'State', name: 'Tasmania' } },
  serviceType: 'Flood Damage Restoration',
  description: 'Professional flood damage restoration across Hobart. IICRC S500:2025 certified contractors for Derwent River inundation, Hobart Rivulet flash flooding, heritage sandstone slow-drying protocols, emergency extraction, decontamination, and structural drying.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Derwent River flooding covered by standard home insurance in Tasmania?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Riverine flood inundation from the Derwent River — including events affecting New Norfolk, Boyer, and Bridgewater — requires a flood extension in most standard Australian home insurance policies. Without this extension, inundation claims from rising river levels may be declined. Storm-driven rain and flash flooding from small creek systems (such as the Hobart Rivulet) may be treated differently under the storm provision. Correct peril classification at lodgement is critical: if your property sustained both storm-driven water ingress and river inundation simultaneously, each cause should be documented separately. NRPG's contractors provide itemised scope documentation distinguishing each damage cause for insurer assessment.",
      },
    },
    {
      '@type': 'Question',
      name: 'Why does heritage sandstone flood restoration require slow drying in Hobart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Heritage sandstone and bluestone foundation walls in Hobart's Battery Point, Salamanca, and South Hobart properties are highly susceptible to structural spalling if dried too rapidly after flood inundation. Sandstone is a porous material that absorbs water throughout its depth — aggressive forced-air drying or dehumidification that draws moisture out too quickly causes crystallisation of dissolved salts within the stone matrix, leading to surface spalling, cracking, and permanent structural damage. NRPG's contractors apply specialist slow-drying protocols approved for heritage masonry, using controlled drying rates monitored over extended periods. Standard residential drying equipment and timelines are not appropriate for heritage sandstone buildings.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does the Hobart Rivulet flooding affect properties in South Hobart and West Hobart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. The Hobart Rivulet runs through the CBD and through South Hobart, West Hobart, and Battery Point. During intense rainfall events — such as the June 2016 east coast low that caused record rainfall across Hobart — the rivulet system can overflow into residential properties, particularly those in lower-lying sections of South Hobart and West Hobart. Flash flooding from steep hillside runoff adds to the risk during heavy rain. Properties affected by Hobart Rivulet overflow are typically subject to Category 3 contamination protocols due to the combined stormwater and urban runoff nature of the overflow. An IICRC S500:2025 certified assessment is recommended before any reinstatement work.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does flood damage restoration typically cost for a Hobart property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Flood damage restoration costs in Hobart vary by inundation depth, property type, and heritage status. Indicative ranges: minor creek flooding or surface water ingress $4,000–$18,000; ground floor Derwent River inundation $12,000–$50,000; heritage sandstone or bluestone foundation restoration requiring specialist slow-drying and Heritage Tasmania-approved materials $25,000–$100,000+. Heritage properties sit at the upper end of all cost ranges due to the extended drying protocols required and the specialist materials needed for reinstatement under Heritage Tasmania requirements.",
      },
    },
  ],
};

export default function FloodDamageRestorationHobartPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="fdhbt-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="fdhbt-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="fdhbt-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="Flood Damage Restoration Hobart"
        subtitle="IICRC S500:2025 certified flood damage restoration across Hobart and Tasmania. Derwent River inundation, Hobart Rivulet flash flooding, and heritage sandstone foundation specialists. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0F2942 0%, #01579B 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Hobart Flood' },
        ]}
        sections={[
          {
            heading: 'Hobart Flood Risk — Derwent Valley and Heritage Stone Buildings',
            body: (
              <>
                <p>
                  Hobart&apos;s primary flood corridor is the Derwent River, which rises approximately 45km north
                  of the city at New Norfolk. When heavy rainfall saturates the upper Derwent catchment, downstream
                  communities including Boyer, Bridgewater, and New Norfolk itself can experience significant
                  inundation. The Derwent estuary&apos;s tidal reach extends into Hobart, meaning coastal high
                  tides can compound flood risk during major rainfall events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Within the inner city, the Hobart Rivulet &mdash; which runs through the CBD and through South
                  Hobart, West Hobart, and Battery Point &mdash; presents a flash flooding risk during intense
                  rainfall. Steep hillside catchments accelerate runoff into the rivulet system, overwhelming
                  capacity rapidly. Properties in lower-lying sections of South Hobart and West Hobart are most
                  exposed to Hobart Rivulet overflow events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Southern and eastern Hobart suburbs face additional risk from smaller creek systems: Kingborough
                  Creek in Kingston and Blackmans Bay, and seasonal watercourses on the Eastern Shore
                  (Rokeby, Clarence, Lindisfarne) that can overflow during intense east coast low events.
                </p>
              </>
            ),
          },
          {
            heading: '2016 East Coast Low and Flash Flooding — Hobart and Tasmania',
            body: (
              <>
                <p>
                  The June 2016 east coast low delivered record rainfall across Hobart and Launceston, triggering
                  flash flooding, landslides, and infrastructure damage across the city. Steep residential hillsides
                  in South Hobart, West Hobart, and Battery Point sent saturated surface runoff into properties
                  below. The 2016 event highlighted the vulnerability of Hobart&apos;s heritage building stock
                  to flooding events &mdash; particularly sandstone and bluestone foundations that were not
                  engineered to modern flood resistance standards.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Heritage sandstone and bluestone foundation walls present a specific challenge: they must be
                  dried slowly after flood inundation to prevent structural spalling. Rapid forced-air drying
                  draws moisture through the stone too quickly, causing dissolved salt crystallisation within
                  the stone matrix that leads to permanent surface damage. NRPG contractors apply specialist
                  slow-drying protocols approved for heritage masonry &mdash; using controlled drying rates
                  monitored with embedded moisture sensors over extended periods, rather than the rapid
                  dehumidification approach used in modern residential buildings.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Flood damage costs for heritage sandstone properties in Hobart typically range from
                  $25,000&ndash;$100,000+ depending on foundation inundation depth, heritage material
                  requirements, and the extent of Heritage Tasmania compliance obligations for reinstatement.
                </p>
              </>
            ),
          },
          {
            heading: 'Hobart Areas We Cover',
            body: (
              <>
                <p>Emergency flood damage response across Greater Hobart and Tasmania:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Derwent Valley / Flood Corridor:</strong> New Norfolk, Boyer, Bridgewater,
                  Glenorchy, Moonah
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Heritage Inner Hobart / Hobart Rivulet:</strong> South Hobart, West Hobart,
                  Battery Point, Salamanca
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern Shore:</strong> Rokeby, Clarence, Lindisfarne, Howrah
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Hobart / Kingborough Creek:</strong> Kingston, Blackmans Bay, Taroona
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Huon Valley:</strong> Huonville, Geeveston (Huon River corridor)
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hobart CBD &amp; Surrounds:</strong> Hobart CBD, North Hobart, Sandy Bay,
                  Dynnyrne
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Derwent River flooding covered by standard home insurance in Tasmania?',
            answer: "Riverine flood inundation from the Derwent River — including events affecting New Norfolk, Boyer, and Bridgewater — requires a flood extension in most standard Australian home insurance policies. Without this extension, inundation claims from rising river levels may be declined. Storm-driven rain and flash flooding from small creek systems (such as the Hobart Rivulet) may be treated differently under the storm provision. Correct peril classification at lodgement is critical: if your property sustained both storm-driven water ingress and river inundation simultaneously, each cause should be documented separately. NRPG's contractors provide itemised scope documentation distinguishing each damage cause for insurer assessment.",
          },
          {
            question: 'Why does heritage sandstone flood restoration require slow drying in Hobart?',
            answer: "Heritage sandstone and bluestone foundation walls in Hobart's Battery Point, Salamanca, and South Hobart properties are highly susceptible to structural spalling if dried too rapidly after flood inundation. Sandstone is a porous material that absorbs water throughout its depth — aggressive forced-air drying or dehumidification that draws moisture out too quickly causes crystallisation of dissolved salts within the stone matrix, leading to surface spalling, cracking, and permanent structural damage. NRPG's contractors apply specialist slow-drying protocols approved for heritage masonry, using controlled drying rates monitored over extended periods. Standard residential drying equipment and timelines are not appropriate for heritage sandstone buildings.",
          },
          {
            question: 'Does the Hobart Rivulet flooding affect properties in South Hobart and West Hobart?',
            answer: "Yes. The Hobart Rivulet runs through the CBD and through South Hobart, West Hobart, and Battery Point. During intense rainfall events — such as the June 2016 east coast low that caused record rainfall across Hobart — the rivulet system can overflow into residential properties, particularly those in lower-lying sections of South Hobart and West Hobart. Flash flooding from steep hillside runoff adds to the risk during heavy rain. Properties affected by Hobart Rivulet overflow are typically subject to Category 3 contamination protocols due to the combined stormwater and urban runoff nature of the overflow. An IICRC S500:2025 certified assessment is recommended before any reinstatement work.",
          },
          {
            question: 'What does flood damage restoration typically cost for a Hobart property?',
            answer: "Flood damage restoration costs in Hobart vary by inundation depth, property type, and heritage status. Indicative ranges: minor creek flooding or surface water ingress $4,000–$18,000; ground floor Derwent River inundation $12,000–$50,000; heritage sandstone or bluestone foundation restoration requiring specialist slow-drying and Heritage Tasmania-approved materials $25,000–$100,000+. Heritage properties sit at the upper end of all cost ranges due to the extended drying protocols required and the specialist materials needed for reinstatement under Heritage Tasmania requirements.",
          },
        ]}
        relatedGuides={[
          { title: 'Water Damage Restoration Hobart', href: '/water-damage-restoration-hobart', description: 'IICRC-certified water damage restoration across Greater Hobart.' },
          { title: 'Storm Damage Restoration Hobart', href: '/storm-damage-restoration-hobart', description: 'Emergency storm damage restoration across Hobart and Tasmania.' },
          { title: 'Mould Remediation Hobart', href: '/mould-remediation-hobart', description: 'Post-flood mould remediation across Hobart.' },
          { title: 'Flood Damage Restoration Melbourne', href: '/flood-damage-restoration-melbourne', description: 'IICRC Category 3 flood damage restoration across Melbourne.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
