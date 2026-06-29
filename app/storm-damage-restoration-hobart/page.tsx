import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Hobart | Southern Ocean & Heritage Property 24/7',
  description: 'Emergency storm damage restoration across Hobart and Tasmania. IICRC-certified contractors for Southern Ocean wind events, heritage stone building restoration, and Derwent River flooding. Lodge your claim 24/7.',
  keywords: 'storm damage restoration hobart, storm damage hobart, heritage property storm damage tasmania, southern ocean storm hobart, wind damage hobart, storm restoration tasmania, derwent river flooding',
  openGraph: {
    title: 'Storm Damage Restoration Hobart | Southern Ocean & Heritage Property 24/7',
    description: 'Emergency storm damage restoration across Hobart and Tasmania. IICRC-certified contractors for Southern Ocean wind events, heritage stone building restoration, and Derwent River flooding. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Hobart')}&service=storm-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-hobart`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-hobart/#localbusiness`,
  name: `${NAP.name} Hobart`,
  url: `${NAP.url}/storm-damage-restoration-hobart`,
  description: '24/7 emergency storm damage restoration across Hobart and Tasmania. IICRC-certified contractor network for Southern Ocean wind damage, heritage stone building restoration, and Derwent River flood events.',
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
  name: 'Emergency Storm Damage Restoration Hobart',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Hobart', containedInPlace: { '@type': 'State', name: 'Tasmania' } },
  serviceType: 'Storm Damage Restoration',
  description: 'Professional storm damage restoration across Hobart including emergency make-safe, heritage stone building repair compliant with Heritage Tasmania requirements, structural restoration, and full insurance documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What storm risks does Hobart face from Southern Ocean weather systems?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Hobart at 42°S is directly exposed to Southern Ocean low-pressure systems that deliver powerful westerly wind events, particularly in winter (June–August). These systems can generate sustained winds exceeding 100 km/h across elevated suburbs such as Mt Nelson, Sandy Bay, and Dynnyrne, causing structural damage including roof failures, fallen trees, broken windows, and internal water ingress. Ex-tropical systems reaching southern Australia in weakened form can compound these risks. The 2016 east coast low caused widespread flash flooding across Hobart and Launceston.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does standard home insurance cover storm damage to heritage properties in Hobart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — storm damage is a standard insured peril under most Australian home insurance policies, including for heritage properties. However, heritage buildings in Hobart (Battery Point, Salamanca, North Hobart) often require specialist restoration contractors who can work within Heritage Tasmania requirements for approved materials and techniques. Standard rebuild cost estimates may significantly undervalue heritage stone and colonial-era construction. NRPG's IICRC-certified contractors have experience with heritage-compliant restoration and can document scope accurately for insurer settlement.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can NRPG help with storm damage following Derwent River flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Derwent River flooding (as occurred during the 2022 La Niña period) can affect New Norfolk and downstream suburbs. Note that riverine flood damage and storm damage are typically treated as separate insured perils — storm damage covers direct wind and rain damage, while flood damage from rising rivers requires separate flood cover. NRPG's scope assessment clearly documents which elements of damage resulted from each cause, supporting accurate lodgement across both peril categories.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does storm damage restoration typically cost for a Hobart property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Storm damage restoration costs in Hobart vary significantly by property type and damage extent. Minor structural damage (roof tiles, gutters, fencing) typically ranges from $2,000–$12,000. Major structural damage with internal water ingress ranges from $8,000–$30,000. Heritage stone building restoration — particularly colonial and Georgian-era properties in Battery Point, Salamanca, or North Hobart subject to Heritage Tasmania overlays — can reach $20,000–$80,000+ depending on the scope of lime mortar, stonework, and heritage-approved material requirements.",
      },
    },
  ],
};

export default function StormDamageRestorationHobartPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="sdrhbt-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrhbt-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="sdrhbt-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Hobart"
        subtitle="Emergency storm damage restoration across Hobart and Tasmania. IICRC-certified contractors for Southern Ocean wind events, heritage stone building restoration, and Derwent Valley flooding. 24-hour emergency response."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Hobart' },
        ]}
        sections={[
          {
            heading: "Hobart Storm Risk — Southern Ocean Low-Pressure Systems",
            body: (
              <>
                <p>
                  Hobart at 42°S sits directly in the path of Southern Ocean low-pressure systems that deliver
                  powerful westerly wind events, particularly during winter (June&ndash;August). Unlike mainland
                  capitals, Hobart does not face cyclone risk &mdash; but severe winter storms routinely cause
                  significant structural damage, especially in elevated suburbs including Mt Nelson, Sandy Bay, and
                  Dynnyrne where terrain amplifies wind speeds.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Ex-tropical weather systems can reach Hobart in weakened form, adding to the risk of severe rain
                  events. The 2016 east coast low caused widespread flash flooding across Hobart and Launceston.
                  The 2022 La Ni&ntilde;a period brought significant Derwent River flooding affecting New Norfolk
                  and downstream suburbs. Storm surge risk, while lower than in northern cities, is present in
                  low-lying areas of the Derwent estuary. NRPG contractors operate across the greater Hobart region
                  with 24-hour emergency response capability.
                </p>
              </>
            ),
          },
          {
            heading: 'Heritage Property Storm Damage — Battery Point, Salamanca & Beyond',
            body: (
              <>
                <p>
                  Tasmania holds Australia&apos;s highest concentration of colonial and Georgian-era buildings.
                  Stone cottages and brick terrace houses from the 1820s&ndash;1860s in Salamanca, Battery Point,
                  and North Hobart use lime mortar construction that responds differently to storm damage than
                  modern brick-and-mortar or timber-frame buildings. Storm water penetration can saturate lime
                  mortar joints, leading to spalling, structural movement, and ongoing moisture ingress.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Heritage properties subject to Heritage Tasmania overlays require restoration using
                  heritage-approved materials and techniques &mdash; standard cement-based renders or modern roofing
                  materials may not be permitted. NRPG works with contractors experienced in heritage-compliant
                  restoration, ensuring repairs meet Heritage Tasmania requirements while being fully documented for
                  insurance purposes. Standard insurer rebuild cost estimates frequently undervalue heritage
                  construction &mdash; if your property was built before 1900, request a heritage-specific scope
                  assessment before accepting any settlement offer.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Typical restoration costs range from $2,000&ndash;$12,000 for minor structural damage,
                  $8,000&ndash;$30,000 for major structural damage with water ingress, and $20,000&ndash;$80,000+
                  for heritage stone building restoration requiring specialist materials and compliance work.
                </p>
              </>
            ),
          },
          {
            heading: 'Hobart Suburbs We Cover',
            body: (
              <>
                <p>Emergency storm damage response across Greater Hobart and surrounds:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner / Heritage:</strong> Hobart CBD, Sandy Bay, Battery Point, South Hobart, West Hobart
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Middle Ring:</strong> Kingston, Blackmans Bay, Taroona, Howrah, Lindisfarne
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Corridor:</strong> Glenorchy, Moonah, Derwent Park, Claremont, Bridgewater
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Derwent Valley:</strong> Huonville, New Norfolk
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern Shore:</strong> Sorell, Richmond, Dunalley
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What storm risks does Hobart face from Southern Ocean weather systems?',
            answer: "Hobart at 42°S is directly exposed to Southern Ocean low-pressure systems that deliver powerful westerly wind events, particularly in winter (June–August). These systems can generate sustained winds exceeding 100 km/h across elevated suburbs such as Mt Nelson, Sandy Bay, and Dynnyrne, causing structural damage including roof failures, fallen trees, broken windows, and internal water ingress. Ex-tropical systems reaching southern Australia in weakened form can compound these risks. The 2016 east coast low caused widespread flash flooding across Hobart and Launceston.",
          },
          {
            question: 'Does standard home insurance cover storm damage to heritage properties in Hobart?',
            answer: "Yes — storm damage is a standard insured peril under most Australian home insurance policies, including for heritage properties. However, heritage buildings in Hobart (Battery Point, Salamanca, North Hobart) often require specialist restoration contractors who can work within Heritage Tasmania requirements for approved materials and techniques. Standard rebuild cost estimates may significantly undervalue heritage stone and colonial-era construction. NRPG's IICRC-certified contractors have experience with heritage-compliant restoration and can document scope accurately for insurer settlement.",
          },
          {
            question: 'Can NRPG help with storm damage following Derwent River flooding?',
            answer: "Yes. Derwent River flooding (as occurred during the 2022 La Niña period) can affect New Norfolk and downstream suburbs. Note that riverine flood damage and storm damage are typically treated as separate insured perils — storm damage covers direct wind and rain damage, while flood damage from rising rivers requires separate flood cover. NRPG's scope assessment clearly documents which elements of damage resulted from each cause, supporting accurate lodgement across both peril categories.",
          },
          {
            question: 'What does storm damage restoration typically cost for a Hobart property?',
            answer: "Storm damage restoration costs in Hobart vary significantly by property type and damage extent. Minor structural damage (roof tiles, gutters, fencing) typically ranges from $2,000–$12,000. Major structural damage with internal water ingress ranges from $8,000–$30,000. Heritage stone building restoration — particularly colonial and Georgian-era properties in Battery Point, Salamanca, or North Hobart subject to Heritage Tasmania overlays — can reach $20,000–$80,000+ depending on the scope of lime mortar, stonework, and heritage-approved material requirements.",
          },
        ]}
        relatedGuides={[
          { title: 'Storm Damage Restoration Melbourne', href: '/storm-damage-restoration-melbourne', description: 'IICRC-certified storm damage restoration across Melbourne.' },
          { title: 'Flood Damage Restoration Sydney', href: '/flood-damage-restoration-sydney', description: 'Sydney flood and storm damage restoration.' },
          { title: 'Water Damage Restoration Services', href: '/services/water-damage', description: 'IICRC-certified water damage restoration Australia-wide.' },
          { title: 'Fire Damage Restoration Services', href: '/services/fire-damage', description: 'Professional fire and smoke damage restoration Australia-wide.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
