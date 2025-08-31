'use client'

import { useState } from 'react'
import { FaHandshake, FaFileContract, FaUsers, FaBalanceScale } from 'react-icons/fa'

export default function PartnershipAgreements() {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Partnership & Joint Venture Agreements
        </h1>
        <p className="text-lg text-gray-600">
          Comprehensive legal framework for business partnerships and joint ventures
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <FaHandshake className="text-3xl text-blue-600 mb-2" />
          <h3 className="font-semibold">Partnership Structure</h3>
          <p className="text-sm text-gray-600">Define roles and responsibilities</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <FaFileContract className="text-3xl text-green-600 mb-2" />
          <h3 className="font-semibold">Legal Framework</h3>
          <p className="text-sm text-gray-600">Compliant with Australian law</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <FaUsers className="text-3xl text-purple-600 mb-2" />
          <h3 className="font-semibold">Profit Sharing</h3>
          <p className="text-sm text-gray-600">Clear distribution models</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <FaBalanceScale className="text-3xl text-orange-600 mb-2" />
          <h3 className="font-semibold">Dispute Resolution</h3>
          <p className="text-sm text-gray-600">Fair resolution procedures</p>
        </div>
      </div>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">Agreement Overview</h2>
        
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">1. Partnership Formation</h3>
          <p className="mb-4">
            This Partnership Agreement ("Agreement") is entered into as of the date last signed below,
            between National Restoration Platform Pty Ltd (ABN: 85 151 794 142) and the Partner entity.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Legal entity formation and registration</li>
            <li>Business name and trademark rights</li>
            <li>Principal place of business designation</li>
            <li>Partnership duration and renewal terms</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">2. Capital Contributions</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Initial capital requirements</li>
            <li>Additional contribution procedures</li>
            <li>Valuation of non-cash contributions</li>
            <li>Capital account maintenance</li>
            <li>Interest on capital contributions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">3. Profit and Loss Distribution</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Profit sharing ratios and calculations</li>
            <li>Loss allocation procedures</li>
            <li>Distribution timing and methods</li>
            <li>Reserve fund requirements</li>
            <li>Tax responsibility allocation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">4. Management and Decision Making</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Management structure and hierarchy</li>
            <li>Voting rights and procedures</li>
            <li>Major decision requirements</li>
            <li>Day-to-day operational authority</li>
            <li>Meeting schedules and procedures</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">5. Partner Obligations</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fiduciary duties to the partnership</li>
            <li>Non-compete and confidentiality obligations</li>
            <li>Time and effort commitments</li>
            <li>Compliance with laws and regulations</li>
            <li>Insurance and indemnification requirements</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">6. Transfer and Exit Provisions</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Transfer restrictions and procedures</li>
            <li>Right of first refusal provisions</li>
            <li>Buy-sell agreement terms</li>
            <li>Valuation methodology</li>
            <li>Death and disability provisions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">7. Dissolution and Winding Up</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Dissolution triggers and procedures</li>
            <li>Asset liquidation and distribution</li>
            <li>Debt and obligation settlement</li>
            <li>Final accounting and tax filings</li>
            <li>Post-dissolution obligations</li>
          </ul>
        </section>

        <div className="bg-gray-50 p-6 rounded-lg mt-8">
          <h3 className="text-lg font-semibold mb-3">Important Notice</h3>
          <p className="text-sm text-gray-600">
            This document is a template for partnership agreements. It should be reviewed and customized
            by qualified legal counsel to ensure compliance with current Australian partnership laws and
            regulations. Each partnership arrangement may require specific modifications based on the
            nature of the business and the parties involved.
          </p>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Document Version:</strong> 2.0<br />
            <strong>Last Updated:</strong> August 2025<br />
            <strong>Review Schedule:</strong> Annual<br />
            <strong>Compliance:</strong> Australian Partnership Act
          </p>
        </div>
      </div>
    </div>
  )
}