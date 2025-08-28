import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wind, Shield, Filter, Gauge, Activity, Zap,
  CheckCircle, ArrowRight, AlertCircle, Heart,
  Sparkles, Cloud, Layers, BarChart3
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'HEPA Air Filtration Systems | Hospital-Grade Air Scrubbing | Disaster Recovery Australia',
  description: 'Hospital-grade HEPA filtration technology removes 99.97% of airborne particles including mould spores, allergens, and contaminants. EPA-approved air quality restoration.',
  keywords: 'HEPA filtration, air scrubbing, mould spore removal, air quality, negative air machines, air purification',
  openGraph: {
    title: 'HEPA Air Filtration Systems | Disaster Recovery Australia',
    description: 'Breathe easy with our hospital-grade HEPA air filtration technology.',
    images: ['/images/hepa-technology.jpg'],
  },
};

const features = [
  {
    title: 'Mould Spore Removal',
    description: 'Captures and eliminates 99.97% of mould spores as small as 0.3 microns',
    icon: Shield,
    effectiveness: '99.97%'
  },
  {
    title: 'Allergen Elimination',
    description: 'Removes dust, pollen, pet dander, and other common allergens from the air',
    icon: Heart,
    effectiveness: '99.9%'
  },
  {
    title: 'Odour Neutralisation',
    description: 'Advanced carbon filters eliminate smoke, chemical, and biological odours',
    icon: Cloud,
    effectiveness: '95%'
  },
  {
    title: 'Pathogen Reduction',
    description: 'Reduces airborne bacteria, viruses, and other harmful microorganisms',
    icon: AlertCircle,
    effectiveness: '99.95%'
  }
];

const specifications = {
  'Filter Type': 'True HEPA H13',
  'Efficiency': '99.97% @ 0.3 microns',
  'Airflow Rate': '500-2000 CFM',
  'Coverage Area': 'Up to 2500 sq ft',
  'Noise Level': '<65 dBA',
  'Pre-Filter': 'MERV 8 Pleated',
  'Carbon Filter': '15 lbs Activated Carbon',
  'Compliance': 'EPA, OSHA, IICRC S520'
};

const process = [
  {
    phase: 'Assessment',
    description: 'Air quality testing and contamination level evaluation',
    duration: '30 min',
    icon: Gauge
  },
  {
    phase: 'Containment',
    description: 'Establish negative pressure zones to prevent cross-contamination',
    duration: '1 hour',
    icon: Shield
  },
  {
    phase: 'Filtration',
    description: 'Deploy HEPA air scrubbers for continuous air cleaning',
    duration: '24-72 hours',
    icon: Filter
  },
  {
    phase: 'Verification',
    description: 'Post-treatment air quality testing and clearance certification',
    duration: '1 hour',
    icon: CheckCircle
  }
];

export default function HEPAFiltrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-cyan-900 to-slate-900 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
          {/* Particle animation effect */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 5}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-300 mb-8">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span>/</span>
              <Link href="/technology" className="hover:text-white transition">Technology</Link>
              <span>/</span>
              <span className="text-white">HEPA Filtration</span>
            </nav>

            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Wind className="h-3 w-3 mr-1" />
              Hospital-Grade Filtration
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              HEPA Air Filtration Systems
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Restore air quality to pristine conditions with our hospital-grade HEPA filtration systems. 
              Remove 99.97% of airborne contaminants including mould spores, allergens, and pathogens.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur">
                <div className="text-3xl font-bold text-blue-400">99.97%</div>
                <div className="text-sm text-gray-300">Filtration Rate</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur">
                <div className="text-3xl font-bold text-cyan-400">2000</div>
                <div className="text-sm text-gray-300">CFM Airflow</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur">
                <div className="text-3xl font-bold text-green-400">0.3μm</div>
                <div className="text-sm text-gray-300">Particle Size</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur">
                <div className="text-3xl font-bold text-purple-400">H13</div>
                <div className="text-sm text-gray-300">HEPA Grade</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/schedule">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  <Wind className="mr-2 h-5 w-5" />
                  Schedule Air Quality Test
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

        <style jsx>{`
          @keyframes float {
            from {
              transform: translateY(100vh) translateX(0);
            }
            to {
              transform: translateY(-100vh) translateX(100px);
            }
          }
        `}</style>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Air Purification
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multi-stage filtration system for complete air quality restoration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="p-6 hover:shadow-xl transition-all text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <CheckCircle className="h-4 w-4" />
                    {feature.effectiveness} Effective
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Air Quality Restoration Process
            </h2>
            <p className="text-xl text-gray-600">
              Systematic approach to achieving pristine air quality
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                      {idx + 1}
                    </div>
                    <Card className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Icon className="h-5 w-5 text-blue-500" />
                            {step.phase}
                          </h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                        <Badge variant="outline" className="ml-4">
                          {step.duration}
                        </Badge>
                      </div>
                    </Card>
                  </div>
                  {idx < process.length - 1 && (
                    <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500 opacity-30" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Multi-Stage Filtration */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              4-Stage Filtration System
            </h2>
            <p className="text-xl text-gray-600">
              Each stage targets specific contaminants for complete purification
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-4">
              {[
                { stage: 1, name: 'Pre-Filter', target: 'Large particles, dust, debris', efficiency: 'MERV 8' },
                { stage: 2, name: 'HEPA Filter', target: 'Fine particles, spores, allergens', efficiency: '99.97%' },
                { stage: 3, name: 'Carbon Filter', target: 'Odours, VOCs, chemicals', efficiency: '15 lbs' },
                { stage: 4, name: 'UV-C Light', target: 'Bacteria, viruses, pathogens', efficiency: '254nm' }
              ].map((filter) => (
                <Card key={filter.stage} className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-500 mb-2">Stage {filter.stage}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{filter.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{filter.target}</p>
                  <Badge className="bg-blue-100 text-blue-800">
                    {filter.efficiency}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Equipment Specifications
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
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Certification:</strong> All equipment meets EPA, OSHA, and IICRC S520 
                  standards for professional mould remediation and air quality restoration.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Breathe Clean, Healthy Air Again
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Don't compromise on air quality. Our HEPA filtration systems ensure your space 
            is safe, clean, and healthy for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg">
                Schedule Air Quality Assessment
              </Button>
            </Link>
            <Link href="/technology">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Explore All Technology
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}