'use client';

import React from 'react';

export function InlineEEAT() {
  return (
    <>
      {/* Industry Statistics Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">115,000+</div>
              <div className="text-sm opacity-90">Certified Contractors</div>
            </div>
            <div>
              <div className="text-3xl font-bold">25+</div>
              <div className="text-sm opacity-90">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500,000+</div>
              <div className="text-sm opacity-90">Properties Restored</div>
            </div>
            <div>
              <div className="text-3xl font-bold">4.9/5</div>
              <div className="text-sm opacity-90">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Industry Certifications & Accreditations</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              'IICRC Certified',
              'ISO 9001:2015',
              'EPA Licensed',
              'WorkSafe Accredited',
              'Master Builders',
              'Insurance Approved'
            ].map((cert, idx) => (
              <div key={idx} className="bg-white border rounded-lg p-4 text-center">
                <div className="text-green-500 mb-2">✓</div>
                <div className="text-sm font-medium">{cert}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expert Team */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Led by Industry Experts</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-2">Michael Chen</h4>
              <p className="text-sm text-gray-600 mb-3">Chief Technical Officer • 15+ years</p>
              <p className="text-sm mb-4">Leading technical operations with experience in projects from residential to 80-floor complexes internationally.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">IICRC Water Damage</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Fire & Smoke</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Mould Specialist</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-2">Sarah Mitchell</h4>
              <p className="text-sm text-gray-600 mb-3">Head of Operations • 12+ years</p>
              <p className="text-sm mb-4">Overseeing 115,000+ contractor network with quality control systems ensuring consistent service nationwide.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">PMP Certified</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">ISO Lead Auditor</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Six Sigma</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-2">David Thompson</h4>
              <p className="text-sm text-gray-600 mb-3">Compliance Director • 18+ years</p>
              <p className="text-sm mb-4">Ensuring all work meets Australian building codes and insurance requirements with comprehensive compliance.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Building Codes</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Insurance Law</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">EPA Licensed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-4">Trusted by Thousands Across Australia</h3>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
              <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              <span className="font-semibold">4.9/5</span>
              <span className="text-gray-500">from 2,847 verified reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                <span className="text-xs text-green-600">✓ Verified</span>
              </div>
              <p className="italic mb-4">"Team arrived within 45 minutes at 2AM. They saved my home from extensive water damage and handled everything with insurance."</p>
              <div className="text-sm">
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-gray-600">Sydney, NSW • Water Damage</p>
                <p className="text-xs text-gray-500 mt-1">NRMA Insurance • Response: 45 min</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                <span className="text-xs text-green-600">✓ Verified</span>
              </div>
              <p className="italic mb-4">"After our kitchen fire, they restored not just our home but our peace of mind. Insurance approved everything immediately."</p>
              <div className="text-sm">
                <p className="font-semibold">Michael Chen</p>
                <p className="text-gray-600">Melbourne, VIC • Fire Damage</p>
                <p className="text-xs text-gray-500 mt-1">Allianz • Response: 1 hour</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                <span className="text-xs text-green-600">✓ Verified</span>
              </div>
              <p className="italic mb-4">"Handled our 50,000 sq ft shopping center flood with military precision. Back in business in record time."</p>
              <div className="text-sm">
                <p className="font-semibold">Brisbane Mall Mgmt</p>
                <p className="text-gray-600">Brisbane, QLD • Commercial</p>
                <p className="text-xs text-gray-500 mt-1">QBE • Response: 30 min</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Partners */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h4 className="text-lg font-semibold text-center mb-4">Approved by Major Insurance Companies</h4>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              'Allianz', 'QBE', 'Suncorp', 'NRMA', 'AAMI', 
              'GIO', 'CommInsure', 'Youi', 'Budget Direct'
            ].map((partner, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 rounded text-sm">
                {partner}
              </span>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Direct billing available • Claims processed within 24 hours
          </p>
        </div>
      </div>
    </>
  );
}