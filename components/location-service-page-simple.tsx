'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, Shield, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';

export default function LocationServicePageComponent({ data }: { data: any }) {
  // Parse the title to extract service type and location
  const title = data.h1 || 'Disaster Recovery Services';
  const description = data.metaDescription || '';
  
  // Extract city name from data
  const location = data.location || {};
  const city = location.city || 'Your Area';
  const suburbs = data.content?.serviceAreas || location.suburbs || [];
  
  // Determine service icon based on title
  const getServiceIcon = () => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('water')) return '💧';
    if (titleLower.includes('fire')) return '🔥';
    if (titleLower.includes('storm')) return '⛈️';
    if (titleLower.includes('mould') || titleLower.includes('mold')) return '🦠';
    if (titleLower.includes('flood')) return '🌊';
    return '🚨';
  };

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
            className="text-center"
          >
            <span className="text-6xl mb-6 block">{getServiceIcon()}</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/whos-first"
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
          </motion.div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-red-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <AlertTriangle className="w-8 h-8" />
            <p className="text-lg font-semibold">
              24/7 Emergency Response Available - Insurance Approved Contractors
            </p>
            <Phone className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Service Areas */}
      {suburbs.length > 0 && (
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
                Service Areas in {city}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {suburbs.map((suburb, index) => (
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
      )}

      {/* Main Content from Generator */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            {data.content?.intro && (
              <p className="text-xl text-gray-700 mb-8">{data.content.intro}</p>
            )}
            
            {/* Key Features */}
            {data.content?.keyFeatures && data.content.keyFeatures.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Why Choose Our Services</h2>
                <ul className="space-y-2">
                  {data.content.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Emergency Response */}
            {data.content?.emergencyResponse && (
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                  Emergency Response
                </h3>
                <p>{data.content.emergencyResponse}</p>
              </div>
            )}
            
            {/* Local Knowledge */}
            {data.content?.localKnowledge && data.content.localKnowledge.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Local Expertise</h3>
                <ul className="space-y-2">
                  {data.content.localKnowledge.map((knowledge, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{knowledge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Common Issues */}
            {data.content?.commonIssues && data.content.commonIssues.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Common Issues We Handle</h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {data.content.commonIssues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Insurance Partners */}
            {data.content?.insurancePartners && data.content.insurancePartners.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  Insurance Partners
                </h3>
                <p className="mb-4">We work directly with all major insurance companies:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.content.insurancePartners.map((partner, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded text-center font-medium">
                      {partner}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Testimonial */}
            {data.content?.testimonial && (
              <div className="bg-gray-50 p-6 rounded-lg mb-8 border-l-4 border-blue-600">
                <p className="italic text-lg mb-3">"{data.content.testimonial.text}"</p>
                <p className="font-semibold">- {data.content.testimonial.author}, {data.content.testimonial.suburb}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {data.faqs.map((faq, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Link
              href="/guides/water-damage"
              className="bg-blue-50 p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold mb-2">Water Damage Guide</h3>
              <p className="text-gray-600 text-sm">Complete recovery information</p>
            </Link>
            <Link
              href="/guides/fire-damage"
              className="bg-red-50 p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold mb-2">Fire Damage Guide</h3>
              <p className="text-gray-600 text-sm">Fire and smoke restoration</p>
            </Link>
            <Link
              href="/guides/storm-damage"
              className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold mb-2">Storm Damage Guide</h3>
              <p className="text-gray-600 text-sm">Storm recovery information</p>
            </Link>
            <Link
              href="/guides/mould"
              className="bg-green-50 p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold mb-2">Mould Guide</h3>
              <p className="text-gray-600 text-sm">Mould remediation help</p>
            </Link>
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
              Need Emergency Restoration Services?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Available 24/7 across {city} - Insurance approved contractors ready to help
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/whos-first"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Get Help Now
              </Link>
              <Link
                href="/insurance-decoder"
                className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Check Insurance
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}