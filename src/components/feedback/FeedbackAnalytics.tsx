'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Star,
  Users,
  MessageSquare,
  Target,
  Award,
  Calendar,
  MapPin,
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  ThumbsUp,
  ThumbsDown,
  PieChart,
  LineChart,
  Activity,
  Zap
} from 'lucide-react';
import type { 
  FeedbackAnalytics,
  AnalyticsPeriod,
  CategoryAnalytics,
  JobTypeAnalytics,
  GeographicAnalytics,
  TimeSeriesData
} from '@/types/customer-feedback';

export default function FeedbackAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedContractor, setSelectedContractor] = useState<'all' | string>('all');
  const [selectedMetric, setSelectedMetric] = useState<'rating' | 'nps' | 'satisfaction'>('rating');

  const mockAnalytics: FeedbackAnalytics = {
    contractorId: 'contractor-1',
    period: {
      start: new Date('2024-02-01'),
      end: new Date('2024-03-31'),
      type: 'month'
    },
    metrics: {
      totalFeedbacks: 127,
      averageRating: 4.3,
      ratingDistribution: {
        fiveStars: 65,
        fourStars: 38,
        threeStars: 16,
        twoStars: 5,
        oneStar: 3
      },
      responseRate: 73.2,
      googleReviewRate: 48.8,
      npsScore: 42,
      satisfactionScore: 86.4,
      improvementTrend: 12.5
    },
    categoryBreakdown: [
      { category: 'quality', averageRating: 4.5, trend: 8.2, feedbackCount: 127 },
      { category: 'timeliness', averageRating: 4.1, trend: -2.1, feedbackCount: 127 },
      { category: 'communication', averageRating: 4.2, trend: 15.3, feedbackCount: 127 },
      { category: 'professionalism', averageRating: 4.6, trend: 5.7, feedbackCount: 127 },
      { category: 'value', averageRating: 4.0, trend: -5.2, feedbackCount: 127 }
    ],
    jobTypeAnalytics: [
      {
        jobType: 'water_damage',
        count: 45,
        averageRating: 4.4,
        topIssues: ['delayed response', 'equipment noise'],
        satisfactionRate: 88.9
      },
      {
        jobType: 'fire_damage',
        count: 32,
        averageRating: 4.2,
        topIssues: ['smoke odour remaining', 'longer than expected'],
        satisfactionRate: 84.4
      },
      {
        jobType: 'mold_remediation',
        count: 28,
        averageRating: 4.5,
        topIssues: ['protective equipment concerns'],
        satisfactionRate: 92.9
      },
      {
        jobType: 'storm_damage',
        count: 22,
        averageRating: 4.1,
        topIssues: ['insurance coordination', 'weather delays'],
        satisfactionRate: 81.8
      }
    ],
    geographicAnalytics: [
      { location: 'Sydney', count: 58, averageRating: 4.4 },
      { location: 'Melbourne', count: 34, averageRating: 4.2 },
      { location: 'Brisbane', count: 21, averageRating: 4.3 },
      { location: 'Perth', count: 14, averageRating: 4.1 }
    ],
    timeSeriesData: [
      { date: new Date('2024-01-01'), averageRating: 4.1, feedbackCount: 32, npsScore: 38 },
      { date: new Date('2024-02-01'), averageRating: 4.2, feedbackCount: 41, npsScore: 40 },
      { date: new Date('2024-03-01'), averageRating: 4.3, feedbackCount: 54, npsScore: 42 }
    ],
    topComplaints: [
      { issue: 'Delayed response time', count: 12, severity: 'medium', trend: -15.2, commonJobTypes: ['water_damage', 'storm_damage'] },
      { issue: 'Communication gaps', count: 8, severity: 'medium', trend: -22.1, commonJobTypes: ['fire_damage', 'mold_remediation'] },
      { issue: 'Higher than expected cost', count: 6, severity: 'low', trend: 8.3, commonJobTypes: ['fire_damage'] },
      { issue: 'Equipment noise', count: 5, severity: 'low', trend: -10.0, commonJobTypes: ['water_damage'] }
    ],
    topPraises: [
      { praise: 'Professional and thorough', count: 45, category: 'professionalism', commonJobTypes: ['mold_remediation', 'water_damage'] },
      { praise: 'Quick response time', count: 38, category: 'timeliness', commonJobTypes: ['water_damage', 'storm_damage'] },
      { praise: 'Excellent communication', count: 32, category: 'communication', commonJobTypes: ['fire_damage', 'mold_remediation'] },
      { praise: 'Quality workmanship', count: 28, category: 'quality', commonJobTypes: ['fire_damage', 'water_damage'] }
    ]
  };

  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;
  const formatTrend = (value: number) => (
    <span className={`flex items-center ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
      {value >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
      {Math.abs(value).toFixed(1)}%
    </span>
  );

  const getSentimentIcon = (rating: number) => {
    if (rating >= 4.5) return <ThumbsUp className="w-5 h-5 text-green-500" />;
    if (rating >= 4.0) return <CheckCircle className="w-5 h-5 text-blue-500" />;
    if (rating >= 3.0) return <Clock className="w-5 h-5 text-blue-600" />;
    return <AlertTriangle className="w-5 h-5 text-red-500" />;
  };

  const OverviewCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average Rating</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {mockAnalytics.metrics.averageRating}
            </p>
            <div className="flex items-center mt-2">
              <Star className="w-4 h-4 text-blue-500 fill-current mr-1" />
              <span className="text-sm text-gray-600">
                {mockAnalytics.metrics.totalFeedbacks} reviews
              </span>
            </div>
          </div>
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        <div className="mt-4">
          {formatTrend(mockAnalytics.metrics.improvementTrend)}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">NPS Score</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {mockAnalytics.metrics.npsScore}
            </p>
            <div className="flex items-center mt-2">
              <Target className="w-4 h-4 text-purple-400 mr-1" />
              <span className="text-sm text-gray-600">
                {mockAnalytics.metrics.npsScore >= 50 ? 'Excellent' : 
                 mockAnalytics.metrics.npsScore >= 0 ? 'Good' : 'Needs Improvement'}
              </span>
            </div>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Response Rate</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {formatPercentage(mockAnalytics.metrics.responseRate)}
            </p>
            <div className="flex items-center mt-2">
              <MessageSquare className="w-4 h-4 text-blue-400 mr-1" />
              <span className="text-sm text-gray-600">of completed jobs</span>
            </div>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Google Reviews</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {formatPercentage(mockAnalytics.metrics.googleReviewRate)}
            </p>
            <div className="flex items-center mt-2">
              <Star className="w-4 h-4 text-emerald-600 mr-1" />
              <span className="text-sm text-gray-600">conversion rate</span>
            </div>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <Award className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const RatingDistribution = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
      <div className="space-y-4">
        {Object.entries(mockAnalytics.metrics.ratingDistribution).map(([key, count]) => {
          const starValue = key === 'fiveStars' ? 5 : key === 'fourStars' ? 4 : key === 'threeStars' ? 3 : key === 'twoStars' ? 2 : 1;
          const percentage = (count / mockAnalytics.metrics.totalFeedbacks) * 100;
          
          return (
            <div key={key} className="flex items-center space-x-4">
              <div className="flex items-center w-20">
                <span className="text-sm text-gray-600 mr-2">{starValue}</span>
                <Star className="w-4 h-4 text-blue-500 fill-current" />
              </div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <div className="w-16 text-right">
                <span className="text-sm font-medium text-gray-900">{count}</span>
                <span className="text-xs text-gray-500 ml-1">({percentage.toFixed(0)}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const CategoryBreakdown = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Category</h3>
      <div className="space-y-4">
        {mockAnalytics.categoryBreakdown.map(category => (
          <div key={category.category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {getSentimentIcon(category.averageRating)}
              <div>
                <p className="font-medium text-gray-900 capitalize">{category.category}</p>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-blue-500 fill-current" />
                  <span className="text-sm text-gray-600">{category.averageRating.toFixed(1)}/5</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              {formatTrend(category.trend)}
              <p className="text-xs text-gray-500 mt-1">{category.feedbackCount} reviews</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const JobTypeAnalysis = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Job Type</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Count
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avg Rating
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Satisfaction
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Top Issues
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockAnalytics.jobTypeAnalytics.map(jobType => (
              <tr key={jobType.jobType}>
                <td className="px-4 py-4 text-sm font-medium text-gray-900 capitalize">
                  {jobType.jobType.replace('_', ' ')}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {jobType.count}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-blue-500 fill-current mr-1" />
                    <span className="text-sm font-medium">{jobType.averageRating.toFixed(1)}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {formatPercentage(jobType.satisfactionRate)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {jobType.topIssues.slice(0, 2).map(issue => (
                      <span key={issue} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                        {issue}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const GeographicPerformance = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Performance</h3>
      <div className="space-y-4">
        {mockAnalytics.geographicAnalytics.map(location => (
          <div key={location.location} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{location.location}</p>
                <p className="text-sm text-gray-500">{location.count} reviews</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-blue-500 fill-current mr-1" />
                <span className="font-medium">{location.averageRating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TopComplaints = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Customer Complaints</h3>
      <div className="space-y-3">
        {mockAnalytics.topComplaints.map((complaint, index) => (
          <div key={complaint.issue} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 text-xs font-medium rounded-full flex items-center justify-center">
                {index + 1}
              </span>
              <div>
                <p className="font-medium text-gray-900">{complaint.issue}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    complaint.severity === 'high' ? 'bg-red-100 text-red-800' :
                    complaint.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {complaint.severity}
                  </span>
                  <span className="text-xs text-gray-500">
                    {complaint.commonJobTypes.join(', ')}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">{complaint.count}</p>
              {formatTrend(complaint.trend)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TopPraises = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Praised Aspects</h3>
      <div className="space-y-3">
        {mockAnalytics.topPraises.map((praise, index) => (
          <div key={praise.praise} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 text-xs font-medium rounded-full flex items-center justify-center">
                {index + 1}
              </span>
              <div>
                <p className="font-medium text-gray-900">{praise.praise}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full capitalize">
                    {praise.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {praise.commonJobTypes.join(', ')}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">{praise.count}</p>
              <p className="text-xs text-gray-500">mentions</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feedback Analytics</h1>
          <p className="text-gray-600 mt-2">
            Customer satisfaction insights and performance trends
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as typeof selectedPeriod)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colours">
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours">
            <Download className="w-4 h-4 mr-2 inline" />
            Export
          </button>
        </div>
      </div>

      <OverviewCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <RatingDistribution />
        <CategoryBreakdown />
      </div>

      <div className="mb-8">
        <JobTypeAnalysis />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GeographicPerformance />
        <TopComplaints />
        <TopPraises />
      </div>
    </div>
  );
}