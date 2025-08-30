'use client';

import React, { useState, useEffect } from 'react';
import {
  Star,
  ExternalLink,
  Share2,
  MessageSquare,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Globe,
  Mail,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Copy,
  QrCode,
  Smartphone,
  Eye,
  ThumbsUp,
  Award,
  Target,
  BarChart3,
  Zap,
  Gift
} from 'lucide-react';
import type { GoogleBusinessProfile, GoogleReview, ReviewInvitation } from '@/types/customer-feedback';

interface GoogleReviewIntegrationProps {
  contractorId: string;
  jobId?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerName?: string;
  mode?: 'management' | 'invitation' | 'display';
}

export default function GoogleReviewIntegration({
  contractorId,
  jobId,
  customerEmail,
  customerPhone,
  customerName,
  mode = 'management'
}: GoogleReviewIntegrationProps) {
  const [businessProfile, setBusinessProfile] = useState<GoogleBusinessProfile | null>(null);
  const [recentReviews, setRecentReviews] = useState<GoogleReview[]>([]);
  const [invitations, setInvitations] = useState<ReviewInvitation[]>([]);
  const [selectedInvitation, setSelectedInvitation] = useState<string | null>(null);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteMessage, setInviteMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const mockBusinessProfile: GoogleBusinessProfile = {
    id: 'gbp-1',
    contractorId,
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    businessName: 'AquaTech Water Damage Restoration',
    address: '123 Industrial Drive, Sydney NSW 2000',
    phone: '+61 2 9555 0123',
    website: 'https://www.aquatech.com.au',
    reviewsUrl: 'https://g.page/aquatech-restoration/review?rc',
    averageRating: 4.6,
    totalReviews: 127,
    lastSyncDate: new Date('2024-03-15T10:30:00'),
    isVerified: true,
    status: 'active'
  };

  const mockReviews: GoogleReview[] = [
    {
      id: '1',
      reviewId: 'google-review-1',
      contractorId,
      customerName: 'Sarah M.',
      rating: 5,
      text: 'Excellent service! The team was professional, quick, and thorough. They restored our water-damaged basement perfectly. Highly recommend AquaTech for any restoration work.',
      publishedDate: new Date('2024-03-10'),
      language: 'en',
      response: {
        text: 'Thank you Sarah! We\'re delighted to have helped restore your basement. Our team takes pride in delivering professional service and quality results.',
        publishedDate: new Date('2024-03-11')
      },
      imported: true,
      matchedFeedbackId: 'feedback-1'
    },
    {
      id: '2',
      reviewId: 'google-review-2',
      contractorId,
      customerName: 'Michael K.',
      rating: 4,
      text: 'Great response time and professional service. The water damage cleanup was handled efficiently. Only minor issue was scheduling, but overall very satisfied.',
      publishedDate: new Date('2024-03-05'),
      language: 'en',
      imported: true
    },
    {
      id: '3',
      reviewId: 'google-review-3',
      contractorId,
      customerName: 'Emma L.',
      rating: 5,
      text: 'Outstanding work! They turned our flood-damaged office back to perfect condition. The team was courteous, professional, and went above and beyond.',
      publishedDate: new Date('2024-02-28'),
      language: 'en',
      response: {
        text: 'Emma, thank you for the wonderful review! We\'re thrilled we could help restore your office quickly and professionally.',
        publishedDate: new Date('2024-03-01')
      },
      imported: true
    }
  ];

  const mockInvitations: ReviewInvitation[] = [
    {
      id: '1',
      jobId: 'JOB-2024-001',
      contractorId,
      customerId: 'cust-1',
      customerEmail: 'sarah.johnson@email.com',
      customerPhone: '+61 412 345 678',
      type: 'google',
      status: 'completed',
      sentDate: new Date('2024-03-10'),
      reminderCount: 1,
      clickedDate: new Date('2024-03-10'),
      completedDate: new Date('2024-03-10'),
      expiryDate: new Date('2024-04-10'),
      trackingToken: 'inv-token-1',
      googleReviewLink: mockBusinessProfile.reviewsUrl
    },
    {
      id: '2',
      jobId: 'JOB-2024-002', 
      contractorId,
      customerId: 'cust-2',
      customerEmail: 'michael.chen@email.com',
      type: 'google',
      status: 'clicked',
      sentDate: new Date('2024-03-05'),
      reminderCount: 0,
      clickedDate: new Date('2024-03-06'),
      expiryDate: new Date('2024-04-05'),
      trackingToken: 'inv-token-2',
      googleReviewLink: mockBusinessProfile.reviewsUrl
    }
  ];

  useEffect(() => {
    setBusinessProfile(mockBusinessProfile);
    setRecentReviews(mockReviews);
    setInvitations(mockInvitations);
  }, [contractorId]);

  const generateReviewLink = (customData?: any) => {
    const baseUrl = businessProfile?.reviewsUrl || '';
    if (!customData) return baseUrl;
    
    // In a real implementation, this would include custom tracking parameters
    return `${baseUrl}&utm_source=nrp&utm_medium=email&utm_campaign=review_request`;
  };

  const handleSendInvitation = async () => {
    if (!customerEmail || !businessProfile) return;
    
    setLoading(true);
    try {
      const newInvitation: ReviewInvitation = {
        id: `inv-${Date.now()}`,
        jobId: jobId || '',
        contractorId,
        customerId: 'temp-id',
        customerEmail,
        customerPhone,
        type: 'google',
        status: 'sent',
        sentDate: new Date(),
        reminderCount: 0,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        customMessage: inviteMessage,
        trackingToken: `token-${Date.now()}`,
        googleReviewLink: generateReviewLink({ customerName, jobId })
      };
      
      setInvitations(prev => [newInvitation, ...prev]);
      setShowInviteForm(false);
      setInviteMessage('');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: ReviewInvitation['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'clicked': return 'text-blue-600 bg-blue-50';
      case 'sent': return 'text-yellow-600 bg-yellow-50';
      case 'expired': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const BusinessProfileCard = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-centre space-x-3">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-centre justify-centre">
            <Globe className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{businessProfile?.businessName}</h3>
            <p className="text-sm text-gray-500">Google Business Profile</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-centre text-yellow-500">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-semibold text-gray-900 ml-1">
              {businessProfile?.averageRating}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {businessProfile?.totalReviews} reviews
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-centre">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{businessProfile?.address}</span>
        </div>
        <div className="flex items-centre">
          <Phone className="w-4 h-4 mr-2" />
          <span>{businessProfile?.phone}</span>
        </div>
        <div className="flex items-centre">
          <Globe className="w-4 h-4 mr-2" />
          <a href={businessProfile?.website} className="text-blue-600 hover:text-blue-700">
            Visit Website
          </a>
        </div>
        <div className="flex items-centre">
          <Clock className="w-4 h-4 mr-2" />
          <span>
            Last sync: {businessProfile?.lastSyncDate.toLocaleDateString('en-AU')}
          </span>
        </div>
      </div>

      <div className="flex space-x-3">
        <a
          href={businessProfile?.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-centre hover:bg-blue-700 transition-colours flex items-centre justify-centre"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Google
        </a>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colours">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const ReviewStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-centre justify-between">
          <div>
            <p className="text-sm text-gray-600">Average Rating</p>
            <p className="text-2xl font-bold text-gray-900">
              {businessProfile?.averageRating}
            </p>
          </div>
          <Star className="w-8 h-8 text-yellow-500" />
        </div>
        <p className="text-xs text-green-600 mt-1">↑ 0.2 from last month</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-centre justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Reviews</p>
            <p className="text-2xl font-bold text-gray-900">
              {businessProfile?.totalReviews}
            </p>
          </div>
          <MessageSquare className="w-8 h-8 text-blue-500" />
        </div>
        <p className="text-xs text-green-600 mt-1">↑ 8 new this month</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-centre justify-between">
          <div>
            <p className="text-sm text-gray-600">Response Rate</p>
            <p className="text-2xl font-bold text-gray-900">92%</p>
          </div>
          <ThumbsUp className="w-8 h-8 text-green-500" />
        </div>
        <p className="text-xs text-gray-500 mt-1">Above average</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-centre justify-between">
          <div>
            <p className="text-sm text-gray-600">Invitations Sent</p>
            <p className="text-2xl font-bold text-gray-900">
              {invitations.length}
            </p>
          </div>
          <Send className="w-8 h-8 text-purple-500" />
        </div>
        <p className="text-xs text-blue-600 mt-1">
          {invitations.filter(i => i.status === 'completed').length} completed
        </p>
      </div>
    </div>
  );

  const ReviewInvitationForm = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-centre justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Send Review Invitation</h3>
        <button
          onClick={() => setShowInviteForm(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Email
          </label>
          <input
            type="email"
            value={customerEmail || ''}
            readOnly={!!customerEmail}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="customer@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Message (Optional)
          </label>
          <textarea
            value={inviteMessage}
            onChange={(e) => setInviteMessage(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Add a personal message to encourage the review..."
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Review Link Preview</h4>
          <div className="text-sm text-blue-700 break-all">
            {generateReviewLink({ customerName, jobId })}
          </div>
          <div className="mt-2 flex space-x-2">
            <button className="text-xs text-blue-600 hover:text-blue-700 flex items-centre">
              <Copy className="w-3 h-3 mr-1" />
              Copy Link
            </button>
            <button className="text-xs text-blue-600 hover:text-blue-700 flex items-centre">
              <QrCode className="w-3 h-3 mr-1" />
              Generate QR
            </button>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleSendInvitation}
            disabled={loading || !customerEmail}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colours flex items-centre justify-centre"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Invitation
              </>
            )}
          </button>
          <button
            onClick={() => setShowInviteForm(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colours"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const RecentReviews = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-centre justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Google Reviews</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 flex items-centre">
          <Eye className="w-4 h-4 mr-1" />
          View All
        </button>
      </div>

      <div className="space-y-4">
        {recentReviews.map(review => (
          <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-centre space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-centre justify-centre">
                  <span className="text-sm font-medium text-gray-600">
                    {review.customerName[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{review.customerName}</p>
                  <div className="flex items-centre space-x-2">
                    <div className="flex items-centre">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {review.publishedDate.toLocaleDateString('en-AU')}
                    </span>
                  </div>
                </div>
              </div>
              {review.matchedFeedbackId && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Matched
                </span>
              )}
            </div>

            <p className="text-gray-700 text-sm mb-3">{review.text}</p>

            {review.response ? (
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm font-medium text-blue-900 mb-1">Your Response:</p>
                <p className="text-sm text-blue-700">{review.response.text}</p>
                <p className="text-xs text-blue-600 mt-1">
                  {review.response.publishedDate.toLocaleDateString('en-AU')}
                </p>
              </div>
            ) : (
              <button className="text-sm text-blue-600 hover:text-blue-700 flex items-centre">
                <MessageSquare className="w-4 h-4 mr-1" />
                Respond to Review
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const InvitationTracking = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-centre justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Review Invitations</h3>
        <button
          onClick={() => setShowInviteForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours flex items-centre"
        >
          <Send className="w-4 h-4 mr-2" />
          Send Invitation
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 text-sm font-medium text-gray-600">Customer</th>
              <th className="text-left py-2 text-sm font-medium text-gray-600">Sent</th>
              <th className="text-left py-2 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-2 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invitations.map(invitation => (
              <tr key={invitation.id} className="border-b border-gray-100">
                <td className="py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {invitation.customerEmail}
                    </p>
                    <p className="text-xs text-gray-500">Job: {invitation.jobId}</p>
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-600">
                  {invitation.sentDate.toLocaleDateString('en-AU')}
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(invitation.status)}`}>
                    {invitation.status}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    {invitation.status === 'sent' && (
                      <button className="text-gray-400 hover:text-green-600">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (mode === 'invitation' && showInviteForm) {
    return <ReviewInvitationForm />;
  }

  if (mode === 'display') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-centre">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-centre justify-centre mx-auto mb-4">
            <Star className="w-8 h-8 text-blue-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Love our service?
          </h2>
          <p className="text-gray-600 mb-6">
            Help others discover our quality work by leaving a Google review
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-centre justify-centre space-x-2 mb-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-900">
                {businessProfile?.averageRating}
              </span>
              <span className="text-gray-600">
                ({businessProfile?.totalReviews} reviews)
              </span>
            </div>
            <p className="text-sm text-gray-600">{businessProfile?.businessName}</p>
          </div>

          <a
            href={businessProfile?.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-centre px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colours"
          >
            <Star className="w-5 h-5 mr-2" />
            Write a Google Review
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Takes less than 2 minutes and helps our business grow
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Google Review Integration</h1>
        <p className="text-gray-600 mt-2">
          Manage your Google Business Profile and review invitations
        </p>
      </div>

      {showInviteForm && <ReviewInvitationForm />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <BusinessProfileCard />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <ReviewStats />
          <RecentReviews />
        </div>
      </div>

      <div className="mt-8">
        <InvitationTracking />
      </div>
    </div>
  );
}