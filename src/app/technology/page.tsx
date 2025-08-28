import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Cpu, Brain, Thermometer, Wind, Shield, Zap, 
  CheckCircle, ArrowRight, Award, TrendingUp,
  Camera, Gauge, Activity, Sparkles
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Advanced Restoration Technology | Disaster Recovery Australia',
  description: 'Cutting-edge technology for disaster recovery including AI detection, thermal imaging, and HEPA filtration systems. Industry-leading equipment for faster, more effective restoration.',
  keywords: 'AI damage detection, thermal imaging, HEPA filtration, restoration technology, disaster recovery equipment',
  openGraph: {
    title: 'Advanced Restoration Technology | Disaster Recovery Australia',
    description: 'Discover our cutting-edge restoration technology that delivers superior results.',
    images: ['/images/technology-hero.jpg'],
  },
};

const technologies = [
  {
    id: 'ai-detection',
    title: 'AI Detection Systems',
    description: 'Revolutionary artificial intelligence that identifies damage patterns invisible to the human eye, predicting issues before they escalate.',
    icon: Brain,
    href: '/technology/ai',
    color: 'from-purple-500 to-pink-500',
    stats: { accuracy: '99.7%', speed: '10x faster', coverage: '100%' },
    features: [
      'Predictive damage analysis',
      'Pattern recognition',
      'Automated reporting',
      'Real-time monitoring'
    ]
  },
  {
    id: 'thermal-imaging',
    title: 'Thermal Imaging',
    description: 'Advanced FLIR thermal cameras detect moisture, heat patterns, and structural issues through walls and surfaces.',
    icon: Thermometer,
    href: '/technology/thermal',
    color: 'from-orange-500 to-red-500',
    stats: { precision: '±0.1°C', range: '30m', resolution: '640x480' },
    features: [
      'Moisture mapping',
      'Heat loss detection',
      'Electrical fault finding',
      'Structural assessment'
    ]
  },
  {
    id: 'hepa-filtration',
    title: 'HEPA Air Scrubbing',
    description: 'Hospital-grade HEPA filtration systems remove 99.97% of airborne particles, ensuring safe air quality during restoration.',
    icon: Wind,
    href: '/technology/hepa',
    color: 'from-blue-500 to-cyan-500',
    stats: { filtration: '99.97%', airflow: '2000 CFM', particles: '0.3μm' },
    features: [
      'Mould spore removal',
      'Allergen elimination',
      'Odour neutralisation',
      'Air quality monitoring'
    ]
  }
];

const benefits = [
  {
    icon: Gauge,
    title: 'Faster Detection',
    description: 'Identify issues 10x faster than traditional methods'
  },
  {
    icon: Shield,
    title: 'Prevent Secondary Damage',
    description: 'Early detection prevents costly secondary damage'
  },
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    description: '24/7 monitoring with instant alerts and updates'
  },
  {
    icon: Award,
    title: 'Industry Certified',
    description: 'All equipment meets IICRC and Australian standards'
  }
];

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-8">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Industry-Leading Technology</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Advanced Restoration Technology
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Leveraging cutting-edge AI, thermal imaging, and HEPA filtration to deliver 
              faster, more accurate, and comprehensive disaster recovery solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg">
                  <Zap className="mr-2 h-5 w-5" />
                  Request Technology Demo
                </Button>
              </Link>
              <Link href="#technologies">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Explore Our Tech
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Technologies Grid */}
      <section id="technologies" className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Technology Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three pillars of advanced technology working together to provide 
              unmatched restoration results.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <Card key={tech.id} className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className="relative p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} mb-6`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{tech.title}</h3>
                    <p className="text-gray-600 mb-6">{tech.description}</p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(tech.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-gray-900">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {tech.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link href={tech.href}>
                      <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Technology Benefits
            </h2>
            <p className="text-xl text-gray-600">
              Why our technology makes the difference
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Experience the Future of Restoration
          </h2>
          <p className="text-xl mb-8 text-white/90">
            See our advanced technology in action with a free demonstration
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg">
                Schedule Technology Demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Contact Our Experts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}