'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Rocket } from 'lucide-react';

export default function InvestorPitchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
        <Rocket className="h-16 w-16 mx-auto mb-6 text-blue-400" />
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Investor Pitch Deck
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          The pitch deck is temporarily being updated with enhanced features.
          Please check back shortly.
        </p>
        
        <div className="bg-blue-900/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Coming Soon:</h2>
          <ul className="text-left text-gray-300 space-y-2">
            <li>• 16 Professional slides with business data</li>
            <li>• AI-powered voice narration</li>
            <li>• Interactive data visualizations</li>
            <li>• Auto-play presentation mode</li>
            <li>• Background music and animations</li>
          </ul>
        </div>
        
        <Link 
          href="/demo"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Demo
        </Link>
      </div>
    </div>
  );
}