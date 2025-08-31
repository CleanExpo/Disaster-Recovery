import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { equipmentCatalog, equipmentCategories, getFeaturedEquipment } from '@/lib/equipment-catalog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Download, Info, DollarSign, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Professional Equipment Catalog | Disaster Recovery Equipment & Specifications',
  description: 'Browse our comprehensive catalog of professional disaster recovery equipment. Detailed specifications, rental pricing, and availability for water damage, fire restoration, and mould remediation equipment.',
  keywords: 'disaster recovery equipment, restoration equipment catalog, industrial dehumidifiers, air scrubbers, thermal imaging cameras, moisture meters, equipment rental Brisbane',
  openGraph: {
    title: 'Professional Disaster Recovery Equipment Catalog',
    description: 'Complete catalog of professional-grade restoration equipment with detailed specifications and rental options.',
    images: ['/images/equipment/catalog-hero.jpg'],
    type: 'website',
  },
};

export default function EquipmentCatalogPage() {
  const featuredEquipment = getFeaturedEquipment();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-600/20"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-500 text-white">Professional Equipment</Badge>
            <h1 className="text-5xl font-bold mb-6">
              Disaster Recovery Equipment Catalog
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              State-of-the-art restoration equipment with detailed specifications, 
              technical data, and rental pricing for professional contractors
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Download className="mr-2 h-5 w-5" />
                Download Full Catalog (PDF)
              </Button>
              <Button size="lg" variant="outline" className="text-gray-900 bg-white hover:bg-gray-100">
                <Info className="mr-2 h-5 w-5" />
                Request Equipment Demo
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">{equipmentCatalog.length}+</div>
              <div className="text-gray-600 mt-2">Equipment Models</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">{equipmentCategories.length}</div>
              <div className="text-gray-600 mt-2">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600 mt-2">Availability</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600">100%</div>
              <div className="text-gray-600 mt-2">Certified Equipment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Equipment Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our professional equipment by category to find the right tools for your restoration project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {equipmentCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/equipment/${category.slug}`}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colours">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Equipment</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most requested professional restoration equipment with detailed specifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEquipment.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-48 bg-gray-100">
                  <ImageWithFallback
                    src={item.primaryImage}
                    alt={item.name}
                    fill
                    className="object-cover"
                    fallback="/images/equipment/placeholder.jpg"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                    {item.availability === 'available' ? 'In Stock' : item.availability}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                  <CardDescription>
                    <span className="font-semibold">{item.manufacturer}</span> • Model: {item.model}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-gray-700">{item.specifications.coverage || item.specifications.airFlow}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-gray-700">{item.certifications[0]}</span>
                    </div>
                  </div>

                  {item.rentalPrice && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Daily Rate:</span>
                        <span className="font-bold text-green-600">${item.rentalPrice.daily}</span>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Link href={`/equipment/specifications/${item.id}`} className="flex-1">
                    <Button className="w-full" variant="default">
                      View Specifications
                    </Button>
                  </Link>
                  <Button variant="outline" className="flex-1">
                    Request Quote
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Equipment Listing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Equipment Inventory</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our entire catalog of professional disaster recovery equipment
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
              <TabsTrigger value="all">All Equipment</TabsTrigger>
              <TabsTrigger value="water">Water Damage</TabsTrigger>
              <TabsTrigger value="fire">Fire/Smoke</TabsTrigger>
              <TabsTrigger value="mould">Mould</TabsTrigger>
              <TabsTrigger value="air">Air Quality</TabsTrigger>
              <TabsTrigger value="inspection">Inspection</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {equipmentCategories.map((category) => (
                <div key={category.slug} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    {category.name}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {equipmentCatalog
                      .filter(item => item.category === category.name)
                      .map(item => (
                        <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <h4 className="font-semibold text-lg mb-2">{item.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{item.model} by {item.manufacturer}</p>
                          
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant={item.availability === 'available' ? 'default' : 'secondary'}>
                              {item.availability}
                            </Badge>
                            {item.rentalPrice && (
                              <span className="text-sm font-bold text-green-600">
                                ${item.rentalPrice.daily}/day
                              </span>
                            )}
                          </div>
                          
                          <Link href={`/equipment/specifications/${item.id}`}>
                            <Button size="sm" className="w-full">
                              View Details →
                            </Button>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="water" className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Water Damage Equipment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {equipmentCatalog
                    .filter(item => 
                      item.applications.some(app => 
                        app.toLowerCase().includes('water') || 
                        app.toLowerCase().includes('flood') ||
                        app.toLowerCase().includes('moisture')
                      )
                    )
                    .map(item => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{item.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{item.category}</p>
                        <Link href={`/equipment/specifications/${item.id}`}>
                          <Button size="sm" variant="outline" className="w-full">
                            View Specs
                          </Button>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>

            {/* Additional tab contents would follow similar pattern */}
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Need Equipment for Your Restoration Project?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get expert guidance on equipment selection and competitive rental rates for your disaster recovery needs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <DollarSign className="mr-2 h-5 w-5" />
              Get Rental Quote
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Speak to Equipment Specialist
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
