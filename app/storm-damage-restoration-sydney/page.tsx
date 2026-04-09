import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Sydney | Hail, Wind & Structural Repairs 24/7',
  description: 'Emergency storm damage restoration across all Sydney suburbs. IICRC-certified contractors for hail damage, roof repairs, wind damage, and structural make-safe. 60-minute response. Lodge your claim 24/7.',
  keywords: 'storm damage restoration sydney, storm damage sydney, hail damage sydney, roof damage sydney, wind damage sydney, storm damage repair sydney, emergency storm restoration sydney',
  openGraph: {
    title: 'Storm Damage Restoration Sydney | Hail, Wind & Structural Repairs 24/7',
    description: 'Emergency storm damage restoration across all Sydney suburbs. IICRC-certified contractors for hail damage, roof repairs, wind damage, and structural make-safe. 60-minute response. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Sydney')}&service=storm-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-sydney`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-sydney/#localbusiness`,
  name: `${NAP.name} Sydney`,
  url: `${NAP.url}/storm-damage-restoration-sydney`,
  description: '24/7 emergency storm damage restoration across all Sydney suburbs. IICRC-certified contractor network for hail damage, wind damage, roof repairs, and structural make-safe.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Sydney', containedInPlace: { '@type': 'State', name: 'New South Wales' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Sydney', addressRegion: 'NSW', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Storm Damage Restoration Sydney',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Sydney', containedInPlace: { '@type': 'State', name: 'New South Wales' } },
  serviceType: 'Storm Damage Restoration',
  description: 'Professional storm damage restoration across Sydney including emergency make-safe, roof tarping, hail damage repair, structural restoration, and full insurance documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Sydney home insurance cover hail damage to roof tiles?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 hail impact damage to roof tiles, terracotta or concrete, is covered under the storm damage provision of most standard Australian home insurance policies. Lodge the claim describing "hail damage" and "storm damage" specifically. Request an IICRC-certified roof inspection before signing off on the insurer\u2019s scope \u2014 many hail impacts create fractures that cause leaks in subsequent rain events.' },
    },
    {
      '@type': 'Question',
      name: 'How quickly should I act after storm damage to my Sydney property?',
      acceptedAnswer: { '@type': 'Answer', text: 'Immediately \u2014 if there is a structural breach (damaged roof, broken windows), water ingress will continue with every subsequent rain event, escalating the damage and complicating the claim. Lodge at disasterrecovery.com.au/claim for 60-minute emergency make-safe (tarping and temporary boarding) to stop further damage while the formal repair scope is assessed.' },
    },
    {
      '@type': 'Question',
      name: 'What is the most common storm damage claim dispute in Sydney?',
      acceptedAnswer: { '@type': 'Answer', text: "The most common dispute involves incomplete scope \u2014 the insurer\u2019s assessor documents only the most visible damage, missing hairline tile fractures, internal wall moisture, or gutter/downpipe damage that is not visible from the ground. NRPG\u2019s IICRC-certified scope documentation captures the full extent of damage, including thermal imaging for internal moisture resulting from breached building elements." },
    },
    {
      '@type': 'Question',
      name: 'Can NRPG help if my Sydney insurer underpaid my storm claim?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. If your storm damage claim was settled and you have discovered additional damage or believe the scope was incomplete, NRPG can provide an independent IICRC-certified reassessment and full documentation for supplementary lodgement or AFCA dispute. Contact NRPG at disasterrecovery.com.au/claim.' },
    },
  ],
};

export default function StormDamageRestorationSydneyPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="sdrsyd-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrsyd-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="sdrsyd-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Sydney"
        subtitle="Emergency storm damage restoration across all Sydney suburbs. IICRC-certified contractors for hail, wind damage, roof failures, and structural make-safe. 60-minute response, 24 hours a day."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Sydney' },
        ]}
        sections={[
          {
            heading: "Sydney\u2019s Storm Damage History \u2014 Australia\u2019s Hail Capital",
            body: (
              <>
                <p>
                  Sydney has the highest frequency of significant hailstorm events of any Australian capital city. The April
                  1999 Sydney hailstorm — which tracked through Ryde, the inner west, and the eastern suburbs — caused over
                  AU$2.3 billion in insured losses, making it the costliest natural disaster in Australian history at the time.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Sydney&apos;s unique geography, with the Blue Mountains channelling cold air masses eastward into warm coastal
                  air, creates ideal hailstorm formation conditions during spring and summer. The city&apos;s storm season
                  (October&ndash;April) regularly produces convective storm events generating large hail, damaging winds, and
                  flash flooding across both the western suburbs and the coastal corridor.
                </p>
              </>
            ),
          },
          {
            heading: 'What NRPG Provides for Sydney Storm Damage',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Emergency response:</strong> Roof tarping and temporary boarding within 60 minutes of call for
                    properties with structural breaches.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Structural assessment:</strong> IICRC-certified technicians assess roof, wall, window, and
                    structural damage before committing scope to the insurer.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Water extraction:</strong> Any water ingress from storm-breached elements requires immediate
                    extraction and structural drying to prevent mould in Sydney&apos;s humid coastal conditions.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Insurance documentation:</strong> Full IICRC-certified scope of works and photographic evidence
                    pack for insurer lodgement.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Claim coordination:</strong> NRPG manages all correspondence with your insurer, including disputes
                    and AFCA escalation if required.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Hail Damage in Sydney — What to Check',
            body: (
              <>
                <p>
                  After a hailstorm, inspect (safely, from ground level) and photograph:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Roof tiles or sheeting for impact fractures and displaced material</li>
                  <li style={{ marginBottom: '0.5rem' }}>Skylights for cracking or complete failure</li>
                  <li style={{ marginBottom: '0.5rem' }}>Gutters and downpipes for denting and obstruction</li>
                  <li style={{ marginBottom: '0.5rem' }}>Air conditioning condensers and hot water systems on rooftops</li>
                  <li style={{ marginBottom: '0.5rem' }}>External cladding, fascia, and barge boards</li>
                  <li style={{ marginBottom: '0.5rem' }}>Vehicles in driveways (motor claims are separate from building claims)</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Many hail impacts create hairline fractures that are not immediately visible from the ground — request an
                  IICRC-certified roof inspection to capture the full scope before lodging. Incomplete scope at lodgement is
                  the primary cause of underpaid hail claims.
                </p>
              </>
            ),
          },
          {
            heading: 'Sydney Suburbs We Cover',
            body: (
              <>
                <p>60-minute response across all Sydney LGAs:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner West:</strong> Glebe, Newtown, Leichhardt, Marrickville, Ashfield, Burwood, Strathfield, Homebush
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>North Shore:</strong> Chatswood, Lane Cove, North Sydney, Mosman, Willoughby, Ryde, Meadowbank
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern Suburbs:</strong> Randwick, Bondi, Coogee, Surry Hills, Paddington, Woollahra, Double Bay
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Beaches:</strong> Manly, Dee Why, Narrabeen, Mona Vale, Newport, Avalon
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western Suburbs:</strong> Parramatta, Blacktown, Penrith, Liverpool, Campbelltown, Auburn, Granville
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>South Sydney:</strong> Hurstville, Kogarah, Rockdale, Sutherland, Miranda, Cronulla, Caringbah
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge your claim at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate contractor matching
                  across any Sydney suburb.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does Sydney home insurance cover hail damage to roof tiles?',
            answer: 'Yes — hail impact damage to roof tiles, terracotta or concrete, is covered under the storm damage provision of most standard Australian home insurance policies. Lodge the claim describing "hail damage" and "storm damage" specifically. Request an IICRC-certified roof inspection before signing off on the insurer\'s scope — many hail impacts create fractures that cause leaks in subsequent rain events.',
          },
          {
            question: 'How quickly should I act after storm damage to my Sydney property?',
            answer: 'Immediately — if there is a structural breach (damaged roof, broken windows), water ingress will continue with every subsequent rain event, escalating the damage and complicating the claim. Lodge at disasterrecovery.com.au/claim for 60-minute emergency make-safe (tarping and temporary boarding) to stop further damage while the formal repair scope is assessed.',
          },
          {
            question: 'What is the most common storm damage claim dispute in Sydney?',
            answer: "The most common dispute involves incomplete scope — the insurer's assessor documents only the most visible damage, missing hairline tile fractures, internal wall moisture, or gutter/downpipe damage that is not visible from the ground. NRPG's IICRC-certified scope documentation captures the full extent of damage, including thermal imaging for internal moisture resulting from breached building elements.",
          },
          {
            question: 'Can NRPG help if my Sydney insurer underpaid my storm claim?',
            answer: 'Yes. If your storm damage claim was settled and you have discovered additional damage or believe the scope was incomplete, NRPG can provide an independent IICRC-certified reassessment and full documentation for supplementary lodgement or AFCA dispute. Contact NRPG at disasterrecovery.com.au/claim.',
          },
        ]}
        relatedGuides={[
          { title: 'Water Damage Restoration Sydney', href: '/water-damage-restoration-sydney', description: 'IICRC-certified water damage restoration across all Sydney suburbs.' },
          { title: 'Storm Damage Restoration Cost Guide', href: '/guides/cost-guides/how-much-storm-damage-restoration-cost', description: 'Full cost breakdown for storm damage restoration by damage type.' },
          { title: 'Mould After Storm Water Ingress', href: '/services/mould-remediation', description: 'Prevent mould after storm water damage in Sydney.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
