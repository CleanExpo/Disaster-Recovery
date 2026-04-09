import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR: Cyclone Damage Restoration Exmouth
 * Cyclone Narelle impact zone — Shire of Exmouth DRFA declared, North West Cape
 */

export const metadata: Metadata = {
  title: 'Cyclone Damage Restoration Exmouth | Cyclone Narelle Recovery',
  description: 'Cyclone damage restoration in Exmouth and the North West Cape. IICRC-certified contractors responding to Cyclone Narelle. Lodge your claim 24/7.',
  keywords: 'cyclone damage exmouth, cyclone narelle exmouth, north west cape cyclone, exmouth cyclone restoration, water damage exmouth, drfa exmouth',
  openGraph: {
    title: 'Cyclone Damage Restoration Exmouth | Cyclone Narelle Recovery',
    description: 'IICRC-certified cyclone restoration contractors in Exmouth. Responding to Cyclone Narelle. Lodge your claim 24/7.',
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/cyclone-damage-restoration-exmouth`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/cyclone-damage-restoration-exmouth/#localbusiness`,
  name: `${NAP.name} Exmouth`,
  url: `${NAP.url}/cyclone-damage-restoration-exmouth`,
  description: 'IICRC-certified cyclone damage restoration in Exmouth and the North West Cape. Emergency response for Cyclone Narelle structural damage, water damage, and roof repairs.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'Place', name: 'Exmouth', containedInPlace: { '@type': 'State', name: 'Western Australia' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Exmouth', addressRegion: 'WA', postalCode: '6707', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cyclone Damage Restoration Exmouth',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Exmouth' },
  serviceType: 'Cyclone Damage Restoration',
  description: 'Professional cyclone damage restoration in Exmouth and the North West Cape: emergency make-safe, roof tarping, structural drying, water extraction, and insurance claim documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Exmouth in the Cyclone Narelle DRFA declaration?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 the Shire of Exmouth is one of the 6 shires declared under the WA Disaster Recovery Funding Arrangements (DRFA) for Cyclone Narelle 2026. The WA Premier\u2019s Disaster Relief Payment is available for Exmouth properties that are severely damaged or destroyed. Contact the WA Recovery hotline on 1800 032 965 or lodge at disasterrecovery.com.au/claim.' },
    },
    {
      '@type': 'Question',
      name: 'What financial assistance is available for Cyclone Narelle damage in Exmouth?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Australian Government Disaster Recovery Payment (AGDRP) was activated on 10 April 2026 for eligible Exmouth LGA communities including Learmonth and North West Cape. The AGDRP provides $1,000 per eligible adult and $400 per eligible child. Claim via myGov at servicesaustralia.gov.au or call the Emergency Info Line on 180 22 66. The WA Premier\u2019s Disaster Relief Payment also provides $4,000 for owner-occupiers with destroyed or severely damaged properties and $2,000 for tenants, available via DFES SmartyGrants. WA Recovery hotline: 1800 032 965. Check eligibility and current activation status at official sources before applying.' },
    },
    {
      '@type': 'Question',
      name: 'Does ARPC cover Exmouth cyclone claims?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 Exmouth (21.9\u00b0S) is north of the Tropic of Capricorn (23.5\u00b0S). All home building policies covering properties north of the Tropic in WA have cyclone coverage processed through the ARPC Cyclone Reinsurance Pool. Cyclone Narelle has been confirmed as an ARPC Declared Cyclone Event. Lodge your claim as \u2018cyclone\u2019 to ensure correct ARPC pool processing.' },
    },
    {
      '@type': 'Question',
      name: 'How remote is Exmouth and how does this affect restoration response time?',
      acceptedAnswer: { '@type': 'Answer', text: 'Exmouth is approximately 1,270 km from Perth by road. NRPG mobilises local and regional WA contractors to reduce response times. For major declared events like Cyclone Narelle, NRPG pre-positions contractors in the Gascoyne region ahead of peak impact, allowing faster post-clearance dispatch to Exmouth and surrounding North West Cape communities.' },
    },
  ],
};

export default function CycloneDamageRestorationExmouthPage() {
  return (
    <>
      <Script id="cdrexmouth-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="cdrexmouth-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="cdrexmouth-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Cyclone Damage"
        title="Cyclone Damage Restoration Exmouth"
        subtitle="IICRC-certified contractors responding to Cyclone Narelle across Exmouth and the North West Cape. DRFA declared zone — pre-positioned contractors for immediate post-clearance response. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-10"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Exmouth' },
        ]}
        sections={[
          {
            heading: 'Exmouth and Cyclone Narelle — Direct Impact Zone',
            body: (
              <>
                <p>
                  The Shire of Exmouth is one of six shires declared under the WA Disaster Recovery Funding
                  Arrangements (DRFA) for Cyclone Narelle 2026. The North West Cape geography creates a
                  funnel effect for Gascoyne-approaching cyclones, concentrating wind and surge energy along
                  the peninsula.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Ningaloo Reef coastline means storm surge affects low-lying areas rapidly. Learmonth
                  RAAF base, located approximately 35 km south of Exmouth township, provides critical weather
                  observation data for the region and is the primary ATIS reference for North West Cape
                  conditions during cyclone events.
                </p>
              </>
            ),
          },
          {
            heading: 'Government Assistance \u2014 Cyclone Narelle (Activated 10 April 2026)',
            body: (
              <>
                <p>
                  <strong>Australian Government Disaster Recovery Payment (AGDRP)</strong> has been activated
                  for eligible Exmouth LGA communities as of 10 April 2026, 2pm AWST.
                </p>
                <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '0.5rem', padding: '1rem', margin: '1rem 0' }}>
                  <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    AGDRP Payment Amounts
                  </p>
                  <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                    <li style={{ marginBottom: '0.375rem' }}><strong>$1,000</strong> per eligible adult</li>
                    <li><strong>$400</strong> per eligible child</li>
                  </ul>
                </div>
                <p style={{ marginTop: '0.75rem' }}>
                  <strong>Eligible communities in the Exmouth LGA:</strong> Learmonth, North West Cape.
                </p>
                <p style={{ marginTop: '0.75rem' }}>
                  <strong>How to claim:</strong> Claim via{' '}
                  <a href="https://www.servicesaustralia.gov.au" target="_blank" rel="noopener noreferrer">
                    myGov / Services Australia
                  </a>{' '}
                  or call the Emergency Info Line on <strong>180 22 66</strong>.
                  Additional information:{' '}
                  <a href="https://nema.gov.au/our-work/disaster-recovery/disaster-recovery-payments" target="_blank" rel="noopener noreferrer">
                    nema.gov.au
                  </a>.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>WA Premier&apos;s Disaster Relief Payment</strong> is also available for
                  owner-occupiers and tenants with eligible damage:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>$4,000</strong> for owner-occupiers with destroyed or severely damaged properties
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>$2,000</strong> for eligible tenants
                  </li>
                  <li>
                    Apply via DFES SmartyGrants &mdash; WA Disaster Relief Hotline:{' '}
                    <strong>1800 032 965</strong>
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  <strong>ARPC Declared Cyclone Event:</strong> Cyclone Narelle has been confirmed as a
                  declared event under the ARPC Cyclone Reinsurance Pool. Lodge your insurance claim as
                  &lsquo;cyclone&rsquo; to ensure correct ARPC pool processing.
                </p>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#4B5563' }}>
                  Check eligibility and current activation status at official sources before applying:{' '}
                  <a href="https://www.servicesaustralia.gov.au" target="_blank" rel="noopener noreferrer">servicesaustralia.gov.au</a>,{' '}
                  <a href="https://nema.gov.au/our-work/disaster-recovery/disaster-recovery-payments" target="_blank" rel="noopener noreferrer">nema.gov.au</a>,{' '}
                  <a href="https://www.disaster.wa.gov.au" target="_blank" rel="noopener noreferrer">disaster.wa.gov.au</a>.
                </p>
                <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#6B7280' }}>
                  NRPG collects your contact and property details to coordinate contractor matching.
                  See our <a href="/privacy-policy">Privacy Policy</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'What Cyclone Narelle Did to Exmouth Properties',
            body: (
              <>
                <p>
                  The DRFA declaration for Exmouth confirms government recognition of significant property
                  damage from Cyclone Narelle. The WA Premier&apos;s Disaster Relief Payment is available for
                  Exmouth residents with severely damaged or destroyed properties.
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>NRPG is coordinating availability across all 6 DRFA-declared shires</strong> — Exmouth lodgements
                    are in the priority dispatch queue.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Financial assistance available:</strong> AGDRP ($1,000/adult, $400/child via myGov) plus
                    WA Premier&apos;s Relief ($4,000 owner-occupiers / $2,000 tenants). Hotline: 1800 032 965.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Lodge now to secure your position</strong> — DRFA-declared events generate
                    high lodgement volume; early lodgement ensures earlier contractor dispatch.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>NRPG documentation support</strong> is available for both insurance claims
                    and WA government grant applications.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Exmouth and North West Cape Areas Covered',
            body: (
              <>
                <p>
                  <strong>Exmouth township:</strong> Exmouth CBD, residential streets, Exmouth Caravan Park precinct
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Exmouth Marina precinct:</strong> Exmouth Marina, Bundegi Beach, Tantabiddi boat ramp
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>North West Cape pastoral stations:</strong> Pastoral properties across the Cape Range and surrounding areas
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Learmonth:</strong> Learmonth RAAF Base residential areas, Learmonth township
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Coral Bay (Shire of Carnarvon):</strong> Coral Bay resort precinct and residential areas (cross-coverage with Carnarvon LGA)
                </p>
              </>
            ),
          },
          {
            heading: 'WA Government Assistance \u2014 Cyclone Narelle',
            body: (
              <>
                <p>
                  The WA Government has activated DRFA for six shires affected by Cyclone Narelle 2026,
                  including the Shire of Exmouth. The following assistance is available:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>WA Premier&apos;s Disaster Relief Payment:</strong> $4,000 for owner-occupiers with
                    destroyed or severely damaged properties; $2,000 for eligible tenants. Apply via DFES SmartyGrants.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>DRFA Community Recovery Support:</strong> Additional recovery grants
                    may be available through the WA Department of Communities.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>WA Recovery hotline:</strong> 1800 032 965 — available for assistance
                    applications and recovery information.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>NRPG documentation support:</strong> NRPG provides IICRC-certified
                    damage documentation packs that support both insurance claims and government
                    grant applications.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Exmouth in the Cyclone Narelle DRFA declaration?',
            answer: 'Yes \u2014 the Shire of Exmouth is one of the 6 shires declared under the WA Disaster Recovery Funding Arrangements (DRFA) for Cyclone Narelle 2026. The WA Premier\u2019s Disaster Relief Payment is available for Exmouth properties that are severely damaged or destroyed. Contact the WA Recovery hotline on 1800 032 965 or lodge at disasterrecovery.com.au/claim.',
          },
          {
            question: 'What financial assistance is available for Cyclone Narelle damage in Exmouth?',
            answer: 'The Australian Government Disaster Recovery Payment (AGDRP) was activated on 10 April 2026 for eligible Exmouth LGA communities including Learmonth and North West Cape. The AGDRP provides $1,000 per eligible adult and $400 per eligible child. Claim via myGov at servicesaustralia.gov.au or call 180 22 66. The WA Premier\u2019s Disaster Relief Payment provides $4,000 for owner-occupiers with destroyed or severely damaged properties and $2,000 for tenants, available via DFES SmartyGrants. WA Recovery hotline: 1800 032 965. Check eligibility at official sources before applying.',
          },
          {
            question: 'Does ARPC cover Exmouth cyclone claims?',
            answer: 'Yes \u2014 Exmouth (21.9\u00b0S) is north of the Tropic of Capricorn (23.5\u00b0S). All home building policies covering properties north of the Tropic in WA have cyclone coverage processed through the ARPC Cyclone Reinsurance Pool. Cyclone Narelle has been confirmed as an ARPC Declared Cyclone Event. Lodge your claim as \u2018cyclone\u2019 to ensure correct ARPC pool processing.',
          },
          {
            question: 'How remote is Exmouth and how does this affect restoration response time?',
            answer: 'Exmouth is approximately 1,270 km from Perth by road. NRPG mobilises local and regional WA contractors to reduce response times. For major declared events like Cyclone Narelle, NRPG pre-positions contractors in the Gascoyne region ahead of peak impact, allowing faster post-clearance dispatch to Exmouth and surrounding North West Cape communities.',
          },
        ]}
        relatedGuides={[
          { title: 'Cyclone Narelle WA Recovery', href: '/events/cyclone-narelle-western-australia-2026', description: 'Real-time Cyclone Narelle information and 24/7 claim lodgement for WA.' },
          { title: 'Cyclone Insurance Claim Process', href: '/guides/insurance/cyclone-insurance-claim-process', description: 'Step-by-step guide to lodging a cyclone insurance claim in WA.' },
          { title: 'Cyclone Damage Restoration Carnarvon', href: '/cyclone-damage-restoration-carnarvon', description: 'Cyclone Narelle restoration across Carnarvon and the Gascoyne.' },
        ]}
        cta={{ text: 'Lodge Narelle Claim \u2014 Exmouth', href: '/claim' }}
      />
    </>
  );
}
