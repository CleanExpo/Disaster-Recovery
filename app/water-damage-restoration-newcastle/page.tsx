import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * Water Damage Restoration Newcastle
 *
 * Created: 9 April 2026
 * Context: Newcastle/Hunter is one of NSW's highest storm and water damage claim
 * corridors. The 2021 Hunter floods (worst since 1955) and recurring east coast
 * low events create sustained demand for certified water damage restoration.
 * Maitland is Australia's most flooded city. ACL s18 compliant.
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Newcastle | 24/7 IICRC Certified',
  description: 'Professional water damage restoration across Newcastle and the Hunter region. IICRC S500:2025 certified contractors respond as quickly as possible. Hunter River flooding, east coast low storm damage, burst pipes. Lodge your claim 24/7.',
  keywords: 'water damage restoration newcastle, water damage newcastle, flood damage newcastle, burst pipe newcastle, hunter valley flood damage, maitland flood damage, water damage repair newcastle, IICRC newcastle, east coast low water damage',
  openGraph: {
    title: 'Water Damage Restoration Newcastle | 24/7 Emergency Response',
    description: 'Emergency water damage restoration across Newcastle and the Hunter region. IICRC S500:2025 certified. priority response. Hunter River flood and east coast low storm damage specialists.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Newcastle')}&service=water-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-newcastle`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-newcastle/#localbusiness`,
  name: `${NAP.name} Newcastle`,
  url: `${NAP.url}/water-damage-restoration-newcastle`,
  description: 'IICRC-certified water damage restoration contractors serving Newcastle and the Hunter region 24/7. Water extraction, structural drying, mould prevention, and full insurance documentation following IICRC S500:2025.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Newcastle', containedInPlace: { '@type': 'State', name: 'New South Wales' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Newcastle', addressRegion: 'NSW', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Water Damage Restoration Newcastle',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Newcastle' },
  serviceType: 'Water Damage Restoration',
  description: 'Professional water damage restoration in Newcastle and the Hunter region: emergency water extraction, structural drying to IICRC S500:2025, mould prevention, contents protection, and full insurance claim documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does my home insurance cover Hunter River flood damage in Newcastle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Coverage depends on your specific policy. Most standard home insurance policies cover sudden storm water ingress (water entering through a breached roof, window, or wall) but treat river and overland flooding as a separate extension. If your property was inundated by the Hunter River or its tributaries, you will need to check whether your policy includes a flood extension. NRPG can help categorise your damage correctly and document the mechanism of loss to maximise your claim outcome.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between east coast low water damage and storm surge for insurance purposes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "East coast low (ECL) water damage occurs when intense horizontal rain driven by 100km/h+ winds forces water through building joints, roof penetrations, weep holes, and wall cracks — this is classified as storm water ingress and is typically covered under standard policies. Storm surge is a coastal phenomenon involving sea-level rise driven by low pressure and wind, which most standard policies exclude. For Newcastle properties near the waterfront or Stockton Beach, the distinction is critical. NRPG documents the mechanism of water entry to correctly classify your claim.",
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly should I act after water damage in Newcastle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Immediately — within 24 to 48 hours is critical. Newcastle and the Hunter Valley experience humid summer conditions where mould establishes in water-affected materials within 48 hours of exposure. Delays in extraction and drying allow moisture to penetrate wall cavities, subfloor timbers, and insulation, dramatically increasing both the remediation cost and the likelihood of mould-related health risks. Lodge at disasterrecovery.com.au/claim for priority emergency dispatch.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does water damage restoration cost in Newcastle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Water damage restoration in Newcastle ranges from $2,500–$12,000 for Category 1 losses such as burst pipes or appliance overflow, $6,000–$30,000 for Category 2 storm water ingress through breached building elements, and $15,000–$70,000 or more for Category 3 Hunter River flooding inundation. Heritage terrace homes in Cooks Hill, Hamilton, and Islington typically cost more to restore due to their brick and plaster construction. The Disaster Recovery platform charges a $2,750 initial commitment to begin emergency works.",
      },
    },
  ],
};

export default function WaterDamageRestorationNewcastlePage() {
  return (
    <>
      <Script id="wdrnewc-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="wdrnewc-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="wdrnewc-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Newcastle"
        subtitle="Emergency water damage restoration across Newcastle and the Hunter region. IICRC S500:2025 certified technicians. priority response, 24 hours a day. Hunter River flood and east coast low storm damage specialists."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Newcastle' },
        ]}
        sections={[
          {
            heading: 'Newcastle and Hunter Region Water Damage Risk',
            body: (
              <>
                <p>
                  The Hunter region sits at the convergence of several high-risk water damage vectors: a major river
                  system prone to catastrophic flooding, a coastline exposed to east coast low weather systems, an
                  industrial port precinct with complex commercial water damage scenarios, and a housing stock that
                  includes heritage terrace homes with inherent water ingress vulnerabilities. This combination makes
                  the Newcastle and Hunter corridor one of NSW&apos;s highest storm and water damage insurance claim areas.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Maitland, situated on the Hunter River floodplain 30 km west of Newcastle, is widely recognised as
                  Australia&apos;s most flooded city. The Hunter River has inundated Maitland CBD and surrounds repeatedly
                  throughout history, with major floods recorded in 1893, 1949, 1955, and more recently in 2021 and
                  2022. Properties along the Hunter River and Williams River corridors carry elevated flood risk that
                  requires specialist assessment.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The inner-city suburbs of Cooks Hill, Hamilton, and Islington contain a high concentration of
                  heritage terrace homes built from brick and plaster. These properties are particularly vulnerable
                  to water ingress through mortar joints, cracked render, and deteriorated damp-proof courses. When
                  water enters these structures, it can saturate walls over a wide area before becoming visible,
                  making thermal imaging essential for accurate moisture mapping.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Newcastle&apos;s port area and the Hunter Valley coal sector generate complex commercial water damage
                  scenarios alongside the residential market. Industrial facilities with large-span roof structures,
                  exposed steel, and specialised floor surfaces require contractors with commercial water damage
                  experience and appropriate insurance cover — all requirements met by NRPG&apos;s vetted contractor
                  network.
                </p>
              </>
            ),
          },
          {
            heading: '2021 Hunter Floods and East Coast Low Events',
            body: (
              <>
                <p>
                  In March 2021, the Hunter region experienced its worst flooding since 1955. The Hunter River broke
                  its banks across multiple locations, inundating properties in Maitland, Singleton, and other Hunter
                  Valley communities. The event was declared a natural disaster, activating Commonwealth-State disaster
                  relief arrangements. Many properties sustained Category 3 flood damage — sewage-contaminated
                  floodwater requiring full decontamination, subfloor treatment, and structural restoration.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Separate from river flooding, Newcastle is frequently impacted by east coast low (ECL) weather
                  systems. ECL events drive sustained wind speeds exceeding 100 km/h, forcing rain horizontally
                  through building joints, roof penetrations, weep holes in brick-veneer construction, and failed
                  window seals. The 2015 Dungog and Paterson floods — triggered by a severe ECL — caused extensive
                  property damage across the Hunter, with some properties experiencing both roof damage and
                  floodwater inundation simultaneously.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  ECL water ingress is categorised differently to river flooding for insurance purposes. Water forced
                  through building elements by storm pressure is classified as storm water damage under most standard
                  policies, while river and overland flow flooding typically requires a separate flood extension.
                  NRPG documents the mechanism of water entry in detail to ensure each component of your claim is
                  correctly categorised, reducing the risk of claim denial or underpayment.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  IICRC S500:2025 applies to all water damage restoration work in the Hunter region. In Newcastle&apos;s
                  humid summer conditions, mould establishes within 48 hours of water exposure in affected materials.
                  NRPG technicians use calibrated moisture meters and thermal imaging cameras to identify all
                  moisture-affected areas before beginning structural drying, preventing secondary mould growth and
                  ensuring insurer-accepted psychrometric drying logs.
                </p>
              </>
            ),
          },
          {
            heading: 'Newcastle Suburbs We Cover',
            body: (
              <>
                <p>priority emergency response across Newcastle and the Hunter region:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Newcastle Inner City:</strong> Newcastle CBD, Cooks Hill, Hamilton, Islington, Georgetown,
                  Wickham, Carrington, Tighes Hill, Mayfield
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner Southern Suburbs:</strong> New Lambton, Adamstown, Merewether, Bar Beach,
                  The Junction, Lambton, Broadmeadow
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Industrial and Port Precinct:</strong> Mayfield, Carrington, Tighes Hill, Kooragang,
                  Stockton, Wickham, Maryville, Waratah
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Lake Macquarie:</strong> Charlestown, Warners Bay, Belmont, Redhead, Swansea,
                  Cardiff, Gateshead, Kotara, Morisset, Toronto
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hunter Valley — Maitland Corridor:</strong> Maitland, East Maitland, Rutherford,
                  Metford, Thornton, Cessnock, Kurri Kurri, Maitland CBD, Bolwarra
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Hunter:</strong> Raymond Terrace, Maitland, Dungog, Paterson,
                  Singleton, Muswellbrook
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does my home insurance cover Hunter River flood damage in Newcastle?',
            answer: "Coverage depends on your specific policy. Most standard home insurance policies cover sudden storm water ingress (water entering through a breached roof, window, or wall) but treat river and overland flooding as a separate extension. If your property was inundated by the Hunter River or its tributaries, you will need to check whether your policy includes a flood extension. NRPG can help categorise your damage correctly and document the mechanism of loss to maximise your claim outcome.",
          },
          {
            question: 'What is the difference between east coast low water damage and storm surge for insurance purposes?',
            answer: "East coast low (ECL) water damage occurs when intense horizontal rain driven by 100km/h+ winds forces water through building joints, roof penetrations, weep holes, and wall cracks — this is classified as storm water ingress and is typically covered under standard policies. Storm surge is a coastal phenomenon involving sea-level rise driven by low pressure and wind, which most standard policies exclude. For Newcastle properties near the waterfront or Stockton Beach, the distinction is critical. NRPG documents the mechanism of water entry to correctly classify your claim.",
          },
          {
            question: 'How quickly should I act after water damage in Newcastle?',
            answer: "Immediately — within 24 to 48 hours is critical. Newcastle and the Hunter Valley experience humid summer conditions where mould establishes in water-affected materials within 48 hours of exposure. Delays in extraction and drying allow moisture to penetrate wall cavities, subfloor timbers, and insulation, dramatically increasing both the remediation cost and the likelihood of mould-related health risks. Lodge at disasterrecovery.com.au/claim for priority emergency dispatch.",
          },
          {
            question: 'How much does water damage restoration cost in Newcastle?',
            answer: "Water damage restoration in Newcastle ranges from $2,500–$12,000 for Category 1 losses such as burst pipes or appliance overflow, $6,000–$30,000 for Category 2 storm water ingress through breached building elements, and $15,000–$70,000 or more for Category 3 Hunter River flooding inundation. Heritage terrace homes in Cooks Hill, Hamilton, and Islington typically cost more to restore due to their brick and plaster construction. The Disaster Recovery platform charges a $2,750 initial commitment to begin emergency works.",
          },
        ]}
        relatedGuides={[
          { title: 'Storm Damage Restoration Newcastle', href: '/storm-damage-restoration-newcastle', description: 'East coast low and storm damage restoration across the Hunter region.' },
          { title: 'Flood Damage Restoration Sydney', href: '/flood-damage-restoration-sydney', description: 'Flood damage restoration and claim support across Sydney.' },
          { title: 'Water Damage Restoration Sydney', href: '/water-damage-restoration-sydney', description: 'Our Sydney water damage restoration service.' },
          { title: 'Mould Remediation Sydney', href: '/mould-remediation-sydney', description: 'IICRC-certified mould remediation after water damage.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
