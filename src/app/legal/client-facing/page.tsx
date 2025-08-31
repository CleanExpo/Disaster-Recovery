'use client'

import Link from 'next/link'
import { FaHandshake, FaAmbulance, FaKey, FaExclamationTriangle, FaMedal, FaBalanceScale, FaFileInvoice } from 'react-icons/fa'

const documents = [
  {
    "title": "Service Level Agreements",
    "href": "/legal/forms/service-level-agreements",
    icon: FaHandshake
  },
  {
    "title": "Emergency Response",
    "href": "/legal/forms/emergency-response",
    icon: FaAmbulance
  },
  {
    "title": "Property Access",
    "href": "/legal/forms/property-access",
    icon: FaKey
  },
  {
    "title": "Liability Limitation",
    "href": "/legal/forms/liability-limitation",
    icon: FaExclamationTriangle
  },
  {
    "title": "Warranty & Guarantee",
    "href": "/legal/forms/warranty-guarantee",
    icon: FaMedal
  },
  {
    "title": "Dispute Resolution",
    "href": "/legal/forms/dispute-resolution",
    icon: FaBalanceScale
  },
  {
    "title": "Insurance Claims Assistance",
    "href": "/legal/forms/insurance-claims-assistance",
    icon: FaFileInvoice
  }
]

export default function ClientFacingDocumentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Client-Facing Documents
          </h1>
          <p className="text-xl text-gray-600">
            Customer service agreements and client protection frameworks
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