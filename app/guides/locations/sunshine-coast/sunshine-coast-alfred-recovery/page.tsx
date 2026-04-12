/**
 * Sunshine Coast Ex-TC Alfred Recovery Guide
 *
 * Ex-TC Alfred: 132,000+ ICA claims, AU$1.877B final insured loss (PERILS, 13 Apr 2026).
 * Sunshine Coast LGA — Noosa, Maroochydore, Caloundra — was on Alfred's approach path.
 * High-value coastal properties, significant hinterland flooding, disputed claims.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sunshine Coast Ex-TC Alfred Recovery — Disputed & Underpaid Claims Guide 2026',
  description:
    'Ex-TC Alfred recovery guide for Sunshine Coast property owners. Noosa, Maroochydore, and Caloundra Alfred claims — disputed settlements, IICRC documentation for AFCA escalation, and NRPG contractor support.',
  keywords:
    'sunshine coast alfred recovery, ex cyclone alfred sunshine coast, noosa alfred recovery, maroochydore alfred claim, sunshine coast alfred underpaid 2026',
  alternates: {
    canonical: `${NAP.url}/guides/locations/sunshine-coast/sunshine-coast-alfred-recovery`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Sunshine Coast`,
  '@id': `${NAP.url}/#organization-sunshine-coast`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'Place', name: 'Sunshine Coast' },
    { '@type': 'Place', name: 'Noosa' },
    { '@type': 'State', name: 'Queensland' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Sunshine Coast Ex-TC Alfred Recovery Services',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Sunshine Coast Ex-TC Alfred Recovery — Claim Documentation and Restoration',
  provider: {
    '@type': 'Organization',
    name: `${NAP.name} Sunshine Coast`,
    '@id': `${NAP.url}/#organization-sunshine-coast`,
  },
  areaServed: { '@type': 'Place', name: 'Sunshine Coast' },
  serviceType: 'Storm and Cyclone Damage Restoration',
  description:
    'Post-Alfred restoration documentation and AFCA escalation support for Sunshine Coast property owners with disputed, underpaid, or stalled Ex-TC Alfred insurance claims.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'My Sunshine Coast Alfred claim was settled but my repairs are not complete — what can I do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your claim has been settled but the payment does not cover the full cost of restoring your property to pre-loss standard, you can dispute the settlement via AFCA. Lodge your complaint with your insurer first, setting out specifically which repair items are not covered by the settlement. If unresolved within 45 days, escalate to AFCA. NRPG provides an independent IICRC scope of works documenting the full repair cost, which can be submitted as supporting evidence.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Pool apply to Sunshine Coast Alfred claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Sunshine Coast (26.6°S) sits at the southern edge of the ARPC Cyclone Reinsurance Pool coverage zone. Whether the pool applies to a specific Sunshine Coast property depends on the property\'s exact location and postcode. Ex-TC Alfred made landfall as an ex-tropical system — if your insurer has applied cyclone pool provisions to deny or limit your claim, and you believe this is incorrect for your postcode, escalate to AFCA with your property address for a formal determination.',
      },
    },
    {
      '@type': 'Question',
      name: 'My Sunshine Coast rental property was damaged by Alfred — how does the claim work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rental properties have the same claim rights as owner-occupied properties for building damage. Landlords claim building damage under their landlord insurance or home and contents policy. Loss of rent is a separate benefit under landlord insurance, covering the period during which the property is uninhabitable due to the insured event. Lodge building damage and loss of rent as separate line items within the same claim. Document the damage before any temporary repairs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Alfred storm damage to my Noosa holiday home covered if I live interstate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — home insurance covers the insured property regardless of your primary residence. However, holiday home policies may have specific conditions around vacancy (periods the home is unoccupied) and regular inspection requirements. If your Noosa holiday home was unoccupied at the time of Alfred, check your PDS for vacancy clause conditions. If your insurer is attempting to deny the claim on vacancy grounds and the clause does not apply in the circumstances, dispute via AFCA.',
      },
    },
  ],
};

export default function SunshineCoastAlfredRecoveryPage() {
  return (
    <>
      <Script
        id="scalr-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="scalr-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="scalr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Sunshine Coast Location Guide"
        title="Sunshine Coast Ex-TC Alfred Recovery — Disputed &amp; Underpaid Claims Guide"
        subtitle="Ex-TC Alfred impacted Sunshine Coast properties across Noosa, Maroochydore, and Caloundra. For property owners with stalled, disputed, or underpaid Alfred claims — IICRC documentation, ARPC pool status analysis, and AFCA escalation support."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-12"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Sunshine Coast', href: '/guides/locations/sunshine-coast' },
          { label: 'Ex-TC Alfred Recovery' },
        ]}
        cta={{ text: 'Get Alfred Claim Support — Sunshine Coast', href: '/claim' }}
        sections={[
          {
            heading: 'Ex-TC Alfred and the Sunshine Coast — What Happened',
            body: (
              <div className="space-y-4">
                <p>
                  Ex-Tropical Cyclone Alfred made landfall on the SE Queensland coast on 8&ndash;9 March 2025, with the Sunshine Coast sitting directly in Alfred&rsquo;s approach path. The Sunshine Coast Regional Council area — including Noosa, Maroochydore, Caloundra, and the Sunshine Coast Hinterland — sustained significant damage from Alfred&rsquo;s destructive winds, extreme rainfall, and coastal storm surge along the Coral Sea coastline.
                </p>
                <p>
                  <strong>Noosa and the northern Sunshine Coast</strong> experienced Alfred&rsquo;s most direct coastal impacts. The Noosa River system, Noosa Main Beach, and the low-lying Noosaville and Tewantin areas experienced storm surge and river flooding. High-value beachfront properties in Sunshine Beach, Noosa Heads, and Peregian Beach sustained significant wind and water damage.
                </p>
                <p>
                  <strong>Maroochydore and the Maroochy River</strong> catchment was affected by combined storm and river flooding. The Cotton Tree and Maroochydore CBD area experienced inundation from both coastal storm surge and Maroochy River rise. Properties in Bli Bli, Yandina, and Eudlo Creek catchment areas were affected by hinterland flooding from Alfred&rsquo;s rainfall.
                </p>
                <p>
                  <strong>Caloundra and Pumicestone Passage</strong> — waterfront properties along the Pumicestone Passage and the western Sunshine Coast facing Moreton Bay experienced storm surge and estuarine flooding from Alfred&rsquo;s passage. Battery Hill, Pelican Waters, and Currimundi properties were particularly affected.
                </p>
                <p>
                  <strong>Sunshine Coast Hinterland</strong> — Maleny, Montville, and the Glass House Mountains — received extreme rainfall from Alfred&rsquo;s slow movement, driving landslips, flash flooding, and road damage that delayed insurer access and assessment.
                </p>
              </div>
            ),
          },
          {
            heading: 'Sunshine Coast Alfred Claims — Common Dispute Scenarios',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Sunshine Coast Alfred claims have a distinct dispute profile reflecting the mix of high-value coastal properties, holiday homes, and hinterland rural properties in the LGA.
                </p>
                <p>
                  <strong>High-value coastal property underassessment:</strong> Noosa and Sunshine Beach have some of the highest property values in Queensland. Insurance assessments for high-value properties are more likely to be contested on quantum — the cost of like-for-like restoration using the same materials and finishes as the pre-loss property. Desktop assessments for high-value Noosa properties have in some cases used cost estimates that would not fund genuine like-for-like restoration. NRPG&rsquo;s inspection report documents the materials and finishes required to restore to pre-loss standard.
                </p>
                <p>
                  <strong>Holiday home vacancy clause disputes:</strong> A significant proportion of Sunshine Coast properties are holiday homes or investment properties. Insurers have disputed Alfred claims for properties that were unoccupied at the time of the event, citing vacancy clauses. Policy vacancy clauses vary — many do not apply to holiday homes that are regularly used, and some apply only after a specified continuous vacancy period (typically 60 or 90 days). If your insurer has denied your Alfred claim on vacancy grounds, review your PDS clause carefully and dispute via AFCA if the clause does not apply.
                </p>
                <p>
                  <strong>Hinterland access and delayed assessments:</strong> Alfred&rsquo;s extreme hinterland rainfall caused road damage and access difficulties across Maleny, Montville, Mapleton, and the Glass House Mountains. Hinterland properties experienced delayed insurer assessments due to access — delays that in some cases allowed secondary damage to progress beyond what was present at the time of the event. If your hinterland claim was assessed late and the assessment did not capture damage that progressed during the access delay, this can be grounds for a supplementary claim.
                </p>
                <p>
                  <strong>Strata holiday let disputes:</strong> Sunshine Coast strata properties — particularly managed holiday let apartment complexes in Maroochydore, Mooloolaba, and Noosa — have faced coordinated claim disputes between individual lot owners, body corporate insurers, and letting agents. The scope of which damage falls under which policy requires careful documentation. NRPG provides inspection and scope of works documentation that clearly attributes each damage item to its relevant coverage area.
                </p>
              </div>
            ),
          },
          {
            heading: 'ARPC Cyclone Pool Status — Sunshine Coast',
            body: (
              <div className="space-y-4">
                <p>
                  The ARPC Cyclone Reinsurance Pool applies to properties in cyclone-prone regions — generally understood as Queensland properties north of approximately 26&deg;S. The Sunshine Coast sits at 26.6&deg;S, making it a borderline case for ARPC pool application.
                </p>
                <p>
                  <strong>Whether the ARPC pool applies to your Sunshine Coast property</strong> depends on your specific postcode and your insurer&rsquo;s pool participation arrangement. Properties in Noosa (postcode 4567, 26.4&deg;S) are more likely to be in the pool zone than those in Caloundra (postcode 4551, 26.8&deg;S). Your insurer can confirm whether the ARPC pool applies to your specific policy.
                </p>
                <p>
                  <strong>If your insurer applies pool provisions to deny your claim:</strong> The ARPC Cyclone Pool covers cyclone damage and associated water ingress. Ex-TC Alfred made landfall as an ex-tropical system, not an active named cyclone, which affects how pool provisions are applied. If your insurer is using cyclone pool provisions in a way that reduces your coverage compared to what you would receive under standard storm cover, escalate to AFCA for a formal determination.
                </p>
                <p>
                  <strong>If your insurer does not apply pool provisions:</strong> Standard home insurance storm cover applies. This is typically broader coverage for ex-cyclone systems at Sunshine Coast latitudes. Your claim rights are the same as any storm claim under the ICA catastrophe protocols.
                </p>
              </div>
            ),
          },
          {
            heading: 'Recovery Next Steps — Sunshine Coast Alfred Claims',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  For Sunshine Coast property owners still dealing with Alfred claim issues in April 2026, here is the recommended action sequence.
                </p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Document current property condition.</strong> Photograph all current damage, including any that has progressed since the original assessment. Moisture conditions, mould growth, or structural deterioration that post-dates the original assessment but originated from Alfred water ingress should be documented now before further deterioration.
                  </li>
                  <li>
                    <strong>Commission an independent IICRC inspection.</strong> If your settlement does not reflect the full damage, or your insurer&rsquo;s assessment was by desktop, an independent NRPG inspection report provides the in-person technical evidence that AFCA and re-assessment requests require.
                  </li>
                  <li>
                    <strong>Raise a formal complaint with your insurer.</strong> Clearly state what decision you are disputing and why, what evidence you have, and what outcome you are seeking. Send in writing with read receipt. Your insurer must respond within 45 days under the ICA code.
                  </li>
                  <li>
                    <strong>Lodge with AFCA if unresolved.</strong> Lodge at afca.org.au. AFCA is free, handles quantum disputes and coverage disputes, and is binding on the insurer. Attach all correspondence, your NRPG inspection report, and independent repair quotes.
                  </li>
                </ol>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'My Sunshine Coast Alfred claim was settled but my repairs are not complete — what can I do?',
            answer:
              'If the settlement does not cover the full cost of pre-loss restoration, dispute via AFCA. Lodge your complaint with your insurer first, then escalate after 45 days without resolution. NRPG provides an independent IICRC scope of works to support the AFCA submission.',
          },
          {
            question: 'Does the ARPC Cyclone Pool apply to Sunshine Coast Alfred claims?',
            answer:
              'The Sunshine Coast (26.6°S) is at the pool zone boundary. Whether it applies depends on your specific postcode. If your insurer applies pool provisions in a way that reduces your coverage, escalate to AFCA for a formal determination.',
          },
          {
            question: 'My Sunshine Coast rental property was damaged by Alfred — how does the claim work?',
            answer:
              'Landlords claim building damage under their landlord or home insurance policy. Loss of rent is a separate benefit. Lodge building damage and loss of rent as separate line items. Document all damage before temporary repairs.',
          },
          {
            question: 'Is Alfred storm damage to my Noosa holiday home covered if I live interstate?',
            answer:
              'Yes — home insurance covers the insured property regardless of your primary residence. Check your PDS for vacancy clause conditions if the home was unoccupied. If your insurer denies on vacancy grounds and the clause does not apply, dispute via AFCA.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Ex-TC Alfred Disputed & Late Claims',
            href: '/events/ex-cyclone-alfred-recovery',
            description:
              'National recovery hub for Ex-TC Alfred disputed and underpaid insurance claims — AFCA pathways and IICRC documentation support.',
          },
          {
            title: 'Gold Coast Ex-TC Alfred Recovery',
            href: '/guides/locations/gold-coast/gold-coast-alfred-recovery',
            description:
              'Ex-TC Alfred disputed claims guide for Gold Coast property owners.',
          },
          {
            title: 'Brisbane Ex-TC Alfred Recovery',
            href: '/guides/locations/brisbane/brisbane-alfred-recovery',
            description:
              'Ex-TC Alfred disputed claims guide for Brisbane property owners.',
          },
          {
            title: 'Sunshine Coast Hotel Restoration',
            href: '/guides/locations/sunshine-coast/sunshine-coast-hotel-restoration',
            description:
              'Sunshine Coast hotel and commercial property restoration after Alfred.',
          },
        ]}
      />
    </>
  );
}
