import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Thermometer, Camera, Eye, Gauge, Shield, Zap,
  CheckCircle, ArrowRight, AlertTriangle, Droplets,
  Activity, Target, Map, Layers
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Certified Thermal Imaging Analysis | Level 1/2 Thermography | Disaster Recovery',
  description: 'Professional thermography services by certified Level 1/2 technicians. Electrical hot spot analysis, building envelope assessment, and quantitative thermal reporting. Only ~15 certified specialists nationally.',
  keywords: 'certified thermal imaging, Level 1 thermography, electrical hot spot detection, building envelope analysis, quantitative thermal analysis, thermography certification',
  openGraph: {
    title: 'Certified Thermal Imaging Analysis | Disaster Recovery',
    description: 'Beyond basic moisture detection - certified thermography analysis by qualified specialists.',
    images: ['/images/thermal-technology.jpg'] } };

const applications = [
  {
    title: 'Electrical Hot Spot Analysis',
    description: 'Certified Level 1/2 Thermography for electrical component analysis, circuit load assessment, and predictive maintenance reporting',
    icon: Zap,
    benefits: ['Certified electrical analysis', 'Quantitative temperature reporting', 'Regulatory compliance documentation'],
    certification: 'Requires: Level 1/2 Thermography Certification (ISO 9712)'
  },
  {
    title: 'Building Envelope Assessment',
    description: 'Professional thermal bridging analysis, insulation performance evaluation, and energy loss quantification',
    icon: Shield,
    benefits: ['Quantitative thermal analysis', 'Energy audit compliance', 'Professional reporting standards'],
    certification: 'Requires: Building Performance Thermography Training'
  },
  {
    title: 'Advanced Moisture Analysis',
    description: 'Beyond basic detection - quantitative moisture analysis with psychrometric calculations and vapor pressure assessment',
    icon: Droplets,
    benefits: ['Scientific moisture analysis', 'Detailed drying protocols', 'Insurance-grade documentation'],
    certification: 'Standard: Basic moisture detection (all technicians)'
  },
  {
    title: 'Specialised Thermal Reporting',
    description: 'Comprehensive thermal analysis reports meeting professional and regulatory standards for specialised applications',
    icon: AlertTriangle,
    benefits: ['Professional certification', 'Legal documentation', 'Insurance acceptance'],
    certification: 'Requires: Certified Thermographer (Level 1 minimum)'
  }
];

const specifications = {
  'Camera Model': 'FLIR T1020',
  'Resolution': '1024 x 768 pixels',
  'Thermal Sensitivity': '<20mK @ 30°C',
  'Temperature Range': '-40°C to +2000°C',
  'Accuracy': '±1°C or ±1%',
  'Field of View': '28° × 21°',
  'Frame Rate': '30 Hz',
  'Spectral Range': '7.5-14 μm'
};

export default function ThermalImagingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-slate-900 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-centre opacity-20" />
          {/* Heat map effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-transparent animate-pulse" />
        </div>

        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-300 mb-8">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span>/</span>
              <Link href="/technology" className="hover:text-white transition">Technology</Link>
              <span>/</span>
              <span className="text-white">Thermal Imaging</span>
            </nav>

            <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">
              <Shield className="h-3 w-3 mr-1" />
              Certified Level 1/2 Thermography
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Certified Thermal Analysis
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Beyond basic moisture detection - professional thermography by certified specialists. 
              Only ~15 contractors nationally hold Level 1/2 Thermography certification for electrical analysis and building envelope assessment.
            </p>
            
            <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    <strong>Important:</strong> Basic thermal cameras are common restoration tools for moisture detection. 
                    Specialised thermal analysis requires certified Level 1/2 Thermography training for electrical systems and quantitative building envelope assessment.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur">
                <div className="text-3xl font-bold text-orange-400">±0.1°C</div>
                <div className="text-sm text-gray-300">Precision</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur">
                <div className="text-3xl font-bold text-red-400">1024x768</div>
                <div className="text-sm text-gray-300">Resolution</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur">
                <div className="text-3xl font-bold text-yellow-400">30m</div>
                <div className="text-sm text-gray-300">Range</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur">
                <div className="text-3xl font-bold text-green-400">100%</div>
                <div className="text-sm text-gray-300">Non-Invasive</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/schedule">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  <Camera className="mr-2 h-5 w-5" />
                  Book Thermal Inspection
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Thermal Imaging Applications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive damage detection across multiple scenarios
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {applications.map((app, idx) => {
              const Icon = app.icon;
              const isSpecialized = app.certification.includes('Requires:');
              return (
                <Card key={idx} className="p-8 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center ${
                      isSpecialized 
                        ? 'bg-gradient-to-br from-purple-500 to-indigo-500' 
                        : 'bg-gradient-to-br from-orange-500 to-red-500'
                    }`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{app.title}</h3>
                        {isSpecialized && (
                          <Badge className="bg-purple-100 text-purple-800 text-xs">
                            Specialist
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{app.description}</p>
                      
                      {/* Certification Requirement */}
                      <div className={`p-3 rounded-md mb-4 ${
                        isSpecialized 
                          ? 'bg-purple-50 border border-purple-200' 
                          : 'bg-green-50 border border-green-200'
                      }`}>
                        <p className={`text-xs font-medium ${
                          isSpecialized ? 'text-purple-800' : 'text-green-800'
                        }`}>
                          {app.certification}
                        </p>
                      </div>

                      <ul className="space-y-2">
                        {app.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Thermal Imaging Process
            </h2>
            <p className="text-xl text-gray-600">
              Professional thermal inspection in four steps
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Site Preparation',
                description: 'Temperature stabilisation and area mapping for optimal imaging conditions',
                icon: Map
              },
              {
                step: '2',
                title: 'Thermal Scanning',
                description: 'Systematic scanning with FLIR cameras to capture thermal signatures',
                icon: Camera
              },
              {
                step: '3',
                title: 'Image Analysis',
                description: 'Expert interpretation of thermal patterns and anomaly identification',
                icon: Eye
              },
              {
                step: '4',
                title: 'Report & Action',
                description: 'Detailed thermal report with recommendations and priority areas',
                icon: Layers
              }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <Card className="p-6 h-full">
                  <step.icon className="h-10 w-10 text-orange-500 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Education Section */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Thermal Imaging Certification
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Standard Service */}
              <Card className="p-6">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Gauge className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Standard Moisture Detection</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Basic thermal cameras used by 95% of restoration technicians for moisture identification and general inspection.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Available from all technicians</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Good for moisture detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Visual temperature differences</span>
                  </li>
                </ul>
              </Card>

              {/* Specialised Service */}
              <Card className="p-6 border-2 border-purple-200 relative">
                <Badge className="absolute -top-3 left-6 bg-purple-600">Specialist Required</Badge>
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Certified Thermal Analysis</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Level 1/2 Thermography certification required for electrical analysis and quantitative building assessment.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span>~15 contractors nationally</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span>Electrical hot spot analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span>Quantitative reporting</span>
                  </li>
                </ul>
              </Card>

              {/* Licensed Service */}
              <Card className="p-6">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Licensed Applications</h3>
                <p className="text-sm text-gray-600 mb-4">
                  State licensing required for electrical system work and regulatory compliance applications.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-red-500" />
                    <span>Licensed electrician partnership</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-red-500" />
                    <span>Regulatory compliance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-red-500" />
                    <span>Legal documentation</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Questions to Ask */}
            <Card className="p-8 bg-amber-50 border border-amber-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Questions to Ask Your Contractor
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">For Electrical Analysis:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>"Do you hold Level 1 or 2 Thermography certification?"</li>
                    <li>"Can you provide quantitative temperature analysis?"</li>
                    <li>"Are you trained in electrical thermal patterns?"</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">For Building Assessment:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>"Do you provide building envelope thermal analysis?"</li>
                    <li>"Can you calculate thermal bridging coefficients?"</li>
                    <li>"Is your report suitable for energy audits?"</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Professional Thermography Equipment
            </h2>
            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-700">{key}</span>
                    <span className="text-gray-900 font-semibold">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Note:</strong> Our thermal imaging equipment exceeds IICRC S500 standards 
                  and is calibrated monthly for optimal accuracy.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <Thermometer className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Discover Hidden Damage Today
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Don't let invisible damage become a major problem. Schedule your professional 
            thermal imaging inspection now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 text-lg">
                Schedule Thermal Inspection
              </Button>
            </Link>
            <Link href="/technology">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                View All Technology
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}