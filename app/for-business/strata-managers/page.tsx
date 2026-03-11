import { Metadata } from 'next';
import { Building } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Strata Managers | Body Corporate Disaster Recovery',
  description:
    'Emergency disaster restoration for strata managers and body corporate committees across Australia. Common property restoration, emergency spending authority, per-lot documentation.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/for/strata-managers',
  },
};

/* -------------------------------------------------------------------------- */
/* FAQ data — used for both visible <details> and JSON-LD FAQPage schema      */
/* -------------------------------------------------------------------------- */

const faqs: { question: string; answer: string }[] = [
  {
    question:
      'Who is responsible for common property water damage in a strata building?',
    answer:
      'The owners corporation (body corporate) is responsible for maintaining and repairing common property, which includes the building structure, roof, external walls, shared plumbing, corridors, stairwells, and common amenities. If water damage originates from common property infrastructure — such as a burst riser main, failed roof membrane, or blocked common drain — the body corporate is responsible for both the repair and any consequential damage to individual lots. If the damage originates entirely within a lot (for example, a tenant leaving a tap running), the lot owner is typically responsible. In grey areas, refer to your strata plan and by-laws, and seek legal advice if needed.',
  },
  {
    question:
      'Can a strata manager authorise emergency repairs without committee approval?',
    answer:
      'Yes. Under strata legislation in every Australian state and territory, strata managers can authorise urgent repairs to common property without waiting for committee approval, provided the work is necessary to prevent imminent danger to life or property, or to prevent further damage. The spending threshold varies by jurisdiction — for example, in NSW (SSMA 2015) a strata managing agent can spend up to $1,000 per item without approval, or more if the work is urgent and necessary. In Queensland (BCCMA 1997) the body corporate manager has similar urgent repair authority. The $2,750 emergency make-safe fee typically falls within emergency spending authority. You should document the emergency, the decision to authorise repairs, and the rationale, then table it for ratification at the next committee meeting.',
  },
  {
    question:
      'How does body corporate insurance work for disaster restoration?',
    answer:
      'Body corporate insurance (also called strata insurance or building insurance) covers the building structure, common property, and sometimes fixtures within lots as originally installed. When common property is damaged, the body corporate lodges a claim with its insurer. The policy will have an excess (deductible), which for commercial strata can range from $1,000 to $20,000 or more depending on the policy and the type of event. Disaster Recovery bills the body corporate directly so restoration work begins immediately — there is no waiting for insurer approval. We then provide full documentation including damage assessments, scope of works, moisture readings, progress reports, and completion certificates, giving the body corporate everything needed to submit a complete insurance claim for reimbursement.',
  },
  {
    question:
      'What happens if damage affects both common property and individual lots?',
    answer:
      'This is one of the most complex situations in strata management. When damage crosses the boundary between common property and individual lots — for example, a burst common riser flooding multiple apartments — both the body corporate insurer and individual lot owners or their contents insurers may be involved. We document everything separately: common property damage is recorded and reported to the body corporate, while lot-specific damage is documented on a per-unit basis so individual owners can lodge their own claims. Our per-lot damage reports include photos, moisture readings, and scope of works specific to each unit, making it straightforward for owners to pursue their own insurance claims.',
  },
  {
    question:
      'How do you coordinate restoration across multiple affected units?',
    answer:
      'We develop a floor-by-floor, unit-by-unit restoration plan that accounts for the building layout, the extent of damage, and the needs of each affected resident. A dedicated project coordinator manages access scheduling, communicates with all owners and tenants, and sequences work to minimise disruption to unaffected residents. For after-hours access to vacant or tenanted units, we coordinate through the strata manager or building manager. Equipment placement, drying schedules, and contractor movements are all planned centrally to avoid conflicts and ensure efficient restoration across all affected areas simultaneously.',
  },
  {
    question:
      'What documentation do you provide for body corporate records?',
    answer:
      'We provide comprehensive documentation suitable for body corporate records, committee meetings, and insurance claim submissions. This includes: initial damage assessment with photographic evidence; moisture mapping and readings for each affected area; a detailed scope of works with methodology; per-lot damage reports separating common property from lot-specific damage; daily progress updates; final completion certificates with before-and-after photos; and a full cost breakdown. All documentation is formatted for easy inclusion in committee meeting packs and annual general meeting reports.',
  },
  {
    question: 'What is the emergency make-safe fee and how is it paid?',
    answer:
      'The emergency make-safe fee is $2,750, comprising a $550 platform fee and $2,200 held for the attending contractor. This covers the initial emergency response: arriving on-site, assessing the damage, stopping the source where possible, extracting standing water, setting up containment, and deploying initial drying equipment. The body corporate is invoiced directly — we do not bill insurers. This fee is typically within the emergency spending authority available to strata managers under state legislation, so committee approval is not usually required for the initial make-safe. Payment plans are available through Blue Fire Finance for larger restoration projects beyond the initial make-safe.',
  },
];

// All FAQ data is trusted static content — safe to stringify
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

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function StrataManagersPage() {
  return (
    <>
      <script
        id="strata-managers-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
          heroImage:
            '/images/generated/disaster-recovery/hero-commercial-services.webp',
          icon: <Building className="h-12 w-12" />,
          title: 'Disaster Recovery for Strata Managers',
          subtitle:
            'Common property damage, emergency spending authority, per-lot documentation, and multi-unit coordination — we handle the complexity so you can manage the building.',
        }}
        cta={{ text: 'Report Common Property Damage', href: '/claim' }}
        secondaryCta={{
          text: 'Emergency Make-Safe Guide',
          href: '/insurance/emergency-make-safe-guide',
        }}
        ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'For Business', href: '/for' },
          { label: 'Strata Managers' },
        ]}
        stats={[
          { label: 'Response Time', value: '< 60 min' },
          { label: 'Available', value: '24/7/365' },
          { label: 'Coverage', value: 'Australia-Wide' },
          { label: 'Reports', value: 'Per-Lot' },
        ]}
        sections={[
          /* ---------------------------------------------------------------- */
          /* 1. Common Property vs Lot Owner Responsibility — default bg      */
          /* ---------------------------------------------------------------- */
          {
            heading: 'Common Property vs Lot Owner Responsibility',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  When disaster strikes a strata building, the first question is
                  always the same: whose responsibility is this? The answer
                  determines who lodges the insurance claim, who pays for
                  restoration, and who engages the restoration contractor. Getting
                  this wrong can mean delays, disputes, and unrecovered costs for
                  the owners corporation.
                </p>

                <h3>What counts as common property</h3>
                <p>
                  Common property is everything that is not part of an individual
                  lot as defined by the strata plan. In practice, this typically
                  includes the building structure itself — foundations, load-bearing
                  walls, roof membranes, external walls, and facades. It also
                  includes shared building services: fire systems, common plumbing
                  risers, electrical mains, lift shafts, and HVAC plant. Corridors,
                  stairwells, foyers, car parks, gardens, pools, gymnasiums, and
                  any other common amenity are all common property.
                </p>
                <p>
                  When a common plumbing riser bursts and floods three floors, that
                  is common property damage. When the roof membrane fails during a
                  storm and water penetrates into the top-floor units, the membrane
                  failure is a common property issue. When fire damages the
                  building&apos;s electrical switchboard and corridor, the body
                  corporate is responsible for those repairs.
                </p>

                <h3>What is the lot owner&apos;s responsibility</h3>
                <p>
                  Individual lot owners are typically responsible for internal
                  fixtures and fittings within their lot boundary — paint, carpet,
                  floating floors, cabinetry, appliances, and personal contents. If
                  a lot owner&apos;s washing machine overflows and damages only
                  their own unit, that is generally their responsibility (and their
                  contents insurer&apos;s concern).
                </p>

                <h3>The grey areas</h3>
                <p>
                  Strata responsibility disputes most commonly arise where common
                  property meets lot boundaries. Waterproof membranes in bathrooms,
                  windows and window frames, balcony tiles, pipes within walls that
                  serve a single lot — these are all grey areas that vary by state
                  legislation and individual strata plans. In NSW, the{' '}
                  <em>Strata Schemes Management Act 2015</em> provides specific
                  guidance. In Queensland, the{' '}
                  <em>
                    Body Corporate and Community Management Act 1997
                  </em>{' '}
                  defines lot and common property differently again.
                </p>
                <p>
                  As a strata manager, you need a restoration partner who
                  understands these distinctions and documents damage accordingly.
                  We provide separate documentation for common property damage and
                  lot-specific damage, so the body corporate and individual lot
                  owners each have what they need for their respective insurance
                  claims.
                </p>
              </div>
            ),
          },

          /* ---------------------------------------------------------------- */
          /* 2. Emergency Spending Powers — light bg                          */
          /* ---------------------------------------------------------------- */
          {
            heading: 'Emergency Spending Powers',
            background: 'light',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  When common property is damaged, you often cannot wait for the
                  next committee meeting to authorise repairs. Water is spreading,
                  mould growth begins within 24 to 48 hours, and every hour of
                  delay increases the final restoration cost. Australian strata
                  legislation recognises this reality and gives strata managers the
                  authority to act.
                </p>

                <h3>The legal framework</h3>
                <p>
                  Under strata legislation in every state and territory, strata
                  managers and body corporate committees have the power to authorise
                  urgent or emergency repairs to common property without a general
                  meeting resolution. The specifics vary:
                </p>
                <ul>
                  <li>
                    <strong>NSW</strong> — Under the{' '}
                    <em>Strata Schemes Management Act 2015</em>, the strata
                    committee can authorise expenditure to carry out urgent repairs
                    or maintenance. A managing agent can spend up to their delegated
                    authority, and this can be increased for emergencies.
                  </li>
                  <li>
                    <strong>Queensland</strong> — The{' '}
                    <em>
                      Body Corporate and Community Management Act 1997
                    </em>{' '}
                    allows the committee to approve spending for urgent maintenance
                    necessary to protect common property or ensure safety.
                  </li>
                  <li>
                    <strong>Victoria</strong> — Under the{' '}
                    <em>Owners Corporations Act 2006</em>, the owners corporation
                    can authorise emergency expenditure for repairs that are urgent
                    and necessary.
                  </li>
                  <li>
                    <strong>Other states</strong> — WA, SA, TAS, NT, and ACT all
                    have equivalent provisions allowing emergency repairs without
                    prior general meeting approval.
                  </li>
                </ul>

                <h3>What constitutes &quot;urgent&quot;</h3>
                <p>
                  Emergency spending authority applies when repairs are necessary to
                  prevent imminent danger to occupants, prevent further damage to
                  common property, or maintain essential services. A burst pipe
                  flooding multiple units, a fire-damaged stairwell blocking egress,
                  storm damage exposing the building interior to the elements — all
                  clearly qualify.
                </p>

                <h3>The $2,750 make-safe in context</h3>
                <p>
                  Our emergency make-safe fee is $2,750 ($550 platform fee plus
                  $2,200 held for the attending contractor). For most strata
                  schemes, this is well within the emergency spending authority
                  available to the strata manager or committee chair. The make-safe
                  covers immediate response: stopping the damage source, water
                  extraction, containment, and initial drying equipment deployment.
                </p>

                <h3>Documenting the decision</h3>
                <p>
                  Even when you have authority to act, documentation protects
                  everyone. Record the nature of the emergency, when you became
                  aware, why immediate action was necessary, the spending amount
                  authorised, and the contractor engaged. Table this at the next
                  committee meeting for ratification. We provide a complete
                  emergency response report — including timestamps, photos, and
                  scope of initial works — that you can attach directly to the
                  committee meeting minutes.
                </p>
              </div>
            ),
          },

          /* ---------------------------------------------------------------- */
          /* 3. Body Corporate Insurance Claims — default bg                  */
          /* ---------------------------------------------------------------- */
          {
            heading: 'Body Corporate Insurance Claims',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  Body corporate insurance is fundamentally different from
                  residential home insurance, and understanding how it works is
                  critical to managing the restoration process efficiently. As a
                  strata manager, you are often the person responsible for lodging
                  the claim, coordinating with loss adjusters, and managing owner
                  expectations around timelines and costs.
                </p>

                <h3>How body corporate insurance works</h3>
                <p>
                  Body corporate insurance (sometimes called strata insurance or
                  building insurance) covers the building structure, common property
                  infrastructure, and — depending on the policy — fixtures and
                  fittings within lots as originally installed by the developer. It
                  does not typically cover tenant or owner contents, improvements
                  made by lot owners after the original build, or items that are the
                  lot owner&apos;s responsibility under the strata plan.
                </p>
                <p>
                  Policies are usually arranged by the strata manager on behalf of
                  the owners corporation, with the premium funded from the
                  administrative fund (or sinking fund for capital works). Common
                  perils covered include storm, fire, water damage, and malicious
                  damage.
                </p>

                <h3>Excess and deductible considerations</h3>
                <p>
                  Commercial strata policies often carry higher excesses than
                  residential home insurance. It is not uncommon for a body
                  corporate policy to have a $5,000 general excess, with special
                  excesses of $10,000 to $20,000 for specific event types such as
                  flood, storm surge, or water damage from faulty waterproofing.
                  Some policies also have percentage-based excesses for major events.
                  Knowing your excess before an incident helps you manage owner
                  expectations and assess whether small claims are worth lodging.
                </p>

                <h3>We bill the body corporate directly</h3>
                <p>
                  Disaster Recovery bills the body corporate (owners corporation)
                  directly. We do not bill insurers and we do not wait for insurer
                  approval before commencing work. This means restoration begins
                  immediately — within 60 minutes of your call — rather than days
                  or weeks into an insurance approval process. You control the
                  process, not the insurer.
                </p>
                <p>
                  We provide the body corporate with full documentation — damage
                  assessment, scope of works, moisture readings, progress reports,
                  and completion certificates — everything the insurer needs to
                  process the body corporate&apos;s reimbursement claim.
                </p>

                <h3>Timeline: restoration vs insurance</h3>
                <p>
                  Restoration and insurance run on different timelines. Emergency
                  make-safe happens within hours. Full restoration may take days to
                  weeks depending on the extent of damage. Insurance claims can take
                  weeks to months to settle, particularly for larger strata claims
                  where loss adjusters are appointed and multiple parties are
                  involved. Because we bill the body corporate directly, restoration
                  is never held up by insurance timelines. The body corporate pays
                  for restoration, then claims reimbursement from the insurer —
                  keeping the two processes entirely separate.
                </p>
              </div>
            ),
          },

          /* ---------------------------------------------------------------- */
          /* 4. Documentation for All Owners — light bg                       */
          /* ---------------------------------------------------------------- */
          {
            heading: 'Documentation for All Owners',
            background: 'light',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  Strata managers live and die by documentation. Every dollar spent,
                  every decision made, every repair authorised — it all needs to be
                  recorded, reported, and defensible. When disaster strikes a
                  building with 20, 50, or 200 lot owners, the documentation burden
                  is enormous. We built our reporting specifically for strata.
                </p>

                <h3>Per-lot damage reports</h3>
                <p>
                  Every affected unit receives its own damage report. Each report
                  includes photographic evidence of the damage within that lot,
                  moisture readings at multiple points (walls, floors, ceilings,
                  subfloor where accessible), the specific scope of works required
                  for that unit, and the restoration methodology to be used. These
                  per-lot reports allow individual owners to lodge their own
                  contents insurance claims with their personal insurer, independent
                  of the body corporate&apos;s building insurance claim.
                </p>

                <h3>Common area documentation</h3>
                <p>
                  Common property damage is documented separately from lot-specific
                  damage. This includes all corridors, stairwells, lift lobbies,
                  plant rooms, car parks, and shared amenities. The common area
                  report goes directly to the body corporate for inclusion in the
                  building insurance claim. By keeping common property and lot
                  documentation separate, there is no confusion about which costs
                  belong to the body corporate and which belong to individual owners.
                </p>

                <h3>Committee-ready reporting</h3>
                <p>
                  All documentation is formatted for direct inclusion in committee
                  meeting packs. Summary reports can be distributed to all owners
                  at the next annual general meeting or extraordinary general
                  meeting. Detailed cost breakdowns are available for the committee
                  and treasurer. We understand that strata managers need to justify
                  every expenditure to owners who may not have been present when the
                  disaster occurred — our documentation makes that straightforward.
                </p>

                <h3>Full scope of works and completion certificates</h3>
                <p>
                  Before restoration begins beyond the initial make-safe, we
                  provide a detailed scope of works with methodology, materials,
                  timeframes, and costs. On completion, you receive a formal
                  completion certificate with before-and-after photographic evidence,
                  final moisture readings confirming the building has been returned
                  to pre-loss condition, and a warranty on all work performed. This
                  documentation package satisfies insurer requirements, committee
                  governance obligations, and any future audit or dispute resolution
                  needs.
                </p>

                <h3>Insurance claim submission package</h3>
                <p>
                  We compile all common property documentation into a single
                  submission package ready for the body corporate&apos;s insurer.
                  This includes the initial damage assessment, cause of loss
                  analysis where determinable, full scope of works, itemised
                  invoicing, progress documentation, and completion certificates.
                  Many strata managers tell us that the quality of our documentation
                  significantly reduces back-and-forth with loss adjusters and
                  speeds up claim settlement.
                </p>
              </div>
            ),
          },

          /* ---------------------------------------------------------------- */
          /* 5. Multi-Unit Coordination — default bg                          */
          /* ---------------------------------------------------------------- */
          {
            heading: 'Multi-Unit Coordination',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  A burst riser on the twelfth floor does not just damage one unit.
                  Water follows gravity, and by the time you discover the source, it
                  may have affected every unit below it — plus the corridor, lift
                  lobby, and car park. Restoring a multi-unit strata building is
                  fundamentally different from restoring a single house. It requires
                  coordination across multiple owners, tenants, and access points,
                  all while keeping the rest of the building functional.
                </p>

                <h3>Floor-by-floor, unit-by-unit planning</h3>
                <p>
                  We develop a restoration plan that maps every affected area in the
                  building. Each unit is assessed individually, but the work is
                  planned holistically. Drying equipment is positioned to account
                  for airflow between units and floors. Containment barriers are
                  placed to protect unaffected areas. Demolition and rebuild
                  sequences are staged so that work in one unit does not compromise
                  the restoration in another.
                </p>

                <h3>Minimising disruption to unaffected residents</h3>
                <p>
                  In a 50-unit building where 12 units are affected, 38 households
                  still need to live their lives. We plan equipment placement and
                  work schedules to minimise noise, manage common area access, and
                  keep lifts and stairwells available wherever possible. Drying
                  equipment in corridors is positioned to maintain clear egress
                  paths. If car park spaces need to be temporarily used for
                  equipment staging, we coordinate with the strata manager to
                  notify affected owners.
                </p>

                <h3>Communication protocols</h3>
                <p>
                  We provide a single point of contact — a dedicated project
                  coordinator — who liaises directly with the strata manager. You
                  receive daily progress updates that you can forward to the
                  committee and affected owners. For major incidents, we can provide
                  written updates suitable for distribution to all lot owners via
                  your usual communication channels — noticeboard, email, or owner
                  portal.
                </p>

                <h3>After-hours and vacant unit access</h3>
                <p>
                  Restoration cannot always wait until business hours, and not every
                  unit has a resident available to open the door. We work with
                  strata managers and building managers to coordinate access to
                  vacant units, investment properties managed by real estate agents,
                  and units where the owner is overseas or unavailable. For
                  emergency access where damage is actively spreading, we can
                  advise on the legal provisions that allow entry to lots for urgent
                  common property repairs — though this is always a last resort
                  coordinated through the strata manager.
                </p>

                <h3>Sequencing and efficiency</h3>
                <p>
                  Restoring 12 units is not 12 times the work of restoring one —
                  provided it is managed correctly. Shared drying equipment, bulk
                  materials procurement, and coordinated contractor scheduling
                  across all units reduces both cost and timeline compared to
                  treating each unit as a separate project. Our multi-unit
                  coordination experience means the body corporate gets a more
                  efficient restoration with less disruption than engaging separate
                  contractors for each lot.
                </p>
              </div>
            ),
          },

          /* ---------------------------------------------------------------- */
          /* 6. Working With Your Strata Insurer — light bg                   */
          /* ---------------------------------------------------------------- */
          {
            heading: 'Working With Your Strata Insurer',
            background: 'light',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  Insurance is critical for strata — but it should not dictate the
                  speed of your emergency response. Our billing model is designed to
                  keep restoration and insurance as two separate, parallel
                  processes. The building gets restored immediately. The insurance
                  claim runs in the background.
                </p>

                <h3>We bill the body corporate, not the insurer</h3>
                <p>
                  We bill the body corporate (owners corporation) directly for all
                  restoration work. We do not bill insurers, we do not wait for
                  insurer pre-approval, and we do not negotiate scope with loss
                  adjusters before starting work. This is by design. It means the
                  body corporate controls the restoration — you choose the scope,
                  the timeline, and the contractor. There is no insurer-appointed
                  project manager overriding your decisions or reducing scope to
                  minimise the insurer&apos;s payout.
                </p>

                <h3>Faster response, no approval delays</h3>
                <p>
                  When a strata building has a burst pipe at 2am on a Saturday, the
                  insurer&apos;s claims line may not even be staffed. Even during
                  business hours, getting insurer approval for emergency works can
                  take days. Our model means restoration begins within 60 minutes
                  of your call — because the only approval needed is yours. The
                  body corporate engages us directly, we respond immediately, and
                  the insurance claim is lodged afterwards with full supporting
                  documentation.
                </p>

                <h3>Complete claims documentation</h3>
                <p>
                  We provide everything the body corporate needs to submit a
                  thorough insurance claim: initial damage assessment and cause
                  analysis, photographic evidence at every stage, moisture readings
                  and mapping, detailed scope of works, itemised invoicing,
                  progress reports, and final completion certificates. This
                  documentation package is specifically designed for insurance
                  submission — it answers the questions loss adjusters ask before
                  they ask them.
                </p>

                <h3>Loss adjusters — what to expect</h3>
                <p>
                  For significant strata claims, the insurer will typically appoint
                  a loss adjuster to inspect the damage, review the scope of works,
                  and assess the claim. Loss adjusters may visit the site during or
                  after restoration. We are experienced in working alongside loss
                  adjusters — our documentation, methodology, and pricing are
                  transparent and defensible. We can arrange site access for the
                  loss adjuster and walk them through the damage, the response, and
                  the restoration scope.
                </p>

                <h3>Payment options for large common property jobs</h3>
                <p>
                  Major strata restoration projects — particularly those affecting
                  multiple floors or the entire building — can run into significant
                  costs. The body corporate is invoiced directly, and insurance
                  reimbursement may take weeks or months. If the administrative fund
                  or sinking fund cannot cover the immediate cost, payment plans are
                  available through{' '}
                  <a
                    href="https://www.bluefirefinance.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Blue Fire Finance
                  </a>
                  . This allows the body corporate to spread the cost while waiting
                  for the insurance claim to settle, without needing to levy owners
                  for an emergency special levy upfront.
                </p>
              </div>
            ),
          },

          /* ---------------------------------------------------------------- */
          /* 7. Frequently Asked Questions — dark bg                          */
          /* ---------------------------------------------------------------- */
          {
            heading: 'Frequently Asked Questions',
            background: 'dark',
            body: (
              <div className="prose prose-lg max-w-none">
                <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Common questions from strata managers and body corporate
                  committees about disaster restoration for multi-unit buildings.
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
                        color: 'rgba(255,255,255,0.8)',
                        lineHeight: 1.7,
                      }}
                    >
                      {faq.answer}
                    </p>
                  </details>
                ))}

                <p
                  style={{
                    marginTop: '2rem',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.95rem',
                  }}
                >
                  Need specific advice for your building?{' '}
                  <Link
                    href="/claim"
                    style={{ color: 'var(--ag-accent-orange, #F59E0B)' }}
                  >
                    Report common property damage
                  </Link>{' '}
                  or read our{' '}
                  <Link
                    href="/insurance/emergency-make-safe-guide"
                    style={{ color: 'var(--ag-accent-orange, #F59E0B)' }}
                  >
                    Emergency Make-Safe Guide
                  </Link>{' '}
                  for full details on the $2,750 initial response.
                </p>
              </div>
            ),
          },
        ]}
        relatedPages={[
          {
            title: 'For Business Hub',
            href: '/for',
            description:
              'All commercial stakeholder pages — property managers, facilities managers, councils, and more.',
          },
          {
            title: 'Commercial Restoration Services',
            href: '/services/commercial-services',
            description:
              'Full-scope commercial disaster restoration for offices, retail, warehouses, and multi-unit buildings.',
          },
          {
            title: 'Emergency Make-Safe Guide',
            href: '/insurance/emergency-make-safe-guide',
            description:
              '$2,750 emergency make-safe breakdown, insurance reimbursement, and your right to choose a contractor.',
          },
          {
            title: 'Lodge a Claim',
            href: '/claim',
            description:
              'Report common property damage online — 24/7 availability with 60-minute emergency response.',
          },
        ]}
      />
    </>
  );
}
