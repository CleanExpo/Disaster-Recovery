'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductScreenshotsProps {
  screenshots?: string[];
  type?: string;
  className?: string;
}

const ProductScreenshots: React.FC<ProductScreenshotsProps> = ({
  screenshots = [],
  type = 'default',
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Default screenshots if none provided
  const defaultScreenshots = {
    dashboard: [
      '/images/screenshots/dashboard-main.png',
      '/images/screenshots/dashboard-analytics.png',
      '/images/screenshots/dashboard-contractors.png'
    ],
    'contractor-portal': [
      '/images/screenshots/contractor-login.png',
      '/images/screenshots/contractor-jobs.png',
      '/images/screenshots/contractor-profile.png'
    ],
    'ai-matching': [
      '/images/screenshots/ai-interface.png',
      '/images/screenshots/ai-results.png',
      '/images/screenshots/ai-analytics.png'
    ],
    'ai-dashboard': [
      '/images/screenshots/ai-dashboard-overview.png',
      '/images/screenshots/ai-metrics.png',
      '/images/screenshots/ai-predictions.png'
    ],
    analytics: [
      '/images/screenshots/analytics-overview.png',
      '/images/screenshots/analytics-performance.png',
      '/images/screenshots/analytics-revenue.png'
    ],
    'mobile-app': [
      '/images/screenshots/mobile-home.png',
      '/images/screenshots/mobile-job.png',
      '/images/screenshots/mobile-chat.png'
    ]
  };

  const screenshotsToUse = screenshots.length > 0 
    ? screenshots 
    : (defaultScreenshots[type as keyof typeof defaultScreenshots] || []);

  useEffect(() => {
    if (screenshotsToUse.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % screenshotsToUse.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [screenshotsToUse.length]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (screenshotsToUse.length === 0) {
    return (
      <div className={`bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-8 ${className}`}>
        <div className="aspect-video flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Product Interface</h3>
            <p className="text-white/60 text-sm">
              Professional disaster recovery management platform
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      <div className="relative overflow-hidden rounded-lg shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
        {/* Browser mockup header */}
        <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-gray-700 rounded px-4 py-1 text-gray-300 text-sm">
              disasterrecovery.com.au
            </div>
          </div>
        </div>

        {/* Screenshot container */}
        <div className="relative aspect-video bg-gray-900">
          {screenshotsToUse.map((screenshot, index) => (
            <div
              key={screenshot}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Placeholder while loading */}
              {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 animate-pulse flex items-center justify-center">
                  <div className="text-white text-lg">Loading...</div>
                </div>
              )}
              
              {/* Fallback gradient if image fails */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900">
                <div className="w-full h-full flex items-center justify-center p-8">
                  <div className="max-w-2xl text-center">
                    <div className="mb-6">
                      <svg className="w-20 h-20 mx-auto text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {type === 'dashboard' && 'Intelligent Dashboard'}
                      {type === 'contractor-portal' && 'Contractor Portal'}
                      {type === 'ai-matching' && 'AI-Powered Matching'}
                      {type === 'analytics' && 'Advanced Analytics'}
                      {type === 'mobile-app' && 'Mobile Application'}
                      {type === 'ai-dashboard' && 'AI Control Center'}
                      {!['dashboard', 'contractor-portal', 'ai-matching', 'analytics', 'mobile-app', 'ai-dashboard'].includes(type) && 'Platform Interface'}
                    </h3>
                    <p className="text-white/60">
                      Professional disaster recovery management system with real-time tracking and AI optimization
                    </p>
                  </div>
                </div>
              </div>

              {/* Actual image - will overlay the gradient when loaded */}
              <Image
                src={screenshot}
                alt={`Product screenshot ${index + 1}`}
                fill
                className="object-cover"
                onLoad={handleImageLoad}
                onError={() => {
                  console.log(`Failed to load image: ${screenshot}`);
                }}
              />
            </div>
          ))}
        </div>

        {/* Screenshot indicators */}
        {screenshotsToUse.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {screenshotsToUse.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
    </div>
  );
};

export default ProductScreenshots;