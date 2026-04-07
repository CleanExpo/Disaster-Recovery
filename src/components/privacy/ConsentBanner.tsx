'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, Shield, BarChart3, Languages } from 'lucide-react';

const CONSENT_KEY = 'dr-consent-preferences';
const CONSENT_VERSION = '1.0';

interface ConsentPreferences {
  version: string;
  timestamp: string;
  essential: boolean;
  analytics: boolean;
  aiTranslation: boolean;
}

function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as ConsentPreferences;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(prefs: ConsentPreferences): void {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
  } catch {
    // localStorage unavailable
  }
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [aiTranslation, setAiTranslation] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    const prefs: ConsentPreferences = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      essential: true,
      analytics: true,
      aiTranslation: true,
    };
    saveConsent(prefs);
    setVisible(false);
  }, []);

  const handleAcceptSelected = useCallback(() => {
    const prefs: ConsentPreferences = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      essential: true,
      analytics,
      aiTranslation,
    };
    saveConsent(prefs);
    setVisible(false);
  }, [analytics, aiTranslation]);

  const handleRejectOptional = useCallback(() => {
    const prefs: ConsentPreferences = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      essential: true,
      analytics: false,
      aiTranslation: false,
    };
    saveConsent(prefs);
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie and privacy consent"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-5">
        {/* Compact view */}
        {!showDetails && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" aria-hidden="true" />
              <p className="text-sm text-slate-700 dark:text-slate-300">
                We use essential cookies to keep the site working. Optional cookies help us improve your experience and provide AI-powered translation.{' '}
                <button
                  onClick={() => setShowDetails(true)}
                  className="text-blue-600 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  Manage preferences
                </button>
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectOptional}
                className="min-h-[44px] min-w-[44px] text-sm"
              >
                Essential only
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="min-h-[44px] min-w-[44px] bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                Accept all
              </Button>
            </div>
          </div>
        )}

        {/* Detailed view */}
        {showDetails && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Privacy Preferences
              </h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-sm text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                aria-label="Close preferences"
              >
                Close
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {/* Essential - always on */}
              <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <Shield className="h-5 w-5 text-green-600 mt-0.5 shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Essential</span>
                    <span className="text-xs text-green-600 font-medium">Always on</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Required for the site to function. Security, navigation, and accessibility.</p>
                </div>
              </div>

              {/* Analytics */}
              <label className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750">
                <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Analytics</span>
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2"
                      aria-label="Enable analytics cookies"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Helps us understand how you use the site so we can improve it.</p>
                </div>
              </label>

              {/* AI Translation */}
              <label className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750">
                <Languages className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">AI Translation</span>
                    <input
                      type="checkbox"
                      checked={aiTranslation}
                      onChange={(e) => setAiTranslation(e.target.checked)}
                      className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2"
                      aria-label="Enable AI translation"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Enables Gemma 4 AI translation for claim content in 8 languages.</p>
                </div>
              </label>
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectOptional}
                className="min-h-[44px] min-w-[44px] text-sm"
              >
                Essential only
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAcceptSelected}
                className="min-h-[44px] min-w-[44px] text-sm"
              >
                Save preferences
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="min-h-[44px] min-w-[44px] bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                Accept all
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Utility to check consent status from anywhere in the app */
export function getConsentStatus(): ConsentPreferences | null {
  return getStoredConsent();
}

/** Check if a specific consent type is granted */
export function hasConsent(type: 'analytics' | 'aiTranslation'): boolean {
  const prefs = getStoredConsent();
  if (!prefs) return false;
  return prefs[type] === true;
}
