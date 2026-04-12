import { Metadata } from 'next';
import Script from 'next/script';
import { Cpu } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Electronics Recovery After Water or Fire Damage',
  description: 'The 72-hour window for wet electronics, ultrasonic cleaning, deionised water rinsing, corrosion assessment, and when to engage a specialist data recovery lab.',
  keywords: 'electronics recovery water damage, wet electronics restoration, ultrasonic cleaning electronics, data recovery flood, fire damaged electronics, circuit board cleaning, hard drive water damage, TV flood damage Australia',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/services/electronics-recovery' },
};

export default function ElectronicsRecoveryPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can electronics be recovered after water damage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many electronics can be recovered if power is not applied to the wet device and professional cleaning is initiated within 72 hours. Water damage to electronics is caused by two mechanisms: short-circuit (immediate damage when power is present during wetting) and electrochemical corrosion (progressive damage that occurs over hours and days as mineral deposits and oxidation form on circuit boards). Devices that were unpowered when wet, and that are cleaned and dried professionally before corrosion progresses, have high recovery rates. The critical rule is: do not attempt to power on any wet electronic device.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is ultrasonic cleaning for electronics?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ultrasonic cleaning uses high-frequency sound waves (typically 37–80 kHz) transmitted through a liquid medium to dislodge contamination from circuit boards and electronic components. The sound waves create microscopic cavitation bubbles that implode on contact with surfaces, producing localised cleaning action that reaches into spaces inaccessible to brushes or sprays. For electronics recovery, the cleaning medium is typically deionised water or a specialist electronic-safe solution. After ultrasonic cleaning, boards are rinsed in deionised water (to remove cleaning solution residue) and dried in a temperature-controlled environment. This process removes flood sediment, mineral deposits, soot, and biological contamination far more thoroughly than manual cleaning.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why must deionised water be used for electronics recovery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ordinary tap water and even filtered water contain dissolved minerals (calcium, magnesium, chlorides) that deposit on circuit boards as the water evaporates, causing corrosion and bridging between conductors. Deionised (DI) water has had virtually all dissolved ions removed, giving it very low electrical conductivity. Rinsing electronics in DI water removes tap water residues and cleaning solution remnants without leaving behind mineral deposits. The final DI water rinse is the last wet step before controlled drying — its purity directly affects how clean the board surface is at the start of the drying phase.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do wet electronics have before they cannot be recovered?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The practical recovery window for most consumer electronics is 72 hours from initial wetting — provided the device was not powered on during or after wetting. Within this window, electrochemical corrosion is typically still in early stages and can be halted by professional cleaning. After 72 hours, corrosion progresses significantly. By 7 days without treatment, most complex circuit boards (motherboards, GPUs, logic boards) have suffered irreversible corrosion damage. Simpler devices (hard drives, passive components) may recover beyond 72 hours. Contaminated flood water (blackwater, saltwater) accelerates corrosion; devices submerged in saltwater or sewage have a much shorter effective window — as little as 24 hours.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can data be recovered from a flood or fire-damaged hard drive?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hard drives submerged in clean water with no power applied can often have data recovered in a specialist clean room. The platters (data-storing disks) are typically intact after water exposure — it is the read/write heads and control board that are most vulnerable to corrosion. Do not power on a wet hard drive; doing so draws the read heads across platters at very high speed and causes physical scoring that destroys data permanently. A specialist data recovery laboratory disassembles the drive in a clean room environment, installs replacement heads, and images the platters. Recovery rates from water-damaged drives (clean water, no power-on) are typically 70–90%. Heat damage above approximately 150°C significantly reduces recovery probability.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does insurance cover electronics recovery costs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Electronics are covered under the contents section of most home and contents insurance policies, subject to the policy\'s defined events (flood, fire, storm, escape of liquid). Recovery costs — including ultrasonic cleaning and specialist assessment — are claimable where the insurer approves restoration rather than replacement. Insurers often prefer restoration because it is more cost-effective than replacement for high-value items. Obtain a written assessment from the restoration contractor stating: the recovery method, estimated recovery rate, cost, and recommendation to restore vs. replace. This becomes the basis of the insurance claim for each item.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="electronics-recovery-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Specialist Services"
        title="Electronics Recovery After Water or Fire Damage"
        subtitle="The 72-hour window, ultrasonic cleaning, deionised water rinsing, and data recovery — what works, what the limits are, and what never to do first."
        gradient="from-blue-800 to-slate-900"
        icon={<Cpu className="w-8 h-8 text-white" />}
        breadcrumbs={[
          { label: 'Guides', href: '/guides' },
          { label: 'Services', href: '/guides/services' },
          { label: 'Electronics Recovery' },
        ]}
        cta={{
          text: 'Electronics damaged by water or fire? Do not power on wet devices — the 72-hour window matters. Request an emergency assessment.',
          href: '/claim',
        }}
        lastReviewed="2026-04-12"
        sections={[
          {
            heading: 'The one rule that determines recovery outcome',
            body: `Do not power on a wet or recently wet electronic device.

This is not a precaution — it is the single most consequential decision after water damage. When voltage is applied to a circuit board that contains water, two things happen simultaneously: short-circuit paths form through the water, potentially destroying components that were undamaged by the water itself; and the electrical current accelerates electrochemical corrosion, converting the progressive, reversible mineral deposition of a drying device into rapid, irreversible oxidative damage.

A device that was submerged while powered (a phone charging during a flood, a TV in a room that fills with water) has already experienced this damage. A device that was unpowered during wetting — switched off, in standby, or disconnected from the mains — has not. The unpowered device, left to a professional and not powered on by the owner, has a fundamentally better recovery prognosis.

The 72-hour window applies from the moment of wetting to the initiation of professional cleaning — not to the point at which the device appears dry. A device that looks dry after sitting in a warm room for two days is not ready to be powered on. Surface evaporation does not remove the mineral deposits, biological contaminants, and residual moisture from inside connectors, capacitors, and under-chip underfill that cause failure on first power-up.`,
          },
          {
            heading: 'How professional electronics recovery works',
            body: `The restoration process used by certified contractors has four stages:

**Stage 1 — Intake and triage.** Every device is photographed and logged. External power is confirmed disconnected. Batteries are removed where accessible. A visual inspection identifies the contamination type (clean water, blackwater, saltwater, soot) and any immediate physical damage (cracked screens, deformed casings, burn marks). This determines which cleaning pathway applies.

**Stage 2 — Disassembly.** Devices are disassembled to the circuit board level. Shielding cans, heat sinks, and mechanical components are separated. Batteries are set aside — they are almost always replaced rather than restored. HDDs and SSDs are separated from the main chassis and assessed individually.

**Stage 3 — Ultrasonic cleaning and DI rinse.** Disassembled boards are placed in an ultrasonic cleaning bath (37–80 kHz) with an electronics-safe cleaning solution for a defined cycle time. The cavitation action dislodges flood sediment, mineral deposits, soot, and biological contamination from all surfaces including under-component gaps. After the ultrasonic cycle, boards are rinsed in deionised water to remove cleaning solution residue. This rinse is repeated until DI water conductivity at exit matches input — confirming all ionic contamination has been removed.

**Stage 4 — Controlled drying and inspection.** Boards are dried in a temperature-controlled environment (typically 50–60°C) to drive off residual moisture without thermally stressing components. After drying, boards are inspected under magnification for corrosion, lifted pads, delamination, and component condition. Items assessed as restorable are quoted for reassembly and testing.`,
            background: 'light' as const,
          },
          {
            heading: 'Contamination type changes everything',
            body: `Not all water is equal from a recovery perspective. The contamination type affects both the urgency of the recovery window and the cleaning approach required.

**Clean water** (Category 1 — burst supply pipe, rainwater through a roof, clean appliance overflow): Lowest contamination load. Ultrasonic cleaning in standard solution followed by DI rinse is typically sufficient. Recovery window is the full 72 hours for unpowered devices.

**Grey water** (Category 2 — washing machine overflow, dishwasher, sump pump discharge): Contains detergents, biological matter, and suspended solids. More aggressive cleaning may be required. Recovery window is reduced to approximately 48 hours due to faster biological growth and more active chemical contamination.

**Blackwater** (Category 3 — sewage, toilet overflow, rising groundwater, Category 2 that has sat for more than 24 hours): Contains pathogens, heavy biological contamination, and high mineral load. All electronics exposed to blackwater must be treated as biohazardous. Cleaning requires appropriate PPE and disposal of residues as hazardous waste. Recovery rates are lower; complex consumer electronics (laptops, phones) may not be economically restorable. Simple devices with minimal component density have better outcomes.

**Saltwater** (coastal flooding, storm surge): Chloride ions are extremely aggressive corrosion agents. Saltwater dramatically accelerates electrochemical corrosion — the practical recovery window for saltwater-exposed electronics is 12–24 hours, not 72. Immediate professional intervention is critical.

**Fire and smoke exposure**: Soot contains acidic combustion residues. On a circuit board, these create conductive pathways that cause shorts on power-up and ongoing corrosion. Thermal damage from heat above approximately 80°C begins to damage solder joints and component ratings; above 150°C, widespread component failure occurs. Ultrasonic cleaning removes soot effectively from boards that did not reach damaging temperatures. Boards that show visible flux residue reflow, discoloured PCB substrate, or deformed components have experienced temperatures that likely render them unrestorable.`,
          },
          {
            heading: 'Data recovery from storage media',
            body: `Storage media — hard drives, SSDs, NAS arrays, SD cards, USB drives — follow different recovery logic from the device they were in.

**Mechanical hard drives (HDDs)** are the storage type most amenable to professional data recovery after water damage. The magnetic platters that store data are sealed inside the drive enclosure and protected from direct water contact in most flood scenarios. What is not sealed is the control board (PCB) attached externally and the head stack assembly. Water exposure to the PCB causes corrosion and short-circuit on power-on. The recovery approach: in a clean room environment, the control board is replaced with a compatible donor board, the drive is powered on just long enough to image the platters to a new medium. Recovery rates from HDDs with clean water exposure and no power-on are typically 70–90%.

**SSDs and flash storage** (USB drives, SD cards, embedded eMMC) are more resilient to water than HDDs because they have no moving parts and no mechanical seals that water can bypass. Flash memory cells themselves are impermeable to water. The risk is to the controller chip and solder joints. If the storage was unpowered during wetting and is professionally cleaned and dried before power is applied, recovery rates are high. Heat damage is a different matter — flash memory reliability begins to degrade above approximately 70–80°C and is typically destroyed above 150°C.

**NAS (Network Attached Storage) arrays**: Where multiple drives are in a RAID array, recovery requires reconstructing the array logic in addition to recovering individual drives. All drives from the array should be sent to the same data recovery laboratory — do not attempt to power on a RAID array to check which drives survived.

**Cloud backup status should be verified immediately** after any electronics loss event. Many devices maintain automatic cloud backups (iCloud, Google Drive, OneDrive) that may have synced before the damage event. This is the fastest path to data recovery and does not require physical media recovery.`,
            background: 'light' as const,
          },
          {
            heading: 'When electronics cannot be recovered',
            body: `Recovery is not always possible, and it is better to know early than to invest in cleaning that cannot change the outcome.

Electronics that are typically beyond practical recovery:
- Devices that were powered on during or immediately after wetting and show signs of electrical damage (burn marks, blown components, deformed solder)
- Circuit boards with visible corrosion coverage exceeding approximately 40% of the board surface where traces have been interrupted
- Devices submerged in saltwater for more than 24 hours without professional treatment
- Devices exposed to temperatures above 150°C throughout (kitchen appliances in a severe fire, devices near a fire seat)
- LCD and OLED displays — the display module (separate from the electronics driving it) almost never survives wetting; replacement is the standard approach even where the driving electronics are recovered
- Lithium batteries — always replaced after water immersion; recovery of battery chemistry is not attempted due to safety risk

A written assessment from a certified restoration contractor stating that recovery is not viable is the basis for an insurance replacement claim. Do not discard unrecoverable items before the insurer has authorised the disposal — most require a claim number and adjuster sign-off before high-value items can be written off.`,
          },
          {
            heading: 'Insurance claim process for electronics',
            body: `Electronics are covered under the contents section of most home and contents policies subject to the insured event (flood, fire, storm, escape of liquid).

**Documentation steps before anything leaves the property:**
1. Photograph every affected item in place, showing flood level, fire damage, or smoke marks.
2. Record serial numbers, model numbers, and approximate purchase dates for all items.
3. Photograph any original packaging, receipts, or warranty cards that survived.

**Restoration vs. replacement decision:**
Insurers typically approve restoration where the restoration cost is less than the item's replacement cost or assessed value. Contractors provide written restoration assessments specifying cost and recovery probability. For high-value items (professional audio equipment, servers, specialist cameras), restoration is almost always the more cost-effective path. For commodity consumer electronics (five-year-old smartphones, entry-level laptops), replacement may be approved directly.

**Retailer replacement cost evidence:**
If replacement is approved, document the current retail replacement cost for like-for-like specification at the time of the claim, not the original purchase price. For discontinued models, use the specification equivalent currently available.

**Data recovery as a separate claim line:**
Data recovery from damaged storage media can be claimed as a separate item from the physical device claim. Specialist data recovery laboratory fees are accepted by most insurers where the data has business or significant personal value. Obtain a written quote from the data recovery lab specifying the work required before authorising the engagement.`,
            background: 'light' as const,
          },
        ]}
        faqs={[
          {
            question: 'Can electronics be recovered after water damage?',
            answer: 'Many electronics can be recovered if power is not applied to the wet device and professional cleaning is initiated within 72 hours. Devices that were unpowered when wet, and that are cleaned before corrosion progresses, have high recovery rates. The critical rule is: do not attempt to power on any wet electronic device.',
          },
          {
            question: 'What is ultrasonic cleaning for electronics?',
            answer: 'Ultrasonic cleaning uses high-frequency sound waves (37–80 kHz) through a liquid medium to dislodge contamination from circuit boards. Microscopic cavitation bubbles reach spaces inaccessible to brushes or sprays. After ultrasonic cleaning, boards are rinsed in deionised water and dried in a controlled environment.',
          },
          {
            question: 'How long do wet electronics have before they cannot be recovered?',
            answer: 'The practical recovery window for most consumer electronics is 72 hours from initial wetting — provided the device was not powered on. Saltwater exposure reduces this to 12–24 hours due to the aggressive nature of chloride corrosion. After 7 days without treatment, most complex circuit boards have suffered irreversible damage.',
          },
          {
            question: 'Can data be recovered from a flood-damaged hard drive?',
            answer: 'HDDs submerged in clean water with no power applied can often have data recovered in a specialist clean room. Do not power on a wet hard drive — the read heads will score the platters and destroy data permanently. A specialist lab replaces the control board and images the platters. Recovery rates from clean water, no-power-on HDDs are typically 70–90%.',
          },
          {
            question: 'Does insurance cover electronics recovery costs?',
            answer: 'Electronics are covered under the contents section of most policies for defined events. Insurers often prefer restoration over replacement for high-value items because it is more cost-effective. Obtain a written restoration assessment and submit it with your claim.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Document Recovery After Water or Fire Damage',
            href: '/guides/services/document-recovery',
            description: 'Freeze-drying, vacuum thermal drying, and the Munters process for wet and smoke-damaged documents.',
          },
          {
            title: 'Contents Pack-Out and Storage',
            href: '/guides/services/contents-pack-out-storage',
            description: 'Full process from inventory to return, including specialist cleaning during storage.',
          },
          {
            title: 'Art and Antique Restoration After Disaster',
            href: '/guides/services/art-antique-restoration',
            description: 'Specialist conservation approaches for fine art, furniture, ceramics, and collectibles.',
          },
        ]}
      />
    </>
  );
}
