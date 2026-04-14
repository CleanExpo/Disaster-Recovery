import { Metadata } from 'next';
import Script from 'next/script';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-613: South Australia State Hub — evergreen framing (no current active declared disaster)
 *
 * Covers: Adelaide storms, Riverland floods (2023 precedent), extreme heat, hail
 * Government assistance: SA Emergency Financial Assistance (EFA) — safecom.sa.gov.au
 * Key areas: Adelaide Metro, Riverland, Barossa, Fleurieu Peninsula
 *
 * ACL s18 compliant — no guarantee language, no first-person business language.
 */

export const metadata: Metadata = {
  title: 'South Australia Disaster Recovery & Insurance Claim Support | SA Hub',
  description:
    'South Australia disaster recovery hub. Adelaide storms, Riverland floods, hail, and extreme heat damage. SA Emergency Financial Assistance (EFA) available for eligible residents. IICRC-certified restoration contractors across Adelaide Metro, Riverland, Barossa, and Fleurieu Peninsula.',
  keywords:
    'South Australia disaster recovery, SA insurance claim support, Adelaide storm damage, Riverland flood claims, SA Emergency Financial Assistance EFA, Barossa storm damage, Fleurieu Peninsula flood, IICRC certified SA',
  openGraph: {
    title: 'South Australia Disaster Recovery & Insurance Claim Support | SA Hub',
    description:
      'South Australia disaster recovery — Adelaide storms, Riverland floods, hail, and extreme heat. SA Emergency Financial Assistance available. IICRC-certified contractors across SA.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('South Australia Disaster Recovery Hub')}&city=${encodeURIComponent('South Australia')}&service=disaster-recovery`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/sa`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/sa/#professionalservice`,
  name: `${NAP.name} — South Australia`,
  url: `${NAP.url}/sa`,
  description:
    'IICRC-certified disaster restoration and insurance claim support across South Australia. Servicing Adelaide Metro, Riverland, Barossa, Fleurieu Peninsula, and all SA regions.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: [
    { '@type': 'State', name: 'South Australia' },
    { '@type': 'City', name: 'Adelaide' },
    { '@type': 'Place', name: 'Riverland' },
    { '@type': 'Place', name: 'Barossa Valley' },
    { '@type': 'Place', name: 'Fleurieu Peninsula' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'SA',
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
    { '@type': 'ListItem', position: 2, name: 'South Australia', item: `${NAP.url}/sa` },
  ],
};

export default function SAHubPage() {
  return (
    <>
      <Script
        id="sa-professionalservice"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <Script
        id="sa-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AgGuidePageTemplate
        category="State Hub"
        title="South Australia Disaster Recovery Hub"
        subtitle="Adelaide storms, Riverland floods, hail damage, and extreme heat events. SA Emergency Financial Assistance (EFA) available for eligible residents. IICRC-certified restoration contractors across Adelaide Metro, Riverland, Barossa, and Fleurieu Peninsula."
        gradient="linear-gradient(135deg, #8B0000 0%, #CC0000 100%)"
        icon={<MapPin className="h-10 w-10" />}
        lastReviewed="2026-04-14"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'South Australia' },
        ]}
        sections={[
          {
            heading: 'South Australia Disaster Profile',
            body: (
              <>
                <p>
                  South Australia's disaster profile spans Adelaide metropolitan storms and hail events,
                  Riverland and Murray River flooding, Barossa Valley and Hills storm damage, Fleurieu
                  Peninsula flooding, and extreme heat events that cause structural and infrastructure damage
                  across the state.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The 2023 Riverland floods demonstrated the scale of inundation risk along the Murray River
                  system, affecting properties across Renmark, Berri, Loxton, and surrounding communities.
                  River flooding of this type generates complex insurance claims involving extended inundation
                  duration, contamination, and structural damage that is frequently underestimated in initial
                  insurer assessments.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Adelaide metropolitan storms and hail events generate significant claim volumes annually.
                  Hail damage to roofing and vehicles is frequently subject to scope disputes between
                  policyholders and insurers. Certified independent assessments establish full hail damage
                  scope using IICRC methodology.
                </p>
              </>
            ),
          },
          {
            heading: 'SA Emergency Financial Assistance (EFA)',
            body: (
              <>
                <p>
                  The South Australian Government provides Emergency Financial Assistance (EFA) for eligible
                  residents affected by declared disaster events. EFA is administered through SAFECOM and
                  the SA Government, covering essential household goods, temporary accommodation, and
                  structural repair assistance.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>SA Emergency Financial Assistance</strong> — financial support for essential
                    needs following a declared disaster.{' '}
                    <a
                      href="https://www.safecom.sa.gov.au/public/redirect.jsp?id=7162"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      safecom.sa.gov.au
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>SA Department for Human Services</strong> — welfare and emergency accommodation
                    support for displaced residents.{' '}
                    <a
                      href="https://www.sa.gov.au/topics/emergency-and-safety/emergencies-and-disasters"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      sa.gov.au
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>DRFA Commonwealth/State joint assistance</strong> — available in Commonwealth-declared
                    disaster areas for eligible South Australian residents.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#555' }}>
                  SA EFA is activated on a per-event basis when the SA Government declares a disaster. Check
                  current activation status at safecom.sa.gov.au. NRPG is a restoration and claim support
                  service and does not administer government assistance programs.
                </p>
              </>
            ),
          },
          {
            heading: 'Riverland — Flood Damage Claims',
            body: (
              <>
                <p>
                  The Riverland region — Renmark, Berri, Loxton, Waikerie, and surrounding Murray River
                  communities — has experienced repeated flood inundation events, with the 2023 floods
                  demonstrating the sustained damage potential of Murray River flooding events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Riverland flood claims frequently involve:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Extended inundation moisture damage</strong> — days or weeks of sustained ground
                    moisture requires IICRC S500:2025 moisture mapping to fully document structural saturation.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Contamination from floodwater</strong> — Murray floodwater carries Category 3
                    (black water) contamination requiring specialist remediation protocols.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Delayed mould development</strong> — moisture remaining in wall cavities after
                    incomplete drying generates mould months after inundation. Supplementary claims for
                    post-event mould are valid when causally linked to the flood event.
                  </li>
                </ul>
                <p style={{ marginTop: '0.75rem', fontStyle: 'italic', fontSize: '0.875rem', color: '#555' }}>
                  NRPG collects your contact and property details to coordinate contractor matching. See our{' '}
                  <a href="/privacy">Privacy Policy</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'Adelaide Storms & Hail — Insurance Claim Support',
            body: (
              <>
                <p>
                  Adelaide metropolitan areas experience significant storm and hail events annually, typically
                  concentrated in the spring and summer seasons. Common claim types include roofing damage,
                  guttering and downpipe damage, skylights, solar panels, vehicles, and secondary water
                  ingress from storm-damaged roofing.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Adelaide hail claims frequently involve disputes over:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Hail damage versus pre-existing roof wear</strong> — certified assessment
                    distinguishes hail impact patterns from gradual wear and tear, establishing storm
                    causation for insurer and AFCA purposes.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Secondary water damage from roof damage</strong> — water ingress through
                    hail-damaged roofing is a covered extension of the hail event. Full moisture mapping
                    documents secondary damage extent.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'South Australia Coverage Areas',
            body: (
              <>
                <p>
                  Certified restoration contractors operate across all SA regions, with concentrated
                  capacity in:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Adelaide Metro</strong> — storm, hail, flood, fire; 24/7 metropolitan contractor
                    network
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Riverland</strong> — flood restoration, contamination remediation, Murray River
                    inundation specialist response
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Barossa Valley</strong> — storm and hail damage; Hills and Barossa contractor
                    coverage
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Fleurieu Peninsula</strong> — storm, flood, and coastal damage restoration
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Adelaide Hills</strong> — bushfire, storm, and flood; SA Hills specialist response
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How do I access SA Emergency Financial Assistance (EFA) after a storm or flood?',
            answer:
              'SA EFA is activated per event when the SA Government declares a disaster. Check current activation status at safecom.sa.gov.au. NRPG does not administer SA EFA and cannot assess your eligibility.',
          },
          {
            question: 'My Adelaide property was hail-damaged. My insurer says it is pre-existing wear and tear. What can I do?',
            answer:
              'Request an independent certified assessment from an IICRC-qualified contractor. Certified assessors document hail impact patterns that are distinguishable from gradual wear and tear. This documentation supports your position if you escalate to AFCA. AFCA lodgement is free at afca.org.au.',
          },
          {
            question: 'The Riverland floods were over a year ago. Can I still lodge a claim for mould that has appeared?',
            answer:
              'Yes, if the mould arose from water ingress during the flood event and was not discovered until later. Mould developing from incomplete post-flood drying is a supplementary claim connected to the original event. NRPG documents the causal link between the flood and current mould conditions.',
          },
          {
            question: 'What contamination risks come with Riverland Murray River flooding?',
            answer:
              'Murray River floodwater typically carries Category 3 (black water) contamination due to agricultural runoff, livestock, and sewage. Category 3 contamination requires specialist remediation including full removal of affected materials and appropriate disinfection protocols. This is a covered loss under most policies when caused by a covered flood event.',
          },
          {
            question: 'Is extreme heat damage covered by home insurance in SA?',
            answer:
              'Heat-related damage depends on your specific policy. Direct damage from heat events (e.g., pipe bursts from heat, structural effects of extreme temperature) may be covered depending on policy wording. Review your Product Disclosure Statement and discuss borderline cases with your insurer. If a claim is denied, AFCA review is available at no cost.',
          },
        ]}
        relatedGuides={[
          {
            title: 'IICRC S500 Water Damage Standard',
            href: '/standards/iicrc-s500-water-damage',
            description: 'What IICRC S500:2025 means for your flood or water damage claim.',
          },
          {
            title: 'IICRC S520 Mould Remediation Standard',
            href: '/standards/iicrc-s520-mold-remediation',
            description: 'IICRC S520:2025 mould remediation — what to expect from a certified contractor.',
          },
          {
            title: 'Victoria Hub',
            href: '/vic',
            description: 'Victoria disaster recovery hub — Victoria Bushfires 2026 and VIC claim support.',
          },
          {
            title: 'NSW Hub',
            href: '/nsw',
            description: 'New South Wales disaster recovery hub — NSW April 2026 storms and claim support.',
          },
          {
            title: 'Underinsurance in Australia',
            href: '/guides/insurance/underinsurance-australia',
            description: 'Understanding underinsurance and how to identify shortfalls in your policy.',
          },
        ]}
        cta={{ text: 'Lodge a South Australia Claim Assessment', href: '/claim' }}
      />
    </>
  );
}
