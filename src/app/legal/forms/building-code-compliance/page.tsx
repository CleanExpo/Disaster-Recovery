'use client'

import { useState } from 'react'
import { FaHardHat, FaFileContract, FaCheckCircle, FaInfoCircle } from 'react-icons/fa'

export default function BuildingCodeStandardsCompliancePage() {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Building Code & Standards Compliance
        </h1>
        <p className="text-lg text-gray-600">
          Building code and industry standards compliance
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <FaHardHat className="text-3xl text-blue-600 mb-2" />
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
            This document establishes the legal framework for building code and industry standards compliance.
            It is designed to comply with all relevant Australian laws and regulations while
            providing comprehensive protection for all parties involved.
          </p>
        </section>

        
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">1. Building Code Requirements</h3>
          <p className="mb-4">
            This section covers all aspects of building code requirements, including detailed
            provisions, requirements, and procedures applicable under Australian law.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comprehensive coverage of all relevant aspects</li>
            <li>Clear definitions and requirements</li>
            <li>Compliance with Australian regulations</li>
            <li>Best practice industry standards</li>
            <li>Regular review and update procedures</li>
          </ul>
        </section>
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">2. Australian Standards</h3>
          <p className="mb-4">
            This section covers all aspects of australian standards, including detailed
            provisions, requirements, and procedures applicable under Australian law.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comprehensive coverage of all relevant aspects</li>
            <li>Clear definitions and requirements</li>
            <li>Compliance with Australian regulations</li>
            <li>Best practice industry standards</li>
            <li>Regular review and update procedures</li>
          </ul>
        </section>
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">3. Certification Requirements</h3>
          <p className="mb-4">
            This section covers all aspects of certification requirements, including detailed
            provisions, requirements, and procedures applicable under Australian law.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comprehensive coverage of all relevant aspects</li>
            <li>Clear definitions and requirements</li>
            <li>Compliance with Australian regulations</li>
            <li>Best practice industry standards</li>
            <li>Regular review and update procedures</li>
          </ul>
        </section>
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">4. Inspection Procedures</h3>
          <p className="mb-4">
            This section covers all aspects of inspection procedures, including detailed
            provisions, requirements, and procedures applicable under Australian law.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comprehensive coverage of all relevant aspects</li>
            <li>Clear definitions and requirements</li>
            <li>Compliance with Australian regulations</li>
            <li>Best practice industry standards</li>
            <li>Regular review and update procedures</li>
          </ul>
        </section>
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">5. Documentation Standards</h3>
          <p className="mb-4">
            This section covers all aspects of documentation standards, including detailed
            provisions, requirements, and procedures applicable under Australian law.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comprehensive coverage of all relevant aspects</li>
            <li>Clear definitions and requirements</li>
            <li>Compliance with Australian regulations</li>
            <li>Best practice industry standards</li>
            <li>Regular review and update procedures</li>
          </ul>
        </section>
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">6. Non-Compliance Procedures</h3>
          <p className="mb-4">
            This section covers all aspects of non-compliance procedures, including detailed
            provisions, requirements, and procedures applicable under Australian law.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comprehensive coverage of all relevant aspects</li>
            <li>Clear definitions and requirements</li>
            <li>Compliance with Australian regulations</li>
            <li>Best practice industry standards</li>
            <li>Regular review and update procedures</li>
          </ul>
        </section>
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">7. Continuous Compliance</h3>
          <p className="mb-4">
            This section covers all aspects of continuous compliance, including detailed
            provisions, requirements, and procedures applicable under Australian law.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comprehensive coverage of all relevant aspects</li>
            <li>Clear definitions and requirements</li>
            <li>Compliance with Australian regulations</li>
            <li>Best practice industry standards</li>
            <li>Regular review and update procedures</li>
          </ul>
        </section>

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
}