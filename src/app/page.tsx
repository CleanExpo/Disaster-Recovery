import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { OptimizedImage } from '@/components/optimized-image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  CheckCircle2,
  Building,
  Users,
  Award,
  Zap
} from 'lucide-react';

// Lazy load heavy components
const TestimonialsSection = dynamic(() => import('@/components/testimonials'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

const LocationsGrid = dynamic(() => import('@/components/locations-grid'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

export const metadata: Metadata = {
  title: 'Disaster Recovery Australia | 24/7 Emergency Restoration Services',
  description: 'IICRC certified disaster recovery specialists. 24/7 emergency response for water, fire, mould damage. Insurance approved. Get help now.',
  openGraph: {
    title: 'Disaster Recovery Australia | 24/7 Emergency Restoration',
    description: 'IICRC certified specialists. Immediate emergency response across Australia.',
    images: [{ url: '/images/hero-optimized.webp', width: 1200, height: 630, alt: 'Disaster Recovery Australia' }],
  },
};

export default function OptimizedHomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EmergencyService',
    name: 'Disaster Recovery Australia',
    description: 'IICRC certified emergency disaster recovery and restoration services',
    url: 'https://disasterrecovery.com.au',
    telephone: '',
    email: 'help@disasterrecovery.com.au',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -27.4698,
      longitude: 153.0251,
    },
    areaServed: 'Australia',
    availableLanguage: 'English',
    priceRange: '$$$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Disaster Recovery Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Water Damage Restoration' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fire Damage Restoration' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mould Remediation' } },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Skip to content link for accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded">
        Skip to main content
      </a>

      {/* Critical Hero Section - Above the fold */}
      <section className="relative min-h-[600px] bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-6" aria-hidden="true">
              <AlertTriangle className="h-10 w-10" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              24/7 Emergency Disaster Recovery
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              IICRC Certified Restoration Specialists Across Australia
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/get-help">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-6 text-lg"
                  aria-label="Get emergency help now"
                >
                  Get Emergency Help Now
                </Button>
              </Link>
              <Link href="/insurance-claims">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-900 font-bold px-8 py-6 text-lg"
                  aria-label="Insurance claim assistance"
                >
                  Insurance Claims Help
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <Shield className="h-8 w-8 mx-auto mb-2" aria-hidden="true" />
                <p className="font-semibold">IICRC Certified</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <Clock className="h-8 w-8 mx-auto mb-2" aria-hidden="true" />
                <p className="font-semibold">30-60min Response</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2" aria-hidden="true" />
                <p className="font-semibold">Insurance Approved</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <Zap className="h-8 w-8 mx-auto mb-2" aria-hidden="true" />
                <p className="font-semibold">24/7 Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main id="main" role="main">
        {/* Emergency Services Grid */}
        <section className="py-16 bg-gray-50" aria-labelledby="services-heading">
          <div className="container mx-auto px-4">
            <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-center mb-12">
              Emergency Restoration Services
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: 'Water Damage',
                  description: 'Immediate water extraction and drying',
                  href: '/services/water-damage',
                  icon: '💧',
                },
                {
                  title: 'Fire & Smoke',
                  description: 'Complete fire damage restoration',
                  href: '/services/fire-damage',
                  icon: '🔥',
                },
                {
                  title: 'Mould Removal',
                  description: 'Safe mould remediation services',
                  href: '/services/mould-remediation',
                  icon: '🦠',
                },
              ].map((service) => (
                <Card key={service.title} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4" aria-hidden="true">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link 
                    href={service.href} 
                    className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center"
                    aria-label={`Learn more about ${service.title} services`}
                  >
                    Learn More 
                    <span aria-hidden="true" className="ml-2">→</span>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16" aria-labelledby="why-us-heading">
          <div className="container mx-auto px-4">
            <h2 id="why-us-heading" className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Our IICRC Certified Professionals
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Award,
                  title: '200+ Hours Training',
                  description: 'Not just 3 days like others',
                },
                {
                  icon: Users,
                  title: 'Independent Experts',
                  description: 'Owner-operated businesses',
                },
                {
                  icon: Shield,
                  title: 'Fully Insured',
                  description: '$20M public liability',
                },
                {
                  icon: Building,
                  title: 'Industry Leaders',
                  description: 'RIA & IICRC members',
                },
              ].map((item, index) => (
                <Card key={index} className="p-6 text-center">
                  <item.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" aria-hidden="true" />
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/why-independent-professionals">
                <Button size="lg">
                  See Our Qualifications
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Lazy loaded sections below the fold */}
        <TestimonialsSection />
        <LocationsGrid />
      </main>

      {/* Footer CTA */}
      <section className="bg-orange-500 text-white py-12" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-3xl font-bold mb-4">
            Need Emergency Help Now?
          </h2>
          <p className="text-xl mb-8">
            Get connected with certified professionals in your area
          </p>
          <Link href="/get-help">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-orange-500 hover:bg-gray-100"
            >
              Get Immediate Assistance
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}