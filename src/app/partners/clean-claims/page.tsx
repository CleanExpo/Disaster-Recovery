import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Shield, Globe, TrendingUp, Users, Zap, Award, 
  CheckCircle, ArrowRight, ExternalLink, Building,
  Target, Rocket, BarChart3, HandshakeIcon, DollarSign, Mail
} from 'lucide-react';
import type { Metadata } from 'next';

// Metadata is now generated dynamically using generateMetadata function below
// to avoid conflict between static metadata and generateMetadata exports

export default function CleanClaimsPartnershipPage() {
  const partnershipBenefits = [
    {
      icon: Globe,
      title: 'Global Expansion',
      description: 'Clean Claims enters Asia-Pacific market through strategic Australian partnership'
    },
    {
      icon: Zap,
      title: 'Technology Integration',
      description: 'Cutting-edge documentation and monitoring systems for 115,350+ contractors'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Error-proof documentation ensuring perfect compliance and faster payments'
    },
    {
      icon: TrendingUp,
      title: 'Market Leadership',
      description: 'Combined expertise to dominate $4.2B Australian restoration market'
    }
  ];

  const cleanClaimsAdvantages = [
    'Founded by Lane Larsen - Built and sold 4 restoration companies',
    'Proven software reducing documentation time by 95%',
    'Remote monitoring technology perfect for Australian geography',
    'Integration with major platforms: magicplan, EcoClaim, Xcelerate',
    'Trusted by leading US restoration contractors',
    'Commitment to transparency and accuracy'
  ];

  const australianOpportunity = [
    {
      metric: '$4.2B',
      label: 'Australian Market Size',
      description: 'Annual restoration industry value'
    },
    {
      metric: '23.7M',
      label: 'Properties at Risk',
      description: 'Australian properties in flood zones'
    },
    {
      metric: '115,350',
      label: 'Contractors',
      description: 'Fragmented market ready for consolidation'
    },
    {
      metric: '2%',
      label: 'Digital Adoption',
      description: 'Massive opportunity for technology'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-6">
              <HandshakeIcon className="h-4 w-4" />
              Strategic Technology Partnership
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Clean Claims × 
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Disaster Recovery Australia
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Leading US restoration technology company partners with National Recovery Partners 
              to revolutionize the Australian disaster recovery industry
            </p>

            {/* Partner Logos */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <Image
                  src="/images/logos/3D Clean Claims Logo.png"
                  alt="Clean Claims - Strategic Technology Partner"
                  width={200}
                  height={80}
                  className="h-20 w-auto object-contain"
                  priority
                />
              </div>
              <div className="text-4xl text-white font-bold">×</div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <Image
                  src="/images/logos/dr-logo.svg"
                  alt="Disaster Recovery Australia"
                  width={200}
                  height={80}
                  className="h-20 w-auto object-contain"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Partner With Us
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://www.cleanclaims.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition"
              >
                Visit Clean Claims
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Clean Claims Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                About Clean Claims
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Founded by Lane Larsen, who successfully built and sold 4 restoration companies, 
                Clean Claims is revolutionizing the restoration industry with cutting-edge 
                documentation and monitoring technology.
              </p>
              <p className="text-gray-300 mb-8 text-lg">
                Their mission: "Streamline Your Restoration Process & Get Paid Faster" 
                perfectly aligns with our vision for the Australian market.
              </p>
              
              <div className="space-y-4">
                {cleanClaimsAdvantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
                <div className="mb-6">
                  <div className="text-sm text-blue-400 uppercase tracking-wider mb-2">Leadership</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Lane Larsen</h3>
                  <p className="text-gray-300">
                    Founder & President of Clean Claims
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Experience</div>
                    <p className="text-white">Built & sold 4 restoration companies</p>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Vision</div>
                    <p className="text-white">Transform the global restoration industry through technology</p>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Location</div>
                    <p className="text-white">Utah, United States</p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-500/10 rounded-lg">
                  <p className="text-sm text-blue-300 italic">
                    "We're excited to partner with Disaster Recovery Australia to bring 
                    our proven technology to the Asia-Pacific market."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Strategic Partnership Benefits
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Combining US innovation with Australian market opportunity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:scale-105 transition-transform"
                >
                  <Icon className="h-12 w-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Australian Market Opportunity */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              The Australian Opportunity
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Why Clean Claims is investing in the Australian disaster recovery market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {australianOpportunity.map((stat, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.metric}
                </div>
                <div className="text-lg font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-6">
              Technology Integration Roadmap
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <h4 className="text-lg font-semibold text-white">Phase 1: Integration</h4>
                </div>
                <p className="text-gray-300">
                  Integrate Clean Claims documentation system with NRP platform for seamless contractor onboarding
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <h4 className="text-lg font-semibold text-white">Phase 2: Deployment</h4>
                </div>
                <p className="text-gray-300">
                  Roll out remote monitoring technology across Australian contractor network
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <h4 className="text-lg font-semibold text-white">Phase 3: Expansion</h4>
                </div>
                <p className="text-gray-300">
                  Joint expansion into New Zealand and broader Asia-Pacific markets
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Combined Technology Stack
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              World-class restoration technology meets AI-powered distribution
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/50 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Image
                  src="/images/logos/3D Clean Claims Logo.png"
                  alt="Clean Claims"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                Clean Claims Technology
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Field Documentation & Remote Monitoring</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Wi-Fi Hubs & BLE Antennas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Wireless Moisture Meters</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Process Enforcement Software</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Integration APIs (magicplan, EcoClaim)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Shield className="h-10 w-10 text-purple-400" />
                NRP Platform Technology
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">AI-Powered Claims Matching</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">30,000+ SEO Location Pages</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">OpenAI Fraud Detection</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Stripe Payment Processing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">IICRC Compliance Systems</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-semibold">
                Combined Platform Value: $3.2M+ in Technology Investment
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Details */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-12 border border-blue-500/20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Investment & Partnership Structure
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Clean Claims' strategic investment accelerates Australian market domination
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Capital Investment</h3>
                <p className="text-gray-300">
                  Strategic funding for Australian market expansion and contractor acquisition
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Technology License</h3>
                <p className="text-gray-300">
                  Exclusive Australian rights to Clean Claims documentation platform
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Strategic Guidance</h3>
                <p className="text-gray-300">
                  Lane Larsen's expertise guiding Australian operations and growth
                </p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-black/30 rounded-xl">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Partnership Type</div>
                  <div className="text-2xl font-bold text-white">Strategic Technology Partner</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Investment Round</div>
                  <div className="text-2xl font-bold text-white">Series A Lead Investor</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Market Focus</div>
                  <div className="text-2xl font-bold text-white">Australia & Asia-Pacific</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-t from-black/50 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Revolution
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            With Clean Claims as our strategic partner, we're building the future of 
            disaster recovery in Australia. Be part of the transformation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contractor/apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Become a Contractor
              <Users className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Investment Inquiries
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Contact Information */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-8 text-gray-300">
            <a
              href="https://www.cleanclaims.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <Globe className="h-5 w-5" />
              www.cleanclaims.com
            </a>
            <a
              href="mailto:info@cleanclaims.com"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <Mail className="h-5 w-5" />
              info@cleanclaims.com
            </a>
            <span className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Utah, United States
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

// Add JSON-LD structured data for SEO
export const generateMetadata = (): Metadata => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Partnership',
    name: 'Clean Claims × Disaster Recovery Australia Partnership',
    description: 'Strategic technology partnership for Australian disaster recovery market',
    partner: [
      {
        '@type': 'Organization',
        name: 'Clean Claims',
        url: 'https://www.cleanclaims.com',
        founder: {
          '@type': 'Person',
          name: 'Lane Larsen',
          jobTitle: 'Founder & President'
        }
      },
      {
        '@type': 'Organization',
        name: 'Disaster Recovery Australia',
        url: 'https://disasterrecovery.com.au'
      }
    ],
    location: {
      '@type': 'Country',
      name: 'Australia'
    }
  };

  return {
    title: 'Clean Claims Partnership | Strategic US Technology Partner | Disaster Recovery Australia',
    description: 'Clean Claims partners with Disaster Recovery Australia to bring cutting-edge restoration technology and documentation systems to the Australian market. Strategic investment and technology partnership.',
    keywords: 'Clean Claims, Lane Larsen, restoration software, disaster recovery partnership, US investment Australia, restoration technology, claims documentation, remote monitoring',
    openGraph: {
      title: 'Clean Claims × Disaster Recovery Australia Partnership',
      description: 'Strategic partnership bringing US restoration technology to Australian disaster recovery market',
      images: ['/images/logos/3D Clean Claims Logo.png'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Clean Claims Partners with Disaster Recovery Australia',
      description: 'Major US restoration technology company invests in Australian market expansion',
    },
    alternates: {
      canonical: 'https://disasterrecovery.com.au/partners/clean-claims',
    },
    other: {
      'script:ld+json': JSON.stringify(jsonLd)
    }
  };
};