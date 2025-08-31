'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Phone, 
  Shield, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Play,
  Star,
  Award,
  Users,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  showStats?: boolean;
  showVideo?: boolean;
}

const stats = [
  { icon: Home, value: '10,000+', label: 'Properties Restored' },
  { icon: Users, value: '98%', label: 'Customer Satisfaction' },
  { icon: Clock, value: '60 min', label: 'Average Response Time' },
  { icon: Award, value: '15+', label: 'Years Experience' }
];

const trustBadges = [
  { icon: Shield, text: 'IICRC Certified' },
  { icon: Award, text: 'Insurance Approved' },
  { icon: Clock, text: '24/7 Emergency' },
  { icon: Star, text: '5-Star Rated' }
];

export default function PremiumHero({
  title = "Queensland's Premier Disaster Recovery Experts",
  subtitle = "24/7 Online Emergency Response",
  description = "When disaster strikes, every second counts. Our IICRC certified team provides immediate response for water damage, fire restoration, mould remediation, and more across Queensland.",
  backgroundImage = "/images/optimised/damage/3D Vehicle into Home.png",
  showStats = true,
  showVideo = false
}: HeroProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    "/images/optimised/damage/3D Vehicle into Home.png",
    "/images/optimised/damage/3D image of a house fire.png",
    "/images/optimised/process/3D Emergency Squalor Cleanup.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Premium Background with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-blue-900/90 z-10" />
        
        {/* Animated Background Images */}
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              currentImageIndex === index ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={image}
              alt="Disaster Recovery Services"
              fill
              className="object-cover object-centre"
              priority={index === 0}
              quality={85}
            />
          </div>
        ))}
        
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 z-20 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-30">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-white text-sm font-medium">Available Now - {subtitle}</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                {title.split(' ').map((word, i) => (
                  <span key={i} className="inline-block animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed max-w-xl">
                {description}
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {trustBadges.map((badge, index) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-white/90 animate-fade-in"
                  style={{ animationDelay: `${index * 100 + 500}ms` }}
                >
                  <badge.icon className="w-5 h-5 text-blue-300" />
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact-form"
                className={cn(
                  "group flex items-center justify-center gap-3 px-8 py-4",
                  "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600",
                  "text-white font-semibold text-lg rounded-xl",
                  "shadow-2xl hover:shadow-red-500/25",
                  "transform hover:scale-105 transition-all duration-300",
                  "animate-pulse-emergency"
                )}
              >
                <Phone className="w-5 h-5" />
                <span>Call Emergency Line</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <Link
                href="/free-assessment"
                className={cn(
                  "group flex items-center justify-center gap-3 px-8 py-4",
                  "bg-white/10 backdrop-blur-md hover:bg-white/20",
                  "text-white font-semibold text-lg rounded-xl",
                  "border border-white/30 hover:border-white/50",
                  "transform hover:scale-105 transition-all duration-300"
                )}
              >
                <CheckCircle className="w-5 h-5" />
                <span>Free Assessment</span>
              </Link>

              {showVideo && (
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className={cn(
                    "group flex items-center justify-center gap-3 px-8 py-4",
                    "bg-white/10 backdrop-blur-md hover:bg-white/20",
                    "text-white font-semibold text-lg rounded-xl",
                    "border border-white/30 hover:border-white/50",
                    "transform hover:scale-105 transition-all duration-300"
                  )}
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Video</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Content - 3D Graphic or Stats */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Floating 3D Card */}
              <div className="relative animate-float">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">Rapid Response</h3>
                      <div className="p-3 bg-green-500 rounded-full">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {stats.slice(0, 4).map((stat, index) => (
                        <div
                          key={stat.label}
                          className="text-center p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                          <stat.icon className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-white">{stat.value}</div>
                          <div className="text-xs text-blue-200">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="flex -space-x-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="ml-3 text-white font-medium">4.9/5 Rating</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      {showStats && (
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-center gap-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100 + 800}ms` }}
                >
                  <stat.icon className="w-8 h-8 text-blue-300" />
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes pulse-emergency {
          0%, 100% {
            box-shadow: 0 20px 25px -5px rgb(220 38 38 / 0.3);
          }
          50% {
            box-shadow: 0 20px 25px -5px rgb(220 38 38 / 0.5);
            transform: scale(1.02);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-emergency {
          animation: pulse-emergency 2s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}