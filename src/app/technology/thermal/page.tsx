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
  title: 'Thermal Imaging Technology | FLIR Systems | Disaster Recovery Australia',
  description: 'Advanced FLIR thermal imaging cameras detect moisture, heat patterns, and structural issues invisible to the naked eye. Industry-leading infrared technology for comprehensive damage assessment.',
  keywords: 'thermal imaging, FLIR cameras, infrared detection, moisture mapping, heat detection, thermal scanning',
  openGraph: {
    title: 'Thermal Imaging Technology | Disaster Recovery Australia',
    description: 'See the invisible with our advanced FLIR thermal imaging systems.',
    images: ['/images/thermal-technology.jpg'],
  },
};

const applications = [
  {
    title: 'Moisture Detection',
    description: 'Identify hidden water damage behind walls, under floors, and in ceilings without invasive testing',
    icon: Droplets,
    benefits: ['Non-invasive inspection', 'Complete moisture mapping', 'Early leak detection']
  },
  {
    title: 'Electrical Inspection',
    description: 'Detect overheating electrical components, faulty wiring, and potential fire hazards',
    icon: Zap,
    benefits: ['Prevent electrical fires', 'Identify circuit overloads', 'Ensure safety compliance']
  },
  {
    title: 'Structural Analysis',
    description: 'Assess building envelope integrity, insulation gaps, and air infiltration points',
    icon: Shield,
    benefits: ['Energy efficiency', 'Structural integrity', 'Building performance']
  },
  {
    title: 'Mould Risk Assessment',
    description: 'Identify conditions conducive to mould growth through temperature and moisture patterns',
    icon: AlertTriangle,
    benefits: ['Early prevention', 'Health protection', 'Targeted remediation']
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
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
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
              <Thermometer className="h-3 w-3 mr-1" />
              FLIR Certified Technology
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Thermal Imaging Technology
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              See beyond the visible spectrum with our advanced FLIR thermal imaging systems. 
              Detect hidden moisture, electrical issues, and structural problems with pinpoint accuracy.
            </p>
            
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
              return (
                <Card key={idx} className="p-8 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{app.title}</h3>
                      <p className="text-gray-600 mb-4">{app.description}</p>
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

      {/* Technical Specifications */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              FLIR T1020 Specifications
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