'use client';

import React from 'react';
import Image from 'next/image';

export interface Author {
  name: string;
  role: string;
  qualifications: string[];
  experience: string;
  image?: string;
  bio: string;
  certifications: string[];
  linkedIn?: string;
  email?: string;
}

interface AuthorProfileProps {
  author: Author;
  variant?: 'full' | 'compact' | 'byline';
}

export function AuthorProfile({ author, variant = 'compact' }: AuthorProfileProps) {
  if (variant === 'byline') {
    return (
      <div className="flex items-center gap-3 py-4 border-t border-b border-gray-200">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          {author.image ? (
            <Image src={author.image} alt={author.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg font-semibold">
              {author.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
        </div>
        <div>
          <div className="text-sm">
            <span className="font-semibold">{author.name}</span>
            <span className="text-gray-500 mx-2">•</span>
            <span className="text-gray-600">{author.role}</span>
          </div>
          <div className="text-xs text-gray-500">{author.experience} experience</div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            {author.image ? (
              <Image src={author.image} alt={author.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl font-semibold">
                {author.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">{author.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{author.role} • {author.experience}</p>
            <p className="text-sm text-gray-700 mb-3">{author.bio}</p>
            <div className="flex flex-wrap gap-2">
              {author.certifications.map((cert, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="relative w-32 h-32 mx-auto md:mx-0 rounded-full overflow-hidden bg-gray-200 mb-4">
            {author.image ? (
              <Image src={author.image} alt={author.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-3xl font-semibold">
                {author.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold mb-1">{author.name}</h3>
          <p className="text-gray-600 mb-2">{author.role}</p>
          <p className="text-sm text-gray-500 mb-4">{author.experience} industry experience</p>
          
          {(author.linkedIn || author.email) && (
            <div className="flex gap-3">
              {author.linkedIn && (
                <a href={author.linkedIn} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:text-blue-800">
                  LinkedIn
                </a>
              )}
              {author.email && (
                <a href={`mailto:${author.email}`} className="text-blue-600 hover:text-blue-800">
                  Email
                </a>
              )}
            </div>
          )}
        </div>
        
        <div className="md:w-2/3">
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Professional Background</h4>
            <p className="text-gray-700">{author.bio}</p>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Qualifications</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {author.qualifications.map((qual, idx) => (
                <li key={idx}>{qual}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Industry Certifications</h4>
            <div className="flex flex-wrap gap-2">
              {author.certifications.map((cert, idx) => (
                <span key={idx} className="px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                  ✓ {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Default authors for the site
export const defaultAuthors = {
  technical: {
    name: "Michael Chen",
    role: "Chief Technical Officer",
    qualifications: [
      "Master of Engineering - Structural Engineering",
      "Bachelor of Science - Environmental Science",
      "Certified Disaster Recovery Specialist"
    ],
    experience: "15+ years",
    bio: "Michael leads our technical operations and innovation strategy. With over 15 years in disaster recovery and structural engineering, he has overseen restoration projects ranging from residential properties to 80-floor commercial complexes across Australia and internationally.",
    certifications: [
      "IICRC Water Damage Restoration",
      "IICRC Fire & Smoke Restoration", 
      "IICRC Applied Structural Drying",
      "Mould Remediation Specialist",
      "Biohazard Cleanup Certified"
    ],
    linkedIn: "https://linkedin.com/in/michael-chen-disaster-recovery",
    email: "michael.chen@disasterrecovery.com.au"
  },
  operations: {
    name: "Sarah Mitchell",
    role: "Head of Operations",
    qualifications: [
      "MBA - Business Administration",
      "Bachelor of Project Management",
      "Six Sigma Black Belt"
    ],
    experience: "12+ years",
    bio: "Sarah oversees our nationwide network of 115,000+ certified contractors. She has implemented quality control systems that ensure consistent, insurance-approved restoration services across all Australian states and territories.",
    certifications: [
      "Project Management Professional (PMP)",
      "ISO 9001 Lead Auditor",
      "Emergency Management Australia Certified",
      "WHS Management Certificate"
    ],
    linkedIn: "https://linkedin.com/in/sarah-mitchell-operations",
    email: "sarah.mitchell@disasterrecovery.com.au"
  },
  compliance: {
    name: "David Thompson",
    role: "Compliance & Quality Director",
    qualifications: [
      "Bachelor of Laws (LLB)",
      "Graduate Diploma in Insurance Law",
      "Certificate IV in Government Investigations"
    ],
    experience: "18+ years",
    bio: "David ensures all our restoration work meets Australian building codes, insurance requirements, and industry standards. He has developed our comprehensive compliance framework that guarantees every project meets or exceeds regulatory requirements.",
    certifications: [
      "Australian Building Codes Board Accredited",
      "Insurance Council of Australia Certified",
      "ASIC Compliance Professional",
      "Environmental Protection Authority Licensed"
    ],
    linkedIn: "https://linkedin.com/in/david-thompson-compliance",
    email: "david.thompson@disasterrecovery.com.au"
  }
};