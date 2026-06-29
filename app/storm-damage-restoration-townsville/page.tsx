import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Townsville | Cyclone & Storm Damage 24/7',
  description: 'Emergency storm damage restoration across Townsville and North Queensland. IICRC-certified contractors for cyclone damage, roof losses, structural storm damage, and water ingress. TC Maila response available now. Lodge your claim 24/7.',
  keywords: 'storm damage restoration townsville, cyclone damage townsville, TC Maila townsville, storm damage north queensland, roof damage townsville, cyclone damage repair townsville, storm restoration townsville',
  openGraph: {
    title: 'Storm Damage Restoration Townsville | Cyclone & Storm Damage 24/7',
    description: 'Emergency storm damage restoration across Townsville and North Queensland. IICRC-certified contractors for cyclone damage, roof losses, structural storm damage, and water ingress. TC Maila response available now. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Townsville')}&service=storm-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-townsville`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-townsville/#localbusiness`,
  name: `${NAP.name} Townsville`,
  url: `${NAP.url}/storm-damage-restoration-townsville`,
  description: '24/7 emergency storm damage restoration across Townsville and North Queensland. IICRC-certified contractor network for cyclone damage, roof losses, structural storm damage, and water ingress.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Townsville', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Townsville', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Storm Damage Restoration Townsville',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Townsville', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  serviceType: 'Storm Damage Restoration',
  description: 'Professional storm damage restoration across Townsville including emergency make-safe, roof tarping, cyclone structural repairs, water ingress remediation, and full insurance documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What damage is TC Maila expected to cause in Townsville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "TC Maila (April 2026) has impacted the Far North Queensland coast and Cape York Peninsula. Cyclone-force winds cause widespread structural damage including complete roof losses, wall failures, and severe water ingress. Suburbs along Cleveland Bay and the Ross River corridor face compound risk from wind damage and storm surge. NRPG contractors are deployed for post-cyclone response. Lodge your claim at disasterrecovery.com.au/claim. For current warning status, refer to bom.gov.au.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Reinsurance Pool apply to my Townsville property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Townsville postcodes fall within the ARPC Cyclone Reinsurance Pool coverage zone (north of approximately 27°S latitude). The Pool was established to improve the affordability and availability of cyclone cover in northern Australia. Your insurer participates in the Pool and must offer cyclone cover for eligible residential properties. NRPG does not provide policy advice — contact your insurer or an insurance broker for specific coverage questions.",
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can NRPG contractors respond to storm damage in Townsville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "NRPG maintains certified contractors across the Townsville metro area including Kirwan, Thuringowa, Aitkenvale, and surrounding suburbs. For post-cyclone events, emergency response is mobilised as soon as it is safe to operate — typically within hours of a cyclone clearing the area. For non-cyclone storm events, NRPG targets a priority emergency response for structural make-safe and roof tarping. Magnetic Island properties are served via ferry-accessible contractors.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does home insurance cover storm damage to my Townsville property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Standard Australian home insurance policies cover storm damage including wind, rain, hail, and cyclone events. The key distinction is between storm damage (covered) and flood damage from rising rivers (which requires separate flood cover). In Townsville, storm surge from Cleveland Bay and Ross River flooding may involve both categories — NRPG's IICRC-certified scope assessment documents exactly how each element of damage occurred to support correct claims lodgement.",
      },
    },
  ],
};

export default function StormDamageRestorationTownsvillePage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="sdrtv-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrtv-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="sdrtv-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Townsville"
        subtitle="Emergency storm damage restoration across Townsville and North Queensland. IICRC-certified contractors for cyclone structural damage, roof losses, and water ingress. TC Maila response ready — lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Townsville' },
        ]}
        sections={[
          {
            heading: "Townsville Storm Risk — Cyclone Belt and TC Maila",
            body: (
              <>
                <p>
                  Townsville sits in the heart of North Queensland&apos;s cyclone belt and has recorded more direct
                  cyclone strikes than any other Australian urban centre. TC Yasi (2011, Category 5) caused
                  devastating structural damage across the wider region; TC Kirrily (2024, Category 2) made direct
                  landfall near Townsville; TC Debbie (2017) affected communities throughout the region before
                  intensifying further south.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Maila (April 2026) has impacted the Far North Queensland coast. For current warning
                  status and affected suburbs, refer to bom.gov.au. Widespread structural storm damage,
                  complete roof losses, and severe water ingress can occur in affected areas.
                  Townsville&apos;s flat coastal topography amplifies storm surge risk &mdash; suburbs along Cleveland
                  Bay and the Ross River corridor face compound risk from wind damage and inundation. The storm season
                  extends six months (November&ndash;April), and Townsville can be affected by multiple significant
                  events in a single season. NRPG contractors are on standby for immediate post-storm mobilisation
                  once conditions are safe.
                </p>
              </>
            ),
          },
          {
            heading: 'Post-Storm Action Plan for Townsville Property Owners',
            body: (
              <>
                <p>
                  Following a cyclone or severe storm event in Townsville, the priority sequence for property owners
                  is: safety first, then documentation, then restoration. Do not re-enter your property until
                  emergency services confirm it is structurally safe. Once safe to access, photograph all visible
                  damage before any clean-up begins &mdash; this evidence is critical for your insurance claim scope.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Contact your insurer to lodge the claim as early as possible. Townsville regularly experiences
                  high-volume claim lodgement after cyclone events; early lodgement secures your place in the queue.
                  NRPG&apos;s IICRC-certified contractors provide emergency make-safe (roof tarping, structural
                  shoring, board-up), followed by a full scope assessment with moisture mapping and thermal imaging
                  to identify water ingress pathways not visible to the naked eye. This documentation supports
                  accurate insurer settlement and reduces the risk of underpayment on cyclone claims.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Townsville properties in the ARPC Cyclone Reinsurance Pool zone are covered for cyclone as a
                  standard insured peril. Separate flood cover is required for rising river and storm surge events
                  &mdash; check your PDS carefully if your property is in the Ross River or Cleveland Bay flood zone.
                  Typical restoration costs range from $3,000&ndash;$20,000 for structural and roofing damage,
                  $10,000&ndash;$60,000 for major structural damage with water ingress, and $40,000&ndash;$150,000+
                  for severe cyclone-force losses.
                </p>
              </>
            ),
          },
          {
            heading: 'Townsville Suburbs We Cover',
            body: (
              <>
                <p>Emergency storm and cyclone damage response across Townsville and surrounds:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner City &amp; Coastal:</strong> Townsville City, North Ward, Belgian Gardens, South
                  Townsville, Mysterton
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western Suburbs:</strong> Kirwan, Thuringowa, Kelso, Rasmussen, Bohle Plains
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern &amp; Inner Ring:</strong> Aitkenvale, Garbutt, Currajong, Hermit Park
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Magnetic Island:</strong> Response via ferry-accessible contractors &mdash; all suburbs
                  covered
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What damage is TC Maila expected to cause in Townsville?',
            answer: "TC Maila (April 2026) has impacted the Far North Queensland coast and Cape York Peninsula. Cyclone-force winds cause widespread structural damage including complete roof losses, wall failures, and severe water ingress. Suburbs along Cleveland Bay and the Ross River corridor face compound risk from wind damage and storm surge. NRPG contractors are deployed for post-cyclone response. Lodge your claim at disasterrecovery.com.au/claim. For current warning status, refer to bom.gov.au.",
          },
          {
            question: 'Does the ARPC Cyclone Reinsurance Pool apply to my Townsville property?',
            answer: "Yes. Townsville postcodes fall within the ARPC Cyclone Reinsurance Pool coverage zone (north of approximately 27°S latitude). The Pool was established to improve the affordability and availability of cyclone cover in northern Australia. Your insurer participates in the Pool and must offer cyclone cover for eligible residential properties. NRPG does not provide policy advice — contact your insurer or an insurance broker for specific coverage questions.",
          },
          {
            question: 'How quickly can NRPG contractors respond to storm damage in Townsville?',
            answer: "NRPG maintains certified contractors across the Townsville metro area including Kirwan, Thuringowa, Aitkenvale, and surrounding suburbs. For post-cyclone events, emergency response is mobilised as soon as it is safe to operate — typically within hours of a cyclone clearing the area. For non-cyclone storm events, NRPG targets a priority emergency response for structural make-safe and roof tarping. Magnetic Island properties are served via ferry-accessible contractors.",
          },
          {
            question: 'Does home insurance cover storm damage to my Townsville property?',
            answer: "Standard Australian home insurance policies cover storm damage including wind, rain, hail, and cyclone events. The key distinction is between storm damage (covered) and flood damage from rising rivers (which requires separate flood cover). In Townsville, storm surge from Cleveland Bay and Ross River flooding may involve both categories — NRPG's IICRC-certified scope assessment documents exactly how each element of damage occurred to support correct claims lodgement.",
          },
        ]}
        relatedGuides={[
          { title: 'TC Maila FNQ Emergency', href: '/events/tc-maila-fnq-2026', description: 'Live response information for TC Maila affecting Far North Queensland.' },
          { title: 'Cyclone Damage Restoration Townsville', href: '/cyclone-damage-restoration-townsville', description: 'Specialist cyclone structural restoration across Townsville.' },
          { title: 'Water Damage Restoration Townsville', href: '/water-damage-restoration-townsville', description: 'IICRC-certified water damage restoration across Townsville.' },
          { title: 'Mould Remediation Townsville', href: '/mould-remediation-townsville', description: 'Professional mould remediation following storm and cyclone water ingress.' },
        ]}
        cta={{ text: 'Lodge Your TC Maila Claim', href: '/claim' }}
      />
    </>
  );
}
