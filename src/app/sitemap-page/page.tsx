'use client';

import Link from 'next/link';
import { 
  Home, 
  Droplets, 
  Flame, 
  Wind, 
  AlertTriangle,
  Building,
  FileCheck,
  MapPin,
  Shield,
  BookOpen,
  Users
} from 'lucide-react';

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Site Map</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Pages */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-centre gap-2">
              <Home className="h-5 w-5 text-blue-600" />
              Main Pages
            </h2>
            <ul className="space-y-2">
              <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
              <li><Link href="/about" className="text-blue-600 hover:underline">About Us</Link></li>
              <li><Link href="/contact" className="text-blue-600 hover:underline">Contact</Link></li>
              <li><Link href="/get-help" className="text-blue-600 hover:underline">Get Emergency Help</Link></li>
              <li><Link href="/assessment" className="text-blue-600 hover:underline">Free Assessment</Link></li>
              <li><Link href="/insurance-claims" className="text-blue-600 hover:underline">Insurance Claims</Link></li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-centre gap-2">
              <Droplets className="h-5 w-5 text-blue-600" />
              Core Restoration Services
            </h2>
            <ul className="space-y-2">
              <li><Link href="/services/water-damage" className="text-blue-600 hover:underline">Water Damage Restoration</Link></li>
              <li><Link href="/services/fire-damage" className="text-blue-600 hover:underline">Fire & Smoke Damage</Link></li>
              <li><Link href="/services/mould-remediation" className="text-blue-600 hover:underline">Mould Remediation</Link></li>
              <li><Link href="/services/structural-drying" className="text-blue-600 hover:underline">Structural Drying</Link></li>
              <li><Link href="/services/dehumidification" className="text-blue-600 hover:underline">Dehumidification</Link></li>
            </ul>
          </div>

          {/* Emergency Services */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-centre gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Emergency Services
            </h2>
            <ul className="space-y-2">
              <li><Link href="/services/emergency-response" className="text-blue-600 hover:underline">24/7 Emergency Response</Link></li>
              <li><Link href="/services/biohazard" className="text-blue-600 hover:underline">Biohazard Cleanup</Link></li>
              <li><Link href="/services/storm-damage" className="text-blue-600 hover:underline">Storm Damage Repair</Link></li>
              <li><Link href="/services/sewage-cleanup" className="text-blue-600 hover:underline">Sewage Cleanup</Link></li>
              <li><Link href="/services/trauma-cleanup" className="text-blue-600 hover:underline">Trauma Scene Cleanup</Link></li>
            </ul>
          </div>

          {/* Commercial Services */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-centre gap-2">
              <Building className="h-5 w-5 text-blue-600" />
              Commercial Services
            </h2>
            <ul className="space-y-2">
              <li><Link href="/services/commercial" className="text-blue-600 hover:underline">Commercial Overview</Link></li>
              <li><Link href="/services/commercial/large-loss" className="text-blue-600 hover:underline">Large Loss Commercial</Link></li>
              <li><Link href="/services/commercial/healthcare" className="text-blue-600 hover:underline">Healthcare Facilities</Link></li>
              <li><Link href="/services/commercial/education" className="text-blue-600 hover:underline">Educational Facilities</Link></li>
              <li><Link href="/services/commercial/hospitality" className="text-blue-600 hover:underline">Hotels & Hospitality</Link></li>
              <li><Link href="/services/commercial/retail" className="text-blue-600 hover:underline">Retail Spaces</Link></li>
            </ul>
          </div>

          {/* Technical Services */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-centre gap-2">
              <FileCheck className="h-5 w-5 text-blue-600" />
              Technical & Assessment
            </h2>
            <ul className="space-y-2">
              <li><Link href="/services/technical-assessment" className="text-blue-600 hover:underline">Technical Assessment</Link></li>
              <li><Link href="/services/insurance-documentation" className="text-blue-600 hover:underline">Insurance Documentation</Link></li>
              <li><Link href="/services/moisture-mapping" className="text-blue-600 hover:underline">Moisture Mapping</Link></li>
              <li><Link href="/services/thermal-imaging" className="text-blue-600 hover:underline">Thermal Imaging</Link></li>
              <li><Link href="/services/air-quality-testing" className="text-blue-600 hover:underline">Air Quality Testing</Link></li>
              <li><Link href="/services/odour-removal" className="text-blue-600 hover:underline">Odour Removal</Link></li>
            </ul>
          </div>

          {/* Specialised Services */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-centre gap-2">
              <Wind className="h-5 w-5 text-blue-600" />
              Specialised Services
            </h2>
            <ul className="space-y-2">
              <li><Link href="/services/content-restoration" className="text-blue-600 hover:underline">Content Restoration</Link></li>
              <li><Link href="/services/structural-services" className="text-blue-600 hover:underline">Structural Services</Link></li>
              <li><Link href="/services/hvac-remediation" className="text-blue-600 hover:underline">HVAC Remediation</Link></li>
              <li><Link href="/services/document-recovery" className="text-blue-600 hover:underline">Document Recovery</Link></li>
              <li><Link href="/services/electronics-restoration" className="text-blue-600 hover:underline">Electronics Restoration</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-centre gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Service Locations
            </h2>
            <ul className="space-y-2">
              <li><Link href="/locations/brisbane" className="text-blue-600 hover:underline">Brisbane</Link></li>
              <li><Link href="/locations/gold-coast" className="text-blue-600 hover:underline">Gold Coast</Link></li>
              <li><Link href="/locations/sunshine-coast" className="text-blue-600 hover:underline">Sunshine Coast</Link></li>
              <li><Link href="/locations/ipswich" className="text-blue-600 hover:underline">Ipswich</Link></li>
              <li><Link href="/locations/logan" className="text-blue-600 hover:underline">Logan</Link></li>
              <li><Link href="/locations/toowoomba" className="text-blue-600 hover:underline">Toowoomba</Link></li>
            </ul>
          </div>

          {/* Standards & Certifications */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-centre gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Standards & Certifications
            </h2>
            <ul className="space-y-2">
              <li><Link href="/standards/iicrc-s500" className="text-blue-600 hover:underline">IICRC S500 - Water Damage</Link></li>
              <li><Link href="/standards/iicrc-s520" className="text-blue-600 hover:underline">IICRC S520 - Mould Remediation</Link></li>
              <li><Link href="/standards/iicrc-s540" className="text-blue-600 hover:underline">IICRC S540 - Trauma Cleanup</Link></li>
              <li><Link href="/standards/iicrc-s700" className="text-blue-600 hover:underline">IICRC S700 - Fire & Smoke</Link></li>
              <li><Link href="/standards/australian-standards" className="text-blue-600 hover:underline">Australian Standards</Link></li>
              <li><Link href="/certifications" className="text-blue-600 hover:underline">All Certifications</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-centre gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Resources & Guides
            </h2>
            <ul className="space-y-2">
              <li><Link href="/resources" className="text-blue-600 hover:underline">Resource Centre</Link></li>
              <li><Link href="/resources/water-damage-guide" className="text-blue-600 hover:underline">Water Damage Guide</Link></li>
              <li><Link href="/resources/mould-prevention" className="text-blue-600 hover:underline">Mould Prevention Guide</Link></li>
              <li><Link href="/resources/insurance-claims-guide" className="text-blue-600 hover:underline">Insurance Claims Guide</Link></li>
              <li><Link href="/resources/emergency-preparedness" className="text-blue-600 hover:underline">Emergency Preparedness</Link></li>
              <li><Link href="/case-studies" className="text-blue-600 hover:underline">Case Studies</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Legal</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Compare</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="/compare/cheap-vs-quality" className="text-blue-600 hover:underline">Cheap vs Quality</Link></li>
                <li><Link href="/compare/diy-vs-professional" className="text-blue-600 hover:underline">DIY vs Professional</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Contractor Portal</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="/contractor/login" className="text-blue-600 hover:underline">Contractor Login</Link></li>
                <li><Link href="/contractor/apply" className="text-blue-600 hover:underline">Become a Contractor</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Contact</h3>
              <ul className="space-y-1 text-sm">
                <li className="text-gray-600">24/7 Emergency: 1300 123 456</li>
                <li className="text-gray-600">Email: help@disasterrecovery.com.au</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}