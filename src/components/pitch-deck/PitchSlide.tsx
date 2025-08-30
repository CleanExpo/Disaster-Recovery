'use client';

import React from 'react';
import Image from 'next/image';
import { 
  TrendingUp, Users, Target, Zap, Shield, Award,
  DollarSign, Globe, Rocket, BarChart3, CheckCircle,
  ArrowRight, Star, Building2, Clock, Phone
} from 'lucide-react';

interface PitchSlideProps {
  data: any;
}

export default function PitchSlide({ data }: PitchSlideProps) {
  const renderIcon = (IconComponent: any) => {
    if (!IconComponent) return null;
    return <IconComponent className="h-8 w-8" />;
  };

  // Title Slide
  if (data.type === 'title') {
    return (
      <div className="text-center max-w-5xl mx-auto">
        {data.image && (
          <div className="mb-8 animate-fadeIn">
            <Image
              src={data.image}
              alt="Company Logo"
              width={200}
              height={80}
              className="mx-auto"
            />
          </div>
        )}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-slideUp">
          {data.title}
        </h1>
        <p className="text-2xl md:text-3xl text-blue-300 animate-slideUp animation-delay-200">
          {data.subtitle}
        </p>
      </div>
    );
  }

  // Problem Slide
  if (data.type === 'problem') {
    return (
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 text-center animate-fadeIn">
          {data.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {data.points?.map((point: string, index: number) => (
              <div 
                key={index}
                className="flex items-start gap-4 animate-slideRight"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="p-2 bg-red-500/20 rounded-lg flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <p className="text-xl text-gray-200">{point}</p>
              </div>
            ))}
          </div>
          {data.chart && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fadeIn animation-delay-600">
              <div className="h-64 flex items-end justify-around gap-4">
                {/* Simple bar chart visualization */}
                {data.chart.data.datasets[0].data.map((value: number, index: number) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-red-500 to-orange-500 rounded-t-lg transition-all duration-1000 animate-growUp"
                      style={{ 
                        height: `${(value / 100) * 100}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    />
                    <p className="text-xs text-gray-300 mt-2 text-center">
                      {data.chart.data.labels[index]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Solution Slide
  if (data.type === 'solution') {
    return (
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center animate-fadeIn">
          {data.title}
        </h2>
        <p className="text-2xl text-blue-300 mb-12 text-center animate-fadeIn animation-delay-200">
          {data.subtitle}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.features?.map((feature: any, index: number) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 animate-scaleIn hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-3 bg-blue-500/20 rounded-lg w-fit mb-4">
                {renderIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Market Slide
  if (data.type === 'market') {
    return (
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">
          {data.title}
        </h2>
        <p className="text-3xl text-green-400 mb-12 animate-fadeIn animation-delay-200">
          {data.subtitle}
        </p>
        {data.chart && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 animate-scaleIn animation-delay-400">
            <div className="relative h-80 w-80 mx-auto">
              {/* Pie chart visualization */}
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Background circle */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#374151" strokeWidth="2" />
                {/* Animated pie segments */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="40"
                  strokeDasharray={`${75 * 5.02} ${100 * 5.02}`}
                  transform="rotate(-90 100 100)"
                  className="animate-drawCircle"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#6b7280"
                  strokeWidth="40"
                  strokeDasharray={`${23 * 5.02} ${100 * 5.02}`}
                  strokeDashoffset={`${-75 * 5.02}`}
                  transform="rotate(-90 100 100)"
                  className="animate-drawCircle animation-delay-400"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="40"
                  strokeDasharray={`${2 * 5.02} ${100 * 5.02}`}
                  strokeDashoffset={`${-98 * 5.02}`}
                  transform="rotate(-90 100 100)"
                  className="animate-drawCircle animation-delay-800"
                />
              </svg>
              {/* Legend */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold text-white">$15B</p>
                  <p className="text-lg text-gray-300">TAM</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-8 mt-8">
              {data.chart.data.labels.map((label: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: data.chart.data.datasets[0].backgroundColor[index] }}
                  />
                  <span className="text-sm text-gray-300">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Traction Slide
  if (data.type === 'traction') {
    return (
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 text-center animate-fadeIn">
          {data.title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {data.metrics?.map((metric: any, index: number) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-6 text-center animate-scaleIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="text-4xl font-bold text-white mb-2">
                {metric.value}
              </p>
              <p className="text-gray-300 mb-2">{metric.label}</p>
              {metric.growth && (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 rounded-full">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-semibold">{metric.growth}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Team Slide
  if (data.type === 'team') {
    return (
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 text-center animate-fadeIn">
          {data.title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.members?.map((member: any, index: number) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center animate-fadeIn"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {member.image && (
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-2xl font-semibold text-white mb-2">{member.name}</h3>
              <p className="text-blue-400 mb-4">{member.role}</p>
              <p className="text-gray-300">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Ask Slide
  if (data.type === 'ask') {
    return (
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center animate-fadeIn">
          {data.title}
        </h2>
        <p className="text-3xl text-blue-400 mb-12 text-center animate-fadeIn animation-delay-200">
          {data.subtitle}
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-8 animate-slideLeft">
            <h3 className="text-2xl font-semibold text-white mb-6">Use of Funds</h3>
            <div className="space-y-4">
              {data.allocation?.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-200">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{item.amount}</span>
                    <span className="text-gray-400">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-8 animate-slideRight">
            <h3 className="text-2xl font-semibold text-white mb-6">Investment Terms</h3>
            <p className="text-xl text-gray-200 mb-6">{data.terms}</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-gray-200">Board seat</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-gray-200">Monthly reporting</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-gray-200">Pro-rata rights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Closing Slide
  if (data.type === 'closing') {
    return (
      <div className="text-center max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fadeIn">
          {data.title}
        </h2>
        <p className="text-2xl text-blue-300 mb-12 animate-fadeIn animation-delay-200">
          {data.subtitle}
        </p>
        <button className="px-12 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white text-xl font-semibold rounded-full hover:scale-105 transition-transform animate-pulse">
          {data.cta}
        </button>
        {data.contact && (
          <div className="mt-12 space-y-3 animate-fadeIn animation-delay-600">
            <div className="flex items-center justify-center gap-3">
              <Phone className="h-5 w-5 text-blue-400" />
              <span className="text-gray-200">{data.contact.phone}</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Globe className="h-5 w-5 text-blue-400" />
              <span className="text-gray-200">{data.contact.website}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default slide
  return (
    <div className="text-center max-w-5xl mx-auto">
      <h2 className="text-5xl font-bold text-white mb-6">{data.title}</h2>
      {data.subtitle && (
        <p className="text-2xl text-blue-300">{data.subtitle}</p>
      )}
    </div>
  );
}