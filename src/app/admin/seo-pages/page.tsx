'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Eye, BarChart3, MapPin, Filter, Download, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface SEOPage {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  state: string;
  city: string;
  suburb?: string;
  postcode: string;
  serviceType: string;
  serviceName: string;
  propertyType: string;
  businessType?: string;
  priorityScore: number;
  estimatedSearchVolume: number;
  currentRankings?: any;
  organicClicks: number;
  publishedAt: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function SEOPagesAdmin() {
  const [pages, setPages] = useState<SEOPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 50,
    total: 0,
    pages: 0
  });
  const [generating, setGenerating] = useState(false);
  
  // Filters
  const [filters, setFilters] = useState({
    search: '',
    state: '',
    serviceType: '',
    status: 'PUBLISHED'
  });
  
  // Generation config
  const [generationConfig, setGenerationConfig] = useState({
    limit: 100,
    priority: 80
  });

  const fetchPages = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.state && { state: filters.state }),
        ...(filters.serviceType && { serviceType: filters.serviceType }),
        ...(filters.status && { status: filters.status })
      });
      
      const response = await fetch(`/api/seo/generate-pages?${params}`);
      const data = await response.json();
      
      if (data.pages) {
        setPages(data.pages);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const generatePages = async () => {
    try {
      setGenerating(true);
      const response = await fetch('/api/seo/generate-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generationConfig)
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert(`Successfully generated ${data.generated} SEO pages!`);
        fetchPages(); // Refresh the list
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error generating pages:', error);
      alert('Failed to generate pages');
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, [filters]);

  const states = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];
  const serviceTypes = [
    'water-damage-restoration',
    'flood-damage-restoration',
    'mould-remediation',
    'fire-damage-restoration',
    'storm-damage-repair',
    'sewage-cleanup',
    'smoke-damage-restoration',
    'biohazard-cleaning',
    'trauma-scene-cleaning',
    'vandalism-repair'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO Pages Management</h1>
              <p className="text-gray-600">
                Manage and monitor your location-based SEO pages across Australia
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => fetchPages()}
                disabled={loading}
                className="flex items-centre gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={generatePages}
                disabled={generating}
                className="flex items-centre gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                {generating ? 'Generating...' : 'Generate Pages'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-centre justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pages</p>
                <p className="text-3xl font-bold text-gray-900">{pagination.total.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-centre justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Priority</p>
                <p className="text-3xl font-bold text-gray-900">
                  {pages.length > 0 ? Math.round(pages.reduce((sum, p) => sum + p.priorityScore, 0) / pages.length) : 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-centre justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                <p className="text-3xl font-bold text-gray-900">
                  {pages.reduce((sum, p) => sum + p.organicClicks, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-centre justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Est. Search Vol.</p>
                <p className="text-3xl font-bold text-gray-900">
                  {pages.reduce((sum, p) => sum + p.estimatedSearchVolume, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Search className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Generation Panel */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate New Pages</h3>
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Pages
              </label>
              <input
                type="number"
                value={generationConfig.limit}
                onChange={(e) => setGenerationConfig({...generationConfig, limit: parseInt(e.target.value)})}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Priority Score
              </label>
              <input
                type="number"
                value={generationConfig.priority}
                onChange={(e) => setGenerationConfig({...generationConfig, priority: parseInt(e.target.value)})}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                max="100"
              />
            </div>
            <button
              onClick={generatePages}
              disabled={generating}
              className="flex items-centre gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {generating ? 'Generating...' : 'Generate Pages'}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                value={filters.state}
                onChange={(e) => setFilters({...filters, state: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
              <select
                value={filters.serviceType}
                onChange={(e) => setFilters({...filters, serviceType: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Services</option>
                {serviceTypes.map(service => (
                  <option key={service} value={service}>
                    {service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pages Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Page
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Est. Volume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-centre">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-2 text-gray-500">Loading pages...</p>
                    </td>
                  </tr>
                ) : pages.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-centre">
                      <p className="text-gray-500">No pages found</p>
                    </td>
                  </tr>
                ) : pages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {page.title}
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-xs">
                          /{page.slug}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-centre gap-1 text-sm text-gray-900">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {page.city}, {page.state} {page.postcode}
                      </div>
                      {page.suburb && (
                        <div className="text-xs text-gray-500">{page.suburb}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{page.serviceName}</div>
                      <div className="text-xs text-gray-500">{page.propertyType}</div>
                      {page.businessType && (
                        <div className="text-xs text-blue-600">{page.businessType.replace(/-/g, ' ')}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm font-medium ${
                        page.priorityScore >= 90 ? 'text-green-600' :
                        page.priorityScore >= 75 ? 'text-yellow-600' : 'text-gray-600'
                      }`}>
                        {page.priorityScore}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{page.estimatedSearchVolume.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{page.organicClicks.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-centre gap-2">
                        <Link
                          href={`/services/${page.slug}`}
                          className="text-blue-600 hover:text-blue-800"
                          target="_blank"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-centre justify-between">
                <div className="text-sm text-gray-700">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                  {pagination.total} results
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => fetchPages(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => fetchPages(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}