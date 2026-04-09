import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-475: Water Damage Restoration Gold Coast
 *
 * Created: 9 April 2026
 * Context: Ex-TC Alfred generated 132,000+ ICA claims concentrated in SEQ.
 * Gold Coast is one of the highest-claim density areas. Many claimants are
 * still in the restoration phase — this page captures mid-funnel recovery traffic.
 * ACL s18 compliant.
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Gold Coast | 24/7 Emergency Response',
  description: 'Professional water damage restoration on the Gold Coast. IICRC-certified contractors respond in under 60 minutes across all Gold Coast suburbs. Ex-TC Alfred and storm water damage specialists. Lodge your claim 24/7.',
  keywords: 'water damage restoration gold coast, water damage gold coast, flood damage gold coast, burst pipe gold coast, water damage repair gold coast, IICRC gold coast, alfred water damage gold coast, cyclone water damage gold coast',
  openGraph: {
    title: 'Water Damage Restoration Gold Coast | 24/7 IICRC Certified',
    description: 'Emergency water damage restoration across all Gold Coast suburbs. IICRC S500:2025 certified. 60-minute response. Ex-TC Alfred claim support available.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Gold Coast')}&service=water-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-gold-coast`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-gold-coast/#localbusiness`,
  name: `${NAP.name} Gold Coast`,
  url: `${NAP.url}/water-damage-restoration-gold-coast`,
  description: 'IICRC-certified water damage restoration contractors serving all Gold Coast suburbs 24/7. Water extraction, structural drying, mould prevention, and full insurance documentation following IICRC S500:2025.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Gold Coast', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Gold Coast', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Water Damage Restoration Gold Coast',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Gold Coast' },
  serviceType: 'Water Damage Restoration',
  description: 'Professional water damage restoration on the Gold Coast: emergency water extraction, structural drying to IICRC S500:2025, mould remediation, contents protection, and insurance claim documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

export default function WaterDamageRestorationGoldCoastPage() {
  return (
    <>
      <Script id="wdrgc-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="wdrgc-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Gold Coast"
        subtitle="Emergency water damage restoration across all Gold Coast suburbs. IICRC S500:2025 certified technicians. 60-minute response, 24 hours a day. Ex-TC Alfred claim support available."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Gold Coast' },
        ]}
        sections={[
          {
            heading: 'Water Damage on the Gold Coast — Why It\'s Different',
            body: (
              <>
                <p>
                  The Gold Coast&apos;s combination of canal estates, subtropical climate, and storm frequency
                  creates a water damage risk profile unlike most Australian cities. The city&apos;s 260-kilometre
                  canal network passes through or adjacent to thousands of residential properties — in heavy rain
                  events, rising canal levels can inundate ground floors within hours. The subtropical humidity
                  (averaging 65–80% year-round) means water damage that goes untreated for even 24 hours creates
                  ideal mould propagation conditions.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Ex-Tropical Cyclone Alfred in early 2026 generated the highest concentration of Gold Coast water
                  damage claims in a decade — over 132,000 ICA claims across SEQ, with the Gold Coast LGA
                  accounting for a significant share. Many Gold Coast properties are still in active restoration
                  or are dealing with secondary mould and structural issues following incomplete remediation.
                </p>
              </>
            ),
          },
          {
            heading: 'Ex-TC Alfred Water Damage — Gold Coast Recovery Support',
            body: (
              <>
                <p>
                  PERILS has confirmed a final insured loss of AU$1.877 billion for Ex-TC Alfred — the largest
                  insured cyclone loss on a current-value basis since Cyclone Debbie in 2017. If your Gold Coast
                  property sustained water damage from Alfred and your claim is stalled, underpaid, or in dispute,
                  NRPG can step in at any stage of the process.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Stuck claim:</strong> NRPG escalates directly with your insurer&apos;s senior claims
                    team using documented scope and IICRC-certified assessment evidence.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Incomplete drying:</strong> If a non-certified contractor dried your property, moisture
                    may still be trapped in wall cavities and subfloor. NRPG performs moisture mapping to identify
                    residual wet areas before mould takes hold.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Mould appearing post-restoration:</strong> Mould appearing weeks after apparent drying
                    is a sign of incomplete remediation. NRPG provides re-assessment and remediation to IICRC S500:2025
                    standard, with documentation for insurer re-lodgement.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Water Damage Restoration Cost Estimates — Gold Coast 2026',
            body: (
              <>
                <p>
                  Water damage restoration costs on the Gold Coast vary significantly by water category and affected
                  area. Indicative costs for residential properties in 2026:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Burst pipe or appliance overflow (Category 1):</strong> $3,000–$15,000. Water extraction,
                    structural drying, plasterboard replacement, painting.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Storm water ingress through roof or windows (Category 2):</strong> $5,000–$25,000.
                    Moisture mapping, drying, mould treatment, and structural repairs.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Canal or stormwater flooding inundation (Category 3):</strong> $15,000–$60,000+.
                    Decontamination, subfloor drying, contents removal, full structural restoration.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-cyclone combined water and structural loss:</strong> $20,000–$100,000+.
                    Multi-trade restoration managed through NRPG&apos;s project coordination service.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'The Water Damage Restoration Process',
            body: (
              <>
                <p>
                  NRPG connects you with IICRC-certified water damage restoration contractors across the entire
                  Gold Coast region. Every contractor in the network is certified to ANSI/IICRC S500:2025 —
                  the standard that determines whether your insurer accepts the drying documentation.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Emergency water extraction:</strong> Industrial wet vacuums and submersible pumps remove
                    standing water immediately. Every hour of standing water expands the affected area.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Moisture mapping:</strong> Thermal imaging and calibrated moisture meters identify wet
                    areas invisible to the naked eye, including inside wall cavities and subfloor voids.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Structural drying:</strong> Commercial dehumidifiers and high-velocity air movers operate
                    24/7. Psychrometric data is logged daily to confirm progress toward drying targets.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Antimicrobial treatment:</strong> HEPA-filtered air scrubbers and hospital-grade
                    antimicrobials prevent mould establishment in Gold Coast&apos;s subtropical conditions.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Structural repairs:</strong> Plasterboard replacement, flooring restoration, painting,
                    and cabinetry repair to return the property to pre-loss condition.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Gold Coast Suburbs We Cover',
            body: (
              <>
                <p>
                  Our contractor network provides 60-minute response across every Gold Coast suburb:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Beachfront:</strong> Surfers Paradise, Broadbeach, Main Beach, Mermaid Beach, Miami,
                  Burleigh Heads, Kirra, Coolangatta
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Canal Estates:</strong> Broadbeach Waters, Clear Island Waters, Mermaid Waters, Isle of
                  Capri, Sorrento, Bundall, Benowa Waters, Hope Island, Sanctuary Cove
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Corridor:</strong> Coomera, Helensvale, Oxenford, Upper Coomera, Pimpama,
                  Ormeau, Jacobs Well, Calypso Bay
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Palm Beach, Currumbin, Tugun, Elanora, Tallebudgera,
                  Varsity Lakes, Robina, Reedy Creek, Mudgeeraba
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hinterland:</strong> Nerang, Highland Park, Gilston, Advancetown, Springbrook,
                  Mount Tamborine, Canungra, Beaudesert
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly should I act after water damage on the Gold Coast?',
            answer: "Within 24–48 hours. Gold Coast's subtropical humidity means mould can establish within 48 hours of water damage occurring. The longer water sits in wall cavities or subfloor, the more extensive — and expensive — the damage becomes. Lodge your claim at disasterrecovery.com.au/claim for 60-minute emergency response.",
          },
          {
            question: 'Is water damage from Ex-TC Alfred still covered by insurance?',
            answer: "Yes — most policies don't have time limits for lodging claims after a disaster event if you can prove the damage occurred during the event. If your Alfred claim was underpaid or you've discovered secondary damage (mould, structural), you can lodge a supplementary claim or dispute the original settlement through AFCA.",
          },
          {
            question: 'What is the IICRC S500:2025 standard and why does it matter?',
            answer: "ANSI/IICRC S500:2025 is the industry standard for water damage restoration in Australia. Insurers require drying documentation (psychrometric logs, moisture readings) that only IICRC-certified contractors can produce. Restoration by a non-certified contractor may void your claim or leave you unable to prove the work was done to standard.",
          },
          {
            question: 'How do I know if my Gold Coast property has hidden moisture after flooding?',
            answer: "Look for musty smells, condensation on internal windows, soft or bubbling plasterboard, and discolouration in corners or behind furniture. NRPG technicians use thermal imaging cameras and calibrated moisture meters to detect moisture trapped inside walls and subfloor — areas that are wet even when surfaces appear dry.",
          },
          {
            question: 'Does insurance cover water damage in Gold Coast canal properties?',
            answer: "Canal properties face two distinct water risk types: storm water ingress (typically covered) and flooding from rising water bodies (requires specific flood cover, often excluded from standard policies). Check your PDS carefully. NRPG helps identify the correct peril category and ensure your claim is lodged in the most favourable way under your policy.",
          },
          {
            question: 'How much does water damage restoration cost on the Gold Coast?',
            answer: 'Water damage restoration on the Gold Coast ranges from $3,000 for a small burst pipe loss to $60,000 or more for combined flooding and structural damage. The Disaster Recovery platform charges a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin work. This covers emergency extraction and the first phase of structural drying.',
          },
        ]}
        relatedGuides={[
          { title: 'Ex-TC Alfred Recovery — Disputed and Underpaid Claims', href: '/events/ex-cyclone-alfred-recovery', description: 'If your Alfred claim is stuck or underpaid, NRPG can escalate at any stage.' },
          { title: 'Storm Damage Restoration Gold Coast', href: '/storm-damage-restoration-gold-coast', description: 'Emergency storm damage restoration across the Gold Coast.' },
          { title: 'Mould After Water Damage — What to Do in 48 Hours', href: '/services/mould-remediation', description: 'Prevent mould from taking hold after water damage in Queensland conditions.' },
          { title: 'Water Damage Restoration Cost Guide 2026', href: '/guides/cost-guides/how-much-water-damage-restoration-cost', description: 'Detailed cost breakdown for water damage restoration by category and scope.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
