'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  Package,
  Shield,
  GraduationCap,
  Gavel,
  Cpu,
  PiggyBank,
  Megaphone,
  Users,
  Truck,
  Briefcase,
  Heart,
  ChevronDown,
  ChevronRight,
  Bookmark,
  Share2,
  MessageSquare,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Eye,
  ThumbsUp,
  Tag,
  CheckCircle,
  ExternalLink,
  Zap
} from 'lucide-react';
import type { Partner, PartnerCategory, MarketplaceListing } from '@/types/partner-affiliate';

export default function MarketplaceListing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PartnerCategory | 'all'>('all');
  const [selectedTier, setSelectedTier] = useState<'all' | 'bronze' | 'silver' | 'gold' | 'platinum'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'reviews' | 'newest'>('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);

  const categoryIcons: Record<PartnerCategory, React.ReactNode> = {
    equipment_supplier: <Package className="w-5 h-5" />,
    insurance_provider: <Shield className="w-5 h-5" />,
    legal_services: <Gavel className="w-5 h-5" />,
    training_provider: <GraduationCap className="w-5 h-5" />,
    software_vendor: <Cpu className="w-5 h-5" />,
    financial_services: <PiggyBank className="w-5 h-5" />,
    marketing_agency: <Megaphone className="w-5 h-5" />,
    consulting: <Users className="w-5 h-5" />,
    logistics: <Truck className="w-5 h-5" />,
    other: <Briefcase className="w-5 h-5" />
  };

  const mockPartners: (Partner & { marketplace: MarketplaceListing })[] = [
    {
      id: '1',
      companyName: 'AquaTech Equipment Solutions',
      tradingName: 'AquaTech',
      abn: '12345678901',
      email: 'info@aquatech.com.au',
      phone: '+61 2 9555 0123',
      website: 'https://www.aquatech.com.au',
      logo: '/logos/aquatech.png',
      description: 'Leading supplier of water damage restoration equipment and tools across Australia.',
      category: 'equipment_supplier',
      tier: 'platinum',
      status: 'active',
      joinedDate: new Date('2020-03-15'),
      agreementSigned: new Date('2020-03-15'),
      agreementVersion: '2.1',
      primaryContact: {
        id: '1',
        name: 'Sarah Johnson',
        role: 'Business Development Manager',
        email: 'sarah.johnson@aquatech.com.au',
        phone: '+61 2 9555 0124',
        isPrimary: true,
        notifications: {
          commission: true,
          performance: true,
          campaigns: true,
          system: false
        }
      },
      address: {
        street1: '123 Industrial Drive',
        city: 'Sydney',
        state: 'NSW',
        postcode: '2000',
        country: 'Australia'
      },
      commissionStructure: {
        type: 'percentage',
        baseRate: 15,
        minimumPayout: 100,
        payoutFrequency: 'monthly',
        nextPayoutDate: new Date('2024-04-01'),
        autoApprove: true,
        terms: 'Standard terms'
      },
      performance: {
        lifetime: {
          revenue: 485000,
          leads: 245,
          conversions: 189,
          clicks: 5230,
          conversionRate: 7.7,
          averageOrderValue: 2567,
          customerLifetimeValue: 12500
        },
        currentPeriod: {
          revenue: 42000,
          leads: 25,
          conversions: 18,
          clicks: 420,
          conversionRate: 7.1,
          averageOrderValue: 2333,
          customerLifetimeValue: 12000
        },
        lastPeriod: {
          revenue: 38000,
          leads: 22,
          conversions: 16,
          clicks: 380,
          conversionRate: 7.3,
          averageOrderValue: 2375,
          customerLifetimeValue: 11800
        },
        trends: {
          revenue: 10.5,
          conversions: 12.5,
          leads: 13.6,
          clicks: 10.5
        },
        ranking: {
          overall: 3,
          category: 1,
          tier: 2
        },
        achievements: []
      },
      marketplace: {
        id: '1',
        enabled: true,
        visibility: 'public',
        featured: true,
        featuredUntil: new Date('2024-06-01'),
        priority: 95,
        categories: ['equipment_supplier', 'training_provider'],
        tags: ['water damage', 'dehumidifiers', 'air movers', 'moisture meters', 'training'],
        services: [
          {
            id: '1',
            name: 'Industrial Dehumidifiers',
            description: 'Commercial-grade dehumidifiers for large-scale water damage restoration',
            category: 'Equipment',
            pricing: {
              type: 'fixed',
              amount: 2500,
              currency: 'AUD'
            },
            availability: ['NSW', 'VIC', 'QLD'],
            deliveryTime: '2-3 business days',
            active: true
          },
          {
            id: '2',
            name: 'Moisture Detection Training',
            description: 'Comprehensive training on moisture detection and assessment techniques',
            category: 'Training',
            pricing: {
              type: 'fixed',
              amount: 850,
              currency: 'AUD'
            },
            availability: ['All States'],
            deliveryTime: 'Scheduled sessions',
            active: true
          }
        ],
        promotions: [
          {
            id: '1',
            name: '20% Off Spring Equipment Sale',
            type: 'discount',
            code: 'SPRING20',
            description: '20% discount on all equipment purchases over $5,000',
            terms: 'Valid until March 31, 2024. Cannot be combined with other offers.',
            discount: {
              type: 'percentage',
              value: 20
            },
            validFrom: new Date('2024-03-01'),
            validTo: new Date('2024-03-31'),
            usageLimit: 50,
            usageCount: 23,
            targetAudience: 'all',
            performance: {
              views: 1250,
              clicks: 89,
              redemptions: 23,
              revenue: 45600
            },
            active: true
          }
        ],
        reviews: {
          count: 47,
          average: 4.8,
          recent: [
            {
              id: '1',
              customerId: 'cust-1',
              customerName: 'Melbourne Restoration Pro',
              rating: 5,
              comment: 'Excellent equipment quality and fast delivery. Great customer support.',
              date: new Date('2024-03-10'),
              verified: true,
              response: {
                comment: 'Thank you for your review! We appreciate your business.',
                date: new Date('2024-03-11')
              }
            }
          ]
        },
        analytics: {
          views: 2450,
          clicks: 189,
          inquiries: 45,
          conversions: 18,
          conversionRate: 7.7,
          averageTimeOnPage: 180,
          bounceRate: 25.6,
          topReferrers: ['google.com', 'nrp.com.au', 'facebook.com'],
          popularServices: ['Industrial Dehumidifiers', 'Air Movers', 'Training']
        }
      },
      sponsorships: [],
      compliance: {
        agreementSigned: true,
        agreementVersion: '2.1',
        termsAccepted: new Date('2020-03-15'),
        insuranceValid: true,
        insuranceExpiry: new Date('2024-12-31'),
        licensesValid: true,
        qualityScore: 95,
        complaints: 0,
        disputes: 0
      },
      settings: {
        notifications: {
          email: {
            enabled: true,
            commission: true,
            performance: true,
            campaigns: true,
            events: true,
            system: true,
            digest: true,
            digestFrequency: 'weekly'
          },
          sms: {
            enabled: false,
            commission: false,
            performance: false,
            campaigns: false,
            events: false,
            system: false,
            digest: false
          },
          inApp: {
            enabled: true,
            commission: true,
            performance: true,
            campaigns: true,
            events: true,
            system: true,
            digest: true
          }
        },
        api: {
          enabled: false
        },
        branding: {
          primaryColor: '#0066CC',
          whitelabel: false
        },
        automation: {
          autoApproveLeads: true,
          autoInvoice: true,
          autoReport: true,
          reportFrequency: 'weekly'
        }
      }
    },
    {
      id: '2',
      companyName: 'SecureShield Insurance',
      tradingName: 'SecureShield',
      abn: '98765432109',
      email: 'partners@secureshield.com.au',
      phone: '+61 3 8555 0200',
      website: 'https://www.secureshield.com.au',
      description: 'Comprehensive insurance solutions for restoration professionals and contractors.',
      category: 'insurance_provider',
      tier: 'gold',
      status: 'active',
      joinedDate: new Date('2019-08-22'),
      agreementSigned: new Date('2019-08-22'),
      agreementVersion: '2.1',
      primaryContact: {
        id: '2',
        name: 'Michael Chen',
        role: 'Partner Relations Manager',
        email: 'michael.chen@secureshield.com.au',
        phone: '+61 3 8555 0201',
        isPrimary: true,
        notifications: {
          commission: true,
          performance: true,
          campaigns: true,
          system: true
        }
      },
      address: {
        street1: '456 Collins Street',
        city: 'Melbourne',
        state: 'VIC',
        postcode: '3000',
        country: 'Australia'
      },
      commissionStructure: {
        type: 'percentage',
        baseRate: 20,
        minimumPayout: 150,
        payoutFrequency: 'monthly',
        nextPayoutDate: new Date('2024-04-01'),
        autoApprove: false,
        terms: 'Insurance partnership terms'
      },
      performance: {
        lifetime: {
          revenue: 325000,
          leads: 156,
          conversions: 98,
          clicks: 2890,
          conversionRate: 6.3,
          averageOrderValue: 3316,
          customerLifetimeValue: 15600
        },
        currentPeriod: {
          revenue: 28000,
          leads: 14,
          conversions: 9,
          clicks: 250,
          conversionRate: 6.4,
          averageOrderValue: 3111,
          customerLifetimeValue: 15200
        },
        lastPeriod: {
          revenue: 25000,
          leads: 12,
          conversions: 8,
          clicks: 230,
          conversionRate: 6.1,
          averageOrderValue: 3125,
          customerLifetimeValue: 15000
        },
        trends: {
          revenue: 12.0,
          conversions: 12.5,
          leads: 16.7,
          clicks: 8.7
        },
        ranking: {
          overall: 8,
          category: 3,
          tier: 4
        },
        achievements: []
      },
      marketplace: {
        id: '2',
        enabled: true,
        visibility: 'public',
        featured: false,
        priority: 78,
        categories: ['insurance_provider'],
        tags: ['liability insurance', 'equipment insurance', 'business insurance', 'claims support'],
        services: [
          {
            id: '3',
            name: 'Professional Liability Insurance',
            description: 'Comprehensive coverage for restoration professionals',
            category: 'Insurance',
            pricing: {
              type: 'quote',
              currency: 'AUD'
            },
            availability: ['All States'],
            deliveryTime: '24-48 hours',
            active: true
          }
        ],
        promotions: [],
        reviews: {
          count: 32,
          average: 4.6,
          recent: []
        },
        analytics: {
          views: 1580,
          clicks: 95,
          inquiries: 28,
          conversions: 9,
          conversionRate: 6.0,
          averageTimeOnPage: 145,
          bounceRate: 32.1,
          topReferrers: ['google.com', 'linkedin.com'],
          popularServices: ['Professional Liability Insurance']
        }
      },
      sponsorships: [],
      compliance: {
        agreementSigned: true,
        agreementVersion: '2.1',
        termsAccepted: new Date('2019-08-22'),
        insuranceValid: true,
        licensesValid: true,
        qualityScore: 88,
        complaints: 1,
        disputes: 0
      },
      settings: {
        notifications: {
          email: {
            enabled: true,
            commission: true,
            performance: true,
            campaigns: false,
            events: true,
            system: true,
            digest: true,
            digestFrequency: 'daily'
          },
          sms: {
            enabled: true,
            commission: true,
            performance: false,
            campaigns: false,
            events: false,
            system: false,
            digest: false
          },
          inApp: {
            enabled: true,
            commission: true,
            performance: true,
            campaigns: false,
            events: true,
            system: true,
            digest: false
          }
        },
        api: {
          enabled: false
        },
        branding: {
          primaryColor: '#28A745',
          whitelabel: false
        },
        automation: {
          autoApproveLeads: false,
          autoInvoice: false,
          autoReport: true,
          reportFrequency: 'monthly'
        }
      }
    }
  ];

  const categories = [
    { key: 'all', label: 'All Categories' },
    { key: 'equipment_supplier', label: 'Equipment & Supplies' },
    { key: 'insurance_provider', label: 'Insurance Services' },
    { key: 'legal_services', label: 'Legal Services' },
    { key: 'training_provider', label: 'Training & Certification' },
    { key: 'software_vendor', label: 'Software Solutions' },
    { key: 'financial_services', label: 'Financial Services' },
    { key: 'marketing_agency', label: 'Marketing & Advertising' },
    { key: 'consulting', label: 'Consulting Services' },
    { key: 'logistics', label: 'Logistics & Transportation' },
    { key: 'other', label: 'Other Services' }
  ];

  const tierColors = {
    bronze: 'bg-orange-100 text-orange-800 border-orange-200',
    silver: 'bg-gray-100 text-gray-800 border-gray-200',
    gold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    platinum: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  const filteredPartners = mockPartners.filter(partner => {
    const matchesSearch = searchTerm === '' || 
      partner.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.marketplace.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || partner.category === selectedCategory;
    const matchesTier = selectedTier === 'all' || partner.tier === selectedTier;
    
    return matchesSearch && matchesCategory && matchesTier && partner.marketplace.enabled;
  });

  const sortedPartners = [...filteredPartners].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        if (a.marketplace.featured && !b.marketplace.featured) return -1;
        if (!a.marketplace.featured && b.marketplace.featured) return 1;
        return b.marketplace.priority - a.marketplace.priority;
      case 'rating':
        return b.marketplace.reviews.average - a.marketplace.reviews.average;
      case 'reviews':
        return b.marketplace.reviews.count - a.marketplace.reviews.count;
      case 'newest':
        return b.joinedDate.getTime() - a.joinedDate.getTime();
      default:
        return 0;
    }
  });

  const PartnerCard = ({ partner }: { partner: Partner & { marketplace: MarketplaceListing } }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {partner.marketplace.featured && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-t-xl">
          <div className="flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Featured Partner</span>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              {categoryIcons[partner.category]}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{partner.companyName}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${tierColors[partner.tier]}`}>
                  {partner.tier.toUpperCase()}
                </span>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">
                    {partner.marketplace.reviews.average} ({partner.marketplace.reviews.count})
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-red-500">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {partner.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {partner.marketplace.tags.slice(0, 4).map(tag => (
            <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              {tag}
            </span>
          ))}
          {partner.marketplace.tags.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{partner.marketplace.tags.length - 4} more
            </span>
          )}
        </div>

        {partner.marketplace.promotions.length > 0 && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <Tag className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-800">
                {partner.marketplace.promotions[0].name}
              </span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              {partner.marketplace.promotions[0].description}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{partner.address.city}, {partner.address.state}</span>
          </div>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            <span>{partner.marketplace.analytics.views.toLocaleString()} views</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedPartner(partner.id)}
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>
          <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors">
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Partner Marketplace</h1>
        <p className="text-gray-600 mt-2">
          Discover trusted partners and exclusive offers for your restoration business
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search partners, services, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as PartnerCategory | 'all')}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.key} value={category.key}>
                  {category.label}
                </option>
              ))}
            </select>
            
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value as typeof selectedTier)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Tiers</option>
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="newest">Newest Partners</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>{sortedPartners.length} partners found</span>
          <div className="flex items-center space-x-4">
            <span>Active promotions: {mockPartners.filter(p => p.marketplace.promotions.length > 0).length}</span>
            <span>Featured partners: {mockPartners.filter(p => p.marketplace.featured).length}</span>
          </div>
        </div>
      </div>

      {/* Featured Partners Banner */}
      {mockPartners.filter(p => p.marketplace.featured).length > 0 && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Featured Partners</h2>
              <p className="opacity-90">Premium partners with exclusive benefits and priority support</p>
            </div>
            <Award className="w-12 h-12 opacity-80" />
          </div>
        </div>
      )}

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPartners.map(partner => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>

      {sortedPartners.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No partners found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all categories</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedTier('all');
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Partner Detail Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-900">Partner Details</h2>
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Partner detail content would go here */}
              <p className="text-gray-600">
                Detailed partner information, services, reviews, and contact options would be displayed here.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}