import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-479: Flood Damage Restoration Melbourne
 *
 * Created: 9 April 2026
 * Context: Separate from water-damage-restoration-melbourne. Flood damage = external
 * water bodies (Maribyrnong River, Yarra River, Merri Creek, overland flow). Targets
 * properties that had inundation, not just water ingress. 2022 La Niña events caused
 * the worst Maribyrnong River flooding since 1974, with Victorian insured losses
 * exceeding AU$2.5 billion. Melbourne's Victorian-era housing stock and combined
 * sewer/stormwater infrastructure create elevated Category 3 contamination risk.
 */

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Melbourne | IICRC Category 3 Specialists',
  description:
    'Professional flood damage restoration across Melbourne. IICRC-certified Category 3 specialists for Maribyrnong River, Yarra River, and Merri Creek flooding. Lodge your claim 24/7.',
  keywords:
    'flood damage restoration melbourne, flood damage melbourne, maribyrnong river flooding damage, yarra river flood melbourne, category 3 water damage melbourne, 2022 flood melbourne, flood cleanup melbourne',
  openGraph: {
    title: 'Flood Damage Restoration Melbourne | IICRC Category 3 Specialists',
    description:
      'Professional flood damage restoration across Melbourne. IICRC-certified Category 3 specialists for Maribyrnong River, Yarra River, and Merri Creek flooding. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Flood+Damage+Restoration&city=Melbourne&service=flood-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-melbourne`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-melbourne/#localbusiness`,
  name: `${NAP.name} Melbourne`,
  url: `${NAP.url}/flood-damage-restoration-melbourne`,
  description:
    'IICRC-certified Category 3 flood damage restoration contractors serving all Melbourne suburbs. Maribyrnong River, Yarra River, and Merri Creek inundation specialists. Full decontamination, structural drying, heritage property restoration, and insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Melbourne',
    containedInPlace: { '@type': 'State', name: 'Victoria' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressRegion: 'VIC',
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
  name: 'Flood Damage Restoration Melbourne',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Melbourne' },
  serviceType: 'Flood Damage Restoration',
  description:
    'Professional flood damage restoration across Melbourne. Category 3 inundation specialists: emergency extraction, full decontamination, HEPA containment, structural drying, heritage building restoration, and post-remediation clearance testing.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is flood damage covered by Melbourne home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flood inundation from the Maribyrnong River, Yarra River, Merri Creek, or overland flow requires a specific flood extension in most standard Australian home insurance policies. Without this extension, flood inundation claims may be declined. Storm water ingress through breached building elements is covered under standard storm provisions regardless of flood extension. Correct peril classification at lodgement is critical — many Melbourne properties experience both storm water ingress and flood inundation simultaneously.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my Melbourne property has Category 3 contamination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Melbourne's aging combined sewer and stormwater infrastructure means that almost all external floodwater entering a property is classified as Category 3 — grossly contaminated water containing sewage, pathogens, and chemical runoff. If your home was inundated by river overflow, overland flow, or stormwater backup, assume Category 3 until testing confirms otherwise. An IICRC-certified contractor can conduct on-site assessment and post-remediation clearance testing.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can heritage buildings in Melbourne be restored after flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — but heritage properties require specialist restoration to comply with heritage overlay requirements. Many inner Melbourne properties in Fitzroy, Collingwood, Richmond, and Carlton have heritage overlays that restrict material substitution and demolition scope. NRPG works with heritage-experienced contractors who understand VHR (Victorian Heritage Register) and local council overlay requirements. Documentation for heritage variations is provided for insurer approval.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does flood damage restoration cost in Melbourne?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flood damage restoration costs in Melbourne vary by inundation depth, property type, and contamination level. Indicative ranges: minor subfloor or ground-level inundation $8,000–$25,000; full ground floor inundation $20,000–$80,000; heritage property or multi-storey inundation $50,000–$200,000+. Victorian-era properties with subfloor void spaces and brick cavity walls typically cost more to restore due to extended drying times and the need for specialist heritage materials.',
      },
    },
  ],
};

export default function FloodDamageRestorationMelbournePage() {
  return (
    <>
      <Script
        id="fdmelb-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdmelb-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdmelb-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="Flood Damage Restoration Melbourne"
        subtitle="IICRC-certified Category 3 flood damage restoration across Melbourne. Maribyrnong River, Yarra River, and Merri Creek inundation specialists. Heritage property restoration. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0F2942 0%, #01579B 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Melbourne Flood' },
        ]}
        sections={[
          {
            heading: "Melbourne's Flooding History — The 2022 La Niña Events",
            body: (
              <>
                <p>
                  The 2022 La Niña events caused the worst flooding Melbourne had experienced in decades. The
                  Maribyrnong River broke its banks in October 2022 — the worst flooding since 1974 — inundating
                  suburbs including Maribyrnong, Footscray, Sunshine, Kingsville, and Yarraville. Simultaneously,
                  the Yarra River flooding corridor impacted Abbotsford, Fairfield, Alphington, Ivanhoe, and
                  Heidelberg, while Merri Creek overflows affected Preston, Northcote, and Clifton Hill.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Victorian insured losses from the 2022 floods exceeded AU$2.5 billion, making it one of the
                  costliest natural disaster sequences in the state&apos;s history. Melbourne&apos;s Victorian-era
                  housing stock — predominantly pre-1940 terrace homes and brick construction — is not built to
                  modern flood resistance standards. Subfloor void spaces and brick cavity walls retain moisture
                  for weeks, making rapid professional intervention critical to prevent secondary mould and
                  structural damage.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Climate projections indicate Melbourne flash flooding is increasing in frequency and intensity.
                  Blocked drains were overwhelmed during the 2022 events, contributing to widespread overland flow
                  beyond mapped flood zones.
                </p>
              </>
            ),
          },
          {
            heading: "Category 3 Flood Damage — Melbourne's Combined Sewer Risk",
            body: (
              <>
                <p>
                  Melbourne&apos;s aging combined sewer and stormwater infrastructure significantly elevates the
                  contamination risk of flood events. When stormwater systems are overwhelmed, sewage contamination
                  enters the overland flow — classifying virtually all Melbourne floodwater as IICRC S500:2025
                  Category 3 (grossly contaminated water). Category 3 protocol requires:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Full personal protective equipment for all contractor access
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Removal and disposal of all porous materials in the flood zone (plasterboard, insulation,
                    carpet, soft furnishings, subfloor material)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>HEPA containment and air scrubbing</li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Antimicrobial decontamination of all structural surfaces
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Subfloor void and brick cavity decontamination where contaminated water penetrated
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>Post-remediation clearance testing</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Melbourne&apos;s inner city also presents a unique heritage challenge. Many properties in
                  Fitzroy, Collingwood, Richmond, and Carlton have heritage overlays under local council planning
                  schemes or the Victorian Heritage Register. These overlays restrict the materials and methods
                  that can be used in restoration. NRPG works with heritage-experienced contractors to ensure
                  remediation meets both IICRC S500:2025 Category 3 requirements and heritage compliance
                  obligations.
                </p>
              </>
            ),
          },
          {
            heading: 'Flood Damage Restoration Cost Estimates — Melbourne 2026',
            body: (
              <>
                <p>
                  Flood damage restoration costs in Melbourne depend on inundation depth, property type, age of
                  construction, and the presence of heritage overlays. The following are indicative ranges based on
                  typical Melbourne loss scenarios:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Minor subfloor or ground-level inundation:</strong> $8,000–$25,000. Typical for
                  properties where water entered through subfloor voids or ground-level entry points without
                  significant internal inundation depth.
                </p>
                <p style={{ marginTop: '0.75rem' }}>
                  <strong>Full ground floor inundation:</strong> $20,000–$80,000. Applies where all ground floor
                  rooms received measurable water depth. Includes full Category 3 decontamination, structural
                  drying, and internal reconstruction.
                </p>
                <p style={{ marginTop: '0.75rem' }}>
                  <strong>Heritage property or multi-storey inundation:</strong> $50,000–$200,000+. Heritage
                  overlays require specialist materials, heritage-compliant reconstruction methods, and additional
                  council documentation. Victorian-era brick cavity walls and subfloor systems add significant
                  drying and decontamination complexity.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Melbourne&apos;s pre-1940 housing stock typically falls at the upper end of cost ranges within
                  each category due to extended drying times in solid masonry and the unavailability of direct
                  replacement heritage materials. NRPG provides itemised scope-of-works documentation for insurer
                  lodgement and any required heritage variation approvals.
                </p>
              </>
            ),
          },
          {
            heading: 'Melbourne Flood-Prone Areas We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  60-minute emergency response for Category 3 emergency extraction and containment across all
                  Melbourne flood catchments:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Maribyrnong River corridor:</strong> Maribyrnong, Footscray, Sunshine, Kingsville,
                  Yarraville
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Yarra River flooding corridor:</strong> Abbotsford, Fairfield, Alphington, Ivanhoe,
                  Heidelberg
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Merri Creek catchment:</strong> Preston, Northcote, Clifton Hill
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Scotchman&apos;s Creek corridor:</strong> Chadstone, Clayton, Oakleigh
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Dandenong Creek corridor:</strong> Dandenong, Noble Park, Springvale
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner city heritage suburbs:</strong> Fitzroy, Collingwood, Richmond, Carlton
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>General coverage:</strong> All Melbourne metropolitan suburbs — full network available
                  for assessment and restoration
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is flood damage covered by Melbourne home insurance?',
            answer:
              'Flood inundation from the Maribyrnong River, Yarra River, Merri Creek, or overland flow requires a specific flood extension in most standard Australian home insurance policies. Without this extension, flood inundation claims may be declined. Storm water ingress through breached building elements is covered under standard storm provisions regardless of flood extension. Correct peril classification at lodgement is critical — many Melbourne properties experience both storm water ingress and flood inundation simultaneously.',
          },
          {
            question: 'How do I know if my Melbourne property has Category 3 contamination?',
            answer:
              "Melbourne's aging combined sewer and stormwater infrastructure means that almost all external floodwater entering a property is classified as Category 3 — grossly contaminated water containing sewage, pathogens, and chemical runoff. If your home was inundated by river overflow, overland flow, or stormwater backup, assume Category 3 until testing confirms otherwise. An IICRC-certified contractor can conduct on-site assessment and post-remediation clearance testing.",
          },
          {
            question: 'Can heritage buildings in Melbourne be restored after flooding?',
            answer:
              'Yes — but heritage properties require specialist restoration to comply with heritage overlay requirements. Many inner Melbourne properties in Fitzroy, Collingwood, Richmond, and Carlton have heritage overlays that restrict material substitution and demolition scope. NRPG works with heritage-experienced contractors who understand VHR (Victorian Heritage Register) and local council overlay requirements. Documentation for heritage variations is provided for insurer approval.',
          },
          {
            question: 'How much does flood damage restoration cost in Melbourne?',
            answer:
              'Flood damage restoration costs in Melbourne vary by inundation depth, property type, and contamination level. Indicative ranges: minor subfloor or ground-level inundation $8,000–$25,000; full ground floor inundation $20,000–$80,000; heritage property or multi-storey inundation $50,000–$200,000+. Victorian-era properties with subfloor void spaces and brick cavity walls typically cost more to restore due to extended drying times and the need for specialist heritage materials.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Melbourne',
            href: '/water-damage-restoration-melbourne',
            description: 'Emergency water damage restoration across all Melbourne suburbs.',
          },
          {
            title: 'Storm Damage Restoration Melbourne',
            href: '/storm-damage-restoration-melbourne',
            description: 'Storm damage restoration and insurance claim support for Melbourne.',
          },
          {
            title: 'Mould Remediation Melbourne',
            href: '/mould-remediation-melbourne',
            description: 'Post-flood mould remediation across all Melbourne suburbs.',
          },
          {
            title: 'Flood Damage Restoration Brisbane',
            href: '/flood-damage-restoration-brisbane',
            description: 'IICRC Category 3 flood damage restoration across Brisbane.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
