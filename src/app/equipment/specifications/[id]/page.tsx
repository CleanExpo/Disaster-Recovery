import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { getEquipmentById, equipmentCatalog } from '@/lib/equipment-catalog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  ArrowLeft, 
  Download, 
  Phone, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Ruler,
  Shield,
  Settings,
  FileText,
  Calendar
} from 'lucide-react';

interface EquipmentPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: EquipmentPageProps): Promise<Metadata> {
  const equipment = getEquipmentById(params.id);
  
  if (!equipment) {
    return {
      title: 'Equipment Not Found',
      description: 'The requested equipment specification could not be found.',
    };
  }

  return {
    title: `${equipment.name} Specifications | ${equipment.manufacturer} ${equipment.model}`,
    description: `Detailed specifications for ${equipment.name}. ${equipment.description}`,
    keywords: `${equipment.name}, ${equipment.manufacturer}, ${equipment.model}, ${equipment.category}, disaster recovery equipment`,
    openGraph: {
      title: `${equipment.name} - Professional Restoration Equipment`,
      description: equipment.description,
      images: [equipment.primaryImage],
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return equipmentCatalog.map((equipment) => ({
    id: equipment.id,
  }));
}

export default function EquipmentSpecificationPage({ params }: EquipmentPageProps) {
  const equipment = getEquipmentById(params.id);

  if (!equipment) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-centre space-x-2 text-sm">
            <Link href="/equipment" className="text-gray-600 hover:text-blue-600">
              Equipment
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/equipment/catalog" className="text-gray-600 hover:text-blue-600">
              Catalog
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/equipment/${equipment.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-blue-600">
              {equipment.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{equipment.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/equipment/catalog">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Catalog
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Basic Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-0">
                {/* Main Image */}
                <div className="relative h-80 bg-gray-100">
                  <ImageWithFallback
                    src={equipment.primaryImage}
                    alt={equipment.name}
                    fill
                    className="object-cover rounded-t-lg"
                    fallback="/images/equipment/placeholder.jpg"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                    {equipment.availability === 'available' ? 'Available Now' : 
                     equipment.availability === 'limited' ? 'Limited Stock' : 'On Request'}
                  </Badge>
                </div>

                {/* Thumbnail Gallery */}
                {equipment.images.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto">
                    {equipment.images.map((image, index) => (
                      <div key={index} className="relative h-20 w-20 flex-shrink-0 bg-gray-100 rounded border">
                        <ImageWithFallback
                          src={image}
                          alt={`${equipment.name} view ${index + 1}`}
                          fill
                          className="object-cover rounded"
                          fallback="/images/equipment/placeholder.jpg"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Rental Pricing */}
                {equipment.rentalPrice && (
                  <div className="p-4 border-t">
                    <h3 className="font-semibold mb-3 flex items-centre">
                      <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                      Rental Pricing
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Daily Rate:</span>
                        <span className="font-bold text-green-600">${equipment.rentalPrice.daily}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weekly Rate:</span>
                        <span className="font-bold text-green-600">${equipment.rentalPrice.weekly}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Rate:</span>
                        <span className="font-bold text-green-600">${equipment.rentalPrice.monthly}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="p-4 border-t space-y-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Phone className="mr-2 h-4 w-4" />
                    Request Quote
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Spec Sheet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Information */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{equipment.name}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{equipment.manufacturer}</Badge>
                <Badge variant="outline">Model: {equipment.model}</Badge>
                <Badge variant="outline">{equipment.category}</Badge>
              </div>
              <p className="text-gray-700 text-lg">{equipment.description}</p>
            </div>

            {/* Detailed Tabs */}
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="safety">Safety</TabsTrigger>
              </TabsList>

              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-centre">
                      <Settings className="mr-2 h-5 w-5" />
                      Technical Specifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        {Object.entries(equipment.specifications).map(([key, value]) => (
                          <TableRow key={key}>
                            <TableCell className="font-medium capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </TableCell>
                            <TableCell className="text-right">
                              {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {/* Dimensions */}
                    {equipment.dimensions && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3 flex items-centre">
                          <Ruler className="mr-2 h-4 w-4" />
                          Dimensions & Weight
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {equipment.dimensions.length && (
                            <div>
                              <span className="text-gray-600">Length:</span>
                              <span className="ml-2 font-medium">{equipment.dimensions.length}</span>
                            </div>
                          )}
                          {equipment.dimensions.width && (
                            <div>
                              <span className="text-gray-600">Width:</span>
                              <span className="ml-2 font-medium">{equipment.dimensions.width}</span>
                            </div>
                          )}
                          {equipment.dimensions.height && (
                            <div>
                              <span className="text-gray-600">Height:</span>
                              <span className="ml-2 font-medium">{equipment.dimensions.height}</span>
                            </div>
                          )}
                          {equipment.dimensions.weight && (
                            <div>
                              <span className="text-gray-600">Weight:</span>
                              <span className="ml-2 font-medium">{equipment.dimensions.weight}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Performance Metrics */}
                    {equipment.performance && Object.keys(equipment.performance).length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Performance Metrics</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(equipment.performance).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-gray-600 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                              </span>
                              <span className="ml-2 font-medium">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {equipment.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Applications & Use Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {equipment.applications.map((application, index) => (
                        <div key={index} className="flex items-centre p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                          <span className="text-gray-700">{application}</span>
                        </div>
                      ))}
                    </div>

                    {/* Certifications */}
                    {equipment.certifications.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3 flex items-centre">
                          <Shield className="mr-2 h-4 w-4" />
                          Certifications & Standards
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {equipment.certifications.map((cert, index) => (
                            <Badge key={index} variant="secondary">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technical" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-centre">
                      <FileText className="mr-2 h-5 w-5" />
                      Technical Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">{equipment.technicalDetails}</p>
                    
                    {equipment.operationalRequirements && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3">Operational Requirements</h4>
                        <div className="space-y-2">
                          {equipment.operationalRequirements.map((req, index) => (
                            <div key={index} className="flex items-start">
                              <AlertCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="safety" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-centre">
                      <Shield className="mr-2 h-5 w-5" />
                      Safety Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {equipment.safetyFeatures && equipment.safetyFeatures.length > 0 ? (
                      <div className="space-y-3">
                        {equipment.safetyFeatures.map((feature, index) => (
                          <div key={index} className="flex items-centre p-3 bg-green-50 rounded-lg">
                            <Shield className="h-5 w-5 text-green-600 mr-3" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">Safety features information not available.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Related Equipment */}
            <Card>
              <CardHeader>
                <CardTitle>Related Equipment</CardTitle>
                <CardDescription>Other equipment you might need for your project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {equipmentCatalog
                    .filter(item => item.category === equipment.category && item.id !== equipment.id)
                    .slice(0, 3)
                    .map(item => (
                      <Link key={item.id} href={`/equipment/specifications/${item.id}`}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-sm mb-2">{item.name}</h4>
                            <p className="text-xs text-gray-600">{item.model}</p>
                            {item.rentalPrice && (
                              <p className="text-sm font-bold text-green-600 mt-2">
                                ${item.rentalPrice.daily}/day
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action Footer */}
      <section className="mt-16 py-12 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Rent the {equipment.name}?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Get this professional equipment delivered to your project site with expert support
          </p>
          <div className="flex flex-wrap gap-4 justify-centre">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Calendar className="mr-2 h-5 w-5" />
              Check Availability
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Phone className="mr-2 h-5 w-5" />
              1300 776 062
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
