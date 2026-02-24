'use client';

import { AgFAQPageTemplate } from '@/components/antigravity';

const faqs = [
  {
    "question": "How dangerous is mould in my home?",
    "answer": "Mould poses health risks including allergies, respiratory issues, and toxic reactions. Black mould (Stachybotrys) is particularly dangerous. Children, elderly, and immune-compromised individuals are at highest risk."
  },
  {
    "question": "Can I remove mould myself?",
    "answer": "Small areas under 1 square metre might be DIY with proper protection. Larger infestations require professional remediation due to health risks, proper containment needs, and risk of spreading spores."
  },
  {
    "question": "How much does mould removal cost?",
    "answer": "Costs vary by extent: Small area (under 10 sq m): $2,200-$3,500. Medium area (10-30 sq m): $3,500-$7,000. Large area (30+ sq m): $7,000-$20,000+. Includes containment, removal, treatment, and prevention."
  },
  {
    "question": "How do you prevent mould returning?",
    "answer": "Prevention requires: Fix moisture source, maintain humidity below 50%, ensure proper ventilation, use mould-resistant materials, regular inspections, and immediate water damage response."
  },
  {
    "question": "Is mould removal covered by insurance?",
    "answer": "Coverage depends on cause. Mould from covered water damage (burst pipe, storm) is usually covered. Mould from maintenance issues or long-term leaks typically isn't. Check your specific policy."
  }
];

export default function MouldRemediationFAQsPage() {
  return (
    <AgFAQPageTemplate
      category="Mould Removal"
      title="Mould Remediation FAQs"
      subtitle="Everything about mould removal restoration"
      faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))}
    />
  );
}
