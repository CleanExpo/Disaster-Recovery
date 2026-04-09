import { Metadata } from 'next';
import Script from 'next/script';
import { Home } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Rental Property Water Damage — Tenant and Landlord Rights Australia',
  description: 'Who pays for water damage in a rental property? Tenant rights and landlord obligations under Australian Residential Tenancies Acts — QLD, NSW, VIC, SA, WA, NT, ACT, TAS.',
  keywords: 'rental property water damage, landlord tenant water damage Australia, urgent repairs rental, landlord insurance water damage, mould rental property landlord obligation',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/property/rental-property-water-damage' },
};

export default function RentalPropertyWaterDamagePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who pays for water damage in a rental property?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In Australian rental properties, the landlord is responsible for water damage caused by the building structure — burst pipes, roof leaks, failed waterproofing, or defective plumbing. These are maintenance obligations under Residential Tenancies Acts in all states and territories. The landlord must arrange and pay for both the underlying repair and the resulting water damage restoration. Tenants may be liable for water damage they directly caused through negligence, such as overflowing an unattended bath or failing to report a known leak promptly. Landlord insurance covers sudden structural water events; tenant contents insurance covers the tenant\'s belongings.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can a tenant organise emergency repairs for water damage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. If the landlord fails to attend to an urgent repair — such as a burst pipe or roof leak — within a reasonable timeframe (24 hours in most states for urgent health and safety repairs), tenants in most Australian states can organise emergency repairs up to the statutory cap and claim reimbursement. The caps are: QLD $1,500; NSW $1,000 plus one week\'s rent; VIC $2,500 or one month\'s rent; SA a reasonable amount. The tenant must notify the landlord in writing first, keep all invoices, and submit a formal reimbursement request. This right is a formal statutory process — tenants cannot simply deduct from rent without following the correct procedure.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does landlord insurance cover rent loss during restoration?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most landlord insurance policies include a rent loss or rent default benefit that covers lost rental income if the property becomes uninhabitable due to a covered water event. To claim rent loss, you must be able to demonstrate the property is uninhabitable (supported by a contractor assessment), provide proof of the rental agreement and rental income (lease, rental statements, property management records), and complete restoration within the policy\'s defined timeframe. Policies typically cover rent loss from the date the property is deemed uninhabitable until a defined period after restoration is completed. Check your Product Disclosure Statement for the maximum rent loss period and any excess that applies.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are my obligations as a landlord if there is mould in my rental property?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In QLD, NSW, and VIC, landlords have legislated obligations to address mould that renders the property unsafe or unsuitable for habitation. Under QLD\'s Residential Tenancies and Rooming Accommodation Act 2008 (amended 2021), mould attributable to building structure or landlord maintenance failure must be remediated by the landlord. NSW\'s Residential Tenancies Act 2010 and VIC\'s Residential Tenancies Act 1997 have similar obligations. If mould was caused by a covered water event — storm water ingress, burst pipes, roof leak — the mould remediation is the landlord\'s responsibility and is claimable under landlord insurance. Failing to remediate mould in a timely manner constitutes a breach of the residential tenancy agreement and can result in QCAT, NCAT, or VCAT orders.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="rentalprop-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Property"
        title="Rental Property Water Damage"
        subtitle="Tenant rights and landlord obligations across all Australian states and territories"
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Home className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Property', href: '/guides/property' },
          { label: 'Rental Property Water Damage' },
        ]}
        lastReviewed="2026-04-09"
        sections={[
          {
            heading: 'Tenant Rights and Landlord Obligations After Water Damage',
            body: (
              <>
                <p>
                  Water damage in rental properties sits at the intersection of property law, insurance, and building
                  maintenance obligations. The key question — who pays — is determined primarily by the cause of the
                  damage and the obligations imposed by each state and territory&apos;s Residential Tenancies Act.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Landlord&apos;s core obligation:</strong> All Australian Residential Tenancies Acts require
                    landlords to maintain the property in a reasonable state of repair throughout the tenancy. This
                    includes the roof, walls, plumbing, and drainage. Water damage caused by the building structure —
                    burst pipes, roof leaks, failed waterproofing, blocked gutters — is the landlord&apos;s
                    responsibility to repair and restore.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Urgent repairs and the 24-hour rule:</strong> Burst pipes, major roof leaks, and similar
                    events qualify as urgent repairs in all states. Most legislation requires landlords to attend to
                    urgent repairs within 24 hours of being notified. Failure to do so is a breach of the residential
                    tenancy agreement and triggers the tenant&apos;s right to arrange emergency repairs themselves
                    (within the statutory cap) and seek reimbursement.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>State statutory repair caps:</strong> If the landlord fails to act, tenants may organise
                    emergency repairs up to the following limits and claim reimbursement: QLD $1,500; NSW $1,000 plus
                    one week&apos;s rent; VIC $2,500 or one month&apos;s rent; SA — a reasonable amount for urgent
                    repairs; WA $1,000; ACT — reasonable costs; TAS and NT also permit emergency repairs by tenants
                    with reimbursement rights. In all cases, tenants must notify the landlord in writing before acting
                    and retain all invoices.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Tenant-caused damage:</strong> If the tenant directly caused the water damage — such as
                    leaving a tap running, overflowing a bathtub, or damaging a pipe — the tenant is liable for the
                    cost of repair. Tenants should hold a contents insurance policy that includes accidental damage
                    and liability cover.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Notification obligations:</strong> Tenants in all states are obligated to notify the
                    landlord or property manager promptly upon discovering any damage, leak, or required repair.
                    Delayed notification that worsens the damage may reduce or eliminate the tenant&apos;s
                    reimbursement rights.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'What Landlord Insurance Covers',
            background: 'light' as const,
            body: (
              <>
                <p>
                  Landlord insurance is a specialist policy covering investment and rental properties. Understanding
                  what it covers — and importantly, what it excludes — is essential for landlords managing a water
                  damage event.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Building structure damage — covered:</strong> Sudden water events that damage the building
                    structure — burst pipes, storm water ingress through the building envelope, roof damage causing
                    internal water damage — are covered under the building section of most landlord policies. The
                    insurer pays for structural repairs and water damage restoration to the building fabric.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Tenant-caused damage — covered:</strong> Most landlord policies include malicious or
                    accidental damage by tenants as a specific benefit. This covers damage beyond the bond amount,
                    including water damage caused by a tenant&apos;s negligence. A condition report and photographic
                    evidence from the commencement of the tenancy is required to support these claims.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Gradual leaks — excluded:</strong> Gradual or slow leaks — a tap dripping for months, a
                    slow roof leak that was visible but not reported, seepage through defective pointing — are excluded
                    under most landlord and home insurance policies. Policies cover sudden and unforeseen events, not
                    gradual deterioration. Regular inspections by the property manager help identify slow leaks before
                    they become exclusion events.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Rent loss during restoration — typically covered:</strong> If the property is uninhabitable
                    following a covered water event, most landlord policies include rent loss cover. The insurer pays
                    the weekly rental rate from the date of uninhabitability until a defined period after restoration
                    is completed. Policies generally require restoration to be completed within 12 months; some
                    specify shorter periods.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Contents — not covered by landlord insurance:</strong> Landlord insurance does not cover
                    the tenant&apos;s personal belongings. Tenants need their own contents insurance. Fixtures and
                    fittings owned by the landlord (light fittings, window coverings, built-in appliances) are
                    typically covered under the building section of the landlord policy.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Review your Product Disclosure Statement carefully — policy terms vary significantly between
                  insurers. If your claim is disputed, you can escalate through your insurer&apos;s Internal Dispute
                  Resolution process and, if unresolved, to AFCA.
                </p>
              </>
            ),
          },
          {
            heading: 'Mould in Rental Properties — Whose Responsibility?',
            body: (
              <>
                <p>
                  Mould in rental properties has become a major focus of residential tenancy legislation across
                  Australia. QLD, NSW, and VIC have introduced or strengthened landlord obligations regarding mould
                  in recent legislative amendments.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Mould caused by a water event = landlord&apos;s responsibility:</strong> If mould develops
                    as a result of a storm water ingress event, burst pipe, roof leak, or other structural water
                    event, the mould remediation is the landlord&apos;s obligation and is claimable under landlord
                    insurance. The landlord cannot attribute this mould to the tenant.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>QLD:</strong> Under the Residential Tenancies and Rooming Accommodation Act 2008 (amended
                    2021), landlords must ensure the property is fit for habitation and address mould attributable to
                    the building structure promptly. Tenants can apply to QCAT for orders requiring remediation.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>NSW:</strong> Under the Residential Tenancies Act 2010, properties must be fit for
                    habitation. The Rental Fairness Act 2024 amendments strengthened obligations around mould caused
                    by building defects. Tenants can apply to NCAT for urgent repairs orders covering mould.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>VIC:</strong> Under the Residential Tenancies Act 1997 (amended 2021 minimum standards),
                    properties must meet minimum rental standards including adequate ventilation and weatherproofing.
                    Mould caused by a structural failure is the landlord&apos;s obligation; tenants can apply to VCAT.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Mould caused by tenant behaviour:</strong> If mould develops due to the tenant
                    consistently failing to ventilate, drying clothes indoors, or blocking vents in an otherwise
                    structurally sound property, the tenant may bear responsibility. A professional mould assessment
                    that identifies the moisture source is essential evidence in disputed causation cases before any
                    tribunal.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  IICRC-certified mould assessment provides independent documentation of the moisture source and
                  causation factors — the critical evidence needed to establish landlord vs tenant responsibility
                  in tribunal proceedings.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Who pays for water damage in a rental property?',
            answer:
              'In Australian rental properties, the landlord is responsible for water damage caused by the building structure — burst pipes, roof leaks, failed waterproofing, or defective plumbing. These are maintenance obligations under Residential Tenancies Acts in all states and territories. The landlord must arrange and pay for both the underlying repair and the resulting water damage restoration. Tenants may be liable for water damage they directly caused through negligence, such as overflowing an unattended bath or failing to report a known leak promptly. Landlord insurance covers sudden structural water events; tenant contents insurance covers the tenant\'s belongings.',
          },
          {
            question: 'Can a tenant organise emergency repairs for water damage?',
            answer:
              'Yes. If the landlord fails to attend to an urgent repair — such as a burst pipe or roof leak — within a reasonable timeframe (24 hours in most states for urgent health and safety repairs), tenants in most Australian states can organise emergency repairs up to the statutory cap and claim reimbursement. The caps are: QLD $1,500; NSW $1,000 plus one week\'s rent; VIC $2,500 or one month\'s rent; SA a reasonable amount. The tenant must notify the landlord in writing first, keep all invoices, and submit a formal reimbursement request. This right is a formal statutory process — tenants cannot simply deduct from rent without following the correct procedure.',
          },
          {
            question: 'Does landlord insurance cover rent loss during restoration?',
            answer:
              'Most landlord insurance policies include a rent loss or rent default benefit that covers lost rental income if the property becomes uninhabitable due to a covered water event. To claim rent loss, you must be able to demonstrate the property is uninhabitable (supported by a contractor assessment), provide proof of the rental agreement and rental income (lease, rental statements, property management records), and complete restoration within the policy\'s defined timeframe. Policies typically cover rent loss from the date the property is deemed uninhabitable until a defined period after restoration is completed. Check your Product Disclosure Statement for the maximum rent loss period and any excess that applies.',
          },
          {
            question: 'What are my obligations as a landlord if there is mould in my rental property?',
            answer:
              'In QLD, NSW, and VIC, landlords have legislated obligations to address mould that renders the property unsafe or unsuitable for habitation. Under QLD\'s Residential Tenancies and Rooming Accommodation Act 2008 (amended 2021), mould attributable to building structure or landlord maintenance failure must be remediated by the landlord. NSW\'s Residential Tenancies Act 2010 and VIC\'s Residential Tenancies Act 1997 have similar obligations. If mould was caused by a covered water event — storm water ingress, burst pipes, roof leak — the mould remediation is the landlord\'s responsibility and is claimable under landlord insurance. Failing to remediate mould in a timely manner constitutes a breach of the residential tenancy agreement and can result in QCAT, NCAT, or VCAT orders.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Mould Remediation Brisbane',
            href: '/mould-remediation-brisbane',
            description: 'Professional mould remediation services in Brisbane and South East Queensland.',
          },
          {
            title: 'Document Water Damage for Insurance',
            href: '/guides/insurance/document-water-damage-insurance',
            description: 'How to photograph and document water damage to support your insurance claim.',
          },
          {
            title: 'Water Damage Insurance Claim Process',
            href: '/guides/insurance/water-damage-insurance-claim-process',
            description: 'Step-by-step guide to lodging a water damage insurance claim in Australia.',
          },
          {
            title: 'Adelaide Rental Mould Remediation',
            href: '/guides/locations/adelaide/adelaide-rental-mould-remediation',
            description: 'Expert guide to mould remediation in Adelaide rental properties under SA law.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
