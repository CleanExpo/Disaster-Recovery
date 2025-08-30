'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, 
  Maximize, Minimize, Download, Share2, ChevronRight,
  TrendingUp, Users, Target, Zap, Shield, Award,
  DollarSign, Globe, Rocket, BarChart3, PieChart, LineChart
} from 'lucide-react';
import Image from 'next/image';
import { pitchDeckData } from '@/lib/pitch-deck-data';
import PitchSlide from '@/components/pitch-deck/PitchSlide';
import ChartSlide from '@/components/pitch-deck/ChartSlide';
import VoiceNarration from '@/components/pitch-deck/VoiceNarration';
import BackgroundMusic from '@/components/pitch-deck/BackgroundMusic';
import AnimatedTransition from '@/components/pitch-deck/AnimatedTransition';
import ProductScreenshots from '@/components/pitch-deck/ProductScreenshots';

// Dynamic import for 3D animations
const ThreeBackground = dynamic(() => import('@/components/pitch-deck/ThreeBackground'), {
  ssr: false
});

export default function InvestorPitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const presentationRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const voiceRef = useRef<any>(null);
  const musicRef = useRef<any>(null);

  // Slide data structure
  const slides = pitchDeckData?.slides || [
    {
      id: 1,
      type: 'title',
      title: 'Disaster Recovery Australia',
      subtitle: 'Transforming Insurance Claims Through Technology',
      background: 'gradient',
      animation: 'fadeIn',
      duration: 8000,
      narration: 'Welcome to Disaster Recovery Australia. We are revolutionizing the insurance claims industry through cutting-edge technology and a nationwide contractor network.',
      image: '/images/logos/disaster-recovery-logo.png'
    },
    {
      id: 2,
      type: 'problem',
      title: 'The $15B Problem',
      points: [
        'Insurance claims take 30-90 days to process',
        'Contractors lack direct insurance connections',
        'Property owners face lengthy restoration delays',
        '40% of claims experience disputes'
      ],
      background: 'dark',
      animation: 'slideLeft',
      duration: 10000,
      narration: 'The Australian insurance restoration industry faces a fifteen billion dollar problem. Claims take months to process, contractors struggle to connect with insurers, and property owners suffer through lengthy delays.',
      chart: {
        type: 'bar',
        data: {
          labels: ['Processing Time', 'Contractor Issues', 'Customer Complaints', 'Claim Disputes'],
          datasets: [{
            label: 'Industry Problems (%)',
            data: [85, 72, 68, 40],
            backgroundColor: ['#ef4444', '#f97316', '#eab308', '#f87171']
          }]
        }
      }
    },
    {
      id: 3,
      type: 'solution',
      title: 'Our Revolutionary Solution',
      subtitle: 'AI-Powered Claims Distribution Platform',
      features: [
        { icon: Zap, title: '60-Minute Response', description: 'Guaranteed emergency response across Australia' },
        { icon: Globe, title: 'National Coverage', description: '500+ certified contractors nationwide' },
        { icon: Shield, title: 'Direct Insurance Billing', description: 'No upfront costs for property owners' },
        { icon: Rocket, title: 'AI Automation', description: '100% automated claim routing and processing' }
      ],
      background: 'gradient',
      animation: 'zoom',
      duration: 12000,
      narration: 'Our solution is an AI-powered claims distribution platform that connects insurance companies directly with certified contractors, ensuring sixty-minute emergency response times nationwide.',
      screenshots: ['dashboard', 'contractor-portal', 'claim-form']
    },
    {
      id: 4,
      type: 'market',
      title: 'Market Opportunity',
      subtitle: '$15B TAM - 2% Current Penetration',
      background: 'chart',
      animation: 'slideUp',
      duration: 10000,
      narration: 'The total addressable market for disaster recovery in Australia exceeds fifteen billion dollars annually, with only two percent digital penetration, representing massive growth potential.',
      chart: {
        type: 'pie',
        data: {
          labels: ['Untapped Market', 'Traditional Players', 'Digital Solutions'],
          datasets: [{
            data: [75, 23, 2],
            backgroundColor: ['#3b82f6', '#6b7280', '#10b981']
          }]
        }
      }
    },
    {
      id: 5,
      type: 'traction',
      title: 'Explosive Growth',
      metrics: [
        { label: 'Properties Restored', value: '25,000+', growth: '+127%' },
        { label: 'Contractor Network', value: '500+', growth: '+85%' },
        { label: 'Monthly Claims', value: '2,800', growth: '+210%' },
        { label: 'Customer Satisfaction', value: '98%', growth: '+15%' }
      ],
      background: 'dark',
      animation: 'fadeScale',
      duration: 10000,
      narration: 'We have achieved explosive growth with over twenty-five thousand properties restored, a network of five hundred contractors, and ninety-eight percent customer satisfaction.',
      chart: {
        type: 'line',
        data: {
          labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
          datasets: [{
            label: 'Monthly Recurring Revenue ($M)',
            data: [0.5, 0.8, 1.3, 2.1, 3.4, 5.5],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4
          }]
        }
      }
    },
    {
      id: 6,
      type: 'business-model',
      title: 'Revenue Streams',
      subtitle: 'Multiple Monetization Channels',
      streams: [
        { name: 'Lead Generation', percentage: 40, description: '$150-500 per qualified lead' },
        { name: 'Territory Licensing', percentage: 30, description: '$2,000-10,000 monthly per region' },
        { name: 'Insurance Partnerships', percentage: 20, description: '2-5% of claim value' },
        { name: 'SaaS Platform Fees', percentage: 10, description: '$299-999 monthly per contractor' }
      ],
      background: 'gradient',
      animation: 'slideRight',
      duration: 10000,
      narration: 'Our business model includes multiple revenue streams: lead generation, territory licensing, insurance partnerships, and SaaS platform fees, ensuring diversified and sustainable growth.'
    },
    {
      id: 7,
      type: 'team',
      title: 'Leadership Team',
      members: [
        {
          name: 'Shane',
          role: 'Founder & CEO',
          bio: '15+ years in disaster recovery, built and sold 2 companies',
          image: '/images/team/shane-founder.jpg'
        }
      ],
      background: 'dark',
      animation: 'fadeIn',
      duration: 8000,
      narration: 'Our leadership team brings over fifteen years of experience in disaster recovery, with a proven track record of building and scaling successful companies.'
    },
    {
      id: 8,
      type: 'competition',
      title: 'Competitive Advantage',
      advantages: [
        'First-mover in AI-powered claims distribution',
        'Largest contractor network in Australia',
        'Direct insurance company integrations',
        'Proprietary routing algorithm',
        '60-minute response guarantee'
      ],
      background: 'gradient',
      animation: 'zoom',
      duration: 10000,
      narration: 'Our competitive advantages include being the first mover in AI-powered claims distribution, having the largest contractor network, and our proprietary routing algorithm.'
    },
    {
      id: 9,
      type: 'financials',
      title: 'Financial Projections',
      subtitle: 'Path to $100M ARR',
      background: 'chart',
      animation: 'slideUp',
      duration: 12000,
      narration: 'Our financial projections show a clear path to one hundred million dollars in annual recurring revenue within three years, with strong unit economics and expanding margins.',
      chart: {
        type: 'bar',
        data: {
          labels: ['2024', '2025', '2026', '2027'],
          datasets: [
            {
              label: 'Revenue ($M)',
              data: [8, 24, 52, 100],
              backgroundColor: '#3b82f6'
            },
            {
              label: 'EBITDA ($M)',
              data: [1, 6, 18, 35],
              backgroundColor: '#10b981'
            }
          ]
        }
      }
    },
    {
      id: 10,
      type: 'ask',
      title: 'Investment Opportunity',
      subtitle: 'Series A - $15M',
      allocation: [
        { category: 'Technology Development', amount: '$6M', percentage: 40 },
        { category: 'Market Expansion', amount: '$4.5M', percentage: 30 },
        { category: 'Sales & Marketing', amount: '$3M', percentage: 20 },
        { category: 'Operations', amount: '$1.5M', percentage: 10 }
      ],
      terms: '$15M Series A at $60M pre-money valuation',
      background: 'gradient',
      animation: 'fadeScale',
      duration: 10000,
      narration: 'We are raising fifteen million dollars in Series A funding to accelerate technology development, expand nationally, and capture the massive market opportunity ahead.'
    },
    {
      id: 11,
      type: 'closing',
      title: 'Join Us in Transforming an Industry',
      subtitle: 'Together, we will revolutionize disaster recovery',
      cta: 'Schedule a Meeting',
      contact: {
        email: 'investors@disasterrecovery.com.au',
        phone: '1300 566 166',
        website: 'disasterrecovery.com.au'
      },
      background: 'video',
      animation: 'fadeIn',
      duration: 8000,
      narration: 'Join us in transforming the disaster recovery industry. Together, we will build the future of insurance claims processing. Thank you for your time.',
      videoUrl: '/videos/closing-montage.mp4'
    }
  ];

  // Initialize presentation
  useEffect(() => {
    const loadPresentation = async () => {
      setIsLoading(true);
      // Preload images and resources
      await preloadResources();
      setIsLoading(false);
      
      // Start auto-play if in demo mode
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('autoplay') === 'true') {
        handlePlay();
      }
    };
    
    loadPresentation();
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Preload resources
  const preloadResources = async () => {
    const imageUrls = slides
      .filter(slide => slide.image || slide.screenshots)
      .flatMap(slide => [
        slide.image,
        ...(slide.screenshots || []).map(s => `/images/screenshots/${s}.png`)
      ])
      .filter(Boolean);
    
    const imagePromises = imageUrls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
    });
    
    await Promise.allSettled(imagePromises);
  };

  // Auto-advance slides
  useEffect(() => {
    if (isPlaying && !isLoading) {
      progressInterval.current = setInterval(() => {
        setSlideProgress(prev => {
          if (prev >= 100) {
            handleNextSlide();
            return 0;
          }
          return prev + (100 / (slides[currentSlide].duration / 100));
        });
      }, 100);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, currentSlide, isLoading]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'ArrowRight':
          handleNextSlide();
          break;
        case 'ArrowLeft':
          handlePrevSlide();
          break;
        case 'f':
          handleFullscreen();
          break;
        case 'm':
          handleMute();
          break;
        case 'Escape':
          if (isFullscreen) {
            handleFullscreen();
          }
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen, isPlaying]);

  // Handlers
  const handlePlay = () => {
    setIsPlaying(true);
    setSlideProgress(0);
    if (voiceRef.current) {
      voiceRef.current.play(slides[currentSlide].narration);
    }
    if (musicRef.current && !isMuted) {
      musicRef.current.play();
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (voiceRef.current) {
      voiceRef.current.pause();
    }
    if (musicRef.current) {
      musicRef.current.pause();
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
      setSlideProgress(0);
      if (voiceRef.current && isPlaying) {
        voiceRef.current.play(slides[currentSlide + 1].narration);
      }
    } else if (currentSlide === slides.length - 1) {
      // Loop back to start
      setCurrentSlide(0);
      setSlideProgress(0);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setSlideProgress(0);
      if (voiceRef.current && isPlaying) {
        voiceRef.current.play(slides[currentSlide - 1].narration);
      }
    }
  };

  const handleSlideSelect = (index: number) => {
    setCurrentSlide(index);
    setSlideProgress(0);
    if (voiceRef.current && isPlaying) {
      voiceRef.current.play(slides[index].narration);
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (voiceRef.current) {
      voiceRef.current.setMuted(!isMuted);
    }
    if (musicRef.current) {
      musicRef.current.setMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      presentationRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    // Generate PDF version of pitch deck
    window.open('/api/pitch-deck/download', '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Disaster Recovery Australia - Investor Pitch',
        text: 'Check out our investor pitch deck',
        url: window.location.href
      });
    } else {
      // Copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const currentSlideData = slides[currentSlide];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Investor Pitch Deck...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={presentationRef}
      className="relative min-h-screen bg-black overflow-hidden"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* 3D Background */}
      <ThreeBackground type={currentSlideData.background} />
      
      {/* Background Music */}
      <BackgroundMusic ref={musicRef} muted={isMuted} />
      
      {/* Voice Narration */}
      <VoiceNarration 
        ref={voiceRef} 
        muted={isMuted}
        elevenLabsApiKey={process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY}
      />
      
      {/* Main Presentation Area */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 z-50">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-100"
            style={{ width: `${slideProgress}%` }}
          />
        </div>
        
        {/* Slide Content */}
        <AnimatedTransition animation={currentSlideData.animation}>
          <div className="flex-1 flex items-center justify-center p-8 md:p-16">
            {currentSlideData.type === 'chart' ? (
              <ChartSlide data={currentSlideData} />
            ) : currentSlideData.screenshots ? (
              <ProductScreenshots 
                screenshots={currentSlideData.screenshots}
                title={currentSlideData.title}
                subtitle={currentSlideData.subtitle}
              />
            ) : (
              <PitchSlide data={currentSlideData} />
            )}
          </div>
        </AnimatedTransition>
        
        {/* Controls */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="max-w-7xl mx-auto">
            {/* Slide Dots */}
            <div className="flex justify-center gap-2 mb-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideSelect(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-8 bg-blue-500' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevSlide}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  disabled={currentSlide === 0}
                >
                  <SkipBack className="h-5 w-5 text-white" />
                </button>
                
                <button
                  onClick={handlePlayPause}
                  className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 text-white" />
                  ) : (
                    <Play className="h-6 w-6 text-white ml-0.5" />
                  )}
                </button>
                
                <button
                  onClick={handleNextSlide}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  disabled={currentSlide === slides.length - 1}
                >
                  <SkipForward className="h-5 w-5 text-white" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-white">
                <span className="text-sm">
                  {currentSlide + 1} / {slides.length}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMute}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5 text-white" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-white" />
                  )}
                </button>
                
                <button
                  onClick={handleDownload}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Download className="h-5 w-5 text-white" />
                </button>
                
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Share2 className="h-5 w-5 text-white" />
                </button>
                
                <button
                  onClick={handleFullscreen}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize className="h-5 w-5 text-white" />
                  ) : (
                    <Maximize className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}