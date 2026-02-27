import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'How Long Does Fire Restoration Take?',
  description: 'Fire damage restoration timelines in Australia — from minor kitchen fires to severe structural damage. Phases of restoration, factors that affect duration, and how to speed up the process.',
  keywords: [
    'fire damage restoration timeline',
    'how long fire damage restoration',
    'fire restoration process',
    'fire damage repair time',
    'house fire restoration Australia',
    'fire damage phases',
    'fire restoration make safe',
    'smoke damage cleaning timeline',
    'fire damage rebuild time',
    'fire restoration insurance documentation',
  ],
  canonical: '/guides/guides/how-long-fire-damage-restoration',
});

export default function HowLongFireDamageRestorationPage() {
  return (
    <AgGuidePageTemplate
      category="Guides"
      title="Fire Damage Restoration Timeline: What to Expect"
      subtitle="Fire damage restoration is one of the most complex and time-consuming restoration projects. Knowing the typical timelines, understanding what happens at each phase, and knowing what you can do to keep things moving helps you plan and reduces the stress of an already difficult situation."
      gradient="linear-gradient(135deg, #0F2942 0%, #1A4674 100%)"
      icon={<BookOpen className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Guides', href: '/guides/guides' },
        { label: 'Fire Damage Restoration Timeline: What to Expect' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      lastReviewed="2026-02-27"
      sections={[
        {
          heading: 'Typical Timeline by Severity',
          body: (
            <div className="space-y-4">
              <p>
                Fire damage restoration timelines vary enormously depending on severity. The following ranges represent typical Australian residential projects from initial make-safe through to re-occupation:
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">Minor Fire Damage (1 to 3 Weeks)</h3>
              <p>
                A contained kitchen fire, a small electrical fire in one room, or localised fire damage with limited smoke spread. The structure is largely intact, and damage is confined to one or two rooms. Soot and smoke residue have not migrated extensively through the HVAC system or building envelope.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Make-safe and board-up: 1 day</li>
                <li>Soot and smoke cleaning: 2 to 5 days</li>
                <li>Odour treatment: 2 to 4 days (can overlap with cleaning)</li>
                <li>Minor repairs and repainting: 3 to 7 days</li>
                <li><strong>Total: 1 to 3 weeks</strong></li>
              </ul>

              <h3 className="font-bold text-lg mt-6 mb-2">Moderate Fire Damage (4 to 8 Weeks)</h3>
              <p>
                Fire damage affecting multiple rooms, significant smoke and soot distribution throughout the property, some structural damage requiring repair (e.g., damaged roof timbers, wall framing), and contents requiring professional pack-out and cleaning.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Make-safe and board-up: 1 to 2 days</li>
                <li>Contents pack-out: 1 to 3 days</li>
                <li>Demolition of damaged materials: 2 to 5 days</li>
                <li>Soot and smoke cleaning: 5 to 10 days</li>
                <li>Odour treatment (thermal fogging, ozone): 3 to 7 days</li>
                <li>Structural repair and rebuild: 2 to 4 weeks</li>
                <li>Contents cleaning and return: 1 to 2 weeks (parallel with rebuild)</li>
                <li><strong>Total: 4 to 8 weeks</strong></li>
              </ul>

              <h3 className="font-bold text-lg mt-6 mb-2">Severe Fire Damage (3 to 6+ Months)</h3>
              <p>
                Significant structural damage, roof collapse, major fire involvement across multiple rooms or floors, complete contents loss, and potential asbestos contamination in pre-1990 buildings. May require engineering assessment and council approvals for structural rebuild.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Make-safe, emergency board-up, and structural shoring: 1 to 3 days</li>
                <li>Fire investigation and insurance assessment: 1 to 4 weeks</li>
                <li>Contents salvage and pack-out: 3 to 7 days</li>
                <li>Asbestos assessment and removal (if applicable): 1 to 3 weeks</li>
                <li>Demolition: 1 to 2 weeks</li>
                <li>Structural engineering and council approvals: 2 to 6 weeks</li>
                <li>Structural rebuild: 6 to 16 weeks</li>
                <li>Fit-out, services, finishes: 2 to 6 weeks</li>
                <li><strong>Total: 3 to 6+ months</strong></li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'Phases of Fire Damage Restoration',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Fire restoration follows a defined sequence of phases. Each phase must be completed before the next can begin — skipping phases or doing them out of order compromises the final result.
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">Phase 1: Emergency Make-Safe</h3>
              <p>
                The first priority is securing the property. This includes board-up of broken windows and openings, tarping damaged roofing to prevent water ingress, disconnection of compromised utilities (gas, electrical), and structural shoring where collapse risk exists. Make-safe work typically begins within hours of the fire being extinguished and is completed within 1 to 2 days.
              </p>
              <p>
                <strong>Important:</strong> After make-safe, your NRPG contractor provides a formal contract with full terms and conditions before proceeding to the restoration phases.
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">Phase 2: Contents Pack-Out</h3>
              <p>
                Salvageable contents are inventoried, packed, and transported to a secure, climate-controlled facility for specialist cleaning. Electronics, documents, photographs, clothing, and soft furnishings each require different cleaning methods. The pack-out creates a detailed inventory with photographic evidence — essential documentation for your insurance claim.
              </p>
              <p>
                Non-salvageable contents are also documented and inventoried before disposal. The distinction between salvageable and non-salvageable is made by the restoration professional based on the type and extent of damage — not by guesswork.
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">Phase 3: Soot and Smoke Removal</h3>
              <p>
                Soot and smoke residue removal is one of the most labour-intensive phases. Different soot types (wet smoke, dry smoke, protein residue) require different cleaning methods and agents. Cleaning proceeds methodically — ceilings first, then walls, then floors — using HEPA vacuuming, chemical sponges, and specialist cleaning solutions.
              </p>
              <p>
                Critically, smoke residue does not stay in the room where the fire occurred. It migrates through the building envelope, enters HVAC ductwork, and deposits on surfaces throughout the property. A thorough smoke cleaning covers the entire building, not just the fire-affected rooms.
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">Phase 4: Odour Elimination</h3>
              <p>
                Smoke odour embeds in porous materials — timber, concrete, plaster, fabric. Surface cleaning removes visible residue but does not eliminate embedded odour. Professional deodourisation uses thermal fogging (penetrating deodorant that follows the same pathways as smoke), ozone treatment (oxidises odour molecules), and hydroxyl generation. Multiple treatments over several days are typically required for moderate to severe smoke damage.
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">Phase 5: Structural Repair and Rebuild</h3>
              <p>
                Once cleaning and deodourisation are complete, structural repair begins. This may range from minor plasterboard patching and repainting (minor fire) to complete roof replacement, wall framing, electrical and plumbing reinstallation, and full interior fit-out (severe fire). Structural repairs may require engineering certification, council building approvals, and inspections at various stages.
              </p>
            </div>
          ),
        },
        {
          heading: 'Factors That Affect the Timeline',
          body: (
            <div className="space-y-4">
              <p>
                Beyond the severity of the fire itself, several factors can significantly extend or compress the restoration timeline:
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong>Fire investigation</strong> — If the fire is suspicious, the fire service or police may seal the site for investigation. No restoration work can begin until the investigation is complete and the site is released. This can add 1 to 4 weeks or more.
                </li>
                <li>
                  <strong>Asbestos</strong> — Properties built before 1990 in Australia may contain asbestos in wall linings, roof sheeting, eaves, floor tiles, or insulation. Fire damage that disturbs asbestos-containing materials triggers mandatory asbestos assessment and licensed removal before any other work proceeds. This adds 1 to 3 weeks and significant cost.
                </li>
                <li>
                  <strong>Water damage from firefighting</strong> — The water used to extinguish the fire often causes water damage that must be addressed alongside the fire damage. Structural drying may run concurrently with soot cleaning but adds complexity and time. Water damage also increases the mould risk — if drying is not begun promptly, mould remediation may become an additional scope item.
                </li>
                <li>
                  <strong>Building approvals</strong> — Structural rebuilds involving changes to load-bearing elements, roofing, or external walls typically require council building approval (Development Application or Complying Development Certificate). Approval timelines vary by council but commonly take 2 to 6 weeks.
                </li>
                <li>
                  <strong>Material availability</strong> — Matching existing materials (specific timber species, heritage fittings, custom joinery) can extend timelines if materials need to be sourced or custom-made. Supply chain delays for standard materials (plasterboard, framing timber, roofing) can also occur during periods of high demand, such as after major bushfire or storm events.
                </li>
                <li>
                  <strong>Scope discovery</strong> — As demolition and cleaning proceed, additional damage is often discovered behind wall linings, in roof cavities, and in subfloor areas. This scope expansion is normal in fire restoration — comprehensive initial assessment minimises surprises, but some discovery during the project is expected.
                </li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'How to Speed Up the Process',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                While fire restoration cannot be rushed without compromising quality, there are practical steps that reduce delays:
              </p>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <strong>Engage a professional restorer immediately</strong> — The sooner make-safe is completed and the restoration process begins, the less secondary damage (water, mould, corrosion) accumulates. Every day of delay adds to the scope. Lodge your claim at <Link href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</Link> for a 60-minute emergency response.
                </li>
                <li>
                  <strong>Do not wait for insurer approval to begin</strong> — We bill you directly, so work begins immediately without waiting for insurer approval. This eliminates the most common delay in fire restoration — waiting weeks for an insurer-appointed assessor and then weeks more for approval to proceed. You control the process and your insurer reimburses you using the documentation we provide.
                </li>
                <li>
                  <strong>Document everything early</strong> — Photograph all damage before any cleanup or demolition begins. Create a written inventory of damaged contents. This documentation will be needed for your insurance claim, and having it ready prevents delays later. Your restoration professional also documents thoroughly, but your own records provide a useful cross-reference.
                </li>
                <li>
                  <strong>Make decisions promptly</strong> — During the rebuild phase, you will need to make decisions about materials, finishes, colours, and fixtures. Delays in these decisions directly delay the rebuild timeline. If possible, begin selecting materials and finishes while the cleaning and demolition phases are underway.
                </li>
                <li>
                  <strong>Address asbestos proactively</strong> — If your property was built before 1990, request an asbestos assessment as part of the initial site assessment rather than waiting until demolition begins. Early identification allows asbestos removal to be scheduled efficiently within the project timeline.
                </li>
                <li>
                  <strong>Maintain communication with your restoration team</strong> — Regular updates and quick responses to questions keep the project moving. If scope changes are discovered, timely decisions on how to proceed prevent work stoppages.
                </li>
              </ol>
            </div>
          ),
        },
        {
          heading: 'Insurance Documentation During Restoration',
          body: (
            <div className="space-y-4">
              <p>
                Fire damage insurance claims are among the most documentation-intensive. Thorough documentation throughout the restoration process is essential for a smooth claim. Your restoration professional should provide:
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">Initial Documentation</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dated photographs of all fire, smoke, soot, and water damage before any remediation begins</li>
                <li>A detailed scope of works with line-item costings</li>
                <li>Contents inventory with photographic evidence — salvageable and non-salvageable items catalogued separately</li>
                <li>Assessment of structural damage with engineering referral if required</li>
              </ul>

              <h3 className="font-bold text-lg mt-6 mb-2">During Restoration</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Progress photographs at each phase (demolition, cleaning, drying, rebuild)</li>
                <li>Moisture readings if water damage is present (daily logs)</li>
                <li>Air quality testing results before and after odour treatment</li>
                <li>Asbestos survey report and clearance certificate (if applicable)</li>
                <li>Variation documentation if additional scope is discovered</li>
              </ul>

              <h3 className="font-bold text-lg mt-6 mb-2">Completion Documentation</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Final photographs of completed restoration</li>
                <li>Completion certificate confirming work was performed to IICRC standards</li>
                <li>Warranties on materials and workmanship</li>
                <li>Contents cleaning reports and return inventory</li>
              </ul>

              <p className="mt-4">
                All of this documentation is provided as part of our service. Full claims documentation supports your insurance reimbursement — your insurer receives a comprehensive record of the damage, the remediation process, and the completed restoration.
              </p>
              <p>
                We bill you directly — you control the process and claim reimbursement from your insurer. After make-safe, your contractor provides a formal contract with full terms and conditions. Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Blue Fire Finance</a>.
              </p>
              <p className="mt-4">
                <Link href="/claim" className="text-blue-400 hover:underline font-medium">
                  Get emergency fire damage restoration &rarr;
                </Link>
              </p>
            </div>
          ),
        },
      ]}
      faqs={[
        {
          question: 'How long does fire damage restoration take for a house?',
          answer: 'Minor fire damage (contained to one room, limited smoke spread) typically takes 1 to 3 weeks. Moderate damage (multiple rooms, significant smoke, some structural repair) takes 4 to 8 weeks. Severe fire damage (major structural damage, roof involvement, full rebuild) takes 3 to 6 months or more. Timelines depend on severity, whether asbestos is present, building approval requirements, material availability, and whether fire investigation delays access.',
        },
        {
          question: 'What are the phases of fire damage restoration?',
          answer: 'Fire restoration follows five main phases: (1) Emergency make-safe — board-up, tarping, utility disconnection, structural shoring. (2) Contents pack-out — salvageable items inventoried, packed, and transported for specialist cleaning. (3) Soot and smoke removal — methodical cleaning of all surfaces using type-specific methods. (4) Odour elimination — thermal fogging, ozone, or hydroxyl treatment to eliminate embedded smoke odour. (5) Structural repair and rebuild — from minor patching to full structural reconstruction.',
        },
        {
          question: 'Why does fire restoration take so long?',
          answer: 'Fire damage is uniquely complex because it involves multiple damage types simultaneously — fire, smoke, soot, water (from firefighting), potential asbestos, and potential structural compromise. Each requires its own remediation process, and many steps must be completed in sequence. Smoke residue migrates throughout the entire property (not just fire-affected rooms), so cleaning scope is extensive. Structural rebuilds may also require engineering assessments and council approvals.',
        },
        {
          question: 'Can I live in my house during fire damage restoration?',
          answer: 'For minor fire damage confined to one area, it may be possible to remain in the property during restoration, provided the affected area can be effectively contained and air quality in occupied areas is safe. For moderate to severe fire damage, temporary relocation is typically necessary for health and safety — smoke residue, soot particles, and deodourisation chemicals create an environment that is not suitable for occupation. Most home insurance policies include temporary accommodation cover.',
        },
        {
          question: 'Do I need to wait for insurance approval before fire restoration starts?',
          answer: 'No. We bill you directly, so work begins immediately without waiting for insurer approval. This is critical for fire restoration because soot corrosion can permanently damage metals, electronics, and finishes within 72 hours, and water from firefighting creates mould risk within 24 to 48 hours. Every day of delay increases the scope and cost. We provide full claims documentation so you can claim reimbursement from your insurer.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Smoke Damage Cleaning Guide',
          href: '/guides/fire-damage/smoke-damage-cleaning-guide',
          description: 'How professional smoke and soot cleaning works and what different residue types require.',
        },
        {
          title: 'Make-Safe & Insurance Coverage',
          href: '/guides/insurance/make-safe-insurance-coverage',
          description: 'What make-safe work covers, what it costs, and how it is handled in insurance claims.',
        },
        {
          title: 'Contents Pack-Out & Storage',
          href: '/guides/services/contents-pack-out-storage',
          description: 'How professional contents pack-out works — inventory, cleaning, storage, and return.',
        },
      ]}
    />
  );
}
