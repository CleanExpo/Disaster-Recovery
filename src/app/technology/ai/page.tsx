import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Brain, Cpu, Activity, BarChart3, Shield, Zap,
  CheckCircle, ArrowRight, TrendingUp, Eye,
  Sparkles, Target, Gauge, AlertTriangle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'AI Detection Systems | Advanced Damage Analysis | Disaster Recovery Australia',
  description: 'Revolutionary AI-powered damage detection technology that identifies hidden issues, predicts problems, and accelerates restoration with 99.7% accuracy.',
  keywords: 'AI damage detection, machine learning restoration, predictive analysis, computer vision, damage assessment AI',
  openGraph: {
    title: 'AI Detection Systems | Disaster Recovery Australia',
    description: 'Experience 10x faster damage detection with our AI-powered analysis technology.',
    images: ['/images/ai-technology.jpg'],
  },
};

const capabilities = [
  {
    title: 'Computer Vision Analysis',
    description: 'Advanced image recognition identifies damage patterns invisible to the human eye',
    icon: Eye,
    metrics: '500+ damage patterns recognised'
  },
  {
    title: 'Predictive Modelling',
    description: 'Machine learning algorithms predict future damage progression and prevent escalation',
    icon: TrendingUp,
    metrics: '95% prediction accuracy'
  },
  {
    title: 'Real-Time Processing',
    description: 'Instant analysis and reporting with continuous monitoring capabilities',
    icon: Activity,
    metrics: '<0.3s processing time'
  },
  {
    title: 'Pattern Recognition',
    description: 'Identifies complex damage patterns across water, fire, and mould scenarios',
    icon: Target,
    metrics: '10,000+ scenarios trained'
  }
];

const features = [
  {
    category: 'Detection Capabilities',
    items: [
      'Hidden moisture detection',
      'Structural integrity analysis',
      'Mould growth prediction',
      'Electrical hazard identification',
      'Material degradation assessment',
      'Air quality analysis'
    ]
  },
  {
    category: 'Analysis Features',
    items: [
      '3D damage mapping',
      'Thermal pattern analysis',
      'Time-lapse progression tracking',
      'Multi-spectral imaging',
      'Contamination detection',
      'Risk assessment scoring'
    ]
  },
  {
    category: 'Reporting & Integration',
    items: [
      'Automated report generation',
      'Insurance-ready documentation',
      'Real-time alerts',
      'Cloud data synchronisation',
      'Mobile app integration',
      'API connectivity'
    ]
  }
];

const specifications = {
  'Processing Power': 'NVIDIA RTX 4090 GPU',
  'Algorithm Type': 'Deep Learning CNN',
  'Training Data': '1M+ damage scenarios',
  'Accuracy Rate': '99.7%',
  'Response Time': '<300ms',
  'Coverage Area': 'Up to 10,000 sq ft',
  'Integration': 'REST API & SDK',
  'Compliance': 'IICRC S500, AS/NZS 4360'
};

export default function AIDetectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-slate-900 to-slate-900 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
          {/* Neural network animation background */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <pattern id="neural" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="currentColor" className="text-purple-400">
                <animate attributeName="r" values="1;3;1" dur="3s" repeatCount="indefinite" />
              </circle>
            </pattern>
            <rect width="100%" height="100%" fill="url(#neural)" />
          </svg>
        </div>

        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-300 mb-8">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span>/</span>
              <Link href="/technology" className="hover:text-white transition">Technology</Link>
              <span>/</span>
              <span className="text-white">AI Detection</span>
            </nav>

            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Brain className="h-3 w-3 mr-1" />
              Powered by Machine Learning
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              AI Detection Systems
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Revolutionary artificial intelligence that sees what others can't. 
              Our deep learning algorithms analyse thousands of data points in seconds, 
              identifying damage patterns with superhuman accuracy.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur">
                <div className="text-3xl font-bold text-purple-400">99.7%</div>
                <div className="text-sm text-gray-300">Accuracy Rate</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur">
                <div className="text-3xl font-bold text-blue-400">10x</div>
                <div className="text-sm text-gray-300">Faster Detection</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur">
                <div className="text-3xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-gray-300">Monitoring</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur">
                <div className="text-3xl font-bold text-orange-400">500+</div>
                <div className="text-sm text-gray-300">Pattern Types</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/schedule">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Zap className="mr-2 h-5 w-5" />
                  Request AI Demo
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Speak to AI Specialist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              AI Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI system combines multiple advanced technologies to deliver 
              unparalleled damage detection and analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, idx) => {
              const Icon = capability.icon;
              return (
                <Card key={idx} className="p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{capability.title}</h3>
                  <p className="text-gray-600 mb-4">{capability.description}</p>
                  <div className="text-sm font-medium text-purple-600">{capability.metrics}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Feature Set
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for complete damage analysis
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((category, idx) => (
              <Card key={idx} className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-500" />
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How AI Detection Works
            </h2>
            <p className="text-xl text-gray-600">
              Four-step process for comprehensive damage analysis
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Data Capture',
                description: 'High-resolution imaging and sensor data collection across affected areas',
                icon: Camera
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Deep learning algorithms process data through trained neural networks',
                icon: Brain
              },
              {
                step: '03',
                title: 'Pattern Recognition',
                description: 'Identification of damage patterns and prediction of progression',
                icon: Target
              },
              {
                step: '04',
                title: 'Report Generation',
                description: 'Automated creation of detailed reports with actionable insights',
                icon: BarChart3
              }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-bold text-purple-100 mb-4">{step.step}</div>
                <Card className="p-6 h-full">
                  <step.icon className="h-10 w-10 text-purple-500 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </Card>
                {idx < 3 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 h-8 w-8 text-purple-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Technical Specifications
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
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            See AI Detection in Action
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Discover how our AI technology can transform your restoration process 
            with a personalised demonstration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg">
                Schedule AI Demo
              </Button>
            </Link>
            <Link href="/technology">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Explore More Tech
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}