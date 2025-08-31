import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Home, Briefcase, Building2, School, Hotel, Warehouse, Hospital, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Property Type Disaster Recovery | Residential, Commercial, Strata | All Properties',
  description: 'Specialised disaster recovery for all property types. Residential homes, commercial offices, strata properties, government facilities.' };

const properties = [
  {
    "name": "Residential Home",
    "slug": "residential-homes",
    "category": "Residential",
    "description": "Complete disaster recovery for houses, townhouses, and residential properties",
    "responseTime": "30-60 minutes",
    "insuranceCoverage": "95%"
  },
  {
    "name": "Apartment & Unit",
    "slug": "apartment-units",
    "category": "Residential",
    "description": "Specialised disaster recovery for apartments, units, and high-rise residences",
    "responseTime": "30-45 minutes",
    "insuranceCoverage": "95%"
  },
  {
    "name": "Commercial Office",
    "slug": "commercial-offices",
    "category": "Commercial",
    "description": "Business continuity focused disaster recovery for offices and commercial spaces",
    "responseTime": "30 minutes priority",
    "insuranceCoverage": "100%"
  },
  {
    "name": "Retail Store",
    "slug": "retail-stores",
    "category": "Commercial",
    "description": "Rapid disaster recovery to minimize retail business interruption",
    "responseTime": "30 minutes priority",
    "insuranceCoverage": "100%"
  },
  {
    "name": "Strata Property",
    "slug": "strata-properties",
    "category": "Strata",
    "description": "Coordinated disaster recovery for strata-managed properties and common areas",
    "responseTime": "30 minutes",
    "insuranceCoverage": "100% via strata"
  },
  {
    "name": "Government Facility",
    "slug": "government-facilities",
    "category": "Government",
    "description": "Approved vendor for government facility disaster recovery and restoration",
    "responseTime": "Immediate priority",
    "insuranceCoverage": "100% funded"
  },
  {
    "name": "Warehouse & Storage",
    "slug": "warehouses",
    "category": "Industrial",
    "description": "Large-scale disaster recovery for warehouses and storage facilities",
    "responseTime": "45 minutes",
    "insuranceCoverage": "100%"
  },
  {
    "name": "Healthcare Facility",
    "slug": "healthcare-facilities",
    "category": "Healthcare",
    "description": "Specialised disaster recovery for hospitals, clinics, and medical facilities",
    "responseTime": "Immediate",
    "insuranceCoverage": "100%"
  },
  {
    "name": "School & Education",
    "slug": "schools-education",
    "category": "Education",
    "description": "Safe and rapid disaster recovery for schools and educational facilities",
    "responseTime": "30 minutes",
    "insuranceCoverage": "100%"
  },
  {
    "name": "Hotel & Accommodation",
    "slug": "hotels-accommodation",
    "category": "Hospitality",
    "description": "Minimal disruption disaster recovery for hotels and accommodation providers",
    "responseTime": "Immediate",
    "insuranceCoverage": "100%"
  }
];

export default function PropertyTypesPage() {
  const getIcon = (category: string) => {
    switch(category) {
      case 'Residential': return Home;
      case 'Commercial': return Briefcase;
      case 'Strata': return Building2;
      case 'Government': return Building;
      case 'Education': return School;
      case 'Hospitality': return Hotel;
      case 'Industrial': return Warehouse;
      case 'Healthcare': return Hospital;
      default: return Building;
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Residential': return 'bg-green-600';
      case 'Commercial': return 'bg-blue-600';
      case 'Strata': return 'bg-purple-600';
      case 'Government': return 'bg-red-600';
      case 'Healthcare': return 'bg-pink-600';
      case 'Education': return 'bg-yellow-600';
      case 'Industrial': return 'bg-gray-600';
      case 'Hospitality': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Building className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Disaster Recovery for All Property Types
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Specialised restoration services tailored to your property type. 
            From residential homes to government facilities - we have you covered.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Select Your Property Type
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => {
              const IconComponent = getIcon(property.category);
              const colorClass = getCategoryColor(property.category);
              
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="h-10 w-10 text-blue-600" />
                    <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${colorClass}`}>
                      {property.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{property.name}</h2>
                  <p className="text-gray-600 mb-4">{property.description}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm flex justify-between">
                      <span>Response:</span>
                      <span className="font-bold">{property.responseTime}</span>
                    </p>
                    <p className="text-sm flex justify-between">
                      <span>Insurance:</span>
                      <span className="font-bold text-green-600">{property.insuranceCoverage}</span>
                    </p>
                  </div>
                  <Link href={`/property-types/${property.slug}`}>
                    <Button className="w-full" variant="outline">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Property-Specific Matters */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Property-Specific Recovery Matters
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Residential Properties</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Family safety and health priority</li>
                  <li>• Personal belongings protection</li>
                  <li>• Temporary accommodation assistance</li>
                  <li>• Emotional support and care</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Commercial Properties</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Business continuity focus</li>
                  <li>• Minimize revenue loss</li>
                  <li>• Document and data recovery</li>
                  <li>• Employee safety protocols</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Strata Properties</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Multiple stakeholder coordination</li>
                  <li>• Common area prioritization</li>
                  <li>• Strata management liaison</li>
                  <li>• Compliance with by-laws</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Government Properties</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Public safety paramount</li>
                  <li>• Regulatory compliance</li>
                  <li>• Security clearance protocols</li>
                  <li>• Continuity of services</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}