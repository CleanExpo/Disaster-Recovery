import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Office Water Damage: Minimising Business Interruption | Disaster Recovery',
  description: 'Expert answers and solutions for "office building water damage business interruption". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'office building water damage business interruption, disaster recovery, restoration services, Australia, IICRC certified' };

export default function OfficeWaterDamageBusinessInterruptionPage() {
  return (
    <AgGuidePageTemplate
      category="Commercial"
      title="Office Water Damage: Minimising Business Interruption"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E293B 0%, #334155 100%)"
      icon={<Building2 className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Commercial', href: '/guides/commercial' },
        { label: 'Office Water Damage: Minimising Business Interr...' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      sections={[
        {
          heading: 'Immediate Impact on Office Operations',
          body: (
            <div className="space-y-4">
              <p>
                Water damage in an office environment triggers an immediate cascade of operational disruption. Unlike residential properties where the occupants can temporarily relocate with relative ease, an office represents a complex web of interconnected systems &mdash; IT infrastructure, telecommunications, document storage, client-facing spaces, and shared facilities &mdash; that all fail simultaneously when water enters the workspace.
              </p>
              <p>
                <strong>Common causes of office water damage</strong> include burst pipes in ceiling cavities (particularly common in older commercial buildings across Australian CBDs), HVAC condensate line failures, roof leaks during storm events, fire sprinkler discharges (both accidental and deliberate), and plumbing failures in kitchenettes or bathrooms on upper floors that cascade down through multiple levels.
              </p>
              <p>
                <strong>The first 60 minutes are critical.</strong> Water migrates rapidly through commercial office fitouts. Suspended ceiling tiles absorb water and collapse, releasing water onto desks, computers, and documents below. Water tracks along cable trays and power conduits, reaching areas well beyond the visible leak. Carpet tiles and raised floor systems wick moisture horizontally, spreading the affected zone far wider than the initial water entry point.
              </p>
              <p>
                <strong>Multi-tenancy complications</strong> are common in Australian office buildings. A water event on one floor frequently affects tenants on the floors below. Liability, access, and coordination between multiple tenants, the building manager, and separate insurance policies add layers of complexity that do not exist in single-occupancy properties.
              </p>
              <p>
                <strong>Staff displacement</strong> begins immediately. Electrical safety requirements may force power isolation to entire floors. Wet carpet and ceiling tile debris create slip hazards. Depending on the water source, contamination concerns (sewage from failed sanitary plumbing, grey water from HVAC) may require evacuation until the space is assessed and cleared.
              </p>
            </div>
          ),
        },
        {
          heading: 'Business Interruption Insurance Coverage',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Business interruption (BI) insurance is designed to cover the financial losses that result from an insured event forcing your business to cease or reduce operations. For office-based businesses, BI cover typically includes lost revenue, ongoing fixed costs (rent, salaries, loan repayments), and additional expenses incurred to maintain operations during the disruption period.
              </p>
              <p>
                <strong>What BI insurance typically covers:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Loss of gross profit</strong> &mdash; Revenue lost during the period your business cannot operate normally, calculated against your declared turnover.</li>
                <li><strong>Increased cost of working</strong> &mdash; Additional expenses incurred to keep the business running, such as temporary office hire, equipment rental, overtime, and courier costs for relocated operations.</li>
                <li><strong>Ongoing fixed expenses</strong> &mdash; Rent, insurance premiums, permanent staff wages, and other costs that continue regardless of whether the business is operating.</li>
                <li><strong>Indemnity period</strong> &mdash; Most BI policies have an indemnity period (commonly 12 or 24 months) that defines the maximum duration of cover. Claims must be lodged and supported within this period.</li>
              </ul>
              <p>
                <strong>Critical documentation requirements:</strong> BI claims are notoriously complex and document-intensive. Insurers require evidence of pre-loss revenue (typically 12 months of financial records), proof that the interruption was directly caused by the insured event, documentation of all additional expenses incurred, and evidence that you took reasonable steps to minimise the interruption. The quality of your documentation directly determines the success of your BI claim.
              </p>
              <p>
                <strong>Common pitfalls:</strong> Many businesses discover too late that their BI sum insured is inadequate, their indemnity period is too short, or their policy has exclusions for the specific cause of the water damage (e.g., flood vs. burst pipe). Review your BI policy annually and ensure the declared values reflect current turnover and fixed costs.
              </p>
            </div>
          ),
        },
        {
          heading: 'Minimising Downtime: Temporary Relocation and Salvage Priorities',
          body: (
            <div className="space-y-4">
              <p>
                The faster your team can resume productive work, the lower your total loss. Minimising downtime requires simultaneous action on two fronts: getting your people working again (even in a temporary location) and salvaging critical assets from the damaged office.
              </p>
              <p>
                <strong>Temporary relocation options:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Serviced offices</strong> &mdash; Available at short notice in most Australian CBDs and major regional centres. Providers like Regus, WeWork, and local operators can accommodate teams from 2 to 200+ with desks, internet, and meeting rooms operational within 24&ndash;48 hours.</li>
                <li><strong>Remote work activation</strong> &mdash; If your IT infrastructure supports it (cloud-based systems, VPN access, laptops), mobilising staff to work from home can begin within hours. Document the additional costs (IT support, communication tools, productivity impacts) for your BI claim.</li>
                <li><strong>Alternative premises</strong> &mdash; For longer disruptions, negotiating a short-term lease on nearby vacant office space may be more cost-effective than serviced offices. Your BI policy&apos;s &ldquo;increased cost of working&rdquo; provision typically covers this.</li>
              </ul>
              <p>
                <strong>Salvage priorities in order:</strong>
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>IT equipment and servers</strong> &mdash; Computers, servers, and networking equipment that have not been directly contacted by water should be relocated immediately. Equipment that has sustained water contact requires specialist assessment.</li>
                <li><strong>Critical documents and records</strong> &mdash; Physical files, contracts, financial records, and legal documents. Wet paper documents can be stabilised through freeze-drying if acted upon within 48 hours.</li>
                <li><strong>Client-sensitive materials</strong> &mdash; Anything containing personal or confidential information has privacy obligations under the Privacy Act 1988. Damaged records containing personal data must be secured, not simply discarded.</li>
                <li><strong>Furniture and fitout</strong> &mdash; Desks, chairs, and partitions that are not water-damaged should be protected from ongoing exposure. Items that are wet must be assessed &mdash; solid timber furniture can often be restored, while laminated particleboard typically cannot.</li>
              </ol>
            </div>
          ),
        },
        {
          heading: 'Documenting Business Interruption Claims',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                The difference between a successful BI claim and a disputed one is almost always documentation. Start documenting from the moment the water event is discovered and do not stop until operations are fully restored.
              </p>
              <p>
                <strong>What to document and how:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Incident timeline</strong> &mdash; Record when the water was discovered, when emergency services and contractors were contacted, when power was isolated, when staff were evacuated, and every subsequent action with timestamps. A simple log with dates, times, and actions is sufficient.
                </li>
                <li>
                  <strong>Photographic evidence</strong> &mdash; Photograph all visible damage before any cleanup begins. Include wide shots showing the extent of affected areas and close-ups showing damage to specific assets. Photograph equipment serial numbers and asset tags on damaged items. Modern smartphones embed date and location metadata automatically.
                </li>
                <li>
                  <strong>Financial impact records</strong> &mdash; Track all lost revenue (cancelled appointments, delayed projects, lost sales), additional expenses (temporary office costs, equipment hire, overtime), and ongoing fixed costs that continue during the interruption. Keep receipts for everything.
                </li>
                <li>
                  <strong>Staff impact</strong> &mdash; Record which staff were displaced, for how long, and what alternative work arrangements were made. Document any overtime or additional costs incurred to maintain operations.
                </li>
                <li>
                  <strong>Restoration progress</strong> &mdash; Your restoration contractor provides daily progress reports, moisture readings, and completion milestones. These form part of your BI claim evidence, demonstrating the duration and progression of the restoration work.
                </li>
              </ul>
              <p>
                <strong>Professional tip:</strong> Appoint one person as the documentation coordinator from day one. Having a single point of responsibility ensures nothing is missed and all records are consistent and complete.
              </p>
            </div>
          ),
        },
        {
          heading: 'How Disaster Recovery Gets Offices Operational Faster',
          body: (
            <div className="space-y-4">
              <p>
                Disaster Recovery connects you with IICRC-certified commercial restoration contractors who understand that every hour of downtime costs your business money. The process is designed to minimise disruption and maximise the speed of your return to normal operations.
              </p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Lodge your claim online</strong> &mdash; Submit your emergency through <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> with details of the water event, affected areas, and number of floors or tenancies impacted. NRPG instantly matches you with contractors experienced in commercial office restoration within your selected radius.
                </li>
                <li>
                  <strong>60-minute emergency response</strong> &mdash; Matched contractors respond within 60 minutes, 24/7. For office environments, the initial focus is always on water extraction, power safety assessment, and protecting unaffected areas from secondary damage.
                </li>
                <li>
                  <strong>Make-safe and containment</strong> &mdash; Emergency water extraction, containment barriers to protect unaffected zones, and removal of collapsed ceiling tiles and debris. The goal is to stabilise the environment and prevent the damage from spreading further.
                </li>
                <li>
                  <strong>Formal contract and restoration plan</strong> &mdash; After make-safe, your contractor provides a formal contract with full terms and conditions, including a detailed scope of works and restoration timeline. We bill you directly so work begins immediately without waiting for insurer approval. You control the process and claim reimbursement from your insurer using the full claims documentation we provide.
                </li>
                <li>
                  <strong>Phased restoration</strong> &mdash; The contractor works floor by floor or zone by zone, returning restored areas to your team as they are completed rather than waiting until the entire project is finished. This phased approach can reduce your total downtime by 40&ndash;60% compared to a whole-building approach.
                </li>
              </ol>
              <p className="mt-4">
                Payment plans are available through <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Blue Fire Finance</a> for commercial restorations. Full claims documentation &mdash; including moisture logs, progress reports, and itemised costings &mdash; is provided to support your property damage and business interruption claims.
              </p>
            </div>
          ),
        },
      ]}
      faqs={[
        {
          question: 'How long does it take to restore a water-damaged office?',
          answer: 'The timeline depends on the severity and extent of the damage. Minor water events (single room, clean water) can be dried and restored within 3–5 days. Significant events affecting multiple floors with contaminated water typically take 2–4 weeks for full restoration. Phased restoration allows your team to reoccupy completed areas progressively, reducing total business interruption.',
        },
        {
          question: 'Can we continue working in the office during restoration?',
          answer: 'In many cases, yes — through phased restoration. Unaffected areas can remain operational while damaged zones are contained, dried, and restored. The contractor establishes containment barriers (plastic sheeting, negative air pressure) to separate the work zone from occupied areas. However, if electrical safety or contamination concerns exist, full evacuation of affected floors may be necessary until those issues are resolved.',
        },
        {
          question: 'How do we claim for business interruption losses?',
          answer: 'Business interruption claims require detailed documentation: pre-loss financial records (12 months minimum), an incident timeline, evidence of lost revenue, records of additional expenses incurred to maintain operations, and proof that you took reasonable steps to minimise the interruption. Your restoration contractor provides daily progress reports and moisture readings that demonstrate the duration of the disruption. We recommend appointing a documentation coordinator from day one.',
        },
        {
          question: 'Who pays for the restoration — us or the building owner?',
          answer: 'This depends on the cause of the water damage and the lease terms. Generally, structural and building services (pipes, roof, common areas) are the building owner\'s responsibility, while tenant fitout damage is the tenant\'s responsibility. Our contractors bill you directly so work begins immediately without waiting for liability determinations. We provide full claims documentation to support whoever ultimately lodges the insurance claim.',
        },
        {
          question: 'What happens in a multi-tenancy building where multiple floors are affected?',
          answer: 'Multi-tenancy water events require coordination between tenants, the building manager, and multiple insurers. Our contractors work with all parties to ensure a unified restoration approach. Each affected tenancy receives its own scope of works and documentation for their respective insurance claims. The building manager receives documentation for any common area or building services damage. This coordinated approach avoids conflicting repair works and ensures nothing falls through the gaps.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Data Centre Water Damage Recovery Services',
          href: '/guides/commercial/data-centre-water-damage',
          description: 'Specialist restoration for data centres and critical IT infrastructure affected by water damage.',
        },
        {
          title: 'Retail Store Flood: Inventory Recovery Process',
          href: '/guides/commercial/retail-flood-inventory-recovery',
          description: 'How to triage inventory, document stock losses, and restore retail environments after flood damage.',
        },
        {
          title: 'Find 24-Hour Emergency Restoration Services',
          href: '/guides/emergency/find-24-hour-emergency-restoration',
          description: 'How to access emergency restoration services around the clock across Australia.',
        },
      ]}
    />
  );
}
