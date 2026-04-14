import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-601: IICRC S500:2025 Water Damage Restoration — Policyholder Guide
 *
 * Framing: "What to Expect from a Certified Contractor"
 * Do NOT reproduce the IICRC S500 standard itself.
 * Cover: what S500 means for your claim, moisture measurement, drying protocols,
 * documentation expectations.
 *
 * ACL s18 compliant — no guarantee language, no first-person business language.
 */

export const metadata: Metadata = {
  title: 'IICRC S500:2025 Water Damage Restoration — What It Means for Your Claim',
  description:
    'IICRC S500:2025 is the industry standard for water damage restoration. This guide explains what certified contractors must document, how moisture measurement works, what proper drying involves, and how S500 methodology supports disputed and supplementary insurance claims in Australia.',
  keywords:
    'IICRC S500 water damage, S500 2025 standard, water damage restoration Australia, moisture measurement insurance claim, structural drying protocol, water damage claim documentation, IICRC certified contractor water damage',
  openGraph: {
    title: 'IICRC S500:2025 Water Damage Restoration — What It Means for Your Claim',
    description:
      'IICRC S500:2025 water damage restoration standard explained for policyholders. Moisture measurement, drying protocols, and documentation that supports insurance claims and AFCA escalations.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('IICRC S500 Water Damage Guide')}&city=${encodeURIComponent('Australia')}&service=water-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/standards/iicrc-s500-water-damage`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is IICRC S500:2025?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC S500:2025 is the current edition of the Standard for Professional Water Damage Restoration, published by the Institute of Inspection, Cleaning and Restoration Certification. It defines the technical requirements that certified contractors must meet when assessing and restoring water-damaged property, including moisture measurement protocols, drying standards, and documentation requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does my insurer have to accept IICRC S500 documentation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Insurers are not legally required to accept any specific methodology, but IICRC S500 is the industry benchmark referenced by the Insurance Council of Australia and AFCA in assessing whether a restoration scope is reasonable. AFCA adjudicators consider S500-compliant independent assessments when reviewing disputed claim decisions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What moisture readings should be taken under S500 methodology?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Certified contractors performing S500-compliant assessments take moisture content readings of structural materials (timber framing, flooring, plasterboard) using calibrated moisture meters, supplemented by thermal imaging to identify moisture in concealed spaces. Readings are compared against established dry standard values for each material class to determine the extent and depth of water migration.',
      },
    },
    {
      '@type': 'Question',
      name: 'My insurer said the property is dry. What does that actually mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '"Dry" under S500 methodology means that measured moisture content in all affected structural materials has returned to established dry standard values for the specific material and climate conditions. If your insurer\u2019s assessor declared the property dry without taking calibrated moisture readings across all affected materials, that declaration may not reflect S500 methodology. An independent certified assessment will document current moisture conditions.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: NAP.url },
    { '@type': 'ListItem', position: 2, name: 'Standards', item: `${NAP.url}/standards` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'IICRC S500 Water Damage',
      item: `${NAP.url}/standards/iicrc-s500-water-damage`,
    },
  ],
};

export default function IICRCS500Page() {
  return (
    <>
      <Script
        id="s500-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="s500-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AgGuidePageTemplate
        category="IICRC Standards"
        title="IICRC S500:2025 Water Damage Restoration — What It Means for Your Claim"
        subtitle="IICRC S500:2025 is the industry standard for water damage restoration. This guide explains what certified contractors must document, how moisture measurement works, and how S500 methodology supports insurance claims and AFCA escalations in Australia."
        gradient="linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-14"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Standards', href: '/standards' },
          { label: 'IICRC S500 Water Damage' },
        ]}
        sections={[
          {
            heading: 'What Is IICRC S500:2025?',
            body: (
              <>
                <p>
                  The IICRC S500 Standard for Professional Water Damage Restoration is the benchmark
                  document governing how certified restoration contractors must assess, document, and
                  restore water-damaged property. The 2025 edition is the current published version.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  S500 is not a regulatory requirement in Australia, but it is the industry reference
                  standard. The Insurance Council of Australia and AFCA (Australian Financial Complaints
                  Authority) treat S500-compliant methodology as the benchmark for assessing whether a
                  restoration scope is technically reasonable.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  When a certified contractor performs an S500-compliant assessment of your water-damaged
                  property, the output is a documented scope that reflects the technical standards your
                  insurer's own assessors are expected to apply. An independent S500-compliant assessment
                  is the primary tool for challenging an inadequate insurer scope.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>IICRC official information:</strong>{' '}
                  <a
                    href="https://www.iicrc.org/standards"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    iicrc.org/standards
                  </a>
                </p>
              </>
            ),
          },
          {
            heading: 'How Moisture Measurement Works Under S500',
            body: (
              <>
                <p>
                  Accurate moisture measurement is the foundation of any S500-compliant water damage
                  assessment. A certified contractor will use a combination of techniques to identify and
                  quantify moisture in affected materials:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Penetrating moisture meters</strong> — measure moisture content in solid materials
                    such as timber framing, plywood, particleboard, and concrete slabs. Readings are
                    compared against published dry standard values for each material class. A reading
                    above the dry standard for a given material indicates active moisture that requires
                    drying.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Non-penetrating (radio frequency) meters</strong> — detect moisture behind
                    surfaces without creating holes. Used to identify moisture in wall cavities and behind
                    plasterboard before destructive investigation.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Thermal imaging (infrared)</strong> — identifies evaporative cooling patterns
                    that indicate moisture in concealed spaces. Thermal imaging does not measure moisture
                    directly but guides targeted probe measurements.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Temperature and relative humidity logging</strong> — ambient conditions affect
                    drying rates and must be recorded throughout the drying process to validate that
                    equipment settings are achieving drying.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Moisture readings must be taken at multiple points in each affected room, not just in
                  visible damage areas. Water migrates laterally and vertically through building materials —
                  a single room inspection will miss moisture that has travelled beyond the visible damage
                  zone.
                </p>
              </>
            ),
          },
          {
            heading: 'What Proper Structural Drying Involves',
            body: (
              <>
                <p>
                  S500-compliant structural drying is a documented process, not simply placing dehumidifiers
                  in a room. The contractor must:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Calculate equipment requirements</strong> based on the affected area, materials
                    affected, ambient conditions, and moisture readings. Equipment sizing is determined by
                    calculation, not estimation.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Create airflow conditions</strong> that maximise evaporation from affected
                    materials. This involves positioning of air movers and dehumidifiers in specific
                    patterns based on room geometry and material type.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Monitor daily</strong> — moisture readings must be recorded at each visit,
                    logged with date and time, and compared to the previous reading to confirm that drying
                    is progressing. If readings are not declining, equipment configuration must be adjusted.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Document completion</strong> — drying is complete when all readings have
                    returned to established dry standard values for each material. The final drying report
                    must document the dry standard values reached.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If your insurer's contractor placed equipment without documenting moisture readings,
                  checking readings during the drying period, or providing a drying completion report with
                  final readings, the drying process did not meet S500 methodology. Incomplete drying is
                  the most common cause of post-claim mould development.
                </p>
              </>
            ),
          },
          {
            heading: 'Documentation Your Contractor Should Provide',
            body: (
              <>
                <p>
                  An S500-compliant water damage restoration generates a specific documentation set. After
                  restoration, you are entitled to request this documentation from the contractor appointed
                  by your insurer:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Initial moisture readings</strong> — room-by-room readings at commencement,
                    identifying each affected material and its measured moisture content.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Daily drying logs</strong> — dated moisture readings at each monitoring visit,
                    showing drying progress.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Equipment placement record</strong> — type, quantity, and placement of
                    dehumidifiers and air movers.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Drying completion report</strong> — final readings confirming all materials
                    have reached dry standard values, with the dry standard values used for each material
                    class documented.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Scope of works</strong> — itemised list of all materials removed, repaired,
                    or replaced, with reasons for each decision documented.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If mould develops after a water damage event, the absence of these documents weakens
                  the insurer's argument that proper drying was completed. NRPG provides independent
                  assessment that documents what was not done, supporting supplementary claims and
                  AFCA lodgements.
                </p>
                <p style={{ marginTop: '0.75rem', fontStyle: 'italic', fontSize: '0.875rem', color: '#555' }}>
                  NRPG collects your contact and property details to coordinate contractor matching. See our{' '}
                  <a href="/privacy">Privacy Policy</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'S500 and Your Insurance Claim — What Matters',
            body: (
              <>
                <p>
                  S500 methodology is relevant to your insurance claim in the following specific scenarios:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Initial claim scope is incomplete</strong> — if the insurer's contractor did
                    not conduct full moisture mapping or documented dry standard values, the scope may
                    understate the affected area. An independent S500-compliant assessment establishes the
                    full affected zone.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Drying was declared complete prematurely</strong> — if equipment was removed
                    before readings reached dry standard, residual moisture in structural materials will
                    cause mould. S500 documentation establishes that drying was incomplete at the time
                    of equipment removal.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Mould appeared after water damage restoration</strong> — post-remediation mould
                    arising from incomplete drying is a supplementary claim. S500-compliant assessment
                    establishes the causal link between incomplete drying and mould development.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Claim denied as pre-existing</strong> — moisture readings with date-stamped
                    documentation establish when elevated moisture was first detected, countering pre-existing
                    condition assertions.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  AFCA considers independent assessments when reviewing disputed decisions. An S500-compliant
                  scope from a certified contractor is the primary tool for substantiating a disputed or
                  supplementary water damage claim.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What is IICRC S500:2025?',
            answer:
              'IICRC S500:2025 is the current edition of the Standard for Professional Water Damage Restoration, published by the Institute of Inspection, Cleaning and Restoration Certification. It defines technical requirements that certified contractors must meet when assessing and restoring water-damaged property, including moisture measurement protocols, drying standards, and documentation requirements.',
          },
          {
            question: 'Does my insurer have to accept IICRC S500 documentation?',
            answer:
              'Insurers are not legally required to accept any specific methodology, but IICRC S500 is the industry benchmark referenced by the Insurance Council of Australia and AFCA in assessing whether a restoration scope is reasonable. AFCA adjudicators consider S500-compliant independent assessments when reviewing disputed claim decisions.',
          },
          {
            question: 'What moisture readings should a certified contractor take?',
            answer:
              'Certified contractors performing S500-compliant assessments take moisture content readings of structural materials using calibrated moisture meters, supplemented by thermal imaging to identify moisture in concealed spaces. Readings are compared against established dry standard values for each material class to determine the extent and depth of water migration.',
          },
          {
            question: 'My insurer said the property is dry. What does that actually mean?',
            answer:
              '"Dry" under S500 methodology means that measured moisture content in all affected structural materials has returned to established dry standard values for the specific material and climate conditions. If your insurer\'s assessor declared the property dry without taking calibrated moisture readings across all affected materials, that declaration may not reflect S500 methodology. An independent certified assessment will document current moisture conditions.',
          },
        ]}
        relatedGuides={[
          {
            title: 'IICRC S520 Mould Remediation Standard',
            href: '/standards/iicrc-s520-mold-remediation',
            description: 'What to expect from an S520-certified mould remediation contractor.',
          },
          {
            title: 'IICRC S700 Fire & Smoke Damage Standard',
            href: '/standards/iicrc-s700-fire-smoke',
            description: 'IICRC S700:2025 fire and smoke damage restoration — policyholder guide.',
          },
          {
            title: 'Queensland Floods 2026',
            href: '/events/queensland-floods-2026',
            description: 'QLD March 2026 floods — hardship assistance deadline 27 April 2026.',
          },
          {
            title: 'NSW Storms April 2026',
            href: '/events/nsw-storms-april-2026',
            description: 'NSW/QLD April 2026 storms — ICA AU$176M, 14,781 claims.',
          },
          {
            title: 'Underinsurance in Australia',
            href: '/guides/insurance/underinsurance-australia',
            description: 'Understanding underinsurance and policy sum insured adequacy.',
          },
        ]}
        cta={{ text: 'Request an S500-Compliant Water Damage Assessment', href: '/claim' }}
      />
    </>
  );
}
