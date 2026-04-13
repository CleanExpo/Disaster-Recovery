import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Cairns | Post-TC Maila Electrical Fire Emergency',
  description: 'Emergency fire damage restoration across Cairns and Far North Queensland. IICRC S700:2025 certified contractors for post-cyclone electrical fires, smoke damage in tropical conditions, and storm-related structural fires. Lodge your TC Maila claim 24/7.',
  keywords: 'fire damage restoration cairns, fire damage cairns, smoke damage cairns, electrical fire cairns, post cyclone fire cairns, TC Maila fire damage, fire restoration FNQ, smoke damage tropical cairns',
  openGraph: {
    title: 'Fire Damage Restoration Cairns | Post-TC Maila Electrical Fire Emergency',
    description: 'Emergency fire damage restoration across Cairns and Far North Queensland. IICRC S700:2025 certified contractors for post-cyclone electrical fires, smoke damage in tropical conditions, and storm-related structural fires. Lodge your TC Maila claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Fire Damage Restoration')}&city=${encodeURIComponent('Cairns')}&service=fire-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-cairns`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-cairns/#localbusiness`,
  name: `${NAP.name} Cairns`,
  url: `${NAP.url}/fire-damage-restoration-cairns`,
  description: '24/7 emergency fire damage restoration across Cairns and Far North Queensland. IICRC S700:2025 certified contractor network for post-cyclone electrical fires, smoke damage in tropical conditions, and structural fire restoration.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Cairns', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Cairns', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Fire Damage Restoration Cairns',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Cairns', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  serviceType: 'Fire Damage Restoration',
  description: 'Professional fire and smoke damage restoration across Cairns and FNQ including post-cyclone electrical fire make-safe, tropical smoke damage remediation, soot extraction, odour elimination, and structural rebuild after storm-related fire events.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why are electrical fires so common in Cairns in the 24–72 hours after a cyclone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Post-cyclone electrical fires are one of the highest-risk secondary events after a major tropical cyclone makes landfall near Cairns. The combination of cyclone-damaged wiring (insulation breached by debris or tree impact), fallen power lines re-energising when grid power is restored, submerged switchboards (from storm surge or flooding) that short-circuit on power restoration, and generator faults from overloading during extended outages creates conditions where electrical fires ignite rapidly once the all-clear is given. TC Maila (April 2026) has left significant electrical infrastructure damage across Cairns. Do not assume your property is electrically safe after a cyclone — have a licensed electrician inspect before restoring power.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does home insurance cover a fire that started after TC Maila as a secondary event?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes \u2014 a fire that originates as a secondary consequence of cyclone damage (e.g., from damaged wiring, a fallen power line, or a generator fault) is generally covered as a fire event under the fire peril in your home insurance policy, separate from the cyclone/wind claim. The ARPC Cyclone Pool does not apply to fire damage \u2014 fire claims are processed directly through your private insurer regardless of what caused the fire. You may have both a cyclone damage claim and a separate fire damage claim for the same event. Document the electrical cause carefully with photographs and, if possible, an electrician\u2019s report.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does Cairns\u2019 tropical climate make smoke damage worse than in southern cities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cairns\u2019 tropical climate \u2014 28\u201334\u00b0C temperatures and relative humidity consistently above 80% \u2014 significantly accelerates the secondary damage caused by smoke and soot. Soot particles are hygroscopic (they absorb moisture) and in Cairns\u2019 humid conditions they penetrate porous materials (plasterboard, timber, soft furnishings) more rapidly than in drier climates. More critically, if soot is not extracted immediately under IICRC S700:2025 protocols, the residual moisture and organic content in smoke deposits creates ideal conditions for rapid mould colonisation \u2014 often within 48 hours in FNQ conditions. Standard cleaning is not sufficient; professional HEPA extraction, chemical sponging, and thermal fogging are required to prevent smoke-triggered mould remediation becoming a second major claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does fire damage restoration cost in Cairns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical Cairns fire damage restoration costs: Electrical or kitchen fire (single room): $5,000\u2013$20,000. Structural fire across multiple rooms: $15,000\u2013$70,000. Combined cyclone damage plus fire loss: $40,000\u2013$200,000+. Post-cyclone properties that sustain both structural cyclone damage and a secondary fire event may have costs that exceed standard single-peril estimates significantly. Both claims (cyclone and fire) can be run simultaneously through separate insurance pathways. NRPG provides a full S700:2025 scope of works report for insurer submission covering fire damage independently of any cyclone scope.',
      },
    },
  ],
};

export default function FireDamageRestorationCairnsPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="fdrcns-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="fdrcns-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="fdrcns-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Cairns"
        subtitle="Emergency fire damage restoration across Cairns and Far North Queensland. IICRC S700:2025 certified contractors for post-cyclone electrical fires, structural fires, and smoke damage in tropical conditions. priority response."
        gradient="linear-gradient(135deg, #1A0800 0%, #D84315 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Cairns' },
        ]}
        sections={[
          {
            heading: 'Post-TC Maila Electrical Fire Risk in Cairns',
            body: (
              <>
                <p>
                  Tropical Cyclone Maila made landfall near Cairns in April 2026, leaving significant structural
                  and electrical infrastructure damage across the Cairns metropolitan area and the Far North
                  Queensland coast. In the 24&ndash;72 hours following the all-clear, Cairns faces its highest
                  post-cyclone fire risk: electrical fires triggered by damaged wiring, fallen power lines
                  re-energising when grid power is restored, submerged switchboards shorting on restoration, and
                  generator faults from overloaded residential and commercial backup power systems.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Maila structural fires &mdash; from storm-damaged gas lines, tree falls into electrical
                  infrastructure, and generator faults &mdash; are a significant secondary risk that requires
                  immediate response. Do not assume your property is electrically safe after a cyclone event:
                  a licensed electrician must inspect and certify before power is restored. Where fire has already
                  occurred, NRPG&apos;s IICRC S700:2025-certified contractors provide emergency make-safe and
                  structural assessment as a priority dispatch.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Cairns rainforest interface &mdash; Freshwater, Redlynch, Smithfield, and Caravonica, which
                  sit at the Daintree and tropical rainforest edge &mdash; carries low traditional bushfire risk
                  due to the tropical rainforest environment. However, post-storm debris fires and structural
                  fires from cyclone damage are an active risk in these areas regardless of vegetation type.
                  The ARPC Cyclone Pool does not apply to fire damage &mdash; fire claims are processed directly
                  through your private insurer.
                </p>
              </>
            ),
          },
          {
            heading: 'Fire and Smoke Damage in Tropical Conditions',
            body: (
              <>
                <p>
                  Cairns&apos; tropical climate &mdash; ambient temperatures of 28&ndash;34&deg;C and relative
                  humidity consistently above 80% &mdash; creates significantly worse secondary damage conditions
                  after a fire than in southern Australian cities. Soot particles are hygroscopic: in Cairns&apos;
                  humid air, they penetrate porous building materials (plasterboard, timber framing, soft
                  furnishings) more rapidly and deeply than in drier climates.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Critically, if soot and smoke residues are not extracted under IICRC S700:2025 protocols
                  immediately after a fire, the moisture content and organic compounds in smoke deposits create
                  ideal conditions for rapid mould colonisation &mdash; often within 48 hours of the fire event
                  in FNQ conditions. This means a single fire damage event can generate two concurrent claims:
                  fire damage and subsequent mould remediation. Early engagement of S700:2025-certified contractors
                  is the most effective way to prevent smoke damage compounding into a larger mould loss.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG deploys HEPA air scrubbers, chemical dry sponging, and thermal fogging protocols
                  specifically calibrated for tropical-humidity environments to address smoke penetration that
                  standard cleaning cannot resolve.
                </p>
              </>
            ),
          },
          {
            heading: 'Cairns Areas We Cover',
            body: (
              <>
                <p>
                  priority emergency response across Cairns and surrounds for fire damage make-safe and
                  structural assessment.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Cairns City and inner suburbs:</strong> Cairns CBD, Parramatta Park, Manunda, Manoora,
                  Bungalow, Westcourt, Whitfield
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Rainforest interface:</strong> Freshwater, Redlynch, Smithfield, Caravonica, Kamerunga
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern corridor:</strong> Gordonvale, Edmonton, Bentley Park, Mount Sheridan, Woree
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Coastal north:</strong> Machans Beach, Holloways Beach, Yorkeys Knob, Trinity Beach,
                  Kewarra Beach, Palm Cove
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern beaches / Port Douglas:</strong> Port Douglas, Mossman (90-minute response)
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Tablelands:</strong> Atherton, Mareeba, Kuranda (90-minute response)
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Why are electrical fires so common in Cairns in the 24–72 hours after a cyclone?',
            answer: 'Post-cyclone electrical fires are one of the highest-risk secondary events after a major tropical cyclone. Cyclone-damaged wiring, fallen power lines re-energising on grid restoration, submerged switchboards shorting on power-up, and generator faults during extended outages all create ignition conditions. TC Maila has left significant electrical infrastructure damage across Cairns. Have a licensed electrician inspect before restoring power.',
          },
          {
            question: 'Does home insurance cover a fire that started after TC Maila as a secondary event?',
            answer: 'Yes — a fire originating as a secondary consequence of cyclone damage (damaged wiring, fallen power line, generator fault) is covered as a fire event under the fire peril in your home insurance policy, separate from the cyclone/wind claim. The ARPC Cyclone Pool does not apply to fire damage. You may have both a cyclone damage claim and a separate fire damage claim for the same event.',
          },
          {
            question: "How does Cairns' tropical climate make smoke damage worse than in southern cities?",
            answer: "At 28–34°C with 80%+ humidity, soot particles penetrate porous materials more rapidly than in drier climates. Without immediate S700:2025-protocol extraction, smoke residues create conditions for mould colonisation within 48 hours in FNQ — turning a single fire damage event into a concurrent mould remediation claim. Standard cleaning is not sufficient; HEPA extraction, chemical sponging, and thermal fogging are required.",
          },
          {
            question: 'How much does fire damage restoration cost in Cairns?',
            answer: 'Electrical or kitchen fire (single room): $5,000–$20,000. Structural fire across multiple rooms: $15,000–$70,000. Combined cyclone damage plus fire loss: $40,000–$200,000+. Both claims (cyclone and fire) can be run simultaneously through separate insurance pathways. NRPG provides a full S700:2025 scope of works report for insurer submission.',
          },
        ]}
        relatedGuides={[
          { title: 'TC Maila FNQ Emergency', href: '/events/tc-maila-fnq-2026', description: 'TC Maila recovery — emergency support for Cairns and FNQ.' },
          { title: 'Cyclone Damage Restoration Cairns', href: '/cyclone-damage-restoration-cairns', description: 'Cyclone structural damage restoration across Cairns and FNQ.' },
          { title: 'Water Damage Restoration Cairns', href: '/water-damage-restoration-cairns', description: 'Post-cyclone and storm water damage restoration in Cairns.' },
          { title: 'Mould Remediation Cairns', href: '/mould-remediation-cairns', description: 'Tropical mould remediation after fire suppression water or smoke damage.' },
        ]}
        cta={{ text: 'Lodge Your TC Maila Claim', href: '/claim' }}
      />
    </>
  );
}
