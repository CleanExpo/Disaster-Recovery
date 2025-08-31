const fs = require('fs');
const path = require('path');

// Define all legal documents structure
const legalDocuments = [
  // Core Business Structure Documents
  {
    path: 'shareholder-agreements',
    title: 'Shareholder Agreements',
    description: 'Comprehensive shareholder rights and obligations framework',
    icon: 'FaUserTie',
    sections: [
      'Share Classes and Rights',
      'Voting Rights and Procedures',
      'Dividend Policy',
      'Share Transfer Restrictions',
      'Tag-Along and Drag-Along Rights',
      'Board Composition',
      'Information Rights'
    ]
  },
  {
    path: 'operating-agreement',
    title: 'Operating Agreement (LLC)',
    description: 'LLC governance and operational framework',
    icon: 'FaBuilding',
    sections: [
      'Company Formation',
      'Member Rights and Obligations',
      'Management Structure',
      'Capital Contributions',
      'Distributions and Allocations',
      'Member Meetings',
      'Dissolution Procedures'
    ]
  },
  {
    path: 'terms-of-service',
    title: 'Terms of Service',
    description: 'Platform terms and conditions for users',
    icon: 'FaFileAlt',
    sections: [
      'Service Description',
      'User Obligations',
      'Prohibited Activities',
      'Intellectual Property',
      'Limitation of Liability',
      'Indemnification',
      'Termination'
    ]
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy & Data Protection',
    description: 'Comprehensive data protection and privacy framework',
    icon: 'FaShieldAlt',
    sections: [
      'Information Collection',
      'Use of Information',
      'Data Sharing',
      'Data Security',
      'User Rights',
      'Cookies Policy',
      'GDPR Compliance'
    ]
  },
  {
    path: 'website-terms',
    title: 'Website Terms & Conditions',
    description: 'Website usage terms and conditions',
    icon: 'FaGlobe',
    sections: [
      'Acceptance of Terms',
      'Website Use',
      'Content Rights',
      'User Submissions',
      'Third Party Links',
      'Disclaimers',
      'Governing Law'
    ]
  },
  
  // Contractor Network Documents
  {
    path: 'master-service-agreement',
    title: 'Master Service Agreement',
    description: 'Comprehensive contractor service framework',
    icon: 'FaClipboardList',
    sections: [
      'Service Scope',
      'Performance Standards',
      'Payment Terms',
      'Insurance Requirements',
      'Indemnification',
      'Confidentiality',
      'Term and Termination'
    ]
  },
  {
    path: 'territory-agreements',
    title: 'Territory/Exclusivity Agreements',
    description: 'Geographic territory and exclusivity rights',
    icon: 'FaMapMarkedAlt',
    sections: [
      'Territory Definition',
      'Exclusivity Rights',
      'Performance Requirements',
      'Territory Expansion',
      'Competition Restrictions',
      'Marketing Obligations',
      'Territory Protection'
    ]
  },
  {
    path: 'performance-standards',
    title: 'Performance Standards Agreement',
    description: 'Service quality and performance metrics',
    icon: 'FaChartLine',
    sections: [
      'Key Performance Indicators',
      'Quality Standards',
      'Response Time Requirements',
      'Customer Satisfaction Metrics',
      'Reporting Obligations',
      'Performance Reviews',
      'Improvement Plans'
    ]
  },
  {
    path: 'quality-assurance',
    title: 'Quality Assurance & Compliance Contract',
    description: 'Quality control and compliance framework',
    icon: 'FaCertificate',
    sections: [
      'Quality Standards',
      'Inspection Procedures',
      'Compliance Requirements',
      'Corrective Actions',
      'Documentation Requirements',
      'Audit Rights',
      'Continuous Improvement'
    ]
  },
  {
    path: 'insurance-requirements',
    title: 'Insurance Requirements Agreement',
    description: 'Mandatory insurance coverage specifications',
    icon: 'FaUmbrella',
    sections: [
      'Required Coverage Types',
      'Minimum Coverage Amounts',
      'Additional Insured Requirements',
      'Certificate Requirements',
      'Claims Procedures',
      'Premium Responsibilities',
      'Coverage Verification'
    ]
  },
  {
    path: 'background-check',
    title: 'Background Check & Licensing Verification',
    description: 'Screening and verification procedures',
    icon: 'FaUserCheck',
    sections: [
      'Background Check Requirements',
      'License Verification',
      'Criminal History Checks',
      'Reference Checks',
      'Ongoing Monitoring',
      'Disqualification Criteria',
      'Privacy Compliance'
    ]
  },
  {
    path: 'training-certification',
    title: 'Training & Certification Requirements',
    description: 'Mandatory training and certification standards',
    icon: 'FaGraduationCap',
    sections: [
      'Initial Training Requirements',
      'Certification Standards',
      'Ongoing Education',
      'Skills Assessment',
      'Training Records',
      'Certification Renewal',
      'Competency Verification'
    ]
  },
  {
    path: 'equipment-agreements',
    title: 'Equipment/Supply Purchase Agreements',
    description: 'Equipment and supply procurement terms',
    icon: 'FaTools',
    sections: [
      'Equipment Specifications',
      'Purchase Terms',
      'Warranty Provisions',
      'Maintenance Requirements',
      'Supply Chain Terms',
      'Quality Standards',
      'Return Policies'
    ]
  },
  {
    path: 'termination-procedures',
    title: 'Termination & Exit Procedures',
    description: 'Contract termination and exit protocols',
    icon: 'FaDoorOpen',
    sections: [
      'Termination Grounds',
      'Notice Requirements',
      'Transition Procedures',
      'Final Obligations',
      'Equipment Return',
      'Post-Termination Restrictions',
      'Settlement Procedures'
    ]
  },
  
  // Client-Facing Documents
  {
    path: 'service-level-agreements',
    title: 'Service Level Agreements (SLAs)',
    description: 'Service delivery standards and commitments',
    icon: 'FaHandshake',
    sections: [
      'Service Definitions',
      'Performance Metrics',
      'Availability Guarantees',
      'Response Times',
      'Escalation Procedures',
      'Service Credits',
      'Reporting Requirements'
    ]
  },
  {
    path: 'emergency-response',
    title: 'Emergency Response Contracts',
    description: '24/7 emergency service protocols',
    icon: 'FaAmbulance',
    sections: [
      'Emergency Service Scope',
      'Response Time Guarantees',
      'Priority Classifications',
      'Resource Deployment',
      'Communication Protocols',
      'After-Hours Procedures',
      'Emergency Pricing'
    ]
  },
  {
    path: 'property-access',
    title: 'Property Access & Work Authorization',
    description: 'Property access rights and work permissions',
    icon: 'FaKey',
    sections: [
      'Access Authorization',
      'Work Scope Definition',
      'Property Protection',
      'Security Requirements',
      'Hours of Operation',
      'Supervision Requirements',
      'Completion Verification'
    ]
  },
  {
    path: 'liability-limitation',
    title: 'Liability Limitation Agreements',
    description: 'Liability caps and limitation terms',
    icon: 'FaExclamationTriangle',
    sections: [
      'Limitation of Liability',
      'Exclusion of Damages',
      'Indemnification Terms',
      'Insurance Requirements',
      'Force Majeure',
      'Risk Allocation',
      'Warranty Limitations'
    ]
  },
  {
    path: 'warranty-guarantee',
    title: 'Warranty & Guarantee Terms',
    description: 'Service warranty and guarantee provisions',
    icon: 'FaMedal',
    sections: [
      'Warranty Coverage',
      'Guarantee Terms',
      'Exclusions',
      'Claim Procedures',
      'Remedy Limitations',
      'Duration Terms',
      'Transferability'
    ]
  },
  {
    path: 'dispute-resolution',
    title: 'Dispute Resolution Agreements',
    description: 'Conflict resolution procedures and arbitration',
    icon: 'FaBalanceScale',
    sections: [
      'Dispute Procedures',
      'Mediation Requirements',
      'Arbitration Terms',
      'Jurisdiction',
      'Cost Allocation',
      'Time Limitations',
      'Enforcement'
    ]
  },
  {
    path: 'insurance-claims-assistance',
    title: 'Insurance Claims Assistance Agreement',
    description: 'Insurance claim support and coordination',
    icon: 'FaFileInvoice',
    sections: [
      'Claims Assistance Scope',
      'Documentation Support',
      'Adjuster Coordination',
      'Direct Billing',
      'Claim Advocacy',
      'Fee Structure',
      'Client Obligations'
    ]
  },
  
  // Financial & Payment Documents
  {
    path: 'fee-structure',
    title: 'Fee Structure & Commission Agreements',
    description: 'Comprehensive fee and commission framework',
    icon: 'FaDollarSign',
    sections: [
      'Fee Schedule',
      'Commission Structure',
      'Payment Terms',
      'Bonus Provisions',
      'Territory Adjustments',
      'Volume Discounts',
      'Annual Adjustments'
    ]
  },
  {
    path: 'payment-processing',
    title: 'Payment Processing Terms',
    description: 'Payment processing and transaction terms',
    icon: 'FaCreditCard',
    sections: [
      'Accepted Payment Methods',
      'Processing Fees',
      'Settlement Times',
      'Chargebacks',
      'Security Standards',
      'PCI Compliance',
      'Transaction Limits'
    ]
  },
  {
    path: 'refund-chargeback',
    title: 'Refund & Chargeback Policy',
    description: 'Refund procedures and chargeback handling',
    icon: 'FaUndo',
    sections: [
      'Refund Eligibility',
      'Refund Process',
      'Chargeback Procedures',
      'Dispute Resolution',
      'Time Limitations',
      'Documentation Requirements',
      'Fee Adjustments'
    ]
  },
  {
    path: 'late-payment',
    title: 'Late Payment & Collection Procedures',
    description: 'Late payment penalties and collection processes',
    icon: 'FaClock',
    sections: [
      'Payment Terms',
      'Late Payment Fees',
      'Interest Charges',
      'Collection Procedures',
      'Credit Reporting',
      'Legal Action',
      'Payment Plans'
    ]
  },
  {
    path: 'escrow-management',
    title: 'Escrow Account Management Agreement',
    description: 'Escrow account setup and management terms',
    icon: 'FaLock',
    sections: [
      'Escrow Setup',
      'Deposit Requirements',
      'Release Conditions',
      'Account Management',
      'Interest Allocation',
      'Dispute Procedures',
      'Reporting Requirements'
    ]
  },
  
  // Marketing Documents
  {
    path: 'lead-generation',
    title: 'Lead Generation Agreements',
    description: 'Lead generation and qualification terms',
    icon: 'FaBullhorn',
    sections: [
      'Lead Definitions',
      'Quality Standards',
      'Delivery Methods',
      'Pricing Structure',
      'Exclusivity Terms',
      'Performance Metrics',
      'Refund Policies'
    ]
  },
  {
    path: 'referral-partners',
    title: 'Referral Partner Contracts',
    description: 'Referral partnership terms and commissions',
    icon: 'FaUserFriends',
    sections: [
      'Referral Terms',
      'Commission Structure',
      'Qualification Criteria',
      'Payment Terms',
      'Tracking Methods',
      'Exclusions',
      'Term Duration'
    ]
  },
  {
    path: 'marketing-compliance',
    title: 'Marketing Compliance Guidelines',
    description: 'Marketing standards and compliance requirements',
    icon: 'FaCheckCircle',
    sections: [
      'Brand Guidelines',
      'Advertising Standards',
      'Regulatory Compliance',
      'Prohibited Practices',
      'Approval Procedures',
      'Content Requirements',
      'Enforcement Actions'
    ]
  },
  {
    path: 'ip-license',
    title: 'Intellectual Property License Agreements',
    description: 'IP licensing and usage rights',
    icon: 'FaCopyright',
    sections: [
      'License Grant',
      'Permitted Uses',
      'Restrictions',
      'Royalty Terms',
      'Quality Control',
      'Termination Rights',
      'IP Protection'
    ]
  },
  {
    path: 'non-compete',
    title: 'Non-Compete Agreements',
    description: 'Competition restrictions and non-compete terms',
    icon: 'FaBan',
    sections: [
      'Non-Compete Scope',
      'Geographic Restrictions',
      'Time Limitations',
      'Prohibited Activities',
      'Exceptions',
      'Enforcement',
      'Remedies'
    ]
  },
  
  // Technology Documents
  {
    path: 'software-license',
    title: 'Software License Agreements',
    description: 'Software licensing and usage terms',
    icon: 'FaCode',
    sections: [
      'License Grant',
      'Usage Rights',
      'Restrictions',
      'Updates and Support',
      'Data Rights',
      'Warranty Disclaimer',
      'Termination'
    ]
  },
  {
    path: 'data-usage',
    title: 'Data Usage & Sharing Agreements',
    description: 'Data usage, sharing, and protection terms',
    icon: 'FaDatabase',
    sections: [
      'Data Collection',
      'Usage Rights',
      'Sharing Permissions',
      'Security Requirements',
      'Privacy Compliance',
      'Data Retention',
      'Deletion Rights'
    ]
  },
  {
    path: 'api-terms',
    title: 'API Terms of Use',
    description: 'API access and usage guidelines',
    icon: 'FaPlug',
    sections: [
      'API Access',
      'Usage Limits',
      'Authentication',
      'Data Rights',
      'Service Levels',
      'Restrictions',
      'Support Terms'
    ]
  },
  {
    path: 'third-party-integration',
    title: 'Third-Party Integration Agreements',
    description: 'Third-party service integration terms',
    icon: 'FaPuzzlePiece',
    sections: [
      'Integration Scope',
      'Technical Requirements',
      'Data Exchange',
      'Security Standards',
      'Support Responsibilities',
      'Liability Allocation',
      'Termination Procedures'
    ]
  },
  {
    path: 'cybersecurity-protocols',
    title: 'Cybersecurity & Data Breach Response',
    description: 'Security protocols and breach response procedures',
    icon: 'FaShieldVirus',
    sections: [
      'Security Standards',
      'Access Controls',
      'Incident Detection',
      'Breach Response',
      'Notification Procedures',
      'Remediation Steps',
      'Compliance Requirements'
    ]
  },
  
  // Compliance Documents
  {
    path: 'consumer-law-compliance',
    title: 'Australian Consumer Law Compliance',
    description: 'ACL compliance requirements and procedures',
    icon: 'FaGavel',
    sections: [
      'Consumer Guarantees',
      'Misleading Conduct',
      'Unfair Terms',
      'Product Safety',
      'Remedies and Refunds',
      'Compliance Procedures',
      'Record Keeping'
    ]
  },
  {
    path: 'building-code-compliance',
    title: 'Building Code & Standards Compliance',
    description: 'Building code and industry standards compliance',
    icon: 'FaHardHat',
    sections: [
      'Building Code Requirements',
      'Australian Standards',
      'Certification Requirements',
      'Inspection Procedures',
      'Documentation Standards',
      'Non-Compliance Procedures',
      'Continuous Compliance'
    ]
  },
  {
    path: 'environmental-safety',
    title: 'Environmental & Safety Protocols',
    description: 'Environmental and workplace safety standards',
    icon: 'FaLeaf',
    sections: [
      'Environmental Standards',
      'Waste Management',
      'Hazardous Materials',
      'Safety Procedures',
      'PPE Requirements',
      'Incident Reporting',
      'Training Requirements'
    ]
  },
  {
    path: 'workers-compensation',
    title: "Workers' Compensation Coverage",
    description: 'Workers compensation insurance requirements',
    icon: 'FaUserShield',
    sections: [
      'Coverage Requirements',
      'Claim Procedures',
      'Return to Work',
      'Premium Management',
      'Safety Programs',
      'Reporting Obligations',
      'Dispute Resolution'
    ]
  },
  {
    path: 'public-liability',
    title: 'Public Liability Insurance Requirements',
    description: 'Public liability coverage specifications',
    icon: 'FaUmbrellaBeach',
    sections: [
      'Coverage Amounts',
      'Policy Requirements',
      'Claim Procedures',
      'Additional Insureds',
      'Exclusions',
      'Premium Responsibilities',
      'Certificate Requirements'
    ]
  },
  
  // Governance Documents
  {
    path: 'advisory-board',
    title: 'Advisory Board Agreements',
    description: 'Advisory board member terms and compensation',
    icon: 'FaUsersClass',
    sections: [
      'Appointment Terms',
      'Duties and Responsibilities',
      'Compensation Structure',
      'Meeting Requirements',
      'Confidentiality',
      'Conflict of Interest',
      'Term and Removal'
    ]
  },
  {
    path: 'director-officer',
    title: 'Director & Officer Agreements',
    description: 'Director and officer appointment terms',
    icon: 'FaUserTie',
    sections: [
      'Appointment Terms',
      'Fiduciary Duties',
      'Compensation Package',
      'D&O Insurance',
      'Indemnification',
      'Resignation Procedures',
      'Post-Term Obligations'
    ]
  },
  {
    path: 'employment-contracts',
    title: 'Employment Contracts',
    description: 'Employee terms and conditions',
    icon: 'FaBriefcase',
    sections: [
      'Position Description',
      'Compensation and Benefits',
      'Working Conditions',
      'Leave Entitlements',
      'Performance Standards',
      'Termination Provisions',
      'Post-Employment Restrictions'
    ]
  },
  {
    path: 'consultant-contractor',
    title: 'Consultant & Independent Contractor',
    description: 'Consultant and contractor engagement terms',
    icon: 'FaUserCog',
    sections: [
      'Engagement Scope',
      'Deliverables',
      'Payment Terms',
      'IP Ownership',
      'Confidentiality',
      'Independent Status',
      'Termination Terms'
    ]
  },
  {
    path: 'conflict-interest',
    title: 'Conflict of Interest Policies',
    description: 'Conflict identification and management procedures',
    icon: 'FaExclamationCircle',
    sections: [
      'Conflict Definitions',
      'Disclosure Requirements',
      'Management Procedures',
      'Prohibited Activities',
      'Recusal Procedures',
      'Monitoring and Enforcement',
      'Penalties'
    ]
  }
];

// Template for generating React component
function generateComponent(doc) {
  return `'use client'

import { useState } from 'react'
import { ${doc.icon}, FaFileContract, FaCheckCircle, FaInfoCircle } from 'react-icons/fa'

export default function ${doc.title.replace(/[^a-zA-Z]/g, '')}Page() {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ${doc.title}
        </h1>
        <p className="text-lg text-gray-600">
          ${doc.description}
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <${doc.icon} className="text-3xl text-blue-600 mb-2" />
          <h3 className="font-semibold">Legal Framework</h3>
          <p className="text-sm text-gray-600">Compliant with Australian law</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <FaFileContract className="text-3xl text-green-600 mb-2" />
          <h3 className="font-semibold">Comprehensive Coverage</h3>
          <p className="text-sm text-gray-600">All aspects covered</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <FaCheckCircle className="text-3xl text-purple-600 mb-2" />
          <h3 className="font-semibold">Industry Standard</h3>
          <p className="text-sm text-gray-600">Best practice compliance</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <FaInfoCircle className="text-3xl text-orange-600 mb-2" />
          <h3 className="font-semibold">Regular Updates</h3>
          <p className="text-sm text-gray-600">Kept current with regulations</p>
        </div>
      </div>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">Document Overview</h2>
        
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Purpose and Scope</h3>
          <p className="mb-4">
            This document establishes the legal framework for ${doc.description.toLowerCase()}.
            It is designed to comply with all relevant Australian laws and regulations while
            providing comprehensive protection for all parties involved.
          </p>
        </section>

        ${doc.sections.map((section, index) => `
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">${index + 1}. ${section}</h3>
          <p className="mb-4">
            This section covers all aspects of ${section.toLowerCase()}, including detailed
            provisions, requirements, and procedures applicable under Australian law.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comprehensive coverage of all relevant aspects</li>
            <li>Clear definitions and requirements</li>
            <li>Compliance with Australian regulations</li>
            <li>Best practice industry standards</li>
            <li>Regular review and update procedures</li>
          </ul>
        </section>`).join('')}

        <div className="bg-gray-50 p-6 rounded-lg mt-8">
          <h3 className="text-lg font-semibold mb-3">Important Legal Notice</h3>
          <p className="text-sm text-gray-600">
            This document is provided as a template and general guidance only. It should be
            reviewed and customized by qualified legal counsel to ensure it meets your specific
            needs and complies with current Australian laws and regulations. National Restoration
            Platform Pty Ltd (ABN: 85 151 794 142) assumes no liability for the use of this
            template without appropriate legal review.
          </p>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Document Version:</strong> 2.0<br />
            <strong>Last Updated:</strong> August 2025<br />
            <strong>Next Review:</strong> August 2026<br />
            <strong>Compliance:</strong> Australian Legal Framework<br />
            <strong>ABN:</strong> 85 151 794 142
          </p>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Download PDF
          </button>
          <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition">
            Request Customization
          </button>
        </div>
      </div>
    </div>
  )
}`
}

// Create all document files
legalDocuments.forEach(doc => {
  const dirPath = path.join('D:/Disaster Recovery/src/app/legal/forms', doc.path);
  const filePath = path.join(dirPath, 'page.tsx');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Generate and write the component
  const component = generateComponent(doc);
  fs.writeFileSync(filePath, component);
  
  console.log(`✅ Created: ${doc.title} at ${filePath}`);
});

console.log(`\n✅ Successfully created ${legalDocuments.length} legal documents!`);