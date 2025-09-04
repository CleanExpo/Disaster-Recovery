'use client';

import React from 'react';
import { Info, Shield, TrendingUp, Users, Calculator, CheckCircle } from 'lucide-react';

export function PricingGuidelines() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
      <div className="flex items-start gap-4">
        <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Our Transparent Pricing Approach
          </h3>
          
          <div className="space-y-4 text-sm text-blue-800">
            <div>
              <p className="font-medium mb-2">How Our Pricing Works:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Estimates Provided:</strong> All contractors provide detailed estimates based on damage assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>National Pricing Guidelines:</strong> NRP implements industry-standard pricing ranges to ensure fairness</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Contractor Independence:</strong> Each contractor sets their own rates within acceptable industry ranges</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Client Protection:</strong> Guidelines prevent overcharging while ensuring quality work</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="font-medium text-blue-900 mb-2">Important to Understand:</p>
              <p className="text-blue-700">
                While contractors operate independently and set their own rates, NRP guides them to maintain 
                pricing within industry-acceptable ranges. This approach protects both clients from overcharging 
                and contractors from undervaluing their expertise. Final pricing may vary based on:
              </p>
              <ul className="mt-2 space-y-1 ml-4 text-blue-600">
                <li>• Extent of damage discovered during assessment</li>
                <li>• Local market conditions and materials costs</li>
                <li>• Emergency response requirements</li>
                <li>• Specific insurance policy requirements</li>
                <li>• Additional services requested</li>
              </ul>
            </div>

            <div className="flex items-center gap-3 bg-blue-100 rounded-lg p-3">
              <Shield className="h-5 w-5 text-blue-700" />
              <p className="text-blue-800 font-medium">
                All estimates are insurance-compliant and include detailed breakdowns for transparency
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PricingGuidelinesBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
      <Calculator className="h-4 w-4" />
      <span>National Pricing Guidelines Applied</span>
    </div>
  );
}

export function EstimateDisclaimer() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-900 mb-1">Estimate Notice</p>
          <p className="text-amber-800">
            This is an estimate provided by an independent contractor following NRP pricing guidelines. 
            Final costs may vary based on actual conditions encountered. Contractors set their own rates 
            within industry-acceptable ranges to ensure fair pricing for both clients and service providers.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ContractorPricingInfo() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Fair & Transparent Pricing Model</h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <Users className="h-8 w-8 mx-auto mb-3 opacity-90" />
          <h4 className="font-semibold mb-2">Independent Contractors</h4>
          <p className="text-sm text-blue-100">
            Each contractor sets competitive rates based on their expertise and local market conditions
          </p>
        </div>
        
        <div className="text-center">
          <TrendingUp className="h-8 w-8 mx-auto mb-3 opacity-90" />
          <h4 className="font-semibold mb-2">Guided Pricing</h4>
          <p className="text-sm text-blue-100">
            NRP provides pricing guidelines to ensure rates fall within industry-acceptable ranges
          </p>
        </div>
        
        <div className="text-center">
          <Shield className="h-8 w-8 mx-auto mb-3 opacity-90" />
          <h4 className="font-semibold mb-2">Client Protection</h4>
          <p className="text-sm text-blue-100">
            Guidelines protect clients from overcharging while ensuring quality professional services
          </p>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-blue-100 text-sm">
          All estimates include detailed breakdowns • Insurance-compliant documentation • Transparent pricing
        </p>
      </div>
    </div>
  );
}