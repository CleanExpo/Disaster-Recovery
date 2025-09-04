'use client';

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, AlertTriangle, X, ArrowRight, Clock } from 'lucide-react';

// Floating Emergency CTA - Always Visible
export function FloatingEmergencyCTA() {
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <>
      {isVisible && (
        <div className="fixed top-16 left-0 right-0 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-4 z-[10000] shadow-2xl animate-slideDown">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 animate-pulse" />
              <span className="text-sm md:text-base font-semibold">
                Property Emergency? Get Help in 60 Minutes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a 
                href="tel:1300347278" 
                className="bg-white text-red-600 px-3 py-1.5 rounded-full font-bold text-sm hover:bg-yellow-400 transition-all transform hover:scale-105"
              >
                <Phone className="inline h-4 w-4 mr-1" />
                <span className="hidden sm:inline">1300-DISASTER</span>
                <span className="sm:hidden">Call Now</span>
              </a>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-white/80 hover:text-white p-1"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Quick Action Bar - Mobile Optimized
export function QuickActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-[9990] md:hidden">
      <div className="grid grid-cols-3 gap-1 p-2">
        <a 
          href="tel:1300347278"
          className="flex flex-col items-center justify-center py-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          <Phone className="h-5 w-5 text-red-600 mb-1" />
          <span className="text-xs font-medium">Call Now</span>
        </a>
        <button 
          onClick={() => {
            const chatBtn = document.querySelector('[class*="chat"]');
            if (chatBtn) (chatBtn as HTMLElement).click();
          }}
          className="flex flex-col items-center justify-center py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <MessageCircle className="h-5 w-5 text-blue-600 mb-1" />
          <span className="text-xs font-medium">Live Chat</span>
        </button>
        <a 
          href="/claim"
          className="flex flex-col items-center justify-center py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
        >
          <ArrowRight className="h-5 w-5 text-green-600 mb-1" />
          <span className="text-xs font-medium">Submit Claim</span>
        </a>
      </div>
    </div>
  );
}

// Progress Indicator for Forms
export function FormProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Trust Indicator Banner
export function TrustIndicatorBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const indicators = [
    "✓ 115,000+ Certified Contractors",
    "✓ Insurance Approved & Direct Billing",
    "✓ 60 Minute Response Time",
    "✓ 500,000+ Properties Restored",
    "✓ Available 24/7 Nationwide"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % indicators.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [indicators.length]);

  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4">
      <div className="container mx-auto text-center">
        <p className="text-sm font-medium animate-fadeIn">
          {indicators[currentIndex]}
        </p>
      </div>
    </div>
  );
}

// Loading State with Progress
export function LoadingWithProgress({ message = "Processing your request..." }: { message?: string }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[10000]">
      <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-800 font-medium mb-4">{message}</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{Math.round(progress)}% Complete</p>
        </div>
      </div>
    </div>
  );
}

// Improved Chat Button
export function ImprovedChatButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {showTooltip && !isHovered && (
        <div className="absolute bottom-full right-0 mb-2 bg-black text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap animate-bounce">
          Need help? We&apos;re here 24/7!
          <div className="absolute bottom-0 right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black" />
        </div>
      )}
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          // Trigger chat opening
          const event = new CustomEvent('openChat');
          window.dispatchEvent(event);
        }}
        className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
        aria-label="Open live chat"
      >
        <MessageCircle size={28} />
        <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-ping" />
        <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full" />
      </button>
    </div>
  );
}

// Service Status Indicator
export function ServiceStatusIndicator() {
  const [status, setStatus] = useState<'online' | 'busy' | 'offline'>('online');
  
  useEffect(() => {
    // Check actual service status
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/status', { method: 'HEAD' });
        setStatus(response.ok ? 'online' : 'offline');
      } catch {
        setStatus('offline');
      }
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-20 right-4 bg-white rounded-lg shadow-lg p-3 flex items-center gap-2 z-[9000]">
      <div className={`h-2 w-2 rounded-full ${
        status === 'online' ? 'bg-green-500 animate-pulse' : 
        status === 'busy' ? 'bg-yellow-500' : 
        'bg-red-500'
      }`} />
      <span className="text-sm font-medium">
        {status === 'online' ? 'Available Now' : 
         status === 'busy' ? 'High Demand' : 
         'Please Call'}
      </span>
      {status === 'online' && (
        <Clock className="h-4 w-4 text-gray-500" />
      )}
    </div>
  );
}

// Accessibility Skip Links
export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a 
        href="#main-content" 
        className="absolute top-0 left-0 bg-blue-600 text-white px-4 py-2 z-[10000] focus:outline-none"
      >
        Skip to main content
      </a>
      <a 
        href="#emergency-contact" 
        className="absolute top-0 left-32 bg-red-600 text-white px-4 py-2 z-[10000] focus:outline-none"
      >
        Skip to emergency contact
      </a>
    </div>
  );
}

export default function UXEnhancements() {
  return (
    <>
      <SkipLinks />
      <FloatingEmergencyCTA />
      <TrustIndicatorBanner />
      <ServiceStatusIndicator />
      <ImprovedChatButton />
      <QuickActionBar />
    </>
  );
}