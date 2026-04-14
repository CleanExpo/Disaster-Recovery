import { Metadata } from 'next';
import Script from 'next/script';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-610: NSW State Hub
 *
 * Active events:
 * - NSW/QLD Storms April 2026 — ICA AU$176M, 14,781 claims, declared 10 April 2026
 *
 * ACL s18 compliant — no guarantee language, no first-person business language.
 */

export const metadata: Metadata = {
  title: 'New South Wales Disaster Recovery & Insurance Claim Support | NSW Hub',
  description:
    'NSW disaster recovery hub. NSW/QLD Storms April 2026: ICA AU$176M insured loss, 14,781 claims, declared 10 April 2026. IICRC-certified restoration contractors across Liverpool, Fairfield, Sydney, Newcastle, Wollongong, and Central Coast.',
  keywords:
    'NSW disaster recovery, New South Wales storm claims 2026, NSW insurance claim support, Liverpool storm damage, Fairfield flood claims, Sydney storm damage, NSW April 2026 storms, Service NSW disaster relief',
  openGraph: {
    title: 'New South Wales Disaster Recovery & Insurance Claim Support | NSW Hub',
    description:
      'NSW/QLD Storms April 2026: ICA AU$176M insured loss, 14,781 claims. IICRC-certified restoration contractors across metropolitan Sydney and regional NSW.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('NSW Disaster Recovery Hub')}&city=${encodeURIComponent('New South Wales')}&service=disaster-recovery`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/nsw`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/nsw/#professionalservice`,
  name: `${NAP.name} — New South Wales`,
  url: `${NAP.url}/nsw`,
  description:
    'IICRC-certified disaster restoration and insurance claim support across New South Wales. Servicing Liverpool, Fairfield, Sydney, Newcastle, Wollongong, Central Coast, and all NSW regions.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: [
    { '@type': 'State', name: 'New South Wales' },
    { '@type': 'City', name: 'Sydney' },
    { '@type': 'City', name: 'Liverpool' },
    { '@type': 'City', name: 'Fairfield' },
    { '@type': 'City', name: 'Newcastle' },
    { '@type': 'City', name: 'Wollongong' },
    { '@type': 'City', name: 'Central Coast' },
  ],
  address: {
    '@type': 'PostalAddress',
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: NAP.url },
    { '@type': 'ListItem', position: 2, name: 'New South Wales', item: `${NAP.url}/nsw` },
  ],
};

export default function NSWHubPage() {
  return (
    <>
      <Script
        id="nsw-professionalservice"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <Script
        id="nsw-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AgGuidePageTemplate
        category="State Hub"
        title="New South Wales Disaster Recovery Hub"
        subtitle="NSW/QLD Storms April 2026: ICA AU$176M insured loss, 14,781 claims, declared 10 April 2026. IICRC-certified restoration contractors across Liverpool, Fairfield, Sydney, Newcastle, Wollongong, and Central Coast."
        gradient="linear-gradient(135deg, #002B5C 0%, #00539B 100%)"
        icon={<MapPin className="h-10 w-10" />}
        lastReviewed="2026-04-14"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'New South Wales' },
        ]}
        sections={[
          {
            heading: 'NSW/QLD Storms April 2026 — Active Event',
            body: (
              <>
                <p>
                  The Insurance Council of Australia declared the NSW/QLD Storms event on{' '}
                  <strong>10 April 2026</strong>, with a current insured loss estimate of{' '}
                  <strong>AU$176 million</strong> and <strong>14,781 claims</strong> lodged to date.
                  The event spans both New South Wales and Southeast Queensland, with the heaviest concentration
                  of claims in the Liverpool and Fairfield LGAs of metropolitan Sydney.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Storm events of this type typically generate claims across wind damage, hail, water
                  ingress, flash flooding, and fallen trees. Many claims are still being assessed. If you
                  have not yet lodged a claim, or if an initial assessment has underestimated your damage,
                  a certified independent assessment is available 24/7.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>ICA Insurance Monitor:</strong>{' '}
                  <a
                    href="https://insurancecouncil.com.au/disaster-events/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    insurancecouncil.com.au/disaster-events
                  </a>
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Full event detail, claim pathways, and Liverpool/Fairfield-specific information:{' '}
                  <a href="/events/nsw-storms-april-2026">NSW Storms April 2026 Event Page</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'NSW Government Disaster Relief — Service NSW',
            body: (
              <>
                <p>
                  The NSW Government activates Disaster Relief Grants for eligible residents in declared
                  disaster areas. Grants are administered through Service NSW and cover emergency
                  accommodation, essential household contents, and structural repairs to make dwellings
                  habitable.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>NSW Disaster Relief Grants</strong> — apply at Service NSW once your LGA is
                    declared.{' '}
                    <a
                      href="https://www.service.nsw.gov.au/transaction/apply-for-disaster-relief-grant"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      service.nsw.gov.au
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>NSW Disaster Welfare Assistance</strong> — immediate financial support for
                    households displaced by disaster.{' '}
                    <a
                      href="https://www.service.nsw.gov.au/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      service.nsw.gov.au
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>DRFA Commonwealth/State joint funding</strong> — available in declared areas
                    for both individuals and councils.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#555' }}>
                  Check eligibility and program activation status at Service NSW before applying. NRPG is
                  a restoration and claim support service and does not administer government grants.
                </p>
              </>
            ),
          },
          {
            heading: 'Liverpool & Fairfield — Storm Damage Claims',
            body: (
              <>
                <p>
                  Liverpool and Fairfield LGAs recorded the highest claim concentration in the April 2026
                  storm event. Properties in these LGAs experienced wind damage, roof damage, water
                  ingress, and localised flash flooding. Certified contractors are deployed in both areas.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Common claim issues arising from the April 2026 storms in these LGAs include:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Roof damage attributed to pre-existing condition</strong> — insurers
                    frequently apply maintenance exclusions. An independent certified scope documents
                    storm causation.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Water ingress scope incomplete</strong> — moisture mapping to IICRC S500:2025
                    identifies hidden moisture that insurer-appointed assessors may miss.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Contents undervalued</strong> — replacement cost documentation supports
                    contents claim resubmission.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Liverpool and Fairfield claim hub:{' '}
                  <a href="/nsw/liverpool-fairfield-storm-damage-claims">
                    Liverpool &amp; Fairfield Storm Damage Claims
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
            heading: 'NSW Coverage Areas',
            body: (
              <>
                <p>
                  Certified restoration contractors operate across all NSW LGAs, with concentrated
                  capacity in:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Liverpool &amp; Fairfield</strong> — storm, flood, and hail damage; rapid
                    metropolitan response
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Sydney Metro (all LGAs)</strong> — storm, flood, fire, and mould; 24/7
                    contractor network
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Newcastle</strong> — storm and flood damage restoration; Hunter Valley coverage
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Wollongong</strong> — storm and coastal damage; Illawarra region coverage
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Central Coast</strong> — storm and flood damage restoration
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Regional NSW</strong> — flood and storm response across all declared disaster
                    areas
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'The NSW/QLD April 2026 storms — when is the claim deadline?',
            answer:
              'Insurance claims are subject to standard policy timeframes, typically 30\u201390 days from discovery of damage. NSW Government Disaster Relief Grants have separate eligibility windows set by Service NSW. Check service.nsw.gov.au for current program status.',
          },
          {
            question: 'My insurer said my roof damage is wear and tear, not storm damage. What can I do?',
            answer:
              'Wear and tear exclusions are frequently misapplied after storm events. A certified IICRC contractor provides an independent scope using documented storm timing and moisture readings that establish storm causation. AFCA considers independent assessments when reviewing disputed decisions.',
          },
          {
            question: 'How do I apply for a NSW Disaster Relief Grant?',
            answer:
              'Apply through Service NSW at service.nsw.gov.au once your LGA is declared a disaster area. NRPG does not administer government grants and cannot assess your eligibility for NSW relief programs.',
          },
          {
            question: 'What is AFCA and how does it help with disputed NSW claims?',
            answer:
              'AFCA (Australian Financial Complaints Authority) is a free, independent dispute resolution service for insurance complaints. If your insurer has denied, delayed, or underpaid your claim, you can lodge with AFCA at afca.org.au. NRPG provides independent assessment documentation to support your AFCA lodgement.',
          },
          {
            question: 'I have mould appearing after the April storms. Is that a new claim?',
            answer:
              'If mould arose from water ingress caused by the April 2026 storm event, it is a supplementary claim connected to the original storm event. NRPG documents the moisture pathway from storm water ingress to current mould growth for insurer and AFCA purposes.',
          },
        ]}
        relatedGuides={[
          {
            title: 'NSW Storms April 2026 Event Page',
            href: '/events/nsw-storms-april-2026',
            description: 'Full NSW/QLD April 2026 storm event — ICA AU$176M, 14,781 claims, claim pathways.',
          },
          {
            title: 'Liverpool & Fairfield Storm Damage Claims',
            href: '/nsw/liverpool-fairfield-storm-damage-claims',
            description: 'Liverpool and Fairfield storm damage claims hub — IICRC-certified contractors.',
          },
          {
            title: 'IICRC S500 Water Damage Standard',
            href: '/standards/iicrc-s500-water-damage',
            description: 'What IICRC S500:2025 means for your storm water or flood damage claim.',
          },
          {
            title: 'Queensland Hub',
            href: '/qld',
            description: 'Queensland disaster recovery hub — active QLD events and claim support.',
          },
          {
            title: 'Underinsurance in Australia',
            href: '/guides/insurance/underinsurance-australia',
            description: 'Understanding underinsurance and how to identify shortfalls in your policy.',
          },
        ]}
        cta={{ text: 'Lodge a NSW Claim Assessment', href: '/claim' }}
      />
    </>
  );
}
