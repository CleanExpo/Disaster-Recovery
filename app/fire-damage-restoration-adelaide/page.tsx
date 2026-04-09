import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Adelaide | IICRC S700:2025 Certified Emergency',
  description: 'Emergency fire damage restoration across Adelaide and South Australia. IICRC S700:2025 certified contractors for fire, smoke, bushfire, and asbestos-aware fibro home restoration. Adelaide Hills BAL zones covered. Lodge your claim 24/7.',
  keywords: 'fire damage restoration adelaide, fire damage adelaide, smoke damage adelaide, bushfire damage adelaide hills, BAL zone fire damage SA, asbestos fibro fire adelaide, fire restoration south australia',
  openGraph: {
    title: 'Fire Damage Restoration Adelaide | IICRC S700:2025 Certified Emergency',
    description: 'Emergency fire damage restoration across Adelaide and South Australia. IICRC S700:2025 certified contractors for fire, smoke, bushfire, and asbestos-aware fibro home restoration. Adelaide Hills BAL zones covered. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Fire Damage Restoration')}&city=${encodeURIComponent('Adelaide')}&service=fire-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-adelaide`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-adelaide/#localbusiness`,
  name: `${NAP.name} Adelaide`,
  url: `${NAP.url}/fire-damage-restoration-adelaide`,
  description: '24/7 emergency fire damage restoration across Adelaide and South Australia. IICRC S700:2025 certified contractor network for fire, smoke, bushfire, and asbestos-aware restoration in Adelaide Hills BAL zones and urban fibro housing stock.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Adelaide', containedInPlace: { '@type': 'State', name: 'South Australia' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Adelaide', addressRegion: 'SA', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Fire Damage Restoration Adelaide',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Adelaide', containedInPlace: { '@type': 'State', name: 'Victoria' } },
  serviceType: 'Fire Damage Restoration',
  description: 'Professional fire and smoke damage restoration across Adelaide and South Australia including emergency structural make-safe, soot removal, bushfire damage assessment in BAL FZ zones, asbestos-aware restoration in fibro homes, odour elimination, and full rebuild.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does my SA home insurance cover the Cudlee Creek fire or Adelaide Hills bushfire damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — direct bushfire damage to building and contents is covered under the fire peril in standard South Australian home insurance policies. This includes the Cudlee Creek fire (December 2019), Cherry Gardens, and any future Adelaide Hills fire events. Ember attack, radiant heat damage, and smoke infiltration from a nearby fire are also generally covered events. Document all visible damage — including ember entry points, heat warping to external structures, and soot in roof cavities — before any emergency cleaning begins. Lodge a claim as soon as practicable; most policies have no time limit on lodging but early documentation is critical.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does living in a BAL FZ (Flame Zone) rated area affect my insurance premiums or coverage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BAL FZ (Flame Zone) is the highest bushfire attack level classification under AS 3959 and directly affects building standards and insurance risk. Properties in Stirling, Hahndorf, Lobethal, Aldgate, and other Adelaide Hills BAL FZ areas often face higher building insurance premiums and in some cases insurers will apply exclusions for certain types of combustible cladding or construction materials that do not meet BAL FZ standards. Review your policy schedule carefully for any BAL-related conditions. After a fire loss, your insurer will assess whether the property was built to the required standard — NRPG can provide S700:2025-compliant documentation to support your claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'My Adelaide home is an old fibro (asbestos-cement) house and it has had a fire — what do I need to know?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Asbestos-cement (fibro) sheeting in post-war homes across Adelaide\'s northern suburbs (Elizabeth, Salisbury, Para Hills) and inner suburbs is a critical risk factor after a fire. Fire and firefighting activity can fracture or disturb asbestos-cement sheets, releasing asbestos fibres. Do not attempt any cleaning or demolition until a licensed asbestos assessor has inspected the property and provided a clearance certificate. Your insurer is required to fund licensed asbestos removal as part of the fire damage claim. NRPG coordinates asbestos assessment and licensed removal as part of the S700:2025 restoration scope — do not use general cleaners who are not qualified for asbestos-affected fire sites.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does fire damage restoration cost in Adelaide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cost depends on the type and scale of fire. Kitchen or single-room fire (Adelaide inner suburb solid brick home): $4,000–$18,000. Structural fire across multiple rooms: $15,000–$70,000. BAL zone total loss in the Adelaide Hills: $40,000–$200,000+. Rural heritage property loss in the Adelaide Hills or McLaren Vale wine country: $200,000–$500,000+. Asbestos-affected fibro homes add licensed removal and air clearance costs. All costs are typically covered by your building and contents insurance subject to sum insured and excess. NRPG provides a full S700:2025 scope of works report for insurer submission.',
      },
    },
  ],
};

export default function FireDamageRestorationAdelaidePage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="fdradl-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="fdradl-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="fdradl-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Adelaide"
        subtitle="Emergency fire damage restoration across Adelaide and South Australia. IICRC S700:2025 certified contractors for fire, smoke, bushfire, and asbestos-aware fibro home restoration. Adelaide Hills BAL zones covered. 60-minute response."
        gradient="linear-gradient(135deg, #1A0800 0%, #D84315 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Adelaide' },
        ]}
        sections={[
          {
            heading: "Adelaide's Fire Risk — Hills, BAL Zones, and Urban Fibro Stock",
            body: (
              <>
                <p>
                  Adelaide faces one of Australia&apos;s most concentrated combinations of fire risk: a dense urban
                  fringe abutting extreme Bushfire Attack Level zones in the Adelaide Hills, compounded by a large
                  stock of post-war asbestos-cement (fibro) homes in the northern suburbs that create serious
                  hazardous-materials consequences when fire strikes.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Adelaide Hills &mdash; Stirling, Hahndorf, Lobethal, Woodside, Mount Barker, Macclesfield,
                  Aldgate, and Echunga &mdash; contain properties rated BAL FZ (Flame Zone), the highest
                  classification under AS 3959. The Cudlee Creek fire in December 2019 destroyed 86 homes in the
                  Hills; Cherry Gardens and Kangaroo Island fires added further significant losses in the same
                  2019&ndash;20 Black Summer season.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  McLaren Vale wine country and the Fleurieu Peninsula carry high-value rural residential exposure
                  during summer fire seasons, with heritage and rural properties presenting complex restoration
                  requirements. In Adelaide&apos;s northern suburbs, post-war fibro housing in Elizabeth, Parafield
                  and Salisbury means fire damage almost always requires a licensed asbestos assessment before
                  restoration work can begin &mdash; fire can fracture asbestos-cement sheets and release fibres.
                  NRPG&apos;s IICRC S700:2025-certified contractors are experienced across all of these scenarios.
                </p>
              </>
            ),
          },
          {
            heading: 'Fire Damage Restoration Cost Estimates',
            body: (
              <>
                <p>
                  Restoration costs in Adelaide vary significantly by property type, location, and fire severity.
                  These ranges are indicative only &mdash; NRPG provides a full S700:2025 scope of works for
                  insurer submission after initial assessment.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Kitchen or single-room fire (solid brick inner-suburb home):</strong> $4,000&ndash;$18,000
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Structural fire across multiple rooms:</strong> $15,000&ndash;$70,000
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>BAL zone total loss, Adelaide Hills:</strong> $40,000&ndash;$200,000+
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Rural heritage property (Adelaide Hills or McLaren Vale):</strong> $200,000&ndash;$500,000+
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Asbestos-affected fibro homes incur additional licensed removal and air clearance costs, which
                  are covered as part of the fire damage claim under most SA home insurance policies. The ARPC
                  Cyclone Pool does not apply to fire damage &mdash; fire claims are handled directly through your
                  private insurer.
                </p>
              </>
            ),
          },
          {
            heading: 'Adelaide Areas We Cover',
            body: (
              <>
                <p>
                  60-minute emergency response across Adelaide metro for fire damage make-safe and structural
                  assessment.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Adelaide Hills (BAL zones):</strong> Stirling, Hahndorf, Lobethal, Woodside, Mount Barker,
                  Macclesfield, Aldgate, Echunga, Balhannah, Mylor
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>McLaren Vale / Fleurieu Peninsula:</strong> McLaren Vale, Willunga, Aldinga, Victor Harbor,
                  Goolwa
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner Adelaide (heritage and urban stock):</strong> Norwood, Kensington, Kent Town,
                  Magill, Burnside, Mitcham
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern suburbs (fibro stock):</strong> Elizabeth, Salisbury, Para Hills, Parafield,
                  Davoren Park, Smithfield
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Adelaide CBD and surrounds:</strong> Adelaide CBD, Parklands perimeter, North Adelaide,
                  Prospect, Hindmarsh
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern suburbs:</strong> Noarlunga, Christies Beach, Morphett Vale, Hallett Cove
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does my SA home insurance cover the Cudlee Creek fire or Adelaide Hills bushfire damage?',
            answer: 'Yes — direct bushfire damage to building and contents is covered under the fire peril in standard South Australian home insurance policies. Ember attack, radiant heat damage, and smoke infiltration from a nearby fire are also generally covered. Document all visible damage before any emergency cleaning begins and lodge your claim as soon as practicable.',
          },
          {
            question: 'Does living in a BAL FZ (Flame Zone) rated area affect my insurance premiums or coverage?',
            answer: 'BAL FZ is the highest bushfire attack level under AS 3959 and directly affects building standards and insurance risk. Properties in Stirling, Hahndorf, Lobethal, and Aldgate often face higher building insurance premiums and in some cases exclusions for combustible materials that do not meet BAL FZ standards. Review your policy schedule carefully for any BAL-related conditions.',
          },
          {
            question: 'My Adelaide home is an old fibro (asbestos-cement) house and it has had a fire — what do I need to know?',
            answer: 'Fire and firefighting activity can fracture asbestos-cement sheets in post-war fibro homes, releasing asbestos fibres. Do not attempt any cleaning or demolition until a licensed asbestos assessor has inspected the property and provided a clearance certificate. Your insurer is required to fund licensed asbestos removal as part of the fire damage claim. NRPG coordinates asbestos assessment and licensed removal as part of the S700:2025 restoration scope.',
          },
          {
            question: 'How much does fire damage restoration cost in Adelaide?',
            answer: 'Kitchen or single-room fire: $4,000–$18,000. Structural fire across multiple rooms: $15,000–$70,000. BAL zone total loss in the Adelaide Hills: $40,000–$200,000+. Rural heritage property loss: $200,000–$500,000+. Asbestos-affected fibro homes add licensed removal costs. All costs are typically covered by your building and contents insurance subject to sum insured and excess.',
          },
        ]}
        relatedGuides={[
          { title: 'Storm Damage Restoration Adelaide', href: '/storm-damage-restoration-adelaide', description: 'Adelaide storm damage — wind, hail, and structural repairs.' },
          { title: 'Water Damage Restoration Adelaide', href: '/water-damage-restoration-adelaide', description: 'Fire suppression and storm water damage — IICRC-certified restoration.' },
          { title: 'Mould Remediation Adelaide', href: '/mould-remediation-adelaide', description: 'Post-fire suppression water can cause rapid mould in Adelaide — act within 48 hours.' },
          { title: 'Fire Damage Restoration Melbourne', href: '/fire-damage-restoration-melbourne', description: 'IICRC S700:2025 fire restoration in Melbourne.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
