'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, 
  ChevronRight, TrendingUp, Users, Target, Zap, Shield, 
  Award, DollarSign, Globe, Rocket, BarChart3
} from 'lucide-react';

const pitchSlides = [
  {
    id: 1,
    type: 'title',
    title: 'Disaster Recovery Australia',
    subtitle: 'Building the Industry, Not Just Business',
    description: 'Revolutionizing disaster recovery through technology and community',
    icon: Rocket,
    bgColor: 'from-blue-900 to-purple-900'
  },
  {
    id: 2,
    type: 'problem',
    title: 'The $2.8B Problem',
    points: [
      'Insurance claims take 6-12 months to resolve',
      'Contractors struggle to find qualified work',
      'Communities left waiting for recovery',
      'Inefficient manual processes dominate'
    ],
    icon: Target,
    bgColor: 'from-red-900 to-orange-900'
  },
  {
    id: 3,
    type: 'solution',
    title: 'Our Solution',
    subtitle: 'AI-Powered Claims Distribution',
    points: [
      'Instant contractor matching using AI',
      '24/7 automated client support',
      'Real-time job tracking and updates',
      'Complete digital transformation'
    ],
    icon: Zap,
    bgColor: 'from-green-900 to-blue-900'
  },
  {
    id: 4,
    type: 'market',
    title: 'Market Opportunity',
    stats: [
      { label: 'TAM Australia', value: '$2.8B' },
      { label: 'Annual Growth', value: '12%' },
      { label: 'Insurance Partners', value: '50+' },
      { label: 'Contractor Network', value: '10,000+' }
    ],
    icon: TrendingUp,
    bgColor: 'from-purple-900 to-pink-900'
  },
  {
    id: 5,
    type: 'business',
    title: 'Business Model',
    subtitle: '4 Revenue Streams',
    points: [
      'Application Fee: $975 per contractor',
      'Monthly Subscription: $350-500/month',
      'Lead Generation: $50-150 per lead',
      'Territory Rights: $5,000-25,000'
    ],
    icon: DollarSign,
    bgColor: 'from-green-900 to-teal-900'
  },
  {
    id: 6,
    type: 'traction',
    title: 'Traction & Growth',
    stats: [
      { label: 'Contractors Onboarded', value: '500+' },
      { label: 'Monthly Claims Processed', value: '2,000+' },
      { label: 'Partner Insurers', value: '12' },
      { label: 'MRR Growth', value: '45% MoM' }
    ],
    icon: BarChart3,
    bgColor: 'from-blue-900 to-indigo-900'
  },
  {
    id: 7,
    type: 'team',
    title: 'Our Team',
    subtitle: 'Industry Veterans & Tech Innovators',
    points: [
      '30+ years combined disaster recovery experience',
      'Former insurance executives and adjusters',
      'Tech team from Google, Amazon, Atlassian',
      'Advisory board with industry leaders'
    ],
    icon: Users,
    bgColor: 'from-purple-900 to-blue-900'
  },
  {
    id: 8,
    type: 'competitive',
    title: 'Competitive Advantage',
    points: [
      'First-mover in AI-powered claims distribution',
      'Exclusive insurance partnerships',
      'Proprietary contractor scoring algorithm',
      'National SEO domination strategy'
    ],
    icon: Shield,
    bgColor: 'from-orange-900 to-red-900'
  },
  {
    id: 9,
    type: 'financials',
    title: 'Financial Projections',
    stats: [
      { label: 'Year 1 Revenue', value: '$3.5M' },
      { label: 'Year 2 Revenue', value: '$12M' },
      { label: 'Year 3 Revenue', value: '$35M' },
      { label: 'Break-even', value: 'Month 18' }
    ],
    icon: TrendingUp,
    bgColor: 'from-green-900 to-emerald-900'
  },
  {
    id: 10,
    type: 'ask',
    title: 'Investment Ask',
    subtitle: '$5M Series A',
    points: [
      'Tech platform development: $2M',
      'Market expansion: $1.5M',
      'Team scaling: $1M',
      'Working capital: $500K'
    ],
    icon: Rocket,
    bgColor: 'from-purple-900 to-indigo-900'
  },
  {
    id: 11,
    type: 'use',
    title: 'Use of Funds',
    stats: [
      { label: 'Technology', value: '40%' },
      { label: 'Sales & Marketing', value: '30%' },
      { label: 'Operations', value: '20%' },
      { label: 'Reserve', value: '10%' }
    ],
    icon: Target,
    bgColor: 'from-blue-900 to-cyan-900'
  },
  {
    id: 12,
    type: 'closing',
    title: 'Join Us',
    subtitle: 'Building Australia\'s Recovery Future',
    description: 'Partner with us to revolutionize disaster recovery and create lasting community impact',
    icon: Award,
    bgColor: 'from-purple-900 to-pink-900'
  }
];

export default function InvestorPitchPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlideData = pitchSlides[currentSlide];
  const Icon = currentSlideData.icon;

  useEffect(() => {
    if (isPlaying) {
      const duration = 8000; // 8 seconds per slide
      const updateInterval = 100; // Update every 100ms
      let elapsed = 0;

      intervalRef.current = setInterval(() => {
        elapsed += updateInterval;
        const newProgress = (elapsed / duration) * 100;
        
        if (newProgress >= 100) {
          handleNextSlide();
          setProgress(0);
        } else {
          setProgress(newProgress);
        }
      }, updateInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentSlide]);

  const handleNextSlide = () => {
    if (currentSlide < pitchSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setProgress(0);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setProgress(0);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setProgress(0);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const renderSlideContent = () => {
    switch (currentSlideData.type) {
      case 'title':
      case 'closing':
        return (
          <div className="text-centre max-w-4xl mx-auto">
            <Icon className="h-24 w-24 mx-auto mb-8 text-white/80" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {currentSlideData.title}
            </h1>
            {currentSlideData.subtitle && (
              <h2 className="text-2xl md:text-3xl text-white/80 mb-8">
                {currentSlideData.subtitle}
              </h2>
            )}
            {currentSlideData.description && (
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                {currentSlideData.description}
              </p>
            )}
          </div>
        );

      case 'problem':
      case 'solution':
      case 'business':
      case 'team':
      case 'competitive':
      case 'ask':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-centre justify-centre mb-8">
              <Icon className="h-16 w-16 text-white/80 mr-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                {currentSlideData.title}
              </h2>
            </div>
            {currentSlideData.subtitle && (
              <h3 className="text-2xl text-white/80 text-centre mb-8">
                {currentSlideData.subtitle}
              </h3>
            )}
            <div className="space-y-6">
              {currentSlideData.points?.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ChevronRight className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-xl text-white">{point}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'market':
      case 'traction':
      case 'financials':
      case 'use':
        return (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-centre justify-centre mb-12">
              <Icon className="h-16 w-16 text-white/80 mr-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                {currentSlideData.title}
              </h2>
            </div>
            {currentSlideData.subtitle && (
              <h3 className="text-2xl text-white/80 text-centre mb-8">
                {currentSlideData.subtitle}
              </h3>
            )}
            <div className="grid md:grid-cols-2 gap-8">
              {currentSlideData.stats?.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-centre transform hover:scale-105 transition-all"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-3">
                    {stat.value}
                  </div>
                  <div className="text-lg text-white/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentSlideData.bgColor} relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Progress Bar */}
        <div className="h-1 bg-black/20">
          <div
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${(currentSlide + 1) / pitchSlides.length * 100}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-centre justify-between p-6 bg-black/20 backdrop-blur-sm">
          <div className="flex items-centre gap-4">
            <button
              onClick={togglePlay}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition"
            >
              {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white" />}
            </button>
            <button
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition disabled:opacity-50"
            >
              <SkipBack className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={handleNextSlide}
              disabled={currentSlide === pitchSlides.length - 1}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition disabled:opacity-50"
            >
              <SkipForward className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={toggleMute}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition"
            >
              {isMuted ? <VolumeX className="h-6 w-6 text-white" /> : <Volume2 className="h-6 w-6 text-white" />}
            </button>
          </div>

          <div className="text-white text-lg font-semibold">
            Slide {currentSlide + 1} of {pitchSlides.length}
          </div>
        </div>

        {/* Slide Content */}
        <div className="flex-1 flex items-centre justify-centre p-8 md:p-16">
          <div className="w-full animate-fadeIn">
            {renderSlideContent()}
          </div>
        </div>

        {/* Auto-play Progress */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div
              className="h-full bg-green-400 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {pitchSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setProgress(0);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}