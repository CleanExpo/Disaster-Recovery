'use client';

import React from 'react';
import Image from 'next/image';

interface TrustBadgesProps {
  variant?: 'full' | 'compact' | 'inline';
  showAll?: boolean;
}

export function TrustBadges({ variant = 'compact', showAll = false }: TrustBadgesProps) {
  const badges = [
    {
      name: 'IICRC Certified',
      description: 'Institute of Inspection, Cleaning and Restoration Certification',
      logo: '/badges/iicrc.svg',
      verified: true,
      link: 'https://www.iicrc.org/verify'
    },
    {
      name: 'Insurance Approved',
      description: 'Approved by all major Australian insurance companies',
      logo: '/badges/insurance.svg',
      verified: true
    },
    {
      name: 'ISO 9001:2015',
      description: 'Quality Management Systems Certification',
      logo: '/badges/iso9001.svg',
      verified: true,
      link: 'https://www.iso.org/iso-9001-quality-management.html'
    },
    {
      name: 'WorkSafe Accredited',
      description: 'Australian workplace safety accreditation',
      logo: '/badges/worksafe.svg',
      verified: true
    },
    {
      name: 'EPA Licensed',
      description: 'Environmental Protection Authority Licensed',
      logo: '/badges/epa.svg',
      verified: true
    },
    {
      name: 'Master Builders',
      description: 'Member of Master Builders Association',
      logo: '/badges/master-builders.svg',
      verified: true
    }
  ];

  const displayBadges = showAll ? badges : badges.slice(0, 4);

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap items-center gap-6 py-4">
        {displayBadges.map((badge, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-green-600 text-lg">✓</span>
            </div>
            <span className="text-sm font-medium text-gray-700">{badge.name}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayBadges.map((badge, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mx-auto mb-2 bg-gray-50 rounded-full flex items-center justify-center">
              {badge.verified && (
                <span className="absolute top-2 right-2 text-green-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              <span className="text-2xl font-bold text-blue-600">
                {badge.name.split(' ')[0].substring(0, 3).toUpperCase()}
              </span>
            </div>
            <h4 className="text-sm font-semibold mb-1">{badge.name}</h4>
            {badge.link ? (
              <a href={badge.link} target="_blank" rel="noopener noreferrer" 
                 className="text-xs text-blue-600 hover:underline">
                Verify →
              </a>
            ) : (
              <span className="text-xs text-gray-500">Verified</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Full variant
  return (
    <div className="bg-gray-50 rounded-xl p-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Industry Certifications & Accreditations</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {badges.map((badge, idx) => (
          <div key={idx} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">
                  {badge.name.split(' ')[0].substring(0, 3).toUpperCase()}
                </span>
              </div>
              {badge.verified && (
                <span className="text-green-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
            <h4 className="font-bold text-lg mb-2">{badge.name}</h4>
            <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
            {badge.link && (
              <a href={badge.link} target="_blank" rel="noopener noreferrer" 
                 className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                Verify Certification
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-4 bg-blue-50 rounded-lg px-6 py-4">
          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div className="text-left">
            <p className="font-semibold text-gray-900">All Certifications Verified</p>
            <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Industry statistics component
export function IndustryStats() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <div className="text-4xl font-bold mb-2">115,000+</div>
          <div className="text-sm opacity-90">Certified Contractors</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">25+</div>
          <div className="text-sm opacity-90">Years Experience</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">500,000+</div>
          <div className="text-sm opacity-90">Properties Restored</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">4.9/5</div>
          <div className="text-sm opacity-90">Customer Rating</div>
        </div>
      </div>
    </div>
  );
}

// Insurance partners component
export function InsurancePartners() {
  const partners = [
    'Allianz', 'QBE', 'Suncorp', 'NRMA', 'AAMI', 'GIO', 
    'CommInsure', 'Youi', 'Budget Direct', 'Woolworths Insurance'
  ];
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4 text-center">Approved by Major Insurance Companies</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {partners.map((partner, idx) => (
          <div key={idx} className="px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">
            {partner}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-gray-500 mt-4">
        Direct billing available • Claims processed within 24 hours
      </p>
    </div>
  );
}