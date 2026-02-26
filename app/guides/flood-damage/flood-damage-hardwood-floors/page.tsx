import { Metadata } from 'next';
import { Waves } from 'lucide-react';
import Link from 'next/link';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Restoring Flood Damaged Hardwood Floors | Assessment, Drying & Refinishing',
  description: 'Can flood-damaged hardwood floors be saved? Professional assessment criteria, controlled drying process, sanding, refinishing, and when replacement is the only option. Australian restoration guide.',
  keywords: [
    'flood damage hardwood floors',
    'hardwood floor water damage restoration',
    'cupping hardwood floors water damage',
    'buckled hardwood floor repair',
    'flood damaged timber floors',
    'hardwood floor drying process',
    'timber floor restoration Australia',
    'water damaged floorboards',
    'hardwood floor insurance claim',
    'timber floor refinishing after flood',
  ],
  canonical: '/guides/flood-damage/flood-damage-hardwood-floors',
});

export default function FloodDamageHardwoodFloorsPage() {
  return (
    <AgGuidePageTemplate
      category="Flood Damage"
      title="Restoring Flood Damaged Hardwood Floors"
      subtitle="Hardwood floors are one of the most valuable features of an Australian home — and one of the most vulnerable to water damage. Understanding how water affects timber, when floors can be saved, and when replacement is necessary helps you make the right decision for your property and your insurance claim."
      gradient="linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)"
      icon={<Waves className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Flood Damage', href: '/guides/flood-damage' },
        { label: 'Restoring Flood Damaged Hardwood Floors' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      lastReviewed="2026-02-27"
      sections={[
        {
          heading: 'How Water Damages Hardwood Floors',
          body: (
            <div className="space-y-4">
              <p>
                Timber is a hygroscopic material — it absorbs and releases moisture in response to its environment. When hardwood flooring is exposed to standing water or prolonged elevated humidity, it absorbs moisture far beyond its equilibrium range. This causes dimensional changes that manifest as visible damage:
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">Cupping</h3>
              <p>
                Cupping occurs when the bottom of each board absorbs more moisture than the top. The edges of the board rise higher than the centre, creating a concave profile across the board width. This is the most common early sign of water damage to hardwood floors and typically occurs within 24 to 72 hours of water exposure. <strong>Cupping is often reversible</strong> with controlled professional drying — but only if the drying process is managed correctly and begun quickly.
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">Crowning</h3>
              <p>
                Crowning is the opposite of cupping — the centre of each board rises higher than the edges, creating a convex profile. Crowning most commonly occurs when cupped boards are sanded too early (before the timber has fully equalised), removing material from the raised edges. When the boards eventually dry and flatten, the sanded edges are now lower than the centre. This is a <strong>permanent condition</strong> caused by premature intervention — and a strong argument for engaging professionals who understand timber drying timelines.
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">Buckling</h3>
              <p>
                Buckling is the most severe form of water damage to hardwood floors. It occurs when extreme moisture absorption causes boards to swell beyond the space available, lifting completely off the subfloor. Buckled boards may separate from their tongue-and-groove connections, crack, split, or permanently deform. <strong>Buckling generally requires board replacement</strong> rather than restoration, though isolated buckled boards can sometimes be replaced individually within an otherwise salvageable floor.
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">Subfloor and Joist Damage</h3>
              <p>
                Water damage to hardwood floors is rarely limited to the flooring itself. Moisture migrates downward into the subfloor (particleboard, plywood, or timber boards), bearers, and joists. Particleboard subfloors are particularly vulnerable — they swell irreversibly when wet and lose structural integrity. Prolonged moisture in the subfloor assembly also creates ideal conditions for mould growth and timber decay (dry rot), which can compromise the structural floor system.
              </p>
            </div>
          ),
        },
        {
          heading: 'Can Your Floors Be Saved? Assessment Criteria',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Not all flood-damaged hardwood floors can or should be restored. A professional assessment considers multiple factors to determine whether restoration is viable, cost-effective, and safe:
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong>Water category</strong> — Category 1 (clean water from a burst pipe or supply line) and Category 2 (grey water from appliances) floors can generally be dried and restored. <strong>Category 3 (black water)</strong> — floodwater, sewage, or stormwater — contaminates porous materials including timber, and IICRC standards typically require removal of contaminated porous flooring. However, some solid hardwood species can be decontaminated and saved with antimicrobial treatment, depending on the contamination level and exposure duration.
                </li>
                <li>
                  <strong>Duration of exposure</strong> — The longer timber is submerged, the deeper moisture penetrates and the greater the dimensional change. Standing water for under 24 hours gives the best chance of successful restoration. After 48 to 72 hours, the probability of irreversible damage (buckling, delamination, joist degradation) increases significantly.
                </li>
                <li>
                  <strong>Timber species and thickness</strong> — Dense Australian hardwoods (Spotted Gum, Blackbutt, Ironbark, Jarrah, Tallowwood) are more resilient to water damage than softer species or imported timbers. Solid boards thicker than 19mm offer more tolerance for sanding and refinishing after drying than engineered timber or thin overlay flooring.
                </li>
                <li>
                  <strong>Fixing method</strong> — Nailed or secret-nailed solid hardwood can often be dried in place using injection mat systems. Floating floors (tongue-and-groove without adhesive or nails) and click-lock engineered timber are more prone to buckling and may need to be lifted, dried off-site, and relaid.
                </li>
                <li>
                  <strong>Subfloor condition</strong> — If the subfloor is particleboard that has swollen, it must be replaced regardless of the hardwood floor condition. Plywood and timber subfloors can generally be dried in place. The subfloor condition often dictates whether the project is a drying-and-refinish job or a full floor replacement.
                </li>
                <li>
                  <strong>Mould presence</strong> — If mould has colonised the underside of flooring boards, the subfloor, or the joist system, mould remediation must be completed before or during the drying process. Surface mould on timber can be treated; deep mould penetration into softwood joists may require timber replacement.
                </li>
              </ul>
              <p className="mt-4">
                <strong>The critical decision:</strong> A qualified restoration professional can make this assessment within the first site visit. Early assessment is essential — the longer you wait, the more moisture migrates, and the higher the probability that salvageable floors become unsalvageable.
              </p>
            </div>
          ),
        },
        {
          heading: 'Professional Restoration Process',
          body: (
            <div className="space-y-4">
              <p>
                When floors can be saved, professional restoration follows a controlled, multi-stage process. Each stage is critical — skipping or rushing any step compromises the final result.
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">Stage 1: Emergency Water Extraction</h3>
              <p>
                Standing water is removed using truck-mounted or portable extraction equipment. Weighted extraction tools are used to pull moisture from the flooring surface and from between board joints. The goal is to remove as much free water as possible before structural drying begins. Speed matters — every hour of standing water increases the depth of moisture penetration.
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">Stage 2: Controlled Structural Drying</h3>
              <p>
                This is the most critical stage. Professional drying uses a combination of air movers, commercial dehumidifiers, and — for hardwood floors — injection drying mats. The mats create a sealed chamber on top of the floor surface, circulating warm, dry air that draws moisture from the timber without causing rapid surface drying that leads to cracking or further cupping.
              </p>
              <p>
                <strong>Drying must be controlled, not rushed.</strong> Rapidly drying one side of a timber board while the other remains wet causes differential stress that leads to cracking, splitting, and permanent deformation. Professional drying targets a gradual, even moisture reduction — typically 2 to 3 percentage points per day — until the boards reach their equilibrium moisture content (usually 10 to 14% in Australian conditions).
              </p>
              <p>
                Drying a hardwood floor typically takes 5 to 14 days depending on timber species, board thickness, and the extent of water penetration. Moisture readings are taken daily at multiple points across the floor to track progress.
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">Stage 3: Equalisation Period</h3>
              <p>
                After drying reaches target moisture content, the floor must be left to equalise — to stabilise at its new moisture content and allow any remaining cupping or dimensional change to settle. This period typically lasts 2 to 4 weeks. <strong>Sanding a floor before it has fully equalised risks creating crowning</strong> — a permanent, unfixable condition.
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">Stage 4: Sanding and Refinishing</h3>
              <p>
                Once the floor has equalised and moisture readings confirm stability, the floor is sanded to remove surface damage, staining, and any residual cupping marks. Sanding proceeds through progressively finer grits (typically 40, 80, 120) to achieve a smooth, even surface. The floor is then finished with polyurethane, oil, or wax according to the original specification or the owner&rsquo;s preference.
              </p>
              <p>
                Quality sanding and finishing of a water-damaged hardwood floor is indistinguishable from a standard floor renovation — when done after proper drying and equalisation, the result is a floor that looks and performs as it did before the damage.
              </p>
            </div>
          ),
        },
        {
          heading: 'When Replacement Is Necessary',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Despite best efforts, some flood-damaged hardwood floors cannot be restored. Replacement is typically required when:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Severe buckling</strong> — Boards have lifted off the subfloor, cracked, split, or permanently deformed beyond what sanding can correct</li>
                <li><strong>Category 3 contamination</strong> — Sewage or floodwater has saturated the timber and antimicrobial treatment is not sufficient to achieve safe re-occupation standards</li>
                <li><strong>Particleboard subfloor failure</strong> — Swollen, crumbling particleboard cannot support the hardwood floor, requiring subfloor replacement (and floor re-laying)</li>
                <li><strong>Engineered timber delamination</strong> — The veneer layer has separated from the core — this is irreversible</li>
                <li><strong>Structural joist damage</strong> — Decay or mould damage to floor joists requires access from above, necessitating floor removal</li>
                <li><strong>Extended submersion</strong> — Timber that was submerged for more than 72 hours in warm conditions often sustains irreversible cellular damage</li>
              </ul>
              <p className="mt-4">
                When replacement is required, the restoration professional documents the damage and the reason replacement (rather than restoration) is necessary. This documentation is essential for your insurance claim — it justifies the higher cost of replacement to your insurer using objective criteria and moisture data, not opinion.
              </p>
              <p>
                <strong>Matching existing floors:</strong> When only part of a floor requires replacement, matching timber species, grade, width, and finish to the existing floor is critical for a seamless result. Australian hardwood species can vary significantly in colour and grain even within the same species. A good restoration professional sources matching timber before beginning replacement to ensure visual continuity.
              </p>
            </div>
          ),
        },
        {
          heading: 'Insurance Coverage for Hardwood Floor Restoration',
          body: (
            <div className="space-y-4">
              <p>
                Most Australian home insurance policies cover water damage restoration including hardwood floor repair or replacement, subject to the cause of damage and the policy terms. Key considerations:
              </p>

              <h3 className="font-bold text-lg mt-6 mb-2">What Is Typically Covered</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Burst pipe or appliance leak causing sudden water damage</li>
                <li>Storm damage resulting in water ingress</li>
                <li>Emergency water extraction and structural drying</li>
                <li>Professional sanding and refinishing (if floors can be restored)</li>
                <li>Full floor replacement (if restoration is not viable, with supporting documentation)</li>
                <li>Subfloor replacement where required</li>
              </ul>

              <h3 className="font-bold text-lg mt-6 mb-2">What May Not Be Covered</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Gradual water damage from slow leaks (maintenance issue, not sudden event)</li>
                <li>Rising damp or groundwater ingress (unless flood cover is included)</li>
                <li>Flood damage (requires separate flood cover, which is not standard on all policies)</li>
                <li>Pre-existing damage or wear</li>
              </ul>

              <h3 className="font-bold text-lg mt-6 mb-2">Documentation That Supports Your Claim</h3>
              <p>
                Thorough documentation is what separates a smooth claim from a disputed one. Your restoration professional should provide:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dated photographs of the damage before, during, and after restoration</li>
                <li>Moisture readings at initial assessment (showing elevated readings across all affected areas)</li>
                <li>Daily moisture logs throughout the drying process</li>
                <li>Final moisture readings confirming the floor reached its dry standard</li>
                <li>A detailed scope of works with line-item costings</li>
                <li>Justification for restoration vs replacement (based on technical assessment, not opinion)</li>
              </ul>

              <p className="mt-4">
                We bill you directly, so work begins immediately without waiting for insurer approval. After make-safe, your contractor provides a formal contract with full terms and conditions. Full claims documentation — including all moisture data, photographs, and scope of works — is provided to support your insurance reimbursement. Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Blue Fire Finance</a>.
              </p>
              <p className="mt-4">
                <Link href="/claim" className="text-blue-400 hover:underline font-medium">
                  Get a professional floor damage assessment &rarr;
                </Link>
              </p>
            </div>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Can flood-damaged hardwood floors be saved?',
          answer: 'In many cases, yes. The viability depends on the water category (clean vs contaminated), duration of exposure, timber species and thickness, fixing method, subfloor condition, and whether mould has developed. Category 1 and 2 water with exposure under 48 hours has the highest restoration success rate. Dense Australian hardwoods like Spotted Gum and Blackbutt are more resilient than softer or imported species. A professional assessment within the first 24 hours gives the best chance of saving the floor.',
        },
        {
          question: 'How long does it take to dry flood-damaged hardwood floors?',
          answer: 'Professional drying of hardwood floors typically takes 5 to 14 days using injection drying mats, air movers, and commercial dehumidifiers. After drying, a further 2 to 4 week equalisation period is needed before sanding. Drying must be controlled and gradual — rapid drying causes cracking and splitting. The total timeline from flood to refinished floor is typically 4 to 8 weeks, depending on severity.',
        },
        {
          question: 'What causes cupping in hardwood floors after water damage?',
          answer: 'Cupping occurs when the bottom of each floorboard absorbs more moisture than the top surface. The edges of the board swell and rise higher than the centre, creating a concave profile. Cupping is the most common early sign of water damage and typically appears within 24 to 72 hours of exposure. It is often reversible with controlled professional drying — but only if drying is begun quickly and managed correctly to avoid cracking or crowning.',
        },
        {
          question: 'Why should I not sand cupped hardwood floors immediately?',
          answer: 'Sanding cupped floors before the timber has fully dried and equalised removes material from the raised edges. When the boards eventually dry and flatten, the sanded edges are now lower than the centre — creating permanent crowning that cannot be fixed without replacing the boards. Professional restorers always wait until moisture readings confirm the timber has stabilised before sanding. This equalisation period is typically 2 to 4 weeks after drying is complete.',
        },
        {
          question: 'Does insurance cover hardwood floor restoration after flooding?',
          answer: 'Most Australian home insurance policies cover hardwood floor restoration for sudden water damage events such as burst pipes, appliance leaks, and storm damage. Flood damage requires separate flood cover. Your insurer will require documentation showing the damage, the restoration process, moisture readings, and a scope of works. We provide full claims documentation to support your reimbursement, and work begins immediately without waiting for insurer approval.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Structural Drying Equipment: Types & Costs',
          href: '/guides/equipment/structural-drying-equipment-cost',
          description: 'Understanding the equipment used in professional structural drying and what it costs.',
        },
        {
          title: 'How Much Does Water Damage Restoration Cost?',
          href: '/guides/cost-guides/how-much-water-damage-restoration-cost',
          description: 'Full cost breakdown for water damage restoration in Australia.',
        },
        {
          title: 'What to Do After Flood Damage',
          href: '/guides/emergency-guides/what-to-do-after-flood-damage',
          description: 'Step-by-step guide for the first 24 hours after water or flood damage.',
        },
      ]}
    />
  );
}
