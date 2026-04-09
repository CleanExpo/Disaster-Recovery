import { Metadata } from 'next';
import Script from 'next/script';
import { Package } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contents Pack-Out After Disaster | When You Need It Australia',
  description: 'When is contents pack-out required after water, fire or mould damage? IICRC-certified process, insurance coverage, and what to expect during restoration in Australia.',
  alternates: { canonical: `${NAP.url}/guides/professional/contents-pack-out-when-needed` },
  openGraph: {
    title: 'Contents Pack-Out After Disaster | When You Need It Australia',
    description: 'When is contents pack-out required after water, fire or mould damage? IICRC-certified process, insurance coverage, and what to expect during restoration in Australia.',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: NAP.name,
  legalName: NAP.legalName,
  alternateName: NAP.alternateName,
  url: NAP.url,
  email: NAP.email,
  priceRange: NAP.priceRange,
  logo: NAP.logo,
  sameAs: NAP.sameAs,
  areaServed: 'Australia',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '12847',
    bestRating: '5',
    worstRating: '1',
  },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Contents Pack-Out and Restoration Services',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    url: NAP.url,
  },
  description: 'Professional contents pack-out, specialist restoration, and secure storage during disaster recovery works.',
  areaServed: 'Australia',
  serviceType: 'Contents Pack-Out and Restoration',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does insurance cover contents pack-out?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, when the pack-out is necessitated by a covered event. Pack-out labour, transport, specialist cleaning, storage, and return delivery should be lodged as a separate line item in your contents claim. NRPG provides a fully itemised inventory and condition report for each item to support the claim and reduce the risk of insurer disputes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can all contents be restored?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most hard goods — furniture, electronics, appliances — and some soft goods are restorable if treated promptly. Porous materials contaminated by Category 3 black water (sewage, floodwater) are typically declared total loss because biohazard contamination cannot be safely eliminated from absorbent materials. This includes mattresses, particle board furniture, and carpet underlay. NRPG identifies restorable vs total loss items at intake and documents the assessment for your insurer.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does pack-out take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Packing out a 4-bedroom house — photographing, inventorying, and loading all contents — typically takes 1–2 days. Contents restoration and specialist cleaning in the facility takes 1–4 weeks depending on the volume of items and the damage type involved. Return delivery and placement is coordinated once your property is certified ready for reoccupation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to my contents during restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All contents are stored in a secure, climate-controlled facility. Every item is catalogued with photographs and a unique identifier, so you can track each piece through the restoration process. Access to essential items can often be arranged by appointment. NRPG provides a full inventory list so you have a complete record of everything in storage at all times.',
      },
    },
  ],
};

export default function ContentsPackOutWhenNeededPage() {
  return (
    <>
      <Script id="cpown-professional-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="cpown-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="cpown-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Professional Guides"
        title="Contents Pack-Out After Disaster | When You Need It Australia"
        subtitle="When is contents pack-out required after water, fire or mould damage? IICRC-certified process, insurance coverage, and what to expect during restoration in Australia."
        gradient="linear-gradient(135deg, #1A237E 0%, #3949AB 100%)"
        icon={<Package className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Professional Guides', href: '/guides/professional' },
          { label: 'Contents Pack-Out — When Is It Needed?' },
        ]}
        cta={{ text: 'Get Emergency Help', href: '/claim' }}
        lastReviewed="2026-04-09"
        sections={[
          {
            heading: 'What Is a Contents Pack-Out?',
            body: (
              <div className="space-y-4">
                <p>
                  A contents pack-out is the removal of all moveable contents from an affected property to a secure facility for cleaning, drying, storage, and inventory. It is a distinct service from building restoration and is managed in parallel with structural works.
                </p>
                <p>
                  Pack-out is required when restoration work requires full and unobstructed access to the building — for example, when floors need to be lifted, walls need to be demolished, or containment barriers need to be established throughout the property. It is also required when contents are at immediate risk of secondary damage from continued exposure to moisture, smoke residue, or mould spores.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Photograph and inventory</strong> — Every item is documented before it leaves the property. Photographs are taken in situ, and each item is assigned a unique identifier that tracks it through every stage of the process.
                  </li>
                  <li>
                    <strong>Categorisation</strong> — Items are assessed at pack-out and categorised as restorable or total loss. Porous materials contaminated by black water, for example, are typically total loss. Hard goods and most soft goods are restorable with the appropriate cleaning method.
                  </li>
                  <li>
                    <strong>Transport to secure facility</strong> — All items are transported in enclosed vehicles with chain-of-custody documentation from property to facility.
                  </li>
                  <li>
                    <strong>Specialist cleaning</strong> — Cleaning methods are matched to the damage type and material: ultrasonic cleaning for electronics, ozone treatment for smoke-affected soft furnishings, dry cleaning for garments, and specialist conservator referral for artwork.
                  </li>
                  <li>
                    <strong>Storage during works</strong> — Restored items are held in a secure, climate-controlled facility until the building is ready for reoccupation.
                  </li>
                  <li>
                    <strong>Pack-back and placement</strong> — Contents are returned to the property and placed according to a floor plan agreed with the homeowner. A final condition report is provided on delivery.
                  </li>
                </ul>
              </div>
            ),
          },
          {
            heading: 'When Does Pack-Out Become Necessary?',
            background: 'light',
            body: (
              <div className="space-y-4">
                <p>
                  Pack-out is not required for every restoration event. The following triggers indicate when pack-out becomes necessary rather than optional.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Category 3 black water (biohazard contamination)</strong> — Sewage backup, floodwater inundation, or stormwater ingress containing biological contaminants requires immediate removal of affected contents. Porous materials in contact with black water cannot be safely cleaned in place and must be removed and assessed for total loss.
                  </li>
                  <li>
                    <strong>Fire and smoke damage throughout property</strong> — Smoke penetrates porous materials within hours of a fire event. Contents remaining in a smoke-affected property continue to absorb odour compounds during building restoration. Pack-out to an ozone treatment facility prevents further damage and enables proper smoke remediation.
                  </li>
                  <li>
                    <strong>Structural drying requiring wall or floor demolition</strong> — When walls, floors, or ceilings need to be opened to dry structural materials, contents must be removed to provide full access and to prevent damage from demolition activity.
                  </li>
                  <li>
                    <strong>Mould remediation requiring containment</strong> — Mould remediation requires the establishment of negative air pressure containment barriers throughout the affected area. Contents must be removed before containment is established and cannot be returned until clearance testing confirms the remediation is complete.
                  </li>
                  <li>
                    <strong>Significant building works</strong> — Any restoration project involving major trades activity — electrical rewiring, replumbing, structural repairs — creates ongoing risk of contents damage from dust, debris, and incidental contact. Pack-out protects your belongings and allows tradespeople to work without restriction.
                  </li>
                </ul>
              </div>
            ),
          },
          {
            heading: 'The Pack-Out Process',
            body: (
              <div className="space-y-4">
                <p>
                  A professional contents pack-out is a documented, auditable process with clear chain of custody at every step. The following stages are standard across all NRPG pack-out engagements.
                </p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Photograph and inventory all items</strong> — Each item is photographed in its original position before being moved. The inventory records item description, pre-pack-out condition, and any pre-existing damage. This record protects you in the event of any dispute about condition or value.
                  </li>
                  <li>
                    <strong>Categorise (restorable vs total loss)</strong> — Items are assessed at intake. Hard goods (furniture, appliances, electronics) are typically restorable. Soft goods (clothing, bedding, soft furnishings) depend on damage type and extent. Porous materials affected by black water are assessed for total loss. The categorisation is documented and submitted to the insurer.
                  </li>
                  <li>
                    <strong>Transport to secure facility</strong> — Fragile items are packed to removalist standards. Electronics are packed with anti-static protection. Chain-of-custody documentation covers every transfer from property to facility.
                  </li>
                  <li>
                    <strong>Specialist cleaning</strong> — Cleaning methods are matched to the item and damage type. Ultrasonic cleaning removes mineral deposits and contamination from electronics. Ozone chambers neutralise smoke odour in soft furnishings and clothing. Dry cleaning is applied to garments. Documents and photographs are freeze-dried where water damage is involved.
                  </li>
                  <li>
                    <strong>Storage during works</strong> — Restored items are held in a secure, climate-controlled facility. Essential items can often be accessed by appointment. A complete inventory is available to you at all times.
                  </li>
                  <li>
                    <strong>Pack-back and placement</strong> — Contents are returned and placed once the building is certified ready. A final condition report is provided comparing pre and post pack-out condition for every item.
                  </li>
                </ol>
              </div>
            ),
          },
          {
            heading: 'Contents Insurance and Pack-Out Costs',
            background: 'light',
            body: (
              <div className="space-y-4">
                <p>
                  Most home and contents insurance policies cover pack-out and specialist cleaning costs directly arising from a covered event. Understanding how to present the claim correctly reduces the risk of disputes and delays.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Lodge pack-out as a separate line item</strong> — Pack-out labour, transport, specialist cleaning, storage, and return delivery should be itemised separately from the building claim. Many homeowners inadvertently include pack-out costs within the building scope, which can lead to underpayment when the insurer applies building-specific limits or exclusions.
                  </li>
                  <li>
                    <strong>Depreciation disputes are common</strong> — Insurers frequently apply depreciation to contents items, reducing the payout to the current market value of the item rather than replacement cost. Use an IICRC-certified assessment to establish the restorable value of items and challenge unreasonable depreciation positions. NRPG documents all items with photographs and condition notes at intake for this purpose.
                  </li>
                  <li>
                    <strong>High-value items require separate scheduling</strong> — Items above your policy&rsquo;s single-item limit (typically $1,500–$5,000) must be individually scheduled to receive full replacement value. If high-value items were not scheduled before the event, speak to your broker about available options.
                  </li>
                  <li>
                    <strong>Total loss documentation</strong> — Items that cannot be restored are identified in the post-restoration condition report and submitted to the insurer as a total loss schedule. NRPG prepares this documentation specifying each item, the restoration method attempted, and the reason it cannot be returned to pre-loss condition.
                  </li>
                  <li>
                    <strong>NRPG documentation support</strong> — NRPG documents all items with photographs, condition assessments, and specialist cleaning records to support your claim and provide the insurer with the evidence needed to approve pack-out costs without unnecessary delays.
                  </li>
                </ul>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does insurance cover contents pack-out?',
            answer: 'Yes, when the pack-out is necessitated by a covered event. Pack-out labour, transport, specialist cleaning, storage, and return delivery should be lodged as a separate line item in your contents claim. NRPG provides a fully itemised inventory and condition report for each item to support the claim and reduce the risk of insurer disputes.',
          },
          {
            question: 'Can all contents be restored?',
            answer: 'Most hard goods — furniture, electronics, appliances — and some soft goods are restorable if treated promptly. Porous materials contaminated by Category 3 black water (sewage, floodwater) are typically declared total loss because biohazard contamination cannot be safely eliminated from absorbent materials. This includes mattresses, particle board furniture, and carpet underlay. NRPG identifies restorable vs total loss items at intake and documents the assessment for your insurer.',
          },
          {
            question: 'How long does pack-out take?',
            answer: 'Packing out a 4-bedroom house — photographing, inventorying, and loading all contents — typically takes 1–2 days. Contents restoration and specialist cleaning in the facility takes 1–4 weeks depending on the volume of items and the damage type involved. Return delivery and placement is coordinated once your property is certified ready for reoccupation.',
          },
          {
            question: 'What happens to my contents during restoration?',
            answer: 'All contents are stored in a secure, climate-controlled facility. Every item is catalogued with photographs and a unique identifier, so you can track each piece through the restoration process. Access to essential items can often be arranged by appointment. NRPG provides a full inventory list so you have a complete record of everything in storage at all times.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Contents Insurance Disaster Claims',
            href: '/guides/insurance/contents-insurance-disaster-claims',
            description: 'How contents insurance works for disaster events.',
          },
          {
            title: 'How to Choose a Restoration Company',
            href: '/guides/professional/how-to-choose-restoration-company',
            description: 'What to look for in an IICRC-certified contractor.',
          },
          {
            title: 'Fire Damage Restoration Process',
            href: '/services/fire-damage-restoration',
            description: 'Full fire and smoke damage restoration overview.',
          },
        ]}
      />
    </>
  );
}
