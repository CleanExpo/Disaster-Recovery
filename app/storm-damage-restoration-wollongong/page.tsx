import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Wollongong | Escarpment, ECL & Coastal Damage 24/7',
  description: 'Emergency storm damage restoration across Wollongong and the Illawarra. IICRC-certified contractors for east coast low damage, escarpment flooding, coastal structural damage, and make-safe. 24/7 response.',
  keywords: 'storm damage restoration wollongong, storm damage wollongong, illawarra storm damage, east coast low wollongong, escarpment flooding, coastal storm damage wollongong, wind damage wollongong, roof damage wollongong',
  openGraph: {
    title: 'Storm Damage Restoration Wollongong | Escarpment, ECL & Coastal Damage 24/7',
    description: 'Emergency storm damage restoration across Wollongong and the Illawarra. IICRC-certified contractors for east coast low damage, escarpment flooding, coastal structural damage, and make-safe. 24/7 response.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Wollongong')}&service=storm-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-wollongong`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-wollongong/#localbusiness`,
  name: `${NAP.name} Wollongong`,
  url: `${NAP.url}/storm-damage-restoration-wollongong`,
  description: '24/7 emergency storm damage restoration across Wollongong and the Illawarra region. IICRC-certified contractor network for east coast low damage, escarpment flooding, coastal wind and structural damage, and make-safe.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Wollongong', containedInPlace: { '@type': 'State', name: 'New South Wales' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Wollongong', addressRegion: 'NSW', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Storm Damage Restoration Wollongong',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Wollongong', containedInPlace: { '@type': 'State', name: 'New South Wales' } },
  serviceType: 'Storm Damage Restoration',
  description: 'Professional storm damage restoration across Wollongong and the Illawarra including emergency make-safe, roof tarping, escarpment water ingress damage, east coast low structural damage, coastal wind damage repair, and full insurance documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does home insurance cover escarpment landslide damage to Wollongong properties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coverage for escarpment landslide damage depends entirely on your specific policy. Most standard home insurance policies exclude landslide as a named peril unless the landslide was directly caused by a storm event (e.g., saturation from ECL rainfall causing earth movement). Properties in Stanwell Park, Helensburgh, Clifton, and Scarborough on the Illawarra Escarpment should check their PDS carefully for landslide and earth movement exclusions. NRPG provides IICRC-certified documentation of storm-triggered water ingress and structural damage to support claims where storm is the proximate cause.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is east coast low damage covered under the storm or flood peril in Wollongong insurance policies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This is the most contested classification for Wollongong storm claims. East coast lows produce both direct rainfall (a storm peril) and can cause creek and drainage system overflow (which insurers may classify as flood). Properties in Dapto, Kembla Grange, Unanderra, and Koonawarra — historically affected by the 1998 Wollongong storms — may have claims split across storm and flood perils with different excesses. NRPG\'s IICRC-certified documentation records the source and timeline of water entry to support the correct peril classification and minimise disputes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a heritage terrace home in Wollongong be restored after major storm water ingress?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Heritage working-class terrace homes in Wollongong CBD, Wollongong East, and Fairy Meadow are built from solid brick with plaster interior finishes — construction that is durable but vulnerable to sustained moisture from a compromised roof or failed flashings. IICRC S500:2025-certified structural drying techniques are used to remove moisture from brick and plaster without demolishing original fabric where possible. NRPG contractors experienced in heritage residential stock document full scope under IICRC standards for insurer sign-off, including thermal imaging to identify concealed moisture.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does storm damage restoration cost in Wollongong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Storm damage restoration costs in Wollongong depend on damage type and location. Standard structural repairs typically range from $2,500 to $15,000. Properties with escarpment water ingress — where orographic rainfall concentrations drive large volumes of water into structures — range from $8,000 to $40,000. Severe east coast low events, particularly in exposed beachside suburbs like Thirroul, Austinmer, and Coledale, or in escarpment-adjacent properties at risk of landslide, can reach $20,000 to $80,000 or more. Costs are typically covered by home and contents insurance subject to policy terms, excess, and peril classification.',
      },
    },
  ],
};

export default function StormDamageRestorationWollongongPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="sdrgong-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrgong-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="sdrgong-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Wollongong"
        subtitle="Emergency storm damage restoration across Wollongong, the Illawarra Escarpment, and the northern and southern coastal suburbs. IICRC-certified contractors for east coast low damage, escarpment flooding, and coastal structural damage. 24-hour response."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Wollongong' },
        ]}
        sections={[
          {
            heading: "Wollongong\u2019s Storm Risk \u2014 Escarpment, Ocean, and East Coast Lows",
            body: (
              <>
                <p>
                  Wollongong occupies one of Australia&apos;s most storm-exposed positions: a narrow coastal strip
                  trapped between the Illawarra Escarpment to the west and the Pacific Ocean to the east. East coast
                  lows tracking up the NSW coastline hit Wollongong before reaching Sydney, with the escarpment acting
                  as a natural amplifier. Moisture-laden air from the ocean is forced rapidly upward as it meets the
                  escarpment &mdash; a process called orographic lifting &mdash; dramatically intensifying rainfall.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The June 2016 Illawarra storms demonstrated this effect in extreme form: record daily rainfall of
                  300+ mm was recorded, triggering landslides from the escarpment onto residential areas in Thirroul,
                  Scarborough, and Stanwell Park. Properties on the escarpment face storm-triggered landslide risk
                  on every major ECL event. Beachside suburbs from Thirroul and Austinmer to Coledale and Woonona
                  face direct east-facing Pacific Ocean exposure &mdash; storm swell and wind-driven rain cause
                  roof damage, shattered glazing, and structural water ingress.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  IICRC S500:2025 and S700:2025 standards govern storm and water damage restoration work carried out
                  by NRPG-network contractors across the Illawarra region. The ARPC Cyclone Pool does not apply to
                  Wollongong &mdash; all storm and wind damage claims proceed under the standard storm peril of your
                  home insurance policy.
                </p>
              </>
            ),
          },
          {
            heading: "Escarpment Landslide and Flash Flooding",
            body: (
              <>
                <p>
                  Properties in Stanwell Park, Helensburgh, Clifton, and Scarborough sit at the base or on the
                  face of the Illawarra Escarpment. During major ECL events, saturated soil on the steep escarpment
                  face can generate debris flows and landslides that damage structures, block drainage, and deposit
                  sediment-laden water through buildings. The 2016 storms produced multiple escarpment landslides
                  that required emergency make-safe, structural assessment, and prolonged remediation.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Flash flooding is the dominant storm damage mechanism for Wollongong&apos;s inland and industrial
                  suburbs. The 1998 Wollongong storms caused catastrophic flooding across Kembla Grange, Unanderra,
                  and Koonawarra &mdash; areas where the flat topography and concentrated industrial drainage create
                  rapid water accumulation when the Illawarra&apos;s drainage systems are overwhelmed by escarpment
                  runoff. Bluescope Steel&apos;s Port Kembla industrial precinct and surrounding residential areas
                  face combined wind and flood damage in severe events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Heritage working-class terrace homes in Wollongong CBD, Wollongong East, and Fairy Meadow are
                  built from solid brick with plaster interior finishes. Sustained water ingress through a
                  storm-compromised roof or failed flashing in Wollongong&apos;s humid coastal climate can cause
                  plaster delamination, structural timber saturation, and mould establishment within days. NRPG
                  contractors use IICRC-certified structural drying techniques to preserve original building fabric
                  where possible, minimising demolition and restoration cost.
                </p>
              </>
            ),
          },
          {
            heading: 'Wollongong Suburbs We Cover',
            body: (
              <>
                <p>24-hour emergency storm response across Wollongong and the Illawarra:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner Wollongong:</strong> Wollongong CBD, Wollongong East, North Wollongong, Fairy Meadow
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Coastal/Escarpment:</strong> Thirroul, Austinmer, Coledale, Stanwell Park,
                  Helensburgh
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inland/Industrial:</strong> Dapto, Kembla Grange, Unanderra, Koonawarra
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Illawarra:</strong> Shellharbour, Albion Park, Kiama, Berry
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge your claim at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate contractor
                  matching across any Wollongong or Illawarra suburb.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does home insurance cover escarpment landslide damage to Wollongong properties?',
            answer: "Coverage for escarpment landslide damage depends entirely on your specific policy. Most standard home insurance policies exclude landslide as a named peril unless the landslide was directly caused by a storm event (e.g., saturation from ECL rainfall causing earth movement). Properties in Stanwell Park, Helensburgh, Clifton, and Scarborough on the Illawarra Escarpment should check their PDS carefully for landslide and earth movement exclusions. NRPG provides IICRC-certified documentation of storm-triggered water ingress and structural damage to support claims where storm is the proximate cause.",
          },
          {
            question: 'Is east coast low damage covered under the storm or flood peril in Wollongong insurance policies?',
            answer: "This is the most contested classification for Wollongong storm claims. East coast lows produce both direct rainfall (a storm peril) and can cause creek and drainage system overflow (which insurers may classify as flood). Properties in Dapto, Kembla Grange, Unanderra, and Koonawarra may have claims split across storm and flood perils with different excesses. NRPG's IICRC-certified documentation records the source and timeline of water entry to support the correct peril classification and minimise disputes.",
          },
          {
            question: 'Can a heritage terrace home in Wollongong be restored after major storm water ingress?',
            answer: 'Yes. Heritage terrace homes in Wollongong CBD, Wollongong East, and Fairy Meadow are built from solid brick with plaster interior finishes — durable but vulnerable to sustained moisture. IICRC S500:2025-certified structural drying techniques remove moisture from brick and plaster without demolishing original fabric where possible. NRPG contractors document full scope under IICRC standards for insurer sign-off, including thermal imaging to identify concealed moisture.',
          },
          {
            question: 'What does storm damage restoration cost in Wollongong?',
            answer: "Storm damage restoration costs in Wollongong depend on damage type and location. Standard structural repairs typically range from $2,500 to $15,000. Properties with escarpment water ingress range from $8,000 to $40,000. Severe east coast low events in exposed beachside suburbs like Thirroul, Austinmer, and Coledale, or in escarpment-adjacent properties at risk of landslide, can reach $20,000 to $80,000 or more. Costs are typically covered by home and contents insurance subject to policy terms, excess, and peril classification.",
          },
        ]}
        relatedGuides={[
          { title: 'Storm Damage Restoration Sydney', href: '/storm-damage-restoration-sydney', description: 'Emergency storm and hail damage restoration across all Sydney suburbs.' },
          { title: 'Storm Damage Restoration Melbourne', href: '/storm-damage-restoration-melbourne', description: 'Storm and hail damage restoration across Melbourne and Victoria.' },
          { title: 'Flood Damage Restoration Sydney', href: '/flood-damage-restoration-sydney', description: 'Flood damage restoration and insurance documentation across NSW.' },
          { title: 'Water Damage Restoration Sydney', href: '/water-damage-restoration-sydney', description: 'IICRC-certified water damage restoration across Sydney and NSW.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
