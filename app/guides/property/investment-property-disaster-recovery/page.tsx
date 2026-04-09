import { Metadata } from 'next';
import Script from 'next/script';
import { TrendingUp } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Investment Property Disaster Recovery — Insurance, Tax, and Tenants',
  description: 'Investment property owners face landlord insurance, tenant rights obligations, and ATO tax implications after a disaster. Complete guide for Australian property investors.',
  keywords: 'investment property disaster recovery, landlord insurance claim, investment property tax restoration, rent loss claim, multiple investment properties flood, tenant access urgent repairs',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/property/investment-property-disaster-recovery' },
};

export default function InvestmentPropertyDisasterRecoveryPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is disaster restoration immediately tax deductible for investment properties?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Restoration works that return the property to its pre-damage condition are generally immediately deductible as repairs and maintenance expenses under Section 25-10 of the Income Tax Assessment Act 1997, provided the property was income-producing at the time of the damage. Works that improve the property beyond its pre-damage condition — such as upgrading from carpet to tiles, or replacing a standard kitchen with a premium kitchen after a fire — are capital works and must be depreciated over 40 years at 2.5% per annum rather than claimed as an immediate deduction. Getting a clear scope of works from your restoration contractor that explicitly separates repair-to-pre-damage items from any improvements is essential for ATO compliance. Restoration costs paid by your insurer are not deductible — only the portion you pay out of pocket (your excess, any shortfall) is claimable.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I claim rent loss during restoration?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, if your landlord insurance policy includes a rent loss benefit and the property is uninhabitable due to a covered water, fire, or storm event. To successfully claim rent loss, you will need: evidence the property was tenanted at the time of the event (current lease agreement); rental statements showing the rental income being earned; a contractor or insurer assessment confirming the property is uninhabitable; and completion of restoration within the policy\'s defined maximum restoration period (commonly 12 months). The rent loss payment is assessable income for tax purposes — include it in your rental income schedule for the relevant financial year. If your property was vacant at the time of the event (between tenancies), rent loss cover under most policies does not apply unless your policy specifically covers vacancy periods.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if my tenant refuses access for repairs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tenants in all Australian states and territories are legally required to allow access for urgent repairs with appropriate notice — typically 24 hours notice in writing for urgent repairs in most states. If a tenant unreasonably refuses access for urgent or necessary repairs, the landlord can apply to the relevant tenancy tribunal (QCAT, NCAT, VCAT, SAT, or equivalent) for an order requiring access. The property manager should be the first contact point — they are typically best placed to negotiate access with the tenant and escalate formally if required. Document all access attempts in writing. If the tenant\'s refusal of access worsens the damage, this may support a claim against the tenant for the additional damage at the end of the tenancy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I lodge separate claims for each investment property?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. If multiple investment properties are affected by the same event — the same cyclone, flood, or storm — each property must be lodged as a separate claim, even if they are insured under the same policy or with the same insurer. Combining properties in a single claim creates complications around excess payments, scope documentation, and settlement calculation. Each property has its own sum insured, its own tenancy circumstances, and its own restoration timeline. Lodge each property separately with its own claim reference number, its own scope of works, and its own rent loss documentation. If properties are with different insurers, lodge each independently and without cross-referencing — each insurer will assess only their own policy obligations.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="investprop-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Property"
        title="Investment Property Disaster Recovery"
        subtitle="Managing landlord insurance, tenant obligations, and tax implications after a disaster event"
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<TrendingUp className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Property', href: '/guides/property' },
          { label: 'Investment Property Disaster Recovery' },
        ]}
        lastReviewed="2026-04-09"
        sections={[
          {
            heading: 'Landlord Insurance and Tax Implications of Investment Property Damage',
            body: (
              <>
                <p>
                  Investment property owners face a more complex response to disaster damage than owner-occupiers.
                  The triple layer of landlord insurance obligations, tenant rights requirements, and ATO tax
                  treatment means that how you respond — and how you document the response — has long-term
                  financial consequences beyond the insurance settlement itself.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Landlord insurance — what it covers:</strong> A landlord insurance policy covers the
                    building structure for sudden and accidental damage from covered perils (fire, storm, water,
                    flood with optional extension), tenant-caused damage beyond the bond, and rent loss during
                    uninhabitability. It does not cover gradual deterioration, the tenant&apos;s contents, or
                    improvements that constitute capital works. Confirm your sum insured reflects the current
                    full replacement cost — underinsurance is common among investment property owners who set
                    the insured value at purchase price rather than current reconstruction cost.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Tax deductibility — repairs vs improvements:</strong> Restoration works that return
                    the property to its pre-damage condition are generally immediately deductible under Section
                    25-10 of the Income Tax Assessment Act 1997. Works that improve the property beyond the
                    pre-damage standard are capital works, depreciable at 2.5% per annum over 40 years. The
                    distinction matters: replacing storm-damaged carpet with identical carpet = immediate
                    deduction; replacing the same carpet with premium flooring = capital works. Obtain a clearly
                    itemised scope of works from your contractor that separates repair-to-pre-damage items from
                    any improvements to support your ATO position.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Insurance proceeds and tax:</strong> Restoration costs paid directly by your insurer
                    to the contractor are not deductible — they are not your expense. Only the out-of-pocket
                    portion you bear (your policy excess, depreciation deductions withheld by the insurer, costs
                    above the policy limit) is potentially deductible. Rent loss insurance proceeds are assessable
                    income in the year received and must be declared on your rental income schedule.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Depreciation and capital works:</strong> After a major restoration event, review your
                    depreciation schedule with your quantity surveyor. Any destroyed or replaced depreciable assets
                    (plant and equipment: hot water systems, air conditioners, appliances) may generate a
                    scrapping deduction for the remaining written-down value of the destroyed asset.
                    Simultaneously, new replacement assets commence depreciation from the date of installation.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Property manager&apos;s critical role:</strong> For investment properties with a
                    property manager, the PM is the primary point of coordination between the landlord, the tenant,
                    and the insurer. The PM should lodge the insurer notification, coordinate access for the
                    assessor and restoration contractor, and maintain documentation of all tenant communications.
                    Confirm with your PM that they have lodged the claim and confirmed coverage before proceeding
                    with restoration works beyond emergency make-safe.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Managing Tenants During Restoration',
            background: 'light' as const,
            body: (
              <>
                <p>
                  The landlord-tenant relationship adds a significant layer of obligation and complexity to
                  investment property disaster recovery. Getting this right protects both the insurance claim
                  and the tenancy.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Duty to allow access for urgent repairs:</strong> Tenants in all Australian states
                    must allow the landlord or authorised contractor access for urgent repairs. Most state
                    legislation requires at least 24 hours written notice for entry to carry out repairs, except
                    in genuine emergency situations (active burst pipe, structural danger) where immediate entry
                    may be necessary. The property manager should always be the first contact point — they manage
                    the formal access notice process and maintain the written record.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Habitability and rent reduction:</strong> If damage renders part of the property
                    uninhabitable or significantly reduces its amenity, the tenant may be entitled to a rent
                    reduction under state tenancy legislation for the period of reduced amenity. This is separate
                    from the rent loss insurance claim — the tenant&apos;s rent reduction reduces your rental
                    income, while the rent loss insurance claim reimburses you for the income lost due to
                    uninhabitability. Establish the extent of damage and uninhabitability promptly, and document
                    it in writing to the tenant through the property manager.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Temporary accommodation obligations:</strong> If the property is fully uninhabitable,
                    the landlord has obligations under most state tenancy legislation to facilitate or provide
                    alternative accommodation, or to allow the tenant to terminate the tenancy without penalty.
                    Most landlord insurance policies cover temporary accommodation costs as part of the rent
                    loss benefit — confirm with your insurer whether accommodation for the tenant is covered.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Tenant refuses access:</strong> If a tenant unreasonably refuses access for urgent
                    or necessary repairs, the landlord can apply to the relevant tenancy tribunal for an order
                    requiring access. Document all access attempts in writing. The property manager should
                    manage all written communications. Unreasonable tenant obstruction that worsens the damage
                    may give rise to a claim against the tenant at end of tenancy for the additional damage caused.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Tenant-caused damage:</strong> If the damage was caused by the tenant — negligence,
                    malicious damage, or failure to report a known issue — document this clearly before any
                    restoration begins. Your landlord insurance policy&apos;s tenant damage benefit requires
                    evidence of the damage, the entry condition report, and documentation of the tenant&apos;s
                    responsibility. Pursue the bond claim and insurer claim simultaneously — they are not
                    mutually exclusive.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Multiple Property Claims After a Major Event',
            body: (
              <>
                <p>
                  Investors with multiple properties affected by the same cyclone, flood, or storm face the
                  additional complexity of managing concurrent claims across a portfolio. Understanding how to
                  handle this efficiently — and what not to do — can significantly affect both claim outcomes
                  and administrative burden.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Lodge each property separately:</strong> Each investment property must be lodged as
                    a separate insurance claim, even if they are insured under the same policy or with the same
                    insurer. Each property has its own sum insured, its own excess, its own scope of damage, and
                    its own tenancy circumstances. Attempting to combine properties in a single claim creates
                    complications around excess calculation, coverage confirmation, and scope documentation that
                    can significantly delay settlement.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Multiple excesses:</strong> If you have multiple properties affected by the same event,
                    you will typically pay a separate policy excess for each property, unless your policy includes
                    a &ldquo;one excess per event&rdquo; provision. Check your Product Disclosure Statement. If
                    a single event excess applies across your policy, notify your insurer and confirm this before
                    paying multiple excesses.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Prioritise the most damaged and most time-sensitive:</strong> After a major event
                    affecting multiple properties, prioritise the property with the greatest risk of secondary
                    damage (active water, structural instability) and the property with the shortest time before
                    tenant habitability obligations arise. Properties with tenants in place may require more
                    urgent response due to statutory habitability obligations.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Separate documentation for each property:</strong> Maintain a separate documentation
                    file for each property — photos, scope of works, contractor invoices, rent loss evidence, and
                    communications — from the day of the event. Do not use the same photos or scope across
                    properties. Each insurer will require property-specific documentation for assessment, and
                    cross-referenced documentation causes unnecessary delays and potential disputes about which
                    property an invoice relates to.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Tax records across multiple properties:</strong> If multiple investment properties
                    are affected by a disaster event, maintain separate tax records for each property&apos;s
                    restoration costs, insurance proceeds, and rent loss payments. Do not consolidate these across
                    properties. Each property has its own rental income schedule, and restoration deductions
                    must be attributed to the specific property in which the works were carried out.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is disaster restoration immediately tax deductible for investment properties?',
            answer:
              'Restoration works that return the property to its pre-damage condition are generally immediately deductible as repairs and maintenance expenses under Section 25-10 of the Income Tax Assessment Act 1997, provided the property was income-producing at the time of the damage. Works that improve the property beyond its pre-damage condition are capital works, depreciable over 40 years at 2.5% per annum. Obtain a clearly itemised scope of works from your contractor that separates repair-to-pre-damage items from any improvements. Restoration costs paid by your insurer are not deductible — only the portion you pay out of pocket is claimable.',
          },
          {
            question: 'Can I claim rent loss during restoration?',
            answer:
              'Yes, if your landlord insurance policy includes a rent loss benefit and the property is uninhabitable due to a covered event. To claim, you will need: evidence the property was tenanted (lease agreement, rental statements); a contractor or insurer assessment confirming uninhabitability; and completion of restoration within the policy\'s defined maximum restoration period. Rent loss insurance proceeds are assessable income for tax purposes in the year received.',
          },
          {
            question: 'What if my tenant refuses access for repairs?',
            answer:
              'Tenants are legally required to allow access for urgent repairs with appropriate notice — typically 24 hours in writing in most states. If a tenant unreasonably refuses access, the landlord can apply to the relevant tenancy tribunal (QCAT, NCAT, VCAT, or equivalent) for an order requiring access. Document all access attempts in writing through the property manager. Tenant refusal that worsens the damage may support a claim against the tenant for the additional damage caused.',
          },
          {
            question: 'Should I lodge separate claims for each investment property?',
            answer:
              'Yes. Each property affected by the same event must be lodged as a separate claim, even with the same insurer. Each property has its own sum insured, excess, scope of damage, and tenancy circumstances. Do not combine properties in a single claim. Maintain separate documentation files for each property from the day of the event — photos, scope of works, contractor invoices, and rent loss evidence — attributed to the specific property they relate to.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Rental Property Water Damage',
            href: '/guides/property/rental-property-water-damage',
            description: 'Tenant rights and landlord obligations after water damage in Australian rental properties.',
          },
          {
            title: 'Water Damage Insurance Claim Process',
            href: '/guides/insurance/water-damage-insurance-claim-process',
            description: 'Step-by-step guide to lodging a water damage insurance claim in Australia.',
          },
          {
            title: 'Document Water Damage for Insurance',
            href: '/guides/insurance/document-water-damage-insurance',
            description: 'How to photograph and document water damage to support your insurance claim.',
          },
          {
            title: 'Loss Assessor vs Contractor',
            href: '/guides/insurance/loss-assessor-vs-contractor',
            description: 'Understanding the difference between a loss assessor and a restoration contractor.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
