'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Book,
  FileText,
  Shield,
  CreditCard,
  User,
  Settings,
  HelpCircle,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Clock,
  Star,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Home, MessageSquare} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { KnowledgeArticle, ArticleCategory, SearchResult } from '@/types/support';

// Mock categories
const mockCategories: ArticleCategory[] = [
  {
    id: '1',
    name: 'Getting Started',
    slug: 'getting-started',
    description: 'Essential guides for new contractors',
    icon: 'rocket',
    articleCount: 12,
    order: 1,
    subcategories: [
      { id: '1-1', name: 'Account Setup', slug: 'account-setup', categoryId: '1', articleCount: 5 },
      { id: '1-2', name: 'First Steps', slug: 'first-steps', categoryId: '1', articleCount: 7 }
    ]
  },
  {
    id: '2',
    name: 'Compliance & Certification',
    slug: 'compliance',
    description: 'Requirements, renewals, and compliance guides',
    icon: 'shield',
    articleCount: 24,
    order: 2,
    subcategories: [
      { id: '2-1', name: 'IICRC Requirements', slug: 'iicrc', categoryId: '2', articleCount: 8 },
      { id: '2-2', name: 'Insurance', slug: 'insurance', categoryId: '2', articleCount: 6 },
      { id: '2-3', name: 'CPP40421', slug: 'cpp40421', categoryId: '2', articleCount: 10 }
    ]
  },
  {
    id: '3',
    name: 'Billing & Payments',
    slug: 'billing',
    description: 'Subscription management and payment help',
    icon: 'credit-card',
    articleCount: 15,
    order: 3
  },
  {
    id: '4',
    name: 'Portal Features',
    slug: 'features',
    description: 'How to use platform features',
    icon: 'settings',
    articleCount: 18,
    order: 4
  }
];

// Mock articles
const mockArticles: KnowledgeArticle[] = [
  {
    id: '1',
    title: 'Quick Start Guide for New Contractors',
    slug: 'quick-start-guide',
    category: mockCategories[0],
    content: `# Quick Start Guide for New Contractors

Welcome to the National Restoration Professionals platform! This guide will help you get started quickly.

## Step 1: Complete Your Profile
- Upload your company logo
- Add business details
- Set your service areas

## Step 2: Submit Compliance Documents
- Upload IICRC certifications
- Add insurance documents
- Complete background check

## Step 3: Choose Your Subscription
- Review available plans
- Select territories
- Set up billing

## Step 4: Start Receiving Jobs
- Configure notification preferences
- Set availability schedule
- Accept your first job`,
    excerpt: 'Get started with NRP in just 4 simple steps. This guide covers everything from profile setup to accepting your first job.',
    tags: ['onboarding', 'getting-started', 'new-contractor'],
    author: 'NRP Support Team',
    isPublished: true,
    isFeatured: true,
    helpfulCount: 145,
    notHelpfulCount: 3,
    viewCount: 1250,
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    title: 'Understanding IICRC Certification Requirements',
    slug: 'iicrc-requirements',
    category: mockCategories[1],
    subcategory: 'IICRC Requirements',
    content: `# IICRC Certification Requirements

Learn about the required IICRC certifications for NRP contractors...`,
    excerpt: 'Complete guide to IICRC certifications required for water damage restoration contractors.',
    tags: ['compliance', 'iicrc', 'certification'],
    author: 'Compliance Team',
    isPublished: true,
    isFeatured: false,
    helpfulCount: 89,
    notHelpfulCount: 5,
    viewCount: 756,
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    title: 'How to Renew Your Insurance Policy',
    slug: 'renew-insurance',
    category: mockCategories[1],
    subcategory: 'Insurance',
    content: `# Renewing Your Insurance Policy

Keep your compliance status active by renewing insurance on time...`,
    excerpt: 'Step-by-step instructions for updating and renewing your insurance documentation.',
    tags: ['insurance', 'compliance', 'renewal'],
    author: 'NRP Support Team',
    isPublished: true,
    isFeatured: false,
    helpfulCount: 67,
    notHelpfulCount: 2,
    viewCount: 432,
    lastUpdated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
  }
];

// Mock popular articles
const mockPopularArticles = [
  { id: '1', title: 'Quick Start Guide', views: 1250 },
  { id: '2', title: 'Setting Up Direct Deposit', views: 980 },
  { id: '3', title: 'Territory Selection Guide', views: 856 },
  { id: '4', title: 'Insurance Requirements', views: 745 },
  { id: '5', title: 'Job Acceptance Process', views: 698 }
];

// Mock recent searches
const mockRecentSearches = [
  'certification renewal',
  'payment methods',
  'territory changes',
  'compliance score',
  'background check'
];

export function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    // Simulate search
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const results: SearchResult[] = mockArticles
      .filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
      .map(article => ({
        type: 'article' as const,
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        url: `/help/articles/${article.slug}`,
        category: article.category.name,
        relevanceScore: 0.9,
        lastUpdated: article.lastUpdated
      }));
    
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleArticleFeedback = (articleId: string, helpful: boolean) => {
    // In production, this would update the backend
    console.log(`Article ${articleId} marked as ${helpful ? 'helpful' : 'not helpful'}`);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield': return <Shield className="h-5 w-5" />;
      case 'credit-card': return <CreditCard className="h-5 w-5" />;
      case 'settings': return <Settings className="h-5 w-5" />;
      case 'rocket': return <Home className="h-5 w-5" />;
      default: return <HelpCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Book className="h-8 w-8" />
            Knowledge Base
          </h1>
          <p className="text-blue-100 mb-6">
            Find answers, guides, and resources to help you succeed
          </p>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for articles, guides, or topics..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-3 bg-white text-gray-900 placeholder:text-gray-500"
            />
          </div>

          {/* Quick Links */}
          {!searchQuery && (
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <span className="text-sm text-blue-100">Popular:</span>
              {mockRecentSearches.slice(0, 3).map((search, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-blue-600"
                  onClick={() => {
                    setSearchQuery(search);
                    handleSearch(search);
                  }}
                >
                  {search}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Search Results ({searchResults.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colours"
                  onClick={() => {
                    const article = mockArticles.find(a => a.id === result.id);
                    if (article) setSelectedArticle(article);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium flex items-center gap-2">
                        {result.title}
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{result.excerpt}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {result.category}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Updated {new Date(result.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      {!searchQuery && !selectedArticle && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Categories */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Browse by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockCategories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => setSelectedCategory(category)}
                      className="p-4 border rounded-lg hover:shadow-md cursor-pointer transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colours">
                          {getCategoryIcon(category.icon)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold flex items-center gap-2">
                            {category.name}
                            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {category.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {category.articleCount} articles
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Articles */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-600" />
                  Featured Articles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockArticles.filter(a => a.isFeatured).map((article) => (
                    <div
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div>
                        <h4 className="font-medium">{article.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {article.excerpt.substring(0, 100)}...
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Most Viewed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockPopularArticles.map((article, index) => (
                    <div
                      key={article.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-gray-500">#{index + 1}</span>
                        <span className="hover:text-blue-600 cursor-pointer">
                          {article.title}
                        </span>
                      </span>
                      <span className="text-xs text-gray-500">
                        {article.views} views
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Need More Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Call 1300 XXX XXX
                </Button>
              </CardContent>
            </Card>

            {/* Recent Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recently Updated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockArticles.slice(0, 3).map((article) => (
                    <div
                      key={article.id}
                      className="text-sm cursor-pointer hover:text-blue-600"
                      onClick={() => setSelectedArticle(article)}
                    >
                      <p className="font-medium">{article.title}</p>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(article.lastUpdated)} ago
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Article View */}
      {selectedArticle && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedArticle(null)}
                  >
                    ← Back
                  </Button>
                  <span>/</span>
                  <span>{selectedArticle.category.name}</span>
                  {selectedArticle.subcategory && (
                    <>
                      <span>/</span>
                      <span>{selectedArticle.subcategory}</span>
                    </>
                  )}
                </div>
                <CardTitle className="text-2xl">{selectedArticle.title}</CardTitle>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>By {selectedArticle.author}</span>
                  <span>•</span>
                  <span>Updated {formatDistanceToNow(selectedArticle.lastUpdated)} ago</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {selectedArticle.viewCount} views
                  </span>
                </div>
              </div>
              <Button variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Article Content */}
            <div className="prose max-w-none">
              {selectedArticle.content.split('\n').map((paragraph, index) => (
                <p key={index} className={paragraph.startsWith('#') ? 'font-bold text-lg mt-4' : ''}>
                  {paragraph.replace(/^#+\s/, '')}
                </p>
              ))}
            </div>

            {/* Article Actions */}
            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium mb-2">Was this article helpful?</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleArticleFeedback(selectedArticle.id, true)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Yes ({selectedArticle.helpfulCount})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleArticleFeedback(selectedArticle.id, false)}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      No ({selectedArticle.notHelpfulCount})
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2">
                  {selectedArticle.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Add missing imports
import { MessageSquare, Mail } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';