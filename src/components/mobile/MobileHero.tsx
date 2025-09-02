'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Clock, 
  Award, 
  CheckCircle,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

export default function MobileHero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden px-4 py-8">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Emergency Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <Badge variant="destructive" className="px-3 py-1 text-xs sm:text-sm">
            <AlertTriangle className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            24/7 Emergency Response
          </Badge>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Disaster Recovery
          <span className="block text-2xl sm:text-3xl md:text-4xl mt-2 text-gray-700 dark:text-gray-300">
            Australia
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-center text-gray-600 dark:text-gray-400 mb-6"
        >
          Professional restoration services nationwide. 
          Insurance approved. Immediate response.
        </motion.p>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-3 gap-2 mb-6"
        >
          <Card className="p-3 text-center border-0 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <Shield className="h-5 w-5 mx-auto mb-1 text-blue-600" />
            <p className="text-xs font-medium">Licensed</p>
          </Card>
          <Card className="p-3 text-center border-0 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <Award className="h-5 w-5 mx-auto mb-1 text-green-600" />
            <p className="text-xs font-medium">Certified</p>
          </Card>
          <Card className="p-3 text-center border-0 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <Clock className="h-5 w-5 mx-auto mb-1 text-purple-600" />
            <p className="text-xs font-medium">24/7</p>
          </Card>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-3"
        >
          <Button 
            size="lg" 
            className="w-full text-base h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            asChild
          >
            <Link href="/book-service">
              Submit Insurance Claim
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full text-base h-12"
            asChild
          >
            <Link href="/services">
              View All Services
            </Link>
          </Button>
        </motion.div>

        {/* Service Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 grid grid-cols-2 gap-3"
        >
          {[
            { title: 'Water Damage', icon: '💧', href: '/services/water-damage' },
            { title: 'Fire Damage', icon: '🔥', href: '/services/fire-damage' },
            { title: 'Mould Removal', icon: '🦠', href: '/services/mould-remediation' },
            { title: 'Storm Damage', icon: '⛈️', href: '/services/storm-damage' }
          ].map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="flex items-center gap-2 p-3 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur border border-gray-200 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
            >
              <span className="text-2xl">{service.icon}</span>
              <span className="text-sm font-medium">{service.title}</span>
            </Link>
          ))}
        </motion.div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400"
        >
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span>Trusted by 10,000+ Australian homes & businesses</span>
        </motion.div>
      </div>
    </section>
  );
}