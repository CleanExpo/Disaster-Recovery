import { Metadata } from 'next';
import Script from 'next/script';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-611: Victoria State Hub
 *
 * Active events:
 * - Victoria Bushfires 2026 — PERILS initial AU$786M, Victorian Parliament inquiry active
 *
 * ACL s18 compliant — no guarantee language, no first-person business language.
 */

export const metadata: Metadata = {
  title: 'Victoria Disaster Recovery & Insurance Claim Support | VIC Hub',
  description:
    'Victoria disaster recovery hub. Victoria Bushfires 2026: PERILS initial AU$786M insured loss, Victorian Parliament inquiry active. IICRC-certified restoration contractors across Yarra Ranges, Dandenong Ranges, Melbourne Metro, and Geelong.',
  keywords:
    'Victoria disaster recovery, Victoria bushfires 2026, VIC insurance claim support, Yarra Ranges bushfire claims, Dandenong Ranges fire damage, Melbourne bushfire restoration, PERILS AU$786M bushfire, Victorian Parliament inquiry',
  openGraph: {
    title: 'Victoria Disaster Recovery & Insurance Claim Support | VIC Hub',
    description:
      'Victoria Bushfires 2026: PERILS initial AU$786M insured loss, Victorian Parliament inquiry active. IICRC-certified restoration contractors across Yarra Ranges, Dandenong Ranges, Melbourne Metro.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Victoria Disaster Recovery Hub')}&city=${encodeURIComponent('Victoria')}&service=disaster-recovery`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/vic`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/vic/#professionalservice`,
  name: `${NAP.name} — Victoria`,
  url: `${NAP.url}/vic`,
  description:
    'IICRC-certified disaster restoration and insurance claim support across Victoria. Servicing Yarra Ranges, Dandenong Ranges, Melbourne Metro, Geelong, and all VIC regions.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: [
    { '@type': 'State', name: 'Victoria' },
    { '@type': 'City', name: 'Melbourne' },
    { '@type': 'City', name: 'Geelong' },
    { '@type': 'Place', name: 'Yarra Ranges' },
    { '@type': 'Place', name: 'Dandenong Ranges' },
  ],
  address: {
    '@type': 'PostalAddress',
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: NAP.url },
    { '@type': 'ListItem', position: 2, name: 'Victoria', item: `${NAP.url}/vic` },
  ],
};

export default function VICHubPage() {
  return (
    <>
      <Script
        id="vic-professionalservice"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <Script
        id="vic-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AgGuidePageTemplate
        category="State Hub"
        title="Victoria Disaster Recovery Hub"
        subtitle="Victoria Bushfires 2026: PERILS initial insured loss AU$786M, Victorian Parliament inquiry active. IICRC-certified restoration contractors across Yarra Ranges, Dandenong Ranges, Melbourne Metro, and Geelong."
        gradient="linear-gradient(135deg, #0033A0 0%, #003087 100%)"
        icon={<MapPin className="h-10 w-10" />}
        lastReviewed="2026-04-14"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Victoria' },
        ]}
        sections={[
          {
            heading: 'Victoria Bushfires 2026 — Active Claims',
            body: (
              <>
                <p>
                  The Victoria Bushfires 2026 event has generated a PERILS initial insured loss estimate of{' '}
                  <strong>AU$786 million</strong>. The Victorian Parliament has an active inquiry into the
                  bushfire season, examining insurer response times, claim handling practices, and the
                  adequacy of existing policy coverage for bushfire-affected property owners.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Bushfire damage claims in Victoria involve complex scope assessments covering structural
                  damage from fire and radiant heat, smoke and soot contamination of internal spaces and
                  HVAC systems, ember attack damage to roofing and external elements, and total loss
                  demolition and rebuild scenarios. Underscoping is common in initial insurer assessments
                  for bushfire events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Parliamentary inquiry findings, when published, will carry regulatory weight. Claims
                  that have been delayed, disputed, or underscoped in the context of insurer handling
                  practices examined by the inquiry are strong candidates for AFCA escalation.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Full event detail and claim support:{' '}
                  <a href="/events/victoria-bushfires-2026">Victoria Bushfires 2026 Event Page</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'Victorian Parliament Inquiry — What It Means for Policyholders',
            body: (
              <>
                <p>
                  The Victorian Parliament inquiry into the 2026 bushfire season is examining insurer
                  response adequacy, claim handling timeframes, and the pattern of disputes arising from
                  bushfire claims. The inquiry does not resolve individual claims, but its findings
                  can inform AFCA adjudications and future regulatory action.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Policyholders with delayed, disputed, or underpaid Victorian bushfire claims should:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    Document the full sequence of insurer communications, assessments, and delay periods.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    Obtain an independent certified assessment from an IICRC-qualified contractor with
                    documented scope methodology.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    Lodge with AFCA if the claim has been delayed beyond ICA claim handling timeframes
                    (typically 10 business days for acknowledgement, 45 days for decision on straightforward
                    claims).
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  AFCA free lodgement:{' '}
                  <a
                    href="https://www.afca.org.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    afca.org.au
                  </a>
                </p>
              </>
            ),
          },
          {
            heading: 'Victorian Government Bushfire Assistance',
            body: (
              <>
                <p>
                  The Victorian Government activates emergency assistance programs for residents in
                  declared disaster areas following bushfire events. Programs are administered through
                  vic.gov.au/disasterhelp and include:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Emergency Relief Payments</strong> — immediate financial support for
                    households directly affected by bushfire.{' '}
                    <a
                      href="https://www.vic.gov.au/disasterhelp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      vic.gov.au/disasterhelp
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Bushfire Recovery Victoria</strong> — coordinated recovery support across
                    affected LGAs.{' '}
                    <a
                      href="https://www.vic.gov.au/disasterhelp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      vic.gov.au/disasterhelp
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>DRFA Commonwealth/State joint assistance</strong> — available in declared
                    disaster areas for eligible residents.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#555' }}>
                  Check eligibility and activation status at vic.gov.au/disasterhelp. NRPG is a
                  restoration and claim support service and does not administer government assistance programs.
                </p>
              </>
            ),
          },
          {
            heading: 'Yarra Ranges & Dandenong Ranges — Bushfire Damage Claims',
            body: (
              <>
                <p>
                  The Yarra Ranges and Dandenong Ranges LGAs recorded significant property impacts in the
                  2026 bushfire season. Certified contractors are active in both areas. Common claim issues
                  in these LGAs include:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Smoke damage scope disputes</strong> — smoke and soot contamination is
                    frequently underestimated in initial insurer assessments. IICRC S700:2025 protocols
                    document full smoke penetration including HVAC systems.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Radiant heat damage to structure</strong> — heat-related structural compromise
                    can be present without visible fire damage. Certified assessment identifies affected
                    structural elements.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Total loss undervaluation</strong> — rebuilding cost estimates provided by
                    insurer-appointed assessors frequently understate current construction costs.
                    Independent assessment documents current rebuild cost.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Yarra Ranges bushfire claim hub:{' '}
                  <a href="/vic/yarra-ranges-bushfire-damage-claims">
                    Yarra Ranges Bushfire Damage Claims
                  </a>
                </p>
                <p style={{ marginTop: '0.75rem', fontStyle: 'italic', fontSize: '0.875rem', color: '#555' }}>
                  NRPG collects your contact and property details to coordinate contractor matching. See our{' '}
                  <a href="/privacy">Privacy Policy</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'Victoria Coverage Areas',
            body: (
              <>
                <p>
                  Certified restoration contractors operate across all Victorian LGAs, with concentrated
                  capacity in:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Yarra Ranges</strong> — bushfire restoration, smoke remediation, structural assessment
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Dandenong Ranges</strong> — bushfire and ember attack damage; smoke and soot remediation
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Melbourne Metro</strong> — all disaster types; 24/7 contractor network; rapid dispatch
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Geelong</strong> — storm, flood, and fire damage restoration; Surf Coast coverage
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Regional Victoria</strong> — bushfire, flood, and storm response statewide
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What does the PERILS AU$786M figure mean for my individual claim?',
            answer:
              'PERILS measures total market insured losses across all policies and insurers statewide. Individual claim amounts depend on your sum insured, policy excess, and the scope of covered damage at your specific property. The PERILS figure does not determine or cap your individual claim.',
          },
          {
            question: 'The Parliamentary inquiry is examining insurer conduct — does that help my claim?',
            answer:
              'The inquiry does not resolve individual claims. However, if the inquiry identifies systemic insurer conduct issues, that context strengthens AFCA lodgements. Document your insurer communications carefully, obtain an independent certified assessment, and lodge with AFCA if your claim has been delayed or disputed.',
          },
          {
            question: 'My insurer said smoke damage is not structural — can they exclude it?',
            answer:
              'Smoke and soot damage is a covered loss under most home insurance policies when caused by a covered bushfire event. IICRC S700:2025 protocols document smoke penetration including HVAC systems and internal surfaces. An independent certified assessment with S700 methodology supports smoke damage claim acceptance.',
          },
          {
            question: 'How do I access Victorian Government disaster assistance?',
            answer:
              'Apply through vic.gov.au/disasterhelp once your area is declared. NRPG does not administer government programs and cannot assess your eligibility for Victorian assistance.',
          },
          {
            question: 'Is it too late to lodge a Victorian bushfire claim?',
            answer:
              'Standard home insurance policies typically allow 30\u201390 days from discovery of damage. Damage discovered after initial return to property, including structural compromise and smoke contamination, can be lodged when discovered. NRPG documents the causal connection between the bushfire event and current damage conditions.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Victoria Bushfires 2026 Event Page',
            href: '/events/victoria-bushfires-2026',
            description: 'Full Victoria 2026 bushfire event — PERILS AU$786M, inquiry, claim pathways.',
          },
          {
            title: 'Yarra Ranges Bushfire Damage Claims',
            href: '/vic/yarra-ranges-bushfire-damage-claims',
            description: 'Yarra Ranges bushfire damage claims hub — IICRC-certified contractors.',
          },
          {
            title: 'IICRC S700 Fire & Smoke Damage Standard',
            href: '/standards/iicrc-s700-fire-smoke',
            description: 'What IICRC S700:2025 means for your bushfire or smoke damage claim.',
          },
          {
            title: 'IICRC S520 Mould Remediation Standard',
            href: '/standards/iicrc-s520-mold-remediation',
            description: 'IICRC S520:2025 mould remediation — what to expect from a certified contractor.',
          },
          {
            title: 'Underinsurance in Australia',
            href: '/guides/insurance/underinsurance-australia',
            description: 'Understanding underinsurance and how to identify shortfalls in your policy.',
          },
        ]}
        cta={{ text: 'Lodge a Victoria Claim Assessment', href: '/claim' }}
      />
    </>
  );
}
