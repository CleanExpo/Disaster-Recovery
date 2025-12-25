'use client';

import { useState } from 'react';
import { useReporting, useAnalytics } from '@/hooks/useAnalytics';

type ExportFormat = 'json' | 'csv' | 'tsv' | 'html';
type ExportType = 'executive' | 'detailed' | 'user' | 'room' | 'performance';

interface ExportPanelProps {
  defaultType?: ExportType;
  onExportStart?: () => void;
  onExportComplete?: (filename: string) => void;
}

/**
 * Export Panel Component
 *
 * Export analytics reports in multiple formats
 */
export function ExportPanel({
  defaultType = 'executive',
  onExportStart,
  onExportComplete,
}: ExportPanelProps) {
  const [exportType, setExportType] = useState<ExportType>(defaultType);
  const [format, setFormat] = useState<ExportFormat>('json');
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'generating' | 'downloading' | 'complete' | 'error'>(
    'idle'
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { generateReport, exportReport } = useReporting();

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setExportStatus('generating');
      setErrorMessage(null);
      onExportStart?.();

      // Generate the report
      const report = await generateReport(exportType, { period });

      if (!report) {
        throw new Error('Failed to generate report');
      }

      setExportStatus('downloading');

      // Generate filename
      const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const filename = `analytics-${exportType}-${timestamp}.${format === 'json' ? 'json' : format === 'csv' ? 'csv' : format === 'tsv' ? 'tsv' : 'html'}`;

      // Prepare data for export
      const exportData = {
        ...report,
        exportedAt: new Date().toISOString(),
        reportType: exportType,
        format,
      };

      // Client-side export for browser
      if (typeof window !== 'undefined') {
        const content =
          format === 'json'
            ? JSON.stringify(exportData, null, 2)
            : format === 'csv'
              ? convertToCSV(exportData)
              : format === 'tsv'
                ? convertToTSV(exportData)
                : convertToHTML(exportData, `Analytics Report - ${exportType}`);

        const blob = new Blob([content], {
          type: format === 'json' ? 'application/json' : format === 'csv' ? 'text/csv' : format === 'tsv' ? 'text/tab-separated-values' : 'text/html',
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }

      setExportStatus('complete');
      onExportComplete?.(filename);

      // Reset after 3 seconds
      setTimeout(() => {
        setExportStatus('idle');
      }, 3000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to export report';
      setErrorMessage(message);
      setExportStatus('error');
      console.error('Export error:', message);
    } finally {
      setIsExporting(false);
    }
  };

  const formatOptions: Array<{ value: ExportFormat; label: string; description: string }> = [
    { value: 'json', label: 'JSON', description: 'Structured data format' },
    { value: 'csv', label: 'CSV', description: 'Spreadsheet compatible' },
    { value: 'tsv', label: 'TSV', description: 'Tab-separated values' },
    { value: 'html', label: 'HTML', description: 'Web viewable report' },
  ];

  const typeOptions: Array<{ value: ExportType; label: string; description: string }> = [
    { value: 'executive', label: 'Executive Summary', description: 'High-level overview' },
    { value: 'detailed', label: 'Detailed Report', description: 'Complete analytics' },
    { value: 'performance', label: 'Performance Metrics', description: 'System health' },
    { value: 'user', label: 'User Analytics', description: 'User engagement' },
    { value: 'room', label: 'Room Analytics', description: 'Room activity' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Export Analytics</h2>

      <div className="space-y-6">
        {/* Report Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Report Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {typeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setExportType(option.value)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  exportType === option.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <p className={`font-medium ${exportType === option.value ? 'text-blue-900' : 'text-gray-900'}`}>
                  {option.label}
                </p>
                <p className={`text-xs mt-1 ${exportType === option.value ? 'text-blue-700' : 'text-gray-600'}`}>
                  {option.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Period (for executive and detailed) */}
        {(exportType === 'executive' || exportType === 'detailed') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Period</label>
            <div className="flex gap-2">
              {(['day', 'week', 'month', 'year'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    period === p
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Export Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Export Format</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {formatOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFormat(option.value)}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  format === option.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <p className={`font-bold text-sm ${format === option.value ? 'text-blue-900' : 'text-gray-900'}`}>
                  {option.label}
                </p>
                <p className={`text-xs mt-1 ${format === option.value ? 'text-blue-700' : 'text-gray-600'}`}>
                  {option.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Status Message */}
        {exportStatus !== 'idle' && (
          <div
            className={`p-4 rounded-lg ${
              exportStatus === 'complete'
                ? 'bg-green-50 border border-green-200'
                : exportStatus === 'error'
                  ? 'bg-red-50 border border-red-200'
                  : 'bg-blue-50 border border-blue-200'
            }`}
          >
            <p
              className={`text-sm font-medium ${
                exportStatus === 'complete'
                  ? 'text-green-800'
                  : exportStatus === 'error'
                    ? 'text-red-800'
                    : 'text-blue-800'
              }`}
            >
              {exportStatus === 'generating' && '⟳ Generating report...'}
              {exportStatus === 'downloading' && '⬇ Preparing download...'}
              {exportStatus === 'complete' && '✓ Export complete! File downloaded.'}
              {exportStatus === 'error' && `✕ Error: ${errorMessage}`}
            </p>
          </div>
        )}

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isExporting ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Exporting...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-4-2m4 2l4-2"
                />
              </svg>
              Export Report
            </>
          )}
        </button>

        {/* Info */}
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600">
            <strong>Note:</strong> Reports are generated from current analytics data and downloaded directly to your
            device.
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper functions for format conversion
function convertToCSV(data: Record<string, any>): string {
  const lines: string[] = [];
  const flatten = (obj: any, prefix = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        flatten(value, prefix ? `${prefix}.${key}` : key);
      } else if (Array.isArray(value)) {
        lines.push(`"${prefix}.${key}",${value.length}`);
      } else {
        lines.push(`"${prefix}.${key}","${String(value).replace(/"/g, '""')}"`);
      }
    });
  };
  flatten(data);
  return lines.join('\n');
}

function convertToTSV(data: Record<string, any>): string {
  return convertToCSV(data).replace(/,/g, '\t');
}

function convertToHTML(data: Record<string, any>, title: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
    .container { max-width: 1000px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
    h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background: #007bff; color: white; padding: 12px; text-align: left; }
    td { padding: 10px; border-bottom: 1px solid #ddd; }
    tr:hover { background: #f9f9f9; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${title}</h1>
    <p>Generated: ${new Date().toLocaleString()}</p>
    <pre>${JSON.stringify(data, null, 2)}</pre>
  </div>
</body>
</html>
  `;
}
