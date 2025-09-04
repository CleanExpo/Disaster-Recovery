'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Shield,
  Download,
  Calendar,
  DollarSign,
  Home
} from 'lucide-react'
import Link from 'next/link'

export default function ClientPortalPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const claims = [
    {
      id: 'CLM-2024-001',
      property: '123 Main St, Brisbane',
      type: 'Water Damage',
      status: 'in-progress',
      progress: 65,
      submitted: '2024-01-15',
      estimatedCompletion: '2024-02-01',
      value: '$45,000'
    },
    {
      id: 'CLM-2024-002',
      property: '456 Queen St, Sydney',
      type: 'Fire Damage',
      status: 'assessment',
      progress: 25,
      submitted: '2024-01-20',
      estimatedCompletion: '2024-02-15',
      value: '$120,000'
    }
  ]

  const stats = [
    { label: 'Active Claims', value: '2', icon: FileText, color: 'text-blue-600' },
    { label: 'Total Recovery Value', value: '$165,000', icon: DollarSign, color: 'text-green-600' },
    { label: 'Avg. Response Time', value: '47 min', icon: Clock, color: 'text-purple-600' },
    { label: 'Properties Protected', value: '3', icon: Home, color: 'text-indigo-600' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-4">Client Portal</h1>
            <p className="text-xl text-blue-100">
              Track your recovery progress and manage all claims in one place
            </p>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'claims', label: 'Claims', icon: FileText },
              { id: 'documents', label: 'Documents', icon: Download },
              { id: 'messages', label: 'Messages', icon: MessageSquare }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Active Claims */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Active Claims</h2>
                <div className="space-y-6">
                  {claims.map(claim => (
                    <div key={claim.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{claim.id}</h3>
                          <p className="text-gray-600">{claim.property}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-gray-500">Type: {claim.type}</span>
                            <span className="text-sm text-gray-500">Value: {claim.value}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          claim.status === 'in-progress' 
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {claim.status === 'in-progress' ? 'In Progress' : 'Assessment'}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{claim.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${claim.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Submitted: {claim.submitted}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>Est. Completion: {claim.estimatedCompletion}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-3">
                        <Link 
                          href={`/client-portal/claims/${claim.id}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          Download Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link 
                    href="/client-portal/new-claim"
                    className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Submit New Claim</div>
                      <div className="text-sm text-gray-600">Start recovery process</div>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/client-portal/schedule"
                    className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
                  >
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Schedule Assessment</div>
                      <div className="text-sm text-gray-600">Book inspection time</div>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/client-portal/support"
                    className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
                  >
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Get Support</div>
                      <div className="text-sm text-gray-600">Chat with our team</div>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'claims' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">All Claims</h2>
              <p className="text-gray-600">View and manage all your insurance claims.</p>
              {/* Add detailed claims management here */}
            </motion.div>
          )}

          {activeTab === 'documents' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Documents</h2>
              <p className="text-gray-600">Access all your reports, invoices, and documentation.</p>
              {/* Add document management here */}
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Messages</h2>
              <p className="text-gray-600">Communicate with your recovery team.</p>
              {/* Add messaging interface here */}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}