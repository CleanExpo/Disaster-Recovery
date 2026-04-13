import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-481: Flood Damage Restoration Sydney
 *
 * Created: 9 April 2026
 * Context: Sydney's Hawkesbury-Nepean Valley is the highest-frequency flood
 * risk area in NSW. The 2022 Hawkesbury floods evacuated 85,000+ residents
 * and generated AU$5.5 billion in insured losses. Western Sydney — Penrith,
 * Windsor, Hawkesbury LGAs — faces ongoing repeat flood events. Category 3
 * remediation and flood vs storm peril distinction are the key issues.
 */

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Sydney | IICRC Category 3 Emergency',
  description:
    'Professional flood damage restoration across Sydney. IICRC-certified Category 3 specialists for Hawkesbury River flooding, overland flow, and storm surge. Lodge your claim 24/7.',
  keywords:
    'flood damage restoration sydney, flood damage sydney, hawkesbury river flooding damage, parramatta river flood sydney, category 3 water damage sydney, flood cleanup sydney NSW',
  openGraph: {
    title: 'Flood Damage Restoration Sydney | IICRC Category 3 Emergency',
    description:
      'Professional flood damage restoration across Sydney. IICRC-certified Category 3 specialists for Hawkesbury River flooding, overland flow, and storm surge. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Flood+Damage+Restoration&city=Sydney&service=flood-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-sydney`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-sydney/#localbusiness`,
  name: `${NAP.name} Sydney`,
  url: `${NAP.url}/flood-damage-restoration-sydney`,
  description:
    'IICRC-certified Category 3 flood damage restoration contractors serving all Sydney suburbs. Hawkesbury River, Parramatta River, and Georges River flooding specialists. Full decontamination, structural drying, and insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Sydney',
    containedInPlace: { '@type': 'State', name: 'New South Wales' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    addressCountry: 'AU',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Flood Damage Restoration Sydney',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Sydney' },
  serviceType: 'Flood Damage Restoration',
  description:
    'Professional flood damage restoration across Sydney. Category 3 inundation specialists: emergency extraction, full decontamination, HEPA containment, structural drying, and post-remediation clearance testing. Hawkesbury-Nepean and western Sydney specialists.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Hawkesbury River flooding covered by standard Sydney home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'External flood inundation from the Hawkesbury River requires a specific flood extension in most standard policies. Without this, river flooding claims may be declined. NRPG helps categorise damage correctly and documents both flood and storm components for maximum claim outcome.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes western Sydney flood damage different from inner-city water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Western Sydney flood events involve Category 3 river water with higher contamination levels and longer inundation periods than typical urban storm damage. Clay-heavy soils in the Hawkesbury-Nepean region also create higher subfloor moisture retention \u2014 requiring longer drying periods and more intensive equipment.',
      },
    },
    {
      '@type': 'Question',
      name: 'My Sydney flood claim was declined because I don\u2019t have flood cover \u2014 what can I do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your property had storm water ingress (covered) as well as flood inundation (declined), the storm component may still be claimable. NRPG performs an independent scope assessment to delineate storm vs flood components and provides documentation for supplementary claim lodgement.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does flood restoration take in western Sydney?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency extraction: 24-48 hours. Category 3 decontamination and material removal: 3-7 days. Structural drying: 7-21 days (extended due to clay soils and high moisture retention). Reconstruction: 6-16 weeks for moderate losses.',
      },
    },
  ],
};

export default function FloodDamageRestorationSydneyPage() {
  return (
    <>
      <Script
        id="fdsyd-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdsyd-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdsyd-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="Flood Damage Restoration Sydney"
        subtitle="IICRC-certified Category 3 flood damage restoration across Sydney. Hawkesbury River, Parramatta River, and overland flow specialists. priority response. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0F2942 0%, #01579B 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Sydney Flood' },
        ]}
        sections={[
          {
            heading: "Sydney's Flood-Prone Landscape",
            body: (
              <>
                <p>
                  Sydney&apos;s geography creates complex flood risk across multiple catchment systems.
                  The Hawkesbury-Nepean Valley in western Sydney has experienced catastrophic flooding
                  in 2019, 2021, and 2022 &mdash; the 2022 flooding forced the evacuation of over
                  85,000 residents. The Parramatta River and its tributaries affect properties across
                  Parramatta, Merrylands, and Granville.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Georges River corridor (Liverpool, Moorebank, Chipping Norton) regularly floods
                  during intense rainfall events. Greater Western Sydney &mdash; particularly the
                  Penrith, Windsor, and Hawkesbury LGAs &mdash; bears the highest frequency flood risk
                  of any NSW metropolitan area.
                </p>
              </>
            ),
          },
          {
            heading: 'Category 3 Flood Remediation — Sydney Standard',
            body: (
              <>
                <p>
                  Floodwater from rivers and overland flow is Category 3 water &mdash; it contains
                  sewage contamination, chemical runoff, and biological hazards. Category 3 remediation
                  requires:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Removal of all porous materials in the flood zone (plasterboard, insulation, carpet,
                    soft furnishings)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>HEPA containment and air scrubbing</li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Antimicrobial decontamination of all structural surfaces
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Subfloor treatment (western Sydney&apos;s clay-heavy soils create extended moisture
                    retention requiring more intensive drying than coastal properties)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>Post-remediation clearance testing</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Sydney insurers require IICRC S500:2025 and S520 documentation for Category 3 claim
                  sign-off. Non-certified work cannot produce the documentation required for claim
                  settlement.
                </p>
              </>
            ),
          },
          {
            heading: 'Flood vs Storm Damage — NSW Insurance Implications',
            body: (
              <>
                <p>
                  The peril classification of your damage determines which insurance provisions apply.
                  Under the ICA flood definition, river inundation and overland flow from an external
                  water body = flood (requires specific flood extension in most standard policies).
                  Storm water entering through a breached roof, window, or wall = storm or water
                  ingress (covered under standard storm provisions).
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The 2022 Hawkesbury floods generated AU$5.5 billion in insured losses, with a
                  significant proportion of claims involving both storm and flood components. Many
                  properties sustained storm water ingress from rainfall as well as river inundation
                  &mdash; each component requires separate lodgement. NRPG&apos;s IICRC-certified
                  scope assessment clearly delineates flood vs storm components. If your flood claim
                  has been declined, AFCA dispute rights apply and NRPG documentation can support
                  escalation.
                </p>
              </>
            ),
          },
          {
            heading: 'Sydney Flood-Prone Suburbs — Areas We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  priority emergency response for Category 3 extraction across greater Sydney:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western Sydney (highest risk):</strong> Windsor, Richmond, Pitt Town,
                  Wilberforce, Penrith, Emu Plains, Warragamba, Wallacia
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Parramatta Corridor:</strong> Parramatta, Merrylands, Granville, Auburn,
                  Guildford, Woodville
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Georges River:</strong> Liverpool, Moorebank, Chipping Norton, Warwick Farm,
                  Casula
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner West (creek flooding):</strong> Leichhardt, Croydon, Strathfield
                  (Powells Creek), Marrickville
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>General metro coverage:</strong> All Sydney LGAs &mdash; priority response
                  for Category 3 extraction
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Hawkesbury River flooding covered by standard Sydney home insurance?',
            answer:
              'External flood inundation from the Hawkesbury River requires a specific flood extension in most standard policies. Without this, river flooding claims may be declined. NRPG helps categorise damage correctly and documents both flood and storm components for maximum claim outcome.',
          },
          {
            question:
              'What makes western Sydney flood damage different from inner-city water damage?',
            answer:
              "Western Sydney flood events involve Category 3 river water with higher contamination levels and longer inundation periods than typical urban storm damage. Clay-heavy soils in the Hawkesbury-Nepean region also create higher subfloor moisture retention — requiring longer drying periods and more intensive equipment.",
          },
          {
            question:
              "My Sydney flood claim was declined because I don't have flood cover — what can I do?",
            answer:
              'If your property had storm water ingress (covered) as well as flood inundation (declined), the storm component may still be claimable. NRPG performs an independent scope assessment to delineate storm vs flood components and provides documentation for supplementary claim lodgement.',
          },
          {
            question: 'How long does flood restoration take in western Sydney?',
            answer:
              'Emergency extraction: 24-48 hours. Category 3 decontamination and material removal: 3-7 days. Structural drying: 7-21 days (extended due to clay soils and high moisture retention). Reconstruction: 6-16 weeks for moderate losses.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Sydney',
            href: '/water-damage-restoration-sydney',
            description: 'Emergency water damage restoration across all Sydney suburbs.',
          },
          {
            title: 'Storm Damage Restoration Sydney',
            href: '/storm-damage-restoration-sydney',
            description: 'Storm damage restoration and insurance claim support for Sydney.',
          },
          {
            title: 'Mould Remediation Sydney',
            href: '/mould-remediation-sydney',
            description: 'Post-flood mould remediation across all Sydney suburbs.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
