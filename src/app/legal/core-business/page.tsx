'use client'

import Link from 'next/link'
import { FaBuilding, FaFileContract, FaHandshake, FaShieldAlt, FaGlobe, FaUserTie } from 'react-icons/fa'

const documents = [
  {
    title: 'Partnership/Joint Venture Agreements',
    href: '/legal/forms/partnership-agreements',
    icon: FaHandshake,
    description: 'Comprehensive partnership and joint venture frameworks'
  },
  {
    title: 'Shareholder Agreements',
    href: '/legal/forms/shareholder-agreements',
    icon: FaUserTie,
    description: 'Shareholder rights, obligations, and governance'
  },
  {
    title: 'Operating Agreement (LLC)',
    href: '/legal/forms/operating-agreement',
    icon: FaBuilding,
    description: 'LLC formation and operational guidelines'
  },
  {
    title: 'Terms of Service',
    href: '/legal/forms/terms-of-service',
    icon: FaFileContract,
    description: 'Platform terms and conditions for users'
  },
  {
    title: 'Privacy Policy & Data Protection',
    href: '/legal/forms/privacy-policy',
    icon: FaShieldAlt,
    description: 'Comprehensive data protection framework'
  },
  {
    title: 'Website Terms & Conditions',
    href: '/legal/forms/website-terms',
    icon: FaGlobe,
    description: 'Website usage terms and conditions'
  }
]

export default function CoreBusinessDocuments() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Core Business Structure Documents
          </h1>
          <p className="text-xl text-gray-600">
            Foundation legal documents for business operations and governance
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
                    <p className="text-sm text-gray-600">
                      {doc.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">About These Documents</h2>
          <p className="text-gray-700 mb-4">
            These core business structure documents form the foundation of your organization's
            legal framework. Each document has been carefully crafted to comply with Australian
            business law and industry best practices.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> All documents should be reviewed by qualified legal counsel
            before implementation to ensure they meet your specific business requirements.
          </p>
        </div>
      </div>
    </div>
  )
}