import { Metadata } from 'next';
import { Truck } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Equipment finance — NRPG contractor benefit | Disaster Recovery',
  description:
    'NRPG network contractors can access commercial equipment finance for trucks, drying rigs, thermal cameras, dehumidifiers and HEPA filters through Equipped Commercial Finance. Disaster Recovery is a Reg 25 referrer, not the lender.',
  keywords: [
    'NRPG contractor equipment finance',
    'restoration equipment finance Australia',
    'commercial equipment finance contractors',
    'Equipped Commercial Finance contractor referral',
    'chattel mortgage restoration equipment',
  ],
  canonical: '/contractor/equipment-finance',
});

export default function ContractorEquipmentFinancePage() {
  return (
    <AgContentPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Contractors', href: '/contractor' },
        { label: 'Equipment finance' },
      ]}
      hero={{
        gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #0ea5e9 100%)',
        icon: <Truck className="w-16 h-16 text-white" aria-hidden />,
        title: 'Equipment finance for your restoration business',
        subtitle:
          'An NRPG contractor benefit: Equipped Commercial Finance for restoration equipment. Disaster Recovery is a Reg 25 referrer and not the lender.',
      }}
      stats={[
        { label: 'Partner', value: 'Equipped' },
        { label: 'Purpose', value: 'Commercial only' },
        { label: 'Contact window', value: '2 business days' },
      ]}
      sections={[
        {
          heading: 'Why this benefit exists',
          body: (
            <div className="space-y-4 text-slate-700">
              <p>
                NRPG network <strong>Contractors</strong> often need to bring new equipment online faster
                than a single restoration job can fund. This benefit gives you a single referral path into{' '}
                <strong>Equipped Commercial Finance</strong> for commercial equipment finance — trucks, drying
                fans, thermal imaging cameras, dehumidifiers, HEPA filtration, and other restoration gear.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fast equipment provisioning for IICRC-certified work</li>
                <li>One referral form for the whole NRPG network</li>
                <li>No waiting for restoration jobs to fund the next purchase</li>
                <li>Commercial purpose only — no consumer or personal finance</li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'What Equipped provides',
          background: 'light',
          body: (
            <div className="space-y-3 text-slate-700">
              <p>Equipped Commercial Finance arranges commercial-purpose credit for Australian ABN holders, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Equipment leases for restoration plant and vehicles</li>
                <li>Chattel mortgages on trucks, trailers and specialist equipment</li>
                <li>Asset-backed lines of credit for working capital tied to equipment</li>
              </ul>
              <p className="text-sm text-slate-600">
                Rates, terms and approval criteria are set entirely by Equipped. Disaster Recovery does not quote,
                approve, or guarantee any finance outcome.
              </p>
            </div>
          ),
        },
        {
          heading: 'How to apply',
          body: (
            <ol className="list-decimal pl-6 space-y-3 text-slate-700">
              <li>
                <strong>Verify your NRPG contractor status</strong> in the contractor portal before submitting.
              </li>
              <li>
                <strong>Complete a one-page referral form</strong> — ABN, years trading, equipment type, and a
                rough funding range.
              </li>
              <li>
                <strong>Equipped contacts the business owner</strong> within 2 business days to run their own
                commercial application.
              </li>
              <li>
                <strong>Decisions, rates and terms are set entirely by Equipped.</strong> Disaster Recovery /
                NRPG is a Reg 25 referrer under the NCCP Regulations 2010 (Cth) and is not the lender.
              </li>
            </ol>
          ),
        },
        {
          heading: 'Eligibility',
          background: 'light',
          body: (
            <div className="space-y-3 text-slate-700">
              <ul className="list-disc pl-6 space-y-2">
                <li>Active Australian ABN</li>
                <li>Trading history as required by Equipped at the time of application</li>
                <li>Commercial purpose only — no consumer or personal finance through this pathway</li>
                <li>Approved NRPG contractor status in the network</li>
              </ul>
              <p className="text-sm text-slate-600">
                Eligibility for finance itself is subject to Equipped&apos;s own assessment. NRPG status only
                confirms you may use this referral channel.
              </p>
            </div>
          ),
        },
        {
          heading: 'Equipped Commercial Finance — licensing',
          body: (
            <div className="space-y-3 text-sm text-slate-700">
              <p>
                Equipped Commercial Finance is operated by SME Consulting Group Pty Ltd
                (ABN 53 662 478 408). Equipped holds the relevant Australian Credit Licence or acts as an
                authorised credit representative, and is a member of the Australian Financial Complaints
                Authority (AFCA). Licensing and membership numbers are stated in Equipped&apos;s Credit Guide,
                linked below.
              </p>
              <p className="text-xs text-slate-500">
                {/* TODO(equipped-phase1): replace with verified ACL, ACR and AFCA numbers once the Credit Guide PDF is extracted. */}
                ACL / ACR number: see Credit Guide. AFCA member number: see Credit Guide.
              </p>
            </div>
          ),
        },
        {
          heading: 'Disclosures',
          background: 'light',
          body: (
            <div className="space-y-4 text-sm text-slate-600">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Not legal advice. Please read the documents below before continuing.
              </p>
              <p>
                This page concerns <strong>commercial equipment finance</strong> for ABN-holding NRPG network{' '}
                <strong>Contractors</strong>. Disaster Recovery is a referrer under reg 25 of the National
                Consumer Credit Protection Regulations 2010 (Cth). A referral fee may be paid to Disaster
                Recovery by Equipped Commercial Finance when a referral results in a funded transaction. That
                fee does not come out of the loan amount and does not change the price paid for the finance.
              </p>
              <p>
                Any credit or finance decision is made solely by Equipped Commercial Finance and/or its
                authorised lending partners. Disaster Recovery does not and cannot guarantee any finance
                outcome and does not give credit advice.
              </p>
              <p>
                This is a Phase 1 referral service for Australian businesses (commercial purpose only). New
                Zealand and consumer pathways are not in scope.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <a
                    href="/finance/credit-guide-equipped-v17-202307.pdf"
                    className="text-blue-700 underline hover:text-blue-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Credit Guide (Equipped Commercial Finance, V17)
                  </a>{' '}
                  — licensee details, fees, AFCA membership and complaint pathways.
                </li>
                <li>
                  <a
                    href="/finance/privacy-disclosure-statement-equippedcf-v2.pdf"
                    className="text-blue-700 underline hover:text-blue-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Disclosure Statement (Equipped Commercial Finance)
                  </a>{' '}
                  — how Equipped collects, uses and discloses your personal information.
                </li>
              </ul>
            </div>
          ),
        },
      ]}
      cta={{ text: 'Start an equipment finance referral', href: '/finance/referral?channel=contractor' }}
      secondaryCta={{ text: 'Back to contractor portal', href: '/contractor/portal' }}
      relatedPages={[
        {
          title: 'Contractor portal',
          href: '/contractor/portal',
          description: 'Your dispatch, jobs and KPIs in one place.',
        },
        {
          title: 'Apply to join NRPG',
          href: '/contractor/apply',
          description: 'Seven-step onboarding for IICRC-certified restoration businesses.',
        },
        {
          title: 'Recovery funding (client finance)',
          href: '/finance',
          description: 'Client-facing finance referrals for commercial recovery work.',
        },
      ]}
    />
  );
}
