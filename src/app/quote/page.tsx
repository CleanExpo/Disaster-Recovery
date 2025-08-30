'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, ArrowRight, Clock, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function QuotePage() {
  const router = useRouter();

  // Auto-redirect after showing brief info
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/book-service?source=quote');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <FileText className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get Your Free Quote
            </h1>
            <p className="text-xl mb-8">
              Connect with IICRC certified disaster recovery professionals. 
              Get detailed quotes for water damage, fire damage, mould remediation, and more.
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Card className="bg-white/10 backdrop-blur p-4">
                <Shield className="h-8 w-8 mx-auto mb-2" />
                <p className="font-bold">IICRC Certified</p>
                <p className="text-sm opacity-90">Professional contractors only</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-4">
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <p className="font-bold">Fast Response</p>
                <p className="text-sm opacity-90">Quotes within 30 minutes</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-4">
                <Users className="h-8 w-8 mx-auto mb-2" />
                <p className="font-bold">Multiple Options</p>
                <p className="text-sm opacity-90">Compare qualified contractors</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Redirecting Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-centre">
            <Card className="p-8 border-2 border-blue-200 bg-blue-50">
              <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Connecting You to Our Quote System
              </h2>
              <p className="text-gray-700 mb-6">
                You'll be redirected to our comprehensive quote request form where you can 
                provide details about your damage and connect with certified contractors.
              </p>
              <div className="flex items-centre justify-centre text-blue-600 font-medium">
                <span>Redirecting</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            What to Expect
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-centre bg-white shadow-md">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-centre justify-centre mx-auto mb-4">
                  <span className="font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-bold mb-2">Describe Your Damage</h3>
                <p className="text-sm text-gray-600">
                  Provide details about your property and damage type
                </p>
              </Card>
              <Card className="p-6 text-centre bg-white shadow-md">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-centre justify-centre mx-auto mb-4">
                  <span className="font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-bold mb-2">Contractor Matching</h3>
                <p className="text-sm text-gray-600">
                  System finds qualified contractors in your area
                </p>
              </Card>
              <Card className="p-6 text-centre bg-white shadow-md">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-centre justify-centre mx-auto mb-4">
                  <span className="font-bold text-blue-600">3</span>
                </div>
                <h3 className="font-bold mb-2">Receive Quotes</h3>
                <p className="text-sm text-gray-600">
                  Get detailed quotes from multiple contractors
                </p>
              </Card>
              <Card className="p-6 text-centre bg-white shadow-md">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-centre justify-centre mx-auto mb-4">
                  <span className="font-bold text-green-600">4</span>
                </div>
                <h3 className="font-bold mb-2">Choose & Book</h3>
                <p className="text-sm text-gray-600">
                  Compare options and select your preferred contractor
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Manual Continue */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-centre">
          <h3 className="text-xl font-semibold mb-6">
            Don't want to wait? Continue now:
          </h3>
          <Link
            href="/book-service?source=quote"
            className="inline-flex items-centre justify-centre px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colours"
          >
            Get My Free Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Services We Quote */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Services We Quote
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-white shadow-md">
              <h3 className="font-bold mb-2">Water Damage Restoration</h3>
              <p className="text-sm text-gray-600">
                Burst pipes, flooding, leaks, and water extraction services
              </p>
            </Card>
            <Card className="p-6 bg-white shadow-md">
              <h3 className="font-bold mb-2">Fire Damage Restoration</h3>
              <p className="text-sm text-gray-600">
                Smoke cleanup, soot removal, and structural fire damage repair
              </p>
            </Card>
            <Card className="p-6 bg-white shadow-md">
              <h3 className="font-bold mb-2">Mould Remediation</h3>
              <p className="text-sm text-gray-600">
                Black mould removal, air quality testing, and mould prevention
              </p>
            </Card>
            <Card className="p-6 bg-white shadow-md">
              <h3 className="font-bold mb-2">Storm Damage Repair</h3>
              <p className="text-sm text-gray-600">
                Wind damage, hail damage, and emergency storm repairs
              </p>
            </Card>
            <Card className="p-6 bg-white shadow-md">
              <h3 className="font-bold mb-2">Biohazard Cleanup</h3>
              <p className="text-sm text-gray-600">
                Sewage cleanup, trauma cleanup, and hazardous material removal
              </p>
            </Card>
            <Card className="p-6 bg-white shadow-md">
              <h3 className="font-bold mb-2">Emergency Services</h3>
              <p className="text-sm text-gray-600">
                24/7 emergency response and disaster mitigation services
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}