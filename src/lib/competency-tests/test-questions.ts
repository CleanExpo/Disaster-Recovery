/**
 * Australian Disaster Recovery Competency Test Questions
 * All questions based on Australian government sources and industry standards
 */

import { CompetencyTest, CompetencyCategory } from '@/types/contractor-competency';

export const COMPETENCY_TEST_QUESTIONS: CompetencyTest[] = [
  // AUSTRALIAN CONSUMER LAW
  {
    id: 'acl_001',
    category: CompetencyCategory.AUSTRALIAN_CONSUMER_LAW,
    subcategory: 'Consumer Guarantees',
    question: 'Under the Australian Consumer Law, which consumer guarantee applies to disaster recovery services?',
    questionType: 'MULTIPLE_CHOICE',
    options: [
      'Services must be provided with due care and skill',
      'Services must be fit for any specified purpose',
      'Services must be provided within a reasonable time',
      'All of the above'
    ],
    correctAnswer: 'All of the above',
    explanation: 'Under ACL Schedule 2, sections 60-62, all three guarantees apply to services. Services must be rendered with due care and skill, be fit for any disclosed purpose, and be supplied within a reasonable time when no time is fixed.',
    reference: 'Competition and Consumer Act 2010 - Schedule 2, Sections 60-62',
    difficulty: 'BASIC',
    points: 5,
    timeLimit: 60
  },
  {
    id: 'acl_002',
    category: CompetencyCategory.AUSTRALIAN_CONSUMER_LAW,
    subcategory: 'Cooling Off Period',
    question: 'A homeowner signs an unsolicited consumer agreement for mould remediation at their door. How many business days do they have to cancel without penalty?',
    questionType: 'MULTIPLE_CHOICE',
    options: [
      '3 business days',
      '5 business days',
      '10 business days',
      '14 business days'
    ],
    correctAnswer: '10 business days',
    explanation: 'Under ACL section 82, unsolicited consumer agreements have a 10 business day cooling-off period. This applies to agreements made at a place other than the supplier\'s business premises.',
    reference: 'Competition and Consumer Act 2010 - Section 82',
    difficulty: 'BASIC',
    points: 5,
    timeLimit: 60
  },
  {
    id: 'acl_003',
    category: CompetencyCategory.AUSTRALIAN_CONSUMER_LAW,
    subcategory: 'Misleading Conduct',
    question: 'TRUE or FALSE: A contractor can advertise "IICRC Certified" if only one of their ten technicians holds an IICRC certification.',
    questionType: 'TRUE_FALSE',
    correctAnswer: 'FALSE',
    explanation: 'This would constitute misleading or deceptive conduct under ACL section 18. The representation implies all technicians are certified when only one is, which is likely to mislead consumers about the level of expertise.',
    reference: 'Competition and Consumer Act 2010 - Section 18',
    difficulty: 'INTERMEDIATE',
    points: 7,
    timeLimit: 45
  },
  {
    id: 'acl_004',
    category: CompetencyCategory.AUSTRALIAN_CONSUMER_LAW,
    subcategory: 'Unfair Contract Terms',
    question: 'Which of the following would likely be considered an unfair contract term under ACL?',
    questionType: 'MULTIPLE_CHOICE',
    options: [
      'A term allowing the contractor to unilaterally vary the contract price',
      'A term requiring 24-hour notice for cancellation',
      'A term specifying payment terms of 14 days',
      'A term requiring the customer to provide site access'
    ],
    correctAnswer: 'A term allowing the contractor to unilaterally vary the contract price',
    explanation: 'Under ACL section 24, a term that permits one party (but not another) to vary the terms of the contract is likely unfair, as it causes significant imbalance in parties\' rights and is not reasonably necessary to protect legitimate interests.',
    reference: 'Competition and Consumer Act 2010 - Section 24',
    difficulty: 'ADVANCED',
    points: 10,
    timeLimit: 90
  },

  // INSURANCE LIABILITY
  {
    id: 'ins_001',
    category: CompetencyCategory.INSURANCE_LIABILITY,
    subcategory: 'Section 54 Rights',
    question: 'Under Section 54 of the Insurance Contracts Act 1984, when can an insurer refuse a claim based on a breach of policy condition?',
    questionType: 'MULTIPLE_CHOICE',
    options: [
      'Any time the insured breaches a condition',
      'Only when the breach directly caused or contributed to the loss',
      'Never - all claims must be paid',
      'Only for fraudulent breaches'
    ],
    correctAnswer: 'Only when the breach directly caused or contributed to the loss',
    explanation: 'Section 54 prevents insurers from refusing claims for breaches that did not cause or contribute to the loss. The insurer may only reduce liability to the extent the breach prejudiced their interests.',
    reference: 'Insurance Contracts Act 1984 - Section 54',
    difficulty: 'INTERMEDIATE',
    points: 8,
    timeLimit: 75
  },
  {
    id: 'ins_002',
    category: CompetencyCategory.INSURANCE_LIABILITY,
    subcategory: 'Make Safe Works',
    question: 'An insurer authorises emergency make-safe works up to $5,000. The contractor completes $7,500 of work. Under standard insurance practices, who is liable for the additional $2,500?',
    questionType: 'SCENARIO',
    correctAnswer: 'The contractor is liable unless they obtained prior written approval for the additional works',
    explanation: 'Insurance authorisations have strict limits. Work beyond authorised amounts without prior approval becomes the contractor\'s liability. Always obtain written variations before exceeding limits.',
    reference: 'General Insurance Code of Practice 2020 - Part 9',
    difficulty: 'INTERMEDIATE',
    points: 8,
    timeLimit: 90
  },
  {
    id: 'ins_003',
    category: CompetencyCategory.INSURANCE_LIABILITY,
    subcategory: 'Cash Settlement',
    question: 'Calculate the cash settlement for a building with: Sum Insured $500,000, Replacement Cost $600,000, Damage Assessment $60,000. Apply the 80% co-insurance rule.',
    questionType: 'CALCULATION',
    correctAnswer: '$50,000',
    explanation: 'Under-insurance calculation: ($500,000 / ($600,000 × 0.8)) × $60,000 = $50,000. The property is underinsured, so the claim is reduced proportionally.',
    reference: 'Insurance Council of Australia - Underinsurance Guidelines',
    difficulty: 'ADVANCED',
    points: 12,
    timeLimit: 120
  },

  // CONTRACTOR BUSINESS LAW
  {
    id: 'cbl_001',
    category: CompetencyCategory.CONTRACTOR_BUSINESS_LAW,
    subcategory: 'Security of Payment',
    question: 'Under the Building and Construction Industry Security of Payment Act, what is the timeframe for serving a payment claim in NSW?',
    questionType: 'MULTIPLE_CHOICE',
    options: [
      'Within 3 months after the reference date',
      'Within 6 months after the reference date',
      'Within 12 months after the reference date',
      'No time limit specified'
    ],
    correctAnswer: 'Within 12 months after the reference date',
    explanation: 'Section 13(4) of the NSW Security of Payment Act states a payment claim must be served within 12 months after the construction work was last carried out.',
    reference: 'Building and Construction Industry Security of Payment Act 1999 (NSW) - Section 13(4)',
    difficulty: 'INTERMEDIATE',
    points: 7,
    timeLimit: 60
  },
  {
    id: 'cbl_002',
    category: CompetencyCategory.CONTRACTOR_BUSINESS_LAW,
    subcategory: 'Subcontractor Rights',
    question: 'TRUE or FALSE: A head contractor can withhold payment from a subcontractor if the principal has not paid the head contractor.',
    questionType: 'TRUE_FALSE',
    correctAnswer: 'FALSE',
    explanation: '"Pay when paid" clauses are prohibited under Security of Payment legislation. Head contractors must pay subcontractors according to the subcontract terms regardless of payment from the principal.',
    reference: 'Building and Construction Industry Security of Payment Act - Various states',
    difficulty: 'BASIC',
    points: 5,
    timeLimit: 45
  },
  {
    id: 'cbl_003',
    category: CompetencyCategory.CONTRACTOR_BUSINESS_LAW,
    subcategory: 'Variations',
    question: 'A property owner requests additional work during water damage restoration. What must a contractor do to ensure payment for variations?',
    questionType: 'WRITTEN',
    correctAnswer: 'Obtain written agreement including scope, cost, and timeframe before commencing variation work',
    explanation: 'Variations must be documented in writing with clear scope, pricing, and customer agreement. Verbal agreements are difficult to enforce and may not be covered by insurance.',
    reference: 'Home Building Act 1989 (NSW) - Section 6A',
    difficulty: 'INTERMEDIATE',
    points: 8,
    timeLimit: 120
  },

  // TAX AND GST
  {
    id: 'tax_001',
    category: CompetencyCategory.TAX_GST,
    subcategory: 'GST Calculation',
    question: 'Calculate the GST component of a tax invoice showing a total amount of $8,250 (GST inclusive).',
    questionType: 'CALCULATION',
    correctAnswer: '$750',
    explanation: 'GST calculation from GST-inclusive amount: $8,250 ÷ 11 = $750. The formula is Total Amount ÷ 11 for extracting GST from inclusive amounts.',
    reference: 'A New Tax System (Goods and Services Tax) Act 1999 - Division 9',
    difficulty: 'BASIC',
    points: 5,
    timeLimit: 60
  },
  {
    id: 'tax_002',
    category: CompetencyCategory.TAX_GST,
    subcategory: 'Tax Invoices',
    question: 'What information must be included on a tax invoice for a disaster recovery service over $1,000?',
    questionType: 'MULTIPLE_CHOICE',
    options: [
      'ABN of supplier only',
      'ABN of supplier, GST amount, and "Tax Invoice" clearly stated',
      'Just the total amount including GST',
      'Customer name only'
    ],
    correctAnswer: 'ABN of supplier, GST amount, and "Tax Invoice" clearly stated',
    explanation: 'Tax invoices over $1,000 must include: "Tax Invoice" stated, supplier\'s identity and ABN, date, description of supply, GST amount shown separately, and total price.',
    reference: 'A New Tax System (Goods and Services Tax) Act 1999 - Section 29-70',
    difficulty: 'BASIC',
    points: 5,
    timeLimit: 60
  },
  {
    id: 'tax_003',
    category: CompetencyCategory.TAX_GST,
    subcategory: 'ABN Requirements',
    question: 'TRUE or FALSE: A sole trader must have an ABN to avoid Pay As You Go (PAYG) withholding of 47% on payments from other businesses.',
    questionType: 'TRUE_FALSE',
    correctAnswer: 'TRUE',
    explanation: 'Without an ABN, businesses must withhold 47% (top marginal tax rate) from payments to contractors. This is required under the PAYG withholding regime.',
    reference: 'Taxation Administration Act 1953 - Section 12-190',
    difficulty: 'INTERMEDIATE',
    points: 6,
    timeLimit: 45
  },

  // INDUSTRY STANDARDS
  {
    id: 'ind_001',
    category: CompetencyCategory.INDUSTRY_STANDARDS,
    subcategory: 'IICRC S500',
    question: 'According to IICRC S500, what are the three categories of water in water damage restoration?',
    questionType: 'WRITTEN',
    correctAnswer: 'Category 1: Clean water from sanitary source; Category 2: Grey water with potential contamination; Category 3: Black water grossly contaminated',
    explanation: 'IICRC S500 defines water categories based on source and contamination level. Cat 1 deteriorates to Cat 2 after 48 hours, and Cat 2 to Cat 3 after 48 hours.',
    reference: 'IICRC S500 Standard - Section 10.2',
    difficulty: 'BASIC',
    points: 6,
    timeLimit: 90
  },
  {
    id: 'ind_002',
    category: CompetencyCategory.INDUSTRY_STANDARDS,
    subcategory: 'IICRC S520',
    question: 'Under IICRC S520, what is the minimum negative pressure differential required for mould containment?',
    questionType: 'MULTIPLE_CHOICE',
    options: [
      '0.02 inches of water column',
      '0.05 inches of water column',
      '0.10 inches of water column',
      '0.15 inches of water column'
    ],
    correctAnswer: '0.02 inches of water column',
    explanation: 'IICRC S520 requires a minimum of 0.02 inches (5 Pascals) of negative pressure differential to prevent contaminated air from escaping containment.',
    reference: 'IICRC S520 Standard - Section 12.2.2',
    difficulty: 'INTERMEDIATE',
    points: 8,
    timeLimit: 60
  },
  {
    id: 'ind_003',
    category: CompetencyCategory.INDUSTRY_STANDARDS,
    subcategory: 'Drying Goals',
    question: 'Calculate the Equilibrium Moisture Content (EMC) for timber at 22°C and 55% RH using the standard formula.',
    questionType: 'CALCULATION',
    correctAnswer: '10.5%',
    explanation: 'Using standard EMC tables or formula: At 22°C and 55% RH, timber EMC is approximately 10.5%. This is the target moisture content for structural drying.',
    reference: 'AS/NZS 1080.1:2012 - Timber Moisture Content',
    difficulty: 'ADVANCED',
    points: 10,
    timeLimit: 120
  },

  // WHS SAFETY
  {
    id: 'whs_001',
    category: CompetencyCategory.WHS_SAFETY,
    subcategory: 'Asbestos',
    question: 'Under Work Health and Safety Regulations, what year were all forms of asbestos banned in Australia?',
    questionType: 'MULTIPLE_CHOICE',
    options: [
      '1989',
      '1995',
      '2003',
      '2010'
    ],
    correctAnswer: '2003',
    explanation: 'Australia banned all forms of asbestos on 31 December 2003. However, buildings constructed before 1990 are highly likely to contain asbestos materials.',
    reference: 'Work Health and Safety Regulation 2011 - Chapter 8',
    difficulty: 'BASIC',
    points: 5,
    timeLimit: 45
  },
  {
    id: 'whs_002',
    category: CompetencyCategory.WHS_SAFETY,
    subcategory: 'Working at Heights',
    question: 'What is the minimum height at which fall protection is required under WHS Regulations?',
    questionType: 'MULTIPLE_CHOICE',
    options: [
      '1.5 metres',
      '2 metres',
      '3 metres',
      '4 metres'
    ],
    correctAnswer: '2 metres',
    explanation: 'WHS Regulations require fall protection for any work at 2 metres or more. However, protection may be required at any height where there is risk of injury.',
    reference: 'Work Health and Safety Regulation 2011 - Part 4.4',
    difficulty: 'BASIC',
    points: 5,
    timeLimit: 45
  },
  {
    id: 'whs_003',
    category: CompetencyCategory.WHS_SAFETY,
    subcategory: 'Incident Reporting',
    question: 'A worker suffers an electric shock requiring hospitalisation. How quickly must this be reported to the WHS regulator?',
    questionType: 'MULTIPLE_CHOICE',
    options: [
      'Within 24 hours',
      'Within 48 hours',
      'Immediately after securing the scene',
      'Within 7 days'
    ],
    correctAnswer: 'Immediately after securing the scene',
    explanation: 'Serious incidents including hospitalisation must be notified immediately after becoming aware, once the site is secure. The site must be preserved until an inspector arrives.',
    reference: 'Work Health and Safety Act 2011 - Section 38',
    difficulty: 'INTERMEDIATE',
    points: 7,
    timeLimit: 60
  },

  // SPECIAL LICENSES
  {
    id: 'lic_001',
    category: CompetencyCategory.SPECIAL_LICENSES,
    subcategory: 'Electrical Work',
    question: 'TRUE or FALSE: A disaster recovery technician can disconnect and reconnect electrical appliances during flood restoration without an electrical license.',
    questionType: 'TRUE_FALSE',
    correctAnswer: 'FALSE',
    explanation: 'Any electrical work, including disconnecting/reconnecting fixed wired appliances, requires a licensed electrician. Technicians can only unplug portable appliances.',
    reference: 'Electrical Safety Act 2002 - Section 55',
    difficulty: 'BASIC',
    points: 5,
    timeLimit: 45
  },
  {
    id: 'lic_002',
    category: CompetencyCategory.SPECIAL_LICENSES,
    subcategory: 'Plumbing',
    question: 'Which of the following requires a plumbing license in Queensland?',
    questionType: 'MULTIPLE_CHOICE',
    options: [
      'Extracting water with portable pumps',
      'Disconnecting a toilet for drying',
      'Setting up dehumidifiers',
      'Cleaning gutters'
    ],
    correctAnswer: 'Disconnecting a toilet for drying',
    explanation: 'Any work on sanitary plumbing, including disconnecting toilets, requires a plumbing license. Water extraction and dehumidification are not regulated plumbing work.',
    reference: 'Plumbing and Drainage Act 2018 (QLD) - Section 106',
    difficulty: 'INTERMEDIATE',
    points: 6,
    timeLimit: 60
  },
  {
    id: 'lic_003',
    category: CompetencyCategory.SPECIAL_LICENSES,
    subcategory: 'Asbestos Removal',
    question: 'What is the maximum amount of non-friable asbestos that can be removed without an asbestos removal license?',
    questionType: 'MULTIPLE_CHOICE',
    options: [
      '10 square metres',
      '5 square metres',
      '2 square metres',
      'Any amount with proper PPE'
    ],
    correctAnswer: '10 square metres',
    explanation: 'Up to 10m² of non-friable asbestos can be removed without a license, but must follow all safety procedures. Friable asbestos always requires a Class A license.',
    reference: 'Work Health and Safety Regulation 2011 - Regulation 485',
    difficulty: 'INTERMEDIATE',
    points: 7,
    timeLimit: 60
  },

  // ETHICAL CONDUCT
  {
    id: 'eth_001',
    category: CompetencyCategory.ETHICAL_CONDUCT,
    subcategory: 'Vulnerable Persons',
    question: 'An elderly client with apparent cognitive impairment wants to sign a $50,000 remediation contract. What should the contractor do?',
    questionType: 'SCENARIO',
    correctAnswer: 'Suggest the client involve a trusted family member or advocate before signing',
    explanation: 'Contractors have an ethical duty to ensure vulnerable persons have capacity to consent. Involving support persons protects both parties and ensures informed consent.',
    reference: 'ACCC Guidelines - Dealing with Disadvantaged Consumers',
    difficulty: 'INTERMEDIATE',
    points: 8,
    timeLimit: 90
  },
  {
    id: 'eth_002',
    category: CompetencyCategory.ETHICAL_CONDUCT,
    subcategory: 'Conflict of Interest',
    question: 'TRUE or FALSE: A contractor can accept a referral fee from a building materials supplier they recommend to clients.',
    questionType: 'TRUE_FALSE',
    correctAnswer: 'FALSE',
    explanation: 'Undisclosed referral fees create conflicts of interest. Any financial arrangements must be disclosed to clients to maintain transparency and trust.',
    reference: 'Competition and Consumer Act 2010 - Unconscionable Conduct provisions',
    difficulty: 'INTERMEDIATE',
    points: 6,
    timeLimit: 45
  },
  {
    id: 'eth_003',
    category: CompetencyCategory.ETHICAL_CONDUCT,
    subcategory: 'Duty of Care',
    question: 'During mould inspection, you discover extensive hidden mould the insurance won\'t cover. The client asks you not to document it. What should you do?',
    questionType: 'SCENARIO',
    correctAnswer: 'Document all findings as you have a duty of care to report health and safety hazards',
    explanation: 'Contractors have a duty of care that overrides client requests to hide hazards. Failure to document could result in liability for future health issues.',
    reference: 'Civil Liability Act 2002 - Duty of Care provisions',
    difficulty: 'ADVANCED',
    points: 10,
    timeLimit: 90
  },

  // TECHNICAL KNOWLEDGE
  {
    id: 'tech_001',
    category: CompetencyCategory.TECHNICAL_KNOWLEDGE,
    subcategory: 'Psychrometry',
    question: 'If the temperature is 25°C and relative humidity is 60%, what is the approximate dew point?',
    questionType: 'CALCULATION',
    correctAnswer: '17°C',
    explanation: 'Using psychrometric charts or formulas, at 25°C and 60% RH, the dew point is approximately 17°C. This is critical for preventing condensation during drying.',
    reference: 'IICRC S500 - Psychrometry Principles',
    difficulty: 'ADVANCED',
    points: 10,
    timeLimit: 120
  },
  {
    id: 'tech_002',
    category: CompetencyCategory.TECHNICAL_KNOWLEDGE,
    subcategory: 'Moisture Measurement',
    question: 'What is the fiber saturation point for most timber species?',
    questionType: 'MULTIPLE_CHOICE',
    options: [
      '15-20%',
      '25-30%',
      '35-40%',
      '45-50%'
    ],
    correctAnswer: '25-30%',
    explanation: 'The fiber saturation point is typically 25-30% moisture content. Below this, moisture is bound in cell walls; above it, free water exists in cell cavities.',
    reference: 'AS/NZS 1080.1:2012 - Timber Standards',
    difficulty: 'INTERMEDIATE',
    points: 7,
    timeLimit: 60
  },
  {
    id: 'tech_003',
    category: CompetencyCategory.TECHNICAL_KNOWLEDGE,
    subcategory: 'Antimicrobials',
    question: 'According to IICRC S520, when should antimicrobials be applied in mould remediation?',
    questionType: 'WRITTEN',
    correctAnswer: 'After removal of mould and cleaning, as a final step to treat remaining surfaces',
    explanation: 'Antimicrobials are not a substitute for removal. They should only be applied after physical removal and cleaning to address any remaining contamination.',
    reference: 'IICRC S520 - Section 13.4',
    difficulty: 'INTERMEDIATE',
    points: 8,
    timeLimit: 90
  },

  // DOCUMENTATION
  {
    id: 'doc_001',
    category: CompetencyCategory.DOCUMENTATION,
    subcategory: 'Chain of Custody',
    question: 'What information must be included on a chain of custody form for mould samples?',
    questionType: 'WRITTEN',
    correctAnswer: 'Sample location, date/time collected, collector name, sample type, unique identifier, and all persons handling sample',
    explanation: 'Chain of custody ensures sample integrity and admissibility. Breaking the chain can invalidate results for insurance or legal purposes.',
    reference: 'NATA ISO/IEC 17025 - Laboratory Standards',
    difficulty: 'INTERMEDIATE',
    points: 8,
    timeLimit: 90
  },
  {
    id: 'doc_002',
    category: CompetencyCategory.DOCUMENTATION,
    subcategory: 'Moisture Mapping',
    question: 'How often should moisture readings be documented during a typical structural drying project?',
    questionType: 'MULTIPLE_CHOICE',
    options: [
      'Once at the beginning',
      'Daily',
      'Every three days',
      'Only at completion'
    ],
    correctAnswer: 'Daily',
    explanation: 'Daily moisture documentation tracks drying progress, justifies equipment use, and provides evidence for insurance claims. It also helps identify any drying issues early.',
    reference: 'IICRC S500 - Documentation Standards',
    difficulty: 'BASIC',
    points: 5,
    timeLimit: 45
  },
  {
    id: 'doc_003',
    category: CompetencyCategory.DOCUMENTATION,
    subcategory: 'Photographic Evidence',
    question: 'TRUE or FALSE: Photos for insurance documentation must include a scale reference and date/time stamp.',
    questionType: 'TRUE_FALSE',
    correctAnswer: 'TRUE',
    explanation: 'Professional documentation requires scale references (rulers/tape measures) and date stamps to verify damage extent and timeline. This prevents disputes over scope.',
    reference: 'Insurance Council of Australia - Claims Documentation Guidelines',
    difficulty: 'BASIC',
    points: 5,
    timeLimit: 45
  }
];

// Scoring thresholds
export const PASSING_SCORES = {
  [CompetencyCategory.AUSTRALIAN_CONSUMER_LAW]: 80,
  [CompetencyCategory.CONTRACTOR_BUSINESS_LAW]: 75,
  [CompetencyCategory.INSURANCE_LIABILITY]: 80,
  [CompetencyCategory.TAX_GST]: 75,
  [CompetencyCategory.INDUSTRY_STANDARDS]: 85,
  [CompetencyCategory.WHS_SAFETY]: 90,
  [CompetencyCategory.SPECIAL_LICENSES]: 85,
  [CompetencyCategory.ETHICAL_CONDUCT]: 85,
  [CompetencyCategory.TECHNICAL_KNOWLEDGE]: 80,
  [CompetencyCategory.DOCUMENTATION]: 75
};

// Test selection logic
export function getTestByCategory(
  category: CompetencyCategory,
  difficulty?: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED'
): CompetencyTest[] {
  return COMPETENCY_TEST_QUESTIONS.filter(q => 
    q.category === category && 
    (!difficulty || q.difficulty === difficulty)
  );
}

export function generateRandomTest(
  categories: CompetencyCategory[],
  questionsPerCategory: number = 5
): CompetencyTest[] {
  const selectedQuestions: CompetencyTest[] = [];
  
  categories.forEach(category => {
    const categoryQuestions = getTestByCategory(category);
    const shuffled = categoryQuestions.sort(() => Math.random() - 0.5);
    selectedQuestions.push(...shuffled.slice(0, questionsPerCategory));
  });
  
  return selectedQuestions.sort(() => Math.random() - 0.5);
}

export function calculateTestScore(
  answers: Map<string, string | string[]>,
  questions: CompetencyTest[]
): {
  totalScore: number;
  possibleScore: number;
  percentage: number;
  categoryScores: Map<CompetencyCategory, { score: number; possible: number; passed: boolean }>;
} {
  let totalScore = 0;
  let possibleScore = 0;
  const categoryScores = new Map<CompetencyCategory, { score: number; possible: number; passed: boolean }>();
  
  questions.forEach(question => {
    const userAnswer = answers.get(question.id);
    const isCorrect = Array.isArray(question.correctAnswer)
      ? question.correctAnswer.includes(userAnswer as string)
      : question.correctAnswer === userAnswer;
    
    possibleScore += question.points;
    
    if (!categoryScores.has(question.category)) {
      categoryScores.set(question.category, { score: 0, possible: 0, passed: false });
    }
    
    const catScore = categoryScores.get(question.category)!;
    catScore.possible += question.points;
    
    if (isCorrect) {
      totalScore += question.points;
      catScore.score += question.points;
    }
  });
  
  // Calculate pass/fail for each category
  categoryScores.forEach((score, category) => {
    const percentage = (score.score / score.possible) * 100;
    score.passed = percentage >= PASSING_SCORES[category];
  });
  
  return {
    totalScore,
    possibleScore,
    percentage: (totalScore / possibleScore) * 100,
    categoryScores
  };
}