import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Brisbane | Hail, Wind & Roof Damage 24/7',
  description: 'Emergency storm damage restoration across Brisbane. IICRC-certified contractors for wind damage, hail, roof repairs, and structural make-safe. Ex-TC Alfred recovery support. Lodge your claim 24/7.',
  keywords: 'storm damage restoration brisbane, storm damage brisbane, hail damage brisbane, roof damage brisbane, wind damage brisbane, alfred storm damage brisbane, storm damage repair brisbane',
  openGraph: {
    title: 'Storm Damage Restoration Brisbane | Hail, Wind & Roof Damage 24/7',
    description: 'Emergency storm damage restoration across Brisbane. IICRC-certified contractors for wind damage, hail, roof repairs, and structural make-safe. Ex-TC Alfred recovery support. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Brisbane')}&service=storm-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-brisbane`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-brisbane/#localbusiness`,
  name: `${NAP.name} Brisbane`,
  url: `${NAP.url}/storm-damage-restoration-brisbane`,
  description: '24/7 emergency storm damage restoration across Brisbane. IICRC-certified contractor network for hail damage, wind damage, roof repairs, and structural make-safe. Ex-TC Alfred recovery support available.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Brisbane', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Brisbane', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Storm Damage Restoration Brisbane',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Brisbane' },
  serviceType: 'Storm Damage Restoration',
  description: 'Professional storm damage restoration across Brisbane including emergency make-safe, roof tarping, hail damage repair, structural restoration, and full insurance documentation. Ex-TC Alfred recovery support.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is my Alfred storm damage claim still active?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 storm damage claims from Alfred can still be lodged or supplemented if you have undiscovered damage or an underpaid settlement. The PERILS final loss confirmation of AU$1.877 billion does not close individual claim windows. NRPG provides IICRC-certified scope documentation for supplementary lodgement and AFCA escalation.' },
    },
    {
      '@type': 'Question',
      name: 'Does Brisbane home insurance cover hail damage?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 hail damage to roofing, guttering, skylights, and cladding is covered under the storm damage provision of most standard Australian home insurance policies. Lodge promptly \u2014 delayed lodgement can complicate causation arguments if subsequent weather events occur. Photograph all hail impact points before any cleanup.' },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between storm damage and flood damage for Brisbane insurance claims?',
      acceptedAnswer: { '@type': 'Answer', text: 'Storm damage covers wind-driven structural failure and water entering through breached building elements. Flood damage covers inundation from external water bodies (Brisbane River, Kedron Brook, Oxley Creek). Most standard policies cover storm; flood requires a specific extension. Lodge storm wind damage and storm water ingress separately from any flood component.' },
    },
    {
      '@type': 'Question',
      name: 'How quickly can NRPG respond to roof damage in Brisbane?',
      acceptedAnswer: { '@type': 'Answer', text: 'As soon as emergency services clear the area for emergency make-safe (roof tarping, temporary boarding) following storm events. Structural repairs are scheduled based on insurer approval and contractor availability. Lodge at disasterrecovery.com.au/claim for immediate dispatch matching.' },
    },
  ],
};

export default function StormDamageRestorationBrisbanePage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="sdrbne-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrbne-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="sdrbne-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Brisbane"
        subtitle="Emergency storm damage restoration across all Brisbane suburbs. Wind damage, hail, roof failure, and structural make-safe. IICRC-certified contractors, priority response. Ex-TC Alfred recovery support available."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Brisbane' },
        ]}
        sections={[
          {
            heading: "Brisbane's Storm Damage Risk Profile",
            body: (
              <>
                <p>
                  Brisbane sits in a subtropical climate zone that produces severe storm seasons annually. Hail events —
                  particularly the &ldquo;hail alleys&rdquo; that track from the D&apos;Aguilar Range through the northern and
                  western suburbs — generate some of the highest per-storm insurance losses in Australia. The ICA&apos;s data
                  consistently identifies Brisbane as one of the top three cities for hail-related insurance claims.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  In addition to hail, sub-tropical low and ex-tropical cyclone systems (such as Ex-TC Alfred in March 2026)
                  generate destructive wind events that cause roof sheeting loss, fence collapse, structural breaches, and
                  fallen trees.
                </p>
              </>
            ),
          },
          {
            heading: 'Ex-TC Alfred Storm Damage — Brisbane Recovery',
            body: (
              <>
                <p>
                  Ex-Tropical Cyclone Alfred made landfall near the Gold Coast&ndash;Tweed corridor in March 2026, generating
                  sustained gale-force winds across Southeast Queensland. Brisbane recorded wind gusts exceeding 100 km/h in
                  exposed suburbs, causing widespread roof damage, fence losses, and tree falls. The ICA declared Alfred a
                  catastrophe event, with over 132,000 claims across Queensland and northern NSW. PERILS confirmed a final
                  insured loss of AU$1.877 billion.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Many Brisbane properties still have outstanding storm damage including:
                </p>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Partial roof repairs (storm strips replacing full sheeting)</li>
                  <li style={{ marginBottom: '0.5rem' }}>Unresolved structural engineer sign-offs</li>
                  <li style={{ marginBottom: '0.5rem' }}>Insurer delays on disputed make-safe scopes</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  NRPG can step in at any stage of an Alfred storm damage claim.
                </p>
              </>
            ),
          },
          {
            heading: 'Storm Damage Restoration vs Water Damage — What\u2019s Covered',
            body: (
              <>
                <p>
                  Storm damage and water damage are distinct perils under most home insurance policies, though they frequently
                  co-occur in a single event.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Storm damage covers:</strong>
                </p>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Wind-driven structural failures (roof sheeting, fencing, windows, wall cladding)</li>
                  <li style={{ marginBottom: '0.5rem' }}>Hail impact damage to roofing, guttering, skylights, and cladding</li>
                  <li style={{ marginBottom: '0.5rem' }}>Tree fall and debris impact</li>
                  <li style={{ marginBottom: '0.5rem' }}>Falling objects</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Water damage arising from storm-breached building elements (water entering through a damaged roof) is treated
                  as storm-related water ingress and covered under storm provisions. Flood (water from external sources such as
                  rivers or overland flow) requires a separate flood extension. Lodge storm wind damage and storm water ingress
                  as separate line items to capture the full scope.
                </p>
              </>
            ),
          },
          {
            heading: 'Brisbane Suburbs We Cover',
            body: (
              <>
                <p>priority response across all Brisbane suburbs:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner City/South Bank:</strong> Brisbane CBD, South Brisbane, Kangaroo Point, Fortitude Valley, New Farm, Newstead
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner North:</strong> Ashgrove, The Gap, Keperra, Mitchelton, Red Hill, Kelvin Grove, Paddington, Newmarket
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner South:</strong> West End, Highgate Hill, Moorooka, Rocklea, Yeronga, Annerley, Greenslopes
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern:</strong> Bulimba, Hawthorne, Balmoral, Morningside, Camp Hill, Coorparoo, Norman Park
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western:</strong> Toowong, Indooroopilly, St Lucia, Graceville, Sherwood, Corinda, Oxley
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern:</strong> Chermside, Aspley, Kedron, Stafford, Nundah, Northgate, Zillmere
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern:</strong> Eight Mile Plains, Sunnybank, Runcorn, Calamvale, Parkinson, Stretton
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge your claim at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate contractor matching
                  across any Brisbane suburb.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is my Alfred storm damage claim still active?',
            answer: 'Yes — storm damage claims from Alfred can still be lodged or supplemented if you have undiscovered damage or an underpaid settlement. The PERILS final loss confirmation of AU$1.877 billion does not close individual claim windows. NRPG provides IICRC-certified scope documentation for supplementary lodgement and AFCA escalation.',
          },
          {
            question: 'Does Brisbane home insurance cover hail damage?',
            answer: 'Yes — hail damage to roofing, guttering, skylights, and cladding is covered under the storm damage provision of most standard Australian home insurance policies. Lodge promptly — delayed lodgement can complicate causation arguments if subsequent weather events occur. Photograph all hail impact points before any cleanup.',
          },
          {
            question: 'What is the difference between storm damage and flood damage for Brisbane insurance claims?',
            answer: 'Storm damage covers wind-driven structural failure and water entering through breached building elements. Flood damage covers inundation from external water bodies (Brisbane River, Kedron Brook, Oxley Creek). Most standard policies cover storm; flood requires a specific extension. Lodge storm wind damage and storm water ingress separately from any flood component.',
          },
          {
            question: 'How quickly can NRPG respond to roof damage in Brisbane?',
            answer: 'As soon as emergency services clear the area for emergency make-safe (roof tarping, temporary boarding) following storm events. Structural repairs are scheduled based on insurer approval and contractor availability. Lodge at disasterrecovery.com.au/claim for immediate dispatch matching.',
          },
        ]}
        relatedGuides={[
          { title: 'Water Damage Restoration Brisbane', href: '/water-damage-restoration-brisbane', description: 'IICRC-certified water damage restoration across all Brisbane suburbs.' },
          { title: 'Ex-TC Alfred Recovery — Disputed Claims', href: '/events/ex-cyclone-alfred-recovery', description: 'Alfred claim still open? NRPG can escalate at any stage.' },
          { title: 'Storm Damage Restoration Gold Coast', href: '/storm-damage-restoration-gold-coast', description: 'Emergency storm damage restoration across the Gold Coast.' },
          { title: 'Mould After Storm Damage', href: '/services/mould-remediation', description: 'Act within 48 hours to prevent mould after storm water ingress.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
