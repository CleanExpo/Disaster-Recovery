'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Play, X, Sparkles, Users, Briefcase } from 'lucide-react';
import { isDemoMode } from '@/lib/demo-mode';

export default function DemoModeBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [isRunningDemo, setIsRunningDemo] = useState(false);

  useEffect(() => {
    setIsVisible(isDemoMode());
  }, []);

  if (!isVisible) return null;

  const startContractorDemo = async () => {
    setIsRunningDemo(true);
    setShowDemoMenu(false);
    
    // Navigate to contractor signup page
    window.location.href = '/contractor/apply?demo=auto';
  };

  const startClientDemo = async () => {
    setIsRunningDemo(true);
    setShowDemoMenu(false);
    
    // Navigate to client claim page
    window.location.href = '/claim/start?demo=auto';
  };

  return (
    <>
      {/* Demo Mode Banner */}
      <div className="fixed top-0 left-0 right-0 z-[1000] bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-centre justify-between">
            <div className="flex items-centre gap-3">
              <div className="flex items-centre gap-2">
                <AlertTriangle className="h-5 w-5 animate-pulse" />
                <span className="font-bold text-lg">DEMO MODE</span>
              </div>
              <div className="hidden sm:flex items-centre gap-2 text-sm">
                <Sparkles className="h-4 w-4" />
                <span>Test Environment - No Authentication Required</span>
              </div>
            </div>
            
            <div className="flex items-centre gap-2">
              <button
                onClick={() => setShowDemoMenu(!showDemoMenu)}
                disabled={isRunningDemo}
                className={`
                  flex items-centre gap-2 px-4 py-2 rounded-lg font-medium transition-all
                  ${isRunningDemo 
                    ? 'bg-white/20 text-white/60 cursor-not-allowed' 
                    : 'bg-white text-orange-600 hover:bg-orange-50 hover:scale-105'}
                `}
              >
                <Play className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {isRunningDemo ? 'Demo Running...' : 'Run Auto Demo'}
                </span>
                <span className="sm:hidden">Demo</span>
              </button>
              
              <button
                onClick={() => setIsVisible(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
                aria-label="Close demo banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Menu Dropdown */}
      {showDemoMenu && (
        <div className="fixed top-16 right-4 z-[1001] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-top-2">
          <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-b">
            <h3 className="font-bold text-gray-900 mb-1">Choose Demo Type</h3>
            <p className="text-sm text-gray-600">Select an automated demo walkthrough</p>
          </div>
          
          <div className="p-2">
            <button
              onClick={startContractorDemo}
              className="w-full flex items-centre gap-3 px-4 py-3 hover:bg-orange-50 rounded-lg transition group"
            >
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Contractor Signup</div>
                <div className="text-sm text-gray-500">Auto-fill contractor application</div>
              </div>
            </button>
            
            <button
              onClick={startClientDemo}
              className="w-full flex items-centre gap-3 px-4 py-3 hover:bg-orange-50 rounded-lg transition group"
            >
              <div className="p-2 bg-green-100 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Client Claim</div>
                <div className="text-sm text-gray-500">Auto-fill insurance claim</div>
              </div>
            </button>
          </div>
          
          <div className="px-4 py-3 bg-gray-50 border-t">
            <p className="text-xs text-gray-500 text-centre">
              Demos will auto-fill forms with sample data
            </p>
          </div>
        </div>
      )}

      {/* Add spacing to prevent content overlap */}
      {isVisible && <div className="h-16" />}
    </>
  );
}