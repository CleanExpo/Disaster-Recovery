'use client';

import { AgFAQPageTemplate } from '@/components/antigravity';

const faqs = [
  {
    "question": "How long does water damage restoration take?",
    "answer": "Typical timeline: Day 1: Water extraction and assessment. Days 2-4: Drying and dehumidification. Days 5-7: Restoration and repairs. Severe damage may take 2-3 weeks. Acting within 24-48 hours prevents mould growth."
  },
  {
    "question": "What are the categories of water damage?",
    "answer": "Category 1: Clean water from broken pipes or rain. Category 2: Grey water from appliances with contamination. Category 3: Black water from sewage or flooding, highly contaminated. Each requires different treatment protocols."
  },
  {
    "question": "Will my insurance cover water damage?",
    "answer": "Most home insurance covers sudden water damage from burst pipes, storms, or appliance failures. Gradual damage from lack of maintenance usually isn't covered. We bill you directly and provide full documentation to support your insurance reimbursement claim."
  },
  {
    "question": "Can I stay in my home during restoration?",
    "answer": "For minor damage in isolated areas, yes. For extensive damage, Category 3 water, or when electricity is affected, temporary relocation is recommended for safety and health reasons."
  },
  {
    "question": "What happens if mould has already started?",
    "answer": "Mould can begin within 24-48 hours. Our contractors perform mould remediation including containment, removal, treatment, and prevention. Additional costs apply but are usually insurance covered."
  }
];

export default function WaterDamageFAQsPage() {
  return (
    <AgFAQPageTemplate
      category="Water Damage"
      title="Water Damage FAQs"
      subtitle="Everything about water damage restoration"
      faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))}
    />
  );
}
