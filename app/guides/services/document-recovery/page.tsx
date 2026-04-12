import { Metadata } from 'next';
import Script from 'next/script';
import { FileText } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Document Recovery After Water or Fire Damage',
  description: 'How certified contractors recover wet, smoke-damaged, or charred documents using freeze-drying, vacuum thermal drying, and the Munters process. Priority triage, insurance coverage, and what cannot be saved.',
  keywords: 'document recovery water damage, wet document restoration, freeze drying documents, vacuum thermal drying, Munters process, fire damaged documents, book drying, photo recovery flood, paper document restoration Australia',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/services/document-recovery' },
};

export default function DocumentRecoveryPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can wet documents be saved after a flood or burst pipe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many wet documents can be recovered if treatment begins within 24–48 hours. The critical window is before mould colonisation begins, which typically occurs within 48–72 hours at room temperature. Freeze-drying (lyophilisation) is the most effective method for saturated documents — it removes moisture as vapour without passing through the liquid phase, preventing the paper fibres from collapsing or warping. Lightly dampened documents can sometimes be air-dried by a conservator. Heavily soaked books and bound records require freeze-drying. The faster a specialist is engaged, the higher the recovery rate.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is freeze-drying and how does it work for documents?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Freeze-drying (lyophilisation) involves freezing saturated documents to below −18°C and then placing them in a vacuum chamber. The low pressure causes the ice to sublimate — converting directly from solid to vapour without passing through a liquid phase. This prevents the paper fibres and inks from being disturbed by liquid water movement, which causes cockling, bleeding, and adhesion. The result is a document that retains its original shape and legibility far better than air-drying alone. Purpose-built freeze-drying chambers used by restoration specialists can process hundreds of items simultaneously.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Munters process for document drying?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Munters process uses industrial desiccant dehumidification in a controlled chamber to gently remove moisture from documents over an extended period. Warm, very dry air is circulated continuously around documents laid flat on drying racks. This method is suited to lightly to moderately damp documents and archival materials that may be too fragile for freeze-drying, such as vellum, parchment, or certain photographic formats. Processing time ranges from several days to weeks depending on the volume and moisture content. It is less effective for heavily saturated documents than lyophilisation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which documents should be prioritised for recovery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Priority order for document recovery triage: (1) Irreplaceable originals — birth certificates, wills, deeds, passports, original contracts, historical records, and photographs with no digital backup. (2) Legal and financial records needed for ongoing insurance claims, court proceedings, or business continuity. (3) Medical records and prescriptions. (4) Sentimental items — handwritten letters, diaries, family albums. Replaceable documents — tax returns, bank statements, utility bills — should be deprioritised because digital copies can be obtained from issuing authorities. Triage decisions should be made quickly; every hour increases mould risk.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does insurance cover document recovery costs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Document recovery costs are generally claimable under home and contents insurance where the damage was caused by an insured event (flood, burst pipe, fire). Coverage is typically included within the broader "contents restoration" or "increased costs of working" provisions of a policy rather than as a specific document recovery line item. Specialist document recovery is an accepted restoration methodology — insurers routinely approve it rather than paying replacement cost for irreplaceable items. Document all items sent for recovery on an itemised inventory signed by the restoration contractor. Submit this inventory with your claim.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can fire-damaged and smoke-damaged documents be restored?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lightly smoke-damaged documents can often be cleaned using dry sponge methods, specialised chemical sponges, or HEPA vacuuming to remove soot without spreading it into paper fibres. Smoke odour in paper is treated with ozone chambers or activated carbon exposure in a sealed environment. Charred or partially burned documents are significantly more fragile — the carbonised edges are brittle and can disintegrate on handling. These require specialist conservator assessment before any attempt at flattening, consolidation, or digitisation. Documents that are more than 50% charred are typically beyond practical recovery but may still be digitally scanned in fragments.',
        },
      },
      {
        '@type': 'Question',
        name: 'What documents cannot be recovered?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Documents beyond practical recovery include: fully charred paper where carbonisation exceeds approximately 60–70% of the surface; thermally fused items where multiple sheets have melted together; documents submerged in contaminated Category 3 (blackwater) flood water where biological hazards preclude handling; and digital media (USB drives, hard drives) with severe heat damage above approximately 150°C. For government-issued identity documents, regardless of physical condition, replacement through the issuing authority (DFAT, state BDM registries, ATO) is more reliable than attempting restoration.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="document-recovery-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Specialist Services"
        title="Document Recovery After Water or Fire Damage"
        subtitle="Freeze-drying, vacuum thermal drying, and the Munters process — what works, what the window is, and which documents to prioritise for salvage."
        gradient="from-slate-700 to-slate-900"
        icon={<FileText className="w-8 h-8 text-white" />}
        breadcrumbs={[
          { label: 'Guides', href: '/guides' },
          { label: 'Services', href: '/guides/services' },
          { label: 'Document Recovery' },
        ]}
        cta={{
          text: 'Documents damaged by water or fire? A certified contractor can assess recoverability within hours — the 48-hour window matters.',
          href: '/claim',
        }}
        lastReviewed="2026-04-12"
        sections={[
          {
            heading: 'The 48-hour recovery window',
            body: `Wet paper begins to mould within 48–72 hours at room temperature. Once mould colonises document fibres, the biological contamination makes handling hazardous and degrades paper structure irreversibly. The practical implication: every hour between water contact and treatment reduces the proportion of documents that can be fully recovered.

The standard triage sequence used by certified restoration contractors is: (1) photograph everything in place before touching it; (2) separate documents from contaminated water sources immediately; (3) move items to a cool, dry environment if professional freeze-drying is not immediately available — cold slows mould growth; (4) do not attempt to open saturated bound items — the spine will tear; (5) engage a specialist within 24 hours.

Attempting to dry documents with a hair dryer, heater, or direct sunlight causes cockling (permanent warping of paper fibres), ink bleeding, and adhesion between sheets. These outcomes are largely irreversible and can destroy content that professional methods would have saved.`,
          },
          {
            heading: 'Recovery methods: which is used when',
            body: `**Freeze-drying (lyophilisation)** is the benchmark method for saturated documents. Items are frozen to below −18°C and placed in a vacuum chamber where ice sublimates directly to vapour. Paper fibres are not disturbed by liquid water movement, so cockling and bleeding are minimised. Most effective for: books, bound volumes, printed documents, photographic prints, x-rays, and archival records with moderate to severe water saturation. Not appropriate for: items with water-soluble inks, certain watercolour artworks, or items that must not be frozen (some adhesive bindings).

**Vacuum thermal drying** applies gentle heat in a low-pressure chamber, drawing moisture from documents as vapour without freezing them first. Processing is faster than freeze-drying but produces slightly more cockling on heavily saturated items. Used when freeze-drying capacity is unavailable or when freezing is contraindicated.

**The Munters process** uses continuous desiccant-dried airflow around documents laid on racks. Slower but very gentle — suitable for lightly dampened archival material, parchment, vellum, and photographic formats that cannot be frozen. Processing can take days to weeks.

**Air-drying** by trained conservators is appropriate only for lightly damp single sheets. Sheets are interleaved with absorbent blotter paper and weighted flat, changed every few hours. Not suitable for bound items or heavily saturated paper.`,
            background: 'light' as const,
          },
          {
            heading: 'Triage: what to prioritise',
            body: `When facing a large volume of damaged documents, triage decisions must be made quickly because not everything can be treated simultaneously.

**Tier 1 — Irreplaceable originals** (treat immediately): Original birth certificates, death certificates, marriage certificates, wills, title deeds, passports, historical correspondence, photographs with no digital copy, handwritten diaries, and legal agreements. These cannot be replaced through any government registry or insurer. Loss is permanent.

**Tier 2 — Active legal and financial records** (treat within 24 hours): Documents needed for the current insurance claim, court proceedings, or business operations. Tax records, loan agreements, insurance policies, business contracts. Delay compounds the immediate disaster with a documentation problem.

**Tier 3 — Medical and prescription records** (treat within 48 hours): Medical history, specialist reports, prescriptions. Generally obtainable from issuing practitioners but time-consuming to replace.

**Tier 4 — Replaceable documents** (lower priority): Bank statements, utility bills, tax returns, payslips. Digital or paper copies can be obtained from issuing authorities. Prioritise by restoration cost-benefit — if freeze-drying costs exceed the value of replacement, replace.

Communicate triage priorities clearly to the restoration contractor. A written inventory with priority ratings should be signed by both parties before documents leave your property.`,
          },
          {
            heading: 'Smoke and fire damage',
            body: `Smoke-damaged documents present different challenges from water damage. The primary problems are: soot embedded in paper fibres, persistent smoke odour absorbed into paper, and potential chemical contamination from combustion byproducts.

**Soot removal** uses dry chemical sponges (Gonzo or similar) applied with light, single-direction strokes — never circular. The sponge lifts soot particles without smearing them deeper into fibres. HEPA vacuuming at very low suction precedes sponge work on fragile items. Wet cleaning methods are used only after dry cleaning is complete, and only where paper and ink types permit.

**Smoke odour treatment** uses either ozone chambers or activated carbon exposure. Ozone chambers generate ozone (O₃) which oxidises odour molecules in the paper. Exposure time is calibrated to avoid paper degradation — over-exposure causes oxidative damage to cellulose. Activated carbon chambers absorb odour compounds without oxidation risk and are preferred for fragile archival materials.

**Charred documents** require conservator assessment before any handling attempt. Carbonised edges are extremely brittle. A consolidant (a dilute acrylic solution) may be applied to stabilise the carbon matrix before attempted flattening. Documents that are more than 50–60% charred are typically beyond practical recovery as readable text — but high-resolution photography or multispectral imaging can sometimes recover text from partially legible charred fragments.`,
            background: 'light' as const,
          },
          {
            heading: 'Photographs and digital media',
            body: `**Photographic prints** are among the most time-sensitive document types. The emulsion layer on a wet print begins to swell within hours and can stick to adjacent prints irreversibly. Wet prints should never be peeled apart — they should be kept submerged in clean, cold water until a conservator can separate them. Freeze-drying of photographic prints must be done cautiously as some emulsion types are damaged by freezing.

**Negatives and slides** (film-based) are more resilient than prints. Cellulose triacetate and polyester-base films can be rinsed in clean water and air-dried on a lint-free surface without significant loss. Vinegar syndrome (acidic decomposition of older acetate film) can be accelerated by water damage — cold storage buys time.

**Digital media** — hard drives, USB drives, SD cards, optical discs — follow different recovery logic. Flash memory (USB, SD cards) is highly resistant to water if dried before power is applied. Hard drives with water ingress require specialist data recovery in a clean room; the platters may be intact but the read heads corrode rapidly on exposure to air. Do not attempt to power on any wet digital storage device. Optical discs (CDs, DVDs) can typically be rinsed in deionised water and dried — the data layer is protected by the polycarbonate substrate.

**Heat damage to digital media** above approximately 70–80°C begins to affect flash memory reliability. Hard drive platters are typically destroyed above 150°C. Data recovery from thermally damaged media is possible in specialist clean rooms up to approximately 180°C for some media types — success rates vary significantly.`,
          },
          {
            heading: 'Insurance claim documentation',
            body: `Document recovery costs are claimable under most home and contents policies where the underlying damage was caused by an insured event. Coverage is typically within contents restoration provisions rather than a specific line item.

Steps to maximise recovery under an insurance claim:

1. **Photograph in-place** before any documents are moved. Show the extent of wetting, contamination, or fire damage in context.
2. **Itemise all affected documents** on a written inventory before they leave the property. Include: document type, approximate date, condition assessment (wet, soaked, smoke-affected, charred), and priority tier.
3. **Obtain a written scope of work** from the restoration contractor specifying the recovery method to be used, estimated recovery rate, and cost. This becomes the basis of the claim.
4. **Retain all invoices** from specialist document recovery services. Insurers require itemised invoices from licensed restoration contractors.
5. **Document what cannot be recovered**. An inventory of unrecoverable items — with photograph evidence — supports a replacement cost claim for total losses.

Identity documents (passports, driver licences, Medicare cards) have government replacement fees that are separately claimable. Contact DFAT, the relevant state transport agency, and Services Australia for replacement procedures.`,
            background: 'light' as const,
          },
        ]}
        faqs={[
          {
            question: 'Can wet documents be saved after a flood or burst pipe?',
            answer: 'Many wet documents can be recovered if treatment begins within 24–48 hours. The critical window is before mould colonisation, which typically occurs within 48–72 hours at room temperature. Freeze-drying (lyophilisation) is the most effective method for saturated documents. Lightly dampened documents can sometimes be air-dried by a conservator. The faster a specialist is engaged, the higher the recovery rate.',
          },
          {
            question: 'What is freeze-drying and how does it work for documents?',
            answer: 'Freeze-drying involves freezing saturated documents to below −18°C and then placing them in a vacuum chamber. The low pressure causes ice to sublimate — converting directly from solid to vapour — without passing through a liquid phase. This prevents paper fibres and inks from being disturbed by liquid water movement, which causes cockling, bleeding, and adhesion between sheets.',
          },
          {
            question: 'Which documents should be prioritised first?',
            answer: 'Priority order: (1) Irreplaceable originals — birth certificates, wills, deeds, passports, photographs with no digital backup; (2) Active legal and financial records needed for the insurance claim; (3) Medical records; (4) Replaceable documents — bank statements, tax returns — that can be reissued by the originating authority.',
          },
          {
            question: 'Does insurance cover document recovery costs?',
            answer: 'Document recovery costs are generally claimable under home and contents insurance where the damage was caused by an insured event. Coverage is typically within contents restoration provisions. Document all items sent for recovery on a signed itemised inventory and submit this with your claim.',
          },
          {
            question: 'Can fire-damaged and smoke-damaged documents be restored?',
            answer: 'Lightly smoke-damaged documents can be cleaned using dry chemical sponges and HEPA vacuuming, with smoke odour treated in an ozone chamber. Charred documents require specialist conservator assessment before any handling — the carbonised edges are extremely brittle. Documents more than 50–60% charred are typically beyond practical recovery as readable text.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Electronics Recovery After Water or Fire Damage',
            href: '/guides/services/electronics-recovery',
            description: 'The 72-hour window, ultrasonic cleaning, data recovery, and what cannot be saved.',
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
