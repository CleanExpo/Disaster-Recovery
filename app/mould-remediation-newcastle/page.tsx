import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * Mould Remediation Newcastle
 *
 * Created: 9 April 2026
 * Context: Post-2021 Hunter River/Williams River flood mould surge — thousands of
 * properties affected by secondary mould. Heritage terrace construction in inner
 * suburbs (lime plaster, brick cavities) retains moisture for months. Industrial
 * building stock in Mayfield/Carrington adds commercial scope. Lake Macquarie
 * coastal humidity drives endemic mould in beach houses.
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Newcastle | IICRC S520 Certified Emergency',
  description:
    'Professional mould remediation across Newcastle and the Hunter Valley. IICRC S520-certified contractors for post-2021 flood mould, heritage terrace mould, and coastal humidity remediation. 48-hour response.',
  keywords:
    'mould remediation newcastle, mould removal newcastle, black mould newcastle, mould after flooding newcastle, hunter valley mould, mould inspection newcastle NSW',
  openGraph: {
    title: 'Mould Remediation Newcastle | IICRC S520 Certified Emergency',
    description:
      'Professional mould remediation across Newcastle and the Hunter Valley. IICRC S520-certified contractors for post-2021 flood mould, heritage terrace mould, and coastal humidity remediation.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Mould+Remediation&city=Newcastle&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-newcastle`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-newcastle/#localbusiness`,
  name: `${NAP.name} Newcastle`,
  url: `${NAP.url}/mould-remediation-newcastle`,
  description:
    'IICRC S520-certified mould remediation contractors serving Newcastle, the Hunter Valley, and Lake Macquarie. Post-2021 flood mould specialists. Heritage terrace cavity mould, industrial building remediation, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Newcastle',
    containedInPlace: { '@type': 'State', name: 'New South Wales' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Newcastle',
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
  name: 'Mould Remediation Newcastle',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Newcastle' },
  serviceType: 'Mould Remediation',
  description:
    'Professional mould remediation across Newcastle and the Hunter Valley to IICRC S520 standard. Physical containment, HEPA filtration, antimicrobial treatment, removal of contaminated materials, and post-clearance air sampling.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is my 2021 flood mould covered by home insurance in Newcastle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould that is a direct result of the 2021 Hunter River and Williams River flooding is covered under flood insurance policies where flood cover was included. The key issue is proving causation — you need IICRC-certified documentation showing the mould is a direct consequence of the flood event, not pre-existing or maintenance-related. If your insurer has denied or underpaid, AFCA dispute lodgement is available.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is mould so persistent in Newcastle heritage terrace homes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Heritage terrace homes in Cooks Hill, Hamilton, and Islington use lime plaster over solid brick or cavity brick construction. These materials are highly absorptive — they draw in moisture during a water event and release it very slowly, often over weeks or months. Mould establishes in the wall cavity and behind plaster long after the visible surface appears dry. Standard surface cleaning does not resolve cavity mould — it requires opening walls, physical removal of contaminated material, and IICRC S520-compliant remediation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does mould remediation cost in Newcastle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould remediation costs in Newcastle range from $1,500–$8,000 for Category 1 surface mould in a single area; $4,000–$20,000 for structural mould in wall cavities requiring opening; and $10,000–$50,000+ for whole-house post-flood remediation. Heritage terrace properties typically sit at the higher end due to lime plaster removal and brick wall treatment. All scopes include IICRC S520 documentation for insurance purposes.',
      },
    },
  ],
};

export default function MouldRemediationNewcastlePage() {
  return (
    <>
      <Script
        id="mrnewc-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrnewc-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrnewc-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Newcastle"
        subtitle="IICRC S520-certified mould remediation across Newcastle, the Hunter Valley, and Lake Macquarie. Post-2021 flood mould specialists. Heritage terrace cavity mould and coastal humidity remediation. 48-hour response."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Newcastle' },
        ]}
        sections={[
          {
            heading: 'Post-2021 Flood Mould in the Hunter Valley',
            body: (
              <>
                <p>
                  The 2021 Hunter Valley floods — driven by record Hunter River and Williams River inundation —
                  affected thousands of properties across Newcastle, Maitland, East Maitland, and Cessnock. Many
                  properties received initial drying treatment in the weeks following the flood events but were not
                  fully remediated to IICRC S500 and S520 standards. The result: secondary mould growth in wall
                  cavities, subfloor spaces, and ceiling voids that became visible weeks or months after apparent
                  drying.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Post-flood mould in the Hunter Valley is particularly challenging because the flood water was
                  Category 3 — containing sediment, organics, and contaminants from river floodplains. Category 3
                  mould grows faster and penetrates deeper into porous building materials than mould from clean water
                  events. Properties in Maitland, East Maitland, and riverside Newcastle suburbs that have not had
                  professional post-flood assessment since 2021 may have undetected active mould colonies in wall
                  cavities and subfloor spaces.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Industrial areas in Mayfield and Carrington — home to large commercial and warehouse buildings with
                  inadequate ventilation — present a distinct risk category. Post-flood mould in commercial building
                  stock is typically more extensive due to larger unventilated areas, concrete slab floors with
                  retained moisture, and limited access for drying equipment.
                </p>
              </>
            ),
          },
          {
            heading: 'Mould in Newcastle&apos;s Heritage Stock',
            body: (
              <>
                <p>
                  Newcastle&apos;s inner suburbs — Cooks Hill, Hamilton, Islington, Georgetown, and Tighes Hill —
                  contain a high concentration of heritage terrace homes and Federation-era cottages. These properties
                  share construction characteristics that make mould management significantly more complex than modern
                  buildings:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Lime plaster over brick:</strong> Lime plaster is highly porous and absorbs moisture
                    readily. Once saturated, it dries slowly — often over 6–12 weeks — providing a prolonged mould
                    growth environment. Mould can establish behind plaster surfaces that feel dry to the touch.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Cavity brick walls:</strong> The air gap in cavity brick construction can fill with
                    water during flood events and act as a moisture reservoir for months. Mould within cavities is
                    not detectable by surface inspection and requires thermal imaging or moisture mapping to locate.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Subfloor spaces:</strong> Many heritage terrace homes have elevated timber subfloor
                    construction. Flooding in 2021 inundated these spaces with Category 3 water. Subfloor mould
                    in poorly ventilated crawl spaces is among the most difficult remediation scenarios and one
                    of the most common post-2021 issues across the inner Newcastle suburbs.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Lake Macquarie coastal suburbs — Belmont, Swansea, Charlestown, and Warners Bay — face a
                  separate but related challenge: endemic ambient humidity from the lake and ocean proximity.
                  Beach houses and properties without adequate cross-ventilation develop chronic surface mould,
                  particularly in bathrooms, laundries, and wardrobes facing south or south-east aspects.
                </p>
              </>
            ),
          },
          {
            heading: 'Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  48-hour response across Newcastle, the Hunter Valley, and Lake Macquarie:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner Heritage:</strong> Hamilton, Islington, Cooks Hill, Georgetown, Tighes Hill
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Industrial and Port Suburbs:</strong> Mayfield, Carrington, Stockton, Wickham, Waratah
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Coastal Newcastle:</strong> Merewether, Bar Beach, Adamstown, New Lambton, Kotara
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hunter Valley:</strong> Maitland, East Maitland, Cessnock, Kurri Kurri, Singleton
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Lake Macquarie:</strong> Charlestown, Warners Bay, Belmont, Swansea, Cardiff, Glendale
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge your claim at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate contractor
                  matching across any Newcastle or Hunter Valley suburb.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is my 2021 flood mould covered by home insurance in Newcastle?',
            answer:
              'Mould that is a direct result of the 2021 Hunter River and Williams River flooding is covered under flood insurance policies where flood cover was included. The key issue is proving causation — you need IICRC-certified documentation showing the mould is a direct consequence of the flood event, not pre-existing or maintenance-related. If your insurer has denied or underpaid, AFCA dispute lodgement is available.',
          },
          {
            question: 'Why is mould so persistent in Newcastle heritage terrace homes?',
            answer:
              'Heritage terrace homes in Cooks Hill, Hamilton, and Islington use lime plaster over solid brick or cavity brick construction. These materials are highly absorptive — they draw in moisture during a water event and release it very slowly, often over weeks or months. Mould establishes in the wall cavity and behind plaster long after the visible surface appears dry. Standard surface cleaning does not resolve cavity mould — it requires opening walls, physical removal of contaminated material, and IICRC S520-compliant remediation.',
          },
          {
            question: 'How much does mould remediation cost in Newcastle?',
            answer:
              'Mould remediation costs in Newcastle range from $1,500–$8,000 for Category 1 surface mould in a single area; $4,000–$20,000 for structural mould in wall cavities requiring opening; and $10,000–$50,000+ for whole-house post-flood remediation. Heritage terrace properties typically sit at the higher end due to lime plaster removal and brick wall treatment. All scopes include IICRC S520 documentation for insurance purposes.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Newcastle',
            href: '/water-damage-restoration-newcastle',
            description: 'Emergency water damage restoration across Newcastle and the Hunter Valley.',
          },
          {
            title: 'Flood Damage Restoration Newcastle',
            href: '/flood-damage-restoration-newcastle',
            description: 'Flood damage restoration and post-flood remediation for the Hunter Valley.',
          },
          {
            title: 'Storm Damage Restoration Newcastle',
            href: '/storm-damage-restoration-newcastle',
            description: 'Storm damage restoration and insurance claim support for Newcastle.',
          },
          {
            title: 'Mould Remediation Sydney',
            href: '/mould-remediation-sydney',
            description: 'IICRC S520-certified mould remediation across all Sydney suburbs.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
