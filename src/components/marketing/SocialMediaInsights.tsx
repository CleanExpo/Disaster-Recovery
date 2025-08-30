'use client';

import React, { useState } from 'react';
import {
  Share2,
  Heart,
  MessageSquare,
  Eye,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Clock,
  Image,
  Video,
  BarChart3,
  Target,
  Zap,
  Star,
  ExternalLink,
  Edit,
  Plus,
  Play,
  Pause,
  Settings,
  Download,
  RefreshCw,
  Hash,
  AtSign,
  MapPin,
  Filter
} from 'lucide-react';
import type { 
  SocialMediaInsights as SocialInsightsType,
  SocialPlatformData,
  SocialContent,
  ScheduledPost,
  EngagementMetrics
} from '@/types/marketing-analytics';

export default function SocialMediaInsights() {
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedView, setSelectedView] = useState<'overview' | 'content' | 'scheduling' | 'analytics'>('overview');
  const [showScheduler, setShowScheduler] = useState(false);

  const mockSocialInsights: SocialInsightsType = {
    platforms: [
      {
        platform: 'facebook',
        accountId: 'fb-123456789',
        accountName: 'NRP Restoration Professionals',
        followers: 12500,
        engagement: {
          likes: 3450,
          comments: 892,
          shares: 567,
          saves: 234,
          clicks: 1876,
          impressions: 89500,
          reach: 45600,
          engagementRate: 4.8,
          clickThroughRate: 2.1
        },
        content: [
          {
            id: 'fb-post-1',
            type: 'post',
            content: 'Emergency water damage response in Sydney CBD. Our certified technicians are on-site within 60 minutes. Professional restoration services you can trust. #WaterDamage #EmergencyResponse #Sydney',
            media: [
              { type: 'image', url: '/social/emergency-response.jpg', alt: 'Emergency water damage response' }
            ],
            publishedDate: new Date('2024-03-15T14:30:00'),
            performance: {
              likes: 456,
              comments: 23,
              shares: 89,
              saves: 12,
              clicks: 234,
              impressions: 12500,
              reach: 8900,
              engagementRate: 5.4,
              clickThroughRate: 1.9
            },
            hashtags: ['WaterDamage', 'EmergencyResponse', 'Sydney'],
            mentions: [],
            location: 'Sydney, NSW',
            audience: {
              demographics: { age_25_34: 35, age_35_44: 28, age_45_54: 22, age_55_plus: 15 },
              interests: ['home_improvement', 'property_management'],
              locations: ['Sydney', 'Melbourne', 'Brisbane']
            }
          },
          {
            id: 'fb-post-2',
            type: 'video',
            content: 'Before and after: Complete fire damage restoration in Melbourne. See how our expert team transformed this property back to its original condition.',
            media: [
              { type: 'video', url: '/social/fire-restoration-video.mp4', alt: 'Fire damage restoration process' }
            ],
            publishedDate: new Date('2024-03-12T10:15:00'),
            performance: {
              likes: 789,
              comments: 45,
              shares: 156,
              saves: 34,
              clicks: 567,
              impressions: 18700,
              reach: 13400,
              engagementRate: 7.2,
              clickThroughRate: 3.0
            },
            hashtags: ['FireDamage', 'Restoration', 'Melbourne', 'BeforeAndAfter'],
            mentions: [],
            audience: {
              demographics: { age_25_34: 32, age_35_44: 31, age_45_54: 25, age_55_plus: 12 },
              interests: ['home_restoration', 'insurance'],
              locations: ['Melbourne', 'Sydney', 'Brisbane']
            }
          }
        ],
        ads: [],
        insights: {
          topPosts: ['fb-post-2', 'fb-post-1'],
          bestPostingTimes: ['10:00', '14:00', '19:00'],
          audienceGrowth: 8.5,
          engagementTrends: [
            { date: new Date('2024-03-01'), engagement: 4.2 },
            { date: new Date('2024-03-08'), engagement: 4.6 },
            { date: new Date('2024-03-15'), engagement: 4.8 }
          ]
        }
      },
      {
        platform: 'linkedin',
        accountId: 'li-987654321',
        accountName: 'National Restoration Professionals',
        followers: 8900,
        engagement: {
          likes: 2340,
          comments: 567,
          shares: 234,
          saves: 123,
          clicks: 1234,
          impressions: 45600,
          reach: 28900,
          engagementRate: 6.2,
          clickThroughRate: 2.7
        },
        content: [
          {
            id: 'li-post-1',
            type: 'post',
            content: 'Industry insight: The commercial property restoration sector is experiencing 15% growth year-over-year. Our certified network of contractors is meeting increasing demand with excellence.',
            media: [
              { type: 'image', url: '/social/industry-growth-chart.jpg', alt: 'Industry growth statistics' }
            ],
            publishedDate: new Date('2024-03-14T09:00:00'),
            performance: {
              likes: 234,
              comments: 67,
              shares: 89,
              saves: 45,
              clicks: 456,
              impressions: 8900,
              reach: 6700,
              engagementRate: 6.8,
              clickThroughRate: 5.1
            },
            hashtags: ['CommercialRestoration', 'IndustryInsight', 'PropertyManagement'],
            mentions: [],
            audience: {
              demographics: { age_35_44: 35, age_45_54: 32, age_55_plus: 23, age_25_34: 10 },
              interests: ['commercial_property', 'facility_management', 'insurance'],
              locations: ['Sydney', 'Melbourne', 'Brisbane']
            }
          }
        ],
        ads: [],
        insights: {
          topPosts: ['li-post-1'],
          bestPostingTimes: ['09:00', '13:00', '17:00'],
          audienceGrowth: 12.3,
          engagementTrends: [
            { date: new Date('2024-03-01'), engagement: 5.8 },
            { date: new Date('2024-03-08'), engagement: 6.0 },
            { date: new Date('2024-03-15'), engagement: 6.2 }
          ]
        }
      },
      {
        platform: 'instagram',
        accountId: 'ig-456789123',
        accountName: '@nrprestoration',
        followers: 15600,
        engagement: {
          likes: 4560,
          comments: 678,
          shares: 345,
          saves: 456,
          clicks: 2890,
          impressions: 124500,
          reach: 67800,
          engagementRate: 8.9,
          clickThroughRate: 2.3
        },
        content: [
          {
            id: 'ig-post-1',
            type: 'reel',
            content: '60-second transformation: Mould remediation process from start to finish. Swipe to see the amazing results! #MoldRemediation #TransformationTuesday #HealthyHomes',
            media: [
              { type: 'video', url: '/social/mould-remediation-reel.mp4', alt: 'Mould remediation time-lapse' }
            ],
            publishedDate: new Date('2024-03-12T16:45:00'),
            performance: {
              likes: 1234,
              comments: 89,
              shares: 156,
              saves: 234,
              clicks: 789,
              impressions: 28900,
              reach: 21500,
              engagementRate: 9.8,
              clickThroughRate: 2.7
            },
            hashtags: ['MoldRemediation', 'TransformationTuesday', 'HealthyHomes', 'BeforeAndAfter'],
            mentions: [],
            audience: {
              demographics: { age_25_34: 45, age_35_44: 28, age_18_24: 15, age_45_54: 12 },
              interests: ['home_improvement', 'health_wellness', 'diy'],
              locations: ['Sydney', 'Melbourne', 'Brisbane']
            }
          }
        ],
        ads: [],
        insights: {
          topPosts: ['ig-post-1'],
          bestPostingTimes: ['12:00', '17:00', '20:00'],
          audienceGrowth: 15.7,
          engagementTrends: [
            { date: new Date('2024-03-01'), engagement: 8.2 },
            { date: new Date('2024-03-08'), engagement: 8.5 },
            { date: new Date('2024-03-15'), engagement: 8.9 }
          ]
        }
      }
    ],
    aggregatedMetrics: {
      totalFollowers: 37000,
      totalEngagement: 10350,
      totalImpressions: 259600,
      totalReach: 142300,
      averageEngagementRate: 6.6,
      growthRate: 12.2,
      topContent: ['ig-post-1', 'fb-post-2', 'li-post-1'],
      bestPlatform: 'instagram'
    },
    contentPerformance: [],
    scheduledPosts: [
      {
        id: 'scheduled-1',
        platforms: ['facebook', 'instagram'],
        content: 'Professional storm damage assessment in Brisbane. Our certified team provides comprehensive property evaluations and restoration plans. Contact us for emergency services.',
        media: [
          { type: 'image', url: '/social/storm-damage-assessment.jpg', alt: 'Storm damage assessment' }
        ],
        scheduledDate: new Date('2024-03-20T11:00:00'),
        status: 'scheduled',
        campaign: 'Storm Season Awareness',
        targetAudience: 'Property Owners Brisbane'
      },
      {
        id: 'scheduled-2',
        platforms: ['linkedin'],
        content: 'Industry update: New certification requirements for commercial restoration contractors. Stay compliant with our comprehensive training programs.',
        media: [],
        scheduledDate: new Date('2024-03-21T14:30:00'),
        status: 'scheduled',
        targetAudience: 'Commercial Property Managers'
      }
    ],
    influencerCampaigns: []
  };

  const formatNumber = (num: number) => new Intl.NumberFormat('en-AU').format(num);
  const formatPercentage = (num: number) => `${num.toFixed(1)}%`;

  const platformIcons = {
    facebook: '📘',
    instagram: '📷',
    linkedin: '💼',
    twitter: '🐦',
    youtube: '📺',
    tiktok: '🎵'
  };

  const platformColors = {
    facebook: 'bg-blue-500',
    instagram: 'bg-gradient-to-br from-purple-500 to-pink-500',
    linkedin: 'bg-blue-700',
    twitter: 'bg-sky-500',
    youtube: 'bg-red-500',
    tiktok: 'bg-black'
  };

  const PlatformOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {mockSocialInsights.platforms.map(platform => (
        <div key={platform.platform} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${platformColors[platform.platform]} flex items-center justify-center text-white text-lg`}>
                {platformIcons[platform.platform]}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 capitalize">{platform.platform}</h3>
                <p className="text-sm text-gray-500">{platform.accountName}</p>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Followers</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(platform.followers)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Engagement Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {formatPercentage(platform.engagement.engagementRate)}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Reach:</span>
              <span className="font-medium">{formatNumber(platform.engagement.reach)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Impressions:</span>
              <span className="font-medium">{formatNumber(platform.engagement.impressions)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Clicks:</span>
              <span className="font-medium">{formatNumber(platform.engagement.clicks)}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">
              +{platform.insights.audienceGrowth}%
            </span>
            <span className="text-gray-500 ml-1">this month</span>
          </div>
        </div>
      ))}
    </div>
  );

  const AggregatedStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Followers</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {formatNumber(mockSocialInsights.aggregatedMetrics.totalFollowers)}
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-sm font-medium text-green-600">
            +{formatPercentage(mockSocialInsights.aggregatedMetrics.growthRate)}
          </span>
          <span className="text-sm text-gray-500 ml-1">growth</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Impressions</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {formatNumber(mockSocialInsights.aggregatedMetrics.totalImpressions)}
            </p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <Eye className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {formatPercentage(mockSocialInsights.aggregatedMetrics.averageEngagementRate)}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <Heart className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Best Platform</p>
            <p className="text-3xl font-bold text-gray-900 mt-1 capitalize">
              {mockSocialInsights.aggregatedMetrics.bestPlatform}
            </p>
          </div>
          <div className="p-3 bg-orange-100 rounded-lg">
            <Star className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const TopContent = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Content</h3>
      <div className="space-y-4">
        {mockSocialInsights.platforms.flatMap(platform => platform.content).map(content => (
          <div key={content.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              {content.type === 'video' || content.type === 'reel' ? 
                <Video className="w-6 h-6 text-gray-600" /> : 
                <Image className="w-6 h-6 text-gray-600" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 line-clamp-2">
                {content.content}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>{content.publishedDate.toLocaleDateString('en-AU')}</span>
                <span className="capitalize">{content.type}</span>
                {content.location && <span>{content.location}</span>}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {content.hashtags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-3 text-sm">
                <div className="flex items-center">
                  <Heart className="w-4 h-4 text-red-500 mr-1" />
                  <span>{formatNumber(content.performance.likes)}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 text-blue-500 mr-1" />
                  <span>{formatNumber(content.performance.comments)}</span>
                </div>
                <div className="flex items-center">
                  <Share2 className="w-4 h-4 text-green-500 mr-1" />
                  <span>{formatNumber(content.performance.shares)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {formatPercentage(content.performance.engagementRate)} engagement
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ContentScheduler = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Scheduled Posts</h3>
        <button
          onClick={() => setShowScheduler(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Post
        </button>
      </div>

      <div className="space-y-4">
        {mockSocialInsights.scheduledPosts.map(post => (
          <div key={post.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900 line-clamp-2">
                {post.content}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{post.scheduledDate.toLocaleDateString('en-AU')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.scheduledDate.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                {post.platforms.map(platform => (
                  <span key={platform} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize">
                    {platform}
                  </span>
                ))}
                {post.campaign && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {post.campaign}
                  </span>
                )}
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <button className="text-blue-600 hover:text-blue-700">
                <Edit className="w-4 h-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-700">
                <Play className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const EngagementTrends = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Trends</h3>
      <div className="space-y-4">
        {mockSocialInsights.platforms.map(platform => (
          <div key={platform.platform} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{platformIcons[platform.platform]}</span>
                <span className="font-medium text-gray-900 capitalize">{platform.platform}</span>
              </div>
              <div className="flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">
                  +{((platform.insights.engagementTrends[2].engagement - platform.insights.engagementTrends[0].engagement) / platform.insights.engagementTrends[0].engagement * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              {platform.insights.engagementTrends.map((trend, index) => (
                <div key={index} className="text-center">
                  <p className="text-gray-600">
                    {trend.date.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })}
                  </p>
                  <p className="font-medium">{formatPercentage(trend.engagement)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const BestPostingTimes = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimal Posting Times</h3>
      <div className="space-y-4">
        {mockSocialInsights.platforms.map(platform => (
          <div key={platform.platform} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-lg">{platformIcons[platform.platform]}</span>
              <span className="font-medium text-gray-900 capitalize">{platform.platform}</span>
            </div>
            <div className="flex space-x-2">
              {platform.insights.bestPostingTimes.map(time => (
                <span key={time} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {time}
                </span>
              ))}
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
          <h1 className="text-3xl font-bold text-gray-900">Social Media Insights</h1>
          <p className="text-gray-600 mt-2">
            Track social media performance and manage content across all platforms
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as typeof selectedTimeframe)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colours">
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours">
            <Download className="w-4 h-4 mr-2 inline" />
            Export Report
          </button>
        </div>
      </div>

      <AggregatedStats />
      <PlatformOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <TopContent />
        <div className="space-y-6">
          <EngagementTrends />
          <BestPostingTimes />
        </div>
      </div>

      <ContentScheduler />
    </div>
  );
}