/**
 * Northern NSW Ex-TC Alfred Recovery Guide
 *
 * Ex-TC Alfred: 132,000+ ICA claims, AU$1.877B final insured loss (PERILS, 13 Apr 2026).
 * Northern NSW (Byron Bay, Ballina, Tweed Heads, Lismore) — Alfred's NSW impact zone.
 * 16 declared LGAs across SE QLD + Northern NSW. High dispute rate in coastal NSW areas.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Northern NSW Ex-TC Alfred Recovery — Byron Bay, Ballina & Tweed Claims Guide 2026',
  description:
    'Ex-TC Alfred recovery guide for Northern NSW property owners. Byron Bay, Ballina, Tweed Heads, and Lismore — disputed Alfred claims, NRPG IICRC documentation, and AFCA escalation support for underpaid settlements.',
  keywords:
    'northern nsw alfred recovery, byron bay alfred recovery, ballina alfred claim, tweed heads alfred 2026, lismore alfred recovery, northern nsw cyclone alfred underpaid',
  alternates: {
    canonical: `${NAP.url}/guides/locations/northern-nsw/northern-nsw-alfred-recovery`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Northern NSW`,
  '@id': `${NAP.url}/#organization-northern-nsw`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'Place', name: 'Byron Bay' },
    { '@type': 'Place', name: 'Ballina' },
    { '@type': 'Place', name: 'Tweed Heads' },
    { '@type': 'Place', name: 'Northern New South Wales' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Northern NSW Ex-TC Alfred Recovery Services',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Northern NSW Ex-TC Alfred Recovery — Claim Documentation and Restoration',
  provider: {
    '@type': 'Organization',
    name: `${NAP.name} Northern NSW`,
    '@id': `${NAP.url}/#organization-northern-nsw`,
  },
  areaServed: { '@type': 'Place', name: 'Northern New South Wales' },
  serviceType: 'Storm and Cyclone Damage Restoration',
  description:
    'Post-Alfred restoration documentation and AFCA escalation support for Northern NSW property owners with disputed, underpaid, or stalled Ex-TC Alfred insurance claims.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Pool apply to Northern NSW Alfred claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Northern NSW (Byron Bay 28.6°S, Ballina 28.9°S, Tweed Heads 28.2°S) is south of the ARPC Cyclone Reinsurance Pool coverage zone. Northern NSW Alfred claims are lodged under standard home insurance storm and wind damage cover — not under cyclone pool provisions. If your insurer has applied cyclone-specific exclusions to a Northern NSW property, this should be disputed via AFCA. Standard storm cover applies at these latitudes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Lismore has been flooded multiple times — how does that affect my Alfred claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lismore\'s repeat flood history means many properties have prior flood claims and pre-existing flood-related damage. Insurers have used this history to dispute Alfred claims on the basis that damage was pre-existing from the 2022 flood events rather than attributable to Alfred. Under the ICA code, the insurer must prove the damage pre-existed and was not caused by Alfred. An independent IICRC inspection documenting Alfred-specific damage pathways — water entry points, moisture distribution patterns — provides evidence to counter pre-existing damage claims.',
      },
    },
    {
      '@type': 'Question',
      name: 'My Northern NSW Alfred claim covers both storm damage and flooding — how do I lodge both?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lodge both under the same claim event as separate line items: (1) storm wind damage — structural damage from Alfred\'s wind; (2) storm water ingress — water entry through Alfred-damaged building envelope; (3) flood damage — if your property was inundated by rising rivers (Tweed, Richmond, Wilson rivers), lodge this as a separate peril if your policy has flood cover. Storm and flood are assessed under different policy sections. Clearly distinguishing them from lodgement prevents each being used to deny the other.',
      },
    },
    {
      '@type': 'Question',
      name: 'My Byron Bay holiday investment property was damaged by Alfred — does that affect my claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Holiday investment properties have the same insurance claim rights as owner-occupied properties for building damage. Landlord insurance or investment property insurance covers the building. If the property was managed by a holiday letting agency, the agency\'s liability for maintaining the property before Alfred may be relevant if their failure contributed to damage (e.g., deferred maintenance that Alfred exposed). Separately, check your policy for vacancy clause conditions if the property was unoccupied at the time of Alfred.',
      },
    },
  ],
};

export default function NorthernNSWAlfredRecoveryPage() {
  return (
    <>
      <Script
        id="nnswalr-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="nnswalr-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="nnswalr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Northern NSW Location Guide"
        title="Northern NSW Ex-TC Alfred Recovery — Byron Bay, Ballina &amp; Tweed Claims Guide"
        subtitle="Ex-TC Alfred impacted Northern NSW across Byron Bay, Ballina, Tweed Heads, and Lismore. For property owners with stalled, disputed, or underpaid Alfred claims — IICRC documentation, storm cover analysis, and AFCA escalation support."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-12"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Northern NSW', href: '/guides/locations/northern-nsw' },
          { label: 'Ex-TC Alfred Recovery' },
        ]}
        cta={{ text: 'Get Alfred Claim Support — Northern NSW', href: '/claim' }}
        sections={[
          {
            heading: 'Ex-TC Alfred and Northern NSW — What Happened',
            body: (
              <div className="space-y-4">
                <p>
                  Ex-Tropical Cyclone Alfred tracked across SE Queensland and made landfall on the Northern NSW coast on 8&ndash;9 March 2025, bringing destructive winds, extreme rainfall, and coastal storm surge to the Northern Rivers region. Byron Bay, Ballina, Tweed Heads, Lismore, Murwillumbah, and Kyogle were among the Northern NSW communities within the 16 declared Local Government Areas for the event.
                </p>
                <p>
                  <strong>Byron Bay and coastal Northern NSW</strong> experienced Alfred&rsquo;s storm surge along the Pacific Ocean coast. Byron Bay&rsquo;s exposed south-east-facing coastline, the Wategos Beach headland, and the low-lying areas of Suffolk Park and Belongil Beach experienced combined ocean surge and wind-driven rain. High-value coastal properties in Byron Bay, Brunswick Heads, and Pottsville sustained significant wind and water damage.
                </p>
                <p>
                  <strong>Tweed River and catchment flooding</strong> — Tweed Heads, Banora Point, Murwillumbah, and the Tweed Valley — experienced rapid river rise from Alfred&rsquo;s extreme rainfall over the McPherson and Border Ranges. Properties along the Tweed River corridor and Rous River catchment sustained combined storm and flood damage, creating dual-peril claims.
                </p>
                <p>
                  <strong>Richmond River and Lismore</strong> — the Richmond River catchment, including Lismore, Ballina, and Coraki — experienced Alfred-driven rises that compounded the already-damaged infrastructure and housing stock from the major 2022 flood events. Lismore properties are particularly complex Alfred claims given the overlap with unresolved 2022 flood damage in some cases.
                </p>
                <p>
                  <strong>Wilson River hinterland</strong> — Kyogle, Casino, and the Northern Rivers hinterland — received extreme rainfall from Alfred, driving flash flooding and landslips across steep catchment terrain. Hinterland access difficulties delayed insurer assessments in some areas.
                </p>
              </div>
            ),
          },
          {
            heading: 'Northern NSW Alfred Claims — Key Dispute Issues',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Northern NSW Alfred claims have a distinct dispute profile shaped by the region&rsquo;s coastal property market, repeated flood history, and mix of permanent and investment properties.
                </p>
                <p>
                  <strong>Pre-existing 2022 flood damage disputes:</strong> Lismore and surrounding Northern Rivers communities were severely impacted by the February and March 2022 flood events — among the worst in Australian history. Some properties in the region still had unresolved or ongoing remediation from 2022 when Alfred struck in 2025. Insurers have attempted to reduce Alfred claim settlements by attributing portions of damage to pre-existing 2022 flood damage. NRPG&rsquo;s IICRC inspection documents Alfred-specific damage pathways — moisture patterns, water entry points, structural failure modes — to establish what is clearly attributable to Alfred rather than the 2022 events.
                </p>
                <p>
                  <strong>Cyclone pool inapplicability:</strong> Northern NSW (Byron Bay 28.6&deg;S, Ballina 28.9&deg;S) is south of the ARPC Cyclone Pool zone. Standard storm cover applies. Some Northern NSW insurers initially processed Alfred claims under cyclone-adjacent provisions that may have resulted in more restrictive cover being applied. If your Northern NSW insurer cited &ldquo;cyclone&rdquo; as a basis for denial or limitation, that should be reviewed — standard storm cover should apply at this latitude.
                </p>
                <p>
                  <strong>Coastal hinterland access and delayed assessments:</strong> Byron Shire, Tweed Shire, and the Northern Rivers hinterland experienced road damage and access difficulties during Alfred. Insurers faced delays in deploying assessors. Where assessment was delayed, secondary damage progression (mould, structural deterioration) occurred during the waiting period. If your Alfred assessment was delayed and the assessment did not capture damage that developed during the delay, this is grounds for a supplementary claim.
                </p>
                <p>
                  <strong>Storm vs flood attribution in river-adjacent properties:</strong> Properties adjacent to the Tweed River, Richmond River, and their tributaries experienced both storm water ingress from Alfred&rsquo;s wind and rain, and flood inundation from rising rivers. As in SE Queensland, insurers have disputed which peril caused which damage. Policies that exclude flood but cover storm are particularly susceptible to dispute in these areas.
                </p>
              </div>
            ),
          },
          {
            heading: 'NSW AFCA and Government Assistance — Northern NSW Alfred Claims',
            body: (
              <div className="space-y-4">
                <p>
                  Northern NSW property owners have the same AFCA rights as Queensland policyholders. AFCA operates nationally and handles insurance disputes regardless of which state the property is in.
                </p>
                <p>
                  <strong>NSW government assistance programs:</strong> The NSW Government activated disaster assistance for Northern NSW LGAs under Alfred. The Services NSW Disaster Relief Grant (DRFA-funded) provided emergency funding to eligible households in declared areas. If you have not yet applied for NSW government assistance and your LGA was declared for Alfred, check eligibility at disasterassist.gov.au.
                </p>
                <p>
                  <strong>AFCA jurisdiction in NSW:</strong> AFCA handles claims disputes for all APRA-regulated insurers in Australia, regardless of state. The dispute process is the same as for Queensland policyholders: (1) raise a formal complaint with your insurer; (2) wait 45 days for resolution; (3) lodge with AFCA if unresolved. AFCA decisions are binding on the insurer.
                </p>
                <p>
                  <strong>Documents to gather for AFCA:</strong> (1) Your policy document (PDS + Certificate of Insurance); (2) original claim lodgement and claim number; (3) insurer&rsquo;s assessment report; (4) denial or underpayment letter; (5) all insurer correspondence; (6) photographs of damage taken at the time; (7) NRPG&rsquo;s IICRC inspection report if commissioned; (8) independent licensed trades quotes for disputed repair items.
                </p>
                <p>
                  <strong>Lismore-specific considerations:</strong> For Lismore properties with Alfred damage on top of 2022 flood damage, gather all documentation from the 2022 claims as well. AFCA can consider the cumulative claim history and determine whether the Alfred settlement appropriately accounts for the insured event independent of the prior 2022 damage.
                </p>
              </div>
            ),
          },
          {
            heading: 'NRPG Response — Northern NSW',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  NRPG provides IICRC-certified restoration and claim documentation services across Northern NSW, including Byron Bay, Ballina, Tweed Heads, Lismore, Murwillumbah, Casino, and the surrounding Northern Rivers region.
                </p>
                <p>
                  <strong>What NRPG provides for Alfred claims:</strong> An independent IICRC inspection and scope of works documenting the current state of your property, the Alfred-specific damage pathways, moisture readings, and the full scope of works required to restore the property to pre-loss standard. This documentation package is designed for AFCA submission and insurer re-assessment requests.
                </p>
                <p>
                  <strong>For properties with both Alfred and 2022 flood damage:</strong> NRPG documents the current condition and attributes Alfred-specific damage using moisture patterns, material condition analysis, and structural assessment. This provides the evidence base to separate Alfred-attributable damage from residual 2022 flood damage in insurer and AFCA proceedings.
                </p>
                <p>
                  <strong>Lodge a claim or request an inspection:</strong> Lodge at <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a>. For an Alfred-specific inspection and documentation request for AFCA purposes, note the Alfred event date and your existing claim reference number in the lodgement form.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does the ARPC Cyclone Pool apply to Northern NSW Alfred claims?',
            answer:
              'No — Northern NSW (Byron Bay 28.6°S, Ballina 28.9°S) is south of the ARPC pool zone. Standard storm cover applies. If your insurer applied cyclone-specific exclusions to a Northern NSW property, dispute via AFCA.',
          },
          {
            question: 'Lismore has been flooded multiple times — how does that affect my Alfred claim?',
            answer:
              'Insurers may attempt to attribute Alfred damage to pre-existing 2022 flood damage. NRPG\'s IICRC inspection documents Alfred-specific damage pathways to establish what is clearly attributable to Alfred. AFCA can consider the cumulative history and determine appropriate settlement.',
          },
          {
            question: 'My Northern NSW Alfred claim covers both storm damage and flooding — how do I lodge both?',
            answer:
              'Lodge as separate line items: storm wind damage, storm water ingress, and flood damage (if river-inundated). Storm and flood are assessed under different policy sections. Separating them from lodgement prevents each being used to deny the other.',
          },
          {
            question: 'My Byron Bay holiday investment property was damaged by Alfred — does that affect my claim?',
            answer:
              'Holiday investment properties have the same building damage claim rights as owner-occupied properties. Check your policy for vacancy clause conditions if the property was unoccupied at the time. If your insurer denies on vacancy grounds and the clause does not apply, dispute via AFCA.',
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
            title: 'AFCA Insurance Complaint Guide',
            href: '/guides/insurance/afca-complaint-guide',
            description:
              'Step-by-step guide to lodging an AFCA complaint for an underpaid or disputed insurance claim.',
          },
        ]}
      />
    </>
  );
}
