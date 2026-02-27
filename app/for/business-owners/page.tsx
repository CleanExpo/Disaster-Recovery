import { Metadata } from 'next';
import { Store } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Business Owners | Commercial Disaster Recovery',
  description:
    'Emergency disaster restoration for business owners and commercial tenants across Australia. Get back to trading fast with full business interruption documentation.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/for/business-owners',
  },
};

/* -------------------------------------------------------------------------- */
/* FAQ data — used for both visible Q&A and JSON-LD schema                    */
/* -------------------------------------------------------------------------- */

const faqs: { question: string; answer: string }[] = [
  {
    question: 'My business premises is flooded — what should I do first?',
    answer:
      'Ensure everyone is safe and evacuate the premises if necessary. Turn off the electricity at the mains if you can reach the switchboard safely. Do not walk through standing water that may be in contact with electrical sources. Once safe, photograph and video the damage immediately — before you touch anything. Then call Disaster Recovery on 1300 309 361 for emergency response within 60 minutes.',
  },
  {
    question: 'Is the landlord or tenant responsible for flood damage restoration?',
    answer:
      'It depends on your lease and the type of damage. Generally, the landlord\'s building insurance covers structural damage (walls, ceilings, floors, plumbing). The tenant\'s contents or business insurance covers stock, fit-out, equipment and personal property. In strata buildings, the body corporate covers common areas. However, you should act first to prevent further damage and sort out liability afterwards — delay only makes things worse and more expensive.',
  },
  {
    question: 'How quickly can you get my business back open?',
    answer:
      'Our emergency response arrives within 60 minutes, 24 hours a day, 7 days a week. The full restoration timeline depends on the extent of damage, but we prioritise commercial properties because we understand that every day closed is revenue lost. For many water damage incidents, we can have you partially trading again within 24–48 hours while restoration continues in affected areas.',
  },
  {
    question: 'What business interruption documentation do you provide for insurance?',
    answer:
      'We provide a comprehensive documentation package: timestamped before, during and after photographs; moisture mapping and readings; a detailed scope of works; restoration timeline; materials and equipment logs; and a completion certificate. This package is designed to support your business interruption claim and give your insurer everything they need to process your reimbursement.',
  },
  {
    question: 'Can I keep trading while restoration work is happening?',
    answer:
      'In many cases, yes. We assess whether unaffected areas can remain operational while we work on damaged sections. We use containment barriers, negative air pressure and noise management to minimise disruption. If the entire premises needs to be closed, we will give you a clear timeline so you can make arrangements — whether that means temporary relocation, redirecting customers, or notifying suppliers.',
  },
  {
    question: 'How does payment work — do I pay or does my insurance?',
    answer:
      'We bill you directly — the business owner or tenant — not your insurer. This is actually a significant advantage: it means work starts immediately without waiting for insurer approval, loss adjuster visits or scope negotiations. We provide full documentation so you can submit our invoices to your insurer for reimbursement. Payment plans are also available through Blue Fire Finance for larger restorations.',
  },
  {
    question: 'What is the emergency make-safe fee?',
    answer:
      'The emergency make-safe fee is $2,750. This breaks down as $550 for the Disaster Recovery platform fee and $2,200 held for the attending contractor. This covers the initial emergency response: securing the premises, stopping the source of damage, extracting standing water, setting up drying equipment and preventing further loss. After make-safe, your contractor provides a formal scope of works and contract for the full restoration.',
  },
];

export default function BusinessOwnersPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
          heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
          icon: <Store className="h-12 w-12" />,
          title: 'Disaster Recovery for Business Owners',
          subtitle:
            'Every hour your business is closed costs you money. We respond within 60 minutes, 24/7, anywhere in Australia — and give you full documentation for your insurance claim.',
        }}
        cta={{ text: 'Get Your Business Back Trading', href: '/claim' }}
        secondaryCta={{ text: 'Emergency Make-Safe Guide', href: '/insurance/emergency-make-safe-guide' }}
        ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'For Business', href: '/for' },
          { label: 'Business Owners' },
        ]}
        stats={[
          { label: 'Response Time', value: '< 60 min' },
          { label: 'Available', value: '24/7/365' },
          { label: 'Business Focus', value: 'Minimal Downtime' },
          { label: 'Documentation', value: 'Full Claims Support' },
        ]}
        sections={[
          /* ------------------------------------------------------------------ */
          /* 1. Immediate Steps to Protect Your Business (default bg)           */
          /* ------------------------------------------------------------------ */
          {
            heading: 'Immediate Steps to Protect Your Business',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  When disaster strikes your business premises, the first 60 minutes are critical.
                  What you do — and don't do — in that window directly affects the total damage,
                  the restoration timeline and the strength of your insurance claim. Panic is
                  natural, but a clear set of actions will save you thousands and potentially weeks
                  of lost trading.
                </p>

                <h3>1. Ensure safety first</h3>
                <p>
                  Evacuate staff, customers and anyone on the premises immediately. If there is
                  standing water, do not walk through it if there is any chance it is in contact
                  with electrical wiring or appliances. Account for everyone and move to a safe
                  assembly point outside the building. If the building is structurally compromised
                  — visible cracks, sagging ceiling, smoke — do not re-enter until cleared by
                  emergency services.
                </p>

                <h3>2. Isolate power and water</h3>
                <p>
                  If you can safely reach your electrical switchboard, turn off the mains. For
                  water damage, shut off the water supply at the mains stopcock. For gas, turn off
                  the gas meter if you smell gas or suspect a leak. These actions stop the source
                  and prevent secondary damage — a burst pipe that runs for another hour can double
                  the damage footprint.
                </p>

                <h3>3. Document the damage immediately</h3>
                <p>
                  Before you move anything, photograph and video the damage from multiple angles.
                  Capture the full extent: ceilings, walls, floors, stock, equipment, documents.
                  Use your phone's timestamp feature. This evidence is critical for your insurance
                  claim and for any tenant–landlord discussions about liability. Photograph serial
                  numbers on damaged equipment where possible.
                </p>

                <h3>4. Secure the premises — protect stock, equipment and documents</h3>
                <p>
                  Move high-value stock, electronics, paper documents and irreplaceable items to a
                  dry, unaffected area. If water is still entering, use towels, tarpaulins or
                  anything available to divert flow away from critical assets. Cover equipment with
                  plastic sheeting. Every item you protect now is one less item on your insurance
                  claim and one less thing to replace before you can reopen.
                </p>

                <h3>5. Call Disaster Recovery — 60-minute response guarantee</h3>
                <p>
                  Call us or{' '}
                  <Link href="/claim"><strong>lodge an emergency claim online</strong></Link>.
                  Our IICRC-certified contractors from the national NRPG network arrive within 60
                  minutes, 24 hours a day, 365 days a year. We begin emergency make-safe
                  immediately: water extraction, containment, drying equipment deployment and
                  structural assessment. You do not need insurer approval — work starts the moment
                  we arrive.
                </p>

                <h3>6. Notify your landlord or property manager</h3>
                <p>
                  If you are a tenant, notify your landlord or managing agent as soon as possible.
                  Most leases require prompt notification of damage. Send a written message (email
                  or text) with your photos and a description of what happened. This creates a
                  paper trail. Do not wait for the landlord to act before engaging a restoration
                  company — delay causes more damage and more cost for everyone.
                </p>

                <h3>7. Contact your insurance broker or company</h3>
                <p>
                  Lodge your claim as early as possible. Have your policy number, the date and time
                  of the event, your initial photos and a brief description of the damage ready.
                  If you have both building and contents insurance, you may need to lodge separate
                  claims. Your broker can guide you. We provide all the documentation your insurer
                  will need — but the initial notification should come from you.
                </p>
              </div>
            ),
          },

          /* ------------------------------------------------------------------ */
          /* 2. Tenant vs Landlord Obligations (light bg)                       */
          /* ------------------------------------------------------------------ */
          {
            heading: 'Tenant vs Landlord Obligations',
            background: 'light',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  One of the most stressful parts of commercial disaster recovery is working out
                  who is responsible for what. As a tenant, you may feel caught between your
                  landlord, the body corporate and your own insurer. Here is how responsibility
                  typically falls — though your specific lease may vary.
                </p>

                <h3>Structure and building damage — typically the landlord's responsibility</h3>
                <p>
                  Structural elements of the building — walls, roof, floors, plumbing, common
                  stairwells and the building envelope — are generally covered by the landlord's
                  building insurance policy. If a pipe bursts inside a wall cavity and damages the
                  slab, that is usually the landlord's claim. The landlord's insurer will typically
                  appoint their own contractors, though this process can take days or weeks.
                </p>

                <h3>Contents, stock, fit-out — typically the tenant's responsibility</h3>
                <p>
                  Everything you brought into the premises — your stock, equipment, furniture,
                  signage, shelving, computer systems and any fit-out you installed — is your
                  responsibility under your contents or business insurance policy. This is the most
                  common area where business owners are underinsured. If you have spent $100,000 on
                  a kitchen fit-out, your contents policy needs to reflect that.
                </p>

                <h3>Common areas in strata — body corporate's responsibility</h3>
                <p>
                  If your business operates within a strata scheme, damage to common property
                  (lobbies, car parks, shared corridors, external walls) is the body corporate's
                  responsibility under their strata insurance policy. You may still need to
                  coordinate with the strata manager, particularly if the source of damage is in a
                  common area but the effect is in your tenancy.
                </p>

                <h3>Lease-specific obligations</h3>
                <p>
                  Your lease may contain specific clauses about maintenance, repairs and damage
                  notification. Some leases require you to maintain certain fixtures. Some give the
                  landlord the right to choose contractors. Some require you to carry specific
                  insurance minimums. Review your lease — or have your solicitor review it — as
                  part of your recovery process. But do this in parallel with the restoration, not
                  instead of it.
                </p>

                <h3>Act first, sort liability later</h3>
                <p>
                  This is the most important point: <strong>do not delay restoration while you
                  argue about who pays</strong>. Every hour of delay causes more damage. Mould
                  begins growing within 24–48 hours of water damage. Smoke residue from fire
                  permanently etches glass and metal surfaces within days. The additional damage
                  caused by delay will cost far more than the initial response — and neither
                  landlord nor tenant benefits from a worse outcome.
                </p>

                <h3>How Disaster Recovery handles the billing</h3>
                <p>
                  We bill whoever engages us — the business owner, the tenant, the landlord or the
                  property manager. We do not get involved in tenant–landlord disputes about who
                  should ultimately bear the cost. Our job is to restore your premises as fast as
                  possible and provide the documentation both parties need for their respective
                  insurance claims. If you are the tenant and you engage us, we bill you directly,
                  and you claim reimbursement from your insurer.
                </p>
              </div>
            ),
          },

          /* ------------------------------------------------------------------ */
          /* 3. Business Interruption Documentation (default bg)                */
          /* ------------------------------------------------------------------ */
          {
            heading: 'Business Interruption Documentation',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  Business interruption (BI) insurance is one of the most valuable — and most
                  under-claimed — components of a commercial policy. It covers the revenue you lose
                  while your premises is out of action. But to claim it, you need meticulous
                  documentation. This is where many business owners fall short, and where we
                  provide significant value.
                </p>

                <h3>What business interruption insurance typically covers</h3>
                <p>
                  BI cover generally reimburses your net profit plus ongoing fixed expenses (rent,
                  loan repayments, permanent staff wages, insurance premiums) for the period your
                  business cannot trade. Some policies also cover increased costs of working — for
                  example, the cost of temporary premises or equipment hire to keep partial
                  operations running. Your indemnity period (the maximum time the insurer will
                  cover) is defined in your policy — check it now, before you need it.
                </p>

                <h3>Documentation your insurer will need</h3>
                <p>
                  A successful BI claim requires a clear timeline and supporting evidence. Your
                  insurer will typically ask for:
                </p>
                <ul>
                  <li>Date and time the event occurred</li>
                  <li>Date the business ceased trading (or reduced capacity)</li>
                  <li>Date the business resumed full trading</li>
                  <li>Photographic evidence of damage preventing trade</li>
                  <li>Revenue records for the equivalent period in previous years (BAS statements, POS reports, bank statements)</li>
                  <li>Evidence of cancelled bookings, diverted customers or lost contracts</li>
                  <li>Invoices for any temporary measures (equipment hire, temporary premises)</li>
                  <li>The restoration scope of works and timeline from your contractor</li>
                </ul>

                <h3>What Disaster Recovery provides</h3>
                <p>
                  We provide a comprehensive documentation package specifically designed to support
                  insurance claims:
                </p>
                <ul>
                  <li><strong>Timestamped photographic record</strong> — before, during and after restoration</li>
                  <li><strong>Moisture mapping and data logs</strong> — objective readings showing the extent of water damage and drying progress</li>
                  <li><strong>Detailed scope of works</strong> — every task, material and piece of equipment itemised</li>
                  <li><strong>Restoration timeline</strong> — when work started, milestones reached, completion date</li>
                  <li><strong>Completion certificate</strong> — confirming the premises has been restored to pre-loss condition</li>
                </ul>
                <p>
                  This documentation package is provided as part of your restoration — you do not
                  need to request it separately. It is designed to give your insurer and loss
                  adjuster everything they need without follow-up requests that delay your
                  reimbursement.
                </p>

                <h3>How to document your lost revenue</h3>
                <p>
                  While we handle the physical restoration documentation, you need to handle the
                  financial side. Start a daily log from the moment the event occurs:
                </p>
                <ul>
                  <li>Record your daily revenue for the period you are closed or operating at reduced capacity</li>
                  <li>Gather your POS or accounting records for the same period in the previous 12 months</li>
                  <li>Keep copies of cancelled bookings, refunded deposits and lost contracts</li>
                  <li>Document any customers you had to turn away and the estimated value</li>
                  <li>Record all additional expenses: temporary signage, customer notifications, stock storage, alternative premises</li>
                </ul>

                <h3>Keep a log of everything</h3>
                <p>
                  From the moment the disaster occurs, keep a written log of every conversation,
                  every phone call, every cost and every decision. Include dates, times and the
                  names of people you spoke to. This log is admissible evidence and is invaluable
                  if there is a dispute with your insurer about the claim timeline, the scope of
                  damage or the period of interruption. Use your phone's notes app and back it up
                  to the cloud daily.
                </p>
              </div>
            ),
          },

          /* ------------------------------------------------------------------ */
          /* 4. Stock and Inventory Salvage (light bg)                          */
          /* ------------------------------------------------------------------ */
          {
            heading: 'Stock and Inventory Salvage',
            background: 'light',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  For many businesses — retail shops, warehouses, restaurants, pharmacies — the
                  stock on the premises represents tens or hundreds of thousands of dollars in
                  value. What can be saved, what must be written off and how you document the
                  difference has a direct impact on your insurance outcome and your recovery speed.
                </p>

                <h3>What can be saved vs what is a write-off</h3>
                <p>
                  The answer depends on the type of damage, the type of stock and how quickly
                  salvage begins. Hard goods (metal tools, glass, sealed plastics) can often be
                  cleaned and restored. Soft goods (textiles, paper, upholstered furniture) are
                  more difficult — water-damaged fabric can be cleaned if treated within 24–48
                  hours, but mould contamination usually means a write-off. Electronics depend on
                  whether power was running at the time of water exposure. If an item was powered
                  on and got wet, it is almost certainly damaged beyond economical repair.
                </p>

                <h3>Time-sensitive items require immediate decisions</h3>
                <p>
                  Some stock categories have zero tolerance for delay:
                </p>
                <ul>
                  <li><strong>Food and perishables</strong> — if cold chain has been broken or flood water has contacted food, it must be disposed of immediately. Health regulations are non-negotiable.</li>
                  <li><strong>Pharmaceuticals</strong> — any medication exposed to water, heat or contamination must be quarantined and cannot be sold. Contact the TGA for disposal requirements.</li>
                  <li><strong>Electronics and electrical equipment</strong> — remove power immediately. Do not attempt to turn on wet electronics. A specialist data recovery service may be able to retrieve drives.</li>
                  <li><strong>Paper documents and records</strong> — freeze wet documents within 48 hours to prevent mould. Professional document drying services can recover most paper records if treated quickly.</li>
                </ul>

                <h3>Inventory documentation for insurance</h3>
                <p>
                  Before you dispose of anything, photograph it. Photograph every damaged item
                  individually where practical, and in bulk where not (for example, a pallet of
                  water-damaged cartons). Record the quantity, description and approximate
                  replacement value. Your insurer needs this evidence to assess your contents
                  claim — if you dispose of stock without documentation, you may not be reimbursed.
                </p>
                <p>
                  If you have a POS system or inventory management system, export your current
                  stock levels before the disaster (or as close to the event date as possible).
                  This becomes your baseline for calculating loss.
                </p>

                <h3>Salvage vs replacement cost</h3>
                <p>
                  Your insurance policy may cover replacement cost (what it costs to buy new) or
                  indemnity value (the current value of the item, accounting for depreciation).
                  Check your policy wording. For high-value items like commercial kitchen
                  equipment, refrigeration units or specialised machinery, the difference between
                  replacement cost and indemnity value can be significant. If your policy pays
                  replacement cost, it may be more cost-effective to claim a write-off than to
                  pay for restoration of a partially damaged item.
                </p>

                <h3>How Disaster Recovery helps with inventory assessment</h3>
                <p>
                  Our contractors are trained to work alongside you during the initial assessment
                  to categorise stock into salvageable and non-salvageable. We photograph and
                  document everything as part of our standard process. For{' '}
                  <Link href="/services/commercial-services">
                    <strong>commercial restoration projects</strong>
                  </Link>
                  , we can coordinate with specialist services — document drying, electronics
                  recovery, cold storage for perishable goods — to maximise what can be saved and
                  minimise your claim.
                </p>
              </div>
            ),
          },

          /* ------------------------------------------------------------------ */
          /* 5. Getting Back to Trading (default bg)                            */
          /* ------------------------------------------------------------------ */
          {
            heading: 'Getting Back to Trading',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  This is ultimately what matters: reopening your doors and returning to revenue.
                  Every decision we make — from the initial response to the final sign-off — is
                  driven by one question: what gets this business trading again as fast as possible,
                  without compromising the quality of the restoration?
                </p>

                <h3>Our restoration timeline — what to expect</h3>
                <p>
                  Every situation is different, but here is a general timeline for a commercial
                  water damage restoration:
                </p>
                <ul>
                  <li><strong>Hour 0–1:</strong> Emergency response arrives, initial assessment, water extraction begins</li>
                  <li><strong>Hours 1–4:</strong> Make-safe complete, drying equipment deployed, containment set up</li>
                  <li><strong>Days 1–3:</strong> Active drying phase, daily moisture monitoring, salvage assessment</li>
                  <li><strong>Days 3–7:</strong> Drying targets met, equipment removed, remediation of affected materials begins</li>
                  <li><strong>Days 7–14+:</strong> Restoration and reinstatement (painting, flooring, fit-out), depending on scope</li>
                </ul>
                <p>
                  For smaller incidents (a single room, localised leak), you could be back trading
                  within 48–72 hours. For major events (full floor flooding, fire damage), the
                  timeline extends accordingly — but we give you a clear schedule from Day 1 so
                  you can plan.
                </p>

                <h3>Partial trading — can some areas remain open?</h3>
                <p>
                  Wherever possible, we work to keep unaffected areas of your business operational.
                  We use physical containment barriers, negative air pressure systems and dust
                  management to isolate the restoration zone from the trading zone. If your shop
                  front is unaffected but your storeroom is flooded, you may be able to keep
                  serving customers while we work behind the scenes. We assess this on arrival and
                  discuss options with you immediately.
                </p>

                <h3>Temporary relocation considerations</h3>
                <p>
                  If your entire premises is uninhabitable, you may need to operate from a
                  temporary location. Consider:
                </p>
                <ul>
                  <li>Does your business interruption insurance cover temporary premises costs?</li>
                  <li>Can you redirect your phone number and update your Google Business Profile listing?</li>
                  <li>Do you have a business continuity plan with pre-identified alternative sites?</li>
                  <li>Can you shift to online or delivery-only operations temporarily?</li>
                </ul>
                <p>
                  The faster you make these decisions, the less revenue you lose. We give you a
                  realistic timeline on Day 1 so you can make informed choices about whether to
                  relocate or wait.
                </p>

                <h3>Compliance — health and safety certification before reopening</h3>
                <p>
                  Depending on your industry, you may need clearance certificates before reopening.
                  Food businesses require health and safety sign-off. Childcare centres need
                  specific air quality certification. Medical practices must meet infection control
                  standards. Our IICRC-certified contractors understand these requirements and
                  ensure the restoration meets the applicable Australian Standards. We provide
                  completion certificates that satisfy both your insurer and your regulatory body.
                </p>

                <h3>Speed without compromising quality</h3>
                <p>
                  We understand the pressure to reopen. But cutting corners on restoration —
                  reopening before drying targets are met, painting over moisture, skipping mould
                  checks — leads to problems that are far more expensive to fix later. Our
                  approach is aggressive timelines with rigorous quality checks. We use data-driven
                  drying (daily moisture readings, psychrometric monitoring) to push the process
                  as fast as the physics allow, while ensuring the restoration is complete and
                  will not fail within months.
                </p>
              </div>
            ),
          },

          /* ------------------------------------------------------------------ */
          /* 6. Insurance Claim Support (light bg)                              */
          /* ------------------------------------------------------------------ */
          {
            heading: 'Insurance Claim Support',
            background: 'light',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  Navigating the insurance process after a disaster is one of the most frustrating
                  parts of recovery. You are already dealing with damage, lost revenue and
                  operational disruption — the last thing you need is weeks of back-and-forth with
                  your insurer before work can even begin. Our billing model eliminates that delay
                  entirely.
                </p>

                <h3>We bill you directly — not your insurer</h3>
                <p>
                  This is the single most important thing to understand about how we work:
                  <strong> we bill you directly</strong> — the business owner or tenant. We do not
                  bill your insurance company, and we do not wait for your insurer to approve
                  the scope of works before starting. This means work begins immediately. No
                  waiting for a loss adjuster to visit. No waiting for scope negotiations between
                  your insurer and a panel contractor. No two-week delay while paperwork moves
                  between departments.
                </p>

                <h3>You control the process</h3>
                <p>
                  Because you are our client — not the insurance company — you control the
                  restoration. You decide the priority areas, you approve the scope, and you set
                  the timeline expectations. There are no scope disputes between us and an insurer
                  that leave your premises half-restored while they negotiate. You get the
                  restoration you need, when you need it.
                </p>

                <h3>Full documentation for your claim</h3>
                <p>
                  We provide everything your insurer needs to process your reimbursement claim:
                </p>
                <ul>
                  <li>Timestamped before, during and after photographs</li>
                  <li>Moisture data and drying logs</li>
                  <li>Detailed scope of works with itemised materials and labour</li>
                  <li>Equipment deployment records</li>
                  <li>Completion certificate confirming restoration to pre-loss condition</li>
                </ul>
                <p>
                  You submit this documentation package to your insurer as part of your claim.
                  Because our documentation is thorough and IICRC-compliant, it satisfies the
                  evidence requirements insurers look for. This reduces the chance of your claim
                  being disputed or delayed. For more detail on the insurance claims process, see
                  our{' '}
                  <Link href="/insurance/emergency-make-safe-guide">
                    <strong>Emergency Make-Safe Guide</strong>
                  </Link>
                  .
                </p>

                <h3>The $2,750 emergency make-safe fee</h3>
                <p>
                  The initial emergency make-safe service costs $2,750. This is broken down as:
                </p>
                <ul>
                  <li><strong>$550</strong> — Disaster Recovery platform fee (triage, contractor matching, coordination)</li>
                  <li><strong>$2,200</strong> — held for the attending NRPG contractor (emergency response, extraction, make-safe works)</li>
                </ul>
                <p>
                  After the emergency make-safe is complete, your contractor will provide a formal
                  scope of works and contract for the full restoration. This contract includes
                  clear terms, conditions and pricing before any further work proceeds.
                </p>

                <h3>Payment plans for larger restorations</h3>
                <p>
                  Commercial restorations can run into tens of thousands of dollars. If you need
                  to spread the cost while waiting for your insurance reimbursement, payment plans
                  are available through{' '}
                  <a
                    href="https://www.bluefirefinance.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>Blue Fire Finance</strong>
                  </a>
                  . This allows you to get the restoration done now and manage cash flow while your
                  insurer processes the claim. Many business owners find this particularly useful
                  because insurance reimbursement can take 30–90 days, and you cannot afford to
                  wait that long to restore your premises and resume trading.
                </p>
              </div>
            ),
          },

          /* ------------------------------------------------------------------ */
          /* 7. Frequently Asked Questions (dark bg)                            */
          /* ------------------------------------------------------------------ */
          {
            heading: 'Frequently Asked Questions',
            background: 'dark',
            body: (
              <div className="prose prose-lg max-w-none" style={{ color: 'inherit' }}>
                <p>
                  The most common questions we receive from business owners and commercial tenants
                  during a disaster recovery situation.
                </p>

                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    style={{
                      marginBottom: '1rem',
                      padding: '1rem 1.25rem',
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    <summary
                      style={{
                        fontWeight: 600,
                        fontSize: '1.05rem',
                        cursor: 'pointer',
                        color: 'var(--ag-surface-white)',
                        lineHeight: 1.5,
                      }}
                    >
                      {faq.question}
                    </summary>
                    <p
                      style={{
                        marginTop: '0.75rem',
                        lineHeight: 1.7,
                        color: 'rgba(255,255,255,0.85)',
                      }}
                    >
                      {faq.answer}
                    </p>
                  </details>
                ))}

                <p style={{ marginTop: '2rem' }}>
                  Have a question not answered here?{' '}
                  <Link href="/claim" style={{ color: 'var(--ag-accent-orange, #f97316)', fontWeight: 600 }}>
                    Lodge an emergency claim
                  </Link>{' '}
                  or visit our{' '}
                  <Link href="/for" style={{ color: 'var(--ag-accent-orange, #f97316)', fontWeight: 600 }}>
                    business hub
                  </Link>{' '}
                  for more resources.
                </p>
              </div>
            ),
          },
        ]}
        relatedPages={[
          {
            title: 'Commercial Restoration Services',
            href: '/services/commercial-services',
            description: 'Full-service commercial disaster restoration for all property types and damage categories.',
          },
          {
            title: 'Emergency Make-Safe Guide',
            href: '/insurance/emergency-make-safe-guide',
            description: 'Detailed breakdown of the $2,750 make-safe fee, your rights and the insurance reimbursement process.',
          },
          {
            title: 'For Business Hub',
            href: '/for',
            description: 'Resources for property managers, strata managers, facilities managers and councils.',
          },
          {
            title: 'Lodge an Emergency Claim',
            href: '/claim',
            description: 'Start your emergency restoration claim online — 60-minute contractor response, 24/7.',
          },
        ]}
      />
    </>
  );
}
