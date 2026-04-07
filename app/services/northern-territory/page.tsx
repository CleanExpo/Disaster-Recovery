/**
 * Northern Territory State Hub — DR-409
 * Cyclone + tropical storm specialist. Serving Darwin, Alice Springs, Katherine and all NT regions.
 */

import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { AgGuidePageTemplate } from '@/components/antigravity'
import { NAP } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Disaster Recovery Services Northern Territory | 24/7 IICRC-Certified',
  description:
    'IICRC-certified disaster recovery and restoration contractors serving the Northern Territory. Cyclone damage, tropical storm recovery, flood and water damage restoration. Available 24/7 across Darwin, Alice Springs, Katherine and all NT regions.',
  alternates: {
    canonical: `${NAP.url}/services/northern-territory`,
  },
  openGraph: {
    title: 'Disaster Recovery Services Northern Territory | 24/7',
    description:
      'Professional disaster recovery across the Northern Territory. IICRC-certified contractors for cyclone, tropical storm, flood and water damage. Serving Darwin, Alice Springs, Katherine and beyond.',
    url: `${NAP.url}/services/northern-territory`,
    type: 'website',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/services/northern-territory/#localbusiness`,
  name: `${NAP.name} Northern Territory`,
  url: `${NAP.url}/services/northern-territory`,
  description:
    '24/7 disaster recovery and restoration services across the Northern Territory. IICRC-certified contractor network for cyclone damage, tropical storm recovery, flood damage and water damage restoration.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'State',
    name: 'Northern Territory',
    containedInPlace: { '@type': 'Country', name: 'Australia' },
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'NT',
    addressCountry: 'AU',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
}

export default function NorthernTerritoryServicesPage() {
  return (
    <>
      <Script
        id="nt-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <AgGuidePageTemplate
        category="Northern Territory"
        title="Disaster Recovery Services Northern Territory"
        subtitle="IICRC-certified restoration contractors available 24/7 across the Northern Territory. Cyclone and tropical storm specialists serving Darwin, Alice Springs, Katherine and all NT regions."
        gradient="linear-gradient(135deg, #7B1A1A 0%, #B91C1C 100%)"
        icon={<MapPin className="h-10 w-10" />}
        lastReviewed="2026-04-07"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Northern Territory' },
        ]}
        cta={{ text: 'Start Your Claim', href: '/claim' }}
        sections={[
          {
            heading: "The Northern Territory's Disaster Recovery Landscape",
            body: (
              <>
                <p>
                  The Northern Territory experiences some of Australia's most intense tropical weather. The Top
                  End is subject to annual cyclone and monsoonal seasons that bring destructive winds, heavy
                  rainfall and flooding from November through April. Darwin has been directly impacted by major
                  cyclones, and remote communities across the Territory face ongoing exposure to severe tropical
                  weather events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The NT also faces distinct challenges: extreme heat, high humidity, and geographic remoteness
                  all compound the damage and recovery process. Mould can establish rapidly in the tropical
                  climate, and structural drying requires specialist equipment suited to the high-moisture
                  environment. Our IICRC-certified contractors are trained and equipped for NT conditions.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  When a disaster is declared, the NT Government administers financial assistance for eligible
                  property owners. For current disaster declarations and government assistance information,
                  contact the{' '}
                  <a
                    href="https://pfes.nt.gov.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NT Police, Fire and Emergency Services (NTPFES)
                  </a>
                  .
                </p>
              </>
            ),
          },
          {
            heading: 'Core Services Across the Northern Territory',
            background: 'light',
            body: (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1rem',
                }}
              >
                {[
                  {
                    title: 'Cyclone Damage Restoration',
                    href: '/services/cyclone-damage-restoration',
                    desc: 'Full cyclone recovery including emergency tarping, debris removal, structural assessment and reinstatement for Darwin and Top End properties.',
                  },
                  {
                    title: 'Flood Damage Restoration',
                    href: '/services/flood-damage-restoration',
                    desc: 'Emergency water extraction and structural drying for monsoonal flooding events across the NT.',
                  },
                  {
                    title: 'Storm Damage Restoration',
                    href: '/services/storm-damage-restoration',
                    desc: 'Emergency repair and recovery for tropical storm and severe thunderstorm damage across all NT regions.',
                  },
                  {
                    title: 'Water Damage Restoration',
                    href: '/services/water-damage-restoration',
                    desc: '24/7 water extraction and psychrometric drying calibrated for the NT\'s high-humidity tropical climate.',
                  },
                  {
                    title: 'Mould Remediation',
                    href: '/services/mould-remediation',
                    desc: 'IICRC-certified mould assessment, containment and remediation — essential in the NT\'s high-temperature, high-humidity conditions.',
                  },
                  {
                    title: 'Structural Drying',
                    href: '/services/structural-drying',
                    desc: 'Advanced drying systems for post-cyclone and post-flood structural moisture in tropical environments.',
                  },
                  {
                    title: 'Commercial Services',
                    href: '/services/commercial-services',
                    desc: 'Large-scale commercial disaster recovery for NT businesses, government facilities and industrial properties.',
                  },
                  {
                    title: 'Emergency Response',
                    href: '/services/emergency-response',
                    desc: '24/7 emergency response with contractors positioned in Darwin and key NT centres for rapid deployment.',
                  },
                ].map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    style={{
                      display: 'block',
                      padding: '1.25rem',
                      background: 'white',
                      borderRadius: '0.75rem',
                      textDecoration: 'none',
                      border: '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: 'var(--ag-primary-blue, #0052CC)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {s.title}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        color: 'var(--ag-text-muted, #5C6A79)',
                        lineHeight: 1.5,
                      }}
                    >
                      {s.desc}
                    </span>
                  </Link>
                ))}
              </div>
            ),
          },
          {
            heading: 'Northern Territory Regions We Cover',
            body: (
              <>
                <p>
                  Our contractor network covers metropolitan and regional NT, including remote communities.
                  Key coverage areas include:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Greater Darwin</strong> — Darwin CBD, Palmerston, Humpty Doo, Litchfield, Darwin
                    rural area
                  </li>
                  <li>
                    <strong>Katherine Region</strong> — Katherine, Nitmiluk, Victoria Daly, Roper Gulf
                  </li>
                  <li>
                    <strong>Top End East</strong> — East Arnhem, Nhulunbuy, Gove Peninsula
                  </li>
                  <li>
                    <strong>Barkly Region</strong> — Tennant Creek, Barkly Tablelands
                  </li>
                  <li>
                    <strong>Central Australia</strong> — Alice Springs, MacDonnell, Central Desert
                  </li>
                  <li>
                    <strong>Remote Communities</strong> — Available for declared disaster events; contact us
                    to confirm deployment to specific remote locations
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Insurance Claims Support',
            background: 'light',
            body: (
              <>
                <p>
                  Our contractors work directly with all major Australian insurers operating in the Northern
                  Territory. We provide detailed scope of works, photographic evidence, moisture mapping reports
                  and IICRC-standard documentation that insurers require to process claims efficiently.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Disaster Recovery is an independent restoration network — we act on behalf of property
                  owners, not insurers. Our role is to restore your property to its pre-loss condition using
                  certified methods and materials. If your claim has stalled or been disputed, we can assist
                  in coordinating independent assessment and escalation through AFCA.
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <Link
                    href="/claim"
                    style={{
                      display: 'inline-block',
                      padding: '0.875rem 2rem',
                      background: '#B91C1C',
                      color: 'white',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    Start Your Claim Online
                  </Link>
                </div>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Do you cover remote areas of the Northern Territory?',
            answer:
              'Our primary contractor coverage is in Darwin, Palmerston, Katherine and Alice Springs. For remote and very remote NT communities, coverage depends on the nature and scale of the event. For declared disaster events, we can often deploy to remote locations — contact us to discuss your specific location and requirements.',
          },
          {
            question: 'How does the NT tropical climate affect restoration timelines?',
            answer:
              "The Top End's high heat and humidity means mould can establish within 24–48 hours of a water intrusion event. This makes rapid response critical. Our NT contractors use industrial drying equipment calibrated for tropical conditions, and mould assessment is standard practice for all water damage jobs in the Territory.",
          },
          {
            question: 'What if my NT cyclone claim has been delayed or disputed?',
            answer:
              'Cyclone claims in the NT are sometimes affected by the ARPC Cyclone Reinsurance Pool, which can add complexity to how your insurer processes the claim. If your claim has stalled or been underpaid, NRPG can coordinate independent IICRC-certified assessment and escalate with your insurer. You can also escalate to AFCA at no cost if the insurer fails to resolve the dispute.',
          },
        ]}
        relatedGuides={[
          { title: 'Cyclone Damage Restoration', href: '/services/cyclone-damage-restoration' },
          { title: 'Flood Damage Restoration', href: '/services/flood-damage-restoration' },
          { title: 'Storm Damage Restoration', href: '/services/storm-damage-restoration' },
          { title: 'All Services', href: '/services' },
        ]}
      />
    </>
  )
}
