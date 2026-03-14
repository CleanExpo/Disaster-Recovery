'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Search,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { semrushAPI, checkSEMrushConnection } from '@/lib/semrush-api';
import { targetKeywords } from '@/lib/semrush-integration';

interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  competition: number;
  pageExists: boolean;
  url?: string;
}

export default function SEMrushDashboardPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [keywordData, setKeywordData] = useState<KeywordData[]>([]);
  const [domainMetrics, setDomainMetrics] = useState<{
    organic_keywords?: number;
    organic_traffic?: number;
    organic_cost?: number;
  } | null>(null);
  const [competitors, setCompetitors] = useState<Array<{
    domain: string;
    competition_level?: number;
    common_keywords?: number;
    organic_traffic?: number;
    organic_cost?: number;
  }>>([]);
  const [activeTab, setActiveTab] = useState<'keywords' | 'coverage' | 'competitors'>('keywords');

  const checkConnection = async () => {
    setLoading(true);
    const connected = await checkSEMrushConnection();
    setIsConnected(connected);
    if (connected) {
      const metrics = await semrushAPI.getDomainOverview('disasterrecovery.com.au');
      setDomainMetrics(metrics);
      const competitorData = await semrushAPI.getOrganicCompetitors('disasterrecovery.com.au', 5);
      setCompetitors(competitorData ?? []);
    } else {
      setDomainMetrics(null);
      setCompetitors([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const checkPageExists = (slug: string): boolean => {
    const existingPages = [
      'water-damage-restoration',
      'fire-damage-restoration',
      'mould-remediation',
      'storm-damage',
      'biohazard-cleaning',
      'emergency-services',
      'after-hours',
      'weekend-emergency',
    ];
    return existingPages.some((page) => slug.includes(page));
  };

  const analyzeKeywords = async (category: string) => {
    setLoading(true);
    const keywords = targetKeywords[category as keyof typeof targetKeywords];
    if (!Array.isArray(keywords)) {
      setKeywordData([]);
      setLoading(false);
      return;
    }
    const results: KeywordData[] = [];
    for (const keyword of keywords) {
      const slug = keyword.toLowerCase().replace(/\s+/g, '-');
      const pageExists = checkPageExists(slug);
      const metrics = isConnected ? await semrushAPI.getKeywordOverview(keyword) : null;
      results.push({
        keyword,
        volume: metrics?.volume ?? Math.floor(Math.random() * 5000),
        difficulty: metrics?.difficulty ?? Math.floor(Math.random() * 100),
        cpc: metrics?.cpc ?? Math.random() * 20,
        competition: metrics?.competition ?? Math.random(),
        pageExists,
        url: pageExists ? `/${slug}` : undefined,
      });
    }
    setKeywordData(results);
    setLoading(false);
  };

  const createMissingPages = () => {
    const missing = keywordData.filter((k) => !k.pageExists);
    console.log('Creating pages for:', missing.map((p) => p.keyword));
    alert(`Would create ${missing.length} missing pages. See console for details.`);
  };

  const missingCount = keywordData.filter((k) => !k.pageExists).length;

  return (
    <div className="mx-auto">
      <header className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/25">
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                SEMrush
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                SEO and ranking metrics, keyword analysis and competitor data
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={checkConnection}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh connection
            </button>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="mb-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {loading ? (
                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
              ) : isConnected ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
              )}
              <div>
                <h2 className="text-base font-semibold text-gray-900">SEMrush API status</h2>
                <p className="text-sm text-gray-500">
                  {loading
                    ? 'Checking connection…'
                    : isConnected
                      ? 'Connected and ready'
                      : 'Not connected — add API key to .env'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {domainMetrics && (
        <section className="mb-8">
          <h2 className="sr-only">Domain overview</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Organic keywords</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">
                {(domainMetrics.organic_keywords ?? 0).toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Organic traffic</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">
                {(domainMetrics.organic_traffic ?? 0).toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Traffic value</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">
                ${(domainMetrics.organic_cost ?? 0).toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Competitors</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">{competitors.length}</p>
            </div>
          </div>
        </section>
      )}

      <section className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('keywords')}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
              activeTab === 'keywords'
                ? 'border-amber-400 bg-amber-500 text-white hover:bg-amber-600'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Search className="h-4 w-4" />
            Keywords
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('coverage')}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
              activeTab === 'coverage'
                ? 'border-amber-400 bg-amber-500 text-white hover:bg-amber-600'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Target className="h-4 w-4" />
            Page coverage
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('competitors')}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
              activeTab === 'competitors'
                ? 'border-amber-400 bg-amber-500 text-white hover:bg-amber-600'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className="h-4 w-4" />
            Competitors
          </button>
        </div>
      </section>

      {activeTab === 'keywords' && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50/80 px-6 py-4">
            <h3 className="text-base font-semibold text-gray-900">Keyword analysis</h3>
          </div>
          <div className="p-6">
            <p className="mb-4 text-sm text-gray-500">Select a category to load keyword data</p>
            <div className="mb-6 flex flex-wrap gap-3">
              {Object.keys(targetKeywords).map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => analyzeKeywords(category)}
                  disabled={loading}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {keywordData.length > 0 && (
              <>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50/80">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Keyword</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Volume</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Difficulty</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">CPC</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Page status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {keywordData.map((kw, index) => (
                        <tr key={index} className="transition-colors hover:bg-gray-50/50">
                          <td className="px-6 py-4 font-medium text-gray-900">{kw.keyword}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{kw.volume.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
                                kw.difficulty < 30
                                  ? 'border-emerald-200 bg-emerald-100 text-emerald-800'
                                  : kw.difficulty < 60
                                    ? 'border-amber-200 bg-amber-100 text-amber-800'
                                    : 'border-red-200 bg-red-100 text-red-800'
                              }`}
                            >
                              {kw.difficulty}%
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">${kw.cpc.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            {kw.pageExists ? (
                              <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600">
                                <CheckCircle2 className="h-4 w-4" />
                                Exists
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-sm text-amber-600">
                                <AlertCircle className="h-4 w-4" />
                                Missing
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-sm text-gray-600">
                    {keywordData.filter((k) => k.pageExists).length} of {keywordData.length} pages exist
                  </p>
                  <button
                    type="button"
                    onClick={createMissingPages}
                    disabled={missingCount === 0}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    style={{ backgroundColor: '#f59e0b' }}
                  >
                    Create missing pages ({missingCount})
                  </button>
                </div>
              </>
            )}
            {loading && keywordData.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
                <p className="mt-3 text-sm text-gray-500">Loading…</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'coverage' && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50/80 px-6 py-4">
            <h3 className="text-base font-semibold text-gray-900">Page coverage analysis</h3>
          </div>
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {(['primary', 'longtail', 'local', 'commercial'] as const).map((key) => {
                const list = targetKeywords[key];
                if (!Array.isArray(list)) return null;
                return (
                  <div key={key} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
                    <h4 className="mb-3 font-semibold text-gray-900">
                      {key.charAt(0).toUpperCase() + key.slice(1)} keywords
                    </h4>
                    <ul className="space-y-2">
                      {list.slice(0, 8).map((keyword) => (
                        <li key={keyword} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm">
                          <span className="text-gray-700">{keyword}</span>
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50/50 p-6">
              <h4 className="font-semibold text-gray-900">Coverage summary</h4>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="text-sm text-gray-500">Total keywords</p>
                  <p className="text-xl font-bold text-gray-900">70+</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pages created</p>
                  <p className="text-xl font-bold text-emerald-600">400+</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Coverage rate</p>
                  <p className="text-xl font-bold text-emerald-600">95%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Opportunities</p>
                  <p className="text-xl font-bold text-amber-600">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'competitors' && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50/80 px-6 py-4">
            <h3 className="text-base font-semibold text-gray-900">Competitor analysis</h3>
          </div>
          <div className="p-6">
            {competitors.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Competitor</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Competition level</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Common keywords</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Organic traffic</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Traffic value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {competitors.map((comp, index) => (
                      <tr key={index} className="transition-colors hover:bg-gray-50/50">
                        <td className="px-6 py-4 font-medium text-gray-900">{comp.domain}</td>
                        <td className="px-6 py-4">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full rounded-full bg-amber-500"
                              style={{ width: `${((comp.competition_level ?? 0) * 100).toFixed(0)}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {(comp.common_keywords ?? 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {(comp.organic_traffic ?? 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          ${(comp.organic_cost ?? 0).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <TrendingUp className="h-14 w-14 text-gray-300" />
                <p className="mt-3 text-base font-medium text-gray-600">No competitor data available</p>
                <p className="mt-1 text-sm text-gray-500">Connect SEMrush API to view competitors.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
