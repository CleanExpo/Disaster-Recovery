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
  const [selectedTab, setSelectedTab] = useState<'queue' | 'reviews' | 'analytics'>('queue');'
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'urgent' | 'high' | 'medium' | 'low'>('all');'
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'in_review' | 'resolved'>('all');'
  const [searchTerm, setSearchTerm] = useState('');'
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionNote, setActionNote] = useState('');'

  const mockModerationQueue: (ModerationQueue & { 
    feedback: CustomerFeedback;
    contractor: { name: string; email: string; 
  })[] = [
    {
      id: '1','
      feedbackId: 'feedback-1','
      contractorId: 'contractor-1','
      priority: 'urgent','
      reason: 'low_rating','
      status: 'pending','
      createdDate: new Date('2024-03-15'),'
      escalationLevel: 2,
      autoFlagged: true,
      customerNotified: false,
      feedback: {
        id: 'feedback-1','
        jobId: 'JOB-2024-001','
        contractorId: 'contractor-1','
        customerId: 'cust-1','
        customerName: 'John Smith','
        customerEmail: 'john.smith@email.com','
        customeremail: 'Contact Form','
        jobType: 'water_damage','
        completedDate: new Date('2024-03-10'),'
        submittedDate: new Date('2024-03-15'),'
        rating: {
          overall: 2,
          quality: 2,
          timeliness: 1,
          communication: 3,
          professionalism: 2,
          value: 2
        },
        comments: {
          negative: 'Service was delayed by 3 days without proper notice. Work quality was poor and had to be redone. Very disappointed with the experience.','
          general: 'Expected much better service for the price paid.'
        },
        status: 'reviewed','
        flagged: true,
        flagReason: 'Low rating and negative feedback about service quality','
        publishedAsTestimonial: false,
        googleReviewSubmitted: false,
        npsScore: 3,
        tags: ['delayed', 'poor_quality', 'communication_issues'],'
        metadata: {
          source: 'email','
          device: 'mobile'
        }
      },
      contractor: {
        name: 'AquaTech Water Restoration','
        email: 'info@aquatech.com.au','
        
      }
    },
    {
      id: '2', ''
      feedbackId: 'feedback-2','
      contractorId: 'contractor-2','
      priority: 'high','
      reason: 'complaint','
      status: 'in_review','
      assignedTo: 'admin@nrp.com.au','
      createdDate: new Date('2024-03-12'),'
      reviewedDate: new Date('2024-03-13'),'
      escalationLevel: 1,
      autoFlagged: false,
      customerNotified: true,
      feedback: {
        id: 'feedback-2','
        jobId: 'JOB-2024-002','
        contractorId: 'contractor-2','
        customerId: 'cust-2','
        customerName: 'Sarah Johnson','
        customerEmail: 'sarah.j@email.com','
        jobType: 'fire_damage','
        completedDate: new Date('2024-03-08'),'
        submittedDate: new Date('2024-03-12'),'
        rating: {
          overall: 3,
          quality: 4,
          timeliness: 2,
          communication: 3,
          professionalism: 3,
          value: 3
        },
        comments: {
          negative: 'Team was late and didn\'t communicate well about delays. However, the actual restoration work was good quality.','
          suggestions: 'Better communication about scheduling would help a lot.'
        },
        status: 'reviewed','
        flagged: true,
        flagReason: 'Customer complaint about communication and timeliness','
        publishedAsTestimonial: false,
        googleReviewSubmitted: false,
        npsScore: 6,
        tags: ['communication', 'scheduling'],'
        metadata: {
          source: 'portal'
        }
      },
      contractor: {
        name: 'FireRescue Pro Services','
        email: 'contact@firerescuepro.com.au','
        
      }
    },
    {
      id: '3','
      feedbackId: 'feedback-3', ''
      contractorId: 'contractor-1','
      priority: 'medium','
      reason: 'negative_keywords','
      status: 'pending','
      createdDate: new Date('2024-03-10'),'
      escalationLevel: 0,
      autoFlagged: true,
      customerNotified: false,
      feedback: {
        id: 'feedback-3','
        jobId: 'JOB-2024-003','
        contractorId: 'contractor-1','
        customerId: 'cust-3','
        customerName: 'Michael Chen','
        customerEmail: 'michael.c@email.com','
        jobType: 'mold_remediation','
        completedDate: new Date('2024-03-05'),'
        submittedDate: new Date('2024-03-10'),'
        rating: {
          overall: 4,
          quality: 4,
          timeliness: 4,
          communication: 3,
          professionalism: 4,
          value: 4
        },
        comments: {
          positive: 'Good work overall, team was professional and thorough.','
          negative: 'Initial quote was a bit expensive compared to others, but worth it for the quality.'
        },
        status: 'submitted','
        flagged: true,
        flagReason: 'Contains keyword: expensive','
        publishedAsTestimonial: false,
        googleReviewSubmitted: false,
        npsScore: 8,
        tags: ['pricing', 'quality'],'
        metadata: {
          source: 'portal'
        }
      },
      contractor: {
        name: 'AquaTech Water Restoration','
        email: 'info@aquatech.com.au','
        
      }
    }
  ];

  const mockActions: ModerationAction[] = [
    {
      id: '1','
      moderationId: '1','
      actionType: 'contacted_customer','
      performedBy: 'admin@nrp.com.au','
      performedDate: new Date('2024-03-15'),'
      description: 'Called customer to discuss concerns and arrange follow-up with contractor','
      followUpRequired: true,
      followUpDate: new Date('2024-03-20')'
    },
    {
      id: '2','
      moderationId: '2','
      actionType: 'contacted_contractor','
      performedBy: 'admin@nrp.com.au','
      performedDate: new Date('2024-03-13'),'
      description: 'Notified contractor about communication concerns and requested action plan','
      followUpRequired: true,
      followUpDate: new Date('2024-03-18')'
    }
  ];

  const priorityColors = {
    urgent: 'bg-red-100 text-red-800 border-red-200','
    high: 'bg-orange-100 text-orange-800 border-orange-200','
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200','
    low: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800','
    in_review: 'bg-blue-100 text-blue-800','
    resolved: 'bg-green-100 text-green-800','
    escalated: 'bg-red-100 text-red-800'
  };

  const reasonLabels = {
    low_rating: 'Low Rating','
    negative_keywords: 'Negative Keywords','
    complaint: 'Customer Complaint','
    inappropriate_content: 'Inappropriate Content','
    spam_suspected: 'Suspected Spam','
    escalation_request: 'Escalation Request','
    legal_concern: 'Legal Concern','
    manual_review: 'Manual Review'
  };

  const filteredQueue = mockModerationQueue.filter(item => {
    if (selectedPriority !== 'all' && item.priority !== selectedPriority) return false;'
    if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;'
    if (searchTerm && !item.feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.contractor.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const ModerationSummary = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">"
      <div className="bg-white rounded-lg border border-gray-200 p-6">"
        <div className="flex items-center justify-between">"
          <div>
            <p className="text-sm text-gray-600">Pending Review</p>"
            <p className="text-3xl font-bold text-red-600">"
              {mockModerationQueue.filter(q => q.status === 'pending').length}'
            </p>
          </div>
          <div className="p-3 bg-red-100 rounded-lg">"
            <AlertTriangle className="w-6 h-6 text-red-600" />"
          </div>
        </div>
        <div className="mt-2 text-sm text-red-600">"
          {mockModerationQueue.filter(q => q.priority === 'urgent').length} urgent'
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">"
        <div className="flex items-center justify-between">"
          <div>
            <p className="text-sm text-gray-600">In Review</p>"
            <p className="text-3xl font-bold text-blue-600">"
              {mockModerationQueue.filter(q => q.status === 'in_review').length}'
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">"
            <Eye className="w-6 h-6 text-blue-600" />"
          </div>
        </div>
        <div className="mt-2 text-sm text-blue-600">"
          {mockModerationQueue.filter(q => q.assignedTo).length} assigned
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">"
        <div className="flex items-center justify-between">"
          <div>
            <p className="text-sm text-gray-600">Resolved Today</p>"
            <p className="text-3xl font-bold text-green-600">8</p>"
          </div>
          <div className="p-3 bg-green-100 rounded-lg">"
            <CheckCircle className="w-6 h-6 text-green-600" />"
          </div>
        </div>
        <div className="mt-2 text-sm text-green-600">"
          ↑ 12% vs yesterday
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">"
        <div className="flex items-center justify-between">"
          <div>
            <p className="text-sm text-gray-600">Avg Response Time</p>"
            <p className="text-3xl font-bold text-purple-600">2.4h</p>"
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">"
            <Clock className="w-6 h-6 text-purple-600" />"
          </div>
        </div>
        <div className="mt-2 text-sm text-purple-600">"
          ↓ 15% improvement
        </div>
      </div>
    </div>
  );

  const ModerationQueueTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">"
      <div className="p-6 border-b border-gray-200">"
        <div className="flex justify-between items-center mb-4">"
          <h3 className="text-lg font-semibold text-gray-900">Moderation Queue</h3>"
          <div className="flex space-x-3">"
            <div className="relative">"
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />"
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
              <option value="all">All Priorities</option>"
              <option value="urgent">Urgent</option>"
              <option value="high">High</option>"
              <option value="medium">Medium</option>"
              <option value="low">Low</option>"
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>"
              <option value="pending">Pending</option>"
              <option value="in_review">In Review</option>"
              <option value="resolved">Resolved</option>"
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">"
        <table className="w-full">"
          <thead className="bg-gray-50">"
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">"
                Customer & Issue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">"
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">"
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">"
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">"
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">"
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">"
            {filteredQueue.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">"
                <td className="px-6 py-4">"
                  <div className="flex items-start space-x-3">"
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">"
                      <User className="w-4 h-4 text-gray-600" />"
                    </div>
                    <div className="min-w-0 flex-1">"
                      <p className="text-sm font-medium text-gray-900 truncate">"
                        {item.feedback.customerName}
                      </p>
                      <p className="text-sm text-gray-500 truncate">"
                        {item.contractor.name}
                      </p>
                      <p className="text-xs text-gray-400">"
                        {reasonLabels[item.reason]}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">"
                  <div className="flex items-center">"
                    <Star className={`w-4 h-4 mr-1 ${
                      item.feedback.rating.overall >= 3 ? 'text-yellow-400' : 'text-red-400'
                    } fill-current`} />
                    <span className="text-sm font-medium">"
                      {item.feedback.rating.overall}/5
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">"
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors[item.priority]}`}>
                    {item.priority.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">"
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                    {item.status.replace('_', ' ').toUpperCase()}'
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">"
                  {item.createdDate.toLocaleDateString('en-AU')}'
                </td>
                <td className="px-6 py-4">"
                  <div className="flex space-x-2">"
                    <button
                      onClick={() => setSelectedItem(item.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="w-4 h-4" />"
                    </button>
                    <button
                      onClick={() => setShowActionModal(true)}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      <Send className="w-4 h-4" />"
                    </button>
                    <button className="text-gray-600 hover:text-gray-700">"
                      <MoreHorizontal className="w-4 h-4" />"
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const FeedbackDetail = ({ itemId }: { itemId: string }) => {
    const item = mockModerationQueue.find(q => q.id === itemId);
    if (!item) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">"
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">"
          <div className="p-6 border-b border-gray-200">"
            <div className="flex justify-between items-start">"
              <div>
                <h2 className="text-xl font-bold text-gray-900">Moderation Review</h2>"
                <p className="text-gray-600">Customer: {item.feedback.customerName}</p>"
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />"
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">"
            {/* Feedback Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">"
              <div className="space-y-4">"
                <h3 className="font-semibold text-gray-900">Customer Information</h3>"
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">"
                  <div className="flex items-center">"
                    <User className="w-4 h-4 text-gray-500 mr-2" />"
                    <span className="text-sm">{item.feedback.customerName}</span>"
                  </div>
                  <div className="flex items-center">"
                    <Mail className="w-4 h-4 text-gray-500 mr-2" />"
                    <span className="text-sm">{item.feedback.customerEmail}</span>"
                  </div>
                  {item.feedback.customerPhone && (
                    <div className="flex items-center">"
                      <MessageSquare className="w-4 h-4 text-gray-500 mr-2" />"
                      <span className="text-sm">{item.feedback.customerPhone}</span>"
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">"
                <h3 className="font-semibold text-gray-900">Job Details</h3>"
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">"
                  <div className="text-sm">"
                    <span className="font-medium">Job ID:</span> {item.feedback.jobId}"
                  </div>
                  <div className="text-sm">"
                    <span className="font-medium">Type:</span> {item.feedback.jobType}"
                  </div>
                  <div className="text-sm">"
                    <span className="font-medium">Completed:</span> {item.feedback.completedDate.toLocaleDateString('en-AU')}'
                  </div>
                  <div className="text-sm">"
                    <span className="font-medium">Contractor:</span> {item.contractor.name}"
                  </div>
                </div>
              </div>
            </div>

            {/* Ratings */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Customer Ratings</h3>"
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">"
                {Object.entries(item.feedback.rating).map(([category, rating]) => (
                  <div key={category} className="text-center">"
                    <p className="text-sm text-gray-600 capitalize">{category}</p>"
                    <div className="flex items-center justify-center mt-1">"
                      <Star className={`w-5 h-5 ${rating >= 3 ? 'text-yellow-400' : 'text-red-400'} fill-current`} />'
                      <span className="ml-1 font-medium">{rating}/5</span>"
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Customer Comments</h3>"
              <div className="space-y-4">"
                {item.feedback.comments.positive && (
                  <div className="p-4 bg-green-50 rounded-lg">"
                    <h4 className="font-medium text-green-900 mb-2">Positive Feedback</h4>"
                    <p className="text-sm text-green-700">{item.feedback.comments.positive}</p>"
                  </div>
                )}
                {item.feedback.comments.negative && (
                  <div className="p-4 bg-red-50 rounded-lg">"
                    <h4 className="font-medium text-red-900 mb-2">Areas for Improvement</h4>"
                    <p className="text-sm text-red-700">{item.feedback.comments.negative}</p>"
                  </div>
                )}
                {item.feedback.comments.suggestions && (
                  <div className="p-4 bg-blue-50 rounded-lg">"
                    <h4 className="font-medium text-blue-900 mb-2">Suggestions</h4>"
                    <p className="text-sm text-blue-700">{item.feedback.comments.suggestions}</p>"
                  </div>
                )}
              </div>
            </div>

            {/* Moderation Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Moderation Details</h3>"
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">"
                <div className="flex items-start">"
                  <Flag className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />"
                  <div className="flex-1">"
                    <p className="font-medium text-yellow-900">Flagged: {reasonLabels[item.reason]}</p>"
                    <p className="text-sm text-yellow-700 mt-1">{item.feedback.flagReason}</p>"
                    <div className="mt-2 flex items-center space-x-4 text-sm text-yellow-700">"
                      <span>Priority: {item.priority.toUpperCase()}</span>
                      <span>Auto-flagged: {item.autoFlagged ? 'Yes' : 'No'}</span>'
                      <span>Escalation Level: {item.escalationLevel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-gray-200">"
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colours">"
                Approve & Publish
              </button>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colours">"
                Approve (No Publish)
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colours">"
                Reject
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours">"
                Contact Customer
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colours">"
                Escalate
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">"
      <div className="mb-8">"
        <h1 className="text-3xl font-bold text-gray-900">Review Moderation Dashboard</h1>"
        <p className="text-gray-600 mt-2">"
          Monitor and moderate customer feedback to maintain quality standards
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">"
        <div className="border-b border-gray-200">"
          <nav className="-mb-px flex space-x-8">"
            {[
              { key: 'queue', label: 'Moderation Queue', icon: <Flag className="w-4 h-4" /> },"
              { key: 'reviews', label: 'All Reviews', icon: <Star className="w-4 h-4" /> },"
              { key: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> }"
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as typeof selectedTab)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colours ${
                  selectedTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>"
              </button>
            ))}
          </nav>
        </div>
      </div>

      {selectedTab === 'queue' && ('
        <>
          <ModerationSummary />
          <ModerationQueueTable />
          {selectedItem && <FeedbackDetail itemId={selectedItem} />}
        </>
      )}

      {selectedTab === 'reviews' && ('
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">"
          <p className="text-gray-600">All reviews component would go here</p>"
        </div>
      )}

      {selectedTab === 'analytics' && ('
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">"
          <p className="text-gray-600">Analytics component would go here</p>"
        </div>
      )}
    </div>
  );
}