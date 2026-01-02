'use client';

/**
 * ROICalculator Component
 *
 * Interactive ROI calculator for showing subscription value
 * - Jobs per month slider
 * - Average job value input
 * - Automatic ROI calculation
 * - Payback period display
 */

'use client';

import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calendar } from 'lucide-react';

export interface ROICalculatorProps {
  subscriptionPrice: number;
  className?: string;
}

export function ROICalculator({
  subscriptionPrice = 299,
  className = '',
}: ROICalculatorProps) {
  const [jobsPerMonth, setJobsPerMonth] = useState(5);
  const [avgJobValue, setAvgJobValue] = useState(3000);

  const monthlyRevenue = jobsPerMonth * avgJobValue;
  const roi = ((monthlyRevenue - subscriptionPrice) / subscriptionPrice) * 100;
  const paybackDays = Math.ceil((subscriptionPrice / monthlyRevenue) * 30);

  return (
    <div
      className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700 ${className}`}
    >
      <h3 className="font-sans-modern font-semibold text-2xl text-white mb-6 text-center">
        Calculate Your ROI
      </h3>

      {/* Inputs */}
      <div className="space-y-6 mb-8">
        {/* Jobs per month slider */}
        <div>
          <label className="flex items-center justify-between text-white mb-3">
            <span>Jobs closed per month</span>
            <span className="text-2xl font-bold text-nrpg-primary">
              {jobsPerMonth}
            </span>
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={jobsPerMonth}
            onChange={(e) => setJobsPerMonth(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-nrpg-primary"
          />
          <div className="flex justify-between text-sm text-gray-400 mt-1">
            <span>1</span>
            <span>20+</span>
          </div>
        </div>

        {/* Average job value input */}
        <div>
          <label className="block text-white mb-3">
            Average job value
          </label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              min="500"
              max="50000"
              step="100"
              value={avgJobValue}
              onChange={(e) => setAvgJobValue(parseInt(e.target.value) || 0)}
              className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-nrpg-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-nrpg-primary/10 border border-nrpg-primary/30 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-300">
            <TrendingUp className="h-5 w-5" />
            <span>Monthly Revenue</span>
          </div>
          <span className="text-2xl font-bold text-white">
            ${monthlyRevenue.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-300">
            <DollarSign className="h-5 w-5" />
            <span>Return on Investment</span>
          </div>
          <span className="text-2xl font-bold text-nrpg-primary">
            {roi.toFixed(0)}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="h-5 w-5" />
            <span>Subscription Payback</span>
          </div>
          <span className="text-2xl font-bold text-nrpg-secondary">
            {paybackDays} {paybackDays === 1 ? 'day' : 'days'}
          </span>
        </div>
      </div>

      {/* Summary message */}
      <p className="text-center text-gray-400 mt-6">
        At this rate, your subscription pays for itself in{' '}
        <span className="text-nrpg-primary font-semibold">
          {paybackDays} {paybackDays === 1 ? 'day' : 'days'}
        </span>
        . After that, it's pure profit.
      </p>
    </div>
  );
}

export default ROICalculator;
