import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-475: Water Damage Restoration Brisbane
 *
 * Created: 9 April 2026
 * Context: Brisbane is the largest single market for Ex-TC Alfred claims.
 * Major market gap — Elite has no dedicated Brisbane water damage page.
 * ACL s18 compliant.
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Brisbane | 24/7 IICRC Certified',
  description: 'Professional water damage restoration across all Brisbane suburbs. IICRC S500:2025 certified contractors respond in under 60 minutes. Burst pipes, storm flooding, Alfred recovery support. Lodge your claim 24/7.',
  keywords: 'water damage restoration brisbane, water damage brisbane, flood damage brisbane, burst pipe brisbane, water damage repair brisbane, IICRC brisbane, alfred water damage brisbane, structural drying brisbane',
  openGraph: {
    title: 'Water Damage Restoration Brisbane | 24/7 Emergency Response',
    description: 'Emergency water damage restoration across all Brisbane suburbs. IICRC S500:2025 certified. 60-minute response. Alfred and storm flood claim support.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Brisbane')}&service=water-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-brisbane`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-brisbane/#localbusiness`,
  name: `${NAP.name} Brisbane`,
  url: `${NAP.url}/water-damage-restoration-brisbane`,
  description: 'IICRC-certified water damage restoration contractors serving all Brisbane suburbs 24/7. Water extraction, structural drying, mould prevention, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Brisbane', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Brisbane', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Water Damage Restoration Brisbane',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Brisbane' },
  serviceType: 'Water Damage Restoration',
  description: 'Professional water damage restoration in Brisbane: emergency water extraction, structural drying to IICRC S500:2025, mould prevention, contents protection, and full insurance claim documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly should water damage be treated in Brisbane?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Within 24\u201348 hours. Brisbane\u2019s subtropical climate means mould establishes rapidly in water-affected materials. The longer water remains in wall cavities and subfloor, the more extensive and costly the damage becomes. Lodge at disasterrecovery.com.au/claim for 60-minute emergency dispatch.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is my Alfred flood damage still claimable in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes \u2014 most insurers do not have strict time limits if you can demonstrate the damage occurred during the Alfred event. If your claim was underpaid or you have secondary damage (mould, structural), you can lodge a supplementary claim or escalate to AFCA. NRPG provides full documentation to support late or supplementary lodgements.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between water damage and flood damage for Brisbane claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Water damage covers sudden water loss from internal sources (burst pipes, appliance overflow) and storm water entering through breached building elements. Flood damage specifically refers to inundation from external water bodies (rivers, overland flow). Most standard policies cover the former; flood often requires a specific extension. NRPG helps categorise your damage correctly to maximise claim outcomes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my Brisbane property still has hidden moisture?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Signs include musty odour, soft or bubbling plasterboard, condensation on windows, and mould appearing weeks after apparent drying. NRPG technicians use thermal imaging cameras and calibrated moisture meters to detect moisture in wall cavities and subfloor that dried surfaces conceal.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does IICRC S500:2025 mean for my water damage claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ANSI/IICRC S500:2025 is the Australian standard for water damage restoration. It governs how extraction, drying, and documentation must be performed. Insurers require psychrometric drying logs that only IICRC-certified contractors can produce. Non-certified work may leave you unable to substantiate the restoration for claim sign-off.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does water damage restoration cost in Brisbane?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Water damage restoration in Brisbane ranges from $3,000 for minor burst pipe losses to $60,000+ for cyclone flooding inundation. The Disaster Recovery platform charges a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency works.',
      },
    },
  ],
};

export default function WaterDamageRestorationBrisbanePage() {
  return (
    <>
      <Script id="wdrbne-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="wdrbne-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="wdrbne-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Brisbane"
        subtitle="Emergency water damage restoration across all Brisbane suburbs. IICRC S500:2025 certified technicians. 60-minute response, 24 hours a day. Ex-TC Alfred recovery support available."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Brisbane' },
        ]}
        sections={[
          {
            heading: 'Water Damage in Brisbane — The Risk Profile',
            body: (
              <>
                <p>
                  Brisbane&apos;s geography — a river city surrounded by low-lying flood plains, with a subtropical
                  climate delivering annual rainfall exceeding 1,000 mm — creates a persistent water damage risk across
                  large parts of the LGA. The Brisbane River catchment extends into suburbs well inland from the CBD,
                  and storm events regularly generate flash flooding across creek corridors including Kedron Brook,
                  Bulimba Creek, and Oxley Creek.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Ex-Tropical Cyclone Alfred in March 2026 produced unprecedented rainfall across SEQ, with Brisbane
                  recording over 400 mm in 48 hours in some catchments. The ICA declared Alfred a catastrophe, with
                  over 132,000 claims across Queensland and northern NSW. PERILS has confirmed a final insured loss
                  of AU$1.877 billion — the largest insured cyclone loss since Cyclone Debbie (2017). Many Brisbane
                  property owners are still in active restoration or dealing with secondary issues including mould,
                  incomplete drying, and insurer disputes.
                </p>
              </>
            ),
          },
          {
            heading: 'Ex-TC Alfred — Brisbane Recovery Support',
            body: (
              <>
                <p>
                  If your Brisbane property sustained water damage from Ex-TC Alfred and your claim is stalled,
                  disputed, or showing secondary mould issues, NRPG can step in at any stage:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Underpaid claim:</strong> Independent IICRC-certified scope assessment to identify what
                    was missed or undervalued. Full documentation for AFCA lodgement if required.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Mould appearing after drying:</strong> A sign of incomplete remediation. NRPG performs
                    post-drying moisture mapping and IICRC-compliant re-remediation with insurer documentation.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Insurer communication breakdown:</strong> NRPG manages all insurer correspondence,
                    escalating directly to senior claims teams when standard channels fail.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Water Damage Restoration Cost Estimates — Brisbane 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Burst pipe or appliance overflow (Cat 1):</strong> $3,000–$12,000. Water extraction,
                    drying, plasterboard and flooring repair.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Storm water ingress (Cat 2):</strong> $5,000–$20,000. Moisture mapping, commercial
                    drying, antimicrobial treatment, structural repairs.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Sewage or floodwater inundation (Cat 3):</strong> $15,000–$60,000+. Decontamination,
                    subfloor treatment, full restoration to pre-loss condition.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-cyclone multi-trade loss:</strong> $20,000–$100,000+. Project-managed restoration
                    across structural, water, and mould trades.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Brisbane Suburbs We Cover',
            body: (
              <>
                <p>60-minute emergency response across all Brisbane suburbs:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner City / South Bank:</strong> Brisbane CBD, South Brisbane, Kangaroo Point, Fortitude
                  Valley, Spring Hill, Newstead, Teneriffe, New Farm
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner North:</strong> Newmarket, Kelvin Grove, Herston, Red Hill, Paddington, Ashgrove,
                  The Gap, Keperra, Mitchelton, Everton Park
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner South:</strong> West End, Highgate Hill, Greenslopes, Annerley, Yeronga, Moorooka,
                  Rocklea, Salisbury, Coopers Plains
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern Suburbs:</strong> Bulimba, Hawthorne, Balmoral, Morningside, Norman Park,
                  Camp Hill, Coorparoo, Greenslopes, Seven Hills
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western Suburbs:</strong> Toowong, Auchenflower, Milton, Taringa, Indooroopilly,
                  St Lucia, Graceville, Sherwood, Corinda, Oxley
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Growth Corridor:</strong> Chermside, Aspley, Stafford, Kedron, Nundah,
                  Northgate, Virginia, Zillmere, Fitzgibbon, Mango Hill
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Eight Mile Plains, Runcorn, Sunnybank, Calamvale, Algester,
                  Parkinson, Robertson, Stretton, Drewvale
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly should water damage be treated in Brisbane?',
            answer: "Within 24–48 hours. Brisbane's subtropical climate means mould establishes rapidly in water-affected materials. The longer water remains in wall cavities and subfloor, the more extensive and costly the damage becomes. Lodge at disasterrecovery.com.au/claim for 60-minute emergency dispatch.",
          },
          {
            question: 'Is my Alfred flood damage still claimable in 2026?',
            answer: "Yes — most insurers do not have strict time limits if you can demonstrate the damage occurred during the Alfred event. If your claim was underpaid or you have secondary damage (mould, structural), you can lodge a supplementary claim or escalate to AFCA. NRPG provides full documentation to support late or supplementary lodgements.",
          },
          {
            question: 'What is the difference between water damage and flood damage for Brisbane claims?',
            answer: "Water damage covers sudden water loss from internal sources (burst pipes, appliance overflow) and storm water entering through breached building elements. Flood damage specifically refers to inundation from external water bodies (rivers, overland flow). Most standard policies cover the former; flood often requires a specific extension. NRPG helps categorise your damage correctly to maximise claim outcomes.",
          },
          {
            question: 'How do I know if my Brisbane property still has hidden moisture?',
            answer: "Signs include musty odour, soft or bubbling plasterboard, condensation on windows, and mould appearing weeks after apparent drying. NRPG technicians use thermal imaging cameras and calibrated moisture meters to detect moisture in wall cavities and subfloor that dried surfaces conceal.",
          },
          {
            question: 'What does IICRC S500:2025 mean for my water damage claim?',
            answer: "ANSI/IICRC S500:2025 is the Australian standard for water damage restoration. It governs how extraction, drying, and documentation must be performed. Insurers require psychrometric drying logs that only IICRC-certified contractors can produce. Non-certified work may leave you unable to substantiate the restoration for claim sign-off.",
          },
          {
            question: 'How much does water damage restoration cost in Brisbane?',
            answer: "Water damage restoration in Brisbane ranges from $3,000 for minor burst pipe losses to $60,000+ for cyclone flooding inundation. The Disaster Recovery platform charges a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency works.",
          },
        ]}
        relatedGuides={[
          { title: 'Ex-TC Alfred Recovery — Disputed Claims Guide', href: '/events/ex-cyclone-alfred-recovery', description: 'If your Alfred claim is stuck or underpaid, NRPG can escalate.' },
          { title: 'Water Damage Restoration Melbourne', href: '/water-damage-restoration-melbourne', description: 'Our Melbourne water damage restoration service.' },
          { title: 'Water Damage Restoration Sydney', href: '/water-damage-restoration-sydney', description: 'Our Sydney water damage restoration service.' },
          { title: 'Mould Remediation Brisbane', href: '/services/mould-remediation', description: 'Prevent and remediate mould after water damage.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
