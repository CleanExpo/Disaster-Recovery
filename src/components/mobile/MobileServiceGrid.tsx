'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Droplets,
  Flame,
  Wind,
  Building2,
  AlertTriangle,
  Shield,
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  features: string[];
  urgent?: boolean;
  popular?: boolean;
  color: string;
}

const services: Service[] = [
  {
    title: 'Water Damage',
    description: 'Burst pipes, flooding, water extraction & drying',
    icon: Droplets,
    href: '/services/water-damage',
    color: 'from-blue-500 to-cyan-500',
    features: ['24hr Response', 'Insurance Approved', 'Moisture Detection'],
    urgent: true,
    popular: true
  },
  {
    title: 'Fire & Smoke',
    description: 'Fire damage restoration, smoke & soot removal',
    icon: Flame,
    href: '/services/fire-damage',
    color: 'from-orange-500 to-red-500',
    features: ['Odour Removal', 'Content Restoration', 'Structural Repair'],
    urgent: true
  },
  {
    title: 'Storm Damage',
    description: 'Wind, hail, flood damage emergency response',
    icon: Wind,
    href: '/services/storm-damage',
    color: 'from-gray-500 to-slate-600',
    features: ['Tarping', 'Tree Removal', 'Roof Repairs'],
    urgent: true
  },
  {
    title: 'Mould Remediation',
    description: 'Professional mould removal & prevention',
    icon: Shield,
    href: '/services/mould-remediation',
    color: 'from-green-500 to-emerald-500',
    features: ['Air Quality', 'HEPA Filtration', 'Prevention'],
    popular: true
  },
  {
    title: 'Commercial',
    description: 'Large-scale commercial restoration services',
    icon: Building2,
    href: '/services/commercial',
    color: 'from-purple-500 to-indigo-500',
    features: ['Minimal Downtime', 'Project Management', 'Documentation']
  },
  {
    title: 'Emergency',
    description: '24/7 immediate disaster response',
    icon: AlertTriangle,
    href: '/services/emergency-services',
    color: 'from-red-600 to-pink-600',
    features: ['Immediate Response', 'All Disasters', 'Priority Service'],
    urgent: true
  }
];

export default function MobileServiceGrid() {
  return (
    <section className="px-4 py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Section Header */}
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-4">
          Our Services
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Professional Restoration Services
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          IICRC certified technicians available 24/7 for all disaster recovery needs
        </p>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="relative h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              {/* Badges */}
              <div className="absolute top-3 right-3 flex gap-2 z-10">
                {service.urgent && (
                  <Badge variant="destructive" className="text-xs">
                    <Clock className="mr-1 h-3 w-3" />
                    Urgent
                  </Badge>
                )}
                {service.popular && (
                  <Badge className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    Popular
                  </Badge>
                )}
              </div>

              <CardHeader>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                  <service.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">{service.title}</CardTitle>
                <CardDescription className="text-sm">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Features List */}
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  className="w-full group"
                  variant={service.urgent ? "default" : "outline"}
                  asChild
                >
                  <Link href={service.href}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <Card className="max-w-lg mx-auto p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-0">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-lg mb-1">Need Immediate Help?</h3>
              <p className="text-sm text-muted-foreground">
                Submit your claim online for fastest response
              </p>
            </div>
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/book-service">
                Submit Claim Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}