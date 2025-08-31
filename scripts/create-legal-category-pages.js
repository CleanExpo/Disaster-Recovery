const fs = require('fs');
const path = require('path');

const categories = [
  {
    path: 'contractor-network',
    title: 'Contractor/Network Documents',
    description: 'Comprehensive contractor relationship and network management agreements',
    documents: [
      { title: 'Master Service Agreement', href: '/legal/forms/master-service-agreement', icon: 'FaClipboardList' },
      { title: 'Territory/Exclusivity Agreements', href: '/legal/forms/territory-agreements', icon: 'FaMapMarkedAlt' },
      { title: 'Performance Standards', href: '/legal/forms/performance-standards', icon: 'FaChartLine' },
      { title: 'Quality Assurance', href: '/legal/forms/quality-assurance', icon: 'FaCertificate' },
      { title: 'Insurance Requirements', href: '/legal/forms/insurance-requirements', icon: 'FaUmbrella' },
      { title: 'Background Check', href: '/legal/forms/background-check', icon: 'FaUserCheck' },
      { title: 'Training & Certification', href: '/legal/forms/training-certification', icon: 'FaGraduationCap' },
      { title: 'Equipment Agreements', href: '/legal/forms/equipment-agreements', icon: 'FaTools' },
      { title: 'Termination Procedures', href: '/legal/forms/termination-procedures', icon: 'FaDoorOpen' }
    ]
  },
  {
    path: 'client-facing',
    title: 'Client-Facing Documents',
    description: 'Customer service agreements and client protection frameworks',
    documents: [
      { title: 'Service Level Agreements', href: '/legal/forms/service-level-agreements', icon: 'FaHandshake' },
      { title: 'Emergency Response', href: '/legal/forms/emergency-response', icon: 'FaAmbulance' },
      { title: 'Property Access', href: '/legal/forms/property-access', icon: 'FaKey' },
      { title: 'Liability Limitation', href: '/legal/forms/liability-limitation', icon: 'FaExclamationTriangle' },
      { title: 'Warranty & Guarantee', href: '/legal/forms/warranty-guarantee', icon: 'FaMedal' },
      { title: 'Dispute Resolution', href: '/legal/forms/dispute-resolution', icon: 'FaBalanceScale' },
      { title: 'Insurance Claims Assistance', href: '/legal/forms/insurance-claims-assistance', icon: 'FaFileInvoice' }
    ]
  },
  {
    path: 'financial-payment',
    title: 'Financial & Payment Documents',
    description: 'Payment processing, fee structures, and financial agreements',
    documents: [
      { title: 'Fee Structure & Commissions', href: '/legal/forms/fee-structure', icon: 'FaDollarSign' },
      { title: 'Payment Processing', href: '/legal/forms/payment-processing', icon: 'FaCreditCard' },
      { title: 'Refund & Chargeback', href: '/legal/forms/refund-chargeback', icon: 'FaUndo' },
      { title: 'Late Payment Procedures', href: '/legal/forms/late-payment', icon: 'FaClock' },
      { title: 'Escrow Management', href: '/legal/forms/escrow-management', icon: 'FaLock' }
    ]
  },
  {
    path: 'affiliate-marketing',
    title: 'Affiliate & Marketing Documents',
    description: 'Marketing partnerships, referrals, and promotional agreements',
    documents: [
      { title: 'Lead Generation', href: '/legal/forms/lead-generation', icon: 'FaBullhorn' },
      { title: 'Referral Partners', href: '/legal/forms/referral-partners', icon: 'FaUserFriends' },
      { title: 'Marketing Compliance', href: '/legal/forms/marketing-compliance', icon: 'FaCheckCircle' },
      { title: 'IP License Agreements', href: '/legal/forms/ip-license', icon: 'FaCopyright' },
      { title: 'Non-Compete Agreements', href: '/legal/forms/non-compete', icon: 'FaBan' }
    ]
  },
  {
    path: 'platform-technology',
    title: 'Platform & Technology Documents',
    description: 'Software licensing, API terms, and technology agreements',
    documents: [
      { title: 'Software License', href: '/legal/forms/software-license', icon: 'FaCode' },
      { title: 'Data Usage & Sharing', href: '/legal/forms/data-usage', icon: 'FaDatabase' },
      { title: 'API Terms of Use', href: '/legal/forms/api-terms', icon: 'FaPlug' },
      { title: 'Third-Party Integration', href: '/legal/forms/third-party-integration', icon: 'FaPuzzlePiece' },
      { title: 'Cybersecurity Protocols', href: '/legal/forms/cybersecurity-protocols', icon: 'FaShieldVirus' }
    ]
  },
  {
    path: 'compliance-industry',
    title: 'Compliance & Industry Documents',
    description: 'Regulatory compliance and industry-specific requirements',
    documents: [
      { title: 'Consumer Law Compliance', href: '/legal/forms/consumer-law-compliance', icon: 'FaGavel' },
      { title: 'Building Code Compliance', href: '/legal/forms/building-code-compliance', icon: 'FaHardHat' },
      { title: 'Environmental & Safety', href: '/legal/forms/environmental-safety', icon: 'FaLeaf' },
      { title: 'Workers Compensation', href: '/legal/forms/workers-compensation', icon: 'FaUserShield' },
      { title: 'Public Liability', href: '/legal/forms/public-liability', icon: 'FaUmbrellaBeach' }
    ]
  },
  {
    path: 'governance',
    title: 'Governance Documents',
    description: 'Corporate governance, employment, and advisory agreements',
    documents: [
      { title: 'Advisory Board', href: '/legal/forms/advisory-board', icon: 'FaUsersClass' },
      { title: 'Director & Officer', href: '/legal/forms/director-officer', icon: 'FaUserTie' },
      { title: 'Employment Contracts', href: '/legal/forms/employment-contracts', icon: 'FaBriefcase' },
      { title: 'Consultant & Contractor', href: '/legal/forms/consultant-contractor', icon: 'FaUserCog' },
      { title: 'Conflict of Interest', href: '/legal/forms/conflict-interest', icon: 'FaExclamationCircle' }
    ]
  }
];

function generateCategoryPage(category) {
  const icons = [...new Set(category.documents.map(d => d.icon))].join(', ');
  
  return `'use client'

import Link from 'next/link'
import { ${icons} } from 'react-icons/fa'

const documents = ${JSON.stringify(category.documents, null, 2).replace(/"icon": "(\w+)"/g, 'icon: $1')}

export default function ${category.title.replace(/[^a-zA-Z]/g, '')}Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ${category.title}
          </h1>
          <p className="text-xl text-gray-600">
            ${category.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, index) => {
            const Icon = doc.icon
            return (
              <Link
                key={index}
                href={doc.href}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition">
                    <Icon className="text-2xl text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition">
                      {doc.title}
                    </h3>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Document Compliance</h2>
          <p className="text-gray-700 mb-4">
            All documents in this section are designed to comply with Australian law and
            industry best practices. They are regularly reviewed and updated to ensure
            ongoing compliance with regulatory requirements.
          </p>
          <p className="text-sm text-gray-600">
            <strong>ABN:</strong> 85 151 794 142 | 
            <strong> Last Review:</strong> August 2025 |
            <strong> Next Review:</strong> August 2026
          </p>
        </div>
      </div>
    </div>
  )
}`;
}

// Create all category pages
categories.forEach(category => {
  const dirPath = path.join('D:/Disaster Recovery/src/app/legal', category.path);
  const filePath = path.join(dirPath, 'page.tsx');
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const component = generateCategoryPage(category);
  fs.writeFileSync(filePath, component);
  
  console.log(`✅ Created category page: ${category.title}`);
});

console.log(`\n✅ Successfully created ${categories.length} category pages!`);