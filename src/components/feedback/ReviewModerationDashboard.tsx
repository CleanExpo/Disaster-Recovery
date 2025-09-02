'use client';

import React, { useState } from 'react';
import {
  Flag,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  Star,
  MessageSquare,
  Eye,
  Send,
  Mail,
  MapPin,
  Filter,
  Search,
  ChevronDown,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Users,
  AlertCircle as Alert,
  Target,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';
import type { 
  CustomerFeedback, 
  ModerationQueue, 
  ModerationAction,
  ModerationReason,
  ActionType
} from '@/types/customer-feedback';

export default function ReviewModerationDashboard() {
  const [selectedTab, setSelectedTab] = useState<'queue' | 'reviews' | 'analytics'>('queue');
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'urgent' | 'high' | 'medium' | 'low'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'in_review' | 'resolved'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionNote, setActionNote] = useState('');

  const mockModerationQueue: (ModerationQueue & { 
    feedback: CustomerFeedback;
    contractor: { name: string; email: string; };
  })[] = [
    {
      id: '1',
      feedbackId: 'feedback-1',
      contractorId: 'contractor-1',
      priority: 'urgent',
      reason: 'low_rating',
      status: 'pending',
      createdDate: new Date('2024-03-15'),
      escalationLevel: 2,
      autoFlagged: true,
      customerNotified: false,
      feedback: {
        id: 'feedback-1',
        jobId: 'JOB-2024-001',
        contractorId: 'contractor-1',
        customerId: 'cust-1',
        customerName: 'John Smith',
        customerEmail: 'john.smith@email.com',
        customerPhone: '0400 000 000',
        jobType: 'water_damage',
        completedDate: new Date('2024-03-10'),
        submittedDate: new Date('2024-03-15'),
        rating: {
          overall: 2,
          quality: 2,
          timeliness: 1,
          communication: 3,
          professionalism: 2,
          value: 2
        },
        comments: {
          negative: 'Service was delayed by 3 days without proper notice. Work quality was poor and had to be redone. Very disappointed with the experience.',
          general: 'Expected much better service for the price paid.'
        },
        status: 'reviewed',
        flagged: true,
        flagReason: 'Low rating and negative feedback about service quality',
        publishedAsTestimonial: false,
        googleReviewSubmitted: false,
        npsScore: 3,
        tags: ['delayed', 'poor_quality', 'communication_issues'],
        metadata: {
          source: 'email',
          device: 'mobile'
        }
      },
      contractor: {
        name: 'AquaTech Water Restoration',
        email: 'info@aquatech.com.au'
      }
    }
  ];

  const priorityColors = {
    urgent: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    in_review: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    escalated: 'bg-red-100 text-red-800'
  };

  const reasonLabels = {
    low_rating: 'Low Rating',
    negative_keywords: 'Negative Keywords',
    complaint: 'Customer Complaint',
    inappropriate_content: 'Inappropriate Content',
    spam_suspected: 'Suspected Spam',
    escalation_request: 'Escalation Request',
    legal_concern: 'Legal Concern',
    manual_review: 'Manual Review'
  };

  const filteredQueue = mockModerationQueue.filter(item => {
    if (selectedPriority !== 'all' && item.priority !== selectedPriority) return false;
    if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;
    if (searchTerm && !item.feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.contractor.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Review Moderation Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Monitor and moderate customer feedback to maintain quality standards
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'queue', label: 'Moderation Queue', icon: <Flag className="w-4 h-4" /> },
              { key: 'reviews', label: 'All Reviews', icon: <Star className="w-4 h-4" /> },
              { key: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as typeof selectedTab)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {selectedTab === 'queue' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Moderation Queue</h3>
              <div className="flex space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value as typeof selectedPriority)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer & Issue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQueue.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.feedback.customerName}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {item.contractor.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {reasonLabels[item.reason]}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Star className={`w-4 h-4 mr-1 ${
                          item.feedback.rating.overall >= 3 ? 'text-blue-500' : 'text-red-400'
                        } fill-current`} />
                        <span className="text-sm font-medium">
                          {item.feedback.rating.overall}/5
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors[item.priority]}`}>
                        {item.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                        {item.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.createdDate.toLocaleDateString('en-AU')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedItem(item.id)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowActionModal(true)}
                          className="text-gray-600 hover:text-gray-700"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedTab === 'reviews' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600">All reviews component would go here</p>
        </div>
      )}

      {selectedTab === 'analytics' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600">Analytics component would go here</p>
        </div>
      )}
    </div>
  );
}