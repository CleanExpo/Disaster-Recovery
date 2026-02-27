import type { ContentSection } from '@/components/antigravity';

interface FAQSectionParams {
  topic: string;
  questions?: { q: string; a: string }[];
}

const DEFAULT_QUESTIONS: Record<string, { q: string; a: string }[]> = {
  'biohazard-cleanup': [
    { q: 'What is classified as a biohazard?', a: 'Biohazards include blood-borne pathogens, sewage, chemical spills, mould at hazardous levels, drug lab residue (methamphetamine), trauma scenes, and any biological material that poses a health risk. Professional biohazard cleanup follows strict Australian protocols for containment, removal, and decontamination.' },
    { q: 'Is biohazard cleanup covered by insurance?', a: 'Many home and commercial insurance policies cover biohazard cleanup when it results from a covered event (fire, storm, vandalism). Trauma scene cleaning may be covered under specific policy provisions. We bill you directly and provide full documentation to support your insurance claim for reimbursement.' },
    { q: 'How long does biohazard cleanup take?', a: 'Small, contained biohazard situations may be resolved in 4–8 hours. Larger scenes or those involving structural contamination can take 2–5 days. Our team provides a timeline after the initial assessment.' },
    { q: 'Is it safe to stay in the property during biohazard cleanup?', a: 'No. We establish exclusion zones and recommend occupants stay clear until our technicians have completed decontamination and verified the area is safe through testing.' },
    { q: 'What certifications do your biohazard teams hold?', a: 'Our biohazard technicians hold IICRC certification, WorkSafe licences, hazmat training, blood-borne pathogen certification, and current police clearances. All work follows Australian Standards for biohazard remediation.' },
  ],
  'carpet-drying': [
    { q: 'Can wet carpet be saved or does it need replacing?', a: 'In many cases, carpet can be saved if drying begins within 24–48 hours. Category 1 (clean water) damage has the best salvage rate. Category 3 (sewage/contaminated) water usually requires carpet replacement. Our technicians assess each situation individually.' },
    { q: 'How long does professional carpet drying take?', a: 'Professional carpet drying typically takes 2–4 days using industrial dehumidifiers and air movers. The exact time depends on carpet type, underlay material, extent of water damage, and environmental conditions.' },
    { q: 'Will my carpet smell after water damage?', a: 'Professional drying and antimicrobial treatment prevents odour in most cases. If carpet is not dried within 48 hours, mould and bacteria can create persistent odours that may require replacement rather than restoration.' },
    { q: 'Does insurance cover carpet drying?', a: 'Yes, most home insurance policies cover carpet drying and restoration as part of a water damage claim from a sudden event. We bill you directly so work begins immediately, and provide all documentation for your insurance claim.' },
    { q: 'Can you dry carpet without removing it?', a: 'Yes. Our float-and-dry technique lifts carpet in place, allowing airflow beneath while drying both the carpet and the subfloor simultaneously. This is faster and less disruptive than removal.' },
  ],
  'ceiling-repairs': [
    { q: 'How do I know if my ceiling needs repair after water damage?', a: 'Signs include water stains, sagging or bulging, peeling paint, soft or crumbling plasterboard, and visible mould. Any ceiling that has absorbed water should be professionally assessed — even if it appears to have dried, hidden moisture can cause structural failure or mould growth.' },
    { q: 'Is a water-damaged ceiling dangerous?', a: 'Yes, it can be. Water-logged plasterboard can collapse without warning, and saturated ceilings near electrical fittings create electrocution risks. If you notice a sagging ceiling, evacuate the area and call a professional immediately.' },
    { q: 'How much do ceiling repairs cost?', a: 'Minor patch repairs typically cost $500–$1,500. Full ceiling replacement for a standard room ranges from $2,000–$5,000. Costs depend on size, access, materials, and whether asbestos is present (common in pre-1990 buildings). Most water damage ceiling repairs are covered by insurance.' },
    { q: 'Can a water-stained ceiling be repaired or does it need replacing?', a: 'Minor staining can often be sealed and repainted after thorough drying. However, plasterboard that has absorbed water and become structurally compromised must be replaced. Our technicians use moisture meters to determine which areas can be saved.' },
    { q: 'How long do ceiling repairs take?', a: 'A single room ceiling repair typically takes 2–3 days including drying, plastering, and painting. Full ceiling replacement for larger areas may take 1–2 weeks. Emergency stabilisation (preventing collapse) is completed on the first visit.' },
  ],
};

function getDefaultQuestions(topic: string): { q: string; a: string }[] {
  if (topic in DEFAULT_QUESTIONS) return DEFAULT_QUESTIONS[topic];

  return [
    { q: `What does professional ${topic.replace(/-/g, ' ')} involve?`, a: `Professional ${topic.replace(/-/g, ' ')} follows a structured process including assessment, documentation, specialist treatment or restoration, quality verification, and insurance coordination. Our certified technicians use commercial-grade equipment and follow Australian Standards for every job.` },
    { q: `How much does ${topic.replace(/-/g, ' ')} cost?`, a: `Costs vary based on the extent of damage, property size, materials involved, and specific requirements. For insured events, we provide all documentation to support your reimbursement claim. Payment plans are available through our finance partner. We provide on-site assessments and written estimates before any chargeable work begins.` },
    { q: `Is ${topic.replace(/-/g, ' ')} covered by insurance?`, a: `Most home and commercial insurance policies cover ${topic.replace(/-/g, ' ')} resulting from sudden, accidental events. Coverage depends on your specific policy and the cause of damage. Our team can review your policy and advise on coverage during the initial assessment.` },
    { q: `How long does ${topic.replace(/-/g, ' ')} take?`, a: `Timelines depend on damage severity. Minor situations may be resolved in 1–3 days, moderate damage in 1–2 weeks, and severe or extensive damage may require several weeks. We provide a detailed timeline and keep you informed throughout the process.` },
    { q: `Do I need professional help for ${topic.replace(/-/g, ' ')}?`, a: `For anything beyond minor, surface-level damage, professional restoration is recommended. Hidden damage, health risks, and insurance requirements make professional assessment important even when visible damage appears minor. Use our cost estimator for an instant estimate, or lodge a claim for an on-site assessment.` },
  ];
}

export function getFAQSections({ topic, questions }: FAQSectionParams): ContentSection[] {
  const faqs = questions ?? getDefaultQuestions(topic);
  const topicLabel = topic.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return [
    {
      heading: `${topicLabel} — What You Need to Know`,
      body: (
        <>
          <p>
            Understanding {topicLabel.toLowerCase()} helps you make informed decisions when disaster
            strikes. Below you will find expert answers to the most common questions Australian
            property owners ask about {topicLabel.toLowerCase()}, including costs, timelines,
            insurance coverage, and what to expect from professional restoration services.
          </p>
          <p>
            This information is based on real-world experience from our nationwide network of IICRC-
            certified restoration professionals. If your specific question is not answered here,
            contact us or use the cost estimator for an instant estimate.
          </p>
        </>
      ),
    },
    {
      heading: 'Common Questions Answered',
      background: 'light',
      body: (
        <>
          {faqs.slice(0, 3).map((faq, i) => (
            <div key={i} style={{ marginBottom: '1.5rem' }}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </>
      ),
    },
    {
      heading: 'More Expert Answers',
      body: (
        <>
          {faqs.slice(3).map((faq, i) => (
            <div key={i} style={{ marginBottom: '1.5rem' }}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </>
      ),
    },
    {
      heading: 'Insurance and Cost Information',
      background: 'light',
      body: (
        <>
          <p>
            Most {topicLabel.toLowerCase()} situations are covered by standard home or commercial
            insurance when caused by a sudden, accidental event. Here is what you should know about
            costs and insurance for {topicLabel.toLowerCase()}:
          </p>
          <ul>
            <li><strong>Claims documentation</strong> — We provide all photos, reports, and documentation your insurer requires to process your reimbursement claim. Payment plans available through <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a>.</li>
            <li><strong>On-site assessments</strong> — We provide on-site assessments and written estimates before any chargeable work begins.</li>
            <li><strong>No call-out fees</strong> — Emergency assessments carry no call-out fee in metropolitan areas Australia-wide.</li>
            <li><strong>Transparent pricing</strong> — For non-insured work, we provide detailed written quotes with no hidden charges. Payment plans are available for larger jobs.</li>
          </ul>
        </>
      ),
    },
    {
      heading: 'Need Help? Contact Us',
      body: (
        <>
          <p>
            If you have questions about {topicLabel.toLowerCase()} that are not covered here, or
            if you need immediate assistance, our team is available 24/7:
          </p>
          <ul>
            <li><strong>Emergency situations</strong> — Submit an online form for immediate dispatch of a restoration team to your property.</li>
            <li><strong>General enquiries</strong> — Contact us for advice, assessments, or cost estimates.</li>
            <li><strong>Insurance assistance</strong> — We can review your policy, explain your coverage, and manage the claims process on your behalf.</li>
          </ul>
          <p>
            All initial consultations are confidential. Our qualified technicians provide honest
            assessments and will tell you if professional restoration is not necessary for your
            situation.
          </p>
        </>
      ),
    },
  ];
}
