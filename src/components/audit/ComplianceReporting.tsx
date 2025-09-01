'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3, PieChart, TrendingUp, FileText, Download, Share2,
  Calendar, Filter, Printer, Mail, Shield, AlertTriangle, CheckCircle,
  Users, Building2, Clock, Target, Award, Activity, ChevronDown,
  TrendingDown, Minus, RefreshCw, XCircle, AlertOctagon, ChevronRight
} from 'lucide-react';
import type { 
  ComplianceReport, 
  ReportType, 
  ComplianceMetric,
  ReportSummary,
  ChartData,
  ExportFormat
} from '@/types/audit-compliance';

interface ComplianceReportingProps {
  userRole: 'admin' | 'auditor' | 'contractor' | 'compliance_manager';
  contractorId?: string;
  className?: string;
}

const ComplianceReporting: React.FC<ComplianceReportingProps> = ({
  userRole,
  contractorId,
  className = ''
}) => {
  const [reports, setReports] = useState<ComplianceReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<ComplianceReport | null>(null);
  const [reportType, setReportType] = useState<ReportType>('compliance_summary');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedContractors, setSelectedContractors] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('pdf');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadReports();
  }, [contractorId]);

  const loadReports = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockReports: ComplianceReport[] = [
        {
          id: 'report_001',
          title: 'Q1 2024 Compliance Summary Report',
          type: 'compliance_summary',
          period: {
            start: '2024-01-01T00:00:00Z',
            end: '2024-03-31T23:59:59Z',
            frequency: 'quarterly'
          },
          generatedAt: '2024-04-01T10:00:00Z',
          generatedBy: 'admin_001',
          metrics: [
            { name: 'Overall Compliance', value: 87.5, target: 90, trend: 'improving', changePercentage: 2.5 },
            { name: 'Active Contractors', value: 45, trend: 'stable' },
            { name: 'Audits Completed', value: 12, target: 10, trend: 'improving', changePercentage: 20 },
            { name: 'Open Findings', value: 8, target: 5, trend: 'declining', changePercentage: -15 }
          ],
          summary: {
            overallCompliance: 87.5,
            totalAudits: 12,
            passedAudits: 10,
            failedAudits: 2,
            openFindings: 8,
            completedRemediations: 15,
            criticalIssues: 2,
            recommendations: [
              'Increase safety training frequency',
              'Update certification tracking system',
              'Implement automated compliance checks'
            ]
          },
          details: [],
          charts: [],
          exportFormats: ['pdf', 'excel', 'csv'],
          shareableLink: 'https://example.com/reports/report_001',
          expiryDate: '2024-07-01T23:59:59Z'
        }
      ];

      setReports(mockReports);
      if (mockReports.length > 0) {
        setSelectedReport(mockReports[0]);
      }
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    setGenerating(true);
    try {
      // Mock report generation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newReport: ComplianceReport = {
        id: `report_${Date.now()}`,
        title: `${reportType.replace('_', ' ').toUpperCase()} - ${new Date().toLocaleDateString()}`,
        type: reportType,
        period: {
          start: dateRange.start || '2024-01-01T00:00:00Z',
          end: dateRange.end || new Date().toISOString(),
          frequency: 'custom'
        },
        generatedAt: new Date().toISOString(),
        generatedBy: 'current_user',
        contractors: selectedContractors,
        metrics: [],
        summary: {
          overallCompliance: 0,
          totalAudits: 0,
          passedAudits: 0,
          failedAudits: 0,
          openFindings: 0,
          completedRemediations: 0,
          criticalIssues: 0,
          recommendations: []
        },
        details: [],
        charts: [],
        exportFormats: ['pdf', 'excel', 'csv'],
        shareableLink: `https://example.com/reports/report_${Date.now()}`
      };

      setReports(prev => [newReport, ...prev]);
      setSelectedReport(newReport);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setGenerating(false);
    }
  };

  const exportReport = async (format: ExportFormat) => {
    try {
      // Mock export - replace with actual implementation
      console.log(`Exporting report as ${format}`);
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  const shareReport = async () => {
    if (!selectedReport?.shareableLink) return;
    
    try {
      await navigator.clipboard.writeText(selectedReport.shareableLink);
      // Show toast notification
    } catch (error) {
      console.error('Error sharing report:', error);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-600" />;
      default: return null;
    }
  };

  const MetricCard = ({ metric }: { metric: ComplianceMetric }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600">{metric.name}</p>
        {getTrendIcon(metric.trend)}
      </div>
      <div className="flex items-baseline space-x-2">
        <p className="text-2xl font-bold text-gray-900">
          {typeof metric.value === 'number' ? metric.value.toFixed(1) : metric.value}
        </p>
        {metric.target && (
          <p className="text-sm text-gray-500">/ {metric.target}</p>
        )}
      </div>
      {metric.changePercentage !== undefined && (
        <p className={`text-sm mt-1 ${metric.changePercentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {metric.changePercentage > 0 ? '+' : ''}{metric.changePercentage}% vs last period
        </p>
      )}
    </div>
  );

  const ComplianceScoreGauge = ({ score }: { score: number }) => (
    <div className="relative">
      <svg className="w-48 h-48">
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="70"
          cx="96"
          cy="96"
        />
        <circle
          className={score >= 90 ? 'text-green-600' : score >= 75 ? 'text-yellow-600' : 'text-red-600'}
          strokeWidth="10"
          strokeDasharray={`${(score / 100) * 439.82} 439.82`}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="70"
          cx="96"
          cy="96"
          transform="rotate(-90 96 96)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-900">{score}%</p>
          <p className="text-sm text-gray-600">Compliance</p>
        </div>
      </div>
    </div>
  );

  const ReportGenerator = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Generate New Report</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Report Type
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value as ReportType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="compliance_summary">Compliance Summary</option>
            <option value="audit_outcome">Audit Outcome</option>
            <option value="incident_report">Incident Report</option>
            <option value="trend_analysis">Trend Analysis</option>
            <option value="executive_summary">Executive Summary</option>
            <option value="detailed_assessment">Detailed Assessment</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contractors (Optional)
          </label>
          <select
            multiple
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, option => option.value);
              setSelectedContractors(selected);
            }}
          >
            <option value="all">All Contractors</option>
            <option value="contractor_001">ABC Restoration Inc.</option>
            <option value="contractor_002">XYZ Restoration Services</option>
          </select>
        </div>

        <button
          onClick={generateReport}
          disabled={generating}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generating ? (
            <span className="flex items-center justify-center">
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating Report...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </span>
          )}
        </button>
      </div>
    </div>
  );

  const ReportViewer = () => {
    if (!selectedReport) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{selectedReport.title}</h2>
              <p className="text-sm text-gray-600 mt-1">
                Generated on {new Date(selectedReport.generatedAt).toLocaleDateString()} by {selectedReport.generatedBy}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={shareReport}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </button>
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Printer className="w-4 h-4 mr-1" />
                Print
              </button>
              <div className="relative group">
                <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block">
                  {selectedReport.exportFormats.map((format) => (
                    <button
                      key={format}
                      onClick={() => exportReport(format)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 capitalize"
                    >
                      Export as {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Executive Summary */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Executive Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedReport.metrics.map((metric) => (
                <MetricCard key={metric.name} metric={metric} />
              ))}
            </div>
          </div>

          {/* Compliance Score */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Compliance Score</h3>
              <div className="flex justify-center">
                <ComplianceScoreGauge score={selectedReport.summary.overallCompliance} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Results</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium">Passed Audits</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">
                    {selectedReport.summary.passedAudits}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <XCircle className="w-5 h-5 text-red-600 mr-2" />
                    <span className="font-medium">Failed Audits</span>
                  </div>
                  <span className="text-xl font-bold text-red-600">
                    {selectedReport.summary.failedAudits}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-blue-700 mr-2" />
                    <span className="font-medium">Open Findings</span>
                  </div>
                  <span className="text-xl font-bold text-blue-700">
                    {selectedReport.summary.openFindings}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Recommendations */}
          {selectedReport.summary.recommendations.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Recommendations</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {selectedReport.summary.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-900">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Critical Issues */}
          {selectedReport.summary.criticalIssues > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertOctagon className="w-6 h-6 text-red-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-red-900">Critical Issues Identified</h4>
                  <p className="text-red-700">
                    {selectedReport.summary.criticalIssues} critical issue{selectedReport.summary.criticalIssues !== 1 ? 's' : ''} require{selectedReport.summary.criticalIssues === 1 ? 's' : ''} immediate attention
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gray-200 rounded-xl h-96"></div>
            <div className="lg:col-span-2 bg-gray-200 rounded-xl h-96"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Reporting</h1>
          <p className="text-gray-600 mt-1">Generate and view compliance reports</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Mail className="w-4 h-4 mr-2" />
            Email Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ReportGenerator />
        </div>
        <div className="lg:col-span-2">
          <ReportViewer />
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                selectedReport?.id === report.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedReport(report)}
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">{report.title}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(report.generatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceReporting;