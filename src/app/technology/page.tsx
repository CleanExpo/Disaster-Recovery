import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Cpu, Brain, Camera, Shield, Activity, Zap,
  CheckCircle, ArrowRight, Gauge, Eye,
  Sparkles, Target, Wind, ThermometerSun
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Advanced Technology | Disaster Recovery Australia',
  description: 'Industry-leading restoration technology including AI damage detection, thermal imaging, and HEPA filtration systems for superior disaster recovery results.',
};

export default function TechnologyPage() {
  const technologies = [
    {
      title: 'AI Damage Detection',
      description: 'Revolutionary artificial intelligence that instantly identifies and assesses damage patterns with 99.9% accuracy.',
      icon: Brain,
      features: [
        'Real-time damage assessment',
        'Predictive restoration timelines',
        'Automated documentation',
        'Insurance-ready reporting'
      ],
      link: '/technology/ai',
      colour: 'from-purple-500 to-indigo-600',
      stats: { accuracy: '99.9%', speed: '60x faster', coverage: '100%' }
    },
    {
      title: 'Thermal Imaging',
      description: 'Advanced FLIR thermal cameras detect hidden moisture and structural issues invisible to the naked eye.',
      icon: ThermometerSun,
      features: [
        'Hidden moisture detection',
        'Structural integrity analysis',
        'Electrical hazard identification',
        'Complete damage mapping'
      ],
      link: '/technology/thermal',
      colour: 'from-orange-500 to-red-600',
      stats: { detection: '100%', depth: '10cm+', resolution: '640x480' }
    },
    {
      title: 'HEPA Air Filtration',
      description: 'Hospital-grade HEPA systems remove 99.97% of airborne contaminants, ensuring safe air quality.',
      icon: Wind,
      features: [
        '99.97% particle removal',
        'Mould spore elimination',
        'Odour neutralization',
        'Real-time air monitoring'
      ],
      link: '/technology/hepa',
      colour: 'from-cyan-500 to-blue-600',
      stats: { filtration: '99.97%', coverage: '5000m³/hr', particles: '0.3μm' }
    }
  ];

  const benefits = [
    {
      icon: Gauge,
      title: 'Faster Recovery',
      description: 'Technology reduces restoration time by up to 60%'
    },
    {
      icon: Shield,
      title: 'Superior Accuracy',
      description: '99.9% accurate damage assessment and documentation'
    },
    {
      icon: Activity,
      title: 'Real-Time Monitoring',
      description: '24/7 remote monitoring of drying and restoration progress'
    },
    {
      icon: Target,
      title: 'Precision Results',
      description: 'Targeted restoration with minimal disruption to property'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70" />
        
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Industry-Leading Technology
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Advanced Restoration
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Technology Solutions
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Combining cutting-edge AI, thermal imaging, and purification systems to deliver 
              the fastest, most accurate disaster recovery in Australia.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/book-service">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Get Technology Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Learn More
                  <Eye className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Faster Recovery', value: '60%', icon: Zap },
              { label: 'Accuracy Rate', value: '99.9%', icon: Target },
              { label: 'Properties Saved', value: '10K+', icon: Shield },
              { label: 'Available 24/7', value: '365', icon: Activity }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-2">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Technology Suite
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three powerful systems working together to deliver unmatched restoration results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {technologies.map((tech, idx) => (
              <Card key={idx} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.colour} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.colour} text-white mb-6`}>
                    <tech.icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {tech.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {tech.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {tech.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-6 pt-6 border-t border-gray-100">
                    {Object.entries(tech.stats).map(([key, value], sidx) => (
                      <div key={sidx} className="text-center">
                        <div className="text-lg font-bold text-gray-900">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href={tech.link}>
                    <Button className="w-full group-hover:shadow-lg transition-all">
                      Explore {tech.title.split(' ')[0]}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technology Advantages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              How our advanced technology delivers superior results for every restoration project
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience the Technology Difference
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              See how our advanced technology can save your property and reduce restoration time by 60%
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/book-service">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Schedule Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Contact Expert
                  <Cpu className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}