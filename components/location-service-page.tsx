'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Phone, 
  Clock, 
  Shield, 
  MapPin, 
  CheckCircle, 
  AlertTriangle,
  Users,
  TrendingUp,
  Home,
  Building,
  Factory,
  ChevronRight,
  Star,
  Award,
  Zap,
  FileText
} from 'lucide-react';

interface LocationServicePageProps {
  data: any; // Using any for now to match the generator output
}

export default function LocationServicePageComponent({ data }: LocationServicePageProps) {
  // Extract data with fallbacks
  const title = data.h1 || data.title || 'Disaster Recovery Services';
  const description = data.metaDescription || '';
  const city = data.location?.city || 'Your Area';
  const suburbs = data.location?.suburbs || [];
  
  const getServiceIcon = (title: string) => {
    if (title.includes('Water')) return '💧';
    if (title.includes('Fire')) return '🔥';
    if (title.includes('Storm')) return '⛈️';
    if (title.includes('Mould')) return '🦠';
    if (title.includes('Flood')) return '🌊';
    return '🚨';
  };

  const serviceIcon = getServiceIcon(title);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <span className="text-6xl mb-6 block">{serviceIcon}</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                {description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/whos-first/${data.service}`}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Emergency Response
                </Link>
                <Link
                  href="/insurance-decoder"
                  className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <Shield className="w-5 h-5" />
                  Insurance Help
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Response Banner */}
      <section className="bg-red-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <AlertTriangle className="w-8 h-8" />
            <p className="text-lg font-semibold">{data.emergencyResponse}</p>
            <Phone className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-blue-600" />
              Service Areas in {data.city}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.suburbs.map((suburb, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                  <p className="font-medium">{suburb}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              Our Proven Process
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-600"
                >
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-600" />
              Why Choose Our {data.city} Team
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.whyChooseUs.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <Star className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{reason}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Insurance Information */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-600" />
                Insurance Claims Assistance
              </h2>
              <p className="text-lg text-gray-700 mb-6">{data.insuranceInfo}</p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Documentation</h3>
                  <p className="text-sm text-gray-600">Complete photo and video documentation for your claim</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Direct Billing</h3>
                  <p className="text-sm text-gray-600">We work directly with all major insurers</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Fast Processing</h3>
                  <p className="text-sm text-gray-600">Expedited claims with our insurance partnerships</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Property Types We Service
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <Home className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Residential</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Houses & Apartments</li>
                  <li>• Townhouses & Units</li>
                  <li>• Strata Properties</li>
                  <li>• Heritage Homes</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <Building className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Commercial</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Offices & Retail</li>
                  <li>• Restaurants & Cafes</li>
                  <li>• Hotels & Motels</li>
                  <li>• Medical Facilities</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <Factory className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Industrial</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Warehouses</li>
                  <li>• Factories</li>
                  <li>• Storage Facilities</li>
                  <li>• Distribution Centers</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {data.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Services & Locations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Related Services</h3>
              <div className="space-y-3">
                {data.relatedServices.map((service, index) => (
                  <Link
                    key={index}
                    href={service.link}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <ChevronRight className="w-4 h-4" />
                    {service.name}
                  </Link>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Nearby Locations</h3>
              <div className="space-y-3">
                {data.nearbyLocations.map((location, index) => (
                  <Link
                    key={index}
                    href={location.link}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <MapPin className="w-4 h-4" />
                    {location.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need {data.service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} in {data.city}?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Available 24/7 for emergency response. Insurance approved contractors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/whos-first/${data.service}`}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Now for Help
              </Link>
              <Link
                href="/insurance-decoder"
                className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Insurance Assistance
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}