'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
  ChevronLeft, Maximize, Download, TrendingUp, Users,
  Target, Shield, DollarSign, Rocket, Globe, Award
} from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: "Disaster Recovery Australia",
    subtitle: "National Recovery Partners",
    content: [
      "AI-Powered Claims Distribution Platform",
      "Connecting 115,350+ Contractors Nationwide",
      "Transforming Australia's $4.2B Restoration Industry"
    ],
    background: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)",
    narration: "Welcome to National Recovery Partners. We're transforming Australia's 4.2 billion dollar disaster recovery industry through our AI-powered claims distribution platform, connecting insurance companies with quality contractors nationwide."
  },
  {
    id: 2,
    title: "The Problem",
    subtitle: "A Broken $4.2 Billion Market",
    content: [
      "• 23.7 million Australian properties at flood risk",
      "• 95% of market controlled by admin companies taking huge cuts",
      "• Average claim resolution: 6-12 months",
      "• 115,350 fragmented contractors with no unity",
      "• Only 2% digital penetration in the industry"
    ],
    background: "linear-gradient(135deg, #dc2626 0%, #ea580c 100%)",
    narration: "Australia faces a massive problem. With 23.7 million properties at flood risk and disasters increasing 35% since the 1990s, the industry is broken. Admin companies control 95% of the market, taking huge cuts while contractors struggle and customers wait months for help."
  },
  {
    id: 3,
    title: "Our Solution",
    subtitle: "Self-Running Distribution Platform",
    content: [
      "✓ 100% Automated AI claims matching",
      "✓ Zero human customer service required",
      "✓ Direct contractor-to-insurer connections",
      "✓ SEO domination: 30,000+ location pages",
      "✓ Instant response, quality guaranteed"
    ],
    background: "linear-gradient(135deg, #059669 0%, #0891b2 100%)",
    narration: "Our solution is revolutionary. A completely self-running platform that uses AI to instantly match insurance claims with qualified contractors. No call centers, no admin overhead, just direct connections that work 24/7 across every location in Australia."
  },
  {
    id: 4,
    title: "Market Opportunity",
    subtitle: "Massive and Growing Fast",
    content: [
      "• TAM: $4.2B Australian restoration market",
      "• SAM: $2.1B insurance-direct claims",
      "• SOM: $210M (10% achievable by 2027)",
      "• Global market: $41B USD growing 5.7% annually",
      "• Climate change driving 35% increase in disasters"
    ],
    background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
    narration: "The market opportunity is enormous. Australia's 4.2 billion dollar restoration market is part of a 41 billion dollar global industry growing at 5.7% annually. With climate change driving a 35% increase in disasters, demand will only accelerate."
  },
  {
    id: 5,
    title: "Business Model",
    subtitle: "Multiple Revenue Streams",
    content: [
      "• Contractor Onboarding: $275 application + $2,200 joining",
      "• Monthly Subscriptions: $495/month after ramp-up",
      "• Lead Distribution: Commission on completions",
      "• Territory Rights: Exclusive area licensing",
      "• Training & Certification: Ongoing education"
    ],
    background: "linear-gradient(135deg, #059669 0%, #065f46 100%)",
    narration: "Our business model captures value at every point. Contractors pay 275 dollars to apply and 2200 to join, then 495 monthly after ramp-up. We earn commissions on successful jobs and offer premium territory rights. With 4000 contractors, that's 40 million annual recurring revenue."
  },
  {
    id: 6,
    title: "Platform Value",
    subtitle: "$1.6M Already Invested",
    content: [
      "• Platform Development: $1.58-1.6M value built",
      "• 26,803+ lines of production code",
      "• 7,500-8,750 development hours completed",
      "• 18-24 months of development time saved",
      "• Ready for immediate deployment"
    ],
    background: "linear-gradient(135deg, #0891b2 0%, #1e40af 100%)",
    narration: "We've already invested 1.6 million dollars building a complete platform. With over 26,000 lines of code and 8,000 development hours, we've saved investors 2 years of development risk. The platform is production-ready today."
  },
  {
    id: 7,
    title: "Technology Advantage",
    subtitle: "AI-First, Fully Automated",
    content: [
      "• OpenAI integration for fraud detection",
      "• Automated SEO: 30,000+ pages capability",
      "• IICRC-compliant quality systems",
      "• Stripe payment processing integrated",
      "• Mobile-first responsive platform"
    ],
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    narration: "Our technology creates an unbeatable moat. AI-powered fraud detection, automated generation of 30,000 SEO pages, and IICRC-compliant quality systems. This isn't just software, it's a complete ecosystem that runs itself."
  },
  {
    id: 8,
    title: "Go-to-Market Strategy",
    subtitle: "SEO Domination + Direct Sales",
    content: [
      "• Phase 1: Major cities (Sydney, Melbourne, Brisbane)",
      "• Phase 2: Regional centers (50+ cities)",
      "• Phase 3: Complete national coverage",
      "• SEO: Own every disaster + location keyword",
      "• Direct: Insurance partnership pipeline"
    ],
    background: "linear-gradient(135deg, #dc2626 0%, #c026d3 100%)",
    narration: "Our go-to-market strategy ensures market domination. Starting with major cities, expanding to regional centers, then complete national coverage. Our SEO strategy will own every disaster-related search term across every Australian location."
  },
  {
    id: 9,
    title: "Financial Projections",
    subtitle: "Path to $40M Revenue",
    content: [
      "• Year 1: 250 contractors, $2.9M revenue, 50% margin",
      "• Year 2: 750 contractors, $8.1M revenue, 82% margin",
      "• Year 3: 1,500 contractors, $15.5M revenue, 91% margin",
      "• Year 5: 4,000 contractors, $40M revenue, 96% margin",
      "• Break-even: Month 6 with just 50 contractors"
    ],
    background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
    narration: "Our financial projections are conservative yet exciting. Starting with 250 contractors in year one generating 2.9 million, scaling to 4000 contractors and 40 million revenue by year five with 96% margins. We break even with just 50 contractors."
  },
  {
    id: 10,
    title: "Competitive Advantage",
    subtitle: "Building Before US Giants Arrive",
    content: [
      "• First-mover: No national platform exists",
      "• SEO moat: Lock out competitors completely",
      "• Network effects: Value increases exponentially",
      "• Quality focus: AI fraud prevention + standards",
      "• Exit ready: Perfect acquisition target"
    ],
    background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
    narration: "We have a unique window. US giants like SERVPRO and BELFOR haven't entered Australia yet. By building now, we create an SEO moat and network effects that make us either unbeatable or the perfect acquisition target."
  },
  {
    id: 11,
    title: "Exit Strategy",
    subtitle: "Multiple Paths to 20x+ Returns",
    content: [
      "• Strategic acquirers: Suncorp, IAG, QBE",
      "• US expansion: SERVPRO, BELFOR, ServiceMaster",
      "• Private equity: Industry consolidation play",
      "• Conservative (3x): $120M valuation",
      "• Expected (5x): $200M valuation",
      "• Aggressive (8x): $320M valuation"
    ],
    background: "linear-gradient(135deg, #0891b2 0%, #065f46 100%)",
    narration: "Exit opportunities are abundant. Insurance companies like Suncorp and IAG need our technology. US giants want Australian entry. At just 5 times revenue, that's a 200 million dollar valuation, delivering 20x returns to investors."
  },
  {
    id: 12,
    title: "The Ask",
    subtitle: "Series A: $2.5M to Dominate",
    content: [
      "• Marketing & Acquisition (40%): $1.0M",
      "• Team Expansion (35%): $875K",
      "• Technology Enhancement (15%): $375K",
      "• Working Capital (10%): $250K",
      "",
      "Join us in transforming disaster recovery forever"
    ],
    background: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)",
    narration: "We're raising 2.5 million dollars to dominate the Australian market. The platform is built, the opportunity is massive, and the timing is perfect. Join us in transforming disaster recovery and delivering exceptional returns."
  }
];

export default function InvestorPitchPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance slides
  useEffect(() => {
    if (isPlaying && currentSlide < slides.length - 1) {
      timerRef.current = setTimeout(() => {
        handleNext();
      }, 10000); // 10 seconds per slide for more content
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    } else if (isPlaying && currentSlide === slides.length - 1) {
      setIsPlaying(false);
    }
  }, [currentSlide, isPlaying]);

  // Handle narration with Speech Synthesis API
  useEffect(() => {
    if ('speechSynthesis' in window && !isMuted && isPlaying) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(slides[currentSlide].narration);
      utterance.rate = 0.95; // Slightly slower for clarity
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Try to use a professional voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Microsoft') || 
        voice.name.includes('Google') ||
        voice.name.includes('Premium') ||
        voice.lang.includes('en-AU') // Prefer Australian accent
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
    
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentSlide, isMuted, isPlaying]);

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentSlide === slides.length - 1) {
      setCurrentSlide(0);
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    if ('speechSynthesis' in window) {
      if (isMuted) {
        // If unmuting and playing, start narration
        if (isPlaying) {
          const utterance = new SpeechSynthesisUtterance(slides[currentSlide].narration);
          utterance.rate = 0.95;
          window.speechSynthesis.speak(utterance);
        }
      } else {
        // If muting, stop narration
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    // Create a detailed text version for download
    const content = `DISASTER RECOVERY AUSTRALIA - INVESTOR PITCH DECK
National Recovery Partners
Series A Investment Opportunity

${slides.map((slide, index) => 
`SLIDE ${index + 1}: ${slide.title}
${slide.subtitle}
${slide.content.join('\n')}

SPEAKER NOTES:
${slide.narration}

---
`).join('\n')}

CONTACT INFORMATION:
Email: investors@disasterrecovery.com.au
Website: https://disasterrecovery.com.au
Platform Demo: https://disaster-recovery.vercel.app

CONFIDENTIAL - NOT FOR DISTRIBUTION
© ${new Date().getFullYear()} National Recovery Partners. All rights reserved.`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NRP-Investor-Pitch-Deck.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/demo"
              className="text-gray-400 hover:text-white transition flex items-center gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              Back to Demos
            </Link>
            <div className="h-6 w-px bg-gray-600" />
            <h1 className="text-xl font-semibold text-white">Investor Pitch Deck - Series A</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="p-2 text-gray-400 hover:text-white transition"
              title="Download Deck"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={handleFullscreen}
              className="p-2 text-gray-400 hover:text-white transition"
              title="Fullscreen"
            >
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col" ref={containerRef}>
        {/* Slide */}
        <div 
          className="flex-1 flex items-center justify-center p-8"
          style={{ background: slide.background }}
        >
          <div className="max-w-5xl w-full text-center text-white">
            <h2 className="text-6xl font-bold mb-4 animate-fade-in">
              {slide.title}
            </h2>
            <h3 className="text-3xl mb-8 opacity-90 animate-slide-up">
              {slide.subtitle}
            </h3>
            <div className="space-y-4 text-2xl animate-slide-up-delay">
              {slide.content.map((line, index) => (
                <div key={index} className="text-left max-w-3xl mx-auto">
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-black/80 backdrop-blur-sm border-t border-gray-700 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>Slide {currentSlide + 1} of {slides.length}</span>
                <span>{slide.title}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentSlide === 0}
                  className="p-2 text-white hover:bg-white/10 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SkipBack className="h-5 w-5" />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentSlide === slides.length - 1}
                  className="p-2 text-white hover:bg-white/10 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleMute}
                  className="p-2 text-white hover:bg-white/10 rounded-lg transition"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
                <span className="text-sm text-gray-400">
                  {isPlaying ? 'Auto-playing' : 'Paused'}
                  {!isMuted && ' with narration'}
                </span>
              </div>

              {/* Slide Dots */}
              <div className="flex gap-1">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition ${
                      index === currentSlide 
                        ? 'bg-white w-8' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        .animate-slide-up-delay {
          animation: slide-up 0.7s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
}