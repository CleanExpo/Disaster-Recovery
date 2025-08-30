'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  BeakerIcon,
  FireIcon,
  HomeIcon,
  BuildingOfficeIcon,
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ElementType;
  colour: string;
  gradient: string;
  href: string;
  features: string[];
}

const services: ServiceCard[] = [
  {
    title: 'Water Damage Restoration',
    description: 'Rapid water extraction and structural drying with advanced equipment',
    icon: BeakerIcon,
    colour: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    href: '/services/water-damage',
    features: ['24/7 Emergency', 'Moisture Detection', 'Mould Prevention']
  },
  {
    title: 'Fire & Smoke Recovery',
    description: 'Complete restoration from fire, smoke, and soot damage',
    icon: FireIcon,
    colour: 'orange',
    gradient: 'from-orange-500 to-red-500',
    href: '/services/fire-damage',
    features: ['Odour Removal', 'Structural Repair', 'Content Restoration']
  },
  {
    title: 'Mould Remediation',
    description: 'Safe and thorough mould removal with prevention strategies',
    icon: SparklesIcon,
    colour: 'green',
    gradient: 'from-green-500 to-teal-500',
    href: '/services/mould-remediation',
    features: ['Air Quality Testing', 'Safe Removal', 'Prevention Plans']
  },
  {
    title: 'Commercial Services',
    description: 'Minimize downtime with our rapid commercial restoration',
    icon: BuildingOfficeIcon,
    colour: 'purple',
    gradient: 'from-purple-500 to-pink-500',
    href: '/services/commercial',
    features: ['Business Continuity', 'Large Scale', 'Documentation']
  }
];

export default function ServiceCards() {
  const [isVisible, setIsVisible] = useState<boolean[]>(new Array(services.length).fill(false));
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setTimeout(() => {
                setIsVisible(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 100);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-centre mb-16">
          <div className="inline-flex items-centre gap-2 mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <ShieldCheckIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">Professional Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Complete Disaster Recovery
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Industry-leading restoration services with cutting-edge technology and certified experts
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className={`group relative transition-all duration-700 ${
                isVisible[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <Link href={service.href}>
                <div className="relative h-full bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6 transition-all hover:scale-105 hover:bg-slate-800/70 hover:shadow-2xl hover:shadow-cyan-500/10">
                  {/* Gradient orb */}
                  <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${service.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                  
                  {/* Icon */}
                  <div className={`relative mb-4 w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-centre justify-centre group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colours">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-centre gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        <span className="text-xs text-gray-500">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <div className="flex items-centre gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                  
                  {/* Hover border gradient */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl`} />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-centre mt-16">
          <Link
            href="/services"
            className="inline-flex items-centre gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-semibold transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
          >
            <span>View All Services</span>
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}