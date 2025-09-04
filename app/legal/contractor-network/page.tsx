'use client'

import Link from 'next/link'
import { FaClipboardList, FaMapMarkedAlt, FaChartLine, FaCertificate, FaUmbrella, FaUserCheck, FaGraduationCap, FaTools, FaDoorOpen } from 'react-icons/fa'

const documents = [
  {
    "title": "Master Service Agreement",
    "href": "/legal/forms/master-service-agreement",
    icon: FaClipboardList
  },
  {
    "title": "Territory/Exclusivity Agreements",
    "href": "/legal/forms/territory-agreements",
    icon: FaMapMarkedAlt
  },
  {
    "title": "Performance Standards",
    "href": "/legal/forms/performance-standards",
    icon: FaChartLine
  },
  {
    "title": "Quality Assurance",
    "href": "/legal/forms/quality-assurance",
    icon: FaCertificate
  },
  {
    "title": "Insurance Requirements",
    "href": "/legal/forms/insurance-requirements",
    icon: FaUmbrella
  },
  {
    "title": "Background Check",
    "href": "/legal/forms/background-check",
    icon: FaUserCheck
  },
  {
    "title": "Training & Certification",
    "href": "/legal/forms/training-certification",
    icon: FaGraduationCap
  },
  {
    "title": "Equipment Agreements",
    "href": "/legal/forms/equipment-agreements",
    icon: FaTools
  },
  {
    "title": "Termination Procedures",
    "href": "/legal/forms/termination-procedures",
    icon: FaDoorOpen
  }
]

export default function ContractorNetworkDocumentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Contractor/Network Documents
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive contractor relationship and network management agreements
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
}