import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * Water Damage Restoration Ipswich
 *
 * Created: 10 April 2026
 * Context: Ipswich is one of Australia's most flood-prone cities. Bremer River and Brisbane
 * River confluence, 2011 and 2022 major floods, ongoing Ex-TC Alfred recovery.
 * ACL s18 compliant.
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Ipswich | 24/7 IICRC Certified',
  description: 'Professional water damage restoration across Ipswich and the Brisbane Valley. IICRC S500:2025 certified. priority response. Ex-TC Alfred and Bremer River flood recovery. Lodge 24/7.',
  keywords: 'water damage restoration ipswich, water damage ipswich, flood damage ipswich, bremer river flood, burst pipe ipswich, IICRC ipswich, alfred water damage ipswich, springfield water damage',
  openGraph: {
    title: 'Water Damage Restoration Ipswich | 24/7 Emergency Response',
    description: 'Emergency water damage restoration across Ipswich and the Brisbane Valley. IICRC S500:2025 certified. priority response. Alfred and Bremer River flood recovery.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Ipswich')}&service=water-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-ipswich`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-ipswich/#localbusiness`,
  name: `${NAP.name} Ipswich`,
  url: `${NAP.url}/water-damage-restoration-ipswich`,
  description: 'IICRC-certified water damage restoration contractors serving Ipswich and the Brisbane Valley 24/7. Water extraction, structural drying, mould prevention, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Ipswich', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Ipswich', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Water Damage Restoration Ipswich',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Ipswich' },
  serviceType: 'Water Damage Restoration',
  description: 'Professional water damage restoration in Ipswich: emergency water extraction, structural drying to IICRC S500:2025, mould prevention, contents protection, and full insurance claim documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly should water damage be treated in Ipswich?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Within 24\u201348 hours. Ipswich\u2019s subtropical climate and proximity to the Bremer River means that water-affected properties can develop mould rapidly. Properties that have experienced repeated flooding are particularly vulnerable as residual moisture in wall framing and subfloor accelerates colonisation. Lodge at disasterrecovery.com.au/claim for priority emergency dispatch.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is my Ex-TC Alfred flood damage still claimable in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes \u2014 if your property was affected by Bremer River or overland flooding during the March 2026 Alfred event, your claim can still be lodged or supplemented. Most insurers do not impose strict time limits when damage can be demonstrated to have occurred during a declared catastrophe. Secondary mould and incomplete drying are common post-Alfred issues in Ipswich and are separately claimable. NRPG provides full documentation for late and supplementary lodgements.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between water damage and flood damage for Ipswich insurance claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Water damage typically refers to sudden water loss from internal sources (burst pipes, appliance overflow) or storm water entering through breached building elements. Flood damage refers specifically to inundation from external water bodies \u2014 in Ipswich, this primarily means the Bremer River and Brisbane River. Standard home insurance policies usually cover storm water ingress but require a specific flood extension for river inundation. Given Ipswich\u2019s flood history, many properties carry flood cover. NRPG assists with correct damage categorisation to maximise your claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does water damage restoration cost in Ipswich?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Water damage restoration in Ipswich ranges from $2,500 for minor Category 1 losses up to $55,000 or more for severe Category 3 flood inundation. Properties affected by multiple flood events with mould remediation requirements can reach $20,000\u2013$80,000 or more. The Disaster Recovery platform charges a $2,750 initial commitment to begin emergency works.',
      },
    },
  ],
};

export default function WaterDamageRestorationIpswichPage() {
  return (
    <>
      <Script id="wdrips-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="wdrips-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="wdrips-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Ipswich"
        subtitle="Emergency water damage restoration across Ipswich and the Brisbane Valley. IICRC S500:2025 certified technicians. priority response, 24 hours a day. Ex-TC Alfred and Bremer River flood recovery support."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Ipswich' },
        ]}
        sections={[
          {
            heading: "Ipswich Water Damage Risk \u2014 Australia\u2019s Most Flood-Prone City",
            body: (
              <>
                <p>
                  Ipswich sits at the confluence of the Bremer River and Brisbane River, a geography that has made it
                  one of the most flood-affected cities in Australia. Unlike coastal flood risk driven by storm surge,
                  Ipswich&apos;s flood risk is driven by inland catchment dynamics: heavy rainfall across the
                  Queensland interior backs water up through the Bremer system, inundating low-lying suburbs that
                  can sit well below the peak flood level of the river.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The scale of this risk is well documented. In January 2011, approximately 74% of Ipswich was
                  inundated, with peak flood heights reaching 19.46 metres at the Ipswich gauge. The January 2022
                  flood event produced another major inundation across many of the same suburbs. The cumulative
                  impact of repeated flooding on Ipswich housing stock is significant: ageing inner-city homes
                  in North Ipswich, Woodend, and Bundamba have experienced multiple flood events, with residual
                  moisture, subfloor contamination, and structural weakening compounding with each event.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Rapid suburban growth in flood-adjacent areas including Ripley, Springfield, and the Ipswich
                  western corridor has added tens of thousands of properties to the catchment, many of which were
                  developed after the last major flood mapping review.
                </p>
              </>
            ),
          },
          {
            heading: 'Ex-TC Alfred \u2014 Ipswich Recovery',
            body: (
              <>
                <p>
                  Ex-Tropical Cyclone Alfred in March 2026 produced significant Bremer River rises across Ipswich,
                  with multiple suburbs experiencing inundation for the third time since 2011. Many Ipswich
                  properties are still in active recovery from Alfred, with secondary issues presenting weeks
                  after the initial event:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Secondary mould growth:</strong> Properties that were not fully dried within 48 hours
                    of flooding are now presenting mould in wall cavities, subfloor, and ceiling spaces.
                    NRPG performs IICRC-compliant mould remediation with full insurer documentation.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Incomplete drying and residual moisture:</strong> Some properties were partially dried
                    by non-certified operators. NRPG performs post-drying moisture mapping to identify and
                    re-remediate areas that were missed.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Supplementary and late claims:</strong> If your Alfred claim is stalled, underpaid,
                    or you have identified additional damage since lodgement, NRPG supports supplementary
                    claims and escalation to AFCA where insurer response is inadequate.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Water Damage Cost Estimates \u2014 Ipswich 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 1 \u2014 clean water (burst pipe, appliance overflow):</strong> $2,500\u2013$10,000.
                    Water extraction, drying, plasterboard and flooring repair.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 2 \u2014 grey water (storm water ingress):</strong> $4,500\u2013$18,000.
                    Moisture mapping, commercial drying, antimicrobial treatment, structural repairs.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 3 \u2014 black water (Bremer River flood inundation):</strong> $12,000\u2013$55,000+.
                    Decontamination, subfloor treatment, full restoration to pre-loss condition.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Multi-event flood recovery with mould remediation:</strong> $20,000\u2013$80,000+.
                    Project-managed restoration for properties with repeated flood history and compound
                    mould, structural, and contents losses.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Ipswich Suburbs We Cover',
            body: (
              <>
                <p>priority emergency response across Ipswich and the Brisbane Valley:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner Ipswich:</strong> Ipswich CBD, North Ipswich, Woodend, Churchill, Brassall
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western Growth Corridor:</strong> Ripley, Yamanto, Leichhardt, Silkstone
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Suburbs:</strong> Bundamba, Booval, Goodna, Gailes, Wacol
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern Suburbs:</strong> Springfield, Springfield Lakes, Camira, Bellbird Park
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Rural Brisbane Valley:</strong> Rosewood, Marburg, Minden
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly should water damage be treated in Ipswich?',
            answer: "Within 24\u201348 hours. Ipswich\u2019s subtropical climate and proximity to the Bremer River means that water-affected properties can develop mould rapidly. Properties that have experienced repeated flooding are particularly vulnerable as residual moisture in wall framing and subfloor accelerates colonisation. Lodge at disasterrecovery.com.au/claim for priority emergency dispatch.",
          },
          {
            question: 'Is my Ex-TC Alfred flood damage still claimable in 2026?',
            answer: "Yes \u2014 if your property was affected by Bremer River or overland flooding during the March 2026 Alfred event, your claim can still be lodged or supplemented. Most insurers do not impose strict time limits when damage can be demonstrated to have occurred during a declared catastrophe. Secondary mould and incomplete drying are common post-Alfred issues in Ipswich and are separately claimable. NRPG provides full documentation for late and supplementary lodgements.",
          },
          {
            question: 'What is the difference between water damage and flood damage for Ipswich insurance claims?',
            answer: "Water damage typically refers to sudden water loss from internal sources (burst pipes, appliance overflow) or storm water entering through breached building elements. Flood damage refers specifically to inundation from external water bodies \u2014 in Ipswich, this primarily means the Bremer River and Brisbane River. Standard home insurance policies usually cover storm water ingress but require a specific flood extension for river inundation. Given Ipswich\u2019s flood history, many properties carry flood cover. NRPG assists with correct damage categorisation to maximise your claim.",
          },
          {
            question: 'How much does water damage restoration cost in Ipswich?',
            answer: "Water damage restoration in Ipswich ranges from $2,500 for minor Category 1 losses up to $55,000 or more for severe Category 3 flood inundation. Properties affected by multiple flood events with mould remediation requirements can reach $20,000\u2013$80,000 or more. The Disaster Recovery platform charges a $2,750 initial commitment to begin emergency works.",
          },
        ]}
        relatedGuides={[
          { title: 'Flood Damage Restoration Ipswich', href: '/flood-damage-restoration-ipswich', description: 'Specialist flood damage recovery across Ipswich and the Bremer River catchment.' },
          { title: 'Water Damage Restoration Brisbane', href: '/water-damage-restoration-brisbane', description: 'Our Brisbane water damage restoration service.' },
          { title: 'Water Damage Restoration Toowoomba', href: '/water-damage-restoration-toowoomba', description: 'Our Toowoomba water damage restoration service.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
