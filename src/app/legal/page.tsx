'use client'

import Link from 'next/link'
import { 
  FaBuilding, FaHandshake, FaUsers, FaDollarSign, 
  FaBullhorn, FaCode, FaGavel, FaBriefcase,
  FaFileContract, FaShieldAlt, FaBalanceScale, FaCheckCircle
} from 'react-icons/fa'

const categories = [
  {
    title: 'Core Business Structure',
    href: '/legal/core-business',
    icon: FaBuilding,
    description: 'Foundation legal documents for business operations',
    count: 6,
    color: 'blue'
  },
  {
    title: 'Contractor Network',
    href: '/legal/contractor-network',
    icon: FaHandshake,
    description: 'Contractor relationship and network agreements',
    count: 9,
    color: 'green'
  },
  {
    title: 'Client-Facing',
    href: '/legal/client-facing',
    icon: FaUsers,
    description: 'Customer service and client protection agreements',
    count: 7,
    color: 'purple'
  },
  {
    title: 'Financial & Payment',
    href: '/legal/financial-payment',
    icon: FaDollarSign,
    description: 'Payment processing and financial agreements',
    count: 5,
    color: 'yellow'
  },
  {
    title: 'Affiliate & Marketing',
    href: '/legal/affiliate-marketing',
    icon: FaBullhorn,
    description: 'Marketing partnerships and referral agreements',
    count: 5,
    color: 'pink'
  },
  {
    title: 'Platform & Technology',
    href: '/legal/platform-technology',
    icon: FaCode,
    description: 'Software licensing and technology agreements',
    count: 5,
    color: 'indigo'
  },
  {
    title: 'Compliance & Industry',
    href: '/legal/compliance-industry',
    icon: FaGavel,
    description: 'Regulatory compliance and industry requirements',
    count: 5,
    color: 'red'
  },
  {
    title: 'Governance',
    href: '/legal/governance',
    icon: FaBriefcase,
    description: 'Corporate governance and employment agreements',
    count: 5,
    color: 'gray'
  }
]

export default function LegalDocumentsHub() {
  const totalDocuments = categories.reduce((sum, cat) => sum + cat.count, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <FaBalanceScale className="text-6xl mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl font-bold mb-4">
              Legal Document Center
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Comprehensive legal frameworks for disaster recovery operations
            </p>
            <div className="flex justify-center gap-8">
              <div className="bg-white/10 rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">{totalDocuments}+</div>
                <div className="text-sm opacity-90">Legal Documents</div>
              </div>
              <div className="bg-white/10 rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">8</div>
                <div className="text-sm opacity-90">Categories</div>
              </div>
              <div className="bg-white/10 rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm opacity-90">Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <FaFileContract className="text-2xl text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Australian Compliant</h3>
                <p className="text-sm text-gray-600">All documents comply with Australian law</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaShieldAlt className="text-2xl text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Legally Reviewed</h3>
                <p className="text-sm text-gray-600">Vetted by legal professionals</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-2xl text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Industry Standard</h3>
                <p className="text-sm text-gray-600">Best practice frameworks</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaBalanceScale className="text-2xl text-orange-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Regular Updates</h3>
                <p className="text-sm text-gray-600">Kept current with regulations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Document Categories */}
        <h2 className="text-3xl font-bold mb-8">Document Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            const bgColor = `bg-${category.color}-50`
            const iconColor = `text-${category.color}-600`
            const hoverBg = `hover:bg-${category.color}-100`
            
            return (
              <Link
                key={index}
                href={category.href}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 p-4`}>
                  <Icon className="text-3xl text-white" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {category.count} Documents
                    </span>
                    <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-amber-50 border-2 border-amber-200 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-amber-900">
            ⚖️ Important Legal Notice
          </h3>
          <p className="text-amber-800 mb-4">
            These documents are provided as templates and general guidance for the disaster recovery
            industry. While they have been prepared with care to comply with Australian law, they
            should be reviewed and customized by qualified legal counsel to ensure they meet your
            specific business needs and circumstances.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4">
              <strong className="text-amber-900">Entity:</strong>
              <p className="text-sm">National Restoration Platform Pty Ltd</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <strong className="text-amber-900">ABN:</strong>
              <p className="text-sm">85 151 794 142</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <strong className="text-amber-900">Last Updated:</strong>
              <p className="text-sm">August 2025</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Need Custom Legal Documents?</h3>
          <p className="mb-6 opacity-90">
            Our legal team can help customize these documents for your specific needs
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/contact"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Contact Legal Team
            </Link>
            <Link 
              href="/legal/forms/terms-of-service"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition"
            >
              View Sample Document
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}