'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Briefcase, 
  DollarSign, 
  MapPin, 
  Star,
  TrendingUp,
  Award,
  Calendar,
  Users,
  FileText,
  Bell,
  Settings,
  ChevronRight,
  Clock,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default function ContractorPortalPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const jobs = [
    {
      id: 'JOB-2024-101',
      type: 'Water Damage Restoration',
      location: 'Brisbane CBD',
      distance: '5.2 km',
      value: '$8,500',
      urgency: 'immediate',
      status: 'new'
    },
    {
      id: 'JOB-2024-102',
      type: 'Fire Damage Assessment',
      location: 'South Brisbane',
      distance: '8.7 km',
      value: '$12,000',
      urgency: 'urgent',
      status: 'new'
    },
    {
      id: 'JOB-2024-103',
      type: 'Mould Remediation',
      location: 'West End',
      distance: '3.1 km',
      value: '$4,200',
      urgency: 'standard',
      status: 'in-progress'
    }
  ]

  const earnings = {
    thisWeek: '$12,450',
    thisMonth: '$47,830',
    pending: '$8,500',
    nextPayout: '2024-02-01'
  }

  const stats = [
    { label: 'Jobs Completed', value: '147', change: '+12%', icon: Briefcase },
    { label: 'Average Rating', value: '4.9', change: '+0.2', icon: Star },
    { label: 'Response Time', value: '32min', change: '-5min', icon: Clock },
    { label: 'Completion Rate', value: '98%', change: '+2%', icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-4">Contractor Portal</h1>
                <p className="text-xl text-indigo-100">
                  Manage jobs, track earnings, and grow your business
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-indigo-200">Territory</div>
                <div className="text-2xl font-bold">Brisbane Metro</div>
                <div className="mt-2">
                  <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'jobs', label: 'Job Board', icon: Briefcase },
              { id: 'earnings', label: 'Earnings', icon: DollarSign },
              { id: 'training', label: 'Training', icon: Award },
              { id: 'resources', label: 'Resources', icon: FileText }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
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
          {activeTab === 'dashboard' && (
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
                      <stat.icon className="h-8 w-8 text-indigo-600" />
                      <span className={`text-sm font-medium ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Available Jobs */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Available Jobs Near You</h2>
                  <Link 
                    href="/contractor-portal/jobs"
                    className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                  >
                    View All <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {jobs.map(job => (
                    <div key={job.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{job.type}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </span>
                            <span>{job.distance}</span>
                            <span className="font-semibold text-gray-900">{job.value}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            job.urgency === 'immediate' 
                              ? 'bg-red-100 text-red-700'
                              : job.urgency === 'urgent'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {job.urgency === 'immediate' ? 'Immediate' : 
                             job.urgency === 'urgent' ? 'Urgent' : 'Standard'}
                          </span>
                          {job.status === 'new' && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                          Accept Job
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Earnings Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Earnings Overview</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600">This Week</span>
                      <span className="text-2xl font-bold text-green-600">{earnings.thisWeek}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600">This Month</span>
                      <span className="text-2xl font-bold text-gray-900">{earnings.thisMonth}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600">Pending Payment</span>
                      <span className="text-xl font-semibold text-yellow-600">{earnings.pending}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600">Next Payout</span>
                      <span className="text-gray-900">{earnings.nextPayout}</span>
                    </div>
                  </div>
                  <Link 
                    href="/contractor-portal/earnings"
                    className="mt-6 w-full block text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    View Detailed Earnings
                  </Link>
                </div>

                {/* Performance */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Your Performance</h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Customer Satisfaction</span>
                        <span className="text-sm font-semibold">98%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">On-Time Completion</span>
                        <span className="text-sm font-semibold">95%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Response Rate</span>
                        <span className="text-sm font-semibold">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '92%' }} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-900">Top Performer</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      You're in the top 10% of contractors this month!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'jobs' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Job Board</h2>
              <p className="text-gray-600">Browse and accept available jobs in your area.</p>
              {/* Add detailed job board here */}
            </motion.div>
          )}

          {activeTab === 'earnings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Earnings & Payments</h2>
              <p className="text-gray-600">Track your income and payment history.</p>
              {/* Add earnings management here */}
            </motion.div>
          )}

          {activeTab === 'training' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Training & Certification</h2>
              <p className="text-gray-600">Access courses to improve your skills and earn certifications.</p>
              {/* Add training content here */}
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Resources & Tools</h2>
              <p className="text-gray-600">Access documentation, tools, and support materials.</p>
              {/* Add resources here */}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}