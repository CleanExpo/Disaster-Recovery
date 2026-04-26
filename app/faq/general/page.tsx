'use client';

import { AgFAQPageTemplate } from '@/components/antigravity';

const faqs = [
  {
    question: 'How does your online system work?',
    answer:
      "Simply fill out our online form with your damage details and location. We instantly match you with IICRC certified contractors within your selected radius (20-100km). You'll receive multiple quotes within 30-60 minutes.",
  },
  {
    question: 'Why is there a $2,200 minimum service fee?',
    answer:
      'The $2,200 minimum covers emergency response, professional assessment, initial mitigation, industrial equipment, certified technicians, and insurance documentation. This ensures proper restoration and prevents secondary damage that could cost thousands more.',
  },
  {
    question: 'Are all contractors IICRC certified?',
    answer:
      'Yes, 100% of our network contractors must maintain current IICRC certification, carry $20M public liability insurance, and meet strict Disaster Recovery Network standards.',
  },
  {
    question: 'How quickly can someone respond?',
    answer:
      'Emergency response times vary by location and contractor availability. Typically: Metro areas 30-60 minutes, Regional areas 1-2 hours, Remote areas 2-4 hours. All contractors offer 24/7 emergency service.',
  },
  {
    question: 'Do you have a phone number to call?',
    answer:
      'We operate exclusively through our online form system to provide rapid response and proper contractor matching. This system is available 24/7 and connects you directly with qualified local contractors.',
  },
];

export default function GeneralQuestionsPage() {
  return (
    <AgFAQPageTemplate
      category="General"
      title="General Questions"
      subtitle="Everything about general restoration"
      faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))}
    />
  );
}
