import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Geelong | Westerly Fronts & Surf Coast 24/7',
  description: 'Emergency storm damage restoration across Geelong, the Bellarine Peninsula, and Surf Coast. IICRC-certified contractors for westerly wind damage, Corio industrial buildings, coastal storm events at Torquay and Barwon Heads. Lodge your claim 24/7.',
  keywords: 'storm damage restoration geelong, storm damage geelong, surf coast storm damage, bellarine peninsula storm damage, torquay storm damage, barwon heads storm damage, wind damage geelong, corio industrial storm damage, anglesea storm damage',
  openGraph: {
    title: 'Storm Damage Restoration Geelong | Westerly Fronts & Surf Coast 24/7',
    description: 'Emergency storm damage restoration across Geelong, the Bellarine Peninsula, and Surf Coast. IICRC-certified contractors for westerly wind damage, Corio industrial buildings, coastal storm events at Torquay and Barwon Heads. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Geelong')}&service=storm-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-geelong`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-geelong/#localbusiness`,
  name: `${NAP.name} Geelong`,
  url: `${NAP.url}/storm-damage-restoration-geelong`,
  description: '24/7 emergency storm damage restoration across Geelong, the Bellarine Peninsula, and Surf Coast. IICRC-certified contractor network for westerly wind events, Corio/Norlane industrial buildings, coastal storm damage at Torquay and Barwon Heads, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Geelong', containedInPlace: { '@type': 'State', name: 'Victoria' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Geelong', addressRegion: 'VIC', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Storm Damage Restoration Geelong',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Geelong', containedInPlace: { '@type': 'State', name: 'Victoria' } },
  serviceType: 'Storm Damage Restoration',
  description: 'Professional storm damage restoration across Geelong including emergency make-safe, industrial and commercial roof restoration in the Corio/Norlane precinct, coastal storm damage on the Bellarine Peninsula and Surf Coast, structural repairs, and full insurance documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why does Geelong get worse westerly wind damage than Melbourne?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Geelong sits at the western end of Port Phillip Bay, directly exposed to westerly weather fronts that approach from the Southern Ocean across the Otway Ranges and the open Bass Strait. Melbourne's position at the northern end of Port Phillip Bay provides significant sheltering from these westerly systems. Geelong does not have this shelter — westerly fronts can generate 80–100 km/h wind gusts across the Geelong LGA without the friction reduction that Melbourne's bay position provides. The 2010 Geelong and Surf Coast storm caused catastrophic wind damage across the Geelong LGA, with Barwon Heads and Torquay beachfront properties sustaining severe structural damage.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does storm damage insurance cover holiday homes on the Surf Coast at Torquay or Anglesea?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — storm damage is a standard insured peril under most Australian home and landlord insurance policies, including for holiday homes and investment properties. However, coastal properties at Torquay, Anglesea, Lorne, and Aireys Inlet face elevated storm risk from westerly ocean swell and direct coastal storm exposure. Some insurers apply coastal exposure loadings to premiums in these areas. Timber beach houses common along the Surf Coast can sustain significant roof and cladding damage in severe westerly events — ensure your sum insured reflects current replacement costs, as construction costs have increased significantly. Note that extended response times may apply for remote Surf Coast locations beyond Torquay.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can industrial buildings in Geelong\'s Corio and Norlane precinct be covered for storm damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — commercial and industrial property insurance policies generally cover storm damage including roof sheet failure, structural damage, and water ingress resulting from storm events. The Corio, Norlane, and North Geelong industrial precinct contains a significant number of large commercial buildings with ageing corrugated and flat roof sheeting that is particularly vulnerable to wind uplift in major westerly events. Storm claims for industrial buildings require detailed scope-of-works documentation covering structural assessment, roof replacement or repair, water ingress remediation, and any business interruption elements. NRPG's contractors have experience with large-scale commercial and industrial storm restoration and can provide documentation meeting insurer requirements for major commercial claims.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does storm damage restoration typically cost in Geelong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Storm damage restoration costs in Geelong vary by property type, damage extent, and location. Indicative ranges: standard residential structural damage (roof tiles, gutters, fencing, minor water ingress) $2,000–$12,000; major structural damage with significant water ingress requiring internal reconstruction $6,000–$30,000; industrial or large commercial buildings in the Corio/Norlane precinct with extensive roof damage $20,000–$80,000+. Surf Coast and Bellarine Peninsula properties may incur additional costs due to extended response times and the need for specialist coastal construction materials in exposed locations.",
      },
    },
  ],
};

export default function StormDamageRestorationGeelongPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="sdrgeelong-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrgeelong-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="sdrgeelong-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Geelong"
        subtitle="Emergency storm damage restoration across Geelong, the Bellarine Peninsula, and Surf Coast. IICRC-certified contractors for westerly wind events, Corio industrial buildings, and coastal storm damage at Torquay and Barwon Heads."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Geelong' },
        ]}
        sections={[
          {
            heading: "Geelong Storm Risk — Western Westerlies and Port Phillip Bay Exposure",
            body: (
              <>
                <p>
                  Geelong&apos;s position at the western end of Port Phillip Bay makes it one of Victoria&apos;s
                  most exposed cities to westerly weather fronts. Westerly systems approach from the Southern Ocean
                  across Bass Strait and the Otway Ranges, reaching Geelong with minimal shelter. Melbourne, by
                  contrast, sits at the northern end of Port Phillip Bay and is substantially sheltered from direct
                  westerly exposure. The result is that Geelong regularly experiences 80&ndash;100 km/h wind gusts
                  in major frontal systems that cause only moderate wind damage further north.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The 2010 Geelong and Surf Coast storm caused catastrophic wind damage across the Geelong LGA.
                  Barwon Heads and Torquay beachfront properties sustained severe structural damage, and the Corio
                  and Norlane industrial precinct experienced widespread roof sheet failure in buildings with
                  ageing corrugated roofing. Geelong&apos;s industrial heritage means the city has a large stock
                  of commercial buildings with flat or low-pitch roofing that is particularly vulnerable to wind
                  uplift forces generated by major westerly fronts.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG contractors operate across Greater Geelong, the Bellarine Peninsula, and Surf Coast with
                  24-hour emergency response capability. Extended response times apply to remote Surf Coast
                  locations beyond Anglesea.
                </p>
              </>
            ),
          },
          {
            heading: 'Surf Coast and Bellarine Peninsula Storm Damage',
            body: (
              <>
                <p>
                  The Surf Coast &mdash; Torquay, Jan Juc, Anglesea, Lorne, and Aireys Inlet &mdash; faces
                  extreme westerly storm exposure from direct ocean swell and coastal wind events. Timber beach
                  houses and holiday homes that characterise this coastline are exposed to the full force of
                  westerly fronts without the structural protection of modern construction. Beachfront and
                  near-coastal properties at Torquay and Barwon Heads have a documented history of significant
                  storm structural damage in major westerly events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Bellarine Peninsula &mdash; Ocean Grove, Barwon Heads, Portarlington, Clifton Springs, and
                  Leopold &mdash; faces coastal wind exposure from both the south (Bass Strait) and the east
                  (Port Phillip Bay), making it vulnerable to wind damage from multiple storm directions. Coastal
                  storm surge is a secondary risk for low-lying beachfront properties at Ocean Grove and
                  Barwon Heads during severe southerly events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Storm damage restoration costs for Surf Coast and Bellarine properties range from
                  $2,000&ndash;$12,000 for standard structural damage to $6,000&ndash;$30,000+ for major
                  structural damage with significant water ingress. Coastal construction materials and
                  extended response logistics can increase costs for remote Surf Coast locations.
                </p>
              </>
            ),
          },
          {
            heading: 'Geelong Suburbs We Cover',
            body: (
              <>
                <p>Emergency storm damage response across Greater Geelong, Bellarine Peninsula, and Surf Coast:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Geelong Metro:</strong> Geelong CBD, Newtown, South Geelong, Belmont, Highton,
                  Hamlyn Heights
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Industrial Precinct:</strong> Corio, Norlane, North Geelong, Lara
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Bellarine Peninsula:</strong> Leopold, Ocean Grove, Barwon Heads, Clifton Springs,
                  Portarlington, Drysdale
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Surf Coast:</strong> Torquay, Jan Juc, Anglesea, Aireys Inlet, Lorne (extended
                  response time beyond Anglesea)
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Surf Coast Hinterland:</strong> Winchelsea, Bannockburn, Lethbridge
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Why does Geelong get worse westerly wind damage than Melbourne?',
            answer: "Geelong sits at the western end of Port Phillip Bay, directly exposed to westerly weather fronts that approach from the Southern Ocean across the Otway Ranges and the open Bass Strait. Melbourne's position at the northern end of Port Phillip Bay provides significant sheltering from these westerly systems. Geelong does not have this shelter — westerly fronts can generate 80–100 km/h wind gusts across the Geelong LGA without the friction reduction that Melbourne's bay position provides. The 2010 Geelong and Surf Coast storm caused catastrophic wind damage across the Geelong LGA, with Barwon Heads and Torquay beachfront properties sustaining severe structural damage.",
          },
          {
            question: 'Does storm damage insurance cover holiday homes on the Surf Coast at Torquay or Anglesea?',
            answer: "Yes — storm damage is a standard insured peril under most Australian home and landlord insurance policies, including for holiday homes and investment properties. However, coastal properties at Torquay, Anglesea, Lorne, and Aireys Inlet face elevated storm risk from westerly ocean swell and direct coastal storm exposure. Some insurers apply coastal exposure loadings to premiums in these areas. Timber beach houses common along the Surf Coast can sustain significant roof and cladding damage in severe westerly events — ensure your sum insured reflects current replacement costs, as construction costs have increased significantly. Note that extended response times may apply for remote Surf Coast locations beyond Torquay.",
          },
          {
            question: "Can industrial buildings in Geelong's Corio and Norlane precinct be covered for storm damage?",
            answer: "Yes — commercial and industrial property insurance policies generally cover storm damage including roof sheet failure, structural damage, and water ingress resulting from storm events. The Corio, Norlane, and North Geelong industrial precinct contains a significant number of large commercial buildings with ageing corrugated and flat roof sheeting that is particularly vulnerable to wind uplift in major westerly events. Storm claims for industrial buildings require detailed scope-of-works documentation covering structural assessment, roof replacement or repair, water ingress remediation, and any business interruption elements. NRPG's contractors have experience with large-scale commercial and industrial storm restoration and can provide documentation meeting insurer requirements for major commercial claims.",
          },
          {
            question: 'What does storm damage restoration typically cost in Geelong?',
            answer: "Storm damage restoration costs in Geelong vary by property type, damage extent, and location. Indicative ranges: standard residential structural damage (roof tiles, gutters, fencing, minor water ingress) $2,000–$12,000; major structural damage with significant water ingress requiring internal reconstruction $6,000–$30,000; industrial or large commercial buildings in the Corio/Norlane precinct with extensive roof damage $20,000–$80,000+. Surf Coast and Bellarine Peninsula properties may incur additional costs due to extended response times and the need for specialist coastal construction materials in exposed locations.",
          },
        ]}
        relatedGuides={[
          { title: 'Storm Damage Restoration Melbourne', href: '/storm-damage-restoration-melbourne', description: 'IICRC-certified storm damage restoration across Melbourne and Victoria.' },
          { title: 'Water Damage Restoration Melbourne', href: '/water-damage-restoration-melbourne', description: 'Emergency water damage restoration across Melbourne.' },
          { title: 'Flood Damage Restoration Melbourne', href: '/flood-damage-restoration-melbourne', description: 'IICRC Category 3 flood damage restoration across Melbourne.' },
          { title: 'Storm Damage Restoration Wollongong', href: '/storm-damage-restoration-wollongong', description: 'Coastal storm damage restoration across Wollongong and Illawarra.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
