import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Strata Water Damage — Lot vs Common Property Responsibility Australia',
  description: 'Who pays for water damage in a strata or body corporate property? Understand lot vs common property boundaries in QLD, NSW, and VIC — and how to coordinate multi-lot restoration.',
  keywords: 'strata water damage, body corporate water damage, lot vs common property, strata insurance claim, strata pipe burst, QLD NSW VIC body corporate',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/property/strata-water-damage' },
};

export default function StrataWaterDamagePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Whose insurance covers a pipe burst in a strata building?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It depends on where the pipe is located. Pipes that form part of the common property — typically supply pipes within shared walls, risers serving multiple lots, and pipes in common areas — are the body corporate\'s responsibility. The body corporate\'s building insurance covers damage originating from common property. Pipes that solely serve one lot and are located within that lot\'s boundary are typically the lot owner\'s responsibility, covered by their individual lot insurance. In practice, the precise boundary depends on your strata plan and the relevant legislation — QLD uses the Body Corporate and Community Management Act, NSW uses the Strata Schemes Management Act, and VIC uses the Owners Corporations Act, each with different boundary definitions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if the body corporate is slow to act on water damage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If the body corporate fails to act promptly on water damage affecting common property, lot owners can escalate through the dispute resolution mechanisms in their state\'s strata legislation. In QLD, disputes can be referred to the Office of the Commissioner for Body Corporate and Community Management. In NSW, the NSW Civil and Administrative Tribunal (NCAT) can issue orders requiring the owners corporation to carry out repairs. In VIC, disputes go through Consumer Affairs Victoria or VCAT. In urgent situations where common property damage is causing ongoing damage to a lot, some legislation permits the lot owner to carry out emergency repairs and seek reimbursement from the body corporate. Document all communications with the body corporate, the strata manager, and the lot committee.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I organise my own repairs in a strata unit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can organise repairs within your own lot — to fixtures, fittings, and internal surfaces that are your responsibility under the strata plan. However, any works that affect common property or the building structure require body corporate approval. You should not engage a contractor to open shared walls, access roof spaces, or interfere with common property pipes without body corporate consent. Doing so may make you liable for reinstatement costs and could complicate the insurance position. For damage clearly within your lot (saturated carpet, water-damaged plasterboard on internal walls), instruct your own IICRC-certified contractor and lodge under your lot insurance. For anything touching the building envelope or shared services, notify the strata manager first.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do multiple lot insurance claims work after a flood?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In a major flood or water event affecting multiple lots in a strata building, claims typically proceed on two tracks simultaneously. The body corporate lodges a claim against the building insurance policy for damage to common property and the building structure. Each lot owner lodges an individual claim against their own lot or contents policy for damage to fixtures, improvements, and contents within their lot. The body corporate manager coordinates the building-level response, including assessing which structural drying works need to be coordinated across the whole building to prevent cross-contamination. Coordinated structural drying is important — drying one lot in isolation while adjacent lots remain wet can prevent drying targets being reached and may cause mould to migrate across boundaries.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="stratawater-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Property"
        title="Strata Water Damage"
        subtitle="Lot vs common property responsibility — navigating body corporate insurance and multi-lot restoration"
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Building2 className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Property', href: '/guides/property' },
          { label: 'Strata Water Damage' },
        ]}
        lastReviewed="2026-04-09"
        sections={[
          {
            heading: 'Lot vs Common Property — Who Pays for Strata Water Damage',
            body: (
              <>
                <p>
                  Water damage in a strata building is complicated by the intersection of multiple insurance
                  policies, multiple lot owners, a body corporate, and often unclear boundaries between lot and
                  common property. Establishing who is responsible — and whose insurance responds — is the
                  critical first step before any restoration work begins.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Common property — body corporate&apos;s responsibility:</strong> The body corporate
                    (owners corporation in NSW and VIC) is responsible for maintaining and insuring the common
                    property. This includes the building envelope (roof, external walls, windows forming part of the
                    structure), shared pipes and drainage within common property walls, common area ceilings and
                    floors, and shared services infrastructure. Damage originating from common property is covered
                    by the body corporate building insurance.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Lot property — individual owner&apos;s responsibility:</strong> Each lot owner is
                    responsible for fixtures, fittings, and improvements within their own lot. Pipes that solely
                    serve a single lot and are located within the lot boundary are typically the lot owner&apos;s
                    responsibility under most strata legislation. The lot owner insures these under their individual
                    lot or strata title insurance.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>State legislative differences:</strong> The boundary between lot and common property
                    differs under each state&apos;s legislation. QLD&apos;s Body Corporate and Community Management
                    Act 1997 (BCCMA) generally defines the lot as everything inside the internal face of boundary
                    walls. NSW&apos;s Strata Schemes Management Act 2015 has a different default boundary that
                    includes the internal plaster surfaces as part of the lot. VIC&apos;s Owners Corporations Act
                    2006 definitions also differ. Always check your strata plan and the applicable legislation.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>The boundary dispute:</strong> Strata water damage claims frequently trigger disputes
                    between the lot owner&apos;s insurer and the body corporate&apos;s insurer about where the
                    damage originated. A burst pipe within a shared wall can result in competing denials if each
                    insurer argues the source was on the other party&apos;s side of the boundary. Independent
                    forensic assessment by an IICRC-certified contractor documenting the source location is often
                    essential to resolve these disputes.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Upstairs-to-downstairs damage:</strong> If an overflow or leak in one lot damages the
                    lot below (the most common strata water event), the downstairs lot owner&apos;s insurer covers
                    the immediate restoration while the insurers determine liability and subrogation. Document the
                    source clearly before any restoration work begins.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: "Body Corporate's Role in Major Events",
            background: 'light' as const,
            body: (
              <>
                <p>
                  In major water events — cyclone, flooding, building-wide pipe failure — the body corporate and
                  strata manager have an active coordination role that goes beyond individual lot restoration.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Emergency response coordination:</strong> The body corporate manager should be notified
                    immediately in any event that affects common property or multiple lots. The manager has authority
                    to instruct emergency trades to make safe common property, engage building assessors, and lodge
                    the body corporate&apos;s insurance claim. Individual lot owners should also lodge their own
                    claims in parallel — do not wait for the body corporate process.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Building insurance — mandatory in all states:</strong> All strata buildings in Australia
                    must hold building insurance. In QLD, the body corporate must insure for full replacement value
                    under the BCCMA. In NSW and VIC, equivalent obligations apply. The building insurance covers
                    the common property structure and, depending on the policy, may extend to cover lot fixtures to
                    original specification (the &ldquo;as built&rdquo; standard).
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Lot owners still need individual insurance:</strong> Building insurance held by the body
                    corporate does not cover improvements lot owners have made above the original specification
                    (upgraded kitchens, tiling, flooring), nor does it cover contents. Lot owners need their own
                    strata title insurance to cover improvements and their individual liability within the lot.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Slow body corporate response:</strong> If the body corporate strata manager or committee
                    is slow to respond to water damage affecting common property, individual lot owners should send
                    formal written notification of the damage and its impact on their lot. Keep records of all
                    communications. Most strata legislation has dispute resolution mechanisms for lot owners to
                    compel the body corporate to carry out necessary maintenance and repairs.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Multi-Lot Water Damage Coordination',
            body: (
              <>
                <p>
                  When water damage affects multiple lots simultaneously — as occurs in cyclone events, building-wide
                  pipe failures, or major flooding — coordinated structural drying is essential to achieve
                  restoration outcomes and prevent secondary damage.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Why coordinated drying matters:</strong> In a multi-storey strata building, the structure
                    is interconnected — floor slabs, shared walls, and ceiling cavities connect adjacent lots. If one
                    lot is dried in isolation while adjacent wet lots remain unaddressed, moisture migrates across
                    the building fabric, preventing drying targets from being reached in the &ldquo;dry&rdquo; lot
                    and creating conditions for mould to colonise shared structural elements.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>IICRC S500:2025 multi-lot requirements:</strong> Structural drying in buildings with
                    multiple affected lots requires a coordinated psychrometric monitoring programme that tracks
                    drying progress across the affected zone as a whole. Individual lot contractors working
                    independently may not achieve the documentation standards insurers require for multi-lot events.
                    A lead contractor coordinating across all affected lots with a single psychrometric log is the
                    preferred approach for insurer compliance.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Cross-contamination prevention:</strong> In Category 3 water events (sewage, floodwater),
                    containment between lots is critical to prevent cross-contamination. Decontamination of shared
                    building elements (floor slabs, cavity walls) must be completed in a coordinated sequence before
                    any lot is closed up. Independent lot-by-lot approaches risk spreading contamination.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Insurance coordination for multiple claimants:</strong> Where multiple lot owners have
                    separate insurers, restoration contractors may be engaged by different parties. Coordinating
                    access and sequencing of works between competing insurers and their appointed contractors is a
                    common source of delay in strata restorations. Early engagement of the body corporate manager
                    as a neutral coordinator, with a single project scope, produces significantly faster outcomes.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Whose insurance covers a pipe burst in a strata building?',
            answer:
              'It depends on where the pipe is located. Pipes that form part of the common property — typically supply pipes within shared walls, risers serving multiple lots, and pipes in common areas — are the body corporate\'s responsibility. The body corporate\'s building insurance covers damage originating from common property. Pipes that solely serve one lot and are located within that lot\'s boundary are typically the lot owner\'s responsibility, covered by their individual lot insurance. In practice, the precise boundary depends on your strata plan and the relevant legislation — QLD uses the Body Corporate and Community Management Act, NSW uses the Strata Schemes Management Act, and VIC uses the Owners Corporations Act, each with different boundary definitions.',
          },
          {
            question: 'What if the body corporate is slow to act on water damage?',
            answer:
              'If the body corporate fails to act promptly on water damage affecting common property, lot owners can escalate through the dispute resolution mechanisms in their state\'s strata legislation. In QLD, disputes can be referred to the Office of the Commissioner for Body Corporate and Community Management. In NSW, NCAT can issue orders requiring the owners corporation to carry out repairs. In VIC, disputes go through Consumer Affairs Victoria or VCAT. Document all communications with the body corporate, the strata manager, and the lot committee.',
          },
          {
            question: 'Can I organise my own repairs in a strata unit?',
            answer:
              'You can organise repairs within your own lot — to fixtures, fittings, and internal surfaces that are your responsibility under the strata plan. However, any works that affect common property or the building structure require body corporate approval. You should not engage a contractor to open shared walls, access roof spaces, or interfere with common property pipes without body corporate consent. For damage clearly within your lot (saturated carpet, water-damaged plasterboard on internal walls), instruct your own IICRC-certified contractor and lodge under your lot insurance. For anything touching the building envelope or shared services, notify the strata manager first.',
          },
          {
            question: 'How do multiple lot insurance claims work after a flood?',
            answer:
              'In a major flood or water event affecting multiple lots, claims proceed on two tracks simultaneously. The body corporate lodges a claim against the building insurance policy for damage to common property and the building structure. Each lot owner lodges an individual claim against their own lot or contents policy for damage within their lot. The body corporate manager coordinates the building-level response. Coordinated structural drying is important — drying one lot in isolation while adjacent lots remain wet can prevent drying targets being reached and may cause mould to migrate across boundaries.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Insurance Claim Process',
            href: '/guides/insurance/water-damage-insurance-claim-process',
            description: 'Step-by-step guide to lodging a water damage insurance claim in Australia.',
          },
          {
            title: 'Gold Coast High-Rise Water Damage',
            href: '/guides/locations/gold-coast/gold-coast-high-rise-water-damage',
            description: 'Managing water damage in Gold Coast high-rise and strata buildings.',
          },
          {
            title: 'Document Water Damage for Insurance',
            href: '/guides/insurance/document-water-damage-insurance',
            description: 'How to photograph and document water damage to support your insurance claim.',
          },
          {
            title: 'Water Damage Restoration Brisbane',
            href: '/water-damage-restoration-brisbane',
            description: 'Professional water damage restoration services in Brisbane.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
