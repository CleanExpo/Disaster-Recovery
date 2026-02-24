'use client';

import { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';
import { getDemoModeStatus } from '@/lib/services/mock';

export default function DemoModeIndicator() {
  const [isDemo, setIsDemo] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [demoStatus, setDemoStatus] = useState<any>(null);

  useEffect(() => {
    const status = getDemoModeStatus();
    setDemoStatus(status);
    setIsDemo(status.isDemo);
  }, []);

  if (!isDemo || dismissed) return null;

  return (
    <>
      {/* Demo Mode Banner */}
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="animate-pulse text-2xl">🎭</span>
              <div>
                <p className="font-semibold text-sm">
                  Demo Mode Active - Perfect for Investor Presentations
                </p>
                <p className="text-xs opacity-90">
                  Using mock data and simulated services. System is ready for production once API keys are configured.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md text-xs font-medium transition-colours flex items-center gap-1"
              >
                <Info className="w-3 h-3" />
                {showDetails ? 'Hide' : 'Show'} Details
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="p-1 hover:bg-white/20 rounded-md transition-colours"
                aria-label="Dismiss demo mode indicator"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Mode Details Panel */}
      {showDetails && (
        <div className="fixed top-14 left-0 right-0 z-[9998] bg-white dark:bg-gray-900 shadow-xl border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
              Demo Mode Service Status
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(demoStatus?.features || {}).map(([service, status]) => (
                <div key={service} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 capitalize">
                      {service.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 dark:text-gray-200">
                    {status as string}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-700">
                <strong>Ready for Production:</strong> Add your API keys to .env.local or Vercel environment variables to instantly switch to live mode.
              </p>
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium text-sm text-green-800 dark:text-green-700 mb-1">
                  ✅ What Works in Demo
                </h4>
                <ul className="text-xs text-green-700 dark:text-green-700 space-y-1">
                  <li>• Complete booking flow</li>
                  <li>• Contractor management</li>
                  <li>• Payment processing (simulated)</li>
                  <li>• AI damage assessment</li>
                  <li>• KPI tracking</li>
                </ul>
              </div>
              
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-medium text-sm text-yellow-800 dark:text-yellow-700 mb-1">
                  🎭 Mock Data Includes
                </h4>
                <ul className="text-xs text-yellow-700 dark:text-yellow-700 space-y-1">
                  <li>• 50 contractors across AU</li>
                  <li>• 200 sample leads</li>
                  <li>• 3 months of KPI data</li>
                  <li>• Revenue analytics</li>
                  <li>• Emergency scenarios</li>
                </ul>
              </div>
              
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-medium text-sm text-purple-800 dark:text-purple-700 mb-1">
                  🚀 Production Ready
                </h4>
                <ul className="text-xs text-purple-700 dark:text-purple-700 space-y-1">
                  <li>• Stripe integration ready</li>
                  <li>• AI orchestration configured</li>
                  <li>• Email/SMS ready</li>
                  <li>• Insurance APIs prepared</li>
                  <li>• Clean Claims compatible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content overlap */}
      <div className={`h-10 ${showDetails ? 'md:h-64 lg:h-56' : ''}`} />
    </>
  );
}