import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Townsville | Post-TC Maila Electrical Fire Emergency',
  description: 'Emergency fire damage restoration across Townsville and North Queensland. IICRC S700:2025 certified contractors for post-cyclone electrical fires, smoke damage in tropical conditions, asbestos-aware fire restoration in fibro homes. Lodge your TC Maila claim 24/7.',
  keywords: 'fire damage restoration townsville, fire damage townsville, smoke damage townsville, electrical fire townsville, post cyclone fire townsville, TC Maila fire damage, fire restoration north queensland, fibro asbestos fire townsville',
  openGraph: {
    title: 'Fire Damage Restoration Townsville | Post-TC Maila Electrical Fire Emergency',
    description: 'Emergency fire damage restoration across Townsville and North Queensland. IICRC S700:2025 certified contractors for post-cyclone electrical fires, smoke damage in tropical conditions, asbestos-aware fire restoration in fibro homes. Lodge your TC Maila claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Fire Damage Restoration')}&city=${encodeURIComponent('Townsville')}&service=fire-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-townsville`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-townsville/#localbusiness`,
  name: `${NAP.name} Townsville`,
  url: `${NAP.url}/fire-damage-restoration-townsville`,
  description: '24/7 emergency fire damage restoration across Townsville and North Queensland. IICRC S700:2025 certified contractor network for post-cyclone electrical fires, smoke damage in tropical conditions, asbestos-aware restoration in fibro homes, and structural fire rebuilds.',
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
  name: 'Emergency Fire Damage Restoration Townsville',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Townsville', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  serviceType: 'Fire Damage Restoration',
  description: 'Professional fire and smoke damage restoration across Townsville including post-cyclone electrical fire make-safe, tropical smoke damage remediation, soot extraction, asbestos-aware restoration in fibro homes, odour elimination, and structural rebuild after fire events.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does home insurance cover a post-cyclone electrical fire in Townsville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — a fire that originates as a secondary consequence of cyclone damage (e.g., from damaged wiring, a fallen power line, or a generator fault during TC Maila) is generally covered as a fire event under the fire peril in your home insurance policy, separate from the cyclone/wind claim. The ARPC Cyclone Reinsurance Pool does not apply to fire damage — fire claims are processed directly through your private insurer regardless of what initiated the fire. You may have both a cyclone damage claim and a separate fire damage claim for the same event. Document the electrical cause carefully with photographs and, if possible, an electrician's report.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Pool cover fire damage in Townsville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The ARPC Cyclone Reinsurance Pool covers cyclone, wind, and storm-surge peril for eligible Townsville properties (all QLD postcodes north of approximately 27°S are within the Pool zone). Fire is a separate insured peril and is not covered by the Pool — fire claims are settled directly between you and your private insurer. If TC Maila caused both structural cyclone damage and a secondary electrical fire, these are two separate claims through two separate insurance pathways and can be lodged and processed simultaneously.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is asbestos a risk when fire damages an older Townsville fibro home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Townsville's mid-ring suburbs — Aitkenvale, Garbutt, Currajong, and Heatley — contain a significant number of post-war fibrous cement (fibro) homes built before asbestos was phased out in Australian construction in the late 1980s. Fire and heat damage to fibro walls, ceilings, and eaves can disturb asbestos-containing materials (ACM), releasing respirable fibres. NRPG contractors working on fire damage in these areas follow safe work practices for ACM disturbance risk assessment prior to commencing restoration. A licensed asbestos assessor may be required before full structural works proceed. Do not disturb damaged fibro materials without professional assessment.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does fire damage restoration cost in Townsville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical Townsville fire damage restoration costs: Kitchen or electrical fire (single room): $5,000–$20,000. Structural fire across multiple rooms: $15,000–$70,000. Combined cyclone structural damage plus fire loss: $40,000–$200,000+. Post-cyclone properties that sustain both structural cyclone damage and a secondary electrical fire may have costs that exceed standard single-peril estimates. Both claims (cyclone and fire) can be run simultaneously through separate insurance pathways. NRPG provides a full S700:2025 scope of works report for insurer submission covering fire damage independently of any cyclone scope.',
      },
    },
  ],
};

export default function FireDamageRestorationTownsvillePage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="fdrtv-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="fdrtv-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="fdrtv-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Townsville"
        subtitle="Emergency fire damage restoration across Townsville and North Queensland. IICRC S700:2025 certified contractors for post-cyclone electrical fires, structural fires, and smoke damage in tropical conditions. Lodge your TC Maila claim 24/7."
        gradient="linear-gradient(135deg, #1A0800 0%, #D84315 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Townsville' },
        ]}
        sections={[
          {
            heading: 'Post-TC Maila Electrical Fire Risk in Townsville',
            body: (
              <>
                <p>
                  Townsville has experienced electrical fire incidents in the aftermath of every major cyclone
                  to affect the city. TC Kirrily (2024), TC Yasi (2011), and TC Debbie (2017) all caused
                  electrical infrastructure damage that created secondary fire risk in the 24&ndash;72 hours
                  following the all-clear. TC Maila (April 2026) is in the direct Townsville watch zone, and
                  the same post-cyclone electrical fire conditions apply: damaged wiring where insulation has
                  been breached by debris, fallen power lines re-energising when grid power is restored,
                  submerged switchboards shorting on power restoration, and generator faults from overloaded
                  residential and commercial backup systems.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Do not assume your Townsville property is electrically safe in the hours after TC Maila
                  clears. A licensed electrician must inspect and certify before power is restored at the
                  switchboard. Where fire has already occurred, NRPG&apos;s IICRC S700:2025-certified
                  contractors provide emergency make-safe and structural assessment as a priority dispatch.
                  The ARPC Cyclone Pool does not apply to fire damage &mdash; fire claims are processed
                  directly through your private insurer, and you may have both a cyclone claim and a
                  separate fire claim running simultaneously for the same event.
                </p>
              </>
            ),
          },
          {
            heading: 'Fire and Smoke Damage in North Queensland Heat',
            body: (
              <>
                <p>
                  Townsville&apos;s tropical climate &mdash; ambient temperatures of 28&ndash;34&deg;C and
                  relative humidity consistently at 70&ndash;80% &mdash; creates significantly worse secondary
                  damage conditions after a fire than in southern Australian cities. Soot particles are
                  hygroscopic: in Townsville&apos;s humid air, they penetrate porous building materials
                  (plasterboard, timber framing, soft furnishings) more rapidly and deeply than in drier
                  climates.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Critically, if soot and smoke residues are not extracted under IICRC S700:2025 protocols
                  immediately after a fire, the moisture content and organic compounds in smoke deposits
                  create ideal conditions for rapid mould colonisation &mdash; often within 48 hours in
                  North Queensland conditions. A single fire damage event can generate two concurrent
                  claims: fire damage and subsequent mould remediation. Early engagement of S700:2025-
                  certified contractors is the most effective way to prevent smoke damage compounding
                  into a larger mould loss.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Townsville&apos;s mid-ring suburbs contain a significant stock of post-war fibrous cement
                  (fibro) homes in Aitkenvale, Garbutt, and Currajong. Fire damage to these properties
                  creates an asbestos disturbance risk that requires professional assessment before
                  restoration work commences. NRPG contractors follow safe work procedures for
                  asbestos-containing material risk in all fire restoration scopes on pre-1990 fibro
                  construction.
                </p>
              </>
            ),
          },
          {
            heading: 'Townsville Areas We Cover',
            body: (
              <>
                <p>
                  Emergency fire damage make-safe and restoration across Townsville and surrounds:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner &amp; CBD:</strong> Townsville CBD, North Ward, Belgian Gardens, South
                  Townsville
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Mid Ring (fibro stock):</strong> Aitkenvale, Garbutt, Currajong, Heatley,
                  Hermit Park
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Outer Western:</strong> Kirwan, Thuringowa, Kelso, Bohle Plains
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Residential:</strong> Hyde Park, Rosslea, Mysterton
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does home insurance cover a post-cyclone electrical fire in Townsville?',
            answer: "Yes — a fire originating as a secondary consequence of cyclone damage (damaged wiring, fallen power line, generator fault during TC Maila) is covered as a fire event under the fire peril in your home insurance policy, separate from the cyclone/wind claim. The ARPC Cyclone Pool does not apply to fire damage. You may have both a cyclone damage claim and a separate fire damage claim for the same event. Document the electrical cause carefully with photographs and an electrician's report.",
          },
          {
            question: 'Does the ARPC Cyclone Pool cover fire damage in Townsville?',
            answer: 'No. The ARPC Cyclone Reinsurance Pool covers cyclone, wind, and storm-surge peril — fire is a separate insured peril settled directly through your private insurer. If TC Maila caused both structural cyclone damage and a secondary electrical fire, these are two separate claims through two separate insurance pathways and can be lodged and processed simultaneously.',
          },
          {
            question: 'Is asbestos a risk when fire damages an older Townsville fibro home?',
            answer: "Yes. Post-war fibro homes in Aitkenvale, Garbutt, Currajong, and Heatley may contain asbestos-containing materials (ACM) in walls, ceilings, and eaves. Fire and heat damage can disturb ACM and release respirable fibres. NRPG contractors follow safe work practices for ACM disturbance risk assessment prior to commencing restoration. A licensed asbestos assessor may be required before full structural works proceed. Do not disturb damaged fibro materials without professional assessment.",
          },
          {
            question: 'How much does fire damage restoration cost in Townsville?',
            answer: 'Kitchen or electrical fire (single room): $5,000–$20,000. Structural fire across multiple rooms: $15,000–$70,000. Combined cyclone damage plus fire loss: $40,000–$200,000+. Both claims (cyclone and fire) can be run simultaneously through separate insurance pathways. NRPG provides a full S700:2025 scope of works report for insurer submission covering fire damage independently of any cyclone scope.',
          },
        ]}
        relatedGuides={[
          { title: 'TC Maila FNQ Emergency', href: '/events/tc-maila-fnq-2026', description: 'TC Maila recovery — emergency support for Townsville and North Queensland.' },
          { title: 'Cyclone Damage Restoration Townsville', href: '/cyclone-damage-restoration-townsville', description: 'Cyclone structural damage restoration across Townsville.' },
          { title: 'Storm Damage Restoration Townsville', href: '/storm-damage-restoration-townsville', description: 'Emergency storm and cyclone damage restoration across Townsville.' },
          { title: 'Mould Remediation Townsville', href: '/mould-remediation-townsville', description: 'Tropical mould remediation after fire suppression water or smoke damage.' },
        ]}
        cta={{ text: 'Lodge Your TC Maila Claim', href: '/claim' }}
      />
    </>
  );
}
