import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-478: Flood Damage Restoration Brisbane
 *
 * Created: 9 April 2026
 * Context: Separate from water-damage-restoration-brisbane. Flood damage = external
 * water bodies (Brisbane River, Kedron Brook, overland flow). Targets properties that
 * had inundation, not just water ingress. Very high Alfred relevance — Brisbane catchments
 * recorded significant flood levels during Ex-TC Alfred March 2026. PERILS confirmed
 * AU$1.877B final insured losses. Many Brisbane properties still dealing with incomplete
 * remediation or disputed flood vs storm damage classification.
 */

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Brisbane | IICRC Category 3 Specialists',
  description:
    'Professional flood damage restoration across Brisbane. IICRC-certified Category 3 specialists for river flooding, overland flow, and Ex-TC Alfred inundation. Lodge your claim 24/7.',
  keywords:
    'flood damage restoration brisbane, flood damage brisbane, brisbane river flooding damage, overland flow brisbane, category 3 water damage brisbane, alfred flood brisbane, flood cleanup brisbane',
  openGraph: {
    title: 'Flood Damage Restoration Brisbane | IICRC Category 3 Specialists',
    description:
      'Professional flood damage restoration across Brisbane. IICRC-certified Category 3 specialists for river flooding, overland flow, and Ex-TC Alfred inundation. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Flood+Damage+Restoration&city=Brisbane&service=flood-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-brisbane`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-brisbane/#localbusiness`,
  name: `${NAP.name} Brisbane`,
  url: `${NAP.url}/flood-damage-restoration-brisbane`,
  description:
    'IICRC-certified Category 3 flood damage restoration contractors serving all Brisbane suburbs. Brisbane River and overland flow inundation specialists. Full decontamination, structural drying, and insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Brisbane',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brisbane',
    addressRegion: 'QLD',
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
  name: 'Flood Damage Restoration Brisbane',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Brisbane' },
  serviceType: 'Flood Damage Restoration',
  description:
    'Professional flood damage restoration across Brisbane. Category 3 inundation specialists: emergency extraction, full decontamination, HEPA containment, structural drying, and post-remediation clearance testing.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Category 3 flood damage and why does it need special treatment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Category 3 is grossly contaminated water from external sources. It contains sewage, chemicals, and pathogens. All porous materials must be removed, not just dried. Standard drying without decontamination leaves contamination in place and allows mould and bacteria to persist.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Brisbane River flooding covered by standard home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flood inundation from the Brisbane River or creek overflows requires a specific flood extension in most standard Australian home insurance policies. Without this extension, flood inundation claims may be declined. Storm water ingress through breached building elements is covered under storm provisions regardless of flood extension. Correct peril classification at lodgement is critical.',
      },
    },
    {
      '@type': 'Question',
      name: 'My Alfred claim was lodged as storm damage, but I had river flooding. What do I do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your property had both storm water ingress (covered) and river or overland flooding (may require flood extension), the claim may have been lodged under the wrong peril for part of the damage. NRPG performs an independent scope assessment to identify each component, then provides documentation to support amendment or supplementary lodgement.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does Category 3 flood restoration take in Brisbane?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency extraction and containment: 24-48 hours. Category 3 decontamination and material removal: 3-7 days. Structural drying after decontamination: 5-14 days. Reconstruction: 4-12 weeks. Total: 6-16 weeks for a moderate Category 3 loss.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I stay in my Brisbane property during flood damage restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No — Category 3 flood events require mandatory temporary relocation for health and safety during remediation. If your property is flood-inundated, your insurer's ALE (Additional Living Expenses) benefit covers temporary accommodation — typically for 6-12 months for major restoration. Keep all accommodation receipts.",
      },
    },
  ],
};

export default function FloodDamageRestorationBrisbanePage() {
  return (
    <>
      <Script
        id="fdbne-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdbne-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdbne-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="Flood Damage Restoration Brisbane"
        subtitle="IICRC-certified Category 3 flood damage restoration across Brisbane. Brisbane River flooding, overland flow, and Ex-TC Alfred inundation specialists. 60-minute response. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0F2942 0%, #01579B 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Brisbane Flood' },
        ]}
        sections={[
          {
            heading: "Brisbane River Flooding — Australia's Most Flood-Experienced Capital",
            body: (
              <>
                <p>
                  Brisbane is the most flood-experienced capital city in Australia. The Brisbane River catchment
                  spans from the D&apos;Aguilar Range to Moreton Bay, and major flood events have occurred in 1974,
                  2011, 2022, and 2026 (Ex-TC Alfred). The 2011 Brisbane floods inundated 20,000 properties and
                  caused AU$2.38 billion in insured losses.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Ex-TC Alfred in March 2026 generated unprecedented SEQ rainfall, with Brisbane catchments
                  recording flood levels in multiple creek corridors. PERILS confirmed a final Alfred insured loss
                  of AU$1.877 billion. Many Brisbane properties affected by Alfred are still dealing with
                  incomplete remediation or disputed flood vs storm damage classification.
                </p>
              </>
            ),
          },
          {
            heading: "Category 3 Flood Water — Why It's Different",
            body: (
              <>
                <p>
                  Floodwater from rivers and overland flow is Category 3 water — it contains sewage contamination,
                  chemical runoff, agricultural waste, and biological hazards. Category 3 remediation requires:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Full personal protective equipment for contractor access
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Removal and disposal of all porous materials in the flood zone (plasterboard, insulation,
                    carpet, soft furnishings)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>HEPA containment and air scrubbing</li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Antimicrobial decontamination of all structural surfaces
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Subfloor and cavity decontamination where contaminated water penetrated
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>Post-remediation clearance testing</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Category 3 events that are improperly remediated (dried only, without decontamination) result in
                  persistent mould growth and potential ongoing health risk.
                </p>
              </>
            ),
          },
          {
            heading: 'Flood Damage vs Storm Damage — The Brisbane Insurance Distinction',
            body: (
              <>
                <p>
                  The peril classification of your damage determines which insurance provisions apply. Brisbane
                  River flooding, Kedron Brook overflow, and overland flow inundation = flood damage (requires
                  specific flood extension in most standard policies). Storm water entering through a breached
                  roof, window, or wall = storm or water ingress (covered under standard storm provisions).
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Many Alfred claims involve both — properties that sustained storm water ingress from wind-driven
                  rain AND experienced overland flow inundation. Lodge each component separately. NRPG&apos;s
                  IICRC-certified scope assessment clearly delineates flood vs storm components for insurer
                  lodgement.
                </p>
              </>
            ),
          },
          {
            heading: 'Brisbane Flood-Prone Suburbs — Areas We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  60-minute emergency response for Category 3 emergency extraction and containment:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Brisbane River floodplain:</strong> Rocklea, Moorooka, Yeronga, Fairfield, Annerley,
                  Oxley
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Ithaca Creek catchment:</strong> Rosalie, Paddington, Milton, Toowong
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Kedron Brook corridor:</strong> Kedron, Stafford, Lutwyche
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner City:</strong> Brisbane CBD, South Brisbane, West End, Fortitude Valley, New Farm
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>General coverage:</strong> All Brisbane suburbs — full network available for assessment
                  and restoration
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What is Category 3 flood damage and why does it need special treatment?',
            answer:
              'Category 3 is grossly contaminated water from external sources. It contains sewage, chemicals, and pathogens. All porous materials must be removed, not just dried. Standard drying without decontamination leaves contamination in place and allows mould and bacteria to persist.',
          },
          {
            question: 'Is Brisbane River flooding covered by standard home insurance?',
            answer:
              'Flood inundation from the Brisbane River or creek overflows requires a specific flood extension in most standard Australian home insurance policies. Without this extension, flood inundation claims may be declined. Storm water ingress through breached building elements is covered under storm provisions regardless of flood extension. Correct peril classification at lodgement is critical.',
          },
          {
            question: 'My Alfred claim was lodged as storm damage, but I had river flooding. What do I do?',
            answer:
              'If your property had both storm water ingress (covered) and river or overland flooding (may require flood extension), the claim may have been lodged under the wrong peril for part of the damage. NRPG performs an independent scope assessment to identify each component, then provides documentation to support amendment or supplementary lodgement.',
          },
          {
            question: 'How long does Category 3 flood restoration take in Brisbane?',
            answer:
              'Emergency extraction and containment: 24-48 hours. Category 3 decontamination and material removal: 3-7 days. Structural drying after decontamination: 5-14 days. Reconstruction: 4-12 weeks. Total: 6-16 weeks for a moderate Category 3 loss.',
          },
          {
            question: 'Can I stay in my Brisbane property during flood damage restoration?',
            answer:
              "No — Category 3 flood events require mandatory temporary relocation for health and safety during remediation. If your property is flood-inundated, your insurer's ALE (Additional Living Expenses) benefit covers temporary accommodation — typically for 6-12 months for major restoration. Keep all accommodation receipts.",
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Brisbane',
            href: '/water-damage-restoration-brisbane',
            description: 'Emergency water damage restoration across all Brisbane suburbs.',
          },
          {
            title: 'Storm Damage Restoration Brisbane',
            href: '/storm-damage-restoration-brisbane',
            description: 'Storm damage restoration and insurance claim support for Brisbane.',
          },
          {
            title: 'Ex-TC Alfred Recovery',
            href: '/events/ex-cyclone-alfred-recovery',
            description: 'If your Alfred claim is stuck or underpaid, NRPG can escalate.',
          },
          {
            title: 'Mould Remediation Brisbane',
            href: '/mould-remediation-brisbane',
            description: 'Post-flood mould remediation across all Brisbane suburbs.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
